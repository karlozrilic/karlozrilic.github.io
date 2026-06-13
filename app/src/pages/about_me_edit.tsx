'use client'

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { fetchAboutMe, fetchAboutMeHistory } from '@/app/src/store/slices/aboutMeSlice';
import EditorWrapper from '@/app/src/wrappers/editor_wrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import LoadingScreen from '@/app/src/sections/loading';
import moment from 'moment';
import { AboutMe } from '@/app/src/types/about_me/about_me';
import { AboutMeHistory } from '@/app/src/types/about_me/about_me_history';

export default function AboutMeEdit({ adminOnly }: { adminOnly?: boolean }) {
    const [loading, setLoading] = useState<boolean>(true);
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (authLoading) return;

        if (adminOnly && !user) {
            router.replace('/');
            return;
        }

        setLoading(false);
    }, [user, authLoading, adminOnly, router]);

    const dispatch = useDispatch<AppDispatch>();
    const aboutMe = useSelector((state: RootState) => state.aboutMe);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchAboutMe());
    }, [dispatch]);

    async function fetchData(): Promise<AboutMe> {
        const response = await dispatch(fetchAboutMe());
        return response.payload as AboutMe;
    }

    async function fetchHistoryData(): Promise<AboutMeHistory[]> {
        const response = await dispatch(fetchAboutMeHistory());
        return response.payload as AboutMeHistory[];
    }

    if (loading) return (<LoadingScreen />);
    
    return <>
        <main className='flex justify-center p-2'>
            { !aboutMe.loaded ? <LoadingScreen /> : 
                <div className='relative max-w-5xl w-full flex flex-col items-center gap-4'>
                    <EditorWrapper
                        firebaseCollection={'about_me'}
                        id={'main'}
                        initialContent={aboutMe.data?.jsonBlocks || null}
                        updatedAt={moment(aboutMe.data?.updated)}
                        fetchFunction={fetchData}
                        fetchHistoryFunction={fetchHistoryData}
                    />
                </div>
            }
        </main>
    </>
}