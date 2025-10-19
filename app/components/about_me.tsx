export default function AboutMe() {
    return (
        <>
            <span id='about'></span>
            <section className='container mx-auto py-20 fade-in' id='about'>
                <h2 className='text-4xl font-bold text-center mb-10'>About Me</h2>
                <div className='md:flex md:items-center md:space-x-10'>
                    <img
                        src='https://media.licdn.com/dms/image/v2/D4D03AQE_2nSmVcB3uQ/profile-displayphoto-shrink_800_800/B4DZamj4cVGwAg-/0/1746551147030?e=1762387200&v=beta&t=GovCnmOQtt6VD8BNih7pqo51kMqjZf9E9Nz_L9N-3yY'
                        alt='Your Photo'
                        className='rounded-lg mb-6 md:mb-0 md:w-1/3 border-4 border-primary'
                    />
                    <p className='md:w-2/3 text-lg leading-relaxed'>
                        I am a passionate developer and designer, creating dynamic, responsive, and interactive web & mobile experiences.
                    </p>
                </div>
            </section>
        </>
    );
}