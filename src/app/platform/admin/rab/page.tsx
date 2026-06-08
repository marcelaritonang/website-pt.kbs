'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface PricingRow {
  id: number;
  building_type: string;
  base_price_per_m2: number;
  updated_at: string;
}

interface QualityRow {
  id: number;
  quality: string;
  multiplier: number;
  updated_at: string;
}

interface RegionalRow {
  id: number;
  region: string;
  region_label: string;
  multiplier: number;
  updated_at: string;
}

interface LeadRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  company: string;
  building_type: string;
  area: number;
  floors: number;
  quality: string;
  region: string;
  estimated_cost: number;
  message: string;
  status: string;
  created_at: string;
}

interface AnalyticsSummary {
  totalCalculations: number;
  totalLeads: number;
  newLeads: number;
}

interface AnalyticsData {
  summary: AnalyticsSummary;
  byType: { building_type: string; count: string }[];
  byRegion: { region: string; count: string }[];
  byQuality: { quality: string; count: string }[];
  avgArea: { building_type: string; avg_area: string; avg_cost: string }[];
  daily: { date: string; count: string }[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminRABPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'analytics' | 'pricing' | 'leads'>('analytics');
  const [token, setToken] = useState<string>('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [pricing, setPricing] = useState<PricingRow[]>([]);
  const [quality, setQuality] = useState<QualityRow[]>([]);
  const [regional, setRegional] = useState<RegionalRow[]>([]);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [leadsTotal, setLeadsTotal] = useState(0);
  const [leadsFilter, setLeadsFilter] = useState<string>('');

  // Get token from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('kbs_token');
    if (stored) {
      setToken(stored);
      setIsAuthed(true);
    }
  }, []);

  const authHeaders = useCallback(() => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }), [token]);

  // Fetch data based on active tab
  useEffect(() => {
    if (!isAuthed) return;

    if (activeTab === 'analytics') {
      fetch('/api/rab/admin/analytics', { headers: authHeaders() })
        .then((res) => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then(setAnalytics)
        .catch((err) => setError(err.message));
    } else if (activeTab === 'pricing') {
      fetch('/api/rab/admin/pricing', { headers: authHeaders() })
        .then((res) => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then((data) => {
          setPricing(data.pricing || []);
          setQuality(data.quality || []);
          setRegional(data.regional || []);
        })
        .catch((err) => setError(err.message));
    } else if (activeTab === 'leads') {
      const params = new URLSearchParams();
      if (leadsFilter) params.set('status', leadsFilter);
      fetch(`/api/rab/admin/leads?${params.toString()}`, { headers: authHeaders() })
        .then((res) => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then((data) => {
          setLeads(data.leads || []);
          setLeadsTotal(data.total || 0);
        })
        .catch((err) => setError(err.message));
    }
  }, [activeTab, isAuthed, leadsFilter, authHeaders]);

  async function updatePricing(type: string, data: Record<string, unknown>) {
    try {
      const res = await fetch('/api/rab/admin/pricing', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ type, data }),
      });
      if (!res.ok) throw new Error('Update failed');
      // Refresh pricing
      setActiveTab('analytics');
      setTimeout(() => setActiveTab('pricing'), 100);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function updateLeadStatus(id: number, status: string) {
    try {
      const res = await fetch('/api/rab/admin/leads', {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error('Update failed');
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (!isAuthed) {
    return (
      <div className={`min-h-screen pt-24 ${isDark ? 'bg-gray-900' : 'bg-[#f8f9fa]'}`}>
        <div className="container mx-auto px-4 max-w-md">
          <div className={`rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
            <h1 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Admin RAB - Login Required
            </h1>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Silakan login ke platform terlebih dahulu untuk mengakses admin panel.
            </p>
            <a
              href="/platform/login?redirect=/platform/admin/rab"
              className="block text-center bg-[#153969] hover:bg-[#1e4d8a] text-white text-sm font-medium py-2.5 px-4 rounded-md"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-[#f8f9fa]'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-24 md:pt-28 pb-4`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Admin — RAB Calculator
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Kelola harga, lihat analytics, dan manage leads
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto flex gap-1">
            {(['analytics', 'pricing', 'leads'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? isDark ? 'border-blue-500 text-white' : 'border-[#153969] text-[#153969]'
                    : isDark ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'analytics' ? '📊 Analytics' : tab === 'pricing' ? '💰 Pricing' : `📞 Leads${analytics ? ` (${analytics.summary.newLeads})` : ''}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="container mx-auto px-4 md:px-8 mt-4">
          <div className="max-w-6xl mx-auto bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-md">
            ⚠️ {error}
            <button onClick={() => setError(null)} className="ml-3 underline">dismiss</button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="max-w-6xl mx-auto">

          {/* Analytics Tab */}
          {activeTab === 'analytics' && analytics && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Total Kalkulasi</p>
                  <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {analytics.summary.totalCalculations.toLocaleString()}
                  </p>
                </div>
                <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Total Leads</p>
                  <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {analytics.summary.totalLeads}
                  </p>
                </div>
                <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Leads Baru</p>
                  <p className={`text-2xl font-bold mt-1 text-green-600`}>
                    {analytics.summary.newLeads}
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* By Type */}
                <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Per Tipe Bangunan</h3>
                  {analytics.byType.length > 0 ? (
                    <div className="space-y-2">
                      {analytics.byType.map((item) => (
                        <div key={item.building_type} className="flex justify-between text-sm">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{item.building_type}</span>
                          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Belum ada data</p>
                  )}
                </div>

                {/* By Region */}
                <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Per Daerah</h3>
                  {analytics.byRegion.length > 0 ? (
                    <div className="space-y-2">
                      {analytics.byRegion.map((item) => (
                        <div key={item.region} className="flex justify-between text-sm">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{item.region}</span>
                          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Belum ada data</p>
                  )}
                </div>
              </div>

              {/* Average Cost */}
              {analytics.avgArea.length > 0 && (
                <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                  <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Rata-rata per Tipe</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                          <th className="text-left py-2 font-medium">Tipe</th>
                          <th className="text-right py-2 font-medium">Avg Luas</th>
                          <th className="text-right py-2 font-medium">Avg Biaya</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.avgArea.map((item) => (
                          <tr key={item.building_type} className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                            <td className={`py-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.building_type}</td>
                            <td className={`py-2 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.avg_area} m²</td>
                            <td className={`py-2 text-right font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                              {formatCurrency(parseInt(item.avg_cost))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && !analytics && (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <p>Loading analytics...</p>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              {/* Base Prices */}
              <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Harga Dasar per m² (per Tipe Bangunan)
                </h3>
                {pricing.length > 0 ? (
                  <div className="space-y-3">
                    {pricing.map((row) => (
                      <div key={row.id} className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{row.building_type}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            defaultValue={row.base_price_per_m2}
                            className={`w-36 text-right rounded border px-2 py-1 text-sm ${
                              isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            onBlur={(e) => {
                              const val = parseInt(e.target.value);
                              if (val !== row.base_price_per_m2) {
                                updatePricing('base_price', { buildingType: row.building_type, price: val });
                              }
                            }}
                          />
                          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/m²</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Data belum ada di database. Pricing menggunakan default hardcoded.
                  </p>
                )}
              </div>

              {/* Quality Multipliers */}
              <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Multiplier Kualitas
                </h3>
                {quality.length > 0 ? (
                  <div className="space-y-3">
                    {quality.map((row) => (
                      <div key={row.id} className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{row.quality}</span>
                        <input
                          type="number"
                          step="0.01"
                          defaultValue={row.multiplier}
                          className={`w-24 text-right rounded border px-2 py-1 text-sm ${
                            isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value);
                            if (val !== row.multiplier) {
                              updatePricing('quality', { quality: row.quality, multiplier: val });
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Data belum ada di database. Menggunakan default: standar=1.0, menengah=1.45, premium=2.1
                  </p>
                )}
              </div>

              {/* Regional Multipliers */}
              <div className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-5`}>
                <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Indeks Regional (IKK)
                </h3>
                {regional.length > 0 ? (
                  <div className="space-y-3">
                    {regional.map((row) => (
                      <div key={row.id} className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{row.region_label}</span>
                        <input
                          type="number"
                          step="0.01"
                          defaultValue={row.multiplier}
                          className={`w-24 text-right rounded border px-2 py-1 text-sm ${
                            isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value);
                            if (val !== row.multiplier) {
                              updatePricing('regional', { region: row.region, regionLabel: row.region_label, multiplier: val });
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Data belum ada di database. Menggunakan default IKK.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Leads Tab */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              {/* Filter */}
              <div className="flex gap-2">
                {['', 'new', 'contacted', 'converted'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setLeadsFilter(status)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                      leadsFilter === status
                        ? 'bg-[#153969] text-white'
                        : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status === '' ? `Semua (${leadsTotal})` : status === 'new' ? '🟢 Baru' : status === 'contacted' ? '🟡 Dihubungi' : '✅ Converted'}
                  </button>
                ))}
              </div>

              {/* Leads List */}
              {leads.length > 0 ? (
                <div className="space-y-3">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className={`rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-4`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {lead.name}
                            </p>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              lead.status === 'new' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            📱 {lead.phone} {lead.email && `• ✉️ ${lead.email}`} {lead.company && `• 🏢 ${lead.company}`}
                          </p>
                          {lead.building_type && (
                            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {lead.building_type} • {lead.area}m² • {lead.floors} lantai • {lead.quality} • {lead.region}
                              {lead.estimated_cost > 0 && ` • ${formatCurrency(lead.estimated_cost)}`}
                            </p>
                          )}
                          {lead.message && (
                            <p className={`text-xs mt-2 italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              &ldquo;{lead.message}&rdquo;
                            </p>
                          )}
                          <p className={`text-xs mt-2 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                            {new Date(lead.created_at).toLocaleString('id-ID')}
                          </p>
                        </div>

                        {/* Status actions */}
                        <div className="flex gap-1.5 shrink-0">
                          {lead.status !== 'contacted' && (
                            <button
                              onClick={() => updateLeadStatus(lead.id, 'contacted')}
                              className={`text-xs px-2.5 py-1.5 rounded border ${
                                isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              📞 Contacted
                            </button>
                          )}
                          {lead.status !== 'converted' && (
                            <button
                              onClick={() => updateLeadStatus(lead.id, 'converted')}
                              className={`text-xs px-2.5 py-1.5 rounded border ${
                                isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              ✅ Converted
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-12 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Belum ada leads.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
