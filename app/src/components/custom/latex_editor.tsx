'use client';
import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { StreamLanguage } from '@codemirror/language';
import { stex } from '@codemirror/legacy-modes/mode/stex';

type LatexEditorProps = {
    value: string;
    onChange: (value: string) => void;
}

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