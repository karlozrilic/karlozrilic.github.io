import { PartialBlock } from '@blocknote/core/blocks';

export type Experience = {
    id: string;
    job_title: string,
    company_name: string,
    location: string,
    start_date: string,
    end_date: string | null,
    jsonBlocks: PartialBlock[];
    content: string;
    markdown: string;
    updated: string;
}