'use client';
import { useEffect, useState } from 'react';
import { useLatexPreview } from '@/hooks/useLatexPreview';

export default function LatexPdfPreview({ source }: { source: string }) {
    const { url, log, status } = useLatexPreview(source);
    const [previewState, setPreviewState] = useState({
        statusMessage: 'Compiling...',
        class: 'text-neutral-500'
    });
    const [showLog, setShowLog] = useState(false);

    useEffect(() => {
        switch (status) {
            case 'ok':
                setPreviewState({
                    statusMessage: 'Up to date',
                    class: 'text-green-600'
                });
                break;
            
            case 'error':
                setPreviewState({
                    statusMessage: 'Compilation failed',
                    class: 'text-red-600'
                });
                break;

            case 'compiling':
                setPreviewState({
                    statusMessage: 'Compiling…',
                    class: 'text-neutral-500'
                });
                break;
        
            default:
                setPreviewState({
                    statusMessage: 'Idle',
                    class: 'text-neutral-500'
                });
                break;
        }
    }, [status])

    return (
        <div className='relative flex h-full flex-col bg-neutral-100'>
            <div className='flex items-center gap-2 border-b bg-white px-3 py-1.5 text-xs'>
                <span
                    className={previewState.class}
                >
                    {previewState.statusMessage}
                </span>
                <button
                    onClick={() => setShowLog((v) => !v)}
                    className='ml-auto rounded border px-2 py-0.5 text-neutral-500 hover:bg-neutral-50'
                >
                    {showLog ? 'Hide log' : 'Log'}
                </button>
            </div>

        <div className='relative flex-1'>
            {url ? (
                <iframe src={url} title='PDF preview' className='h-full w-full border-0' />
            ) : (
                <div className='flex h-full items-center justify-center text-sm text-neutral-500'>
                    {status === 'compiling' ? 'Building PDF...' : 'No output yet'}
                </div>
            )}

            {status === 'compiling' && url && (
                <div className='pointer-events-none absolute inset-0 bg-white/40' />
            )}
        </div>

        {showLog && (
            <pre className='max-h-64 overflow-auto border-t bg-neutral-900 p-3 text-[11px] leading-relaxed text-neutral-200'>
                {log || '(empty)'}
            </pre>
        )}
        </div>
    );
}