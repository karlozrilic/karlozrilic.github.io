if (!window.RTE_DefaultConfig) window.RTE_DefaultConfig = {};

if (!RTE_DefaultConfig.svgCode_aiassist) {
    RTE_DefaultConfig.svgCode_aiassist = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5v2.6"/><path d="M8.2 7.1V6.5a3.8 3.8 0 017.6 0v.6"/><rect x="5.5" y="7.1" width="13" height="10.7" rx="3.2"/><circle cx="10" cy="12" r="1"/><circle cx="14" cy="12" r="1"/><path d="M9.2 15.1c.9.8 1.8 1.2 2.8 1.2s1.9-.4 2.8-1.2"/><path d="M8.2 20.3l1.1-2.5"/><path d="M15.8 20.3l-1.1-2.5"/></svg>';
}

if (!RTE_DefaultConfig.svgCode_aiassist_open_dialog) {
    RTE_DefaultConfig.svgCode_aiassist_open_dialog = RTE_DefaultConfig.svgCode_aiassist;
}
if (!RTE_DefaultConfig.svgCode_aiassist_review) {
    RTE_DefaultConfig.svgCode_aiassist_review = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 6.5h13"/><path d="M5.5 11.5h8"/><path d="M5.5 16.5h6"/><path d="M16.5 14.2l1.8 1.8 3.2-4.2"/></svg>';
}
if (!RTE_DefaultConfig.svgCode_aiassist_chat) {
    RTE_DefaultConfig.svgCode_aiassist_chat = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.2a3 3 0 013 3v.9h1.3a3.2 3.2 0 013.2 3.2v4.8a3.2 3.2 0 01-3.2 3.2H9.9l-3.8 2.8v-2.8H6a3.2 3.2 0 01-3.2-3.2v-4.8A3.2 3.2 0 016 7.1h1V6.2a3 3 0 013-3"/><circle cx="10" cy="12" r="1"/><circle cx="14" cy="12" r="1"/><path d="M8.7 15.2c.9.7 1.9 1 3.3 1 1.3 0 2.4-.3 3.3-1"/></svg>';
}
if (!RTE_DefaultConfig.svgCode_aiassist_proofread) {
    RTE_DefaultConfig.svgCode_aiassist_proofread = '<svg viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="4.5"/><path d="M14 14l5 5"/><path d="M8.8 10.5l1.2 1.3 2.3-2.5"/></svg>';
}
if (!RTE_DefaultConfig.svgCode_aiassist_rewrite) {
    RTE_DefaultConfig.svgCode_aiassist_rewrite = '<svg viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h11"/><path d="M4 12h8"/><path d="M4 17h11"/><path d="M16 5l4 4-6.5 6.5H9.5v-4z"/></svg>';
}
if (!RTE_DefaultConfig.svgCode_aiassist_translate) {
    RTE_DefaultConfig.svgCode_aiassist_translate = '<svg viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 6.5h10"/><path d="M8 4v2.5"/><path d="M11 6.5c-.6 2.9-2.2 5.3-4.7 7.1"/><path d="M6.5 10.5c1.2.9 2.5 1.6 3.9 2.1"/><path d="M14.5 9.5h5"/><path d="M17 7v2.5"/><path d="M15 19l2-4.5 2 4.5"/><path d="M15.8 17.2h2.4"/></svg>';
}
if (!RTE_DefaultConfig.svgCode_aiassist_comment) {
    RTE_DefaultConfig.svgCode_aiassist_comment = '<svg viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7.5A3.5 3.5 0 019.5 4h8A3.5 3.5 0 0121 7.5v5a3.5 3.5 0 01-3.5 3.5H12l-4.5 3v-3H6A3.5 3.5 0 012.5 12.5v-5A3.5 3.5 0 016 4"/><path d="M8 9h8"/><path d="M8 12h5"/></svg>';
}
if (!RTE_DefaultConfig.svgCode_aiassist_paragraph) {
    RTE_DefaultConfig.svgCode_aiassist_paragraph = '<svg viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h8"/><path d="M5 12h14"/><path d="M5 17h10"/><path d="M18 5v6"/><path d="M15 8h6"/></svg>';
}
if (!RTE_DefaultConfig.svgCode_aiassist_justify) {
    RTE_DefaultConfig.svgCode_aiassist_justify = '<svg viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14"/><path d="M5 11h14"/><path d="M5 15h9"/><path d="M16 14l2 2 3-4"/></svg>';
}

RTE_DefaultConfig.plugin_aitoolkit = RTE_Plugin_AIToolkit;

function RTE_Plugin_AIToolkit() {
    var obj = this;
    var config;
    var editor;

    obj.PluginName = "AIToolkit";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        if (config.aiToolkitEnabled === false) {
            return;
        }

        config.text_aiassist = config.text_aiassist || "Ask AI";
        config.text_aireview = config.text_aireview || "AI Review";
        config.text_aichat = config.text_aichat || "AI Chat";
        config.aiToolkitTranslateLanguages = config.aiToolkitTranslateLanguages || [
            { value: "spanish", label: "Spanish" },
            { value: "french", label: "French" },
            { value: "german", label: "German" },
            { value: "italian", label: "Italian" },
            { value: "portuguese", label: "Portuguese" },
            { value: "japanese", label: "Japanese" }
        ];
        config.aiToolkitActions = config.aiToolkitActions || [
            { id: "chat-panel", section: "Chat", icon: "chat", title: "AI Chat", description: "Open a docked AI chat panel for multi-turn document help.", target: "chat-panel" },
            { id: "open-dialog", section: "Review", icon: "open_dialog", title: "Ask AI", description: "Open the full AI review dialog.", target: "dialog" },
            { id: "review-panel", section: "Review", icon: "review", title: "AI Review", description: "Open the persistent AI suggestion queue for this editor.", target: "review-panel" },
            { id: "proofread", section: "Review", icon: "proofread", title: "Proofread", description: "Preview a cleanup of the current selection.", resolverMode: "proofread", target: "selection-preview" },
            { id: "rewrite", section: "Review", icon: "rewrite", title: "Adjust selection", description: "Rewrite the current selection for clarity.", resolverMode: "rewrite", target: "selection-preview" },
            { id: "translate", section: "Review", icon: "translate", title: "Translate", description: "Open Ask AI with a target-language translation review flow.", resolverMode: "translate", target: "dialog", autoRun: false },
            { id: "justify", section: "Review", icon: "justify", title: "Justify edit", description: "Open Ask AI with a rewrite-focused review flow and explanation.", resolverMode: "justify", target: "dialog", autoRun: false },
            { id: "comment", section: "Insert", icon: "comment", title: "Add AI comment", description: "Insert a comment-style AI note near the selection.", resolverMode: "comment", target: "comment" },
            { id: "paragraph", section: "Insert", icon: "paragraph", title: "Add new paragraph", description: "Generate a short supporting paragraph below the selection.", resolverMode: "paragraph", target: "insert" }
        ];
        config.aiToolkitChatPrompts = config.aiToolkitChatPrompts || [
            { id: "summarize", label: "Summarize", prompt: "Summarize the current content and suggest the clearest next edit." },
            { id: "proofread", label: "Proofread", prompt: "Proofread the current content and prepare a cleaner version I can review." },
            { id: "translate", label: "Translate", prompt: "Translate the current content into Spanish and prepare a reviewable version." },
            { id: "headings", label: "Suggest headings", prompt: "Suggest better section titles and subheadings for this content." },
            { id: "expand", label: "Expand", prompt: "Add a short supporting paragraph that strengthens this content." }
        ];
        config.aiToolkitDialogModes = config.aiToolkitDialogModes || [
            { id: "proofread", title: "Proofread", description: "Clean up grammar, spacing, and readability issues." },
            { id: "rewrite", title: "Rewrite", description: "Rewrite the selection for clarity while preserving intent." },
            { id: "translate", title: "Translate", description: "Prepare a translated version in a target language while keeping the original nearby for review." },
            { id: "justify", title: "Justify edit", description: "Generate a rewrite plus an explicit explanation for the change." },
            { id: "shorten", title: "Shorten", description: "Compress the source text into a tighter version." },
            { id: "expand", title: "Expand", description: "Add supporting detail below the current draft." },
            { id: "summarize", title: "Summarize", description: "Turn the source into a compact summary." }
        ];
        config.aiToolkitResolver = config.aiToolkitResolver || null;
        config.aiToolkitOperationHandlers = config.aiToolkitOperationHandlers || {};
        config.aiToolkitPersistenceKey = config.aiToolkitPersistenceKey || "";
        config.aiToolkitReviewSyncInterval = config.aiToolkitReviewSyncInterval || 15000;
        config.aiToolkitSuggestionLedgerUrl = config.aiToolkitSuggestionLedgerUrl || "";
        config.aiToolkitReviewLogUrl = config.aiToolkitReviewLogUrl || "";

        appendToolbarCommand("toolbar_default", "#{aiassist}");
        appendToolbarCommand("toolbar_basic", "#{aiassist}");
        appendToolbarCommand("toolbar_full", "#{aiassist}");
        appendToolbarCommand("toolbar_mobile", "#{aiassist}");

        if ((config.controltoolbar_TEXT || "").indexOf("aiassist") === -1) {
            config.controltoolbar_TEXT = (config.controltoolbar_TEXT || "") + "|{aiassist}";
        }

        config.toolbarfactory_aiassist = function (cmd, suffix, ownerElement) {
            var toolbarEditor = this;
            return toolbarEditor.createToolbarItemDropDownPanel(cmd, function (panel) {
                renderActionMenu(panel);
            });
        };
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;
        editor.aiToolkit = {
            normalizeText: normalizeText,
            ensureSentence: ensureSentence,
            buildDemoResult: buildDemoResult,
            getTranslateLanguages: getTranslateLanguages,
            getTranslateLanguageLabel: getTranslateLanguageLabel,
            getOperationContract: getOperationContract,
            getActionDefinitions: getActionDefinitions,
            registerAction: registerActionDefinition,
            removeAction: removeActionDefinition,
            getDialogModes: getDialogModes,
            registerDialogMode: registerDialogModeDefinition,
            removeDialogMode: removeDialogModeDefinition,
            resolveAction: function (actionId, options) {
                return resolveAction(actionId, options);
            },
            loadSelectionText: function () {
                var snapshot = captureSelectionSnapshot();
                return snapshot.text || snapshot.wholeText;
            },
            loadDocumentText: function () {
                return normalizeText(editor.getText ? editor.getText() : "");
            },
            textToHtml: function (text) {
                return textToHtml(text);
            },
            previewInlineSuggestion: function (result, options) {
                return previewInlineSuggestion(result, options);
            },
            applyResult: function (result, options) {
                return applyResult(result, options);
            },
            executeOperations: function (operations, options) {
                return executeOperations(operations, options);
            },
            executeResolvedAction: function (resolved, options) {
                return executeResolvedAction(resolved, options);
            },
            registerOperationHandler: registerOperationHandler,
            unregisterOperationHandler: unregisterOperationHandler,
            getSuggestions: function () {
                return getSuggestionStore().slice();
            },
            clearSuggestions: function () {
                return clearSuggestionStore();
            },
            getReviewLogEntries: function () {
                return getReviewLogEntries().slice();
            },
            setResolver: function (resolver) {
                config.aiToolkitResolver = typeof resolver === "function" ? resolver : null;
            },
            openChatPanel: function (options) {
                openChatPanel(options);
            },
            closeChatPanel: function () {
                closeChatPanel();
            },
            toggleChatPanel: function (options) {
                toggleChatPanel(options);
            },
            openReviewPanel: function (options) {
                openReviewPanel(options);
            },
            closeReviewPanel: function () {
                closeReviewPanel();
            },
            toggleReviewPanel: function (options) {
                toggleReviewPanel(options);
            },
            saveSuggestionLedger: function () {
                return persistSuggestionStore();
            },
            loadSuggestionLedger: function () {
                return restoreSuggestionStore();
            },
            loadRemoteSuggestionLedger: function (force, callback) {
                return loadRemoteSuggestionLedger(force, callback);
            },
            loadReviewLogEntries: function (force, callback) {
                return loadReviewLogEntries(force, callback);
            },
            refreshRemoteReviewState: function (force, callback) {
                return refreshRemoteReviewState(force, callback);
            },
            openDialog: function () {
                openDialog();
            },
            runQuickAction: function (actionId, options) {
                return runQuickAction(actionId, options);
            },
            setAgent: function (agent) {
                config.aiToolkitAgent = typeof agent === "function" ? agent : null;
            },
            runAgent: function (prompt, options) {
                return runAgent(prompt, options);
            },
            streamRequest: function (options) {
                return streamAiRequest(options);
            },
            exportDocx: function (options) {
                return exportDocx(options);
            }
        };

        // Shared review ledger — the AI toolkit owns the store, but other plugins
        // (e.g. human Track Changes) add their own entries here so the Review drawer
        // shows AI + human suggestions in one unified list.
        editor.reviewLedger = {
            add: function (entry) {
                var normalized = normalizeLedgerEntry(entry);
                if (!normalized) return null;
                var store = getSuggestionStore();
                for (var i = 0; i < store.length; i++) {
                    if (store[i].id === normalized.id) { store[i] = normalized; break; }
                }
                if (i === store.length) store.push(normalized);
                persistSuggestionStore();
                if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                    renderReviewPanel(false);
                }
                return normalized;
            },
            update: function (id, patch) {
                var store = getSuggestionStore();
                for (var i = 0; i < store.length; i++) {
                    if (store[i].id !== id) continue;
                    for (var k in patch) if (Object.prototype.hasOwnProperty.call(patch, k)) {
                        store[i][k] = patch[k];
                    }
                    persistSuggestionStore();
                    if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                        renderReviewPanel(false);
                    }
                    return store[i];
                }
                return null;
            },
            remove: function (id) {
                var store = getSuggestionStore();
                for (var i = 0; i < store.length; i++) {
                    if (store[i].id === id) {
                        store.splice(i, 1);
                        persistSuggestionStore();
                        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                            renderReviewPanel(false);
                        }
                        return true;
                    }
                }
                return false;
            },
            get: function (id) {
                var store = getSuggestionStore();
                for (var i = 0; i < store.length; i++) if (store[i].id === id) return store[i];
                return null;
            },
            list: function (filter) {
                var store = getSuggestionStore().slice();
                if (!filter) return store;
                return store.filter(function (e) {
                    if (filter.author && e.author && e.author.id !== filter.author) return false;
                    if (filter.status && e.status !== filter.status) return false;
                    if (filter.changeType && e.changeType !== filter.changeType) return false;
                    return true;
                });
            },
            refreshPanel: function () {
                if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                    renderReviewPanel(false);
                }
            }
        };

        editor.attachEvent("exec_command_aiassist", function (state) {
            state.returnValue = true;
            state.stopBubble = true;
            openDialog();
        });

        editor.attachEvent("exec_command_aichat", function (state) {
            state.returnValue = true;
            state.stopBubble = true;
            openChatPanel({ focusComposer: true });
        });

        editor.getEditable().addEventListener("click", function (e) {
            var wrapper = e.target && e.target.closest ? e.target.closest("[data-rte-ai-suggestion-id]") : null;
            if (!wrapper) {
                return;
            }

            var suggestionId = wrapper.getAttribute("data-rte-ai-suggestion-id");
            if (!suggestionId || !findSuggestionById(suggestionId)) {
                return;
            }

            var actionNode = e.target && e.target.closest ? e.target.closest("[data-rte-ai-action]") : null;
            if (!actionNode) {
                var preferredAction = getPreferredReviewActionFocus();
                var currentInlineFocus = wrapper.ownerDocument ? wrapper.ownerDocument.activeElement : null;
                if (currentInlineFocus && currentInlineFocus.getAttribute && editor.getEditable().contains(currentInlineFocus)) {
                    preferredAction = currentInlineFocus.getAttribute("data-rte-ai-action") || preferredAction;
                }
                if (editor.__aiReviewEmptyPreviewSuggestionId && suggestionId === editor.__aiReviewEmptyPreviewSuggestionId) {
                    activateReviewSuggestionWithDefaultActionFocus(suggestionId, {
                        focusPanel: true,
                        focusAction: preferredAction || getPreferredReviewActionFocus(),
                        openedQueue: true
                    });
                    return;
                }
                setActiveSuggestionId(suggestionId);
                if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                    renderReviewPanel(false);
                }
                if (focusDefaultInlineReviewAction(suggestionId, preferredAction)) {
                    return;
                }
                focusInlineSuggestionWrapper(wrapper);
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            var action = actionNode.getAttribute("data-rte-ai-action");
            var continuationId = "";
            var wasCurrentReviewTarget = editor.__aiActiveSuggestionId === suggestionId;
            if ((action === "accept" || action === "reject") && wasCurrentReviewTarget) {
                continuationId = getNextInlineReviewSuggestionId(suggestionId);
            }
            if (action === "accept") {
                if (acceptInlineSuggestion(suggestionId)) {
                    if (continuationId) {
                        locateSuggestion(continuationId, { focusInlineAction: action });
                    }
                    else if (wasCurrentReviewTarget) {
                        announceReviewStatus(buildInlineQueueCompleteAnnouncement("Accepted", suggestionId));
                    }
                }
            }
            else if (action === "reject") {
                if (rejectInlineSuggestion(suggestionId)) {
                    if (continuationId) {
                        locateSuggestion(continuationId, { focusInlineAction: action });
                    }
                    else if (wasCurrentReviewTarget) {
                        announceReviewStatus(buildInlineQueueCompleteAnnouncement("Rejected", suggestionId));
                    }
                }
            }
            else if (action === "review") {
                activateReviewSuggestion(suggestionId, {
                    focusPanel: true,
                    focusAction: getDefaultReviewActionName(findSuggestionById(suggestionId))
                });
            }
            else if (action === "previous") {
                if (!locatePreviousInlineReviewSuggestion(suggestionId, { focusInlineAction: action })) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(suggestionId, "previous"));
                }
            }
            else if (action === "next") {
                if (!locateNextInlineReviewSuggestion(suggestionId, { focusInlineAction: action })) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(suggestionId, "next"));
                }
            }
            else if (action === "shared-seen") {
                markReviewActivitySeen();
                updateActiveSuggestionDecorations();
                if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                    renderReviewPanel(false);
                }
                announceReviewStatus("Shared AI review updates cleared for the current item.");
                focusInlineSuggestionWrapper(wrapper);
            }
            else if (action === "undo") {
                undoLastReviewDecision({ focusInlineAction: "undo" });
            }
            else if (action === "redo") {
                redoLastReviewDecision({ focusInlineAction: "redo" });
            }
        });

        editor.getEditable().addEventListener("keydown", function (e) {
            var wrapper = e.target && e.target.closest ? e.target.closest(".rte-ai-inline-preview") : (e.target && e.target.classList && e.target.classList.contains("rte-ai-inline-preview") ? e.target : null);
            if (!wrapper) {
                return;
            }
            var inlineActionNode = e.target && e.target.closest ? e.target.closest("[data-rte-ai-action]") : null;

            var suggestionId = wrapper.getAttribute("data-rte-ai-suggestion-id");
            if (!suggestionId || !findSuggestionById(suggestionId) || e.ctrlKey || e.metaKey || e.altKey) {
                return;
            }

            var key = (e.key || "").toLowerCase();
            var preferredInlineAction = inlineActionNode && inlineActionNode.getAttribute
                ? (inlineActionNode.getAttribute("data-rte-ai-action") || "")
                : "";
            var preferredRecoveryInlineAction = preferredInlineAction || getDefaultInlineReviewActionName(findSuggestionById(suggestionId));
            var isPreviewTarget = !!(editor.__aiReviewEmptyPreviewSuggestionId && suggestionId === editor.__aiReviewEmptyPreviewSuggestionId);
            if (isPreviewTarget) {
                if (key === "enter" || key === " ") {
                    e.preventDefault();
                    activateReviewSuggestionWithDefaultActionFocus(suggestionId, {
                        focusPanel: true,
                        focusAction: preferredInlineAction || getPreferredReviewActionFocus(),
                        openedQueue: true
                    });
                }
                return;
            }
            if (key === "arrowleft" || key === "k") {
                e.preventDefault();
                if (!locatePreviousInlineReviewSuggestion(suggestionId, { focusInlineAction: preferredInlineAction })) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(suggestionId, "previous"));
                }
            }
            else if (key === "arrowright" || key === "j") {
                e.preventDefault();
                if (!locateNextInlineReviewSuggestion(suggestionId, { focusInlineAction: preferredInlineAction })) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(suggestionId, "next"));
                }
            }
            else if (key === "home") {
                e.preventDefault();
                if (!locateFirstInlineReviewSuggestion(suggestionId, { focusInlineAction: preferredInlineAction })) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(suggestionId, "first"));
                }
            }
            else if (key === "end") {
                e.preventDefault();
                if (!locateLastInlineReviewSuggestion(suggestionId, { focusInlineAction: preferredInlineAction })) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(suggestionId, "last"));
                }
            }
            else if (key === "a") {
                e.preventDefault();
                var nextSuggestionId = getNextInlineReviewSuggestionId(suggestionId);
                if (acceptInlineSuggestion(suggestionId)) {
                    if (nextSuggestionId) {
                        locateSuggestion(nextSuggestionId, { focusInlineAction: preferredInlineAction });
                    }
                    else {
                        announceReviewStatus(buildInlineQueueCompleteAnnouncement("Accepted", suggestionId));
                    }
                }
            }
            else if (key === "r") {
                e.preventDefault();
                var followingSuggestionId = getNextInlineReviewSuggestionId(suggestionId);
                if (rejectInlineSuggestion(suggestionId)) {
                    if (followingSuggestionId) {
                        locateSuggestion(followingSuggestionId, { focusInlineAction: preferredInlineAction });
                    }
                    else {
                        announceReviewStatus(buildInlineQueueCompleteAnnouncement("Rejected", suggestionId));
                    }
                }
            }
            else if (key === "u" && !e.shiftKey && hasUndoableReviewShortcut()) {
                e.preventDefault();
                undoLastReviewDecision({ focusInlineAction: preferredRecoveryInlineAction || "accept" });
            }
            else if (key === "u" && e.shiftKey) {
                var redoableInlineDecision = getRedoableReviewDecision();
                if (redoableInlineDecision && redoableInlineDecision.suggestion && redoableInlineDecision.suggestion.id === suggestionId) {
                    e.preventDefault();
                    redoLastReviewDecision({ focusInlineAction: preferredRecoveryInlineAction || "accept" });
                }
            }
            else if (key === "g") {
                if (getSuggestionRemoteUpdateCount(suggestionId)) {
                    e.preventDefault();
                    markReviewActivitySeen();
                    updateActiveSuggestionDecorations();
                    if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                        renderReviewPanel(false);
                    }
                    announceReviewStatus("Shared AI review updates cleared for the current item.");
                    focusInlineSuggestionWrapper(wrapper);
                }
            }
            else if (key === "enter" || key === " ") {
                if (inlineActionNode) {
                    return;
                }
                e.preventDefault();
                focusDefaultInlineReviewAction(suggestionId, preferredInlineAction || getPreferredReviewActionFocus());
            }
        });

        restoreSuggestionStore();
        refreshRemoteReviewState(false);
        bindRemoteReviewSyncEvents();
        startRemoteReviewSync();
    };

    function appendToolbarCommand(key, token) {
        var current = config[key] || "";
        if (current.indexOf("aiassist") !== -1) {
            return;
        }
        config[key] = current ? current + " " + token : token;
    }

    function append(parent, tagName, cssText, className, text) {
        var node = parent.ownerDocument.createElement(tagName);
        if (cssText) {
            node.style.cssText = cssText;
        }
        if (className) {
            node.className = className;
        }
        if (typeof text !== "undefined") {
            node.innerText = text;
        }
        parent.appendChild(node);
        return node;
    }

    function appendPanelSectionLabel(parent, className, text) {
        var node = append(parent, "div", "", className, text);
        node.setAttribute("aria-hidden", "true");
        return node;
    }

    function appendReviewControlGroup(parent, className, text) {
        var node = append(parent, "div", "", className);
        if (text) {
            node.setAttribute("data-rte-ai-review-group-label", text);
        }
        return append(node, "div", "", "rte-ai-review-control-group-body");
    }

    function appendReviewHeaderGroup(parent, className, text) {
        var node = append(parent, "div", "", className);
        if (text) {
            append(node, "div", "", "rte-ai-review-header-group-label", text);
        }
        return append(node, "div", "", "rte-ai-review-header-group-body");
    }

    function getActionIconSvg(action) {
        if (!action) {
            return config.svgCode_aiassist || "";
        }

        var iconKey = action.icon || action.id || "open_dialog";
        return config["svgCode_aiassist_" + iconKey] || config.svgCode_aiassist || "";
    }

    /**
     * Consume a Server-Sent Events stream from the RichTextBox AI streaming
     * endpoint. Yields each text delta to `onDelta`, the final structured
     * response to `onResponse` (if the server emitted one), and fires `onDone`
     * when the stream closes. Returns an object with an `abort()` method and a
     * `promise` that resolves to the concatenated full text.
     *
     *   editor.aiToolkit.streamRequest({
     *     url: "/richtextbox/ai/stream",
     *     body: { mode: "rewrite", selectionText: "..." },
     *     onDelta: function (text) { ... },
     *     onResponse: function (response) { ... },
     *     onDone: function (fullText) { ... },
     *     onError: function (err) { ... }
     *   });
     *
     * Non-streaming providers still work — the server emits one data frame
     * plus a "response" event instead of incremental deltas.
     */
    function streamAiRequest(options) {
        options = options || {};
        var url = options.url || "/richtextbox/ai/stream";
        var body = options.body || {};
        var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
        var fullText = "";

        var p = (function () {
            // If fetch or ReadableStream isn't available, fall back to the
            // non-streaming endpoint so the helper is still callable.
            if (typeof fetch !== "function" || typeof ReadableStream === "undefined") {
                return fetchFallback(url, body, options);
            }

            return fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "text/event-stream" },
                body: JSON.stringify(body),
                signal: controller ? controller.signal : undefined,
                credentials: "same-origin"
            }).then(function (res) {
                if (!res.ok) {
                    throw new Error("AI stream failed: HTTP " + res.status);
                }
                if (!res.body || typeof res.body.getReader !== "function") {
                    // Server returned non-streaming body (old client / proxy buffered).
                    return res.text().then(function (text) {
                        if (options.onDelta) options.onDelta(text);
                        fullText = text;
                        if (options.onDone) options.onDone(fullText);
                        return fullText;
                    });
                }

                var reader = res.body.getReader();
                var decoder = new TextDecoder("utf-8");
                var buffer = "";

                function pump() {
                    return reader.read().then(function (chunk) {
                        if (chunk.done) {
                            if (options.onDone) options.onDone(fullText);
                            return fullText;
                        }
                        buffer += decoder.decode(chunk.value, { stream: true });

                        // Each SSE frame ends with a blank line (\n\n).
                        var frameEnd;
                        while ((frameEnd = buffer.indexOf("\n\n")) >= 0) {
                            var rawFrame = buffer.slice(0, frameEnd);
                            buffer = buffer.slice(frameEnd + 2);
                            handleFrame(rawFrame);
                        }
                        return pump();
                    });
                }

                function handleFrame(raw) {
                    var eventName = "message";
                    var dataLines = [];
                    var lines = raw.split("\n");
                    for (var i = 0; i < lines.length; i++) {
                        var line = lines[i];
                        if (line.indexOf("event:") === 0) eventName = line.slice(6).trim();
                        else if (line.indexOf("data:") === 0) dataLines.push(line.slice(5).trim());
                    }
                    if (dataLines.length === 0) return;
                    var dataStr = dataLines.join("\n");

                    var payload;
                    try { payload = JSON.parse(dataStr); }
                    catch (e) { payload = dataStr; }

                    if (eventName === "message") {
                        var text = typeof payload === "string" ? payload : "";
                        if (text) {
                            fullText += text;
                            if (options.onDelta) options.onDelta(text, fullText);
                        }
                    } else if (eventName === "response") {
                        if (options.onResponse) options.onResponse(payload);
                    } else if (eventName === "error") {
                        if (options.onError) options.onError(payload);
                    }
                    // "done" is handled by the reader closing; we don't need to act here.
                }

                return pump();
            }).catch(function (err) {
                if (err && err.name === "AbortError") return fullText;
                if (options.onError) options.onError(err);
                throw err;
            });
        })();

        return {
            promise: p,
            abort: function () { if (controller) controller.abort(); }
        };
    }

    function fetchFallback(url, body, options) {
        // Plain JSON POST fallback for browsers without streaming. Uses the
        // existing non-streaming endpoint by convention (caller can override).
        var fallbackUrl = (options && options.fallbackUrl) || url.replace(/\/stream$/, "");
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", fallbackUrl, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var parsed;
                    try { parsed = JSON.parse(xhr.responseText); } catch (e) { parsed = xhr.responseText; }
                    var text = "";
                    if (parsed && parsed.operations && parsed.operations.length) {
                        text = parsed.operations[0].text || "";
                    } else if (parsed && parsed.message) {
                        text = parsed.message;
                    }
                    if (options && options.onDelta && text) options.onDelta(text, text);
                    if (options && options.onResponse && parsed && typeof parsed === "object") options.onResponse(parsed);
                    if (options && options.onDone) options.onDone(text);
                    resolve(text);
                } else {
                    var err = new Error("AI request failed: HTTP " + xhr.status);
                    if (options && options.onError) options.onError(err);
                    reject(err);
                }
            };
            xhr.onerror = function () {
                var err = new Error("AI request network error");
                if (options && options.onError) options.onError(err);
                reject(err);
            };
            xhr.send(JSON.stringify(body));
        });
    }

    /**
     * Ask the server to build a .docx from the current editor HTML and
     * trigger a browser download. Defaults target the endpoint registered
     * by `MapRichTextBoxUploads()` (RichTextBox.AspNetCore 1.0.0-preview.11+).
     *
     *   editor.aiToolkit.exportDocx({
     *     url: "/richtextbox/export/docx",      // optional override
     *     fileName: "my-document.docx",          // optional; suggested filename
     *     title: "My document",                  // optional; core-props title
     *     html: "<p>custom HTML</p>",            // optional; defaults to editor HTML
     *     onError: function (err) { ... }
     *   });
     *
     * Returns a Promise that resolves when the file has been handed to the
     * browser download mechanism. Works in every browser with fetch + Blob.
     */
    function exportDocx(options) {
        options = options || {};
        var url = options.url || "/richtextbox/export/docx";
        var html = typeof options.html === "string" ? options.html
            : (editor && editor.getHTMLCode ? editor.getHTMLCode() : "");
        var title = options.title || (typeof document !== "undefined" ? document.title : "") || "document";
        var fileName = options.fileName || (String(title).replace(/[\\\/\:\*\?"<>\|]/g, "").trim() || "document") + ".docx";

        if (!html) {
            var err = new Error("exportDocx: editor content is empty.");
            if (options.onError) options.onError(err);
            return Promise.reject(err);
        }
        if (typeof fetch !== "function") {
            var err2 = new Error("exportDocx requires fetch + Blob support.");
            if (options.onError) options.onError(err2);
            return Promise.reject(err2);
        }

        return fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
            body: JSON.stringify({ html: html, title: title, fileName: fileName }),
            credentials: "same-origin"
        }).then(function (res) {
            if (!res.ok) throw new Error("exportDocx failed: HTTP " + res.status);
            return res.blob();
        }).then(function (blob) {
            // Trigger browser download. Use createObjectURL + anchor click; msSaveBlob for IE/old Edge.
            if (typeof window !== "undefined" && window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
                return fileName;
            }
            var href = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = href;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            // Release the object URL after the browser has had time to start the download.
            setTimeout(function () { try { URL.revokeObjectURL(href); } catch (e) { /* ignore */ } }, 4000);
            return fileName;
        }).catch(function (err) {
            if (options.onError) options.onError(err);
            throw err;
        });
    }

    function normalizeText(text) {
        return (text || "")
            .replace(/\r\n/g, "\n")
            .replace(/[ \t]+\n/g, "\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
    }

    function ensureSentence(text) {
        var clean = normalizeText(text);
        if (!clean) {
            return clean;
        }
        clean = clean.charAt(0).toUpperCase() + clean.substring(1);
        if (!/[.!?]$/.test(clean)) {
            clean += ".";
        }
        return clean;
    }

    function getTranslateLanguages() {
        return (config.aiToolkitTranslateLanguages || []).slice();
    }

    function normalizeLanguageValue(language) {
        return normalizeText(language || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    }

    function getTranslateLanguageLabel(language) {
        var normalized = normalizeLanguageValue(language);
        var languages = getTranslateLanguages();
        for (var i = 0; i < languages.length; i++) {
            if (normalizeLanguageValue(languages[i].value) === normalized || normalizeLanguageValue(languages[i].label) === normalized) {
                return languages[i].label || languages[i].value;
            }
        }
        return language ? ensureSentence(String(language)).replace(/[.!?]$/, "") : "Spanish";
    }

    function getTranslateLanguageValue(language) {
        var normalized = normalizeLanguageValue(language);
        var languages = getTranslateLanguages();
        for (var i = 0; i < languages.length; i++) {
            if (normalizeLanguageValue(languages[i].value) === normalized || normalizeLanguageValue(languages[i].label) === normalized) {
                return languages[i].value || languages[i].label;
            }
        }
        return normalized || "spanish";
    }

    function getSuggestionTypeValue(type) {
        var normalized = normalizeText(type || "").toLowerCase();
        return normalized || "other";
    }

    function getSuggestionTypeLabel(type) {
        switch (getSuggestionTypeValue(type)) {
            case "proofread":
                return "Proofread";
            case "rewrite":
                return "Rewrite";
            case "translate":
                return "Translate";
            case "justify":
                return "Justify";
            case "summarize":
                return "Summarize";
            case "shorten":
                return "Shorten";
            case "expand":
                return "Expand";
            case "comment":
                return "Comment";
            case "paragraph":
                return "Paragraph";
            case "chat":
                return "Chat";
            default:
                return "Other";
        }
    }

    function getSuggestionScopeLabel(suggestion) {
        if (!suggestion) {
            return "";
        }
        if (suggestion.snapshot && suggestion.snapshot.hasSelection) {
            return "Selection";
        }
        if (suggestion.scope === "selection") {
            return "Selection";
        }
        if (suggestion.sourceLabel) {
            if (/selection/i.test(suggestion.sourceLabel)) {
                return "Selection";
            }
            if (/document/i.test(suggestion.sourceLabel)) {
                return "Document";
            }
        }
        return "Document";
    }

    function getSuggestionQueueActionLabel(suggestion) {
        var pendingCount = getSuggestionQueuePendingCount(suggestion);
        var pendingLabel = pendingCount === 1 ? "1 pending" : pendingCount + " pending";
        var typeLabel = suggestion && suggestion.suggestionType ? getSuggestionTypeLabel(suggestion.suggestionType) : "AI";
        if (!typeLabel || typeLabel === "Other") {
            return "Open queue (" + pendingLabel + ")";
        }
        return "Open " + typeLabel + " queue (" + pendingLabel + ")";
    }

    function getSuggestionQueueActionTitle(suggestion) {
        var pendingCount = getSuggestionQueuePendingCount(suggestion);
        var pendingLabel = pendingCount === 1 ? "1 pending item" : pendingCount + " pending items";
        var typeLabel = suggestion && suggestion.suggestionType ? getSuggestionTypeLabel(suggestion.suggestionType) : "AI";
        var focusLabel = getReviewFocusActionDisplayLabel(suggestion, getPreferredReviewActionFocus());
        if (!typeLabel || typeLabel === "Other") {
            return "Click or press Enter to open this AI review queue" + (focusLabel ? " and focus " + focusLabel : "") + ". " + pendingLabel + ".";
        }
        return "Click or press Enter to open the " + typeLabel + " AI review queue" + (focusLabel ? " and focus " + focusLabel : "") + ". " + pendingLabel + ".";
    }

    function getSuggestionQueueShortcutHint(suggestion) {
        var pendingCount = getSuggestionQueuePendingCount(suggestion);
        var pendingLabel = pendingCount === 1 ? "1 pending" : pendingCount + " pending";
        var typeLabel = suggestion && suggestion.suggestionType ? getSuggestionTypeLabel(suggestion.suggestionType) : "AI";
        var focusLabel = getReviewFocusActionDisplayLabel(suggestion, getPreferredReviewActionFocus());
        if (!typeLabel || typeLabel === "Other") {
            return "Click or Enter opens queue (" + pendingLabel + ")" + (focusLabel ? ", focus " + focusLabel : "");
        }
        return "Click or Enter opens " + typeLabel + " queue (" + pendingLabel + ")" + (focusLabel ? ", focus " + focusLabel : "");
    }

    function getSuggestionQueuePendingCount(suggestion) {
        if (!suggestion) {
            return 0;
        }
        var typeValue = getSuggestionTypeValue(suggestion.suggestionType || "");
        var typeFilter = typeValue === "other" ? "all" : typeValue;
        return getFilteredPendingSuggestions(typeFilter).length;
    }

    function getSuggestionQueueAriaContext(suggestion) {
        var pendingCount = getSuggestionQueuePendingCount(suggestion);
        var pendingLabel = pendingCount === 1 ? "1 pending item" : pendingCount + " pending items";
        var typeLabel = suggestion && suggestion.suggestionType ? getSuggestionTypeLabel(suggestion.suggestionType) : "AI";
        var focusLabel = getReviewFocusActionDisplayLabel(suggestion, getPreferredReviewActionFocus());
        if (!typeLabel || typeLabel === "Other") {
            return "Opens AI review queue." + (focusLabel ? " Focuses " + focusLabel + "." : "") + " " + pendingLabel;
        }
        return "Opens " + typeLabel + " AI review queue." + (focusLabel ? " Focuses " + focusLabel + "." : "") + " " + pendingLabel;
    }

    function buildInlineSuggestionAriaLabel(suggestion, options) {
        options = options || {};
        var parts = ["AI suggestion preview"];
        var includeTypeLabel = true;
        if (options.isPreviewTarget) {
            parts.push("Next review queue target");
            parts.push(getSuggestionQueueAriaContext(suggestion));
            includeTypeLabel = false;
        }
        else if (options.isCurrent) {
            parts.push("Current review item");
        }
        if (options.queueOpened) {
            parts.push("Queue opened");
        }
        if (includeTypeLabel && suggestion && suggestion.suggestionType && getSuggestionTypeValue(suggestion.suggestionType) !== "other") {
            parts.push(getSuggestionTypeLabel(suggestion.suggestionType));
        }
        if (suggestion && suggestion.language) {
            parts.push(getTranslateLanguageLabel(suggestion.language));
        }
        var scopeLabel = getSuggestionScopeLabel(suggestion);
        if (scopeLabel) {
            parts.push(scopeLabel);
        }
        if (options.positionLabel) {
            parts.push(options.positionLabel);
        }
        if (options.transitionLabel) {
            parts.push(options.transitionLabel);
        }
        if (options.followupLabel) {
            parts.push(options.followupLabel);
        }
        if (options.remoteUpdateCount) {
            parts.push(options.remoteUpdateCount > 1 ? options.remoteUpdateCount + " shared updates" : "Shared update");
        }
        if (options.undoLabel) {
            parts.push(options.undoLabel);
        }
        if (options.undoNextLabel) {
            parts.push(options.undoNextLabel);
        }
        if (options.redoLabel) {
            parts.push(options.redoLabel);
        }
        if (options.redoNextLabel) {
            parts.push(options.redoNextLabel);
        }
        return parts.join(". ");
    }

    function buildSuggestionSourceLabel(type, snapshot, language) {
        var scopeLabel = snapshot && snapshot.hasSelection ? "Selection" : "Document";
        var typeLabel = getSuggestionTypeLabel(type);
        if (getSuggestionTypeValue(type) === "translate" && language) {
            return typeLabel + " - " + scopeLabel + " - " + getTranslateLanguageLabel(language);
        }
        return typeLabel + " - " + scopeLabel;
    }

    function buildTranslatedResult(source, language) {
        var clean = normalizeText(source);
        if (!clean) {
            return "";
        }

        var languageValue = getTranslateLanguageValue(language);
        var languageLabel = getTranslateLanguageLabel(languageValue);
        var leadMap = {
            spanish: "Version en español",
            french: "Version française",
            german: "Deutsche Fassung",
            italian: "Versione italiana",
            portuguese: "Versão em português",
            japanese: "Japanese draft"
        };
        var lead = leadMap[languageValue] || (languageLabel + " version");
        return ensureSentence(lead + ": " + clean);
    }

    function buildDemoResult(mode, source, options) {
        options = options || {};
        var clean = normalizeText(source);
        if (!clean) {
            return "";
        }

        var words = clean.split(/\s+/);
        switch (mode) {
            case "proofread":
                var proofed = clean
                    .replace(/\s{2,}/g, " ")
                    .replace(/\s+([,.;:!?])/g, "$1")
                    .replace(/([,.;:!?])([^\s"'\)\]])/g, "$1 $2")
                    .replace(/\.{2,}(?!\.)/g, ".")
                    .replace(/^(.)/, function (m) { return m.toUpperCase(); });
                return ensureSentence(proofed);
            case "rewrite":
                return ensureSentence(clean
                    .replace(/\bvery\s+/gi, "")
                    .replace(/\breally\s+/gi, "")
                    .replace(/\bjust\s+/gi, "")
                    .replace(/\bin order to\b/gi, "to")
                    .replace(/\bdue to the fact that\b/gi, "because")
                    .replace(/\s{2,}/g, " "));
            case "translate":
                return buildTranslatedResult(clean, options.language);
            case "shorten":
                return ensureSentence(words.slice(0, Math.max(8, Math.ceil(words.length * 0.6))).join(" "));
            case "expand":
                return ensureSentence(clean) + "\n\nTo add context: this extended version unpacks the idea with an additional sentence so readers can follow the reasoning without extra background.";
            case "summarize":
                return "Summary:\n- " + ensureSentence(words.slice(0, Math.max(10, Math.ceil(words.length * 0.45))).join(" "));
            default:
                return ensureSentence(clean);
        }
    }

    function buildCommentResult(source) {
        var clean = normalizeText(source);
        if (!clean) {
            return "AI note: Consider tightening this wording for clarity and reader confidence.";
        }
        return ensureSentence("AI note: Consider clarifying this passage and tightening the wording around \"" + clean.split(/\s+/).slice(0, 6).join(" ") + "\"");
    }

    function buildParagraphResult(source) {
        var clean = normalizeText(source);
        if (!clean) {
            return "Additional paragraph: This section adds a concise supporting explanation so the reader gets more context without losing momentum.";
        }
        return ensureSentence("Additional paragraph: This section adds a concise supporting explanation that reinforces " + clean.split(/\s+/).slice(0, 10).join(" ") + " for the reader.");
    }

    function truncateText(text, maxLength) {
        var clean = normalizeText(text);
        if (!clean || clean.length <= maxLength) {
            return clean;
        }
        return clean.substring(0, Math.max(0, maxLength - 3)).replace(/\s+\S*$/, "").trim() + "...";
    }

    function buildChatAnswer(prompt, source) {
        var focus = truncateText(source, 160) || "the current document";
        if (/\b(headings?|titles?)\b/.test(prompt)) {
            return "You could tighten the structure by using shorter headings that mirror the main claims in " + focus + ". Ask me to draft heading options and I can turn them into reviewable suggestions.";
        }
        if (/\b(translate|translation)\b/.test(prompt)) {
            return "I can translate the current selection or whole document into Spanish, French, German, Italian, Portuguese, or Japanese and keep it reviewable in the editor before you accept it.";
        }
        if (/\bwhy\b|\bhow\b|\bwhat\b|\?/.test(prompt)) {
            return "Based on " + focus + ", I would focus on clarity, stronger section framing, and cleaner transitions. If you want, ask me to rewrite or summarize a specific passage and I can prepare an in-editor suggestion.";
        }
        return "I reviewed " + focus + ". Ask me to rewrite, summarize, proofread, translate, comment on, or expand the current content and I can prepare editor-ready changes.";
    }

    function extractRequestedLanguage(prompt) {
        var normalizedPrompt = normalizeText(prompt).toLowerCase();
        if (!normalizedPrompt) {
            return "";
        }
        var languages = getTranslateLanguages();
        for (var i = 0; i < languages.length; i++) {
            var label = (languages[i].label || "").toLowerCase();
            var value = (languages[i].value || "").toLowerCase();
            if ((label && normalizedPrompt.indexOf(label) >= 0) || (value && normalizedPrompt.indexOf(value) >= 0)) {
                return languages[i].value || languages[i].label;
            }
        }
        return "";
    }

    function buildChatResolvedAction(request) {
        var prompt = normalizeText(request.prompt || "");
        var source = normalizeText(request.source || request.selectionText || request.documentText || "");
        var promptLower = prompt.toLowerCase();
        var requestedLanguage = request.language || extractRequestedLanguage(prompt);
        var hasSelection = !!(request.snapshot && request.snapshot.hasSelection);
        var previewTarget = hasSelection ? "selection-preview" : "document";
        var editReason = "";
        var resultText = "";
        var target = previewTarget;

        if (!prompt) {
            return {
                message: "Ask a question, request a rewrite, or tell the AI to summarize, proofread, translate, or expand the current content.",
                operations: []
            };
        }

        if (/\b(translate|translation|localize|localise)\b/.test(promptLower)) {
            var languageLabel = getTranslateLanguageLabel(requestedLanguage || "spanish");
            resultText = buildDemoResult("translate", source, { language: requestedLanguage });
            editReason = "This prepares a translated " + languageLabel + " draft while keeping the original text nearby until you review and accept the change.";
            return {
                message: "I prepared a " + languageLabel + " translation you can review before applying.",
                result: resultText,
                reason: editReason,
                operations: [
                    buildLegacyOperation(previewTarget, resultText, { reason: editReason }, request, request.action)
                ]
            };
        }

        if (/\b(comment|note|feedback)\b/.test(promptLower)) {
            resultText = buildCommentResult(source);
            editReason = "This AI note highlights a place that could use clarification or stronger editorial guidance.";
            return {
                message: "I prepared an AI comment you can add next to the current content.",
                result: resultText,
                reason: editReason,
                operations: [
                    {
                        type: "add-comment",
                        text: resultText,
                        reason: editReason
                    }
                ]
            };
        }

        if (/\b(expand|add|insert|paragraph|develop)\b/.test(promptLower)) {
            resultText = buildDemoResult("expand", source);
            editReason = "This adds supporting detail without changing the original point, so it works well as an inserted follow-up paragraph.";
            target = "insert";
            return {
                message: "I drafted a supporting paragraph you can insert below the current content.",
                result: resultText,
                reason: editReason,
                operations: [
                    buildLegacyOperation(target, resultText, { reason: editReason }, request, request.action)
                ]
            };
        }

        if (/\b(summarize|summary|recap)\b|\bexecutive summary\b/.test(promptLower)) {
            resultText = buildDemoResult("summarize", source);
            editReason = "This compresses the current content into a shorter, clearer version that is easier to scan or reuse.";
            target = hasSelection ? "selection-preview" : "document";
            return {
                message: "I prepared a condensed version of the current content for review.",
                result: resultText,
                reason: editReason,
                operations: [
                    buildLegacyOperation(target, resultText, { reason: editReason }, request, request.action)
                ]
            };
        }

        if (/\b(proofread|grammar|fix|correct)\b|\bclean up\b/.test(promptLower)) {
            resultText = buildDemoResult("proofread", source);
            editReason = "This pass improves grammar, punctuation, and readability while keeping the original meaning intact.";
            return {
                message: "I prepared a proofread version you can preview inline and accept if it looks right.",
                result: resultText,
                reason: editReason,
                operations: [
                    buildLegacyOperation(previewTarget, resultText, { reason: editReason }, request, request.action)
                ]
            };
        }

        if (/\b(rewrite|adjust|clarify|improve|polish|tone)\b/.test(promptLower)) {
            resultText = buildDemoResult("rewrite", source);
            editReason = "This rewrite removes filler language and tightens the wording so the idea is easier to review and accept.";
            return {
                message: "I drafted a clearer rewrite of the current content.",
                result: resultText,
                reason: editReason,
                operations: [
                    buildLegacyOperation(previewTarget, resultText, { reason: editReason }, request, request.action)
                ]
            };
        }

        return {
            message: buildChatAnswer(promptLower, source),
            operations: []
        };
    }

    function getActionDefinition(actionId) {
        var actions = getActionDefinitions();
        for (var i = 0; i < actions.length; i++) {
            if (actions[i].id === actionId) {
                return actions[i];
            }
        }
        return null;
    }

    function getActionDefinitions() {
        return (config.aiToolkitActions || []).slice();
    }

    function getDialogModes() {
        return (config.aiToolkitDialogModes || []).slice();
    }

    function upsertDefinition(collection, definition) {
        if (!definition || !definition.id) {
            return false;
        }
        for (var i = 0; i < collection.length; i++) {
            if (collection[i].id === definition.id) {
                collection[i] = definition;
                return true;
            }
        }
        collection.push(definition);
        return true;
    }

    function removeDefinition(collection, id) {
        for (var i = collection.length - 1; i >= 0; i--) {
            if (collection[i].id === id) {
                collection.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function registerActionDefinition(action) {
        config.aiToolkitActions = config.aiToolkitActions || [];
        upsertDefinition(config.aiToolkitActions, action);
        return action;
    }

    function removeActionDefinition(actionId) {
        config.aiToolkitActions = config.aiToolkitActions || [];
        return removeDefinition(config.aiToolkitActions, actionId);
    }

    function registerDialogModeDefinition(mode) {
        config.aiToolkitDialogModes = config.aiToolkitDialogModes || [];
        upsertDefinition(config.aiToolkitDialogModes, mode);
        return mode;
    }

    function removeDialogModeDefinition(modeId) {
        config.aiToolkitDialogModes = config.aiToolkitDialogModes || [];
        return removeDefinition(config.aiToolkitDialogModes, modeId);
    }

    function registerOperationHandler(type, handler) {
        if (!type) {
            return false;
        }
        if (typeof handler === "function") {
            config.aiToolkitOperationHandlers[type] = handler;
            return true;
        }
        delete config.aiToolkitOperationHandlers[type];
        return false;
    }

    function unregisterOperationHandler(type) {
        if (!type) {
            return false;
        }
        if (config.aiToolkitOperationHandlers && config.aiToolkitOperationHandlers[type]) {
            delete config.aiToolkitOperationHandlers[type];
            return true;
        }
        return false;
    }

    function getOperationContract() {
        return {
            version: "2026-04-18",
            operations: [
                { type: "open-chat-panel", description: "Open the docked AI chat panel." },
                { type: "open-review-panel", description: "Open the persistent AI review drawer." },
                { type: "open-dialog", description: "Open the Ask AI review dialog." },
                { type: "preview-suggestion", description: "Preview a reviewable inline suggestion for the current selection.", requiresText: true, requiresSelection: true },
                { type: "replace-selection", description: "Replace the current selection with new text.", requiresText: true, requiresSelection: true },
                { type: "replace-document", description: "Replace the whole editor document with new text.", requiresText: true },
                { type: "insert-below", description: "Insert new text below the current selection or caret.", requiresText: true },
                { type: "add-comment", description: "Insert an AI comment marker near the current selection or caret.", requiresText: true }
            ]
        };
    }

    function buildLegacyOperation(target, text, resolved, request, action) {
        var fallbackTarget = target || (action && action.target) || "document";
        var meta = {
            mode: request && request.mode ? request.mode : (action && action.resolverMode ? action.resolverMode : ""),
            language: request && request.language ? request.language : "",
            sourceLabel: buildSuggestionSourceLabel(request && request.mode ? request.mode : (action && action.resolverMode ? action.resolverMode : ""), request && request.snapshot ? request.snapshot : null, request && request.language ? request.language : "")
        };
        switch (fallbackTarget) {
            case "chat-panel":
                return {
                    type: "open-chat-panel"
                };
            case "review-panel":
                return {
                    type: "open-review-panel"
                };
            case "dialog":
                return {
                    type: "open-dialog",
                    presetMode: resolved && resolved.presetMode ? resolved.presetMode : (request && request.mode ? request.mode : ""),
                    useDocument: resolved && typeof resolved.useDocument === "boolean" ? resolved.useDocument : false,
                    autoRun: resolved && typeof resolved.autoRun === "boolean" ? resolved.autoRun : (action && typeof action.autoRun === "boolean" ? action.autoRun : false)
                };
            case "selection-preview":
            case "preview":
                return {
                    type: "preview-suggestion",
                    text: text,
                    meta: meta
                };
            case "comment":
                return {
                    type: "add-comment",
                    text: text,
                    meta: meta
                };
            case "insert":
                return {
                    type: "insert-below",
                    text: text,
                    meta: meta
                };
            case "selection":
                return {
                    type: "replace-selection",
                    text: text,
                    meta: meta
                };
            case "document":
            default:
                return {
                    type: "replace-document",
                    text: text,
                    meta: meta
                };
        }
    }

    function normalizeOperation(operation, fallbackTarget, resolved, request, action) {
        if (operation == null) {
            return null;
        }

        if (typeof operation === "string") {
            return buildLegacyOperation(fallbackTarget, operation, resolved, request, action);
        }

        var type = operation.type || operation.op || operation.name || "";
        if (!type) {
            return buildLegacyOperation(operation.target || fallbackTarget, operation.text || operation.result || operation.content || operation.note || "", operation, request, action);
        }

        return {
            type: type,
            text: normalizeText(operation.text || operation.result || operation.content || operation.note || ""),
            html: operation.html || "",
            reason: operation.reason || (resolved && resolved.reason) || "",
            presetMode: operation.presetMode || (resolved && resolved.presetMode) || (request && request.mode) || "",
            useDocument: typeof operation.useDocument === "boolean" ? operation.useDocument : (resolved && typeof resolved.useDocument === "boolean" ? resolved.useDocument : false),
            autoRun: typeof operation.autoRun === "boolean" ? operation.autoRun : (resolved && typeof resolved.autoRun === "boolean" ? resolved.autoRun : (action && typeof action.autoRun === "boolean" ? action.autoRun : false)),
            target: operation.target || fallbackTarget || "",
            meta: operation.meta || null
        };
    }

    function extractResolvedOperations(resolved, fallbackTarget, request, action) {
        var items = [];
        if (resolved && resolved.operations) {
            items = resolved.operations;
        }
        else if (resolved && resolved.operation) {
            items = [resolved.operation];
        }
        else {
            items = [buildLegacyOperation(fallbackTarget, resolved && (resolved.result || resolved.text || ""), resolved, request, action)];
        }

        var normalized = [];
        for (var i = 0; i < items.length; i++) {
            var entry = normalizeOperation(items[i], fallbackTarget, resolved, request, action);
            if (entry) {
                normalized.push(entry);
            }
        }
        return normalized;
    }

    function getPrimaryResolvedText(resolved) {
        if (!resolved) {
            return "";
        }
        if (resolved.result) {
            return normalizeText(resolved.result);
        }
        var operations = resolved.operations || [];
        for (var i = 0; i < operations.length; i++) {
            if (operations[i] && operations[i].text) {
                return normalizeText(operations[i].text);
            }
        }
        return "";
    }

    function getPrimaryResolvedReason(resolved) {
        if (!resolved) {
            return "";
        }
        if (resolved.reason) {
            return normalizeText(resolved.reason);
        }
        var operations = resolved.operations || [];
        for (var i = 0; i < operations.length; i++) {
            if (operations[i] && operations[i].reason) {
                return normalizeText(operations[i].reason);
            }
        }
        return "";
    }

    function getOperationDisplayMeta(operation) {
        if (!operation || !operation.type) {
            return {
                title: "Unknown step",
                copy: "This AI step does not expose a known editor action yet."
            };
        }

        switch (operation.type) {
            case "open-chat-panel":
                return {
                    title: "Open AI chat",
                    copy: "Opens the docked AI chat panel for multi-turn document help."
                };
            case "open-review-panel":
                return {
                    title: "Open AI review",
                    copy: "Opens the persistent AI suggestion queue for the current editor."
                };
            case "open-dialog":
                return {
                    title: "Open review dialog",
                    copy: "Launches the Ask AI review dialog for a guided follow-up."
                };
            case "preview-suggestion":
                return {
                    title: "Preview inline suggestion",
                    copy: "Shows a reviewable inline diff in the editor before anything is committed."
                };
            case "replace-selection":
                return {
                    title: "Replace selection",
                    copy: "Updates the current selection with the generated text."
                };
            case "replace-document":
                return {
                    title: "Replace document",
                    copy: "Swaps the full editor content with the generated text."
                };
            case "insert-below":
                return {
                    title: "Insert below",
                    copy: "Adds generated content beneath the current selection or caret."
                };
            case "add-comment":
                return {
                    title: "Add AI comment",
                    copy: "Drops a non-destructive AI comment marker into the document."
                };
            default:
                return {
                    title: operation.type,
                    copy: "Custom AI operation returned by the current resolver."
                };
        }
    }

    function getOperationPlanButtonLabel(resolved) {
        var operations = resolved && resolved.operations ? resolved.operations : [];
        if (!operations.length) {
            return "Apply";
        }

        if (operations.length > 1) {
            return "Apply " + operations.length + " steps";
        }

        switch (operations[0].type) {
            case "preview-suggestion":
                return "Apply inline preview";
            case "open-review-panel":
                return "Open AI review";
            case "replace-selection":
                return "Apply to selection";
            case "replace-document":
                return "Apply to document";
            case "insert-below":
                return "Insert below";
            case "add-comment":
                return "Add AI comment";
            case "open-chat-panel":
                return "Open AI chat";
            case "open-dialog":
                return "Open review dialog";
            default:
                return "Apply plan";
        }
    }

    function getSingleOperationPlanButtonLabel(operation) {
        return getOperationPlanButtonLabel({ operations: [operation] });
    }

    function buildResolvedActionFromText(text, target, resolved, request, action) {
        return normalizeResolvedAction({
            operations: [buildLegacyOperation(target, text, resolved, request, action)],
            presetMode: resolved && resolved.presetMode ? resolved.presetMode : (request && request.mode ? request.mode : ""),
            useDocument: resolved && typeof resolved.useDocument === "boolean" ? resolved.useDocument : false,
            autoRun: resolved && typeof resolved.autoRun === "boolean" ? resolved.autoRun : false
        }, action, request);
    }

    function defaultResolveAction(request) {
        switch (request.mode) {
            case "proofread":
                var proofReason = "Normalizes spacing, punctuation, and capitalization while keeping the original meaning intact.";
                return {
                    operations: [
                        buildLegacyOperation(request.action && request.action.target ? request.action.target : "selection-preview", buildDemoResult("proofread", request.source), { reason: proofReason }, request, request.action)
                    ],
                    reason: proofReason
                };
            case "rewrite":
                var rewriteReason = "Tightens the wording by removing filler phrases so the point comes through faster.";
                return {
                    operations: [
                        buildLegacyOperation(request.action && request.action.target ? request.action.target : "selection-preview", buildDemoResult("rewrite", request.source), { reason: rewriteReason }, request, request.action)
                    ],
                    reason: rewriteReason
                };
            case "translate":
                // The translate action has target: "dialog" so the AI menu opens the dialog
                // preset to Translate. When the user then clicks "Ask AI" INSIDE that dialog,
                // we need a real text-producing target — a "dialog" target would just re-issue
                // open-dialog and produce no visible output.
                var translateTarget = request.action && request.action.target && request.action.target !== "dialog"
                    ? request.action.target
                    : (request.snapshot && request.snapshot.hasSelection ? "selection-preview" : "document");
                return {
                    operations: [
                        buildLegacyOperation(translateTarget, buildDemoResult("translate", request.source, { language: request.language }), { reason: "This prepares a translated " + getTranslateLanguageLabel(request.language || "spanish") + " draft while keeping the original text available for review." }, request, request.action)
                    ],
                    reason: "This prepares a translated " + getTranslateLanguageLabel(request.language || "spanish") + " draft while keeping the original text available for review."
                };
            case "justify":
                return {
                    operations: [
                        {
                            type: "preview-suggestion",
                            text: buildDemoResult("rewrite", request.source),
                            reason: "This rewrite reduces filler language, clarifies the main point, and makes the sentence easier to review before accepting."
                        }
                    ],
                    reason: "This rewrite reduces filler language, clarifies the main point, and makes the sentence easier to review before accepting."
                };
            case "shorten":
                var shortenReason = "Trims the passage to its core idea while keeping the original phrasing.";
                return {
                    operations: [
                        buildLegacyOperation(request.action && request.action.target ? request.action.target : "document", buildDemoResult("shorten", request.source), { reason: shortenReason }, request, request.action)
                    ],
                    reason: shortenReason
                };
            case "expand":
                var expandReason = "Adds a supporting sentence that reinforces the original point without changing its direction.";
                return {
                    operations: [
                        buildLegacyOperation(request.action && request.action.target ? request.action.target : "insert", buildDemoResult("expand", request.source), { reason: expandReason }, request, request.action)
                    ],
                    reason: expandReason
                };
            case "summarize":
                var summarizeReason = "Condenses the content into a scannable summary that works as a recap or abstract.";
                return {
                    operations: [
                        buildLegacyOperation(request.action && request.action.target ? request.action.target : "document", buildDemoResult("summarize", request.source), { reason: summarizeReason }, request, request.action)
                    ],
                    reason: summarizeReason
                };
            case "comment":
                return {
                    operations: [
                        {
                            type: "add-comment",
                            text: buildCommentResult(request.source)
                        }
                    ]
                };
            case "paragraph":
                return {
                    operations: [
                        {
                            type: "insert-below",
                            text: buildParagraphResult(request.source)
                        }
                    ]
                };
            case "chat":
                return buildChatResolvedAction(request);
            default:
                return {
                    operations: [
                        buildLegacyOperation(request.action && request.action.target ? request.action.target : "document", buildDemoResult(request.mode || "rewrite", request.source), null, request, request.action)
                    ]
                };
        }
    }

    function normalizeResolvedAction(resolved, action, request) {
        var fallbackTarget = action && action.target ? action.target : "document";
        if (resolved == null) {
            return {
                result: "",
                target: fallbackTarget,
                operations: [],
                message: "",
                action: action,
                request: request
            };
        }

        if (typeof resolved === "string") {
            resolved = {
                operations: [buildLegacyOperation(fallbackTarget, resolved, null, request, action)]
            };
        }

        var operations = extractResolvedOperations(resolved, resolved.target || resolved.mode || fallbackTarget, request, action);
        var target = operations.length ? (operations[0].target || resolved.target || resolved.mode || fallbackTarget) : (resolved.target || resolved.mode || fallbackTarget);

        return {
            result: normalizeText(resolved.result || resolved.text || getPrimaryResolvedText({ operations: operations }) || ""),
            target: target,
            operations: operations,
            message: normalizeText(resolved.message || resolved.reply || ""),
            reason: normalizeText(resolved.reason || getPrimaryResolvedReason({ operations: operations }) || ""),
            autoRun: typeof resolved.autoRun === "boolean" ? resolved.autoRun : (action && typeof action.autoRun === "boolean" ? action.autoRun : false),
            useDocument: typeof resolved.useDocument === "boolean" ? resolved.useDocument : false,
            presetMode: resolved.presetMode || request.mode || "",
            action: action,
            request: request
        };
    }

    function resolveAction(actionId, options) {
        options = options || {};
        var action = getActionDefinition(actionId) || { id: actionId, title: actionId, target: "document" };
        var snapshot = options.snapshot || captureSelectionSnapshot();
        var request = {
            actionId: actionId,
            action: action,
            mode: options.mode || action.resolverMode || actionId,
            source: options.source || (snapshot.text || snapshot.wholeText),
            prompt: options.prompt || "",
            language: options.language || "",
            scope: options.scope || (snapshot.hasSelection ? "selection" : "document"),
            selectionText: snapshot.text || "",
            documentText: snapshot.wholeText || "",
            snapshot: snapshot,
            editor: editor,
            contract: getOperationContract()
        };

        if (typeof config.aiToolkitResolver === "function") {
            try {
                return Promise.resolve(config.aiToolkitResolver.call(editor, request)).then(function (resolved) {
                    return normalizeResolvedAction(resolved, action, request);
                });
            }
            catch (x) {
                return Promise.reject(x);
            }
        }

        return Promise.resolve(normalizeResolvedAction(defaultResolveAction(request), action, request));
    }

    function captureSelectionSnapshot() {
        var selection = editor.getSelection ? editor.getSelection() : null;
        var snapshot = {
            text: normalizeText(editor.getSelectedText ? editor.getSelectedText() : ""),
            html: editor.getSelectedHTML ? editor.getSelectedHTML() : "",
            wholeText: normalizeText(editor.getText ? editor.getText() : ""),
            range: null
        };

        snapshot.hasSelection = !!snapshot.text;

        if (selection && selection.rangeCount) {
            try {
                snapshot.range = selection.getRangeAt(0).cloneRange();
            }
            catch (x) {
                snapshot.range = null;
            }
        }

        return snapshot;
    }

    function isRangeUsable(range) {
        if (!range || !range.startContainer || !range.endContainer) {
            return false;
        }

        var editable = editor.getEditable ? editor.getEditable() : null;
        if (!editable) {
            return false;
        }

        var startNode = range.startContainer.nodeType === 3 ? range.startContainer.parentNode : range.startContainer;
        var endNode = range.endContainer.nodeType === 3 ? range.endContainer.parentNode : range.endContainer;
        return !!(startNode && endNode && editable.contains(startNode) && editable.contains(endNode));
    }

    function restoreSelection(snapshot, collapseToEnd) {
        if (!snapshot || !snapshot.range || !isRangeUsable(snapshot.range)) {
            return false;
        }

        var range = snapshot.range.cloneRange();
        if (collapseToEnd) {
            range.collapse(false);
        }

        editor.focus();

        var selection = editor.getSelection ? editor.getSelection() : null;
        if (!selection) {
            return false;
        }

        if (selection.removeAllRanges) {
            selection.removeAllRanges();
        }
        else if (selection.empty) {
            selection.empty();
        }

        selection.addRange(range);
        return true;
    }

    function textToHtml(text) {
        var clean = normalizeText(text);
        if (!clean) {
            return "";
        }

        var blocks = clean.split(/\n{2,}/);
        var html = [];
        for (var i = 0; i < blocks.length; i++) {
            html.push("<p>" + editor.htmlEncode(blocks[i]).replace(/\n/g, "<br/>") + "</p>");
        }
        return html.join("");
    }

    function textToInlineHtml(text) {
        var clean = normalizeText(text);
        if (!clean) {
            return "";
        }
        return editor.htmlEncode(clean).replace(/\n/g, "<br/>");
    }

    function escapeHtml(text) {
        return editor.htmlEncode(text || "");
    }

    function escapeAttribute(text) {
        return editor.htmlEncode(text || "").replace(/\n/g, "&#10;");
    }

    function hasBlockMarkup(html) {
        return /<(p|div|h1|h2|h3|h4|h5|h6|ul|ol|li|table|thead|tbody|tr|td|th|blockquote|pre|section|article)\b/i.test(html || "");
    }

    function getSuggestionStore() {
        if (!editor.__aiSuggestions) {
            editor.__aiSuggestions = [];
        }
        return editor.__aiSuggestions;
    }

    function getReviewLogEntries() {
        if (!editor.__aiReviewLogEntries) {
            editor.__aiReviewLogEntries = [];
        }
        return editor.__aiReviewLogEntries;
    }

    function getPersistenceStorageKey() {
        if (!config.aiToolkitPersistenceKey) {
            return "";
        }
        return "RTE.AIToolkit." + config.aiToolkitPersistenceKey;
    }

    function getReviewLogDocumentKey() {
        return config.aiToolkitPersistenceKey || "";
    }

    function normalizeReviewLogEntry(raw) {
        if (!raw) {
            return null;
        }

        return {
            id: raw.id || ("log-" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000)),
            documentKey: raw.documentKey || getReviewLogDocumentKey(),
            eventType: raw.eventType || "suggestion-updated",
            suggestionId: raw.suggestionId || "",
            status: raw.status || "",
            suggestionType: getSuggestionTypeValue(raw.suggestionType || ""),
            language: raw.language || "",
            sourceLabel: raw.sourceLabel || "",
            originalText: normalizeText(raw.originalText || ""),
            resultText: normalizeText(raw.resultText || ""),
            reason: normalizeText(raw.reason || ""),
            timestamp: raw.timestamp || new Date().getTime()
        };
    }

    function getReviewLogEventLabel(entry) {
        switch (entry.eventType) {
            case "suggestion-created":
                return "Created";
            case "suggestion-accepted":
                return "Accepted";
            case "suggestion-rejected":
                return "Rejected";
            case "suggestion-reopened":
                return "Reopened";
            case "suggestion-stale":
                return "Marked stale";
            default:
                return "Updated";
        }
    }

    function getReviewLogEventToneClass(entry) {
        if (!entry) {
            return "updated";
        }
        switch (entry.eventType) {
            case "suggestion-created":
                return "created";
            case "suggestion-accepted":
                return "accepted";
            case "suggestion-rejected":
                return "rejected";
            case "suggestion-reopened":
                return "reopened";
            case "suggestion-stale":
                return "stale";
            default:
                return "updated";
        }
    }

    function summarizeReviewLogEntry(entry) {
        if (!entry) {
            return "";
        }
        return getReviewLogEventLabel(entry) + " - " + (entry.sourceLabel || "AI review");
    }

    function buildReviewLogEntry(eventType, suggestion) {
        return normalizeReviewLogEntry({
            id: "log-" + suggestion.id + "-" + eventType + "-" + new Date().getTime(),
            documentKey: getReviewLogDocumentKey(),
            eventType: eventType,
            suggestionId: suggestion.id,
            status: suggestion.status || "",
            suggestionType: suggestion.suggestionType || "",
            language: suggestion.language || "",
            sourceLabel: suggestion.sourceLabel || (suggestion.snapshot && suggestion.snapshot.hasSelection ? "Selection suggestion" : "Document suggestion"),
            originalText: suggestion.originalText || "",
            resultText: suggestion.resultText || "",
            reason: suggestion.reason || "",
            timestamp: new Date().getTime()
        });
    }

    function pushReviewLogEntry(entry) {
        if (!entry) {
            return;
        }
        var items = getReviewLogEntries();
        items.unshift(entry);
        if (items.length > 30) {
            items.length = 30;
        }
    }

    function sendReviewLogRequest(method, url, body, callback) {
        if (!url || !window.XMLHttpRequest) {
            if (typeof callback === "function") {
                callback(null);
            }
            return false;
        }

        try {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            if (body) {
                xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (typeof callback === "function") {
                    callback(xhr);
                }
            };
            xhr.send(body || null);
            return true;
        }
        catch (ignore) {
            if (typeof callback === "function") {
                callback(null);
            }
            return false;
        }
    }

    function emitReviewLogEvent(eventType, suggestion) {
        var reviewLogUrl = config.aiToolkitReviewLogUrl || "";
        if (!reviewLogUrl || !suggestion || !getReviewLogDocumentKey()) {
            return false;
        }

        var entry = buildReviewLogEntry(eventType, suggestion);
        pushReviewLogEntry(entry);
        sendReviewLogRequest("POST", reviewLogUrl, JSON.stringify(entry), function (xhr) {
            if (!xhr || xhr.status < 200 || xhr.status >= 300) {
                console.warn("AI review log request failed");
            }
        });
        return true;
    }

    function loadReviewLogEntries(force, callback) {
        var reviewLogUrl = config.aiToolkitReviewLogUrl || "";
        var documentKey = getReviewLogDocumentKey();
        if (!reviewLogUrl || !documentKey) {
            if (typeof callback === "function") {
                callback(getReviewLogEntries().slice(), false);
            }
            return false;
        }

        if (!force && editor.__aiReviewLogLoaded) {
            if (typeof callback === "function") {
                callback(getReviewLogEntries().slice(), true);
            }
            return true;
        }

        sendReviewLogRequest("GET", reviewLogUrl + "?key=" + encodeURIComponent(documentKey), null, function (xhr) {
            var items = [];
            var ok = !!(xhr && xhr.status >= 200 && xhr.status < 300);
            if (ok) {
                try {
                    var payload = JSON.parse(xhr.responseText || "{}");
                    var entries = payload && payload.entries ? payload.entries : [];
                    for (var i = 0; i < entries.length; i++) {
                        var normalized = normalizeReviewLogEntry(entries[i]);
                        if (normalized) {
                            items.push(normalized);
                        }
                    }
                }
                catch (ignore) {
                }
            }
            editor.__aiReviewLogEntries = items;
            editor.__aiReviewLogLoaded = ok;
            if (typeof callback === "function") {
                callback(items.slice(), ok);
            }
        });
        return true;
    }

    function serializeSuggestion(suggestion) {
        return {
            id: suggestion.id,
            changeType: suggestion.changeType || "ai-preview",
            author: suggestion.author ? {
                id: suggestion.author.id || "ai",
                name: suggestion.author.name || "AI",
                color: suggestion.author.color || "#8b5cf6"
            } : { id: "ai", name: "AI", color: "#8b5cf6" },
            originalHtml: suggestion.originalHtml || "",
            originalText: suggestion.originalText || "",
            resultText: suggestion.resultText || "",
            resultHtml: suggestion.resultHtml || "",
            reason: suggestion.reason || "",
            suggestionType: suggestion.suggestionType || "",
            language: suggestion.language || "",
            isBlock: !!suggestion.isBlock,
            status: suggestion.status || "pending",
            createdAt: suggestion.createdAt || new Date().getTime(),
            decidedAt: suggestion.decidedAt || 0,
            sourceLabel: suggestion.sourceLabel || "",
            scope: suggestion.snapshot && suggestion.snapshot.hasSelection ? "selection" : "document",
            text: suggestion.text || "",
            blockPath: suggestion.blockPath || "",
            replies: Array.isArray(suggestion.replies) ? suggestion.replies : []
        };
    }

    function normalizeLedgerEntry(raw) {
        if (!raw || !raw.id) return null;
        var changeType = raw.changeType || "ai-preview";
        var author = raw.author && typeof raw.author === "object" ? raw.author : null;
        if (!author) {
            author = changeType === "ai-preview"
                ? { id: "ai", name: "AI", color: "#8b5cf6" }
                : { id: "user", name: "User", color: "#2563eb" };
        }
        return {
            id: raw.id,
            changeType: changeType,
            author: {
                id: author.id || "user",
                name: author.name || author.id || "User",
                color: author.color || "#2563eb"
            },
            originalHtml: raw.originalHtml || "",
            originalText: raw.originalText || "",
            resultText: raw.resultText || "",
            resultHtml: raw.resultHtml || "",
            reason: raw.reason || "",
            suggestionType: raw.suggestionType || "",
            language: raw.language || "",
            isBlock: !!raw.isBlock,
            status: raw.status || "pending",
            createdAt: raw.createdAt || new Date().getTime(),
            decidedAt: raw.decidedAt || 0,
            sourceLabel: raw.sourceLabel || "",
            snapshot: raw.snapshot || { hasSelection: raw.scope === "selection" },
            text: raw.text || "",
            blockPath: raw.blockPath || "",
            replies: Array.isArray(raw.replies) ? raw.replies : []
        };
    }

    function normalizePersistedSuggestion(raw) {
        if (!raw || !raw.id) {
            return null;
        }

        var changeType = raw.changeType || "ai-preview";
        var author = raw.author && typeof raw.author === "object" ? raw.author : null;
        if (!author) {
            author = changeType === "ai-preview"
                ? { id: "ai", name: "AI", color: "#8b5cf6" }
                : { id: "user", name: "User", color: "#2563eb" };
        }

        return {
            id: raw.id,
            changeType: changeType,
            author: {
                id: author.id || "user",
                name: author.name || author.id || "User",
                color: author.color || "#2563eb"
            },
            originalHtml: raw.originalHtml || textToInlineHtml(raw.originalText || ""),
            originalText: normalizeText(raw.originalText || ""),
            resultText: normalizeText(raw.resultText || ""),
            resultHtml: raw.resultHtml || textToInlineHtml(raw.resultText || ""),
            reason: normalizeText(raw.reason || ""),
            suggestionType: getSuggestionTypeValue(raw.suggestionType || ""),
            language: raw.language || "",
            isBlock: !!raw.isBlock,
            status: raw.status === "accepted" || raw.status === "rejected" || raw.status === "stale" ? raw.status : "stale",
            createdAt: raw.createdAt || new Date().getTime(),
            decidedAt: raw.decidedAt || 0,
            sourceLabel: raw.sourceLabel || (raw.scope === "selection" ? "Selection suggestion" : "Document suggestion"),
            snapshot: {
                hasSelection: raw.scope === "selection"
            },
            text: raw.text || "",
            blockPath: raw.blockPath || "",
            replies: Array.isArray(raw.replies) ? raw.replies : []
        };
    }

    function getSuggestionLedgerDocumentKey() {
        return config.aiToolkitPersistenceKey || "";
    }

    function buildSuggestionLedgerPayload() {
        return {
            version: "2026-04-18",
            documentKey: getSuggestionLedgerDocumentKey(),
            savedAt: new Date().getTime(),
            suggestions: getSuggestionStore().map(serializeSuggestion)
        };
    }

    function getSuggestionStatusRank(status) {
        switch (status) {
            case "pending":
                return 4;
            case "accepted":
                return 3;
            case "rejected":
                return 2;
            case "stale":
                return 1;
            default:
                return 0;
        }
    }

    function getSuggestionVersionStamp(suggestion) {
        return Math.max(suggestion && suggestion.decidedAt || 0, suggestion && suggestion.createdAt || 0);
    }

    function cloneSuggestionRecord(suggestion) {
        if (!suggestion) {
            return null;
        }
        return {
            id: suggestion.id,
            originalHtml: suggestion.originalHtml || "",
            originalText: suggestion.originalText || "",
            resultText: suggestion.resultText || "",
            resultHtml: suggestion.resultHtml || "",
            reason: suggestion.reason || "",
            suggestionType: suggestion.suggestionType || "",
            language: suggestion.language || "",
            isBlock: !!suggestion.isBlock,
            status: suggestion.status || "stale",
            createdAt: suggestion.createdAt || 0,
            decidedAt: suggestion.decidedAt || 0,
            sourceLabel: suggestion.sourceLabel || "",
            snapshot: {
                hasSelection: !!(suggestion.snapshot && suggestion.snapshot.hasSelection)
            }
        };
    }

    function choosePreferredSuggestion(current, candidate) {
        if (!current) {
            return cloneSuggestionRecord(candidate);
        }
        if (!candidate) {
            return current;
        }

        var currentStamp = getSuggestionVersionStamp(current);
        var candidateStamp = getSuggestionVersionStamp(candidate);
        if (candidateStamp > currentStamp) {
            return cloneSuggestionRecord(candidate);
        }
        if (candidateStamp < currentStamp) {
            return current;
        }

        if (getSuggestionStatusRank(candidate.status) > getSuggestionStatusRank(current.status)) {
            return cloneSuggestionRecord(candidate);
        }
        return current;
    }

    function mergeSuggestionStores(localSuggestions, remoteSuggestions) {
        var map = {};
        var order = [];
        var i;

        function addSuggestion(item) {
            if (!item || !item.id) {
                return;
            }
            if (!map[item.id]) {
                order.push(item.id);
            }
            map[item.id] = choosePreferredSuggestion(map[item.id], item);
        }

        for (i = 0; i < localSuggestions.length; i++) {
            addSuggestion(localSuggestions[i]);
        }
        for (i = 0; i < remoteSuggestions.length; i++) {
            addSuggestion(remoteSuggestions[i]);
        }

        var merged = [];
        for (i = 0; i < order.length; i++) {
            if (map[order[i]]) {
                merged.push(map[order[i]]);
            }
        }

        merged.sort(function (left, right) {
            return getSuggestionVersionStamp(right) - getSuggestionVersionStamp(left);
        });
        return merged;
    }

    function readPersistedSuggestionPayload() {
        var storageKey = getPersistenceStorageKey();
        var payload = "";
        if (storageKey && window.localStorage) {
            try {
                payload = window.localStorage.getItem(storageKey) || "";
            }
            catch (ignore) {
            }
        }

        if (!payload) {
            var shell = getEditorShell();
            if (shell && shell.getAttribute) {
                payload = shell.getAttribute("data-rte-ai-ledger") || "";
            }
        }
        return payload;
    }

    function sendSuggestionLedgerPayload(payload, callback) {
        var url = config.aiToolkitSuggestionLedgerUrl || "";
        if (!url || !payload || !payload.documentKey) {
            if (typeof callback === "function") {
                callback(null);
            }
            return false;
        }
        return sendReviewLogRequest("POST", url, JSON.stringify(payload), callback);
    }

    function getReviewSyncInterval() {
        var parsed = parseInt(config.aiToolkitReviewSyncInterval, 10);
        return parsed >= 5000 ? parsed : 15000;
    }

    function getReviewLastSyncedAt() {
        return editor.__aiReviewLastSyncedAt || 0;
    }

    function setReviewLastSyncedAt(timestamp) {
        editor.__aiReviewLastSyncedAt = timestamp || new Date().getTime();
    }

    function getReviewSyncState() {
        if (!editor.__aiReviewSyncState) {
            editor.__aiReviewSyncState = {
                phase: hasRemoteReviewSync() ? "idle" : "local",
                message: ""
            };
        }
        return editor.__aiReviewSyncState;
    }

    function getReviewSyncMeta() {
        if (!hasRemoteReviewSync()) {
            return {
                subtitle: "Queued AI suggestions for this session.",
                badge: "Local",
                badgeClass: "is-local",
                buttonText: "Sync now",
                buttonDisabled: true,
                syncing: false
            };
        }

        var state = getReviewSyncState();
        if (state.phase === "syncing") {
            return {
                subtitle: state.message || "Syncing shared AI review...",
                badge: "Syncing",
                badgeClass: "is-syncing",
                buttonText: "Syncing...",
                buttonDisabled: true,
                syncing: true
            };
        }

        if (state.phase === "error") {
            return {
                subtitle: state.message || "Shared AI review sync failed. Try again.",
                badge: "Retry",
                badgeClass: "is-error",
                buttonText: "Retry sync",
                buttonDisabled: false,
                syncing: false
            };
        }

        var timestamp = getReviewLastSyncedAt();
        if (!timestamp) {
            return {
                subtitle: "Shared AI review sync is ready.",
                badge: "Shared",
                badgeClass: "is-shared",
                buttonText: "Sync now",
                buttonDisabled: false,
                syncing: false
            };
        }

        var seconds = Math.max(0, Math.round((new Date().getTime() - timestamp) / 1000));
        if (seconds < 5) {
            return {
                subtitle: "Shared AI review synced just now.",
                badge: "Live",
                badgeClass: "is-live",
                buttonText: "Sync now",
                buttonDisabled: false,
                syncing: false
            };
        }
        if (seconds < 60) {
            return {
                subtitle: "Shared AI review synced " + seconds + "s ago.",
                badge: "Live",
                badgeClass: "is-live",
                buttonText: "Sync now",
                buttonDisabled: false,
                syncing: false
            };
        }
        return {
            subtitle: "Shared AI review synced " + Math.round(seconds / 60) + "m ago.",
            badge: "Live",
            badgeClass: "is-live",
            buttonText: "Sync now",
            buttonDisabled: false,
            syncing: false
        };
    }

    function setReviewSyncState(phase, message) {
        var state = getReviewSyncState();
        state.phase = phase || (hasRemoteReviewSync() ? "idle" : "local");
        state.message = message || "";
        updateReviewSyncUi();
    }

    function hasRemoteReviewSync() {
        return !!(config.aiToolkitSuggestionLedgerUrl || config.aiToolkitReviewLogUrl);
    }

    function getReviewSyncLabel() {
        return getReviewSyncMeta().subtitle;
    }

    function updateReviewSyncUi() {
        if (!editor.__aiReviewPanel || !editor.__aiReviewPanel.isConnected) {
            return false;
        }

        var meta = getReviewSyncMeta();
        if (editor.__aiReviewSubtitleNode) {
            editor.__aiReviewSubtitleNode.textContent = meta.subtitle;
        }
        if (editor.__aiReviewSyncBadgeNode) {
            editor.__aiReviewSyncBadgeNode.className = "rte-ai-review-sync-badge " + meta.badgeClass;
            editor.__aiReviewSyncBadgeNode.textContent = meta.badge;
        }
        if (editor.__aiReviewSyncButton) {
            editor.__aiReviewSyncButton.textContent = meta.buttonText;
            editor.__aiReviewSyncButton.disabled = !!meta.buttonDisabled;
            if (meta.syncing) {
                editor.__aiReviewSyncButton.setAttribute("aria-busy", "true");
            }
            else {
                editor.__aiReviewSyncButton.removeAttribute("aria-busy");
            }
        }
        return true;
    }

    function collectRemoteReviewLogEntries(previousEntries, nextEntries) {
        var seen = {};
        var fresh = [];
        var i;
        for (i = 0; i < previousEntries.length; i++) {
            if (previousEntries[i] && previousEntries[i].id) {
                seen[previousEntries[i].id] = true;
            }
        }
        for (i = 0; i < nextEntries.length; i++) {
            if (nextEntries[i] && nextEntries[i].id && !seen[nextEntries[i].id]) {
                fresh.push(nextEntries[i]);
            }
        }
        return fresh;
    }

    function registerRemoteReviewActivity(entries) {
        if (!entries || !entries.length) {
            return false;
        }
        var reviewState = getReviewState();
        reviewState.unseenRemoteActivityCount += entries.length;
        reviewState.latestRemoteActivity = entries[0];
        reviewState.latestRemoteSuggestionId = entries[0] && entries[0].suggestionId ? entries[0].suggestionId : reviewState.latestRemoteSuggestionId;
        for (var i = 0; i < entries.length; i++) {
            if (entries[i] && entries[i].suggestionId) {
                markSuggestionRemoteUpdate(entries[i].suggestionId);
            }
        }
        return true;
    }

    function sortReviewSuggestions(list) {
        return (list || []).slice().sort(function (left, right) {
            var leftRemote = getSuggestionRemoteUpdateCount(left.id);
            var rightRemote = getSuggestionRemoteUpdateCount(right.id);
            if (leftRemote !== rightRemote) {
                return rightRemote - leftRemote;
            }
            if (editor.__aiActiveSuggestionId) {
                if (left.id === editor.__aiActiveSuggestionId) {
                    return -1;
                }
                if (right.id === editor.__aiActiveSuggestionId) {
                    return 1;
                }
            }
            return getSuggestionVersionStamp(right) - getSuggestionVersionStamp(left);
        });
    }

    function applyRemoteSuggestionState() {
        var suggestions = getSuggestionStore().slice();
        var updated = false;
        for (var i = 0; i < suggestions.length; i++) {
            var suggestion = suggestions[i];
            var previewWrapper = getSuggestionWrapper(suggestion.id);
            var resolvedWrapper = getResolvedSuggestionWrapper(suggestion.id);

            if (suggestion.status === "pending") {
                if (resolvedWrapper) {
                    resolvedWrapper.outerHTML = createInlinePreviewHtml(suggestion);
                    updated = true;
                }
                continue;
            }

            if (suggestion.status === "accepted" || suggestion.status === "rejected" || suggestion.status === "stale") {
                var resolvedHtml = getResolvedSuggestionHtml(suggestion, suggestion.status);
                if (previewWrapper) {
                    previewWrapper.outerHTML = resolvedHtml;
                    updated = true;
                }
                else if (resolvedWrapper && (
                    (resolvedWrapper.getAttribute("data-rte-ai-resolved-status") || "") !== suggestion.status
                    || resolvedWrapper.innerHTML !== (suggestion.status === "accepted"
                        ? (suggestion.resultHtml || textToInlineHtml(suggestion.resultText || ""))
                        : (suggestion.originalHtml || textToInlineHtml(suggestion.originalText || "")))
                )) {
                    resolvedWrapper.outerHTML = resolvedHtml;
                    updated = true;
                }
            }
        }

        clearPreviewStateIfMissing();
        return updated;
    }

    function refreshRemoteReviewState(force, callback) {
        if (!hasRemoteReviewSync()) {
            if (typeof callback === "function") {
                callback(getSuggestionStore().slice());
            }
            return false;
        }

        if (editor.__aiReviewSyncInFlight) {
            if (typeof callback === "function") {
                if (!editor.__aiReviewSyncCallbacks) {
                    editor.__aiReviewSyncCallbacks = [];
                }
                editor.__aiReviewSyncCallbacks.push(callback);
            }
            if (force) {
                editor.__aiReviewSyncPending = true;
            }
            setReviewSyncState("syncing", "Syncing shared AI review...");
            return true;
        }

        editor.__aiReviewSyncInFlight = true;
        editor.__aiReviewSyncPending = false;
        editor.__aiReviewSyncCallbacks = typeof callback === "function" ? [callback] : [];
        setReviewSyncState("syncing", "Syncing shared AI review...");

        var remaining = 0;
        var syncedSuggestions = getSuggestionStore().slice();
        var hadFailure = false;
        var previousReviewEntries = getReviewLogEntries().slice();
        var hadReviewLogBaseline = !!editor.__aiReviewLogLoaded;

        function finish() {
            remaining--;
            if (remaining > 0) {
                return;
            }
            editor.__aiReviewSyncInFlight = false;
            if (!hadFailure) {
                setReviewLastSyncedAt(new Date().getTime());
                setReviewSyncState("idle");
            }
            else {
                setReviewSyncState("error", "Shared AI review sync failed. Showing the last known state.");
            }
            if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                renderReviewPanel(false);
            }
            var callbacks = editor.__aiReviewSyncCallbacks ? editor.__aiReviewSyncCallbacks.slice() : [];
            editor.__aiReviewSyncCallbacks = [];
            for (var c = 0; c < callbacks.length; c++) {
                callbacks[c](syncedSuggestions.slice());
            }
            if (editor.__aiReviewSyncPending) {
                editor.__aiReviewSyncPending = false;
                refreshRemoteReviewState(true);
            }
        }

        if (config.aiToolkitSuggestionLedgerUrl) {
            remaining++;
            loadRemoteSuggestionLedger(force, function (items, ok) {
                syncedSuggestions = items || getSuggestionStore().slice();
                if (!ok) {
                    hadFailure = true;
                }
                applyRemoteSuggestionState();
                finish();
            });
        }

        if (config.aiToolkitReviewLogUrl) {
            remaining++;
            loadReviewLogEntries(force, function (items, ok) {
                if (!ok) {
                    hadFailure = true;
                }
                else if (hadReviewLogBaseline) {
                    registerRemoteReviewActivity(collectRemoteReviewLogEntries(previousReviewEntries, items || []));
                }
                finish();
            });
        }

        return remaining > 0;
    }

    function loadRemoteSuggestionLedger(force, callback) {
        var url = config.aiToolkitSuggestionLedgerUrl || "";
        var documentKey = getSuggestionLedgerDocumentKey();
        if (!url || !documentKey) {
            if (typeof callback === "function") {
                callback(getSuggestionStore().slice(), false);
            }
            return false;
        }

        if (!force && editor.__aiSuggestionLedgerLoaded) {
            if (typeof callback === "function") {
                callback(getSuggestionStore().slice(), true);
            }
            return true;
        }

        sendReviewLogRequest("GET", url + "?key=" + encodeURIComponent(documentKey), null, function (xhr) {
            var remoteSuggestions = [];
            var ok = !!(xhr && xhr.status >= 200 && xhr.status < 300);
            if (ok) {
                try {
                    var payload = JSON.parse(xhr.responseText || "{}");
                    var list = payload && payload.suggestions ? payload.suggestions : [];
                    for (var i = 0; i < list.length; i++) {
                        var normalized = normalizePersistedSuggestion(list[i]);
                        if (normalized) {
                            remoteSuggestions.push(normalized);
                        }
                    }
                }
                catch (ignore) {
                }
            }

            var merged = mergeSuggestionStores(getSuggestionStore(), remoteSuggestions);
            editor.__aiSuggestions = merged;
            editor.__aiSuggestionLedgerLoaded = ok;
            persistSuggestionStore({ skipRemote: true });
            if (typeof callback === "function") {
                callback(merged.slice(), ok);
            }
        });
        return true;
    }

    function stopRemoteReviewSync() {
        if (editor.__aiReviewSyncTimer) {
            window.clearInterval(editor.__aiReviewSyncTimer);
            editor.__aiReviewSyncTimer = null;
        }
    }

    function startRemoteReviewSync() {
        if (!hasRemoteReviewSync() || editor.__aiReviewSyncTimer || !window.setInterval) {
            return false;
        }
        editor.__aiReviewSyncTimer = window.setInterval(function () {
            if (document && document.hidden) {
                return;
            }
            refreshRemoteReviewState(true);
        }, getReviewSyncInterval());
        return true;
    }

    function bindRemoteReviewSyncEvents() {
        if (editor.__aiReviewSyncEventsBound) {
            return;
        }
        editor.__aiReviewSyncEventsBound = true;

        if (document && document.addEventListener) {
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) {
                    refreshRemoteReviewState(true);
                }
            });
        }
        if (window && window.addEventListener) {
            window.addEventListener("focus", function () {
                refreshRemoteReviewState(true);
            });
        }
    }

    function persistSuggestionStore(options) {
        options = options || {};
        var payloadData = buildSuggestionLedgerPayload();
        var payload = JSON.stringify(payloadData);

        var shell = getEditorShell();
        if (shell && shell.setAttribute) {
            shell.setAttribute("data-rte-ai-ledger", payload);
        }

        var storageKey = getPersistenceStorageKey();
        if (storageKey && window.localStorage) {
            try {
                window.localStorage.setItem(storageKey, payload);
            }
            catch (ignore) {
            }
        }
        if (!options.skipRemote) {
            sendSuggestionLedgerPayload(payloadData, function (xhr) {
                if (!xhr || xhr.status < 200 || xhr.status >= 300) {
                    console.warn("AI suggestion ledger request failed");
                }
            });
        }
        return payload;
    }

    function restoreSuggestionStore() {
        var payload = readPersistedSuggestionPayload();
        if (!payload) {
            editor.__aiSuggestions = [];
            clearLastReviewDecision();
            setActiveSuggestionId(null);
            return [];
        }

        try {
            var parsed = JSON.parse(payload);
            var list = parsed && parsed.suggestions ? parsed.suggestions : [];
            var restored = [];
            for (var i = 0; i < list.length; i++) {
                var normalized = normalizePersistedSuggestion(list[i]);
                if (normalized) {
                    restored.push(normalized);
                }
            }
            editor.__aiSuggestions = restored;
            clearLastReviewDecision();
            setActiveSuggestionId(null);
            return restored.slice();
        }
        catch (error) {
            editor.__aiSuggestions = [];
            clearLastReviewDecision();
            setActiveSuggestionId(null);
            return [];
        }
    }

    function clearSuggestionStore() {
        editor.__aiSuggestions = [];
        clearLastReviewDecision();
        setActiveSuggestionId(null);
        var shell = getEditorShell();
        if (shell && shell.removeAttribute) {
            shell.removeAttribute("data-rte-ai-ledger");
        }
        var storageKey = getPersistenceStorageKey();
        if (storageKey && window.localStorage) {
            try {
                window.localStorage.removeItem(storageKey);
            }
            catch (ignore) {
            }
        }
        editor.__aiSuggestionLedgerLoaded = false;
        sendSuggestionLedgerPayload({
            version: "2026-04-18",
            documentKey: getSuggestionLedgerDocumentKey(),
            savedAt: new Date().getTime(),
            suggestions: []
        }, function () { });
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(false);
        }
        return true;
    }

    function getReviewState() {
        if (!editor.__aiReviewState) {
            editor.__aiReviewState = {
                showResolved: false,
                typeFilter: "all",
                unseenRemoteActivityCount: 0,
                latestRemoteActivity: null,
                latestRemoteSuggestionId: "",
                remoteSuggestionIds: {}
            };
        }
        return editor.__aiReviewState;
    }

    function markReviewActivitySeen() {
        var reviewState = getReviewState();
        reviewState.unseenRemoteActivityCount = 0;
        reviewState.latestRemoteActivity = null;
        reviewState.latestRemoteSuggestionId = "";
        reviewState.remoteSuggestionIds = {};
    }

    function markSuggestionRemoteUpdate(suggestionId) {
        if (!suggestionId) {
            return false;
        }
        var reviewState = getReviewState();
        reviewState.remoteSuggestionIds[suggestionId] = (reviewState.remoteSuggestionIds[suggestionId] || 0) + 1;
        return true;
    }

    function clearSuggestionRemoteUpdate(suggestionId) {
        var reviewState = getReviewState();
        if (suggestionId && reviewState.remoteSuggestionIds[suggestionId]) {
            delete reviewState.remoteSuggestionIds[suggestionId];
            return true;
        }
        return false;
    }

    function getSuggestionRemoteUpdateCount(suggestionId) {
        var reviewState = getReviewState();
        return suggestionId ? (reviewState.remoteSuggestionIds[suggestionId] || 0) : 0;
    }

    function getLatestRemoteSuggestionId() {
        return getReviewState().latestRemoteSuggestionId || "";
    }

    function getReviewActivityNotice() {
        var reviewState = getReviewState();
        if (!reviewState.unseenRemoteActivityCount) {
            return null;
        }

        var latestEntry = reviewState.latestRemoteActivity;
        var count = reviewState.unseenRemoteActivityCount;
        return {
            count: count,
            title: count === 1 ? "1 shared review update just arrived." : count + " shared review updates just arrived.",
            detail: latestEntry ? summarizeReviewLogEntry(latestEntry) : "Shared AI review activity is newer than your local view."
        };
    }

    function findSuggestionById(suggestionId) {
        var suggestions = getSuggestionStore();
        for (var i = 0; i < suggestions.length; i++) {
            if (suggestions[i].id === suggestionId) {
                return suggestions[i];
            }
        }
        return null;
    }

    function getSuggestionWrapper(suggestionId) {
        var editable = editor.getEditable ? editor.getEditable() : null;
        return editable ? editable.querySelector("[data-rte-ai-suggestion-id=\"" + suggestionId + "\"]") : null;
    }

    function getResolvedSuggestionWrapper(suggestionId) {
        var editable = editor.getEditable ? editor.getEditable() : null;
        return editable ? editable.querySelector("[data-rte-ai-resolved-id=\"" + suggestionId + "\"]") : null;
    }

    function getResolvedSuggestionHtml(suggestion, statusOverride) {
        if (!suggestion) {
            return "";
        }
        var status = statusOverride || suggestion.status || "accepted";
        var wrapperTag = suggestion.isBlock ? "div" : "span";
        var innerHtml = status === "accepted"
            ? (suggestion.resultHtml || textToInlineHtml(suggestion.resultText || ""))
            : (suggestion.originalHtml || textToInlineHtml(suggestion.originalText || ""));
        return "<" + wrapperTag + " class=\"rte-ai-resolved-suggestion is-" + escapeAttribute(status) + (suggestion.isBlock ? " is-block" : " is-inline") + "\" data-rte-ai-resolved-id=\"" + escapeAttribute(suggestion.id) + "\" data-rte-ai-resolved-status=\"" + escapeAttribute(status) + "\">"
            + innerHtml
            + "</" + wrapperTag + ">";
    }

    function getReviewDecisionHistory() {
        if (!editor.__aiReviewDecisionHistory) {
            editor.__aiReviewDecisionHistory = [];
        }
        return editor.__aiReviewDecisionHistory;
    }

    function getLastReviewDecision() {
        var history = getReviewDecisionHistory();
        return history.length ? history[history.length - 1] : null;
    }

    function setLastReviewDecision(suggestion, status, options) {
        options = options || {};
        if (!suggestion || !suggestion.id || !status) {
            clearLastReviewDecision();
            return null;
        }
        if (options.clearRedo !== false) {
            clearRedoReviewDecision();
        }
        var history = getReviewDecisionHistory();
        history.push({
            suggestionId: suggestion.id,
            status: status,
            timestamp: new Date().getTime()
        });
        if (history.length > 12) {
            history.splice(0, history.length - 12);
        }
        return history[history.length - 1];
    }

    function popLastReviewDecision() {
        var history = getReviewDecisionHistory();
        return history.length ? history.pop() : null;
    }

    function getReviewRedoHistory() {
        if (!editor.__aiReviewRedoHistory) {
            editor.__aiReviewRedoHistory = [];
        }
        return editor.__aiReviewRedoHistory;
    }

    function pushRedoReviewDecision(suggestion, status) {
        if (!suggestion || !suggestion.id || !status) {
            return null;
        }
        var history = getReviewRedoHistory();
        history.push({
            suggestionId: suggestion.id,
            status: status,
            timestamp: new Date().getTime()
        });
        if (history.length > 12) {
            history.splice(0, history.length - 12);
        }
        return history[history.length - 1];
    }

    function popRedoReviewDecision() {
        var history = getReviewRedoHistory();
        return history.length ? history.pop() : null;
    }

    function clearRedoReviewDecision() {
        editor.__aiReviewRedoHistory = [];
    }

    function clearLastReviewDecision() {
        editor.__aiReviewDecisionHistory = [];
        clearRedoReviewDecision();
    }

    function getUndoableReviewDecision() {
        var history = getReviewDecisionHistory();
        while (history.length) {
            var decision = history[history.length - 1];
            if (!decision || !decision.suggestionId) {
                history.pop();
                continue;
            }
            var suggestion = findSuggestionById(decision.suggestionId);
            var wrapper = getResolvedSuggestionWrapper(decision.suggestionId);
            if (!suggestion || !wrapper || suggestion.status !== decision.status) {
                history.pop();
                continue;
            }
            return {
                suggestion: suggestion,
                wrapper: wrapper,
                status: decision.status,
                timestamp: decision.timestamp || 0,
                historyCount: history.length,
                remainingCount: history.length - 1
            };
        }
        return null;
    }

    function getRedoableReviewDecision() {
        var history = getReviewRedoHistory();
        while (history.length) {
            var decision = history[history.length - 1];
            if (!decision || !decision.suggestionId) {
                history.pop();
                continue;
            }
            var suggestion = findSuggestionById(decision.suggestionId);
            var wrapper = getSuggestionWrapper(decision.suggestionId);
            if (!suggestion || !wrapper || suggestion.status !== "pending") {
                history.pop();
                continue;
            }
            return {
                suggestion: suggestion,
                wrapper: wrapper,
                status: decision.status,
                timestamp: decision.timestamp || 0,
                historyCount: history.length,
                remainingCount: history.length - 1
            };
        }
        return null;
    }

    function getUndoDecisionContext(undoable) {
        undoable = undoable || getUndoableReviewDecision();
        if (!undoable || !undoable.suggestion) {
            return {
                actionLabel: "Undo last",
                shortcutLabel: "undo last",
                decisionLabel: "last",
                typeLabel: "",
                detailLabel: "last suggestion",
                summaryText: ""
            };
        }
        var suggestion = undoable.suggestion;
        var statusLabel = undoable.status === "rejected"
            ? "rejected"
            : undoable.status === "accepted"
                ? "accepted"
                : "resolved";
        var suggestionTypeLabel = suggestion.suggestionType && suggestion.suggestionType !== "other"
            ? getSuggestionTypeLabel(suggestion.suggestionType).toLowerCase()
            : "";
        return {
            actionLabel: "Undo " + statusLabel + (suggestionTypeLabel ? " " + suggestionTypeLabel : "") + (undoable.remainingCount ? " (" + undoable.remainingCount + " more)" : ""),
            shortcutLabel: "undo " + statusLabel,
            decisionLabel: statusLabel,
            typeLabel: suggestionTypeLabel,
            detailLabel: statusLabel + " " + (suggestionTypeLabel ? suggestionTypeLabel + " " : "") + "suggestion",
            summaryText: summarizeSuggestionText(suggestion.originalText || suggestion.resultText || "suggestion", 72),
            remainingCount: undoable.remainingCount || 0
        };
    }

    function buildUndoDecisionSummaryText(undoable) {
        var undoContext = getUndoDecisionContext(undoable);
        if (!undoable || !undoable.suggestion) {
            return "";
        }
        return "Undo target: " + undoContext.detailLabel + (undoContext.summaryText ? " - " + undoContext.summaryText : "") + (undoContext.remainingCount ? ". " + undoContext.remainingCount + " earlier undo" + (undoContext.remainingCount === 1 ? " remains." : "s remain.") : "");
    }

    function buildRedoDecisionSummaryText(redoable) {
        var redoContext = getRedoDecisionContext(redoable);
        if (!redoable || !redoable.suggestion) {
            return "";
        }
        return "Redo target: " + redoContext.detailLabel + (redoContext.summaryText ? " - " + redoContext.summaryText : "") + (redoContext.remainingCount ? ". " + redoContext.remainingCount + " earlier redo" + (redoContext.remainingCount === 1 ? " remains." : "s remain.") : "");
    }

    function getRedoDecisionContext(redoable) {
        redoable = redoable || getRedoableReviewDecision();
        if (!redoable || !redoable.suggestion) {
            return {
                actionLabel: "Redo last",
                shortcutLabel: "redo last",
                decisionLabel: "last",
                detailLabel: "last suggestion",
                summaryText: "",
                remainingCount: 0
            };
        }
        var suggestion = redoable.suggestion;
        var statusLabel = redoable.status === "rejected"
            ? "rejected"
            : redoable.status === "accepted"
                ? "accepted"
                : "resolved";
        var suggestionTypeLabel = suggestion.suggestionType && suggestion.suggestionType !== "other"
            ? getSuggestionTypeLabel(suggestion.suggestionType).toLowerCase()
            : "";
        return {
            actionLabel: "Redo " + statusLabel + (suggestionTypeLabel ? " " + suggestionTypeLabel : "") + (redoable.remainingCount ? " (" + redoable.remainingCount + " more)" : ""),
            shortcutLabel: "redo " + statusLabel,
            decisionLabel: statusLabel,
            detailLabel: statusLabel + " " + (suggestionTypeLabel ? suggestionTypeLabel + " " : "") + "suggestion",
            summaryText: summarizeSuggestionText(suggestion.originalText || suggestion.resultText || "suggestion", 72),
            remainingCount: redoable.remainingCount || 0
        };
    }

    function getUndoDecisionHistorySummaries(limit) {
        var history = getReviewDecisionHistory();
        var summaries = [];
        var maxCount = typeof limit === "number" ? limit : 3;
        for (var i = history.length - 2; i >= 0 && summaries.length < maxCount; i--) {
            var decision = history[i];
            if (!decision || !decision.suggestionId) {
                continue;
            }
            var suggestion = findSuggestionById(decision.suggestionId);
            var wrapper = getResolvedSuggestionWrapper(decision.suggestionId);
            if (!suggestion || !wrapper || suggestion.status !== decision.status) {
                continue;
            }
            var undoable = {
                suggestion: suggestion,
                wrapper: wrapper,
                status: decision.status,
                timestamp: decision.timestamp || 0,
                historyCount: i + 1,
                remainingCount: i
            };
            var undoContext = getUndoDecisionContext(undoable);
            summaries.push({
                label: undoContext.actionLabel,
                detail: buildUndoDecisionSummaryText(undoable)
            });
        }
        return summaries;
    }

    function getRedoDecisionHistorySummaries(limit) {
        var history = getReviewRedoHistory();
        var summaries = [];
        var maxCount = typeof limit === "number" ? limit : 3;
        for (var i = history.length - 2; i >= 0 && summaries.length < maxCount; i--) {
            var decision = history[i];
            if (!decision || !decision.suggestionId) {
                continue;
            }
            var suggestion = findSuggestionById(decision.suggestionId);
            var wrapper = getSuggestionWrapper(decision.suggestionId);
            if (!suggestion || !wrapper || suggestion.status !== "pending") {
                continue;
            }
            var redoable = {
                suggestion: suggestion,
                wrapper: wrapper,
                status: decision.status,
                timestamp: decision.timestamp || 0,
                historyCount: i + 1,
                remainingCount: i
            };
            var redoContext = getRedoDecisionContext(redoable);
            summaries.push({
                label: redoContext.actionLabel,
                detail: redoContext.detailLabel + (redoContext.summaryText ? " - " + redoContext.summaryText : "")
            });
        }
        return summaries;
    }

    function appendReviewItemRecoveryHistory(item, historyItems, mode) {
        if (!item || !historyItems || !historyItems.length) {
            return null;
        }
        var history = append(item, "div", "", "rte-ai-review-item-history" + (mode ? " is-" + mode : ""));
        append(history, "div", "", "rte-ai-review-item-history-title", "Then");
        for (var i = 0; i < historyItems.length; i++) {
            var historyItem = historyItems[i];
            var row = append(history, "div", "", "rte-ai-review-item-history-item");
            append(row, "div", "", "rte-ai-review-item-history-label", historyItem.label);
            append(row, "div", "", "rte-ai-review-item-history-detail", historyItem.detail);
        }
        return history;
    }

    function ensureReviewRecoveryNodeId(node, prefix, suggestionId) {
        if (!node || !node.setAttribute) {
            return "";
        }
        if (node.id) {
            return node.id;
        }
        var safeSuggestionId = String(suggestionId || "item").replace(/[^A-Za-z0-9\-_:.]/g, "-");
        node.id = "rte-ai-review-" + prefix + "-" + safeSuggestionId;
        return node.id;
    }

    function focusInlineSuggestionWrapper(wrapper) {
        if (!wrapper || !wrapper.focus) {
            return false;
        }
        try {
            wrapper.focus({ preventScroll: true });
            return true;
        }
        catch (error) {
            try {
                wrapper.focus();
                return true;
            }
            catch (innerError) {
                return false;
            }
        }
    }

    function focusInlineSuggestionActionButton(wrapper, actionName) {
        if (!wrapper || !actionName || !wrapper.querySelector) {
            return false;
        }
        var actionButton = wrapper.querySelector('[data-rte-ai-action="' + actionName + '"]');
        if (actionButton && !actionButton.disabled && actionButton.focus) {
            try {
                actionButton.focus({ preventScroll: true });
                return true;
            }
            catch (error) {
                try {
                    actionButton.focus();
                    return true;
                }
                catch (innerError) {
                }
            }
        }
        return false;
    }

    function focusInlineSuggestionAction(suggestionId, actionName) {
        if (!suggestionId) {
            return false;
        }
        var wrapper = getSuggestionWrapper(suggestionId);
        if (!wrapper) {
            return false;
        }
        if (focusInlineSuggestionActionButton(wrapper, actionName)) {
            return true;
        }
        return focusInlineSuggestionWrapper(wrapper);
    }

    function getDefaultInlineReviewActionName(suggestion) {
        if (!suggestion) {
            return "";
        }
        var redoable = getRedoableReviewDecision();
        if (suggestion.status === "pending" && redoable && redoable.suggestion && redoable.suggestion.id === suggestion.id) {
            return "redo";
        }
        return suggestion.status === "pending" ? "accept" : "review";
    }

    function focusDefaultInlineReviewAction(suggestionId, preferredAction) {
        var suggestion = findSuggestionById(suggestionId);
        if (!suggestion) {
            return false;
        }
        var wrapper = getSuggestionWrapper(suggestionId);
        var defaultInlineAction = getDefaultInlineReviewActionName(suggestion);
        var focusAction = preferredAction || defaultInlineAction;
        if (wrapper) {
            if (focusInlineSuggestionActionButton(wrapper, focusAction)) {
                return true;
            }
            if (defaultInlineAction && defaultInlineAction !== focusAction && focusInlineSuggestionActionButton(wrapper, defaultInlineAction)) {
                return true;
            }
        }
        var panelFocusAction = defaultInlineAction && defaultInlineAction !== focusAction
            ? defaultInlineAction
            : focusAction;
        return activateReviewSuggestion(suggestionId, {
            focusPanel: true,
            focusAction: panelFocusAction === "review" ? "" : panelFocusAction
        });
    }

    function syncInlineSuggestionRemoteChip(wrapper, remoteChip, sharedUpdateCount, anchorNode) {
        if (!wrapper) {
            return null;
        }
        if (!sharedUpdateCount) {
            if (remoteChip && remoteChip.parentNode) {
                remoteChip.parentNode.removeChild(remoteChip);
            }
            return null;
        }

        if (!remoteChip) {
            remoteChip = document.createElement("span");
            remoteChip.className = "rte-ai-inline-preview-remote";
        }

        remoteChip.textContent = sharedUpdateCount > 1 ? sharedUpdateCount + " shared updates" : "Shared update";
        remoteChip.setAttribute("aria-label", "Shared AI review updates");

        var referenceNode = anchorNode && anchorNode.parentNode === wrapper ? anchorNode : (wrapper.querySelector ? wrapper.querySelector(".rte-ai-inline-preview-actions") : null);
        if (referenceNode && referenceNode.parentNode === wrapper) {
            if (referenceNode.nextSibling !== remoteChip) {
                if (referenceNode.nextSibling) {
                    wrapper.insertBefore(remoteChip, referenceNode.nextSibling);
                }
                else {
                    wrapper.appendChild(remoteChip);
                }
            }
        }
        else if (remoteChip.parentNode !== wrapper) {
            wrapper.appendChild(remoteChip);
        }

        return remoteChip;
    }

    function updateActiveSuggestionDecorations() {
        var editable = editor.getEditable ? editor.getEditable() : null;
        if (!editable || !editable.querySelectorAll) {
            return false;
        }

        var wrappers = editable.querySelectorAll("[data-rte-ai-suggestion-id]");
        var undoableInlineDecision = getUndoableReviewDecision();
        var redoableInlineDecision = getRedoableReviewDecision();
        for (var i = 0; i < wrappers.length; i++) {
            var suggestionId = wrappers[i].getAttribute("data-rte-ai-suggestion-id") || "";
            var suggestion = findSuggestionById(suggestionId);
            var currentChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-current") : null;
            var openedChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-opened") : null;
            var typeChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-type") : null;
            var languageChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-language") : null;
            var scopeChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-scope") : null;
            var remoteChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-remote") : null;
            var queueChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-queue") : null;
            var transitionChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-transition") : null;
            var followupChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-followup") : null;
            var undoChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-undo") : null;
            var undoNextChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-undo-next") : null;
            var redoChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-redo") : null;
            var redoNextChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-redo-next") : null;
            var shortcutsChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-shortcuts") : null;
            var launchChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-launch") : null;
            var focusChip = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-focus") : null;
            var reviewButton = wrappers[i].querySelector ? wrappers[i].querySelector("[data-rte-ai-action=\"review\"]") : null;
            var previousButton = wrappers[i].querySelector ? wrappers[i].querySelector("[data-rte-ai-action=\"previous\"]") : null;
            var nextButton = wrappers[i].querySelector ? wrappers[i].querySelector("[data-rte-ai-action=\"next\"]") : null;
            var acceptButton = wrappers[i].querySelector ? wrappers[i].querySelector("[data-rte-ai-action=\"accept\"]") : null;
            var rejectButton = wrappers[i].querySelector ? wrappers[i].querySelector("[data-rte-ai-action=\"reject\"]") : null;
            var undoButton = wrappers[i].querySelector ? wrappers[i].querySelector("[data-rte-ai-action=\"undo\"]") : null;
            var redoButton = wrappers[i].querySelector ? wrappers[i].querySelector("[data-rte-ai-action=\"redo\"]") : null;
            var sharedSeenButton = wrappers[i].querySelector ? wrappers[i].querySelector("[data-rte-ai-action=\"shared-seen\"]") : null;
            var sharedUpdateCount = getSuggestionRemoteUpdateCount(suggestionId);
            var isPreviewTarget = !!(editor.__aiReviewEmptyPreviewSuggestionId && suggestionId === editor.__aiReviewEmptyPreviewSuggestionId);
            var isQueueOpened = !!(!isPreviewTarget && editor.__aiRecentlyOpenedQueueSuggestionId && suggestionId === editor.__aiRecentlyOpenedQueueSuggestionId);
            var undoInlineContext = !isPreviewTarget && undoableInlineDecision ? getUndoDecisionContext(undoableInlineDecision) : null;
            var undoInlineSummaryText = !isPreviewTarget && undoableInlineDecision ? buildUndoDecisionSummaryText(undoableInlineDecision) : "";
            var undoInlineHistoryItems = !isPreviewTarget ? getUndoDecisionHistorySummaries(1) : [];
            var undoInlineNextItem = undoInlineHistoryItems.length ? undoInlineHistoryItems[0] : null;
            var isRedoTarget = !!(!isPreviewTarget && redoableInlineDecision && redoableInlineDecision.suggestion && redoableInlineDecision.suggestion.id === suggestionId && suggestion && suggestion.status === "pending");
            var redoInlineContext = isRedoTarget ? getRedoDecisionContext(redoableInlineDecision) : null;
            var redoInlineSummaryText = isRedoTarget ? buildRedoDecisionSummaryText(redoableInlineDecision) : "";
            var redoInlineHistoryItems = isRedoTarget ? getRedoDecisionHistorySummaries(1) : [];
            var redoInlineNextItem = redoInlineHistoryItems.length ? redoInlineHistoryItems[0] : null;
            var queueFocusLabel = isPreviewTarget ? getReviewFocusActionDisplayLabel(suggestion, getPreferredReviewActionFocus()) : "";
            if (editor.__aiActiveSuggestionId && suggestionId === editor.__aiActiveSuggestionId) {
                wrappers[i].classList.add("is-review-active");
                wrappers[i].classList.toggle("is-review-preview", isPreviewTarget);
                wrappers[i].classList.toggle("is-queue-opened", isQueueOpened);
                if (isPreviewTarget) {
                    wrappers[i].setAttribute("role", "button");
                    wrappers[i].removeAttribute("aria-current");
                    wrappers[i].setAttribute("aria-keyshortcuts", "Enter Space");
                    wrappers[i].setAttribute("tabindex", "0");
                    wrappers[i].title = getSuggestionQueueActionTitle(suggestion);
                }
                else {
                    wrappers[i].setAttribute("role", "group");
                    wrappers[i].setAttribute("aria-current", "step");
                    wrappers[i].setAttribute("aria-keyshortcuts", (sharedUpdateCount ? "ArrowLeft ArrowRight Home End J K A R G Enter Space" : "ArrowLeft ArrowRight Home End J K A R Enter Space") + (undoInlineContext ? " U" : "") + (isRedoTarget ? " Shift+U" : ""));
                    wrappers[i].setAttribute("tabindex", "0");
                    wrappers[i].title = getInlineReviewWrapperShortcutTitle({
                        suggestion: suggestion,
                        sharedUpdateCount: sharedUpdateCount,
                        undoInlineContext: undoInlineContext,
                        redoInlineContext: redoInlineContext
                    });
                }
                var typeFilter = getInlineReviewTypeFilter(suggestionId);
                var pendingPosition = getPendingSuggestionPosition(typeFilter, suggestionId);
                var queueTransitionData = !isPreviewTarget ? buildReviewQueueTransitionData(getFilteredPendingSuggestions(typeFilter), editor.__aiActiveSuggestionId, suggestion) : null;
                var previousSuggestionId = getPreviousInlineReviewSuggestionId(suggestionId);
                var nextSuggestionId = getNextInlineReviewSuggestionId(suggestionId);
                var reviewLabel = isPreviewTarget ? "Open this AI review queue" : "Open this AI suggestion in review";
                var previousLabel = previousSuggestionId ? "Previous AI review item" : "No previous AI review item in the current queue";
                var nextLabel = nextSuggestionId ? "Next AI review item" : "No next AI review item in the current queue";
                var acceptActionPresentation = getPendingReviewActionPresentation(suggestion, "accept", typeFilter) || { text: "Accept", label: "Accept this AI change" };
                var rejectActionPresentation = getPendingReviewActionPresentation(suggestion, "reject", typeFilter) || { text: "Reject", label: "Reject this AI change" };
                var acceptLabel = acceptActionPresentation.label;
                var rejectLabel = rejectActionPresentation.label;
                var undoLabel = undoInlineSummaryText || "Undo the last AI review decision";
                var redoLabel = redoInlineSummaryText || "Redo the last AI review decision";
                var inlineButtonShortcutOptions = {
                    isPreviewTarget: isPreviewTarget,
                    sharedUpdateCount: sharedUpdateCount,
                    undoInlineContext: undoInlineContext,
                    redoInlineContext: redoInlineContext
                };
                updateInlineReviewActionButtonState(reviewButton, isPreviewTarget ? "Open queue" : "Review", reviewLabel);
                updateInlineReviewButtonState(previousButton, !previousSuggestionId, previousLabel);
                updateInlineReviewButtonState(nextButton, !nextSuggestionId, nextLabel);
                updateInlineReviewActionButtonState(acceptButton, acceptActionPresentation.text, acceptLabel);
                updateInlineReviewActionButtonState(rejectButton, rejectActionPresentation.text, rejectLabel);
                applyInlineReviewButtonShortcutState(reviewButton, reviewLabel, inlineButtonShortcutOptions);
                applyInlineReviewButtonShortcutState(previousButton, previousLabel, inlineButtonShortcutOptions);
                applyInlineReviewButtonShortcutState(nextButton, nextLabel, inlineButtonShortcutOptions);
                applyInlineReviewButtonShortcutState(acceptButton, acceptLabel, inlineButtonShortcutOptions);
                applyInlineReviewButtonShortcutState(rejectButton, rejectLabel, inlineButtonShortcutOptions);
                var actionsNodeForRecoveryState = getInlinePreviewActionContainer(wrappers[i], "recovery");
                if (undoInlineContext) {
                    if (!undoButton) {
                        undoButton = document.createElement("button");
                        undoButton.type = "button";
                        undoButton.className = "rte-ai-inline-preview-button is-undo";
                        undoButton.setAttribute("data-rte-ai-action", "undo");
                        if (actionsNodeForRecoveryState) {
                            actionsNodeForRecoveryState.appendChild(undoButton);
                        }
                    }
                    updateInlineReviewActionButtonState(undoButton, undoInlineContext.actionLabel, undoLabel);
                    applyInlineReviewButtonShortcutState(undoButton, undoLabel, inlineButtonShortcutOptions);
                }
                else if (undoButton && undoButton.parentNode) {
                    undoButton.parentNode.removeChild(undoButton);
                    undoButton = null;
                }
                if (isRedoTarget && redoInlineContext) {
                    if (!redoButton) {
                        redoButton = document.createElement("button");
                        redoButton.type = "button";
                        redoButton.className = "rte-ai-inline-preview-button is-redo";
                        redoButton.setAttribute("data-rte-ai-action", "redo");
                        if (actionsNodeForRecoveryState) {
                            actionsNodeForRecoveryState.appendChild(redoButton);
                        }
                    }
                    updateInlineReviewActionButtonState(redoButton, redoInlineContext.actionLabel, redoLabel);
                    applyInlineReviewButtonShortcutState(redoButton, redoLabel, inlineButtonShortcutOptions);
                }
                else if (redoButton && redoButton.parentNode) {
                    redoButton.parentNode.removeChild(redoButton);
                    redoButton = null;
                }
                if (!currentChip) {
                    currentChip = document.createElement("span");
                    currentChip.className = "rte-ai-inline-preview-current";
                    var actionsNode = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-actions") : null;
                    if (actionsNode && actionsNode.nextSibling) {
                        wrappers[i].insertBefore(currentChip, actionsNode.nextSibling);
                    }
                    else {
                        wrappers[i].appendChild(currentChip);
                    }
                }
                currentChip.classList.toggle("is-preview-target", isPreviewTarget);
                currentChip.textContent = isPreviewTarget ? "Next queue" : "Current";
                currentChip.setAttribute("aria-label", isPreviewTarget ? "Next AI review queue target" : "Current AI review item");
                if (isQueueOpened) {
                    if (!openedChip) {
                        openedChip = document.createElement("span");
                        openedChip.className = "rte-ai-inline-preview-opened";
                        if (currentChip && currentChip.nextSibling) {
                            wrappers[i].insertBefore(openedChip, currentChip.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(openedChip);
                        }
                    }
                    openedChip.textContent = "Queue opened";
                    openedChip.setAttribute("aria-label", "AI review queue opened");
                }
                else if (openedChip && openedChip.parentNode) {
                    openedChip.parentNode.removeChild(openedChip);
                }
                if (isPreviewTarget) {
                    if (!launchChip) {
                        launchChip = document.createElement("span");
                        launchChip.className = "rte-ai-inline-preview-launch";
                        if (currentChip && currentChip.nextSibling) {
                            wrappers[i].insertBefore(launchChip, currentChip.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(launchChip);
                        }
                    }
                    launchChip.textContent = getSuggestionQueueActionLabel(suggestion);
                    launchChip.setAttribute("aria-hidden", "true");
                    if (queueFocusLabel) {
                        if (!focusChip) {
                            focusChip = document.createElement("span");
                            focusChip.className = "rte-ai-inline-preview-focus";
                            var focusAnchor = launchChip || currentChip;
                            if (focusAnchor && focusAnchor.nextSibling) {
                                wrappers[i].insertBefore(focusChip, focusAnchor.nextSibling);
                            }
                            else {
                                wrappers[i].appendChild(focusChip);
                            }
                        }
                        focusChip.textContent = "Focus " + queueFocusLabel;
                        focusChip.setAttribute("aria-label", "Queue opens on " + queueFocusLabel);
                    }
                    else if (focusChip && focusChip.parentNode) {
                        focusChip.parentNode.removeChild(focusChip);
                    }
                }
                else {
                    if (launchChip && launchChip.parentNode) {
                        launchChip.parentNode.removeChild(launchChip);
                    }
                    if (focusChip && focusChip.parentNode) {
                        focusChip.parentNode.removeChild(focusChip);
                    }
                }
                if (suggestion && suggestion.suggestionType && getSuggestionTypeValue(suggestion.suggestionType) !== "other") {
                    if (!typeChip) {
                        typeChip = document.createElement("span");
                        typeChip.className = "rte-ai-inline-preview-type";
                        if (currentChip && currentChip.nextSibling) {
                            wrappers[i].insertBefore(typeChip, currentChip.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(typeChip);
                        }
                    }
                    typeChip.textContent = getSuggestionTypeLabel(suggestion.suggestionType);
                    typeChip.setAttribute("aria-label", "AI suggestion type");
                }
                else if (typeChip && typeChip.parentNode) {
                    typeChip.parentNode.removeChild(typeChip);
                }
                if (suggestion && suggestion.language) {
                    if (!languageChip) {
                        languageChip = document.createElement("span");
                        languageChip.className = "rte-ai-inline-preview-language";
                        var languageAnchor = typeChip || currentChip;
                        if (languageAnchor && languageAnchor.nextSibling) {
                            wrappers[i].insertBefore(languageChip, languageAnchor.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(languageChip);
                        }
                    }
                    languageChip.textContent = getTranslateLanguageLabel(suggestion.language);
                    languageChip.setAttribute("aria-label", "AI suggestion language");
                }
                else if (languageChip && languageChip.parentNode) {
                    languageChip.parentNode.removeChild(languageChip);
                }
                var scopeLabel = getSuggestionScopeLabel(suggestion);
                if (scopeLabel) {
                    if (!scopeChip) {
                        scopeChip = document.createElement("span");
                        scopeChip.className = "rte-ai-inline-preview-scope";
                        var scopeAnchor = languageChip || typeChip || currentChip;
                        if (scopeAnchor && scopeAnchor.nextSibling) {
                            wrappers[i].insertBefore(scopeChip, scopeAnchor.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(scopeChip);
                        }
                    }
                    scopeChip.textContent = scopeLabel;
                    scopeChip.setAttribute("aria-label", "AI suggestion scope");
                }
                else if (scopeChip && scopeChip.parentNode) {
                    scopeChip.parentNode.removeChild(scopeChip);
                }
                remoteChip = syncInlineSuggestionRemoteChip(
                    wrappers[i],
                    remoteChip,
                    sharedUpdateCount,
                    scopeChip || languageChip || typeChip || currentChip || (wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-actions") : null)
                );
                var actionsNodeForSharedState = getInlinePreviewActionContainer(wrappers[i], "recovery");
                if (sharedUpdateCount) {
                    if (!sharedSeenButton) {
                        sharedSeenButton = document.createElement("button");
                        sharedSeenButton.type = "button";
                        sharedSeenButton.className = "rte-ai-inline-preview-button is-shared";
                        sharedSeenButton.setAttribute("data-rte-ai-action", "shared-seen");
                        if (actionsNodeForSharedState) {
                            actionsNodeForSharedState.appendChild(sharedSeenButton);
                        }
                    }
                    sharedSeenButton.textContent = "Got it";
                    sharedSeenButton.setAttribute("aria-label", "Clear shared AI review update notice");
                    sharedSeenButton.title = "Clear shared AI review update notice";
                    applyInlineReviewButtonShortcutState(sharedSeenButton, "Clear shared AI review update notice", inlineButtonShortcutOptions);
                }
                else if (sharedSeenButton && sharedSeenButton.parentNode) {
                    sharedSeenButton.parentNode.removeChild(sharedSeenButton);
                    sharedSeenButton = null;
                }
                setInlinePreviewActionGroupVisibility(wrappers[i], "recovery", !!(undoInlineContext || (isRedoTarget && redoInlineContext) || sharedUpdateCount));
                if (pendingPosition.total && pendingPosition.index) {
                    if (!queueChip) {
                        queueChip = document.createElement("span");
                        queueChip.className = "rte-ai-inline-preview-queue";
                        var queueAnchor = remoteChip || scopeChip || languageChip || typeChip || currentChip || (wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-current") : null);
                        if (queueAnchor && queueAnchor.nextSibling) {
                            wrappers[i].insertBefore(queueChip, queueAnchor.nextSibling);
                        }
                        else if (queueAnchor) {
                            wrappers[i].appendChild(queueChip);
                        }
                        else {
                            var actionsNodeForQueue = wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-actions") : null;
                            if (actionsNodeForQueue && actionsNodeForQueue.nextSibling) {
                                wrappers[i].insertBefore(queueChip, actionsNodeForQueue.nextSibling);
                            }
                            else {
                                wrappers[i].appendChild(queueChip);
                            }
                        }
                    }
                    queueChip.textContent = "Item " + pendingPosition.index + " of " + pendingPosition.total;
                    queueChip.setAttribute("aria-label", "Current AI review queue position");
                }
                else if (queueChip && queueChip.parentNode) {
                    queueChip.parentNode.removeChild(queueChip);
                }
                if (queueTransitionData) {
                    if (!transitionChip) {
                        transitionChip = document.createElement("span");
                        transitionChip.className = "rte-ai-inline-preview-transition";
                        var transitionAnchor = queueChip || remoteChip || scopeChip || languageChip || typeChip || currentChip;
                        if (transitionAnchor && transitionAnchor.nextSibling) {
                            wrappers[i].insertBefore(transitionChip, transitionAnchor.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(transitionChip);
                        }
                    }
                    transitionChip.textContent = queueTransitionData.statusLabel + " - " + queueTransitionData.queueLabel;
                    transitionChip.setAttribute("aria-label", queueTransitionData.title + ". " + queueTransitionData.detail + " " + queueTransitionData.preview);
                    if (queueTransitionData.followupTitle) {
                        if (!followupChip) {
                            followupChip = document.createElement("span");
                            followupChip.className = "rte-ai-inline-preview-followup";
                            var followupAnchor = transitionChip || queueChip || remoteChip || scopeChip || languageChip || typeChip || currentChip;
                            if (followupAnchor && followupAnchor.nextSibling) {
                                wrappers[i].insertBefore(followupChip, followupAnchor.nextSibling);
                            }
                            else {
                                wrappers[i].appendChild(followupChip);
                            }
                        }
                        followupChip.textContent = queueTransitionData.followupTitle;
                        followupChip.setAttribute("aria-label", queueTransitionData.followupTitle + ". " + queueTransitionData.followupDetail);
                    }
                    else if (followupChip && followupChip.parentNode) {
                        followupChip.parentNode.removeChild(followupChip);
                    }
                }
                else {
                    if (transitionChip && transitionChip.parentNode) {
                        transitionChip.parentNode.removeChild(transitionChip);
                    }
                    if (followupChip && followupChip.parentNode) {
                        followupChip.parentNode.removeChild(followupChip);
                    }
                }
                if (undoInlineContext) {
                    if (!undoChip) {
                        undoChip = document.createElement("span");
                        undoChip.className = "rte-ai-inline-preview-undo";
                        var undoAnchor = followupChip || transitionChip || queueChip || remoteChip || scopeChip || languageChip || typeChip || currentChip;
                        if (undoAnchor && undoAnchor.nextSibling) {
                            wrappers[i].insertBefore(undoChip, undoAnchor.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(undoChip);
                        }
                    }
                    undoChip.textContent = undoInlineContext.actionLabel;
                    undoChip.setAttribute("aria-label", undoInlineSummaryText);
                }
                else if (undoChip && undoChip.parentNode) {
                    undoChip.parentNode.removeChild(undoChip);
                }
                if (undoInlineNextItem) {
                    if (!undoNextChip) {
                        undoNextChip = document.createElement("span");
                        undoNextChip.className = "rte-ai-inline-preview-undo-next";
                        var undoNextAnchor = undoChip || queueChip || remoteChip || scopeChip || languageChip || typeChip || currentChip;
                        if (undoNextAnchor && undoNextAnchor.nextSibling) {
                            wrappers[i].insertBefore(undoNextChip, undoNextAnchor.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(undoNextChip);
                        }
                    }
                    undoNextChip.textContent = "Then " + undoInlineNextItem.label;
                    undoNextChip.setAttribute("aria-label", "Undo after this: " + undoInlineNextItem.detail);
                }
                else if (undoNextChip && undoNextChip.parentNode) {
                    undoNextChip.parentNode.removeChild(undoNextChip);
                }
                if (isRedoTarget && redoInlineContext) {
                    if (!redoChip) {
                        redoChip = document.createElement("span");
                        redoChip.className = "rte-ai-inline-preview-redo";
                        var redoAnchor = undoNextChip || undoChip || queueChip || remoteChip || scopeChip || languageChip || typeChip || currentChip;
                        if (redoAnchor && redoAnchor.nextSibling) {
                            wrappers[i].insertBefore(redoChip, redoAnchor.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(redoChip);
                        }
                    }
                    redoChip.textContent = redoInlineContext.actionLabel;
                    redoChip.setAttribute("aria-label", redoInlineSummaryText);
                }
                else if (redoChip && redoChip.parentNode) {
                    redoChip.parentNode.removeChild(redoChip);
                }
                if (redoInlineNextItem) {
                    if (!redoNextChip) {
                        redoNextChip = document.createElement("span");
                        redoNextChip.className = "rte-ai-inline-preview-redo-next";
                        var redoNextAnchor = redoChip || undoNextChip || undoChip || queueChip || remoteChip || scopeChip || languageChip || typeChip || currentChip;
                        if (redoNextAnchor && redoNextAnchor.nextSibling) {
                            wrappers[i].insertBefore(redoNextChip, redoNextAnchor.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(redoNextChip);
                        }
                    }
                    redoNextChip.textContent = "Then " + redoInlineNextItem.label;
                    redoNextChip.setAttribute("aria-label", "Redo after this: " + redoInlineNextItem.detail);
                }
                else if (redoNextChip && redoNextChip.parentNode) {
                    redoNextChip.parentNode.removeChild(redoNextChip);
                }
                if (isPreviewTarget) {
                    if (!shortcutsChip) {
                        shortcutsChip = document.createElement("span");
                        shortcutsChip.className = "rte-ai-inline-preview-shortcuts";
                        var previewShortcutsAnchor = redoNextChip || redoChip || undoNextChip || undoChip || queueChip || remoteChip || scopeChip || languageChip || typeChip || currentChip;
                        if (previewShortcutsAnchor && previewShortcutsAnchor.nextSibling) {
                            wrappers[i].insertBefore(shortcutsChip, previewShortcutsAnchor.nextSibling);
                        }
                        else {
                            wrappers[i].appendChild(shortcutsChip);
                        }
                    }
                    shortcutsChip.textContent = getSuggestionQueueShortcutHint(suggestion);
                    shortcutsChip.setAttribute("aria-label", "Inline queue preview shortcut");
                }
                else if (!shortcutsChip) {
                    shortcutsChip = document.createElement("span");
                    shortcutsChip.className = "rte-ai-inline-preview-shortcuts";
                    var shortcutsAnchor = redoNextChip || redoChip || undoNextChip || undoChip || queueChip || remoteChip || scopeChip || languageChip || typeChip || currentChip;
                    if (shortcutsAnchor && shortcutsAnchor.nextSibling) {
                        wrappers[i].insertBefore(shortcutsChip, shortcutsAnchor.nextSibling);
                    }
                    else {
                        wrappers[i].appendChild(shortcutsChip);
                    }
                }
                var inlineShortcutDisplayOptions = {
                    isPreviewTarget: isPreviewTarget,
                    sharedUpdateCount: sharedUpdateCount,
                    undoInlineContext: undoInlineContext,
                    redoInlineContext: redoInlineContext,
                    suggestion: suggestion
                };
                shortcutsChip.id = getInlineReviewShortcutDisplayId(wrappers[i]);
                setInlineReviewShortcutDisplay(shortcutsChip, isPreviewTarget ? "preview" : "wrapper", inlineShortcutDisplayOptions);
                bindInlineReviewWrapperShortcutFocus(wrappers[i], shortcutsChip, inlineShortcutDisplayOptions);
                bindInlineReviewShortcutFocusTarget(reviewButton, wrappers[i], shortcutsChip, "review", inlineShortcutDisplayOptions);
                bindInlineReviewShortcutFocusTarget(previousButton, wrappers[i], shortcutsChip, "previous", inlineShortcutDisplayOptions);
                bindInlineReviewShortcutFocusTarget(nextButton, wrappers[i], shortcutsChip, "next", inlineShortcutDisplayOptions);
                bindInlineReviewShortcutFocusTarget(acceptButton, wrappers[i], shortcutsChip, "accept", inlineShortcutDisplayOptions);
                bindInlineReviewShortcutFocusTarget(rejectButton, wrappers[i], shortcutsChip, "reject", inlineShortcutDisplayOptions);
                bindInlineReviewShortcutFocusTarget(undoButton, wrappers[i], shortcutsChip, "undo", inlineShortcutDisplayOptions);
                bindInlineReviewShortcutFocusTarget(redoButton, wrappers[i], shortcutsChip, "redo", inlineShortcutDisplayOptions);
                bindInlineReviewShortcutFocusTarget(sharedSeenButton, wrappers[i], shortcutsChip, "shared-seen", inlineShortcutDisplayOptions);
                var activeInlineNode = wrappers[i].ownerDocument ? wrappers[i].ownerDocument.activeElement : null;
                var activeInlineAction = activeInlineNode && wrappers[i].contains(activeInlineNode) && activeInlineNode.getAttribute
                    ? activeInlineNode.getAttribute("data-rte-ai-action") || ""
                    : "";
                setInlineReviewShortcutDisplay(shortcutsChip, isPreviewTarget ? "preview" : (activeInlineAction || "wrapper"), inlineShortcutDisplayOptions);
                wrappers[i].setAttribute("aria-label", buildInlineSuggestionAriaLabel(suggestion, {
                    isCurrent: !isPreviewTarget,
                    isPreviewTarget: isPreviewTarget,
                    queueOpened: isQueueOpened,
                    positionLabel: pendingPosition.total && pendingPosition.index ? "Item " + pendingPosition.index + " of " + pendingPosition.total : "",
                    transitionLabel: queueTransitionData ? (queueTransitionData.statusLabel + ". " + queueTransitionData.queueLabel + ". " + queueTransitionData.preview) : "",
                    followupLabel: queueTransitionData && queueTransitionData.followupTitle ? (queueTransitionData.followupTitle + ". " + queueTransitionData.followupDetail) : "",
                    remoteUpdateCount: sharedUpdateCount,
                    undoLabel: undoInlineSummaryText,
                    undoNextLabel: undoInlineNextItem ? "Undo after this: " + undoInlineNextItem.detail : "",
                    redoLabel: redoInlineSummaryText,
                    redoNextLabel: redoInlineNextItem ? "Redo after this: " + redoInlineNextItem.detail : ""
                }));
            }
            else {
                wrappers[i].classList.remove("is-review-active");
                wrappers[i].classList.remove("is-review-preview");
                wrappers[i].classList.remove("is-queue-opened");
                wrappers[i].setAttribute("role", "group");
                wrappers[i].removeAttribute("aria-current");
                wrappers[i].removeAttribute("aria-keyshortcuts");
                wrappers[i].setAttribute("tabindex", "-1");
                wrappers[i].removeAttribute("title");
                wrappers[i].onfocus = null;
                wrappers[i].onfocusout = null;
                clearInlineReviewShortcutDisplayTarget(wrappers[i]);
                wrappers[i].setAttribute("aria-label", buildInlineSuggestionAriaLabel(suggestion, { remoteUpdateCount: sharedUpdateCount }));
                updateInlineReviewActionButtonState(reviewButton, "Review", "Open this AI suggestion in review");
                updateInlineReviewButtonState(previousButton, false, "Previous AI review item");
                updateInlineReviewButtonState(nextButton, false, "Next AI review item");
                updateInlineReviewActionButtonState(acceptButton, "Accept", "Accept this AI change");
                updateInlineReviewActionButtonState(rejectButton, "Reject", "Reject this AI change");
                clearInlineReviewButtonShortcutState(reviewButton);
                clearInlineReviewButtonShortcutState(previousButton);
                clearInlineReviewButtonShortcutState(nextButton);
                clearInlineReviewButtonShortcutState(acceptButton);
                clearInlineReviewButtonShortcutState(rejectButton);
                clearInlineReviewButtonShortcutState(undoButton);
                clearInlineReviewButtonShortcutState(redoButton);
                clearInlineReviewButtonShortcutState(sharedSeenButton);
                clearInlineReviewShortcutFocusBinding(reviewButton);
                clearInlineReviewShortcutFocusBinding(previousButton);
                clearInlineReviewShortcutFocusBinding(nextButton);
                clearInlineReviewShortcutFocusBinding(acceptButton);
                clearInlineReviewShortcutFocusBinding(rejectButton);
                clearInlineReviewShortcutFocusBinding(undoButton);
                clearInlineReviewShortcutFocusBinding(redoButton);
                clearInlineReviewShortcutFocusBinding(sharedSeenButton);
                if (undoButton && undoButton.parentNode) {
                    undoButton.parentNode.removeChild(undoButton);
                }
                if (redoButton && redoButton.parentNode) {
                    redoButton.parentNode.removeChild(redoButton);
                }
                if (sharedSeenButton && sharedSeenButton.parentNode) {
                    sharedSeenButton.parentNode.removeChild(sharedSeenButton);
                }
                setInlinePreviewActionGroupVisibility(wrappers[i], "recovery", false);
                if (currentChip && currentChip.parentNode) {
                    currentChip.parentNode.removeChild(currentChip);
                }
                if (openedChip && openedChip.parentNode) {
                    openedChip.parentNode.removeChild(openedChip);
                }
                if (launchChip && launchChip.parentNode) {
                    launchChip.parentNode.removeChild(launchChip);
                }
                if (typeChip && typeChip.parentNode) {
                    typeChip.parentNode.removeChild(typeChip);
                }
                if (languageChip && languageChip.parentNode) {
                    languageChip.parentNode.removeChild(languageChip);
                }
                if (scopeChip && scopeChip.parentNode) {
                    scopeChip.parentNode.removeChild(scopeChip);
                }
                remoteChip = syncInlineSuggestionRemoteChip(
                    wrappers[i],
                    remoteChip,
                    sharedUpdateCount,
                    wrappers[i].querySelector ? wrappers[i].querySelector(".rte-ai-inline-preview-actions") : null
                );
                if (queueChip && queueChip.parentNode) {
                    queueChip.parentNode.removeChild(queueChip);
                }
                if (transitionChip && transitionChip.parentNode) {
                    transitionChip.parentNode.removeChild(transitionChip);
                }
                if (followupChip && followupChip.parentNode) {
                    followupChip.parentNode.removeChild(followupChip);
                }
                if (undoChip && undoChip.parentNode) {
                    undoChip.parentNode.removeChild(undoChip);
                }
                if (undoNextChip && undoNextChip.parentNode) {
                    undoNextChip.parentNode.removeChild(undoNextChip);
                }
                if (redoChip && redoChip.parentNode) {
                    redoChip.parentNode.removeChild(redoChip);
                }
                if (redoNextChip && redoNextChip.parentNode) {
                    redoNextChip.parentNode.removeChild(redoNextChip);
                }
                if (shortcutsChip && shortcutsChip.parentNode) {
                    shortcutsChip.parentNode.removeChild(shortcutsChip);
                }
            }
        }
        return true;
    }

    function updateInlineReviewActionButtonState(button, text, label) {
        if (!button) {
            return false;
        }
        if (typeof text === "string" && text.length) {
            button.textContent = text;
        }
        if (label) {
            button.setAttribute("aria-label", label);
            button.title = label;
        }
        return true;
    }

    function getInlineReviewButtonShortcutKeys(options) {
        options = options || {};
        if (options.isPreviewTarget) {
            return "Enter Space";
        }
        var keys = "Enter Space J K Home End A R";
        if (options.undoInlineContext) {
            keys += " U";
        }
        if (options.sharedUpdateCount) {
            keys += " G";
        }
        if (options.redoInlineContext) {
            keys += " Shift+U";
        }
        return keys;
    }

    function getInlineReviewButtonShortcutTitle(label, options) {
        options = options || {};
        var title = label || "";
        if (!title) {
            return title;
        }
        if (options.isPreviewTarget) {
            return title;
        }
        var decisionCopy = getReviewShortcutDecisionCopy(options.suggestion);
        title = title.replace(/\.$/, "") + ". J/K move review items. Home/End jump. A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ".";
        if (options.undoInlineContext) {
            title += " U " + options.undoInlineContext.shortcutLabel + ".";
        }
        if (options.sharedUpdateCount) {
            title += " G clears shared.";
        }
        if (options.redoInlineContext) {
            title += " Shift+U " + options.redoInlineContext.shortcutLabel + ".";
        }
        return title;
    }

    function getInlineReviewWrapperShortcutHint(options) {
        options = options || {};
        if (options.isPreviewTarget) {
            return getSuggestionQueueShortcutHint(options.suggestion);
        }
        var defaultActionName = options.defaultActionName || getDefaultInlineReviewActionName(options.suggestion);
        var decisionCopy = getReviewShortcutDecisionCopy(options.suggestion);
        var acceptDisplayLabel = decisionCopy.acceptLabel;
        var hint = defaultActionName === "redo"
            ? "Enter focus Redo - A " + decisionCopy.acceptHint + " - R " + decisionCopy.rejectHint + " - J/K move - Home/End jump"
            : defaultActionName === "accept"
                ? "Enter focus " + acceptDisplayLabel + " - A " + decisionCopy.acceptHint + " - R " + decisionCopy.rejectHint + " - J/K move - Home/End jump"
                : "Enter focus Review - A " + decisionCopy.acceptHint + " - R " + decisionCopy.rejectHint + " - J/K move - Home/End jump";
        if (options.sharedUpdateCount) {
            hint += " - G clear shared";
        }
        if (options.undoInlineContext) {
            hint += " - U " + options.undoInlineContext.shortcutLabel;
        }
        if (options.redoInlineContext) {
            hint += " - Shift+U " + options.redoInlineContext.shortcutLabel;
        }
        return hint;
    }

    function getInlineReviewWrapperShortcutTitle(options) {
        options = options || {};
        if (options.isPreviewTarget) {
            return getSuggestionQueueActionTitle(options.suggestion);
        }
        var defaultActionName = options.defaultActionName || getDefaultInlineReviewActionName(options.suggestion);
        var decisionCopy = getReviewShortcutDecisionCopy(options.suggestion);
        var acceptDisplayLabel = decisionCopy.acceptLabel;
        var title = defaultActionName === "redo"
            ? "Shortcuts: J or Right next, K or Left previous, Home/End jump, Enter focus Redo, A " + decisionCopy.acceptHint + ", R " + decisionCopy.rejectHint
            : defaultActionName === "accept"
                ? "Shortcuts: J or Right next, K or Left previous, Home/End jump, Enter focus " + acceptDisplayLabel + ", A " + decisionCopy.acceptHint + ", R " + decisionCopy.rejectHint
                : "Shortcuts: J or Right next, K or Left previous, Home/End jump, Enter focus Review, A " + decisionCopy.acceptHint + ", R " + decisionCopy.rejectHint;
        if (options.sharedUpdateCount) {
            title += ", G clear shared";
        }
        if (options.undoInlineContext) {
            title += ", U " + options.undoInlineContext.shortcutLabel;
        }
        if (options.redoInlineContext) {
            title += ", Shift+U " + options.redoInlineContext.shortcutLabel;
        }
        return title;
    }

    function getInlineReviewActionShortcutHint(actionName, options) {
        options = options || {};
        if (options.isPreviewTarget) {
            return getSuggestionQueueShortcutHint(options.suggestion);
        }
        var hint = "";
        var decisionCopy = getReviewShortcutDecisionCopy(options.suggestion);
        var acceptDisplayLabel = decisionCopy.acceptLabel;
        var rejectDisplayLabel = decisionCopy.rejectLabel;
        switch (actionName) {
            case "review":
                hint = "Enter review - J/K move - Home/End jump - A " + decisionCopy.acceptHint + " - R " + decisionCopy.rejectHint;
                break;
            case "previous":
                hint = "Enter previous - J/K move - Home/End jump - A " + decisionCopy.acceptHint + " - R " + decisionCopy.rejectHint;
                break;
            case "next":
                hint = "Enter next - J/K move - Home/End jump - A " + decisionCopy.acceptHint + " - R " + decisionCopy.rejectHint;
                break;
            case "accept":
                hint = "Enter " + acceptDisplayLabel + " - R " + decisionCopy.rejectHint + " - J/K move - Home/End jump";
                break;
            case "reject":
                hint = "Enter " + rejectDisplayLabel + " - A " + decisionCopy.acceptHint + " - J/K move - Home/End jump";
                break;
            case "undo":
                hint = "Enter undo - A " + decisionCopy.acceptHint + " - R " + decisionCopy.rejectHint + " - J/K move - Home/End jump";
                break;
            case "redo":
                hint = "Enter redo - A " + decisionCopy.acceptHint + " - R " + decisionCopy.rejectHint + " - J/K move - Home/End jump";
                break;
            case "shared-seen":
                hint = "Enter clear shared - A " + decisionCopy.acceptHint + " - R " + decisionCopy.rejectHint + " - J/K move - Home/End jump";
                break;
            default:
                return getInlineReviewWrapperShortcutHint(options);
        }
        if (options.undoInlineContext) {
            hint += " - U " + options.undoInlineContext.shortcutLabel;
        }
        if (options.sharedUpdateCount && actionName !== "shared-seen") {
            hint += " - G clear shared";
        }
        if (options.redoInlineContext) {
            hint += " - Shift+U " + options.redoInlineContext.shortcutLabel;
        }
        return hint;
    }

    function getInlineReviewShortcutDisplayId(wrapper) {
        if (!wrapper) {
            return "";
        }
        if (!wrapper.__rteAiInlineShortcutDisplayId) {
            wrapper.__rteAiInlineShortcutDisplayId = "rte-ai-inline-shortcuts-" + String(Math.floor(Math.random() * 1000000000));
        }
        return wrapper.__rteAiInlineShortcutDisplayId;
    }

    function linkInlineReviewShortcutDisplayTarget(node, shortcutsChip) {
        if (!node || !node.setAttribute || !shortcutsChip) {
            return false;
        }
        var displayId = shortcutsChip.id || "";
        if (!displayId) {
            return false;
        }
        node.setAttribute("aria-describedby", displayId);
        return true;
    }

    function clearInlineReviewShortcutDisplayTarget(node) {
        if (!node || !node.removeAttribute) {
            return false;
        }
        node.removeAttribute("aria-describedby");
        return true;
    }

    function renderInlineReviewShortcutDisplayContent(shortcutsChip, text) {
        if (!shortcutsChip) {
            return false;
        }
        while (shortcutsChip.firstChild) {
            shortcutsChip.removeChild(shortcutsChip.firstChild);
        }
        if (!text) {
            return true;
        }
        var ownerDocument = shortcutsChip.ownerDocument || document;
        var pieces = String(text || "").split(/(\s+·\s+|\s+-\s+)/);
        for (var pieceIndex = 0; pieceIndex < pieces.length; pieceIndex++) {
            var piece = pieces[pieceIndex];
            if (!piece) {
                continue;
            }
            if (/^\s+[·-]\s+$/.test(piece)) {
                var separator = ownerDocument.createElement("span");
                separator.className = "rte-ai-inline-preview-shortcuts-separator";
                separator.innerText = piece.replace(/^\s+|\s+$/g, "");
                shortcutsChip.appendChild(separator);
                continue;
            }
            var segment = ownerDocument.createElement("span");
            segment.className = "rte-ai-inline-preview-shortcuts-segment";
            var segmentText = piece.replace(/^\s+|\s+$/g, "");
            var firstSpace = segmentText.indexOf(" ");
            if (firstSpace > 0) {
                var keyNode = ownerDocument.createElement("span");
                keyNode.className = "rte-ai-inline-preview-shortcuts-key";
                keyNode.innerText = segmentText.substring(0, firstSpace);
                segment.appendChild(keyNode);
                segment.appendChild(ownerDocument.createTextNode(" "));
                var copyNode = ownerDocument.createElement("span");
                copyNode.className = "rte-ai-inline-preview-shortcuts-copy";
                copyNode.innerText = segmentText.substring(firstSpace + 1);
                segment.appendChild(copyNode);
            }
            else {
                segment.innerText = segmentText;
            }
            shortcutsChip.appendChild(segment);
        }
        return true;
    }

    function setInlineReviewShortcutDisplay(shortcutsChip, state, options) {
        if (!shortcutsChip) {
            return false;
        }
        options = options || {};
        shortcutsChip.classList.remove("is-action");
        shortcutsChip.classList.toggle("is-preview", state === "preview");
        if (state === "preview") {
            renderInlineReviewShortcutDisplayContent(shortcutsChip, getSuggestionQueueShortcutHint(options.suggestion));
            shortcutsChip.setAttribute("aria-label", "Inline queue preview shortcut");
            return true;
        }
        if (state && state !== "wrapper") {
            shortcutsChip.classList.add("is-action");
            renderInlineReviewShortcutDisplayContent(shortcutsChip, getInlineReviewActionShortcutHint(state, options));
            shortcutsChip.setAttribute("aria-label", "Inline AI review action shortcuts");
            return true;
        }
        renderInlineReviewShortcutDisplayContent(shortcutsChip, getInlineReviewWrapperShortcutHint(options));
        shortcutsChip.setAttribute("aria-label", "Inline AI review shortcuts");
        return true;
    }

    function bindInlineReviewWrapperShortcutFocus(wrapper, shortcutsChip, options) {
        if (!wrapper) {
            return false;
        }
        linkInlineReviewShortcutDisplayTarget(wrapper, shortcutsChip);
        wrapper.onfocus = function () {
            linkInlineReviewShortcutDisplayTarget(wrapper, shortcutsChip);
            setInlineReviewShortcutDisplay(shortcutsChip, options && options.isPreviewTarget ? "preview" : "wrapper", options);
        };
        wrapper.onfocusout = function () {
            var currentWrapper = wrapper;
            var currentChip = shortcutsChip;
            var currentOptions = options || {};
            window.setTimeout(function () {
                var doc = currentWrapper.ownerDocument || document;
                if (!currentWrapper.contains(doc.activeElement)) {
                    setInlineReviewShortcutDisplay(currentChip, currentOptions.isPreviewTarget ? "preview" : "wrapper", currentOptions);
                }
            }, 0);
        };
        return true;
    }

    function bindInlineReviewShortcutFocusTarget(node, wrapper, shortcutsChip, actionName, options) {
        if (!node) {
            return false;
        }
        linkInlineReviewShortcutDisplayTarget(node, shortcutsChip);
        node.onfocus = function () {
            linkInlineReviewShortcutDisplayTarget(node, shortcutsChip);
            setInlineReviewShortcutDisplay(shortcutsChip, actionName, options);
        };
        return true;
    }

    function clearInlineReviewShortcutFocusBinding(node) {
        if (!node) {
            return false;
        }
        node.onfocus = null;
        clearInlineReviewShortcutDisplayTarget(node);
        return true;
    }

    function applyInlineReviewButtonShortcutState(button, label, options) {
        if (!button) {
            return false;
        }
        button.setAttribute("aria-keyshortcuts", getInlineReviewButtonShortcutKeys(options));
        button.title = getInlineReviewButtonShortcutTitle(label, options);
        return true;
    }

    function clearInlineReviewButtonShortcutState(button) {
        if (!button) {
            return false;
        }
        button.removeAttribute("aria-keyshortcuts");
        return true;
    }

    function updateInlineReviewButtonState(button, disabled, label) {
        if (!button) {
            return false;
        }
        button.disabled = !!disabled;
        button.setAttribute("aria-disabled", disabled ? "true" : "false");
        if (label) {
            button.setAttribute("aria-label", label);
            button.title = label;
        }
        if (disabled) {
            button.classList.add("is-disabled");
        }
        else {
            button.classList.remove("is-disabled");
        }
        return true;
    }

    function setActiveSuggestionId(suggestionId, options) {
        options = options || {};
        editor.__aiActiveSuggestionId = suggestionId || null;
        editor.__aiPreviewState = suggestionId ? findSuggestionById(suggestionId) : null;
        if (options.preserveEmptyPreview) {
            editor.__aiReviewEmptyPreviewSuggestionId = editor.__aiActiveSuggestionId;
        }
        else {
            editor.__aiReviewEmptyPreviewSuggestionId = null;
        }
        updateActiveSuggestionDecorations();
    }

    function getActiveSuggestion() {
        if (editor.__aiActiveSuggestionId) {
            return findSuggestionById(editor.__aiActiveSuggestionId);
        }
        return editor.__aiPreviewState || null;
    }

    function syncSuggestionStates() {
        var suggestions = getSuggestionStore();
        var activeStillPending = false;
        var changed = false;
        for (var i = 0; i < suggestions.length; i++) {
            if (suggestions[i].status === "pending" && !getSuggestionWrapper(suggestions[i].id)) {
                suggestions[i].status = "stale";
                suggestions[i].decidedAt = suggestions[i].decidedAt || new Date().getTime();
                emitReviewLogEvent("suggestion-stale", suggestions[i]);
                changed = true;
            }
            if (editor.__aiActiveSuggestionId && suggestions[i].id === editor.__aiActiveSuggestionId && suggestions[i].status === "pending") {
                activeStillPending = true;
            }
        }
        if (!activeStillPending) {
            setActiveSuggestionId(null);
        }
        if (changed) {
            persistSuggestionStore();
        }
    }

    function clearPreviewStateIfMissing() {
        syncSuggestionStates();
    }

    function summarizeSuggestionText(text, maxLength) {
        var clean = normalizeText(text);
        var limit = maxLength || 90;
        if (clean.length <= limit) {
            return clean;
        }
        return clean.substring(0, Math.max(0, limit - 3)).replace(/\s+\S*$/, "") + "...";
    }

    function getSuggestionStatusLabel(status) {
        switch (status) {
            case "accepted":
                return "Accepted";
            case "rejected":
                return "Rejected";
            case "stale":
                return "Needs refresh";
            default:
                return "Pending";
        }
    }

    function createInlinePreviewActionGroupHtml(groupClass, label, innerHtml) {
        var hiddenAttr = !innerHtml && groupClass === "recovery" ? " style=\"display:none\"" : "";
        return ""
            + "<span class=\"rte-ai-inline-preview-action-group is-" + groupClass + "\""
            + " data-rte-ai-inline-action-group=\"" + groupClass + "\""
            + " data-rte-ai-inline-action-group-label=\"" + escapeHtml(label) + "\""
            + hiddenAttr
            + " role=\"group\" aria-label=\"" + escapeHtml(label) + " actions\">"
            + "<span class=\"rte-ai-inline-preview-action-group-body\">"
            + (innerHtml || "")
            + "</span>"
            + "</span>";
    }

    function getInlinePreviewActionContainer(wrapper, groupName) {
        if (!wrapper || !wrapper.querySelector) {
            return null;
        }
        if (groupName) {
            var groupedNode = wrapper.querySelector(".rte-ai-inline-preview-action-group.is-" + groupName + " .rte-ai-inline-preview-action-group-body");
            if (groupedNode) {
                return groupedNode;
            }
        }
        return wrapper.querySelector(".rte-ai-inline-preview-actions");
    }

    function setInlinePreviewActionGroupVisibility(wrapper, groupName, isVisible) {
        if (!wrapper || !wrapper.querySelector || !groupName) {
            return;
        }
        var groupNode = wrapper.querySelector(".rte-ai-inline-preview-action-group.is-" + groupName);
        if (!groupNode) {
            return;
        }
        groupNode.style.display = isVisible ? "" : "none";
    }

    function createInlinePreviewHtml(previewState) {
        var isBlock = !!previewState.isBlock;
        var wrapperTag = isBlock ? "div" : "span";
        var partTag = isBlock ? "div" : "span";
        var oldHtml = previewState.originalHtml || textToInlineHtml(previewState.originalText || "");
        var newHtml = previewState.resultHtml || textToInlineHtml(previewState.resultText || "");
        var reasonHtml = previewState.reason ? "<span class=\"rte-ai-inline-preview-reason\">" + escapeHtml(previewState.reason) + "</span>" : "";
        var reviewActionsHtml = createInlinePreviewActionGroupHtml("review", "Open",
            "<button type=\"button\" class=\"rte-ai-inline-preview-button is-review\" data-rte-ai-action=\"review\">Review</button>"
        );
        var moveActionsHtml = createInlinePreviewActionGroupHtml("move", "Move",
            "<button type=\"button\" class=\"rte-ai-inline-preview-button is-previous\" data-rte-ai-action=\"previous\">Previous</button>"
            + "<button type=\"button\" class=\"rte-ai-inline-preview-button is-next\" data-rte-ai-action=\"next\">Next</button>"
        );
        var decisionActionsHtml = createInlinePreviewActionGroupHtml("decision", "Decide",
            "<button type=\"button\" class=\"rte-ai-inline-preview-button is-accept\" data-rte-ai-action=\"accept\">Accept</button>"
            + "<button type=\"button\" class=\"rte-ai-inline-preview-button is-reject\" data-rte-ai-action=\"reject\">Reject</button>"
        );
        var recoveryActionsHtml = createInlinePreviewActionGroupHtml("recovery", "Recover", "");

        return ""
            + "<" + wrapperTag + " class=\"rte-ai-inline-preview" + (isBlock ? " is-block" : " is-inline") + "\" contenteditable=\"false\" tabindex=\"-1\" role=\"group\" aria-label=\"AI suggestion preview\" data-rte-ai-preview-id=\"" + previewState.id + "\" data-rte-ai-suggestion-id=\"" + previewState.id + "\">"
            + "<span class=\"rte-ai-inline-preview-actions\" role=\"group\" aria-label=\"AI suggestion actions\">"
            + reviewActionsHtml
            + moveActionsHtml
            + decisionActionsHtml
            + recoveryActionsHtml
            + "</span>"
            + reasonHtml
            + "<" + partTag + " class=\"rte-ai-inline-preview-old\">" + oldHtml + "</" + partTag + ">"
            + "<" + partTag + " class=\"rte-ai-inline-preview-new\">" + newHtml + "</" + partTag + ">"
            + "</" + wrapperTag + ">";
    }

    function previewInlineSuggestion(result, options) {
        var clean = normalizeText(result);
        if (!clean) {
            return false;
        }

        options = options || {};
        var snapshot = options.snapshot || captureSelectionSnapshot();
        if (!snapshot || !snapshot.hasSelection) {
            return false;
        }

        clearPreviewStateIfMissing();

        var isBlock = hasBlockMarkup(snapshot.html);
        var previewState = {
            id: "ai-preview-" + new Date().getTime(),
            snapshot: snapshot,
            originalHtml: snapshot.html,
            originalText: snapshot.text,
            resultText: clean,
            resultHtml: isBlock ? textToHtml(clean) : textToInlineHtml(clean),
            reason: options.reason || "",
            suggestionType: getSuggestionTypeValue(options.suggestionType || ""),
            language: options.language || "",
            isBlock: isBlock,
            status: "pending",
            createdAt: new Date().getTime(),
            sourceLabel: options.sourceLabel || buildSuggestionSourceLabel(options.suggestionType || "", snapshot, options.language || "")
        };

        getSuggestionStore().push(previewState);
        setActiveSuggestionId(previewState.id);

        if (!restoreSelection(snapshot, false)) {
            var suggestions = getSuggestionStore();
            suggestions.splice(suggestions.length - 1, 1);
            setActiveSuggestionId(null);
            return false;
        }

        editor.insertHTML(createInlinePreviewHtml(previewState));
        persistSuggestionStore();
        emitReviewLogEvent("suggestion-created", previewState);
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(false);
        }
        editor.focus();
        return true;
    }

    function insertAiComment(note, options) {
        var clean = normalizeText(note);
        if (!clean) {
            return false;
        }

        options = options || {};
        var snapshot = options.snapshot || captureSelectionSnapshot();

        clearPreviewStateIfMissing();

        if (!restoreSelection(snapshot, true)) {
            editor.focus();
        }

        editor.insertHTML('<span class="rte-comment-marker" data-comment="' + escapeAttribute(clean) + '" data-rte-comment="' + escapeAttribute(clean) + '" contenteditable="false" style="background:#fff9c4;border:1px solid #f9a825;border-radius:3px;padding:1px 6px;font-size:11px;color:#f57f17;cursor:pointer;" title="' + escapeAttribute(clean) + '" aria-label="' + escapeAttribute(clean) + '">&#128172; AI Comment</span>');
        syncSuggestionStates();
        persistSuggestionStore();
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(false);
        }
        editor.focus();
        return true;
    }

    function renderActionMenu(panel) {
        panel.classList.add("rte-panel-aiassist-menu");

        var info = append(panel, "div", "", "rte-ai-menu-info");
        var titleRow = append(info, "div", "", "rte-ai-menu-title-row");
        var titleIcon = append(titleRow, "span", "", "rte-ai-menu-title-icon");
        titleIcon.innerHTML = config.svgCode_aiassist || "";
        append(titleRow, "div", "", "rte-ai-menu-title", config.text_aiassist || "Ask AI");
        var closeButton = append(titleRow, "button", "", "rte-ai-menu-close-button");
        closeButton.type = "button";
        closeButton.setAttribute("aria-label", "Close");
        closeButton.title = "Close";
        closeButton.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>';
        closeButton.onclick = function (e) {
            if (e && e.preventDefault) e.preventDefault();
            if (e && e.stopPropagation) e.stopPropagation();
            if (editor.closeCurrentPopup) editor.closeCurrentPopup();
        };
        append(info, "div", "", "rte-ai-menu-copy", "Open AI Chat for multi-turn help, run quick actions like proofread or translate, or jump into the full review dialog.");

        var actions = getActionDefinitions();
        var lastSection = "";
        for (var i = 0; i < actions.length; i++) {
            (function (action) {
                if (action.section && action.section !== lastSection) {
                    append(panel, "div", "", "rte-ai-menu-section", action.section);
                    lastSection = action.section;
                }
                var button = append(panel, "button", "", "rte-ai-menu-item");
                button.type = "button";
                var icon = append(button, "span", "", "rte-ai-menu-item-icon");
                icon.innerHTML = getActionIconSvg(action);
                var body = append(button, "span", "", "rte-ai-menu-item-body");
                append(body, "span", "", "rte-ai-menu-item-title", action.title || action.id);
                append(body, "span", "", "rte-ai-menu-item-copy", action.description || "");
                button.onclick = function (e) {
                    if (e && e.preventDefault) e.preventDefault();
                    if (e && e.stopPropagation) e.stopPropagation();
                    if (editor.closeCurrentPopup) editor.closeCurrentPopup();
                    runQuickAction(action.id);
                };
            })(actions[i]);
        }
    }

    function runAgent(prompt, options) {
        options = options || {};
        var agent = options.agent || config.aiToolkitAgent;
        if (typeof agent !== "function") {
            var err = new Error("AI Toolkit: no agent registered. Call editor.aiToolkit.setAgent(fn) first.");
            console.warn(err.message);
            return Promise.reject(err);
        }
        var maxSteps = Math.max(1, options.maxSteps | 0 || 6);
        var tools = options.tools || {};
        var snapshot = options.snapshot || captureSelectionSnapshot();
        var transcript = [];
        var executedOps = [];

        function tick(step, lastResult) {
            if (step >= maxSteps) {
                return Promise.resolve({ done: true, reason: "maxSteps", transcript: transcript, executedOps: executedOps, lastResult: lastResult });
            }
            var context = {
                step: step,
                prompt: prompt,
                snapshot: snapshot,
                tools: Object.keys(tools),
                transcript: transcript.slice(),
                lastResult: lastResult
            };
            var invocation;
            try { invocation = agent(prompt, context); }
            catch (err) { return Promise.reject(err); }

            return Promise.resolve(invocation).then(function (result) {
                transcript.push({ step: step, result: result });
                if (!result || result.done === true) {
                    return { done: true, reason: "agent", transcript: transcript, executedOps: executedOps, lastResult: result };
                }
                // Run tools if the agent asked for them
                var toolPromise = Promise.resolve(result);
                if (result.toolCalls && result.toolCalls.length) {
                    toolPromise = Promise.all(result.toolCalls.map(function (call) {
                        var fn = tools[call && call.name];
                        if (typeof fn !== "function") {
                            return { name: call && call.name, error: "unknown tool" };
                        }
                        try { return Promise.resolve(fn(call.args || {}, { snapshot: snapshot })).then(function (out) { return { name: call.name, output: out }; }); }
                        catch (err) { return { name: call.name, error: String(err && err.message || err) }; }
                    })).then(function (toolResults) {
                        result.toolResults = toolResults;
                        transcript[transcript.length - 1].toolResults = toolResults;
                        return result;
                    });
                }
                return toolPromise.then(function (resolved) {
                    if (resolved.operations && resolved.operations.length) {
                        var handled = executeOperations(resolved.operations, { snapshot: snapshot, resolved: resolved });
                        executedOps.push({ step: step, handled: handled, count: resolved.operations.length });
                    }
                    if (resolved.done === true) {
                        return { done: true, reason: "agent", transcript: transcript, executedOps: executedOps, lastResult: resolved };
                    }
                    return tick(step + 1, resolved);
                });
            });
        }

        return tick(0, null);
    }

    function runQuickAction(actionId, options) {
        options = options || {};
        var snapshot = options.snapshot || captureSelectionSnapshot();
        var action = getActionDefinition(actionId) || { id: actionId, target: "document" };

        if (action.target === "chat-panel" && !options.forceResolve) {
            openChatPanel({ focusComposer: true });
            return Promise.resolve(true);
        }

        if (action.target === "review-panel" && !options.forceResolve) {
            openReviewPanel({ focusPanel: true });
            return Promise.resolve(true);
        }

        if (action.target === "dialog" && !options.forceResolve) {
            openDialog({
                presetMode: action.resolverMode || actionId,
                useDocument: options.useDocument === true || !snapshot.hasSelection,
                autoRun: !!action.autoRun
            });
            return Promise.resolve(true);
        }

        return resolveAction(actionId, { snapshot: snapshot, source: options.source, prompt: options.prompt, scope: options.scope }).then(function (resolved) {
            return executeResolvedAction(resolved, {
                snapshot: snapshot,
                fallbackAction: action
            });
        }).catch(function (error) {
            console.error("AI Toolkit action failed", error);
            return false;
        });
    }

    function executeResolvedAction(resolved, options) {
        options = options || {};
        var snapshot = options.snapshot || captureSelectionSnapshot();
        if (resolved && resolved.operations && resolved.operations.length) {
            return executeOperations(resolved.operations, {
                snapshot: snapshot,
                resolved: resolved
            });
        }

        return executeOperations([buildLegacyOperation(resolved && resolved.target ? resolved.target : "document", resolved && resolved.result ? resolved.result : "", resolved, resolved ? resolved.request : null, resolved ? resolved.action : null)], {
            snapshot: snapshot,
            resolved: resolved
        });
    }

    function executeOperations(operations, options) {
        options = options || {};
        var snapshot = options.snapshot || captureSelectionSnapshot();
        var resolved = options.resolved || null;
        var handled = false;
        var list = operations || [];
        for (var i = 0; i < list.length; i++) {
            if (executeOperation(list[i], {
                snapshot: snapshot,
                resolved: resolved
            })) {
                handled = true;
            }
        }
        return handled;
    }

    function executeOperation(operation, options) {
        if (!operation || !operation.type) {
            return false;
        }

        options = options || {};
        var snapshot = options.snapshot || captureSelectionSnapshot();
        var resolved = options.resolved || {};
        var customHandler = config.aiToolkitOperationHandlers && config.aiToolkitOperationHandlers[operation.type];
        if (typeof customHandler === "function") {
            return !!customHandler.call(editor, operation, {
                snapshot: snapshot,
                resolved: resolved,
                request: resolved.request || null,
                action: resolved.action || null,
                editor: editor
            });
        }

        switch (operation.type) {
            case "open-chat-panel":
                openChatPanel({ focusComposer: true });
                return true;
            case "open-review-panel":
                openReviewPanel({ focusPanel: true });
                return true;
            case "open-dialog":
                openDialog({
                    presetMode: operation.presetMode || resolved.presetMode || (resolved.request ? resolved.request.mode : ""),
                    useDocument: operation.useDocument === true || resolved.useDocument === true || !snapshot.hasSelection,
                    autoRun: !!(operation.autoRun || resolved.autoRun)
                });
                return true;
            case "preview-suggestion":
                if (snapshot.hasSelection) {
                    return previewInlineSuggestion(operation.text, {
                        snapshot: snapshot,
                        reason: operation.reason || (resolved && resolved.reason) || "",
                        sourceLabel: operation.meta && operation.meta.sourceLabel ? operation.meta.sourceLabel : "",
                        suggestionType: operation.meta && operation.meta.mode ? operation.meta.mode : (resolved && resolved.request ? resolved.request.mode : ""),
                        language: operation.meta && operation.meta.language ? operation.meta.language : (resolved && resolved.request ? resolved.request.language : "")
                    });
                }
                openDialog({
                    presetMode: operation.presetMode || resolved.presetMode || (resolved.request ? resolved.request.mode : ""),
                    useDocument: true,
                    autoRun: true
                });
                return true;
            case "add-comment":
                return insertAiComment(operation.text, { snapshot: snapshot });
            case "insert-below":
                return applyResult(operation.text, { mode: "insert", snapshot: snapshot });
            case "replace-selection":
                return applyResult(operation.text, { mode: "selection", snapshot: snapshot });
            case "replace-document":
                return applyResult(operation.text, { mode: "document", snapshot: snapshot });
            default:
                return false;
        }
    }

    function acceptInlineSuggestion() {
        clearPreviewStateIfMissing();
        var previewState = arguments.length ? findSuggestionById(arguments[0]) : getActiveSuggestion();
        if (!previewState) {
            return false;
        }

        var wrapper = getSuggestionWrapper(previewState.id);
        if (!wrapper) {
            previewState.status = "stale";
            previewState.decidedAt = previewState.decidedAt || new Date().getTime();
            if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                renderReviewPanel(false);
            }
            setActiveSuggestionId(null);
            persistSuggestionStore();
            return false;
        }

        wrapper.outerHTML = getResolvedSuggestionHtml(previewState, "accepted");
        previewState.status = "accepted";
        previewState.decidedAt = new Date().getTime();
        setLastReviewDecision(previewState, "accepted");
        clearSuggestionRemoteUpdate(previewState.id);
        if (editor.__aiRecentlyOpenedQueueSuggestionId === previewState.id) {
            clearQueueOpenedSuggestion({ skipUpdate: true, skipRender: true });
        }
        setActiveSuggestionId(null);
        announceReviewStatus(buildSuggestionAnnouncement(previewState, "Accepted"));
        persistSuggestionStore();
        emitReviewLogEvent("suggestion-accepted", previewState);
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(false);
        }
        editor.focus();
        return true;
    }

    function rejectInlineSuggestion() {
        clearPreviewStateIfMissing();
        var previewState = arguments.length ? findSuggestionById(arguments[0]) : getActiveSuggestion();
        if (!previewState) {
            return false;
        }

        var wrapper = getSuggestionWrapper(previewState.id);
        if (!wrapper) {
            previewState.status = "stale";
            previewState.decidedAt = previewState.decidedAt || new Date().getTime();
            if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                renderReviewPanel(false);
            }
            setActiveSuggestionId(null);
            persistSuggestionStore();
            return false;
        }

        wrapper.outerHTML = getResolvedSuggestionHtml(previewState, "rejected");
        previewState.status = "rejected";
        previewState.decidedAt = new Date().getTime();
        setLastReviewDecision(previewState, "rejected");
        clearSuggestionRemoteUpdate(previewState.id);
        if (editor.__aiRecentlyOpenedQueueSuggestionId === previewState.id) {
            clearQueueOpenedSuggestion({ skipUpdate: true, skipRender: true });
        }
        setActiveSuggestionId(null);
        announceReviewStatus(buildSuggestionAnnouncement(previewState, "Rejected"));
        persistSuggestionStore();
        emitReviewLogEvent("suggestion-rejected", previewState);
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(false);
        }
        editor.focus();
        return true;
    }

    function undoLastReviewDecision(options) {
        options = options || {};
        clearPreviewStateIfMissing();
        var undoable = getUndoableReviewDecision();
        if (!undoable) {
            return false;
        }

        var suggestion = undoable.suggestion;
        var wrapper = undoable.wrapper;
        if (!wrapper || !wrapper.parentNode) {
            popLastReviewDecision();
            return false;
        }

        suggestion.status = "pending";
        suggestion.decidedAt = 0;
        wrapper.outerHTML = createInlinePreviewHtml(suggestion);
        pushRedoReviewDecision(suggestion, undoable.status);
        popLastReviewDecision();
        setActiveSuggestionId(suggestion.id);
        announceReviewStatus(buildSuggestionAnnouncement(suggestion, "Reopened"));
        persistSuggestionStore();
        emitReviewLogEvent("suggestion-reopened", suggestion);
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(!!options.focusPanel, {
                focusAction: options.focusAction || ""
            });
        }
        var restoredInlineFocus = false;
        if (options.focusInlineAction) {
            restoredInlineFocus = focusDefaultInlineReviewAction(suggestion.id, options.focusInlineAction);
        }
        if (!options.focusPanel && !restoredInlineFocus) {
            editor.focus();
        }
        return true;
    }

    function redoLastReviewDecision(options) {
        options = options || {};
        clearPreviewStateIfMissing();
        var redoable = getRedoableReviewDecision();
        if (!redoable) {
            return false;
        }

        var suggestion = redoable.suggestion;
        var wrapper = redoable.wrapper;
        var continuationSuggestionId = editor.__aiActiveSuggestionId === suggestion.id ? getNextInlineReviewSuggestionId(suggestion.id) : "";
        if (!wrapper || !wrapper.parentNode) {
            popRedoReviewDecision();
            return false;
        }

        wrapper.outerHTML = getResolvedSuggestionHtml(suggestion, redoable.status);
        suggestion.status = redoable.status;
        suggestion.decidedAt = new Date().getTime();
        popRedoReviewDecision();
        setLastReviewDecision(suggestion, redoable.status, { clearRedo: false });
        clearSuggestionRemoteUpdate(suggestion.id);
        if (editor.__aiRecentlyOpenedQueueSuggestionId === suggestion.id) {
            clearQueueOpenedSuggestion({ skipUpdate: true, skipRender: true });
        }
        setActiveSuggestionId(null);
        announceReviewStatus(buildSuggestionAnnouncement(suggestion, redoable.status === "accepted" ? "Accepted again" : "Rejected again"));
        persistSuggestionStore();
        emitReviewLogEvent(redoable.status === "accepted" ? "suggestion-accepted" : "suggestion-rejected", suggestion);
        if (continuationSuggestionId) {
            var continued = activateReviewSuggestion(continuationSuggestionId, {
                focusPanel: !!options.focusPanel,
                focusAction: options.focusAction || "accept"
            });
            if (continued && options.focusInlineAction) {
                focusDefaultInlineReviewAction(continuationSuggestionId, options.focusInlineAction);
            }
            return continued;
        }
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(!!options.focusPanel, {
                focusAction: options.focusAction || "accept"
            });
        }
        if (!options.focusPanel) {
            editor.focus();
        }
        return true;
    }

    function applyResult(result, options) {
        var clean = normalizeText(result);
        if (!clean) {
            return false;
        }

        clearPreviewStateIfMissing();

        options = options || {};
        var mode = options.mode || "document";
        var snapshot = options.snapshot || captureSelectionSnapshot();

        if (mode === "document") {
            editor.setHTMLCode(textToHtml(clean));
            syncSuggestionStates();
            persistSuggestionStore();
            if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                renderReviewPanel(false);
            }
            editor.focus();
            return true;
        }

        if (mode === "selection") {
            if (!restoreSelection(snapshot, false)) {
                editor.focus();
            }
            editor.insertText(clean);
            syncSuggestionStates();
            persistSuggestionStore();
            if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                renderReviewPanel(false);
            }
            editor.focus();
            return true;
        }

        if (!restoreSelection(snapshot, true)) {
            editor.focus();
        }
        editor.insertHTML("<p><br/></p>" + textToHtml(clean));
        syncSuggestionStates();
        persistSuggestionStore();
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(false);
        }
        editor.focus();
        return true;
    }

    function findEditorShellFromNode(node) {
        while (node) {
            if (node.nodeType === 1) {
                var cls = typeof node.className === "string" ? node.className : "";
                if (cls.indexOf("richtexteditor") !== -1) {
                    return node;
                }
            }
            node = node.parentNode;
        }
        return null;
    }

    function getEditorShell() {
        var editable = editor.getEditable ? editor.getEditable() : null;
        var shell = findEditorShellFromNode(editable);
        if (shell) {
            return shell;
        }

        var frameElement = editable && editable.ownerDocument && editable.ownerDocument.defaultView
            ? editable.ownerDocument.defaultView.frameElement
            : null;
        shell = findEditorShellFromNode(frameElement);
        if (shell) {
            return shell;
        }

        if (editor.iframe) {
            shell = findEditorShellFromNode(editor.iframe);
            if (shell) {
                return shell;
            }
            if (editor.iframe.parentNode) {
                return editor.iframe.parentNode;
            }
        }

        return editable && editable.parentNode ? editable.parentNode : null;
    }

    function ensureReviewStatusNode() {
        var shell = getEditorShell();
        if (!shell) {
            return null;
        }
        if (editor.__aiReviewStatusNode && editor.__aiReviewStatusNode.isConnected) {
            return editor.__aiReviewStatusNode;
        }

        var existing = shell.querySelector ? shell.querySelector(".rte-ai-review-live-region") : null;
        if (existing) {
            editor.__aiReviewStatusNode = existing;
            return existing;
        }

        var node = append(shell, "div", "", "rte-ai-review-live-region");
        node.setAttribute("role", "status");
        node.setAttribute("aria-live", "polite");
        node.setAttribute("aria-atomic", "true");
        editor.__aiReviewStatusNode = node;
        return node;
    }

    function buildSuggestionAnnouncement(suggestion, prefix, options) {
        if (!suggestion) {
            return prefix || "";
        }

        options = options || {};
        var details = [];
        var typeLabel = getSuggestionTypeValue(suggestion.suggestionType || "") !== "other"
            ? getSuggestionTypeLabel(suggestion.suggestionType)
            : "AI suggestion";
        details.push(typeLabel);

        var scopeLabel = getSuggestionScopeLabel(suggestion);
        if (scopeLabel) {
            details.push(scopeLabel);
        }
        if (suggestion.language) {
            details.push(getTranslateLanguageLabel(suggestion.language));
        }

        var message = prefix ? prefix + " " + details.join(", ") : details.join(", ");
        if (options.positionLabel) {
            message += ". " + options.positionLabel + ".";
        }
        else {
            message += ".";
        }
        if (options.remoteUpdateCount) {
            message += " " + (options.remoteUpdateCount > 1 ? options.remoteUpdateCount + " shared updates." : "Shared update.");
        }
        return message;
    }

    function buildQueueOpenAnnouncement(suggestion, options) {
        if (!suggestion) {
            return "Opened AI review queue.";
        }

        options = options || {};
        var pendingCount = getSuggestionQueuePendingCount(suggestion);
        var pendingLabel = pendingCount === 1 ? "1 pending item" : pendingCount + " pending items";
        var typeLabel = getSuggestionTypeValue(suggestion.suggestionType || "") !== "other"
            ? getSuggestionTypeLabel(suggestion.suggestionType)
            : "AI";
        var focusLabel = getReviewFocusActionDisplayLabel(suggestion, options.focusAction || getPreferredReviewActionFocus());
        var lead = typeLabel && typeLabel !== "AI"
            ? "Opened " + typeLabel + " AI review queue. " + pendingLabel + "."
            : "Opened AI review queue. " + pendingLabel + ".";
        if (focusLabel) {
            lead += " Focus " + focusLabel + ".";
        }
        return lead + " " + buildSuggestionAnnouncement(suggestion, "Reviewing", options);
    }

    function buildReviewItemAriaLabel(suggestion, options) {
        if (!suggestion) {
            return "AI review item";
        }

        options = options || {};
        var parts = [];
        if (options.isCurrent) {
            parts.push("Current review item");
        }
        if (options.queueOpened) {
            parts.push("Queue opened");
        }
        if (options.queueRoleLabel) {
            parts.push(options.queueRoleLabel);
        }
        if (options.queuePositionLabel) {
            parts.push(options.queuePositionLabel);
        }
        if (options.transitionLabel) {
            parts.push(options.transitionLabel);
        }
        if (options.changeSummary) {
            parts.push(options.changeSummary);
        }
        parts.push(getSuggestionStatusLabel(suggestion.status));
        if (suggestion.suggestionType && getSuggestionTypeValue(suggestion.suggestionType) !== "other") {
            parts.push(getSuggestionTypeLabel(suggestion.suggestionType));
        }
        else {
            parts.push("AI suggestion");
        }
        var scopeLabel = getSuggestionScopeLabel(suggestion);
        if (scopeLabel) {
            parts.push(scopeLabel);
        }
        if (suggestion.language) {
            parts.push(getTranslateLanguageLabel(suggestion.language));
        }
        if (options.remoteUpdateCount) {
            parts.push(options.remoteUpdateCount > 1 ? options.remoteUpdateCount + " shared updates" : "Shared update");
        }
        var title = summarizeSuggestionText(suggestion.originalText || suggestion.resultText || "AI suggestion", 80);
        if (title) {
            parts.push("Preview: " + title);
        }
        if (options.undoLabel) {
            parts.push(options.undoLabel);
        }
        if (options.undoNextLabel) {
            parts.push(options.undoNextLabel);
        }
        if (options.redoLabel) {
            parts.push(options.redoLabel);
        }
        if (options.redoNextLabel) {
            parts.push(options.redoNextLabel);
        }
        return parts.join(". ");
    }

    function buildReviewQueuePositionData(visibleSuggestions, activeSuggestionId, suggestion) {
        if (!suggestion || suggestion.status !== "pending" || !visibleSuggestions || !visibleSuggestions.length) {
            return null;
        }
        var pendingSuggestions = [];
        for (var visibleIndex = 0; visibleIndex < visibleSuggestions.length; visibleIndex++) {
            if (visibleSuggestions[visibleIndex] && visibleSuggestions[visibleIndex].status === "pending") {
                pendingSuggestions.push(visibleSuggestions[visibleIndex]);
            }
        }
        if (!pendingSuggestions.length) {
            return null;
        }
        var suggestionIndex = -1;
        var activeIndex = -1;
        for (var pendingIndex = 0; pendingIndex < pendingSuggestions.length; pendingIndex++) {
            if (pendingSuggestions[pendingIndex].id === suggestion.id) {
                suggestionIndex = pendingIndex;
            }
            if (pendingSuggestions[pendingIndex].id === activeSuggestionId) {
                activeIndex = pendingIndex;
            }
        }
        if (suggestionIndex === -1) {
            return null;
        }
        if (activeIndex === -1) {
            activeIndex = 0;
        }
        var role = "later";
        if (suggestionIndex === activeIndex) {
            role = "current";
        }
        else if (suggestionIndex === activeIndex + 1) {
            role = "next";
        }
        else if (suggestionIndex < activeIndex) {
            role = "earlier";
        }
        var queueLabel = "Queue " + (suggestionIndex + 1) + " of " + pendingSuggestions.length;
        var detail = "";
        var roleLabel = "";
        if (role === "current") {
            roleLabel = "Current focus";
            detail = "Review this item now. It is " + queueLabel.toLowerCase() + " in this view.";
        }
        else if (role === "next") {
            roleLabel = "Up next";
            detail = "This follows after the current decision. It is " + queueLabel.toLowerCase() + " in this view.";
        }
        else if (role === "earlier") {
            roleLabel = "Earlier item";
            detail = "You moved past this item. Use Previous or K to return. It is " + queueLabel.toLowerCase() + " in this view.";
        }
        else {
            roleLabel = "Later in queue";
            detail = "This comes later in the current review run. It is " + queueLabel.toLowerCase() + " in this view.";
        }
        return {
            role: role,
            roleLabel: roleLabel,
            queueLabel: queueLabel,
            detail: detail
        };
    }

    function buildReviewFeedSectionData(visibleSuggestions, activeSuggestionId, suggestion, queuePositionData) {
        if (!suggestion || !visibleSuggestions || !visibleSuggestions.length) {
            return null;
        }

        if (suggestion.status !== "pending") {
            var resolvedCount = 0;
            for (var resolvedIndex = 0; resolvedIndex < visibleSuggestions.length; resolvedIndex++) {
                if (visibleSuggestions[resolvedIndex] && visibleSuggestions[resolvedIndex].status !== "pending") {
                    resolvedCount++;
                }
            }
            return resolvedCount ? {
                key: "resolved",
                label: "Resolved items",
                detail: "Accepted, rejected, or stale suggestions from this review run.",
                countLabel: formatCountNoun(resolvedCount, "item")
            } : null;
        }

        var pendingSuggestions = [];
        for (var visibleIndex = 0; visibleIndex < visibleSuggestions.length; visibleIndex++) {
            if (visibleSuggestions[visibleIndex] && visibleSuggestions[visibleIndex].status === "pending") {
                pendingSuggestions.push(visibleSuggestions[visibleIndex]);
            }
        }
        if (!pendingSuggestions.length) {
            return null;
        }

        var activeIndex = -1;
        for (var pendingIndex = 0; pendingIndex < pendingSuggestions.length; pendingIndex++) {
            if (pendingSuggestions[pendingIndex].id === activeSuggestionId) {
                activeIndex = pendingIndex;
                break;
            }
        }
        if (activeIndex === -1) {
            activeIndex = 0;
        }

        var role = queuePositionData && queuePositionData.role ? queuePositionData.role : "";
        if (role === "current") {
            return {
                key: "current",
                label: "Current focus",
                detail: "Review this suggestion now.",
                countLabel: "1 item"
            };
        }
        if (role === "next") {
            return {
                key: "next",
                label: "Up next",
                detail: "Becomes current after this decision.",
                countLabel: "1 item"
            };
        }
        if (role === "later") {
            return {
                key: "later",
                label: "Later in queue",
                detail: "Pending suggestions after the immediate next step.",
                countLabel: formatCountNoun(Math.max(1, pendingSuggestions.length - activeIndex - 2), "item")
            };
        }
        if (role === "earlier") {
            return {
                key: "earlier",
                label: "Earlier in queue",
                detail: "Pending suggestions before the current focus.",
                countLabel: formatCountNoun(Math.max(1, activeIndex), "item")
            };
        }
        return {
            key: "pending",
            label: "Pending items",
            detail: "Remaining AI suggestions in this queue.",
            countLabel: formatCountNoun(pendingSuggestions.length, "item")
        };
    }

    function buildReviewQueueTransitionData(visibleSuggestions, activeSuggestionId, suggestion) {
        if (!suggestion || suggestion.status !== "pending" || !visibleSuggestions || !visibleSuggestions.length) {
            return null;
        }
        var pendingSuggestions = [];
        for (var visibleIndex = 0; visibleIndex < visibleSuggestions.length; visibleIndex++) {
            if (visibleSuggestions[visibleIndex] && visibleSuggestions[visibleIndex].status === "pending") {
                pendingSuggestions.push(visibleSuggestions[visibleIndex]);
            }
        }
        if (!pendingSuggestions.length) {
            return null;
        }
        var activeIndex = -1;
        var suggestionIndex = -1;
        for (var pendingIndex = 0; pendingIndex < pendingSuggestions.length; pendingIndex++) {
            if (pendingSuggestions[pendingIndex].id === activeSuggestionId) {
                activeIndex = pendingIndex;
            }
            if (pendingSuggestions[pendingIndex].id === suggestion.id) {
                suggestionIndex = pendingIndex;
            }
        }
        if (suggestionIndex === -1) {
            return null;
        }
        var isTerminalSuggestion = suggestionIndex === pendingSuggestions.length - 1;
        if (!isTerminalSuggestion && suggestion.id !== activeSuggestionId) {
            return null;
        }
        if (isTerminalSuggestion) {
            return {
                title: "After this decision",
                statusLabel: "Queue complete",
                queueLabel: "Queue " + (suggestionIndex + 1) + " of " + pendingSuggestions.length,
                typeLabel: "",
                scopeLabel: "",
                detail: "Accepting or rejecting this final pending item finishes the current review run.",
                preview: "Recovery and next queues appear next so you can undo the last decision or open another queue."
            };
        }
        if (activeIndex === -1 || activeIndex >= pendingSuggestions.length - 1) {
            return null;
        }
        var nextSuggestion = pendingSuggestions[activeIndex + 1];
        if (!nextSuggestion) {
            return null;
        }
        return {
            title: "After this decision",
            statusLabel: "Up next becomes current",
            queueLabel: "Queue " + (activeIndex + 2) + " of " + pendingSuggestions.length,
            typeLabel: nextSuggestion.suggestionType && getSuggestionTypeValue(nextSuggestion.suggestionType) !== "other" ? getSuggestionTypeLabel(nextSuggestion.suggestionType) : "",
            scopeLabel: getSuggestionScopeLabel(nextSuggestion),
            detail: "Accepting or rejecting this item moves review straight to the next pending suggestion.",
            preview: summarizeSuggestionText(nextSuggestion.originalText || nextSuggestion.resultText || "Next review item", 84),
            followupTitle: activeIndex + 1 === pendingSuggestions.length - 1 ? "Then queue complete" : "",
            followupStatusLabel: activeIndex + 1 === pendingSuggestions.length - 1 ? "Queue complete" : "",
            followupDetail: activeIndex + 1 === pendingSuggestions.length - 1 ? "After reviewing the final pending item, recovery and next queues appear." : ""
        };
    }

    function markQueueOpenedSuggestion(suggestionId) {
        if (editor.__aiQueueOpenedTimer) {
            clearTimeout(editor.__aiQueueOpenedTimer);
            editor.__aiQueueOpenedTimer = null;
        }
        editor.__aiRecentlyOpenedQueueSuggestionId = suggestionId || null;
        updateActiveSuggestionDecorations();
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(false);
        }
        if (!suggestionId) {
            return false;
        }
        editor.__aiQueueOpenedTimer = setTimeout(function () {
            if (editor.__aiRecentlyOpenedQueueSuggestionId === suggestionId) {
                editor.__aiRecentlyOpenedQueueSuggestionId = null;
                updateActiveSuggestionDecorations();
                if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                    renderReviewPanel(false);
                }
            }
            editor.__aiQueueOpenedTimer = null;
        }, 1800);
        return true;
    }

    function clearQueueOpenedSuggestion(options) {
        options = options || {};
        var hadState = !!editor.__aiRecentlyOpenedQueueSuggestionId;
        if (editor.__aiQueueOpenedTimer) {
            clearTimeout(editor.__aiQueueOpenedTimer);
            editor.__aiQueueOpenedTimer = null;
        }
        editor.__aiRecentlyOpenedQueueSuggestionId = null;
        if (!hadState) {
            return false;
        }
        if (!options.skipUpdate) {
            updateActiveSuggestionDecorations();
        }
        if (!options.skipRender && editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(false);
        }
        return true;
    }

    function buildInlineQueueBoundaryAnnouncement(currentSuggestionId, direction) {
        var suggestion = findSuggestionById(currentSuggestionId);
        var typeFilter = getInlineReviewTypeFilter(currentSuggestionId);
        var queueLabel = typeFilter && typeFilter !== "all"
            ? getSuggestionTypeLabel(typeFilter) + " review queue"
            : "AI review queue";
        var prefix = direction === "previous" || direction === "first"
            ? "Already at the first pending item in the " + queueLabel + "."
            : "Already at the last pending item in the " + queueLabel + ".";
        if (!suggestion) {
            return prefix;
        }
        return prefix + " " + buildSuggestionAnnouncement(suggestion, "Still reviewing");
    }

    function buildInlineQueueCompleteAnnouncement(actionLabel, suggestionId) {
        var suggestion = findSuggestionById(suggestionId);
        var lead = suggestion
            ? buildSuggestionAnnouncement(suggestion, actionLabel)
            : (actionLabel || "Updated") + " AI suggestion.";
        return lead + " Review queue complete.";
    }

    function buildCompletionPreviewReason(suggestion) {
        if (!suggestion || !suggestion.reason) {
            return "";
        }
        return summarizeSuggestionText(suggestion.reason, 110);
    }

    function buildCompletionPreviewResult(suggestion) {
        if (!suggestion) {
            return "";
        }
        var resultText = summarizeSuggestionText(suggestion.resultText || "", 96);
        var originalText = summarizeSuggestionText(suggestion.originalText || "", 96);
        if (!resultText || resultText === originalText) {
            return "";
        }
        return resultText;
    }

    function buildCompletionPreviewChangeLabel(suggestion) {
        if (!suggestion) {
            return "";
        }
        switch (getSuggestionTypeValue(suggestion.suggestionType)) {
            case "proofread":
                return "Surface edit";
            case "rewrite":
                return "Text rewrite";
            case "translate":
                return "Language change";
            case "summarize":
            case "shorten":
                return "Condensed draft";
            case "expand":
                return "Expanded draft";
        }
        var current = normalizeText(suggestion.originalText || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
        var result = normalizeText(suggestion.resultText || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
        if (current && result && current === result) {
            return "Surface edit";
        }
        return "Text change";
    }

    function buildCompletionPreviewImpactLabel(suggestion) {
        if (!suggestion) {
            return "";
        }
        var typeValue = getSuggestionTypeValue(suggestion.suggestionType);
        var current = normalizeText(suggestion.originalText || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
        var result = normalizeText(suggestion.resultText || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
        if (!current || !result) {
            return "";
        }
        if (current === result || typeValue === "proofread") {
            return "Low impact";
        }
        if (typeValue === "translate" || typeValue === "summarize" || typeValue === "shorten" || typeValue === "expand") {
            return "High impact";
        }
        if (typeValue === "rewrite") {
            return "Medium impact";
        }
        if (current.indexOf(result) >= 0 || result.indexOf(current) >= 0) {
            return "Medium impact";
        }
        var currentWords = current.split(/\s+/);
        var resultWords = result.split(/\s+/);
        var currentMap = {};
        var overlap = 0;
        for (var currentWordIndex = 0; currentWordIndex < currentWords.length; currentWordIndex++) {
            currentMap[currentWords[currentWordIndex]] = (currentMap[currentWords[currentWordIndex]] || 0) + 1;
        }
        for (var resultWordIndex = 0; resultWordIndex < resultWords.length; resultWordIndex++) {
            var word = resultWords[resultWordIndex];
            if (currentMap[word]) {
                currentMap[word]--;
                overlap++;
            }
        }
        var overlapRatio = overlap / Math.max(currentWords.length, resultWords.length, 1);
        return overlapRatio >= 0.45 ? "Medium impact" : "High impact";
    }

    function getNormalizedTextWordCount(text) {
        var clean = normalizeText(text || "");
        return clean ? clean.split(/\s+/).length : 0;
    }

    function getNormalizedTextSentenceCount(text) {
        var clean = normalizeText(text || "");
        if (!clean) {
            return 0;
        }
        var matches = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
        return matches && matches.length ? matches.length : 1;
    }

    function formatCountNoun(count, singular) {
        return count + " " + singular + (count === 1 ? "" : "s");
    }

    function buildReviewChangeGlanceData(suggestion) {
        if (!suggestion) {
            return null;
        }
        var pills = [];
        var changeLabel = buildCompletionPreviewChangeLabel(suggestion);
        var impactLabel = buildCompletionPreviewImpactLabel(suggestion);
        var scopeLabel = getSuggestionScopeLabel(suggestion);
        if (changeLabel) {
            pills.push({
                kind: "change",
                text: changeLabel
            });
        }
        if (impactLabel) {
            pills.push({
                kind: "impact",
                text: impactLabel
            });
        }
        if (scopeLabel) {
            pills.push({
                kind: "scope",
                text: scopeLabel
            });
        }
        var currentWordCount = getNormalizedTextWordCount(suggestion.originalText || "");
        var resultWordCount = getNormalizedTextWordCount(suggestion.resultText || "");
        var currentSentenceCount = getNormalizedTextSentenceCount(suggestion.originalText || "");
        var resultSentenceCount = getNormalizedTextSentenceCount(suggestion.resultText || "");
        var detail = "";
        if (currentWordCount && resultWordCount && currentSentenceCount && resultSentenceCount) {
            if (currentWordCount === resultWordCount && currentSentenceCount === resultSentenceCount) {
                detail = "Keeps " + formatCountNoun(resultWordCount, "word") + " across " + formatCountNoun(resultSentenceCount, "sentence") + ".";
            }
            else if (currentSentenceCount === resultSentenceCount) {
                detail = "Moves from " + formatCountNoun(currentWordCount, "word") + " to " + formatCountNoun(resultWordCount, "word") + " across " + formatCountNoun(resultSentenceCount, "sentence") + ".";
            }
            else {
                detail = "Moves from " + formatCountNoun(currentWordCount, "word") + " across " + formatCountNoun(currentSentenceCount, "sentence") + " to " + formatCountNoun(resultWordCount, "word") + " across " + formatCountNoun(resultSentenceCount, "sentence") + ".";
            }
        }
        else if (currentWordCount && resultWordCount) {
            detail = "Moves from " + formatCountNoun(currentWordCount, "word") + " to " + formatCountNoun(resultWordCount, "word") + ".";
        }
        else if (currentSentenceCount && resultSentenceCount) {
            detail = "Moves from " + formatCountNoun(currentSentenceCount, "sentence") + " to " + formatCountNoun(resultSentenceCount, "sentence") + ".";
        }
        if (!pills.length && !detail) {
            return null;
        }
        return {
            title: "Change at a glance",
            pills: pills,
            detail: detail
        };
    }

    function buildCompletionPreviewDiffParts(currentText, resultText) {
        var current = normalizeText(currentText || "");
        var result = normalizeText(resultText || "");
        if (!current || !result || current === result) {
            return null;
        }
        var prefixLength = 0;
        var maxPrefix = Math.min(current.length, result.length);
        while (prefixLength < maxPrefix && current.charAt(prefixLength) === result.charAt(prefixLength)) {
            prefixLength++;
        }
        var suffixLength = 0;
        var maxCurrentSuffix = current.length - prefixLength;
        var maxResultSuffix = result.length - prefixLength;
        while (
            suffixLength < maxCurrentSuffix &&
            suffixLength < maxResultSuffix &&
            current.charAt(current.length - 1 - suffixLength) === result.charAt(result.length - 1 - suffixLength)
        ) {
            suffixLength++;
        }
        return {
            currentLead: current.substring(0, prefixLength),
            currentChange: current.substring(prefixLength, current.length - suffixLength),
            currentTrail: suffixLength ? current.substring(current.length - suffixLength) : "",
            resultLead: result.substring(0, prefixLength),
            resultChange: result.substring(prefixLength, result.length - suffixLength),
            resultTrail: suffixLength ? result.substring(result.length - suffixLength) : ""
        };
    }

    function appendCompletionPreviewLine(parent, kind, text, diffParts) {
        var label = kind === "result" ? "Suggested" : "Current";
        var line = append(parent, "div", "", "rte-ai-review-empty-preview-line is-" + kind);
        append(line, "span", "", "rte-ai-review-empty-preview-line-label", label + ":");
        var content = append(line, "span", "", "rte-ai-review-empty-preview-line-text");
        if (!text) {
            return line;
        }
        if (!diffParts) {
            content.innerText = text;
            return line;
        }
        var lead = kind === "result" ? diffParts.resultLead : diffParts.currentLead;
        var change = kind === "result" ? diffParts.resultChange : diffParts.currentChange;
        var trail = kind === "result" ? diffParts.resultTrail : diffParts.currentTrail;
        if (lead) {
            append(content, "span", "", "rte-ai-review-empty-preview-segment", lead);
        }
        if (change) {
            append(content, "span", "", "rte-ai-review-empty-preview-delta is-" + kind, change);
        }
        if (trail) {
            append(content, "span", "", "rte-ai-review-empty-preview-segment", trail);
        }
        if (!lead && !change && !trail) {
            content.innerText = text;
        }
        return line;
    }

    function appendReviewCompareDeltaText(parent, kind, text, diffParts) {
        var content = append(parent, "div", "", "rte-ai-review-item-compare-text");
        var value = text || "";
        if (!value) {
            content.innerText = kind === "result" ? "Suggested text unavailable." : "Original selection unavailable.";
            return content;
        }
        if (!diffParts) {
            content.innerText = value;
            return content;
        }
        var lead = kind === "result" ? diffParts.resultLead : diffParts.currentLead;
        var change = kind === "result" ? diffParts.resultChange : diffParts.currentChange;
        var trail = kind === "result" ? diffParts.resultTrail : diffParts.currentTrail;
        if (lead) {
            append(content, "span", "", "rte-ai-review-item-compare-segment", lead);
        }
        if (change) {
            append(content, "span", "", "rte-ai-review-item-compare-delta is-" + kind, change);
        }
        if (trail) {
            append(content, "span", "", "rte-ai-review-item-compare-segment", trail);
        }
        if (!lead && !change && !trail) {
            content.innerText = value;
        }
        return content;
    }

    function updateReviewCondensedPreviewOpenHint(preview, suggestion, panel) {
        if (!preview || !suggestion) {
            return;
        }
        var item = preview.closest ? preview.closest(".rte-ai-review-item") : null;
        var actionNode = preview.querySelector(".rte-ai-review-item-condensed-open-pill");
        if (!actionNode) {
            return;
        }
        var focusLabel = getReviewFocusActionDisplayLabel(suggestion, getPreferredReviewActionFocus(panel))
            || getReviewFocusActionDisplayLabel(suggestion, "")
            || "Locate";
        actionNode.innerText = focusLabel;
        if (item && item.setAttribute) {
            item.setAttribute("data-rte-ai-review-open-action-label", focusLabel);
            var baseAria = item.getAttribute("data-rte-ai-review-base-aria-label") || item.getAttribute("aria-label") || "";
            item.setAttribute("aria-label", baseAria ? (baseAria + ". Open on " + focusLabel + ".") : ("Open on " + focusLabel + "."));
        }
    }

    function updateVisibleReviewCondensedPreviewOpenHints(panel) {
        var panelNode = panel && panel.isConnected
            ? panel
            : (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected ? editor.__aiReviewPanel : null);
        if (!panelNode) {
            return;
        }
        var preferredAction = getPreferredReviewActionFocus(panelNode);
        var items = panelNode.querySelectorAll(".rte-ai-review-item.is-condensed");
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var suggestionId = item.getAttribute("data-rte-ai-review-id") || "";
            if (!suggestionId) {
                continue;
            }
            var suggestion = findSuggestionById(suggestionId);
            updateReviewCondensedPreviewOpenHint(item, suggestion, panelNode);
            item.title = getReviewCardShortcutTitle(suggestion, preferredAction);
        }
    }

    function appendReviewCondensedPreview(parent, suggestion, panel) {
        if (!parent || !suggestion) {
            return null;
        }
        var glanceData = buildReviewChangeGlanceData(suggestion);
        var originalText = summarizeSuggestionText(suggestion.originalText || "", 72) || "Original selection unavailable.";
        var resultText = summarizeSuggestionText(suggestion.resultText || "", 72) || "Suggested text unavailable.";
        var reasonText = buildCompletionPreviewReason(suggestion);
        var diffParts = buildCompletionPreviewDiffParts(originalText, resultText);
        var preview = append(parent, "div", "", "rte-ai-review-item-condensed-preview");
        var openHint = append(preview, "div", "", "rte-ai-review-item-condensed-open");
        append(openHint, "span", "", "rte-ai-review-item-condensed-open-label", "Open on");
        append(openHint, "span", "", "rte-ai-review-item-condensed-open-pill");
        updateReviewCondensedPreviewOpenHint(preview, suggestion, panel);
        if (glanceData && glanceData.pills && glanceData.pills.length) {
            var glance = append(preview, "div", "", "rte-ai-review-item-condensed-glance");
            var glanceMeta = append(glance, "div", "", "rte-ai-review-item-condensed-glance-meta");
            for (var glanceIndex = 0; glanceIndex < glanceData.pills.length; glanceIndex++) {
                var glancePill = glanceData.pills[glanceIndex];
                append(glanceMeta, "span", "", "rte-ai-review-item-glance-pill is-" + glancePill.kind, glancePill.text);
            }
            if (glanceData.detail) {
                append(glance, "div", "", "rte-ai-review-item-condensed-glance-detail", glanceData.detail);
            }
        }
        var currentLine = append(preview, "div", "", "rte-ai-review-item-condensed-preview-line is-current");
        append(currentLine, "span", "", "rte-ai-review-item-condensed-preview-label", "Current");
        appendReviewCompareDeltaText(currentLine, "current", originalText, diffParts);
        var resultLine = append(preview, "div", "", "rte-ai-review-item-condensed-preview-line is-result");
        append(resultLine, "span", "", "rte-ai-review-item-condensed-preview-label", "Suggested");
        appendReviewCompareDeltaText(resultLine, "result", resultText, diffParts);
        if (reasonText) {
            var reason = append(preview, "div", "", "rte-ai-review-item-condensed-reason");
            append(reason, "span", "", "rte-ai-review-item-condensed-reason-label", "Why");
            append(reason, "div", "", "rte-ai-review-item-condensed-reason-copy", reasonText);
        }
        return preview;
    }

    function buildReviewEmptyState(counts, filteredPendingCount, typeFilter, showResolved, nextOverallPendingId, pendingCountsByType, typeOptions) {
        var hasResolved = !!(counts.accepted || counts.rejected || counts.stale);
        var preferredQueueFocusAction = getPreferredReviewActionFocus();
        var undoableDecision = getUndoableReviewDecision();
        var undoContext = getUndoDecisionContext(undoableDecision);
        var undoAction = undoableDecision ? {
            id: "undo-last",
            label: undoContext.actionLabel,
            focusActionLabel: getRecoveryDecisionFocusActionDisplayLabel(undoableDecision, preferredQueueFocusAction)
        } : null;
        if (typeFilter !== "all" && !filteredPendingCount) {
            var nextTypeActions = [];
            var nextTypePreviews = [];
            var nextQueueLabels = [];
            var options = typeOptions || [];
            var countsByType = pendingCountsByType || {};
            for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
                var option = options[optionIndex];
                if (!option || option.value === "all" || option.value === typeFilter) {
                    continue;
                }
                var optionCount = countsByType[option.value] || 0;
                if (!optionCount) {
                    continue;
                }
                var previewSuggestionId = getNextPendingSuggestionId(option.value, "");
                var previewSuggestion = previewSuggestionId ? findSuggestionById(previewSuggestionId) : null;
                var previewText = previewSuggestion
                    ? summarizeSuggestionText(previewSuggestion.originalText || previewSuggestion.resultText || "", 84)
                    : "";
                var previewResultText = buildCompletionPreviewResult(previewSuggestion);
                var changeLabel = buildCompletionPreviewChangeLabel(previewSuggestion);
                var impactLabel = buildCompletionPreviewImpactLabel(previewSuggestion);
                var scopeLabel = previewSuggestion ? getSuggestionScopeLabel(previewSuggestion) : "";
                var languageLabel = previewSuggestion && previewSuggestion.language ? getTranslateLanguageLabel(previewSuggestion.language) : "";
                var reasonText = buildCompletionPreviewReason(previewSuggestion);
                nextQueueLabels.push(option.label + " (" + optionCount + ")");
                nextTypeActions.push({
                    id: "go-type",
                    label: "Go to " + option.label + " (" + optionCount + ")",
                    typeValue: option.value,
                    suggestionId: previewSuggestionId,
                    focusAction: preferredQueueFocusAction,
                    focusActionLabel: getReviewFocusActionDisplayLabel(previewSuggestion, preferredQueueFocusAction)
                });
                if (previewText) {
                    nextTypePreviews.push({
                        label: option.label + " next",
                        text: previewText,
                        typeValue: option.value,
                        suggestionId: previewSuggestionId,
                        actionLabel: "Go to " + option.label + " (" + optionCount + ")",
                        focusAction: preferredQueueFocusAction,
                        pendingCountLabel: optionCount + " pending",
                        changeLabel: changeLabel,
                        impactLabel: impactLabel,
                        focusActionLabel: getReviewFocusActionDisplayLabel(previewSuggestion, preferredQueueFocusAction),
                        scopeLabel: scopeLabel,
                        languageLabel: languageLabel,
                        resultText: previewResultText,
                        reasonText: reasonText
                    });
                }
            }
            var filteredTypeLabel = getSuggestionTypeLabel(typeFilter);
            return {
                title: filteredTypeLabel + " queue complete",
                detail: counts.pending
                    ? "No pending " + filteredTypeLabel.toLowerCase() + " suggestions remain. Continue into another AI queue, switch back to all types, or review resolved items."
                    : "No pending " + filteredTypeLabel.toLowerCase() + " suggestions remain, and the overall AI review queue is complete.",
                announceMessage: counts.pending
                    ? (nextQueueLabels.length === 1
                        ? filteredTypeLabel + " queue complete. Next queue: " + nextQueueLabels[0] + "."
                        : nextQueueLabels.length > 1
                            ? filteredTypeLabel + " queue complete. Next queues available: " + nextQueueLabels.join(", ") + "."
                            : filteredTypeLabel + " queue complete. Pending AI review remains in other queues.")
                    : filteredTypeLabel + " queue complete. Overall AI review queue complete.",
                previewItems: nextTypePreviews,
                actions: nextTypeActions.concat([
                    counts.pending && nextOverallPendingId ? {
                        id: "next-overall",
                        label: "Next pending overall",
                        suggestionId: nextOverallPendingId,
                        focusAction: preferredQueueFocusAction,
                        focusActionLabel: getReviewFocusActionDisplayLabel(findSuggestionById(nextOverallPendingId), preferredQueueFocusAction)
                    } : null,
                    undoAction,
                    { id: "all-types", label: "All types" },
                    hasResolved && !showResolved ? { id: "show-resolved", label: "Show resolved" } : null,
                    { id: "open-chat", label: "AI Chat" }
                ])
            };
        }
        if (!counts.pending) {
            return {
                title: "Review queue complete",
                detail: hasResolved
                    ? "All AI suggestions have been reviewed. You can inspect resolved items or open AI Chat to generate more suggestions."
                    : "There are no pending AI suggestions right now. Open AI Chat to create a new review pass.",
                announceMessage: hasResolved
                    ? "Review queue complete. All AI suggestions have been reviewed."
                    : "Review queue complete. No pending AI suggestions remain.",
                actions: [
                    undoAction,
                    hasResolved && !showResolved ? { id: "show-resolved", label: "Show resolved" } : null,
                    { id: "open-chat", label: "AI Chat" }
                ]
            };
        }
        return {
            title: "No suggestions in this view",
            detail: "Suggestions from Ask AI or the chat panel stay here until you accept or reject them.",
            announceMessage: "",
            actions: [
                undoAction,
                typeFilter !== "all" ? { id: "all-types", label: "All types" } : null,
                hasResolved && !showResolved ? { id: "show-resolved", label: "Show resolved" } : null,
                { id: "open-chat", label: "AI Chat" }
            ]
        };
    }

    function getReviewOverviewStatusLabel(counts, filteredPendingCount, typeFilter) {
        if (!counts || !counts.total) {
            return "No suggestions";
        }
        if (typeFilter !== "all" && filteredPendingCount > 0) {
            return getSuggestionTypeLabel(typeFilter) + " queue";
        }
        if (counts.pending > 0) {
            return "Reviewing";
        }
        if (counts.stale > 0) {
            return "Needs refresh";
        }
        return "Queue complete";
    }

    function getReviewOverviewTitle(counts, filteredPendingCount, typeFilter, activePendingPosition) {
        if (!counts || !counts.total) {
            return "Ask AI to create a review queue.";
        }
        if (activePendingPosition && activePendingPosition.total && activePendingPosition.index) {
            return "Item " + activePendingPosition.index + " of " + activePendingPosition.total + " is active now.";
        }
        if (typeFilter !== "all" && filteredPendingCount > 0) {
            return filteredPendingCount + " " + getSuggestionTypeLabel(typeFilter).toLowerCase() + " item" + (filteredPendingCount === 1 ? "" : "s") + " ready to review.";
        }
        if (counts.pending > 0) {
            return counts.pending + " pending item" + (counts.pending === 1 ? "" : "s") + " ready for review.";
        }
        return "Everything in this queue has been reviewed for now.";
    }

    function getReviewOverviewDetail(counts, filteredPendingCount, typeFilter, activityNotice) {
        if (!counts || !counts.total) {
            return "Use Ask AI, AI Chat, or inline review actions to generate reviewable changes.";
        }
        var details = [];
        if (typeFilter !== "all") {
            details.push("Showing only " + getSuggestionTypeLabel(typeFilter).toLowerCase() + " suggestions.");
        }
        else {
            details.push("Showing every AI suggestion in this editor.");
        }
        if (activityNotice && activityNotice.count) {
            details.push(activityNotice.count + " shared update" + (activityNotice.count === 1 ? "" : "s") + " waiting.");
        }
        else if (counts.stale > 0) {
            details.push(counts.stale + " suggestion" + (counts.stale === 1 ? "" : "s") + " may need refresh.");
        }
        else if (counts.pending > 0 && typeFilter !== "all" && filteredPendingCount !== counts.pending) {
            details.push(counts.pending + " total pending across all queues.");
        }
        return details.join(" ");
    }

    function getReviewItemStateTitle(suggestion, isCurrent, isQueueOpenedItem) {
        if (!suggestion) {
            return "AI suggestion";
        }
        if (suggestion.status === "pending" && isQueueOpenedItem) {
            return "Opened from queue switcher";
        }
        if (suggestion.status === "pending" && isCurrent) {
            return "Ready to review now";
        }
        if (suggestion.status === "accepted") {
            return "Accepted change";
        }
        if (suggestion.status === "rejected") {
            return "Rejected change";
        }
        if (suggestion.status === "stale") {
            return "Needs refresh";
        }
        return getSuggestionStatusLabel(suggestion.status);
    }

    function getReviewItemStateDetail(suggestion, isCurrent, isQueueOpenedItem, sharedUpdateCount) {
        if (!suggestion) {
            return "";
        }
        var details = [];
        if (suggestion.status === "pending" && isCurrent) {
            details.push("This is the active item in the current queue.");
        }
        else if (suggestion.status === "pending" && isQueueOpenedItem) {
            details.push("This item was opened from the queue-complete handoff.");
        }
        else if (suggestion.status === "stale") {
            details.push("Review the latest editor text before deciding.");
        }
        else if (suggestion.status === "accepted" || suggestion.status === "rejected") {
            details.push("This decision stays in history until you reopen it.");
        }
        var scopeLabel = suggestion.sourceLabel || (suggestion.snapshot && suggestion.snapshot.hasSelection ? "Selection suggestion" : "Document suggestion");
        if (scopeLabel) {
            details.push(scopeLabel + ".");
        }
        if (sharedUpdateCount) {
            details.push(sharedUpdateCount > 1 ? sharedUpdateCount + " shared updates are waiting." : "A shared update is waiting.");
        }
        return details.join(" ");
    }

    function buildReviewEmptyHintText(primaryActionLabel, hasQueueSwitcher) {
        var text = "";
        if (!primaryActionLabel) {
            text = "Press Tab for available actions.";
        }
        else {
            text = hasQueueSwitcher
            ? "Press Enter to " + primaryActionLabel + ". J/K or Left/Right switch queues. Home/End jump queues. Tab for more actions."
            : "Press Enter to " + primaryActionLabel + ". Tab for more actions.";
        }
        var undoContext = getUndoDecisionContext();
        var redoContext = getRedoDecisionContext();
        return hasUndoableReviewShortcut()
            ? text.replace(/\.$/, "") + ". Press U to " + undoContext.shortcutLabel + "." + (hasRedoableReviewShortcut() ? " Press Shift+U to " + redoContext.shortcutLabel + "." : "")
            : (hasRedoableReviewShortcut()
                ? text.replace(/\.$/, "") + ". Press Shift+U to " + redoContext.shortcutLabel + "."
                : text);
    }

    function buildReviewEmptyShortcutText(primaryActionLabel, options) {
        options = options || {};
        var undoContext = getUndoDecisionContext();
        var redoContext = getRedoDecisionContext();
        if (!primaryActionLabel) {
            var emptyParts = [];
            if (hasUndoableReviewShortcut()) {
                emptyParts.push("U " + undoContext.shortcutLabel);
            }
            if (hasRedoableReviewShortcut()) {
                emptyParts.push("Shift+U " + redoContext.shortcutLabel);
            }
            emptyParts.push("Esc close");
            return "Shortcuts: " + emptyParts.join(", ");
        }
        var parts = ["Enter " + primaryActionLabel];
        if (options.queueSwitcher) {
            parts.push("J/K or Left/Right switch queues");
            parts.push("Home/End jump queues");
        }
        if (hasUndoableReviewShortcut()) {
            parts.push("U " + undoContext.shortcutLabel);
        }
        if (hasRedoableReviewShortcut()) {
            parts.push("Shift+U " + redoContext.shortcutLabel);
        }
        parts.push("Tab more actions");
        parts.push("Esc close");
        return "Shortcuts: " + parts.join(", ");
    }

    function getReviewEmptyControlShortcutTitle(label, options) {
        options = options || {};
        var parts = ["Enter activates " + (label || "this action") + (options.focusLabel ? " and focuses " + options.focusLabel : "") + "."];
        if (options.queueSwitcher) {
            parts.push("J/K or Left/Right switch queues. Home/End jump queues.");
        }
        parts.push("Tab moves to more actions.");
        var undoContext = getUndoDecisionContext();
        var redoContext = getRedoDecisionContext();
        var title = parts.join(" ");
        if (hasUndoableReviewShortcut()) {
            title = title.replace(/\.$/, "") + " U undoes " + undoContext.decisionLabel + " decision.";
        }
        if (hasRedoableReviewShortcut()) {
            title = title.replace(/\.$/, "") + " Shift+U redoes " + redoContext.decisionLabel + " decision.";
        }
        return title;
    }

    function getReviewEmptyControlShortcutKeys(options) {
        options = options || {};
        var keys = options.queueSwitcher
            ? "Enter Space J K ArrowLeft ArrowRight Home End"
            : "Enter Space";
        return appendUndoShortcutKeys(keys);
    }

    function announceReviewStatus(message) {
        var node = ensureReviewStatusNode();
        var text = normalizeText(message || "");
        if (!node || !text) {
            return false;
        }

        if (editor.__aiReviewStatusTimer) {
            clearTimeout(editor.__aiReviewStatusTimer);
        }
        node.textContent = "";
        editor.__aiReviewStatusTimer = setTimeout(function () {
            if (node) {
                node.textContent = text;
            }
        }, 30);
        return true;
    }

    function getChatState() {
        if (!editor.__aiChatState) {
            var snapshot = captureSelectionSnapshot();
            editor.__aiChatState = {
                messages: [],
                draft: "",
                scope: snapshot.hasSelection ? "selection" : "document",
                busy: false,
                status: ""
            };
        }
        return editor.__aiChatState;
    }

    function resolveChatScope() {
        var state = getChatState();
        var snapshot = captureSelectionSnapshot();
        var scope = state.scope === "selection" && snapshot.hasSelection ? "selection" : "document";
        var source = scope === "selection"
            ? (snapshot.text || snapshot.wholeText)
            : snapshot.wholeText;
        return {
            scope: scope,
            snapshot: snapshot,
            source: source,
            summary: truncateText(source, 180) || "The document is currently empty."
        };
    }

    function closeChatPanel() {
        if (editor.__aiChatPanel && editor.__aiChatPanel.parentNode) {
            editor.__aiChatPanel.parentNode.removeChild(editor.__aiChatPanel);
        }
        if (editor.__aiChatShell && editor.__aiChatShell.classList) {
            editor.__aiChatShell.classList.remove("rte-ai-chat-host");
        }
        if (editor.__aiChatShell && editor.__aiChatShell.style) {
            editor.__aiChatShell.style.minHeight = typeof editor.__aiChatOriginalMinHeight === "string"
                ? editor.__aiChatOriginalMinHeight
                : "";
        }
        editor.__aiChatPanel = null;
        editor.__aiChatShell = null;
        editor.__aiChatOriginalMinHeight = null;
    }

    function openChatPanel(options) {
        options = options || {};
        closeReviewPanel();
        return renderChatPanel(!!options.focusComposer);
    }

    function toggleChatPanel(options) {
        if (editor.__aiChatPanel && editor.__aiChatPanel.isConnected) {
            closeChatPanel();
            return false;
        }
        return openChatPanel(options);
    }

    function runChatPrompt(promptText) {
        var state = getChatState();
        var cleanPrompt = normalizeText(promptText || state.draft);
        if (!cleanPrompt || state.busy) {
            return false;
        }

        var context = resolveChatScope();
        state.scope = context.scope;
        state.draft = "";
        state.busy = true;
        state.status = context.scope === "selection"
            ? "Thinking about the current selection..."
            : "Thinking about the current document...";
        state.messages.push({
            role: "user",
            text: cleanPrompt,
            scope: context.scope,
            snapshot: context.snapshot,
            timestamp: new Date().getTime()
        });
        renderChatPanel(false);

        resolveAction("chat-panel", {
            snapshot: context.snapshot,
            source: context.source,
            prompt: cleanPrompt,
            mode: "chat",
            scope: context.scope
        }).then(function (resolved) {
            state.busy = false;
            state.status = resolved && resolved.operations && resolved.operations.length
                ? "AI response ready. Preview or apply the suggested change from the chat."
                : "AI response ready.";
            state.messages.push({
                role: "assistant",
                text: resolved && (resolved.message || resolved.result) ? (resolved.message || resolved.result) : "No response returned.",
                scope: context.scope,
                resolved: resolved,
                snapshot: context.snapshot,
                timestamp: new Date().getTime()
            });
            renderChatPanel(true);
        }).catch(function (error) {
            console.error("AI chat failed", error);
            state.busy = false;
            state.status = "AI chat failed.";
            state.messages.push({
                role: "assistant",
                text: "I could not finish that request. Try again or shorten the prompt.",
                scope: context.scope,
                isError: true,
                timestamp: new Date().getTime()
            });
            renderChatPanel(true);
        });

        return true;
    }

    function applyChatMessage(message, mode) {
        if (!message || !message.resolved) {
            return false;
        }
        var snapshot = message.snapshot || captureSelectionSnapshot();
        var resolved = message.resolved;
        var resultText = getPrimaryResolvedText(resolved);
        var applied = false;

        if (mode === "plan") {
            applied = executeResolvedAction(resolved, { snapshot: snapshot });
        }
        else if (resultText) {
            if (mode === "preview") {
                var previewResolved = buildResolvedActionFromText(resultText, "selection-preview", resolved, resolved.request || null, resolved.action || null);
                if (previewResolved && previewResolved.operations && previewResolved.operations[0] && !previewResolved.operations[0].reason) {
                    previewResolved.operations[0].reason = getPrimaryResolvedReason(resolved);
                }
                applied = executeResolvedAction(previewResolved, { snapshot: snapshot });
            }
            else if (mode === "selection") {
                applied = executeResolvedAction(buildResolvedActionFromText(resultText, "selection", resolved, resolved.request || null, resolved.action || null), { snapshot: snapshot });
            }
            else if (mode === "insert") {
                applied = executeResolvedAction(buildResolvedActionFromText(resultText, "insert", resolved, resolved.request || null, resolved.action || null), { snapshot: snapshot });
            }
            else if (mode === "document") {
                applied = executeResolvedAction(buildResolvedActionFromText(resultText, "document", resolved, resolved.request || null, resolved.action || null), { snapshot: snapshot });
            }
        }

        if (applied) {
            getChatState().status = mode === "preview"
                ? "Previewed the AI suggestion inline from chat."
                : "Applied the AI chat suggestion.";
            renderChatPanel(false);
        }
        return applied;
    }

    function copyTextToClipboard(text) {
        var clean = normalizeText(text || "");
        if (!clean) {
            return Promise.resolve(false);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(clean).then(function () {
                return true;
            }).catch(function () {
                return fallbackCopyText(clean);
            });
        }

        return Promise.resolve(fallbackCopyText(clean));
    }

    function fallbackCopyText(text) {
        if (!document || !document.body || !document.createElement) {
            return false;
        }

        var textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "readonly");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        var copied = false;
        try {
            copied = !!document.execCommand("copy");
        }
        catch (ignore) {
            copied = false;
        }

        document.body.removeChild(textarea);
        return copied;
    }

    function copyChatMessageText(message) {
        return copyTextToClipboard(message && message.text ? message.text : "").then(function (copied) {
            var state = getChatState();
            state.status = copied
                ? "Copied the AI response."
                : "Could not copy the AI response.";
            renderChatPanel(false);
            return copied;
        });
    }

    function getChatMessageRoleLabel(message) {
        if (message && message.isError) {
            return "Issue";
        }
        return message && message.role === "user" ? "You" : "AI";
    }

    function getChatMessageScopeLabel(message) {
        return message && message.scope === "selection" ? "Selection" : "Document";
    }

    function getChatMessageTypeLabel(message) {
        if (!message) {
            return "";
        }
        if (message.isError) {
            return "Needs retry";
        }
        if (message.role === "user") {
            return "Prompt";
        }
        var resolved = message.resolved || null;
        var operations = resolved && resolved.operations ? resolved.operations : [];
        var resultText = resolved ? getPrimaryResolvedText(resolved) : "";
        if (operations.length) {
            return "Reviewable change";
        }
        if (resultText) {
            return "Draft";
        }
        return "Answer";
    }

    function buildChatMessageSupportingCopy(message) {
        if (!message) {
            return "";
        }
        var scopeLabel = getChatMessageScopeLabel(message).toLowerCase();
        if (message.isError) {
            return "This request hit an issue. Try again or adjust the prompt.";
        }
        if (message.role === "user") {
            return "Sent with " + scopeLabel + " context.";
        }
        var resolved = message.resolved || null;
        var operations = resolved && resolved.operations ? resolved.operations : [];
        var resultText = resolved ? getPrimaryResolvedText(resolved) : "";
        if (operations.length) {
            return "Ready for preview, apply, or insert from the " + scopeLabel + " context.";
        }
        if (resultText) {
            return "Drafted from the " + scopeLabel + " context.";
        }
        return "Response grounded in the " + scopeLabel + " context.";
    }

    function buildChatMessageContextCardData(message) {
        if (!message || message.isError || !message.snapshot) {
            return null;
        }
        var sourceText = message.scope === "selection"
            ? (message.snapshot.text || message.snapshot.wholeText || "")
            : (message.snapshot.wholeText || "");
        sourceText = normalizeText(sourceText || "");
        if (!sourceText) {
            return null;
        }
        var paragraphCount = getChatContextParagraphCount(sourceText);
        return {
            title: message.scope === "selection" ? "Using current selection" : "Using current document",
            scopeLabel: message.scope === "selection" ? "Selection context" : "Document context",
            wordLabel: getChatContextWordCount(sourceText) + " words",
            paragraphLabel: paragraphCount > 1 ? paragraphCount + " paragraphs" : "",
            copy: summarizeSuggestionText(sourceText, 180)
        };
    }

    function getChatMessageStateTitle(message) {
        if (!message) {
            return "";
        }
        if (message.isError) {
            return "Reply needs retry";
        }
        if (message.role === "user") {
            return "Prompt sent";
        }
        var resolved = message.resolved || null;
        var operations = resolved && resolved.operations ? resolved.operations : [];
        var resultText = resolved ? getPrimaryResolvedText(resolved) : "";
        if (operations.length) {
            return "Reviewable change prepared";
        }
        if (resultText) {
            return "Draft prepared";
        }
        return "Answer ready";
    }

    function getChatMessageStateDetail(message) {
        if (!message) {
            return "";
        }
        var scopeLabel = getChatMessageScopeLabel(message).toLowerCase();
        if (message.isError) {
            return "This " + scopeLabel + " request hit an issue. Adjust the prompt or try again.";
        }
        if (message.role === "user") {
            return "Waiting on AI for the current " + scopeLabel + " context.";
        }
        var resolved = message.resolved || null;
        var operations = resolved && resolved.operations ? resolved.operations : [];
        var resultText = resolved ? getPrimaryResolvedText(resolved) : "";
        if (operations.length) {
            return "Preview, replace, or insert this " + scopeLabel + " change from the latest reply.";
        }
        if (resultText) {
            return "Reuse or adapt this drafted " + scopeLabel + " response.";
        }
        return "Read the answer grounded in the current " + scopeLabel + " context.";
    }

    function getChatMessageActionSummary(message) {
        if (!message || !message.resolved) {
            return null;
        }
        var resolved = message.resolved || null;
        var operations = resolved && resolved.operations ? resolved.operations : [];
        var resultText = resolved ? getPrimaryResolvedText(resolved) : "";
        var hasSelection = !!(message.snapshot && message.snapshot.hasSelection);
        if (operations.length && hasSelection) {
            return {
                title: "Best next step: Preview inline",
                detail: "Check the inline diff first, then replace the selection or apply the prepared plan if it looks right."
            };
        }
        if (operations.length) {
            return {
                title: "Best next step: Apply the prepared plan",
                detail: "Run the structured change directly or use the insert and document actions below if you want a different handoff."
            };
        }
        if (resultText && hasSelection) {
            return {
                title: "Best next step: Replace or preview",
                detail: "Use the prepared draft to preview inline, replace the selection, or insert a follow-up below."
            };
        }
        if (resultText) {
            return {
                title: "Best next step: Reuse this draft",
                detail: "Insert the draft below or replace the full document, depending on how broad the change should be."
            };
        }
        return null;
    }

    function getChatRecommendedActionId(message) {
        if (!message || !message.resolved) {
            return "";
        }
        var resolved = message.resolved || null;
        var operations = resolved && resolved.operations ? resolved.operations : [];
        var resultText = resolved ? getPrimaryResolvedText(resolved) : "";
        var hasSelection = !!(message.snapshot && message.snapshot.hasSelection);
        if (operations.length && hasSelection) {
            return "preview";
        }
        if (operations.length) {
            return "apply";
        }
        if (resultText && hasSelection) {
            return "selection";
        }
        if (resultText) {
            return "insert";
        }
        return "";
    }

    function getChatRecommendedActionLabel(actionId) {
        if (actionId === "preview") {
            return "Preview inline";
        }
        if (actionId === "apply") {
            return "Apply";
        }
        if (actionId === "selection") {
            return "Replace selection";
        }
        if (actionId === "insert") {
            return "Insert below";
        }
        if (actionId === "document") {
            return "Replace document";
        }
        return "";
    }

    function getChatActionGroupInfo(groupKey, recommendedActionId) {
        var info = {
            title: "",
            badge: "",
            recommended: false
        };
        if (groupKey === "utility") {
            info.title = "Utility";
        }
        else if (groupKey === "primary") {
            info.title = "Preview and apply";
        }
        else if (groupKey === "secondary") {
            info.title = "Insert or replace";
        }
        var recommendedGroupKey = "";
        if (recommendedActionId === "apply" || recommendedActionId === "preview" || recommendedActionId === "selection") {
            recommendedGroupKey = "primary";
        }
        else if (recommendedActionId === "insert" || recommendedActionId === "document") {
            recommendedGroupKey = "secondary";
        }
        if (recommendedGroupKey && groupKey === recommendedGroupKey) {
            info.title = "Recommended next step";
            info.badge = getChatRecommendedActionLabel(recommendedActionId);
            info.recommended = !!info.badge;
        }
        return info;
    }

    function appendChatActionGroupHeader(group, groupInfo, groupKey) {
        if (!group || !groupInfo) {
            return null;
        }
        if (!group.getElementsByTagName("button").length) {
            return null;
        }
        group.setAttribute("data-rte-ai-chat-group-key", groupKey || "");
        if (groupInfo.recommended) {
            group.setAttribute("data-rte-ai-chat-group-recommended", "true");
        }
        var headerClass = "rte-ai-chat-message-action-group-header";
        if (groupInfo.recommended) {
            headerClass += " is-recommended";
        }
        var header = append(group, "div", "", headerClass);
        append(header, "div", "", "rte-ai-chat-message-action-group-title", groupInfo.title || "");
        if (groupInfo.badge) {
            append(header, "span", "", "rte-ai-chat-message-action-group-badge", groupInfo.badge);
        }
        if (group.firstChild !== header) {
            group.insertBefore(header, group.firstChild);
        }
        return header;
    }

    function getChatMessageSourcePreviewText(message) {
        if (!message || !message.snapshot) {
            return "";
        }
        var source = message.scope === "selection"
            ? (message.snapshot.text || message.snapshot.wholeText || "")
            : (message.snapshot.wholeText || "");
        return summarizeSuggestionText(source, 120);
    }

    function buildChatResolvedPreviewData(message) {
        if (!message || !message.resolved) {
            return null;
        }
        var resultText = summarizeSuggestionText(getPrimaryResolvedText(message.resolved), 120);
        if (!resultText) {
            return null;
        }
        var sourceText = getChatMessageSourcePreviewText(message);
        var operations = message.resolved.operations || [];
        var operationMeta = operations.length ? getOperationDisplayMeta(operations[0]) : null;
        var operationCount = operations.length;
        var targetLabel = operationMeta && operationMeta.title ? operationMeta.title : (message.scope === "selection" ? "Selection draft" : "Document draft");
        return {
            title: operationMeta && operationMeta.title ? operationMeta.title : "Prepared draft",
            sourceText: sourceText,
            resultText: resultText,
            reasonText: summarizeSuggestionText(getPrimaryResolvedReason(message.resolved), 110),
            statusLabel: operationCount ? "Ready to review" : "Draft ready",
            scopeLabel: message.scope === "selection" ? "Selection draft" : "Document draft",
            stepLabel: (operationCount || 1) + " step" + ((operationCount || 1) === 1 ? "" : "s"),
            targetLabel: targetLabel,
            diffParts: sourceText && sourceText !== resultText ? buildCompletionPreviewDiffParts(sourceText, resultText) : null,
            planItems: operations.slice(0, 3).map(function (operation) {
                var meta = getOperationDisplayMeta(operation);
                return meta && meta.title ? meta.title : "AI step";
            }),
            hiddenPlanCount: Math.max(0, operations.length - 3)
        };
    }

    function summarizeChatPromptCopy(text) {
        var clean = normalizeText(text || "");
        if (!clean) {
            return "";
        }
        if (clean.length <= 92) {
            return clean;
        }
        return clean.substring(0, 89).replace(/\s+\S*$/, "") + "...";
    }

    function getChatPromptIntentLabel(prompt) {
        var promptId = prompt && prompt.id ? String(prompt.id).toLowerCase() : "";
        var promptLabel = prompt && prompt.label ? String(prompt.label).toLowerCase() : "";
        var promptText = prompt && prompt.prompt ? String(prompt.prompt).toLowerCase() : "";
        var combined = promptId + " " + promptLabel + " " + promptText;
        if (/translate|spanish|french|german|italian|portuguese|japanese/.test(combined)) {
            return "Language";
        }
        if (/proofread|review|cleaner|grammar/.test(combined)) {
            return "Review";
        }
        if (/heading|title|subheading|structure/.test(combined)) {
            return "Structure";
        }
        if (/expand|supporting paragraph|detail/.test(combined)) {
            return "Expand";
        }
        if (/summarize|summary/.test(combined)) {
            return "Summary";
        }
        return "Starter";
    }

    function getChatPromptToneClass(prompt) {
        var intentLabel = getChatPromptIntentLabel(prompt).toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return intentLabel || "starter";
    }

    function getChatMessageIntentLabel(message) {
        if (!message || !message.text) {
            return "Custom";
        }
        var intentLabel = getChatPromptIntentLabel({ prompt: message.text || "" });
        return intentLabel === "Starter" ? "Custom" : intentLabel;
    }

    function getChatUserPromptBadgeLabel(message) {
        return getChatMessageIntentLabel(message) + " request";
    }

    function getPreviousChatUserMessage(messages, messageIndex) {
        if (!messages || !messages.length || typeof messageIndex !== "number") {
            return null;
        }
        for (var index = messageIndex - 1; index >= 0; index--) {
            if (messages[index] && messages[index].role === "user" && !messages[index].isError) {
                return messages[index];
            }
        }
        return null;
    }

    function buildChatAssistantRequestCardData(messages, messageIndex) {
        var requestMessage = getPreviousChatUserMessage(messages, messageIndex);
        if (!requestMessage) {
            return null;
        }
        return {
            title: "Responding to " + getChatUserPromptBadgeLabel(requestMessage),
            scopeLabel: getChatMessageScopeLabel(requestMessage),
            detail: "Latest user turn",
            promptText: requestMessage.text || ""
        };
    }

    function getChatMessageThreadRole(messages, messageIndex) {
        if (!messages || typeof messageIndex !== "number" || !messages[messageIndex]) {
            return "";
        }
        var message = messages[messageIndex];
        if (message.isError) {
            return "";
        }
        if (message.role === "user") {
            var nextMessage = messages[messageIndex + 1];
            if (nextMessage && nextMessage.role === "assistant" && !nextMessage.isError) {
                return "request";
            }
        }
        if (message.role === "assistant") {
            var previousMessage = messages[messageIndex - 1];
            if (previousMessage && previousMessage.role === "user" && !previousMessage.isError) {
                return "response";
            }
        }
        return "";
    }

    function getChatMessageExchangeIndex(messages, messageIndex) {
        if (!messages || typeof messageIndex !== "number" || messageIndex < 0) {
            return 0;
        }
        var exchangeIndex = 0;
        for (var index = 0; index <= messageIndex; index++) {
            if (messages[index] && messages[index].role === "user" && !messages[index].isError) {
                exchangeIndex++;
            }
        }
        return exchangeIndex;
    }

    function getChatMessageExchangeLabel(messages, messageIndex) {
        var exchangeIndex = getChatMessageExchangeIndex(messages, messageIndex);
        return exchangeIndex ? ("Exchange " + exchangeIndex) : "";
    }

    function isCurrentChatExchange(messages, messageIndex) {
        var exchangeIndex = getChatMessageExchangeIndex(messages, messageIndex);
        var latestExchangeIndex = getChatExchangeCount(messages);
        return !!exchangeIndex && exchangeIndex === latestExchangeIndex;
    }

    function buildChatExchangeBannerData(messages, messageIndex) {
        if (!messages || typeof messageIndex !== "number" || !messages[messageIndex]) {
            return null;
        }
        var message = messages[messageIndex];
        if (message.isError || message.role !== "user" || getChatMessageThreadRole(messages, messageIndex) !== "request") {
            return null;
        }
        var nextMessage = messages[messageIndex + 1];
        var intentLabel = getChatMessageIntentLabel(message);
        return {
            title: (intentLabel === "Custom" ? "Custom" : intentLabel) + " exchange",
            exchangeLabel: getChatMessageExchangeLabel(messages, messageIndex),
            scopeLabel: getChatMessageScopeLabel(message),
            statusLabel: nextMessage && nextMessage.role === "assistant" && !nextMessage.isError ? "Reply linked" : "Waiting on reply",
            isCurrent: isCurrentChatExchange(messages, messageIndex)
        };
    }

    function buildChatExchangeOutcomeData(messages, messageIndex) {
        if (!messages || typeof messageIndex !== "number" || !messages[messageIndex]) {
            return null;
        }
        var message = messages[messageIndex];
        if (message.isError || message.role !== "assistant" || getChatMessageThreadRole(messages, messageIndex) !== "response") {
            return null;
        }
        var resolved = message.resolved || null;
        var operations = resolved && resolved.operations ? resolved.operations : [];
        var resultText = resolved ? getPrimaryResolvedText(resolved) : "";
        var recommendedActionId = getChatRecommendedActionId(message);
        var stepCount = operations.length ? operations.length : (resultText ? 1 : 0);
        var statusLabel = "Reply ready";
        if (operations.length) {
            statusLabel = "Ready to review";
        }
        else if (resultText) {
            statusLabel = "Draft ready";
        }
        return {
            title: "Exchange outcome",
            detail: (getChatMessageActionSummary(message) || {}).detail || getChatMessageStateDetail(message),
            exchangeLabel: getChatMessageExchangeLabel(messages, messageIndex),
            scopeLabel: getChatMessageScopeLabel(message),
            statusLabel: statusLabel,
            stepLabel: stepCount ? (stepCount + " step" + (stepCount === 1 ? "" : "s")) : "",
            actionLabel: getChatRecommendedActionLabel(recommendedActionId),
            isCurrent: isCurrentChatExchange(messages, messageIndex)
        };
    }

    function getChatContextWordCount(text) {
        var clean = normalizeText(text || "");
        return clean ? clean.split(/\s+/).length : 0;
    }

    function getChatContextParagraphCount(text) {
        var clean = normalizeText(text || "");
        return clean ? clean.split(/\n+/).filter(function (part) {
            return !!part;
        }).length : 0;
    }

    function getChatContextPreviewTitle(context) {
        return context && context.scope === "selection" ? "Selected passage" : "Document snapshot";
    }

    function getActiveChatPrompt(state, prompts) {
        var draft = normalizeText(state && state.draft ? state.draft : "");
        if (!draft || !prompts || !prompts.length) {
            return null;
        }
        for (var promptIndex = 0; promptIndex < prompts.length; promptIndex++) {
            var prompt = prompts[promptIndex];
            if (prompt && normalizeText(prompt.prompt || "") === draft) {
                return prompt;
            }
        }
        return null;
    }

    function getChatStatusTone(state) {
        if (state && state.busy) {
            return "busy";
        }
        var statusText = normalizeText(state && state.status ? state.status : "").toLowerCase();
        if (!statusText) {
            return "idle";
        }
        if (/could not|issue|error|select text first/.test(statusText)) {
            return "error";
        }
        if (/started|loaded|ready|will use|copied|previewed|applied/.test(statusText)) {
            return "ready";
        }
        return "idle";
    }

    function buildChatComposerStatusText(state, context, activePrompt) {
        if (state && state.busy) {
            return "Thinking through the current " + (context && context.scope === "selection" ? "selection" : "document") + "...";
        }
        if (state && state.status) {
            return state.status;
        }
        var scopeLabel = context && context.scope === "selection" ? "selection" : "document";
        if (activePrompt && activePrompt.label) {
            return "Ready to run the " + activePrompt.label + " starter on the current " + scopeLabel + ".";
        }
        return "Ready to ask about the current " + scopeLabel + ".";
    }

    function getLatestChatMessage(state) {
        if (!state || !state.messages || !state.messages.length) {
            return null;
        }
        return state.messages[state.messages.length - 1] || null;
    }

    function getChatExchangeCount(messages) {
        if (!messages || !messages.length) {
            return 0;
        }
        var exchangeCount = 0;
        for (var index = 0; index < messages.length; index++) {
            if (messages[index] && messages[index].role === "user" && !messages[index].isError) {
                exchangeCount++;
            }
        }
        return exchangeCount;
    }

    function getChatConversationSummaryTitle(state) {
        var latestMessage = getLatestChatMessage(state);
        if (!latestMessage) {
            return "";
        }
        if (state && state.busy) {
            return "Working on your latest request";
        }
        if (latestMessage.isError) {
            return "Latest reply needs attention";
        }
        if (latestMessage.role === "assistant") {
            var resolved = latestMessage.resolved || null;
            var operations = resolved && resolved.operations ? resolved.operations : [];
            var resultText = resolved ? getPrimaryResolvedText(resolved) : "";
            if (operations.length) {
                return "Latest review exchange is ready";
            }
            if (resultText) {
                return "Latest draft exchange is ready";
            }
            return "Latest reply is ready";
        }
        return "Prompt sent to AI";
    }

    function getChatConversationSummaryDetail(state, context) {
        var latestMessage = getLatestChatMessage(state);
        if (!latestMessage) {
            return "";
        }
        var scopeLabel = context && context.scope === "selection" ? "selection" : "document";
        var messageCount = state && state.messages ? state.messages.length : 0;
        var exchangeCount = getChatExchangeCount(state && state.messages ? state.messages : []);
        var threadLead = exchangeCount
            ? (exchangeCount + " exchange" + (exchangeCount === 1 ? "" : "s") + ", " + messageCount + " message" + (messageCount === 1 ? "" : "s"))
            : (messageCount + " message" + (messageCount === 1 ? "" : "s"));
        if (state && state.busy) {
            return threadLead + " in this " + scopeLabel + " thread. The assistant is preparing the next reply.";
        }
        if (latestMessage.isError) {
            return threadLead + " in this " + scopeLabel + " thread. Adjust the prompt or try again.";
        }
        if (latestMessage.role === "assistant") {
            var resolved = latestMessage.resolved || null;
            var operations = resolved && resolved.operations ? resolved.operations : [];
            var resultText = resolved ? getPrimaryResolvedText(resolved) : "";
            if (operations.length) {
                return threadLead + " in this " + scopeLabel + " thread. Use preview, replace, or insert on the latest assistant change.";
            }
            if (resultText) {
                return threadLead + " in this " + scopeLabel + " thread. The latest assistant draft is ready to reuse.";
            }
        }
        return threadLead + " in this " + scopeLabel + " thread.";
    }

    function getChatConversationSummaryStatus(state) {
        var latestMessage = getLatestChatMessage(state);
        if (!latestMessage) {
            return "";
        }
        if (state && state.busy) {
            return "Working";
        }
        if (latestMessage.isError) {
            return "Needs attention";
        }
        if (latestMessage.role === "assistant") {
            var resolved = latestMessage.resolved || null;
            var operations = resolved && resolved.operations ? resolved.operations : [];
            if (operations.length) {
                return "Ready to review";
            }
        }
        return "Conversation live";
    }

    function getChatHeaderStatusLabel(state) {
        var tone = getChatStatusTone(state);
        if (tone === "busy") {
            return "Working";
        }
        if (tone === "error") {
            return "Needs attention";
        }
        return "Ready";
    }

    function getChatHeaderSummaryText(state, context, activePrompt) {
        var scopeLabel = context && context.scope === "selection" ? "selection" : "document";
        var messageCount = state && state.messages ? state.messages.length : 0;
        var exchangeCount = getChatExchangeCount(state && state.messages ? state.messages : []);
        var threadLead = exchangeCount
            ? (exchangeCount + " exchange" + (exchangeCount === 1 ? "" : "s") + ", " + messageCount + " message" + (messageCount === 1 ? "" : "s"))
            : (messageCount + " message" + (messageCount === 1 ? "" : "s"));
        if (state && state.busy) {
            if (messageCount) {
                return threadLead + " in this conversation for the current " + scopeLabel + ". Preparing the next reply.";
            }
            return "Preparing help for the current " + scopeLabel + ".";
        }
        if (activePrompt && activePrompt.label) {
            return activePrompt.label + " starter is loaded for the current " + scopeLabel + ".";
        }
        if (messageCount) {
            return threadLead + " in this conversation for the current " + scopeLabel + ". " + getChatConversationSummaryTitle(state) + ".";
        }
        return "Ask, rewrite, or review the current " + scopeLabel + " in place.";
    }

    function renderChatPanel(focusComposer) {
        var shell = getEditorShell();
        if (!shell) {
            return false;
        }

        var state = getChatState();
        var context = resolveChatScope();
        var prompts = config.aiToolkitChatPrompts || [];
        var activePrompt = getActiveChatPrompt(state, prompts);

        closeChatPanel();
        editor.__aiChatOriginalMinHeight = shell.style ? (shell.style.minHeight || "") : "";
        shell.classList.add("rte-ai-chat-host");
        if (shell.style) {
            var desiredHeight = window.innerWidth <= 900 ? 560 : 660;
            shell.style.minHeight = Math.max(shell.offsetHeight || 0, desiredHeight) + "px";
        }
        editor.__aiChatShell = shell;

        var panel = append(shell, "div", "", "rte-ai-chat-panel");
        panel.setAttribute("role", "complementary");
        panel.setAttribute("aria-label", config.text_aichat || "AI Chat");
        panel.tabIndex = -1;
        editor.__aiChatPanel = panel;
        panel.onkeydown = function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                closeChatPanel();
                editor.focus();
            }
        };

        var header = append(panel, "div", "", "rte-ai-chat-header");
        var headerCopy = append(header, "div", "", "rte-ai-chat-header-copy");
        var headerEyebrow = append(headerCopy, "div", "", "rte-ai-chat-header-eyebrow");
        append(headerEyebrow, "span", "", "rte-ai-chat-header-kicker", "Assistant workspace");
        append(headerEyebrow, "span", "", "rte-ai-chat-header-status is-status", getChatHeaderStatusLabel(state));
        append(headerEyebrow, "span", "", "rte-ai-chat-header-status is-scope", context.scope === "selection" ? "Selection focus" : "Document focus");
        var titleRow = append(headerCopy, "div", "", "rte-ai-chat-title-row");
        var titleIcon = append(titleRow, "span", "", "rte-ai-chat-title-icon");
        titleIcon.innerHTML = config.svgCode_aiassist_chat || config.svgCode_aiassist || "";
        append(titleRow, "div", "", "rte-ai-chat-title", config.text_aichat || "AI Chat");
        append(headerCopy, "div", "", "rte-ai-chat-subtitle", getChatHeaderSummaryText(state, context, activePrompt));
        var headerMeta = append(headerCopy, "div", "", "rte-ai-chat-header-meta");
        append(headerMeta, "span", "", "rte-ai-chat-header-meta-pill is-exchanges", getChatExchangeCount(state.messages) + " exchange" + (getChatExchangeCount(state.messages) === 1 ? "" : "s"));
        append(headerMeta, "span", "", "rte-ai-chat-header-meta-pill is-messages", (state.messages && state.messages.length ? state.messages.length : 0) + " message" + (state.messages && state.messages.length === 1 ? "" : "s"));
        append(headerMeta, "span", "", "rte-ai-chat-header-meta-pill is-words", getChatContextWordCount(context.source) + " words");
        append(headerMeta, "span", "", "rte-ai-chat-header-meta-pill is-prompt", activePrompt && activePrompt.label ? activePrompt.label + " starter" : (normalizeText(state.draft || "") ? "Custom draft" : "Ready for a new ask"));
        var headerActions = append(header, "div", "", "rte-ai-chat-header-actions");
        var clearButton = append(headerActions, "button", "", "secondary rte-ai-chat-header-button", "New chat");
        clearButton.type = "button";
        clearButton.onclick = function () {
            state.messages = [];
            state.status = "Started a fresh AI chat.";
            renderChatPanel(true);
        };
        var closeButton = append(headerActions, "button", "", "rte-ai-panel-close-button");
        closeButton.type = "button";
        closeButton.setAttribute("aria-label", "Close AI chat");
        closeButton.title = "Close";
        closeButton.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>';
        closeButton.onclick = function () {
            closeChatPanel();
        };

        var contextSection = append(panel, "div", "", "rte-ai-chat-stack rte-ai-chat-context-shell");
        appendPanelSectionLabel(contextSection, "rte-ai-chat-section-label is-context", "Context");
        var contextBar = append(contextSection, "div", "", "rte-ai-chat-context-bar");
        var selectionButton = append(contextBar, "button", "", "rte-ai-chat-scope-button" + (state.scope === "selection" ? " is-active" : ""), "Use selection");
        selectionButton.type = "button";
        selectionButton.disabled = !context.snapshot.hasSelection;
        selectionButton.onclick = function () {
            state.scope = "selection";
            state.status = context.snapshot.hasSelection ? "Chat will use the current selection." : "Select text first to use selection scope.";
            renderChatPanel(true);
        };
        var documentButton = append(contextBar, "button", "", "rte-ai-chat-scope-button" + (state.scope !== "selection" ? " is-active" : ""), "Use document");
        documentButton.type = "button";
        documentButton.onclick = function () {
            state.scope = "document";
            state.status = "Chat will use the whole document.";
            renderChatPanel(true);
        };
        append(contextBar, "span", "", "rte-ai-chat-context-pill", context.scope === "selection" ? "Selection" : "Document");

        var contextPreview = append(contextSection, "div", "", "rte-ai-chat-context-preview is-" + context.scope);
        var contextPreviewHeader = append(contextPreview, "div", "", "rte-ai-chat-context-preview-header");
        append(contextPreviewHeader, "span", "", "rte-ai-chat-context-preview-title", getChatContextPreviewTitle(context));
        var contextPreviewMeta = append(contextPreviewHeader, "div", "", "rte-ai-chat-context-preview-meta");
        var contextWordCount = getChatContextWordCount(context.source);
        var contextParagraphCount = getChatContextParagraphCount(context.source);
        append(contextPreviewMeta, "span", "", "rte-ai-chat-context-preview-pill is-words", contextWordCount + " words");
        append(contextPreviewMeta, "span", "", "rte-ai-chat-context-preview-pill is-chars", normalizeText(context.source || "").length + " chars");
        if (contextParagraphCount > 1) {
            append(contextPreviewMeta, "span", "", "rte-ai-chat-context-preview-pill is-paragraphs", contextParagraphCount + " paragraphs");
        }
        append(contextPreview, "div", "", "rte-ai-chat-context-preview-copy", context.summary);

        var quickSection = append(panel, "div", "", "rte-ai-chat-stack rte-ai-chat-quick-shell");
        appendPanelSectionLabel(quickSection, "rte-ai-chat-section-label is-quick", "Quick starts");
        var quickRow = append(quickSection, "div", "", "rte-ai-chat-quick-row");
        for (var p = 0; p < prompts.length; p++) {
            (function (prompt) {
                var isActivePrompt = !!(state.draft && prompt.prompt && normalizeText(state.draft) === normalizeText(prompt.prompt));
                var quickButton = append(quickRow, "button", "", "rte-ai-chat-quick-button" + (isActivePrompt ? " is-active" : ""));
                quickButton.setAttribute("data-rte-ai-chat-prompt-tone", getChatPromptToneClass(prompt));
                append(quickButton, "span", "", "rte-ai-chat-quick-eyebrow", getChatPromptIntentLabel(prompt));
                append(quickButton, "span", "", "rte-ai-chat-quick-title", prompt.label || prompt.id || "Prompt");
                append(quickButton, "span", "", "rte-ai-chat-quick-copy", summarizeChatPromptCopy(prompt.prompt || ""));
                quickButton.type = "button";
                quickButton.title = prompt.prompt || "";
                quickButton.setAttribute("aria-label", (prompt.label || prompt.id || "Prompt") + ". " + summarizeChatPromptCopy(prompt.prompt || ""));
                quickButton.onclick = function () {
                    state.draft = prompt.prompt || "";
                    state.status = "Loaded the " + (prompt.label || prompt.id || "starter prompt") + " quick start.";
                    renderChatPanel(true);
                };
            })(prompts[p]);
        }

        var feedSection = append(panel, "div", "", "rte-ai-chat-stack rte-ai-chat-feed-shell");
        appendPanelSectionLabel(feedSection, "rte-ai-chat-section-label is-feed", "Conversation");
        var feed = append(feedSection, "div", "", "rte-ai-chat-feed");
        if (!state.messages.length) {
            var emptyState = append(feed, "div", "", "rte-ai-chat-empty");
            var emptyHero = append(emptyState, "div", "", "rte-ai-chat-empty-hero");
            append(emptyHero, "div", "", "rte-ai-chat-empty-title", "Start with AI Chat");
            append(emptyHero, "div", "", "rte-ai-chat-empty-detail", context.scope === "selection"
                ? "Use the selected passage as the active source, ask a question, or prepare reviewable edits before you accept anything."
                : "Use the current document as context, ask for guidance, or prepare reviewable edits before they touch the page.");
            var emptyMeta = append(emptyHero, "div", "", "rte-ai-chat-empty-meta");
            append(emptyMeta, "span", "", "rte-ai-chat-empty-pill is-scope", context.scope === "selection" ? "Selection context" : "Document context");
            append(emptyMeta, "span", "", "rte-ai-chat-empty-pill is-prompts", prompts.length + " starters");
            append(emptyMeta, "span", "", "rte-ai-chat-empty-pill is-size", getChatContextWordCount(context.source) + " words in scope");

            var emptyCapabilities = append(emptyState, "div", "", "rte-ai-chat-empty-capabilities");
            var answerCard = append(emptyCapabilities, "div", "", "rte-ai-chat-empty-capability");
            append(answerCard, "div", "", "rte-ai-chat-empty-capability-title", "Ask and explore");
            append(answerCard, "div", "", "rte-ai-chat-empty-capability-copy", "Get answers, summaries, headings, or rewrite direction grounded in the current context.");
            var reviewCard = append(emptyCapabilities, "div", "", "rte-ai-chat-empty-capability");
            append(reviewCard, "div", "", "rte-ai-chat-empty-capability-title", "Prepare reviewable edits");
            append(reviewCard, "div", "", "rte-ai-chat-empty-capability-copy", "Preview inline changes, apply structured plans, or turn responses into review-ready suggestions.");
            var composeCard = append(emptyCapabilities, "div", "", "rte-ai-chat-empty-capability");
            append(composeCard, "div", "", "rte-ai-chat-empty-capability-title", "Use starters or type your own");
            append(composeCard, "div", "", "rte-ai-chat-empty-capability-copy", "Choose one of the curated quick starts above or write a custom prompt in the composer below.");
        }
        var activeExchangeGroup = null;
        var activeExchangeIndex = 0;
        for (var i = 0; i < state.messages.length; i++) {
            if (i === 0) {
                var feedSummary = append(feed, "div", "", "rte-ai-chat-feed-summary");
                append(feedSummary, "div", "", "rte-ai-chat-feed-summary-title", getChatConversationSummaryTitle(state));
                append(feedSummary, "div", "", "rte-ai-chat-feed-summary-detail", getChatConversationSummaryDetail(state, context));
                var feedSummaryMeta = append(feedSummary, "div", "", "rte-ai-chat-feed-summary-meta");
                append(feedSummaryMeta, "span", "", "rte-ai-chat-feed-summary-pill is-status", getChatConversationSummaryStatus(state));
                append(feedSummaryMeta, "span", "", "rte-ai-chat-feed-summary-pill is-scope", context.scope === "selection" ? "Selection thread" : "Document thread");
                append(feedSummaryMeta, "span", "", "rte-ai-chat-feed-summary-pill is-exchanges", getChatExchangeCount(state.messages) + " exchange" + (getChatExchangeCount(state.messages) === 1 ? "" : "s"));
                append(feedSummaryMeta, "span", "", "rte-ai-chat-feed-summary-pill is-count", state.messages.length + " message" + (state.messages.length === 1 ? "" : "s"));
            }
            (function (message, messageIndex) {
                var threadRole = getChatMessageThreadRole(state.messages, messageIndex);
                var currentExchangeIndex = getChatMessageExchangeIndex(state.messages, messageIndex);
                var exchangeLabel = getChatMessageExchangeLabel(state.messages, messageIndex);
                var currentExchange = isCurrentChatExchange(state.messages, messageIndex);
                var exchangeContainer = feed;
                if (threadRole === "request") {
                    activeExchangeGroup = append(feed, "div", "", "rte-ai-chat-exchange-group");
                    if (exchangeLabel) {
                        activeExchangeGroup.setAttribute("data-rte-ai-chat-exchange-index", exchangeLabel);
                    }
                    if (currentExchange) {
                        activeExchangeGroup.setAttribute("data-rte-ai-chat-current-exchange", "true");
                    }
                    activeExchangeIndex = currentExchangeIndex;
                    exchangeContainer = activeExchangeGroup;
                }
                else if (threadRole === "response" && activeExchangeGroup && activeExchangeIndex === currentExchangeIndex) {
                    exchangeContainer = activeExchangeGroup;
                }
                else {
                    activeExchangeGroup = null;
                    activeExchangeIndex = 0;
                }
                var exchangeBannerData = buildChatExchangeBannerData(state.messages, messageIndex);
                if (exchangeBannerData) {
                    var exchangeBanner = append(exchangeContainer, "div", "", "rte-ai-chat-exchange-banner");
                    if (exchangeBannerData.exchangeLabel) {
                        exchangeBanner.setAttribute("data-rte-ai-chat-exchange-index", exchangeBannerData.exchangeLabel);
                    }
                    if (exchangeBannerData.isCurrent) {
                        exchangeBanner.setAttribute("data-rte-ai-chat-current-exchange", "true");
                    }
                    append(exchangeBanner, "div", "", "rte-ai-chat-exchange-title", exchangeBannerData.title);
                    var exchangeMeta = append(exchangeBanner, "div", "", "rte-ai-chat-exchange-meta");
                    if (exchangeBannerData.exchangeLabel) {
                        append(exchangeMeta, "span", "", "rte-ai-chat-exchange-pill is-exchange", exchangeBannerData.exchangeLabel);
                    }
                    append(exchangeMeta, "span", "", "rte-ai-chat-exchange-pill is-scope", exchangeBannerData.scopeLabel);
                    append(exchangeMeta, "span", "", "rte-ai-chat-exchange-pill is-status", exchangeBannerData.statusLabel);
                    if (exchangeBannerData.isCurrent) {
                        append(exchangeMeta, "span", "", "rte-ai-chat-exchange-pill is-current", "Current exchange");
                    }
                }
                var item = append(exchangeContainer, "div", "", "rte-ai-chat-message is-" + message.role + (message.isError ? " is-error" : ""));
                if (threadRole) {
                    item.setAttribute("data-rte-ai-chat-thread-role", threadRole);
                    item.setAttribute("data-rte-ai-chat-exchange-index", String(currentExchangeIndex));
                    if (currentExchange) {
                        item.setAttribute("data-rte-ai-chat-current-exchange", "true");
                    }
                }
                var messageHeader = append(item, "div", "", "rte-ai-chat-message-header");
                var messageHeaderRow = append(messageHeader, "div", "", "rte-ai-chat-message-role-row");
                append(messageHeaderRow, "span", "", "rte-ai-chat-message-role is-" + (message.isError ? "error" : message.role), getChatMessageRoleLabel(message));
                append(messageHeaderRow, "span", "", "rte-ai-chat-message-pill is-scope", getChatMessageScopeLabel(message));
                append(messageHeaderRow, "span", "", "rte-ai-chat-message-pill is-type", getChatMessageTypeLabel(message));
                append(messageHeaderRow, "span", "", "rte-ai-chat-message-pill is-turn", "Turn " + (messageIndex + 1));
                var meta = append(messageHeader, "div", "", "rte-ai-chat-message-meta", buildChatMessageSupportingCopy(message));
                meta.setAttribute("aria-hidden", "true");
                var stateCard = append(item, "div", "", "rte-ai-chat-message-state is-" + (message.isError ? "error" : message.role));
                append(stateCard, "div", "", "rte-ai-chat-message-state-kicker", message.isError ? "Conversation issue" : (message.role === "user" ? "User prompt" : "Assistant response"));
                append(stateCard, "div", "", "rte-ai-chat-message-state-title", getChatMessageStateTitle(message));
                append(stateCard, "div", "", "rte-ai-chat-message-state-detail", getChatMessageStateDetail(message));
                if (message.role === "user" && !message.isError) {
                    var promptCard = append(item, "div", "", "rte-ai-chat-message-prompt-card");
                    var promptHeader = append(promptCard, "div", "", "rte-ai-chat-message-prompt-header");
                    append(promptHeader, "div", "", "rte-ai-chat-message-prompt-title", "What you asked");
                    append(promptHeader, "span", "", "rte-ai-chat-message-prompt-pill", getChatUserPromptBadgeLabel(message));
                    var promptExchangeLabel = getChatMessageExchangeLabel(state.messages, messageIndex);
                    if (promptExchangeLabel) {
                        append(promptHeader, "span", "", "rte-ai-chat-message-prompt-pill is-exchange", promptExchangeLabel);
                    }
                    append(promptCard, "div", "", "rte-ai-chat-message-prompt-body", message.text || "");
                }
                else {
                    append(item, "div", "", "rte-ai-chat-message-text", message.text || "");
                }
                if (message.role === "user" && !message.isError) {
                    var contextCardData = buildChatMessageContextCardData(message);
                    if (contextCardData) {
                        var contextCard = append(item, "div", "", "rte-ai-chat-message-context-card is-user");
                        var contextHeader = append(contextCard, "div", "", "rte-ai-chat-message-context-header");
                        append(contextHeader, "div", "", "rte-ai-chat-message-context-title", contextCardData.title);
                        var contextMeta = append(contextHeader, "div", "", "rte-ai-chat-message-context-meta");
                        append(contextMeta, "span", "", "rte-ai-chat-message-context-pill is-scope", contextCardData.scopeLabel);
                        append(contextMeta, "span", "", "rte-ai-chat-message-context-pill is-words", contextCardData.wordLabel);
                        if (contextCardData.paragraphLabel) {
                            append(contextMeta, "span", "", "rte-ai-chat-message-context-pill is-paragraphs", contextCardData.paragraphLabel);
                        }
                        append(contextCard, "div", "", "rte-ai-chat-message-context-copy", contextCardData.copy);
                    }
                }
                if (message.role === "assistant" && !message.isError) {
                    var requestCardData = buildChatAssistantRequestCardData(state.messages, messageIndex);
                    if (requestCardData) {
                        var requestCard = append(item, "div", "", "rte-ai-chat-message-request-card");
                        var requestHeader = append(requestCard, "div", "", "rte-ai-chat-message-request-header");
                        append(requestHeader, "div", "", "rte-ai-chat-message-request-title", requestCardData.title);
                        var requestMeta = append(requestHeader, "div", "", "rte-ai-chat-message-request-meta");
                        append(requestMeta, "span", "", "rte-ai-chat-message-request-pill is-scope", requestCardData.scopeLabel);
                        append(requestMeta, "span", "", "rte-ai-chat-message-request-pill is-detail", requestCardData.detail);
                        var requestExchangeLabel = getChatMessageExchangeLabel(state.messages, messageIndex);
                        if (requestExchangeLabel) {
                            append(requestMeta, "span", "", "rte-ai-chat-message-request-pill is-exchange", requestExchangeLabel);
                        }
                        append(requestCard, "div", "", "rte-ai-chat-message-request-body", requestCardData.promptText);
                    }
                }

                if (message.role === "assistant" && message.resolved) {
                    var resolvedPreview = buildChatResolvedPreviewData(message);
                    if (resolvedPreview) {
                        var previewCard = append(item, "div", "", "rte-ai-chat-message-preview");
                        var previewHeader = append(previewCard, "div", "", "rte-ai-chat-message-preview-header");
                        append(previewHeader, "div", "", "rte-ai-chat-message-preview-title", resolvedPreview.title);
                        var previewMeta = append(previewCard, "div", "", "rte-ai-chat-message-preview-meta");
                        append(previewMeta, "span", "", "rte-ai-chat-message-preview-pill is-status", resolvedPreview.statusLabel);
                        append(previewMeta, "span", "", "rte-ai-chat-message-preview-pill is-scope", resolvedPreview.scopeLabel);
                        append(previewMeta, "span", "", "rte-ai-chat-message-preview-pill is-steps", resolvedPreview.stepLabel);
                        append(previewMeta, "span", "", "rte-ai-chat-message-preview-pill is-target", resolvedPreview.targetLabel);
                        var previewCompare = append(previewCard, "div", "", "rte-ai-chat-message-preview-compare");
                        var previewCompareHeader = append(previewCompare, "div", "", "rte-ai-chat-message-preview-compare-header");
                        append(previewCompareHeader, "div", "", "rte-ai-chat-message-preview-compare-title", "Proposed edit");
                        append(previewCompareHeader, "div", "", "rte-ai-chat-message-preview-compare-detail", "Current and suggested text");
                        if (resolvedPreview.sourceText && resolvedPreview.sourceText !== resolvedPreview.resultText) {
                            appendCompletionPreviewLine(previewCompare, "current", resolvedPreview.sourceText, resolvedPreview.diffParts);
                        }
                        appendCompletionPreviewLine(previewCompare, "result", resolvedPreview.resultText, resolvedPreview.diffParts);
                        if (resolvedPreview.reasonText) {
                            var previewReason = append(previewCard, "div", "", "rte-ai-chat-message-preview-reason-card");
                            append(previewReason, "div", "", "rte-ai-chat-message-preview-reason-label", "Why this change");
                            append(previewReason, "div", "", "rte-ai-chat-message-preview-reason", resolvedPreview.reasonText);
                        }
                        if (resolvedPreview.planItems && resolvedPreview.planItems.length) {
                            var previewPlan = append(previewCard, "div", "", "rte-ai-chat-message-preview-plan");
                            append(previewPlan, "div", "", "rte-ai-chat-message-preview-plan-title", "What happens next");
                            var previewPlanItems = append(previewPlan, "div", "", "rte-ai-chat-message-preview-plan-items");
                            for (var planIndex = 0; planIndex < resolvedPreview.planItems.length; planIndex++) {
                                append(previewPlanItems, "span", "", "rte-ai-chat-message-preview-plan-item", resolvedPreview.planItems[planIndex]);
                            }
                            if (resolvedPreview.hiddenPlanCount) {
                                append(previewPlanItems, "span", "", "rte-ai-chat-message-preview-plan-item is-more", "+" + resolvedPreview.hiddenPlanCount + " more");
                            }
                        }
                    }
                    var actions = append(item, "div", "", "rte-ai-chat-message-actions");
                    var actionSummary = getChatMessageActionSummary(message);
                    if (actionSummary) {
                        var actionSummaryNode = append(actions, "div", "", "rte-ai-chat-message-action-summary");
                        append(actionSummaryNode, "div", "", "rte-ai-chat-message-action-summary-title", actionSummary.title);
                        append(actionSummaryNode, "div", "", "rte-ai-chat-message-action-summary-detail", actionSummary.detail);
                    }
                    var recommendedActionId = getChatRecommendedActionId(message);
                    var utilityActions = append(actions, "div", "", "rte-ai-chat-message-action-group is-utility");
                    var primaryActions = append(actions, "div", "", "rte-ai-chat-message-action-group is-primary");
                    var secondaryActions = append(actions, "div", "", "rte-ai-chat-message-action-group is-secondary");
                    var operations = message.resolved.operations || [];
                    var resultText = getPrimaryResolvedText(message.resolved);
                    var markRecommendedChatAction = function (button, actionId) {
                        if (!button || !actionId || actionId !== recommendedActionId) {
                            return;
                        }
                        button.className += " is-recommended";
                        button.setAttribute("data-rte-ai-chat-recommended", "true");
                        var baseLabel = button.getAttribute("aria-label") || button.innerText || "";
                        button.setAttribute("aria-label", (baseLabel ? baseLabel + ". " : "") + "Recommended next step.");
                        button.title = ((button.innerText || "").trim() || "Action") + " - Recommended next step";
                    };
                    var copyButton = append(utilityActions, "button", "", "secondary rte-ai-chat-action-button is-copy", "Copy text");
                    copyButton.type = "button";
                    copyButton.setAttribute("data-rte-ai-chat-action", "copy");
                    copyButton.setAttribute("aria-label", "Copy this AI response");
                    copyButton.onclick = function () {
                        copyChatMessageText(message);
                    };

                    if (operations.length) {
                        var planButton = append(primaryActions, "button", "", "secondary rte-ai-chat-action-button is-apply", "Apply");
                        planButton.type = "button";
                        planButton.setAttribute("data-rte-ai-chat-action", "apply");
                        planButton.onclick = function () {
                            applyChatMessage(message, "plan");
                        };
                        markRecommendedChatAction(planButton, "apply");
                    }
                    if (resultText && message.snapshot && message.snapshot.hasSelection) {
                        var previewButton = append(primaryActions, "button", "", "secondary rte-ai-chat-action-button is-preview", "Preview inline");
                        previewButton.type = "button";
                        previewButton.setAttribute("data-rte-ai-chat-action", "preview");
                        previewButton.onclick = function () {
                            applyChatMessage(message, "preview");
                        };
                        markRecommendedChatAction(previewButton, "preview");

                        var replaceSelectionButton = append(primaryActions, "button", "", "secondary rte-ai-chat-action-button is-selection", "Replace selection");
                        replaceSelectionButton.type = "button";
                        replaceSelectionButton.setAttribute("data-rte-ai-chat-action", "selection");
                        replaceSelectionButton.onclick = function () {
                            applyChatMessage(message, "selection");
                        };
                        markRecommendedChatAction(replaceSelectionButton, "selection");
                    }
                    if (resultText) {
                        var insertButton = append(secondaryActions, "button", "", "secondary rte-ai-chat-action-button is-insert", "Insert below");
                        insertButton.type = "button";
                        insertButton.setAttribute("data-rte-ai-chat-action", "insert");
                        insertButton.onclick = function () {
                            applyChatMessage(message, "insert");
                        };
                        markRecommendedChatAction(insertButton, "insert");

                        if (!message.snapshot || !message.snapshot.hasSelection) {
                            var replaceDocumentButton = append(secondaryActions, "button", "", "secondary rte-ai-chat-action-button is-document", "Replace document");
                            replaceDocumentButton.type = "button";
                            replaceDocumentButton.setAttribute("data-rte-ai-chat-action", "document");
                            replaceDocumentButton.onclick = function () {
                                applyChatMessage(message, "document");
                            };
                            markRecommendedChatAction(replaceDocumentButton, "document");
                        }
                    }
                    appendChatActionGroupHeader(utilityActions, getChatActionGroupInfo("utility", recommendedActionId), "utility");
                    appendChatActionGroupHeader(primaryActions, getChatActionGroupInfo("primary", recommendedActionId), "primary");
                    appendChatActionGroupHeader(secondaryActions, getChatActionGroupInfo("secondary", recommendedActionId), "secondary");
                }
                if (message.role === "assistant" && !message.isError) {
                    var exchangeOutcomeData = buildChatExchangeOutcomeData(state.messages, messageIndex);
                    if (exchangeOutcomeData && exchangeContainer !== feed) {
                        var exchangeOutcome = append(exchangeContainer, "div", "", "rte-ai-chat-exchange-outcome");
                        if (exchangeOutcomeData.exchangeLabel) {
                            exchangeOutcome.setAttribute("data-rte-ai-chat-exchange-index", exchangeOutcomeData.exchangeLabel);
                        }
                        if (exchangeOutcomeData.isCurrent) {
                            exchangeOutcome.setAttribute("data-rte-ai-chat-current-exchange", "true");
                        }
                        append(exchangeOutcome, "div", "", "rte-ai-chat-exchange-outcome-title", exchangeOutcomeData.title);
                        var exchangeOutcomeMeta = append(exchangeOutcome, "div", "", "rte-ai-chat-exchange-outcome-meta");
                        append(exchangeOutcomeMeta, "span", "", "rte-ai-chat-exchange-outcome-pill is-status", exchangeOutcomeData.statusLabel);
                        append(exchangeOutcomeMeta, "span", "", "rte-ai-chat-exchange-outcome-pill is-scope", exchangeOutcomeData.scopeLabel);
                        if (exchangeOutcomeData.stepLabel) {
                            append(exchangeOutcomeMeta, "span", "", "rte-ai-chat-exchange-outcome-pill is-steps", exchangeOutcomeData.stepLabel);
                        }
                        if (exchangeOutcomeData.actionLabel) {
                            append(exchangeOutcomeMeta, "span", "", "rte-ai-chat-exchange-outcome-pill is-action", exchangeOutcomeData.actionLabel);
                        }
                        if (exchangeOutcomeData.isCurrent) {
                            append(exchangeOutcomeMeta, "span", "", "rte-ai-chat-exchange-outcome-pill is-current", "Current exchange");
                        }
                        append(exchangeOutcome, "div", "", "rte-ai-chat-exchange-outcome-detail", exchangeOutcomeData.detail);
                    }
                }
            })(state.messages[i], i);
        }

        var composerSection = append(panel, "div", "", "rte-ai-chat-stack rte-ai-chat-compose-shell");
        appendPanelSectionLabel(composerSection, "rte-ai-chat-section-label is-compose", "Compose");
        var composer = append(composerSection, "div", "", "rte-ai-chat-composer");
        var composerArea = append(composer, "textarea", "", "rte-ai-chat-input");
        composerArea.placeholder = "Ask AI to rewrite, translate, summarize, explain, or improve the current content.";
        composerArea.value = state.draft || "";
        composerArea.disabled = !!state.busy;
        composerArea.oninput = function () {
            state.draft = composerArea.value;
        };
        composerArea.onkeydown = function (e) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                runChatPrompt(composerArea.value);
            }
        };

        var activePrompt = getActiveChatPrompt(state, prompts);
        var composerMeta = append(composer, "div", "", "rte-ai-chat-composer-meta");
        append(composerMeta, "span", "", "rte-ai-chat-composer-pill is-scope", context.scope === "selection" ? "Selection context" : "Document context");
        append(composerMeta, "span", "", "rte-ai-chat-composer-pill is-send", "Enter sends");
        if (activePrompt) {
            append(composerMeta, "span", "", "rte-ai-chat-composer-pill is-starter", "Starter: " + (activePrompt.label || activePrompt.id || "Prompt"));
        }
        else if (normalizeText(state.draft || "")) {
            append(composerMeta, "span", "", "rte-ai-chat-composer-pill is-custom", "Custom prompt");
        }
        append(composerMeta, "span", "", "rte-ai-chat-composer-pill is-count", String(normalizeText(state.draft || "").length) + " chars");

        var composerActions = append(composer, "div", "", "rte-ai-chat-composer-actions");
        var askAiButton = append(composerActions, "button", "", "secondary rte-ai-chat-action-button is-open-dialog", "Open Ask AI");
        askAiButton.type = "button";
        askAiButton.setAttribute("data-rte-ai-chat-action", "open-dialog");
        askAiButton.onclick = function () {
            openDialog({
                useDocument: state.scope !== "selection",
                presetMode: "rewrite"
            });
        };
        var sendButton = append(composerActions, "button", "", "rte-ai-chat-send-button", state.busy ? "Thinking..." : "Send");
        sendButton.type = "button";
        sendButton.setAttribute("data-rte-ai-chat-action", "send");
        sendButton.disabled = !!state.busy;
        sendButton.onclick = function () {
            runChatPrompt(composerArea.value);
        };

        var statusTone = getChatStatusTone(state);
        var status = append(composerSection, "div", "", "rte-ai-chat-status is-" + statusTone);
        append(status, "span", "", "rte-ai-chat-status-pill is-" + statusTone, statusTone === "busy" ? "Working" : (statusTone === "error" ? "Needs attention" : (statusTone === "ready" ? "Ready" : "Compose")));
        append(status, "span", "", "rte-ai-chat-status-text", buildChatComposerStatusText(state, context, activePrompt));

        if (focusComposer) {
            setTimeout(function () {
                if (composerArea && composerArea.focus) {
                    composerArea.focus();
                    try {
                        composerArea.selectionStart = composerArea.selectionEnd = composerArea.value.length;
                    }
                    catch (ignore) {
                    }
                }
            }, 0);
        }

        if (feed && typeof feed.scrollTop !== "undefined") {
            feed.scrollTop = feed.scrollHeight;
        }
        return true;
    }

    function getSuggestionCounts() {
        var counts = {
            total: 0,
            pending: 0,
            accepted: 0,
            rejected: 0,
            stale: 0
        };
        var suggestions = getSuggestionStore();
        for (var i = 0; i < suggestions.length; i++) {
            counts.total++;
            if (counts.hasOwnProperty(suggestions[i].status)) {
                counts[suggestions[i].status]++;
            }
        }
        return counts;
    }

    function matchesReviewTypeFilter(suggestion, typeFilter) {
        if (!typeFilter || typeFilter === "all") {
            return true;
        }
        return getSuggestionTypeValue(suggestion && suggestion.suggestionType || "") === typeFilter;
    }

    function getReviewTypeOptions(suggestions) {
        var map = { all: "All types" };
        for (var i = 0; i < suggestions.length; i++) {
            var typeValue = getSuggestionTypeValue(suggestions[i] && suggestions[i].suggestionType || "");
            if (!map[typeValue]) {
                map[typeValue] = getSuggestionTypeLabel(typeValue);
            }
        }
        var options = [{ value: "all", label: map.all }];
        var keys = [];
        for (var key in map) {
            if (map.hasOwnProperty(key) && key !== "all") {
                keys.push(key);
            }
        }
        keys.sort();
        for (var k = 0; k < keys.length; k++) {
            options.push({ value: keys[k], label: map[keys[k]] });
        }
        return options;
    }

    function getPendingSuggestionCountsByType(suggestions) {
        var counts = { all: 0 };
        for (var i = 0; i < suggestions.length; i++) {
            if (suggestions[i].status !== "pending") {
                continue;
            }
            counts.all++;
            var typeValue = getSuggestionTypeValue(suggestions[i].suggestionType || "");
            counts[typeValue] = (counts[typeValue] || 0) + 1;
        }
        return counts;
    }

    function getFilteredPendingSuggestions(typeFilter) {
        var suggestions = getSuggestionStore().slice();
        var filtered = [];
        for (var i = 0; i < suggestions.length; i++) {
            if (suggestions[i].status === "pending" && matchesReviewTypeFilter(suggestions[i], typeFilter)) {
                filtered.push(suggestions[i]);
            }
        }
        return sortReviewSuggestions(filtered);
    }

    function getNextPendingSuggestionId(typeFilter, currentId) {
        var pending = getFilteredPendingSuggestions(typeFilter);
        if (!pending.length) {
            return "";
        }
        if (!currentId) {
            return pending[0].id;
        }
        for (var i = 0; i < pending.length; i++) {
            if (pending[i].id === currentId) {
                if (pending[i + 1]) {
                    return pending[i + 1].id;
                }
                return pending.length > 1 ? pending[0].id : "";
            }
        }
        return pending[0].id;
    }

    function getPreviousPendingSuggestionId(typeFilter, currentId) {
        var pending = getFilteredPendingSuggestions(typeFilter);
        if (!pending.length) {
            return "";
        }
        if (!currentId) {
            return pending[0].id;
        }
        for (var i = 0; i < pending.length; i++) {
            if (pending[i].id === currentId) {
                if (pending[i - 1]) {
                    return pending[i - 1].id;
                }
                return pending.length > 1 ? pending[pending.length - 1].id : "";
            }
        }
        return pending[0].id;
    }

    function locateNextPendingSuggestion(typeFilter, currentId) {
        var nextSuggestionId = getNextPendingSuggestionId(typeFilter, currentId);
        if (!nextSuggestionId) {
            return false;
        }
        return locateSuggestion(nextSuggestionId);
    }

    function locatePreviousPendingSuggestion(typeFilter, currentId) {
        var previousSuggestionId = getPreviousPendingSuggestionId(typeFilter, currentId);
        if (!previousSuggestionId) {
            return false;
        }
        return locateSuggestion(previousSuggestionId);
    }

    function activateNextPendingSuggestion(typeFilter, currentId, options) {
        var nextSuggestionId = getNextPendingSuggestionId(typeFilter, currentId);
        if (!nextSuggestionId) {
            return false;
        }
        return activateReviewSuggestion(nextSuggestionId, options || {});
    }

    function activatePreviousPendingSuggestion(typeFilter, currentId, options) {
        var previousSuggestionId = getPreviousPendingSuggestionId(typeFilter, currentId);
        if (!previousSuggestionId) {
            return false;
        }
        return activateReviewSuggestion(previousSuggestionId, options || {});
    }

    function getInlineReviewTypeFilter(currentSuggestionId) {
        var reviewState = getReviewState();
        var typeFilter = reviewState.typeFilter || "all";
        var suggestion = findSuggestionById(currentSuggestionId);
        if (suggestion && typeFilter !== "all" && !matchesReviewTypeFilter(suggestion, typeFilter)) {
            typeFilter = getSuggestionTypeValue(suggestion.suggestionType || "");
        }
        return typeFilter || "all";
    }

    function getNextInlineReviewSuggestionId(currentSuggestionId) {
        var typeFilter = getInlineReviewTypeFilter(currentSuggestionId);
        var nextSuggestionId = getNextPendingSuggestionId(typeFilter, currentSuggestionId);
        if (!nextSuggestionId && typeFilter !== "all") {
            nextSuggestionId = getNextPendingSuggestionId("all", currentSuggestionId);
        }
        return nextSuggestionId;
    }

    function getPreviousInlineReviewSuggestionId(currentSuggestionId) {
        var typeFilter = getInlineReviewTypeFilter(currentSuggestionId);
        var previousSuggestionId = getPreviousPendingSuggestionId(typeFilter, currentSuggestionId);
        if (!previousSuggestionId && typeFilter !== "all") {
            previousSuggestionId = getPreviousPendingSuggestionId("all", currentSuggestionId);
        }
        return previousSuggestionId;
    }

    function getFirstInlineReviewSuggestionId(currentSuggestionId) {
        var typeFilter = getInlineReviewTypeFilter(currentSuggestionId);
        var pending = getFilteredPendingSuggestions(typeFilter);
        if (!pending.length && typeFilter !== "all") {
            pending = getFilteredPendingSuggestions("all");
        }
        return pending.length ? pending[0].id : "";
    }

    function getLastInlineReviewSuggestionId(currentSuggestionId) {
        var typeFilter = getInlineReviewTypeFilter(currentSuggestionId);
        var pending = getFilteredPendingSuggestions(typeFilter);
        if (!pending.length && typeFilter !== "all") {
            pending = getFilteredPendingSuggestions("all");
        }
        return pending.length ? pending[pending.length - 1].id : "";
    }

    function locatePreviousInlineReviewSuggestion(currentSuggestionId, options) {
        var previousSuggestionId = getPreviousInlineReviewSuggestionId(currentSuggestionId);
        if (!previousSuggestionId) {
            return false;
        }
        return locateSuggestion(previousSuggestionId, options);
    }

    function locateNextInlineReviewSuggestion(currentSuggestionId, options) {
        var nextSuggestionId = getNextInlineReviewSuggestionId(currentSuggestionId);
        if (!nextSuggestionId) {
            return false;
        }
        return locateSuggestion(nextSuggestionId, options);
    }

    function locateFirstInlineReviewSuggestion(currentSuggestionId, options) {
        var firstSuggestionId = getFirstInlineReviewSuggestionId(currentSuggestionId);
        if (!firstSuggestionId) {
            return false;
        }
        return locateSuggestion(firstSuggestionId, options);
    }

    function locateLastInlineReviewSuggestion(currentSuggestionId, options) {
        var lastSuggestionId = getLastInlineReviewSuggestionId(currentSuggestionId);
        if (!lastSuggestionId) {
            return false;
        }
        return locateSuggestion(lastSuggestionId, options);
    }

    function getReviewTargetSuggestionId(typeFilter) {
        var activeSuggestion = getActiveSuggestion();
        if (activeSuggestion && activeSuggestion.status === "pending" && matchesReviewTypeFilter(activeSuggestion, typeFilter)) {
            return activeSuggestion.id;
        }
        return getNextPendingSuggestionId(typeFilter, "");
    }

    function getPendingSuggestionPosition(typeFilter, suggestionId) {
        var pending = getFilteredPendingSuggestions(typeFilter);
        var result = {
            id: suggestionId || "",
            index: 0,
            total: pending.length
        };
        if (!suggestionId || !pending.length) {
            return result;
        }
        for (var i = 0; i < pending.length; i++) {
            if (pending[i].id === suggestionId) {
                result.index = i + 1;
                return result;
            }
        }
        return result;
    }

    function getReviewSuggestionTypeFilter(suggestion) {
        var reviewState = getReviewState();
        var typeFilter = reviewState.typeFilter || "all";
        if (suggestion && typeFilter !== "all" && !matchesReviewTypeFilter(suggestion, typeFilter)) {
            typeFilter = getSuggestionTypeValue(suggestion.suggestionType || "");
        }
        return typeFilter || "all";
    }

    function getPendingReviewActionPresentation(suggestion, actionName, typeFilter) {
        if (!suggestion || suggestion.status !== "pending" || (actionName !== "accept" && actionName !== "reject")) {
            return null;
        }
        typeFilter = typeFilter || getReviewSuggestionTypeFilter(suggestion);
        var pending = getFilteredPendingSuggestions(typeFilter);
        if (!pending.length && typeFilter !== "all") {
            pending = getFilteredPendingSuggestions("all");
        }
        var suggestionIndex = -1;
        for (var pendingIndex = 0; pendingIndex < pending.length; pendingIndex++) {
            if (pending[pendingIndex] && pending[pendingIndex].id === suggestion.id) {
                suggestionIndex = pendingIndex;
                break;
            }
        }
        var verb = actionName === "accept" ? "Accept" : "Reject";
        if (suggestionIndex === -1 || !pending.length) {
            return {
                text: verb,
                label: verb + " this AI change"
            };
        }
        if (suggestionIndex === pending.length - 1) {
            return {
                text: verb + " & finish",
                label: verb + " this AI change and finish the current review queue"
            };
        }
        return {
            text: verb + " & next",
            label: verb + " this AI change and move to the next review item"
        };
    }

    function getReviewShortcutDecisionCopy(suggestion) {
        var acceptLabel = getReviewFocusActionDisplayLabel(suggestion, "accept") || "Accept";
        var rejectLabel = getReviewFocusActionDisplayLabel(suggestion, "reject") || "Reject";
        return {
            acceptLabel: acceptLabel,
            rejectLabel: rejectLabel,
            acceptHint: acceptLabel.replace(/^([A-Z])/, function (match) {
                return match.toLowerCase();
            }),
            rejectHint: rejectLabel.replace(/^([A-Z])/, function (match) {
                return match.toLowerCase();
            })
        };
    }

    function applyReviewDecision(suggestionId, action, options) {
        options = options || {};
        if (!suggestionId) {
            return false;
        }
        var handled = false;
        if (action === "accept") {
            handled = acceptInlineSuggestion(suggestionId);
        }
        else if (action === "reject") {
            handled = rejectInlineSuggestion(suggestionId);
        }
        if (handled) {
            renderReviewPanel(true, {
                focusAction: options.focusAction || ""
            });
        }
        return handled;
    }

    function runReviewShortcutAction(typeFilter, action, options) {
        var suggestionId = getReviewTargetSuggestionId(typeFilter);
        if (!suggestionId) {
            return false;
        }
        return applyReviewDecision(suggestionId, action, options);
    }

    function acceptAllPendingSuggestions() {
        var suggestions = getSuggestionStore().slice();
        var handled = false;
        for (var i = 0; i < suggestions.length; i++) {
            if (suggestions[i].status === "pending" && acceptInlineSuggestion(suggestions[i].id)) {
                handled = true;
            }
        }
        return handled;
    }

    function acceptPendingSuggestionsByType(typeFilter) {
        if (!typeFilter || typeFilter === "all") {
            return acceptAllPendingSuggestions();
        }

        var suggestions = getSuggestionStore().slice();
        var handled = false;
        for (var i = 0; i < suggestions.length; i++) {
            if (suggestions[i].status === "pending" && matchesReviewTypeFilter(suggestions[i], typeFilter) && acceptInlineSuggestion(suggestions[i].id)) {
                handled = true;
            }
        }
        return handled;
    }

    function rejectAllPendingSuggestions() {
        var suggestions = getSuggestionStore().slice();
        var handled = false;
        for (var i = 0; i < suggestions.length; i++) {
            if (suggestions[i].status === "pending" && rejectInlineSuggestion(suggestions[i].id)) {
                handled = true;
            }
        }
        return handled;
    }

    function rejectPendingSuggestionsByType(typeFilter) {
        if (!typeFilter || typeFilter === "all") {
            return rejectAllPendingSuggestions();
        }

        var suggestions = getSuggestionStore().slice();
        var handled = false;
        for (var i = 0; i < suggestions.length; i++) {
            if (suggestions[i].status === "pending" && matchesReviewTypeFilter(suggestions[i], typeFilter) && rejectInlineSuggestion(suggestions[i].id)) {
                handled = true;
            }
        }
        return handled;
    }

    function locateSuggestion(suggestionId, options) {
        options = options || {};
        clearPreviewStateIfMissing();
        var suggestion = findSuggestionById(suggestionId);
        var wrapper = suggestion ? getSuggestionWrapper(suggestion.id) : null;
        if (!suggestion || !wrapper) {
            if (suggestion && suggestion.status === "pending") {
                suggestion.status = "stale";
                suggestion.decidedAt = suggestion.decidedAt || new Date().getTime();
            }
            if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
                renderReviewPanel(false);
            }
            return false;
        }

        if (!options.openedQueue && editor.__aiRecentlyOpenedQueueSuggestionId && editor.__aiRecentlyOpenedQueueSuggestionId !== suggestion.id) {
            clearQueueOpenedSuggestion({ skipUpdate: true, skipRender: true });
        }
        setActiveSuggestionId(suggestion.id);
        clearSuggestionRemoteUpdate(suggestion.id);
        if (options.openedQueue) {
            markQueueOpenedSuggestion(suggestion.id);
        }
        var pendingPosition = getPendingSuggestionPosition(getInlineReviewTypeFilter(suggestion.id), suggestion.id);
        var announcementOptions = {
            positionLabel: pendingPosition.total
                ? "Item " + pendingPosition.index + " of " + pendingPosition.total
                : "",
            remoteUpdateCount: getSuggestionRemoteUpdateCount(suggestion.id)
        };
        announceReviewStatus(options.openedQueue
            ? buildQueueOpenAnnouncement(suggestion, announcementOptions)
            : buildSuggestionAnnouncement(suggestion, "Reviewing", announcementOptions));
        wrapper.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
        wrapper.classList.add("is-focused");
        setTimeout(function () {
            if (wrapper && wrapper.classList) {
                wrapper.classList.remove("is-focused");
            }
        }, 1400);
        editor.focus();
        var restoredInlineAction = !!(options.focusInlineAction && focusInlineSuggestionAction(suggestion.id, options.focusInlineAction));
        if (!restoredInlineAction) {
            focusInlineSuggestionWrapper(wrapper);
        }
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            renderReviewPanel(false);
        }
        return true;
    }

    function activateReviewSuggestion(suggestionId, options) {
        options = options || {};
        var suggestion = findSuggestionById(suggestionId);
        if (!suggestion) {
            return false;
        }
        if (!options.openedQueue && editor.__aiRecentlyOpenedQueueSuggestionId && editor.__aiRecentlyOpenedQueueSuggestionId !== suggestion.id) {
            clearQueueOpenedSuggestion({ skipUpdate: true, skipRender: true });
        }
        setActiveSuggestionId(suggestion.id);
        clearSuggestionRemoteUpdate(suggestion.id);
        if (options.openedQueue) {
            markQueueOpenedSuggestion(suggestion.id);
        }
        if (options.locate) {
            return locateSuggestion(suggestion.id, { openedQueue: !!options.openedQueue });
        }
        var pendingPosition = getPendingSuggestionPosition(getInlineReviewTypeFilter(suggestion.id), suggestion.id);
        var announcementOptions = {
            positionLabel: pendingPosition.total
                ? "Item " + pendingPosition.index + " of " + pendingPosition.total
                : "",
            remoteUpdateCount: getSuggestionRemoteUpdateCount(suggestion.id)
        };
        announceReviewStatus(options.openedQueue
            ? buildQueueOpenAnnouncement(suggestion, announcementOptions)
            : buildSuggestionAnnouncement(suggestion, "Reviewing", announcementOptions));
        renderReviewPanel(!!options.focusPanel, {
            focusAction: options.focusAction || ""
        });
        return true;
    }

    function revealActiveReviewItem(feed, focusItem, focusAction) {
        if (!feed || !editor.__aiActiveSuggestionId || !feed.querySelector) {
            return null;
        }
        var activeItem = feed.querySelector('[data-rte-ai-review-id="' + editor.__aiActiveSuggestionId + '"]');
        if (!activeItem || !activeItem.scrollIntoView) {
            return null;
        }
        activeItem.scrollIntoView({ block: "nearest", inline: "nearest" });
        if (focusItem) {
            var target = activeItem;
            if (focusAction && activeItem.querySelector) {
                var actionTarget = activeItem.querySelector('[data-rte-ai-review-action="' + focusAction + '"]');
                if (!actionTarget || actionTarget.disabled || !actionTarget.focus) {
                    actionTarget = activeItem.querySelector(".rte-ai-review-action-button.is-primary:not([disabled])")
                        || activeItem.querySelector('[data-rte-ai-review-action="locate"]:not([disabled])')
                        || activeItem.querySelector('[data-rte-ai-review-action]:not([disabled])');
                }
                if (actionTarget && !actionTarget.disabled && actionTarget.focus) {
                    target = actionTarget;
                }
            }
            if (target && target.focus) {
                target.focus();
            }
        }
        return activeItem;
    }

    function focusPrimaryReviewAction(suggestionId, preferredAction) {
        var panel = editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected ? editor.__aiReviewPanel : null;
        if (!panel || !panel.querySelector || !suggestionId) {
            return false;
        }
        var item = panel.querySelector('[data-rte-ai-review-id="' + suggestionId + '"]');
        if (!item) {
            return false;
        }
        var suggestion = findSuggestionById(suggestionId);
        var actionOrder = [];
        if (preferredAction) {
            actionOrder.push(preferredAction);
        }
        else {
            actionOrder.push(getDefaultReviewActionName(suggestion));
        }
        if (suggestion && suggestion.status === "pending") {
            actionOrder.push("accept");
            actionOrder.push("reject");
        }
        actionOrder.push("locate");

        var seen = {};
        for (var i = 0; i < actionOrder.length; i++) {
            var actionName = actionOrder[i];
            if (!actionName || seen[actionName]) {
                continue;
            }
            seen[actionName] = true;
            var actionButton = item.querySelector('[data-rte-ai-review-action="' + actionName + '"]');
            if (actionButton && !actionButton.disabled && actionButton.focus) {
                actionButton.focus();
                return true;
            }
        }
        if (item.focus) {
            item.focus();
            return true;
        }
        return false;
    }

    function focusDefaultReviewCardAction(suggestionId, preferredAction) {
        var suggestion = findSuggestionById(suggestionId);
        if (!suggestion) {
            return false;
        }
        var focusAction = preferredAction || getDefaultReviewActionName(suggestion);
        if (editor.__aiActiveSuggestionId === suggestion.id && focusPrimaryReviewAction(suggestion.id, focusAction)) {
            return true;
        }
        return activateReviewSuggestion(suggestion.id, {
            focusPanel: true,
            focusAction: focusAction || ""
        });
    }

    function getPreferredReviewActionFocus(panel) {
        var focusRoot = panel && panel.isConnected
            ? panel
            : (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected ? editor.__aiReviewPanel : null);
        var currentFocus = document.activeElement;
        if (focusRoot && currentFocus && currentFocus.getAttribute && focusRoot.contains(currentFocus)) {
            return currentFocus.getAttribute("data-rte-ai-review-action") || "";
        }
        return editor.__aiLastReviewActionFocus || "";
    }

    function activateReviewSuggestionWithDefaultActionFocus(suggestionId, options) {
        options = options || {};
        var suggestion = findSuggestionById(suggestionId);
        if (!suggestion) {
            return false;
        }
        var focusAction = options.focusAction || getPreferredReviewActionFocus();
        return activateReviewSuggestion(suggestion.id, {
            focusPanel: !!options.focusPanel,
            focusAction: focusAction || getDefaultReviewActionName(suggestion),
            openedQueue: !!options.openedQueue,
            locate: !!options.locate
        });
    }

    function navigateReviewActionFocus(typeFilter, currentSuggestionId, actionName, direction) {
        var targetSuggestionId = "";
        if (direction === "next") {
            targetSuggestionId = getNextPendingSuggestionId(typeFilter, currentSuggestionId);
        }
        else if (direction === "previous") {
            targetSuggestionId = getPreviousPendingSuggestionId(typeFilter, currentSuggestionId);
        }
        else if (direction === "first") {
            targetSuggestionId = getReviewTargetSuggestionId(typeFilter);
        }
        else if (direction === "last") {
            var pending = getFilteredPendingSuggestions(typeFilter);
            targetSuggestionId = pending.length ? pending[pending.length - 1].id : "";
        }
        if (!targetSuggestionId) {
            return false;
        }
        return activateReviewSuggestion(targetSuggestionId, {
            focusPanel: true,
            focusAction: actionName || ""
        });
    }

    function hasUndoableReviewShortcut() {
        return !!getUndoableReviewDecision();
    }

    function hasRedoableReviewShortcut() {
        return !!getRedoableReviewDecision();
    }

    function appendUndoShortcutTitle(text) {
        var undoContext = getUndoDecisionContext();
        var redoContext = getRedoDecisionContext();
        var title = text;
        if (hasUndoableReviewShortcut()) {
            title = title.replace(/\.$/, "") + ". U undoes " + undoContext.decisionLabel + " decision.";
        }
        if (hasRedoableReviewShortcut()) {
            title = title.replace(/\.$/, "") + ". Shift+U redoes " + redoContext.decisionLabel + " decision.";
        }
        return title;
    }

    function appendUndoShortcutHint(text) {
        var undoContext = getUndoDecisionContext();
        var hint = text;
        if (hasUndoableReviewShortcut()) {
            hint += " | U " + undoContext.shortcutLabel;
        }
        if (hasRedoableReviewShortcut()) {
            hint += " | Shift+U " + getRedoDecisionContext().shortcutLabel;
        }
        return hint;
    }

    function appendUndoShortcutKeys(keys) {
        var result = keys;
        if (hasUndoableReviewShortcut()) {
            result += " U";
        }
        if (hasRedoableReviewShortcut()) {
            result += " Shift+U";
        }
        return result;
    }

    function getReviewActionShortcutTitle(actionName, suggestion) {
        var undoContext = getUndoDecisionContext();
        var redoContext = getRedoDecisionContext();
        var decisionCopy = getReviewShortcutDecisionCopy(suggestion);
        if (actionName === "accept") {
            return appendUndoShortcutTitle("Enter uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
        }
        if (actionName === "reject") {
            return appendUndoShortcutTitle("Enter uses " + decisionCopy.rejectLabel + ". A uses " + decisionCopy.acceptLabel + ". J/K move items. Home/End jump.");
        }
        if (actionName === "undo") {
            return appendUndoShortcutTitle("Enter undoes " + undoContext.decisionLabel + " decision. A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
        }
        if (actionName === "redo") {
            return appendUndoShortcutTitle("Enter redoes " + redoContext.decisionLabel + " decision. A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
        }
        return appendUndoShortcutTitle("Enter locates in editor. A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
    }

    function getReviewActionShortcutHint(actionName, suggestion) {
        var undoContext = getUndoDecisionContext();
        var redoContext = getRedoDecisionContext();
        var decisionCopy = getReviewShortcutDecisionCopy(suggestion);
        if (actionName === "accept") {
            return appendUndoShortcutHint("Shortcuts: Enter " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
        }
        if (actionName === "reject") {
            return appendUndoShortcutHint("Shortcuts: Enter " + decisionCopy.rejectHint + " | A " + decisionCopy.acceptHint + " | J/K move | Home/End jump");
        }
        if (actionName === "undo") {
            return appendUndoShortcutHint("Shortcuts: Enter " + undoContext.shortcutLabel + " | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
        }
        if (actionName === "redo") {
            return appendUndoShortcutHint("Shortcuts: Enter " + redoContext.shortcutLabel + " | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
        }
        if (actionName === "locate") {
            return appendUndoShortcutHint("Shortcuts: Enter locate | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
        }
        return appendUndoShortcutHint("Shortcuts: J/K move | Enter focus action | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | Home/End jump");
    }

    function getReviewCardShortcutTitle(suggestion, preferredAction) {
        var decisionCopy = getReviewShortcutDecisionCopy(suggestion);
        if (!suggestion || suggestion.status !== "pending") {
            return appendUndoShortcutTitle("Enter focuses Locate. J/K move items. Home/End jump.");
        }
        var focusLabel = getReviewFocusActionDisplayLabel(suggestion, preferredAction) || decisionCopy.acceptLabel;
        return appendUndoShortcutTitle("Enter focuses " + focusLabel + ". A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
    }

    function getReviewCardShortcutHint(suggestion, preferredAction) {
        var decisionCopy = getReviewShortcutDecisionCopy(suggestion);
        if (!suggestion || suggestion.status !== "pending") {
            return appendUndoShortcutHint("Shortcuts: Enter focus Locate | J/K move | Home/End jump");
        }
        var focusLabel = getReviewFocusActionDisplayLabel(suggestion, preferredAction) || decisionCopy.acceptLabel;
        return appendUndoShortcutHint("Shortcuts: Enter focus " + focusLabel + " | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
    }

    function resolveReviewFocusActionName(suggestion, preferredAction) {
        if (!suggestion) {
            return "";
        }
        var redoable = getRedoableReviewDecision();
        var undoable = getUndoableReviewDecision();
        var actionOrder = [];
        if (preferredAction) {
            actionOrder.push(preferredAction);
        }
        actionOrder.push(getDefaultReviewActionName(suggestion));
        if (suggestion.status === "pending") {
            actionOrder.push("accept");
            actionOrder.push("reject");
            if (undoable) {
                actionOrder.push("undo");
            }
            if (redoable && redoable.suggestion && redoable.suggestion.id === suggestion.id) {
                actionOrder.push("redo");
            }
        }
        actionOrder.push("locate");
        var seen = {};
        for (var i = 0; i < actionOrder.length; i++) {
            var actionName = actionOrder[i];
            if (!actionName || seen[actionName]) {
                continue;
            }
            seen[actionName] = true;
            if ((actionName === "accept" || actionName === "reject") && suggestion.status === "pending") {
                return actionName;
            }
            if (actionName === "undo" && suggestion.status === "pending" && undoable) {
                return actionName;
            }
            if (actionName === "redo" && suggestion.status === "pending" && redoable && redoable.suggestion && redoable.suggestion.id === suggestion.id) {
                return actionName;
            }
            if (actionName === "locate" && (suggestion.status === "pending" || suggestion.status === "stale")) {
                return actionName;
            }
        }
        return "";
    }

    function getReviewFocusActionDisplayLabel(suggestion, preferredAction) {
        var actionName = resolveReviewFocusActionName(suggestion, preferredAction);
        if (actionName === "undo") {
            return getUndoDecisionContext().actionLabel || "Undo";
        }
        if (actionName === "redo") {
            return getRedoDecisionContext().actionLabel || "Redo";
        }
        if (actionName === "reject") {
            return (getPendingReviewActionPresentation(suggestion, "reject") || {}).text || "Reject";
        }
        if (actionName === "accept") {
            return (getPendingReviewActionPresentation(suggestion, "accept") || {}).text || "Accept";
        }
        if (actionName === "locate") {
            return "Locate";
        }
        return "";
    }

    function getRecoveryDecisionFocusActionDisplayLabel(decision, preferredAction) {
        if (!decision || !decision.suggestion) {
            return "";
        }
        var reopenedSuggestion = {};
        for (var key in decision.suggestion) {
            if (Object.prototype.hasOwnProperty.call(decision.suggestion, key)) {
                reopenedSuggestion[key] = decision.suggestion[key];
            }
        }
        reopenedSuggestion.status = "pending";
        return getReviewFocusActionDisplayLabel(reopenedSuggestion, preferredAction);
    }

    function getReviewFocusShortcutHint(actionName, suggestion) {
        var undoContext = getUndoDecisionContext();
        var redoContext = getRedoDecisionContext();
        var decisionCopy = getReviewShortcutDecisionCopy(suggestion);
        if (actionName === "accept") {
            return appendUndoShortcutHint("Shortcuts: Enter focus " + decisionCopy.acceptLabel + " | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
        }
        if (actionName === "reject") {
            return appendUndoShortcutHint("Shortcuts: Enter focus " + decisionCopy.rejectLabel + " | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
        }
        if (actionName === "undo") {
            return appendUndoShortcutHint("Shortcuts: Enter focus " + undoContext.actionLabel + " | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
        }
        if (actionName === "redo") {
            return appendUndoShortcutHint("Shortcuts: Enter focus " + redoContext.actionLabel + " | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
        }
        if (actionName === "locate") {
            return appendUndoShortcutHint("Shortcuts: Enter focus Locate | J/K move | Home/End jump");
        }
        return appendUndoShortcutHint("Shortcuts: J/K move | Enter focus action | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | Home/End jump");
    }

    function getReviewFocusShortcutTitle(actionName, suggestion) {
        var undoContext = getUndoDecisionContext();
        var redoContext = getRedoDecisionContext();
        var decisionCopy = getReviewShortcutDecisionCopy(suggestion);
        if (actionName === "accept") {
            return appendUndoShortcutTitle("Enter focuses " + decisionCopy.acceptLabel + ". A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
        }
        if (actionName === "reject") {
            return appendUndoShortcutTitle("Enter focuses " + decisionCopy.rejectLabel + ". A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
        }
        if (actionName === "undo") {
            return appendUndoShortcutTitle("Enter focuses " + undoContext.actionLabel + ". A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
        }
        if (actionName === "redo") {
            return appendUndoShortcutTitle("Enter focuses " + redoContext.actionLabel + ". A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
        }
        if (actionName === "locate") {
            return appendUndoShortcutTitle("Enter focuses Locate. J/K move items. Home/End jump.");
        }
        return appendUndoShortcutTitle("Enter focuses action. A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
    }

    function getReviewPanelShortcutHint(suggestion, preferredAction) {
        return getReviewFocusShortcutHint(resolveReviewFocusActionName(suggestion, preferredAction), suggestion);
    }

    function getReviewPanelShortcutTitle(suggestion, preferredAction) {
        return getReviewFocusShortcutTitle(resolveReviewFocusActionName(suggestion, preferredAction), suggestion);
    }

    function getReviewControlLabel(control) {
        if (!control || !control.getAttribute) {
            return "this control";
        }
        var label = control.getAttribute("data-rte-ai-review-shortcut-label")
            || control.getAttribute("aria-label")
            || control.innerText
            || control.textContent
            || control.title
            || control.getAttribute("data-rte-ai-review-focus-key")
            || "this control";
        return String(label || "this control").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "") || "this control";
    }

    function getReviewControlShortcutTitle(control) {
        var decisionCopy = getReviewShortcutDecisionCopy(getActiveSuggestion());
        return appendUndoShortcutTitle("Enter activates " + getReviewControlLabel(control) + ". A uses " + decisionCopy.acceptLabel + ". R uses " + decisionCopy.rejectLabel + ". J/K move items. Home/End jump.");
    }

    function getReviewControlShortcutHint(control) {
        var decisionCopy = getReviewShortcutDecisionCopy(getActiveSuggestion());
        return appendUndoShortcutHint("Shortcuts: Enter " + getReviewControlLabel(control) + " | A " + decisionCopy.acceptHint + " | R " + decisionCopy.rejectHint + " | J/K move | Home/End jump");
    }

    function getDefaultReviewActionName(suggestion) {
        if (!suggestion) {
            return "";
        }
        var redoable = getRedoableReviewDecision();
        if (suggestion.status === "pending" && redoable && redoable.suggestion && redoable.suggestion.id === suggestion.id) {
            return "redo";
        }
        return suggestion.status === "pending" ? "accept" : "locate";
    }

    function renderReviewShortcutDisplayContent(node, text) {
        if (!node) {
            return;
        }
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        if (!text) {
            return;
        }
        var rawText = String(text || "");
        var prefixMatch = rawText.match(/^Shortcuts:\s*/i);
        var ownerDocument = node.ownerDocument || document;
        var contentText = prefixMatch ? rawText.substring(prefixMatch[0].length) : rawText;
        if (prefixMatch) {
            var label = ownerDocument.createElement("span");
            label.className = "rte-ai-review-shortcuts-label";
            label.innerText = "Shortcuts:";
            node.appendChild(label);
            node.appendChild(ownerDocument.createTextNode(" "));
        }
        var pieces = contentText.split(/(\s+\|\s+|\s+-\s+)/);
        for (var pieceIndex = 0; pieceIndex < pieces.length; pieceIndex++) {
            var piece = pieces[pieceIndex];
            if (!piece) {
                continue;
            }
            if (/^\s+[\|\-]\s+$/.test(piece)) {
                var separator = ownerDocument.createElement("span");
                separator.className = "rte-ai-review-shortcuts-separator";
                separator.innerText = piece.replace(/^\s+|\s+$/g, "");
                node.appendChild(separator);
                continue;
            }
            var segment = ownerDocument.createElement("span");
            segment.className = "rte-ai-review-shortcuts-segment";
            var segmentText = piece.replace(/^\s+|\s+$/g, "");
            var firstSpace = segmentText.indexOf(" ");
            if (firstSpace > 0) {
                var keyNode = ownerDocument.createElement("span");
                keyNode.className = "rte-ai-review-shortcuts-key";
                keyNode.innerText = segmentText.substring(0, firstSpace);
                segment.appendChild(keyNode);
                segment.appendChild(ownerDocument.createTextNode(" "));
                var copyNode = ownerDocument.createElement("span");
                copyNode.className = "rte-ai-review-shortcuts-copy";
                copyNode.innerText = segmentText.substring(firstSpace + 1);
                segment.appendChild(copyNode);
            }
            else {
                segment.innerText = segmentText;
            }
            node.appendChild(segment);
        }
    }

    function setReviewShortcutDisplay(text, stateName) {
        var node = editor.__aiReviewShortcutDisplayNode;
        if (!node) {
            return;
        }
        var activeState = stateName || "";
        renderReviewShortcutDisplayContent(node, text || "");
        if (activeState) {
            node.setAttribute("data-rte-ai-review-shortcut-action", activeState);
        }
        else {
            node.removeAttribute("data-rte-ai-review-shortcut-action");
        }
        node.classList.remove("is-action-focused");
        node.classList.remove("is-card-focused");
        node.classList.remove("is-panel-focused");
        node.classList.remove("is-control-focused");
        if (activeState === "card") {
            node.classList.add("is-card-focused");
        }
        else if (activeState === "panel") {
            node.classList.add("is-panel-focused");
        }
        else if (activeState === "control") {
            node.classList.add("is-control-focused");
        }
        else if (activeState) {
            node.classList.add("is-action-focused");
        }
    }

    function updateReviewShortcutDisplay(actionName) {
        var activeAction = actionName || "";
        setReviewShortcutDisplay(getReviewActionShortcutHint(activeAction, getActiveSuggestion()), activeAction);
        updateVisibleReviewCondensedPreviewOpenHints();
    }

    function updateReviewCardShortcutDisplay(suggestion) {
        setReviewShortcutDisplay(getReviewCardShortcutHint(suggestion, getPreferredReviewActionFocus()), "card");
        updateVisibleReviewCondensedPreviewOpenHints();
    }

    function updateReviewPanelShortcutDisplay(suggestion, preferredAction) {
        setReviewShortcutDisplay(getReviewPanelShortcutHint(suggestion, preferredAction), "panel");
        updateVisibleReviewCondensedPreviewOpenHints();
    }

    function updateReviewControlShortcutDisplay(control) {
        setReviewShortcutDisplay(getReviewControlShortcutHint(control), "control");
        updateVisibleReviewCondensedPreviewOpenHints();
    }

    function getReviewShortcutDisplayId() {
        if (!editor.__aiReviewShortcutDisplayId) {
            editor.__aiReviewShortcutDisplayId = "rte-ai-review-shortcuts-" + String(Math.floor(Math.random() * 1000000000));
        }
        return editor.__aiReviewShortcutDisplayId;
    }

    function linkReviewShortcutDisplayTarget(node) {
        if (!node || !node.setAttribute) {
            return;
        }
        var ids = [getReviewShortcutDisplayId()];
        var extraIds = node.getAttribute("data-rte-ai-review-extra-describedby") || "";
        if (extraIds) {
            var parts = extraIds.split(/\s+/);
            for (var i = 0; i < parts.length; i++) {
                if (parts[i] && ids.indexOf(parts[i]) < 0) {
                    ids.push(parts[i]);
                }
            }
        }
        node.setAttribute("aria-describedby", ids.join(" "));
    }

    function bindReviewControlShortcutFocus(control, typeFilter) {
        if (!control) {
            return;
        }
        var controlTag = control.tagName ? control.tagName.toUpperCase() : "";
        var isButtonLikeControl = controlTag === "BUTTON" || control.getAttribute("role") === "button";
        if (isButtonLikeControl) {
            control.setAttribute("aria-keyshortcuts", appendUndoShortcutKeys("Enter Space A R J K Home End"));
            control.title = getReviewControlShortcutTitle(control);
        }
        var previousOnFocus = control.onfocus;
        control.onfocus = function (e) {
            linkReviewShortcutDisplayTarget(control);
            if (isButtonLikeControl) {
                updateReviewControlShortcutDisplay(control);
            }
            else {
                updateReviewPanelShortcutDisplay();
            }
            if (previousOnFocus) {
                previousOnFocus.call(this, e);
            }
        };
        if (!isButtonLikeControl) {
            return;
        }
        control.onkeydown = function (e) {
            var key = (e.key || "").toLowerCase();
            var handled = false;
            var boundaryDirection = "";
            if (key === "a") {
                handled = runReviewShortcutAction(typeFilter, "accept", { focusAction: getPreferredReviewActionFocus() });
            }
            else if (key === "r") {
                handled = runReviewShortcutAction(typeFilter, "reject", { focusAction: getPreferredReviewActionFocus() });
            }
            else if (key === "u" && e.shiftKey && hasRedoableReviewShortcut()) {
                handled = redoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
            }
            else if (key === "u" && hasUndoableReviewShortcut()) {
                handled = undoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
            }
            else if (e.key === "ArrowDown" || key === "j") {
                boundaryDirection = "next";
                var nextSuggestionId = getNextPendingSuggestionId(typeFilter, editor.__aiActiveSuggestionId);
                handled = !!(nextSuggestionId && activateReviewSuggestionWithDefaultActionFocus(nextSuggestionId, {
                    focusPanel: true,
                    focusAction: getPreferredReviewActionFocus()
                }));
            }
            else if (e.key === "ArrowUp" || key === "k") {
                boundaryDirection = "previous";
                var previousSuggestionId = getPreviousPendingSuggestionId(typeFilter, editor.__aiActiveSuggestionId);
                handled = !!(previousSuggestionId && activateReviewSuggestionWithDefaultActionFocus(previousSuggestionId, {
                    focusPanel: true,
                    focusAction: getPreferredReviewActionFocus()
                }));
            }
            else if (e.key === "Home") {
                boundaryDirection = "first";
                var firstSuggestionId = getReviewTargetSuggestionId(typeFilter);
                handled = !!(firstSuggestionId && activateReviewSuggestionWithDefaultActionFocus(firstSuggestionId, {
                    focusPanel: true,
                    focusAction: getPreferredReviewActionFocus()
                }));
            }
            else if (e.key === "End") {
                boundaryDirection = "last";
                var pending = getFilteredPendingSuggestions(typeFilter);
                var lastSuggestionId = pending.length ? pending[pending.length - 1].id : "";
                handled = !!(lastSuggestionId && activateReviewSuggestionWithDefaultActionFocus(lastSuggestionId, {
                    focusPanel: true,
                    focusAction: getPreferredReviewActionFocus()
                }));
            }
            if (handled || boundaryDirection) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (!handled && boundaryDirection) {
                announceReviewStatus(buildInlineQueueBoundaryAnnouncement(editor.__aiActiveSuggestionId, boundaryDirection));
            }
        };
    }

    function bindReviewActionButtonNavigation(button, typeFilter, suggestionId, actionName) {
        if (!button) {
            return;
        }
        button.setAttribute("aria-keyshortcuts", appendUndoShortcutKeys("Enter Space A R J K Home End"));
        button.title = getReviewActionShortcutTitle(actionName, findSuggestionById(suggestionId));
        button.onfocus = function () {
            editor.__aiLastReviewActionFocus = actionName || "";
            linkReviewShortcutDisplayTarget(button);
            updateReviewShortcutDisplay(actionName);
        };
        button.onkeydown = function (e) {
            var key = (e.key || "").toLowerCase();
            var handled = false;
            var boundaryDirection = "";
            if (key === "a") {
                handled = applyReviewDecision(suggestionId, "accept", { focusAction: getPreferredReviewActionFocus() });
            }
            else if (key === "r") {
                handled = applyReviewDecision(suggestionId, "reject", { focusAction: getPreferredReviewActionFocus() });
            }
            else if (key === "u" && e.shiftKey && hasRedoableReviewShortcut()) {
                handled = redoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
            }
            else if (key === "u" && hasUndoableReviewShortcut()) {
                handled = undoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
            }
            else if (e.key === "ArrowDown" || key === "j") {
                boundaryDirection = "next";
                handled = navigateReviewActionFocus(typeFilter, suggestionId, actionName, "next");
            }
            else if (e.key === "ArrowUp" || key === "k") {
                boundaryDirection = "previous";
                handled = navigateReviewActionFocus(typeFilter, suggestionId, actionName, "previous");
            }
            else if (e.key === "Home") {
                boundaryDirection = "first";
                handled = navigateReviewActionFocus(typeFilter, suggestionId, actionName, "first");
            }
            else if (e.key === "End") {
                boundaryDirection = "last";
                handled = navigateReviewActionFocus(typeFilter, suggestionId, actionName, "last");
            }
            if (handled || boundaryDirection) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (!handled && boundaryDirection) {
                announceReviewStatus(buildInlineQueueBoundaryAnnouncement(suggestionId, boundaryDirection));
            }
        };
    }

    function previewReviewEmptySuggestionTarget(suggestionId) {
        clearPreviewStateIfMissing();
        var suggestion = suggestionId ? findSuggestionById(suggestionId) : null;
        var wrapper = suggestion ? getSuggestionWrapper(suggestion.id) : null;
        if (!suggestion || suggestion.status !== "pending" || !wrapper) {
            return false;
        }
        setActiveSuggestionId(suggestion.id, { preserveEmptyPreview: true });
        if (wrapper.scrollIntoView) {
            wrapper.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
        }
        wrapper.classList.add("is-focused");
        if (editor.__aiReviewEmptyPreviewTimer) {
            clearTimeout(editor.__aiReviewEmptyPreviewTimer);
        }
        editor.__aiReviewEmptyPreviewTimer = setTimeout(function () {
            if (wrapper && wrapper.classList) {
                wrapper.classList.remove("is-focused");
            }
        }, 1200);
        return true;
    }

    function closeReviewPanel() {
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.parentNode) {
            editor.__aiReviewPanel.parentNode.removeChild(editor.__aiReviewPanel);
        }
        if (editor.__aiReviewShell && editor.__aiReviewShell.classList) {
            editor.__aiReviewShell.classList.remove("rte-ai-review-host");
        }
        if (editor.__aiReviewShell && editor.__aiReviewShell.style) {
            editor.__aiReviewShell.style.minHeight = typeof editor.__aiReviewOriginalMinHeight === "string"
                ? editor.__aiReviewOriginalMinHeight
                : "";
        }
        editor.__aiReviewPanel = null;
        editor.__aiReviewSubtitleNode = null;
        editor.__aiReviewSyncBadgeNode = null;
        editor.__aiReviewSyncButton = null;
        editor.__aiLastReviewActionFocus = "";
        editor.__aiReviewShell = null;
        editor.__aiReviewOriginalMinHeight = null;
        editor.__aiLastReviewEmptyAnnouncement = "";
        if (editor.__aiReviewEmptyPreviewTimer) {
            clearTimeout(editor.__aiReviewEmptyPreviewTimer);
            editor.__aiReviewEmptyPreviewTimer = null;
        }
        clearQueueOpenedSuggestion({ skipUpdate: true, skipRender: true });
        if (editor.__aiReviewEmptyPreviewSuggestionId) {
            setActiveSuggestionId(null);
        }
        editor.__aiReviewPrimaryEmptyAction = null;
        editor.__aiReviewMoveEmptyPreviewFocus = null;
    }

    function openReviewPanel(options) {
        options = options || {};
        closeChatPanel();
        refreshRemoteReviewState(true);
        return renderReviewPanel(!!options.focusPanel);
    }

    function toggleReviewPanel(options) {
        if (editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected) {
            closeReviewPanel();
            return false;
        }
        return openReviewPanel(options);
    }

    function renderReviewPanel(focusPanel, focusOptions) {
        focusOptions = focusOptions || {};
        clearPreviewStateIfMissing();
        var shell = getEditorShell();
        if (!shell) {
            return false;
        }
        var previousReviewPanel = editor.__aiReviewPanel && editor.__aiReviewPanel.isConnected ? editor.__aiReviewPanel : null;
        var activeElement = document.activeElement;
        var activeReviewItemNode = previousReviewPanel && activeElement && activeElement.closest
            ? activeElement.closest("[data-rte-ai-review-id]")
            : null;
        var preserveReviewControlFocusKey = !!(!focusPanel
            && previousReviewPanel
            && activeElement
            && activeElement.getAttribute
            && activeElement.getAttribute("data-rte-ai-review-focus-key")
            && previousReviewPanel.contains(activeElement))
            ? (activeElement.getAttribute("data-rte-ai-review-focus-key") || "")
            : "";
        var preserveActiveReviewItemFocus = !!(!focusPanel
            && previousReviewPanel
            && activeReviewItemNode
            && activeReviewItemNode.getAttribute
            && activeReviewItemNode.getAttribute("data-rte-ai-review-id") === editor.__aiActiveSuggestionId
            && previousReviewPanel.contains(activeElement));
        var preserveActiveReviewAction = preserveActiveReviewItemFocus
            && activeElement
            && activeElement !== activeReviewItemNode
            && activeElement.getAttribute
            ? (activeElement.getAttribute("data-rte-ai-review-action") || "")
            : "";
        var requestedReviewActionFocus = focusOptions.focusAction || "";

        var reviewState = getReviewState();
        var suggestions = getSuggestionStore().slice();
        var counts = getSuggestionCounts();
        var activityNotice = getReviewActivityNotice();
        var hasOpenSuggestions = counts.pending > 0 || counts.stale > 0;
        var showResolved = reviewState.showResolved || (!hasOpenSuggestions && counts.total > 0) || !!activityNotice;
        var typeOptions = getReviewTypeOptions(suggestions);
        var pendingCountsByType = getPendingSuggestionCountsByType(suggestions);
        var typeFilter = reviewState.typeFilter || "all";
        var hasCurrentTypeFilter = false;
        for (var typeIndex = 0; typeIndex < typeOptions.length; typeIndex++) {
            if (typeOptions[typeIndex].value === typeFilter) {
                hasCurrentTypeFilter = true;
                break;
            }
        }
        if (!hasCurrentTypeFilter) {
            typeFilter = "all";
            reviewState.typeFilter = "all";
        }
        var visible = [];
        for (var i = 0; i < suggestions.length; i++) {
            // Human Track Changes entries share the ledger but render in their own UI —
            // skip them here so the AI review drawer only shows AI suggestions.
            if (suggestions[i].changeType && suggestions[i].changeType !== "ai-preview") continue;
            var isStatusVisible = showResolved || suggestions[i].status === "pending" || suggestions[i].status === "stale";
            var hasRemoteUpdate = getSuggestionRemoteUpdateCount(suggestions[i].id) > 0;
            if (isStatusVisible && (matchesReviewTypeFilter(suggestions[i], typeFilter) || hasRemoteUpdate)) {
                visible.push(suggestions[i]);
            }
        }
        visible = sortReviewSuggestions(visible);
        var filteredPendingCount = 0;
        for (var visibleIndex = 0; visibleIndex < visible.length; visibleIndex++) {
            if (visible[visibleIndex].status === "pending" && matchesReviewTypeFilter(visible[visibleIndex], typeFilter)) {
                filteredPendingCount++;
            }
        }
        var nextOverallPendingId = getNextPendingSuggestionId("all", "");
        var activeFilteredSuggestionId = getReviewTargetSuggestionId(typeFilter);
        var undoableReviewDecision = getUndoableReviewDecision();
        var redoableReviewDecision = getRedoableReviewDecision();
        setActiveSuggestionId(activeFilteredSuggestionId || null);
        var activePendingPosition = getPendingSuggestionPosition(typeFilter, activeFilteredSuggestionId);
        var nextPendingSuggestionId = getNextPendingSuggestionId(typeFilter, activeFilteredSuggestionId);

        closeReviewPanel();
        editor.__aiReviewOriginalMinHeight = shell.style ? (shell.style.minHeight || "") : "";
        shell.classList.add("rte-ai-review-host");
        if (shell.style) {
            var desiredHeight = window.innerWidth <= 900 ? 460 : 520;
            shell.style.minHeight = Math.max(shell.offsetHeight || 0, desiredHeight) + "px";
        }
        editor.__aiReviewShell = shell;

        var panel = append(shell, "div", "", "rte-ai-review-panel");
        panel.setAttribute("role", "complementary");
        panel.setAttribute("aria-label", config.text_aireview || "AI Review");
        panel.setAttribute("aria-keyshortcuts", appendUndoShortcutKeys("Enter Space A R J K Home End"));
        panel.tabIndex = -1;
        editor.__aiReviewPanel = panel;
        editor.__aiReviewPrimaryEmptyAction = null;
        panel.onkeydown = function (e) {
            var key = (e.key || "").toLowerCase();
            var targetTag = e.target && e.target.tagName ? e.target.tagName.toUpperCase() : "";
            if (e.key === "Escape") {
                e.preventDefault();
                closeReviewPanel();
                editor.focus();
                return;
            }
            if (e.ctrlKey || e.metaKey || e.altKey || targetTag === "INPUT" || targetTag === "TEXTAREA" || targetTag === "SELECT" || targetTag === "BUTTON") {
                return;
            }
            if (!getReviewTargetSuggestionId(typeFilter) && editor.__aiReviewMoveEmptyPreviewFocus && (key === "arrowdown" || key === "j" || key === "arrowup" || key === "k" || key === "arrowright" || key === "arrowleft" || key === "home" || key === "end")) {
                e.preventDefault();
                if (key === "arrowdown" || key === "j" || key === "arrowright") {
                    editor.__aiReviewMoveEmptyPreviewFocus("next");
                }
                else if (key === "arrowup" || key === "k" || key === "arrowleft") {
                    editor.__aiReviewMoveEmptyPreviewFocus("previous");
                }
                else if (key === "home") {
                    editor.__aiReviewMoveEmptyPreviewFocus("first");
                }
                else if (key === "end") {
                    editor.__aiReviewMoveEmptyPreviewFocus("last");
                }
            }
            else if (key === "arrowdown" || key === "j") {
                e.preventDefault();
                var nextPanelSuggestionId = getNextPendingSuggestionId(typeFilter, editor.__aiActiveSuggestionId);
                if (nextPanelSuggestionId) {
                    activateReviewSuggestionWithDefaultActionFocus(nextPanelSuggestionId, {
                        focusPanel: true,
                        focusAction: getPreferredReviewActionFocus(panel)
                    });
                }
                else if (editor.__aiActiveSuggestionId) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(editor.__aiActiveSuggestionId, "next"));
                }
            }
            else if (key === "arrowup" || key === "k") {
                e.preventDefault();
                var previousPanelSuggestionId = getPreviousPendingSuggestionId(typeFilter, editor.__aiActiveSuggestionId);
                if (previousPanelSuggestionId) {
                    activateReviewSuggestionWithDefaultActionFocus(previousPanelSuggestionId, {
                        focusPanel: true,
                        focusAction: getPreferredReviewActionFocus(panel)
                    });
                }
                else if (editor.__aiActiveSuggestionId) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(editor.__aiActiveSuggestionId, "previous"));
                }
            }
            else if (key === "home") {
                e.preventDefault();
                var firstPanelSuggestionId = getReviewTargetSuggestionId(typeFilter);
                if (firstPanelSuggestionId && firstPanelSuggestionId !== editor.__aiActiveSuggestionId) {
                    activateReviewSuggestionWithDefaultActionFocus(firstPanelSuggestionId, {
                        focusPanel: true,
                        focusAction: getPreferredReviewActionFocus(panel)
                    });
                }
                else if (editor.__aiActiveSuggestionId) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(editor.__aiActiveSuggestionId, "first"));
                }
            }
            else if (key === "end") {
                e.preventDefault();
                var pendingPanelSuggestions = getFilteredPendingSuggestions(typeFilter);
                var lastPanelSuggestionId = pendingPanelSuggestions.length ? pendingPanelSuggestions[pendingPanelSuggestions.length - 1].id : "";
                if (lastPanelSuggestionId && lastPanelSuggestionId !== editor.__aiActiveSuggestionId) {
                    activateReviewSuggestionWithDefaultActionFocus(lastPanelSuggestionId, {
                        focusPanel: true,
                        focusAction: getPreferredReviewActionFocus(panel)
                    });
                }
                else if (editor.__aiActiveSuggestionId) {
                    announceReviewStatus(buildInlineQueueBoundaryAnnouncement(editor.__aiActiveSuggestionId, "last"));
                }
            }
            else if (key === "enter" || key === " ") {
                e.preventDefault();
                var currentSuggestionId = getReviewTargetSuggestionId(typeFilter);
                if (currentSuggestionId) {
                    focusDefaultReviewCardAction(currentSuggestionId, getPreferredReviewActionFocus(panel));
                }
                else if (editor.__aiReviewPrimaryEmptyAction && editor.__aiReviewPrimaryEmptyAction.isConnected && !editor.__aiReviewPrimaryEmptyAction.disabled) {
                    editor.__aiReviewPrimaryEmptyAction.click();
                }
            }
            else if (key === "a") {
                e.preventDefault();
                runReviewShortcutAction(typeFilter, "accept", { focusAction: getPreferredReviewActionFocus(panel) });
            }
            else if (key === "r") {
                e.preventDefault();
                runReviewShortcutAction(typeFilter, "reject", { focusAction: getPreferredReviewActionFocus(panel) });
            }
            else if (key === "u" && e.shiftKey && redoableReviewDecision) {
                e.preventDefault();
                redoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus(panel) });
            }
            else if (key === "u" && undoableReviewDecision) {
                e.preventDefault();
                undoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus(panel) });
            }
        };

        var header = append(panel, "div", "", "rte-ai-review-header");
        var headerCopy = append(header, "div", "", "rte-ai-review-header-copy");
        var headerEyebrow = append(headerCopy, "div", "", "rte-ai-review-header-eyebrow");
        append(headerEyebrow, "span", "", "rte-ai-review-header-kicker", "Review workspace");
        append(headerEyebrow, "span", "", "rte-ai-review-header-status is-status", getReviewOverviewStatusLabel(counts, filteredPendingCount, typeFilter));
        if (typeFilter !== "all") {
            append(headerEyebrow, "span", "", "rte-ai-review-header-status is-filter", getSuggestionTypeLabel(typeFilter) + " queue");
        }
        if (activityNotice && activityNotice.count) {
            append(headerEyebrow, "span", "", "rte-ai-review-header-status is-remote", activityNotice.count + " shared");
        }
        var titleRow = append(headerCopy, "div", "", "rte-ai-review-title-row");
        var titleIcon = append(titleRow, "span", "", "rte-ai-review-title-icon");
        titleIcon.innerHTML = config.svgCode_aiassist_review || config.svgCode_aiassist || "";
        append(titleRow, "div", "", "rte-ai-review-title", config.text_aireview || "AI Review");
        if (hasRemoteReviewSync()) {
            editor.__aiReviewSyncBadgeNode = append(titleRow, "span", "", "rte-ai-review-sync-badge", "");
        }
        editor.__aiReviewSubtitleNode = append(headerCopy, "div", "", "rte-ai-review-subtitle", getReviewSyncLabel());
        var headerMeta = append(headerCopy, "div", "", "rte-ai-review-header-meta");
        if (activePendingPosition.total && activePendingPosition.index) {
            append(headerMeta, "span", "", "rte-ai-review-header-meta-pill is-current", "Item " + activePendingPosition.index + " of " + activePendingPosition.total);
        }
        if (counts.pending > 0) {
            append(headerMeta, "span", "", "rte-ai-review-header-meta-pill is-pending", (typeFilter !== "all" ? filteredPendingCount : counts.pending) + (typeFilter !== "all" ? " in this view" : " pending now"));
        }
        else if (counts.stale > 0) {
            append(headerMeta, "span", "", "rte-ai-review-header-meta-pill is-stale", counts.stale + " need refresh");
        }
        else {
            append(headerMeta, "span", "", "rte-ai-review-header-meta-pill is-complete", "Queue complete");
        }
        if (typeFilter !== "all" && counts.pending > 0 && filteredPendingCount !== counts.pending) {
            append(headerMeta, "span", "", "rte-ai-review-header-meta-pill is-total", counts.pending + " total pending");
        }
        var headerActions = append(header, "div", "", "rte-ai-review-header-actions");
        var headerGroupContext = null;
        var headerGroupMove = null;
        var headerGroupRecover = null;
        var headerUtility = append(headerActions, "div", "", "rte-ai-review-header-utility");
        if (hasRemoteReviewSync()) {
            headerGroupContext = headerGroupContext || appendReviewHeaderGroup(headerActions, "rte-ai-review-header-group is-context", "Context");
            var syncButton = append(headerGroupContext, "button", "", "secondary rte-ai-review-header-button is-sync", "Sync now");
            syncButton.type = "button";
            syncButton.setAttribute("data-rte-ai-review-focus-key", "sync-now");
            syncButton.onclick = function () {
                refreshRemoteReviewState(true);
            };
            editor.__aiReviewSyncButton = syncButton;
        }
        var latestRemoteSuggestionId = getLatestRemoteSuggestionId();
        if (latestRemoteSuggestionId && findSuggestionById(latestRemoteSuggestionId)) {
            headerGroupContext = headerGroupContext || appendReviewHeaderGroup(headerActions, "rte-ai-review-header-group is-context", "Context");
            var newestSharedButton = append(headerGroupContext, "button", "", "secondary rte-ai-review-header-button is-shared", "Newest shared");
            newestSharedButton.type = "button";
            newestSharedButton.setAttribute("data-rte-ai-review-focus-key", "newest-shared");
            newestSharedButton.setAttribute("aria-label", "Jump to the newest shared AI review update");
            newestSharedButton.onclick = function () {
                locateSuggestion(latestRemoteSuggestionId);
            };
        }
        if (activeFilteredSuggestionId) {
            headerGroupContext = headerGroupContext || appendReviewHeaderGroup(headerActions, "rte-ai-review-header-group is-context", "Context");
            var currentPendingButton = append(headerGroupContext, "button", "", "secondary rte-ai-review-header-button is-locate-current", "Locate current");
            currentPendingButton.type = "button";
            currentPendingButton.setAttribute("data-rte-ai-review-focus-key", "locate-current");
            currentPendingButton.setAttribute("aria-label", "Locate the current active AI review item in the editor");
            currentPendingButton.onclick = function () {
                locateSuggestion(activeFilteredSuggestionId);
            };
        }
        var previousPendingSuggestionId = getPreviousPendingSuggestionId(typeFilter, activeFilteredSuggestionId);
        if (previousPendingSuggestionId) {
            headerGroupMove = headerGroupMove || appendReviewHeaderGroup(headerActions, "rte-ai-review-header-group is-move", "Navigate");
            var previousPendingButton = append(headerGroupMove, "button", "", "secondary rte-ai-review-header-button is-nav", "Previous");
            previousPendingButton.type = "button";
            previousPendingButton.setAttribute("data-rte-ai-review-focus-key", "previous-pending");
            previousPendingButton.setAttribute("aria-label", "Jump to the previous pending AI review item in the current filter");
            previousPendingButton.onclick = function () {
                activateReviewSuggestionWithDefaultActionFocus(previousPendingSuggestionId, { focusPanel: true });
            };
        }
        if (nextPendingSuggestionId) {
            headerGroupMove = headerGroupMove || appendReviewHeaderGroup(headerActions, "rte-ai-review-header-group is-move", "Navigate");
            var nextPendingButton = append(headerGroupMove, "button", "", "secondary rte-ai-review-header-button is-nav", "Next pending");
            nextPendingButton.type = "button";
            nextPendingButton.setAttribute("data-rte-ai-review-focus-key", "next-pending");
            nextPendingButton.setAttribute("aria-label", "Jump to the next pending AI review item in the current filter");
            nextPendingButton.onclick = function () {
                activateReviewSuggestionWithDefaultActionFocus(nextPendingSuggestionId, { focusPanel: true });
            };
        }
        if (undoableReviewDecision) {
            var undoContext = getUndoDecisionContext(undoableReviewDecision);
            headerGroupRecover = headerGroupRecover || appendReviewHeaderGroup(headerActions, "rte-ai-review-header-group is-recover", "Recover");
            var undoButton = append(headerGroupRecover, "button", "", "secondary rte-ai-review-header-button is-undo", undoContext.actionLabel);
            undoButton.type = "button";
            undoButton.setAttribute("data-rte-ai-review-focus-key", "undo-last");
            undoButton.setAttribute("data-rte-ai-review-shortcut-label", undoContext.shortcutLabel);
            undoButton.setAttribute("aria-label", "Undo the " + undoContext.detailLabel + (undoContext.summaryText ? " for \"" + undoContext.summaryText + "\"" : "") + " and reopen it in AI Review");
            undoButton.onclick = function () {
                undoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
            };
        }
        if (redoableReviewDecision) {
            var redoContext = getRedoDecisionContext(redoableReviewDecision);
            headerGroupRecover = headerGroupRecover || appendReviewHeaderGroup(headerActions, "rte-ai-review-header-group is-recover", "Recover");
            var redoButton = append(headerGroupRecover, "button", "", "secondary rte-ai-review-header-button is-redo", redoContext.actionLabel);
            redoButton.type = "button";
            redoButton.setAttribute("data-rte-ai-review-focus-key", "redo-last");
            redoButton.setAttribute("data-rte-ai-review-shortcut-label", redoContext.shortcutLabel);
            redoButton.setAttribute("aria-label", "Redo the " + redoContext.detailLabel + (redoContext.summaryText ? " for \"" + redoContext.summaryText + "\"" : "") + " in AI Review");
            redoButton.onclick = function () {
                redoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
            };
        }
        var closeButton = append(headerUtility, "button", "", "rte-ai-panel-close-button is-review-close");
        closeButton.type = "button";
        closeButton.setAttribute("data-rte-ai-review-focus-key", "close-review");
        closeButton.setAttribute("aria-label", "Close AI review");
        closeButton.title = "Close";
        closeButton.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>';
        closeButton.onclick = function () {
            closeReviewPanel();
        };
        updateReviewSyncUi();

        var overviewSection = append(panel, "div", "", "rte-ai-review-stack rte-ai-review-overview");
        appendPanelSectionLabel(overviewSection, "rte-ai-review-section-label is-overview", "Queue overview");
        var reviewedCount = counts.accepted + counts.rejected + counts.stale;
        var progressPercent = counts.total ? Math.max(0, Math.min(100, Math.round((reviewedCount / counts.total) * 100))) : 0;
        var overviewHero = append(overviewSection, "div", "", "rte-ai-review-overview-hero");
        var overviewStatusRow = append(overviewHero, "div", "", "rte-ai-review-overview-status-row");
        append(overviewStatusRow, "span", "", "rte-ai-review-overview-pill is-status", getReviewOverviewStatusLabel(counts, filteredPendingCount, typeFilter));
        append(overviewStatusRow, "span", "", "rte-ai-review-overview-pill is-progress", reviewedCount + " of " + counts.total + " reviewed");
        if (typeFilter !== "all") {
            append(overviewStatusRow, "span", "", "rte-ai-review-overview-pill is-filter", getSuggestionTypeLabel(typeFilter) + " focus");
        }
        if (activityNotice && activityNotice.count) {
            append(overviewStatusRow, "span", "", "rte-ai-review-overview-pill is-remote", activityNotice.count + " shared");
        }
        append(overviewHero, "div", "", "rte-ai-review-overview-title", getReviewOverviewTitle(counts, filteredPendingCount, typeFilter, activePendingPosition));
        append(overviewHero, "div", "", "rte-ai-review-overview-detail", getReviewOverviewDetail(counts, filteredPendingCount, typeFilter, activityNotice));
        var overviewProgress = append(overviewHero, "div", "", "rte-ai-review-overview-progress");
        var overviewProgressBar = append(overviewProgress, "div", "", "rte-ai-review-overview-progress-bar");
        var overviewProgressFill = append(overviewProgressBar, "span", "", "rte-ai-review-overview-progress-fill");
        overviewProgressFill.style.width = progressPercent + "%";
        append(overviewProgress, "span", "", "rte-ai-review-overview-progress-label", progressPercent + "% complete");
        var summary = append(overviewSection, "div", "", "rte-ai-review-summary");
        append(summary, "span", "", "rte-ai-review-summary-pill is-pending", counts.pending + " pending");
        append(summary, "span", "", "rte-ai-review-summary-pill is-accepted", counts.accepted + " accepted");
        append(summary, "span", "", "rte-ai-review-summary-pill is-rejected", counts.rejected + " rejected");
        if (counts.stale) {
            append(summary, "span", "", "rte-ai-review-summary-pill is-stale", counts.stale + " stale");
        }
        if (activePendingPosition.total && activePendingPosition.index) {
            append(summary, "span", "", "rte-ai-review-summary-pill is-current", "Item " + activePendingPosition.index + " of " + activePendingPosition.total);
        }
        if (typeFilter !== "all") {
            append(summary, "span", "", "rte-ai-review-summary-pill is-filtered", getSuggestionTypeLabel(typeFilter) + " filter - " + filteredPendingCount + " pending");
        }
        if (activityNotice) {
            append(summary, "span", "", "rte-ai-review-summary-pill is-remote", activityNotice.count + " new shared");
        }
        var redoDecisionSummaryText = buildRedoDecisionSummaryText(redoableReviewDecision);
        if (redoDecisionSummaryText) {
            var redoSummaryContext = getRedoDecisionContext(redoableReviewDecision);
            append(overviewSection, "div", "", "rte-ai-review-summary-detail is-redo", redoDecisionSummaryText + " Press Shift+U to " + redoSummaryContext.shortcutLabel + ".");
            var redoHistoryItems = getRedoDecisionHistorySummaries(2);
            if (redoHistoryItems.length) {
                var redoHistoryList = append(overviewSection, "div", "", "rte-ai-review-summary-history is-redo");
                append(redoHistoryList, "div", "", "rte-ai-review-summary-history-title", "Then");
                for (var redoHistoryIndex = 0; redoHistoryIndex < redoHistoryItems.length; redoHistoryIndex++) {
                    var redoHistoryItem = redoHistoryItems[redoHistoryIndex];
                    var redoHistoryRow = append(redoHistoryList, "div", "", "rte-ai-review-summary-history-item");
                    append(redoHistoryRow, "div", "", "rte-ai-review-summary-history-label", redoHistoryItem.label);
                    append(redoHistoryRow, "div", "", "rte-ai-review-summary-history-detail", redoHistoryItem.detail);
                }
            }
        }

        if (activityNotice) {
            var activityCard = append(overviewSection, "div", "", "rte-ai-review-activity-card");
            var activityCopy = append(activityCard, "div", "", "rte-ai-review-activity-copy");
            append(activityCopy, "div", "", "rte-ai-review-activity-title", activityNotice.title);
            append(activityCopy, "div", "", "rte-ai-review-activity-detail", activityNotice.detail);
            var dismissActivityButton = append(activityCard, "button", "", "secondary rte-ai-review-activity-button", "Got it");
            dismissActivityButton.type = "button";
            dismissActivityButton.setAttribute("data-rte-ai-review-focus-key", "dismiss-activity");
            dismissActivityButton.setAttribute("aria-label", "Dismiss shared AI review update notice");
            dismissActivityButton.onclick = function () {
                markReviewActivitySeen();
                renderReviewPanel(true);
            };
        }

        var navigationSection = append(panel, "div", "", "rte-ai-review-stack rte-ai-review-navigation");
        appendPanelSectionLabel(navigationSection, "rte-ai-review-section-label is-controls", "Filter and batch");
        var controls = append(navigationSection, "div", "", "rte-ai-review-controls");
        var scopeControls = null;
        if (typeOptions.length > 1) {
            scopeControls = appendReviewControlGroup(controls, "rte-ai-review-control-group is-scope", "Queue scope");
            var typeFilterSelect = append(scopeControls, "select", "", "rte-ai-review-filter-select");
            typeFilterSelect.setAttribute("data-rte-ai-review-focus-key", "type-filter");
            for (var optionIndex = 0; optionIndex < typeOptions.length; optionIndex++) {
                var typeOption = append(typeFilterSelect, "option", "", "", typeOptions[optionIndex].label);
                typeOption.value = typeOptions[optionIndex].value;
            }
            typeFilterSelect.value = typeFilter;
            typeFilterSelect.onchange = function () {
                reviewState.typeFilter = typeFilterSelect.value || "all";
                renderReviewPanel(true);
            };
        }
        var visibilityControls = appendReviewControlGroup(controls, "rte-ai-review-control-group is-visibility", "Visibility");
        var filterButton = append(visibilityControls, "button", "", "secondary rte-ai-review-control-button is-toggle-resolved", showResolved ? "Pending only" : "Show resolved");
        filterButton.type = "button";
        filterButton.setAttribute("data-rte-ai-review-focus-key", "toggle-resolved");
        filterButton.onclick = function () {
            reviewState.showResolved = !showResolved;
            renderReviewPanel(true);
        };
        var batchControls = appendReviewControlGroup(controls, "rte-ai-review-control-group is-batch", "Batch review");
        var acceptAllButton = append(batchControls, "button", "", "secondary rte-ai-review-control-button is-accept-batch", "Accept all");
        acceptAllButton.type = "button";
        acceptAllButton.setAttribute("data-rte-ai-review-focus-key", "accept-all");
        acceptAllButton.disabled = typeFilter === "all" ? !counts.pending : !filteredPendingCount;
        if (typeFilter !== "all") {
            acceptAllButton.innerText = "Accept filtered";
        }
        acceptAllButton.onclick = function () {
            if (acceptPendingSuggestionsByType(typeFilter)) {
                renderReviewPanel(true);
            }
        };
        var rejectAllButton = append(batchControls, "button", "", "secondary rte-ai-review-control-button is-reject-batch", "Reject all");
        rejectAllButton.type = "button";
        rejectAllButton.setAttribute("data-rte-ai-review-focus-key", "reject-all");
        rejectAllButton.disabled = typeFilter === "all" ? !counts.pending : !filteredPendingCount;
        if (typeFilter !== "all") {
            rejectAllButton.innerText = "Reject filtered";
        }
        rejectAllButton.onclick = function () {
            if (rejectPendingSuggestionsByType(typeFilter)) {
                renderReviewPanel(true);
            }
        };

        if (typeOptions.length > 1) {
            var quickFilters = append(scopeControls || controls, "div", "", "rte-ai-review-type-chips");
            for (var chipIndex = 0; chipIndex < typeOptions.length; chipIndex++) {
                var chipOption = typeOptions[chipIndex];
                var chipCount = pendingCountsByType[chipOption.value] || 0;
                if (chipOption.value !== "all" && chipCount === 0 && chipOption.value !== typeFilter) {
                    continue;
                }
                var chipLabel = chipOption.label + " (" + chipCount + ")";
                var chipButton = append(quickFilters, "button", "", "rte-ai-review-type-chip" + (chipOption.value === typeFilter ? " is-active" : ""), chipLabel);
                chipButton.type = "button";
                chipButton.setAttribute("data-rte-ai-review-focus-key", "type-chip-" + chipOption.value);
                chipButton.setAttribute("aria-pressed", chipOption.value === typeFilter ? "true" : "false");
                chipButton.onclick = (function (value) {
                    return function () {
                        reviewState.typeFilter = value;
                        renderReviewPanel(true);
                    };
                })(chipOption.value);
            }
        }

        appendPanelSectionLabel(navigationSection, "rte-ai-review-section-label is-shortcuts", "Keyboard lane");
        var shortcutsNode = append(navigationSection, "div", "", "rte-ai-review-shortcuts", "");
        shortcutsNode.id = getReviewShortcutDisplayId();
        editor.__aiReviewShortcutDisplayNode = shortcutsNode;
        panel.onfocus = function () {
            linkReviewShortcutDisplayTarget(panel);
            panel.title = getReviewPanelShortcutTitle(findSuggestionById(getReviewTargetSuggestionId(typeFilter)), getPreferredReviewActionFocus(panel));
            updateReviewPanelShortcutDisplay(findSuggestionById(getReviewTargetSuggestionId(typeFilter)), getPreferredReviewActionFocus(panel));
        };
        if (panel.querySelectorAll) {
            var reviewFocusControls = panel.querySelectorAll("[data-rte-ai-review-focus-key]");
            for (var reviewFocusIndex = 0; reviewFocusIndex < reviewFocusControls.length; reviewFocusIndex++) {
                bindReviewControlShortcutFocus(reviewFocusControls[reviewFocusIndex], typeFilter);
            }
        }
        if (requestedReviewActionFocus || preserveActiveReviewAction) {
            updateReviewShortcutDisplay(requestedReviewActionFocus || preserveActiveReviewAction);
        }
        else if (activeFilteredSuggestionId) {
            updateReviewCardShortcutDisplay(findSuggestionById(activeFilteredSuggestionId));
        }
        else {
            panel.title = getReviewPanelShortcutTitle(findSuggestionById(getReviewTargetSuggestionId(typeFilter)), getPreferredReviewActionFocus(panel));
            updateReviewPanelShortcutDisplay(findSuggestionById(getReviewTargetSuggestionId(typeFilter)), getPreferredReviewActionFocus(panel));
        }

        var contentSection = append(panel, "div", "", "rte-ai-review-stack rte-ai-review-content");
        appendPanelSectionLabel(contentSection, "rte-ai-review-section-label is-feed", visible.length ? "Review items" : "Recovery and next queues");
        var feed = append(contentSection, "div", "", "rte-ai-review-feed");
        if (!visible.length) {
            var emptyState = buildReviewEmptyState(counts, filteredPendingCount, typeFilter, showResolved, nextOverallPendingId, pendingCountsByType, typeOptions);
            var primaryEmptyActionLabel = "";
            var emptyHintNode = null;
            var emptyPreviewButtons = [];
            function getEmptyPrimaryActionLabel(node, fallbackLabel) {
                var parts = [fallbackLabel || ""];
                if (node && node.getAttribute) {
                    var focusLabel = node.getAttribute("data-rte-ai-empty-focus-label") || "";
                    var changeLabel = node.getAttribute("data-rte-ai-preview-change-label") || "";
                    var impactLabel = node.getAttribute("data-rte-ai-preview-impact-label") || "";
                    if (focusLabel) {
                        parts.push("focus " + focusLabel);
                    }
                    if (changeLabel) {
                        parts.push(changeLabel);
                    }
                    if (impactLabel) {
                        parts.push(impactLabel);
                    }
                }
                return parts.filter(function (part) {
                    return !!part;
                }).join(", ");
            }
            function getEmptyPreviewPosition(node) {
                var total = emptyPreviewButtons.length;
                if (!node || !total) {
                    return { index: 0, total: total };
                }
                for (var positionIndex = 0; positionIndex < total; positionIndex++) {
                    if (emptyPreviewButtons[positionIndex] === node) {
                        return { index: positionIndex + 1, total: total };
                    }
                }
                return { index: 0, total: total };
            }
            function updateEmptyStateGuidance(label) {
                var hasQueueSwitcher = emptyPreviewButtons.length > 1;
                if (emptyHintNode) {
                    emptyHintNode.innerText = buildReviewEmptyHintText(label, hasQueueSwitcher);
                }
                setReviewShortcutDisplay(buildReviewEmptyShortcutText(label, { queueSwitcher: hasQueueSwitcher }), "");
            }
            function getEmptyActionGroupInfo(action) {
                var actionId = action && action.id ? action.id : "";
                if (actionId === "go-type" || actionId === "next-overall" || actionId === "all-types") {
                    return { key: "queue", label: "Next queues" };
                }
                if (actionId === "undo-last") {
                    return { key: "recovery", label: "Recover" };
                }
                return { key: "utility", label: "More" };
            }
            function setPrimaryEmptyTarget(node, label, options) {
                options = options || {};
                for (var previewCleanupIndex = 0; previewCleanupIndex < emptyPreviewButtons.length; previewCleanupIndex++) {
                    var previewButton = emptyPreviewButtons[previewCleanupIndex];
                    previewButton.removeAttribute("data-rte-ai-primary-empty");
                    previewButton.removeAttribute("aria-current");
                    previewButton.setAttribute("aria-pressed", "false");
                    previewButton.tabIndex = -1;
                    if (previewButton.classList && previewButton.classList.contains("is-primary-target")) {
                        previewButton.classList.remove("is-primary-target");
                    }
                    if (previewButton.__aiCurrentBadge && previewButton.__aiCurrentBadge.parentNode) {
                        previewButton.__aiCurrentBadge.parentNode.removeChild(previewButton.__aiCurrentBadge);
                    }
                    previewButton.__aiCurrentBadge = null;
                    if (previewButton.__aiQueueBadge && previewButton.__aiQueueBadge.parentNode) {
                        previewButton.__aiQueueBadge.parentNode.removeChild(previewButton.__aiQueueBadge);
                    }
                    previewButton.__aiQueueBadge = null;
                }
                if (editor.__aiReviewPrimaryEmptyAction && editor.__aiReviewPrimaryEmptyAction !== node) {
                    editor.__aiReviewPrimaryEmptyAction.removeAttribute("data-rte-ai-primary-empty");
                    if (editor.__aiReviewPrimaryEmptyAction.classList && editor.__aiReviewPrimaryEmptyAction.classList.contains("is-primary-target")) {
                        editor.__aiReviewPrimaryEmptyAction.classList.remove("is-primary-target");
                    }
                }
                editor.__aiReviewPrimaryEmptyAction = node || null;
                if (node) {
                    node.setAttribute("data-rte-ai-primary-empty", "true");
                    node.setAttribute("aria-pressed", "true");
                    node.tabIndex = 0;
                    if (node.classList && node.classList.contains("rte-ai-review-empty-preview")) {
                        node.classList.add("is-primary-target");
                        node.setAttribute("aria-current", "true");
                        var currentBadgeHost = node.__aiPreviewMetaNode || (node.querySelector ? node.querySelector(".rte-ai-review-empty-preview-meta") : null);
                        if (currentBadgeHost) {
                            node.__aiCurrentBadge = append(currentBadgeHost, "span", "", "rte-ai-review-empty-preview-pill is-current", "Current");
                            var queuePosition = getEmptyPreviewPosition(node);
                            if (queuePosition.total > 1) {
                                node.__aiQueueBadge = append(currentBadgeHost, "span", "", "rte-ai-review-empty-preview-pill is-queue", "Queue " + queuePosition.index + " of " + queuePosition.total);
                            }
                        }
                    }
                }
                var previousLabel = primaryEmptyActionLabel;
                primaryEmptyActionLabel = getEmptyPrimaryActionLabel(node, label || "");
                if (node && node.getAttribute) {
                    previewReviewEmptySuggestionTarget(node.getAttribute("data-rte-ai-preview-suggestion-id") || "");
                }
                updateEmptyStateGuidance(primaryEmptyActionLabel);
                if (options.announce && primaryEmptyActionLabel && primaryEmptyActionLabel !== previousLabel) {
                    announceReviewStatus("Completion handoff moved to " + primaryEmptyActionLabel + ".");
                }
            }
            function moveEmptyPreviewFocus(direction) {
                if (emptyPreviewButtons.length < 2) {
                    return false;
                }
                var currentIndex = 0;
                for (var previewButtonIndex = 0; previewButtonIndex < emptyPreviewButtons.length; previewButtonIndex++) {
                    if (emptyPreviewButtons[previewButtonIndex] === document.activeElement || emptyPreviewButtons[previewButtonIndex] === editor.__aiReviewPrimaryEmptyAction) {
                        currentIndex = previewButtonIndex;
                        break;
                    }
                }
                var nextIndex = currentIndex;
                if (direction === "next") {
                    nextIndex = Math.min(emptyPreviewButtons.length - 1, currentIndex + 1);
                }
                else if (direction === "previous") {
                    nextIndex = Math.max(0, currentIndex - 1);
                }
                else if (direction === "first") {
                    nextIndex = 0;
                }
                else if (direction === "last") {
                    nextIndex = emptyPreviewButtons.length - 1;
                }
                if (nextIndex === currentIndex || !emptyPreviewButtons[nextIndex]) {
                    if (direction === "next" || direction === "last") {
                        announceReviewStatus("Already at the last available completion queue.");
                    }
                    else if (direction === "previous" || direction === "first") {
                        announceReviewStatus("Already at the first available completion queue.");
                    }
                    return false;
                }
                emptyPreviewButtons[nextIndex].focus();
                return true;
            }
            editor.__aiReviewMoveEmptyPreviewFocus = moveEmptyPreviewFocus;
            function handleEmptyStateAction(action) {
                if (!action) {
                    return;
                }
                if (action.id === "show-resolved") {
                    reviewState.showResolved = true;
                    renderReviewPanel(true);
                }
                else if (action.id === "go-type") {
                    reviewState.typeFilter = action.typeValue || "all";
                    var firstSuggestionId = action.suggestionId || getNextPendingSuggestionId(reviewState.typeFilter, "");
                    if (firstSuggestionId) {
                        activateReviewSuggestionWithDefaultActionFocus(firstSuggestionId, {
                            focusPanel: true,
                            focusAction: action.focusAction || getPreferredReviewActionFocus(),
                            openedQueue: true
                        });
                    }
                    else {
                        renderReviewPanel(true);
                    }
                }
                else if (action.id === "next-overall") {
                    reviewState.typeFilter = "all";
                    if (action.suggestionId) {
                        activateReviewSuggestionWithDefaultActionFocus(action.suggestionId, {
                            focusPanel: true,
                            focusAction: action.focusAction || getPreferredReviewActionFocus(),
                            openedQueue: true
                        });
                    }
                    else {
                        renderReviewPanel(true);
                    }
                }
                else if (action.id === "all-types") {
                    reviewState.typeFilter = "all";
                    renderReviewPanel(true);
                }
                else if (action.id === "undo-last") {
                    undoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
                }
                else if (action.id === "open-chat") {
                    openChatPanel({ focusComposer: true });
                }
            }
            var emptyAnnouncementKey = emptyState.title + "|" + emptyState.detail + "|" + emptyState.actions.map(function (action) {
                return action ? action.label : "";
            }).join("|");
            if (emptyState.announceMessage && editor.__aiLastReviewEmptyAnnouncement !== emptyAnnouncementKey) {
                announceReviewStatus(emptyState.announceMessage);
                editor.__aiLastReviewEmptyAnnouncement = emptyAnnouncementKey;
            }
            var emptyCard = append(feed, "div", "", "rte-ai-review-empty");
            var undoDecisionSummaryText = buildUndoDecisionSummaryText(undoableReviewDecision);
            var hasQueuePreviews = !!(emptyState.previewItems && emptyState.previewItems.length);
            var hasRecoveryState = !!undoDecisionSummaryText;
            emptyCard.classList.toggle("is-queue-complete", hasQueuePreviews);
            emptyCard.classList.toggle("is-recoverable", hasRecoveryState);
            var emptyHero = append(emptyCard, "div", "", "rte-ai-review-empty-hero");
            var emptyStatusRow = append(emptyHero, "div", "", "rte-ai-review-empty-status-row");
            append(emptyStatusRow, "span", "", "rte-ai-review-empty-status-pill " + (hasQueuePreviews ? "is-ready" : (hasRecoveryState ? "is-recovery" : "is-clear")), hasQueuePreviews ? "Queue complete" : (hasRecoveryState ? "Recovery available" : "All clear"));
            if (hasQueuePreviews) {
                append(emptyStatusRow, "span", "", "rte-ai-review-empty-status-pill is-count", emptyState.previewItems.length === 1 ? "1 next queue" : (emptyState.previewItems.length + " next queues"));
            }
            append(emptyHero, "div", "", "rte-ai-review-empty-title", emptyState.title);
            append(emptyHero, "div", "", "rte-ai-review-empty-detail", emptyState.detail);
            emptyHintNode = append(emptyHero, "div", "", "rte-ai-review-empty-hint", "");
            if (undoDecisionSummaryText) {
                var recoverySection = append(emptyCard, "div", "", "rte-ai-review-empty-zone is-recovery");
                appendPanelSectionLabel(recoverySection, "rte-ai-review-section-label is-recovery", "Recovery");
                append(recoverySection, "div", "", "rte-ai-review-empty-detail rte-ai-review-empty-undo-detail", undoDecisionSummaryText);
                var undoHistoryItems = getUndoDecisionHistorySummaries(3);
                if (undoHistoryItems.length) {
                    var undoHistoryList = append(recoverySection, "div", "", "rte-ai-review-empty-undo-history");
                    append(undoHistoryList, "div", "", "rte-ai-review-empty-undo-history-title", "Then");
                    for (var undoHistoryIndex = 0; undoHistoryIndex < undoHistoryItems.length; undoHistoryIndex++) {
                        var undoHistoryItem = undoHistoryItems[undoHistoryIndex];
                        var undoHistoryRow = append(undoHistoryList, "div", "", "rte-ai-review-empty-undo-history-item");
                        append(undoHistoryRow, "div", "", "rte-ai-review-empty-undo-history-label", undoHistoryItem.label);
                        append(undoHistoryRow, "div", "", "rte-ai-review-empty-undo-history-detail", undoHistoryItem.detail);
                    }
                }
            }
            if (emptyState.previewItems && emptyState.previewItems.length) {
                var previewSection = append(emptyCard, "div", "", "rte-ai-review-empty-zone is-next");
                appendPanelSectionLabel(previewSection, "rte-ai-review-section-label is-feed", emptyState.previewItems.length > 1 ? "Next queues" : "Next queue");
                var emptyPreviewList = append(previewSection, "div", "", "rte-ai-review-empty-previews");
                emptyPreviewList.setAttribute("role", "toolbar");
                emptyPreviewList.setAttribute("aria-label", "Next review queues");
                for (var previewIndex = 0; previewIndex < emptyState.previewItems.length; previewIndex++) {
                    var previewItem = emptyState.previewItems[previewIndex];
                    var previewTag = previewItem.typeValue ? "button" : "div";
                    var previewRow = append(emptyPreviewList, previewTag, "", "rte-ai-review-empty-preview" + (previewItem.typeValue ? " is-actionable" : ""));
                    if (previewTag === "button") {
                        previewRow.type = "button";
                        previewRow.tabIndex = -1;
                        previewRow.setAttribute("aria-pressed", "false");
                        previewRow.setAttribute("aria-setsize", String(emptyState.previewItems.length));
                        previewRow.setAttribute("aria-posinset", String(previewIndex + 1));
                        previewRow.setAttribute("aria-keyshortcuts", getReviewEmptyControlShortcutKeys({
                            queueSwitcher: emptyState.previewItems.length > 1
                        }));
                        previewRow.title = getReviewEmptyControlShortcutTitle(previewItem.actionLabel || previewItem.label || "Open next queue", {
                            focusLabel: previewItem.focusActionLabel,
                            queueSwitcher: emptyState.previewItems.length > 1
                        });
                        var previewAriaParts = [previewItem.actionLabel || previewItem.label || "Open next queue"];
                        if (previewItem.focusActionLabel) {
                            previewAriaParts.push("Focus " + previewItem.focusActionLabel);
                        }
                        if (previewItem.pendingCountLabel) {
                            previewAriaParts.push(previewItem.pendingCountLabel);
                        }
                        if (previewItem.changeLabel) {
                            previewAriaParts.push(previewItem.changeLabel);
                        }
                        if (previewItem.impactLabel) {
                            previewAriaParts.push(previewItem.impactLabel);
                        }
                        if (previewItem.scopeLabel) {
                            previewAriaParts.push(previewItem.scopeLabel);
                        }
                        if (previewItem.languageLabel) {
                            previewAriaParts.push(previewItem.languageLabel);
                        }
                        if (previewItem.text) {
                            previewAriaParts.push("Current: " + previewItem.text);
                        }
                        if (previewItem.resultText) {
                            previewAriaParts.push("Suggested: " + previewItem.resultText);
                        }
                        if (previewItem.reasonText) {
                            previewAriaParts.push("Why this next: " + previewItem.reasonText);
                        }
                        previewRow.setAttribute("aria-label", previewAriaParts.join(". "));
                        previewRow.setAttribute("data-rte-ai-primary-label", previewItem.actionLabel || previewItem.label || "Open next queue");
                        if (previewItem.focusActionLabel) {
                            previewRow.setAttribute("data-rte-ai-empty-focus-label", previewItem.focusActionLabel);
                        }
                        if (previewItem.changeLabel) {
                            previewRow.setAttribute("data-rte-ai-preview-change-label", previewItem.changeLabel);
                        }
                        if (previewItem.impactLabel) {
                            previewRow.setAttribute("data-rte-ai-preview-impact-label", previewItem.impactLabel);
                        }
                        if (previewItem.suggestionId) {
                            previewRow.setAttribute("data-rte-ai-preview-suggestion-id", previewItem.suggestionId);
                        }
                        previewRow.onclick = (function (item) {
                            return function () {
                                handleEmptyStateAction({
                                    id: "go-type",
                                    typeValue: item.typeValue,
                                    suggestionId: item.suggestionId,
                                    focusAction: item.focusAction || ""
                                });
                            };
                        })(previewItem);
                        previewRow.onfocus = function () {
                            linkReviewShortcutDisplayTarget(this);
                            setPrimaryEmptyTarget(this, this.getAttribute("data-rte-ai-primary-label") || this.innerText || "", {
                                announce: emptyPreviewButtons.length > 1
                            });
                        };
                        previewRow.onkeydown = function (e) {
                            var previewKey = (e.key || "").toLowerCase();
                            if (previewKey === "u" && e.shiftKey && hasRedoableReviewShortcut()) {
                                e.preventDefault();
                                e.stopPropagation();
                                redoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
                            }
                            else if (previewKey === "u" && hasUndoableReviewShortcut()) {
                                e.preventDefault();
                                e.stopPropagation();
                                undoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
                            }
                            else if (e.key === "ArrowRight" || e.key === "ArrowDown" || previewKey === "j") {
                                e.preventDefault();
                                moveEmptyPreviewFocus("next");
                            }
                            else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || previewKey === "k") {
                                e.preventDefault();
                                moveEmptyPreviewFocus("previous");
                            }
                            else if (e.key === "Home") {
                                e.preventDefault();
                                moveEmptyPreviewFocus("first");
                            }
                            else if (e.key === "End") {
                                e.preventDefault();
                                moveEmptyPreviewFocus("last");
                            }
                        };
                        emptyPreviewButtons.push(previewRow);
                        if (!editor.__aiReviewPrimaryEmptyAction) {
                            setPrimaryEmptyTarget(previewRow, previewItem.actionLabel || previewItem.label || "");
                        }
                    }
                    append(previewRow, "div", "", "rte-ai-review-empty-preview-label", previewItem.label || "Next queue");
                    var previewMeta = append(previewRow, "div", "", "rte-ai-review-empty-preview-meta");
                    previewRow.__aiPreviewMetaNode = previewMeta;
                    if (previewItem.pendingCountLabel) {
                        append(previewMeta, "span", "", "rte-ai-review-empty-preview-pill", previewItem.pendingCountLabel);
                    }
                    if (previewItem.focusActionLabel) {
                        append(previewMeta, "span", "", "rte-ai-review-empty-preview-pill is-focus", "Focus " + previewItem.focusActionLabel);
                    }
                    if (previewItem.changeLabel) {
                        append(previewMeta, "span", "", "rte-ai-review-empty-preview-pill is-change", previewItem.changeLabel);
                    }
                    if (previewItem.impactLabel) {
                        append(previewMeta, "span", "", "rte-ai-review-empty-preview-pill is-impact", previewItem.impactLabel);
                    }
                    if (previewItem.scopeLabel) {
                        append(previewMeta, "span", "", "rte-ai-review-empty-preview-pill", previewItem.scopeLabel);
                    }
                    if (previewItem.languageLabel) {
                        append(previewMeta, "span", "", "rte-ai-review-empty-preview-pill", previewItem.languageLabel);
                    }
                    var previewDiffParts = buildCompletionPreviewDiffParts(previewItem.text, previewItem.resultText);
                    appendCompletionPreviewLine(previewRow, "current", previewItem.text || "", previewDiffParts);
                    if (previewItem.resultText) {
                        appendCompletionPreviewLine(previewRow, "result", previewItem.resultText, previewDiffParts);
                    }
                    if (previewItem.reasonText) {
                        append(previewRow, "div", "", "rte-ai-review-empty-preview-reason", "Why this next: " + previewItem.reasonText);
                    }
                }
            }
            var emptyActions = [];
            for (var emptyActionIndex = 0; emptyActionIndex < emptyState.actions.length; emptyActionIndex++) {
                if (emptyState.actions[emptyActionIndex]) {
                    emptyActions.push(emptyState.actions[emptyActionIndex]);
                }
            }
            if (emptyActions.length) {
                var actionSection = append(emptyCard, "div", "", "rte-ai-review-empty-zone is-actions");
                appendPanelSectionLabel(actionSection, "rte-ai-review-section-label is-controls", "Actions");
                var emptyActionsRow = append(actionSection, "div", "", "rte-ai-review-empty-actions");
                var emptyActionGroups = {};
                for (var emptyButtonIndex = 0; emptyButtonIndex < emptyActions.length; emptyButtonIndex++) {
                    (function (action) {
                        var actionGroupInfo = getEmptyActionGroupInfo(action);
                        if (!emptyActionGroups[actionGroupInfo.key]) {
                            emptyActionGroups[actionGroupInfo.key] = append(emptyActionsRow, "div", "", "rte-ai-review-empty-action-group is-" + actionGroupInfo.key);
                            emptyActionGroups[actionGroupInfo.key].setAttribute("data-rte-ai-empty-group-label", actionGroupInfo.label);
                        }
                        var isPrimaryEmptyAction = emptyButtonIndex === 0;
                        var button = append(emptyActionGroups[actionGroupInfo.key], "button", "", (isPrimaryEmptyAction && !editor.__aiReviewPrimaryEmptyAction ? "rte-ai-review-control-button is-primary" : "secondary rte-ai-review-control-button"), "");
                        append(button, "span", "", "rte-ai-review-empty-action-label", action.label);
                        if (action.focusActionLabel) {
                            append(button, "span", "", "rte-ai-review-empty-action-pill is-focus", "Focus " + action.focusActionLabel);
                        }
                        button.type = "button";
                        if (action.id) {
                            button.setAttribute("data-rte-ai-empty-action-id", action.id);
                        }
                        button.setAttribute("aria-keyshortcuts", getReviewEmptyControlShortcutKeys());
                        button.title = getReviewEmptyControlShortcutTitle(action.label || "", {
                            focusLabel: action.focusActionLabel
                        });
                        if (action.focusActionLabel) {
                            button.setAttribute("data-rte-ai-empty-focus-label", action.focusActionLabel);
                        }
                        if (action.suggestionId) {
                            button.setAttribute("data-rte-ai-preview-suggestion-id", action.suggestionId);
                        }
                        if (isPrimaryEmptyAction) {
                            button.setAttribute("data-rte-ai-primary-button", "true");
                        }
                        if (isPrimaryEmptyAction && !editor.__aiReviewPrimaryEmptyAction) {
                            setPrimaryEmptyTarget(button, action.label || "");
                        }
                        button.onfocus = function () {
                            linkReviewShortcutDisplayTarget(button);
                            if (action.id === "go-type" || action.id === "next-overall") {
                                previewReviewEmptySuggestionTarget(action.suggestionId || "");
                            }
                            updateEmptyStateGuidance(getEmptyPrimaryActionLabel(button, action.label || ""));
                        };
                        button.onkeydown = function (e) {
                            if ((e.key || "").toLowerCase() === "u" && e.shiftKey && hasRedoableReviewShortcut()) {
                                e.preventDefault();
                                e.stopPropagation();
                                redoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
                            }
                            else if ((e.key || "").toLowerCase() === "u" && hasUndoableReviewShortcut()) {
                                e.preventDefault();
                                e.stopPropagation();
                                undoLastReviewDecision({ focusPanel: true, focusAction: getPreferredReviewActionFocus() });
                            }
                        };
                        button.onclick = function () {
                            handleEmptyStateAction(action);
                        };
                    })(emptyActions[emptyButtonIndex]);
                }
            }
            var emptyHintLabel = primaryEmptyActionLabel || (emptyActions[0] ? emptyActions[0].label : "");
            updateEmptyStateGuidance(emptyHintLabel);
        }
        else {
            editor.__aiLastReviewEmptyAnnouncement = "";
            editor.__aiReviewPrimaryEmptyAction = null;
            editor.__aiReviewMoveEmptyPreviewFocus = null;
        }

        var lastReviewFeedSectionKey = "";
        for (var s = 0; s < visible.length; s++) {
            (function (suggestion) {
                var isQueueOpenedItem = editor.__aiRecentlyOpenedQueueSuggestionId === suggestion.id;
                var queuePositionData = buildReviewQueuePositionData(visible, editor.__aiActiveSuggestionId, suggestion);
                var feedSectionData = buildReviewFeedSectionData(visible, editor.__aiActiveSuggestionId, suggestion, queuePositionData);
                if (feedSectionData && feedSectionData.key !== lastReviewFeedSectionKey) {
                    var feedSection = append(feed, "div", "", "rte-ai-review-feed-section is-" + feedSectionData.key);
                    var feedSectionMeta = append(feedSection, "div", "", "rte-ai-review-feed-section-meta");
                    var feedSectionTitle = append(feedSectionMeta, "div", "", "rte-ai-review-feed-section-title", feedSectionData.label);
                    feedSectionTitle.setAttribute("role", "heading");
                    feedSectionTitle.setAttribute("aria-level", "3");
                    if (feedSectionData.countLabel) {
                        append(feedSectionMeta, "span", "", "rte-ai-review-feed-section-pill", feedSectionData.countLabel);
                    }
                    if (feedSectionData.detail) {
                        append(feedSection, "div", "", "rte-ai-review-feed-section-detail", feedSectionData.detail);
                    }
                    lastReviewFeedSectionKey = feedSectionData.key;
                }
                var queueTransitionData = buildReviewQueueTransitionData(visible, editor.__aiActiveSuggestionId, suggestion);
                var isActiveReviewItem = editor.__aiActiveSuggestionId === suggestion.id;
                var isCondensedReviewItem = !isActiveReviewItem && !isQueueOpenedItem;
                var item = append(feed, "div", "", "rte-ai-review-item is-" + suggestion.status + (isActiveReviewItem ? " is-active" : "") + (isQueueOpenedItem ? " is-opened" : "") + (isCondensedReviewItem ? " is-condensed" : ""));
                item.setAttribute("data-rte-ai-review-id", suggestion.id);
                item.setAttribute("data-rte-ai-review-density", isCondensedReviewItem ? "condensed" : "expanded");
                if (queuePositionData && queuePositionData.role) {
                    item.setAttribute("data-rte-ai-review-queue-role", queuePositionData.role);
                }
                item.setAttribute("role", "button");
                item.tabIndex = editor.__aiActiveSuggestionId === suggestion.id ? 0 : -1;
                item.setAttribute("aria-keyshortcuts", appendUndoShortcutKeys(suggestion.status === "pending" ? "Enter Space A R J K Home End" : "Enter Space J K Home End"));
                item.title = getReviewCardShortcutTitle(suggestion, getPreferredReviewActionFocus(panel));
                var sharedUpdateCount = getSuggestionRemoteUpdateCount(suggestion.id);
                if (editor.__aiActiveSuggestionId === suggestion.id) {
                    item.setAttribute("aria-current", "true");
                }
                item.onclick = function (e) {
                    if (e && e.target && e.target.closest && e.target.closest(".rte-ai-review-item-actions")) {
                        return;
                    }
                    var preferredAction = getPreferredReviewActionFocus(panel);
                    var currentFocus = document.activeElement;
                    if (currentFocus && currentFocus.getAttribute && panel.contains(currentFocus)) {
                        preferredAction = currentFocus.getAttribute("data-rte-ai-review-action") || preferredAction;
                    }
                    if (focusDefaultReviewCardAction(suggestion.id, preferredAction)) {
                        return;
                    }
                    activateReviewSuggestion(suggestion.id, { focusPanel: true });
                };
                item.onfocus = function () {
                    linkReviewShortcutDisplayTarget(item);
                    item.title = getReviewCardShortcutTitle(suggestion, getPreferredReviewActionFocus(panel));
                    updateReviewCardShortcutDisplay(suggestion);
                    if (isCondensedReviewItem) {
                        updateReviewCondensedPreviewOpenHint(item, suggestion, panel);
                    }
                };
                var stateCard = append(item, "div", "", "rte-ai-review-item-state is-" + suggestion.status + (isActiveReviewItem ? " is-current" : "") + (isQueueOpenedItem ? " is-opened" : ""));
                append(stateCard, "div", "", "rte-ai-review-item-state-kicker", suggestion.status === "pending" ? "Review item" : "Review history");
                append(stateCard, "div", "", "rte-ai-review-item-state-title", getReviewItemStateTitle(suggestion, isActiveReviewItem, isQueueOpenedItem));
                append(stateCard, "div", "", "rte-ai-review-item-state-detail", getReviewItemStateDetail(suggestion, isActiveReviewItem, isQueueOpenedItem, sharedUpdateCount));
                if (queuePositionData) {
                    var queueCard = append(item, "div", "", "rte-ai-review-item-queue-card is-" + queuePositionData.role);
                    append(queueCard, "div", "", "rte-ai-review-item-queue-title", queuePositionData.roleLabel);
                    var queueMeta = append(queueCard, "div", "", "rte-ai-review-item-queue-meta");
                    append(queueMeta, "span", "", "rte-ai-review-item-queue-pill is-role", queuePositionData.roleLabel);
                    append(queueMeta, "span", "", "rte-ai-review-item-queue-pill is-position", queuePositionData.queueLabel);
                    append(queueCard, "div", "", "rte-ai-review-item-queue-detail", queuePositionData.detail);
                }
                if (queueTransitionData) {
                    var transitionCard = append(item, "div", "", "rte-ai-review-item-transition-card");
                    append(transitionCard, "div", "", "rte-ai-review-item-transition-title", queueTransitionData.title);
                    var transitionMeta = append(transitionCard, "div", "", "rte-ai-review-item-transition-meta");
                    append(transitionMeta, "span", "", "rte-ai-review-item-transition-pill is-status", queueTransitionData.statusLabel);
                    append(transitionMeta, "span", "", "rte-ai-review-item-transition-pill is-position", queueTransitionData.queueLabel);
                    if (queueTransitionData.typeLabel) {
                        append(transitionMeta, "span", "", "rte-ai-review-item-transition-pill is-type", queueTransitionData.typeLabel);
                    }
                    if (queueTransitionData.scopeLabel) {
                        append(transitionMeta, "span", "", "rte-ai-review-item-transition-pill is-scope", queueTransitionData.scopeLabel);
                    }
                    append(transitionCard, "div", "", "rte-ai-review-item-transition-detail", queueTransitionData.detail);
                    append(transitionCard, "div", "", "rte-ai-review-item-transition-preview", queueTransitionData.preview);
                    if (queueTransitionData.followupTitle) {
                        var transitionFollowup = append(transitionCard, "div", "", "rte-ai-review-item-transition-followup");
                        append(transitionFollowup, "div", "", "rte-ai-review-item-transition-followup-title", queueTransitionData.followupTitle);
                        var transitionFollowupMeta = append(transitionFollowup, "div", "", "rte-ai-review-item-transition-followup-meta");
                        if (queueTransitionData.followupStatusLabel) {
                            append(transitionFollowupMeta, "span", "", "rte-ai-review-item-transition-pill is-followup", queueTransitionData.followupStatusLabel);
                        }
                        append(transitionFollowup, "div", "", "rte-ai-review-item-transition-followup-detail", queueTransitionData.followupDetail);
                    }
                }

                var meta = append(item, "div", "", "rte-ai-review-item-meta");
                append(meta, "span", "", "rte-ai-review-item-status is-" + suggestion.status, getSuggestionStatusLabel(suggestion.status));
                append(meta, "span", "", "rte-ai-review-item-stamp", suggestion.sourceLabel || (suggestion.snapshot && suggestion.snapshot.hasSelection ? "Selection suggestion" : "Document suggestion"));
                if (isActiveReviewItem) {
                    append(meta, "span", "", "rte-ai-review-item-stamp is-current", "Current");
                }
                if (isQueueOpenedItem) {
                    append(meta, "span", "", "rte-ai-review-item-stamp is-opened", "Queue opened");
                }
                if (suggestion.suggestionType && suggestion.suggestionType !== "other") {
                    append(meta, "span", "", "rte-ai-review-item-stamp is-type", getSuggestionTypeLabel(suggestion.suggestionType));
                }
                if (suggestion.language) {
                    append(meta, "span", "", "rte-ai-review-item-stamp is-language", getTranslateLanguageLabel(suggestion.language));
                }
                if (sharedUpdateCount) {
                    append(meta, "span", "", "rte-ai-review-item-stamp is-remote", sharedUpdateCount > 1 ? sharedUpdateCount + " shared updates" : "Shared update");
                }

                var summary = append(item, "div", "", "rte-ai-review-item-summary");
                append(summary, "div", "", "rte-ai-review-item-title", summarizeSuggestionText(suggestion.originalText || suggestion.resultText || "AI suggestion", 80));
                if (isCondensedReviewItem) {
                    appendReviewCondensedPreview(summary, suggestion, panel);
                }
                var changeGlance = buildReviewChangeGlanceData(suggestion);
                if (changeGlance) {
                    var glanceCard = append(summary, "div", "", "rte-ai-review-item-glance-card");
                    append(glanceCard, "div", "", "rte-ai-review-item-glance-title", changeGlance.title);
                    if (changeGlance.pills && changeGlance.pills.length) {
                        var glanceMeta = append(glanceCard, "div", "", "rte-ai-review-item-glance-meta");
                        for (var glanceIndex = 0; glanceIndex < changeGlance.pills.length; glanceIndex++) {
                            var glancePill = changeGlance.pills[glanceIndex];
                            append(glanceMeta, "span", "", "rte-ai-review-item-glance-pill is-" + glancePill.kind, glancePill.text);
                        }
                    }
                    if (changeGlance.detail) {
                        append(glanceCard, "div", "", "rte-ai-review-item-glance-detail", changeGlance.detail);
                    }
                }
                if (suggestion.reason) {
                    var reasonCard = append(summary, "div", "", "rte-ai-review-item-reason-card");
                    append(reasonCard, "div", "", "rte-ai-review-item-reason-label", "Why AI suggested this");
                    append(reasonCard, "div", "", "rte-ai-review-item-reason", suggestion.reason);
                }
                var compare = append(item, "div", "", "rte-ai-review-item-compare");
                var compareHeader = append(compare, "div", "", "rte-ai-review-item-compare-header");
                append(compareHeader, "div", "", "rte-ai-review-item-compare-title", "Compare change");
                append(compareHeader, "div", "", "rte-ai-review-item-compare-detail", "Original and suggested text");
                var compareDiffParts = buildCompletionPreviewDiffParts(suggestion.originalText || "", suggestion.resultText || "");
                var beforeNode = append(compare, "div", "", "rte-ai-review-item-before");
                appendReviewCompareDeltaText(beforeNode, "current", normalizeText(suggestion.originalText || ""), compareDiffParts);
                var afterNode = append(compare, "div", "", "rte-ai-review-item-after");
                appendReviewCompareDeltaText(afterNode, "result", normalizeText(suggestion.resultText || ""), compareDiffParts);
                var undoCardContext = isActiveReviewItem && suggestion.status === "pending" && undoableReviewDecision ? getUndoDecisionContext(undoableReviewDecision) : null;
                var undoCardSummaryText = undoCardContext ? buildUndoDecisionSummaryText(undoableReviewDecision) : "";
                var undoCardHistoryItems = undoCardContext ? getUndoDecisionHistorySummaries(1) : [];
                if (undoCardContext) {
                    var undoNoteNode = append(item, "div", "", "rte-ai-review-item-undo-note", undoCardSummaryText + " Press U to " + undoCardContext.shortcutLabel + ".");
                    var undoNoteId = ensureReviewRecoveryNodeId(undoNoteNode, "undo-note", suggestion.id);
                }
                var undoHistoryNode = null;
                if (undoCardHistoryItems.length) {
                    undoHistoryNode = appendReviewItemRecoveryHistory(item, undoCardHistoryItems, "undo");
                    ensureReviewRecoveryNodeId(undoHistoryNode, "undo-history", suggestion.id);
                }
                var isRedoTarget = !!(redoableReviewDecision && redoableReviewDecision.suggestion && redoableReviewDecision.suggestion.id === suggestion.id && suggestion.status === "pending");
                var redoCardContext = isRedoTarget ? getRedoDecisionContext(redoableReviewDecision) : null;
                var redoCardSummaryText = redoCardContext ? buildRedoDecisionSummaryText(redoableReviewDecision) : "";
                var redoNoteId = "";
                if (redoCardContext) {
                    var redoNoteNode = append(item, "div", "", "rte-ai-review-item-redo-note", redoCardSummaryText + " Press Shift+U to " + redoCardContext.shortcutLabel + ".");
                    redoNoteId = ensureReviewRecoveryNodeId(redoNoteNode, "redo-note", suggestion.id);
                }
                var redoHistoryNode = null;
                var redoCardHistoryItems = redoCardContext ? getRedoDecisionHistorySummaries(1) : [];
                if (redoCardHistoryItems.length) {
                    redoHistoryNode = appendReviewItemRecoveryHistory(item, redoCardHistoryItems, "redo");
                    ensureReviewRecoveryNodeId(redoHistoryNode, "redo-history", suggestion.id);
                }
                item.setAttribute("aria-label", buildReviewItemAriaLabel(suggestion, {
                    isCurrent: editor.__aiActiveSuggestionId === suggestion.id,
                    queueOpened: isQueueOpenedItem,
                    queueRoleLabel: queuePositionData ? queuePositionData.roleLabel : "",
                    queuePositionLabel: queuePositionData ? queuePositionData.queueLabel : "",
                    transitionLabel: queueTransitionData ? (queueTransitionData.title + ". " + queueTransitionData.statusLabel + ". " + queueTransitionData.queueLabel + ". " + queueTransitionData.preview + (queueTransitionData.followupTitle ? ". " + queueTransitionData.followupTitle + ". " + queueTransitionData.followupDetail : "")) : "",
                    changeSummary: changeGlance ? (changeGlance.title + ". " + (changeGlance.pills || []).map(function (pill) { return pill.text; }).join(". ") + (changeGlance.detail ? ". " + changeGlance.detail : "")) : "",
                    remoteUpdateCount: sharedUpdateCount,
                    undoLabel: undoCardSummaryText,
                    undoNextLabel: undoCardHistoryItems.length ? "Undo after this: " + undoCardHistoryItems[0].detail : "",
                    redoLabel: redoCardSummaryText,
                    redoNextLabel: redoCardHistoryItems.length ? "Redo after this: " + redoCardHistoryItems[0].detail : ""
                }));
                item.setAttribute("data-rte-ai-review-base-aria-label", item.getAttribute("aria-label") || "");
                if (isCondensedReviewItem) {
                    updateReviewCondensedPreviewOpenHint(item, suggestion, panel);
                }

                var actions = append(item, "div", "", "rte-ai-review-item-actions");
                var locateActions = append(actions, "div", "", "rte-ai-review-item-action-group is-locate");
                var decisionActions = append(actions, "div", "", "rte-ai-review-item-action-group is-decision");
                var recoveryActions = append(actions, "div", "", "rte-ai-review-item-action-group is-recovery");
                var locateButton = append(locateActions, "button", "", "secondary rte-ai-review-action-button is-locate", "Locate");
                locateButton.type = "button";
                locateButton.setAttribute("data-rte-ai-review-action", "locate");
                locateButton.disabled = suggestion.status !== "pending" && suggestion.status !== "stale";
                locateButton.onclick = function () {
                    locateSuggestion(suggestion.id);
                };
                bindReviewActionButtonNavigation(locateButton, typeFilter, suggestion.id, "locate");

                if (suggestion.status === "pending") {
                    var acceptActionPresentation = getPendingReviewActionPresentation(suggestion, "accept", typeFilter) || { text: "Accept", label: "Accept this AI change" };
                    var acceptButton = append(decisionActions, "button", "", "rte-ai-review-action-button is-primary is-accept", acceptActionPresentation.text);
                    acceptButton.type = "button";
                    acceptButton.setAttribute("data-rte-ai-review-action", "accept");
                    acceptButton.setAttribute("aria-label", acceptActionPresentation.label);
                    acceptButton.title = acceptActionPresentation.label;
                    acceptButton.onclick = function () {
                        applyReviewDecision(suggestion.id, "accept", { focusAction: "accept" });
                    };
                    bindReviewActionButtonNavigation(acceptButton, typeFilter, suggestion.id, "accept");

                    var rejectActionPresentation = getPendingReviewActionPresentation(suggestion, "reject", typeFilter) || { text: "Reject", label: "Reject this AI change" };
                    var rejectButton = append(decisionActions, "button", "", "secondary rte-ai-review-action-button is-reject", rejectActionPresentation.text);
                    rejectButton.type = "button";
                    rejectButton.setAttribute("data-rte-ai-review-action", "reject");
                    rejectButton.setAttribute("aria-label", rejectActionPresentation.label);
                    rejectButton.title = rejectActionPresentation.label;
                    rejectButton.onclick = function () {
                        applyReviewDecision(suggestion.id, "reject", { focusAction: "reject" });
                    };
                    bindReviewActionButtonNavigation(rejectButton, typeFilter, suggestion.id, "reject");

                    if (undoCardContext) {
                        var undoButton = append(recoveryActions, "button", "", "secondary rte-ai-review-action-button is-undo", undoCardContext.actionLabel);
                        undoButton.type = "button";
                        undoButton.setAttribute("data-rte-ai-review-action", "undo");
                        if (undoNoteId) {
                            undoButton.setAttribute("data-rte-ai-review-extra-describedby", undoNoteId + (undoHistoryNode && undoHistoryNode.id ? " " + undoHistoryNode.id : ""));
                        }
                        undoButton.onclick = function () {
                            undoLastReviewDecision({ focusPanel: true, focusAction: "undo" });
                        };
                        bindReviewActionButtonNavigation(undoButton, typeFilter, suggestion.id, "undo");
                    }

                    if (redoCardContext) {
                        var redoActionButton = append(recoveryActions, "button", "", "secondary rte-ai-review-action-button is-redo", redoCardContext.actionLabel);
                        redoActionButton.type = "button";
                        redoActionButton.setAttribute("data-rte-ai-review-action", "redo");
                        if (redoNoteId) {
                            redoActionButton.setAttribute("data-rte-ai-review-extra-describedby", redoNoteId + (redoHistoryNode && redoHistoryNode.id ? " " + redoHistoryNode.id : ""));
                        }
                        redoActionButton.onclick = function () {
                            redoLastReviewDecision({ focusPanel: true, focusAction: "redo" });
                        };
                        bindReviewActionButtonNavigation(redoActionButton, typeFilter, suggestion.id, "redo");
                    }
                }
            })(visible[s]);
        }

        var shouldRestoreReviewFocus = !!focusPanel || preserveActiveReviewItemFocus || !!requestedReviewActionFocus;
        var focusedReviewItem = revealActiveReviewItem(feed, shouldRestoreReviewFocus, requestedReviewActionFocus || preserveActiveReviewAction);

        var historyEntries = getReviewLogEntries().slice(0, 6);
        if (historyEntries.length) {
            append(feed, "div", "", "rte-ai-review-history-title", "Recent activity");
            for (var h = 0; h < historyEntries.length; h++) {
                var entry = historyEntries[h];
                var historyTone = getReviewLogEventToneClass(entry);
                var historyItem = append(feed, "div", "", "rte-ai-review-history-entry is-" + historyTone);
                historyItem.setAttribute("data-rte-ai-review-event", entry.eventType || "suggestion-updated");
                var historyHeader = append(historyItem, "div", "", "rte-ai-review-history-header");
                append(historyHeader, "span", "", "rte-ai-review-history-event is-" + historyTone, getReviewLogEventLabel(entry));
                var historyMetaParts = [];
                if (entry.sourceLabel) {
                    historyMetaParts.push(entry.sourceLabel);
                }
                if (entry.suggestionType && entry.suggestionType !== "other") {
                    historyMetaParts.push(getSuggestionTypeLabel(entry.suggestionType));
                }
                if (entry.language) {
                    historyMetaParts.push(getTranslateLanguageLabel(entry.language));
                }
                append(historyHeader, "div", "", "rte-ai-review-history-meta", historyMetaParts.join(" - ") || "AI review");
                append(historyItem, "div", "", "rte-ai-review-history-text", summarizeSuggestionText(entry.resultText || entry.originalText || "AI review event", 120));
            }
        }

        if (shouldRestoreReviewFocus) {
            setTimeout(function () {
                var restoredControl = null;
                if (preserveReviewControlFocusKey && panel && panel.querySelector) {
                    restoredControl = panel.querySelector('[data-rte-ai-review-focus-key="' + preserveReviewControlFocusKey + '"]');
                    if (restoredControl && restoredControl.disabled) {
                        restoredControl = null;
                    }
                    if (restoredControl && restoredControl.focus) {
                        restoredControl.focus();
                    }
                }
                if (!restoredControl && editor.__aiReviewPrimaryEmptyAction && editor.__aiReviewPrimaryEmptyAction.isConnected && !editor.__aiReviewPrimaryEmptyAction.disabled && editor.__aiReviewPrimaryEmptyAction.focus) {
                    editor.__aiReviewPrimaryEmptyAction.focus();
                }
                else if (!restoredControl && !focusedReviewItem && panel && panel.focus) {
                    panel.focus();
                }
            }, 0);
        }
        return true;
    }

    function openDialog(options) {
        options = options || {};
        if (editor.__aiDialog && editor.__aiDialog.isConnected) {
            editor.__aiDialog.close();
        }

        var snapshot = captureSelectionSnapshot();
        var dialoginner = editor.createDialog(config.text_aiassist || "Ask AI", "rte-panel-aiassist");
        dialoginner.__aiSnapshot = snapshot;
        editor.__aiDialog = dialoginner;
        dialoginner.__aiOperationStates = {};
        dialoginner.__aiPlanStale = false;

        dialoginner._onclose = function () {
            if (editor.__aiDialog === dialoginner) {
                editor.__aiDialog = null;
            }
        };

        var grid = append(dialoginner, "div", "", "demo-ai-dialog-grid");
        append(grid, "p", "", "demo-ai-dialog-note", "Preview an AI suggestion before applying it. Nothing is written to the editor until you accept a change.");

        var meta = append(grid, "div", "", "demo-ai-dialog-meta");
        append(meta, "span", "", "demo-ai-inline-hint", (config.aiToolkitLabel || "Current editor") + " AI");
        append(meta, "span", "", "demo-ai-inline-hint", snapshot.hasSelection ? "Selection ready" : "No selection - using whole document");

        var compactControls = append(grid, "div", "", "demo-ai-compact-controls");

        var actionField = append(compactControls, "div", "", "demo-ai-field demo-ai-action-field");
        append(actionField, "label", "", "", "Action");
        var modeSelect = append(actionField, "select");
        var modeHelp = append(actionField, "div", "", "demo-ai-mode-help");

        var languageField = append(compactControls, "div", "", "demo-ai-field demo-ai-language-field");
        append(languageField, "label", "", "", "Target language");
        var languageSelect = append(languageField, "select");
        populateDialogModes();
        if (options.presetMode) {
            modeSelect.value = options.presetMode;
        }
        updateModeHelp();

        var scopeField = append(compactControls, "div", "", "demo-ai-field demo-ai-scope-field");
        append(scopeField, "label", "", "", "Scope");
        var loadRow = append(scopeField, "div", "", "demo-actions-row demo-ai-scope-row");
        var loadSelectionButton = append(loadRow, "button", "", "", "Use selection");
        loadSelectionButton.type = "button";
        var loadDocumentButton = append(loadRow, "button", "", "secondary", "Whole document");
        loadDocumentButton.type = "button";

        var runField = append(compactControls, "div", "", "demo-ai-field demo-ai-run-field");
        append(runField, "label", "", "", "Run");
        var runRow = append(runField, "div", "", "demo-actions-row demo-ai-run-row");
        var runButton = append(runRow, "button", "", "is-primary", "Ask AI");
        runButton.type = "button";
        var copyButton = append(runRow, "button", "", "secondary", "Copy to source");
        copyButton.type = "button";

        var textGrid = append(grid, "div", "", "demo-ai-text-grid");

        var sourceField = append(textGrid, "div", "", "demo-ai-field demo-ai-source-field");
        append(sourceField, "label", "", "", "Source text");
        var sourceArea = append(sourceField, "textarea");
        sourceArea.placeholder = "Load the current selection or the whole editor before running Ask AI.";

        var resultField = append(textGrid, "div", "", "demo-ai-field demo-ai-result-field");
        append(resultField, "label", "", "", "Result");
        var resultArea = append(resultField, "textarea");
        resultArea.readOnly = true;
        resultArea.placeholder = "Demo AI output will appear here.";

        var reviewGrid = append(grid, "div", "", "demo-ai-review-grid");
        var oldCard = append(reviewGrid, "div", "", "demo-ai-review-card preview-old");
        append(oldCard, "strong", "", "", "Current content");
        var oldPreview = append(oldCard, "pre", "", "demo-ai-review-text", "Load text from the editor to start a preview.");
        var newCard = append(reviewGrid, "div", "", "demo-ai-review-card preview-new");
        append(newCard, "strong", "", "", "Suggested change");
        var newPreview = append(newCard, "pre", "", "demo-ai-review-text", "Run Ask AI to generate a suggestion preview.");

        var insightGrid = append(grid, "div", "", "demo-ai-insight-grid");

        var reasonPanel = append(insightGrid, "div", "", "demo-ai-reason-panel");
        append(reasonPanel, "label", "", "", "Why this suggestion");
        var reasonCopy = append(reasonPanel, "div", "", "demo-ai-reason-copy", "Run a suggestion to see why the AI recommends this change.");

        var planPanel = append(insightGrid, "div", "", "demo-ai-plan-panel");
        append(planPanel, "label", "", "", "Operation plan");
        var planNote = append(planPanel, "div", "", "demo-ai-plan-note", "Steps the editor will run when you apply this suggestion.");
        var planStatus = append(planPanel, "div", "", "demo-ai-plan-status");
        var planStatusMessage = append(planStatus, "span", "", "demo-ai-plan-status-message");
        var planStatusAction = append(planStatus, "button", "", "secondary demo-ai-plan-status-action", "Re-run from editor");
        planStatusAction.type = "button";
        planStatusAction.style.display = "none";
        var planSummary = append(planPanel, "div", "", "demo-ai-plan-summary");
        var planList = append(planPanel, "ul", "", "demo-ai-plan-list");

        var applyRow = append(grid, "div", "", "demo-actions-row demo-ai-apply-row");
        var applyPlanButton = append(applyRow, "button", "", "is-primary", "Apply");
        applyPlanButton.type = "button";
        applyPlanButton.disabled = true;
        var acceptSelectionButton = append(applyRow, "button", "", "", "Replace selection");
        acceptSelectionButton.type = "button";
        acceptSelectionButton.disabled = !snapshot.hasSelection;
        var previewSelectionButton = append(applyRow, "button", "", "secondary", "Preview inline");
        previewSelectionButton.type = "button";
        previewSelectionButton.disabled = !snapshot.hasSelection;
        var acceptBelowButton = append(applyRow, "button", "", "secondary", "Insert below");
        acceptBelowButton.type = "button";
        var acceptDocumentButton = append(applyRow, "button", "", "secondary", "Replace document");
        acceptDocumentButton.type = "button";
        var rejectButton = append(applyRow, "button", "", "secondary", "Reject");
        rejectButton.type = "button";

        var status = append(grid, "div", "", "demo-ai-dialog-status");

        function getDialogResolvedAction(mode) {
            var latest = dialoginner.__aiResolved;
            if (latest && latest.operations && latest.operations.length) {
                return latest;
            }
            return buildResolvedActionFromText(resultArea.value, mode, latest || null, latest ? latest.request : null, latest ? latest.action : null);
        }

        function populateDialogModes() {
            var modes = getDialogModes();
            modeSelect.innerHTML = "";
            for (var index = 0; index < modes.length; index++) {
                var option = append(modeSelect, "option", "", "", modes[index].title || modes[index].id);
                option.value = modes[index].id;
            }
            populateTranslateLanguages();
            updateModeHelp();
        }

        function populateTranslateLanguages() {
            var languages = getTranslateLanguages();
            languageSelect.innerHTML = "";
            for (var index = 0; index < languages.length; index++) {
                var option = append(languageSelect, "option", "", "", languages[index].label || languages[index].value);
                option.value = languages[index].value || languages[index].label;
            }
            if (options.presetLanguage) {
                languageSelect.value = options.presetLanguage;
            }
            if (!languageSelect.value && languages.length) {
                languageSelect.value = languages[0].value || languages[0].label;
            }
        }

        function updateLanguageVisibility() {
            languageField.style.display = modeSelect.value === "translate" ? "" : "none";
        }

        function updateModeHelp() {
            var modes = getDialogModes();
            for (var index = 0; index < modes.length; index++) {
                if (modes[index].id === modeSelect.value) {
                    if (modes[index].id === "translate") {
                        modeHelp.innerText = (modes[index].description || "Prepare a translated draft in the selected language.") + " Current target: " + getTranslateLanguageLabel(languageSelect.value || "spanish") + ".";
                    }
                    else {
                        modeHelp.innerText = modes[index].description || "Run this AI mode against the current source text.";
                    }
                    updateLanguageVisibility();
                    return;
                }
            }
            modeHelp.innerText = "Run this AI mode against the current source text.";
            updateLanguageVisibility();
        }

        function getOperationExecutionState(index) {
            return dialoginner.__aiOperationStates && dialoginner.__aiOperationStates["step-" + index]
                ? dialoginner.__aiOperationStates["step-" + index]
                : "";
        }

        function setOperationExecutionState(index, state) {
            dialoginner.__aiOperationStates = dialoginner.__aiOperationStates || {};
            dialoginner.__aiOperationStates["step-" + index] = state || "";
        }

        function markPlanStale(message) {
            dialoginner.__aiPlanStale = true;
            status.innerText = message || "The editor changed. Re-run Ask AI to refresh the remaining plan.";
            renderOperationPlan(dialoginner.__aiResolved);
            updatePreview();
        }

        function getPendingOperationIndexes(operations) {
            var pending = [];
            for (var index = 0; index < operations.length; index++) {
                if (getOperationExecutionState(index) !== "done" && getOperationExecutionState(index) !== "skipped") {
                    pending.push(index);
                }
            }
            return pending;
        }

        function rerunDialogPlanFromEditor() {
            var scope = dialoginner.__aiSourceScope || (dialoginner.__aiSnapshot && dialoginner.__aiSnapshot.hasSelection ? "selection" : "document");
            refreshSource(scope);
            runButton.onclick();
        }

        function executeDialogOperations(operations, message) {
            if (!operations || !operations.length) {
                return false;
            }
            var handled = executeOperations(operations, { snapshot: dialoginner.__aiSnapshot, resolved: dialoginner.__aiResolved });
            if (handled) {
                status.innerText = message || "Applied the selected AI step.";
            }
            return handled;
        }

        function renderOperationPlan(resolved) {
            var operations = resolved && resolved.operations ? resolved.operations : [];
            planList.innerHTML = "";
            planStatusMessage.innerText = dialoginner.__aiPlanStale
                ? "A step was already applied to the editor. Re-run Ask AI against the current editor state before applying any remaining pending steps."
                : "";
            planStatusAction.style.display = dialoginner.__aiPlanStale ? "" : "none";
            planStatusAction.disabled = false;
            planStatus.className = dialoginner.__aiPlanStale
                ? "demo-ai-plan-status is-stale"
                : "demo-ai-plan-status";
            if (!operations.length) {
                var emptyItem = append(planList, "li", "", "demo-ai-plan-item is-empty");
                append(emptyItem, "span", "", "demo-ai-plan-type", "No plan yet");
                append(emptyItem, "span", "", "demo-ai-plan-copy", "Run Ask AI to see the steps the editor will apply.");
                planSummary.innerText = "";
                planStatusAction.style.display = "none";
                applyPlanButton.disabled = true;
                applyPlanButton.innerText = "Apply";
                return;
            }

            var doneCount = 0;
            var skippedCount = 0;
            for (var index = 0; index < operations.length; index++) {
                var operation = operations[index];
                var display = getOperationDisplayMeta(operation);
                var item = append(planList, "li", "", "demo-ai-plan-item");
                var header = append(item, "div", "", "demo-ai-plan-header");
                append(header, "span", "", "demo-ai-plan-type", display.title);
                var stepState = getOperationExecutionState(index);
                if (stepState) {
                    append(header, "span", "", "demo-ai-plan-state is-" + stepState, stepState === "done" ? "Applied" : "Skipped");
                    if (stepState === "done") {
                        doneCount++;
                    }
                    else if (stepState === "skipped") {
                        skippedCount++;
                    }
                }
                var copy = display.copy;
                if (operation.reason) {
                    copy += " Reason: " + operation.reason;
                }
                append(item, "span", "", "demo-ai-plan-copy", copy);
                var actions = append(item, "div", "", "demo-ai-plan-actions");
                if (stepState !== "done") {
                    var runStepButton = append(actions, "button", "", "secondary demo-ai-plan-button", getSingleOperationPlanButtonLabel(operation));
                    runStepButton.type = "button";
                    runStepButton.disabled = !!dialoginner.__aiPlanStale;
                    runStepButton.onclick = (function (stepIndex, stepOperation, stepTitle) {
                        return function () {
                            if (executeDialogOperations([stepOperation], "Applied \"" + stepTitle + "\".")) {
                                setOperationExecutionState(stepIndex, "done");
                                markPlanStale("Applied \"" + stepTitle + "\". Re-run Ask AI to refresh the remaining plan.");
                            }
                        };
                    })(index, operation, display.title);
                }
                if (stepState !== "done") {
                    var skipButton = append(actions, "button", "", "secondary demo-ai-plan-button", stepState === "skipped" ? "Include step" : "Skip step");
                    skipButton.type = "button";
                    skipButton.disabled = !!dialoginner.__aiPlanStale;
                    skipButton.onclick = (function (stepIndex, isSkipped) {
                        return function () {
                            setOperationExecutionState(stepIndex, isSkipped ? "" : "skipped");
                            status.innerText = isSkipped ? "Included the step back into the pending AI plan." : "Skipped this step from the pending AI plan.";
                            renderOperationPlan(dialoginner.__aiResolved);
                        };
                    })(index, stepState === "skipped");
                }
            }

            var pendingIndexes = getPendingOperationIndexes(operations);
            planSummary.innerText = pendingIndexes.length + " pending"
                + " \u2022 " + doneCount + " applied"
                + " \u2022 " + skippedCount + " skipped";
            applyPlanButton.disabled = !pendingIndexes.length || !!dialoginner.__aiPlanStale;
            if (dialoginner.__aiPlanStale) {
                applyPlanButton.innerText = "Re-run to refresh plan";
            }
            else if (!pendingIndexes.length) {
                applyPlanButton.innerText = "No pending steps";
            }
            else if (pendingIndexes.length === operations.length) {
                applyPlanButton.innerText = getOperationPlanButtonLabel(resolved);
            }
            else {
                applyPlanButton.innerText = "Apply " + pendingIndexes.length + " pending steps";
            }
        }

        function setBusyState(isBusy, message) {
            var text = message || "";
            runButton.disabled = !!isBusy;
            copyButton.disabled = !!isBusy;
            loadSelectionButton.disabled = !!isBusy;
            loadDocumentButton.disabled = !!isBusy;
            modeSelect.disabled = !!isBusy;
            sourceArea.readOnly = !!isBusy;
            planStatusAction.disabled = !!isBusy;
            applyPlanButton.disabled = !!isBusy || applyPlanButton.disabled;
            acceptSelectionButton.disabled = !!isBusy || acceptSelectionButton.disabled;
            previewSelectionButton.disabled = !!isBusy || previewSelectionButton.disabled;
            acceptBelowButton.disabled = !!isBusy || acceptBelowButton.disabled;
            acceptDocumentButton.disabled = !!isBusy || acceptDocumentButton.disabled;
            rejectButton.disabled = !!isBusy || rejectButton.disabled;
            var planButtons = planList.querySelectorAll ? planList.querySelectorAll(".demo-ai-plan-button") : [];
            for (var i = 0; i < planButtons.length; i++) {
                planButtons[i].disabled = !!isBusy;
            }
            status.innerText = text;
        }

        function refreshSource(scope) {
            dialoginner.__aiSourceScope = scope === "selection" ? "selection" : "document";
            if (scope === "selection") {
                dialoginner.__aiSnapshot = captureSelectionSnapshot();
                sourceArea.value = dialoginner.__aiSnapshot.text || dialoginner.__aiSnapshot.wholeText;
            }
            else {
                dialoginner.__aiSnapshot = captureSelectionSnapshot();
                sourceArea.value = dialoginner.__aiSnapshot.wholeText;
            }
            updatePreview();
        }

        function updatePreview() {
            var hasResult = !!normalizeText(resultArea.value);
            var isStale = !!dialoginner.__aiPlanStale;
            oldPreview.innerText = normalizeText(sourceArea.value) || "Load text from the editor to start a preview.";
            newPreview.innerText = hasResult ? resultArea.value : "Run Ask AI to generate a suggestion preview.";
            reasonCopy.innerText = getPrimaryResolvedReason(dialoginner.__aiResolved) || "This suggestion does not include an explicit AI rationale yet.";
            renderOperationPlan(dialoginner.__aiResolved);
            acceptSelectionButton.disabled = isStale || !hasResult || !dialoginner.__aiSnapshot || !dialoginner.__aiSnapshot.hasSelection;
            previewSelectionButton.disabled = isStale || !hasResult || !dialoginner.__aiSnapshot || !dialoginner.__aiSnapshot.hasSelection;
            acceptBelowButton.disabled = isStale || !hasResult;
            acceptDocumentButton.disabled = isStale || !hasResult;
            rejectButton.disabled = !hasResult;
        }

        loadSelectionButton.onclick = function () {
            refreshSource("selection");
        };

        loadDocumentButton.onclick = function () {
            refreshSource("document");
        };

        planStatusAction.onclick = function () {
            rerunDialogPlanFromEditor();
        };

        modeSelect.onchange = function () {
            updateModeHelp();
        };

        languageSelect.onchange = function () {
            updateModeHelp();
        };

        runButton.onclick = function () {
            setBusyState(true, "Generating suggestion...");
            resolveAction(modeSelect.value, {
                snapshot: dialoginner.__aiSnapshot,
                source: sourceArea.value,
                mode: modeSelect.value,
                language: languageSelect.value
            }).then(function (resolved) {
                dialoginner.__aiResolved = resolved;
                dialoginner.__aiOperationStates = {};
                dialoginner.__aiPlanStale = false;
                resultArea.value = getPrimaryResolvedText(resolved) || "";
                updatePreview();
                setBusyState(false, resultArea.value ? "Suggestion ready for review." : "No suggestion returned.");
            }).catch(function (error) {
                console.error("AI Toolkit dialog run failed", error);
                dialoginner.__aiResolved = null;
                dialoginner.__aiOperationStates = {};
                dialoginner.__aiPlanStale = false;
                resultArea.value = "";
                updatePreview();
                setBusyState(false, "AI suggestion failed.");
            });
        };

        copyButton.onclick = function () {
            sourceArea.value = resultArea.value;
            updatePreview();
        };

        applyPlanButton.onclick = function () {
            var operations = dialoginner.__aiResolved && dialoginner.__aiResolved.operations ? dialoginner.__aiResolved.operations : [];
            var pendingIndexes = getPendingOperationIndexes(operations);
            var pendingOperations = [];
            for (var i = 0; i < pendingIndexes.length; i++) {
                pendingOperations.push(operations[pendingIndexes[i]]);
            }
            if (pendingOperations.length && executeDialogOperations(pendingOperations, "Applied the pending AI plan.")) {
                for (var j = 0; j < pendingIndexes.length; j++) {
                    setOperationExecutionState(pendingIndexes[j], "done");
                }
                dialoginner.close();
            }
        };

        acceptSelectionButton.onclick = function () {
            if (executeResolvedAction(buildResolvedActionFromText(resultArea.value, "selection", getDialogResolvedAction("selection"), dialoginner.__aiResolved ? dialoginner.__aiResolved.request : null, dialoginner.__aiResolved ? dialoginner.__aiResolved.action : null), { snapshot: dialoginner.__aiSnapshot })) {
                dialoginner.close();
            }
        };

        previewSelectionButton.onclick = function () {
            var previewResolved = buildResolvedActionFromText(resultArea.value, "selection-preview", getDialogResolvedAction("selection-preview"), dialoginner.__aiResolved ? dialoginner.__aiResolved.request : null, dialoginner.__aiResolved ? dialoginner.__aiResolved.action : null);
            if (previewResolved && previewResolved.operations && previewResolved.operations[0] && !previewResolved.operations[0].reason) {
                previewResolved.operations[0].reason = getPrimaryResolvedReason(dialoginner.__aiResolved);
            }
            if (executeResolvedAction(previewResolved, { snapshot: dialoginner.__aiSnapshot })) {
                dialoginner.close();
            }
        };

        acceptBelowButton.onclick = function () {
            if (executeResolvedAction(buildResolvedActionFromText(resultArea.value, "insert", getDialogResolvedAction("insert"), dialoginner.__aiResolved ? dialoginner.__aiResolved.request : null, dialoginner.__aiResolved ? dialoginner.__aiResolved.action : null), { snapshot: dialoginner.__aiSnapshot })) {
                dialoginner.close();
            }
        };

        acceptDocumentButton.onclick = function () {
            if (executeResolvedAction(buildResolvedActionFromText(resultArea.value, "document", getDialogResolvedAction("document"), dialoginner.__aiResolved ? dialoginner.__aiResolved.request : null, dialoginner.__aiResolved ? dialoginner.__aiResolved.action : null), { snapshot: dialoginner.__aiSnapshot })) {
                dialoginner.close();
            }
        };

        rejectButton.onclick = function () {
            dialoginner.close();
        };

        refreshSource(options.useDocument ? "document" : (snapshot.hasSelection ? "selection" : "document"));
        updatePreview();
        if (options.autoRun) {
            runButton.onclick();
        }
    }
}
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
if (!window.RTE_DefaultConfig) window.RTE_DefaultConfig = {};

RTE_DefaultConfig.plugin_dictation = RTE_Plugin_Dictation;

if (!RTE_DefaultConfig.svgCode_dictation) {
    // Solid microphone glyph, stroke-matched to the default toolbar icon set.
    RTE_DefaultConfig.svgCode_dictation = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/><path d="M8 21h8"/></svg>';
}

/**
 * Dictation plugin — converts microphone input to text via the Web Speech
 * API and inserts it into the editor. Toolbar toggle button; click to start,
 * click again to stop. Interim results render live under the cursor so the
 * user sees what the browser heard before committing.
 *
 * Browser support: Chrome, Edge, Opera, Safari (via webkitSpeechRecognition).
 * Firefox does not ship a SpeechRecognition implementation — we detect and
 * hide the toolbar button when unsupported.
 *
 * Config:
 *   config.dictationLang           — BCP-47 language, default navigator.language
 *   config.dictationContinuous     — default true; when false, one utterance then stops
 *   config.dictationInterimResults — default true; show partial transcript live
 *   config.dictationAutoPunctuation— default true; auto-capitalize sentences + add periods
 */
function RTE_Plugin_Dictation() {
    var obj = this;
    var config;
    var editor;
    var recognition = null;
    var listening = false;
    var button = null;
    var interimNode = null;

    obj.PluginName = "Dictation";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        // Opt-in: require dictationEnabled===true (set via Tag Helper attribute
        // `enable-dictation="true"` or by the host JS). The feature is opt-in
        // because it requires microphone permission — we don't want a visible
        // mic button on every editor that ships the plugin JS.
        if (config.dictationEnabled !== true) return;
        if (!isSupported()) return;

        if (typeof config.dictationContinuous !== "boolean") config.dictationContinuous = true;
        if (typeof config.dictationInterimResults !== "boolean") config.dictationInterimResults = true;
        if (typeof config.dictationAutoPunctuation !== "boolean") config.dictationAutoPunctuation = true;
        config.dictationLang = config.dictationLang || (typeof navigator !== "undefined" ? navigator.language : "en-US");

        appendToolbarCommand("toolbar_default", "#{dictation}");
        appendToolbarCommand("toolbar_full", "#{dictation}");
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;
        if (config.dictationEnabled !== true) return;
        if (!isSupported()) return;

        editor.dictation = {
            start: start,
            stop: stop,
            toggle: toggle,
            isListening: function () { return listening; },
            isSupported: function () { return true; }
        };

        editor.toolbarFactoryMap["dictation"] = createButton;

        editor.attachEvent("exec_command_dictation", function () { toggle(); });

        // Stop recognition when the editor is torn down.
        editor.attachEvent("destroy", function () { if (recognition) try { recognition.abort(); } catch (e) { } });
    };

    function isSupported() {
        return typeof window !== "undefined"
            && (typeof window.SpeechRecognition === "function"
             || typeof window.webkitSpeechRecognition === "function");
    }

    function appendToolbarCommand(key, token) {
        var current = config[key] || "";
        if (current.indexOf(token) !== -1) return;
        config[key] = current ? current + " " + token : token;
    }

    function createButton(cmd) {
        button = editor.createToolbarButton(cmd, {
            tooltip: "Dictate (click to start/stop)",
            svgcode: config.svgCode_dictation
        });
        return button;
    }

    function buildRecognition() {
        var Impl = window.SpeechRecognition || window.webkitSpeechRecognition;
        var r = new Impl();
        r.continuous = !!config.dictationContinuous;
        r.interimResults = !!config.dictationInterimResults;
        r.lang = config.dictationLang;

        r.onresult = function (event) {
            var finalTranscript = "";
            var interimTranscript = "";
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var result = event.results[i];
                if (result.isFinal) finalTranscript += result[0].transcript;
                else interimTranscript += result[0].transcript;
            }
            if (finalTranscript) {
                insertFinal(finalTranscript);
            }
            if (interimTranscript) {
                renderInterim(interimTranscript);
            } else if (finalTranscript) {
                clearInterim();
            }
        };

        r.onend = function () {
            // If we're supposed to be listening (not user-stopped) restart —
            // some browsers stop after a silence window even in continuous mode.
            if (listening) {
                try { r.start(); return; } catch (e) { /* ignore: race with user-stop */ }
            }
            listening = false;
            updateButton();
            clearInterim();
        };

        r.onerror = function (event) {
            listening = false;
            updateButton();
            clearInterim();
            if (event && event.error === "not-allowed") {
                notify("Microphone permission denied. Enable it in your browser site settings to dictate.");
            } else if (event && event.error === "no-speech") {
                // benign; user didn't speak — no toast
            } else if (event && event.error) {
                notify("Dictation error: " + event.error);
            }
        };

        return r;
    }

    function start() {
        if (!isSupported() || listening) return;
        if (!recognition) recognition = buildRecognition();
        try { recognition.start(); }
        catch (e) {
            // start() throws if already started; reset and retry.
            try { recognition.abort(); } catch (e2) { }
            recognition = buildRecognition();
            try { recognition.start(); } catch (e3) { return; }
        }
        listening = true;
        updateButton();
    }

    function stop() {
        if (!recognition || !listening) return;
        listening = false;   // set first so onend doesn't auto-restart
        try { recognition.stop(); } catch (e) { /* ignore */ }
        updateButton();
        clearInterim();
    }

    function toggle() {
        if (listening) stop();
        else start();
    }

    function insertFinal(text) {
        if (!text) return;
        var normalized = normalize(text, true);
        if (!normalized) return;
        try {
            if (editor.insertText) editor.insertText(normalized);
            else if (editor.insertHTML) editor.insertHTML(escapeHtml(normalized));
        } catch (e) { }
    }

    function renderInterim(text) {
        if (!text || !config.dictationInterimResults) return;
        var normalized = normalize(text, false);
        if (!interimNode) {
            var doc = editor.getDocument ? editor.getDocument() : document;
            interimNode = doc.createElement("span");
            interimNode.setAttribute("data-rte-dictation-interim", "true");
            interimNode.style.cssText = "opacity:.55;color:#0f8b8d;font-style:italic;pointer-events:none;user-select:none;";
            try {
                var sel = editor.getSelection();
                if (sel && sel.rangeCount > 0) {
                    var range = sel.getRangeAt(0);
                    range.collapse(true);
                    range.insertNode(interimNode);
                }
            } catch (e) { }
        }
        if (interimNode) interimNode.textContent = " " + normalized;
    }

    function clearInterim() {
        if (interimNode && interimNode.parentNode) {
            interimNode.parentNode.removeChild(interimNode);
        }
        interimNode = null;
    }

    function updateButton() {
        if (!button) return;
        button.classList.toggle("rte-dictation-on", listening);
        button.setAttribute("aria-pressed", listening ? "true" : "false");
        button.setAttribute("title", listening ? "Dictating… (click to stop)" : "Dictate (click to start/stop)");
        ensureStyles();
    }

    var stylesInjected = false;
    function ensureStyles() {
        if (stylesInjected) return;
        stylesInjected = true;
        var css = ".rte-dictation-on { position: relative; background: linear-gradient(180deg,#fee2e2,#fecaca); box-shadow: inset 0 0 0 1px #f87171; }"
                + ".rte-dictation-on::after { content: ''; position: absolute; top: 4px; right: 4px; width: 6px; height: 6px; border-radius: 50%; background: #dc2626; box-shadow: 0 0 0 0 rgba(220,38,38,.6); animation: rte-dictation-pulse 1.4s infinite; }"
                + "@@keyframes rte-dictation-pulse { 0%{box-shadow:0 0 0 0 rgba(220,38,38,.6);} 70%{box-shadow:0 0 0 6px rgba(220,38,38,0);} 100%{box-shadow:0 0 0 0 rgba(220,38,38,0);} }";
        // Note: the "@@" above is a literal pass-through for Razor safety; at
        // runtime we ship with a single @ via this replace:
        css = css.replace(/@@keyframes/g, "@keyframes");
        var style = document.createElement("style");
        style.setAttribute("data-rte-dictation", "1");
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    function normalize(text, isFinal) {
        if (!text) return "";
        var t = text.replace(/\s+/g, " ");
        if (!isFinal) return t.trim();
        // Final chunks: collapse leading whitespace, apply light auto-punctuation.
        t = t.replace(/^\s+/, "");
        if (config.dictationAutoPunctuation) {
            // Capitalize first letter.
            if (t.length > 0 && /[a-z]/.test(t[0])) {
                t = t[0].toUpperCase() + t.substring(1);
            }
            // Ensure trailing space so consecutive dictations don't glue words together.
            if (!/[.!?,;:]$/.test(t)) t += ".";
            t += " ";
        } else {
            if (!/\s$/.test(t)) t += " ";
        }
        return t;
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function notify(msg) {
        try {
            if (editor && editor.showAlert) { editor.showAlert(msg); return; }
        } catch (e) { }
        if (typeof window !== "undefined" && window.console) window.console.warn("[dictation]", msg);
    }
}


if (!RTE_DefaultConfig.svgCode_html2pdf) {
	RTE_DefaultConfig.svgCode_html2pdf = '<svg viewBox="-2 -2 36 36" fill="#5F6368"><polygon points="30 11 30 9 22 9 22 23 24 23 24 17 29 17 29 15 24 15 24 11 30 11"></polygon><path d="M8,9H2V23H4V18H8a2,2,0,0,0,2-2V11A2,2,0,0,0,8,9Zm0,7H4V11H8Z"></path><path d="M16,23H12V9h4a4,4,0,0,1,4,4v6A4,4,0,0,1,16,23Zm-2-2h2a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2H14Z"></path><title>PDF</title></svg>'
}

RTE_DefaultConfig.plugin_html2pdf = RTE_Plugin_Html2PDF;

function RTE_Plugin_Html2PDF() {

	var scripturl = "https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js";

	var obj = this;

	var config, editor;

	obj.PluginName = "Html2PDF";

	obj.InitConfig = function (argconfig) {
		config = argconfig;
	}
	obj.InitEditor = function (argeditor) {
		editor = argeditor;

		editor.attachEvent("exec_command_html2pdf", function (state, cmd, value) {
			obj.DoHtml2PDF();
			state.returnValue = true;
		});

		editor.toolbarFactoryMap["html2pdf"] = function (cmd) {
			//console.log(cmd);
			var span = editor.createToolbarButton(cmd);
			span.style.backgroundColor = ''
			return span;
		};

	}

	function __Append(parent, tagname, csstext, cssclass) {
		var tag = parent.ownerDocument.createElement(tagname);
		if (csstext) tag.style.cssText = csstext;
		if (cssclass) tag.className = cssclass;
		parent.appendChild(tag);
		return tag;
	}


	function dataURLToBlob(dataurl) {
		var arr = dataurl.split(',');
		var mime = arr[0].match(/:(.*?);/)[1];
		var bstr = atob(arr[1]);
		var n = bstr.length;
		var u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	obj.DoHtml2PDF = function () {

		var dialoginner = editor.createDialog("Html2PDF", "rte-dialog-html2pdf");

		var div2 = __Append(dialoginner, "div", "position:relative;text-align:center;");

		div2.innerHTML = "Loading...";

		var imgrect = __Append(dialoginner, "div", "position:relative;text-align:center;")

		window.html2pdf_callback = function (win) {

			if (!win.html2pdf) {
				div2.innerHTML = "Failed to load script.";
				return;
			}

			div2.innerHTML = "Exporting...";

			var opt = {
				margin: 0.5,
				filename: 'myfile.pdf',
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { scale: 2 },
				jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
			};

			var promimg = win.html2pdf().set(opt).from(win.document.body).outputImg();
			promimg.then(function (img) {

				var dataurl = img.getAttribute('src');
				if (dataurl.indexOf("base64") == -1) {
					div2.innerHTML = "Error, no data.";
					return;
				}

				var imgblob = dataURLToBlob(dataurl);
				var imgurl = URL.createObjectURL(imgblob);
				img.setAttribute("src", imgurl);

				var prom = win.html2pdf().set(opt).from(win.document.body).outputPdf();
				prom.then(function (str) {
					var bin = new Array(str.length);
					for (var i = 0; i < str.length; i++)
						bin[i] = str.charCodeAt(i);
					var blob = new Blob([new Uint8Array(bin)], { type: "application/pdf" })
					var url = URL.createObjectURL(blob);
					div2.innerHTML = Math.ceil(str.length / 1024) + "KB Exported<br/><a href='" + url + "' target=_blank>Download PDF</a>";

					var pdflink = div2.querySelector("a");

					var date = new Date();
					var ymd = String(date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()).substring(2);
					var hms = String(1000000 + date.getHours() * 10000 + date.getMinutes() * 100 + date.getSeconds()).substring(1);
					pdflink.download = "Export-" + ymd + "-" + hms + ".pdf";

					//a.rel = 'noopener'

					pdflink.click();

					img.style.cssText = "max-width:300px;max-height:200px;margin:5px;padding:10px;border:solid 1px #eee;box-shadow:2px 2px 6px #eee"
					imgrect.appendChild(img)

					__Append(imgrect, "br");
					var imglink = __Append(imgrect, "a");
					imglink.setAttribute("href", imgurl);
					imglink.setAttribute("target", "_blank");
					imglink.download = "Export-" + ymd + "-" + hms + ".jpg";
					imglink.innerText = "Download Img";

					//dialoginner.close();

				}).catch(function (x) {
					console.error(x);
				})

			}).catch(function (x) {
				console.error(x);
			})


		}

		var div1 = __Append(dialoginner, "div", "position:relative;text-align:center;");

		iframe = __Append(div1, "iframe", "align-self:center;flex:99;width:100%;height:0px;border:0px;", "rte-editable");
		iframe.contentDocument.open("text/html");
		iframe.contentDocument.write("<html><head><link id='url-css-preview' rel='stylesheet' href='" + editor.htmlEncode(config.previewCssUrl) + "'/>"
			+ "<script src='" + editor.htmlEncode(scripturl) + "'></script></head><body style='padding:10px;margin:0px'>"
			+ editor.getHTMLCode() + "</body>"
			+ "<script>window.onload=function(){setTimeout(function(){parent.html2pdf_callback(window)},100)}</script></html>")
		iframe.contentDocument.close();

	}
}






if (!RTE_DefaultConfig.svgCode_imageeditor) {
	RTE_DefaultConfig.svgCode_imageeditor = '<svg viewBox="-2 -2 20 20" fill="#5F6368"><style>.st0{fill:#f6f6f6}.st1{fill:#424242}.st2{fill:none}.st3{fill:#f0eff1}</style><path class="st0" d="M1 0v6H0v10h10v-1h6V0z" id="outline"/><g id="icon_x5F_bg"><path class="st1" d="M2 5h1v1H2zM2 3h1v1H2zM2 1h1v1H2zM4 1h1.001v1H4zM6 1h1v1H6zM8 1h1v1H8zM10 1h1v1h-1zM12 1h1v1h-1zM14 1h1v1h-1zM14 3h1v1h-1zM14 5h1v1h-1zM14 7h1v1h-1zM14 9h1v1h-1zM14 10.999h1V12h-1zM14 13h1v1h-1zM12 13h1v1h-1zM11 11V5H5v1H4V4h8v7z"/><circle class="st1" cx="6.192" cy="9.807" r=".807"/><path class="st1" d="M1 7v8h8V7H1zm1 7.001v-.28l2.537-1.463L7.554 14l.001.001H2zm6-.93l-3.463-1.982L2 12.491v-4.49h6v5.07zM10 13h1v1h-1z"/></g><g id="icon_x5F_fg"><path class="st2" d="M2 14h5.554v.001H2z"/><path class="st3" d="M11 5v6h-1V6H5V5z"/><path class="st3" d="M2 12.491l2.537-1.402L8 13.071v-5.07H2v4.49zM6.192 9a.807.807 0 1 1 .001 1.615A.807.807 0 0 1 6.192 9z"/><path class="st3" d="M2 13.721V14h5.554l-3.017-1.742z"/></g></svg>';
}

RTE_DefaultConfig.plugin_imageeditor = RTE_Plugin_ImageEditor;

function RTE_Plugin_ImageEditor() {



	var obj = this;

	var config, editor;

	obj.PluginName = "ImageEditor";

	obj.InitConfig = function (argconfig) {
		config = argconfig;
	}
	obj.InitEditor = function (argeditor) {
		editor = argeditor;

		editor.attachEvent("exec_command_imageeditor", function (state, cmd, value) {
			obj.DoImageEditor();
			state.returnValue = true;
		});

		editor.toolbarFactoryMap["imageeditor"] = function (cmd) {
			var span = editor.createToolbarButton(cmd);
			span.style.backgroundColor = ''
			return span;
		};

	}

	function __Append(parent, tagname, csstext, cssclass) {
		var tag = parent.ownerDocument.createElement(tagname);
		if (csstext) tag.style.cssText = csstext;
		if (cssclass) tag.className = cssclass;
		parent.appendChild(tag);
		return tag;
	}
	
	function dataURLToBlob(dataurl) {
		var arr = dataurl.split(',');
		var mime = arr[0].match(/:(.*?);/)[1];
		var bstr = atob(arr[1]);
		var n = bstr.length;
		var u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	obj.DoImageEditor = function () {

		var img = editor.getSelectedControl();
		if (!img)
			return;

		var dialoginner = editor.createDialog("ImageEditor", "rte-dialog-imageeditor");

		dialoginner.style.width = "90%";
		dialoginner.style.height = "90%";


		var scriptbase = config.url_base + "/plugins/tui.image-editor/";

		window.rte_image_editor_callback = function (win) {
			var options = {
				includeUI: {
					loadImage: {
						path: img.src,
						name: 'RteImage'
					},
					//locale: locale_ru_RU,
					theme: {
						// main icons
						'menu.normalIcon.path': scriptbase + 'svg/icon-d.svg',
						'menu.activeIcon.path': scriptbase + 'svg/icon-b.svg',
						'menu.disabledIcon.path': scriptbase + 'svg/icon-a.svg',
						'menu.hoverIcon.path': scriptbase + 'svg/icon-c.svg',
						// submenu icons
						'submenu.normalIcon.path': scriptbase + 'svg/icon-d.svg',
						'submenu.normalIcon.name': 'icon-d',
						'submenu.activeIcon.path': scriptbase + 'svg/icon-c.svg',
						'submenu.activeIcon.name': 'icon-c'
					},
					//initMenu: 'filter',
					menuBarPosition: 'bottom'
				},

				cssMaxWidth: 700,
				cssMaxHeight: 500,
				selectionStyle: {
					cornerSize: 20,
					rotatingPointOffset: 70
				}
			};
			var imgeditor = new win.tui.ImageEditor(win.document.querySelector('#tui-image-editor'), options);

			var btns = win.document.querySelector('.tui-image-editor-header-buttons');
			btns.innerHTML = '';
			var savebtn = __Append(btns, "button", "");
			savebtn.innerText = "Save";
			savebtn.onclick = function () {

				var dataurl = imgeditor.toDataURL();
				if (!config.file_upload_handler) {
					img.src = dataurl;
					editor.notifySelectionChange();
					dialoginner.close();
					return;
				}

				var file = dataURLToBlob(dataurl);

				config.file_upload_handler(file, function (url, error) {
					if (url) {
						img.src = url;
						editor.notifySelectionChange();
						dialoginner.close();
						return;
					}
					if (error) {
						//TODO:retry dialog or cancel
						alert("upload failed , TODO:show retry dialog or cancel");
					}
					else {
						alert("Developer warning : ");
					}
				});


			}

		}

		iframe = __Append(dialoginner, "iframe", "align-self:center;flex:99;width:100%;height:100%px;border:0px;", "rte-editable");
		iframe.contentDocument.open("text/html");
		iframe.contentDocument.write("<html><head><base href='" + editor.htmlEncode(location.href) + "'/>"
			+ "<link id='url-css-preview' rel='stylesheet' href='" + editor.htmlEncode(scriptbase + "tui-color-picker.min.css") + "'/>"
			+ "<link id='url-css-preview' rel='stylesheet' href='" + editor.htmlEncode(scriptbase + "tui-image-editor.min.css") + "'/>"
			+ "<script src='" + editor.htmlEncode(scriptbase + "fabric.min.js") + "'></script>"
			+ "<script src='" + editor.htmlEncode(scriptbase + "tui-color-picker.min.js") + "'></script>"
			+ "<script src='" + editor.htmlEncode(scriptbase + "tui-code-snippet.min.js") + "'></script>"
			+ "<script src='" + editor.htmlEncode(scriptbase + "tui-image-editor.min.js") + "'></script>"
			+ "</head><body style='padding:10px;margin:0px'><div id='tui-image-editor'></div></body>"
			+ "<script>window.onload=function(){setTimeout(function(){parent.rte_image_editor_callback(window)},100)}</script></html>")
		iframe.contentDocument.close();
	}
}





if (!RTE_DefaultConfig.svgCode_insertcode) {
	RTE_DefaultConfig.svgCode_insertcode = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/><line x1="14" y1="5" x2="10" y2="19"/></svg>';
}

RTE_DefaultConfig.plugin_insertcode = RTE_Plugin_InsertCode;

function RTE_Plugin_InsertCode() {


	var dp = { sh: { Toolbar: {}, Utils: {}, RegexLib: {}, Brushes: {}, Version: '1.5.1' } };
	dp.InsertCode = dp.sh;


	dp.sh.Utils.CopyStyles = function (destDoc, sourceDoc) {
		var links = sourceDoc.getElementsByTagName('link'); for (var i = 0; i < links.length; i++)
			if (links[i].rel.toLowerCase() == 'stylesheet')
				destDoc.write('<link type="text/css" rel="stylesheet" href="' + links[i].href + '"></link>');
	}
	dp.sh.Utils.FixForBlogger = function (str) { return (dp.sh.isBloggerMode == true) ? str.replace(/<br\s*\/?>|&lt;br\s*\/?&gt;/gi, '\n') : str; }
	dp.sh.RegexLib = { MultiLineCComments: new RegExp('/\\*[\\s\\S]*?\\*/', 'gm'), SingleLineCComments: new RegExp('//.*$', 'gm'), SingleLinePerlComments: new RegExp('#.*$', 'gm'), DoubleQuotedString: new RegExp('"(?:\\.|(\\\\\\")|[^\\""\\n])*"', 'g'), SingleQuotedString: new RegExp("'(?:\\.|(\\\\\\')|[^\\''\\n])*'", 'g') }; dp.sh.Match = function (value, index, css) { this.value = value; this.index = index; this.length = value.length; this.css = css; }
	dp.sh.Highlighter = function () { this.noGutter = false; this.addControls = true; this.collapse = false; this.tabsToSpaces = true; this.wrapColumn = 80; this.showColumns = true; }
	dp.sh.Highlighter.SortCallback = function (m1, m2) {
		if (m1.index < m2.index)
			return -1; else if (m1.index > m2.index)
			return 1; else {
			if (m1.length < m2.length)
				return -1; else if (m1.length > m2.length)
				return 1;
		}
		return 0;
	}
	dp.sh.Highlighter.prototype.CreateElement = function (name) { var result = document.createElement(name); result.highlighter = this; return result; }
	dp.sh.Highlighter.prototype.GetMatches = function (regex, css) {
		var index = 0; var match = null; while ((match = regex.exec(this.code)) != null)
			this.matches[this.matches.length] = new dp.sh.Match(match[0], match.index, css);
	}
	dp.sh.Highlighter.prototype.AddBit = function (str, css) {
		if (str == null || str.length == 0)
			return; var span = this.CreateElement('SPAN'); str = str.replace(/ /g, '&nbsp;'); str = str.replace(/</g, '&lt;'); str = str.replace(/\n/gm, '&nbsp;<br>'); if (css != null) {
				if ((/br/gi).test(str)) {
					var lines = str.split('&nbsp;<br>'); for (var i = 0; i < lines.length; i++) {
						span = this.CreateElement('SPAN'); span.className = css; span.innerHTML = lines[i]; this.div.appendChild(span); if (i + 1 < lines.length)
							this.div.appendChild(this.CreateElement('BR'));
					}
				}
				else { span.className = css; span.innerHTML = str; this.div.appendChild(span); }
			}
		else { span.innerHTML = str; this.div.appendChild(span); }
	}
	dp.sh.Highlighter.prototype.IsInside = function (match) {
		if (match == null || match.length == 0)
			return false; for (var i = 0; i < this.matches.length; i++) {
				var c = this.matches[i]; if (c == null)
					continue; if ((match.index > c.index) && (match.index < c.index + c.length))
					return true;
			}
		return false;
	}
	dp.sh.Highlighter.prototype.ProcessRegexList = function () {
		for (var i = 0; i < this.regexList.length; i++)
			this.GetMatches(this.regexList[i].regex, this.regexList[i].css);
	}
	dp.sh.Highlighter.prototype.ProcessSmartTabs = function (code) {
		var lines = code.split('\n'); var result = ''; var tabSize = 4; var tab = '\t'; function InsertSpaces(line, pos, count) {
			var left = line.substr(0, pos); var right = line.substr(pos + 1, line.length); var spaces = ''; for (var i = 0; i < count; i++)
				spaces += ' '; return left + spaces + right;
		}
		function ProcessLine(line, tabSize) {
			if (line.indexOf(tab) == -1)
				return line; var pos = 0; while ((pos = line.indexOf(tab)) != -1) { var spaces = tabSize - pos % tabSize; line = InsertSpaces(line, pos, spaces); }
			return line;
		}
		for (var i = 0; i < lines.length; i++)
			result += ProcessLine(lines[i], tabSize) + '\n'; return result;
	}
	dp.sh.Highlighter.prototype.SwitchToList = function () {
		var html = this.div.innerHTML.replace(/<(br)\/?>/gi, '\n'); var lines = html.split('\n'); if (this.addControls == true)
			this.bar.appendChild(dp.sh.Toolbar.Create(this)); if (this.showColumns) {
				var div = this.CreateElement('div'); var columns = this.CreateElement('div'); var showEvery = 10; var i = 1; while (i <= 150) {
					if (i % showEvery == 0) { div.innerHTML += i; i += (i + '').length; }
					else { div.innerHTML += '&middot;'; i++; }
				}
				columns.className = 'columns'; columns.appendChild(div); this.bar.appendChild(columns);
			}
		for (var i = 0, lineIndex = this.firstLine; i < lines.length - 1; i++, lineIndex++) { var li = this.CreateElement('LI'); var span = this.CreateElement('SPAN'); li.className = (i % 2 == 0) ? 'alt' : ''; span.innerHTML = lines[i] + '&nbsp;'; li.appendChild(span); this.ol.appendChild(li); }
		this.div.innerHTML = '';
	}
	dp.sh.Highlighter.prototype.Highlight = function (code) {
		function Trim(str) { return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1'); }
		function Chop(str) { return str.replace(/\n*$/, '').replace(/^\n*/, ''); }
		function Unindent(str) {
			var lines = dp.sh.Utils.FixForBlogger(str).split('\n'); var indents = new Array(); var regex = new RegExp('^\\s*', 'g'); var min = 1000; for (var i = 0; i < lines.length && min > 0; i++) {
				if (Trim(lines[i]).length == 0)
					continue; var matches = regex.exec(lines[i]); if (matches != null && matches.length > 0)
					min = Math.min(matches[0].length, min);
			}
			if (min > 0)
				for (var i = 0; i < lines.length; i++)
					lines[i] = lines[i].substr(min); return lines.join('\n');
		}
		function Copy(string, pos1, pos2) { return string.substr(pos1, pos2 - pos1); }
		var pos = 0; if (code == null)
			code = ''; this.originalCode = code; this.code = Chop(Unindent(code)); this.div = this.CreateElement('DIV'); this.bar = this.CreateElement('DIV'); this.ol = this.CreateElement('OL'); this.matches = new Array(); this.div.className = 'dp-highlighter'; this.div.highlighter = this; this.bar.className = 'bar'; this.ol.start = this.firstLine; if (this.CssClass != null)
			this.ol.className = this.CssClass; if (this.collapse)
			this.div.className += ' collapsed'; if (this.noGutter)
			this.div.className += ' nogutter'; if (this.tabsToSpaces == true)
			this.code = this.ProcessSmartTabs(this.code); this.ProcessRegexList(); if (this.matches.length == 0) { this.AddBit(this.code, null); this.SwitchToList(); this.div.appendChild(this.bar); this.div.appendChild(this.ol); return; }
		this.matches = this.matches.sort(dp.sh.Highlighter.SortCallback); for (var i = 0; i < this.matches.length; i++)
			if (this.IsInside(this.matches[i]))
				this.matches[i] = null; for (var i = 0; i < this.matches.length; i++) {
					var match = this.matches[i]; if (match == null || match.length == 0)
						continue; this.AddBit(Copy(this.code, pos, match.index), null); this.AddBit(match.value, match.css); pos = match.index + match.length;
				}
		this.AddBit(this.code.substr(pos), null); this.SwitchToList(); this.div.appendChild(this.bar); this.div.appendChild(this.ol);
	}
	dp.sh.Highlighter.prototype.GetKeywords = function (str) { return '\\b' + str.replace(/ /g, '\\b|\\b') + '\\b'; }
	dp.sh.BloggerMode = function () { dp.sh.isBloggerMode = true; }
	dp.sh.HighlightAll = function (element, showGutter, showControls, collapseAll, firstLine, showColumns) {
		function FindValue() {
			var a = arguments; for (var i = 0; i < a.length; i++) {
				if (a[i] == null)
					continue; if (typeof (a[i]) == 'string' && a[i] != '')
					return a[i] + ''; if (typeof (a[i]) == 'object' && a[i].value != '')
					return a[i].value + '';
			}
			return null;
		}
		function IsOptionSet(value, list) {
			for (var i = 0; i < list.length; i++)
				if (list[i] == value)
					return true; return false;
		}
		function GetOptionValue(name, list, defaultValue) {
			var regex = new RegExp('^' + name + '\\[(\\w+)\\]$', 'gi'); var matches = null; for (var i = 0; i < list.length; i++)
				if ((matches = regex.exec(list[i])) != null)
					return matches[1]; return defaultValue;
		}
		function FindTagsByName(list, name, tagName) {
			var tags = document.getElementsByTagName(tagName); for (var i = 0; i < tags.length; i++)
				if (tags[i].getAttribute('name') == name)
					list.push(tags[i]);
		}
		var elements = [element]; var highlighter = null; var registered = {}; var propertyName = 'innerHTML';

		for (var brush in dp.sh.Brushes) {
			var aliases = dp.sh.Brushes[brush].Aliases; if (aliases == null)
				continue; for (var i = 0; i < aliases.length; i++)
				registered[aliases[i]] = brush;
		}

		for (var i = 0; i < elements.length; i++) {
			var element = elements[i]; var options = FindValue(element.attributes['class'], element.className, element.attributes['language'], element.language); var language = ''; if (options == null)
				continue; options = options.split(':'); language = options[0].toLowerCase(); if (registered[language] == null)
				continue; highlighter = new dp.sh.Brushes[registered[language]](); element.style.display = 'none'; highlighter.noGutter = (showGutter == null) ? IsOptionSet('nogutter', options) : !showGutter; highlighter.addControls = (showControls == null) ? !IsOptionSet('nocontrols', options) : showControls; highlighter.collapse = (collapseAll == null) ? IsOptionSet('collapse', options) : collapseAll; highlighter.showColumns = (showColumns == null) ? IsOptionSet('showcolumns', options) : showColumns; var headNode = document.getElementsByTagName('head')[0]; if (highlighter.Style && headNode) {
					var styleNode = document.createElement('style'); styleNode.setAttribute('type', 'text/css'); if (styleNode.styleSheet) { styleNode.styleSheet.cssText = highlighter.Style; }
					else { var textNode = document.createTextNode(highlighter.Style); styleNode.appendChild(textNode); }
					headNode.appendChild(styleNode);
				}
			highlighter.firstLine = (firstLine == null) ? parseInt(GetOptionValue('firstline', options, 1)) : firstLine; highlighter.Highlight(element[propertyName]); highlighter.source = element; element.parentNode.insertBefore(highlighter.div, element);
		}
	}


	dp.sh.Brushes.JScript = function () { var keywords = 'abstract boolean break byte case catch char class const continue debugger ' + 'default delete do double else enum export extends false final finally float ' + 'for function goto if implements import in instanceof int interface long native ' + 'new null package private protected public return short static super switch ' + 'synchronized this throw throws transient true try typeof var void volatile while with'; this.regexList = [{ regex: dp.sh.RegexLib.SingleLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.MultiLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: dp.sh.RegexLib.SingleQuotedString, css: 'string' }, { regex: new RegExp('^\\s*#.*', 'gm'), css: 'preprocessor' }, { regex: new RegExp(this.GetKeywords(keywords), 'gm'), css: 'keyword' }]; this.CssClass = 'dp-c'; }
	dp.sh.Brushes.JScript.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.JScript.Aliases = ['js', 'jscript', 'javascript'];

	dp.sh.Brushes.Java = function () { var keywords = 'abstract assert boolean break byte case catch char class const ' + 'continue default do double else enum extends ' + 'false final finally float for goto if implements import ' + 'instanceof int interface long native new null ' + 'package private protected public return ' + 'short static strictfp super switch synchronized this throw throws true ' + 'transient try void volatile while'; this.regexList = [{ regex: dp.sh.RegexLib.SingleLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.MultiLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: dp.sh.RegexLib.SingleQuotedString, css: 'string' }, { regex: new RegExp('\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b', 'gi'), css: 'number' }, { regex: new RegExp('(?!\\@interface\\b)\\@[\\$\\w]+\\b', 'g'), css: 'annotation' }, { regex: new RegExp('\\@interface\\b', 'g'), css: 'keyword' }, { regex: new RegExp(this.GetKeywords(keywords), 'gm'), css: 'keyword' }]; this.CssClass = 'dp-j'; this.Style = '.dp-j .annotation { color: #646464; }' + '.dp-j .number { color: #C00000; }'; }
	dp.sh.Brushes.Java.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.Java.Aliases = ['java'];

	dp.sh.Brushes.Cpp = function () { var datatypes = 'ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR ' + 'DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH ' + 'HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP ' + 'HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY ' + 'HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT ' + 'HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE ' + 'LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF ' + 'LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR ' + 'LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR ' + 'PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT ' + 'PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 ' + 'POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR ' + 'PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 ' + 'PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT ' + 'SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG ' + 'ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM ' + 'char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t ' + 'clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS ' + 'FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t ' + '__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t ' + 'jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler ' + 'sig_atomic_t size_t _stat __stat64 _stati64 terminate_function ' + 'time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf ' + 'va_list wchar_t wctrans_t wctype_t wint_t signed'; var keywords = 'break case catch class const __finally __exception __try ' + 'const_cast continue private public protected __declspec ' + 'default delete deprecated dllexport dllimport do dynamic_cast ' + 'else enum explicit extern if for friend goto inline ' + 'mutable naked namespace new noinline noreturn nothrow ' + 'register reinterpret_cast return selectany ' + 'sizeof static static_cast struct switch template this ' + 'thread throw true false try typedef typeid typename union ' + 'using uuid virtual void volatile whcar_t while'; this.regexList = [{ regex: dp.sh.RegexLib.SingleLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.MultiLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: dp.sh.RegexLib.SingleQuotedString, css: 'string' }, { regex: new RegExp('^ *#.*', 'gm'), css: 'preprocessor' }, { regex: new RegExp(this.GetKeywords(datatypes), 'gm'), css: 'datatypes' }, { regex: new RegExp(this.GetKeywords(keywords), 'gm'), css: 'keyword' }]; this.CssClass = 'dp-cpp'; this.Style = '.dp-cpp .datatypes { color: #2E8B57; font-weight: bold; }'; }
	dp.sh.Brushes.Cpp.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.Cpp.Aliases = ['cpp', 'c', 'c++'];

	dp.sh.Brushes.CSharp = function () { var keywords = 'abstract as base bool break byte case catch char checked class const ' + 'continue decimal default delegate do double else enum event explicit ' + 'extern false finally fixed float for foreach get goto if implicit in int ' + 'interface internal is lock long namespace new null object operator out ' + 'override params private protected public readonly ref return sbyte sealed set ' + 'short sizeof stackalloc static string struct switch this throw true try ' + 'typeof uint ulong unchecked unsafe ushort using virtual void while'; this.regexList = [{ regex: dp.sh.RegexLib.SingleLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.MultiLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: dp.sh.RegexLib.SingleQuotedString, css: 'string' }, { regex: new RegExp('^\\s*#.*', 'gm'), css: 'preprocessor' }, { regex: new RegExp(this.GetKeywords(keywords), 'gm'), css: 'keyword' }]; this.CssClass = 'dp-c'; this.Style = '.dp-c .vars { color: #d00; }'; }
	dp.sh.Brushes.CSharp.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.CSharp.Aliases = ['c#', 'c-sharp', 'csharp'];

	dp.sh.Brushes.CSS = function () { var keywords = 'ascent azimuth background-attachment background-color background-image background-position ' + 'background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top ' + 'border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color ' + 'border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width ' + 'border-bottom-width border-left-width border-width border cap-height caption-side centerline clear clip color ' + 'content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display ' + 'elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font ' + 'height letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top ' + 'margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans ' + 'outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page ' + 'page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position ' + 'quotes richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress ' + 'table-layout text-align text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em ' + 'vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index'; var values = 'above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder ' + 'both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed ' + 'continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double ' + 'embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia ' + 'gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic ' + 'justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha ' + 'lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower ' + 'navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset ' + 'outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side ' + 'rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow ' + 'small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize ' + 'table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal ' + 'text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin ' + 'upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow'; var fonts = '[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif'; this.regexList = [{ regex: dp.sh.RegexLib.MultiLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: dp.sh.RegexLib.SingleQuotedString, css: 'string' }, { regex: new RegExp('\\#[a-zA-Z0-9]{3,6}', 'g'), css: 'value' }, { regex: new RegExp('(-?\\d+)(\.\\d+)?(px|em|pt|\:|\%|)', 'g'), css: 'value' }, { regex: new RegExp('!important', 'g'), css: 'important' }, { regex: new RegExp(this.GetKeywordsCSS(keywords), 'gm'), css: 'keyword' }, { regex: new RegExp(this.GetValuesCSS(values), 'g'), css: 'value' }, { regex: new RegExp(this.GetValuesCSS(fonts), 'g'), css: 'value' }]; this.CssClass = 'dp-css'; this.Style = '.dp-css .value { color: black; }' + '.dp-css .important { color: red; }'; }
	dp.sh.Highlighter.prototype.GetKeywordsCSS = function (str) { return '\\b([a-z_]|)' + str.replace(/ /g, '(?=:)\\b|\\b([a-z_\\*]|\\*|)') + '(?=:)\\b'; }
	dp.sh.Highlighter.prototype.GetValuesCSS = function (str) { return '\\b' + str.replace(/ /g, '(?!-)(?!:)\\b|\\b()') + '\:\\b'; }
	dp.sh.Brushes.CSS.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.CSS.Aliases = ['css'];

	dp.sh.Brushes.Php = function () { var funcs = 'abs acos acosh addcslashes addslashes ' + 'array_change_key_case array_chunk array_combine array_count_values array_diff ' + 'array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill ' + 'array_filter array_flip array_intersect array_intersect_assoc array_intersect_key ' + 'array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map ' + 'array_merge array_merge_recursive array_multisort array_pad array_pop array_product ' + 'array_push array_rand array_reduce array_reverse array_search array_shift ' + 'array_slice array_splice array_sum array_udiff array_udiff_assoc ' + 'array_udiff_uassoc array_uintersect array_uintersect_assoc ' + 'array_uintersect_uassoc array_unique array_unshift array_values array_walk ' + 'array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert ' + 'basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress ' + 'bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir ' + 'checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists ' + 'closedir closelog copy cos cosh count count_chars date decbin dechex decoct ' + 'deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log ' + 'error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded ' + 'feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents ' + 'fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype ' + 'floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf ' + 'fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname ' + 'gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt ' + 'getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext ' + 'gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set ' + 'interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double ' + 'is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long ' + 'is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault ' + 'is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br ' + 'parse_ini_file parse_str parse_url passthru pathinfo readlink realpath rewind rewinddir rmdir ' + 'round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split ' + 'str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes ' + 'stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk ' + 'strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime ' + 'strtoupper strtr strval substr substr_compare'; var keywords = 'and or xor __FILE__ __LINE__ array as break case ' + 'cfunction class const continue declare default die do else ' + 'elseif empty enddeclare endfor endforeach endif endswitch endwhile ' + 'extends for foreach function include include_once global if ' + 'new old_function return static switch use require require_once ' + 'var while __FUNCTION__ __CLASS__ ' + '__METHOD__ abstract interface public implements extends private protected throw'; this.regexList = [{ regex: dp.sh.RegexLib.SingleLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.MultiLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: dp.sh.RegexLib.SingleQuotedString, css: 'string' }, { regex: new RegExp('\\$\\w+', 'g'), css: 'vars' }, { regex: new RegExp(this.GetKeywords(funcs), 'gmi'), css: 'func' }, { regex: new RegExp(this.GetKeywords(keywords), 'gm'), css: 'keyword' }]; this.CssClass = 'dp-c'; }
	dp.sh.Brushes.Php.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.Php.Aliases = ['php'];

	dp.sh.Brushes.Python = function () {
		var keywords = 'and assert break class continue def del elif else ' + 'except exec finally for from global if import in is ' + 'lambda not or pass print raise return try yield while'; var special = 'None True False self cls class_'
		this.regexList = [{ regex: dp.sh.RegexLib.SingleLinePerlComments, css: 'comment' }, { regex: new RegExp("^\\s*@\\w+", 'gm'), css: 'decorator' }, { regex: new RegExp("(['\"]{3})([^\\1])*?\\1", 'gm'), css: 'comment' }, { regex: new RegExp('"(?!")(?:\\.|\\\\\\"|[^\\""\\n\\r])*"', 'gm'), css: 'string' }, { regex: new RegExp("'(?!')*(?:\\.|(\\\\\\')|[^\\''\\n\\r])*'", 'gm'), css: 'string' }, { regex: new RegExp("\\b\\d+\\.?\\w*", 'g'), css: 'number' }, { regex: new RegExp(this.GetKeywords(keywords), 'gm'), css: 'keyword' }, { regex: new RegExp(this.GetKeywords(special), 'gm'), css: 'special' }]; this.CssClass = 'dp-py'; this.Style = '.dp-py .builtins { color: #ff1493; }' + '.dp-py .magicmethods { color: #808080; }' + '.dp-py .exceptions { color: brown; }' + '.dp-py .types { color: brown; font-style: italic; }' + '.dp-py .commonlibs { color: #8A2BE2; font-style: italic; }';
	}
	dp.sh.Brushes.Python.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.Python.Aliases = ['py', 'python'];

	dp.sh.Brushes.Xml = function () { this.CssClass = 'dp-xml'; this.Style = '.dp-xml .cdata { color: #ff1493; }' + '.dp-xml .tag, .dp-xml .tag-name { color: #069; font-weight: bold; }' + '.dp-xml .attribute { color: red; }' + '.dp-xml .attribute-value { color: blue; }'; }
	dp.sh.Brushes.Xml.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.Xml.Aliases = ['xml', 'xhtml', 'xslt', 'html', 'xhtml']; dp.sh.Brushes.Xml.prototype.ProcessRegexList = function () {
		function push(array, value) { array[array.length] = value; }
		var index = 0; var match = null; var regex = null; this.GetMatches(new RegExp('(\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\&gt;|>)', 'gm'), 'cdata'); this.GetMatches(new RegExp('(\&lt;|<)!--\\s*.*?\\s*--(\&gt;|>)', 'gm'), 'comments'); regex = new RegExp('([:\\w-\.]+)\\s*=\\s*(".*?"|\'.*?\'|\\w+)*|(\\w+)', 'gm'); while ((match = regex.exec(this.code)) != null) {
			if (match[1] == null) { continue; }
			push(this.matches, new dp.sh.Match(match[1], match.index, 'attribute')); if (match[2] != undefined) { push(this.matches, new dp.sh.Match(match[2], match.index + match[0].indexOf(match[2]), 'attribute-value')); }
		}
		this.GetMatches(new RegExp('(\&lt;|<)/*\\?*(?!\\!)|/*\\?*(\&gt;|>)', 'gm'), 'tag'); regex = new RegExp('(?:\&lt;|<)/*\\?*\\s*([:\\w-\.]+)', 'gm'); while ((match = regex.exec(this.code)) != null) { push(this.matches, new dp.sh.Match(match[1], match.index + match[0].indexOf(match[1]), 'tag-name')); }
	}

	dp.sh.Brushes.Vb = function () { var keywords = 'AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto ' + 'Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate ' + 'CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType ' + 'Date Decimal Declare Default Delegate Dim DirectCast Do Double Each ' + 'Else ElseIf End Enum Erase Error Event Exit False Finally For Friend ' + 'Function Get GetType GoSub GoTo Handles If Implements Imports In ' + 'Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module ' + 'MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing ' + 'NotInheritable NotOverridable Object On Option Optional Or OrElse ' + 'Overloads Overridable Overrides ParamArray Preserve Private Property ' + 'Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume ' + 'Return Select Set Shadows Shared Short Single Static Step Stop String ' + 'Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until ' + 'Variant When While With WithEvents WriteOnly Xor'; this.regexList = [{ regex: new RegExp('\'.*$', 'gm'), css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: new RegExp('^\\s*#.*', 'gm'), css: 'preprocessor' }, { regex: new RegExp(this.GetKeywords(keywords), 'gm'), css: 'keyword' }]; this.CssClass = 'dp-vb'; }
	dp.sh.Brushes.Vb.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.Vb.Aliases = ['vb', 'vb.net'];

	dp.sh.Brushes.Ruby = function () {
		var keywords = 'alias and BEGIN begin break case class def define_method defined do each else elsif ' + 'END end ensure false for if in module new next nil not or raise redo rescue retry return ' + 'self super then throw true undef unless until when while yield'; var builtins = 'Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload ' + 'Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol ' + 'ThreadGroup Thread Time TrueClass'
		this.regexList = [{ regex: dp.sh.RegexLib.SingleLinePerlComments, css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: dp.sh.RegexLib.SingleQuotedString, css: 'string' }, { regex: new RegExp(':[a-z][A-Za-z0-9_]*', 'g'), css: 'symbol' }, { regex: new RegExp('(\\$|@@|@)\\w+', 'g'), css: 'variable' }, { regex: new RegExp(this.GetKeywords(keywords), 'gm'), css: 'keyword' }, { regex: new RegExp(this.GetKeywords(builtins), 'gm'), css: 'builtin' }]; this.CssClass = 'dp-rb'; this.Style = '.dp-rb .symbol { color: #a70; }' + '.dp-rb .variable { color: #a70; font-weight: bold; }';
	}
	dp.sh.Brushes.Ruby.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.Ruby.Aliases = ['ruby', 'rails', 'ror'];

	dp.sh.Brushes.Sql = function () { var funcs = 'abs avg case cast coalesce convert count current_timestamp ' + 'current_user day isnull left lower month nullif replace right ' + 'session_user space substring sum system_user upper user year'; var keywords = 'absolute action add after alter as asc at authorization begin bigint ' + 'binary bit by cascade char character check checkpoint close collate ' + 'column commit committed connect connection constraint contains continue ' + 'create cube current current_date current_time cursor database date ' + 'deallocate dec decimal declare default delete desc distinct double drop ' + 'dynamic else end end-exec escape except exec execute false fetch first ' + 'float for force foreign forward free from full function global goto grant ' + 'group grouping having hour ignore index inner insensitive insert instead ' + 'int integer intersect into is isolation key last level load local max min ' + 'minute modify move name national nchar next no numeric of off on only ' + 'open option order out output partial password precision prepare primary ' + 'prior privileges procedure public read real references relative repeatable ' + 'restrict return returns revoke rollback rollup rows rule schema scroll ' + 'second section select sequence serializable set size smallint static ' + 'statistics table temp temporary then time timestamp to top transaction ' + 'translation trigger true truncate uncommitted union unique update values ' + 'varchar varying view when where with work'; var operators = 'all and any between cross in join like not null or outer some'; this.regexList = [{ regex: new RegExp('--(.*)$', 'gm'), css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: dp.sh.RegexLib.SingleQuotedString, css: 'string' }, { regex: new RegExp(this.GetKeywords(funcs), 'gmi'), css: 'func' }, { regex: new RegExp(this.GetKeywords(operators), 'gmi'), css: 'op' }, { regex: new RegExp(this.GetKeywords(keywords), 'gmi'), css: 'keyword' }]; this.CssClass = 'dp-sql'; this.Style = '.dp-sql .func { color: #ff1493; }' + '.dp-sql .op { color: #808080; }'; }
	dp.sh.Brushes.Sql.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.Sql.Aliases = ['sql'];


	var obj = this;

	var config, editor;

	obj.PluginName = "InsertCode";

	obj.InitConfig = function (argconfig) {
		config = argconfig;
	}
	obj.InitEditor = function (argeditor) {
		editor = argeditor;

		editor.attachEvent("exec_command_insertcode", function (state, cmd, value) {
			obj.DoShowDialog();
			state.returnValue = true;
		});

		editor.toolbarFactoryMap["insertcode"] = function (cmd) {
			//console.log(cmd);
			var span = editor.createToolbarButton(cmd);
			span.style.backgroundColor = ''
			return span;
		};

	}

	function __Append(parent, tagname, csstext, cssclass) {
		var tag = parent.ownerDocument.createElement(tagname);
		if (csstext) tag.style.cssText = csstext;
		if (cssclass) tag.className = cssclass;
		parent.appendChild(tag);
		return tag;
	}


	obj.DoShowDialog = function () {

		var dialoginner = editor.createDialog(editor.getLangText("insertcode"), "rte-dialog-insertcode");

		var div2 = __Append(dialoginner, "div", "position:relative;text-align:center;");
		__Append(div2, "label").innerText = editor.getLangText("language") + ":";
		var sel_lang = __Append(div2, "select", "width:200px;");

		sel_lang.options.add(new Option("Plain Text", ""));

		for (var brush in dp.sh.Brushes) {
			var aliases = dp.sh.Brushes[brush].Aliases;

			if (aliases == null)
				continue;
			sel_lang.options.add(new Option(aliases, brush));


			var b = sessionStorage.getItem("rte-insertcode-lang")
			if (b) sel_lang.value = b;
		}


		var div1 = __Append(dialoginner, "div", "position:relative;text-align:center;");
		var textarea = __Append(div1, "textarea", "width:100%;min-width:300px;height:200px")

		var divfooter = __Append(dialoginner, "rte-dialog-footer", null, "rte-dialog-footer-center");

		var btn = __Append(divfooter, "rte-dialog-button")
		btn.innerText = "Insert";

		setTimeout(function () {
			textarea.focus();
		}, 300);

		btn.onclick = function () {
			dialoginner.close();

			sessionStorage.setItem("rte-insertcode-lang", sel_lang.value)

			if (sel_lang.value != "") {
				var b = dp.sh.Brushes[sel_lang.value];

				textarea.language = b.Aliases[0] + ":nocontrols";
				textarea.name = "rteinsertcode" + new Date().getTime();
				textarea.innerHTML = textarea.value;
				dp.sh.HighlightAll(textarea);

				var tag = textarea.previousSibling

				var p = editor.insertRootParagraph()
				p.innerHTML = '<div class="dp-highlighter">' + tag.innerHTML + "</div>";
			}
			else {
				var p = editor.insertRootParagraph()
				p.innerText = textarea.value;
			}

			editor.focus();
		}
	}
}






RTE_DefaultConfig.plugin_insertemoji = RTE_Plugin_InsertEmoji;

function RTE_Plugin_InsertEmoji() {

	function CharToHTMLCode(ch) {
		if (ch.length > 2)
			return ch;

		if (ch.length == 1 || ch.charCodeAt(1) == 0xfe0f)
			return "&#" + ch.charCodeAt(0) + ";"

		if (ch.charCodeAt(1) == 0xfe0f) {
			return "&#" + ch.charCodeAt(0) + ";"
		}

		var offset = ch.charCodeAt(0) - 0xd83c;
		if (offset < 0 && offset > 3)//not support
			return ch;

		var second = ch.charCodeAt(1) - 0xdc04;
		var f = offset * 0x400 + second + 0x1f004;
		return "&#x" + f.toString(16) + ";"
	}


	var groupnames = ["smileys", "people", "animals", "food", "travel", "activities", "objects", "symbols"]
	var emojistrs = ["😀#grinning face|😃#grinning face with big eyes|😄#grinning face with smiling eyes|😁#beaming face with smiling eyes|😆#grinning squinting face|😅#grinning face with sweat|🤣#rolling on the floor laughing|😂#face with tears of joy|🙂#slightly smiling face|🙃#upside-down face|😉#winking face|😊#smiling face with smiling eyes|😇#smiling face with halo|😍#smiling face with heart-eyes|🤩#star-struck|😘#face blowing a kiss|😗#kissing face|😚#kissing face with closed eyes|😙#kissing face with smiling eyes|😋#face savoring food|😛#face with tongue|😜#winking face with tongue|🤪#zany face|😝#squinting face with tongue|🤑#money-mouth face|🤗#hugging face|🤭#face with hand over mouth|🤫#shushing face|🤔#thinking face|🤐#zipper-mouth face|🤨#face with raised eyebrow|😐#neutral face|😑#expressionless face|😶#face without mouth|😏#smirking face|😒#unamused face|🙄#face with rolling eyes|😬#grimacing face|🤥#lying face|😌#relieved face|😔#pensive face|😪#sleepy face|🤤#drooling face|😴#sleeping face|😷#face with medical mask|🤒#face with thermometer|🤕#face with head-bandage|🤢#nauseated face|🤮#face vomiting|🤧#sneezing face|😵#dizzy face|🤯#exploding head|🤠#cowboy hat face|😎#smiling face with sunglasses|🤓#nerd face|🧐#face with monocle|😕#confused face|😟#worried face|🙁#slightly frowning face|☹️#frowning face|😮#face with open mouth|😯#hushed face|😲#astonished face|😳#flushed face|😦#frowning face with open mouth|😧#anguished face|😨#fearful face|😰#anxious face with sweat|😥#sad but relieved face|😢#crying face|😭#loudly crying face|😱#face screaming in fear|😖#confounded face|😣#persevering face|😞#disappointed face|😓#downcast face with sweat|😩#weary face|😫#tired face|😤#face with steam from nose|😡#pouting face|😠#angry face|🤬#face with symbols on mouth|😈#smiling face with horns|👿#angry face with horns|💀#skull|☠️#skull and crossbones|💩#pile of poo|🤡#clown face|👹#ogre|👺#goblin|👻#ghost|👽#alien|👾#alien monster|🤖#robot|😺#grinning cat|😸#grinning cat with smiling eyes|😹#cat with tears of joy|😻#smiling cat with heart-eyes|😼#cat with wry smile|😽#kissing cat|🙀#weary cat|😿#crying cat|😾#pouting cat|🙈#see-no-evil monkey|🙉#hear-no-evil monkey|🙊#speak-no-evil monkey|💋#kiss mark|💌#love letter|💘#heart with arrow|💝#heart with ribbon|💖#sparkling heart|💗#growing heart|💓#beating heart|💞#revolving hearts|💕#two hearts|💟#heart decoration|❣️#heart exclamation|💔#broken heart|❤️#red heart|🧡#orange heart|💛#yellow heart|💚#green heart|💙#blue heart|💜#purple heart|🖤#black heart|💯#hundred points|💢#anger symbol|💥#collision|💫#dizzy|💦#sweat droplets|💨#dashing away|💣#bomb|💬#speech balloon|💭#thought balloon|💤#zzz", "👋#waving hand|🤚#raised back of hand|✋#raised hand|🖖#vulcan salute|👌#OK hand|✌️#victory hand|🤞#crossed fingers|🤟#love-you gesture|🤘#sign of the horns|🤙#call me hand|👈#backhand index pointing left|👉#backhand index pointing right|👆#backhand index pointing up|🖕#middle finger|👇#backhand index pointing down|☝️#index pointing up|👍#thumbs up|👎#thumbs down|✊#raised fist|👊#oncoming fist|🤛#left-facing fist|🤜#right-facing fist|👏#clapping hands|🙌#raising hands|👐#open hands|🤲#palms up together|🤝#handshake|🙏#folded hands|✍️#writing hand|💅#nail polish|🤳#selfie|💪#flexed biceps|👂#ear|👃#nose|🧠#brain|👀#eyes|👅#tongue|👄#mouth|👶#baby|🧒#child|👦#boy|👧#girl|🧑#person|👱#person with blond hair|👨#man|🧔#man with beard|👩#woman|🧓#older person|👴#old man|👵#old woman|🙍#person frowning|🙎#person pouting|🙅#person gesturing NO|🙆#person gesturing OK|💁#person tipping hand|🙋#person raising hand|🙇#person bowing|🤦#person facepalming|🤷#person shrugging|👮#police officer|💂#guard|👷#construction worker|🤴#prince|👸#princess|👳#person wearing turban|👲#person with skullcap|🧕#woman with headscarf|🤵#person in tuxedo|👰#person with veil|🤰#pregnant woman|🤱#breast-feeding|👼#baby angel|🎅#Santa Claus|🤶#Mrs. Claus|🧙#mage|🧚#fairy|🧛#vampire|🧜#merperson|🧝#elf|🧞#genie|🧟#zombie|💆#person getting massage|💇#person getting haircut|🚶#person walking|🏃#person running|💃#woman dancing|🕺#man dancing|👯#people with bunny ears|🧖#person in steamy room|🧗#person climbing|🤺#person fencing|🏇#horse racing|⛷️#skier|🏂#snowboarder|🏄#person surfing|🚣#person rowing boat|🏊#person swimming|⛹️#person bouncing ball|🚴#person biking|🚵#person mountain biking|🤸#person cartwheeling|🤼#people wrestling|🤽#person playing water polo|🤾#person playing handball|🤹#person juggling|🧘#person in lotus position|🛀#person taking bath|🛌#person in bed|👭#women holding hands|👫#woman and man holding hands|👬#men holding hands|💏#kiss|💑#couple with heart|👪#family|👤#bust in silhouette|👥#busts in silhouette|👣#footprints", "🐵#monkey face|🐒#monkey|🦍#gorilla|🐶#dog face|🐕#dog|🐩#poodle|🐺#wolf|🦊#fox|🐱#cat face|🐈#cat|🦁#lion|🐯#tiger face|🐅#tiger|🐆#leopard|🐴#horse face|🐎#horse|🦄#unicorn|🦓#zebra|🦌#deer|🐮#cow face|🐂#ox|🐃#water buffalo|🐄#cow|🐷#pig face|🐖#pig|🐗#boar|🐽#pig nose|🐏#ram|🐑#ewe|🐐#goat|🐪#camel|🐫#two-hump camel|🦒#giraffe|🐘#elephant|🦏#rhinoceros|🐭#mouse face|🐁#mouse|🐀#rat|🐹#hamster|🐰#rabbit face|🐇#rabbit|🦔#hedgehog|🦇#bat|🐻#bear|🐨#koala|🐼#panda|🐾#paw prints|🦃#turkey|🐔#chicken|🐓#rooster|🐣#hatching chick|🐤#baby chick|🐥#front-facing baby chick|🐦#bird|🐧#penguin|🦅#eagle|🦆#duck|🦉#owl|🐸#frog|🐊#crocodile|🐢#turtle|🦎#lizard|🐍#snake|🐲#dragon face|🐉#dragon|🦕#sauropod|🦖#T-Rex|🐳#spouting whale|🐋#whale|🐬#dolphin|🐟#fish|🐠#tropical fish|🐡#blowfish|🦈#shark|🐙#octopus|🐚#spiral shell|🐌#snail|🦋#butterfly|🐛#bug|🐜#ant|🐝#honeybee|🐞#lady beetle|🦗#cricket|🦂#scorpion|💐#bouquet|🌸#cherry blossom|💮#white flower|🌹#rose|🥀#wilted flower|🌺#hibiscus|🌻#sunflower|🌼#blossom|🌷#tulip|🌱#seedling|🌲#evergreen tree|🌳#deciduous tree|🌴#palm tree|🌵#cactus|🌾#sheaf of rice|🌿#herb|☘️#shamrock|🍀#four leaf clover|🍁#maple leaf|🍂#fallen leaf|🍃#leaf fluttering in wind", "🍇#grapes|🍈#melon|🍉#watermelon|🍊#tangerine|🍋#lemon|🍌#banana|🍍#pineapple|🍎#red apple|🍏#green apple|🍐#pear|🍑#peach|🍒#cherries|🍓#strawberry|🥝#kiwi fruit|🍅#tomato|🥥#coconut|🥑#avocado|🍆#eggplant|🥔#potato|🥕#carrot|🌽#ear of corn|🥒#cucumber|🥦#broccoli|🍄#mushroom|🥜#peanuts|🌰#chestnut|🍞#bread|🥐#croissant|🥖#baguette bread|🥨#pretzel|🥞#pancakes|🧀#cheese wedge|🍖#meat on bone|🍗#poultry leg|🥩#cut of meat|🥓#bacon|🍔#hamburger|🍟#french fries|🍕#pizza|🌭#hot dog|🥪#sandwich|🌮#taco|🌯#burrito|🥙#stuffed flatbread|🥚#egg|🍳#cooking|🥘#shallow pan of food|🍲#pot of food|🥣#bowl with spoon|🥗#green salad|🍿#popcorn|🥫#canned food|🍱#bento box|🍘#rice cracker|🍙#rice ball|🍚#cooked rice|🍛#curry rice|🍜#steaming bowl|🍝#spaghetti|🍠#roasted sweet potato|🍢#oden|🍣#sushi|🍤#fried shrimp|🍥#fish cake with swirl|🍡#dango|🥟#dumpling|🥠#fortune cookie|🥡#takeout box|🦀#crab|🦐#shrimp|🦑#squid|🍦#soft ice cream|🍧#shaved ice|🍨#ice cream|🍩#doughnut|🍪#cookie|🎂#birthday cake|🍰#shortcake|🥧#pie|🍫#chocolate bar|🍬#candy|🍭#lollipop|🍮#custard|🍯#honey pot|🍼#baby bottle|🥛#glass of milk|☕#hot beverage|🍵#teacup without handle|🍶#sake|🍾#bottle with popping cork|🍷#wine glass|🍸#cocktail glass|🍹#tropical drink|🍺#beer mug|🍻#clinking beer mugs|🥂#clinking glasses|🥃#tumbler glass|🥤#cup with straw|🥢#chopsticks|🍴#fork and knife|🥄#spoon|🔪#kitchen knife|🏺#amphora", "🌍#globe showing Europe-Africa|🌎#globe showing Americas|🌏#globe showing Asia-Australia|🌐#globe with meridians|🗾#map of Japan|⛰️#mountain|🌋#volcano|🗻#mount fuji|🏠#house|🏡#house with garden|🏢#office building|🏣#Japanese post office|🏤#post office|🏥#hospital|🏦#bank|🏨#hotel|🏩#love hotel|🏪#convenience store|🏫#school|🏬#department store|🏭#factory|🏯#Japanese castle|🏰#castle|💒#wedding|🗼#Tokyo tower|🗽#Statue of Liberty|⛪#church|🕌#mosque|🕍#synagogue|⛩️#shinto shrine|🕋#kaaba|⛲#fountain|⛺#tent|🌁#foggy|🌃#night with stars|🌄#sunrise over mountains|🌅#sunrise|🌆#cityscape at dusk|🌇#sunset|🌉#bridge at night|♨️#hot springs|🎠#carousel horse|🎡#ferris wheel|🎢#roller coaster|💈#barber pole|🎪#circus tent|🚂#locomotive|🚃#railway car|🚄#high-speed train|🚅#bullet train|🚆#train|🚇#metro|🚈#light rail|🚉#station|🚊#tram|🚝#monorail|🚞#mountain railway|🚋#tram car|🚌#bus|🚍#oncoming bus|🚎#trolleybus|🚐#minibus|🚑#ambulance|🚒#fire engine|🚓#police car|🚔#oncoming police car|🚕#taxi|🚖#oncoming taxi|🚗#automobile|🚘#oncoming automobile|🚙#sport utility vehicle|🚚#delivery truck|🚛#articulated lorry|🚜#tractor|🛵#motor scooter|🚲#bicycle|🛴#kick scooter|🚏#bus stop|⛽#fuel pump|🚨#police car light|🚥#horizontal traffic light|🚦#vertical traffic light|🛑#stop sign|🚧#construction|⚓#anchor|⛵#sailboat|🛶#canoe|🚤#speedboat|⛴️#ferry|🚢#ship|✈️#airplane|🛫#airplane departure|🛬#airplane arrival|💺#seat|🚁#helicopter|🚟#suspension railway|🚠#mountain cableway|🚡#aerial tramway|🚀#rocket|🛸#flying saucer|⌛#hourglass done|⏳#hourglass not done|⌚#watch|⏰#alarm clock|⏱️#stopwatch|⏲️#timer clock|🕛#twelve o’clock|🕧#twelve-thirty|🕐#one o’clock|🕜#one-thirty|🕑#two o’clock|🕝#two-thirty|🕒#three o’clock|🕞#three-thirty|🕓#four o’clock|🕟#four-thirty|🕔#five o’clock|🕠#five-thirty|🕕#six o’clock|🕡#six-thirty|🕖#seven o’clock|🕢#seven-thirty|🕗#eight o’clock|🕣#eight-thirty|🕘#nine o’clock|🕤#nine-thirty|🕙#ten o’clock|🕥#ten-thirty|🕚#eleven o’clock|🕦#eleven-thirty|🌑#new moon|🌒#waxing crescent moon|🌓#first quarter moon|🌔#waxing gibbous moon|🌕#full moon|🌖#waning gibbous moon|🌗#last quarter moon|🌘#waning crescent moon|🌙#crescent moon|🌚#new moon face|🌛#first quarter moon face|🌜#last quarter moon face|☀️#sun|🌝#full moon face|🌞#sun with face|⭐#star|🌟#glowing star|🌠#shooting star|🌌#milky way|☁️#cloud|⛅#sun behind cloud|⛈️#cloud with lightning and rain|🌀#cyclone|🌈#rainbow|🌂#closed umbrella|☂️#umbrella|☔#umbrella with rain drops|⛱️#umbrella on ground|⚡#high voltage|❄️#snowflake|☃️#snowman|⛄#snowman without snow|☄️#comet|🔥#fire|💧#droplet|🌊#water wave", "🎃#jack-o-lantern|🎄#Christmas tree|🎆#fireworks|🎇#sparkler|✨#sparkles|🎈#balloon|🎉#party popper|🎊#confetti ball|🎋#tanabata tree|🎍#pine decoration|🎎#Japanese dolls|🎏#carp streamer|🎐#wind chime|🎑#moon viewing ceremony|🎀#ribbon|🎁#wrapped gift|🎫#ticket|🏆#trophy|🏅#sports medal|🥇#1st place medal|🥈#2nd place medal|🥉#3rd place medal|⚽#soccer ball|⚾#baseball|🏀#basketball|🏐#volleyball|🏈#american football|🏉#rugby football|🎾#tennis|🎳#bowling|🏏#cricket game|🏑#field hockey|🏒#ice hockey|🏓#ping pong|🏸#badminton|🥊#boxing glove|🥋#martial arts uniform|🥅#goal net|⛳#flag in hole|⛸️#ice skate|🎣#fishing pole|🎽#running shirt|🎿#skis|🛷#sled|🥌#curling stone|🎯#direct hit|🎱#pool 8 ball|🔮#crystal ball|🎮#video game|🎰#slot machine|🎲#game die|♠️#spade suit|♥️#heart suit|♦️#diamond suit|♣️#club suit|🃏#joker|🀄#mahjong red dragon|🎴#flower playing cards|🎭#performing arts|🎨#artist palette", "👓#glasses|👔#necktie|👕#t-shirt|👖#jeans|🧣#scarf|🧤#gloves|🧥#coat|🧦#socks|👗#dress|👘#kimono|👙#bikini|👚#woman’s clothes|👛#purse|👜#handbag|👝#clutch bag|🎒#backpack|👞#man’s shoe|👟#running shoe|👠#high-heeled shoe|👡#woman’s sandal|👢#woman’s boot|👑#crown|👒#woman’s hat|🎩#top hat|🎓#graduation cap|🧢#billed cap|⛑️#rescue worker’s helmet|📿#prayer beads|💄#lipstick|💍#ring|💎#gem stone|🔇#muted speaker|🔈#speaker low volume|🔉#speaker medium volume|🔊#speaker high volume|📢#loudspeaker|📣#megaphone|📯#postal horn|🔔#bell|🔕#bell with slash|🎼#musical score|🎵#musical note|🎶#musical notes|🎤#microphone|🎧#headphone|📻#radio|🎷#saxophone|🎸#guitar|🎹#musical keyboard|🎺#trumpet|🎻#violin|🥁#drum|📱#mobile phone|📲#mobile phone with arrow|☎️#telephone|📞#telephone receiver|📟#pager|📠#fax machine|🔋#battery|🔌#electric plug|💻#laptop|⌨️#keyboard|💽#computer disk|💾#floppy disk|💿#optical disk|📀#dvd|🎥#movie camera|🎬#clapper board|📺#television|📷#camera|📸#camera with flash|📹#video camera|📼#videocassette|🔍#magnifying glass tilted left|🔎#magnifying glass tilted right|💡#light bulb|🔦#flashlight|🏮#red paper lantern|📔#notebook with decorative cover|📕#closed book|📖#open book|📗#green book|📘#blue book|📙#orange book|📚#books|📓#notebook|📒#ledger|📃#page with curl|📜#scroll|📄#page facing up|📰#newspaper|📑#bookmark tabs|🔖#bookmark|💰#money bag|💴#yen banknote|💵#dollar banknote|💶#euro banknote|💷#pound banknote|💸#money with wings|💳#credit card|💹#chart increasing with yen|✉️#envelope|📧#e-mail|📨#incoming envelope|📩#envelope with arrow|📤#outbox tray|📥#inbox tray|📦#package|📫#closed mailbox with raised flag|📪#closed mailbox with lowered flag|📬#open mailbox with raised flag|📭#open mailbox with lowered flag|📮#postbox|✏️#pencil|✒️#black nib|📝#memo|💼#briefcase|📁#file folder|📂#open file folder|📅#calendar|📆#tear-off calendar|📇#card index|📈#chart increasing|📉#chart decreasing|📊#bar chart|📋#clipboard|📌#pushpin|📍#round pushpin|📎#paperclip|📏#straight ruler|📐#triangular ruler|✂️#scissors|🔒#locked|🔓#unlocked|🔏#locked with pen|🔐#locked with key|🔑#key|🔨#hammer|⛏️#pick|⚒️#hammer and pick|⚔️#crossed swords|🔫#pistol|🏹#bow and arrow|🔧#wrench|🔩#nut and bolt|⚙️#gear|⚖️#balance scale|🔗#link|⛓️#chains|⚗️#alembic|🔬#microscope|🔭#telescope|📡#satellite antenna|💉#syringe|💊#pill|🚪#door|🚽#toilet|🚿#shower|🛁#bathtub|🛒#shopping cart|🚬#cigarette|⚰️#coffin|⚱️#funeral urn|🗿#moai", "🏧#ATM sign|🚮#litter in bin sign|🚰#potable water|♿#wheelchair symbol|🚹#men’s room|🚺#women’s room|🚻#restroom|🚼#baby symbol|🚾#water closet|🛂#passport control|🛃#customs|🛄#baggage claim|🛅#left luggage|⚠️#warning|🚸#children crossing|⛔#no entry|🚫#prohibited|🚳#no bicycles|🚭#no smoking|🚯#no littering|🚱#non-potable water|🚷#no pedestrians|📵#no mobile phones|🔞#no one under eighteen|☢️#radioactive|☣️#biohazard|⬆️#up arrow|↗️#up-right arrow|➡️#right arrow|↘️#down-right arrow|⬇️#down arrow|↙️#down-left arrow|⬅️#left arrow|↖️#up-left arrow|↕️#up-down arrow|↔️#left-right arrow|↩️#right arrow curving left|↪️#left arrow curving right|⤴️#right arrow curving up|⤵️#right arrow curving down|🔃#clockwise vertical arrows|🔄#counterclockwise arrows button|🔙#BACK arrow|🔚#END arrow|🔛#ON! arrow|🔜#SOON arrow|🔝#TOP arrow|🛐#place of worship|⚛️#atom symbol|✡️#star of David|☸️#wheel of dharma|☯️#yin yang|✝️#latin cross|☦️#orthodox cross|☪️#star and crescent|☮️#peace symbol|🕎#menorah|🔯#dotted six-pointed star|♈#Aries|♉#Taurus|♊#Gemini|♋#Cancer|♌#Leo|♍#Virgo|♎#Libra|♏#Scorpio|♐#Sagittarius|♑#Capricorn|♒#Aquarius|♓#Pisces|⛎#Ophiuchus|🔀#shuffle tracks button|🔁#repeat button|🔂#repeat single button|▶️#play button|⏩#fast-forward button|⏭️#next track button|⏯️#play or pause button|◀️#reverse button|⏪#fast reverse button|⏮️#last track button|🔼#upwards button|⏫#fast up button|🔽#downwards button|⏬#fast down button|⏸️#pause button|⏹️#stop button|⏺️#record button|⏏️#eject button|🎦#cinema|🔅#dim button|🔆#bright button|📶#antenna bars|📳#vibration mode|📴#mobile phone off|♀️#female sign|♂️#male sign|✖️#multiply|➕#plus|➖#minus|➗#divide|‼️#double exclamation mark|⁉️#exclamation question mark|❓#question mark|❔#white question mark|❕#white exclamation mark|❗#exclamation mark|〰️#wavy dash|💱#currency exchange|💲#heavy dollar sign|⚕️#medical symbol|♻️#recycling symbol|⚜️#fleur-de-lis|🔱#trident emblem|📛#name badge|🔰#Japanese symbol for beginner|⭕#hollow red circle|✅#check mark button|☑️#check box with check|✔️#check mark|❌#cross mark|❎#cross mark button|➰#curly loop|➿#double curly loop|〽️#part alternation mark|✳️#eight-spoked asterisk|✴️#eight-pointed star|❇️#sparkle|©️#copyright|®️#registered|™️#trade mark|🔟#keycap: 10|🔠#input latin uppercase|🔡#input latin lowercase|🔢#input numbers|🔣#input symbols|🔤#input latin letters|🆎#AB button (blood type)|🆑#CL button|🆒#COOL button|🆓#FREE button|ℹ️#information|🆔#ID button|Ⓜ️#circled M|🆕#NEW button|🆖#NG button|🆗#OK button|🆘#SOS button|🆙#UP! button|🆚#VS button|🈁#Japanese “here” button|🈶#Japanese “not free of charge” button|🈯#Japanese “reserved” button|🉐#Japanese “bargain” button|🈹#Japanese “discount” button|🈚#Japanese “free of charge” button|🈲#Japanese “prohibited” button|🉑#Japanese “acceptable” button|🈸#Japanese “application” button|🈴#Japanese “passing grade” button|🈳#Japanese “vacancy” button|㊗️#Japanese “congratulations” button|㊙️#Japanese “secret” button|🈺#Japanese “open for business” button|🈵#Japanese “no vacancy” button|🔴#red circle|🔵#blue circle|⚫#black circle|⚪#white circle|⬛#black large square|⬜#white large square|◼️#black medium square|◻️#white medium square|◾#black medium-small square|◽#white medium-small square|▪️#black small square|▫️#white small square|🔶#large orange diamond|🔷#large blue diamond|🔸#small orange diamond|🔹#small blue diamond|🔺#red triangle pointed up|🔻#red triangle pointed down|💠#diamond with a dot|🔘#radio button|🔳#white square button|🔲#black square button"]
	var emojidata = null;

	function MakeEmojiData() {
		if (emojidata)
			return;
		emojidata = [];
		for (var groupindex = 0; groupindex < groupnames.length; groupindex++) {
			var emojiitems = [];
			var emojigroup = { index: groupindex, name: groupnames[groupindex], items: emojiitems };
			var emojiarr = emojistrs[groupindex].split('|');
			for (var ei = 0; ei < emojiarr.length; ei++) {
				var emojistr = emojiarr[ei];
				var pair = emojistr.split('#')
				emojiitems.push({ emoji: pair[0], keyword: pair[1] });
			}
			emojidata.push(emojigroup);
		}
		//console.log(emojidata);
	}

	var obj = this;

	var config, editor;

	obj.PluginName = "InsertEmoji";

	obj.InitConfig = function (argconfig) {
		config = argconfig;
	}
	obj.InitEditor = function (argeditor) {
		editor = argeditor;

		editor.toolbarFactoryMap["insertemoji"] = function (cmd) {
			return editor.createToolbarItemDropDownPanel(cmd, function (panel) {

				MakeEmojiData()

				panel.style.width = "360px";
				panel.style.height = "420px";
				panel.style.display = "flex";
				panel.style.flexDirection = "column";

				panel.onclick = function (e) {
					if (e.target.nodeName == "GSPAN") {
						editor.closeCurrentPopup();
						var htmlcode = e.target.getAttribute("htmlcode");
						editor.insertHTML(htmlcode);
						editor.collapse(false);
						editor.focus();
					}
				}

				var selecteditem = null;
				var toselectitem = null;
				function clear_selecteditem() {
					if (selecteditem != null) {
						selecteditem.style.backgroundColor = "";
						selecteditem = null;
					}
				}
				function set_selecteditem() {
					clear_selecteditem();
					selecteditem = toselectitem; selecteditem.style.backgroundColor = "#e6e6e6";
					toselectitem = null;
				}
				var tid_sel = 0;

				panel.onmouseover = function (e) {
					for (var node = e.target; node != panel; node = node.parentNode) {
						if (node.nodeName == "GITEM") {
							if (node == toselectitem)
								return;
							toselectitem = node;
							clearTimeout(tid_sel);
							tid_sel = setTimeout(set_selecteditem, 10);
							return;
						}
					}
				}
				panel.onmouseout = function () {
					clearTimeout(tid_sel);
					tid_sel = setTimeout(clear_selecteditem, 10)
				}

				var searchbar = __Append(panel, "label", "margin:5px;position:relative;");
				searchbar.setAttribute("id", "emojis_searchbar");
				var searchbox = __Append(searchbar, "input", "width:100%;padding:5px 20px;border:solid 1px #ccc;border-radius:5px;");
				searchbox.setAttribute("placeholder", editor.getLangText("searchemojis"));

				var tid_key = 0;
				searchbox.onchange = searchbox.onkeyup = searchbox.onkeypress = searchbox.onpaste = function () {
					clearTimeout(tid_key);
					tid_key = setTimeout(show_result, 100);
				}
				function show_result() {
					var keyword = searchbox.value.trim().toLowerCase();
					if (!keyword) {
						tabpanel.style.display =
							grouppanel.style.display = "";
						resultpanel.style.display = "none";
						return;
					}

					tabpanel.style.display =
						grouppanel.style.display = "none";
					resultpanel.style.display = "flex";
					resultpanel.innerHTML = "";

					var resultline = __Append(resultpanel, "div", "width:100%;padding:3px;margin-top:5px;color:darkblue;text-align:center;");

					var itemindex = 0;


					for (var gi = 0; gi < emojidata.length; gi++) {
						var group = emojidata[gi];
						for (var ii = 0; ii < group.items.length; ii++) {
							var item = group.items[ii];

							if (!item.keyword || item.keyword.indexOf(keyword) == -1)
								continue;

							itemindex++;

							//if (itemindex > 20)break;
							var gitem = __Append(resultpanel, "gitem", "width:32px;height:32px;margin:2px", "rte-flex-column-center")
							var gspan = __Append(gitem, "gspan", "");
							var htmlcode = CharToHTMLCode(item.emoji);
							gspan.setAttribute("title", item.emoji + " " + item.keyword)
							gspan.setAttribute("htmlcode", htmlcode)
							gspan.innerHTML = htmlcode;
						}
					}

					resultline.innerText = itemindex + " items";

				}

				searchbox.focus();

				panel.setAttribute("id", "emoji-picker");

				var tabpanel = __Append(panel, "div");

				var resultpanel = __Append(panel, "div", "display:none;flex-direction:row;flex-wrap:wrap;overflow-y:scroll;padding-bottom:55px");

				var grouppanel = __Append(panel, "div", "overflow-y:scroll;padding-bottom:55px;flex:999");

				var groupdivs = [];

				for (var gi = 0; gi < emojidata.length; gi++) {
					var group = emojidata[gi];
					var gdiv = __Append(grouppanel, "div", "padding:3px;margin-top:5px;color:darkblue;");
					groupdivs.push(gdiv);
					gdiv.innerText = group.name[0].toUpperCase() + group.name.substring(1);

					gdiv = __Append(grouppanel, "div", "display:flex;flex-direction:row;flex-wrap:wrap;");

					for (var itemindex = 0; itemindex < group.items.length; itemindex++) {
						var item = group.items[itemindex];
						//if (itemindex > 20)break;
						var gitem = __Append(gdiv, "gitem", "width:32px;height:32px;margin:2px", "rte-flex-column-center")
						var gspan = __Append(gitem, "gspan", "");
						var htmlcode = CharToHTMLCode(item.emoji);
						gspan.setAttribute("title", item.emoji + " " + item.keyword)
						gspan.setAttribute("htmlcode", htmlcode)
						gspan.innerHTML = htmlcode;
					}
				}

				var tabui = __Append(tabpanel, "rte-tabui");
				tabui.setAttribute("id", "emoji-picker");
				var tabuitoolbar = __Append(tabui, "rte-tabui-toolbar");
				var tabuibtns = [];
				function CreateTabBtn(group) {
					var btn = __Append(tabuitoolbar, "rte-tabui-toolbar-button", "width:32px;text-align:center;margin:4px")
					tabuibtns.push(btn);
					btn.setAttribute("title", group.name);
					btn.innerHTML = group.items[0].emoji
					btn.onclick = function () {
						grouppanel.scrollTop = groupdivs[group.index].getBoundingClientRect().top - grouppanel.getBoundingClientRect().top + grouppanel.scrollTop;
						grouppanel.onscroll();
					}
					btn.group = group;
				}
				for (var gi = 0; gi < emojidata.length; gi++) {
					var group = emojidata[gi];
					CreateTabBtn(group)
				}

				var lastactivebtn = null;
				grouppanel.onscroll = function () {
					var ptop = grouppanel.getBoundingClientRect().top;
					if (lastactivebtn) lastactivebtn.className = "";
					for (var bi = 0; bi < tabuibtns.length; bi++) {
						var btn = tabuibtns[bi];
						var gdiv = groupdivs[btn.group.index];
						if (gdiv.getBoundingClientRect().top > ptop) {
							lastactivebtn = tabuibtns[btn.group.index - 1] || btn;
							lastactivebtn.className = "rte-ui-active";
							return;
						}
					}

					lastactivebtn = tabuibtns[tabuibtns.length - 1];
					lastactivebtn.className = "rte-ui-active";
				}
				grouppanel.onscroll();


			})
		};

	}

	function __Append(parent, tagname, csstext, cssclass) {
		var tag = parent.ownerDocument.createElement(tagname);
		if (csstext) tag.style.cssText = csstext;
		if (cssclass) tag.className = cssclass;
		parent.appendChild(tag);
		return tag;
	}


}




RTE_DefaultConfig.plugin_insertgallery = RTE_Plugin_InsertGallery;

function RTE_Plugin_InsertGallery() {
    var obj = this;
    var config;
    var editor;

    obj.PluginName = "InsertGallery";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        if (!config.galleryImages) {
            config.galleryImages = [];
        }
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;

        editor.attachEvent("exec_command_insertgallery", function (state) {
            state.returnValue = true;
            obj.DoInsertGallery();
        });
    };

    function append(parent, tagName, cssText, className) {
        var tag = parent.ownerDocument.createElement(tagName);
        if (cssText) {
            tag.style.cssText = cssText;
        }
        if (className) {
            tag.className = className;
        }
        parent.appendChild(tag);
        return tag;
    }

    function clear(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function getFileName(url) {
        var value = String(url || "").split("#")[0].split("?")[0];
        var lastSlash = value.lastIndexOf("/");
        var name = lastSlash >= 0 ? value.substring(lastSlash + 1) : value;
        try {
            name = decodeURIComponent(name);
        } catch (ex) {
        }
        return name || "Image";
    }

    function getMetaText(item) {
        if (item.meta) {
            return item.meta;
        }
        if (item.alt) {
            return item.alt;
        }
        return item.url;
    }

    function normalizeGalleryItem(item) {
        var normalized = null;

        if (typeof item === "string") {
            normalized = {
                url: item,
                thumbnail: item,
                name: getFileName(item)
            };
        } else if (item instanceof Array) {
            normalized = {
                url: item[0],
                thumbnail: item[0],
                name: item[1] || getFileName(item[0]),
                meta: item[2] || ""
            };
        } else if (item && typeof item === "object") {
            var url = item.url || item.src || item.href;
            if (!url) {
                return null;
            }

            normalized = {
                url: url,
                thumbnail: item.thumbnail || item.thumb || item.preview || url,
                name: item.name || item.text || item.title || getFileName(url),
                meta: item.meta || item.description || item.alt || ""
            };
        }

        if (!normalized || !normalized.url) {
            return null;
        }

        if (!normalized.thumbnail) {
            normalized.thumbnail = normalized.url;
        }

        if (!normalized.name) {
            normalized.name = getFileName(normalized.url);
        }

        return normalized;
    }

    function uploadFiles(fileList, onUploaded, onFinished, onFailed) {
        var files = [];
        var handler = window.rte_file_upload_handler;
        var i;

        for (i = 0; i < fileList.length; i++) {
            files.push(fileList[i]);
        }

        if (!files.length) {
            onFinished();
            return;
        }

        if (typeof handler !== "function") {
            if (onFailed) {
                onFailed("Upload handler is not configured.");
            }
            onFinished();
            return;
        }

        var index = 0;

        function next() {
            if (index >= files.length) {
                onFinished();
                return;
            }

            var file = files[index];
            handler(file, function (url, error) {
                if (url) {
                    onUploaded(url, file, index, files);
                } else if (onFailed) {
                    onFailed(error || ("Upload failed for " + file.name), file);
                }

                index++;
                next();
            }, index, files);
        }

        next();
    }

    obj.DoInsertGallery = function () {
        var dialoginner = editor.createDialog(editor.getLangText("insertgallerytitle") || "Image gallery", "rte-dialog-insertgallery");
        var closeDialog = typeof dialoginner.close === "function" ? function () {
            dialoginner.close();
        } : function () {
            editor.closeCurrentPopup();
        };

        var browser = append(dialoginner, "div", "", "rte-gallery-browser");
        var header = append(browser, "div", "", "rte-dialog-browser-header");
        var kicker = append(header, "div", "", "rte-dialog-browser-kicker");
        kicker.innerText = "Media Library";
        var title = append(header, "div", "", "rte-dialog-browser-title");
        title.innerText = "Image gallery";
        var copy = append(header, "div", "", "rte-dialog-browser-copy");
        copy.innerText = "Browse uploaded assets, filter by name, and insert the selected image into the editor.";

        var toolbar = append(browser, "div", "", "rte-gallery-browser-toolbar");
        var path = append(toolbar, "div", "", "rte-gallery-browser-path");
        path.innerText = "/";
        var type = append(toolbar, "div", "", "rte-gallery-browser-type");
        type.innerText = "Image Files";

        var uploadButton = append(toolbar, "button", "", "rte-gallery-browser-button");
        uploadButton.type = "button";
        uploadButton.innerText = "Upload";

        var refreshButton = append(toolbar, "button", "", "rte-gallery-browser-button");
        refreshButton.type = "button";
        refreshButton.innerText = "Refresh";

        var search = append(toolbar, "input", "", "rte-gallery-browser-search");
        search.type = "search";
        search.placeholder = "Search images";

        var fileInput = append(toolbar, "input", "display:none;");
        fileInput.type = "file";
        fileInput.accept = "image/*,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg";
        fileInput.multiple = true;

        var status = append(browser, "div", "", "rte-gallery-browser-status");
        var surface = append(browser, "div", "", "rte-gallery-browser-surface");
        var grid = append(surface, "div", "", "rte-gallery-browser-grid");
        var empty = append(surface, "div", "", "rte-gallery-browser-empty");
        empty.innerText = "No images match this search. Upload a file or adjust the filter.";

        var footer = append(browser, "div", "", "rte-gallery-browser-footer");
        var footerText = append(footer, "div", "", "rte-gallery-browser-footer-text");
        footerText.innerText = "Choose an image to enable insert.";

        var cancelButton = append(footer, "button", "", "rte-gallery-browser-button");
        cancelButton.type = "button";
        cancelButton.innerText = "Cancel";

        var insertButton = append(footer, "button", "", "rte-gallery-browser-button rte-gallery-browser-button-primary");
        insertButton.type = "button";
        insertButton.innerText = "Insert";
        insertButton.disabled = true;

        var selectedUrl = "";

        function getNormalizedItems() {
            var list = [];
            var items = config.galleryImages || [];
            var i;
            for (i = 0; i < items.length; i++) {
                var normalized = normalizeGalleryItem(items[i]);
                if (normalized) {
                    list.push(normalized);
                }
            }
            return list;
        }

        function getFilteredItems() {
            var keyword = search.value.replace(/^\s+|\s+$/g, "").toLowerCase();
            var items = getNormalizedItems();
            if (!keyword) {
                return items;
            }

            return items.filter(function (item) {
                return (item.name && item.name.toLowerCase().indexOf(keyword) >= 0)
                    || (item.meta && item.meta.toLowerCase().indexOf(keyword) >= 0)
                    || (item.url && item.url.toLowerCase().indexOf(keyword) >= 0);
            });
        }

        function updateStatus(items) {
            var selectedName = "";
            var i;
            for (i = 0; i < items.length; i++) {
                if (items[i].url === selectedUrl) {
                    selectedName = items[i].name;
                    break;
                }
            }

            status.innerText = items.length + " item" + (items.length === 1 ? "" : "s") + " available."
                + (selectedName ? " " + selectedName + " selected." : " No image selected.");
            footerText.innerText = selectedName ? ("Ready to insert " + selectedName + ".") : "Choose an image to enable insert.";
            insertButton.disabled = !selectedName;
        }

        function insertSelected() {
            if (!selectedUrl) {
                return;
            }
            editor.insertImageByUrl(selectedUrl);
            closeDialog();
            editor.focus();
        }

        function render() {
            clear(grid);
            var items = getFilteredItems();
            var i;

            empty.style.display = items.length ? "none" : "block";

            for (i = 0; i < items.length; i++) {
                (function (item) {
                    var card = append(grid, "button", "", "rte-gallery-browser-card");
                    card.type = "button";
                    if (item.url === selectedUrl) {
                        card.classList.add("is-selected");
                    }

                    var selection = append(card, "div", "", "rte-gallery-browser-selection");
                    selection.innerText = item.url === selectedUrl ? "Selected" : "";

                    var thumb = append(card, "div", "", "rte-gallery-browser-thumbnail");
                    var image = append(thumb, "img", "", "rte-gallery-browser-thumbnail-image");
                    image.src = item.thumbnail;
                    image.alt = item.name;

                    var name = append(card, "div", "", "rte-gallery-browser-name");
                    name.innerText = item.name;

                    var meta = append(card, "div", "", "rte-gallery-browser-meta");
                    meta.innerText = getMetaText(item);

                    card.onclick = function () {
                        selectedUrl = item.url;
                        render();
                    };

                    card.ondblclick = function () {
                        selectedUrl = item.url;
                        insertSelected();
                    };
                })(items[i]);
            }

            if (selectedUrl) {
                var stillVisible = false;
                for (i = 0; i < items.length; i++) {
                    if (items[i].url === selectedUrl) {
                        stillVisible = true;
                        break;
                    }
                }
                if (!stillVisible) {
                    selectedUrl = "";
                }
            }

            updateStatus(items);
        }

        uploadButton.onclick = function () {
            fileInput.click();
        };

        fileInput.onchange = function () {
            var lastUploaded = "";
            status.innerText = "Uploading images...";

            uploadFiles(fileInput.files, function (url) {
                lastUploaded = url;
                config.galleryImages.unshift(url);
            }, function () {
                if (lastUploaded) {
                    selectedUrl = lastUploaded;
                }
                fileInput.value = "";
                render();
            }, function (error) {
                status.innerText = error || "Upload failed.";
            });
        };

        refreshButton.onclick = render;
        search.oninput = render;
        cancelButton.onclick = closeDialog;
        insertButton.onclick = insertSelected;

        render();
        search.focus();
    };
}
RTE_DefaultConfig.plugin_inserttemplate = RTE_Plugin_InsertTemplate;

function RTE_Plugin_InsertTemplate() {
    var obj = this;
    var config;
    var editor;

    obj.PluginName = "InsertTemplate";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        if (!config.htmlTemplates) {
            config.htmlTemplates = [];
        }
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;

        editor.attachEvent("exec_command_inserttemplate", function (state) {
            state.returnValue = true;
            obj.DoInsertTemplate();
        });
    };

    function append(parent, tagName, cssText, className) {
        var tag = parent.ownerDocument.createElement(tagName);
        if (cssText) {
            tag.style.cssText = cssText;
        }
        if (className) {
            tag.className = className;
        }
        parent.appendChild(tag);
        return tag;
    }

    function clear(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function stripHtml(html) {
        var div = document.createElement("div");
        div.innerHTML = html || "";
        return div.innerText || div.textContent || "";
    }

    function normalizeTemplateItem(item, index) {
        if (item instanceof Array) {
            return {
                id: "template-" + index,
                title: item[0] || ("Template " + (index + 1)),
                html: item[1] || "",
                meta: item[2] || ""
            };
        }

        if (item && typeof item === "object") {
            return {
                id: item.id || ("template-" + index),
                title: item.title || item.name || item.text || ("Template " + (index + 1)),
                html: item.html || item.content || "",
                meta: item.meta || item.description || ""
            };
        }

        if (typeof item === "string") {
            return {
                id: "template-" + index,
                title: "Template " + (index + 1),
                html: item,
                meta: ""
            };
        }

        return null;
    }

    function scalePreview(body, canvas) {
        var maxWidth = 206;
        var maxHeight = 166;
        var width = Math.max(canvas.scrollWidth, 1);
        var height = Math.max(canvas.scrollHeight, 1);
        var scale = Math.min(1, maxWidth / width, maxHeight / height);

        canvas.style.transformOrigin = "top left";
        canvas.style.transform = "scale(" + scale + ")";
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
    }

    obj.DoInsertTemplate = function () {
        var dialoginner = editor.createDialog(editor.getLangText("inserttemplatetitle") || "Insert template", "rte-dialog-inserttemplate");
        var closeDialog = typeof dialoginner.close === "function" ? function () {
            dialoginner.close();
        } : function () {
            editor.closeCurrentPopup();
        };

        var browser = append(dialoginner, "div", "", "rte-dialog-browser");
        var header = append(browser, "div", "", "rte-dialog-browser-header");
        var kicker = append(header, "div", "", "rte-dialog-browser-kicker");
        kicker.innerText = "Content Blocks";
        var title = append(header, "div", "", "rte-dialog-browser-title");
        title.innerText = "Insert template";
        var copy = append(header, "div", "", "rte-dialog-browser-copy");
        copy.innerText = "Preview reusable layouts, search by name, and replace the current editor content with a selected template.";

        var toolbar = append(browser, "div", "", "rte-dialog-browser-toolbar");
        var search = append(toolbar, "input", "", "rte-dialog-browser-search");
        search.type = "search";
        search.placeholder = "Search templates";
        var count = append(toolbar, "div", "", "rte-dialog-browser-count");

        var scrollpanel = append(browser, "div", "", "rte-dialog-browser-scrollpanel");
        var grid = append(scrollpanel, "div", "", "rte-dialog-browser-grid rte-template-grid");
        var empty = append(scrollpanel, "div", "", "rte-dialog-browser-empty");
        empty.innerText = "No templates match the current filter.";

        var footer = append(browser, "div", "", "rte-gallery-browser-footer");
        var footerText = append(footer, "div", "", "rte-gallery-browser-footer-text");
        footerText.innerText = "Select a template to replace the current content.";

        var cancelButton = append(footer, "button", "", "rte-gallery-browser-button");
        cancelButton.type = "button";
        cancelButton.innerText = "Cancel";

        var applyButton = append(footer, "button", "", "rte-gallery-browser-button rte-gallery-browser-button-primary");
        applyButton.type = "button";
        applyButton.innerText = "Replace Content";
        applyButton.disabled = true;

        var selectedId = "";

        function getTemplates() {
            var list = [];
            var items = config.htmlTemplates || [];
            var i;
            for (i = 0; i < items.length; i++) {
                var normalized = normalizeTemplateItem(items[i], i);
                if (normalized && normalized.html) {
                    list.push(normalized);
                }
            }
            return list;
        }

        function getFilteredTemplates() {
            var keyword = search.value.replace(/^\s+|\s+$/g, "").toLowerCase();
            var items = getTemplates();
            if (!keyword) {
                return items;
            }

            return items.filter(function (item) {
                var plainText = stripHtml(item.html).toLowerCase();
                return item.title.toLowerCase().indexOf(keyword) >= 0
                    || plainText.indexOf(keyword) >= 0
                    || (item.meta && item.meta.toLowerCase().indexOf(keyword) >= 0);
            });
        }

        function updateFooter(items) {
            var selectedTemplate = null;
            var i;
            for (i = 0; i < items.length; i++) {
                if (items[i].id === selectedId) {
                    selectedTemplate = items[i];
                    break;
                }
            }

            count.innerText = items.length + " template" + (items.length === 1 ? "" : "s");
            footerText.innerText = selectedTemplate
                ? ("Ready to replace the editor content with " + selectedTemplate.title + ".")
                : "Select a template to replace the current content.";
            applyButton.disabled = !selectedTemplate;
        }

        function applySelected() {
            var items = getTemplates();
            var i;
            for (i = 0; i < items.length; i++) {
                if (items[i].id === selectedId) {
                    editor.setHTMLCode(items[i].html);
                    closeDialog();
                    editor.focus();
                    return;
                }
            }
        }

        function render() {
            clear(grid);
            var items = getFilteredTemplates();
            var i;

            empty.style.display = items.length ? "none" : "block";

            for (i = 0; i < items.length; i++) {
                (function (item) {
                    var card = append(grid, "button", "", "rte-dialog-browser-card");
                    card.type = "button";
                    if (item.id === selectedId) {
                        card.classList.add("is-selected");
                    }

                    var preview = append(card, "div", "", "rte-template-card-preview");
                    var previewBody = append(preview, "div", "", "rte-template-card-preview-body");
                    var canvas = append(previewBody, "div", "", "rte-template-card-preview-canvas");
                    canvas.innerHTML = item.html;
                    scalePreview(previewBody, canvas);

                    var footer = append(card, "div", "", "rte-template-card-footer");
                    var title = append(footer, "div", "", "rte-template-card-title");
                    title.innerText = item.title;
                    var meta = append(footer, "div", "", "rte-template-card-meta");
                    meta.innerText = item.meta || stripHtml(item.html).substring(0, 80) || "Reusable template";

                    card.onclick = function () {
                        selectedId = item.id;
                        render();
                    };

                    card.ondblclick = function () {
                        selectedId = item.id;
                        applySelected();
                    };
                })(items[i]);
            }

            if (selectedId) {
                var visible = false;
                for (i = 0; i < items.length; i++) {
                    if (items[i].id === selectedId) {
                        visible = true;
                        break;
                    }
                }
                if (!visible) {
                    selectedId = "";
                }
            }

            updateFooter(items);
        }

        search.oninput = render;
        cancelButton.onclick = closeDialog;
        applyButton.onclick = applySelected;

        render();
        search.focus();
    };
}
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
if (!window.RTE_DefaultConfig) window.RTE_DefaultConfig = {};

if (!RTE_DefaultConfig.svgCode_trackchanges) {
    RTE_DefaultConfig.svgCode_trackchanges = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 17l4-1 10-10-3-3L5 13l-1 4z"/><path d="M14 4l3 3"/><path d="M4 21h10"/></svg>';
}

RTE_DefaultConfig.plugin_trackedchanges = RTE_Plugin_TrackedChanges;

function RTE_Plugin_TrackedChanges() {
    var obj = this;
    var config;
    var editor;
    var enabled = false;

    obj.PluginName = "TrackedChanges";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        if (config.trackChangesEnabled === false) return;

        config.currentUser = config.currentUser || null;
        config.trackChangesInsertClass = config.trackChangesInsertClass || "rte-tc rte-tc-insert";
        config.trackChangesDeleteClass = config.trackChangesDeleteClass || "rte-tc rte-tc-delete";

        // Toolbar command — only surfaces if the editor page adds it to a toolbar slot.
        config.text_trackchanges = config.text_trackchanges || "Suggesting mode";
        appendToolbarCommand("toolbar_default", "#{trackchanges}");
        appendToolbarCommand("toolbar_full", "#{trackchanges}");
        appendToolbarCommand("toolbar_mobile", "#{trackchanges}");

        if ((config.controltoolbar_TEXT || "").indexOf("trackchanges") === -1) {
            config.controltoolbar_TEXT = (config.controltoolbar_TEXT || "") + "|{trackchanges}";
        }
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;
        if (config.trackChangesEnabled === false) return;

        editor.trackedChanges = {
            enable: function (user) { enable(user); },
            disable: function () { disable(); },
            isEnabled: function () { return enabled; },
            acceptAll: function (filter) { return acceptAll(filter); },
            rejectAll: function (filter) { return rejectAll(filter); },
            accept: function (id) { return acceptEntry(id); },
            reject: function (id) { return rejectEntry(id); },
            list: function () {
                if (!editor.reviewLedger) return [];
                return editor.reviewLedger.list().filter(function (e) {
                    return e.changeType === "insert" || e.changeType === "delete";
                });
            }
        };

        injectStyles();

        editor.toolbarFactoryMap = editor.toolbarFactoryMap || {};
        editor.toolbarFactoryMap["trackchanges"] = function (cmd) {
            var btn = editor.createToolbarButton(cmd);
            btn.__tcSync = function () {
                if (enabled) btn.classList.add("rte-ui-active");
                else btn.classList.remove("rte-ui-active");
            };
            btn.__tcSync();
            return btn;
        };

        editor.attachEvent("exec_command_trackchanges", function (state) {
            state.returnValue = true;
            state.stopBubble = true;
            if (enabled) disable();
            else enable();
        });

        editor.getEditable().addEventListener("beforeinput", onBeforeInput, true);
    };

    function appendToolbarCommand(toolbar, item) {
        if (!config[toolbar]) return;
        if (config[toolbar].indexOf(item) !== -1) return;
        config[toolbar] = config[toolbar] + item;
    }

    function enable(user) {
        if (user) config.currentUser = user;
        if (!config.currentUser) {
            config.currentUser = { id: "user", name: "User", color: "#2563eb" };
            console.warn("trackedchanges: no config.currentUser configured; defaulting to generic user.");
        }
        enabled = true;
        syncToolbarButtons();
    }

    function disable() {
        enabled = false;
        syncToolbarButtons();
    }

    function syncToolbarButtons() {
        var doc = editor.iframe && editor.iframe.ownerDocument || document;
        var btns = doc.querySelectorAll(".rte_command_trackchanges");
        for (var i = 0; i < btns.length; i++) {
            if (btns[i].__tcSync) btns[i].__tcSync();
        }
    }

    // --- beforeinput intercept ---

    function onBeforeInput(e) {
        if (!enabled) return;
        if (!editor.reviewLedger) return; // No ledger => AI toolkit not loaded; do nothing.

        var type = e.inputType;
        if (!type) return;

        if (type === "insertText" || type === "insertReplacementText") {
            e.preventDefault();
            handleInsertText(e.data || "");
            return;
        }
        if (type === "deleteContentBackward" || type === "deleteContentForward" || type === "deleteByCut") {
            e.preventDefault();
            handleDelete(type);
            return;
        }
        // insertParagraph, insertCompositionText, insertFromPaste, historyUndo/Redo: pass through for v1.
    }

    // --- insert tracking ---

    function handleInsertText(text) {
        if (!text) return;
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        var range = sel.getRangeAt(0);
        if (!range.collapsed) {
            // Selection replace: wrap selection as delete, then insert new text.
            wrapRangeAsDelete(range);
            // After wrapping, caret should be past the delete span; re-fetch selection.
            range = sel.getRangeAt(0);
        }

        var mergeTarget = adjacentInsertSpan(range);
        if (mergeTarget) {
            appendToInsertSpan(mergeTarget, text);
        } else {
            createInsertSpan(text, range);
        }
    }

    function adjacentInsertSpan(range) {
        // If caret sits inside an insert span by the current user, or immediately after one, merge.
        var node = range.startContainer;
        if (node.nodeType === 3 && node.parentNode && isMyInsert(node.parentNode)) {
            return node.parentNode;
        }
        // Caret just after an insert span (at an element boundary).
        if (node.nodeType === 1 && range.startOffset > 0) {
            var prev = node.childNodes[range.startOffset - 1];
            if (prev && prev.nodeType === 1 && isMyInsert(prev)) return prev;
        }
        // Caret at the very beginning just before our span.
        if (node.nodeType === 3 && node.previousSibling && isMyInsert(node.previousSibling) && range.startOffset === 0) {
            return node.previousSibling;
        }
        return null;
    }

    function isMyInsert(el) {
        if (!el || el.nodeType !== 1) return false;
        if (!el.classList || !el.classList.contains("rte-tc-insert")) return false;
        return el.getAttribute("data-tc-author") === config.currentUser.id;
    }

    function appendToInsertSpan(span, text) {
        var editdoc = editor.getDocument();
        // Append to the span's last text node (or create one).
        var last = span.lastChild;
        var node;
        if (last && last.nodeType === 3) {
            last.nodeValue = last.nodeValue + text;
            node = last;
        } else {
            node = editdoc.createTextNode(text);
            span.appendChild(node);
        }
        placeCaretAtEnd(node);
        updateEntryForSpan(span);
    }

    function createInsertSpan(text, range) {
        var editdoc = editor.getDocument();
        var span = editdoc.createElement("span");
        span.className = config.trackChangesInsertClass;
        var user = config.currentUser;
        var id = "tc-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
        span.setAttribute("data-tc-id", id);
        span.setAttribute("data-tc-author", user.id);
        span.setAttribute("data-tc-at", new Date().toISOString());
        span.style.color = user.color;
        span.style.textDecoration = "underline";
        span.appendChild(editdoc.createTextNode(text));
        range.insertNode(span);
        placeCaretAtEnd(span.firstChild);

        editor.reviewLedger.add({
            id: id,
            changeType: "insert",
            author: user,
            text: text,
            status: "pending",
            sourceLabel: "Suggested insert",
            createdAt: Date.now()
        });
    }

    function updateEntryForSpan(span) {
        var id = span.getAttribute("data-tc-id");
        if (!id) return;
        editor.reviewLedger.update(id, { text: span.textContent });
    }

    // --- delete tracking ---

    function handleDelete(mode) {
        var sel = editor.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        var range = sel.getRangeAt(0);

        if (!range.collapsed) {
            wrapRangeAsDelete(range);
            return;
        }

        // Collapsed: extend by one char in the appropriate direction, then wrap.
        // The extended range covers only that one character — any delete spans between
        // it and the caret should be SKIPPED, not re-wrapped.
        var extended = editor.getDocument().createRange();
        if (mode === "deleteContentBackward") {
            var anchor = prevCharPoint(range.startContainer, range.startOffset);
            if (!anchor) return;
            extended.setStart(anchor.node, anchor.offset);
            extended.setEnd(anchor.node, anchor.offset + 1);
        } else {
            var forward = nextCharPoint(range.startContainer, range.startOffset);
            if (!forward) return;
            extended.setStart(forward.node, forward.offset - 1);
            extended.setEnd(forward.node, forward.offset);
        }

        // If that extended range sits entirely inside one of the current user's own
        // insert spans, treat this as undoing their own typing — actually delete.
        if (rangeInsideMyInsert(extended)) {
            extended.deleteContents();
            var sel2 = editor.getSelection();
            sel2.removeAllRanges();
            sel2.addRange(extended);
            // If the insert span is now empty, remove it and its ledger entry.
            cleanupEmptyInsertSpans();
            return;
        }

        wrapRangeAsDelete(extended);
    }

    function isInsideDeleteSpan(node) {
        var walk = node.nodeType === 1 ? node : node.parentNode;
        while (walk && walk !== editor.getEditable()) {
            if (walk.classList && walk.classList.contains("rte-tc-delete")) return true;
            walk = walk.parentNode;
        }
        return false;
    }

    // Walk text leaves in the editable, skipping any that live inside an existing delete
    // span (those characters have already been visually "deleted" — we shouldn't re-wrap them).
    function liveTextLeaves() {
        var editable = editor.getEditable();
        var walker = editor.getDocument().createTreeWalker(editable, NodeFilter.SHOW_TEXT, {
            acceptNode: function (n) { return isInsideDeleteSpan(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }
        });
        var out = [], n;
        while ((n = walker.nextNode())) out.push(n);
        return out;
    }

    function prevCharPoint(node, offset) {
        var leaves = liveTextLeaves();
        if (!leaves.length) return null;
        var idx = caretIndex(node, offset, leaves);
        if (idx <= 0) return null;
        return leafOffsetAt(idx - 1, leaves);
    }

    function nextCharPoint(node, offset) {
        var leaves = liveTextLeaves();
        if (!leaves.length) return null;
        var total = 0;
        for (var i = 0; i < leaves.length; i++) total += leaves[i].nodeValue.length;
        var idx = caretIndex(node, offset, leaves);
        if (idx >= total) return null;
        return leafOffsetAt(idx + 1, leaves);
    }

    // How many live characters appear before the given caret position?
    function caretIndex(node, offset, leaves) {
        var r = editor.getDocument().createRange();
        r.setStart(node, offset);
        r.collapse(true);
        var count = 0;
        for (var i = 0; i < leaves.length; i++) {
            var leaf = leaves[i];
            // If the entire leaf is before the caret, add its length.
            var cmpEnd = r.comparePoint(leaf, leaf.nodeValue.length);
            if (cmpEnd <= 0) { count += leaf.nodeValue.length; continue; }
            var cmpStart = r.comparePoint(leaf, 0);
            if (cmpStart >= 0) break; // leaf starts at or after caret
            // Caret falls inside this leaf — binary search the split point.
            var lo = 0, hi = leaf.nodeValue.length;
            while (lo < hi) {
                var mid = (lo + hi) >> 1;
                if (r.comparePoint(leaf, mid) < 0) lo = mid + 1;
                else hi = mid;
            }
            count += lo;
            break;
        }
        return count;
    }

    function leafOffsetAt(index, leaves) {
        var remaining = index;
        for (var i = 0; i < leaves.length; i++) {
            if (remaining <= leaves[i].nodeValue.length) return { node: leaves[i], offset: remaining };
            remaining -= leaves[i].nodeValue.length;
        }
        return null;
    }

    function firstTextLeaf(node) {
        if (!node) return null;
        if (node.nodeType === 3) return node;
        var walker = editor.getDocument().createTreeWalker(node, NodeFilter.SHOW_TEXT);
        return walker.nextNode();
    }

    function lastTextLeaf(node) {
        if (!node) return null;
        if (node.nodeType === 3) return node;
        var walker = editor.getDocument().createTreeWalker(node, NodeFilter.SHOW_TEXT);
        var last = null, n;
        while ((n = walker.nextNode())) last = n;
        return last;
    }

    function previousTextLeaf(node) {
        var editable = editor.getEditable();
        var walker = editor.getDocument().createTreeWalker(editable, NodeFilter.SHOW_TEXT);
        var prev = null, cur;
        while ((cur = walker.nextNode())) {
            if (cur === node) return prev;
            prev = cur;
        }
        return null;
    }

    function nextTextLeaf(node) {
        var editable = editor.getEditable();
        var walker = editor.getDocument().createTreeWalker(editable, NodeFilter.SHOW_TEXT);
        var seen = false, cur;
        while ((cur = walker.nextNode())) {
            if (seen) return cur;
            if (cur === node) seen = true;
        }
        return null;
    }

    function rangeInsideMyInsert(range) {
        var span = range.startContainer.parentNode;
        while (span && span !== editor.getEditable()) {
            if (isMyInsert(span)) return range.endContainer.parentNode === span || span.contains(range.endContainer);
            span = span.parentNode;
        }
        return false;
    }

    function wrapRangeAsDelete(range) {
        if (range.collapsed) return;
        var editdoc = editor.getDocument();

        var fragment = range.cloneContents();
        if (!fragmentHasText(fragment)) return;

        // Find existing same-author delete spans adjacent to the range so we can merge
        // sequential backspaces / forward deletes into one contiguous span.
        var user = config.currentUser;
        var mergeBefore = adjacentDeleteSpan(range, "before", user);
        var mergeAfter = adjacentDeleteSpan(range, "after", user);

        range.deleteContents();

        if (mergeBefore) {
            // Append the fragment's content to the existing "before" span.
            appendFragmentToSpan(mergeBefore, fragment);
            if (mergeAfter && mergeAfter !== mergeBefore) {
                // Collapse both sides: move "after" span's children into "before" and drop it.
                while (mergeAfter.firstChild) mergeBefore.appendChild(mergeAfter.firstChild);
                var afterId = mergeAfter.getAttribute("data-tc-id");
                mergeAfter.remove();
                if (afterId && editor.reviewLedger) editor.reviewLedger.remove(afterId);
            }
            var rangeAfter = editdoc.createRange();
            rangeAfter.setStartAfter(mergeBefore);
            rangeAfter.collapse(true);
            var sel = editor.getSelection();
            sel.removeAllRanges();
            sel.addRange(rangeAfter);
            editor.reviewLedger.update(mergeBefore.getAttribute("data-tc-id"), { text: mergeBefore.textContent });
            return;
        }

        if (mergeAfter) {
            prependFragmentToSpan(mergeAfter, fragment);
            var rangeBefore = editdoc.createRange();
            rangeBefore.setStartBefore(mergeAfter);
            rangeBefore.collapse(true);
            var sel2 = editor.getSelection();
            sel2.removeAllRanges();
            sel2.addRange(rangeBefore);
            editor.reviewLedger.update(mergeAfter.getAttribute("data-tc-id"), { text: mergeAfter.textContent });
            return;
        }

        var span = editdoc.createElement("span");
        span.className = config.trackChangesDeleteClass;
        var id = "tc-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
        span.setAttribute("data-tc-id", id);
        span.setAttribute("data-tc-author", user.id);
        span.setAttribute("data-tc-at", new Date().toISOString());
        span.style.color = user.color;
        span.style.textDecoration = "line-through";
        span.appendChild(fragment);
        range.insertNode(span);

        var after = editdoc.createRange();
        after.setStartAfter(span);
        after.collapse(true);
        var sel3 = editor.getSelection();
        sel3.removeAllRanges();
        sel3.addRange(after);

        editor.reviewLedger.add({
            id: id,
            changeType: "delete",
            author: user,
            text: span.textContent,
            originalHtml: span.innerHTML,
            status: "pending",
            sourceLabel: "Suggested delete",
            createdAt: Date.now()
        });
    }

    function adjacentDeleteSpan(range, side, user) {
        // Find element immediately before or after the range boundaries at the container level.
        var node = side === "before" ? range.startContainer : range.endContainer;
        var offset = side === "before" ? range.startOffset : range.endOffset;
        if (node.nodeType === 3) {
            // Look at the sibling of the text node if we're at the text node's boundary.
            if (side === "before" && offset === 0) {
                var prev = node.previousSibling;
                if (prev && isDeleteSpanByAuthor(prev, user)) return prev;
            }
            if (side === "after" && offset === node.nodeValue.length) {
                var next = node.nextSibling;
                if (next && isDeleteSpanByAuthor(next, user)) return next;
            }
            return null;
        }
        // Element container: look at children on either side of the offset.
        if (side === "before" && offset > 0) {
            var childBefore = node.childNodes[offset - 1];
            if (childBefore && isDeleteSpanByAuthor(childBefore, user)) return childBefore;
        }
        if (side === "after" && offset < node.childNodes.length) {
            var childAfter = node.childNodes[offset];
            if (childAfter && isDeleteSpanByAuthor(childAfter, user)) return childAfter;
        }
        return null;
    }

    function isDeleteSpanByAuthor(el, user) {
        if (!el || el.nodeType !== 1) return false;
        if (!el.classList || !el.classList.contains("rte-tc-delete")) return false;
        return el.getAttribute("data-tc-author") === user.id;
    }

    function appendFragmentToSpan(span, fragment) {
        while (fragment.firstChild) span.appendChild(fragment.firstChild);
    }

    function prependFragmentToSpan(span, fragment) {
        var first = span.firstChild;
        while (fragment.firstChild) span.insertBefore(fragment.firstChild, first);
    }

    function fragmentHasText(fragment) {
        var t = (fragment.textContent || "").replace(/\s+/g, "");
        return !!t;
    }

    function cleanupEmptyInsertSpans() {
        var spans = editor.getEditable().querySelectorAll("." + "rte-tc-insert");
        for (var i = 0; i < spans.length; i++) {
            var s = spans[i];
            if (!s.textContent || !s.textContent.length) {
                var id = s.getAttribute("data-tc-id");
                if (id && editor.reviewLedger) editor.reviewLedger.remove(id);
                s.remove();
            } else {
                updateEntryForSpan(s);
            }
        }
    }

    function placeCaretAtEnd(node) {
        if (!node) return;
        var editdoc = editor.getDocument();
        var range = editdoc.createRange();
        if (node.nodeType === 3) {
            range.setStart(node, node.nodeValue.length);
        } else {
            range.setStart(node, node.childNodes.length);
        }
        range.collapse(true);
        var sel = editor.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    // --- accept / reject ---

    function acceptEntry(id) {
        var entry = editor.reviewLedger.get(id);
        if (!entry) return false;
        var span = editor.getEditable().querySelector('[data-tc-id="' + cssEscape(id) + '"]');
        if (entry.changeType === "insert") {
            if (span) unwrapKeepChildren(span);
        } else if (entry.changeType === "delete") {
            if (span) span.remove();
        }
        editor.reviewLedger.update(id, { status: "accepted", decidedAt: Date.now() });
        return true;
    }

    function rejectEntry(id) {
        var entry = editor.reviewLedger.get(id);
        if (!entry) return false;
        var span = editor.getEditable().querySelector('[data-tc-id="' + cssEscape(id) + '"]');
        if (entry.changeType === "insert") {
            if (span) span.remove();
        } else if (entry.changeType === "delete") {
            if (span) unwrapKeepChildren(span);
        }
        editor.reviewLedger.update(id, { status: "rejected", decidedAt: Date.now() });
        return true;
    }

    function acceptAll(filter) {
        var entries = editor.reviewLedger.list(filter).filter(function (e) {
            return (e.changeType === "insert" || e.changeType === "delete") && e.status === "pending";
        });
        for (var i = 0; i < entries.length; i++) acceptEntry(entries[i].id);
        return entries.length;
    }

    function rejectAll(filter) {
        var entries = editor.reviewLedger.list(filter).filter(function (e) {
            return (e.changeType === "insert" || e.changeType === "delete") && e.status === "pending";
        });
        for (var i = 0; i < entries.length; i++) rejectEntry(entries[i].id);
        return entries.length;
    }

    function unwrapKeepChildren(el) {
        var parent = el.parentNode;
        if (!parent) return;
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        parent.removeChild(el);
    }

    function cssEscape(s) {
        return String(s).replace(/"/g, '\\"');
    }

    // --- styles ---

    function injectStyles() {
        var host = (editor && editor.iframe && editor.iframe.ownerDocument) || document;
        if (!host.querySelector("style[data-rte-trackchanges]")) {
            var style = host.createElement("style");
            style.setAttribute("data-rte-trackchanges", "1");
            style.textContent = [
                ".richtexteditor rte-toolbar-button.rte_command_trackchanges.rte-ui-active{background:#eef2ff;color:#1e3a8a;box-shadow:inset 0 0 0 1px rgba(30,58,138,.25)}",
                ".rte-tc{border-radius:2px;padding:0 1px}",
                ".rte-tc-insert{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:2px}",
                ".rte-tc-delete{text-decoration:line-through;opacity:.85}"
            ].join("\n");
            host.head.appendChild(style);
        }

        var editdoc = editor.getDocument();
        if (editdoc && editdoc.head && !editdoc.querySelector("style[data-rte-trackchanges-inline]")) {
            var iStyle = editdoc.createElement("style");
            iStyle.setAttribute("data-rte-trackchanges-inline", "1");
            iStyle.textContent = [
                ".rte-tc{border-radius:2px;padding:0 1px}",
                ".rte-tc-insert{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:2px}",
                ".rte-tc-delete{text-decoration:line-through;opacity:.85}"
            ].join("\n");
            editdoc.head.appendChild(iStyle);
        }
    }
}
if (!window.RTE_DefaultConfig) window.RTE_DefaultConfig = {};

RTE_DefaultConfig.plugin_yjscollab = RTE_Plugin_YjsCollab;

// Yjs collaboration — Option B scope:
//   • Awareness (live cursors + presence)
//   • Shared reviewLedger (AI suggestions, tracked changes, comments all sync)
//
// NOT in scope:
//   • Concurrent text editing (no content-level CRDT binding — see v1.1 / Option C)
//
// Yjs is a PEER DEPENDENCY. Customers load Y.Doc + a provider themselves; this plugin
// binds to whatever they pass in.
function RTE_Plugin_YjsCollab() {
    var obj = this;
    var config;
    var editor;
    var session = null; // { doc, provider, awareness, ledgerMap, user, cleanup[] }
    var remoteOrigin = {}; // sentinel used to tag ledger writes coming from Yjs
    var echoGuard = false;
    var overlay = null;
    var presencePanel = null;

    obj.PluginName = "YjsCollab";

    obj.InitConfig = function (argconfig) {
        config = argconfig;
        if (config.collabEnabled === false) return;

        config.collabLedgerMapName = config.collabLedgerMapName || "reviewLedger";
        config.collabShowPresence = config.collabShowPresence !== false;
        config.collabShowRemoteCursors = config.collabShowRemoteCursors !== false;
    };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;
        if (config.collabEnabled === false) return;

        editor.collab = {
            attach: function (options) { return attach(options); },
            detach: function () { return detach(); },
            isAttached: function () { return !!session; },
            getSession: function () { return session; },
            peers: function () { return session ? getRemotePeers() : []; },
            setUser: function (user) { if (session) updateLocalUser(user); }
        };

        injectStyles();
    };

    function attach(options) {
        if (session) detach();
        options = options || {};
        var doc = options.doc;
        var provider = options.provider;
        if (!doc || typeof doc.getMap !== "function") {
            console.warn("yjscollab: attach() requires a Y.Doc via options.doc");
            return null;
        }
        if (!provider || !provider.awareness) {
            console.warn("yjscollab: attach() requires a provider with an awareness field");
            return null;
        }

        var user = options.user || config.currentUser || { id: "user", name: "User", color: "#2563eb" };
        var ledgerMap = doc.getMap(config.collabLedgerMapName);

        // Text-sync (preview): when enabled, bind a shared Y.Text to the editor's
        // HTML as an opaque string. This unlocks concurrent editing with CRDT
        // merge semantics, at the cost of coarse caret snap-back on remote apply.
        // The proper per-node binding is on the roadmap — this MVP buys parity
        // on the basic "two people typing" RFP checkbox without blocking on it.
        var textSyncEnabled = options.textSync === true
            || (options.textSync !== false && config.collabTextSync === true);
        var textMap = textSyncEnabled ? doc.getText(config.collabTextName || "richtextbox.body") : null;

        session = {
            doc: doc,
            provider: provider,
            awareness: provider.awareness,
            ledgerMap: ledgerMap,
            textMap: textMap,
            textSyncEnabled: textSyncEnabled,
            user: user,
            cleanup: []
        };

        // Set our initial awareness state.
        session.awareness.setLocalStateField("user", {
            id: user.id,
            name: user.name,
            color: user.color
        });

        // Subscribe to selection changes so our caret pos is broadcast.
        wireSelectionBroadcast();

        // Subscribe to awareness for remote peers.
        wireAwarenessSubscription();

        // Bridge reviewLedger <-> Y.Map.
        if (editor.reviewLedger) {
            wireLedgerBridge();
            seedLedgerFromRemote();
        }

        // Bind shared Y.Text <-> editor HTML (opt-in; MVP).
        if (session.textSyncEnabled && session.textMap) {
            wireTextSync();
        }

        // Mount overlay + presence panel.
        if (config.collabShowRemoteCursors) mountOverlay();
        if (config.collabShowPresence) mountPresencePanel();
        renderPresence();
        renderRemoteCursors();

        return session;
    }

    function detach() {
        if (!session) return;
        for (var i = 0; i < session.cleanup.length; i++) {
            try { session.cleanup[i](); } catch (err) { }
        }
        try { session.awareness.setLocalState(null); } catch (ignore) { }
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        overlay = null;
        if (presencePanel && presencePanel.parentNode) presencePanel.parentNode.removeChild(presencePanel);
        presencePanel = null;
        session = null;
    }

    function updateLocalUser(user) {
        if (!session) return;
        session.user = user;
        session.awareness.setLocalStateField("user", {
            id: user.id, name: user.name, color: user.color
        });
    }

    // --- awareness / selection broadcast ---

    function wireSelectionBroadcast() {
        var editdoc = editor.getDocument();
        var broadcast = function () {
            if (!session) return;
            var sel = editor.getSelection();
            if (!sel || sel.rangeCount === 0) {
                session.awareness.setLocalStateField("caret", null);
                return;
            }
            var range = sel.getRangeAt(0);
            var caret = serializeCaret(range);
            session.awareness.setLocalStateField("caret", caret);
        };
        editdoc.addEventListener("selectionchange", broadcast);
        editdoc.addEventListener("input", broadcast);
        session.cleanup.push(function () {
            editdoc.removeEventListener("selectionchange", broadcast);
            editdoc.removeEventListener("input", broadcast);
        });
    }

    // Serialize a caret as (blockIndex, offsetInBlock) — simple, robust under single-writer
    // assumptions (Option B scope). Falls back to viewport coordinates if the math fails.
    function serializeCaret(range) {
        var editable = editor.getEditable();
        var block = range.startContainer;
        while (block && block.parentNode !== editable) {
            if (!block.parentNode) return null;
            block = block.parentNode;
        }
        if (!block) return null;
        var blocks = Array.prototype.slice.call(editable.children);
        var blockIndex = blocks.indexOf(block);
        if (blockIndex < 0) return null;

        // Character offset inside this block.
        var offset = 0;
        var walker = editor.getDocument().createTreeWalker(block, NodeFilter.SHOW_TEXT);
        var n;
        while ((n = walker.nextNode())) {
            if (n === range.startContainer) {
                offset += range.startOffset;
                return { blockIndex: blockIndex, offset: offset, collapsed: range.collapsed };
            }
            offset += n.nodeValue.length;
        }
        // startContainer is not a text node — treat as start of block.
        return { blockIndex: blockIndex, offset: 0, collapsed: range.collapsed };
    }

    function deserializeCaret(caret) {
        if (!caret) return null;
        var editable = editor.getEditable();
        var block = editable.children[caret.blockIndex];
        if (!block) return null;
        var remaining = caret.offset;
        var walker = editor.getDocument().createTreeWalker(block, NodeFilter.SHOW_TEXT);
        var n;
        while ((n = walker.nextNode())) {
            if (remaining <= n.nodeValue.length) {
                var range = editor.getDocument().createRange();
                range.setStart(n, remaining);
                range.collapse(true);
                return range;
            }
            remaining -= n.nodeValue.length;
        }
        // Past the end — position at end of block.
        var range2 = editor.getDocument().createRange();
        range2.selectNodeContents(block);
        range2.collapse(false);
        return range2;
    }

    function wireAwarenessSubscription() {
        var handler = function () { renderRemoteCursors(); renderPresence(); };
        session.awareness.on("change", handler);
        session.cleanup.push(function () { session.awareness.off("change", handler); });
    }

    function getRemotePeers() {
        var map = session.awareness.getStates();
        var me = session.awareness.clientID;
        var peers = [];
        map.forEach(function (state, clientId) {
            if (clientId === me || !state || !state.user) return;
            peers.push({ clientId: clientId, user: state.user, caret: state.caret || null });
        });
        return peers;
    }

    // --- ledger bridge ---

    // ---- text sync (opt-in MVP) ----
    //
    // Treats the editor's full HTML as an opaque Y.Text string. CRDT merges
    // concurrent inserts/deletes at character level, so two users typing in
    // different parts of the document converge without losing either edit.
    //
    // Tradeoffs (documented, not fixed by this MVP):
    //   • Remote updates re-set the whole body → caret snaps back to start
    //   • HTML character offsets don't align with rendered caret offsets
    //   • Toolbar actions that mutate DOM sync on the next 250ms push, not instantly
    //
    // The production-grade binding is per-node (y-xml-fragment) and is planned.
    // This MVP closes the biggest procurement-checkbox gap today.
    function wireTextSync() {
        var applying = false;          // guard: we're pushing into the editor from Y.Text
        var pushing = false;           // guard: we're pushing into Y.Text from the editor
        var pendingPushTimer = null;
        var lastKnownHtml = null;

        function currentEditorHtml() {
            return editor && editor.getHTMLCode ? editor.getHTMLCode() : "";
        }

        // Capture the local caret as a serializable offset BEFORE we replace
        // the body, then restore it AFTER. With a whole-HTML-string sync, the
        // caret would otherwise snap to position 0 on every remote update.
        // We use a character offset into the textContent of the editable body —
        // it's not perfect (HTML structure changes can shift it) but it's
        // dramatically better than the unconditional jump-to-start behaviour.
        function captureCaretOffset() {
            try {
                var doc = editor.getDocument && editor.getDocument();
                var body = doc && doc.body;
                if (!body) return null;
                var sel = doc.getSelection ? doc.getSelection() : null;
                if (!sel || sel.rangeCount === 0) return null;
                var range = sel.getRangeAt(0);
                if (!body.contains(range.startContainer)) return null;
                var pre = doc.createRange();
                pre.selectNodeContents(body);
                pre.setEnd(range.startContainer, range.startOffset);
                return pre.toString().length;
            } catch (e) { return null; }
        }

        function restoreCaretOffset(offset) {
            if (offset == null) return;
            try {
                var doc = editor.getDocument && editor.getDocument();
                var body = doc && doc.body;
                if (!body) return;
                var walker = doc.createTreeWalker(body, NodeFilter.SHOW_TEXT, null);
                var charsLeft = offset;
                var targetNode = null;
                var targetOffset = 0;
                while (walker.nextNode()) {
                    var node = walker.currentNode;
                    var len = node.nodeValue ? node.nodeValue.length : 0;
                    if (charsLeft <= len) {
                        targetNode = node;
                        targetOffset = charsLeft;
                        break;
                    }
                    charsLeft -= len;
                }
                if (!targetNode) {
                    // overflow — drop caret at end of body
                    var lastText = null;
                    var w2 = doc.createTreeWalker(body, NodeFilter.SHOW_TEXT, null);
                    while (w2.nextNode()) lastText = w2.currentNode;
                    if (!lastText) return;
                    targetNode = lastText;
                    targetOffset = lastText.nodeValue.length;
                }
                var sel = doc.getSelection ? doc.getSelection() : null;
                if (!sel) return;
                var range = doc.createRange();
                range.setStart(targetNode, targetOffset);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            } catch (e) { /* swallow — best-effort caret restore */ }
        }

        function setEditorHtml(html) {
            if (!editor || !editor.setHTMLCode) return;
            var savedCaret = captureCaretOffset();
            applying = true;
            try { editor.setHTMLCode(html); }
            finally { applying = false; }
            // Restore on the next tick so the editor's own setHTMLCode finishes
            // its DOM swap + selection clearing before we reassert the caret.
            setTimeout(function () { restoreCaretOffset(savedCaret); }, 0);
        }

        // Initial sync: if Y.Text is empty, seed from the editor. Otherwise pull remote.
        var remoteInitial = session.textMap.toString();
        if (remoteInitial && remoteInitial.length > 0) {
            setEditorHtml(remoteInitial);
            lastKnownHtml = remoteInitial;
        } else {
            var localInitial = currentEditorHtml();
            if (localInitial) {
                session.textMap.insert(0, localInitial);
            }
            lastKnownHtml = localInitial;
        }

        // Y.Text → editor.
        var onTextChange = function (event, transaction) {
            if (pushing) return;
            // Ignore our own transactions — they're already in the editor.
            if (transaction && transaction.local) return;
            var fresh = session.textMap.toString();
            if (fresh === lastKnownHtml) return;
            setEditorHtml(fresh);
            lastKnownHtml = fresh;
        };
        session.textMap.observe(onTextChange);
        session.cleanup.push(function () { session.textMap.unobserve(onTextChange); });

        // Editor DOM → Y.Text. Debounced so bursts collapse to one CRDT diff.
        var onEditorMutation = function () {
            if (applying) return;
            if (pendingPushTimer) return;
            pendingPushTimer = setTimeout(function () {
                pendingPushTimer = null;
                if (!session || !session.textMap) return;
                var current = currentEditorHtml();
                if (current === lastKnownHtml) return;

                // Minimal diff against lastKnownHtml — compute common prefix and
                // suffix so concurrent remote edits outside the local change
                // area are preserved. Not a full CRDT binding but it keeps us
                // from stomping on simultaneous work.
                var oldStr = lastKnownHtml || "";
                var newStr = current;
                var prefix = 0;
                var maxPrefix = Math.min(oldStr.length, newStr.length);
                while (prefix < maxPrefix && oldStr.charCodeAt(prefix) === newStr.charCodeAt(prefix)) prefix++;
                var suffix = 0;
                var maxSuffix = Math.min(oldStr.length - prefix, newStr.length - prefix);
                while (suffix < maxSuffix
                    && oldStr.charCodeAt(oldStr.length - 1 - suffix) === newStr.charCodeAt(newStr.length - 1 - suffix)) suffix++;

                var delLen = oldStr.length - prefix - suffix;
                var insStr = newStr.substring(prefix, newStr.length - suffix);

                pushing = true;
                try {
                    session.doc.transact(function () {
                        if (delLen > 0) session.textMap.delete(prefix, delLen);
                        if (insStr.length > 0) session.textMap.insert(prefix, insStr);
                    }, session.user && session.user.id);
                } finally {
                    pushing = false;
                    lastKnownHtml = newStr;
                }
            }, 250);
        };

        // Observe DOM mutations. The editor's iframe body is a moving target
        // (some rte skins remount it), so we re-attach on each write.
        var mutationObserver = null;
        function attachMutationObserver() {
            var editdoc = editor.getDocument && editor.getDocument();
            var body = editdoc && editdoc.body;
            if (!body || typeof MutationObserver !== "function") return;
            mutationObserver = new MutationObserver(onEditorMutation);
            mutationObserver.observe(body, { childList: true, characterData: true, subtree: true, attributes: true });
        }
        attachMutationObserver();

        // Also push on blur as a safety net (mutation observer can miss compositionend in some edge cases).
        var blurHandler = function () { onEditorMutation(); };
        if (editor.attachEvent) editor.attachEvent("blur", blurHandler);

        session.cleanup.push(function () {
            if (pendingPushTimer) { clearTimeout(pendingPushTimer); pendingPushTimer = null; }
            if (mutationObserver) { mutationObserver.disconnect(); mutationObserver = null; }
            if (editor.detachEvent) { try { editor.detachEvent("blur", blurHandler); } catch (e) { } }
        });
    }

    function wireLedgerBridge() {
        var ledger = editor.reviewLedger;
        var originalAdd = ledger.add;
        var originalUpdate = ledger.update;
        var originalRemove = ledger.remove;

        ledger.add = function (entry) {
            var result = originalAdd.call(ledger, entry);
            if (result && !echoGuard) session.ledgerMap.set(result.id, cloneEntry(result));
            return result;
        };
        ledger.update = function (id, patch) {
            var result = originalUpdate.call(ledger, id, patch);
            if (result && !echoGuard) session.ledgerMap.set(result.id, cloneEntry(result));
            return result;
        };
        ledger.remove = function (id) {
            var result = originalRemove.call(ledger, id);
            if (result && !echoGuard) session.ledgerMap.delete(id);
            return result;
        };

        var observer = function (event) {
            echoGuard = true;
            try {
                event.keysChanged.forEach(function (key) {
                    var change = event.changes.keys.get(key);
                    if (!change) return;
                    if (change.action === "delete") {
                        originalRemove.call(ledger, key);
                    } else {
                        var value = session.ledgerMap.get(key);
                        if (!value) return;
                        // Upsert: remove any local copy first to avoid duplicate IDs mid-merge.
                        originalRemove.call(ledger, key);
                        originalAdd.call(ledger, value);
                    }
                });
            } finally {
                echoGuard = false;
            }
            if (ledger.refreshPanel) ledger.refreshPanel();
        };
        session.ledgerMap.observe(observer);
        session.cleanup.push(function () {
            session.ledgerMap.unobserve(observer);
            ledger.add = originalAdd;
            ledger.update = originalUpdate;
            ledger.remove = originalRemove;
        });
    }

    function seedLedgerFromRemote() {
        if (!editor.reviewLedger || !session.ledgerMap) return;
        echoGuard = true;
        try {
            session.ledgerMap.forEach(function (value, key) {
                // If not already local, add it.
                if (!editor.reviewLedger.get(key)) {
                    editor.reviewLedger.add(value);
                }
            });
        } finally {
            echoGuard = false;
        }
    }

    function cloneEntry(entry) {
        // JSON clone strips functions/refs; safe for Yjs sync.
        try { return JSON.parse(JSON.stringify(entry)); }
        catch (err) { return entry; }
    }

    // --- overlay / cursor rendering ---

    function mountOverlay() {
        if (overlay && overlay.parentNode) return;
        overlay = document.createElement("div");
        overlay.className = "rte-collab-overlay";
        overlay.setAttribute("aria-hidden", "true");
        document.body.appendChild(overlay);
        var reposition = function () { renderRemoteCursors(); };
        window.addEventListener("scroll", reposition, true);
        window.addEventListener("resize", reposition);
        session.cleanup.push(function () {
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        });
    }

    function renderRemoteCursors() {
        if (!session || !overlay) return;
        overlay.innerHTML = "";
        var peers = getRemotePeers();
        var iframe = editor.iframe;
        var ir = iframe.getBoundingClientRect();

        for (var i = 0; i < peers.length; i++) {
            var peer = peers[i];
            if (!peer.caret) continue;
            var range = null;
            try { range = deserializeCaret(peer.caret); } catch (ignore) { }
            if (!range) continue;
            var rects = range.getClientRects();
            var rect = rects && rects.length ? rects[0] : range.getBoundingClientRect();
            if (!rect || (!rect.top && !rect.left)) continue;

            var caretEl = document.createElement("div");
            caretEl.className = "rte-collab-caret";
            caretEl.style.left = (ir.left + rect.left + window.pageXOffset) + "px";
            caretEl.style.top = (ir.top + rect.top + window.pageYOffset) + "px";
            caretEl.style.height = (rect.height || 18) + "px";
            caretEl.style.background = peer.user.color;

            var label = document.createElement("div");
            label.className = "rte-collab-caret-label";
            label.textContent = peer.user.name;
            label.style.background = peer.user.color;
            caretEl.appendChild(label);

            overlay.appendChild(caretEl);
        }
    }

    // --- presence panel ---

    function mountPresencePanel() {
        if (presencePanel && presencePanel.parentNode) return;
        presencePanel = document.createElement("div");
        presencePanel.className = "rte-collab-presence";
        var shell = getEditorShell();
        if (shell && shell.parentNode) {
            shell.parentNode.insertBefore(presencePanel, shell);
        } else {
            document.body.appendChild(presencePanel);
        }
    }

    function renderPresence() {
        if (!session || !presencePanel) return;
        presencePanel.innerHTML = "";
        var all = [{ user: session.user, self: true }].concat(
            getRemotePeers().map(function (p) { return { user: p.user, self: false }; })
        );
        var title = document.createElement("span");
        title.className = "rte-collab-presence-title";
        title.textContent = "Online (" + all.length + ")";
        presencePanel.appendChild(title);
        for (var i = 0; i < all.length; i++) {
            var u = all[i].user;
            var chip = document.createElement("span");
            chip.className = "rte-collab-presence-chip" + (all[i].self ? " is-self" : "");
            chip.style.background = u.color;
            chip.title = u.name + (all[i].self ? " (you)" : "");
            chip.textContent = initialsOf(u.name || u.id || "?");
            presencePanel.appendChild(chip);
        }
    }

    function getEditorShell() {
        var el = editor.iframe;
        while (el && el !== document.body) {
            if (el.classList && el.classList.contains("richtexteditor")) return el;
            el = el.parentNode;
        }
        return null;
    }

    function initialsOf(label) {
        var parts = String(label).trim().split(/\s+/);
        if (!parts[0]) return "?";
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    // --- styles ---

    function injectStyles() {
        if (document.querySelector("style[data-rte-collab]")) return;
        var style = document.createElement("style");
        style.setAttribute("data-rte-collab", "1");
        style.textContent = [
            ".rte-collab-overlay{position:absolute;top:0;left:0;pointer-events:none;z-index:2147482900}",
            ".rte-collab-caret{position:absolute;width:2px;pointer-events:none}",
            ".rte-collab-caret-label{position:absolute;top:-18px;left:0;padding:1px 6px;border-radius:4px;color:#fff;font:10px/1.3 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;white-space:nowrap;font-weight:600;letter-spacing:.01em;box-shadow:0 1px 2px rgba(15,23,42,.15)}",
            ".rte-collab-presence{display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:10px 10px 0 0;background:#f4f7ff;border:1px solid rgba(71,85,155,.15);border-bottom:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;color:#33506f;margin:0}",
            ".rte-collab-presence-title{font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#475569}",
            ".rte-collab-presence-chip{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;color:#fff;font-size:10px;font-weight:700;box-shadow:0 0 0 2px #fff;letter-spacing:.02em}",
            ".rte-collab-presence-chip.is-self{outline:2px solid rgba(15,23,42,.25);outline-offset:1px}"
        ].join("\n");
        document.head.appendChild(style);
    }
}
RTE_DefaultConfig.plugin_zz_richtextbox_dialog_style = RTE_Plugin_RichTextBoxDialogStyle;

function RTE_Plugin_RichTextBoxDialogStyle() {
    var obj = this;

    obj.PluginName = "RichTextBoxDialogStyle";

    obj.InitConfig = function (config) {
        if (!config.imageItems) {
            config.imageItems = [];
        }
        if (!config.galleryImages) {
            config.galleryImages = [];
        }
        if (!config.htmlTemplates) {
            config.htmlTemplates = [];
        }
        if (!config.documentItems) {
            config.documentItems = [];
        }
    };

    obj.InitEditor = function () {
    };

    function append(parent, tagName, cssText, className) {
        var tag = parent.ownerDocument.createElement(tagName);
        if (cssText) {
            tag.style.cssText = cssText;
        }
        if (className) {
            tag.className = className;
        }
        parent.appendChild(tag);
        return tag;
    }

    function getUrlValue(input) {
        return input && input.value ? input.value.replace(/^\s+|\s+$/g, "") : "";
    }

    function getUrlHost(value) {
        try {
            return new URL(value, window.location.href).hostname || "";
        } catch (ex) {
            return "";
        }
    }

    function getUrlFileName(value) {
        var clean = String(value || "").split("#")[0].split("?")[0];
        var slash = clean.lastIndexOf("/");
        var fileName = slash >= 0 ? clean.substring(slash + 1) : clean;
        try {
            fileName = decodeURIComponent(fileName);
        } catch (ex) {
        }
        return fileName || "";
    }

    function getExtension(value) {
        var fileName = getUrlFileName(value);
        var dot = fileName.lastIndexOf(".");
        if (dot < 0) {
            return "LINK";
        }
        return fileName.substring(dot + 1).toUpperCase().substring(0, 4);
    }

    function ensureUploadIntro(panel, className, message) {
        if (!panel || panel.querySelector("." + className)) {
            return;
        }
        var intro = append(panel, "div", "", className);
        intro.innerText = message;
    }

    function bindInput(input, handler, flagName) {
        if (input[flagName]) {
            return false;
        }

        if (input.addEventListener) {
            input.addEventListener("input", handler);
        } else {
            input.onkeyup = handler;
            input.onchange = handler;
            input.onpaste = handler;
        }

        input[flagName] = true;
        return true;
    }

    function ensureImagePreview(panel, urlLine) {
        if (!panel || !urlLine) {
            return;
        }

        var input = urlLine.querySelector("input[type='text']");
        if (!input) {
            return;
        }

        if (!input.placeholder) {
            input.placeholder = "https://example.com/image.jpg";
        }

        var preview = panel.querySelector(".rte-insertimage-preview");
        if (!preview) {
            preview = append(panel, "div", "", "rte-insertimage-preview is-empty");
            var image = append(preview, "img", "", "rte-insertimage-preview-image");
            image.alt = "Image preview";
            append(preview, "div", "", "rte-insertimage-preview-caption");
        }

        if (input.__rteRichTextBoxImagePreviewBound) {
            return;
        }

        var previewImage = preview.querySelector(".rte-insertimage-preview-image");
        var previewCaption = preview.querySelector(".rte-insertimage-preview-caption");

        function updatePreview() {
            var value = getUrlValue(input);
            if (!value) {
                preview.classList.add("is-empty");
                preview.classList.remove("is-error");
                previewImage.removeAttribute("src");
                previewCaption.innerText = "Enter an image URL to preview it here.";
                return;
            }

            preview.classList.remove("is-empty");
            preview.classList.remove("is-error");
            previewCaption.innerText = "Loading preview...";
            previewImage.src = value;
        }

        previewImage.onload = function () {
            preview.classList.remove("is-empty");
            preview.classList.remove("is-error");
            previewCaption.innerText = "Ready to insert this image.";
        };

        previewImage.onerror = function () {
            preview.classList.remove("is-empty");
            preview.classList.add("is-error");
            previewCaption.innerText = "Preview unavailable for this URL.";
        };

        bindInput(input, updatePreview, "__rteRichTextBoxImagePreviewBound");
        updatePreview();
    }

    function ensureDocumentPreview(panel, urlLine) {
        if (!panel || !urlLine) {
            return;
        }

        var input = urlLine.querySelector("input[type='text']");
        if (!input) {
            return;
        }

        if (!input.placeholder) {
            input.placeholder = "https://example.com/files/proposal.pdf";
        }

        var preview = panel.querySelector(".rte-insertdocument-preview");
        if (!preview) {
            preview = append(panel, "div", "", "rte-insertdocument-preview is-empty");
            var icon = append(preview, "div", "", "rte-insertdocument-preview-icon");
            append(icon, "div", "", "rte-insertdocument-preview-ext");
            var body = append(preview, "div", "", "rte-insertdocument-preview-body");
            append(body, "div", "", "rte-insertdocument-preview-title");
            append(body, "div", "", "rte-insertdocument-preview-meta");
        }

        if (input.__rteRichTextBoxDocumentPreviewBound) {
            return;
        }

        var ext = preview.querySelector(".rte-insertdocument-preview-ext");
        var title = preview.querySelector(".rte-insertdocument-preview-title");
        var meta = preview.querySelector(".rte-insertdocument-preview-meta");

        function updatePreview() {
            var value = getUrlValue(input);
            if (!value) {
                preview.classList.add("is-empty");
                ext.innerText = "DOC";
                title.innerText = "No document selected";
                meta.innerText = "Enter a document URL to preview the inserted link.";
                return;
            }

            preview.classList.remove("is-empty");
            ext.innerText = getExtension(value);
            title.innerText = getUrlFileName(value) || value;

            var host = getUrlHost(value);
            meta.innerText = host
                ? ("Source: " + host + "  |  The editor inserts a clickable link.")
                : "The editor inserts a clickable link at the current cursor position.";
        }

        bindInput(input, updatePreview, "__rteRichTextBoxDocumentPreviewBound");
        updatePreview();
    }

    function enhanceInsertImagePanels(root) {
        var panels = [];
        var i;

        if (root.classList && root.classList.contains("rte-panel-insertimage")) {
            panels.push(root);
        }

        if (root.querySelectorAll) {
            var nested = root.querySelectorAll(".rte-panel-insertimage");
            for (i = 0; i < nested.length; i++) {
                panels.push(nested[i]);
            }
        }

        for (i = 0; i < panels.length; i++) {
            var panel = panels[i];
            panel.classList.add("rte-richtextbox-dialog");

            var uploadTab = panel.querySelector(".fileuploader-dragdrop");
            if (uploadTab) {
                ensureUploadIntro(uploadTab, "rte-insertimage-intro", "Drop an image here or click anywhere in this panel to browse.");
            }

            var urlTab = panel.querySelector(".rte_insertimage_byurl");
            if (urlTab) {
                ensureUploadIntro(urlTab, "rte-insertimage-intro", "Paste a hosted image URL and verify the preview before inserting.");
                ensureImagePreview(urlTab, urlTab.querySelector(".rte-dialog-line-url"));
            }

            var actionButton = panel.querySelector(".rte-dialog-line-action .rte-dialog-button");
            if (actionButton && actionButton.innerText === "Insert") {
                actionButton.innerText = "Insert image";
            }
        }
    }

    function enhanceInsertDocumentPanels(root) {
        var panels = [];
        var i;

        if (root.classList && root.classList.contains("rte-panel-insertdocument")) {
            panels.push(root);
        }

        if (root.querySelectorAll) {
            var nested = root.querySelectorAll(".rte-panel-insertdocument");
            for (i = 0; i < nested.length; i++) {
                panels.push(nested[i]);
            }
        }

        for (i = 0; i < panels.length; i++) {
            var panel = panels[i];
            panel.classList.add("rte-richtextbox-dialog");

            var uploadTab = panel.querySelector(".fileuploader-dragdrop");
            if (uploadTab) {
                ensureUploadIntro(uploadTab, "rte-insertdocument-intro", "Upload a local file or drag it into the dialog to create a document link.");
            }

            var urlTab = panel.querySelector(".rte_insertdocument_byurl");
            if (urlTab) {
                ensureUploadIntro(urlTab, "rte-insertdocument-intro", "Paste a hosted file URL and review the link details before inserting.");
                ensureDocumentPreview(urlTab, urlTab.querySelector(".rte-dialog-line-url"));
            }

            var actionLine = panel.querySelector(".rte-dialog-line-action");
            if (actionLine) {
                actionLine.classList.add("rte-insertdocument-actions");
            }

            var actionButton = panel.querySelector(".rte-dialog-line-action .rte-dialog-button");
            if (actionButton && actionButton.innerText === "Insert") {
                actionButton.innerText = "Insert document";
            }
            if (actionButton && actionButton.innerText === "Update") {
                actionButton.innerText = "Update document";
            }
        }
    }

    function patchTree(root) {
        if (!root || root.nodeType !== 1) {
            return;
        }

        enhanceInsertImagePanels(root);
        enhanceInsertDocumentPanels(root);
    }

    function start() {
        patchTree(document.documentElement);

        if (!window.MutationObserver) {
            return;
        }

        var observer = new MutationObserver(function (mutations) {
            var i;
            var j;
            for (i = 0; i < mutations.length; i++) {
                for (j = 0; j < mutations[i].addedNodes.length; j++) {
                    patchTree(mutations[i].addedNodes[j]);
                }
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === "loading") {
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", start);
        } else {
            window.attachEvent("onload", start);
        }
    } else {
        start();
    }
}

//END of all_plugins.js 