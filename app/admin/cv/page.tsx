'use client';
import LatexEditor from '@/app/src/components/custom/latex_editor';
import LatexPdfPreview from '@/app/src/components/custom/latex_pdf_preview';
import { useState } from 'react';

const INITIAL = String.raw`\documentclass{article}
    \begin{document}
    \section{Hello}
    The Gaussian integral:
    \[ \int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi} \]
    \end{document}
`;

export default function CV() {
    const [source, setSource] = useState(INITIAL);

    return (
        <div className='grid h-screen grid-cols-2'>
            <LatexEditor value='' onChange={(value) => {
                console.log(value);
                setSource(value);
            }} />
            <LatexPdfPreview source={source} />
        </div>
    );
}