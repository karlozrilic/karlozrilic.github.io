import { PartialBlock } from '@blocknote/core';

export type AboutMe = {
    id: string;
    jsonBlocks: PartialBlock[];
    content: string;
    markdown: string;
    updated: string;
}