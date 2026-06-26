// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientShell from './ClientShell';

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://www.karyabangunsemesta.my.id';

// Server-rendered metadata so crawlers, search engines and AI bots can read
// what the company actually does without executing JavaScript.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'PT Karya Bangun Semesta — General Contractor, Dump Truck & Alat Berat',
    template: '%s | PT Karya Bangun Semesta',
  },
  description:
    'PT Karya Bangun Semesta adalah perusahaan konstruksi yang berdiri sejak 2019, menyediakan layanan General Contractor, Dump Truck, dan Heavy Equipment. Kami menghadirkan solusi pembangunan gedung, infrastruktur sipil, dan pengembangan lahan yang inovatif, berkualitas tinggi, dan berkelanjutan, didukung platform digital untuk booking alat berat, tracking proyek, marketplace material, dan kalkulator RAB.',
  keywords: [
    'PT Karya Bangun Semesta',
    'kontraktor konstruksi',
    'general contractor',
    'sewa alat berat',
    'dump truck',
    'heavy equipment',
    'konstruksi gedung',
    'infrastruktur sipil',
    'pengembangan lahan',
    'manajemen proyek',
    'kalkulator RAB',
    'Indonesia',
  ],
  authors: [{ name: 'PT Karya Bangun Semesta' }],
  creator: 'PT Karya Bangun Semesta',
  publisher: 'PT Karya Bangun Semesta',
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'PT Karya Bangun Semesta',
    title:
      'PT Karya Bangun Semesta — General Contractor, Dump Truck & Alat Berat',
    description:
      'Perusahaan konstruksi sejak 2019: General Contractor, Dump Truck, dan Heavy Equipment. Solusi pembangunan gedung, infrastruktur, dan pengembangan lahan yang inovatif dan berkualitas tinggi.',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'PT Karya Bangun Semesta — General Contractor, Dump Truck & Alat Berat',
    description:
      'Perusahaan konstruksi sejak 2019: General Contractor, Dump Truck, dan Heavy Equipment. Solusi pembangunan gedung, infrastruktur, dan pengembangan lahan.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'construction',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className={inter.className}>
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
