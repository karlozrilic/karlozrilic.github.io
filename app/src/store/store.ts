import { configureStore } from '@reduxjs/toolkit';
import { aboutMeReducer, aboutMeHistoryReducer } from '@/app/src/store/slices/aboutMeSlice';
import technologiesReducer from '@/app/src/store/slices/technologiesSlice';
import projectsReducer from '@/app/src/store/slices/projectsSlice';
import { experiencesReducer, experiencesHistoryReducer } from '@/app/src/store/slices/experienceSlice';
import { vercelProjectsReducer } from '@/app/src/store/slices/vercelProjectsSlice';
import { countriesReducer } from '@/app/src/store/slices/countriesSlice';
import { CVReducer } from './slices/CVSlice';

export const store = configureStore({
    reducer: {
        cv: CVReducer,
        aboutMe: aboutMeReducer,
        aboutMeHistory: aboutMeHistoryReducer,
        technologies: technologiesReducer,
        projects: projectsReducer,
        experiences: experiencesReducer,
        experiencesHistory: experiencesHistoryReducer,
        vercelProjects: vercelProjectsReducer,
        countries: countriesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;