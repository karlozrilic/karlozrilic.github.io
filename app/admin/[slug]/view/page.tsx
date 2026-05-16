import AboutMe from '@/app/src/sections/about_me';

export function generateStaticParams() {
    return [
        { slug: 'portfolio' },
        { slug: 'banana' },
        { slug: 'imposter' },
    ];
}

export default async function View({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    if (slug == 'portfolio') {
        return <main className='flex w-full min-h-screen justify-center p-2'><AboutMe /></main>
    }

    return <></>;
}