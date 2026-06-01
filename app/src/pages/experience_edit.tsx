'use client'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect } from 'react';
import { fetchExperiences, fetchExperiencesHistory } from '../store/slices/experienceSlice';
import LoadingScreen from '../sections/loading';
import EditorWrapper from '../wrappers/editor_wrapper';
import { Separator } from '../components/ui/separator';
import moment from 'moment';
import { ExperienceHistory } from '../types/experience/experience_history';
import { Experience } from '../types/experience/experience';
import ExperienceEditComponent from '../components/custom/experience_edit';

export default function ExperienceEdit() {
    const dispatch = useDispatch<AppDispatch>();
    const experiences = useSelector((state: RootState) => state.experiences);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchExperiences({
            all: true
        }));
    }, [dispatch]);

    async function fetchData(): Promise<Experience[]> {
        const response = await dispatch(fetchExperiences({
            all: true
        }));
        return response.payload as Experience[];
    }

    async function fetchHistoryData(id?: string): Promise<ExperienceHistory[]> {
        const response = await dispatch(fetchExperiencesHistory({ id }));
        return response.payload as ExperienceHistory[];
    }

    return <>
        <main className='flex justify-center p-2'>
            { !experiences.loaded ? <LoadingScreen /> : null }
            <div className='relative max-w-5xl w-full'>
                { experiences.data.length ? experiences.data.map((experience, index) => (
                    <div key={index} className='flex flex-col gap-4'>
                        <ExperienceEditComponent experience={experience} />
                        <EditorWrapper
                            firebaseCollection={'experience'}
                            id={experience.id}
                            initialContent={experience.jsonBlocks}
                            updatedAt={moment(experience.updated)}
                            fetchFunction={fetchData}
                            fetchHistoryFunction={fetchHistoryData}
                        />
                        {index < experiences.data.length - 1 && <Separator className='my-6' />}
                    </div>
                  )) : null }
            </div>
        </main>
        {/*
        { !experiences.loaded ? <LoadingScreen /> : null }
        <main className='flex min-h-screen justify-center p-2'>
            <div className='relative max-w-5xl flex flex-col items-center gap-4'>
                { experiences.data.map((data, index) => {
                    return (
                        <div key={index}>
                            {data.company_name}
                        </div>
                    )
                }) }
            </div>
        </main> */}
    </>
}