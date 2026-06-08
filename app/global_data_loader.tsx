'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchVercelProjects } from '@/app/src/store/slices/vercelProjectsSlice';
import { fetchCountries } from '@/app/src/store/slices/countriesSlice';

export default function GlobalDataLoader() {
    const dispatch = useDispatch<AppDispatch>();
    const vercelProjectsStatus = useSelector((state: RootState) => state.vercelProjects.status);
    const countriesStatus = useSelector((state: RootState) => state.countries.status);

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