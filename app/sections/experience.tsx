'use client'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export default function Experience() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const { data } = useSelector((state: RootState) => state.experiences);

    useEffect(() => {
        setExperiences(data);
    }, [data]);

    return (
        <>
            <span id='experience'></span>
            <section className='relative py-10 md:py-20 bg-secondary text-secondary-foreground fade-in' id='experience'>
                <h2 className='text-4xl font-bold text-center mb-10'>Experience</h2>
                <div className='container mx-auto space-y-8 px-1'>
                    {experiences.map((experience, index) => {
                        const isLast = index === experiences.length - 1

                        return (
                            <div key={index} className="relative pl-0 md:pl-8">
                                
                                {!isLast && (
                                    <span className="absolute hidden md:block left-3 top-8 h-[calc(100%+theme(spacing.6))] w-px bg-border" />
                                )}

                                <span className="absolute hidden md:flex items-center justify-center left-0 top-5 h-6 w-6 rounded-full bg-primary">
                                    <span className='h-4 w-4 bg-chart-5 dark:bg-chart-3 rounded-full' />
                                </span>

                                <Card className="rounded-2xl shadow-sm py-0">
                                    <CardContent className="p-4">
                                        <div className="flex flex-col md:gap-0 gap-2 justify-between md:flex-row md:items-center mb-2">
                                            <div className='flex flex-col'>
                                                <h3 className='text-2xl font-semibold text-chart-5 dark:text-chart-3'>{experience.job_title}</h3>
                                                <h5>{experience.company_name} - {experience.location}</h5>
                                            </div>
                                            <Badge variant="secondary">{moment(new Date(experience.start_date)).format('MMMM YYYY')} - {moment(new Date(experience.end_date)).format('MMMM YYYY')}</Badge>
                                        </div>
                                        <div className="text-muted-foreground marker:text-secondary-foreground text-sm md:text-base">
                                            {experience.description.map((section, index) => 
                                                <div key={index}>
                                                    {section.text_before != '' && <p>{section.text_before}</p>}
                                                    {section.points.length > 0 &&
                                                        <ul className={`list-disc ps-[20px] ${section.text_after === '' && 'mb-2'}`}>
                                                            {section.points.map((point, index) =>
                                                                <li key={index}>{point}</li>
                                                            )}
                                                        </ul>
                                                    }
                                                    {section.text_after != '' && <p>{section.text_after}</p>}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    );
}