'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import dynamic from 'next/dynamic';
import {
  Plus, Edit3, Trash2, Save, X, MapPin, Upload, Users,
  TrendingUp, Clock, CheckCircle2, Pause, ChevronDown, ChevronUp,
  Image as ImageIcon, AlertTriangle,
} from 'lucide-react';
import type { ProjectMarker } from '@/components/ProjectMap';

const ProjectMap = dynamic(() => import('@/components/ProjectMap'), { ssr: false });

interface Project {
  id: number;
  title: string;
  title_en: string;
  client: string;
  category: string;
  sub_category: string;
  description: string;
  description_en: string;
  contract_number: string;
  location_name: string;
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string | null;
  estimated_end_date: string | null;
  progress: number;
  status: string;
  current_phase: string;
  budget: number;
  image_url: string;
  scope: string;
  scope_en: string;
  update_count?: number;
  team_count?: number;
}

const CATEGORIES = [
  { value: 'building', label: 'Bangunan' },
  { value: 'infrastructure', label: 'Infrastruktur' },
  { value: 'interior', label: 'Interior' },
  { value: 'rehabilitation', label: 'Rehabilitasi' },
  { value: 'land_development', label: 'Land Development' },
];

const STATUSES = [
  { value: 'planning', label: 'Perencanaan', color: '#f59e0b' },
  { value: 'active', label: 'Aktif', color: '#22c55e' },
  { value: 'on_hold', label: 'Ditunda', color: '#ef4444' },
  { value: 'completed', label: 'Selesai', color: '#6366f1' },
];

const emptyProject = {
  title: '', titleEn: '', client: '', category: 'building', subCategory: '',
  description: '', descriptionEn: '', contractNumber: '',
  locationName: '', latitude: '', longitude: '',
  startDate: '', endDate: '', estimatedEndDate: '',
  progress: 0, status: 'planning', currentPhase: '',
  budget: '', imageUrl: '', scope: '', scopeEn: '',
};

export default function AdminProjectsPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  // Update modal state
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProjectId, setUpdateProjectId] = useState<number | null>(null);
  const [updateForm, setUpdateForm] = useState({ title: '', description: '', progressAfter: 0 });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects/admin');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects);
      } else if (res.status === 401) {
        setError('Unauthorized. Login as admin first.');
      }
    } catch {
      setError('Failed to load projects');
    }
    setLoading(false);
  }

  function handleEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title || '',
      titleEn: project.title_en || '',
      client: project.client || '',
      category: project.category || 'building',
      subCategory: project.sub_category || '',
      description: project.description || '',
      descriptionEn: project.description_en || '',
      contractNumber: project.contract_number || '',
      locationName: project.location_name || '',
      latitude: project.latitude ? String(project.latitude) : '',
      longitude: project.longitude ? String(project.longitude) : '',
      startDate: project.start_date ? project.start_date.split('T')[0] : '',
      endDate: project.end_date ? project.end_date.split('T')[0] : '',
      estimatedEndDate: project.estimated_end_date ? project.estimated_end_date.split('T')[0] : '',
      progress: project.progress || 0,
      status: project.status || 'planning',
      currentPhase: project.current_phase || '',
      budget: project.budget ? String(project.budget) : '',
      imageUrl: project.image_url || '',
      scope: project.scope || '',
      scopeEn: project.scope_en || '',
    });
    setShowForm(true);
  }

  function handleNew() {
    setEditingId(null);
    setForm(emptyProject);
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.title) {
      setError('Nama proyek wajib diisi');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      title: form.title,
      titleEn: form.titleEn || null,
      client: form.client || null,
      category: form.category,
      subCategory: form.subCategory || null,
      description: form.description || null,
      descriptionEn: form.descriptionEn || null,
      contractNumber: form.contractNumber || null,
      locationName: form.locationName || null,
      latitude: form.latitude ? parseFloat(form.latitude) : null,
      longitude: form.longitude ? parseFloat(form.longitude) : null,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
      estimatedEndDate: form.estimatedEndDate || null,
      progress: Number(form.progress),
      status: form.status,
      currentPhase: form.currentPhase || null,
      budget: form.budget ? parseInt(form.budget) : null,
      imageUrl: form.imageUrl || null,
      scope: form.scope || null,
      scopeEn: form.scopeEn || null,
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/projects/admin/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/projects/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setSuccess(editingId ? 'Proyek berhasil diupdate' : 'Proyek berhasil ditambahkan');
        setShowForm(false);
        fetchProjects();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save');
      }
    } catch {
      setError('Network error');
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm('Yakin ingin menghapus proyek ini?')) return;
    try {
      const res = await fetch(`/api/projects/admin/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSuccess('Proyek dihapus');
        fetchProjects();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch {
      setError('Failed to delete');
    }
  }

  async function handleAddUpdate() {
    if (!updateProjectId || !updateForm.title) return;
    try {
      const res = await fetch(`/api/projects/admin/${updateProjectId}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateForm),
      });
      if (res.ok) {
        setSuccess('Progress update ditambahkan');
        setShowUpdateModal(false);
        setUpdateForm({ title: '', description: '', progressAfter: 0 });
        fetchProjects();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch {
      setError('Failed to add update');
    }
  }

  function handleMapClick(lngLat: { lng: number; lat: number }) {
    setForm((f) => ({ ...f, latitude: lngLat.lat.toFixed(7), longitude: lngLat.lng.toFixed(7) }));
    setShowMapPicker(false);
  }

  return (
    <div className={`min-h-screen pt-20 pb-12 ${isDark ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Kelola Proyek
            </h1>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Tambah, edit, dan update progress proyek
            </p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#153969] text-white text-sm font-medium hover:bg-[#1e4d8a] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Proyek
          </button>
        </div>

        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {error}
              <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 overflow-y-auto"
              onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`w-full max-w-3xl rounded-2xl shadow-xl mb-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className={`flex items-center justify-between p-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                  <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {editingId ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                  </h2>
                  <button onClick={() => setShowForm(false)} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Nama Proyek *</label>
                      <input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                        placeholder="Pembangunan Gedung..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Nama Proyek (EN)</label>
                      <input
                        value={form.titleEn}
                        onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Klien</label>
                      <input
                        value={form.client}
                        onChange={(e) => setForm({ ...form, client: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No. Kontrak</label>
                      <input
                        value={form.contractNumber}
                        onChange={(e) => setForm({ ...form, contractNumber: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                        placeholder="KBS/2024/XXX"
                      />
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Kategori</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      >
                        {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Sub Kategori</label>
                      <input
                        value={form.subCategory}
                        onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                        placeholder="Office, Warehouse, Road..."
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <MapPin className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />Lokasi
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowMapPicker(!showMapPicker)}
                        className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                      >
                        {showMapPicker ? 'Tutup Peta' : 'Pilih dari Peta'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-1">
                        <input
                          value={form.locationName}
                          onChange={(e) => setForm({ ...form, locationName: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                          placeholder="Nama lokasi"
                        />
                      </div>
                      <div>
                        <input
                          value={form.latitude}
                          onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                          placeholder="Latitude"
                        />
                      </div>
                      <div>
                        <input
                          value={form.longitude}
                          onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                          placeholder="Longitude"
                        />
                      </div>
                    </div>
                    {showMapPicker && (
                      <div className="mt-3">
                        <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Klik pada peta untuk memilih koordinat
                        </p>
                        <ProjectMap
                          projects={[]}
                          onMapClick={handleMapClick}
                          height="200px"
                          isDark={isDark}
                        />
                      </div>
                    )}
                  </div>

                  {/* Status & Progress */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Status</label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      >
                        {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Progress ({form.progress}%)</label>
                      <input
                        type="range"
                        min="0" max="100"
                        value={form.progress}
                        onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
                        className="mt-2 w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Fase Saat Ini</label>
                      <input
                        value={form.currentPhase}
                        onChange={(e) => setForm({ ...form, currentPhase: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                        placeholder="Struktur Lantai 3"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Tanggal Mulai</label>
                      <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Target Selesai</label>
                      <input type="date" value={form.estimatedEndDate} onChange={(e) => setForm({ ...form, estimatedEndDate: e.target.value })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Budget (Rp)</label>
                      <input
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value.replace(/\D/g, '') })}
                        className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                        placeholder="5000000000"
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <ImageIcon className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />URL Gambar
                    </label>
                    <input
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      placeholder="/images/proyek/1.jpg atau https://..."
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Deskripsi</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={2}
                      className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm resize-none ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className={`flex items-center justify-end gap-3 p-5 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                  <button
                    onClick={() => setShowForm(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#153969] text-white text-sm font-medium hover:bg-[#1e4d8a] transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Modal */}
        <AnimatePresence>
          {showUpdateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50"
              onClick={(e) => { if (e.target === e.currentTarget) setShowUpdateModal(false); }}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className={`w-full max-w-md rounded-2xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}
              >
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Tambah Progress Update
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Judul Update</label>
                    <input
                      value={updateForm.title}
                      onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                      className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                      placeholder="Pengecoran lantai 5 selesai"
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Deskripsi</label>
                    <textarea
                      value={updateForm.description}
                      onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                      rows={2}
                      className={`mt-1 w-full px-3 py-2 rounded-lg border text-sm resize-none ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:ring-2 focus:ring-blue-500 outline-none`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Progress Baru ({updateForm.progressAfter}%)</label>
                    <input
                      type="range" min="0" max="100"
                      value={updateForm.progressAfter}
                      onChange={(e) => setUpdateForm({ ...updateForm, progressAfter: Number(e.target.value) })}
                      className="mt-2 w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-5">
                  <button onClick={() => setShowUpdateModal(false)} className={`px-4 py-2 rounded-lg text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Batal
                  </button>
                  <button onClick={handleAddUpdate} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">
                    Simpan Update
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`animate-pulse rounded-xl h-20 ${isDark ? 'bg-gray-800/60' : 'bg-gray-200'}`} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className={`rounded-xl p-12 text-center border ${isDark ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200'}`}>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Belum ada proyek. Klik "Tambah Proyek" untuk mulai.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const statusCfg = STATUSES.find((s) => s.value === project.status) || STATUSES[0];
              const isExpanded = expandedId === project.id;
              return (
                <div
                  key={project.id}
                  className={`rounded-xl border overflow-hidden transition-all ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200/50'}`}
                >
                  <div className="flex items-center gap-3 p-4">
                    {project.image_url && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-semibold truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          {project.title}
                        </h3>
                        <span className="shrink-0 text-xs px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: `${statusCfg.color}15`, color: statusCfg.color }}>
                          {statusCfg.label}
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {project.client} • {project.location_name} • {project.progress}%
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => { setUpdateProjectId(project.id); setUpdateForm({ ...updateForm, progressAfter: project.progress }); setShowUpdateModal(true); }}
                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-green-400' : 'hover:bg-green-50 text-green-600'}`}
                        title="Add Update"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(project)}
                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`}
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : project.id)}
                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className={`h-1 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="h-full transition-all" style={{ width: `${project.progress}%`, backgroundColor: statusCfg.color }} />
                  </div>

                  {/* Expanded Info */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className={`p-4 text-xs space-y-1 border-t ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
                          <p><strong>Kontrak:</strong> {project.contract_number || '-'}</p>
                          <p><strong>Kategori:</strong> {project.category} / {project.sub_category}</p>
                          <p><strong>Fase:</strong> {project.current_phase || '-'}</p>
                          <p><strong>Koordinat:</strong> {project.latitude}, {project.longitude}</p>
                          <p><strong>Mulai:</strong> {project.start_date ? new Date(project.start_date).toLocaleDateString('id-ID') : '-'}</p>
                          {project.budget && <p><strong>Budget:</strong> Rp {Number(project.budget).toLocaleString('id-ID')}</p>}
                          <p><strong>Updates:</strong> {project.update_count || 0} • <strong>Team:</strong> {project.team_count || 0}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
