'use client'
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Skills() {
    const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
    const skillsRef = useRef<HTMLDivElement>(null);
    const { data } = useSelector((state: RootState) => state.skillGroups);

    useEffect(() => {
        setSkillGroups(data);
    }, [data]);

    useEffect(() => {
        const skillCircles = document.querySelectorAll<SVGCircleElement>('.circle-skill');
        const skillObserver = new IntersectionObserver(entries  => {
            entries.forEach(entry => {
                
                if(entry.isIntersecting && entry.target != null) {
                    const circle = entry.target as SVGCircleElement;
                    const percentEl = circle.parentElement?.querySelector('.skill-percent');
                    const skill = Number(circle.dataset.skill);

                    // Get the true circumference of the circle
                    const r = circle.r.baseVal.value;
                    const circumference = 2 * Math.PI * r;

                    // Always set the correct dasharray
                    circle.style.strokeDasharray = `${circumference}`;
                    const offset = circumference * (1 - skill / 100);

                    circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
                    circle.style.strokeDashoffset = offset.toString();
                    if(percentEl) {
                        let count = 0;
                        const interval=setInterval(() => {
                            count++;
                            percentEl.textContent = count + '%';
                            if(count >= skill) clearInterval(interval);
                        }, 15);
                    }
                    skillObserver.unobserve(circle);
                    }
                })
            },
            {
                threshold: 0.5
            }
        );
        skillCircles.forEach(c => skillObserver.observe(c));   
    }, [skillGroups]);

    useEffect(() => {
        if (skillsRef.current == null) return;
        skillsRef.current.classList.add('visible');
    }, [skillGroups])

    return (
        <>
            <span id='skills'></span>
            <section className='relative py-20 bg-gray-100 dark:bg-gray-800 overflow-hidden fade-in'>
                <h2 className='text-4xl font-bold text-center mb-12'>Skills & Expertise</h2>
                <div ref={skillsRef} className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 fade-in'>
                    {skillGroups.map((skillGroup, i) => 
                        <div className={`text-center ${i == 0 && 'row-span-3'}`} key={i}>
                            <h3 className='text-2xl font-semibold mb-6'>{skillGroup.title}</h3>
                            <div className='flex flex-wrap justify-center gap-6'>
                                {skillGroup.skills.map((skill, j) =>
                                    <div className='relative w-32 h-32' key={j}>
                                        <svg className='w-full h-full transform -rotate-90'>
                                            <circle
                                                cx='50%'
                                                cy='50%' 
                                                r='45%'
                                                stroke={skillGroup.secondary_color}
                                                strokeWidth='8'
                                                fill='none'
                                            />
                                            <circle
                                                cx='50%'
                                                cy='50%'
                                                r='45%'
                                                stroke={skillGroup.primary_color}
                                                strokeWidth='8'
                                                strokeLinecap='butt'
                                                fill='none'
                                                strokeDasharray='282.6'
                                                strokeDashoffset='282.6'
                                                className='circle-skill'
                                                data-skill={skill.level}
                                            />
                                        </svg>
                                        <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-1'>
                                            <span className='font-bold'>{skill.title}</span>
                                            <span className='skill-percent text-primary dark:text-white font-semibold text-xs sm:text-sm'>{skill.level}%{skill.level == 99.99 ? '*' : ''}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}