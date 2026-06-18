import { PartialBlock } from '@blocknote/core';

export type AboutMe = {
    id: string;
    first_name: string;
    last_name: string;
    job_title: string;
    email: string;
    phone: string;
    socials: {
        linkedIn: Social;
    };
    jsonBlocks: PartialBlock[];
    content: string;
    markdown: string;
    updated: string;
}

type Social = {
    text: string;
    link: string;
}