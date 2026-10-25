import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

if (typeof window !== 'undefined') {
    // shortcut: App Check only starts on a full load of an /admin page, fine while enforcement is off; init it on every admin visit if you ever enforce it
    if (window.location.pathname.startsWith('/admin')) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (!siteKey) {
            throw new Error('Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable');
        }
        import('firebase/app-check').then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
            initializeAppCheck(app, {
                provider: new ReCaptchaV3Provider(siteKey),
                isTokenAutoRefreshEnabled: true,
            });
        });
    }

    // analytics waits until the page is done so it stays off the loading path
    const startAnalytics = () => setTimeout(() => {
        import('firebase/analytics').then(({ getAnalytics }) => getAnalytics(app));
    }, 2000);
    if (document.readyState === 'complete') startAnalytics();
    else window.addEventListener('load', startAnalytics, { once: true });
}

const auth = getAuth(app)
const db = getFirestore(app);

export {
    app,
    auth,
    db
}