'use client'
import { useEffect } from 'react';
import Hero from './components/hero';
import AboutMe from './components/about_me';
import Skills from './components/skills';
import Projects from './components/projects';
import Contact from './components/contact';
import Experience from './components/experience';

export default function Home() {
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
        <>
            <Hero />
            <AboutMe />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
        </>
    );
}
