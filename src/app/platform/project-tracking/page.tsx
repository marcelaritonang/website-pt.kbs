'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import dynamic from 'next/dynamic';
import {
  Building2, MapPin, Clock, TrendingUp, CheckCircle2,
  AlertCircle, Pause, ChevronRight, Filter, BarChart3,
  Calendar, User, Layers,
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
  team_role?: string;
}

interface ProjectUpdate {
  id: number;
  title: string;
  description: string;
  progress_after: number;
  photos: string | null;
  updater_name: string;
  created_at: string;
}

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string; labelEn: string }> = {
  planning: { icon: <Clock className="w-4 h-4" />, color: 'amber', label: 'Perencanaan', labelEn: 'Planning' },
  active: { icon: <TrendingUp className="w-4 h-4" />, color: 'green', label: 'Aktif', labelEn: 'Active' },
  on_hold: { icon: <Pause className="w-4 h-4" />, color: 'red', label: 'Ditunda', labelEn: 'On Hold' },
  completed: { icon: <CheckCircle2 className="w-4 h-4" />, color: 'indigo', label: 'Selesai', labelEn: 'Completed' },
};

export default function ProjectTrackingPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const isEn = language === 'en';

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedMapProject, setSelectedMapProject] = useState<number | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects/my');
      if (res.ok) {
        const data = await res.json();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
          setLoading(false);
          return;
        }
      }
    } catch {}

    // Fallback: fetch public projects
    try {
      const pubRes = await fetch('/api/projects');
      if (pubRes.ok) {
        const data = await pubRes.json();
        setProjects(data.projects || []);
      }
    } catch {}
    setLoading(false);
  }

  async function fetchUpdates(projectId: number) {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (res.ok) {
        const data = await res.json();
        setUpdates(data.updates || []);
      }
    } catch {}
  }

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setSelectedMapProject(project.id);
    fetchUpdates(project.id);
  }, []);

  const handleMapMarkerClick = useCallback((marker: ProjectMarker) => {
    const project = projects.find((p) => p.id === marker.id);
    if (project) {
      setSelectedProject(project);
      setSelectedMapProject(project.id);
      fetchUpdates(project.id);
    }
  }, [projects]);

  const filteredProjects = filterStatus === 'all'
    ? projects
    : projects.filter((p) => p.status === filterStatus);

  const mapMarkers: ProjectMarker[] = filteredProjects
    .filter((p) => p.latitude && p.longitude)
    .map((p) => ({
      id: p.id,
      title: isEn ? (p.title_en || p.title) : p.title,
      client: p.client,
      locationName: p.location_name,
      latitude: Number(p.latitude),
      longitude: Number(p.longitude),
      progress: p.progress,
      status: p.status,
      category: p.category,
      imageUrl: p.image_url,
    }));

  // Stats
  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === 'active').length,
    completed: projects.filter((p) => p.status === 'completed').length,
    avgProgress: projects.length > 0
      ? Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length)
      : 0,
  };

  return (
    <div className={`min-h-screen pt-20 pb-12 ${isDark ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEn ? 'Project Dashboard' : 'Dashboard Proyek'}
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {isEn ? 'Track your construction projects in real-time' : 'Pantau proyek konstruksi Anda secara real-time'}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          {[
            { label: isEn ? 'Total Projects' : 'Total Proyek', value: stats.total, icon: <Layers className="w-5 h-5" />, bgColor: isDark ? 'bg-blue-900/30' : 'bg-blue-50', textColor: isDark ? 'text-blue-400' : 'text-blue-600' },
            { label: isEn ? 'Active' : 'Aktif', value: stats.active, icon: <TrendingUp className="w-5 h-5" />, bgColor: isDark ? 'bg-green-900/30' : 'bg-green-50', textColor: isDark ? 'text-green-400' : 'text-green-600' },
            { label: isEn ? 'Completed' : 'Selesai', value: stats.completed, icon: <CheckCircle2 className="w-5 h-5" />, bgColor: isDark ? 'bg-indigo-900/30' : 'bg-indigo-50', textColor: isDark ? 'text-indigo-400' : 'text-indigo-600' },
            { label: isEn ? 'Avg. Progress' : 'Rata-rata Progress', value: `${stats.avgProgress}%`, icon: <BarChart3 className="w-5 h-5" />, bgColor: isDark ? 'bg-amber-900/30' : 'bg-amber-50', textColor: isDark ? 'text-amber-400' : 'text-amber-600' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 border ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200/50'} backdrop-blur-sm`}
            >
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-2 ${stat.bgColor}`}>
                <span className={stat.textColor}>{stat.icon}</span>
              </div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl overflow-hidden border mb-6 ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200/50'}`}
        >
          <div className={`flex items-center justify-between px-5 py-3 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}>
            <h2 className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              <MapPin className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
              {isEn ? 'Project Locations' : 'Lokasi Proyek'}
            </h2>
            <div className="hidden md:flex items-center gap-3">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: key === 'planning' ? '#f59e0b' : key === 'active' ? '#22c55e' : key === 'on_hold' ? '#ef4444' : '#6366f1' }} />
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isEn ? cfg.labelEn : cfg.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ProjectMap
            projects={mapMarkers}
            onMarkerClick={handleMapMarkerClick}
            selectedId={selectedMapProject}
            height="380px"
            isDark={isDark}
          />
        </motion.div>

        {/* Filter + Project List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project List */}
          <div className="lg:col-span-2">
            {/* Filter Bar */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Filter className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              {['all', 'active', 'completed', 'planning', 'on_hold'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    filterStatus === status
                      ? isDark
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-[#153969]/10 text-[#153969] border border-[#153969]/20'
                      : isDark
                        ? 'text-gray-400 hover:bg-gray-700/50 border border-transparent'
                        : 'text-gray-500 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  {status === 'all' ? (isEn ? 'All' : 'Semua') : (isEn ? STATUS_CONFIG[status]?.labelEn : STATUS_CONFIG[status]?.label)}
                </button>
              ))}
            </div>

            {/* Projects */}
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`animate-pulse rounded-xl h-24 ${isDark ? 'bg-gray-800/60' : 'bg-gray-200'}`} />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className={`rounded-xl p-8 text-center border ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200'}`}>
                <AlertCircle className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isEn ? 'No projects found' : 'Belum ada proyek'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProjects.map((project, index) => {
                  const statusCfg = STATUS_CONFIG[project.status] || STATUS_CONFIG.planning;
                  const statusColor = project.status === 'planning' ? '#f59e0b' : project.status === 'active' ? '#22c55e' : project.status === 'on_hold' ? '#ef4444' : '#6366f1';
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleSelectProject(project)}
                      className={`group rounded-xl p-4 border cursor-pointer transition-all ${
                        selectedProject?.id === project.id
                          ? isDark
                            ? 'bg-blue-500/10 border-blue-500/30'
                            : 'bg-[#153969]/5 border-[#153969]/20'
                          : isDark
                            ? 'bg-gray-800/60 border-gray-700/50 hover:border-gray-600'
                            : 'bg-white border-gray-200/50 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {project.image_url && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                            <img src={project.image_url} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className={`text-sm font-semibold truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {isEn ? (project.title_en || project.title) : project.title}
                            </h3>
                            <span
                              className="shrink-0 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md"
                              style={{ backgroundColor: `${statusColor}15`, color: statusColor }}
                            >
                              {statusCfg.icon}
                              {isEn ? statusCfg.labelEn : statusCfg.label}
                            </span>
                          </div>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {project.client} • {project.location_name}
                          </p>
                          {/* Progress bar */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${project.progress}%`, backgroundColor: statusColor }}
                              />
                            </div>
                            <span className={`text-xs font-semibold min-w-[32px] text-right ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {project.progress}%
                            </span>
                          </div>
                          {project.current_phase && (
                            <p className={`text-xs mt-1.5 flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              <MapPin className="w-3 h-3" /> {project.current_phase}
                            </p>
                          )}
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={`rounded-2xl border overflow-hidden sticky top-24 ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200/50'}`}
                >
                  {/* Image */}
                  {selectedProject.image_url && (
                    <div className="relative h-40 overflow-hidden">
                      <img src={selectedProject.image_url} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <p className="text-white font-semibold text-sm truncate">
                          {isEn ? (selectedProject.title_en || selectedProject.title) : selectedProject.title}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {isEn ? 'Progress' : 'Progres'}
                        </span>
                        <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {selectedProject.progress}%
                        </span>
                      </div>
                      <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedProject.progress}%` }}
                          transition={{ duration: 0.6 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#153969] to-[#2563eb]"
                        />
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="space-y-2.5 mb-4">
                      {[
                        { icon: <User className="w-3.5 h-3.5" />, label: isEn ? 'Client' : 'Klien', value: selectedProject.client },
                        { icon: <MapPin className="w-3.5 h-3.5" />, label: isEn ? 'Location' : 'Lokasi', value: selectedProject.location_name },
                        { icon: <Building2 className="w-3.5 h-3.5" />, label: isEn ? 'Phase' : 'Fase', value: selectedProject.current_phase },
                        { icon: <Calendar className="w-3.5 h-3.5" />, label: isEn ? 'Start' : 'Mulai', value: selectedProject.start_date ? new Date(selectedProject.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-' },
                      ].map((info, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>{info.icon}</span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{info.label}:</span>
                          <span className={`text-xs font-medium flex-1 text-right truncate ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{info.value || '-'}</span>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    {(selectedProject.description || selectedProject.description_en) && (
                      <div className="mb-4">
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {isEn ? (selectedProject.description_en || selectedProject.description) : selectedProject.description}
                        </p>
                      </div>
                    )}

                    {/* Updates Timeline */}
                    {updates.length > 0 && (
                      <div>
                        <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {isEn ? 'Recent Updates' : 'Update Terbaru'}
                        </h4>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {updates.slice(0, 5).map((update) => (
                            <div key={update.id} className={`relative pl-4 border-l-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                              <div className={`absolute left-[-5px] top-1 w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-[#153969]'}`} />
                              <p className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {update.title}
                              </p>
                              {update.description && (
                                <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {update.description}
                                </p>
                              )}
                              <p className={`text-[10px] mt-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                {new Date(update.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                {update.updater_name && ` • ${update.updater_name}`}
                                {update.progress_after !== null && ` • ${update.progress_after}%`}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`rounded-2xl border p-8 text-center ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200/50'}`}
                >
                  <Building2 className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {isEn ? 'Select a project' : 'Pilih proyek'}
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {isEn ? 'Click on a project or map marker to view details' : 'Klik proyek atau marker di peta untuk melihat detail'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
