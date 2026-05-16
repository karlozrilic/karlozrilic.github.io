'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/app/src/components/ui/button';
import { useWebHaptics } from 'web-haptics/react';

export default function AboutMe() {
    const { trigger } = useWebHaptics();
    const [expanded, setExpanded] = useState(false);

    function toggleExpand() {
        trigger('success');
        setExpanded(!expanded);
    }

    return (
        <>
            <span id='about'></span>
            <section className='container mx-auto py-10 md:py-20 fade-in px-1' id='about'>
                <h2 className='text-4xl font-bold text-center mb-10'>About Me</h2>
                <div className='md:flex md:items-center md:space-x-10'>
                    <img
                        src='/images/portfolio_picture.jpeg'
                        alt='Your Photo'
                        className='rounded-lg mb-6 md:mb-0 md:w-1/3 border-4 border-primary'
                    />
                    <div className='md:w-2/3 md:m-auto mx-[20px]'>
                        <p className='text-lg leading-relaxed mb-2'>
                            Hi there! I'm an Information Technology Engineer who loves turning caffeine into clean, responsive, and intuitive user interfaces.
                            I speak fluent <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b> -
                            and I can even hold conversations in <b>React</b>, <b>Angular</b>, and <b>Vue</b> (they all have different personalities, trust me).
                        </p>
                        <p className='text-lg leading-relaxed mb-2'>
                            My passion lies in creating seamless digital experiences that not only look great but feel great to use.
                            I'm all about building interfaces that are responsive, accessible, and optimized for performance -
                            because if your site only works on one browser, it's not a site, it's a gamble.
                        </p>

                        <AnimatePresence>
                            {expanded && (
                                <motion.div
                                    key='extra-content'
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    className='overflow-hidden'
                                >
                                    <p className='text-lg leading-relaxed mb-2'>
                                        While frontend development is my home turf, I've also ventured into the world of mobile app development,
                                        building cross-platform applications using <b>Flutter</b> (my favorite toolkit) and <b>React Native</b>. There's something incredibly
                                        satisfying about seeing your code come to life on both <b>Android</b> and <b>iOS</b> - like watching your website grow legs and start running around.
                                    </p>
                                    <p className='text-lg leading-relaxed mb-2'>
                                        On the backend side of things, I know my way around <b>PHP</b> and <b>SQL</b>. I wouldn't call myself a backend wizard, but I can confidently
                                        build and maintain databases, connect APIs, and handle the server-side logic that keeps everything running smoothly. Whether it's writing queries,
                                        debugging scripts, or setting up authentication, I enjoy making sure the frontend and backend play nicely together.
                                    </p>
                                    <p className='text-lg leading-relaxed mb-2'>
                                        I'm also comfortable working with <b>Java</b>, whether it's building backend logic, tinkering with Android apps,
                                        or just appreciating its <i>"write once, debug everywhere"</i> charm. This mix of web and mobile experience helps me see the bigger picture -
                                        from frontend pixels to backend processes.
                                    </p>
                                    <p className='text-lg leading-relaxed mb-2'>
                                        I've worked closely with UI/UX designers, backend developers, and the occasional confused stakeholder - which has taught me the fine
                                        art of translating <i>"make it pop"</i> into actual code. Debugging tools like <b>Chrome DevTools</b> and <b>Lighthouse</b> are my trusty sidekicks,
                                        and I have the patience to chase down bugs that think they can hide behind a semicolon.
                                    </p>
                                    <p className='text-lg leading-relaxed mb-2'>
                                        After I went full geek, I honed my people skills even further as a Sales Advisor at Hrvatski Telekom,
                                        where I learned how to explain complex tech concepts in plain language (and sometimes even sell them). I've also worked in logistics,
                                        which taught me the importance of organization, teamwork, and never underestimating the power of a well-structured to-do list.
                                    </p>
                                    <p className='text-lg leading-relaxed'>
                                        I'm detail-oriented, love learning new things, and believe good code should be like good humor -
                                        clear, well-timed, and make someone's day just a bit better. Whether I'm building a fast, responsive web app
                                        or crafting a mobile experience that fits in your pocket, my goal is simple: to create technology that
                                        feels effortless, looks beautiful, and actually works.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            className='px-0 mt-4 inline-flex items-center gap-2 font-semibold text-chart-5 dark:text-chart-3'
                            size='lg'
                            variant='link'
                            onClick={toggleExpand}
                        >
                            <span>{expanded ? 'Read less' : 'Read more'}</span>
                            <motion.span
                                animate={{ rotate: expanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                            </motion.span>
                        </Button>
                    </div>  
                </div>
            </section>
        </>
    );
}