'use client'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { useEffect, useRef, useState } from 'react';
import { fetchExperiences, fetchExperiencesHistory } from '@/app/src/store/slices/experienceSlice';
import LoadingScreen from '@/app/src/sections/loading';
import EditorWrapper, { EditorWrapperRef } from '@/app/src/wrappers/editor_wrapper';
import { Separator } from '@/app/src/components/ui/separator';
import moment from 'moment';
import { ExperienceHistory } from '@/app/src/types/experience/experience_history';
import { Experience } from '@/app/src/types/experience/experience';
import ExperienceEditComponent from '@/app/src/components/custom/experience_edit';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/src/components/ui/tooltip';
import { Button } from '@/app/src/components/ui/button';
import { Save } from 'lucide-react';
import { Kbd, KbdGroup } from '@/app/src/components/ui/kbd';
import { Spinner } from '@/app/src/components/ui/spinner';
import { toast } from 'sonner';
import { getExperience } from '../service/firebase';

export default function ExperienceEdit() {
    const editorRefs = useRef<EditorWrapperRef[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const experiences = useSelector((state: RootState) => state.experiences);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchExperiences({
            all: true
        }));
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('keydown', captureKeyDown);

        return () => {
            window.removeEventListener('keydown', captureKeyDown);
        }
    }, []);

    async function fetchData(id: string): Promise<Experience> {
        const response = await getExperience(id);
        return response as Experience;
    }

    async function fetchHistoryData(id?: string): Promise<ExperienceHistory[]> {
        const response = await dispatch(fetchExperiencesHistory({ id }));
        return response.payload as ExperienceHistory[];
    }

    function captureKeyDown(event: KeyboardEvent) {
        let foundOption = false;

        switch (event.code) {
            case 'KeyS':
                if (event.ctrlKey || event.metaKey) {
                    checkSave();
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

    function checkDirty(): boolean {
        let dirty = false;
        for (const editor of editorRefs.current) {
            if (editor && editor.isDirty) {
                dirty = true;
                break;
            }
        }

        return dirty;
    }

    function checkSave(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (checkDirty()) {
            setSaveDialogOpen(saveDialogOpen => !saveDialogOpen);
        } else {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            toast.warning('Nothing to save. Please make some changes to enable saving.');
        }
    }

    async function handleSave() {
        setSubmitting(true);
        try {
            const result = await toast.promise<{ name: string }>(
                (async () => {
                    for (const editor of editorRefs.current) {
                        if (editor && editor.isDirty) {
                            await editor.submitChanges(true);
                        }
                    }

                    return { name: 'All data' };
                })(),
                {
                    loading: 'Saving all data...',
                    success: (data) => `${data.name} has been saved`,
                    error: (data) => `Error: ${data.error.message}`
                }
            );

            return result;
        } catch (error) {
            console.error('Error submitting changes:', error);
        } finally {
            setSubmitting(false);
        }
    }

    return <>
        <main className='flex justify-center p-2'>
            { !experiences.loaded ? <LoadingScreen /> : null }
            <div className='relative max-w-5xl w-full'>
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
                                        onClick={checkSave}
                                    >
                                        <Save />
                                    </Button>
                                </AlertDialogTrigger>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side={'bottom'}>
                            <p>
                                Save data 
                                <KbdGroup>
                                    <Kbd>Ctrl + S</Kbd>
                                </KbdGroup>
                            </p>
                        </TooltipContent>
                    </Tooltip>
                    <AlertDialogOverlay className='backdrop-blur-sm' />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to save data?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will save all changes made to experiences.
                                <br/>
                                This action cannot be undone. This will permanently overwrite previous data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleSave}
                                disabled={submitting}
                            >
                                {submitting ? <Spinner data-icon='inline-start' /> : ''}
                                Save
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                { experiences.data.length ? experiences.data.map((experience, index) => (
                    <div key={index} className='flex flex-col gap-4'>
                        <ExperienceEditComponent experience={experience} />
                        <EditorWrapper
                            ref={(editor: EditorWrapperRef) => {
                                editorRefs.current[index] = editor;
                            }}
                            firebaseCollection={'experience'}
                            id={experience.id}
                            initContent={experience.jsonBlocks}
                            updatedAt={moment(experience.updated)}
                            fetchFunction={fetchData}
                            fetchHistoryFunction={fetchHistoryData}
                            captureKeys={false}
                        />
                        {index < experiences.data.length - 1 && <Separator className='my-6' />}
                    </div>
                  )) : null }
            </div>
        </main>
    </>
}