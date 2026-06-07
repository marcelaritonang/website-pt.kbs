'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

// Types
type BuildingType = 'rumah' | 'ruko' | 'gudang' | 'kantor' | 'workshop';
type Quality = 'standar' | 'menengah' | 'premium';
type Region = 'jakarta' | 'bogor' | 'depok' | 'tangerang' | 'bekasi' | 'bandung' | 'surabaya' | 'semarang' | 'yogyakarta' | 'medan';

interface CalculationResult {
  totalCost: number;
  pricePerM2: number;
  breakdown: { label: string; labelEn: string; percentage: number; amount: number }[];
  duration: string;
  durationEn: string;
  comparison: { region: string; regionLabel: string; cost: number }[];
}

// Pricing data
const basePrices: Record<BuildingType, number> = {
  rumah: 3500000,
  ruko: 4200000,
  gudang: 2800000,
  kantor: 5000000,
  workshop: 3000000,
};

const qualityMultiplier: Record<Quality, number> = {
  standar: 1.0,
  menengah: 1.3,
  premium: 1.8,
};

const regionalMultiplier: Record<Region, number> = {
  jakarta: 1.25,
  bogor: 1.0,
  depok: 1.05,
  tangerang: 1.1,
  bekasi: 1.05,
  bandung: 0.95,
  surabaya: 1.0,
  semarang: 0.9,
  yogyakarta: 0.85,
  medan: 0.95,
};

const floorMultiplier: Record<number, number> = {
  1: 1.0,
  2: 1.15,
  3: 1.25,
};

const regionLabels: Record<Region, string> = {
  jakarta: 'Jakarta',
  bogor: 'Bogor',
  depok: 'Depok',
  tangerang: 'Tangerang',
  bekasi: 'Bekasi',
  bandung: 'Bandung',
  surabaya: 'Surabaya',
  semarang: 'Semarang',
  yogyakarta: 'Yogyakarta',
  medan: 'Medan',
};

const buildingTypeLabels: Record<BuildingType, { id: string; en: string }> = {
  rumah: { id: 'Rumah Tinggal', en: 'Residential House' },
  ruko: { id: 'Ruko', en: 'Shophouse' },
  gudang: { id: 'Gudang', en: 'Warehouse' },
  kantor: { id: 'Kantor', en: 'Office' },
  workshop: { id: 'Workshop', en: 'Workshop' },
};

const qualityLabels: Record<Quality, { id: string; en: string }> = {
  standar: { id: 'Standar', en: 'Standard' },
  menengah: { id: 'Menengah', en: 'Medium' },
  premium: { id: 'Premium', en: 'Premium' },
};

const breakdownItems = [
  { label: 'Pondasi & Struktur', labelEn: 'Foundation & Structure', percentage: 25 },
  { label: 'Dinding & Plester', labelEn: 'Walls & Plastering', percentage: 20 },
  { label: 'Atap & Rangka', labelEn: 'Roof & Framework', percentage: 15 },
  { label: 'Lantai & Keramik', labelEn: 'Flooring & Tiles', percentage: 12 },
  { label: 'Instalasi Listrik', labelEn: 'Electrical Installation', percentage: 8 },
  { label: 'Instalasi Plumbing', labelEn: 'Plumbing Installation', percentage: 7 },
  { label: 'Pintu & Jendela', labelEn: 'Doors & Windows', percentage: 5 },
  { label: 'Cat & Finishing', labelEn: 'Paint & Finishing', percentage: 5 },
  { label: 'Lain-lain', labelEn: 'Miscellaneous', percentage: 3 },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getDuration(area: number): { id: string; en: string } {
  if (area < 100) return { id: '3-4 bulan', en: '3-4 months' };
  if (area <= 200) return { id: '4-6 bulan', en: '4-6 months' };
  if (area <= 500) return { id: '6-9 bulan', en: '6-9 months' };
  return { id: '9-12 bulan', en: '9-12 months' };
}

export default function KalkulatorRABPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEn = language === 'en';

  const [buildingType, setBuildingType] = useState<BuildingType>('rumah');
  const [area, setArea] = useState<number>(100);
  const [floors, setFloors] = useState<number>(1);
  const [quality, setQuality] = useState<Quality>('standar');
  const [region, setRegion] = useState<Region>('jakarta');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  function calculateRAB() {
    const basePrice = basePrices[buildingType];
    const qMul = qualityMultiplier[quality];
    const rMul = regionalMultiplier[region];
    const fMul = floorMultiplier[floors];

    const pricePerM2 = basePrice * qMul * rMul * fMul;
    const totalCost = pricePerM2 * area;

    const breakdown = breakdownItems.map((item) => ({
      ...item,
      amount: Math.round((totalCost * item.percentage) / 100),
    }));

    const duration = getDuration(area);

    const comparison = (Object.keys(regionalMultiplier) as Region[])
      .filter((r) => r !== region)
      .map((r) => ({
        region: r,
        regionLabel: regionLabels[r],
        cost: Math.round(basePrice * qMul * regionalMultiplier[r] * fMul * area),
      }))
      .sort((a, b) => a.cost - b.cost)
      .slice(0, 4);

    setResult({
      totalCost: Math.round(totalCost),
      pricePerM2: Math.round(pricePerM2),
      breakdown,
      duration: duration.id,
      durationEn: duration.en,
      comparison,
    });
  }

  return (
    <div className={isDark ? 'bg-gray-900' : 'bg-white'}>
      {/* Hero Section - same style as services page */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/servicepage/gambar1.jpg"
          alt={isEn ? 'Construction Budget Calculator' : 'Kalkulator RAB Konstruksi'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                {isEn ? 'RAB Calculator' : 'Kalkulator RAB'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90"
              >
                {isEn
                  ? 'Estimate your construction budget quickly and accurately for various regions in Indonesia'
                  : 'Hitung estimasi anggaran konstruksi Anda dengan cepat dan akurat untuk berbagai daerah di Indonesia'}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className={`py-16 md:py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#153969]'}`}
            >
              {isEn ? 'Construction Cost Estimator' : 'Estimasi Biaya Konstruksi'}
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-8"
            />
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {isEn
                ? 'Use this tool to get an initial estimate of your construction costs. Our calculator uses up-to-date pricing data from contractors and material suppliers across Indonesia. No registration needed — just fill in your project details and get results instantly.'
                : 'Gunakan alat ini untuk mendapatkan estimasi awal biaya konstruksi Anda. Kalkulator kami menggunakan data harga terkini dari kontraktor dan pemasok material di seluruh Indonesia. Tanpa perlu registrasi — cukup isi detail proyek dan dapatkan hasilnya langsung.'}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`rounded-lg p-6 md:p-8 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-md`}
              >
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#153969]'}`}>
                  {isEn ? 'Project Specifications' : 'Spesifikasi Proyek'}
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {isEn ? 'Building Type' : 'Tipe Bangunan'}
                    </label>
                    <select
                      value={buildingType}
                      onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                      className={`w-full rounded-md border px-4 py-3 text-sm ${
                        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-[#153969]`}
                    >
                      {(Object.keys(buildingTypeLabels) as BuildingType[]).map((type) => (
                        <option key={type} value={type}>
                          {isEn ? buildingTypeLabels[type].en : buildingTypeLabels[type].id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {isEn ? 'Building Area (m²)' : 'Luas Bangunan (m²)'}
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10000}
                        value={area}
                        onChange={(e) => setArea(Math.max(1, parseInt(e.target.value) || 1))}
                        className={`w-full rounded-md border px-4 py-3 text-sm ${
                          isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-[#153969]`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {isEn ? 'Number of Floors' : 'Jumlah Lantai'}
                      </label>
                      <select
                        value={floors}
                        onChange={(e) => setFloors(parseInt(e.target.value))}
                        className={`w-full rounded-md border px-4 py-3 text-sm ${
                          isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-[#153969]`}
                      >
                        <option value={1}>1 {isEn ? 'Floor' : 'Lantai'}</option>
                        <option value={2}>2 {isEn ? 'Floors' : 'Lantai'}</option>
                        <option value={3}>3 {isEn ? 'Floors' : 'Lantai'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {isEn ? 'Quality Level' : 'Tingkat Kualitas'}
                    </label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value as Quality)}
                      className={`w-full rounded-md border px-4 py-3 text-sm ${
                        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-[#153969]`}
                    >
                      {(Object.keys(qualityLabels) as Quality[]).map((q) => (
                        <option key={q} value={q}>
                          {isEn ? qualityLabels[q].en : qualityLabels[q].id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {isEn ? 'Project Region' : 'Daerah Proyek'}
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as Region)}
                      className={`w-full rounded-md border px-4 py-3 text-sm ${
                        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-[#153969]`}
                    >
                      {(Object.keys(regionLabels) as Region[]).map((r) => (
                        <option key={r} value={r}>
                          {regionLabels[r]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={calculateRAB}
                    className="w-full bg-[#153969] hover:bg-[#1e4d8a] text-white font-semibold py-3.5 px-6 rounded-md transition-colors duration-200 mt-2"
                  >
                    {isEn ? 'Calculate Estimate' : 'Hitung Estimasi'}
                  </button>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {result ? (
                  <div className="space-y-6">
                    {/* Total */}
                    <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
                      <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Estimated Total Cost' : 'Estimasi Total Biaya'}
                      </p>
                      <p className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'}`}>
                        {formatCurrency(result.totalCost)}
                      </p>
                      <div className={`mt-4 grid grid-cols-2 gap-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {isEn ? 'Price per m²' : 'Harga per m²'}
                          </p>
                          <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {formatCurrency(result.pricePerM2)}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {isEn ? 'Estimated Duration' : 'Estimasi Waktu'}
                          </p>
                          <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {isEn ? result.durationEn : result.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
                      <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#153969]'}`}>
                        {isEn ? 'Cost Breakdown' : 'Rincian Biaya'}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                              <th className={`text-left py-2.5 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isEn ? 'Component' : 'Komponen'}
                              </th>
                              <th className={`text-center py-2.5 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>%</th>
                              <th className={`text-right py-2.5 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isEn ? 'Amount' : 'Jumlah'}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.breakdown.map((item, index) => (
                              <tr key={index} className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                                <td className={`py-2.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {isEn ? item.labelEn : item.label}
                                </td>
                                <td className={`py-2.5 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {item.percentage}%
                                </td>
                                <td className={`py-2.5 text-right font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                  {formatCurrency(item.amount)}
                                </td>
                              </tr>
                            ))}
                            <tr className={`font-bold ${isDark ? 'text-white' : 'text-[#153969]'}`}>
                              <td className="py-3">Total</td>
                              <td className="py-3 text-center">100%</td>
                              <td className="py-3 text-right">{formatCurrency(result.totalCost)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Regional Comparison */}
                    <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
                      <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#153969]'}`}>
                        {isEn ? 'Price Comparison by Region' : 'Perbandingan Harga per Daerah'}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                              <th className={`text-left py-2.5 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isEn ? 'Region' : 'Daerah'}
                              </th>
                              <th className={`text-right py-2.5 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isEn ? 'Estimated Cost' : 'Estimasi Biaya'}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={`border-b ${isDark ? 'border-gray-800 bg-blue-900/20' : 'border-gray-100 bg-blue-50'}`}>
                              <td className={`py-2.5 font-semibold ${isDark ? 'text-blue-300' : 'text-[#153969]'}`}>
                                {regionLabels[region]} ★
                              </td>
                              <td className={`py-2.5 text-right font-semibold ${isDark ? 'text-blue-300' : 'text-[#153969]'}`}>
                                {formatCurrency(result.totalCost)}
                              </td>
                            </tr>
                            {result.comparison.map((item, index) => (
                              <tr key={index} className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                                <td className={`py-2.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {item.regionLabel}
                                </td>
                                <td className={`py-2.5 text-right font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                  {formatCurrency(item.cost)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`rounded-lg p-8 md:p-12 text-center ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
                    <Image
                      src="/images/servicepage/gambar4.jpg"
                      alt="Construction"
                      width={120}
                      height={120}
                      className="rounded-full mx-auto mb-6 object-cover w-24 h-24"
                    />
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#153969]'}`}>
                      {isEn ? 'Ready to Calculate' : 'Siap Menghitung'}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isEn
                        ? 'Fill in your project details on the left, then click "Calculate Estimate" to get your construction budget breakdown.'
                        : 'Isi detail proyek Anda di samping, lalu klik "Hitung Estimasi" untuk mendapatkan rincian anggaran konstruksi Anda.'}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer & CTA - same style as other pages */}
      <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#153969]'}`}
            >
              {isEn ? 'Need a Detailed RAB?' : 'Butuh RAB yang Lebih Detail?'}
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-8"
            />
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {isEn
                ? 'The results above are initial estimates based on average market prices. For a complete and accurate RAB tailored to your project specifications, our estimator team is ready to help — free of charge.'
                : 'Hasil di atas merupakan estimasi awal berdasarkan harga rata-rata pasar. Untuk RAB lengkap dan akurat sesuai spesifikasi proyek Anda, tim estimator kami siap membantu — tanpa dipungut biaya.'}
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://wa.me/6281218127503?text=Halo%2C%20saya%20ingin%20konsultasi%20RAB%20detail%20untuk%20proyek%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#153969] hover:bg-[#1e4d8a] text-white font-semibold py-3.5 px-8 rounded-md transition-colors duration-200"
              >
                {isEn ? 'Consult for Free' : 'Konsultasi Gratis'}
              </a>
              <a
                href="/contact"
                className={`inline-block font-semibold py-3.5 px-8 rounded-md border transition-colors duration-200 ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-[#153969] text-[#153969] hover:bg-[#153969]/5'
                }`}
              >
                {isEn ? 'Contact Us' : 'Hubungi Kami'}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
