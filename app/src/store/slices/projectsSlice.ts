import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { Project } from '../../types/project/project';

interface ProjectState {
    data: Project[];
    loading: boolean;
    loaded: boolean;
    error: string | null;
};

const initialState: ProjectState = {
    data: [],
    loading: false,
    loaded: false,
    error: null,
};

export type ProjectFetchParams = {
    all?: boolean;
};

export type ProjectHistoryFetchParams = {
    id?: string;
};

export const fetchProjects = createAsyncThunk<
    Project[],
    ProjectFetchParams
>('project/fetchProjects', async (params) => {
    const { all = false } = params ?? {};
    let projectsData: Project[] = [];

    try {
        const projectsSnapshot = await getDocs(query(collection(db, 'projects'), orderBy('updated', 'asc')));
        projectsData = projectsSnapshot.docs.map(doc => {
            const data = doc.data() as
                Omit<Project, 'updated'> & 
                {
                    updated: Timestamp;
                };

            return {
                ...data,
                updated: data.updated.toDate().toISOString(),
            } as Project;
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
    
    return projectsData;
});

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProjects.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
            state.loading = false;
            state.loaded = true;
            state.data = action.payload;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch projects';
        });
    },
});

export default projectsSlice.reducer;