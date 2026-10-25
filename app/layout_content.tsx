'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Header from './src/layout_components/header';
import { AppSidebar } from '@/app/src/layout_components/app_sidebar';
import { Toaster } from '@/app/src/components/ui/sonner';

export default function LayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // analytics waits until the page is done so it stays off the loading path
    useEffect(() => {
        const start = () => setTimeout(() => {
            Promise.all([import('@/lib/firebase_app'), import('firebase/analytics')])
                .then(([{ app }, { getAnalytics }]) => getAnalytics(app));
        }, 2000);
        if (document.readyState === 'complete') start();
        else window.addEventListener('load', start, { once: true });
    }, []);

    const standalone = pathname.startsWith('/preview');

    if (standalone) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            {children}
            <AppSidebar />
            <Toaster position='top-center' />
        </>
    );
}