import { db } from '@/lib/firebase';
import { PartialBlock } from '@blocknote/core';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

export const updateAboutMe = async (jsonBlocks: PartialBlock[], content: string, markdown: string) => {
    const docRef = doc(db, 'about_me', 'main');

    const prevSnap = await getDoc(docRef);

    // Save old version (if exists)
    if (prevSnap.exists()) {
        const historyRef = collection(db, 'about_me', 'main', 'history');

        await addDoc(historyRef, {
            ...prevSnap.data(),
            archivedAt: serverTimestamp(),
        });
    }

    await setDoc(
        docRef,
        {
            jsonBlocks,
            content,
            markdown,
            updated: serverTimestamp()
        },
        { merge: true }
    );
}