'use client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/src/store/store';
import SectionHeading from '@/app/src/components/custom/section_heading';

export default function AboutMe() {
    const aboutMe = useSelector((state: RootState) => state.aboutMe);

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

    return (
        <section className='border-t scroll-mt-(--header-height) fade-in' id='about'>
            <div className='container mx-auto px-6 py-16 md:py-28 grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16'>
                <div>
                    <SectionHeading className='md:sticky md:top-[calc(var(--header-height,68px)+2rem)]'>About me</SectionHeading>
                </div>
                <div
                    className='max-w-2xl text-lg leading-relaxed text-foreground/85 space-y-5'
                    dangerouslySetInnerHTML={{ __html: aboutMe.data?.content ?? '' }}
                ></div>
            </div>
        </section>
    );
}
