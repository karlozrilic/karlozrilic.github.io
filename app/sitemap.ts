import type { MetadataRoute } from 'next';

// required for output: 'export', the file is written once per build
export const dynamic = 'force-static';

// admin and /preview are left out on purpose, only public pages belong here
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://karlozrilic.github.io/',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ];
}
