'use client';

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { addOrUpdateCollection, deleteHistory } from '@/app/src/service/firebase';
import moment, { Moment } from 'moment';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { toast } from 'sonner';
import { RootState } from '@/app/src/store/store';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/src/components/ui/tooltip';
import { Button } from '@/app/src/components/ui/button';
import { ChevronRightIcon, History, HistoryIcon, Lock, LockOpen, Redo, Save, Trash, Undo } from 'lucide-react';
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
import { Kbd, KbdGroup } from '@/app/src/components/ui/kbd';
import { Spinner } from '@/app/src/components/ui/spinner';
import { Separator } from '@/app/src/components/ui/separator';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/app/src/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/app/src/components/ui/collapsible';
import Editor from '@/app/src/components/editor/Editor';
import { formatDate } from '@/helpers/constants';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/app/src/components/ui/empty';
import { AboutMe } from '@/app/src/types/about_me/about_me';
import { Project } from '@/app/src/types/project/project';
import { Experience } from '@/app/src/types/experience/experience';
import { AboutMeHistory } from '@/app/src/types/about_me/about_me_history';
import { ExperienceHistory } from '@/app/src/types/experience/experience_history';

type ExcludeHistoryType = AboutMe | Project[] | Experience[] | null;
type HistoryType = AboutMeHistory | ExperienceHistory;

export type EditorWrapperRef = {
  submitChanges: (external?: boolean) => Promise<void>;
  isDirty: boolean;
};

const EditorWrapper = forwardRef(function EditorWrapper({
    firebaseCollection,
    id,
    initialContent,
    updatedAt = null,
    fetchFunction,
    fetchHistoryFunction,
    captureKeys = true,
}: {
    firebaseCollection: string;
    id: string,
    initialContent: PartialBlock[] | null,
    updatedAt?: Moment | null;
    fetchFunction: (id: string) => Promise<ExcludeHistoryType>,
    fetchHistoryFunction: (id?: string) => Promise<HistoryType[]>,
    captureKeys?: boolean
}, ref) {
    const initialContentRef = useRef<PartialBlock[] | null>(initialContent);
    const isDirtyRef = useRef(false);

    const [editor, setEditor] = useState<BlockNoteEditor | null>(null);
    const [readOnly, setReadOnly] = useState(true);
    const [isDirty, setIsDirty] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [historyState, setHistoryState] = useState<any>(null);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [historyLoading, setHistoryLoading] = useState<boolean>(false);
    const [contentHistoryData, setContentHistoryData] = useState<HistoryType[]>([]);

    useImperativeHandle(ref, () => ({
        submitChanges,
        isDirty,
    }));

    useEffect(() => {
        if (!initialContent) {
            setEditor(BlockNoteEditor.create({ trailingBlock: false }));
            return;
        }
        try {
            setEditor(BlockNoteEditor.create({ initialContent, trailingBlock: false }));
        } catch (error) {
            console.error('Error creating editor:', error);
            toast.error(`Error creating editor: ${error}`);
            setEditor(BlockNoteEditor.create({ trailingBlock: false  }));
        }

        getHistory();
    }, []);

    useEffect(() => {
        if (!captureKeys) return;
        window.addEventListener('keydown', captureKeyDown);

        return () => {
            window.removeEventListener('keydown', captureKeyDown);
        }
    }, []);

    // Keep the ref in sync whenever state changes
    useEffect(() => {
        isDirtyRef.current = isDirty;
    }, [isDirty]);

    useEffect(() => {
        if (!editor) return;

        editor.isEditable = !readOnly;
        const state = getEditorsHistory();
        setHistoryState(state);
    }, [editor, readOnly]);

    async function getHistory() {
        try {
            const payload = await fetchHistoryFunction(id);
            setContentHistoryData(payload);
        } catch (error) {
            console.error(error);
        }
    }

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
        if (!editor) return;
        setHistoryState(getEditorsHistory());

        const currentInitial = initialContentRef.current;

        if (!currentInitial) {
            if (jsonBlocks.length === 0) {
                setIsDirty(false);
            } else if (
                jsonBlocks.length === 1 &&
                // @ts-ignore
                jsonBlocks[0].content?.length === 0 &&
                jsonBlocks[0].children?.length === 0) {
                setIsDirty(false);
            } else {
                const current = await editor.blocksToHTMLLossy(jsonBlocks).replace(/[\n\r\t]/gm, '');
                setIsDirty(!!current.length);
            }
        } else {
            const original = await editor.blocksToHTMLLossy(currentInitial).replace(/[\n\r\t]/gm, '');
            const current = await editor.blocksToHTMLLossy(jsonBlocks).replace(/[\n\r\t]/gm, '');
            setIsDirty(!(original === current));
        }
    }

    async function submitChanges(external?: boolean) {
        if (!editor) return;
        setSubmitting(true);
        setReadOnly(true);
        try {
            if (!external) {
                const result = await toast.promise<{ name: string }>(
                    () =>
                        new Promise(async (resolve, reject) => {
                            try {
                                await updateData();
                                return resolve({ name: 'Data' });
                            } catch (error) {
                                console.error(error);
                                return reject({ error });
                            }
                        }),
                    {
                        loading: 'Saving...',
                        success: (data) => `${data.name} has been saved`,
                        error: (data) => `Error: ${data.error.message}`
                    }
                );

                return result;
            } else {
                await updateData();
            }
        } catch (error) {
            console.error('Error submitting changes:', error);
            throw error;
        } finally {
            setSubmitting(false);
        }
    }

    async function updateData() {
        if (!editor) return;
        const content = await editor.blocksToHTMLLossy(editor.document);
        const markdown = await editor.blocksToMarkdownLossy(editor.document);
        await addOrUpdateCollection({
            firebaseCollection,
            id,
            data: {
                jsonBlocks: editor.document,
                content,
                markdown
            }
        });
        const payload = await fetchFunction(id) as ExcludeHistoryType;
        if (payload) {
            const newBlocks = Array.isArray(payload)
                ? payload.find(p => p.id === id)?.jsonBlocks || null
                : payload.jsonBlocks ?? null;

            initialContentRef.current = newBlocks;
        }
        await getHistory();
        setIsDirty(false);
    }

    async function deleteHistoryById(history_id: string) {
        return;
        try {
            await deleteHistory({
                firebaseCollection,
                id,
                history_id
            });
        } catch (error) {
            console.error(error);   
        } finally {
            
        }
    }

    async function clearHistory() {
        setHistoryLoading(true);
        // TODO add toast maybe
        try {
            await deleteHistory({
                firebaseCollection,
                id
            });
            await getHistory();
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

    return (
        <div className='flex flex-col items-center gap-4'>
            <div className='flex self-end items-center gap-2 h-9'>
                { updatedAt ?
                    moment().diff(updatedAt, 'hours') < 24 ?
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span>Updated: {updatedAt.fromNow()}</span>
                            </TooltipTrigger>
                            <TooltipContent side={'bottom'}>
                                {formatDate(updatedAt.toDate(), { time: true })}
                            </TooltipContent>
                        </Tooltip>
                        : <span>Updated at: {formatDate(updatedAt.toDate(), { time: true })}</span>
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
                    <TooltipContent side={'bottom'}>
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
                    <TooltipContent side={'bottom'}>
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
                        <TooltipContent side={'bottom'}>
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
                                onClick={submitChanges.bind(null, false)}
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
                    <TooltipContent side={'bottom'}>
                        {readOnly ? <p>Unlock text editor</p> : <p>Lock text editor</p> }
                    </TooltipContent>
                </Tooltip>

                <Sheet
                    open={historyOpen}
                    onOpenChange={setHistoryOpen}
                >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SheetTrigger asChild>
                                <Button
                                    variant='outline'
                                    size='sm'
                                >
                                    <HistoryIcon />
                                </Button>      
                            </SheetTrigger>
                        </TooltipTrigger>
                        <TooltipContent side={'bottom'}>
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
                                { contentHistoryData.length ? contentHistoryData.map((data, index) => {
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
                                                    {formatDate(new Date(data.archived_at), { time: true })}

                                                    <span className='ml-auto' onClick={(event) => {
                                                        event.preventDefault();
                                                        deleteHistoryById(data.id);
                                                    }}><Trash className='stroke-(--destructive)' /></span>
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
                                }) :
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyMedia variant='icon'>
                                                <HistoryIcon />
                                            </EmptyMedia>
                                            <EmptyTitle>No history yet</EmptyTitle>
                                            <EmptyDescription>
                                                You haven't edited anything yet.<br/>
                                                History will show here when you edit and save something.
                                            </EmptyDescription>
                                        </EmptyHeader>
                                    </Empty>
                                }
                            </div>
                        }
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button variant='outline'>Close</Button>
                            </SheetClose>
                            {
                                contentHistoryData.length ?
                                    <Button onClick={clearHistory}>{historyLoading ? <Spinner />  : 'Clear history'}</Button>
                                    : null
                            }
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            <Editor editor={editor} onChange={handleEditorChange} editable={!readOnly} />
        </div>
    );
});

export default EditorWrapper;