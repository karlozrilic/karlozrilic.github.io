'use client'
import { useEffect, useState } from 'react';
import { RootState } from '@/app/src/store/store';
import { useSelector } from 'react-redux';
import { BentoCard, BentoGrid } from '@/app/src/components/ui/bento-grid';
import { useWebHaptics } from 'web-haptics/react';
import { AspectRatio } from '@/app/src/components/ui/aspect-ratio';
import Image from 'next/image';
import SectionHeading from '@/app/src/components/custom/section_heading';

export default function Projects() {
    const projects = useSelector((state: RootState) => state.projects);
    
    const { trigger } = useWebHaptics();

    const [activeFilter, setActiveFilter] = useState('all');
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        setTags(Array.from(
            new Set(
                projects.data.flatMap(project => project.tags.map(tag => tag.toLowerCase()))
            )
        ));
    }, [projects]);

    useEffect(() => {
        // PROJECT FILTERING
        const filterButtons = document.querySelectorAll<HTMLDivElement>('.project-filter');
        const projects = document.querySelectorAll<HTMLDivElement>('.project-item');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                trigger('success');
                filterButtons.forEach(btn => btn.classList.remove('active'))
                button.classList.add('active');
                const filter = button.dataset.filter;
                setActiveFilter(filter ?? 'all');
                projects.forEach(project => {
                    if(filter === 'all' || project.dataset.tags?.split(',').includes(filter || '')) {
                        project.style.display = '';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }, [tags]);

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
        <section className='border-t scroll-mt-(--header-height) fade-in' id='projects'>
            <div className='container mx-auto px-6 py-16 md:py-28'>
                <div className='mb-10 md:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
                    <SectionHeading>Projects</SectionHeading>
                    <div className='flex flex-wrap gap-x-6 gap-y-2' role='tablist'>
                        {['all', ...tags].map(tag =>
                            <button
                                key={tag}
                                role='tab'
                                aria-selected={activeFilter === tag}
                                className={`project-filter pb-1 border-b-2 transition-colors ${activeFilter === tag ? 'border-brand text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                                data-filter={tag}
                            >{tag.charAt(0).toUpperCase() + tag.slice(1)}</button>
                        )}
                    </div>
                </div>
                <BentoGrid>
                    {projects.data.map((project, index) => 
                        <BentoCard
                            key={index}
                            name={project.title}
                            description={project.content}
                            background={
                                <AspectRatio
                                    ratio={16 / 9}
                                    className='flex items-center bg-neutral-100 dark:bg-neutral-200'
                                >
                                    <Image
                                        src={`/images/${project.image}.svg`}
                                        alt={`${project.title} logo`}
                                        width={100}
                                        height={100}
                                        onError={(e) => {
                                            e.currentTarget.src = `/images/${project.image}.png`;
                                        }}
                                        className='w-full h-full object-contain scale-75 transition-transform duration-300 ease-out group-hover:scale-80'
                                    />
                                </AspectRatio>
                            }
                            href={project.link}
                            className='project-item h-full'
                            tags={project.tags}
                        />
                    )}
                </BentoGrid>
            </div>
        </section>
    );
}