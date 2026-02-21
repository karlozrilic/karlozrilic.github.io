import type { Metadata } from 'next';
import '../style/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata: Metadata = {
    title: 'Banana | Karlo Zrilić',
    description: 'Its a banana, nothing more, nothing less'
};

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
	return (
		<>
			{children}
		</>		
	);
}
