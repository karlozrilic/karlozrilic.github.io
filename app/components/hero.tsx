'use client'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useEffect, useState } from 'react';

export default function Hero() {
    const phrases = ['I build websites.', 'I design apps.', 'I create experiences.'];
    const typingRef = useRef<HTMLSpanElement>(null);
    const [idle, setIdle] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typingRef.current == null) return;
        // TYPING EFFECT
        let i = 0, j = 0;
        const typingEl = typingRef.current;
        function type() {
            setIdle(false);
            if(j < phrases[i].length) {
                typingEl.textContent += phrases[i][j];
                j++;
                setTimeout(type, 100);
            } else {
                setIdle(true);
                setTimeout(erase, 2000);
            }
        }
        function erase() {
            setIdle(false);
            if(j > 0) {
                typingEl.textContent = phrases[i].substring(0, j - 1);
                j--;
                setTimeout(erase, 50);
            } else {
                i = (i + 1) % phrases.length;
                setIdle(true);
                setTimeout(type, 500);
            }
        }
        type();
    }, []);

    useEffect(() => {
        if (canvasRef.current == null) return;
        // PARTICLES
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        let animationFrameId: number;
        const particles: Array<{x: number, y: number, r: number, speed: number}> = [];

        resize();

        for (let p = 0; p < 50; p++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 3 + 1,
                speed: Math.random() * 0.5 + 0.2
            });
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.y -= p.speed;
                if(p.y < 0) {
                    p.y = canvas.height;
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
                ctx.closePath();
            });
            animationFrameId = window.requestAnimationFrame(animateParticles);
        }

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        animateParticles();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section
            className='h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-primary to-secondary text-white relative overflow-hidden'
            id='hero'
        >
            <h1 className='text-6xl md:text-7xl font-extrabold mb-4 fade-in z-1'>Hello, I'm Karlo Zrilić</h1>
            <p className='text-2xl md:text-3xl mb-6 fade-in delay-300 z-1'>
                <span ref={typingRef} className={`typing ${idle ? 'idle' : ''}`}></span>
            </p>
            <a
                href='#contact'
                className='px-6 py-3 bg-white text-primary font-semibold rounded shadow hover:shadow-lg hover:scale-105 transition transform z-1'
            >
                Get in Touch
            </a>

            <div className="flex items-center w-3xs my-4">
                <hr className="flex-grow border-t border-gray-300 dark:" />
                <span className="mx-4 text-white font-semibold">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>

            <a
                href='https://drive.google.com/file/d/1k8j3dScW7Juptu2iFUqQzd7BIIdsWLpb/view?usp=sharing' target='_blank'
                className='px-6 py-3 bg-white text-primary font-semibold rounded shadow hover:shadow-lg hover:scale-105 transition transform z-1'
            >
                <span className='pr-2'>Download my CV</span>
                <FontAwesomeIcon icon={faDownload} />
            </a>

            {/* Parallax layers */}
            <div className='w-80 h-80 bg-white opacity-10 rounded-full parallax-layer hidden' data-speed='0.3' style={{top: '-20%', left: '-15%' }}></div>
            <div className='w-60 h-60 bg-white opacity-10 rounded-full parallax-layer hidden' data-speed='0.5' style={{top: '10%', right: '-10%' }}></div>
            <div className='w-96 h-96 bg-white opacity-5 rounded-full parallax-layer hidden' data-speed='0.2' style={{bottom: '-20%', left: '25%' }}></div>

            {/* Particles */}
            <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full pointer-events-none'></canvas>
        </section>
    );
}