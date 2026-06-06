'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, Camera, FileText, Clock, CheckCircle, AlertCircle, Users, ArrowRight, Lock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ProjectTrackingPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  const demoProjects = [
    {
      id: 'PRJ-001',
      name: language === 'id' ? 'Pembangunan Gedung Perkantoran Sudirman' : 'Sudirman Office Building Construction',
      client: 'PT Maju Bersama',
      progress: 72,
      status: 'on-track',
      startDate: '2024-01-15',
      endDate: '2025-06-30',
      lastUpdate: '2024-12-01',
      phase: language === 'id' ? 'Struktur Lantai 8' : 'Floor 8 Structure'
    },
    {
      id: 'PRJ-002',
      name: language === 'id' ? 'Renovasi Pabrik Cikarang' : 'Cikarang Factory Renovation',
      client: 'PT Indo Manufacturing',
      progress: 45,
      status: 'delayed',
      startDate: '2024-06-01',
      endDate: '2025-03-15',
      lastUpdate: '2024-11-28',
      phase: language === 'id' ? 'Instalasi MEP' : 'MEP Installation'
    },
    {
      id: 'PRJ-003',
      name: language === 'id' ? 'Jalan Tol Akses Pelabuhan' : 'Port Access Toll Road',
      client: 'PT Infrastruktur Nusantara',
      progress: 89,
      status: 'on-track',
      startDate: '2023-09-01',
      endDate: '2025-01-30',
      lastUpdate: '2024-12-02',
      phase: language === 'id' ? 'Finishing & Aspal' : 'Finishing & Asphalt'
    },
  ];

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: language === 'id' ? 'Progress Real-Time' : 'Real-Time Progress',
      description: language === 'id' ? 'Pantau persentase progress proyek secara langsung' : 'Monitor project progress percentage in real-time'
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: language === 'id' ? 'Foto Update' : 'Photo Updates',
      description: language === 'id' ? 'Dokumentasi visual progress setiap tahap' : 'Visual documentation of each phase progress'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: language === 'id' ? 'Laporan Otomatis' : 'Automated Reports',
      description: language === 'id' ? 'Generate laporan mingguan dan bulanan otomatis' : 'Auto-generate weekly and monthly reports'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === 'id' ? 'Kolaborasi Tim' : 'Team Collaboration',
      description: language === 'id' ? 'Komunikasi langsung dengan project manager' : 'Direct communication with project managers'
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'on-track') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          {language === 'id' ? 'Sesuai Jadwal' : 'On Track'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
        <AlertCircle className="w-3 h-3" />
        {language === 'id' ? 'Tertunda' : 'Delayed'}
      </span>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#153969] to-[#0a1f3d]"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'id' ? 'Tracking Proyek Konstruksi' : 'Construction Project Tracking'}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {language === 'id'
                ? 'Pantau progress proyek Anda secara real-time. Timeline, foto, laporan, dan komunikasi dalam satu dashboard.'
                : 'Monitor your project progress in real-time. Timeline, photos, reports, and communication in one dashboard.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-6 rounded-xl border text-center ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#153969]/10 text-[#153969] mb-4">
                {feature.icon}
              </div>
              <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Demo Dashboard */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'id' ? 'Demo Dashboard' : 'Demo Dashboard'}
            </h2>
            <Link
              href="/platform/login"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#153969] text-white rounded-lg text-sm font-medium hover:bg-[#1e4d8a] transition"
            >
              <Lock className="w-4 h-4" />
              {language === 'id' ? 'Login untuk Akses Penuh' : 'Login for Full Access'}
            </Link>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {demoProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-6 rounded-xl border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {project.id}
                      </span>
                      {getStatusBadge(project.status)}
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {project.name}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.client} • {project.phase}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        <Calendar className="w-3 h-3" />
                        {project.startDate} → {project.endDate}
                      </span>
                      <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        <Clock className="w-3 h-3" />
                        Update: {project.lastUpdate}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full md:w-48">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'id' ? 'Progress' : 'Progress'}
                      </span>
                      <span className={`text-sm font-bold text-[#153969]`}>
                        {project.progress}%
                      </span>
                    </div>
                    <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full rounded-full ${
                          project.status === 'on-track' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`p-8 rounded-2xl text-center ${isDark ? 'bg-gray-800' : 'bg-[#153969]/5'}`}>
          <Lock className={`w-10 h-10 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'id' ? 'Akses Dashboard Penuh' : 'Access Full Dashboard'}
          </h3>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'id'
              ? 'Login atau daftar untuk melihat detail proyek, foto progress, download laporan, dan chat dengan project manager.'
              : 'Login or register to view project details, progress photos, download reports, and chat with project managers.'
            }
          </p>
          <Link
            href="/platform/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#153969] text-white rounded-lg font-medium hover:bg-[#1e4d8a] transition"
          >
            {language === 'id' ? 'Login / Daftar' : 'Login / Register'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
