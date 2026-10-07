import { useEffect } from 'react';
import { Marquee } from '@/app/src/components/ui/marquee'; 
import Technology from '@/app/src/components/custom/technology';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/src/store/store';
import SectionHeading from '@/app/src/components/custom/section_heading';

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
            <section className='border-t scroll-mt-(--header-height) py-16 md:py-28 overflow-hidden fade-in' id='technologies'>
                <div className='container mx-auto px-6 mb-10 md:mb-14'>
                    <SectionHeading>Technologies</SectionHeading>
                    <p className='mt-4 max-w-xl text-lg text-muted-foreground'>
                        Things I've used at work or on my own projects.
                    </p>
                </div>

                <div className='relative flex w-full flex-col items-center justify-center overflow-hidden mask-[linear-gradient(to_right,transparent,#000_20%,#000_80%,transparent)]'>
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
                </div>
            </section>
        </>
    );
}