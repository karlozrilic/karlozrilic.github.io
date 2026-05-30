import { PartialBlock } from '@blocknote/core/blocks';

export type Experience = {
    job_title: string,
    company_name: string,
    location: string,
    start_date: string,
    end_date: string | null,
    jsonBlocks: PartialBlock[];
    content: Description[]; // TODO change to string of html
    markdown: string;
    updated: string;
    experience_id: string;
}