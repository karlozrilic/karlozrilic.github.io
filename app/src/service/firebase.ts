import { db } from '@/lib/firebase';
import { PartialBlock } from '@blocknote/core';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import { Experience } from '@/app/src/types/experience/experience';

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

export const getExperience = async (id: string) => {
    const experienceSnapshot = await getDoc(
        doc(db, 'experience', id)
    );
    if (!experienceSnapshot.exists()) {
        return null;
    }
     const data = experienceSnapshot.data() as
        Omit<Experience, 'start_date'> & 
        Omit<Experience, 'end_date'> & 
        Omit<Experience, 'updated'> & 
        {
            start_date: Timestamp;
            end_date: Timestamp;
            updated: Timestamp;
        };

    return {
        ...data,
        start_date: data.start_date.toDate().toISOString(),
        end_date: data.end_date?.toDate().toISOString() ?? null,
        updated: data.updated.toDate().toISOString(),
        id: experienceSnapshot.id
    } as Experience;
}