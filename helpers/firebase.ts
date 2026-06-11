import { db } from '@/lib/firebase';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const email = result.user.email;

    if (!email) {
        throw new Error('No email');
    }

    const allowedEmail = await getDoc(doc(db, 'allowed_users', email))

    if (!allowedEmail.exists()) {
        await result.user.delete();
        await auth.signOut();
        throw new Error('Email not authorized');
    }
}

export async function logout() {
    await signOut(auth);
}