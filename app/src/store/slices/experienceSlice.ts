import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { collection, collectionGroup, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { Experience } from '../../types/experience/experience';
import { ExperienceHistory } from '../../types/experience/experience_history';

interface ExperienceState {
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

interface ExperienceHistoryState {
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

export const fetchExperiences = createAsyncThunk('experience/fetchExperiences', async () => {
    let mergedData: Experience[] = [];

    try {
        const experiencesSnapshot = await getDocs(
            query(
                collection(db, 'experience'),
                where('show', '!=', false),
                orderBy('show'),
                orderBy('start_date', 'desc')
            )
        );
        const experiencesData: Experience[] = experiencesSnapshot.docs.map(doc => {
            const data = doc.data() as
                Omit<Experience, 'start_date'> & 
                Omit<Experience, 'end_date'> & 
                Omit<Experience, 'experience_id'> & 
                {
                    start_date: Timestamp;
                    end_date: Timestamp;
                    experience_id: string;
                };

            return {
                ...data,
                start_date: data.start_date.toDate().toISOString(),
                end_date: data.end_date?.toDate().toISOString() ?? null,
                experience_id: doc.ref.id
            } as Experience;
        });
        const descriptionSnapshot = await getDocs(collectionGroup(db, 'content'));
        const descriptionData: DescriptionWithParent[] = descriptionSnapshot.docs.map(doc => ({experience_id: doc.ref.parent.parent?.id, ...doc.data() as Description}) );

        mergedData = experiencesData.map(experience => ({
            ...experience,
            content: descriptionData
                .filter(skill => skill.experience_id === experience.experience_id)
                .map(({ experience_id, ...skill }) => skill),
        }));
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
    
    return mergedData;
});

export const fetchExperiencesHistory = createAsyncThunk('experience/fetchExperiencesHistory', async () => {
    let mergedData: ExperienceHistory[] = [];

    try {
        const experiencesSnapshot = await getDocs(
            query(
                collection(db, 'experience'),
                where('show', '!=', false),
                orderBy('show'),
                orderBy('start_date', 'desc')
            )
        );
        const experiencesData: ExperienceHistory[] = experiencesSnapshot.docs.map(doc => {
            const data = doc.data() as
                Omit<ExperienceHistory, 'start_date'> & 
                Omit<ExperienceHistory, 'end_date'> & 
                Omit<ExperienceHistory, 'experience_id'> & 
                {
                    start_date: Timestamp;
                    end_date: Timestamp;
                    experience_id: string;
                };

            return {
                ...data,
                start_date: data.start_date.toDate().toISOString(),
                end_date: data.end_date?.toDate().toISOString() ?? null,
                experience_id: doc.ref.id
            } as ExperienceHistory;
        });
        const descriptionSnapshot = await getDocs(collectionGroup(db, 'content'));
        const descriptionData: DescriptionWithParent[] = descriptionSnapshot.docs.map(doc => ({experience_id: doc.ref.parent.parent?.id, ...doc.data() as Description}) );

        mergedData = experiencesData.map(experience => ({
            ...experience,
            content: descriptionData
                .filter(skill => skill.experience_id === experience.experience_id)
                .map(({ experience_id, ...skill }) => skill),
        }));
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
    
    return mergedData;
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