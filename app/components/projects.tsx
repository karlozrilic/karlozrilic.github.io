'use client'
import { useEffect, useState } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function Projects() {
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
            <section className='container mx-auto py-20 fade-in' id='projects'>
                <h2 className='text-4xl font-bold text-center mb-10'>Projects</h2>
                <div className='flex justify-center flex-wrap mb-10 gap-3'>
                    <button
                        className={`project-filter rounded px-4 py-2 ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        data-filter='all'
                    >All</button>
                    {tags.map((tag, index) => 
                        <button
                            className={`project-filter rounded px-4 py-2 ${activeFilter === tag ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            data-filter={tag}
                            key={index}
                        >{tag.charAt(0).toUpperCase() + tag.slice(1)}</button>
                    )}
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:m-auto mx-[20px]' id='project-grid'>
                    {projects.map((project, index) => 
                        <Link
                            key={index}
                            href={project.link}
                            target={project.link.startsWith('http') ? '_blank' : '_self'}
                            data-tags={project.tags}
                            className='project-item flex flex-col h-full p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg sm:hover:shadow-2xl sm:hover:scale-105 transition transform cursor-pointer'
                        >
                            <img src={`/images/${project.image}.png`} className='rounded-lg h-3xs mb-2' />
                            <div className='flex flex-row gap-2'>
                                {project.small_image != '' && 
                                    <div className='flex items-center flex-shrink-0'>
                                        <img src={`/images/small/${project.small_image}.png`} className='rounded-lg w-[56px] h-[56px]' />
                                    </div>
                                }
                                
                                <div className='flex flex-col'>
                                    <h3 className='font-bold text-xl mb-2'>{project.title}</h3>
                                    <p className='text-gray-600 dark:text-gray-300'>{project.description}</p>
                                </div>
                            </div>
                            <div className='mt-auto pt-2'>
                                {project.tags.map((tag, index) => 
                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-3 py-1 rounded-full">
                                        {tag}
                                    </span>
                                )}
                            </div>
                        </Link>
                    )}
                </div>
            </section>
        </>
    );
}