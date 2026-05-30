import { db } from '@/lib/firebase';
import { PartialBlock } from '@blocknote/core';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

export type UpdateFunctionType = {
    jsonBlocks: PartialBlock[];
    content: string;
    markdown: string;
};

export type UpdateFunctionTypeWithId = {
    firebaseCollection: string;
    id: string;
    jsonBlocks: PartialBlock[];
    content: string;
    markdown: string;
};

export const updateCollection = async ({ firebaseCollection, id, jsonBlocks, content, markdown }: UpdateFunctionTypeWithId) => {
    const docRef = doc(db, firebaseCollection, id);

    const prevSnap = await getDoc(docRef);

    // Save old version (if exists)
    if (prevSnap.exists()) {
        const historyRef = collection(db, firebaseCollection, id, 'history');

        await addDoc(historyRef, {
            ...prevSnap.data(),
            archived_at: serverTimestamp(),
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