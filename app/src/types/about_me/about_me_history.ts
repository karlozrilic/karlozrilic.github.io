import { AboutMe } from './about_me';

export type AboutMeHistory = AboutMe & {
    archived_at: string;
}