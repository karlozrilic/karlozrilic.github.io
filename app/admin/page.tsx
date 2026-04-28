'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

export default function Dashboard() {
	const editorRef = useRef<HTMLDivElement>(null);
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push('/login');
		}
	}, [user, loading]);

	useEffect(() => {
		const tryInit = () => {
			const RichTextEditor = (window as any).RichTextEditor;

			if (!RichTextEditor || !editorRef.current) return false;
			console.log('here')

			new RichTextEditor('#div_editor1', {
				toolbar: 'default',
			});

			return true;
		};

		const interval = setInterval(() => {
			if (tryInit()) clearInterval(interval);
		}, 200);

		return () => clearInterval(interval);
	}, []);

	if (loading) return <p>Loading...</p>;

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