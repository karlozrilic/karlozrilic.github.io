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
			router.push('/login');
		}
		setLoaded(!loading);
	}, [user, loading]);

	return (
		<>
			{
				!loaded ? <LoadingScreen /> : null
			}
			<main className='flex justify-center p-2'>
				<div className='relative max-w-5xl flex flex-col items-center'>
					<div>Welcome {user?.displayName}</div>

					<Link href='/admin/portfolio'>Portfolio</Link>
				</div>
			</main>
		</>
	);
}
