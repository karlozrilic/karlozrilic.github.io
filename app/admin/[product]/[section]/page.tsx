import AboutMe from '@/app/src/sections/about_me';
import Experience from '@/app/src/sections/experience';

export function generateStaticParams() {
    return [
        { product: 'portfolio', section: 'about-me' },
        { product: 'portfolio', section: 'experience' },
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

    let page = <></>;
    
    switch (product) {
        case 'portfolio':
            switch (section) {
                case 'about-me': 
                    page = <AboutMe />;
                    break;
                case 'experience': 
                    page = <Experience />;
                    break;
                default:
                    break;
            }
        default:
            break;
    }

    return <main className='min-h-screen'>{page}</main>;
}