'use client';

import { loginGoogle } from '@/helpers/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin() {
    await loginGoogle();
    router.push('/admin');
  }

  return (
    <main className='flex min-h-screen justify-center p-2'>
        <div className='relative flex-col items-center justify-between'>
            <h1>Login</h1>
            <button onClick={handleLogin}>
                Sign in with Google
            </button>
        </div>
    </main>
  );
}