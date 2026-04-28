import type { Metadata } from 'next';
import '@/app/style/globals.css';
import Header from '@/app/layout_components/header';
import Footer from '@/app/layout_components/footer';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ReduxProvider from '@/app/reduxProvider';
config.autoAddCss = false;

export const metadata: Metadata = {
    title: 'Frontend & Mobile App Developer | IT Engineer | Karlo Zrilić',
    description: `Passionate Information Technology Engineer and Frontend Developer specializing in clean,
	responsive, and high-performance user interfaces. Experienced with HTML, CSS, JavaScript, React, Angular, Vue, and
	cross-platform mobile development using Flutter and React Native. Creating seamless digital experiences that look great and work everywhere.`,
	icons: {
		icon: [
			{ url: '/favicon/favicon.ico', type: 'image/x-icon', rel: 'icon' },
			{ url: '/favicon/favicon-512x512.png', type: 'image/png', rel: 'icon', sizes: '512x512' },
			{ url: '/favicon/favicon-192x192.png', type: 'image/png', rel: 'icon', sizes: '192x192' },
			{ url: '/favicon/favicon-32x32.png', type: 'image/png', rel: 'icon', sizes: '32x32' },
			{ url: '/favicon/favicon-16x16.png', type: 'image/png', rel: 'icon', sizes: '16x16' }
		],
		shortcut: '/favicon/favicon.ico',
		apple: [
			{ url: '/favicon/apple-touch-icon.png', type: 'image/png', rel: 'apple-touch-icon', sizes: '180x180' },
		]
	}
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	return <div>{children}</div>;
}
