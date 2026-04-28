if (!window.RTE_DefaultConfig) window.RTE_DefaultConfig = {};

RTE_DefaultConfig.plugin_mention = RTE_Plugin_Mention;

function RTE_Plugin_Mention() {
    var obj = this;
    var config;
    var editor;

    var popupHost = null;
    var popupEl = null;
    var statusEl = null;

    var triggers = [];
    var activeTrigger = null;
    var trigger = null; // currently-open invocation
    var items = [];
    var activeIndex = 0;
    var composing = false;
    var searchSeq = 0;
    var debounceTimer = null;

    obj.PluginName = "Mention";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        if (config.mentionEnabled === false) return;

        config.mentionTrigger = config.mentionTrigger || "@";
        config.mentionDebounceMs = config.mentionDebounceMs == null ? 150 : config.mentionDebounceMs;
        config.mentionMaxItems = config.mentionMaxItems || 8;
        config.mentionStaticList = config.mentionStaticList || null;
        config.mentionSource = config.mentionSource || null;
        config.mentionInsertClass = config.mentionInsertClass || "rte-mention";
        config.mentionTriggers = config.mentionTriggers || null; // optional array of extra triggers
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;
        if (config.mentionEnabled === false) return;

        editor.mentions = {
            register: registerTrigger,
            remove: removeTrigger,
            list: function () { return triggers.slice(); },
            close: closePopup,
            isOpen: function () { return !!popupEl; }
        };

        // Register the default @ trigger if a source or static list is configured.
        if (config.mentionSource || config.mentionStaticList) {
            registerTrigger({
                trigger: config.mentionTrigger,
                source: config.mentionSource || function (q) {
                    return filterStatic(config.mentionStaticList, q);
                }
            });
        }

        // Declarative extras from config.
        if (Array.isArray(config.mentionTriggers)) {
            for (var i = 0; i < config.mentionTriggers.length; i++) {
                registerTrigger(config.mentionTriggers[i]);
            }
        }

        injectStyles();

        var editdoc = editor.getDocument();
        editdoc.addEventListener("keydown", onEditDocKeyDown, true);
        editdoc.addEventListener("input", onEditDocInput, true);
        editdoc.addEventListener("compositionstart", function () { composing = true; });
        editdoc.addEventListener("compositionend", function () { composing = false; });
        editdoc.addEventListener("mousedown", function (e) {
            // Don't close when the user is clicking on a mention span (for selection/delete).
            if (e.target && e.target.closest && e.target.closest("." + config.mentionInsertClass)) return;
            closePopup();
        }, true);
        editdoc.addEventListener("blur", function () { setTimeout(closePopup, 150); }, true);

        window.addEventListener("scroll", onHostScrollOrResize, true);
        window.addEventListener("resize", onHostScrollOrResize, true);
    };

    function registerTrigger(def) {
        if (!def || !def.trigger || typeof def.source !== "function") return;
        var existingIdx = findTriggerIndex(def.trigger);
        var normalized = {
            trigger: def.trigger,
            source: def.source,
            renderItem: def.renderItem || null,
            renderInsert: def.renderInsert || null,
            insertClass: def.insertClass || config.mentionInsertClass,
            label: def.label || ("mentions " + def.trigger)
        };
        if (existingIdx >= 0) triggers[existingIdx] = normalized;
        else triggers.push(normalized);
    }

    function removeTrigger(ch) {
        var idx = findTriggerIndex(ch);
        if (idx >= 0) triggers.splice(idx, 1);
    }

    function findTriggerIndex(ch) {
        for (var i = 0; i < triggers.length; i++) if (triggers[i].trigger === ch) return i;
        return -1;
    }

    function filterStatic(list, q) {
        if (!Array.isArray(list)) return [];
        if (!q) return list.slice(0, 50);
        var ql = q.toLowerCase();
        return list.filter(function (item) {
            var hay = ((item.label || "") + " " + (item.subtitle || "") + " " + (item.id || "")).toLowerCase();
            return hay.indexOf(ql) !== -1;
        });
    }

    function onEditDocKeyDown(e) {
        if (composing) return;

        if (popupEl) {
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault(); e.stopPropagation();
                    moveActive(1);
                    return;
                case "ArrowUp":
                    e.preventDefault(); e.stopPropagation();
                    moveActive(-1);
                    return;
                case "Enter":
                case "Tab":
                    if (items.length) {
                        e.preventDefault(); e.stopPropagation();
                        selectActive();
                        return;
                    }
                    closePopup();
                    return;
                case "Escape":
                case "Esc":
                    e.preventDefault(); e.stopPropagation();
                    closePopup();
                    return;
            }
        }

        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            var matched = findTriggerIndex(e.key);
            if (matched >= 0 && isAtTriggerBoundary()) {
                var tdef = triggers[matched];
                setTimeout(function () { openPopup(tdef); }, 0);
            }
        }
    }

    function onEditDocInput() {
        if (!popupEl) return;
        updateTriggerState();
    }

    function isAtTriggerBoundary() {
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0 || !sel.isCollapsed) return false;
        var range = sel.getRangeAt(0);
        var node = range.startContainer;
        var offset = range.startOffset;

        var editable = editor.getEditable();
        var walk = node.nodeType === 1 ? node : node.parentNode;
        while (walk && walk !== editable) {
            var name = walk.nodeName;
            if (name === "CODE" || name === "PRE") return false;
            // Avoid triggering a fresh mention inside an existing mention span.
            if (walk.classList && walk.classList.contains(config.mentionInsertClass)) return false;
            walk = walk.parentNode;
        }

        if (node.nodeType === 3) {
            if (offset === 0) return true;
            var ch = node.nodeValue.charAt(offset - 1);
            return /\s/.test(ch);
        }
        return true;
    }

    function openPopup(triggerDef) {
        closePopup();
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        var range = sel.getRangeAt(0).cloneRange();

        activeTrigger = triggerDef;
        trigger = {
            range: range,
            startNode: range.startContainer,
            startOffset: range.startOffset,
            triggerCharCount: 1,
            query: ""
        };

        renderPopup();
        positionPopup();
        runSource("");
    }

    function closePopup() {
        if (debounceTimer) { clearTimeout(debounceTimer); debounceTimer = null; }
        if (popupEl && popupEl.parentNode) popupEl.parentNode.removeChild(popupEl);
        popupEl = null;
        statusEl = null;
        activeTrigger = null;
        trigger = null;
        items = [];
        activeIndex = 0;
    }

    function updateTriggerState() {
        if (!trigger) return;
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0 || !sel.isCollapsed) { closePopup(); return; }
        var range = sel.getRangeAt(0);
        var node = range.startContainer;
        if (node !== trigger.startNode) { closePopup(); return; }
        var caret = range.startOffset;
        if (caret < trigger.startOffset) { closePopup(); return; }

        var text = (node.nodeType === 3 ? node.nodeValue : "") || "";
        var query = text.substring(trigger.startOffset, caret);
        if (/\s/.test(query)) { closePopup(); return; }
        trigger.query = query;
        runSource(query);
        positionPopup();
    }

    function runSource(query) {
        if (!activeTrigger) return;
        var seq = ++searchSeq;

        if (debounceTimer) { clearTimeout(debounceTimer); debounceTimer = null; }

        var delay = query.length === 0 ? 0 : config.mentionDebounceMs;

        function execute() {
            showLoading();
            var invocation;
            try {
                invocation = activeTrigger.source(query, { trigger: activeTrigger.trigger });
            } catch (err) {
                console.warn("Mention source threw:", err);
                invocation = [];
            }
            Promise.resolve(invocation).then(function (results) {
                if (seq !== searchSeq || !popupEl) return;
                items = Array.isArray(results) ? results.slice(0, config.mentionMaxItems) : [];
                activeIndex = 0;
                renderItems();
            }, function (err) {
                if (seq !== searchSeq || !popupEl) return;
                console.warn("Mention source failed:", err);
                items = [];
                renderItems();
            });
        }

        if (delay > 0) debounceTimer = setTimeout(execute, delay);
        else execute();
    }

    function renderPopup() {
        popupHost = editor.iframe.ownerDocument;
        popupEl = popupHost.createElement("div");
        popupEl.className = "rte-mention-popup";
        popupEl.setAttribute("role", "listbox");
        popupEl.setAttribute("aria-label", activeTrigger.label);
        popupHost.body.appendChild(popupEl);
    }

    function showLoading() {
        if (!popupEl) return;
        popupEl.innerHTML = "";
        var loader = popupHost.createElement("div");
        loader.className = "rte-mention-loading";
        loader.textContent = "Searching\u2026";
        popupEl.appendChild(loader);
        statusEl = loader;
    }

    function renderItems() {
        if (!popupEl) return;
        popupEl.innerHTML = "";
        statusEl = null;

        if (!items.length) {
            var empty = popupHost.createElement("div");
            empty.className = "rte-mention-empty";
            empty.textContent = "No matches";
            popupEl.appendChild(empty);
            return;
        }

        for (var i = 0; i < items.length; i++) {
            (function (item, index) {
                var btn = popupHost.createElement("button");
                btn.type = "button";
                btn.className = "rte-mention-item" + (index === activeIndex ? " rte-mention-item-active" : "");
                btn.setAttribute("role", "option");
                btn.setAttribute("data-index", index);

                if (activeTrigger.renderItem) {
                    activeTrigger.renderItem(btn, item);
                } else {
                    renderDefaultItem(btn, item);
                }

                btn.addEventListener("mousedown", function (e) {
                    e.preventDefault(); e.stopPropagation();
                    activeIndex = index;
                    selectActive();
                });
                btn.addEventListener("click", function (e) {
                    if (!popupEl) return;
                    e.preventDefault(); e.stopPropagation();
                    activeIndex = index;
                    selectActive();
                });
                btn.addEventListener("mouseenter", function () {
                    if (activeIndex !== index) { activeIndex = index; updateActiveClass(); }
                });

                popupEl.appendChild(btn);
            })(items[i], i);
        }
    }

    function renderDefaultItem(btn, item) {
        var avatar = popupHost.createElement("span");
        avatar.className = "rte-mention-avatar";
        if (item.avatarUrl) {
            var img = popupHost.createElement("img");
            img.src = item.avatarUrl;
            img.alt = "";
            avatar.appendChild(img);
        } else {
            avatar.textContent = initialsOf(item.label || item.id || "?");
        }
        btn.appendChild(avatar);

        var body = popupHost.createElement("span");
        body.className = "rte-mention-body";
        var label = popupHost.createElement("span");
        label.className = "rte-mention-label";
        label.textContent = item.label || item.id || "";
        body.appendChild(label);
        if (item.subtitle) {
            var sub = popupHost.createElement("span");
            sub.className = "rte-mention-subtitle";
            sub.textContent = item.subtitle;
            body.appendChild(sub);
        }
        btn.appendChild(body);
    }

    function initialsOf(label) {
        var parts = String(label).trim().split(/\s+/);
        if (!parts[0]) return "?";
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    function updateActiveClass() {
        if (!popupEl) return;
        var nodes = popupEl.querySelectorAll(".rte-mention-item");
        for (var i = 0; i < nodes.length; i++) {
            var idx = +nodes[i].getAttribute("data-index");
            if (idx === activeIndex) nodes[i].classList.add("rte-mention-item-active");
            else nodes[i].classList.remove("rte-mention-item-active");
        }
        scrollActiveIntoView();
    }

    function scrollActiveIntoView() {
        if (!popupEl) return;
        var active = popupEl.querySelector(".rte-mention-item-active");
        if (!active) return;
        var top = active.offsetTop;
        var bot = top + active.offsetHeight;
        if (top < popupEl.scrollTop) popupEl.scrollTop = top;
        else if (bot > popupEl.scrollTop + popupEl.clientHeight) popupEl.scrollTop = bot - popupEl.clientHeight;
    }

    function moveActive(delta) {
        if (!items.length) return;
        activeIndex = (activeIndex + delta + items.length) % items.length;
        updateActiveClass();
    }

    function selectActive() {
        if (!items.length) { closePopup(); return; }
        var item = items[activeIndex];
        var triggerSnapshot = trigger;
        var triggerDef = activeTrigger;
        closePopup();
        if (!item || !triggerSnapshot || !triggerDef) return;
        deleteTriggerText(triggerSnapshot);
        insertMention(triggerDef, item);
    }

    function deleteTriggerText(triggerSnapshot) {
        var node = triggerSnapshot.startNode;
        if (!node) return;
        var start = triggerSnapshot.startOffset - (triggerSnapshot.triggerCharCount || 0);
        if (start < 0) start = 0;
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        var currentRange = sel.getRangeAt(0);
        var endNode = currentRange.startContainer, endOffset = currentRange.startOffset;
        var delRange = editor.getDocument().createRange();
        delRange.setStart(node, start);
        delRange.setEnd(endNode, endOffset);
        try { delRange.deleteContents(); } catch (err) { return; }
        sel.removeAllRanges();
        sel.addRange(delRange);
    }

    function insertMention(triggerDef, item) {
        var editdoc = editor.getDocument();
        var span;
        if (triggerDef.renderInsert) {
            span = triggerDef.renderInsert(editdoc, item);
        } else {
            span = editdoc.createElement("span");
            span.className = triggerDef.insertClass;
            span.setAttribute("contenteditable", "false");
            span.setAttribute("data-rte-mention-id", item.id != null ? item.id : "");
            span.setAttribute("data-rte-mention-trigger", triggerDef.trigger);
            span.textContent = triggerDef.trigger + (item.label || item.id || "");
        }
        if (!span) return;

        // Insert the mention + a trailing space so the caret naturally lives in text, not inside
        // the atomic span.
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        var range = sel.getRangeAt(0);
        range.insertNode(span);

        var spaceNode = editdoc.createTextNode("\u00a0");
        span.parentNode.insertBefore(spaceNode, span.nextSibling);

        var newRange = editdoc.createRange();
        newRange.setStartAfter(spaceNode);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
    }

    function positionPopup() {
        if (!popupEl || !trigger) return;
        var iframe = editor.iframe;
        var ir = iframe.getBoundingClientRect();
        var rects = trigger.range.getClientRects();
        var r = rects && rects.length ? rects[rects.length - 1] : null;
        if (!r) r = trigger.range.getBoundingClientRect();

        var left = ir.left + (r.left || 0) + window.pageXOffset;
        var top = ir.top + (r.bottom || r.top || 0) + window.pageYOffset + 4;

        popupEl.style.position = "absolute";
        popupEl.style.left = left + "px";
        popupEl.style.top = top + "px";

        var vh = window.innerHeight || document.documentElement.clientHeight;
        var popupRect = popupEl.getBoundingClientRect();
        if (popupRect.bottom > vh - 8 && (ir.top + (r.top || 0)) > popupRect.height + 16) {
            popupEl.style.top = (ir.top + (r.top || 0) + window.pageYOffset - popupRect.height - 4) + "px";
        }
    }

    function onHostScrollOrResize() {
        if (popupEl) positionPopup();
    }

    function injectStyles() {
        var host = (editor && editor.iframe && editor.iframe.ownerDocument) || document;
        if (host.querySelector("style[data-rte-mention]")) return;
        var style = host.createElement("style");
        style.setAttribute("data-rte-mention", "1");
        style.textContent = [
            ".rte-mention-popup{position:absolute;z-index:2147483000;min-width:260px;max-width:340px;max-height:300px;overflow-y:auto;background:#fff;border:1px solid rgba(15,23,42,.08);box-shadow:0 12px 32px rgba(15,23,42,.18),0 2px 6px rgba(15,23,42,.06);border-radius:10px;padding:4px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;color:#0f172a}",
            ".rte-mention-item{display:flex;align-items:center;gap:10px;width:calc(100% - 8px);padding:6px 10px;border:0;background:transparent;text-align:left;cursor:pointer;color:inherit;font:inherit;border-radius:6px;margin:0 4px}",
            ".rte-mention-item:hover,.rte-mention-item-active{background:#eef2ff;color:#1e3a8a}",
            ".rte-mention-avatar{flex:0 0 28px;width:28px;height:28px;border-radius:50%;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;background:#e2e8f0;color:#475569;font-size:11px;font-weight:600;letter-spacing:.02em}",
            ".rte-mention-avatar img{width:100%;height:100%;object-fit:cover}",
            ".rte-mention-item-active .rte-mention-avatar{background:#c7d2fe;color:#1e3a8a}",
            ".rte-mention-body{display:flex;flex-direction:column;min-width:0;flex:1}",
            ".rte-mention-label{font-weight:600;font-size:13px;line-height:1.3}",
            ".rte-mention-subtitle{font-size:11px;color:#64748b;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}",
            ".rte-mention-item-active .rte-mention-subtitle{color:#1e3a8a}",
            ".rte-mention-loading,.rte-mention-empty{padding:12px 16px;color:#64748b;font-size:12px;text-align:center}",
            ".rte-mention{display:inline-block;padding:1px 6px;border-radius:4px;background:#eef2ff;color:#1e3a8a;font-weight:500;cursor:default;border:1px solid rgba(30,58,138,.15)}",
            ".rte-mention:hover{background:#e0e7ff}"
        ].join("\n");
        host.head.appendChild(style);

        // Also inject mention-span styles inside the iframe so the pill looks right while editing.
        var editdoc = editor.getDocument();
        if (editdoc && editdoc.head && !editdoc.querySelector("style[data-rte-mention-inline]")) {
            var iStyle = editdoc.createElement("style");
            iStyle.setAttribute("data-rte-mention-inline", "1");
            iStyle.textContent = [
                ".rte-mention{display:inline-block;padding:1px 6px;border-radius:4px;background:#eef2ff;color:#1e3a8a;font-weight:500;cursor:default;border:1px solid rgba(30,58,138,.15);user-select:all}",
                ".rte-mention:hover{background:#e0e7ff}"
            ].join("\n");
            editdoc.head.appendChild(iStyle);
        }
    }
}
