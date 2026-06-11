'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, BarChart3, Package, Truck, Calculator, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const TechSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    {
      icon: <Building2 className="w-5 h-5" />,
      title: isEn ? 'Project Tracking' : 'Tracking Proyek',
      desc: isEn ? 'Real-time monitoring' : 'Monitoring real-time',
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: isEn ? 'Material Procurement' : 'Pengadaan Material',
      desc: isEn ? 'Supplier marketplace' : 'Marketplace supplier',
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: isEn ? 'Equipment Management' : 'Manajemen Alat',
      desc: isEn ? 'Booking & scheduling' : 'Booking & penjadwalan',
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      title: isEn ? 'RAB & Budgeting' : 'RAB & Anggaran',
      desc: isEn ? 'Auto cost estimation' : 'Estimasi biaya otomatis',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: isEn ? 'Team Management' : 'Manajemen Tim',
      desc: isEn ? 'Assign & communicate' : 'Assign & komunikasi',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: isEn ? 'Analytics' : 'Analitik',
      desc: isEn ? 'Reports & insights' : 'Laporan & insights',
    },
  ];

  return (
    <section className={`py-20 ${isDark ? 'bg-[#0a1628]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5 ${
              isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-[#153969]/5 text-[#153969] border border-[#153969]/10'
            }`}>
              <div className="w-5 h-5 bg-gradient-to-br from-[#153969] to-[#2563eb] rounded flex items-center justify-center">
                <Building2 className="w-3 h-3 text-white" />
              </div>
              {isEn ? 'Our Tech Division' : 'Divisi Teknologi Kami'}
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              BangunHub
            </h2>
            <p className={`text-lg mb-3 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {isEn
                ? 'Construction Management Platform'
                : 'Platform Manajemen Konstruksi'}
            </p>
            <p className={`text-base mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isEn
                ? 'Our in-house technology arm develops digital solutions for the construction industry. From project tracking to material procurement — we help contractors work smarter, not harder.'
                : 'Divisi teknologi internal kami mengembangkan solusi digital untuk industri konstruksi. Dari tracking proyek hingga pengadaan material — kami membantu kontraktor bekerja lebih efisien.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tech"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#153969] text-white font-medium rounded-xl hover:bg-[#1e4d8a] transition shadow-lg shadow-[#153969]/15"
              >
                {isEn ? 'Explore BangunHub' : 'Jelajahi BangunHub'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/platform"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-xl transition border ${
                  isDark
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isEn ? 'Go to Platform' : 'Buka Platform'}
              </Link>
            </div>
          </motion.div>

          {/* Right — Feature Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className={`p-4 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-md ${
                    isDark
                      ? 'bg-gray-800/60 border-gray-700/50 hover:border-blue-500/30'
                      : 'bg-gray-50 border-gray-100 hover:border-[#153969]/20'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                    isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-[#153969]/5 text-[#153969]'
                  }`}>
                    {f.icon}
                  </div>
                  <h4 className={`text-sm font-semibold mb-0.5 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {f.title}
                  </h4>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TechSection;
