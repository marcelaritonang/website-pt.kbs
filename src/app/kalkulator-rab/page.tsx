'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
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

  // Load pricing from API on mount
  useEffect(() => {
    fetch('/api/rab/pricing')
      .then((res) => res.json())
      .then((data) => {
        if (data.pricing) setPricing(data.pricing);
      })
      .catch(() => {
        // Fallback to defaults silently
      });
  }, []);

  // Load saved scenarios from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rab_scenarios');
      if (saved) setSavedScenarios(JSON.parse(saved));
    } catch {
      // Ignore parse errors
    }
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

    // Try API first, fallback to local calculation
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
    } catch {
      // API failed, calculate locally
    }

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
    const updated = [scenario, ...savedScenarios].slice(0, 5); // Max 5 saved
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
    } catch {
      // Silently handle - WA link is fallback
    }
    setLeadSubmitting(false);
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-[#f8f9fa]'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-24 md:pt-28 pb-6`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {isEn ? 'RAB Calculator' : 'Kalkulator RAB'}
              </h1>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {isEn
                  ? 'Estimate construction costs based on current market rates across regions in Indonesia.'
                  : 'Estimasi biaya konstruksi berdasarkan harga pasar terkini di berbagai wilayah Indonesia.'}
              </p>
            </div>
            {/* Saved scenarios button */}
            {savedScenarios.length > 0 && (
              <button
                onClick={() => setShowScenarios(!showScenarios)}
                className={`text-xs px-3 py-2 rounded-md border ${
                  isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                📋 {isEn ? `${savedScenarios.length} Saved` : `${savedScenarios.length} Tersimpan`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="max-w-6xl mx-auto">

          {/* Saved Scenarios Panel */}
          <AnimatePresence>
            {showScenarios && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-4`}>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {isEn ? 'Saved Scenarios' : 'Skenario Tersimpan'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {savedScenarios.map((s) => (
                      <div
                        key={s.id}
                        className={`p-3 rounded-md border ${isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'} cursor-pointer group`}
                        onClick={() => handleLoadScenario(s)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {formatShort(s.result.totalCost)}
                            </p>
                            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {isEn ? BUILDING_TYPE_LABELS[s.input.buildingType].en : BUILDING_TYPE_LABELS[s.input.buildingType].id} • {s.input.area}m² • {REGION_LABELS[s.input.region]}
                            </p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteScenario(s.id); }}
                            className="opacity-0 group-hover:opacity-100 text-xs text-red-400 hover:text-red-500 p-1"
                          >
                            ✕
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
                      {(Object.keys(BUILDING_TYPE_LABELS) as BuildingType[]).map((type) => (
                        <option key={type} value={type}>
                          {isEn ? BUILDING_TYPE_LABELS[type].en : BUILDING_TYPE_LABELS[type].id}
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
                        max={5000}
                        value={area}
                        onChange={(e) => {
                          setArea(parseInt(e.target.value) || 0);
                          setValidationError(null);
                        }}
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
                      {(Object.keys(QUALITY_LABELS) as Quality[]).map((q) => (
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
                              {isEn ? QUALITY_LABELS[q].en : QUALITY_LABELS[q].id}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {isEn ? QUALITY_LABELS[q].descEn : QUALITY_LABELS[q].desc}
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
                      {(Object.keys(REGION_LABELS) as Region[]).map((r) => (
                        <option key={r} value={r}>
                          {REGION_LABELS[r]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Validation Error */}
                  {validationError && (
                    <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-md">
                      ⚠️ {validationError}
                    </p>
                  )}

                  {/* Calculate Button */}
                  <button
                    onClick={handleCalculate}
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
                        <span>{isEn ? BUILDING_TYPE_LABELS[buildingType].en : BUILDING_TYPE_LABELS[buildingType].id}</span>
                        <span>•</span>
                        <span>{area} m² × {floors} {isEn ? 'floor' : 'lantai'}</span>
                        <span>•</span>
                        <span>{isEn ? QUALITY_LABELS[quality].en : QUALITY_LABELS[quality].id}</span>
                        <span>•</span>
                        <span>{REGION_LABELS[region]}</span>
                      </div>

                      {/* Action buttons */}
                      <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} flex flex-wrap gap-2`}>
                        <button
                          onClick={handleSaveScenario}
                          className={`text-xs px-3 py-1.5 rounded border ${
                            isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          💾 {isEn ? 'Save' : 'Simpan'}
                        </button>
                        <button
                          onClick={handlePrintPDF}
                          className={`text-xs px-3 py-1.5 rounded border ${
                            isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          📄 {isEn ? 'Export PDF' : 'Export PDF'}
                        </button>
                        <button
                          onClick={handleCopyLink}
                          className={`text-xs px-3 py-1.5 rounded border ${
                            isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          🔗 {isEn ? 'Copy Link' : 'Salin Link'}
                        </button>
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
                                    animate={{ width: `${item.percentage * 3.3}%` }}
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
                                {REGION_LABELS[region]} ({isEn ? 'selected' : 'terpilih'})
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
                        <button
                          onClick={() => setShowLeadForm(true)}
                          className="shrink-0 bg-[#153969] hover:bg-[#1e4d8a] text-white text-sm font-medium py-2.5 px-5 rounded-md transition-colors"
                        >
                          {isEn ? 'Request Detailed RAB' : 'Minta RAB Detail'}
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

      {/* Lead Form Modal */}
      <AnimatePresence>
        {showLeadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowLeadForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} p-6 shadow-xl`}
            >
              {leadSuccess ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className={`text-base font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {isEn ? 'Request submitted!' : 'Permintaan terkirim!'}
                  </p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isEn ? 'Our team will contact you within 1×24 hours.' : 'Tim kami akan menghubungi Anda dalam 1×24 jam.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead}>
                  <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {isEn ? 'Request Detailed RAB' : 'Minta RAB Detail'}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Name' : 'Nama'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className={`w-full rounded-md border px-3 py-2 text-sm ${
                          isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder={isEn ? 'Your name' : 'Nama Anda'}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Phone / WhatsApp' : 'No. Telepon / WhatsApp'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className={`w-full rounded-md border px-3 py-2 text-sm ${
                          isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="08xx-xxxx-xxxx"
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className={`w-full rounded-md border px-3 py-2 text-sm ${
                          isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Company' : 'Perusahaan'}
                      </label>
                      <input
                        type="text"
                        value={leadForm.company}
                        onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                        className={`w-full rounded-md border px-3 py-2 text-sm ${
                          isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isEn ? 'Message (optional)' : 'Pesan (opsional)'}
                      </label>
                      <textarea
                        value={leadForm.message}
                        onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                        rows={3}
                        className={`w-full rounded-md border px-3 py-2 text-sm ${
                          isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder={isEn ? 'Tell us about your project...' : 'Ceritakan tentang proyek Anda...'}
                      />
                    </div>
                  </div>

                  {/* Summary in modal */}
                  {result && (
                    <div className={`mt-4 p-3 rounded-md text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                      <p className="font-medium">{isEn ? 'Your estimate:' : 'Estimasi Anda:'}</p>
                      <p>{isEn ? BUILDING_TYPE_LABELS[buildingType].en : BUILDING_TYPE_LABELS[buildingType].id} • {area}m² • {floors} {isEn ? 'floor' : 'lantai'} • {REGION_LABELS[region]}</p>
                      <p className="font-semibold mt-1">{formatCurrency(result.totalCost)}</p>
                    </div>
                  )}

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      className={`flex-1 py-2.5 rounded-md text-sm font-medium border ${
                        isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {isEn ? 'Cancel' : 'Batal'}
                    </button>
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="flex-1 py-2.5 rounded-md text-sm font-medium bg-[#153969] hover:bg-[#1e4d8a] text-white disabled:opacity-50"
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
