import { Timestamp } from "firebase/firestore";

export type SkillGroupWithTime = SkillGroup & { updated_at?: Timestamp };