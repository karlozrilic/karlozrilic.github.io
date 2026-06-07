import { configureStore } from '@reduxjs/toolkit';
import { aboutMeReducer, aboutMeHistoryReducer } from '@/app/src/store/slices/aboutMeSlice';
import technologiesReducer from '@/app/src/store/slices/technologiesSlice';
import projectsReducer from '@/app/src/store/slices/projectsSlice';
import { experiencesReducer, experiencesHistoryReducer } from '@/app/src/store/slices/experienceSlice';
import { countriesReducer } from './slices/countriesSlice';

export const store = configureStore({
    reducer: {
        aboutMe: aboutMeReducer,
        aboutMeHistory: aboutMeHistoryReducer,
        technologies: technologiesReducer,
        projects: projectsReducer,
        experiences: experiencesReducer,
        experiencesHistory: experiencesHistoryReducer,
        countries: countriesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;