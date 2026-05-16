'use client'

import LoadingScreen from '@/app/src/sections/loading';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchAboutMe } from '../store/slices/aboutMeSlice';
import { updateAboutMe } from '../service/firebase';
import { Button } from '../components/ui/button';
import { Lock, LockOpen, Save } from 'lucide-react';
import { Spinner } from '../components/ui/spinner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';

export default function Portfolio() {
    const dispatch = useDispatch<AppDispatch>();
    const aboutMe = useSelector((state: RootState) => state.aboutMe);

    const editorRef = useRef<HTMLDivElement>(null);
    const [textEditor, setTextEditor] = useState<any>(null);
    const [wysiwygLoaded, setWysiwygLoaded] = useState(false);
    const [loaded, setLoaded] = useState(aboutMe.loaded || false);
    const [readOnly, setReadOnly] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [aboutMeData, setAboutMeData] = useState<string>('');
    const { data } = useSelector((state: RootState) => state.aboutMe);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchAboutMe());
    }, [dispatch]);

    useEffect(() => {
        setLoaded(aboutMe.loaded)
        if (aboutMe.data.length) {
            setAboutMeData(data[0].content);
        }
    }, [aboutMe]);

    useEffect(() => {
        if (aboutMe.loaded !== true) return;

        const tryInit = () => {
            const RichTextEditor = (window as any).RichTextEditor;

            if (!RichTextEditor || !editorRef.current) return false;

            const editor = new RichTextEditor('#text-editor', {
                skin: 'rounded-corner',
                toolbar: 'default',
                editorResizeMode: 'none',
                readOnly: readOnly
            });

            editor.setHTMLCode(aboutMeData);

            setTextEditor(editor);

            editor.attachEvent('change', function () {       
                console.log(editor.getPlainText());
                console.log(aboutMeData);
                console.log(editor.getHTMLCode() === aboutMeData);
            });

            return true;
        };

        const interval = setInterval(() => {
            const initialized = tryInit();
            setWysiwygLoaded(initialized);
            if (initialized) clearInterval(interval);
        }, 200);

        return () => clearInterval(interval);
    }, [aboutMe, aboutMeData]);

    function toggleLock() {
        textEditor.setReadOnly(!readOnly);
        setReadOnly(!readOnly);
    }

    async function submitChanges() {
        if (!textEditor) return;
        setSubmitting(true);
        toast.promise<{ name: string }>(
            () =>
              new Promise(async (resolve, reject) => {
                try {
                    await updateAboutMe(textEditor.getHTMLCode())
                    setSubmitting(false);
                    return resolve({ name: 'Data' });
                } catch (error) {
                    setSubmitting(false);
                    console.error(error);
                    return reject({ error });
                }
              }),
            {
              loading: 'Saving...',
              success: (data) => `${data.name} has been saved`,
              error: (data) => `Error: ${data.error.message}`,
              position: 'top-center'
            }
          )
    }

    return <>
        {!wysiwygLoaded || !loaded ? <LoadingScreen /> : null}
        <main className='flex min-h-screen justify-center p-2'>
            <div className='relative max-w-5xl flex flex-col items-center gap-4'>
                <div className='flex self-end gap-2'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='outline'
                                size='sm'
                                onClick={toggleLock}
                            >
                                {readOnly ? <LockOpen /> : <Lock /> }
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {readOnly ? <p>Unlock text editor</p> : <p>Lock text editor</p> }
                        </TooltipContent>
                    </Tooltip>
                    
                    <AlertDialog>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                    >
                                        <Save />
                                    </Button>
                                </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Save text</p>
                            </TooltipContent>
                        </Tooltip>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to save it?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently overwrite previous data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={submitChanges}
                                    disabled={submitting}
                                >
                                    {submitting ? <Spinner data-icon='inline-start' /> : <Save />}
                                    Save
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                
                <div ref={editorRef} id='text-editor'></div>
            </div>
        </main>
    </>
}