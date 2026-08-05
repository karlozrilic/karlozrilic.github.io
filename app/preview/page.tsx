'use client';
import LatexPdfPreview from '@/app/src/components/custom/latex_pdf_preview';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/src/store/store';
import { useEffect, useState } from 'react';

export default function EditorPage() {
    const cvData = useSelector((state: RootState) => state.cv);
    const [source, setSource] = useState<string | null>(null);

    useEffect(() => {
        if (cvData.data) {
            setSource(cvData.data);
        }
    }, [cvData]);

    return (
        <div className='grid h-screen grid-cols-1'>
            <LatexPdfPreview source={source ?? ''} />
        </div>
    );
}