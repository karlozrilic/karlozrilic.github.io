import { configureStore } from '@reduxjs/toolkit';
import skillGroupsReducer from './slices/skillGroupSlice';

export const store = configureStore({
    reducer: {
        skillGroups: skillGroupsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;