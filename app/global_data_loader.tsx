'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAboutMe } from '@/app/src/store/slices/aboutMeSlice';
import { fetchTechnologies } from '@/app/src/store/slices/technologiesSlice';
import { fetchProjects } from '@/app/src/store/slices/projectsSlice';
import { fetchExperiences } from '@/app/src/store/slices/experienceSlice';
import { fetchVercelProjects } from '@/app/src/store/slices/vercelProjectsSlice';
import { fetchCountries } from '@/app/src/store/slices/countriesSlice';

export default function GlobalDataLoader() {
    const dispatch = useDispatch<AppDispatch>();
    const aboutMeStatus = useSelector((state: RootState) => state.aboutMe.status);
    const technologiesStatus = useSelector((state: RootState) => state.technologies.status);
    const projectsStatus = useSelector((state: RootState) => state.projects.status);
    const experiencesStatus = useSelector((state: RootState) => state.experiences.status);
    const vercelProjectsStatus = useSelector((state: RootState) => state.vercelProjects.status);
    const countriesStatus = useSelector((state: RootState) => state.countries.status);

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

    return null;
}