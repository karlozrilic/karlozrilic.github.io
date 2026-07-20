'use client'
import { useEffect, useState } from 'react';
import { RootState } from '@/app/src/store/store';
import { useSelector } from 'react-redux';
import { BentoCard, BentoGrid } from '@/app/src/components/ui/bento-grid';
import { useWebHaptics } from 'web-haptics/react';
import { AspectRatio } from '@/app/src/components/ui/aspect-ratio';
import Image from 'next/image';

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
                        project.style.display = 'block';
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
        <>
            <span id='projects'></span>
            <section className='relative bg-secondary text-secondary-foreground fade-in px-1' id='projects'>
                <div className='container mx-auto py-10 md:py-20'>
                    <h2 className='text-4xl font-bold text-center mb-10'>Projects</h2>
                    <div className='flex justify-center flex-wrap mb-10 gap-3'>
                        <button
                            className={`project-filter rounded px-4 py-2 ${activeFilter === 'all' ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}
                            data-filter='all'
                        >All</button>
                        {tags.map((tag, index) => 
                            <button
                                className={`project-filter rounded px-4 py-2 ${activeFilter === tag ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}
                                data-filter={tag}
                                key={index}
                            >{tag.charAt(0).toUpperCase() + tag.slice(1)}</button>
                        )}
                    </div>
                    <BentoGrid className='m-auto bg-muted'>
                        {projects.data.map((project, index) => 
                            <BentoCard
                                key={index}
                                name={project.title}
                                description={project.content}
                                background={
                                    <AspectRatio
                                        ratio={16 / 9}
                                        className='flex items-center'
                                    >
                                        <Image
                                            src={`/images/${project.image}.svg`}
                                            alt={`${project.title} logo`}
                                            width={100}
                                            height={100}
                                            onError={(e) => {
                                                e.currentTarget.src = `/images/${project.image}.png`;
                                            }}
                                            className='w-full h-full object-contain scale-80 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-100'
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
        </>
    );
}