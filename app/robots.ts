import type { MetadataRoute } from 'next';

// required for output: 'export', the file is written once per build
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/preview'],
        },
        sitemap: 'https://karlozrilic.github.io/sitemap.xml',
    };
}
