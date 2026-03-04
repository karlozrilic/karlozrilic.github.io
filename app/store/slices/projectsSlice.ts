import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../utils/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { ProjectWithTime } from '@/app/interfaces/project/project_with_time';
import { FirebaseError } from 'firebase/app';

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

export const fetchProjects = createAsyncThunk('project/fetchProjects', async () => {
    let projectsData: Project[] = [];

    try {
        const projectsSnapshot = await getDocs(query(collection(db, 'projects'), orderBy('updated_at', 'asc')));
        projectsData = projectsSnapshot.docs.map(doc => {
            const { updated_at, ...rest } = doc.data() as ProjectWithTime;
            return { ...rest } as Project;
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