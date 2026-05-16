'use client'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export default function Contact() {
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
            <span id='contact'></span>
            <section className='container mx-auto py-10 md:py-20 fade-in' id='contact'>
                <h2 className='text-4xl font-bold text-center mb-10'>Contact Me</h2>
                <div className='flex justify-center content-center'>
                    <a href='mailto:karlozrilic@gmail.com' className='flex flex-wrap content-center'>
                        <FontAwesomeIcon icon={faEnvelope} size='2x' />
                    </a>
                    <a href='https://www.linkedin.com/in/karlo-zrili%C4%87' target='_blank' className='flex flex-wrap content-center'>
                        <FontAwesomeIcon icon={faLinkedin} size='2x' />
                    </a>
                    <a href='https://www.instagram.com/karlo.zrilich' target='_blank' className='flex flex-wrap content-center'>
                        <FontAwesomeIcon icon={faInstagram} size='2x' />
                    </a>
                </div>
            </section>
        </>
    );
}