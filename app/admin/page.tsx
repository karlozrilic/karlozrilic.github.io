'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LoadingScreen from '@/app/src/sections/loading';
import Link from 'next/link';

export default function Dashboard() {
	const editorRef = useRef<HTMLDivElement>(null);
	const { user, loading } = useAuth();
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loading && !user) {
			setLoaded(true);
			//router.push('/login');
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

		const initialized = tryInit();
		setLoaded(initialized);
	}, []);

	return (
		<>
			{
				!loaded ? <LoadingScreen /> : null
			}
			<main className='flex min-h-screen justify-center p-2'>
				<div className='relative max-w-5xl flex flex-col items-center'>
					<div>Welcome {user?.displayName}</div>

					<Link href='/admin/portfolio'>Portfolio</Link>

					<div ref={editorRef} id='div_editor1'>
						<p>Hello world!</p>
					</div>
				</div>
			</main>
		</>
	);
}
