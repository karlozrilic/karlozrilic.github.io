'use client';
import { useEffect, useRef, useState } from "react";
import { compile } from '@/lib/latex-engine';

export type PreviewStatus = 'idle' | 'compiling' | 'ok' | 'error';

export function useLatexPreview(source: string, delay = 900) {
    const [url, setUrl] = useState<string | null>(null);
    const [log, setLog] = useState('');
    const [status, setStatus] = useState<PreviewStatus>('idle');

    const runId = useRef(0);
    const urlRef = useRef<string | null>(null);

    useEffect(() => {
        const id = ++runId.current;
        setStatus('compiling');

        const timer = setTimeout(async () => {
            try {
                const res = await compile(source);
                if (id !== runId.current) return; // superseded

                setLog(res.log);
                if (res.ok && res.pdf) {
                    const blob = new Blob([res.pdf as BlobPart], { type: 'application/pdf' });
                    const next = URL.createObjectURL(blob);
                    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
                    urlRef.current = next;
                    setUrl(next);
                    setStatus('ok');
                } else {
                    setStatus('error');
                }
            } catch (err) {
                if (id !== runId.current) return;
                setLog(String(err));
                setStatus('error');
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [source, delay]);

    useEffect(
        () => () => {
            if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        },
        [],
    );

    return { url, log, status };
}