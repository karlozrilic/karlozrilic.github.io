'use client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/src/store/store';
import { useAuth } from '@/hooks/useAuth';
import Hero from '@/app/src/sections/hero';
import AboutMe from '@/app/src/sections/about_me';
import Projects from '@/app/src/sections/projects';
import Contact from '@/app/src/sections/contact';
import Experience from '@/app/src/sections/experience';
import LoadingScreen from '@/app/src/sections/loading';
import Technologies from '@/app/src/sections/technologies';
import Footer from '@/app/src/layout_components/footer';
import VisitorGlobe from '@/app/src/sections/globe';

export default function Home() {
    const aboutMe = useSelector((state: RootState) => state.aboutMe);
    const technologies = useSelector((state: RootState) => state.technologies);
    const projects = useSelector((state: RootState) => state.projects);
    const experiences = useSelector((state: RootState) => state.experiences);
    const [loaded, setLoaded] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        setLoaded(aboutMe.loaded && technologies.loaded && projects.loaded && experiences.loaded);
    }, [aboutMe.loaded, technologies.loaded, projects.loaded, experiences.loaded]);

    useEffect(() => {
        // PARALLAX
        const parallaxEls = document.querySelectorAll<HTMLDivElement>('.parallax-layer');
        window.addEventListener('scroll', onScroll);

        function onScroll() {
            const scrollTop = window.pageYOffset;
            parallaxEls.forEach(element => {
                const speed = Number(element.dataset.speed);
                const baseTop = element.dataset.baseTop;
                const baseBottom = element.dataset.baseBottom;
                const offset = scrollTop * speed * 0.9;

                if (baseTop !== undefined) {
                    element.style.top = `calc(${baseTop}% + ${offset}px)`;
                }

                if (baseBottom !== undefined) {
                    element.style.bottom = `calc(${baseBottom}% - ${offset}px)`;
                }

                element.classList.remove('hidden');
            });
        }
        
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    return (
        <>
            <main className='w-full'>
                {!loaded && <LoadingScreen />}
                <Hero />
                {user && <VisitorGlobe />}
                <AboutMe />
                <Experience />
                <Technologies />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
