import type { Metadata } from 'next';
import './globals.css';
import Header from './layout_components/header';
import Footer from './layout_components/footer';
import { app, analytics } from './utils/firebase';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ReduxProvider from './reduxProvider';
config.autoAddCss = false;

export const metadata: Metadata = {
    title: 'Frontend & Mobile App Developer | IT Engineer | Karlo Zrilić',
    description: `Passionate Information Technology Engineer and Frontend Developer specializing in clean,
	responsive, and high-performance user interfaces. Experienced with HTML, CSS, JavaScript, React, Angular, Vue, and
	cross-platform mobile development using Flutter and React Native. Creating seamless digital experiences that look great and work everywhere.`
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	return (
		<html lang='en' data-scroll-behavior="smooth">
			<link rel="icon" href="/favicon/favicon.ico" sizes="any" />
			<link
				rel="icon"
				href="/favicon/favicon-512x512.png"
				type="image/png"
				sizes="512x512"
			/>
			<link
				rel="icon"
				href="/favicon/favicon-192x192.png"
				type="image/png"
				sizes="192x192"
			/>
			<link
				rel="icon"
				href="/favicon/favicon-32x32.png"
				type="image/png"
				sizes="32x32"
			/>
			<link
				rel="icon"
				href="/favicon/favicon-16x16.png"
				type="image/png"
				sizes="16x16"
			/>
			<link
				rel="apple-touch-icon"
				href="/favicon/apple-touch-icon.png>"
				type="image/png"
				sizes="180x180"
			/>
			<body
				className={`bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans transition-colors duration-500 antialiased`}
			>
				<ReduxProvider>
					<Header />
					{children}
					<Footer />
				</ReduxProvider>
			</body>
		</html>
	);
}
