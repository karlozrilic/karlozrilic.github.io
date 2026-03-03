import type { Metadata } from 'next';
import './style/globals.css';
import Header from './layout_components/header';
import Footer from './layout_components/footer';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ReduxProvider from './reduxProvider';
import Favicons from './layout_components/favicon';
config.autoAddCss = false;

export const metadata: Metadata = {
    title: 'Frontend & Mobile App Developer | IT Engineer | Karlo Zrilić',
    description: `Passionate Information Technology Engineer and Frontend Developer specializing in clean,
	responsive, and high-performance user interfaces. Experienced with HTML, CSS, JavaScript, React, Angular, Vue, and
	cross-platform mobile development using Flutter and React Native. Creating seamless digital experiences that look great and work everywhere.`
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	return (
		<html lang='en' data-scroll-behavior="smooth" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: "(function () { try { var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)'); var theme = localStorage.getItem('theme'); if (theme === null) { theme = mediaQuery.matches ? 'dark' : 'light'; localStorage.setItem('theme', theme); } document.documentElement.classList.toggle('dark', theme === 'dark'); } catch (e) {} })();",
					}}
				/>
				<Favicons />
			</head>
			<body
				className={`bg-background text-foreground font-sans transition-colors duration-500 antialiased`}
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
