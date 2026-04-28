if (!window.RTE_DefaultConfig) window.RTE_DefaultConfig = {};

RTE_DefaultConfig.plugin_slashcommand = RTE_Plugin_SlashCommand;

function RTE_Plugin_SlashCommand() {
    var obj = this;
    var config;
    var editor;
    var popupHost = null;
    var popupEl = null;

    var trigger = null;
    var commands = [];
    var filtered = [];
    var activeIndex = 0;
    var composing = false;
    var suppressNextOpen = false;

    obj.PluginName = "SlashCommand";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        if (config.slashCommandEnabled === false) return;

        config.slashCommandTrigger = config.slashCommandTrigger || "/";
        config.slashCommandMaxItems = config.slashCommandMaxItems || 40;
        config.slashCommandIncludeAi = config.slashCommandIncludeAi !== false;
        config.slashCommands = config.slashCommands || null;
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;
        if (config.slashCommandEnabled === false) return;

        editor.slashCommands = {
            register: registerCommand,
            remove: removeCommand,
            list: function () { return commands.slice(); },
            open: function () { openPopup(true); },
            close: closePopup,
            isOpen: function () { return !!popupEl; }
        };

        commands = buildDefaultCommands();
        if (Array.isArray(config.slashCommands)) {
            for (var i = 0; i < config.slashCommands.length; i++) {
                registerCommand(config.slashCommands[i]);
            }
        }

        injectStyles();

        var editdoc = editor.getDocument();
        editdoc.addEventListener("keydown", onEditDocKeyDown, true);
        editdoc.addEventListener("input", onEditDocInput, true);
        editdoc.addEventListener("compositionstart", function () { composing = true; });
        editdoc.addEventListener("compositionend", function () { composing = false; });
        editdoc.addEventListener("mousedown", function () { closePopup(); }, true);
        editdoc.addEventListener("blur", function () { setTimeout(closePopup, 150); }, true);

        window.addEventListener("scroll", onHostScrollOrResize, true);
        window.addEventListener("resize", onHostScrollOrResize, true);
    };

    function registerCommand(def) {
        if (!def || !def.id) return;
        var existing = findCommandIndex(def.id);
        if (existing >= 0) commands[existing] = normalizeCommand(def);
        else commands.push(normalizeCommand(def));
    }

    function removeCommand(id) {
        var idx = findCommandIndex(id);
        if (idx >= 0) commands.splice(idx, 1);
    }

    function findCommandIndex(id) {
        for (var i = 0; i < commands.length; i++) if (commands[i].id === id) return i;
        return -1;
    }

    function normalizeCommand(def) {
        return {
            id: def.id,
            section: def.section || "Blocks",
            title: def.title || def.id,
            description: def.description || "",
            keywords: (def.keywords || []).slice(),
            icon: def.icon || "",
            iconSvg: def.iconSvg || "",
            run: def.run
        };
    }

    var BLOCK_TAGS = { P:1, DIV:1, H1:1, H2:1, H3:1, H4:1, H5:1, H6:1, BLOCKQUOTE:1, PRE:1, LI:1 };

    function findCurrentBlock() {
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0) return null;
        var node = sel.getRangeAt(0).startContainer;
        var editable = editor.getEditable();
        while (node && node !== editable) {
            if (node.nodeType === 1 && BLOCK_TAGS[node.nodeName]) return node;
            node = node.parentNode;
        }
        return null;
    }

    function formatBlockSafe(tagName) {
        var block = findCurrentBlock();
        tagName = tagName.toUpperCase();
        // For empty blocks the built-in formatblock picks the wrong node — replace the
        // element directly. For non-empty blocks, delegate to the editor so undo/selection
        // semantics match the rest of the toolbar.
        if (block && !block.textContent.trim()) {
            var editdoc = editor.getDocument();
            var newEl = editdoc.createElement(tagName);
            newEl.appendChild(editdoc.createElement("br"));
            block.parentNode.replaceChild(newEl, block);
            var range = editdoc.createRange();
            range.setStart(newEl, 0);
            range.setEnd(newEl, 0);
            var sel = editor.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }
        editor.execCommand("formatblock", tagName);
    }

    function buildDefaultCommands() {
        var list = [];

        function push(section, id, title, description, keywords, iconSvg, run) {
            list.push(normalizeCommand({
                id: id, section: section, title: title,
                description: description, keywords: keywords,
                iconSvg: iconSvg, run: run
            }));
        }

        push("Blocks", "heading1", "Heading 1", "Large section heading", ["h1", "title"], iconHeading("1"),
            function () { formatBlockSafe("H1"); });
        push("Blocks", "heading2", "Heading 2", "Medium section heading", ["h2", "subtitle"], iconHeading("2"),
            function () { formatBlockSafe("H2"); });
        push("Blocks", "heading3", "Heading 3", "Small section heading", ["h3"], iconHeading("3"),
            function () { formatBlockSafe("H3"); });
        push("Blocks", "paragraph", "Paragraph", "Plain body text", ["p", "text", "body"], iconParagraph(),
            function () { formatBlockSafe("P"); });
        push("Blocks", "bulletlist", "Bulleted list", "Unordered list", ["ul", "bullets", "list"], iconBullets(),
            function () { editor.execCommand("insertunorderedlist"); });
        push("Blocks", "numberlist", "Numbered list", "Ordered list", ["ol", "numbered"], iconNumbered(),
            function () { editor.execCommand("insertorderedlist"); });
        push("Blocks", "quote", "Quote", "Block quotation", ["blockquote"], iconQuote(),
            function () { editor.execCommand("insertblockquote"); });
        push("Blocks", "code", "Code block", "Monospaced code block", ["pre", "snippet"], iconCode(),
            function () {
                if (editor.isCommandEnabled && editor.isCommandEnabled("insertcode")) {
                    editor.execCommand("insertcode");
                } else {
                    editor.execCommand("formatblock", "PRE");
                }
            });
        push("Blocks", "divider", "Divider", "Horizontal rule", ["hr", "line", "separator"], iconDivider(),
            function () { editor.execCommand("inserthorizontalrule"); });

        push("Insert", "table", "Table", "Insert a table", ["grid", "rows", "columns"], iconTable(),
            function () { editor.execCommand("inserttable"); });
        push("Insert", "image", "Image", "Upload or embed an image", ["picture", "photo", "img"], iconImage(),
            function () { editor.execCommand("imageupload"); });
        push("Insert", "link", "Link", "Insert a hyperlink", ["url", "anchor"], iconLink(),
            function () { editor.execCommand("insertlink"); });
        push("Insert", "emoji", "Emoji", "Insert an emoji", ["smiley", "icon"], iconEmoji(),
            function () { editor.execCommand("insertemoji"); });
        push("Insert", "template", "Template", "Insert from template gallery", ["snippet"], iconTemplate(),
            function () { editor.execCommand("inserttemplate"); });
        push("Insert", "date", "Today's date", "Insert the current date", ["time", "now"], iconDate(),
            function () { editor.execCommand("insertdate"); });

        if (config.slashCommandIncludeAi && Array.isArray(config.aiToolkitActions)) {
            for (var i = 0; i < config.aiToolkitActions.length; i++) {
                (function (action) {
                    list.push(normalizeCommand({
                        id: "ai-" + action.id,
                        section: "AI",
                        title: action.title || action.id,
                        description: action.description || "",
                        keywords: ["ai", action.id],
                        iconSvg: config["svgCode_aiassist_" + (action.icon || action.id)] || config.svgCode_aiassist || "",
                        run: function () {
                            if (editor.aiToolkit && typeof editor.aiToolkit.resolveAction === "function") {
                                editor.aiToolkit.resolveAction(action.id);
                            }
                        }
                    }));
                })(config.aiToolkitActions[i]);
            }
        }

        return list;
    }

    function onEditDocKeyDown(e) {
        if (composing) return;

        if (popupEl) {
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    e.stopPropagation();
                    moveActive(1);
                    return;
                case "ArrowUp":
                    e.preventDefault();
                    e.stopPropagation();
                    moveActive(-1);
                    return;
                case "Enter":
                case "Tab":
                    if (filtered.length) {
                        e.preventDefault();
                        e.stopPropagation();
                        selectActive();
                        return;
                    }
                    closePopup();
                    return;
                case "Escape":
                case "Esc":
                    e.preventDefault();
                    e.stopPropagation();
                    closePopup();
                    return;
            }
        }

        if (e.key === config.slashCommandTrigger && !e.ctrlKey && !e.metaKey && !e.altKey) {
            if (!isAtTriggerBoundary()) return;
            suppressNextOpen = false;
            setTimeout(function () {
                if (!suppressNextOpen) openPopup(false);
            }, 0);
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

        // Suppress inside code/pre — users typing "/" in a code snippet mean the literal slash.
        var editable = editor.getEditable();
        var walk = node.nodeType === 1 ? node : node.parentNode;
        while (walk && walk !== editable) {
            var name = walk.nodeName;
            if (name === "CODE" || name === "PRE") return false;
            walk = walk.parentNode;
        }

        if (node.nodeType === 3) {
            if (offset === 0) return true;
            var ch = node.nodeValue.charAt(offset - 1);
            return /\s/.test(ch);
        }
        return true;
    }

    function openPopup(manual) {
        closePopup();
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        var range = sel.getRangeAt(0).cloneRange();

        // For automatic trigger, the "/" was typed before setTimeout(0) fires, so the
        // caret already sits just past it — startOffset is where the query begins.
        trigger = {
            range: range,
            startNode: range.startContainer,
            startOffset: range.startOffset,
            triggerCharCount: manual ? 0 : 1,
            query: ""
        };

        renderPopup();
        positionPopup();
        applyFilter("");
    }

    function closePopup() {
        if (popupEl && popupEl.parentNode) {
            popupEl.parentNode.removeChild(popupEl);
        }
        popupEl = null;
        trigger = null;
        filtered = [];
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
        applyFilter(query);
        positionPopup();
    }

    function applyFilter(query) {
        var q = (query || "").toLowerCase();
        filtered = commands.filter(function (cmd) {
            if (!q) return true;
            if (cmd.title.toLowerCase().indexOf(q) !== -1) return true;
            if (cmd.description && cmd.description.toLowerCase().indexOf(q) !== -1) return true;
            for (var i = 0; i < cmd.keywords.length; i++) {
                if (String(cmd.keywords[i]).toLowerCase().indexOf(q) !== -1) return true;
            }
            return false;
        }).slice(0, config.slashCommandMaxItems);
        activeIndex = 0;
        renderItems();
    }

    function renderPopup() {
        popupHost = editor.iframe.ownerDocument;
        popupEl = popupHost.createElement("div");
        popupEl.className = "rte-slash-popup";
        popupEl.setAttribute("role", "listbox");
        popupEl.setAttribute("aria-label", "Slash commands");
        popupHost.body.appendChild(popupEl);
    }

    function renderItems() {
        if (!popupEl) return;
        popupEl.innerHTML = "";

        if (!filtered.length) {
            var empty = popupHost.createElement("div");
            empty.className = "rte-slash-empty";
            empty.textContent = "No matching commands";
            popupEl.appendChild(empty);
            return;
        }

        var lastSection = "";
        for (var i = 0; i < filtered.length; i++) {
            (function (cmd, index) {
                if (cmd.section !== lastSection) {
                    var sectionEl = popupHost.createElement("div");
                    sectionEl.className = "rte-slash-section";
                    sectionEl.textContent = cmd.section;
                    popupEl.appendChild(sectionEl);
                    lastSection = cmd.section;
                }
                var item = popupHost.createElement("button");
                item.type = "button";
                item.className = "rte-slash-item" + (index === activeIndex ? " rte-slash-item-active" : "");
                item.setAttribute("role", "option");
                item.setAttribute("data-index", index);

                var icon = popupHost.createElement("span");
                icon.className = "rte-slash-item-icon";
                icon.innerHTML = cmd.iconSvg || iconDot();
                item.appendChild(icon);

                var body = popupHost.createElement("span");
                body.className = "rte-slash-item-body";
                var title = popupHost.createElement("span");
                title.className = "rte-slash-item-title";
                title.textContent = cmd.title;
                body.appendChild(title);
                if (cmd.description) {
                    var desc = popupHost.createElement("span");
                    desc.className = "rte-slash-item-desc";
                    desc.textContent = cmd.description;
                    body.appendChild(desc);
                }
                item.appendChild(body);

                // mousedown runs synchronously before focus shifts, so the editor's
                // selection stays intact. preventDefault stops the button from stealing
                // focus in the first place. click() is a fallback for programmatic
                // element.click() callers that don't dispatch a mousedown.
                item.addEventListener("mousedown", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    activeIndex = index;
                    selectActive();
                });
                item.addEventListener("click", function (e) {
                    if (!popupEl) return; // mousedown already handled it
                    e.preventDefault();
                    e.stopPropagation();
                    activeIndex = index;
                    selectActive();
                });
                item.addEventListener("mouseenter", function () {
                    if (activeIndex !== index) {
                        activeIndex = index;
                        updateActiveClass();
                    }
                });

                popupEl.appendChild(item);
            })(filtered[i], i);
        }
    }

    function updateActiveClass() {
        if (!popupEl) return;
        var items = popupEl.querySelectorAll(".rte-slash-item");
        for (var i = 0; i < items.length; i++) {
            var idx = +items[i].getAttribute("data-index");
            if (idx === activeIndex) items[i].classList.add("rte-slash-item-active");
            else items[i].classList.remove("rte-slash-item-active");
        }
        scrollActiveIntoView();
    }

    function scrollActiveIntoView() {
        if (!popupEl) return;
        var active = popupEl.querySelector(".rte-slash-item-active");
        if (!active) return;
        var top = active.offsetTop;
        var bot = top + active.offsetHeight;
        if (top < popupEl.scrollTop) popupEl.scrollTop = top;
        else if (bot > popupEl.scrollTop + popupEl.clientHeight) popupEl.scrollTop = bot - popupEl.clientHeight;
    }

    function moveActive(delta) {
        if (!filtered.length) return;
        activeIndex = (activeIndex + delta + filtered.length) % filtered.length;
        updateActiveClass();
    }

    function selectActive() {
        if (!filtered.length) { closePopup(); return; }
        var cmd = filtered[activeIndex];
        var triggerSnapshot = trigger;
        closePopup();
        if (!cmd || !triggerSnapshot) return;
        deleteTriggerText(triggerSnapshot);
        // Only re-focus if focus actually left the iframe — avoids editwin.focus()
        // nuking our freshly-placed selection when we were already focused.
        var editdoc = editor.getDocument();
        if (editdoc.activeElement !== editor.getEditable() && !editdoc.hasFocus()) {
            editor.focus();
        }
        try { cmd.run(editor); } catch (err) { console.warn("Slash command failed:", err); }
    }

    function deleteTriggerText(triggerSnapshot) {
        var node = triggerSnapshot.startNode;
        if (!node) return;
        var start = triggerSnapshot.startOffset - (triggerSnapshot.triggerCharCount || 0);
        if (start < 0) start = 0;
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        var currentRange = sel.getRangeAt(0);
        var endNode, endOffset;
        if (node.nodeType === 3 && currentRange.startContainer === node) {
            endNode = node;
            endOffset = currentRange.startOffset;
        } else {
            endNode = currentRange.startContainer;
            endOffset = currentRange.startOffset;
        }
        var delRange = editor.getDocument().createRange();
        delRange.setStart(node, start);
        delRange.setEnd(endNode, endOffset);
        try { delRange.deleteContents(); } catch (err) { return; }
        // After deleteContents(), delRange is collapsed at the deletion start — reuse it.
        sel.removeAllRanges();
        sel.addRange(delRange);
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

        // Flip up if would overflow viewport
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
        if (host.querySelector("style[data-rte-slashcommand]")) return;
        var style = host.createElement("style");
        style.setAttribute("data-rte-slashcommand", "1");
        style.textContent = [
            ".rte-slash-popup{position:absolute;z-index:2147483000;min-width:280px;max-width:340px;max-height:320px;overflow-y:auto;background:#fff;border:1px solid rgba(15,23,42,.08);box-shadow:0 12px 32px rgba(15,23,42,.18),0 2px 6px rgba(15,23,42,.06);border-radius:10px;padding:4px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;color:#0f172a}",
            ".rte-slash-section{padding:8px 14px 4px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#64748b}",
            ".rte-slash-item{display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;border:0;background:transparent;text-align:left;cursor:pointer;color:inherit;font:inherit;border-radius:6px;margin:0 4px;width:calc(100% - 8px)}",
            ".rte-slash-item:hover,.rte-slash-item-active{background:#eef2ff;color:#1e3a8a}",
            ".rte-slash-item-icon{flex:0 0 22px;height:22px;display:inline-flex;align-items:center;justify-content:center;color:#475569}",
            ".rte-slash-item-active .rte-slash-item-icon{color:#1e3a8a}",
            ".rte-slash-item-icon svg{width:18px;height:18px}",
            ".rte-slash-item-body{display:flex;flex-direction:column;min-width:0;flex:1}",
            ".rte-slash-item-title{font-weight:600;font-size:13px;line-height:1.3}",
            ".rte-slash-item-desc{font-size:11px;color:#64748b;line-height:1.3;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
            ".rte-slash-item-active .rte-slash-item-desc{color:#1e3a8a}",
            ".rte-slash-empty{padding:14px 16px;color:#64748b;font-size:12px;text-align:center}"
        ].join("\n");
        host.head.appendChild(style);
    }

    // --- Icons (minimal inline SVGs) ---
    function iconHeading(n) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16"/><path d="M14 4v16"/><path d="M6 12h8"/><text x="16" y="18" font-size="9" font-weight="700" fill="currentColor" stroke="none" font-family="-apple-system,Segoe UI,sans-serif">' + n + '</text></svg>';
    }
    function iconParagraph() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4h5"/><path d="M13 4v16"/><path d="M17 4v16"/><path d="M13 4a4 4 0 000 8h0"/></svg>'; }
    function iconBullets() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="7" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="5" cy="17" r="1"/><path d="M9 7h11"/><path d="M9 12h11"/><path d="M9 17h11"/></svg>'; }
    function iconNumbered() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h1v3"/><path d="M4 9h2"/><path d="M4 14h2a1 1 0 010 2H4v1h2"/><path d="M9 7h11"/><path d="M9 12h11"/><path d="M9 17h11"/></svg>'; }
    function iconQuote() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8c-2 0-3 1.5-3 4s1 4 3 4V8z"/><path d="M16 8c-2 0-3 1.5-3 4s1 4 3 4V8z"/></svg>'; }
    function iconCode() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 8l-4 4 4 4"/><path d="M15 8l4 4-4 4"/></svg>'; }
    function iconDivider() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M4 6h10"/><path d="M4 18h10"/></svg>'; }
    function iconTable() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="1"/><path d="M4 10h16"/><path d="M4 15h16"/><path d="M10 5v14"/><path d="M16 5v14"/></svg>'; }
    function iconImage() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/></svg>'; }
    function iconLink() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 10-5.7-5.7L11 7"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 105.7 5.7L13 17"/></svg>'; }
    function iconEmoji() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.5 2.5 2 4 2s3-.5 4-2"/><circle cx="9" cy="10" r=".8"/><circle cx="15" cy="10" r=".8"/></svg>'; }
    function iconTemplate() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16"/><path d="M9 9v11"/></svg>'; }
    function iconDate() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="16" height="14" rx="1.5"/><path d="M4 10h16"/><path d="M9 3v4"/><path d="M15 3v4"/></svg>'; }
    function iconDot() { return '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3"/></svg>'; }
}
