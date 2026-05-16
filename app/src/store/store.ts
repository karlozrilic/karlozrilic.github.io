import { configureStore } from '@reduxjs/toolkit';
import aboutMeReducer from './slices/aboutMeSlice';
import technologiesReducer from './slices/technologiesSlice';
import projectsReducer from './slices/projectsSlice';
import experiencesReducer from './slices/experienceSlice';

export const store = configureStore({
    reducer: {
        aboutMe: aboutMeReducer,
        technologies: technologiesReducer,
        projects: projectsReducer,
        experiences: experiencesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;