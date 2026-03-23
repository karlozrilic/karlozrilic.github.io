import { useEffect, useState } from 'react';

import { Marquee } from '@/app/components/ui/marquee'; 
import Technology from '@/app/components/custom/technology';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

export default function Technologies() {
    const [technologies, setTechnologies] = useState<Technologies[]>([]);

    const { data } = useSelector((state: RootState) => state.technologies);

    useEffect(() => {
        setTechnologies(data);
    }, [data]);

    const firstRow = technologies.filter(technology => technology.row == 0).sort((a, b) => a.order - b.order);
    const secondRow = technologies.filter(technology => technology.row == 1).sort((a, b) => a.order - b.order);
        
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