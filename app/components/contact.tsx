'use client'
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contact() {
    return (
        <>
            <span id='contact'></span>
            <section className='container mx-auto py-20 fade-in' id='contact'>
                <h2 className='text-4xl font-bold text-center mb-10'>Contact Me</h2>
                <div className='flex justify-center content-center'>
                    <a href='mailto:karlozrilic@gmail.com' className="flex flex-wrap content-center">
                        <FontAwesomeIcon icon={faEnvelope} size='2x' />
                    </a>
                    <a href='https://www.linkedin.com/in/karlo-zrili%C4%87' target='_blank' className="flex flex-wrap content-center">
                        <FontAwesomeIcon icon={faLinkedin} size='3x' />
                    </a>
                </div>
            </section>
        </>
    );
}