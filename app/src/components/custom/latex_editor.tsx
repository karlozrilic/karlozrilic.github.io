'use client';
import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { StreamLanguage, HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { stex } from '@codemirror/legacy-modes/mode/stex';

type LatexEditorProps = {
    value: string;
    onChange: (value: string) => void;
}

export const shadcnEditorTheme = EditorView.theme({
    '&': {
        color: 'var(--foreground)',
        backgroundColor: 'var(--background)',
        fontSize: '14px',
        height: '100%',
    },
    '.cm-content': {
        caretColor: 'var(--foreground)',
        fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--foreground)' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: 'var(--cm-selection)',
    },
    // Semi-transparent on purpose: CodeMirror renders the selection
    // background in a layer behind the text (so glyphs stay visible on top
    // of a highlight), but .cm-activeLine paints directly on the line
    // element itself, in front of that layer. A solid color here would
    // fully hide the selection highlight on whichever line has the cursor -
    // e.g. any single-line/single-word selection, since that line is
    // always "active".
    '.cm-activeLine': { backgroundColor: 'color-mix(in oklch, var(--muted) 55%, transparent)' },
    '.cm-gutters': {
        backgroundColor: 'var(--background)',
        color: 'var(--muted-foreground)',
        borderRight: '1px solid var(--border)',
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'var(--muted)',
        color: 'var(--foreground)',
    },
    '.cm-matchingBracket, &.cm-focused .cm-matchingBracket': {
        backgroundColor: 'var(--accent)',
        outline: '1px solid var(--ring)',
    },
    '&.cm-focused': { outline: 'none' },
    '.cm-tooltip': {
        backgroundColor: 'var(--popover)',
        color: 'var(--popover-foreground)',
        border: '1px solid var(--border)',
    },
});

export const shadcnHighlight = HighlightStyle.define([
    { tag: tags.keyword, color: 'var(--cm-keyword)' },
    { tag: tags.tagName, color: 'var(--cm-tag)' },
    { tag: tags.bracket, color: 'var(--cm-bracket)' },
    { tag: tags.comment, color: 'var(--cm-comment)', fontStyle: 'italic' },
    { tag: tags.atom, color: 'var(--cm-atom)' },
    { tag: tags.number, color: 'var(--cm-atom)' },
    { tag: tags.string, color: 'var(--cm-string)' },
    { tag: tags.variableName, color: 'var(--cm-variable)' },
    { tag: tags.invalid, color: 'var(--destructive)' },
]);

export default function LatexEditor({ value, onChange }: LatexEditorProps) {
    const host = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (!host.current) return;

        const view = new EditorView({
            state: EditorState.create({
                doc: value,
                extensions: [
                    basicSetup,
                    StreamLanguage.define(stex),
                    shadcnEditorTheme,
                    syntaxHighlighting(shadcnHighlight),
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) onChange(update.state.doc.toString());
                    }),
                ],
            }),
            parent: host.current!,
        });

        viewRef.current = view;
        
        return () => {
            view.destroy();
            viewRef.current = null;
        };
    }, []);

    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;

        const currentValue = view.state.doc.toString();

        if (value !== currentValue) {
            view.dispatch({
                changes: {
                    from: 0,
                    to: currentValue.length,
                    insert: value,
                },
            });
        }
    }, [value]);

    return <div ref={host} className='h-full overflow-auto' />;
}