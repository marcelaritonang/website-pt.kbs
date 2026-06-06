'use client';

import React, { useState } from 'react';
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

  // Form state
  const [buildingType, setBuildingType] = useState<BuildingType>('rumah');
  const [area, setArea] = useState<number>(100);
  const [floors, setFloors] = useState<number>(1);
  const [quality, setQuality] = useState<Quality>('standar');
  const [region, setRegion] = useState<Region>('jakarta');
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  // Calculate RAB
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

    // Get comparison with 3 other regions
    const otherRegions = (Object.keys(regionalMultiplier) as Region[])
      .filter((r) => r !== region)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const comparison = otherRegions.map((r) => ({
      region: r,
      regionLabel: regionLabels[r],
      cost: Math.round(basePrice * qMul * regionalMultiplier[r] * fMul * area),
    }));

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
    <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Hero Section */}
      <section className={`${isDark ? 'bg-blue-900' : 'bg-[#153969]'} pt-20 pb-16 relative transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {isEn ? 'Free Construction Budget Calculator' : 'Kalkulator RAB Gratis'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto"
          >
            {isEn
              ? 'Estimate your construction costs across various regions in Indonesia. Free, no registration required.'
              : 'Hitung estimasi biaya pembangunan di berbagai daerah Indonesia. Gratis, tanpa registrasi.'}
          </motion.p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className={`rounded-lg p-6 md:p-8 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}
          >
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-[#153969]'}`}>
              {isEn ? 'Project Details' : 'Detail Proyek'}
            </h2>

            <div className="space-y-5">
              {/* Building Type */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isEn ? 'Building Type' : 'Tipe Bangunan'}
                </label>
                <select
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                  className={`w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#153969] ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {(Object.keys(buildingTypeLabels) as BuildingType[]).map((type) => (
                    <option key={type} value={type}>
                      {isEn ? buildingTypeLabels[type].en : buildingTypeLabels[type].id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isEn ? 'Building Area (m²)' : 'Luas Bangunan (m²)'}
                </label>
                <input
                  type="number"
                  min={1}
                  value={area}
                  onChange={(e) => setArea(Math.max(1, parseInt(e.target.value) || 1))}
                  className={`w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#153969] ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Floors */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isEn ? 'Number of Floors' : 'Jumlah Lantai'}
                </label>
                <select
                  value={floors}
                  onChange={(e) => setFloors(parseInt(e.target.value))}
                  className={`w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#153969] ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value={1}>1 {isEn ? 'Floor' : 'Lantai'}</option>
                  <option value={2}>2 {isEn ? 'Floors' : 'Lantai'}</option>
                  <option value={3}>3 {isEn ? 'Floors' : 'Lantai'}</option>
                </select>
              </div>

              {/* Quality */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isEn ? 'Quality' : 'Kualitas'}
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as Quality)}
                  className={`w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#153969] ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {(Object.keys(qualityLabels) as Quality[]).map((q) => (
                    <option key={q} value={q}>
                      {isEn ? qualityLabels[q].en : qualityLabels[q].id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isEn ? 'Region' : 'Daerah'}
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as Region)}
                  className={`w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#153969] ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {(Object.keys(regionLabels) as Region[]).map((r) => (
                    <option key={r} value={r}>
                      {regionLabels[r]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateRAB}
                className="w-full bg-[#153969] hover:bg-[#1e4d8a] text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 mt-2"
              >
                {isEn ? 'Calculate RAB' : 'Hitung RAB'}
              </button>
            </div>
          </motion.div>

          {/* Result Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            {result ? (
              <>
                {/* Total Cost Card */}
                <motion.div
                  variants={fadeIn}
                  className={`rounded-lg p-6 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}
                >
                  <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isEn ? 'Estimated Total Cost' : 'Estimasi Total Biaya'}
                  </h3>
                  <p className="text-2xl md:text-3xl font-bold text-[#153969] dark:text-blue-400">
                    {formatCurrency(result.totalCost)}
                  </p>
                  <div className={`mt-3 flex flex-wrap gap-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>
                      {isEn ? `Price per m² in ${regionLabels[region]}` : `Harga per m² di ${regionLabels[region]}`}: <strong>{formatCurrency(result.pricePerM2)}</strong>
                    </span>
                    <span>
                      {isEn ? 'Estimated Duration' : 'Estimasi Durasi'}: <strong>{isEn ? result.durationEn : result.duration}</strong>
                    </span>
                  </div>
                </motion.div>

                {/* Breakdown Table */}
                <motion.div
                  variants={fadeIn}
                  className={`rounded-lg p-6 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}
                >
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#153969]'}`}>
                    {isEn ? 'Cost Breakdown' : 'Rincian Biaya'}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className="text-left py-2 font-medium">{isEn ? 'Component' : 'Komponen'}</th>
                          <th className="text-center py-2 font-medium">%</th>
                          <th className="text-right py-2 font-medium">{isEn ? 'Amount' : 'Jumlah'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.breakdown.map((item, index) => (
                          <tr key={index} className={`border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}>
                            <td className="py-2">{isEn ? item.labelEn : item.label}</td>
                            <td className="py-2 text-center">{item.percentage}%</td>
                            <td className="py-2 text-right">{formatCurrency(item.amount)}</td>
                          </tr>
                        ))}
                        <tr className="font-semibold">
                          <td className="py-2">Total</td>
                          <td className="py-2 text-center">100%</td>
                          <td className="py-2 text-right">{formatCurrency(result.totalCost)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Regional Comparison */}
                <motion.div
                  variants={fadeIn}
                  className={`rounded-lg p-6 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}
                >
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#153969]'}`}>
                    {isEn ? 'Regional Price Comparison' : 'Perbandingan Harga Regional'}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className="text-left py-2 font-medium">{isEn ? 'Region' : 'Daerah'}</th>
                          <th className="text-right py-2 font-medium">{isEn ? 'Estimated Cost' : 'Estimasi Biaya'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={`border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100'} font-medium`}>
                          <td className="py-2">{regionLabels[region]} ({isEn ? 'selected' : 'dipilih'})</td>
                          <td className="py-2 text-right">{formatCurrency(result.totalCost)}</td>
                        </tr>
                        {result.comparison.map((item, index) => (
                          <tr key={index} className={`border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}>
                            <td className="py-2">{item.regionLabel}</td>
                            <td className="py-2 text-right">{formatCurrency(item.cost)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Disclaimer and CTAs */}
                <motion.div
                  variants={fadeIn}
                  className={`rounded-lg p-6 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                >
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-5`}>
                    {isEn
                      ? 'Disclaimer: This estimate is an approximation. Actual prices may differ depending on field conditions and detailed specifications.'
                      : 'Disclaimer: Estimasi ini bersifat perkiraan. Harga aktual dapat berbeda tergantung kondisi lapangan dan spesifikasi detail.'}
                  </p>

                  <div className="space-y-3">
                    <a
                      href="https://wa.me/6281218127503?text=Halo%2C%20saya%20ingin%20konsultasi%20RAB%20detail%20untuk%20proyek%20saya."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-[#153969] hover:bg-[#1e4d8a] text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
                    >
                      {isEn
                        ? 'Want a detailed & accurate RAB? Free consultation with our estimator team'
                        : 'Ingin RAB detail & akurat? Konsultasi gratis dengan tim estimator kami'}
                    </a>
                    <button
                      onClick={() => alert(isEn ? 'PDF download feature coming soon!' : 'Fitur download PDF akan segera hadir!')}
                      className={`block w-full text-center font-medium py-3 px-6 rounded-md border transition-colors duration-200 ${
                        isDark
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-[#153969] hover:bg-gray-100'
                      }`}
                    >
                      {isEn ? 'Download PDF RAB' : 'Download PDF RAB'}
                    </button>
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                variants={fadeIn}
                className={`rounded-lg p-8 border text-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}
              >
                <div className={`text-4xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.25-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.25-2.25h.008v.008H15v-.008zm0 2.25h.008v.008H15v-.008zM9.75 3v2.25M14.25 3v2.25M3.75 7.5h16.5M3.75 7.5v11.25A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25V7.5" />
                  </svg>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {isEn ? 'Fill in the form to see the estimate' : 'Isi formulir untuk melihat estimasi'}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {isEn
                    ? 'Select building type, area, and other details, then click "Calculate RAB".'
                    : 'Pilih tipe bangunan, luas, dan detail lainnya, lalu klik "Hitung RAB".'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
