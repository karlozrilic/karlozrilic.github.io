import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../utils/firebase';
import { collection, doc, getDocs, getDocsFromServer, orderBy, query, setDoc } from 'firebase/firestore';

interface TechnologiesState {
    data: Technologies[];
    loading: boolean;
    loaded: boolean;
    error: string | null;
};

const initialState: TechnologiesState = {
    data: [],
    loading: false,
    loaded: false,
    error: null,
};

export const fetchTechnologies = createAsyncThunk('technologies/fetchTechnologies', async () => {
    const technologiesSnapshot = await getDocs(query(collection(db, 'technologies')));
    const technologiesData: Technologies[] = technologiesSnapshot.docs.map((doc) => doc.data() as Technologies);

    return technologiesData;
});

const technologiesSlice = createSlice({
    name: 'technologies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTechnologies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTechnologies.fulfilled, (state, action: PayloadAction<Technologies[]>) => {
            state.loading = false;
            state.loaded = true;
            state.data = action.payload;
        })
        .addCase(fetchTechnologies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch technologies';
        });
    },
});

export default technologiesSlice.reducer;