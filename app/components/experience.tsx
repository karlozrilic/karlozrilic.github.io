'use client'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Experience() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const { data } = useSelector((state: RootState) => state.experiences);

    useEffect(() => {
        setExperiences(data);
    }, [data]);

    return (
        <>
            <span id='experience'></span>
            <section className='relative py-20 bg-secondary text-secondary-foreground py-20 fade-in' id='experience'>
                <h2 className='text-4xl font-bold text-center mb-10'>Experience</h2>
                <div className='container mx-auto space-y-8 px-1'>
                    {experiences.map((experience, index) => {
                        const isLast = index === experiences.length - 1

                        return (
                            <div key={index} className="relative pl-4 md:pl-8">
                                
                                {/* Vertical line (only if not last item) */}
                                {!isLast && (
                                    <span className="absolute left-2 md:left-3 top-4 h-[calc(100%+theme(spacing.6))] w-px bg-border" />
                                )}

                                {/* Dot */}
                                <span className="absolute left-0 top-2 h-4 w-4 md:h-6 md:w-6 rounded-full bg-primary flex items-center justify-center" />

                                <Card className="rounded-2xl shadow-sm">
                                    <CardContent className="p-4">
                                        <div className="flex flex-col md:gap-0 gap-2 justify-between md:flex-row md:items-center mb-2">
                                            <div className='flex flex-col'>
                                                <h3 className='text-2xl font-semibold'>{experience.job_title}</h3>
                                                <h5>{experience.company_name} - {experience.location}</h5>
                                            </div>
                                            <Badge variant="secondary">{moment(new Date(experience.start_date)).format('Do MMMM YYYY')} - {moment(new Date(experience.end_date)).format('Do MMMM YYYY')}</Badge>
                                        </div>
                                        <div className="text-muted-foreground text-sm md:text-base">
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