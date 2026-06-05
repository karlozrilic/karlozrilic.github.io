'use client';

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { updateCollection } from '@/app/src/service/firebase';
import moment, { Moment } from 'moment';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { toast } from 'sonner';
import { RootState } from '@/app/src/store/store';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/src/components/ui/tooltip';
import { Button } from '@/app/src/components/ui/button';
import { ChevronRightIcon, History, HistoryIcon, Lock, LockOpen, Redo, Save, Undo } from 'lucide-react';
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
import { dateTimeFormat } from '@/helpers/constants';

type ExcludeHistoryTypeKeys = Exclude<keyof RootState, 'technologies' | `${string}History`>;
type FetchExcludeHistoryType = RootState[ExcludeHistoryTypeKeys];
type ExcludeHistoryType = RootState[ExcludeHistoryTypeKeys]['data'];

type HistoryKeys = Extract<keyof RootState, `${string}History`>;
type FetchHistoryType = RootState[HistoryKeys];
type HistoryType = RootState[HistoryKeys]['data'][number];

type StateKeys = Exclude<keyof RootState, 'technologies' | `${string}History`>;
type StateTypes = RootState[StateKeys];

export type EditorWrapperRef = {
  submitChanges: (external?: boolean) => Promise<void>;
  isDirty: boolean;
};

const EditorWrapper = forwardRef(function EditorWrapper({
    firebaseCollection,
    id,
    initContent,
    updatedAt = null,
    fetchFunction,
    fetchHistoryFunction,
    captureKeys = true,
}: {
    firebaseCollection: string;
    id: string,
    initContent: PartialBlock[] | null,
    updatedAt?: Moment | null;
    fetchFunction: (id: string) => Promise<ExcludeHistoryType>,
    fetchHistoryFunction: (id?: string) => Promise<HistoryType[]>,
    captureKeys?: boolean
}, ref) {
    const isDirtyRef = useRef(false);

    const [editor, setEditor] = useState<BlockNoteEditor | null>(null);
    const [readOnly, setReadOnly] = useState(true);
    const [initialContent, setInitialContent] = useState<PartialBlock[] | null>(initContent);
    const [isDirty, setIsDirty] = useState(false);
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
            setEditor(BlockNoteEditor.create({ initialContent: initialContent, trailingBlock: false }));
        } catch (error) {
            console.error('Error creating editor:', error);
            toast.error(`Error creating editor: ${error}`);
            setEditor(BlockNoteEditor.create({ trailingBlock: false  }));
        }
    }, [initialContent]);

    useEffect(() => {
        if (!captureKeys) return;
        window.addEventListener('keydown', captureKeyDown);

        return () => {
            window.removeEventListener('keydown', captureKeyDown);
        }
    }, []);

    useEffect(() => {

    }, []);

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
        if (!editor) return;
        setHistoryState(getEditorsHistory());
        if (!initialContent) {
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
            const original = await editor.blocksToHTMLLossy(initialContent).replace(/[\n\r\t]/gm, '');
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
                                const content = await editor.blocksToHTMLLossy(editor.document);
                                const markdown = await editor.blocksToMarkdownLossy(editor.document);
                                await updateCollection({ firebaseCollection, id, jsonBlocks: editor.document, content, markdown });
                                const payload = await fetchFunction(id) as ExcludeHistoryType;
                                if (payload) {
                                    setInitialContent(Array.isArray(payload)
                                        ? payload.find(payload => payload.id === id)?.jsonBlocks || null
                                        : payload.jsonBlocks ?? null);
                                }
                                setIsDirty(false);
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
                const content = await editor.blocksToHTMLLossy(editor.document);
                const markdown = await editor.blocksToMarkdownLossy(editor.document);
                await updateCollection({
                    firebaseCollection,
                    id,
                    jsonBlocks: editor.document,
                    content,
                    markdown
                });
                setIsDirty(false);
            }
        } catch (error) {
            console.error('Error submitting changes:', error);
            throw error;
        } finally {
            setSubmitting(false);
        }
    }

    async function historyOpen() {
        setHistoryLoading(true);

        try {
            const payload = await fetchHistoryFunction(id);
            setContentHistoryData(payload);
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
            <div className='flex self-end items-center gap-2'>
                { updatedAt ?
                    moment().diff(updatedAt, 'hours') < 24 ?
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span>Updated: {updatedAt.fromNow()}</span>
                            </TooltipTrigger>
                            <TooltipContent side={'bottom'}>
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
    );
});

export default EditorWrapper;