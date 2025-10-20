'use client'
import { useEffect, useState } from 'react';
import projects from '../data/projects.json';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [projects, setProjects] = useState<Project[]>([]);

    const { data } = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        setProjects(data);
    }, [data]);

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
                    if(filter === 'all' || project.dataset.category == filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }, [projects]);
    
    return (
        <>
            <span id='projects'></span>
            <section className='container mx-auto py-20 fade-in' id='projects'>
                <h2 className='text-4xl font-bold text-center mb-10'>Projects</h2>
                <div className='flex justify-center space-x-4 mb-10'>
                    <button
                        className={`project-filter rounded px-4 py-2 ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                        data-filter='all'
                    >All</button>
                    {Array.from(new Set(projects.map(project => project.category.toLowerCase()))).map((project, index) => 
                        <button
                            className={`project-filter rounded px-4 py-2 ${activeFilter === project ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            data-filter={project}
                            key={index}
                        >{project.charAt(0).toUpperCase() + project.slice(1)}</button>
                    )}
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8' id='project-grid'>
                    {projects.map((project, index) => 
                        <a
                            key={index}
                            href={project.link}
                            target={project.link.startsWith('http') ? '_blank' : '_self'}
                            data-category={project.category.toLowerCase()}
                            className='project-item web p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform cursor-pointer'
                        >
                            <img src={project.image} className='rounded-lg h-3xs mb-2' />
                            <div className='flex flex-row'>
                                {project.small_image != '' && <img src={project.small_image} className='rounded-lg w-[56px] me-2' />}
                                
                                <div className='flex flex-col'>
                                    <h3 className='font-bold text-xl mb-2'>{project.title}</h3>
                                    <p className='text-gray-600 dark:text-gray-300'>{project.description}</p>
                                </div>
                            </div>
                        </a>
                    )}
                </div>
            </section>
        </>
    );
}