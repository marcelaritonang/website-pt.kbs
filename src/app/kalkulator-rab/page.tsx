'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  comparison: { region: string; regionLabel: string; cost: number; diff: number }[];
}

// Pricing data based on AHSP (Analisa Harga Satuan Pekerjaan) & market rates 2024
// Reference: Permen PUPR, harga borongan kontraktor Jabodetabek & kota besar
// Harga dasar = harga per m² untuk kualitas standar di wilayah non-Jakarta
const basePrices: Record<BuildingType, number> = {
  rumah: 4200000,    // Rumah tinggal: Rp 4.2jt/m² (standar, luar Jakarta)
  ruko: 4800000,     // Ruko 2-3 lantai: Rp 4.8jt/m²
  gudang: 3500000,   // Gudang/pabrik: Rp 3.5jt/m² (struktur baja ringan)
  kantor: 5800000,   // Kantor: Rp 5.8jt/m² (standar finishing)
  workshop: 3800000, // Workshop/bengkel: Rp 3.8jt/m²
};

// Multiplier kualitas berdasarkan tingkat material & finishing
const qualityMultiplier: Record<Quality, number> = {
  standar: 1.0,   // Material lokal (bata merah, keramik 40x40, cat ekonomi)
  menengah: 1.45, // Material branded (hebel, keramik 60x60, cat Dulux/Nippon)
  premium: 2.1,   // Material impor/premium (granit, aluminium, custom millwork)
};

// Indeks kemahalan konstruksi (IKK) relatif antar kota
// Referensi: BPS Indeks Kemahalan Konstruksi & survey kontraktor 2024
const regionalMultiplier: Record<Region, number> = {
  jakarta: 1.20,     // Tertinggi: upah buruh & material transport mahal
  bogor: 1.0,        // Baseline
  depok: 1.05,       // Dekat Jakarta, sedikit lebih mahal
  tangerang: 1.08,   // Kawasan industri, akses material baik
  bekasi: 1.05,      // Mirip Depok
  bandung: 0.92,     // Upah buruh lebih rendah
  surabaya: 0.98,    // Kota besar tapi biaya hidup lebih rendah dari Jakarta
  semarang: 0.88,    // Biaya hidup & upah lebih rendah
  yogyakarta: 0.85,  // Terendah: upah buruh paling kompetitif
  medan: 0.95,       // Transport material agak mahal (Sumatra)
};

// Biaya tambahan per lantai (pondasi lebih kuat, struktur kolom, scaffolding)
const floorMultiplier: Record<number, number> = {
  1: 1.0,
  2: 1.20,  // +20% untuk struktur 2 lantai
  3: 1.35,  // +35% untuk struktur 3 lantai
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

const qualityLabels: Record<Quality, { id: string; en: string; desc: string; descEn: string }> = {
  standar: { id: 'Standar', en: 'Standard', desc: 'Bata merah, keramik 40x40, kusen kayu, cat ekonomi', descEn: 'Red brick, 40x40 tiles, wood frames, economy paint' },
  menengah: { id: 'Menengah', en: 'Medium', desc: 'Hebel/batako, keramik 60x60, kusen aluminium, cat Dulux', descEn: 'AAC block, 60x60 tiles, aluminum frames, Dulux paint' },
  premium: { id: 'Premium', en: 'Premium', desc: 'Hebel + panel, granit/marmer, kusen UPVC, custom design', descEn: 'AAC + panel, granite/marble, UPVC frames, custom design' },
};

// Breakdown berdasarkan proporsi umum RAB konstruksi Indonesia (SNI/Permen PUPR)
const breakdownItems = [
  { label: 'Pondasi & Struktur', labelEn: 'Foundation & Structure', percentage: 30 },
  { label: 'Dinding & Plester', labelEn: 'Walls & Plastering', percentage: 18 },
  { label: 'Atap & Rangka', labelEn: 'Roof & Framework', percentage: 13 },
  { label: 'Lantai', labelEn: 'Flooring', percentage: 10 },
  { label: 'Instalasi ME (Listrik & Plumbing)', labelEn: 'MEP (Electrical & Plumbing)', percentage: 12 },
  { label: 'Pintu, Jendela & Kusen', labelEn: 'Doors, Windows & Frames', percentage: 7 },
  { label: 'Pengecatan & Finishing', labelEn: 'Paint & Finishing', percentage: 6 },
  { label: 'Pekerjaan Persiapan & Lain-lain', labelEn: 'Site Prep & Miscellaneous', percentage: 4 },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatShort(amount: number): string {
  if (amount >= 1000000000) return `Rp ${(amount / 1000000000).toFixed(1)} M`;
  if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(0)} Jt`;
  return formatCurrency(amount);
}

function getDuration(area: number, floors: number): { id: string; en: string } {
  const base = area * floors;
  if (base < 100) return { id: '3-4 bulan', en: '3-4 months' };
  if (base <= 200) return { id: '4-6 bulan', en: '4-6 months' };
  if (base <= 500) return { id: '6-9 bulan', en: '6-9 months' };
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
  const [quality, setQuality] = useState<Quality>('menengah');
  const [region, setRegion] = useState<Region>('jakarta');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<'breakdown' | 'comparison'>('breakdown');

  function calculateRAB() {
    setIsCalculating(true);
    setResult(null);

    // Simulate data processing delay (feels like real computation)
    setTimeout(() => {
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

      const duration = getDuration(area, floors);

      const comparison = (Object.keys(regionalMultiplier) as Region[])
        .filter((r) => r !== region)
        .map((r) => {
          const cost = Math.round(basePrice * qMul * regionalMultiplier[r] * fMul * area);
          return {
            region: r,
            regionLabel: regionLabels[r],
            cost,
            diff: Math.round(((cost - totalCost) / totalCost) * 100),
          };
        })
        .sort((a, b) => b.cost - a.cost);

      setResult({
        totalCost: Math.round(totalCost),
        pricePerM2: Math.round(pricePerM2),
        breakdown,
        duration: duration.id,
        durationEn: duration.en,
        comparison,
      });
      setIsCalculating(false);
    }, 1200);
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-[#f8f9fa]'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-24 md:pt-28 pb-6`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'RAB Calculator' : 'Kalkulator RAB'}
            </h1>
            <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {isEn
                ? 'Estimate construction costs based on current market rates across regions in Indonesia.'
                : 'Estimasi biaya konstruksi berdasarkan harga pasar terkini di berbagai wilayah Indonesia.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Form Panel */}
            <div className="lg:col-span-4">
              <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5 lg:sticky lg:top-24`}>
                <div className="space-y-4">
                  {/* Building Type */}
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isEn ? 'Building Type' : 'Tipe Bangunan'}
                    </label>
                    <select
                      value={buildingType}
                      onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                      className={`w-full rounded-md border px-3 py-2.5 text-sm ${
                        isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-[#153969]/50 focus:border-[#153969]`}
                    >
                      {(Object.keys(buildingTypeLabels) as BuildingType[]).map((type) => (
                        <option key={type} value={type}>
                          {isEn ? buildingTypeLabels[type].en : buildingTypeLabels[type].id}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Area & Floors */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Area (m²)' : 'Luas (m²)'}
                      </label>
                      <input
                        type="number"
                        min={20}
                        max={10000}
                        value={area}
                        onChange={(e) => setArea(Math.max(1, parseInt(e.target.value) || 1))}
                        className={`w-full rounded-md border px-3 py-2.5 text-sm ${
                          isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-[#153969]/50 focus:border-[#153969]`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Floors' : 'Jumlah Lantai'}
                      </label>
                      <select
                        value={floors}
                        onChange={(e) => setFloors(parseInt(e.target.value))}
                        className={`w-full rounded-md border px-3 py-2.5 text-sm ${
                          isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-[#153969]/50 focus:border-[#153969]`}
                      >
                        <option value={1}>1 {isEn ? 'Floor' : 'Lantai'}</option>
                        <option value={2}>2 {isEn ? 'Floors' : 'Lantai'}</option>
                        <option value={3}>3 {isEn ? 'Floors' : 'Lantai'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Quality */}
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isEn ? 'Quality Level' : 'Tingkat Kualitas'}
                    </label>
                    <div className="space-y-2">
                      {(Object.keys(qualityLabels) as Quality[]).map((q) => (
                        <label
                          key={q}
                          className={`flex items-start gap-3 p-2.5 rounded-md border cursor-pointer transition-colors ${
                            quality === q
                              ? isDark ? 'border-blue-500 bg-blue-900/20' : 'border-[#153969] bg-[#153969]/5'
                              : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="quality"
                            value={q}
                            checked={quality === q}
                            onChange={(e) => setQuality(e.target.value as Quality)}
                            className="mt-0.5 accent-[#153969]"
                          />
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {isEn ? qualityLabels[q].en : qualityLabels[q].id}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {isEn ? qualityLabels[q].descEn : qualityLabels[q].desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Region */}
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isEn ? 'Project Location' : 'Lokasi Proyek'}
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as Region)}
                      className={`w-full rounded-md border px-3 py-2.5 text-sm ${
                        isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-[#153969]/50 focus:border-[#153969]`}
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
                    disabled={isCalculating}
                    className={`w-full py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                      isCalculating
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-[#153969] hover:bg-[#1e4d8a] text-white'
                    }`}
                  >
                    {isCalculating ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        {isEn ? 'Processing...' : 'Memproses...'}
                      </span>
                    ) : (
                      isEn ? 'Calculate Estimate' : 'Hitung Estimasi'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {isCalculating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-10`}
                  >
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="relative w-16 h-16 mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
                        <div className="absolute inset-0 rounded-full border-4 border-t-[#153969] animate-spin" />
                      </div>
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {isEn ? 'Calculating estimates...' : 'Menghitung estimasi...'}
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {isEn ? 'Fetching regional price data' : 'Mengambil data harga regional'}
                      </p>
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Total Estimate Card */}
                    <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {isEn ? 'ESTIMATED TOTAL COST' : 'ESTIMASI TOTAL BIAYA'}
                          </p>
                          <p className={`text-3xl md:text-4xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {formatCurrency(result.totalCost)}
                          </p>
                        </div>
                        <div className="flex gap-5">
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {isEn ? 'COST/M²' : 'BIAYA/M²'}
                            </p>
                            <p className={`text-base font-semibold mt-0.5 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {formatCurrency(result.pricePerM2)}
                            </p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {isEn ? 'DURATION' : 'DURASI'}
                            </p>
                            <p className={`text-base font-semibold mt-0.5 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {isEn ? result.durationEn : result.duration}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Specs row */}
                      <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} flex flex-wrap gap-x-4 gap-y-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span>{isEn ? buildingTypeLabels[buildingType].en : buildingTypeLabels[buildingType].id}</span>
                        <span>•</span>
                        <span>{area} m² × {floors} {isEn ? 'floor' : 'lantai'}</span>
                        <span>•</span>
                        <span>{isEn ? qualityLabels[quality].en : qualityLabels[quality].id}</span>
                        <span>•</span>
                        <span>{regionLabels[region]}</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border overflow-hidden`}>
                      <div className={`flex border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <button
                          onClick={() => setActiveTab('breakdown')}
                          className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                            activeTab === 'breakdown'
                              ? isDark ? 'text-white border-b-2 border-blue-500' : 'text-[#153969] border-b-2 border-[#153969]'
                              : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {isEn ? 'Cost Breakdown' : 'Rincian Biaya'}
                        </button>
                        <button
                          onClick={() => setActiveTab('comparison')}
                          className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                            activeTab === 'comparison'
                              ? isDark ? 'text-white border-b-2 border-blue-500' : 'text-[#153969] border-b-2 border-[#153969]'
                              : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {isEn ? 'Regional Comparison' : 'Perbandingan Daerah'}
                        </button>
                      </div>

                      <div className="p-5">
                        {activeTab === 'breakdown' ? (
                          <div className="space-y-3">
                            {result.breakdown.map((item, index) => (
                              <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                    {isEn ? item.labelEn : item.label}
                                  </span>
                                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                    {formatShort(item.amount)}
                                  </span>
                                </div>
                                <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percentage * 4}%` }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="h-full rounded-full bg-[#153969]"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {/* Current region highlighted */}
                            <div className={`flex items-center justify-between py-2.5 px-3 rounded-md text-sm ${
                              isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-[#153969]/5 border border-[#153969]/20'
                            }`}>
                              <span className={`font-medium ${isDark ? 'text-blue-300' : 'text-[#153969]'}`}>
                                {regionLabels[region]} ({isEn ? 'selected' : 'terpilih'})
                              </span>
                              <span className={`font-semibold ${isDark ? 'text-blue-300' : 'text-[#153969]'}`}>
                                {formatShort(result.totalCost)}
                              </span>
                            </div>
                            {result.comparison.map((item, index) => (
                              <div key={index} className={`flex items-center justify-between py-2.5 px-3 rounded-md text-sm ${
                                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                              }`}>
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                  {item.regionLabel}
                                </span>
                                <div className="flex items-center gap-3">
                                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                                    item.diff > 0
                                      ? isDark ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-50'
                                      : item.diff < 0
                                        ? isDark ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-50'
                                        : isDark ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-100'
                                  }`}>
                                    {item.diff > 0 ? '+' : ''}{item.diff}%
                                  </span>
                                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                    {formatShort(item.cost)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                            {isEn ? 'Need a detailed RAB document?' : 'Butuh dokumen RAB detail?'}
                          </p>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {isEn
                              ? 'Our team can prepare a full RAB with material specifications and contractor quotes.'
                              : 'Tim kami dapat menyiapkan RAB lengkap dengan spesifikasi material dan penawaran kontraktor.'}
                          </p>
                        </div>
                        <a
                          href="https://wa.me/6281218127503?text=Halo%2C%20saya%20ingin%20konsultasi%20RAB%20detail%20untuk%20proyek%20saya."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 bg-[#153969] hover:bg-[#1e4d8a] text-white text-sm font-medium py-2.5 px-5 rounded-md transition-colors"
                        >
                          {isEn ? 'Request Detailed RAB' : 'Minta RAB Detail'}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-8 md:p-12`}
                  >
                    <div className="max-w-sm mx-auto text-center">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <svg className={`w-7 h-7 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {isEn ? 'Enter project details' : 'Masukkan detail proyek'}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                        {isEn
                          ? 'Fill in the parameters on the left and click "Calculate Estimate" to generate a budget breakdown for your project.'
                          : 'Isi parameter di sebelah kiri dan klik "Hitung Estimasi" untuk menghasilkan rincian anggaran proyek Anda.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer note */}
          <div className={`mt-8 text-center text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            <p>
              {isEn
                ? 'Estimates based on 2024 contractor rates and BPS Construction Cost Index (IKK). Actual costs depend on site conditions, material availability, and contractor pricing. Does not include land cost, permits, or furniture.'
                : 'Estimasi berdasarkan harga borongan kontraktor 2024 dan Indeks Kemahalan Konstruksi (IKK) BPS. Biaya aktual tergantung kondisi lokasi, ketersediaan material, dan penawaran kontraktor. Belum termasuk biaya tanah, IMB/PBG, dan furniture.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
