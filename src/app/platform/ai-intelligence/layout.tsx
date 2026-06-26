import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Intelligence — Prediksi & Deteksi Risiko Proyek Konstruksi',
  description:
    'Fitur AI/ML PT Karya Bangun Semesta untuk manajemen proyek konstruksi: prediksi keterlambatan proyek, deteksi risiko, deteksi penggunaan APD (alat pelindung diri) di lapangan, dan otomasi laporan harian. Teknologi machine learning untuk pengambilan keputusan proyek yang lebih cepat dan aman.',
  alternates: { canonical: '/platform/ai-intelligence' },
  openGraph: {
    title: 'AI Intelligence — Prediksi & Deteksi Risiko Konstruksi | PT Karya Bangun Semesta',
    description:
      'Prediksi keterlambatan, deteksi risiko proyek, dan deteksi APD berbasis AI/ML untuk industri konstruksi.',
    url: 'https://www.karyabangunsemesta.my.id/platform/ai-intelligence',
  },
};

export default function AiIntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
