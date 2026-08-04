import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VercelProject } from '@/app/src/types/project/vercel_project';

const VERCEL_API = 'https://api.vercel.com/v10';

type VercelProjectsState = {
    data: VercelProject[];
    loading: boolean;
    loaded: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: VercelProjectsState = {
    data: [],
    loading: false,
    loaded: false,
    status: 'idle',
    error: null,
};

export const fetchVercelProjects = createAsyncThunk('vercelProjects/fetchVercelProjects', async () => {
    let projects: VercelProject[] = [];

    try {
        const result = await fetch(`${VERCEL_API}/projects`, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
            },
        });
        const responseJSON = await result.json();

        if (!responseJSON || responseJSON.error) return [];

        projects = responseJSON.projects as VercelProject[];
        // Sort from newest to oldest
        projects.sort((projectA, projectB) => projectB.createdAt - projectA.createdAt);
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
    
    return projects;
});

const vercelProjectsSlice = createSlice({
    name: 'vercel_projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchVercelProjects.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = 'loading';
        })
        .addCase(fetchVercelProjects.fulfilled, (state, action: PayloadAction<VercelProject[]>) => {
            state.loading = false;
            state.loaded = true;
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchVercelProjects.rejected, (state, action) => {
            state.loading = false;
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch countries';
        });
    },
});

export const vercelProjectsReducer = vercelProjectsSlice.reducer;