import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator RAB — Estimasi Biaya Proyek Konstruksi Berbasis AI',
  description:
    'Kalkulator RAB (Rencana Anggaran Biaya) PT Karya Bangun Semesta: estimasi biaya dan durasi proyek konstruksi secara otomatis berdasarkan harga pasar terkini. Didukung perhitungan cerdas untuk membantu kontraktor dan pemilik proyek merencanakan anggaran dengan cepat dan akurat.',
  alternates: { canonical: '/kalkulator-rab' },
  openGraph: {
    title: 'Kalkulator RAB Berbasis AI — Estimasi Biaya Konstruksi | PT Karya Bangun Semesta',
    description:
      'Estimasi biaya dan durasi proyek konstruksi otomatis berdasarkan harga pasar terkini.',
    url: 'https://www.karyabangunsemesta.my.id/kalkulator-rab',
  },
};

export default function KalkulatorRabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
