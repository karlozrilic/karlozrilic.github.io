import { useEffect } from 'react';
import { Marquee } from '@/app/src/components/ui/marquee'; 
import Technology from '@/app/src/components/custom/technology';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/src/store/store';

export default function Technologies() {
    const technologies = useSelector((state: RootState) => state.technologies);

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

    const firstRow = technologies.data.filter(technology => technology.row == 0).sort((a, b) => a.order - b.order);
    const secondRow = technologies.data.filter(technology => technology.row == 1).sort((a, b) => a.order - b.order);
        
    return (
        <>
            <span id='technologies'></span>
            <section className='relative py-10 md:py-20 overflow-hidden fade-in'>
                <h2 className='text-4xl font-bold text-center mb-12'>Technologies</h2>

                <div className='relative flex w-full flex-col items-center justify-center overflow-hidden'>
                    <Marquee pauseOnHover className='[--duration:30s]'>
                        {firstRow.map((technology) => (
                            <Technology key={technology.name} {...technology} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className='[--duration:25s]'>
                        {secondRow.map((technology) => (
                            <Technology key={technology.name} {...technology} />
                        ))}
                    </Marquee>
                    <div className='from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r'></div>
                    <div className='from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l'></div>
                </div>
            </section>
        </>
    );
}