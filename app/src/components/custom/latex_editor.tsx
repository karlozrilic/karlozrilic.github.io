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

    useEffect(() => {
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
        return () => view.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div ref={host} className='h-full overflow-auto' />;
}