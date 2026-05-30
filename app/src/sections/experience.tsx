'use client'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/src/store/store';
import { useEffect } from 'react';
import moment from 'moment';
import { Card, CardContent } from '@/app/src/components/ui/card';
import { Badge } from '@/app/src/components/ui/badge';
import { fetchExperiences } from '@/app/src/store/slices/experienceSlice';
import LoadingComponent from '@/app/src/layout_components/loading';

export default function Experience() {
    const dispatch = useDispatch<AppDispatch>();
    const experiences = useSelector((state: RootState) => state.experiences);

    // Fetch data once on mount
    useEffect(() => {
        dispatch(fetchExperiences());
    }, [dispatch]);

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
            { experiences.loaded ? null : <LoadingComponent /> }
            <span id='experience'></span>
            <section className='relative py-10 md:py-20 bg-secondary text-secondary-foreground fade-in px-1' id='experience'>
                
                <h2 className='text-4xl font-bold text-center mb-10'>Experience</h2>
                <div className='container mx-auto space-y-8'>
                    {experiences.data.map((experience, index) => {
                        const isLast = index === experiences.data.length - 1

                        return (
                            <div key={index} className='relative pl-0 md:pl-8'>
                                
                                {!isLast && (
                                    <span className='absolute hidden md:block left-3 top-8 h-[calc(100%+theme(spacing.6))] w-px bg-border' />
                                )}

                                <span className='absolute hidden md:flex items-center justify-center left-0 top-5 h-6 w-6 rounded-full bg-primary'>
                                    <span className='h-4 w-4 bg-chart-5 dark:bg-chart-3 rounded-full' />
                                </span>

                                <Card className='rounded-2xl shadow-sm py-0'>
                                    <CardContent className='p-4'>
                                        <div className='flex flex-col md:gap-0 gap-2 justify-between md:flex-row md:items-center mb-2'>
                                            <div className='flex flex-col'>
                                                <h3 className='text-2xl font-semibold text-chart-5 dark:text-chart-3'>{experience.job_title}</h3>
                                                <h5>{experience.company_name} - {experience.location}</h5>
                                            </div>
                                            <Badge variant='secondary'>{moment(new Date(experience.start_date)).format('MMMM YYYY')} - {experience.end_date ? moment(new Date(experience.end_date)).format('MMMM YYYY') : 'Present'}</Badge>
                                        </div>
                                        <div
                                            className='text-muted-foreground marker:text-secondary-foreground text-sm md:text-base'
                                            dangerouslySetInnerHTML={{ 
                                                __html: experience.content?.replaceAll(
                                                    '<ul>',
                                                    '<ul class="list-disc ps-[20px] mb-2 last:mb-0">'
                                                )
                                            }}
                                        ></div>
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