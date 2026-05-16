import Portfolio from "@/app/src/pages/portfolio";

export async function generateStaticParams() {
    return [
        { slug: 'portfolio' },
        { slug: 'banana' },
        { slug: 'imposter' },
    ];
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    if (slug == 'portfolio') {
        return <Portfolio />
    }

    return <></>;
}