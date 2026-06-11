'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Building2, Package, Truck, Calculator, Users, BarChart3,
  Shield, Zap, Globe, Cloud, Lock, CheckCircle2, ChevronDown,
  Smartphone, Clock, TrendingUp, Layers, Database, Code2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function TechLandingPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const howItWorks = [
    {
      step: '01',
      title: isEn ? 'Create Your Account' : 'Buat Akun',
      desc: isEn
        ? 'Sign up in 30 seconds. No credit card required. Start with the free Starter plan.'
        : 'Daftar dalam 30 detik. Tidak perlu kartu kredit. Mulai dengan paket Starter gratis.',
    },
    {
      step: '02',
      title: isEn ? 'Set Up Your Project' : 'Setup Proyek',
      desc: isEn
        ? 'Add your project details, team members, timeline, and budget. Import from spreadsheet or start fresh.'
        : 'Tambahkan detail proyek, anggota tim, timeline, dan anggaran. Import dari spreadsheet atau mulai baru.',
    },
    {
      step: '03',
      title: isEn ? 'Track & Manage' : 'Kelola & Pantau',
      desc: isEn
        ? 'Track progress, manage materials, coordinate teams, and generate reports — all from one dashboard.'
        : 'Pantau progress, kelola material, koordinasi tim, dan buat laporan — semua dari satu dashboard.',
    },
  ];

  const whyBangunHub = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: isEn ? 'Built for Indonesia' : 'Dibuat untuk Indonesia',
      desc: isEn
        ? 'Pricing in IDR, Indonesian material database, local supplier network, and Bahasa Indonesia interface.'
        : 'Harga dalam Rupiah, database material Indonesia, jaringan supplier lokal, dan antarmuka Bahasa Indonesia.',
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: isEn ? 'Mobile-First' : 'Mobile-First',
      desc: isEn
        ? 'Works on any device. Field workers can update progress from their phone — no desktop required.'
        : 'Berjalan di perangkat apapun. Pekerja lapangan bisa update progress dari HP — tanpa perlu desktop.',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: isEn ? 'Setup in Minutes' : 'Setup dalam Menit',
      desc: isEn
        ? 'No complex onboarding. Create project → add team → start tracking. Most users are productive within 10 minutes.'
        : 'Tanpa onboarding rumit. Buat proyek → tambah tim → mulai tracking. Kebanyakan user produktif dalam 10 menit.',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: isEn ? 'Industry Expertise' : 'Keahlian Industri',
      desc: isEn
        ? 'Built by construction practitioners with 6+ years of field experience. We understand your workflow.'
        : 'Dibuat oleh praktisi konstruksi dengan 6+ tahun pengalaman lapangan. Kami memahami workflow Anda.',
    },
  ];

  const techStack = [
    { icon: <Cloud className="w-5 h-5" />, label: isEn ? 'Cloud-Native' : 'Cloud-Native', desc: isEn ? 'Hosted on Vercel & AWS' : 'Dihosting di Vercel & AWS' },
    { icon: <Lock className="w-5 h-5" />, label: isEn ? 'SSL Encrypted' : 'Enkripsi SSL', desc: isEn ? '256-bit encryption' : 'Enkripsi 256-bit' },
    { icon: <Database className="w-5 h-5" />, label: isEn ? 'PostgreSQL' : 'PostgreSQL', desc: isEn ? 'Reliable database' : 'Database handal' },
    { icon: <Globe className="w-5 h-5" />, label: isEn ? 'Global CDN' : 'CDN Global', desc: isEn ? 'Fast anywhere in Indonesia' : 'Cepat di seluruh Indonesia' },
    { icon: <Code2 className="w-5 h-5" />, label: isEn ? 'REST API' : 'REST API', desc: isEn ? 'Open integration' : 'Integrasi terbuka' },
    { icon: <Shield className="w-5 h-5" />, label: isEn ? 'SOC 2 Ready' : 'SOC 2 Ready', desc: isEn ? 'Enterprise security' : 'Keamanan enterprise' },
  ];

  const faqs = [
    {
      q: isEn ? 'Is BangunHub really free to start?' : 'Apakah BangunHub benar-benar gratis?',
      a: isEn
        ? 'Yes! The Starter plan is completely free with 1 active project and 2 users. No credit card required, no time limit. Upgrade only when you need more capacity.'
        : 'Ya! Paket Starter sepenuhnya gratis dengan 1 proyek aktif dan 2 user. Tanpa kartu kredit, tanpa batas waktu. Upgrade hanya saat butuh kapasitas lebih.',
    },
    {
      q: isEn ? 'Can I import my existing project data?' : 'Bisakah saya import data proyek yang sudah ada?',
      a: isEn
        ? 'Yes. BangunHub supports CSV/Excel import for project timelines, material lists, and budget data. Our team can also help with custom migration.'
        : 'Bisa. BangunHub mendukung import CSV/Excel untuk timeline proyek, daftar material, dan data anggaran. Tim kami juga bisa bantu migrasi custom.',
    },
    {
      q: isEn ? 'Is my data secure?' : 'Apakah data saya aman?',
      a: isEn
        ? 'Absolutely. We use 256-bit SSL encryption, daily automated backups, and host on SOC 2 compliant infrastructure. Your project data is never shared with third parties.'
        : 'Tentu. Kami menggunakan enkripsi SSL 256-bit, backup otomatis harian, dan hosting di infrastruktur SOC 2 compliant. Data proyek Anda tidak pernah dibagikan ke pihak ketiga.',
    },
    {
      q: isEn ? 'Do I need technical knowledge to use BangunHub?' : 'Apakah saya perlu pengetahuan teknis untuk menggunakan BangunHub?',
      a: isEn
        ? 'No. BangunHub is designed for construction professionals, not IT experts. If you can use WhatsApp, you can use BangunHub. We also provide free onboarding support.'
        : 'Tidak. BangunHub dirancang untuk profesional konstruksi, bukan ahli IT. Kalau Anda bisa pakai WhatsApp, Anda bisa pakai BangunHub. Kami juga menyediakan dukungan onboarding gratis.',
    },
    {
      q: isEn ? 'Can field workers use it on their phones?' : 'Bisa dipakai pekerja lapangan di HP?',
      a: isEn
        ? 'Yes! BangunHub is fully responsive and works on any smartphone browser. Field workers can update progress, upload photos, and check schedules from their phone.'
        : 'Bisa! BangunHub sepenuhnya responsive dan berjalan di browser smartphone apapun. Pekerja lapangan bisa update progress, upload foto, dan cek jadwal dari HP mereka.',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: isEn ? 'Free' : 'Gratis',
      period: '',
      desc: isEn ? 'For individual contractors' : 'Untuk kontraktor perorangan',
      features: isEn
        ? ['1 active project', '2 users', 'Basic project tracking', 'RAB Calculator', 'Mobile access', 'Email support']
        : ['1 proyek aktif', '2 user', 'Project tracking dasar', 'Kalkulator RAB', 'Akses mobile', 'Dukungan email'],
      cta: isEn ? 'Get Started' : 'Mulai Gratis',
    },
    {
      name: 'Pro',
      price: 'Rp 499.000',
      period: isEn ? '/month' : '/bulan',
      desc: isEn ? 'For small-medium contractors' : 'Untuk kontraktor kecil-menengah',
      features: isEn
        ? ['10 active projects', '10 users', 'All Starter features', 'Material store & procurement', 'Equipment booking', 'Invoice & billing', 'Advanced analytics', 'Priority support']
        : ['10 proyek aktif', '10 user', 'Semua fitur Starter', 'Material store & pengadaan', 'Equipment booking', 'Invoice & billing', 'Analitik lanjutan', 'Dukungan prioritas'],
      cta: isEn ? 'Try 14 Days Free' : 'Coba 14 Hari Gratis',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: isEn ? 'For large construction companies' : 'Untuk perusahaan konstruksi besar',
      features: isEn
        ? ['Unlimited projects', 'Unlimited users', 'All Pro features', 'REST API access', 'White-label option', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee']
        : ['Unlimited proyek', 'Unlimited user', 'Semua fitur Pro', 'REST API access', 'White-label', 'Account manager dedikasi', 'Integrasi custom', 'Garansi SLA'],
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
              {!isEn && (
                <p className={`text-sm italic mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  All-in-one construction project management SaaS for Indonesian contractors.
                </p>
              )}
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
              <p className={`text-xs mt-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                {isEn ? 'No credit card required · Free forever on Starter' : 'Tanpa kartu kredit · Gratis selamanya untuk paket Starter'}
              </p>
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

      {/* How It Works */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'How It Works' : 'Cara Kerja'}
            </h2>
            <p className={`text-base max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isEn ? 'Get started in 3 simple steps.' : 'Mulai dalam 3 langkah sederhana.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className={`text-4xl font-bold mb-4 ${isDark ? 'text-blue-500/20' : 'text-[#153969]/10'}`}>
                  {item.step}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
                {i < 2 && (
                  <div className={`hidden md:block absolute top-8 -right-4 text-2xl ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'Powerful Features' : 'Fitur Lengkap'}
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

      {/* Why BangunHub */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'Why BangunHub?' : 'Mengapa BangunHub?'}
            </h2>
            <p className={`text-base max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isEn
                ? 'Not just another project management tool. Built specifically for Indonesian construction.'
                : 'Bukan sekadar project management biasa. Dibuat khusus untuk konstruksi Indonesia.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyBangunHub.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex gap-4 p-6 rounded-xl border ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700'
                    : 'bg-gray-50 border-gray-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-[#153969]/5 text-[#153969]'
                }`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Security */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'Enterprise-Grade Infrastructure' : 'Infrastruktur Kelas Enterprise'}
            </h2>
            <p className={`text-base max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isEn
                ? 'Built on modern, secure, and scalable technology so your data is always safe and accessible.'
                : 'Dibangun di atas teknologi modern, aman, dan scalable agar data Anda selalu aman dan dapat diakses.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`p-4 rounded-xl border text-center ${
                  isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                  isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-[#153969]/5 text-[#153969]'
                }`}>
                  {item.icon}
                </div>
                <p className={`text-xs font-semibold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.label}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'Simple, Transparent Pricing' : 'Harga Sederhana & Transparan'}
            </h2>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {isEn ? 'Start free, upgrade anytime as your business grows.' : 'Mulai gratis, upgrade kapan saja seiring bisnis berkembang.'}
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
                    ? 'bg-[#153969] border-blue-400/30 ring-1 ring-blue-400/20'
                    : isDark
                      ? 'bg-gray-800/80 border-gray-700'
                      : 'bg-white border-gray-200'
                }`}
              >
                {plan.highlight && (
                  <div className="text-xs font-medium text-blue-200 bg-blue-500/20 rounded-full px-3 py-1 inline-block mb-3">
                    {isEn ? 'Most Popular' : 'Paling Populer'}
                  </div>
                )}
                <p className={`text-sm font-medium mb-1 ${
                  plan.highlight ? 'text-blue-200' : isDark ? 'text-gray-400' : 'text-gray-500'
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
                      plan.highlight ? 'text-white/60' : isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-xs mb-5 ${
                  plan.highlight ? 'text-blue-100/60' : isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {plan.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`text-sm flex items-start gap-2 ${
                      plan.highlight ? 'text-white/90' : isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                        plan.highlight ? 'text-blue-300' : isDark ? 'text-blue-400' : 'text-[#153969]'
                      }`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/platform/login'}
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

      {/* FAQ */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isEn ? 'Frequently Asked Questions' : 'Pertanyaan yang Sering Diajukan'}
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`rounded-xl border overflow-hidden ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between p-5 text-left ${
                    isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-sm font-medium pr-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${
                    openFaq === i ? 'rotate-180' : ''
                  } ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
                {openFaq === i && (
                  <div className={`px-5 pb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p className="text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-[#153969]'
          }`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {isEn ? 'Ready to manage projects more efficiently?' : 'Siap mengelola proyek dengan lebih efisien?'}
            </h2>
            <p className={`text-base mb-8 ${isDark ? 'text-gray-300' : 'text-white/80'}`}>
              {isEn
                ? 'Join 50+ contractors across Indonesia who are already using BangunHub.'
                : 'Bergabung dengan 50+ kontraktor di seluruh Indonesia yang sudah menggunakan BangunHub.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/platform/login"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition ${
                  isDark
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-white text-[#153969] hover:bg-gray-100'
                }`}
              >
                {isEn ? 'Start Free — No Credit Card' : 'Mulai Gratis — Tanpa Kartu Kredit'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/6281218127503"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
              >
                {isEn ? 'Talk to Sales' : 'Bicara dengan Sales'}
              </a>
            </div>
            <p className={`text-xs mt-6 ${isDark ? 'text-gray-500' : 'text-white/50'}`}>
              BangunHub is a product of PT Karya Bangun Semesta · Jakarta, Indonesia
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
