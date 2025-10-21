import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../utils/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { ProjectWithTime } from '@/app/interfaces/project/project_with_time';

interface ProjectState {
    data: Project[];
    loading: boolean;
    loadedOnce: boolean;
    error: string | null;
};

const initialState: ProjectState = {
    data: [],
    loading: false,
    loadedOnce: false,
    error: null,
};

export const fetchProjects = createAsyncThunk('project/fetchProjects', async () => {
    const projectsSnapshot = await getDocs(query(collection(db, 'projects'), orderBy('updated_at', 'asc')));
    const projectsData: Project[] = projectsSnapshot.docs.map(doc => {
        const { updated_at, ...rest } = doc.data() as ProjectWithTime;
        return { ...rest } as Project;
    });

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
            state.loadedOnce = true;
            state.data = action.payload;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch projects';
        });
    },
});

export default projectsSlice.reducer;