'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Page Header - compact, tool-focused */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b pt-24 pb-8`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className={`flex items-center gap-2 text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Link href="/" className={`hover:${isDark ? 'text-blue-400' : 'text-[#153969]'}`}>
                    {isEn ? 'Home' : 'Beranda'}
                  </Link>
                  <span>/</span>
                  <Link href="/services" className={`hover:${isDark ? 'text-blue-400' : 'text-[#153969]'}`}>
                    {isEn ? 'Services' : 'Layanan'}
                  </Link>
                  <span>/</span>
                  <span className={isDark ? 'text-gray-200' : 'text-gray-900'}>
                    {isEn ? 'RAB Calculator' : 'Kalkulator RAB'}
                  </span>
                </div>
                <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {isEn ? 'Construction Budget Estimator' : 'Estimasi Anggaran Konstruksi'}
                </h1>
                <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isEn
                    ? 'Get instant cost estimates based on regional market data across Indonesia.'
                    : 'Dapatkan estimasi biaya instan berdasarkan data pasar regional di Indonesia.'}
                </p>
              </div>
              <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <span className={`inline-block w-2 h-2 rounded-full bg-green-500`} />
                {isEn ? 'Data updated Q1 2024' : 'Data diperbarui Q1 2024'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Form Panel */}
            <div className="lg:col-span-4">
              <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5 sticky top-24`}>
                <h2 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isEn ? 'Project Parameters' : 'Parameter Proyek'}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {isEn ? 'Building Type' : 'Tipe Bangunan'}
                    </label>
                    <select
                      value={buildingType}
                      onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                      className={`w-full rounded border px-3 py-2 text-sm ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-[#153969]`}
                    >
                      {(Object.keys(buildingTypeLabels) as BuildingType[]).map((type) => (
                        <option key={type} value={type}>
                          {isEn ? buildingTypeLabels[type].en : buildingTypeLabels[type].id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isEn ? 'Area (m²)' : 'Luas (m²)'}
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10000}
                        value={area}
                        onChange={(e) => setArea(Math.max(1, parseInt(e.target.value) || 1))}
                        className={`w-full rounded border px-3 py-2 text-sm ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-[#153969]`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isEn ? 'Floors' : 'Lantai'}
                      </label>
                      <select
                        value={floors}
                        onChange={(e) => setFloors(parseInt(e.target.value))}
                        className={`w-full rounded border px-3 py-2 text-sm ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-[#153969]`}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {isEn ? 'Quality' : 'Kualitas'}
                    </label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value as Quality)}
                      className={`w-full rounded border px-3 py-2 text-sm ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
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
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {isEn ? 'Region' : 'Daerah'}
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as Region)}
                      className={`w-full rounded border px-3 py-2 text-sm ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
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
                    className="w-full bg-[#153969] hover:bg-[#1e4d8a] text-white font-medium py-2.5 px-4 rounded text-sm transition-colors"
                  >
                    {isEn ? 'Calculate' : 'Hitung'}
                  </button>
                </div>

                <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {isEn
                      ? 'Estimates are based on average contractor pricing in selected region. Actual costs may vary.'
                      : 'Estimasi berdasarkan rata-rata harga kontraktor di daerah terpilih. Biaya aktual dapat berbeda.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-8">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Summary */}
                  <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {isEn ? 'Estimated Total' : 'Total Estimasi'}
                        </p>
                        <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatCurrency(result.totalCost)}
                        </p>
                      </div>
                      <div className="flex gap-6">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {isEn ? 'Per m²' : 'Per m²'}
                          </p>
                          <p className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                            {formatCurrency(result.pricePerM2)}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {isEn ? 'Duration' : 'Durasi'}
                          </p>
                          <p className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                            {isEn ? result.durationEn : result.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} flex flex-wrap gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className={`px-2 py-1 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {isEn ? buildingTypeLabels[buildingType].en : buildingTypeLabels[buildingType].id}
                      </span>
                      <span className={`px-2 py-1 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {area} m²
                      </span>
                      <span className={`px-2 py-1 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {floors} {isEn ? 'floor' : 'lantai'}
                      </span>
                      <span className={`px-2 py-1 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {isEn ? qualityLabels[quality].en : qualityLabels[quality].id}
                      </span>
                      <span className={`px-2 py-1 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {regionLabels[region]}
                      </span>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                    <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isEn ? 'Cost Breakdown' : 'Rincian Biaya'}
                    </h3>
                    <div className="space-y-2">
                      {result.breakdown.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-full flex-1`}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                {isEn ? item.labelEn : item.label}
                              </span>
                              <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                {formatCurrency(item.amount)}
                              </span>
                            </div>
                            <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              <div
                                className="h-full rounded-full bg-[#153969]"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                          <span className={`text-xs w-8 text-right ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {item.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regional Comparison */}
                  <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                    <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isEn ? 'Regional Comparison' : 'Perbandingan Regional'}
                    </h3>
                    <div className="space-y-2">
                      <div className={`flex items-center justify-between py-2 px-3 rounded text-sm font-medium ${
                        isDark ? 'bg-[#153969]/30 text-blue-300' : 'bg-[#153969]/5 text-[#153969]'
                      }`}>
                        <span>{regionLabels[region]}</span>
                        <span>{formatCurrency(result.totalCost)}</span>
                      </div>
                      {result.comparison.map((item, index) => (
                        <div key={index} className={`flex items-center justify-between py-2 px-3 rounded text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <span>{item.regionLabel}</span>
                          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                            {formatCurrency(item.cost)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          {isEn ? 'Need a detailed quotation?' : 'Butuh penawaran detail?'}
                        </p>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {isEn
                            ? 'Our estimator team can provide an accurate RAB based on your exact specifications.'
                            : 'Tim estimator kami dapat memberikan RAB akurat sesuai spesifikasi Anda.'}
                        </p>
                      </div>
                      <a
                        href="https://wa.me/6281218127503?text=Halo%2C%20saya%20ingin%20konsultasi%20RAB%20detail%20untuk%20proyek%20saya."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 bg-[#153969] hover:bg-[#1e4d8a] text-white text-sm font-medium py-2.5 px-5 rounded transition-colors"
                      >
                        {isEn ? 'Contact Estimator' : 'Hubungi Estimator'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-8 md:p-12`}>
                  <div className="max-w-md mx-auto text-center">
                    <div className={`text-5xl mb-4`}>📐</div>
                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {isEn ? 'Set your project parameters' : 'Atur parameter proyek Anda'}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isEn
                        ? 'Select building type, area, quality level, and region on the left panel, then click Calculate to get your budget estimate.'
                        : 'Pilih tipe bangunan, luas, kualitas, dan daerah pada panel kiri, lalu klik Hitung untuk mendapatkan estimasi anggaran.'}
                    </p>
                    <div className={`mt-6 grid grid-cols-3 gap-4 text-center`}>
                      <div className={`p-3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#153969]'}`}>10</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{isEn ? 'Regions' : 'Daerah'}</p>
                      </div>
                      <div className={`p-3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#153969]'}`}>5</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{isEn ? 'Types' : 'Tipe'}</p>
                      </div>
                      <div className={`p-3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#153969]'}`}>9</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{isEn ? 'Components' : 'Komponen'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
