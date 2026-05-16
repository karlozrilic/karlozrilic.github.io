import AboutMe from '@/app/src/sections/about_me';

export function generateStaticParams() {
    return [
        { product: 'portfolio', section: 'about-me' },
        { product: 'banana', section: '' },
        { product: 'imposter', section: '' },
    ];
}

export default async function View({
    params,
}: {
    params: Promise<{ product: string, section: string }>
}) {
    const { product, section } = await params;

    if (product === 'portfolio' && section === 'about-me') {
        return <main className='flex w-full min-h-screen justify-center p-2'><AboutMe /></main>
    }

    return <></>;
}