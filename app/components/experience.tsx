import experiences from '../data/experience.json';

export default function Experience() {
    return (
        <>
            <span id='experience'></span>
            <section className='relative py-20 bg-gray-100 dark:bg-gray-800 py-20 fade-in' id='experience'>
                <h2 className='text-4xl font-bold text-center mb-10'>Experience</h2>
                <div className='container mx-auto space-y-8'>
                    {experiences.map((experience, index) => 
                        <div key={index} className='bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition'>
                            <h3 className='text-2xl font-semibold'>{experience.job_title}</h3>
                            <p className='text-gray-500 dark:text-gray-300 mb-2'>{experience.company_name} | {experience.start_date} - {experience.end_date} | {experience.location}</p>
                            {experience.description_sections.map((section, index) => 
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
                    )}
                </div>
            </section>
        </>
    );
}