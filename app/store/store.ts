import { configureStore } from '@reduxjs/toolkit';
import skillGroupsReducer from './slices/skillGroupSlice';
import projectsReducer from './slices/projectsSlice';
import experiencesReducer from './slices/experienceSlice';

export const store = configureStore({
    reducer: {
        skillGroups: skillGroupsReducer,
        projects: projectsReducer,
        experiences: experiencesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;