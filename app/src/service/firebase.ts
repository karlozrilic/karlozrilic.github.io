import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const updateAboutMe = async (content: string) => {
    const docRef = doc(db, 'about_me', 'main');

     await setDoc(
        docRef,
        { content },
        { merge: true }
    );
}