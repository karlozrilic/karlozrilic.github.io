import { db } from '@/lib/firebase';
import { PartialBlock } from '@blocknote/core';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import { Experience, ExperienceUpdate } from '@/app/src/types/experience/experience';

export type UpdateFunctionType = {
    jsonBlocks: PartialBlock[];
    content: string;
    markdown: string;
};

export type AddOrUpdate = {
    firebaseCollection: string;
    id: string;
    data: ExperienceUpdate;
    saveHistory?: boolean;
};

export type DeleteHistory = {
    firebaseCollection: string;
    id: string;
    history_id?: string;
};

export const addOrUpdateCollection = async ({ firebaseCollection, id, data, saveHistory = true }: AddOrUpdate) => {
    const docRef = doc(db, firebaseCollection, id);

    const prevSnap = await getDoc(docRef);

    // Save old version (if exists)
    if (prevSnap.exists() && saveHistory) {
        const historyRef = collection(db, firebaseCollection, id, 'history');

        await addDoc(historyRef, {
            ...prevSnap.data(),
            archived_at: serverTimestamp(),
        });
    }

    await setDoc(
        docRef,
        {
            ...data,
            updated: serverTimestamp()
        },
        { merge: true }
    );
};

export const deleteHistory = async ({ firebaseCollection, id, history_id }: DeleteHistory) => {
    const docRef = doc(db, firebaseCollection, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw 'Couldn\'t find document in collection';

    if (history_id) {
        const historyDoc = doc(db, firebaseCollection, id, 'history', history_id);
        await deleteDoc(historyDoc);
    } else {
        const historyCollection = collection(db, firebaseCollection, id, 'history');
        const snapshot = await getDocs(historyCollection);
        const deletions = snapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletions);
    }
};

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
};