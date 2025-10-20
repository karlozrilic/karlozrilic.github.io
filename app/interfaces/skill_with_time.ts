import { Timestamp } from "firebase/firestore";

export type SkillWithTime = Skill & { updated_at?: Timestamp };