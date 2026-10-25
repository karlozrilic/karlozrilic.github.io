'use client';

import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

// set while an admin is signed in on this browser, so visitors never load Firebase Auth
export const ADMIN_FLAG = 'admin-session';

type AuthState = { user: User | null; loading: boolean };

let state: AuthState = { user: null, loading: true };
let started = false;
const listeners = new Set<(state: AuthState) => void>();

function setState(next: AuthState) {
    state = next;
    listeners.forEach(listener => listener(state));
}

export function startAuth() {
    if (started) return;
    started = true;

    Promise.all([import('@/lib/firebase'), import('firebase/auth'), import('@/helpers/firebase')])
        .then(([{ auth }, { onAuthStateChanged }, { completeRedirectLogin }]) => {
            completeRedirectLogin().catch((error) => console.error(error));
            onAuthStateChanged(auth, (user) => {
                try {
                    if (user) localStorage.setItem(ADMIN_FLAG, '1');
                    else localStorage.removeItem(ADMIN_FLAG);
                } catch {}
                setState({ user, loading: false });
            });
        })
        .catch((error) => {
            console.error(error);
            setState({ user: null, loading: false });
        });
}

export function useAuth() {
    const [current, setCurrent] = useState(state);

    useEffect(() => {
        listeners.add(setCurrent);
        setCurrent(state);

        let wanted = window.location.pathname.startsWith('/admin');
        try {
            wanted ||= localStorage.getItem(ADMIN_FLAG) !== null;
        } catch {}

        if (wanted) startAuth();
        else if (!started) setState({ user: null, loading: false });

        return () => {
            listeners.delete(setCurrent);
        };
    }, []);

    return current;
}
