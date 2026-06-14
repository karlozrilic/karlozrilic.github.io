'use client';

import { usePathname } from 'next/navigation';
import Header from './src/layout_components/header';
import { AppSidebar } from '@/app/src/layout_components/app_sidebar';
import { Toaster } from '@/app/src/components/ui/sonner';

export default function LayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

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