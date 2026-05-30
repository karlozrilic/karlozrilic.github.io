'use client'

import LoadingScreen from '@/app/src/sections/loading';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAboutMe, fetchAboutMeHistory } from '@/app/src/store/slices/aboutMeSlice';
import { updateAboutMe } from '@/app/src/service/firebase';
import { Button } from '@/app/src/components/ui/button';
import { ChevronRightIcon, History, HistoryIcon, Lock, LockOpen, Redo, Save, Undo } from 'lucide-react';
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
import Editor from '../components/editor/Editor';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { AboutMeHistory } from '../types/about_me/about_me_history';
import { Kbd, KbdGroup } from '../components/ui/kbd';
import { Separator } from '../components/ui/separator';

function AboutMeEdit() {
    const dispatch = useDispatch<AppDispatch>();
    const aboutMe = useSelector((state: RootState) => state.aboutMe);

    const isDirtyRef = useRef(false);

    const [initialContent, setInitialContent] = useState<PartialBlock[] | undefined | 'loading'>('loading');
    const [loaded, setLoaded] = useState(aboutMe.loaded || false);
    const [readOnly, setReadOnly] = useState(true);
    const [isDirty, setIsDirty] = useState(false);
    const [historyState, setHistoryState] = useState<any>(null);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false);
    const [updatedAt, setUpdatedAt] = useState<Moment | null>(null);
    const [historyLoading, setHistoryLoading] = useState<boolean>(false);
    const [aboutMeHistoryData, setAboutMeHistoryData] = useState<AboutMeHistory[]>([]);
    
    // Creates a new editor instance.
    // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
    // can delay the creation of the editor until the initial content is loaded.
    const editor = useMemo(() => {
        if (initialContent === 'loading') {
            return undefined;
        }
        try {
            return BlockNoteEditor.create({ initialContent, trailingBlock: false });
        } catch (error) {
            console.error('Error creating editor:', error);
            toast.error(`Error creating editor: ${error}`);
            return BlockNoteEditor.create();
        }
        
    }, [initialContent]);

    useEffect(() => {
        window.addEventListener('keydown', captureKeyDown);

        return () => {
            window.removeEventListener('keydown', captureKeyDown);
        }
    }, []);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchAboutMe());
    }, [dispatch]);

    useEffect(() => {
        setLoaded(aboutMe.loaded)
        if (aboutMe.data.length) {
            setInitialContent(aboutMe.data[0].jsonBlocks);
            const updated = moment(aboutMe.data[0].updated);
            setUpdatedAt(updated);
        }
    }, [aboutMe]);

    useEffect(() => {
        isDirtyRef.current = isDirty;
    }, [isDirty]);

    useEffect(() => {
        if (!editor) return;

        editor.isEditable = !readOnly;
        const state = getEditorsHistory();
        setHistoryState(state);
    }, [editor, readOnly]);

    function captureKeyDown(event: KeyboardEvent) {
        let foundOption = false;

        switch (event.code) {
            case 'KeyS':
                if (event.ctrlKey || event.metaKey) {
                    if (isDirtyRef.current) {
                        setSaveDialogOpen(saveDialogOpen => !saveDialogOpen);
                    } else {
                        toast.warning('Nothing to save. Please make some changes to enable saving.');
                    }
                    foundOption = true;
                }
                break;
            default:
                break;
        }

        if (foundOption) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function toggleLock() {
        setReadOnly(!readOnly);
    }

    async function handleEditorChange(jsonBlocks: PartialBlock[]) {
        setHistoryState(getEditorsHistory());
        if (!editor || !initialContent || initialContent === 'loading') return;
        const original = await editor.blocksToFullHTML(initialContent).replace(/[\n\r\t]/gm, '');
        const current = await editor.blocksToFullHTML(jsonBlocks).replace(/[\n\r\t]/gm, '').replace(/[\n\r\t]/gm, '');
        setIsDirty(!(original === current));
    }

    async function submitChanges() {
        if (!editor) return;
        setSubmitting(true);
        setReadOnly(true);
        toast.promise<{ name: string }>(
            () =>
              new Promise(async (resolve, reject) => {
                try {
                    const content = await editor.blocksToFullHTML(editor.document);
                    const markdown = await editor.blocksToMarkdownLossy(editor.document);
                    await updateAboutMe(editor.document, content, markdown);
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
              error: (data) => `Error: ${data.error.message}`
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

    function getEditorsHistory() {
        if (!editor) return;
        const historyPlugin = editor._tiptapEditor.state.plugins.find((plugin: any) =>
            plugin.key.includes('history')
        )
        const state = historyPlugin?.getState(editor._tiptapEditor.state);
        return state;
    }

    function handleUndo() {
        if (!editor || !historyState) return;
        if (historyState.done.eventCount) {
            editor.undo();
        }
    }

    function handleRedo() {
        if (!editor || !historyState) return;
        if (historyState.undone.eventCount) {
            editor.redo();
        }
    }

    return <>
        {!editor && !loaded ? <LoadingScreen /> : null}
        <main className='flex justify-center p-2'>
            <div className='relative max-w-5xl w-full flex flex-col items-center gap-4'>
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
                                onClick={handleUndo}
                                disabled={!historyState || !historyState.done.eventCount}
                            >
                                <Undo />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Undo</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='outline'
                                size='sm'
                                onClick={handleRedo}
                                disabled={!historyState || !historyState.undone.eventCount}
                            >
                                <Redo />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Redo</p>
                        </TooltipContent>
                    </Tooltip>
                    
                    <AlertDialog
                        open={saveDialogOpen}
                        onOpenChange={setSaveDialogOpen}
                    >
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
                                {isDirty ? 
                                    <p>
                                        Save text 
                                        <KbdGroup>
                                            <Kbd>Ctrl + S</Kbd>
                                        </KbdGroup>
                                    </p> : <p>Edit text to save</p>}
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
                                    {submitting ? <Spinner data-icon='inline-start' /> : ''}
                                    Save
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Separator orientation='vertical' />

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

                    <Sheet>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <SheetTrigger
                                    asChild
                                    onClick={historyOpen}
                                >
                                    <Button
                                        variant='outline'
                                        size='sm'
                                    >
                                        <HistoryIcon />
                                    </Button>      
                                </SheetTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>View History</p>
                            </TooltipContent>
                        </Tooltip>
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
                                    { aboutMeHistoryData.length ? aboutMeHistoryData.map((data, index) => {
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
                                                        {moment(data.archived_at).format(dateTimeFormat)}
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
                                    }) : <p>No history found.</p> }
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

                <Editor editor={editor} onChange={handleEditorChange} editable={!readOnly} />
            </div>
        </main>
    </>
}

export default AboutMeEdit;
//export default withTextEditor(AboutMeEdit);