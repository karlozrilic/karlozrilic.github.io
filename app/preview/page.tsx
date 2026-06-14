'use client'

import '@/app/src/style/print.css';
import { useEffect, useRef } from 'react';
//import { useReactToPrint } from 'react-to-print';

export default function PreviewCV() {
    const contentRef = useRef<HTMLDivElement>(null);
    //const reactToPrintFn = useReactToPrint({
    //    contentRef,
    //    // ignoreGlobalStyles: true
    //});
    
    useEffect(() => {
        window.onmessage = (event: MessageEvent) => {
            try {
                const parsedMessage = JSON.parse(event.data);
                const method = parsedMessage.method;
                if (method === 'print') {
                    // reactToPrintFn();
                }
            } catch {
                // silent fail
            }
        };
    }, []);

    return (
        <div className='print-preview min-h-dvh' ref={contentRef}>
            <header>
                <h1>John Doe</h1>
                <div className='subtitle'>Software Engineer</div>
                <div className='contact'>
                    john@example.com • +1 555 123 4567 • City, Country • linkedin.com/in/johndoe
                </div>
            </header>

            <section>
                <h2>Profile</h2>
                <p>
                    Software engineer with 5+ years of experience building web applications,
                    APIs, and internal tools. Focused on clean architecture, performance,
                    and user-centered development.
                </p>
            </section>

            <section>
                <h2>Experience</h2>

                <div className='item'>
                    <div className='item-header'>
                        <div className='title'>Senior Software Engineer — Company Name</div>
                        <div className='date'>2022–Present</div>
                    </div>
                    <ul>
                        <li>Built and maintained scalable web applications.</li>
                        <li>Improved performance and deployment workflows.</li>
                        <li>Mentored junior developers.</li>
                    </ul>
                </div>

                <div className='item'>
                    <div className='item-header'>
                        <div className='title'>Software Engineer — Previous Company</div>
                        <div className='date'>2019–2022</div>
                    </div>
                    <ul>
                        <li>Developed REST APIs and frontend features.</li>
                        <li>Collaborated with product and design teams.</li>
                    </ul>
                </div>
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