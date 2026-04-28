'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import LoadingScreen from '../sections/loading';

export default function Dashboard() {
	const editorRef = useRef<HTMLDivElement>(null);
	const { user, loading } = useAuth();
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loading && !user) {
			setLoaded(true);
			router.push('/login');
		}
	}, [user, loading]);

	useEffect(() => {
		const tryInit = () => {
			const RichTextEditor = (window as any).RichTextEditor;

			if (!RichTextEditor || !editorRef.current) return false;

			new RichTextEditor('#div_editor1', {
				toolbar: 'default',
			});

			return true;
		};

		const interval = setInterval(() => {
			const initialized = tryInit();
			setLoaded(initialized);
			console.log(initialized)
			if (initialized) clearInterval(interval);
		}, 200);

		return () => clearInterval(interval);
	}, []);

	if (loading) return <LoadingScreen />;

	return (
		<>
			<main className='flex min-h-screen flex-col items-center justify-between p-24'>
				<div className='relative'>
					<div>Welcome {user?.displayName}</div>

					<div ref={editorRef} id='div_editor1'>
						<p>Hello world!</p>
					</div>
				</div>
			</main>
		</>
	);
}