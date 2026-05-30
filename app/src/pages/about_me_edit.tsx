'use client'

import { fetchAboutMe, fetchAboutMeHistory } from '@/app/src/store/slices/aboutMeSlice';
import EditorWrapper from '../wrappers/editor_wrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import LoadingScreen from '../sections/loading';
import moment from 'moment';

export default function AboutMeEdit() {
    const dispatch = useDispatch<AppDispatch>();
    const aboutMe = useSelector((state: RootState) => state.aboutMe);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchAboutMe());
    }, [dispatch]);
    
    return <>
        <main className='flex justify-center p-2'>
            { !aboutMe.loaded ? <LoadingScreen /> : null }
            <div className='relative max-w-5xl w-full flex flex-col items-center gap-4'>
                <EditorWrapper
                    firebaseCollection={'about_me'}
                    id={'main'}
                    initialContent={aboutMe.data?.jsonBlocks || null}
                    updatedAt={moment(aboutMe.data?.updated)}
                    fetchFunction={fetchAboutMe}
                    fetchHistoryFunction={fetchAboutMeHistory}
                />
            </div>
        </main>
    </>
}