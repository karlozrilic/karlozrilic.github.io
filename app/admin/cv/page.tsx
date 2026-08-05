'use client';
import LatexEditor from '@/app/src/components/custom/latex_editor';
import LatexPdfPreview from '@/app/src/components/custom/latex_pdf_preview';
import { RootState } from '@/app/src/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CV() {
    const cvData = useSelector((state: RootState) => state.cv);
    const [source, setSource] = useState<string | null>(null);

    useEffect(() => {
        if (cvData.data) {
            setSource(cvData.data);
        }
    }, [cvData]);

    return (
        <div className='grid h-screen grid-cols-2'>
            <LatexEditor value='' onChange={(value) => {
                console.log(value);
                setSource(value);
            }} />
            <LatexPdfPreview source={source ?? ''} />
        </div>
    );
}