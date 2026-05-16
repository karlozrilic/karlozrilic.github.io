import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, Timestamp } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

interface AboutMeState {
    data: AboutMe[];
    loading: boolean;
    loaded: boolean;
    error: string | null;
};

const initialState: AboutMeState = {
    data: [],
    loading: false,
    loaded: false,
    error: null,
};

export const fetchAboutMe = createAsyncThunk('aboutMe/fetchAboutMe', async () => {
    let aboutMeData: AboutMe[] = [];

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
            };
        });
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error("FIRESTORE QUERY FAILED");
            console.error("code:", error.code);
            console.error("message:", error.message);
            console.error("customData:", error.customData);
        } else if (error instanceof Error) {
            console.error("UNKNOWN ERROR");
            console.error("name:", error.name);
            console.error("message:", error.message);
        } else {
            console.error("NON-ERROR THROWN:", error);
        }
        throw error;
    }
    
    return aboutMeData;
});

const aboutMeSlice = createSlice({
    name: 'skill_groups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAboutMe.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAboutMe.fulfilled, (state, action: PayloadAction<AboutMe[]>) => {
            state.loading = false;
            state.loaded = true;
            state.data = action.payload;
        })
        .addCase(fetchAboutMe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch experience';
        });
    },
});

export default aboutMeSlice.reducer;