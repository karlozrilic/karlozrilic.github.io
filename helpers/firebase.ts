import { db } from '@/lib/firebase';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, getRedirectResult, signInWithPopup, signInWithRedirect, signOut, UserCredential } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

async function authorizeOrReject(result: UserCredential) {
    const email = result.user.email;

    if (!email) {
        throw new Error('No email');
    }

    const allowedEmail = await getDoc(doc(db, 'allowed_users', email));

    if (!allowedEmail.exists()) {
        await result.user.delete();
        await auth.signOut();
        throw new Error('Email not authorized');
    }
}

export async function loginGoogle(popup = true) {
    const provider = new GoogleAuthProvider();

    if (popup) {
        await authorizeOrReject(await signInWithPopup(auth, provider));
        return;
    }

    // Navigates away immediately - there's no result to await here. It's
    // picked up by completeRedirectLogin() on the page load that follows.
    await signInWithRedirect(auth, provider);
}

// Call once on app load. Resolves to null on a normal load; resolves with
// the sign-in result on the load that follows a signInWithRedirect() round
// trip, which is the only place that result is ever available.
export async function completeRedirectLogin() {
    const result = await getRedirectResult(auth);
    if (!result) return;
    await authorizeOrReject(result);
}

export async function logout() {
    await signOut(auth);
}