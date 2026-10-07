'use client'
import { useEffect, useState } from 'react';
import SectionHeading from '@/app/src/components/custom/section_heading';

const EMAIL = 'karlozrilic@gmail.com';

export default function Contact() {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const faders = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '0px 0px -15% 0px',
        });
        faders.forEach(f => observer.observe(f));

        return () => {
            faders.forEach(f => observer.unobserve(f));
        }
    }, []);

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    }

    return (
        <section className='border-t scroll-mt-(--header-height) fade-in' id='contact'>
            <div className='container mx-auto px-6 py-20 md:py-32'>
                <SectionHeading className='text-5xl md:text-7xl'>Let's talk</SectionHeading>
                <p className='mt-5 max-w-xl text-lg text-muted-foreground'>
                    Have a project, a job offer or just a question? Email is the easiest way to reach me.
                </p>

                <div className='relative mt-10 inline-flex flex-wrap items-center gap-x-5 gap-y-3'>
                    <a
                        href={`mailto:${EMAIL}`}
                        className='font-display text-3xl md:text-5xl font-medium underline underline-offset-8 decoration-2 decoration-brand/60 hover:decoration-brand transition-colors break-all'
                    >
                        {EMAIL}
                    </a>
                    <button
                        type='button'
                        onClick={copyEmail}
                        className='rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                        {copied ? 'Copied' : 'Copy'}
                    </button>

                    <div className='hidden lg:flex absolute -right-56 -top-14 flex-col items-start font-hand text-3xl text-foreground/80 rotate-3 pointer-events-none select-none' aria-hidden='true'>
                        <span>can't wait to read it!</span>
                        <svg className='w-14 h-10 ml-6 -scale-x-100' viewBox='0 0 60 40' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M6 4 C 18 6, 34 14, 50 32' />
                            <path d='M41 31 L 51 33 L 50 22' />
                        </svg>
                    </div>
                </div>
                <p className='lg:hidden mt-4 font-hand text-2xl text-foreground/80 -rotate-2' aria-hidden='true'>
                    can't wait to read it!
                </p>

                <div className='mt-12 flex gap-8 text-lg'>
                    <a
                        href='https://www.linkedin.com/in/karlo-zrili%C4%87'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground'
                    >
                        LinkedIn
                    </a>
                    <a
                        href='https://www.instagram.com/karlo.zrilich'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground'
                    >
                        Instagram
                    </a>
                </div>
            </div>
        </section>
    );
}
