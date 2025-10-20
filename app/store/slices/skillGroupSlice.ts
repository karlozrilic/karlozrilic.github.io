import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../utils/firebase';
import { collection, collectionGroup, getDocs, orderBy, query } from 'firebase/firestore';
import { SkillGroupWithTime } from '@/app/interfaces/skill/skill_group_with_time';
import { SkillWithTime } from '@/app/interfaces/skill/skill_with_time';

interface SkillGroupState {
    data: SkillGroup[];
    loading: boolean;
    error: string | null;
};

const initialState: SkillGroupState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchSkillGroups = createAsyncThunk('skillGroups/fetchSkillGroups', async () => {
    const skillGroupsnapshot = await getDocs(query(collection(db, 'skill_groups'), orderBy('updated_at', 'asc')));
    const skillGroupsData: SkillGroupWithGroupId[] = skillGroupsnapshot.docs.map(doc => {
        const { updated_at, ...rest } = doc.data() as SkillGroupWithTime;
        return { group_id: doc.ref.id, ...rest } as SkillGroup;
    });
    const skillsSnapshot = await getDocs(collectionGroup(db, 'skills'));
    const skillsData: SkillWithParent[] = skillsSnapshot.docs.map(doc => {
        const { updated_at, ...rest } = doc.data() as SkillWithTime;
        return { group_id: doc.ref.parent.parent?.id, ...rest } as Skill;
    });

    const mergedData: SkillGroup[] = skillGroupsData.map(group => ({
        ...group,
        skills: skillsData
            .filter(skill => skill.group_id === group.group_id)
            .map(({ group_id, ...skill }) => skill),
    }));

    return mergedData;
});

const skillGroupsSlice = createSlice({
    name: 'skill_groups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSkillGroups.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSkillGroups.fulfilled, (state, action: PayloadAction<SkillGroup[]>) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchSkillGroups.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch skill groups';
        });
    },
});

export default skillGroupsSlice.reducer;