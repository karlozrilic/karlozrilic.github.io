import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../utils/firebase';
import { collection, collectionGroup, getDocs, orderBy, query } from 'firebase/firestore';
import { ExperienceWithId } from '@/app/interfaces/experience/experience_with_id';
import { ExperienceFromFirestore } from '@/app/interfaces/experience/experience_from_firestore';

interface ExperienceState {
    data: Experience[];
    loading: boolean;
    loadedOnce: boolean;
    error: string | null;
};

const initialState: ExperienceState = {
    data: [],
    loading: false,
    loadedOnce: false,
    error: null,
};

export const fetchExperiences = createAsyncThunk('experience/fetchExperiences', async () => {
    const experienceSnapshot = await getDocs(query(collection(db, 'experience'), orderBy('start_date', 'asc')));
    const experienceData: ExperienceWithId[] = experienceSnapshot.docs.map(doc => {
        const { ...rest } = doc.data() as ExperienceFromFirestore;
        return {
            ...rest,
            start_date: rest.start_date.toDate().toISOString(),
            end_date: rest.end_date.toDate().toISOString(),
            experience_id: doc.ref.id
        } as Experience;
    });
    const descriptionSnapshot = await getDocs(collectionGroup(db, 'description'));
    const descriptionData: DescriptionWithParent[] = descriptionSnapshot.docs.map(doc => ({experience_id: doc.ref.parent.parent?.id, ...doc.data() as Description}) );

    const mergedData: Experience[] = experienceData.map(experience => ({
        ...experience,
        description: descriptionData
            .filter(skill => skill.experience_id === experience.experience_id)
            .map(({ experience_id, ...skill }) => skill),
    }));

    return mergedData;
});

const experienceSlice = createSlice({
    name: 'skill_groups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchExperiences.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchExperiences.fulfilled, (state, action: PayloadAction<Experience[]>) => {
            state.loading = false;
            state.loadedOnce = true;
            state.data = action.payload;
        })
        .addCase(fetchExperiences.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch skill groups';
        });
    },
});

export default experienceSlice.reducer;