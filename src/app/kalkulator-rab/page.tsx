'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Calculator, Building2, MapPin, Layers, Sparkles, Clock, TrendingUp, ArrowRight, Download, MessageCircle, BarChart3, Info } from 'lucide-react';

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

const breakdownColors = [
  'bg-blue-600',
  'bg-blue-500',
  'bg-blue-400',
  'bg-cyan-500',
  'bg-amber-500',
  'bg-teal-500',
  'bg-indigo-400',
  'bg-orange-400',
  'bg-gray-400',
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCompact(amount: number): string {
  if (amount >= 1000000000) return `Rp ${(amount / 1000000000).toFixed(1)}M`;
  if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(0)} Jt`;
  return formatCurrency(amount);
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
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate RAB
  function calculateRAB() {
    setIsCalculating(true);

    // Small delay for UX feedback
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

      const duration = getDuration(area);

      // Get comparison with all regions sorted
      const comparison = (Object.keys(regionalMultiplier) as Region[])
        .filter((r) => r !== region)
        .map((r) => ({
          region: r,
          regionLabel: regionLabels[r],
          cost: Math.round(basePrice * qMul * regionalMultiplier[r] * fMul * area),
        }))
        .sort((a, b) => b.cost - a.cost)
        .slice(0, 4);

      setResult({
        totalCost: Math.round(totalCost),
        pricePerM2: Math.round(pricePerM2),
        breakdown,
        duration: duration.id,
        durationEn: duration.en,
        comparison,
      });

      setIsCalculating(false);
    }, 400);
  }

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-950 text-white' : 'bg-slate-50 text-gray-900'} transition-colors duration-300`}>
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[45vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f3d] via-[#153969] to-[#1e4d8a]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5"
              >
                <Calculator className="w-4 h-4 text-green-400" />
                <span className="text-white/90 text-sm font-medium">
                  {isEn ? 'Free Tool — No Registration Required' : 'Gratis — Tanpa Registrasi'}
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              >
                {isEn ? 'Construction Budget' : 'Kalkulator RAB'}
                <br />
                <span className="text-blue-300">
                  {isEn ? 'Calculator (RAB)' : 'Konstruksi'}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-base md:text-lg text-white/70 max-w-xl"
              >
                {isEn
                  ? 'Get instant cost estimates for your construction project with accurate regional pricing across Indonesia.'
                  : 'Dapatkan estimasi biaya instan untuk proyek konstruksi Anda dengan data harga regional di seluruh Indonesia.'}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Input Form - 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-2 rounded-2xl p-6 md:p-8 border ${
              isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            } shadow-lg shadow-black/5`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-[#153969]/10'}`}>
                <Calculator className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {isEn ? 'Project Details' : 'Detail Proyek'}
                </h2>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {isEn ? 'Configure your project specs' : 'Atur spesifikasi proyek Anda'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Building Type */}
              <div>
                <label className={`flex items-center gap-1.5 text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Building2 className="w-3.5 h-3.5" />
                  {isEn ? 'Building Type' : 'Tipe Bangunan'}
                </label>
                <select
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#153969]/50 transition-all ${
                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {(Object.keys(buildingTypeLabels) as BuildingType[]).map((type) => (
                    <option key={type} value={type}>
                      {isEn ? buildingTypeLabels[type].en : buildingTypeLabels[type].id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area & Floors - 2 column grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`flex items-center gap-1.5 text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Layers className="w-3.5 h-3.5" />
                    {isEn ? 'Area (m²)' : 'Luas (m²)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={area}
                    onChange={(e) => setArea(Math.max(1, Math.min(10000, parseInt(e.target.value) || 1)))}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#153969]/50 transition-all ${
                      isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`flex items-center gap-1.5 text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Building2 className="w-3.5 h-3.5" />
                    {isEn ? 'Floors' : 'Lantai'}
                  </label>
                  <select
                    value={floors}
                    onChange={(e) => setFloors(parseInt(e.target.value))}
                    className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#153969]/50 transition-all ${
                      isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    <option value={1}>1 {isEn ? 'Floor' : 'Lantai'}</option>
                    <option value={2}>2 {isEn ? 'Floors' : 'Lantai'}</option>
                    <option value={3}>3 {isEn ? 'Floors' : 'Lantai'}</option>
                  </select>
                </div>
              </div>

              {/* Quality */}
              <div>
                <label className={`flex items-center gap-1.5 text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {isEn ? 'Quality' : 'Kualitas'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(qualityLabels) as Quality[]).map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
                        quality === q
                          ? isDark
                            ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                            : 'bg-[#153969]/10 border-[#153969] text-[#153969]'
                          : isDark
                            ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {isEn ? qualityLabels[q].en : qualityLabels[q].id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div>
                <label className={`flex items-center gap-1.5 text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <MapPin className="w-3.5 h-3.5" />
                  {isEn ? 'Region' : 'Daerah'}
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as Region)}
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#153969]/50 transition-all ${
                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-gray-300'
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
                disabled={isCalculating}
                className={`w-full flex items-center justify-center gap-2 bg-[#153969] hover:bg-[#1e4d8a] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 mt-3 shadow-lg shadow-[#153969]/20 ${
                  isCalculating ? 'opacity-70 cursor-wait' : 'hover:shadow-xl hover:shadow-[#153969]/30 hover:-translate-y-0.5'
                }`}
              >
                {isCalculating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Calculator className="w-4 h-4" />
                )}
                {isCalculating
                  ? (isEn ? 'Calculating...' : 'Menghitung...')
                  : (isEn ? 'Calculate RAB' : 'Hitung RAB')}
              </button>
            </div>
          </motion.div>

          {/* Result Section - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  {/* Summary Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Total Cost */}
                    <div className={`rounded-2xl p-5 border ${
                      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                    } shadow-lg shadow-black/5`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded-lg ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                          <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {isEn ? 'Total Estimate' : 'Total Estimasi'}
                        </span>
                      </div>
                      <p className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {formatCompact(result.totalCost)}
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {formatCurrency(result.totalCost)}
                      </p>
                    </div>

                    {/* Price per m2 */}
                    <div className={`rounded-2xl p-5 border ${
                      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                    } shadow-lg shadow-black/5`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                          <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {isEn ? 'Per m²' : 'Per m²'}
                        </span>
                      </div>
                      <p className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {formatCompact(result.pricePerM2)}
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {regionLabels[region]}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className={`rounded-2xl p-5 border ${
                      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                    } shadow-lg shadow-black/5`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded-lg ${isDark ? 'bg-amber-500/10' : 'bg-amber-50'}`}>
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {isEn ? 'Duration' : 'Durasi'}
                        </span>
                      </div>
                      <p className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {isEn ? result.durationEn : result.duration}
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {area} m² · {floors} {isEn ? 'floor' : 'lantai'}
                      </p>
                    </div>
                  </div>

                  {/* Cost Breakdown - Visual Bars */}
                  <div className={`rounded-2xl p-6 border ${
                    isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                  } shadow-lg shadow-black/5`}>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {isEn ? 'Cost Breakdown' : 'Rincian Biaya'}
                      </h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                        9 {isEn ? 'components' : 'komponen'}
                      </span>
                    </div>

                    {/* Stacked bar visualization */}
                    <div className="flex h-3 rounded-full overflow-hidden mb-5">
                      {result.breakdown.map((item, index) => (
                        <div
                          key={index}
                          className={`${breakdownColors[index]} transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                          title={`${isEn ? item.labelEn : item.label}: ${item.percentage}%`}
                        />
                      ))}
                    </div>

                    {/* Breakdown items */}
                    <div className="space-y-3">
                      {result.breakdown.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${breakdownColors[index]}`} />
                          <span className={`text-sm flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {isEn ? item.labelEn : item.label}
                          </span>
                          <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {item.percentage}%
                          </span>
                          <span className={`text-sm font-medium tabular-nums ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regional Comparison */}
                  <div className={`rounded-2xl p-6 border ${
                    isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                  } shadow-lg shadow-black/5`}>
                    <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {isEn ? 'Regional Comparison' : 'Perbandingan Regional'}
                    </h3>

                    <div className="space-y-3">
                      {/* Selected region - highlighted */}
                      <div className={`flex items-center justify-between p-3 rounded-xl ${
                        isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-[#153969]/5 border border-[#153969]/10'
                      }`}>
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
                          <span className={`text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-[#153969]'}`}>
                            {regionLabels[region]}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-[#153969]/10 text-[#153969]'}`}>
                            {isEn ? 'Selected' : 'Dipilih'}
                          </span>
                        </div>
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatCurrency(result.totalCost)}
                        </span>
                      </div>

                      {/* Other regions */}
                      {result.comparison.map((item, index) => {
                        const diff = ((item.cost - result.totalCost) / result.totalCost * 100).toFixed(0);
                        const isMore = item.cost > result.totalCost;
                        return (
                          <div key={index} className={`flex items-center justify-between p-3 rounded-xl ${
                            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
                          }`}>
                            <div className="flex items-center gap-2">
                              <MapPin className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {item.regionLabel}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-xs font-medium ${isMore ? 'text-red-500' : 'text-green-500'}`}>
                                {isMore ? '+' : ''}{diff}%
                              </span>
                              <span className={`text-sm font-medium tabular-nums ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                {formatCurrency(item.cost)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className={`rounded-2xl p-6 border ${
                    isDark ? 'bg-gradient-to-br from-blue-900/30 to-gray-900 border-blue-800/30' : 'bg-gradient-to-br from-[#153969]/5 to-white border-[#153969]/10'
                  }`}>
                    <div className="flex items-start gap-3 mb-4">
                      <Info className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn
                          ? 'This is an initial estimate. For a detailed & accurate RAB, consult with our estimator team — it\'s free.'
                          : 'Ini adalah estimasi awal. Untuk RAB detail & akurat, konsultasi dengan tim estimator kami — gratis.'}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="https://wa.me/6281218127503?text=Halo%2C%20saya%20ingin%20konsultasi%20RAB%20detail%20untuk%20proyek%20saya."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#153969] hover:bg-[#1e4d8a] text-white font-medium py-3 px-5 rounded-xl transition-all duration-200 shadow-lg shadow-[#153969]/20 hover:shadow-xl hover:-translate-y-0.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {isEn ? 'Free Consultation' : 'Konsultasi Gratis'}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => alert(isEn ? 'PDF download feature coming soon!' : 'Fitur download PDF akan segera hadir!')}
                        className={`flex items-center justify-center gap-2 font-medium py-3 px-5 rounded-xl border transition-all duration-200 ${
                          isDark
                            ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`rounded-2xl p-10 md:p-14 border text-center ${
                    isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                  } shadow-lg shadow-black/5`}
                >
                  <div className={`inline-flex p-5 rounded-2xl mb-5 ${isDark ? 'bg-gray-800' : 'bg-slate-100'}`}>
                    <Calculator className={`w-10 h-10 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {isEn ? 'Configure your project' : 'Konfigurasi proyek Anda'}
                  </h3>
                  <p className={`text-sm max-w-sm mx-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {isEn
                      ? 'Fill in the building type, area, quality, and region to get an instant cost estimate.'
                      : 'Isi tipe bangunan, luas, kualitas, dan daerah untuk mendapatkan estimasi biaya instan.'}
                  </p>
                  <div className={`mt-6 flex items-center justify-center gap-6 text-xs ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                    <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> 5 {isEn ? 'types' : 'tipe'}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> 10 {isEn ? 'regions' : 'daerah'}</span>
                    <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> 3 {isEn ? 'qualities' : 'kualitas'}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
