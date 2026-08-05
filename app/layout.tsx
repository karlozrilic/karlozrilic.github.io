import type { Metadata } from 'next';
import '@/app/src/style/globals.css';
import { TooltipProvider } from "@/app/src/components/ui/tooltip"
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ReduxProvider from '@/app/reduxProvider';
import { SidebarProvider } from '@/app/src/components/ui/sidebar';
import GlobalDataLoader from '@/app/global_data_loader';
import LayoutContent from '@/app/layout_content';
import Script from 'next/script';
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

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
	return (
		<html lang='en' data-scroll-behavior='smooth' suppressHydrationWarning>
			<head>
				<Script src='./sw-register.js' strategy='beforeInteractive' />
				<script
					dangerouslySetInnerHTML={{
						__html: `(function () { try { var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)'); var theme = localStorage.getItem('theme'); if (theme === null) { theme = mediaQuery.matches ? 'dark' : 'light'; localStorage.setItem('theme', theme); } document.documentElement.classList.toggle('dark', theme === 'dark'); } catch (e) {} })();`,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function () {
								const hash = window.location.hash;
								if (!hash) return;
								// Save it for later
								window.__pendingHash = hash;
								// Remove hash without triggering navigation
								window.history.replaceState(
									null,
									'',
									window.location.pathname + window.location.search
								);
							})();
						`
					}}
				/>
			</head>
			<body
				className={`bg-background text-foreground font-sans transition-colors duration-500 antialiased`}
			>
				<SidebarProvider
					defaultOpen={false}
					className='flex-col'
				>
					<ReduxProvider>
						<GlobalDataLoader />
						<TooltipProvider>
							<LayoutContent>
								{children}
							</LayoutContent>
						</TooltipProvider>
					</ReduxProvider>
				</SidebarProvider>
			</body>
		</html>
	);
}
