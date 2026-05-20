'use client'

import LoadingScreen from '@/app/src/sections/loading';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAboutMe, fetchAboutMeHistory } from '@/app/src/store/slices/aboutMeSlice';
import { updateAboutMe } from '@/app/src/service/firebase';
import { Button } from '@/app/src/components/ui/button';
import { ChevronRightIcon, History, Lock, LockOpen, Save } from 'lucide-react';
import { Spinner } from '@/app/src/components/ui/spinner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/app/src/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/src/components/ui/tooltip';
import moment, { Moment } from 'moment';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { dateTimeFormat } from '@/helpers/constants';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';

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

    const [historyLoading, setHistoryLoading] = useState<boolean>(false);
    const [aboutMeHistoryData, setAboutMeHistoryData] = useState<AboutMeHistory[]>([]);

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

            editor.setHTMLCode(aboutMeData?.content);

            editor.attachEvent('change', onChange);

            // Doesn't clear history if there is no slight timeout
            setTimeout(() => {
                // Removes history for undo/redo
                editor.clearHistory();
                // editor.revisionHistory.list();
                // editor.snippets.list();
                // editor.trackedChanges.list();
            }, 10);

            return true;
        };
        
        const initialized = tryInit();
		setWysiwygLoaded(initialized);

        return () => {
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

    async function historyOpen() {
        setHistoryLoading(true);

        try {
            const response = await dispatch(fetchAboutMeHistory());
            setAboutMeHistoryData(response.payload as AboutMeHistory[]);
        } catch (error) {
            console.error(error);
        } finally {
            setHistoryLoading(false);
        }
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
                                    <span>Updated: {updatedAt.fromNow()}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {updatedAt.format(dateTimeFormat)}
                                </TooltipContent>
                            </Tooltip>
                            : <span>Updated at: {updatedAt.format(dateTimeFormat)}</span>
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
                        <AlertDialogOverlay className='backdrop-blur-sm' />
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

                    <Sheet>
                        <SheetTrigger
                            asChild
                            onClick={historyOpen}
                        >
                            <Button variant='outline'>History</Button>
                        </SheetTrigger>
                        <SheetContent className='gap-0 lg:max-w-lg' showCloseButton={false}>
                            <SheetHeader>
                                <SheetTitle>History</SheetTitle>
                                <SheetDescription>Check history here</SheetDescription>
                            </SheetHeader>
                            {historyLoading ? 
                                <div className='flex w-full h-full justify-center items-center'>
                                    <Spinner className='size-8' />
                                </div>
                                :
                                <div className='grid flex-1 auto-rows-min gap-1 px-4 overflow-auto'>
                                    { aboutMeHistoryData.map((data, index) => {
                                        return (
                                            <Collapsible key={index}>
                                                <CollapsibleTrigger asChild>
                                                    <Button
                                                        variant='ghost'
                                                        size='sm'
                                                        className='group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground'
                                                    >
                                                        <ChevronRightIcon className='transition-transform group-data-[state=open]:rotate-90' />
                                                        <History />
                                                        {moment(data.archivedAt).format(dateTimeFormat)}
                                                    </Button>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent
                                                    className='
                                                        overflow-hidden
                                                        data-[state=closed]:animate-collapsible-up
                                                        data-[state=open]:animate-collapsible-down
                                                        mt-1 ml-5 style-lyra:ml-4
                                                    '
                                                >
                                                    <div className='flex flex-col gap-1'>
                                                        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        );
                                    }) }
                                </div>
                            }
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button variant='outline'>Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
                
                <div ref={editorRef} id='text-editor'></div>
            </div>
        </main>
    </>
}