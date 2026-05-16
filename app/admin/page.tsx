'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SidebarTrigger } from "@/app/src/components/ui/sidebar"
import LoadingScreen from '../src/sections/loading';

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
			if (initialized) clearInterval(interval);
		}, 200);

		return () => clearInterval(interval);
	}, []);

	if (loading) return <LoadingScreen />;

	return (
		<>
			<main className='flex min-h-screen justify-center p-2'>
				<div className='relative flex-col items-center justify-between'>
					<div>Welcome {user?.displayName}</div>

					<SidebarTrigger />

					<div ref={editorRef} id='div_editor1'>
						<p>Hello world!</p>
					</div>
				</div>
			</main>
		</>
	);
}