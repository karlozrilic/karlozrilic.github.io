import { db } from '@/lib/firebase';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

export const updateAboutMe = async (content: string) => {
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
            content,
            updated: serverTimestamp()
        },
        { merge: true }
    );
}