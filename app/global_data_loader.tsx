'use client'

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAboutMe } from '@/app/src/store/slices/aboutMeSlice';
import { fetchTechnologies } from '@/app/src/store/slices/technologiesSlice';
import { fetchProjects } from '@/app/src/store/slices/projectsSlice';
import { fetchExperiences } from '@/app/src/store/slices/experienceSlice';
import { fetchVercelProjects } from '@/app/src/store/slices/vercelProjectsSlice';
import { fetchCountries } from '@/app/src/store/slices/countriesSlice';
import LoadingComponent from './src/layout_components/loading';

export default function GlobalDataLoader() {
    const dispatch = useDispatch<AppDispatch>();
    const aboutMeStatus = useSelector((state: RootState) => state.aboutMe.status);
    const technologiesStatus = useSelector((state: RootState) => state.technologies.status);
    const projectsStatus = useSelector((state: RootState) => state.projects.status);
    const experiencesStatus = useSelector((state: RootState) => state.experiences.status);
    const vercelProjectsStatus = useSelector((state: RootState) => state.vercelProjects.status);
    const countriesStatus = useSelector((state: RootState) => state.countries.status);

    const dataLoaded = useMemo(() => {
        return (
            (aboutMeStatus === 'succeeded' || aboutMeStatus === 'failed') &&
            (technologiesStatus === 'succeeded' || technologiesStatus === 'failed') &&
            (projectsStatus === 'succeeded' || projectsStatus === 'failed') &&
            (experiencesStatus === 'succeeded' || experiencesStatus === 'failed') &&
            (vercelProjectsStatus === 'succeeded' || vercelProjectsStatus === 'failed') &&
            (countriesStatus === 'succeeded' || countriesStatus === 'failed')
        );
    }, [aboutMeStatus, technologiesStatus, projectsStatus, experiencesStatus, vercelProjectsStatus, countriesStatus]);

    useEffect(() => {
        if (aboutMeStatus === 'idle') {
            dispatch(fetchAboutMe())
        }
    }, [dispatch, aboutMeStatus])

    useEffect(() => {
        if (technologiesStatus === 'idle') {
            dispatch(fetchTechnologies())
        }
    }, [dispatch, technologiesStatus])

    useEffect(() => {
        if (projectsStatus === 'idle') {
            dispatch(fetchProjects())
        }
    }, [dispatch, projectsStatus])

    useEffect(() => {
        if (experiencesStatus === 'idle') {
            dispatch(fetchExperiences())
        }
    }, [dispatch, experiencesStatus])

    useEffect(() => {
        if (vercelProjectsStatus === 'idle') {
            dispatch(fetchVercelProjects())
        }
    }, [dispatch, vercelProjectsStatus])

    useEffect(() => {
        if (countriesStatus === 'idle') {
            dispatch(fetchCountries())
        }
    }, [dispatch, countriesStatus])

    useEffect(() => {
        if (!dataLoaded) return;

        const hash = (window as any).__pendingHash;

        if (!hash) return;

        console.log('Restoring scroll position for hash:', hash);

        requestAnimationFrame(() => {
            document.getElementById(hash.slice(1))?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            delete (window as any).__pendingHash;
        });
    }, [dataLoaded]);

    if (
        aboutMeStatus === 'loading' ||
        technologiesStatus === 'loading' ||
        projectsStatus === 'loading' ||
        experiencesStatus === 'loading' ||
        vercelProjectsStatus === 'loading' ||
        countriesStatus === 'loading'
    ) {
        return <LoadingComponent />;
    }

    return null;
}