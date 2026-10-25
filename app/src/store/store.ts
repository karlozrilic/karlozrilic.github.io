import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { aboutMeReducer, aboutMeHistoryReducer } from '@/app/src/store/slices/aboutMeSlice';
import technologiesReducer from '@/app/src/store/slices/technologiesSlice';
import projectsReducer from '@/app/src/store/slices/projectsSlice';
import { experiencesReducer, experiencesHistoryReducer } from '@/app/src/store/slices/experienceSlice';
import { vercelProjectsReducer } from '@/app/src/store/slices/vercelProjectsSlice';
import { countriesReducer } from '@/app/src/store/slices/countriesSlice';
import { CVReducer } from './slices/CVSlice';

const reducer = combineReducers({
    cv: CVReducer,
    aboutMe: aboutMeReducer,
    aboutMeHistory: aboutMeHistoryReducer,
    technologies: technologiesReducer,
    projects: projectsReducer,
    experiences: experiencesReducer,
    experiencesHistory: experiencesHistoryReducer,
    vercelProjects: vercelProjectsReducer,
    countries: countriesReducer,
});

export const makeStore = (preloadedState?: Partial<RootState>) => configureStore({ reducer, preloadedState });

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
