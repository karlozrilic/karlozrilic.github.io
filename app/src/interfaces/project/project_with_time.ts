import { Timestamp } from "firebase/firestore";

export type ProjectWithTime = Project & { updated_at?: Timestamp };