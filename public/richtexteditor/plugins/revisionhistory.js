if (!window.RTE_DefaultConfig) window.RTE_DefaultConfig = {};

if (!RTE_DefaultConfig.svgCode_revisionhistory) {
    RTE_DefaultConfig.svgCode_revisionhistory = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v4l3 2"/></svg>';
}

RTE_DefaultConfig.plugin_revisionhistory = RTE_Plugin_RevisionHistory;

function RTE_Plugin_RevisionHistory() {
    var obj = this;
    var config;
    var editor;
    var dialog = null;
    var autoSnapshotTimer = null;
    var lastSnapshotHtml = "";

    obj.PluginName = "RevisionHistory";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        if (config.revisionHistoryEnabled === false) return;

        config.revisionHistoryMaxEntries = config.revisionHistoryMaxEntries || 50;
        config.revisionHistoryAutoSnapshotMs = config.revisionHistoryAutoSnapshotMs || 0;
        config.revisionHistoryUrl = config.revisionHistoryUrl || "";
        config.text_revisionhistory = config.text_revisionhistory || "Revision history";

        appendToolbarCommand("toolbar_default", "#{revisionhistory}");
        appendToolbarCommand("toolbar_full", "#{revisionhistory}");
        appendToolbarCommand("toolbar_mobile", "#{revisionhistory}");
        if ((config.controltoolbar_TEXT || "").indexOf("revisionhistory") === -1) {
            config.controltoolbar_TEXT = (config.controltoolbar_TEXT || "") + "|{revisionhistory}";
        }
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;
        if (config.revisionHistoryEnabled === false) return;

        editor.revisionHistory = {
            snapshot: function (label, metadata) { return snapshot(label, metadata); },
            promptAndSnapshot: function (defaultLabel) { return promptAndSnapshot(defaultLabel); },
            rename: function (id, label) { return rename(id, label); },
            list: function () { return getStore().slice().sort(function (a, b) { return (b.createdAt || 0) - (a.createdAt || 0); }); },
            listNamed: function () {
                return getStore().slice()
                    .filter(function (e) { return e.isNamed === true; })
                    .sort(function (a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });
            },
            get: function (id) { return findById(id); },
            restore: function (id, opts) { return restore(id, opts || {}); },
            delete: function (id) { return deleteEntry(id); },
            clear: function () { return clearAll(); },
            diff: function (idA, idB) { return diffBetween(idA, idB); },
            openBrowser: function () { openDialog(); },
            closeBrowser: function () { closeDialog(); }
        };

        editor.toolbarFactoryMap = editor.toolbarFactoryMap || {};
        editor.toolbarFactoryMap["revisionhistory"] = function (cmd) {
            return editor.createToolbarButton(cmd);
        };

        editor.attachEvent("exec_command_revisionhistory", function (state) {
            state.returnValue = true;
            state.stopBubble = true;
            openDialog();
        });

        injectStyles();
        restoreStore();
        lastSnapshotHtml = editor.getHTML ? editor.getHTML() : "";

        // Auto-snapshot on idle typing (opt-in).
        if (config.revisionHistoryAutoSnapshotMs > 0) {
            editor.getDocument().addEventListener("input", function () {
                if (autoSnapshotTimer) clearTimeout(autoSnapshotTimer);
                autoSnapshotTimer = setTimeout(function () {
                    var currentHtml = editor.getHTML();
                    if (currentHtml !== lastSnapshotHtml) {
                        snapshot("Auto", { auto: true });
                    }
                }, config.revisionHistoryAutoSnapshotMs);
            }, true);
        }

        // Keyboard shortcut: Ctrl/Cmd + Shift + H opens the browser.
        editor.getDocument().addEventListener("keydown", function (e) {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "H" || e.key === "h")) {
                e.preventDefault();
                openDialog();
            }
        }, true);
    };

    function appendToolbarCommand(toolbar, item) {
        if (!config[toolbar]) return;
        if (config[toolbar].indexOf(item) !== -1) return;
        config[toolbar] = config[toolbar] + item;
    }

    function getCurrentUser() {
        if (config.currentUser && config.currentUser.id) return config.currentUser;
        return { id: "user", name: "User", color: "#64748b" };
    }

    function getStoreKey() {
        var key = config.aiToolkitPersistenceKey || "default";
        return "RTE.Revisions." + key;
    }

    function getStore() {
        if (!editor.__revisions) editor.__revisions = [];
        return editor.__revisions;
    }

    function findById(id) {
        var store = getStore();
        for (var i = 0; i < store.length; i++) if (store[i].id === id) return store[i];
        return null;
    }

    function persistStore() {
        var store = getStore();
        // Trim oldest beyond max.
        while (store.length > config.revisionHistoryMaxEntries) {
            store.shift();
        }
        try {
            if (window.localStorage) {
                window.localStorage.setItem(getStoreKey(), JSON.stringify(store));
            }
        } catch (err) {
            console.warn("revisionhistory: localStorage quota or access issue:", err && err.message);
        }
        if (config.revisionHistoryUrl) {
            sendRemote(store);
        }
    }

    function sendRemote(store) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", config.revisionHistoryUrl, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({
                documentKey: config.aiToolkitPersistenceKey || "",
                savedAt: Date.now(),
                revisions: store
            }));
        } catch (err) {
            console.warn("revisionhistory: remote POST failed:", err);
        }
    }

    function restoreStore() {
        try {
            if (!window.localStorage) return;
            var raw = window.localStorage.getItem(getStoreKey());
            if (!raw) return;
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) editor.__revisions = parsed;
        } catch (ignore) { }
    }

    function snapshot(label, metadata) {
        var html = editor.getHTML ? editor.getHTML() : (editor.getHTMLCode ? editor.getHTMLCode() : "");
        var user = getCurrentUser();
        var trimmedLabel = (label || "").toString().slice(0, 120);
        var isNamed = trimmedLabel.length > 0 && (!metadata || metadata.auto !== true);
        var entry = {
            id: "rev-" + Date.now() + "-" + Math.floor(Math.random() * 10000),
            html: html,
            text: editor.getText ? editor.getText() : stripHtml(html),
            label: trimmedLabel || autoLabel(),
            isNamed: isNamed,
            author: { id: user.id, name: user.name, color: user.color },
            createdAt: Date.now(),
            metadata: metadata || {}
        };
        getStore().push(entry);
        lastSnapshotHtml = html;
        persistStore();
        if (dialog && dialog.isConnected) renderDialog();
        return entry;
    }

    // Prompt the user for a snapshot name via native window.prompt, then take a snapshot.
    // Returns the entry (or null if the user cancelled).
    function promptAndSnapshot(defaultLabel) {
        var iframeDoc = editor.iframe ? editor.iframe.ownerDocument : document;
        var win = iframeDoc.defaultView || window;
        var value = win.prompt("Name this version (e.g. \"Draft sent to legal\"):", defaultLabel || "");
        if (value === null) return null;
        var trimmed = (value || "").trim();
        if (!trimmed) return null;
        return snapshot(trimmed, { user: true });
    }

    // Update the label of an existing entry. Flips `isNamed` to true so the
    // "only named versions" filter picks it up.
    function rename(id, label) {
        var entry = findById(id);
        if (!entry) return false;
        var trimmed = (label || "").toString().trim().slice(0, 120);
        if (!trimmed) return false;
        entry.label = trimmed;
        entry.isNamed = true;
        persistStore();
        if (dialog && dialog.isConnected) renderDialog();
        return true;
    }

    // Return { oldText, newText, lines } — useful for callers building their own
    // side-by-side diff UI on top of the plugin's data.
    function diffBetween(idA, idB) {
        var a = findById(idA);
        var b = findById(idB);
        if (!a || !b) return null;
        var oldText = a.text || stripHtml(a.html);
        var newText = b.text || stripHtml(b.html);
        return {
            oldEntry: a,
            newEntry: b,
            oldText: oldText,
            newText: newText,
            lines: diffLines(oldText, newText)
        };
    }

    function autoLabel() {
        var d = new Date();
        function pad(n) { return n < 10 ? "0" + n : "" + n; }
        return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
    }

    function restore(id, opts) {
        var entry = findById(id);
        if (!entry) return false;
        if (!opts.skipConfirm) {
            var doc = editor.iframe ? editor.iframe.ownerDocument : document;
            if (!doc.defaultView.confirm("Restore this version? Your current content will be replaced (this itself is not auto-snapshotted).")) {
                return false;
            }
        }
        if (editor.setHTMLCode) editor.setHTMLCode(entry.html);
        else if (editor.setHTML) editor.setHTML(entry.html);
        lastSnapshotHtml = entry.html;
        if (dialog && dialog.isConnected) closeDialog();
        return true;
    }

    function deleteEntry(id) {
        var store = getStore();
        for (var i = 0; i < store.length; i++) {
            if (store[i].id === id) {
                store.splice(i, 1);
                persistStore();
                if (dialog && dialog.isConnected) renderDialog();
                return true;
            }
        }
        return false;
    }

    function clearAll() {
        editor.__revisions = [];
        persistStore();
        if (dialog && dialog.isConnected) renderDialog();
    }

    // --- Simple line-based diff (Hunt–McIlroy style LCS) ---

    function diffLines(oldText, newText) {
        var a = String(oldText || "").split(/\r?\n/);
        var b = String(newText || "").split(/\r?\n/);
        var out = [];
        var lcs = computeLcs(a, b);
        var i = 0, j = 0, k = 0;
        while (i < a.length && j < b.length) {
            if (k < lcs.length && a[i] === lcs[k] && b[j] === lcs[k]) {
                out.push({ type: "eq", text: a[i] });
                i++; j++; k++;
            } else if (k < lcs.length && a[i] !== lcs[k]) {
                out.push({ type: "del", text: a[i] });
                i++;
            } else if (k < lcs.length && b[j] !== lcs[k]) {
                out.push({ type: "add", text: b[j] });
                j++;
            } else {
                // past the LCS — drain the rest
                if (i < a.length) { out.push({ type: "del", text: a[i] }); i++; }
                else if (j < b.length) { out.push({ type: "add", text: b[j] }); j++; }
            }
        }
        while (i < a.length) { out.push({ type: "del", text: a[i] }); i++; }
        while (j < b.length) { out.push({ type: "add", text: b[j] }); j++; }
        return out;
    }

    function computeLcs(a, b) {
        // O(n*m) DP. Fine for a few hundred lines; acceptable for snapshot sizes in v1.
        var m = a.length, n = b.length;
        var row = new Array(n + 1).fill(0);
        var prev = new Array(n + 1).fill(0);
        // Backpointers compacted: store length matrix fully, then walk it back.
        var len = [];
        for (var i = 0; i <= m; i++) len.push(new Array(n + 1).fill(0));
        for (var i = 1; i <= m; i++) {
            for (var j = 1; j <= n; j++) {
                if (a[i - 1] === b[j - 1]) len[i][j] = len[i - 1][j - 1] + 1;
                else len[i][j] = Math.max(len[i - 1][j], len[i][j - 1]);
            }
        }
        var out = [];
        var i = m, j = n;
        while (i > 0 && j > 0) {
            if (a[i - 1] === b[j - 1]) { out.unshift(a[i - 1]); i--; j--; }
            else if (len[i - 1][j] >= len[i][j - 1]) i--;
            else j--;
        }
        return out;
    }

    function stripHtml(html) {
        var tmp = document.createElement("div");
        tmp.innerHTML = html || "";
        return tmp.innerText || tmp.textContent || "";
    }

    // --- Dialog UI ---

    function openDialog() {
        if (dialog && dialog.isConnected) return;
        var host = editor.iframe.ownerDocument;
        dialog = host.createElement("div");
        dialog.className = "rte-rev-dialog";
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-label", "Revision history");

        var backdrop = host.createElement("div");
        backdrop.className = "rte-rev-backdrop";
        backdrop.addEventListener("mousedown", function (e) {
            if (e.target === backdrop) closeDialog();
        });

        var panel = host.createElement("div");
        panel.className = "rte-rev-panel";
        backdrop.appendChild(panel);
        dialog.appendChild(backdrop);
        host.body.appendChild(dialog);
        renderDialog();
    }

    function closeDialog() {
        if (dialog && dialog.parentNode) dialog.parentNode.removeChild(dialog);
        dialog = null;
    }

    var dialogSelectedId = null;
    var dialogView = "preview"; // "preview" | "diff"

    function renderDialog() {
        if (!dialog) return;
        var host = dialog.ownerDocument;
        var panel = dialog.querySelector(".rte-rev-panel");
        panel.innerHTML = "";

        var header = host.createElement("div");
        header.className = "rte-rev-header";
        var title = host.createElement("div");
        title.className = "rte-rev-title";
        title.textContent = "Revision history";
        header.appendChild(title);
        var actions = host.createElement("div");
        actions.className = "rte-rev-header-actions";
        var snapBtn = host.createElement("button");
        snapBtn.type = "button";
        snapBtn.className = "rte-rev-btn rte-rev-btn-ghost";
        snapBtn.textContent = "Save version now";
        snapBtn.addEventListener("mousedown", function (e) {
            e.preventDefault();
            var label = host.defaultView.prompt("Label this version (optional):", "");
            if (label === null) return; // cancelled
            snapshot(label || "");
        });
        actions.appendChild(snapBtn);
        var closeBtn = host.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "rte-rev-btn rte-rev-btn-ghost";
        closeBtn.textContent = "Close";
        closeBtn.addEventListener("mousedown", function (e) { e.preventDefault(); closeDialog(); });
        actions.appendChild(closeBtn);
        header.appendChild(actions);
        panel.appendChild(header);

        var body = host.createElement("div");
        body.className = "rte-rev-body";

        // Left: list
        var list = host.createElement("div");
        list.className = "rte-rev-list";
        var entries = editor.revisionHistory.list();
        if (!entries.length) {
            var empty = host.createElement("div");
            empty.className = "rte-rev-empty";
            empty.textContent = "No revisions yet. Click \u201CSave version now\u201D to capture the current document.";
            list.appendChild(empty);
        } else {
            if (!dialogSelectedId || !findById(dialogSelectedId)) {
                dialogSelectedId = entries[0].id;
            }
            for (var i = 0; i < entries.length; i++) {
                (function (e) {
                    var row = host.createElement("button");
                    row.type = "button";
                    row.className = "rte-rev-row" + (e.id === dialogSelectedId ? " rte-rev-row-active" : "");
                    var dot = host.createElement("span");
                    dot.className = "rte-rev-dot";
                    dot.style.background = (e.author && e.author.color) || "#64748b";
                    var who = host.createElement("div");
                    who.className = "rte-rev-row-who";
                    who.textContent = (e.author && e.author.name) || "User";
                    var when = host.createElement("div");
                    when.className = "rte-rev-row-when";
                    when.textContent = formatDate(e.createdAt) + " \u00B7 " + (e.label || "");
                    var col = host.createElement("div");
                    col.className = "rte-rev-row-col";
                    col.appendChild(who);
                    col.appendChild(when);
                    row.appendChild(dot);
                    row.appendChild(col);
                    row.addEventListener("mousedown", function (ev) {
                        ev.preventDefault();
                        dialogSelectedId = e.id;
                        renderDialog();
                    });
                    list.appendChild(row);
                })(entries[i]);
            }
        }
        body.appendChild(list);

        // Right: preview + diff tabs
        var pane = host.createElement("div");
        pane.className = "rte-rev-pane";
        if (entries.length) {
            var selected = findById(dialogSelectedId) || entries[0];

            var tabs = host.createElement("div");
            tabs.className = "rte-rev-tabs";
            var tabPreview = host.createElement("button");
            tabPreview.type = "button";
            tabPreview.className = "rte-rev-tab" + (dialogView === "preview" ? " rte-rev-tab-active" : "");
            tabPreview.textContent = "Preview";
            tabPreview.addEventListener("mousedown", function (e) { e.preventDefault(); dialogView = "preview"; renderDialog(); });
            var tabDiff = host.createElement("button");
            tabDiff.type = "button";
            tabDiff.className = "rte-rev-tab" + (dialogView === "diff" ? " rte-rev-tab-active" : "");
            tabDiff.textContent = "Diff vs current";
            tabDiff.addEventListener("mousedown", function (e) { e.preventDefault(); dialogView = "diff"; renderDialog(); });
            tabs.appendChild(tabPreview);
            tabs.appendChild(tabDiff);
            pane.appendChild(tabs);

            var content = host.createElement("div");
            content.className = "rte-rev-content";
            if (dialogView === "preview") {
                var iframe = host.createElement("iframe");
                iframe.className = "rte-rev-preview-frame";
                iframe.setAttribute("title", "Revision preview");
                iframe.setAttribute("sandbox", "allow-same-origin");
                content.appendChild(iframe);
                // Write after appending so document is available.
                setTimeout(function () {
                    try {
                        iframe.contentDocument.open();
                        iframe.contentDocument.write(
                            '<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;padding:16px;color:#0f172a;line-height:1.6}img{max-width:100%}</style></head><body>' +
                            (selected.html || "") +
                            "</body></html>"
                        );
                        iframe.contentDocument.close();
                    } catch (err) { }
                }, 0);
            } else {
                var currentText = editor.getText ? editor.getText() : stripHtml(editor.getHTML());
                var diff = diffLines(selected.text || stripHtml(selected.html), currentText);
                var diffBox = host.createElement("pre");
                diffBox.className = "rte-rev-diff";
                for (var d = 0; d < diff.length; d++) {
                    var line = host.createElement("span");
                    line.className = "rte-rev-diff-line rte-rev-diff-" + diff[d].type;
                    line.textContent = (diff[d].type === "add" ? "+ " : diff[d].type === "del" ? "- " : "  ") + diff[d].text + "\n";
                    diffBox.appendChild(line);
                }
                content.appendChild(diffBox);
            }
            pane.appendChild(content);

            var footer = host.createElement("div");
            footer.className = "rte-rev-footer";
            var labelInfo = host.createElement("div");
            labelInfo.className = "rte-rev-footer-info";
            labelInfo.textContent = selected.label ? "Label: " + selected.label : "";
            var footerBtns = host.createElement("div");
            footerBtns.className = "rte-rev-footer-btns";
            var delBtn = host.createElement("button");
            delBtn.type = "button";
            delBtn.className = "rte-rev-btn rte-rev-btn-danger";
            delBtn.textContent = "Delete";
            delBtn.addEventListener("mousedown", function (e) { e.preventDefault(); deleteEntry(selected.id); });
            var restoreBtn = host.createElement("button");
            restoreBtn.type = "button";
            restoreBtn.className = "rte-rev-btn rte-rev-btn-primary";
            restoreBtn.textContent = "Restore this version";
            restoreBtn.addEventListener("mousedown", function (e) { e.preventDefault(); restore(selected.id); });
            footerBtns.appendChild(delBtn);
            footerBtns.appendChild(restoreBtn);
            footer.appendChild(labelInfo);
            footer.appendChild(footerBtns);
            pane.appendChild(footer);
        }
        body.appendChild(pane);
        panel.appendChild(body);
    }

    function formatDate(ts) {
        if (!ts) return "";
        var d = new Date(ts);
        var now = new Date();
        function pad(n) { return n < 10 ? "0" + n : "" + n; }
        var time = pad(d.getHours()) + ":" + pad(d.getMinutes());
        if (d.toDateString() === now.toDateString()) return "Today " + time;
        return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + time;
    }

    // --- styles ---

    function injectStyles() {
        var host = (editor && editor.iframe && editor.iframe.ownerDocument) || document;
        if (host.querySelector("style[data-rte-revisionhistory]")) return;
        var style = host.createElement("style");
        style.setAttribute("data-rte-revisionhistory", "1");
        style.textContent = [
            ".rte-rev-dialog{position:fixed;inset:0;z-index:2147483600;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;color:#0f172a}",
            ".rte-rev-backdrop{position:absolute;inset:0;background:rgba(15,23,42,.35);display:flex;align-items:center;justify-content:center;padding:24px}",
            ".rte-rev-panel{background:#fff;border-radius:14px;width:100%;max-width:980px;max-height:86vh;display:flex;flex-direction:column;box-shadow:0 24px 48px rgba(15,23,42,.3);overflow:hidden}",
            ".rte-rev-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid rgba(15,23,42,.08)}",
            ".rte-rev-title{font-size:15px;font-weight:600}",
            ".rte-rev-header-actions{display:flex;gap:8px}",
            ".rte-rev-btn{padding:7px 14px;border-radius:8px;border:1px solid rgba(15,23,42,.12);font:inherit;font-size:12px;cursor:pointer;background:#fff;color:#0f172a}",
            ".rte-rev-btn-ghost{background:#fff;color:#33506f}",
            ".rte-rev-btn-primary{background:#1d67ba;color:#fff;border-color:#1d67ba}",
            ".rte-rev-btn-danger{background:#fee2e2;color:#991b1b;border-color:rgba(153,27,27,.2)}",
            ".rte-rev-body{display:flex;flex:1;min-height:0}",
            ".rte-rev-list{width:240px;border-right:1px solid rgba(15,23,42,.08);overflow-y:auto;background:#fafbff}",
            ".rte-rev-empty{padding:18px;color:#64748b;font-size:12px;line-height:1.5}",
            ".rte-rev-row{display:flex;align-items:center;gap:8px;width:100%;padding:10px 12px;border:0;border-bottom:1px solid rgba(15,23,42,.05);background:transparent;text-align:left;cursor:pointer;font:inherit;color:inherit}",
            ".rte-rev-row:hover{background:#eef2ff}",
            ".rte-rev-row-active{background:#eef2ff}",
            ".rte-rev-dot{width:8px;height:8px;border-radius:50%;flex:0 0 8px}",
            ".rte-rev-row-col{flex:1;min-width:0}",
            ".rte-rev-row-who{font-weight:600;font-size:12px;line-height:1.2}",
            ".rte-rev-row-when{font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
            ".rte-rev-pane{flex:1;display:flex;flex-direction:column;min-width:0}",
            ".rte-rev-tabs{display:flex;gap:4px;padding:10px 14px 0;border-bottom:1px solid rgba(15,23,42,.08)}",
            ".rte-rev-tab{padding:7px 14px;border:0;background:transparent;border-bottom:2px solid transparent;font:inherit;font-size:12px;color:#64748b;cursor:pointer}",
            ".rte-rev-tab-active{color:#0f172a;border-bottom-color:#1d67ba;font-weight:600}",
            ".rte-rev-content{flex:1;overflow:auto;padding:0}",
            ".rte-rev-preview-frame{width:100%;height:100%;min-height:360px;border:0;display:block}",
            ".rte-rev-diff{margin:0;padding:14px 16px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;line-height:1.5;white-space:pre-wrap;color:#0f172a;background:#fafbff;min-height:100%}",
            ".rte-rev-diff-line{display:block}",
            ".rte-rev-diff-add{background:#dcfce7;color:#166534}",
            ".rte-rev-diff-del{background:#fee2e2;color:#991b1b}",
            ".rte-rev-diff-eq{color:#475569}",
            ".rte-rev-footer{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-top:1px solid rgba(15,23,42,.08);background:#fafbff}",
            ".rte-rev-footer-info{font-size:12px;color:#64748b}",
            ".rte-rev-footer-btns{display:flex;gap:8px}"
        ].join("\n");
        host.head.appendChild(style);
    }
}
