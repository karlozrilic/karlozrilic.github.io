'use client'
import { BorderBeam } from '@/app/src/components/ui/border-beam';
import { TypingAnimation } from '@/app/src/components/ui/typing-animation';
import { Button } from '@/app/src/components/ui/button'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useEffect, useMemo } from 'react';
import { useWebHaptics } from 'web-haptics/react';

type Particle = {
    x: number;
    y: number;
    r: number;
    speed: number;
    opacity: number;
};

export default function Hero() {
    const { trigger } = useWebHaptics();
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const words = useMemo(() => [
        'I build websites.',
        'I design apps.',
        'I create experiences.'
    ], [])
    
    // PARTICLES
    useEffect(() => {
        if (canvasRef.current == null) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        if (!ctx) return;

        let animationFrameId: number = 0;
        const particles: Particle[] = [];

        function createParticle(): Particle {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 3 + 1,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.5 + 0.3,
            };
        }

        function getTargetParticleCount() {
            const area = canvas.width * canvas.height;

            // tweak this number to control density
            const density = 1 / 16000;

            return Math.max(20, Math.min(120, Math.round(area * density)));
        }

        function syncParticleCountSmooth() {
            const target = getTargetParticleCount();
            const diff = target - particles.length;

            if (diff > 0) {
                const toAdd = Math.min(diff, 2);
                for (let i = 0; i < toAdd; i++) {
                    particles.push(createParticle());
                }
            } else if (diff < 0) {
                const toRemove = Math.min(Math.abs(diff), 2);
                particles.splice(particles.length - toRemove, toRemove);
            }
        }

        function resize() {
            const oldWidth = canvas.width || window.innerWidth;
            const oldHeight = canvas.height || window.innerHeight;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const scaleX = canvas.width / oldWidth;
            const scaleY = canvas.height / oldHeight;

            particles.forEach(p => {
                p.x *= scaleX;
                p.y *= scaleY;
            });

            syncParticleCountSmooth();
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            syncParticleCountSmooth();

            particles.forEach(p => {
                p.y -= p.speed;

                if (p.y < -p.r) {
                    p.y = canvas.height + p.r;
                    p.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
                ctx.fill();
                ctx.closePath();
            });

            animationFrameId = window.requestAnimationFrame(animateParticles);
        }

        resize();

        while (particles.length < getTargetParticleCount()) {
            particles.push(createParticle());
        }

        animateParticles();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

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
        <section
            className='h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-primary to-secondary relative overflow-hidden'
            id='hero'
        >
            {/* Parallax layers */}
            <div className='w-80 h-80 bg-white opacity-10 rounded-full parallax-layer hidden' data-speed='0.3' data-base-top="-20" style={{top: '-20%', left: '-15%' }}></div>
            <div className='w-60 h-60 bg-white opacity-10 rounded-full parallax-layer hidden' data-speed='0.5' data-base-top="10" style={{top: '10%', right: '-10%' }}></div>
            <div className='w-96 h-96 bg-white opacity-5 rounded-full parallax-layer hidden' data-speed='0.2' data-base-bottom="-20" style={{bottom: '-20%', left: '25%' }}></div>

            {/* Particles */}
            <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full pointer-events-none'></canvas>

            <h1 className='text-6xl md:text-7xl font-extrabold mb-4 fade-in z-1'>Hello, I'm Karlo Zrilić</h1>
            <div className='text-2xl md:text-3xl mb-6 z-1'>
                <TypingAnimation
                    words={words}
                    typeSpeed={100}
                    deleteSpeed={50}
                    pauseDelay={2000}
                    loop
                    startOnView={false}
                />
            </div>
            <Button
                className='relative bg-secondary text-secondary-foreground overflow-hidden font-semibold'
                size='lg'
                variant='secondary'
                onClick={() => {
                    trigger('success');
                    document.querySelector('#contact')?.scrollIntoView();
                }}
            >
                Get in Touch
                <BorderBeam
                    duration={6}
                    size={70}
                    className='from-transparent via-orange-500 to-transparent'
                />
                <BorderBeam
                    duration={6}
                    delay={3}
                    size={70}
                    className='from-transparent via-white to-transparent'
                />
            </Button>

            <div className='flex items-center w-3xs my-4 z-1'>
                <hr className='flex-grow border-t-2 border-border' />
                <span className='mx-4 text-secondary font-semibold'>OR</span>
                <hr className='flex-grow border-t-2 border-border' />
            </div>

            <Button
                className='relative bg-secondary text-secondary-foreground overflow-hidden font-semibold'
                size='lg'
                variant='secondary'
                onClick={() => {
                    window.open('https://drive.google.com/file/d/1k8j3dScW7Juptu2iFUqQzd7BIIdsWLpb/view?usp=sharing', '_blank');
                }}
            >
                <span className='pr-2'>Download my CV</span>
                <FontAwesomeIcon icon={faDownload} />
                <BorderBeam
                    duration={6}
                    size={70}
                    className='from-transparent via-white to-transparent'
                    reverse
                />
                <BorderBeam
                    duration={6}
                    delay={3}
                    size={70}
                    className='from-transparent via-orange-500 to-transparent'
                    reverse
                />
            </Button>

        </section>
    );
}