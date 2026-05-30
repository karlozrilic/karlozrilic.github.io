import { PartialBlock } from '@blocknote/core';

export interface Project {
    id: string;
    category: string,
    title: string,
    subtitle: string,
    content: string,
    jsonBlocks: PartialBlock[];
    markdown: string;
    image: string,
    small_image: string,
    link: string,
    tags: string[]
    updated: string;
}