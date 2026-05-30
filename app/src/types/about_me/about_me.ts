import { PartialBlock } from '@blocknote/core';

export type AboutMe ={
    jsonBlocks: PartialBlock[];
    content: string;
    markdown: string;
    updated: string;
}