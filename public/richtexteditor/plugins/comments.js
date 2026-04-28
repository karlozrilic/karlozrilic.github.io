if (!window.RTE_DefaultConfig) window.RTE_DefaultConfig = {};

if (!RTE_DefaultConfig.svgCode_commentadd) {
    RTE_DefaultConfig.svgCode_commentadd = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-4 4v-4H4a2 2 0 01-2-2V7a2 2 0 012-2z"/><path d="M8 9h8"/><path d="M8 12h5"/></svg>';
}

RTE_DefaultConfig.plugin_comments = RTE_Plugin_Comments;

function RTE_Plugin_Comments() {
    var obj = this;
    var config;
    var editor;
    var sidebar = null;
    var composer = null;

    obj.PluginName = "Comments";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        if (config.commentsEnabled === false) return;

        config.text_commentadd = config.text_commentadd || "Comment";
        config.commentHighlightBg = config.commentHighlightBg || "#fff9c4";
        config.commentHighlightBorder = config.commentHighlightBorder || "#f9a825";

        appendToolbarCommand("toolbar_default", "#{commentadd}");
        appendToolbarCommand("toolbar_full", "#{commentadd}");
        appendToolbarCommand("toolbar_mobile", "#{commentadd}");
        if ((config.controltoolbar_TEXT || "").indexOf("commentadd") === -1) {
            config.controltoolbar_TEXT = (config.controltoolbar_TEXT || "") + "|{commentadd}";
        }
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;
        if (config.commentsEnabled === false) return;

        editor.comments = {
            add: function (options) { return addComment(options); },
            reply: function (commentId, text) { return replyToComment(commentId, text); },
            resolve: function (commentId) { return resolveComment(commentId); },
            delete: function (commentId) { return deleteComment(commentId); },
            list: function (filter) { return listComments(filter); },
            openSidebar: function () { openSidebar(); },
            closeSidebar: function () { closeSidebar(); },
            toggleSidebar: function () { if (sidebar && sidebar.isConnected) closeSidebar(); else openSidebar(); },
            focusComment: function (id) { focusComment(id); }
        };

        injectStyles();

        editor.toolbarFactoryMap = editor.toolbarFactoryMap || {};
        editor.toolbarFactoryMap["commentadd"] = function (cmd) {
            return editor.createToolbarButton(cmd);
        };

        editor.attachEvent("exec_command_commentadd", function (state) {
            state.returnValue = true;
            state.stopBubble = true;
            openComposerForSelection();
        });

        editor.getEditable().addEventListener("click", function (e) {
            var span = e.target && e.target.closest ? e.target.closest(".rte-comment") : null;
            if (!span) return;
            var id = span.getAttribute("data-comment-id");
            if (id) focusComment(id);
        });

        // Restore existing comments on load so their spans re-hydrate from the ledger.
        // (Span markup is persisted in the HTML itself, but we also make sure no
        // orphan ledger entries point at missing spans.)
        pruneOrphanComments();
    };

    function appendToolbarCommand(toolbar, item) {
        if (!config[toolbar]) return;
        if (config[toolbar].indexOf(item) !== -1) return;
        config[toolbar] = config[toolbar] + item;
    }

    function getCurrentUser() {
        if (config.currentUser && config.currentUser.id) return config.currentUser;
        return { id: "user", name: "User", color: "#2563eb" };
    }

    function listComments(filter) {
        if (!editor.reviewLedger) return [];
        return editor.reviewLedger.list().filter(function (e) {
            if (e.changeType !== "comment") return false;
            if (filter && filter.status && e.status !== filter.status) return false;
            if (filter && filter.author && e.author.id !== filter.author) return false;
            return true;
        });
    }

    function pruneOrphanComments() {
        var editable = editor.getEditable();
        var entries = listComments();
        for (var i = 0; i < entries.length; i++) {
            var id = entries[i].id;
            if (!editable.querySelector('[data-comment-id="' + cssEscape(id) + '"]')) {
                // Don't actually delete — just mark stale.
                if (editor.reviewLedger && entries[i].status === "pending") {
                    editor.reviewLedger.update(id, { status: "stale" });
                }
            }
        }
    }

    // --- creating comments ---

    function openComposerForSelection() {
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
            // No selection — open composer anchored to caret, with empty snapshot.
            var rangeInfo = sel && sel.rangeCount ? snapshotRange(sel.getRangeAt(0)) : null;
            showComposer({ anchor: rangeInfo, allowEmpty: true });
            return;
        }
        var range = sel.getRangeAt(0);
        showComposer({ anchor: snapshotRange(range), range: range });
    }

    function snapshotRange(range) {
        if (!range) return null;
        return {
            startContainer: range.startContainer,
            startOffset: range.startOffset,
            endContainer: range.endContainer,
            endOffset: range.endOffset,
            text: range.toString()
        };
    }

    function showComposer(options) {
        closeComposer();
        options = options || {};
        var host = editor.iframe.ownerDocument;
        composer = host.createElement("div");
        composer.className = "rte-comment-composer";
        composer.setAttribute("role", "dialog");
        composer.setAttribute("aria-label", "Add comment");

        var header = host.createElement("div");
        header.className = "rte-comment-composer-header";
        header.textContent = "Add comment";
        composer.appendChild(header);

        var textarea = host.createElement("textarea");
        textarea.className = "rte-comment-composer-textarea";
        textarea.placeholder = "Type your comment…";
        textarea.rows = 3;
        composer.appendChild(textarea);

        var actions = host.createElement("div");
        actions.className = "rte-comment-composer-actions";
        var cancel = host.createElement("button");
        cancel.type = "button";
        cancel.className = "rte-comment-btn rte-comment-btn-ghost";
        cancel.textContent = "Cancel";
        cancel.addEventListener("mousedown", function (e) { e.preventDefault(); closeComposer(); });
        var submit = host.createElement("button");
        submit.type = "button";
        submit.className = "rte-comment-btn rte-comment-btn-primary";
        submit.textContent = "Comment";
        submit.addEventListener("mousedown", function (e) {
            e.preventDefault();
            var text = textarea.value.replace(/^\s+|\s+$/g, "");
            if (!text) return;
            addComment({ anchor: options.anchor, text: text });
            closeComposer();
        });
        actions.appendChild(cancel);
        actions.appendChild(submit);
        composer.appendChild(actions);

        host.body.appendChild(composer);
        positionComposer(options.anchor);
        setTimeout(function () { textarea.focus(); }, 0);

        var escListener = function (e) {
            if (e.key === "Escape" || e.key === "Esc") closeComposer();
        };
        composer.addEventListener("keydown", escListener);
    }

    function positionComposer(anchor) {
        if (!composer) return;
        composer.style.position = "absolute";
        var iframe = editor.iframe;
        var ir = iframe.getBoundingClientRect();
        var left = ir.left + window.pageXOffset + 12;
        var top = ir.top + window.pageYOffset + 12;
        if (anchor && anchor.startContainer) {
            try {
                var r = editor.getDocument().createRange();
                r.setStart(anchor.startContainer, anchor.startOffset);
                r.setEnd(anchor.endContainer, anchor.endOffset);
                var rects = r.getClientRects();
                var rect = rects && rects.length ? rects[rects.length - 1] : r.getBoundingClientRect();
                left = ir.left + (rect.left || 0) + window.pageXOffset;
                top = ir.top + (rect.bottom || rect.top || 0) + window.pageYOffset + 6;
            } catch (ignore) { }
        }
        composer.style.left = left + "px";
        composer.style.top = top + "px";
    }

    function closeComposer() {
        if (composer && composer.parentNode) composer.parentNode.removeChild(composer);
        composer = null;
    }

    function addComment(options) {
        options = options || {};
        if (!editor.reviewLedger) return null;
        var text = (options.text || "").replace(/^\s+|\s+$/g, "");
        if (!text) return null;

        var id = "cmt-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
        var user = getCurrentUser();
        var anchor = options.anchor;
        var wrappedText = "";

        if (anchor && anchor.startContainer && anchor.endContainer && anchor.text) {
            var editdoc = editor.getDocument();
            try {
                var wrapRange = editdoc.createRange();
                wrapRange.setStart(anchor.startContainer, anchor.startOffset);
                wrapRange.setEnd(anchor.endContainer, anchor.endOffset);
                var span = editdoc.createElement("span");
                span.className = "rte-comment";
                span.setAttribute("data-comment-id", id);
                span.setAttribute("data-comment-author", user.id);
                var fragment = wrapRange.extractContents();
                span.appendChild(fragment);
                wrapRange.insertNode(span);
                wrappedText = span.textContent;
                // Collapse caret after the span.
                var after = editdoc.createRange();
                after.setStartAfter(span);
                after.collapse(true);
                var sel = editor.getSelection();
                sel.removeAllRanges();
                sel.addRange(after);
            } catch (err) {
                console.warn("comments: range wrap failed:", err);
            }
        }

        editor.reviewLedger.add({
            id: id,
            changeType: "comment",
            author: user,
            text: text,
            originalText: wrappedText || (anchor && anchor.text) || "",
            status: "pending",
            sourceLabel: "Comment",
            createdAt: Date.now(),
            replies: []
        });

        if (sidebar && sidebar.isConnected) renderSidebar();
        else openSidebar();
        focusComment(id);
        return id;
    }

    function replyToComment(commentId, text) {
        if (!editor.reviewLedger) return false;
        var entry = editor.reviewLedger.get(commentId);
        if (!entry) return false;
        var replies = Array.isArray(entry.replies) ? entry.replies.slice() : [];
        replies.push({
            id: "rpl-" + Date.now() + "-" + Math.floor(Math.random() * 10000),
            author: getCurrentUser(),
            text: text,
            createdAt: Date.now()
        });
        editor.reviewLedger.update(commentId, { replies: replies });
        if (sidebar && sidebar.isConnected) renderSidebar();
        return true;
    }

    function resolveComment(commentId) {
        if (!editor.reviewLedger) return false;
        var span = editor.getEditable().querySelector('[data-comment-id="' + cssEscape(commentId) + '"]');
        if (span) unwrapKeepChildren(span);
        editor.reviewLedger.update(commentId, { status: "resolved", decidedAt: Date.now() });
        if (sidebar && sidebar.isConnected) renderSidebar();
        return true;
    }

    function deleteComment(commentId) {
        if (!editor.reviewLedger) return false;
        var span = editor.getEditable().querySelector('[data-comment-id="' + cssEscape(commentId) + '"]');
        if (span) unwrapKeepChildren(span);
        editor.reviewLedger.remove(commentId);
        if (sidebar && sidebar.isConnected) renderSidebar();
        return true;
    }

    function focusComment(commentId) {
        if (!sidebar || !sidebar.isConnected) openSidebar();
        setTimeout(function () {
            if (!sidebar) return;
            var item = sidebar.querySelector('[data-comment-ref="' + cssEscape(commentId) + '"]');
            if (item) {
                item.scrollIntoView({ block: "nearest" });
                item.classList.add("rte-comment-item-active");
                setTimeout(function () { item.classList.remove("rte-comment-item-active"); }, 1400);
            }
        }, 30);
    }

    function unwrapKeepChildren(el) {
        var parent = el.parentNode;
        if (!parent) return;
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        parent.removeChild(el);
    }

    function cssEscape(s) { return String(s).replace(/"/g, '\\"'); }

    // --- sidebar ---

    function openSidebar() {
        if (sidebar && sidebar.isConnected) { renderSidebar(); return; }
        var host = editor.iframe.ownerDocument;
        sidebar = host.createElement("div");
        sidebar.className = "rte-comment-sidebar";
        sidebar.setAttribute("role", "complementary");
        sidebar.setAttribute("aria-label", "Comments");
        var shell = getEditorShell();
        if (shell) {
            shell.parentNode.insertBefore(sidebar, shell.nextSibling);
            shell.classList.add("rte-comment-sidebar-host");
        } else {
            host.body.appendChild(sidebar);
        }
        renderSidebar();
    }

    function closeSidebar() {
        if (sidebar && sidebar.parentNode) sidebar.parentNode.removeChild(sidebar);
        sidebar = null;
        var shell = getEditorShell();
        if (shell) shell.classList.remove("rte-comment-sidebar-host");
    }

    function getEditorShell() {
        var el = editor.iframe;
        while (el && el !== document.body) {
            if (el.classList && el.classList.contains("richtexteditor")) return el;
            el = el.parentNode;
        }
        return null;
    }

    function renderSidebar() {
        if (!sidebar) return;
        var host = sidebar.ownerDocument;
        sidebar.innerHTML = "";

        var header = host.createElement("div");
        header.className = "rte-comment-sidebar-header";
        var title = host.createElement("div");
        title.className = "rte-comment-sidebar-title";
        title.textContent = "Comments";
        header.appendChild(title);
        var close = host.createElement("button");
        close.type = "button";
        close.className = "rte-comment-sidebar-close";
        close.setAttribute("aria-label", "Close");
        close.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>';
        close.addEventListener("mousedown", function (e) { e.preventDefault(); closeSidebar(); });
        header.appendChild(close);
        sidebar.appendChild(header);

        var entries = listComments({ status: "pending" });
        if (!entries.length) {
            var empty = host.createElement("div");
            empty.className = "rte-comment-empty";
            empty.textContent = "No open comments. Select text and click the Comment button to start.";
            sidebar.appendChild(empty);
            return;
        }

        entries.sort(function (a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });

        for (var i = 0; i < entries.length; i++) {
            sidebar.appendChild(renderEntry(entries[i], host));
        }
    }

    function renderEntry(entry, host) {
        var wrap = host.createElement("div");
        wrap.className = "rte-comment-item";
        wrap.setAttribute("data-comment-ref", entry.id);

        var topRow = host.createElement("div");
        topRow.className = "rte-comment-item-top";
        var avatar = host.createElement("span");
        avatar.className = "rte-comment-avatar";
        avatar.style.background = entry.author.color || "#2563eb";
        avatar.textContent = initialsOf(entry.author.name || entry.author.id || "?");
        var nameWrap = host.createElement("div");
        nameWrap.className = "rte-comment-namewrap";
        var name = host.createElement("div");
        name.className = "rte-comment-name";
        name.textContent = entry.author.name || entry.author.id || "";
        var when = host.createElement("div");
        when.className = "rte-comment-when";
        when.textContent = relativeTime(entry.createdAt);
        nameWrap.appendChild(name);
        nameWrap.appendChild(when);
        topRow.appendChild(avatar);
        topRow.appendChild(nameWrap);

        var actions = host.createElement("div");
        actions.className = "rte-comment-actions";
        var resolveBtn = host.createElement("button");
        resolveBtn.type = "button";
        resolveBtn.className = "rte-comment-action rte-comment-resolve";
        resolveBtn.textContent = "Resolve";
        resolveBtn.addEventListener("mousedown", function (e) { e.preventDefault(); resolveComment(entry.id); });
        var delBtn = host.createElement("button");
        delBtn.type = "button";
        delBtn.className = "rte-comment-action rte-comment-delete";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("mousedown", function (e) { e.preventDefault(); deleteComment(entry.id); });
        actions.appendChild(resolveBtn);
        actions.appendChild(delBtn);
        topRow.appendChild(actions);

        wrap.appendChild(topRow);

        if (entry.originalText) {
            var quote = host.createElement("div");
            quote.className = "rte-comment-quote";
            quote.textContent = truncate(entry.originalText, 140);
            quote.addEventListener("click", function () { scrollToSpan(entry.id); });
            wrap.appendChild(quote);
        }

        var body = host.createElement("div");
        body.className = "rte-comment-body";
        body.textContent = entry.text;
        wrap.appendChild(body);

        var replies = Array.isArray(entry.replies) ? entry.replies : [];
        for (var i = 0; i < replies.length; i++) {
            var rep = replies[i];
            var repEl = host.createElement("div");
            repEl.className = "rte-comment-reply";
            var repAv = host.createElement("span");
            repAv.className = "rte-comment-reply-avatar";
            repAv.style.background = (rep.author && rep.author.color) || "#64748b";
            repAv.textContent = initialsOf((rep.author && rep.author.name) || "?");
            var repBody = host.createElement("div");
            repBody.className = "rte-comment-reply-body";
            var repName = host.createElement("div");
            repName.className = "rte-comment-reply-name";
            repName.textContent = ((rep.author && rep.author.name) || "User") + " \u00B7 " + relativeTime(rep.createdAt);
            var repText = host.createElement("div");
            repText.className = "rte-comment-reply-text";
            repText.textContent = rep.text;
            repBody.appendChild(repName);
            repBody.appendChild(repText);
            repEl.appendChild(repAv);
            repEl.appendChild(repBody);
            wrap.appendChild(repEl);
        }

        // Reply composer
        var replyRow = host.createElement("div");
        replyRow.className = "rte-comment-reply-composer";
        var replyInput = host.createElement("input");
        replyInput.type = "text";
        replyInput.className = "rte-comment-reply-input";
        replyInput.placeholder = "Reply…";
        replyInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                var t = replyInput.value.replace(/^\s+|\s+$/g, "");
                if (t) replyToComment(entry.id, t);
                replyInput.value = "";
            }
        });
        replyRow.appendChild(replyInput);
        wrap.appendChild(replyRow);

        return wrap;
    }

    function scrollToSpan(commentId) {
        var span = editor.getEditable().querySelector('[data-comment-id="' + cssEscape(commentId) + '"]');
        if (!span) return;
        span.scrollIntoView({ block: "center", behavior: "smooth" });
        span.classList.add("rte-comment-flash");
        setTimeout(function () { span.classList.remove("rte-comment-flash"); }, 1200);
    }

    function initialsOf(label) {
        var parts = String(label).trim().split(/\s+/);
        if (!parts[0]) return "?";
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    function relativeTime(ts) {
        if (!ts) return "";
        var diff = Math.floor((Date.now() - ts) / 1000);
        if (diff < 60) return "just now";
        if (diff < 3600) return Math.floor(diff / 60) + "m ago";
        if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
        return Math.floor(diff / 86400) + "d ago";
    }

    function truncate(s, n) {
        if (s.length <= n) return s;
        return s.slice(0, n - 1) + "\u2026";
    }

    function injectStyles() {
        var host = (editor && editor.iframe && editor.iframe.ownerDocument) || document;
        if (!host.querySelector("style[data-rte-comments]")) {
            var style = host.createElement("style");
            style.setAttribute("data-rte-comments", "1");
            style.textContent = [
                ".rte-comment-sidebar-host{display:flex!important;align-items:stretch}",
                ".rte-comment-sidebar{width:300px;min-width:260px;max-width:340px;margin-left:12px;padding:0;background:#fafbff;border:1px solid rgba(15,23,42,.08);border-radius:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;color:#0f172a;display:flex;flex-direction:column;max-height:calc(100vh - 120px);overflow:hidden}",
                ".rte-comment-sidebar-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid rgba(15,23,42,.08);font-weight:600}",
                ".rte-comment-sidebar-title{font-size:14px}",
                ".rte-comment-sidebar-close{border:0;background:transparent;cursor:pointer;color:#64748b;padding:4px;border-radius:6px}",
                ".rte-comment-sidebar-close:hover{background:rgba(15,23,42,.05);color:#0f172a}",
                ".rte-comment-empty{padding:16px;color:#64748b;font-size:12px}",
                ".rte-comment-sidebar > :nth-child(n+2){overflow-y:auto}",
                ".rte-comment-item{padding:12px 14px;border-bottom:1px solid rgba(15,23,42,.06);transition:background 200ms ease}",
                ".rte-comment-item:last-child{border-bottom:0}",
                ".rte-comment-item-active{background:#eef2ff}",
                ".rte-comment-item-top{display:flex;align-items:center;gap:10px}",
                ".rte-comment-avatar{width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;flex:0 0 28px}",
                ".rte-comment-namewrap{flex:1;min-width:0}",
                ".rte-comment-name{font-weight:600;font-size:12px;line-height:1.2}",
                ".rte-comment-when{font-size:11px;color:#64748b}",
                ".rte-comment-actions{display:flex;gap:4px}",
                ".rte-comment-action{font-size:11px;padding:3px 8px;border-radius:6px;border:1px solid rgba(15,23,42,.1);background:#fff;cursor:pointer}",
                ".rte-comment-resolve{color:#1e40af;border-color:rgba(30,64,175,.2);background:#eef2ff}",
                ".rte-comment-delete{color:#991b1b;border-color:rgba(153,27,27,.2);background:#fee2e2}",
                ".rte-comment-quote{margin:6px 0;padding:6px 10px;background:rgba(255,245,157,.5);border-left:3px solid #f9a825;border-radius:4px;font-size:11px;color:#52525b;cursor:pointer}",
                ".rte-comment-quote:hover{background:rgba(255,238,88,.8)}",
                ".rte-comment-body{margin-top:6px;font-size:13px;line-height:1.45;color:#0f172a;white-space:pre-wrap}",
                ".rte-comment-reply{display:flex;gap:8px;margin-top:10px;padding-top:8px;border-top:1px dashed rgba(15,23,42,.08)}",
                ".rte-comment-reply-avatar{width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700;flex:0 0 22px}",
                ".rte-comment-reply-body{flex:1;min-width:0}",
                ".rte-comment-reply-name{font-size:11px;color:#64748b}",
                ".rte-comment-reply-text{font-size:12px;color:#0f172a;line-height:1.45;white-space:pre-wrap;margin-top:2px}",
                ".rte-comment-reply-composer{margin-top:8px;display:flex}",
                ".rte-comment-reply-input{flex:1;padding:6px 10px;border-radius:8px;border:1px solid rgba(15,23,42,.12);font:inherit;font-size:12px}",
                ".rte-comment-composer{position:absolute;z-index:2147483000;width:320px;background:#fff;border:1px solid rgba(15,23,42,.08);box-shadow:0 12px 32px rgba(15,23,42,.18);border-radius:10px;padding:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}",
                ".rte-comment-composer-header{font-weight:600;font-size:13px;margin-bottom:8px;color:#0f172a}",
                ".rte-comment-composer-textarea{width:100%;box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid rgba(15,23,42,.12);font:inherit;font-size:13px;resize:vertical;min-height:72px}",
                ".rte-comment-composer-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:8px}",
                ".rte-comment-btn{padding:6px 14px;border-radius:8px;border:1px solid rgba(15,23,42,.12);font:inherit;font-size:12px;cursor:pointer}",
                ".rte-comment-btn-ghost{background:#fff;color:#64748b}",
                ".rte-comment-btn-primary{background:#1d67ba;color:#fff;border-color:#1d67ba}"
            ].join("\n");
            host.head.appendChild(style);
        }

        var editdoc = editor.getDocument();
        if (editdoc && editdoc.head && !editdoc.querySelector("style[data-rte-comments-inline]")) {
            var iStyle = editdoc.createElement("style");
            iStyle.setAttribute("data-rte-comments-inline", "1");
            iStyle.textContent = [
                ".rte-comment{background:" + config.commentHighlightBg + ";border-bottom:2px solid " + config.commentHighlightBorder + ";cursor:pointer;padding:0 1px;border-radius:2px}",
                ".rte-comment:hover{background:rgba(253,230,138,.6)}",
                ".rte-comment-flash{animation:rte-comment-flash 1.2s ease}",
                "@keyframes rte-comment-flash{0%{background:rgba(251,191,36,.9)}100%{background:" + config.commentHighlightBg + "}}"
            ].join("\n");
            editdoc.head.appendChild(iStyle);
        }
    }
}
