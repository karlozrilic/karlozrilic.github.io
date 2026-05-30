import { Experience } from './experience';

export type ExperienceHistory = Experience & {
    archived_at: string;
}