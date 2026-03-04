'use client'
import { useEffect, useState } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { BentoCard, BentoGrid } from '@/app/components/ui/bento-grid';
import { useWebHaptics } from 'web-haptics/react';

export default function Projects() {
    const { trigger } = useWebHaptics();

    const [activeFilter, setActiveFilter] = useState('all');
    const [projects, setProjects] = useState<Project[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    const { data } = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        setProjects(data);
    }, [data]);

    useEffect(() => {
        setTags(Array.from(
            new Set(
                projects.flatMap(project => project.tags.map(tag => tag.toLowerCase()))
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
                    <BentoGrid className='m-auto'>
                        {projects.map((project, index) => 
                            <BentoCard
                                key={index}
                                name={project.title}
                                description={project.description}
                                background={
                                    <img
                                        src={`/images/${project.image}.png`}
                                        className='w-full scale-100 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-115'
                                    />
                                }
                                href={project.link}
                                className='project-item'
                                tags={project.tags}
                            />
                        )}
                    </BentoGrid>
                </div>
            </section>
        </>
    );
}