import { Timestamp } from "firebase/firestore";

export interface ExperienceFromFirestore {
    job_title: string;
    company_name: string;
    location: string;
    start_date: Timestamp;
    end_date: Timestamp;
    description: Description[];
}