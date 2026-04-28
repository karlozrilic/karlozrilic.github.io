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
                activateReviewSuggestionWithDefaultActionFocus(suggestionId, {
                    focusPanel: true
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
                var reviewFocusLabel = getReviewFocusActionDisplayLabel(suggestion, getPreferredReviewActionFocus()) || getReviewFocusActionDisplayLabel(suggestion, "");
                var reviewLabel = isPreviewTarget
                    ? "Open this AI review queue" + (reviewFocusLabel ? " and focus " + reviewFocusLabel : "")
                    : "Open this AI suggestion in review" + (reviewFocusLabel ? " and focus " + reviewFocusLabel : "");
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
