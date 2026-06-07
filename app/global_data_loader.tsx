'use client'

import { useEffect } from 'react';
import { fetchCountries } from '@/app/src/store/slices/countriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';

export default function GlobalDataLoader() {
    const dispatch = useDispatch<AppDispatch>();
    const countriesStatus = useSelector((state: RootState) => state.countries.status);

    useEffect(() => {
        if (countriesStatus === 'idle') {
            dispatch(fetchCountries())
        }
    }, [dispatch, countriesStatus])

    return null;
}