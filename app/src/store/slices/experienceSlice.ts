import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, QueryConstraint, Timestamp, where } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { Experience } from '../../types/experience/experience';
import { ExperienceHistory } from '../../types/experience/experience_history';

type ExperienceState = {
    data: Experience[];
    loading: boolean;
    loaded: boolean;
    error: string | null;
};

const initialState: ExperienceState = {
    data: [],
    loading: false,
    loaded: false,
    error: null,
};

type ExperienceHistoryState = {
    data: ExperienceHistory[];
    loading: boolean;
    loaded: boolean;
    error: string | null;
};

const initialHistoryState: ExperienceHistoryState = {
    data: [],
    loading: false,
    loaded: false,
    error: null,
};

export type ExperienceFetchParams = {
    all?: boolean;
};

export type ExperienceHistoryFetchParams = {
    id?: string;
};

export const fetchExperiences = createAsyncThunk<
    Experience[],
    ExperienceFetchParams | void
>('experience/fetchExperiences', async (params) => {
    const { all = false } = params ?? {};
    let experiencesData: Experience[] = [];
    let queryConstraints: QueryConstraint[] = all ? 
    [
        orderBy('start_date', 'desc')
    ]    
    : 
    [
        where('show', '!=', false),
        orderBy('start_date', 'desc')
    ];

    try {
        const experiencesSnapshot = await getDocs(
            query(
                collection(db, 'experience'),
                ...queryConstraints
            )
        );
        experiencesData = experiencesSnapshot.docs.map(doc => {
            const data = doc.data() as
                Omit<Experience, 'start_date'> & 
                Omit<Experience, 'end_date'> & 
                Omit<Experience, 'updated'> & 
                {
                    start_date: Timestamp;
                    end_date: Timestamp;
                    updated: Timestamp;
                };

            return {
                ...data,
                start_date: data.start_date.toDate().toISOString(),
                end_date: data.end_date?.toDate().toISOString() ?? null,
                updated: data.updated.toDate().toISOString(),
                id: doc.ref.id
            } as Experience;
        });
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error('FIRESTORE QUERY FAILED');
            console.error('code:', error.code);
            console.error('message:', error.message);
            console.error('customData:', error.customData);
        } else if (error instanceof Error) {
            console.error('UNKNOWN ERROR');
            console.error('name:', error.name);
            console.error('message:', error.message);
        } else {
            console.error('NON-ERROR THROWN:', error);
        }
        throw error;
    }
    
    return experiencesData;
});

export const fetchExperiencesHistory = createAsyncThunk<
    ExperienceHistory[],
    ExperienceHistoryFetchParams | void
>('experience/fetchExperiencesHistory', async (params) => {
    const { id } = params ?? {};
    if (!id) return [];
    let experiencesData: ExperienceHistory[] = [];

    try {
        const experiencesSnapshot = await getDocs(
            query(
                collection(db, 'experience', id, 'history'),
                orderBy('archived_at', 'desc')
            )
        );
        experiencesData = experiencesSnapshot.docs.map(doc => {
            const data = doc.data() as
                Omit<ExperienceHistory, 'start_date'> & 
                Omit<ExperienceHistory, 'end_date'> & 
                Omit<Experience, 'updated'> &
                Omit<Experience, 'archived_at'> & 
                {
                    start_date: Timestamp;
                    end_date: Timestamp;
                    updated: Timestamp;
                    archived_at: Timestamp;
                };

            return {
                ...data,
                start_date: data.start_date.toDate().toISOString(),
                end_date: data.end_date?.toDate().toISOString() ?? null,
                updated: data.updated.toDate().toISOString(),
                archived_at: data.archived_at.toDate().toISOString(),
                id: doc.ref.id
            } as ExperienceHistory;
        });
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error('FIRESTORE QUERY FAILED');
            console.error('code:', error.code);
            console.error('message:', error.message);
            console.error('customData:', error.customData);
        } else if (error instanceof Error) {
            console.error('UNKNOWN ERROR');
            console.error('name:', error.name);
            console.error('message:', error.message);
        } else {
            console.error('NON-ERROR THROWN:', error);
        }
        throw error;
    }
    
    return experiencesData;
});

const experienceSlice = createSlice({
    name: 'experience',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchExperiences.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchExperiences.fulfilled, (state, action: PayloadAction<Experience[]>) => {
            state.loading = false;
            state.loaded = true;
            state.data = action.payload;
        })
        .addCase(fetchExperiences.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch experience';
        });
    },
});

const experienceHistorySlice = createSlice({
    name: 'experience_history',
    initialState: initialHistoryState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchExperiencesHistory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchExperiencesHistory.fulfilled, (state, action: PayloadAction<ExperienceHistory[]>) => {
            state.loading = false;
            state.loaded = true;
            state.data = action.payload;
        })
        .addCase(fetchExperiencesHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch experience';
        });
    },
});

export const experiencesReducer = experienceSlice.reducer;
export const experiencesHistoryReducer = experienceHistorySlice.reducer;