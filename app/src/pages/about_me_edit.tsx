'use client'

import LoadingScreen from '@/app/src/sections/loading';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAboutMe } from '@/app/src/store/slices/aboutMeSlice';
import { updateAboutMe } from '@/app/src/service/firebase';
import { Button } from '@/app/src/components/ui/button';
import { Lock, LockOpen, Save } from 'lucide-react';
import { Spinner } from '@/app/src/components/ui/spinner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/app/src/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/src/components/ui/tooltip';
import moment, { Moment } from 'moment';

export default function AboutMeEdit() {
    const dispatch = useDispatch<AppDispatch>();
    const aboutMe = useSelector((state: RootState) => state.aboutMe);

    const editorRef = useRef<any>(null);
    const editorRefInstance = useRef<any>(null);
    const [wysiwygLoaded, setWysiwygLoaded] = useState(false);
    const [loaded, setLoaded] = useState(aboutMe.loaded || false);
    const [readOnly, setReadOnly] = useState(true);
    const [isDirty, setIsDirty] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [aboutMeData, setAboutMeData] = useState<AboutMe | null>(null);
    const [updatedAt, setUpdatedAt] = useState<Moment | null>(null);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchAboutMe());
    }, [dispatch]);

    useEffect(() => {
        setLoaded(aboutMe.loaded)
        if (aboutMe.data.length) {
            setAboutMeData(aboutMe.data[0]);
            const updated = moment(aboutMe.data[0].updated);
            setUpdatedAt(updated);
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

            editorRefInstance.current = editor;

            editor.attachEvent('change', onChange);

            editor.setHTMLCode(aboutMeData?.content);

            return true;
        };

        const interval = setInterval(() => {
            const initialized = tryInit();
            setWysiwygLoaded(initialized);
            if (initialized) clearInterval(interval);
        }, 200);

        return () => {
            clearInterval(interval);
            editorRefInstance.current?.detachEvent('change', onChange);
        }
    }, [aboutMeData]);

    function onChange(state: any, cmd: any, value: any) {
        const original = aboutMeData?.content.replace(/[\n\r\t]/gm, '');
        const current = editorRefInstance.current?.getHTMLCode().replace(/[\n\r\t]/gm, '');
        setIsDirty(!(original === current));
    }

    function toggleLock() {
        editorRefInstance.current.setReadOnly(!readOnly);
        setReadOnly(!readOnly);
    }

    async function submitChanges() {
        if (!editorRefInstance.current) return;
        setSubmitting(true);
        editorRefInstance.current.setReadOnly(true);
        setReadOnly(true);
        toast.promise<{ name: string }>(
            () =>
              new Promise(async (resolve, reject) => {
                try {
                    await updateAboutMe(editorRefInstance.current.getHTMLCode())
                    await dispatch(fetchAboutMe());
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
                <div className='flex self-end items-center gap-2'>
                    { updatedAt ?
                        moment().diff(updatedAt, 'hours') < 24 ?
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>{updatedAt.fromNow()}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {updatedAt.format('D.M.YYYY., HH:mm:ss')}
                                </TooltipContent>
                            </Tooltip>
                            : <span>{updatedAt.format('D.M.YYYY., HH:mm:ss')}</span>
                        :
                        null
                    }
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
                                <span>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            disabled={!isDirty}
                                        >
                                            <Save />
                                        </Button>
                                    </AlertDialogTrigger>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                {isDirty ? <p>Save text</p> : <p>Edit text to save</p>}
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