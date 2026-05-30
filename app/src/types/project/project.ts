import { PartialBlock } from '@blocknote/core';

export interface Project {
    category: string,
    title: string,
    subtitle: string,
    content: string, // TODO change to string of html
    jsonBlocks: PartialBlock[];
    markdown: string;
    image: string,
    small_image: string,
    link: string,
    tags: string[]
    updated: string;
}