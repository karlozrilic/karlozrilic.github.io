export default function Contact() {
    return (
        <>
            <span id='contact'></span>
            <section className='container mx-auto py-20 fade-in' id='contact'>
                <h2 className='text-4xl font-bold text-center mb-10'>Contact Me</h2>
                <form className='max-w-xl mx-auto bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg space-y-6'>
                    <input
                        type='text'
                        placeholder='Your Name'
                        className='w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        className='w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                    <textarea
                        placeholder='Message'
                        className='w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary'
                        rows={5}
                    ></textarea>
                    <button type='submit' className='px-6 py-3 bg-primary text-white font-semibold rounded shadow hover:bg-secondary transition'>Send Message</button>
                </form>
            </section>
        </>
    );
}