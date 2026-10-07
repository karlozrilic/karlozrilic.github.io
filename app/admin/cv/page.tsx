'use client';
import LatexEditor from '@/app/src/components/custom/latex_editor';
import LatexPdfPreview from '@/app/src/components/custom/latex_pdf_preview';
import { Button } from '@/app/src/components/ui/button';
import { Spinner } from '@/app/src/components/ui/spinner';
import LoadingScreen from '@/app/src/sections/loading';
import { addOrUpdateCollection } from '@/app/src/service/firebase';
import { setCV } from '@/app/src/store/slices/CVSlice';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { useAuth } from '@/hooks/useAuth';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function CV() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const cvData = useSelector((state: RootState) => state.cv);
    const [source, setSource] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const isDirty = source !== null && source !== (cvData.data ?? '');

    useEffect(() => {
        if (authLoading) return;
        if (!user) router.replace('/');
    }, [user, authLoading, router]);

    useEffect(() => {
        if (cvData.data) {
            setSource(cvData.data);
        }
    }, [cvData.data]);

    async function save() {
        if (source === null || !isDirty || saving) return;
        setSaving(true);
        try {
            await addOrUpdateCollection({
                firebaseCollection: 'latex_cv',
                id: 'cv',
                data: { content: source },
            });
            dispatch(setCV(source));
            toast.success('CV saved');
        } catch (error) {
            console.error(error);
            toast.error(`Saving failed: ${error}`);
        } finally {
            setSaving(false);
        }
    }

    const saveRef = useRef(save);
    saveRef.current = save;
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
                event.preventDefault();
                saveRef.current();
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    if (authLoading || !user) return <LoadingScreen />;

    return (
        <div className='flex h-[calc(100svh-var(--header-height,68px))] flex-col'>
            <div className='flex items-center gap-2 border-b px-3 py-1.5'>
                <span className='text-xs text-muted-foreground'>
                    {isDirty ? 'Unsaved changes' : 'Saved'}
                </span>
                <Button
                    variant='outline'
                    size='sm'
                    className='ml-auto'
                    disabled={!isDirty || saving}
                    onClick={save}
                >
                    {saving ? <Spinner /> : <Save />}
                    Save
                </Button>
            </div>
            <div className='grid min-h-0 flex-1 grid-cols-2 grid-rows-1'>
                <div className='min-h-0 overflow-hidden border-r'>
                    <LatexEditor value={cvData.data ?? ''} onChange={setSource} />
                </div>
                <LatexPdfPreview source={source ?? ''} />
            </div>
        </div>
    );
}
