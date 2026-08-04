'use client'

import '@/app/src/style/print.css';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store';
import { formatDatePrecise } from '@/helpers/constants';
import LoadingScreen from '../src/sections/loading';

export default function PreviewCV() {
    const contentRef = useRef<HTMLDivElement>(null);
    const aboutMe = useSelector((state: RootState) => state.aboutMe);
    const experiences = useSelector((state: RootState) => state.experiences);

    if (aboutMe.loading || experiences.loading) return <LoadingScreen />;

    if (!aboutMe.data) return <div>Something went wrong</div>

    return (
        <div className='print-preview min-h-dvh' ref={contentRef}>
            <header>
                <h1>{aboutMe.data.first_name} {aboutMe.data.last_name}</h1>
                <div className='subtitle'>{aboutMe.data.job_title}</div>
                <div className='contact'>
                    {aboutMe.data.email} • {aboutMe.data.phone} • <a href={aboutMe.data.socials.linkedIn.link}>{aboutMe.data.socials.linkedIn.text} (linkedIn)</a>
                </div>
            </header>

            <section>
                <h2>Profile</h2>
                <div dangerouslySetInnerHTML={{ __html: aboutMe.data.content }}></div>
            </section>

            <section>
                <h2>Experience</h2>

                {
                    experiences.data.filter((experience) => experience.show).map((experience, index) => {
                        return (
                            <div className='item' key={index}>
                                <div className='item-header'>
                                    <div className='title'>{experience.job_title} - {experience.company_name}</div>
                                    <div className='date'>
                                        {
                                            formatDatePrecise(
                                                new Date(experience.start_date),
                                                undefined,
                                                {
                                                    year: 'numeric',
                                                    month: undefined,
                                                    day: undefined
                                                }
                                            )
                                        } - {
                                            experience.end_date ?
                                                formatDatePrecise(
                                                    new Date(experience.end_date),
                                                    undefined,
                                                    {
                                                        year: 'numeric',
                                                        month: undefined,
                                                        day: undefined
                                                    }
                                                )
                                            :
                                            'Present'
                                        }
                                    </div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: experience.content }} />
                            </div>
                        );
                    })
                }
            </section>

            <section>
                <h2>Education</h2>

                <div className='item'>
                    <div className='item-header'>
                        <div className='title'>B.Sc. Computer Science</div>
                        <div className='date'>2015–2019</div>
                    </div>
                    <div>University Name</div>
                </div>
            </section>

            <section>
                <h2>Skills</h2>
                <div className='skills'>
                    <span className='skill'>JavaScript</span>
                    <span className='skill'>TypeScript</span>
                    <span className='skill'>React</span>
                    <span className='skill'>Node.js</span>
                    <span className='skill'>PostgreSQL</span>
                    <span className='skill'>Docker</span>
                    <span className='skill'>AWS</span>
                    <span className='skill'>Git</span>
                </div>
            </section>
        </div>
    );
}