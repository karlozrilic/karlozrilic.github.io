'use client'

import { fetchAboutMe, fetchAboutMeHistory } from '@/app/src/store/slices/aboutMeSlice';
import { updateAboutMe } from '@/app/src/service/firebase';
import EditorWrapper from '../wrappers/editor_wrapper';

function AboutMeEdit() {
    return <>
        <main className='flex justify-center p-2'>
            <EditorWrapper stateName='aboutMe' updateFunction={updateAboutMe} fetchFunction={fetchAboutMe} fetchHistoryFunction={fetchAboutMeHistory} />
        </main>
    </>
}

export default AboutMeEdit;
//export default withTextEditor(AboutMeEdit);y