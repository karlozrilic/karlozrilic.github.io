'use client';

import { BlockNoteEditor } from '@blocknote/core';
import { PartialBlock } from '@blocknote/core/blocks';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
} from '@blocknote/react';

const CustomFormattingToolbar = () => (
  <FormattingToolbar>
    <BlockTypeSelect key={'blockTypeSelect'} />
    <FileCaptionButton key={'fileCaptionButton'} />
    <FileReplaceButton key={'replaceFileButton'} />
    <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
    <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
    <BasicTextStyleButton
      basicTextStyle={'underline'}
      key={'underlineStyleButton'}
    />
    <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} />
    {/* Extra button to toggle code styles */}
    <BasicTextStyleButton key={'codeStyleButton'} basicTextStyle={'code'} />
    <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
    <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />
    <TextAlignButton textAlignment={'right'} key={'textAlignRightButton'} />
    <ColorStyleButton key={'colorStyleButton'} />
    <NestBlockButton key={'nestBlockButton'} />
    <UnnestBlockButton key={'unnestBlockButton'} />
    <CreateLinkButton key={'createLinkButton'} />
  </FormattingToolbar>
);

interface EditorProps {
    editor: BlockNoteEditor | undefined,
    onChange?: (jsonBlocks: PartialBlock[]) => void,
    editable?: boolean,
}

export default function Editor({ editor, onChange, editable }: Readonly<EditorProps>) {
    if (editor === undefined) {
        return 'Loading content...';
    }

    return (
        <BlockNoteView
            className='w-full'
            editor={editor}
            formattingToolbar={false}
            onChange={(editr) => {
                onChange?.(editr.document);
            }}
            editable={editable}
        >
            <FormattingToolbarController formattingToolbar={CustomFormattingToolbar} />
        </BlockNoteView>
    );
}