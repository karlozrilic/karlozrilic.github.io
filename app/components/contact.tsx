'use client'
import { FormEvent, useState } from "react";

export default function Contact() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
    
        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                body: formData,
            });
        
            const data = await response.json();
        } catch (error: any) {
            setError(error.message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
        
    }

    return (
        <>
            <span id='contact'></span>
            <section className='container mx-auto py-20 fade-in' id='contact'>
                <h2 className='text-4xl font-bold text-center mb-10'>Contact Me</h2>
                <form className='max-w-xl mx-auto bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg space-y-6' onSubmit={onSubmit}>
                    <input
                        type='text'
                        placeholder='Your Name'
                        className='w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary'
                        required
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        className='w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary'
                        required
                    />
                    <textarea
                        placeholder='Message'
                        className='w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary'
                        rows={5}
                        required
                    ></textarea>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button
                        type='submit'
                        className='px-6 py-3 bg-primary text-white font-semibold rounded shadow hover:bg-secondary transition'
                        disabled={isLoading}
                    >{isLoading ? 'Loading...' : 'Send Message'}</button>
                </form>
            </section>
        </>
    );
}