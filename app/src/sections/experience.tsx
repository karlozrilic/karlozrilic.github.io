'use client'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/src/store/store';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { capitalizeFirstLetter } from '@/helpers/string';
import SectionHeading from '@/app/src/components/custom/section_heading';
import { Experience as ExperienceType } from '@/app/src/types/experience/experience';

const COLLAPSED = '11rem';

function ExperienceItem({ experience }: { experience: ExperienceType }) {
    const itemRef = useRef<HTMLLIElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [tooLong, setTooLong] = useState(false);
    const [maxHeight, setMaxHeight] = useState(COLLAPSED);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        setTooLong(el.scrollHeight > el.clientHeight + 4);
    }, [experience.content]);

    function toggle() {
        const el = contentRef.current;
        if (!el) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!open) {
            setOpen(true);
            setMaxHeight(reduceMotion ? 'none' : `${el.scrollHeight}px`);
            return;
        }

        setOpen(false);
        if (reduceMotion) {
            setMaxHeight(COLLAPSED);
        } else {
            // go from 'none' to a real height first, otherwise there's nothing to animate from
            setMaxHeight(`${el.scrollHeight}px`);
            requestAnimationFrame(() => requestAnimationFrame(() => setMaxHeight(COLLAPSED)));
        }

        const item = itemRef.current;
        const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 68;
        if (item && item.getBoundingClientRect().top < headerHeight) {
            item.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
    }

    const start = moment(new Date(experience.start_date)).format('MMM YYYY');
    const end = experience.end_date ? moment(new Date(experience.end_date)).format('MMM YYYY') : 'now';
    const workModel = experience.work_model !== 'on-site' ? ` (${capitalizeFirstLetter(experience.work_model)})` : '';

    return (
        <li ref={itemRef} className='grid gap-2 lg:grid-cols-[9rem_1fr] lg:gap-8 py-10 border-t first:border-t-0 first:pt-0 scroll-mt-[calc(var(--header-height,68px)+1rem)]'>
            <p className='text-sm text-muted-foreground tabular-nums lg:pt-1.5'>
                {start} - {end}
            </p>
            <div>
                <h3 className='text-xl md:text-2xl font-semibold'>{experience.job_title}</h3>
                <p className='mt-1 text-muted-foreground'>
                    {experience.company_name}, {experience.city}, {experience.country}{workModel}
                </p>

                <div
                    ref={contentRef}
                    className={`relative mt-4 overflow-hidden text-foreground/80 leading-relaxed transition-[max-height] duration-300 ease-out motion-reduce:transition-none ${!open && tooLong ? 'mask-[linear-gradient(to_bottom,#000_60%,transparent)]' : ''}`}
                    style={{ maxHeight }}
                    onTransitionEnd={(event) => {
                        // fully open, drop the limit so text never gets cut off on resize
                        if (open && event.propertyName === 'max-height') setMaxHeight('none');
                    }}
                    dangerouslySetInnerHTML={{
                        __html: experience.content?.replaceAll(
                            '<ul>',
                            '<ul class="list-disc ps-5 mb-3 last-of-type:mb-0 space-y-1 marker:text-muted-foreground">'
                        )
                    }}
                ></div>

                {tooLong &&
                    <button
                        type='button'
                        onClick={toggle}
                        className='mt-3 text-sm font-medium underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground'
                    >
                        {open ? 'Show less' : 'Show more'}
                    </button>
                }
            </div>
        </li>
    );
}

export default function Experience() {
    const experiences = useSelector((state: RootState) => state.experiences);

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
        <section className='border-t scroll-mt-(--header-height) fade-in' id='experience'>
            <div className='container mx-auto px-6 py-16 md:py-28 grid gap-8 md:grid-cols-[1fr_2fr] md:gap-16'>
                <div>
                    <SectionHeading className='md:sticky md:top-[calc(var(--header-height,68px)+2rem)]'>Experience</SectionHeading>
                </div>
                <ol>
                    {experiences.data.filter((experience) => experience.show).map((experience) =>
                        <ExperienceItem key={experience.id} experience={experience} />
                    )}
                </ol>
            </div>
        </section>
    );
}
