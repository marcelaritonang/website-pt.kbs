'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  Building2, Store, Warehouse, Briefcase, Wrench,
  MapPin, Ruler, Layers, Calculator,
  Download, Share2, Bookmark, MessageCircle,
  TrendingUp, TrendingDown, Minus, Clock,
  ChevronRight, X, CheckCircle2, BarChart3,
} from 'lucide-react';
import {
  calculateRAB,
  validateRABInput,
  DEFAULT_PRICING,
  REGION_LABELS,
  BUILDING_TYPE_LABELS,
  QUALITY_LABELS,
  type RABPricing,
  type RABInput,
  type RABResult,
  type BuildingType,
  type Quality,
  type Region,
} from '@/lib/rab';

interface SavedScenario {
  id: string;
  input: RABInput;
  result: RABResult;
  createdAt: string;
}

const BUILDING_ICONS: Record<BuildingType, React.ReactNode> = {
  rumah: <Building2 className="w-5 h-5" />,
  ruko: <Store className="w-5 h-5" />,
  gudang: <Warehouse className="w-5 h-5" />,
  kantor: <Briefcase className="w-5 h-5" />,
  workshop: <Wrench className="w-5 h-5" />,
};


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

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem('rab_session_id');
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem('rab_session_id', sid);
  }
  return sid;
}

// Animated counter component
function AnimatedNumber({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.round(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{formatCurrency(display)}</>;
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
  const [quality, setQuality] = useState<Quality>('menengah');
  const [region, setRegion] = useState<Region>('jakarta');

  // Result state
  const [result, setResult] = useState<RABResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<'breakdown' | 'comparison'>('breakdown');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Pricing from API
  const [pricing, setPricing] = useState<RABPricing>(DEFAULT_PRICING);

  // Saved scenarios
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [showScenarios, setShowScenarios] = useState(false);

  // Lead form
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', company: '', message: '' });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  // Copied link feedback
  const [copied, setCopied] = useState(false);

  // Load pricing from API on mount
  useEffect(() => {
    fetch('/api/rab/pricing')
      .then((res) => res.json())
      .then((data) => {
        if (data.pricing) setPricing(data.pricing);
      })
      .catch(() => {});
  }, []);

  // Load saved scenarios from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rab_scenarios');
      if (saved) setSavedScenarios(JSON.parse(saved));
    } catch {}
  }, []);

  // Load from URL params (share link)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('type');
    const a = params.get('area');
    const f = params.get('floors');
    const q = params.get('quality');
    const r = params.get('region');

    if (t) setBuildingType(t as BuildingType);
    if (a) setArea(parseInt(a));
    if (f) setFloors(parseInt(f));
    if (q) setQuality(q as Quality);
    if (r) setRegion(r as Region);
  }, []);

  const saveScenarios = useCallback((scenarios: SavedScenario[]) => {
    setSavedScenarios(scenarios);
    localStorage.setItem('rab_scenarios', JSON.stringify(scenarios));
  }, []);

  async function handleCalculate() {
    setValidationError(null);

    const input: RABInput = { buildingType, area, floors, quality, region };
    const error = validateRABInput(input);
    if (error) {
      setValidationError(error);
      return;
    }

    setIsCalculating(true);
    setResult(null);

    try {
      const res = await fetch('/api/rab/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, sessionId: getSessionId() }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data.result);
        setIsCalculating(false);
        return;
      }
    } catch {}

    // Local fallback
    const localResult = calculateRAB(input, pricing);
    setResult(localResult);
    setIsCalculating(false);
  }

  function handleSaveScenario() {
    if (!result) return;
    const input: RABInput = { buildingType, area, floors, quality, region };
    const scenario: SavedScenario = {
      id: crypto.randomUUID(),
      input,
      result,
      createdAt: new Date().toISOString(),
    };
    const updated = [scenario, ...savedScenarios].slice(0, 5);
    saveScenarios(updated);
  }

  function handleDeleteScenario(id: string) {
    const updated = savedScenarios.filter((s) => s.id !== id);
    saveScenarios(updated);
  }

  function handleLoadScenario(scenario: SavedScenario) {
    setBuildingType(scenario.input.buildingType);
    setArea(scenario.input.area);
    setFloors(scenario.input.floors);
    setQuality(scenario.input.quality);
    setRegion(scenario.input.region);
    setResult(scenario.result);
    setShowScenarios(false);
  }

  function getShareLink(): string {
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams({
      type: buildingType,
      area: area.toString(),
      floors: floors.toString(),
      quality,
      region,
    });
    return `${base}/kalkulator-rab?${params.toString()}`;
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(getShareLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePrintPDF() {
    if (!result) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const typeLabel = isEn ? BUILDING_TYPE_LABELS[buildingType].en : BUILDING_TYPE_LABELS[buildingType].id;
    const qualLabel = isEn ? QUALITY_LABELS[quality].en : QUALITY_LABELS[quality].id;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>RAB Estimasi - PT Karya Bangun Semesta</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1a1a1a; max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #153969; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 20px; font-weight: bold; color: #153969; }
          .logo small { display: block; font-size: 11px; color: #666; font-weight: normal; }
          .date { font-size: 12px; color: #666; text-align: right; }
          h1 { font-size: 18px; color: #153969; margin: 0 0 20px; }
          .total-box { background: #f0f4f8; border-left: 4px solid #153969; padding: 20px; margin: 20px 0; }
          .total-box .amount { font-size: 28px; font-weight: bold; color: #153969; }
          .total-box .per-m2 { font-size: 14px; color: #555; margin-top: 4px; }
          .specs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 20px 0; }
          .spec-item { background: #f9f9f9; padding: 10px 14px; border-radius: 4px; }
          .spec-item label { font-size: 11px; color: #888; text-transform: uppercase; }
          .spec-item value { display: block; font-size: 14px; font-weight: 600; margin-top: 2px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { text-align: left; padding: 10px 12px; background: #153969; color: white; font-size: 12px; }
          td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 13px; }
          td:last-child { text-align: right; font-weight: 600; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #888; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">
            PT Karya Bangun Semesta
            <small>Construction & Building Services</small>
          </div>
          <div class="date">
            ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br/>
            Ref: RAB-${Date.now().toString(36).toUpperCase()}
          </div>
        </div>

        <h1>${isEn ? 'Construction Cost Estimate (RAB)' : 'Estimasi Rencana Anggaran Biaya (RAB)'}</h1>

        <div class="total-box">
          <div class="amount">${formatCurrency(result.totalCost)}</div>
          <div class="per-m2">${formatCurrency(result.pricePerM2)} / m²  •  ${isEn ? 'Duration' : 'Durasi'}: ${isEn ? result.durationEn : result.duration}</div>
        </div>

        <div class="specs">
          <div class="spec-item"><label>${isEn ? 'Building Type' : 'Tipe Bangunan'}</label><value>${typeLabel}</value></div>
          <div class="spec-item"><label>${isEn ? 'Area' : 'Luas Bangunan'}</label><value>${area} m²</value></div>
          <div class="spec-item"><label>${isEn ? 'Floors' : 'Jumlah Lantai'}</label><value>${floors}</value></div>
          <div class="spec-item"><label>${isEn ? 'Quality' : 'Kualitas'}</label><value>${qualLabel}</value></div>
          <div class="spec-item"><label>${isEn ? 'Location' : 'Lokasi'}</label><value>${REGION_LABELS[region]}</value></div>
          <div class="spec-item"><label>${isEn ? 'Duration' : 'Estimasi Durasi'}</label><value>${isEn ? result.durationEn : result.duration}</value></div>
        </div>

        <h2 style="font-size: 15px; color: #153969; margin-top: 30px;">${isEn ? 'Cost Breakdown' : 'Rincian Biaya'}</h2>
        <table>
          <thead>
            <tr>
              <th>${isEn ? 'Work Item' : 'Item Pekerjaan'}</th>
              <th style="text-align:center;">%</th>
              <th style="text-align:right;">${isEn ? 'Amount' : 'Jumlah'}</th>
            </tr>
          </thead>
          <tbody>
            ${result.breakdown.map((item) => `
              <tr>
                <td>${isEn ? item.labelEn : item.label}</td>
                <td style="text-align:center;">${item.percentage}%</td>
                <td>${formatCurrency(item.amount)}</td>
              </tr>
            `).join('')}
            <tr style="font-weight: bold; border-top: 2px solid #153969;">
              <td colspan="2"><strong>TOTAL</strong></td>
              <td>${formatCurrency(result.totalCost)}</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <p><strong>${isEn ? 'Disclaimer' : 'Catatan'}:</strong> ${isEn
            ? 'This estimate is based on 2024 contractor rates and BPS Construction Cost Index (IKK). Actual costs depend on site conditions, material availability, and contractor pricing. Does not include land cost, permits (IMB/PBG), or furniture.'
            : 'Estimasi berdasarkan harga borongan kontraktor 2024 dan Indeks Kemahalan Konstruksi (IKK) BPS. Biaya aktual tergantung kondisi lokasi, ketersediaan material, dan penawaran kontraktor. Belum termasuk biaya tanah, IMB/PBG, dan furniture.'}</p>
          <p style="margin-top: 12px;">PT Karya Bangun Semesta • WhatsApp: 0812-1812-7503 • www.karyabangunsemesta.com</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  async function handleSubmitLead(e: React.FormEvent) {
    e.preventDefault();
    setLeadSubmitting(true);

    try {
      await fetch('/api/rab/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          buildingType,
          area,
          floors,
          quality,
          region,
          estimatedCost: result?.totalCost || 0,
        }),
      });
      setLeadSuccess(true);
      setTimeout(() => {
        setShowLeadForm(false);
        setLeadSuccess(false);
        setLeadForm({ name: '', phone: '', email: '', company: '', message: '' });
      }, 2000);
    } catch {}
    setLeadSubmitting(false);
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a1628]' : 'bg-[#f8fafc]'}`}>

      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden pt-20 pb-10 md:pt-24 md:pb-12">
        {/* Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark
            ? 'bg-gradient-to-br from-[#0a1628] via-[#112240] to-[#153969]'
            : 'bg-gradient-to-br from-[#153969] via-[#1e4d8a] to-[#2563eb]'
          }`} />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {isEn ? 'RAB Calculator' : 'Kalkulator RAB'}
              </h1>
              <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto">
                {isEn
                  ? 'Get instant construction cost estimates based on current market rates and regional indices across Indonesia.'
                  : 'Estimasi biaya konstruksi instan berdasarkan harga pasar terkini dan indeks regional di seluruh Indonesia.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <section className="relative container mx-auto px-4 md:px-8 -mt-4 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* Saved Scenarios Badge */}
          {savedScenarios.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end mb-4"
            >
              <button
                onClick={() => setShowScenarios(!showScenarios)}
                className={`inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border transition-all ${
                  isDark
                    ? 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700/80'
                    : 'bg-white/80 border-gray-200 text-gray-600 hover:bg-white'
                } backdrop-blur-sm`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {isEn ? `${savedScenarios.length} Saved` : `${savedScenarios.length} Tersimpan`}
              </button>
            </motion.div>
          )}

          {/* Saved Scenarios Panel */}
          <AnimatePresence>
            {showScenarios && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className={`rounded-xl ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} border backdrop-blur-xl p-4`}>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {isEn ? 'Saved Scenarios' : 'Skenario Tersimpan'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {savedScenarios.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleLoadScenario(s)}
                        className={`p-3 rounded-lg border cursor-pointer group transition-all ${
                          isDark
                            ? 'border-gray-700 hover:border-blue-500/50 hover:bg-gray-700/50'
                            : 'border-gray-200 hover:border-[#153969]/30 hover:bg-[#153969]/5'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {formatShort(s.result.totalCost)}
                            </p>
                            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {isEn ? BUILDING_TYPE_LABELS[s.input.buildingType].en : BUILDING_TYPE_LABELS[s.input.buildingType].id} • {s.input.area}m²
                            </p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteScenario(s.id); }}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 p-1 transition-opacity"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ========== FORM PANEL ========== */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`rounded-2xl ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} border backdrop-blur-xl p-6 shadow-lg shadow-black/5`}
              >
                {/* Building Type — Icon Grid */}
                <div className="mb-5">
                  <label className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Building2 className="w-3.5 h-3.5" />
                    {isEn ? 'Building Type' : 'Tipe Bangunan'}
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {(Object.keys(BUILDING_TYPE_LABELS) as BuildingType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setBuildingType(type)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                          buildingType === type
                            ? isDark
                              ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                              : 'border-[#153969] bg-[#153969]/10 text-[#153969]'
                            : isDark
                              ? 'border-gray-700 text-gray-400 hover:border-gray-600 hover:bg-gray-700/50'
                              : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {BUILDING_ICONS[type]}
                        <span className="text-[10px] font-medium leading-tight text-center">
                          {isEn ? BUILDING_TYPE_LABELS[type].en.split(' ')[0] : BUILDING_TYPE_LABELS[type].id.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area & Floors */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Ruler className="w-3.5 h-3.5" />
                      {isEn ? 'Area (m²)' : 'Luas (m²)'}
                    </label>
                    <input
                      type="number"
                      min={20}
                      max={5000}
                      value={area}
                      onChange={(e) => {
                        setArea(parseInt(e.target.value) || 0);
                        setValidationError(null);
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-sm font-medium ${
                        isDark
                          ? 'bg-gray-900/50 border-gray-700 text-white focus:border-blue-500'
                          : 'bg-white border-gray-200 text-gray-900 focus:border-[#153969]'
                      } focus:outline-none focus:ring-2 focus:ring-[#153969]/20 transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Layers className="w-3.5 h-3.5" />
                      {isEn ? 'Floors' : 'Lantai'}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFloors(f)}
                          className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                            floors === f
                              ? isDark
                                ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                                : 'border-[#153969] bg-[#153969]/10 text-[#153969]'
                              : isDark
                                ? 'border-gray-700 text-gray-400 hover:border-gray-600'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quality */}
                <div className="mb-5">
                  <label className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Layers className="w-3.5 h-3.5" />
                    {isEn ? 'Quality Level' : 'Tingkat Kualitas'}
                  </label>
                  <div className="space-y-2">
                    {(Object.keys(QUALITY_LABELS) as Quality[]).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                          quality === q
                            ? isDark
                              ? 'border-blue-500/50 bg-blue-500/5 ring-2 ring-blue-500/20'
                              : 'border-[#153969]/50 bg-[#153969]/5 ring-2 ring-[#153969]/20'
                            : isDark
                              ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-700/30'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                            {isEn ? QUALITY_LABELS[q].en : QUALITY_LABELS[q].id}
                          </p>
                          <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {isEn ? QUALITY_LABELS[q].descEn : QUALITY_LABELS[q].desc}
                          </p>
                        </div>
                        {quality === q && (
                          <CheckCircle2 className={`w-5 h-5 shrink-0 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div className="mb-5">
                  <label className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    {isEn ? 'Project Location' : 'Lokasi Proyek'}
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value as Region)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm font-medium appearance-none cursor-pointer ${
                      isDark
                        ? 'bg-gray-900/50 border-gray-700 text-white'
                        : 'bg-white border-gray-200 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-[#153969]/20 transition-all`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                  >
                    {(Object.keys(REGION_LABELS) as Region[]).map((r) => (
                      <option key={r} value={r}>
                        {REGION_LABELS[r]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Validation Error */}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-800/50"
                  >
                    ⚠️ {validationError}
                  </motion.div>
                )}

                {/* Calculate Button */}
                <button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className={`w-full py-3.5 px-6 rounded-xl text-sm font-semibold transition-all ${
                    isCalculating
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#153969] to-[#1e4d8a] hover:from-[#1e4d8a] hover:to-[#2563eb] text-white shadow-lg shadow-[#153969]/25 hover:shadow-xl hover:shadow-[#153969]/30 hover:-translate-y-0.5'
                  }`}
                >
                  {isCalculating ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      {isEn ? 'Calculating...' : 'Menghitung...'}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Calculator className="w-4 h-4" />
                      {isEn ? 'Calculate Estimate' : 'Hitung Estimasi'}
                    </span>
                  )}
                </button>
              </motion.div>
            </div>

            {/* ========== RESULTS PANEL ========== */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {isCalculating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-2xl ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} border backdrop-blur-xl p-10 shadow-lg shadow-black/5`}
                  >
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="relative w-20 h-20 mb-6">
                        <div className={`absolute inset-0 rounded-full border-[3px] ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                        <div className="absolute inset-0 rounded-full border-[3px] border-t-[#153969] animate-spin" />
                        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#153969]/10 to-transparent flex items-center justify-center">
                          <BarChart3 className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
                        </div>
                      </div>
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {isEn ? 'Calculating estimates...' : 'Menghitung estimasi...'}
                      </p>
                      <p className={`text-xs mt-1.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {isEn ? 'Fetching regional price data' : 'Mengambil data harga regional'}
                      </p>
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    {/* Total Estimate Card */}
                    <div className={`rounded-2xl ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} border backdrop-blur-xl overflow-hidden shadow-lg shadow-black/5`}>
                      {/* Gradient accent top */}
                      <div className="h-1 bg-gradient-to-r from-[#153969] via-[#2563eb] to-[#153969]" />

                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {isEn ? 'Estimated Total Cost' : 'Estimasi Total Biaya'}
                            </p>
                            <p className={`text-3xl md:text-4xl font-bold mt-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              <AnimatedNumber value={result.totalCost} />
                            </p>
                          </div>
                          <div className="flex gap-6">
                            <div className="text-center md:text-right">
                              <p className={`text-xs uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                {isEn ? 'Cost/m²' : 'Biaya/m²'}
                              </p>
                              <p className={`text-base font-bold mt-0.5 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                {formatCurrency(result.pricePerM2)}
                              </p>
                            </div>
                            <div className="text-center md:text-right">
                              <p className={`text-xs uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                <Clock className="w-3 h-3 inline-block mr-1" />
                                {isEn ? 'Duration' : 'Durasi'}
                              </p>
                              <p className={`text-base font-bold mt-0.5 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                {isEn ? result.durationEn : result.duration}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Specs tags */}
                        <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-100'} flex flex-wrap gap-2`}>
                          {[
                            { icon: <Building2 className="w-3 h-3" />, text: isEn ? BUILDING_TYPE_LABELS[buildingType].en : BUILDING_TYPE_LABELS[buildingType].id },
                            { icon: <Ruler className="w-3 h-3" />, text: `${area} m² × ${floors} ${isEn ? 'fl' : 'lt'}` },
                            { icon: <Layers className="w-3 h-3" />, text: isEn ? QUALITY_LABELS[quality].en : QUALITY_LABELS[quality].id },
                            { icon: <MapPin className="w-3 h-3" />, text: REGION_LABELS[region] },
                          ].map((tag, i) => (
                            <span
                              key={i}
                              className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg ${
                                isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {tag.icon} {tag.text}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-100'} flex flex-wrap gap-2`}>
                          {[
                            { icon: <Bookmark className="w-3.5 h-3.5" />, label: isEn ? 'Save' : 'Simpan', onClick: handleSaveScenario },
                            { icon: <Download className="w-3.5 h-3.5" />, label: 'PDF', onClick: handlePrintPDF },
                            { icon: <Share2 className="w-3.5 h-3.5" />, label: copied ? '✓' : 'Link', onClick: handleCopyLink },
                          ].map((btn, i) => (
                            <button
                              key={i}
                              onClick={btn.onClick}
                              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                                isDark
                                  ? 'border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600'
                                  : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                              }`}
                            >
                              {btn.icon} {btn.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Breakdown / Comparison Tabs */}
                    <div className={`rounded-2xl ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} border backdrop-blur-xl overflow-hidden shadow-lg shadow-black/5`}>
                      <div className={`flex border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}>
                        {[
                          { key: 'breakdown', label: isEn ? 'Cost Breakdown' : 'Rincian Biaya', icon: <BarChart3 className="w-3.5 h-3.5" /> },
                          { key: 'comparison', label: isEn ? 'Regional Comparison' : 'Perbandingan Daerah', icon: <MapPin className="w-3.5 h-3.5" /> },
                        ].map((tab) => (
                          <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as 'breakdown' | 'comparison')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all ${
                              activeTab === tab.key
                                ? isDark
                                  ? 'text-white border-b-2 border-blue-500 bg-blue-500/5'
                                  : 'text-[#153969] border-b-2 border-[#153969] bg-[#153969]/5'
                                : isDark
                                  ? 'text-gray-400 hover:text-gray-300'
                                  : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {tab.icon} {tab.label}
                          </button>
                        ))}
                      </div>

                      <div className="p-6">
                        {activeTab === 'breakdown' ? (
                          <div className="space-y-4">
                            {result.breakdown.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <div className="flex justify-between text-sm mb-1.5">
                                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {isEn ? item.labelEn : item.label}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.percentage}%</span>
                                    <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                      {formatShort(item.amount)}
                                    </span>
                                  </div>
                                </div>
                                <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percentage * 3.3}%` }}
                                    transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
                                    className="h-full rounded-full bg-gradient-to-r from-[#153969] to-[#2563eb]"
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            {/* Current region */}
                            <div className={`flex items-center justify-between py-3 px-4 rounded-xl text-sm ${
                              isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-[#153969]/5 border border-[#153969]/10'
                            }`}>
                              <span className={`font-semibold flex items-center gap-2 ${isDark ? 'text-blue-300' : 'text-[#153969]'}`}>
                                <MapPin className="w-3.5 h-3.5" />
                                {REGION_LABELS[region]}
                              </span>
                              <span className={`font-bold ${isDark ? 'text-blue-300' : 'text-[#153969]'}`}>
                                {formatShort(result.totalCost)}
                              </span>
                            </div>

                            {result.comparison.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.03 }}
                                className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-sm transition-colors ${
                                  isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'
                                }`}
                              >
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                  {item.regionLabel}
                                </span>
                                <div className="flex items-center gap-3">
                                  <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-md ${
                                    item.diff > 0
                                      ? isDark ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-50'
                                      : item.diff < 0
                                        ? isDark ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-50'
                                        : isDark ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-100'
                                  }`}>
                                    {item.diff > 0 ? <TrendingUp className="w-3 h-3" /> : item.diff < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                    {item.diff > 0 ? '+' : ''}{item.diff}%
                                  </span>
                                  <span className={`font-semibold min-w-[80px] text-right ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                    {formatShort(item.cost)}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Card */}
                    <div className={`rounded-2xl overflow-hidden shadow-lg`}>
                      <div className="relative bg-gradient-to-r from-[#153969] to-[#1e4d8a] p-6">
                        {/* Decorative */}
                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 -ml-8 -mb-8" />

                        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <p className="text-white font-semibold">
                              {isEn ? 'Need a detailed RAB document?' : 'Butuh dokumen RAB detail?'}
                            </p>
                            <p className="text-white/70 text-sm mt-1">
                              {isEn
                                ? 'Get material specs, contractor quotes, and full project planning.'
                                : 'Dapatkan spesifikasi material, penawaran kontraktor, dan perencanaan proyek lengkap.'}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <a
                              href={`https://wa.me/6281218127503?text=${encodeURIComponent(
                                `Halo, saya ingin konsultasi RAB detail:\n- Tipe: ${BUILDING_TYPE_LABELS[buildingType].id}\n- Luas: ${area}m², ${floors} lantai\n- Kualitas: ${QUALITY_LABELS[quality].id}\n- Lokasi: ${REGION_LABELS[region]}\n- Estimasi: ${formatCurrency(result.totalCost)}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/20 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-all"
                            >
                              <MessageCircle className="w-4 h-4" />
                              WhatsApp
                            </a>
                            <button
                              onClick={() => setShowLeadForm(true)}
                              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#153969] text-sm font-semibold py-2.5 px-4 rounded-xl transition-all"
                            >
                              {isEn ? 'Request' : 'Minta RAB'}
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Empty state */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-2xl ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} border backdrop-blur-xl p-10 md:p-14 shadow-lg shadow-black/5`}
                  >
                    <div className="max-w-sm mx-auto text-center">
                      <div className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                        isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-50'
                      } border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                        <Calculator className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {isEn ? 'Enter project details' : 'Masukkan detail proyek'}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                        {isEn
                          ? 'Fill in the parameters on the left and click "Calculate Estimate" to generate a comprehensive budget breakdown.'
                          : 'Isi parameter di sebelah kiri dan klik "Hitung Estimasi" untuk menghasilkan rincian anggaran yang komprehensif.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`mt-12 text-center text-xs max-w-3xl mx-auto ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
          >
            <p>
              {isEn
                ? 'Estimates based on 2024 contractor rates and BPS Construction Cost Index (IKK). Actual costs depend on site conditions, material availability, and contractor pricing. Does not include land cost, permits (IMB/PBG), or furniture.'
                : 'Estimasi berdasarkan harga borongan kontraktor 2024 dan Indeks Kemahalan Konstruksi (IKK) BPS. Biaya aktual tergantung kondisi lokasi, ketersediaan material, dan penawaran kontraktor. Belum termasuk biaya tanah, IMB/PBG, dan furniture.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== LEAD FORM MODAL ========== */}
      <AnimatePresence>
        {showLeadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLeadForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6 shadow-2xl`}
            >
              {leadSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {isEn ? 'Request submitted!' : 'Permintaan terkirim!'}
                  </p>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isEn ? 'Our team will contact you within 1×24 hours.' : 'Tim kami akan menghubungi Anda dalam 1×24 jam.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead}>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className={`text-base font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {isEn ? 'Request Detailed RAB' : 'Minta RAB Detail'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <X className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Name' : 'Nama'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm ${
                          isDark ? 'bg-gray-900/50 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-[#153969]/20`}
                        placeholder={isEn ? 'Your name' : 'Nama Anda'}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Phone / WhatsApp' : 'No. HP / WhatsApp'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm ${
                          isDark ? 'bg-gray-900/50 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-[#153969]/20`}
                        placeholder="08xx-xxxx-xxxx"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</label>
                        <input
                          type="email"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          className={`w-full rounded-xl border px-4 py-2.5 text-sm ${
                            isDark ? 'bg-gray-900/50 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                          } focus:outline-none focus:ring-2 focus:ring-[#153969]/20`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {isEn ? 'Company' : 'Perusahaan'}
                        </label>
                        <input
                          type="text"
                          value={leadForm.company}
                          onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                          className={`w-full rounded-xl border px-4 py-2.5 text-sm ${
                            isDark ? 'bg-gray-900/50 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                          } focus:outline-none focus:ring-2 focus:ring-[#153969]/20`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Message (optional)' : 'Pesan (opsional)'}
                      </label>
                      <textarea
                        value={leadForm.message}
                        onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                        rows={2}
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm resize-none ${
                          isDark ? 'bg-gray-900/50 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-[#153969]/20`}
                        placeholder={isEn ? 'Tell us about your project...' : 'Ceritakan tentang proyek Anda...'}
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  {result && (
                    <div className={`mt-4 p-3 rounded-xl text-xs ${isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-50 text-gray-600'} border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                      <p className="font-medium mb-1">{isEn ? 'Your estimate:' : 'Estimasi Anda:'}</p>
                      <p>{isEn ? BUILDING_TYPE_LABELS[buildingType].en : BUILDING_TYPE_LABELS[buildingType].id} • {area}m² • {floors} {isEn ? 'floor' : 'lantai'} • {REGION_LABELS[region]}</p>
                      <p className="font-bold mt-1 text-sm">{formatCurrency(result.totalCost)}</p>
                    </div>
                  )}

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border ${
                        isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {isEn ? 'Cancel' : 'Batal'}
                    </button>
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#153969] to-[#1e4d8a] text-white disabled:opacity-50 hover:shadow-lg transition-all"
                    >
                      {leadSubmitting ? (isEn ? 'Sending...' : 'Mengirim...') : (isEn ? 'Submit Request' : 'Kirim Permintaan')}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
