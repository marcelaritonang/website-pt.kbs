'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Package, Truck, Calculator, Users, BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function TechLandingPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { language } = useLanguage();
  const isEn = language === 'en';

  const features = [
    {
      icon: <Building2 className="w-5 h-5" />,
      title: isEn ? 'Project Tracking' : 'Tracking Proyek',
      desc: isEn
        ? 'Monitor project progress in real-time with timeline, milestones, and automatic updates to all stakeholders.'
        : 'Monitor progres proyek real-time dengan timeline, milestones, dan update otomatis ke seluruh stakeholder.',
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: isEn ? 'Material Procurement' : 'Pengadaan Material',
      desc: isEn
        ? 'Complete material catalog with supplier price comparison and direct ordering from the platform.'
        : 'Katalog material lengkap dengan perbandingan harga supplier dan pemesanan langsung dari platform.',
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: isEn ? 'Equipment Management' : 'Manajemen Alat Berat',
      desc: isEn
        ? 'Heavy equipment booking, usage scheduling, and utilization tracking in one place.'
        : 'Booking alat berat, penjadwalan penggunaan, dan tracking utilisasi dalam satu tempat.',
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      title: isEn ? 'Budget & RAB' : 'Anggaran & RAB',
      desc: isEn
        ? 'Automatic RAB calculator based on regional market prices. Expenditure tracking vs budget.'
        : 'Kalkulator RAB otomatis berbasis harga pasar regional. Tracking pengeluaran vs anggaran.',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: isEn ? 'Team Coordination' : 'Koordinasi Tim',
      desc: isEn
        ? 'Assign teams to projects, centralized internal communication, and field attendance tracking.'
        : 'Assign tim ke proyek, komunikasi internal terpusat, dan tracking kehadiran lapangan.',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: isEn ? 'Reports & Analytics' : 'Laporan & Analitik',
      desc: isEn
        ? 'Project performance dashboard, automated financial reports, and insights for business decisions.'
        : 'Dashboard performa proyek, laporan keuangan otomatis, dan insights untuk keputusan bisnis.',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: isEn ? 'Free' : 'Gratis',
      period: '',
      desc: isEn ? 'For individual contractors' : 'Untuk kontraktor perorangan',
      features: isEn
        ? ['1 active project', '2 users', 'Basic project tracking', 'RAB Calculator']
        : ['1 proyek aktif', '2 user', 'Project tracking dasar', 'Kalkulator RAB'],
      cta: isEn ? 'Get Started' : 'Mulai Gratis',
    },
    {
      name: 'Pro',
      price: 'Rp 499.000',
      period: isEn ? '/month' : '/bulan',
      desc: isEn ? 'For small-medium contractors' : 'Untuk kontraktor kecil-menengah',
      features: isEn
        ? ['10 active projects', '10 users', 'All Starter features', 'Material store', 'Equipment booking', 'Invoice & billing']
        : ['10 proyek aktif', '10 user', 'Semua fitur Starter', 'Material store', 'Equipment booking', 'Invoice & billing'],
      cta: isEn ? 'Try 14 Days Free' : 'Coba 14 Hari Gratis',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: isEn ? 'For large construction companies' : 'Untuk perusahaan konstruksi besar',
      features: isEn
        ? ['Unlimited projects', 'Unlimited users', 'All Pro features', 'API access', 'White-label option', 'Dedicated support']
        : ['Unlimited proyek', 'Unlimited user', 'Semua fitur Pro', 'API access', 'White-label', 'Dedicated support'],
      cta: isEn ? 'Contact Sales' : 'Hubungi Sales',
    },
  ];

  return (
    <div className={isDark ? 'bg-gray-900' : 'bg-white'}>

      {/* Hero */}
      <section className={`pt-28 pb-16 md:pt-36 md:pb-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className={`text-sm font-medium mb-4 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`}>
                BangunHub — {isEn ? 'Construction Management Platform' : 'Platform Manajemen Konstruksi'}
              </p>
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {isEn
                  ? 'Manage all your construction projects from one integrated platform.'
                  : 'Kelola seluruh proyek konstruksi dari satu platform yang terintegrasi.'}
              </h1>
              <p className={`text-base md:text-lg mb-8 leading-relaxed max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {isEn
                  ? 'Project tracking, material procurement, equipment management, and budgeting — built by practitioners who understand the construction industry.'
                  : 'Project tracking, pengadaan material, manajemen alat berat, dan budgeting — dibangun oleh praktisi yang memahami industri konstruksi.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/platform/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#153969] text-white text-sm font-medium rounded-lg hover:bg-[#1e4d8a] transition"
                >
                  {isEn ? 'Start Free' : 'Mulai Gratis'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/platform"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border transition ${
                    isDark
                      ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {isEn ? 'View Platform' : 'Lihat Platform'}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`py-12 border-y ${isDark ? 'bg-gray-800/50 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: isEn ? 'Contractors' : 'Kontraktor' },
              { value: '200+', label: isEn ? 'Projects Managed' : 'Proyek Dikelola' },
              { value: '10', label: isEn ? 'Regions' : 'Wilayah' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'}`}>
                  {stat.value}
                </p>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'Everything You Need' : 'Semua yang Anda Butuhkan'}
            </h2>
            <p className={`text-base max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isEn
                ? 'One integrated platform to manage all aspects of your construction project.'
                : 'Satu platform terintegrasi untuk mengelola seluruh aspek proyek konstruksi Anda.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`p-6 rounded-xl border transition-all ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    : 'bg-white border-gray-200 hover:border-[#153969]/30 hover:shadow-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-[#153969]/5 text-[#153969]'
                }`}>
                  {f.icon}
                </div>
                <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {f.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'Simple Pricing' : 'Harga Transparan'}
            </h2>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isEn ? 'Start free, upgrade anytime as needed.' : 'Mulai gratis, upgrade kapan saja sesuai kebutuhan.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`p-6 rounded-xl border ${
                  plan.highlight
                    ? isDark
                      ? 'bg-[#153969] border-[#153969] ring-1 ring-blue-500/20'
                      : 'bg-[#153969] border-[#153969] ring-1 ring-[#153969]/20'
                    : isDark
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                }`}
              >
                <p className={`text-sm font-medium mb-1 ${
                  plan.highlight ? 'text-white/70' : isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {plan.name}
                </p>
                <div className="mb-1">
                  <span className={`text-2xl font-bold ${
                    plan.highlight ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${
                      plan.highlight ? 'text-white/50' : isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-xs mb-5 ${
                  plan.highlight ? 'text-white/50' : isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {plan.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`text-sm ${
                      plan.highlight ? 'text-white/80' : isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      • {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full py-2.5 text-center text-sm font-medium rounded-lg transition ${
                    plan.highlight
                      ? 'bg-white text-[#153969] hover:bg-gray-100'
                      : isDark
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-[#153969] text-white hover:bg-[#1e4d8a]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'Ready to manage projects more efficiently?' : 'Siap mengelola proyek dengan lebih efisien?'}
            </h2>
            <p className={`text-base mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isEn
                ? 'Join 50+ contractors across Indonesia who are already using BangunHub.'
                : 'Bergabung dengan 50+ kontraktor di seluruh Indonesia yang sudah menggunakan BangunHub.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/platform/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#153969] text-white text-sm font-medium rounded-lg hover:bg-[#1e4d8a] transition"
              >
                {isEn ? 'Start Free' : 'Mulai Gratis'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/6281218127503"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border transition ${
                  isDark
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isEn ? 'Contact via WhatsApp' : 'Hubungi via WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
