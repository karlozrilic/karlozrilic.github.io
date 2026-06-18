import { PartialBlock } from '@blocknote/core/blocks';
import { Timestamp } from 'firebase/firestore';

export type Experience = {
    id: string;
    job_title: string,
    company_name: string,
    city: string;
    country: string;
    work_model: string;
    start_date: string,
    end_date: string | null,
    jsonBlocks: PartialBlock[];
    content: string;
    markdown: string;
    updated: string;
    show: boolean;
}

export type ExperienceUpdate = {
    id?: string;
    job_title?: string,
    company_name?: string,
    city?: string;
    country?: string;
    work_model?: string;
    start_date?: Timestamp,
    end_date?: Timestamp | null,
    jsonBlocks?: PartialBlock[];
    content?: string;
    markdown?: string;
    updated?: Timestamp;
    show?: boolean;
}