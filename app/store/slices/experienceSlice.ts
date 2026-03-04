import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../utils/firebase';
import { collection, collectionGroup, getDocs, orderBy, query, where } from 'firebase/firestore';
import { ExperienceWithId } from '@/app/interfaces/experience/experience_with_id';
import { ExperienceFromFirestore } from '@/app/interfaces/experience/experience_from_firestore';
import { FirebaseError } from 'firebase/app';

interface ExperienceState {
    data: Experience[];
    loading: boolean;
    loaded: boolean;
    error: string | null;
};

const initialState: ExperienceState = {
    data: [],
    loading: false,
    loaded: false,
    error: null,
};

export const fetchExperiences = createAsyncThunk('experience/fetchExperiences', async () => {
    let mergedData: Experience[] = [];

    try {
        const experiencesSnapshot = await getDocs(
            query(
                collection(db, 'experience'),
                where('show', '!=', false),
                orderBy('show'),
                orderBy('start_date', 'desc')
            )
        );
        const experiencesData: ExperienceWithId[] = experiencesSnapshot.docs.map(doc => {
            const { ...rest } = doc.data() as ExperienceFromFirestore;
            return {
                ...rest,
                start_date: rest.start_date.toDate().toISOString(),
                end_date: rest.end_date ? rest.end_date.toDate().toISOString() : null,
                experience_id: doc.ref.id
            } as Experience;
        });
        const descriptionSnapshot = await getDocs(collectionGroup(db, 'description'));
        const descriptionData: DescriptionWithParent[] = descriptionSnapshot.docs.map(doc => ({experience_id: doc.ref.parent.parent?.id, ...doc.data() as Description}) );

        mergedData = experiencesData.map(experience => ({
            ...experience,
            description: descriptionData
                .filter(skill => skill.experience_id === experience.experience_id)
                .map(({ experience_id, ...skill }) => skill),
        }));
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
            state.loaded = true;
            state.data = action.payload;
        })
        .addCase(fetchExperiences.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch experience';
        });
    },
});

export default experienceSlice.reducer;