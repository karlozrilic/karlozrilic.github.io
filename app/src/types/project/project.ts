import { PartialBlock } from '@blocknote/core';

export type Project = {
    id: string;
    category: string,
    title: string,
    content: string,
    jsonBlocks: PartialBlock[];
    markdown: string;
    image: string,
    link: string,
    tags: string[]
    updated: string;
}