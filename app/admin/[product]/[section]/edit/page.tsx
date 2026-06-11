import AboutMeEdit from "@/app/src/pages/about_me_edit";
import ExperienceEdit from "@/app/src/pages/experience_edit";

export function generateStaticParams() {
    return [
        { product: 'portfolio', section: 'about-me' },
        { product: 'portfolio', section: 'experience' },
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

    let page = <></>;

    switch (product) {
        case 'portfolio':
            switch (section) {
                case 'about-me': 
                    page = <AboutMeEdit adminOnly={true} />;
                    break;
                case 'experience': 
                    page = <ExperienceEdit adminOnly={true} />;
                    break;
                default:
                    break;
            }
        default:
            break;
    }

    return page;
}