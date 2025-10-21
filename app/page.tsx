'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchSkillGroups } from './store/slices/skillGroupSlice';
import { fetchProjects } from './store/slices/projectsSlice';
import { fetchExperiences } from './store/slices/experienceSlice';
import Hero from './components/hero';
import AboutMe from './components/about_me';
import Skills from './components/skills';
import Projects from './components/projects';
import Contact from './components/contact';
import Experience from './components/experience';
import LoadingScreen from './components/loading';

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const skillGroups = useSelector((state: RootState) => state.skillGroups);
    const projects = useSelector((state: RootState) => state.projects);
    const experiences = useSelector((state: RootState) => state.experiences);
    const [loading, setLoading] = useState(false);
    const [loadedOnce, setLoadedOnce] = useState(experiences.loadedOnce || false);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchSkillGroups());
        dispatch(fetchProjects());
        dispatch(fetchExperiences());
    }, [dispatch]);

    useEffect(() => {
        setLoading(skillGroups.loading && projects.loading && experiences.loading);
        setLoadedOnce(skillGroups.loadedOnce && projects.loadedOnce && experiences.loadedOnce)
    }, [skillGroups.loadedOnce, projects.loadedOnce, experiences.loadedOnce]);

    useEffect(() => {
        setLoading(skillGroups.loading && projects.loading && experiences.loading);
    }, [skillGroups.loading, projects.loading, experiences.loading]);

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
            {loading && !loadedOnce && (
                <LoadingScreen />
            )}
            <Hero />
            <AboutMe />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
        </>
    );
}
