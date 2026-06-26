import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.karyabangunsemesta.my.id';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/platform/login'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
