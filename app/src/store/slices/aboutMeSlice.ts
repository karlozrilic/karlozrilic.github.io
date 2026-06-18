import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { AboutMe } from '@/app/src/types/about_me/about_me';
import { AboutMeHistory } from '@/app/src/types/about_me/about_me_history';

type AboutMeState = {
    data: AboutMe | null;
    loading: boolean;
    loaded: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

type AboutMeHistoryState = {
    data: AboutMeHistory[];
    loading: boolean;
    loaded: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};


const initialState: AboutMeState = {
    data: null,
    loading: false,
    loaded: false,
    status: 'idle',
    error: null,
};

const initialHistoryState: AboutMeHistoryState = {
    data: [],
    loading: false,
    loaded: false,
    status: 'idle',
    error: null,
};

export const fetchAboutMe = createAsyncThunk('aboutMe/fetchAboutMe', async () => {
    let aboutMeData: AboutMe | null = null;

    try {
        const aboutMeSnapshot = await getDocs(
            query(
                collection(db, 'about_me')
            )
        );
        aboutMeData = aboutMeSnapshot.docs.map((doc) => {
            const data = doc.data() as Omit<AboutMe, 'updated'> & {
                updated: Timestamp;
            };

            return {
                ...data,
                updated: data.updated?.toDate?.().toISOString(),
                id: doc.ref.id
            };
        })[0] || null; // Return the first (and likely only) document, or null if none exist
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
    
    return aboutMeData;
});

export const fetchAboutMeHistory = createAsyncThunk('aboutMe/fetchAboutMeHistory', async () => {
    let aboutMeData: AboutMeHistory[] = [];

    try {
        const aboutMeSnapshot = await getDocs(
            query(
                collection(db, 'about_me', 'main', 'history'),
                orderBy('archived_at', 'desc')
            )
        );
        aboutMeData = aboutMeSnapshot.docs.map((doc) => {
            const data = doc.data() as
                Omit<AboutMeHistory, 'archived_at'> &
                Omit<AboutMeHistory, 'updated'> &
                {
                    archived_at: Timestamp;
                    updated: Timestamp;
                };

            return {
                ...data,
                archived_at: data.archived_at?.toDate?.().toISOString(),
                updated: data.updated?.toDate?.().toISOString(),
                id: doc.ref.id
            };
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
    
    return aboutMeData;
});

const aboutMeSlice = createSlice({
    name: 'about_me',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAboutMe.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = 'loading';
        })
        .addCase(fetchAboutMe.fulfilled, (state, action: PayloadAction<AboutMe | null>) => {
            state.loading = false;
            state.loaded = true;
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchAboutMe.rejected, (state, action) => {
            state.loading = false;
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch experience';
        });
    },
});

const aboutMeHistorySlice = createSlice({
    name: 'about_me_history',
    initialState: initialHistoryState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAboutMeHistory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = 'loading';
        })
        .addCase(fetchAboutMeHistory.fulfilled, (state, action: PayloadAction<AboutMeHistory[]>) => {
            state.loading = false;
            state.loaded = true;
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchAboutMeHistory.rejected, (state, action) => {
            state.loading = false;
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch experience';
        });
    },
});

export const aboutMeReducer = aboutMeSlice.reducer;
export const aboutMeHistoryReducer = aboutMeHistorySlice.reducer;