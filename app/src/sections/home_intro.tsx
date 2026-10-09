'use client'
import { useEffect, useRef, useState } from 'react';
import Polaroid from '@/app/src/components/custom/polaroid';

const captions = ['developing...', 'shaking it a bit', 'almost there'];
const MIN_MS = 2000;
const FLY_MS = 900;
const EASE = 'cubic-bezier(.65, 0, .35, 1)';

export default function HomeIntro({ ready, onDone }: { ready: boolean, onDone: () => void }) {
    const boxRef = useRef<HTMLDivElement>(null);
    const startedRef = useRef(false);
    const [step, setStep] = useState(0);
    const [minPassed, setMinPassed] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [flying, setFlying] = useState(false);
    const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({
        left: '50%',
        top: '50%',
        width: 'min(70vw, 300px)',
        translate: '-50% -50%',
    });

    useEffect(() => {
        document.documentElement.classList.add('intro-running');
        const minTimer = setTimeout(() => setMinPassed(true), MIN_MS);
        const captionTimer = setInterval(() => setStep(s => (s + 1) % captions.length), 1400);
        return () => {
            clearTimeout(minTimer);
            clearInterval(captionTimer);
            document.documentElement.classList.remove('intro-running');
        };
    }, []);

    useEffect(() => {
        if (!ready || !minPassed || startedRef.current) return;
        startedRef.current = true;
        setLeaving(true);

        const box = boxRef.current;
        const target = document.querySelector<HTMLElement>('.hero-polaroid')?.parentElement;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const pendingHash = (window as { __pendingHash?: string }).__pendingHash;

        // the page is going to scroll somewhere else, so there's nowhere to land
        if (!box || !target || reduceMotion || pendingHash || window.scrollY > 0) {
            // show the real photo now so it's already there while the cover fades
            document.documentElement.classList.remove('intro-running');
            const timer = setTimeout(onDone, reduceMotion ? 0 : FLY_MS);
            return () => clearTimeout(timer);
        }

        // switch from the centered % values to px, otherwise there's nothing to animate from
        const from = box.getBoundingClientRect();
        setBoxStyle({ left: from.left, top: from.top, width: from.width, translate: '0 0' });

        let frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => {
                const to = target.getBoundingClientRect();
                setFlying(true);
                setBoxStyle({
                    left: to.left,
                    top: to.top,
                    width: to.width,
                    translate: '0 0',
                    transition: `left ${FLY_MS}ms ${EASE}, top ${FLY_MS}ms ${EASE}, width ${FLY_MS}ms ${EASE}`,
                });
            });
        });
        const timer = setTimeout(onDone, FLY_MS + 50);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(timer);
        };
    }, [ready, minPassed, onDone]);

    const shaking = !leaving && step === 1;

    return (
        <>
            <div
                className='fixed inset-0 z-50 bg-background transition-opacity'
                style={{ opacity: leaving ? 0 : 1, transitionDuration: `${FLY_MS}ms` }}
                role='status'
                aria-live='polite'
            >
                <span className='sr-only'>Loading</span>
            </div>
            <div
                ref={boxRef}
                className={`fixed z-51 transition-opacity duration-500 ${leaving && !flying ? 'opacity-0' : ''}`}
                style={boxStyle}
                aria-hidden='true'
            >
                <Polaroid
                    caption={flying ? 'Šibenik, Croatia' : captions[step]}
                    className={`loading-polaroid w-full transition-[rotate] ${flying ? 'rotate-3' : '-rotate-3'} ${shaking ? 'is-shaking' : ''}`}
                    style={{ transitionDuration: `${FLY_MS}ms` }}
                    imgClassName='loading-develop'
                />
            </div>
        </>
    );
}
