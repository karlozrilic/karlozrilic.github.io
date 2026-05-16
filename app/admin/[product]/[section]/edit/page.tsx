import AboutMeEdit from "@/app/src/pages/about_me_edit";

export function generateStaticParams() {
    return [
        { product: 'portfolio', section: 'about-me' },
        { product: 'banana', section: '' },
        { product: 'imposter', section: '' },
    ];
}

export default async function Page({
    params,
}: {
    params: Promise<{ product: string, section: string }>
}) {
    const { product, section } = await params;

    if (product === 'portfolio' && section === 'about-me') {
        return <AboutMeEdit />
    }

    return <></>;
}