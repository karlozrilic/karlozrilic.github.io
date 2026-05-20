'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { fetchAboutMe } from '@/app/src/store/slices/aboutMeSlice';
import LoadingComponent from '@/app/src/layout_components/loading';

export default function AboutMe() {
    const dispatch = useDispatch<AppDispatch>();
    const aboutMe = useSelector((state: RootState) => state.aboutMe);

    const [aboutMeData, setAboutMeData] = useState<string>('');

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchAboutMe());
    }, [dispatch]);

    useEffect(() => {
        if (aboutMe.data.length) {
            setAboutMeData(aboutMe.data[0].content);
        }
    }, [aboutMe]);

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
        <>
            { aboutMeData ? null : <LoadingComponent /> }
            <span id='about'></span>
            <section className='container mx-auto py-10 md:py-20 fade-in px-1' id='about'>
                <h2 className='text-4xl font-bold text-center mb-10'>About Me</h2>
                <div className='md:flex md:items-center md:space-x-10'>
                    <img
                        src='/images/portfolio_picture.jpeg'
                        alt='Your Photo'
                        className='rounded-lg mb-6 md:mb-0 md:w-1/3 border-4 border-primary'
                    />
                    <div className='md:w-2/3 md:m-auto mx-[20px] text-lg leading-relaxed space-y-4' dangerouslySetInnerHTML={{ __html: aboutMeData }}></div>
                    {/**
                        I'm an Information Technology Engineer who enjoys building clean, responsive, and easy-to-use interfaces. I like turning ideas into simple, functional digital experiences that work smoothly across devices and feel natural to use.

                        I work with modern frontend frameworks, build cross-platform mobile apps with Flutter and React Native, and handle backend basics with PHP, SQL, and Java. I usually end up connecting everything together APIs, databases, frontend logic. Just making sure it all runs properly and makes sense as a whole.

                        I've worked with UI/UX designers, developers, and stakeholders, so I'm used to taking vague ideas like "make it more engaging" and shaping them into something real and usable. Debugging and polishing details is a big part of my workflow, especially using browser dev tools and performance checks.

                        Before this, I worked as a Sales Advisor at Hrvatski Telekom, which taught me how to explain technical things in a simple, human way. I also spent time in logistics, which helped me get more organized and structured in how I work.

                        Outside of development, I'm into photography, video shooting, and music production. Mostly creative stuff that keeps me inspired outside of code.

                        Overall, I just enjoy building useful things that feel good to use and are easy to understand.
                    */}
                </div>
            </section>
        </>
    );
}