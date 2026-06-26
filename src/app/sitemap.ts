import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.karyabangunsemesta.my.id';

// Public, indexable routes. Admin, login and API routes are intentionally excluded.
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about/profile', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about/history', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about/iso', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about/team', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/building-construction', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/infrastructure', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/project-management', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/equipment-rental', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/equipment-operators', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/equipment-maintenance', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/platform', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/platform/equipment-booking', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/platform/project-tracking', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/platform/material-store', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/platform/ai-intelligence', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/kalkulator-rab', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/tech', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/insight/implementasi-bim-proyek-renovasi', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/insight/izin-wajib-renovasi-rumah-2024', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/insight/jasa-konsultasi-pra-konstruksi', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/insight/manajemen-risiko-proyek-konstruksi', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/insight/pembangunan-gedung-ramah-lingkungan', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/insight/perubahan-regulasi-imb-2024', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/insight/perubahan-standar-sni-bahan-bangunan', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/insight/proyek-infrastruktur-jakarta-timur-2024', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/insight/strategi-kenaikan-harga-material-2024', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/insight/teknologi-pemantauan-jarak-jauh-konstruksi', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/karir', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/resources', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/ethics', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
