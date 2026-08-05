import { db } from '@/lib/firebase';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { collection, doc, getDoc } from 'firebase/firestore';

type CVState = {
    data: string | null;
    loading: boolean;
    loaded: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: CVState = {
    data: null,
    loading: false,
    loaded: false,
    status: 'idle',
    error: null,
};

export const fetchCV = createAsyncThunk('CV/CV', async () => {
    let cv: string | null = null;

    try {
        const cvSnapshot = await getDoc(
            doc(db, 'latex_cv', 'cv')
        );

        if (!cvSnapshot.exists()) return null;

        cv = cvSnapshot.data().content;
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
    
    return cv;
});

const CVSlice = createSlice({
    name: 'about_me',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCV.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = 'loading';
        })
        .addCase(fetchCV.fulfilled, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.loaded = true;
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchCV.rejected, (state, action) => {
            state.loading = false;
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch experience';
        });
    },
});

export const CVReducer = CVSlice.reducer;