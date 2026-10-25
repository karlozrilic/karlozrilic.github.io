import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase_app';


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
}

const auth = getAuth(app)
const db = getFirestore(app);

export {
    app,
    auth,
    db
}