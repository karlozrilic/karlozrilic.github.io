import type { Metadata } from 'next';
import '@/app/src/style/globals.css';
import Header from '@/app/src/layout_components/header';
import Footer from '@/app/src/layout_components/footer';
import { TooltipProvider } from "@/app/src/components/ui/tooltip"
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ReduxProvider from '@/app/reduxProvider';
import { SidebarProvider } from './src/components/ui/sidebar';
import { AppSidebar } from './src/layout_components/app_sidebar';
import { Toaster } from './src/components/ui/sonner';
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
	return (
		<html lang='en' data-scroll-behavior='smooth' suppressHydrationWarning>
			<head>
				<link rel='stylesheet' href='/richtexteditor/plugins/aitoolkit.css' />
                <link rel='stylesheet' href='/richtexteditor/rte_theme_default.css' />
				<script
					dangerouslySetInnerHTML={{
						__html: `(function () { try { var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)'); var theme = localStorage.getItem('theme'); if (theme === null) { theme = mediaQuery.matches ? 'dark' : 'light'; localStorage.setItem('theme', theme); } document.documentElement.classList.toggle('dark', theme === 'dark'); } catch (e) {} })();`,
					}}
				/>
				<script src='/richtexteditor/rte.js' />
				<script src='/richtexteditor/plugins/all_plugins.js' />
				<script src="/richtexteditor/patch.js"></script>
			</head>
			<body
				className={`bg-background text-foreground font-sans transition-colors duration-500 antialiased`}
			>
				<SidebarProvider
					defaultOpen={false}
					className='flex-col'
				>
					<ReduxProvider>
						<TooltipProvider>
							<Header />
							{children}
							<Footer />
							<AppSidebar />
							<Toaster />
						</TooltipProvider>
					</ReduxProvider>
				</SidebarProvider>
				<script>RTE_DefaultConfig.url_base='/richtexteditor'</script>
			</body>
		</html>
	);
}
