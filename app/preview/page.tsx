'use client';
import { useState } from 'react';
import LatexPdfPreview from '@/app/src/components/custom/latex_pdf_preview';

const INITIAL = String.raw`\documentclass{article}
    \begin{document}
    \section{Hello}
    The Gaussian integral:
    \[ \int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi} \]
    \end{document}
`;

export default function EditorPage() {
    const [source, setSource] = useState(INITIAL);

    fetch("/core/busytex/busytex_worker.js").then(r =>
        r.text().then(t => console.log('here', r.status, r.headers.get("content-type"), t.slice(0, 120)))
    );

    return (
        <div className='grid h-screen grid-cols-1'>
            <LatexPdfPreview source={source} />
        </div>
    );
}