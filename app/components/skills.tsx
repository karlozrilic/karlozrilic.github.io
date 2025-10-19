'use client'
import { useEffect, useState } from 'react';
import { collection, collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

interface SkillGroup {
    id: string,
    title: string,
    primary_color: string,
    secondary_color: string,
    skills: Skill[]
}

interface Skill {
    id: string,
    title: string,
    level: number
}

type SkillWithParent = Skill & { parent?: string };

export default function Skills() {
    const [loading, setLoading] = useState(true);
    const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const skillGroupsnapshot = await getDocs(collection(db, 'skill_groups'));
            const skillGroupsData: SkillGroup[] = skillGroupsnapshot.docs.map(doc => ({ ...doc.data() as SkillGroup }));
            const skillsSnapshot = await getDocs(collectionGroup(db, 'skills'));
            const skillsData: SkillWithParent[] = skillsSnapshot.docs.map(doc => ({ parent: doc.ref.parent.parent?.id, ...doc.data() as Skill }));

            const mergedData: SkillGroup[] = skillGroupsData.map(group => ({
                ...group,
                skills: skillsData
                    .filter(skill => skill.parent === group.id)
                    .map(({ parent, ...skill }) => skill),
            }));

            setSkillGroups(mergedData);
            setLoading(false);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const skillCircles = document.querySelectorAll<HTMLDivElement>('.circle-skill');
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
    }, [loading]);

    return (
        <>
            <span id='skills'></span>
            <section className='relative py-20 bg-gray-100 dark:bg-gray-800 overflow-hidden fade-in'>
                <h2 className='text-4xl font-bold text-center mb-12 fade-in'>Skills & Expertise</h2>
                <div className={`container mx-auto ${loading ? '' : 'grid grid-cols-1 md:grid-cols-3 gap-12'}`}>
                    {loading ? <div className='text-center'>Loading...</div> : skillGroups.map((skillGroup, i) => 
                        <div className='text-center' key={i}>
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
                                        <div className='absolute inset-0 flex flex-col items-center justify-center'>
                                            <span className='text-xl font-bold'>{skill.title}</span>
                                            <span className='skill-percent text-primary font-semibold'>{skill.level}%{skill.level == 99.99 ? '*' : ''}</span>
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