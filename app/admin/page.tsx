'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='relative'>
            <div>Welcome {user?.displayName}</div>
        </div>
    </main>
  );
}