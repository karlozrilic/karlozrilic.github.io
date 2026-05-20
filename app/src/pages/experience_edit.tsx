'use client'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect } from 'react';
import { fetchExperiences } from '../store/slices/experienceSlice';
import LoadingScreen from '../sections/loading';

export default function ExperienceEdit() {
    const dispatch = useDispatch<AppDispatch>();
    const experiences = useSelector((state: RootState) => state.experiences);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchExperiences());
    }, [dispatch]);

    return <>
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
        </main>
    </>
}