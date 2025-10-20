'use client'
import { useEffect } from 'react';

export default function Banana() {
    useEffect(() => {
        // FADE-IN
        const faders = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, {threshold: 0.2});
        faders.forEach(f => observer.observe(f));

        // PARALLAX
        const parallaxEls = document.querySelectorAll<HTMLDivElement>('.parallax-layer');
        window.addEventListener('scroll', onScroll);

        function onScroll() {
            const scrollTop = window.pageYOffset;
            parallaxEls.forEach(element => {
                const speed = Number(element.dataset.speed);
                element.style.top = `${scrollTop * speed}px`;
                element.classList.remove('hidden');
            });
        }
        
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section className='relative py-20 bg-gray-100 dark:bg-gray-800 overflow-hidden fade-in'>
            <h2 className='text-4xl font-bold text-center mb-10'>Banana</h2>
        </section>
    );
}
