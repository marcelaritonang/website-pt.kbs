'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart3, Building2, Package, Truck, Calculator, Users,
  ArrowRight, CheckCircle2, Globe, Shield, Zap, LineChart,
  Smartphone, Cloud, ChevronRight
} from 'lucide-react';

export default function TechLandingPage() {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Project Tracking',
      desc: 'Monitor progres proyek real-time dengan timeline, milestones, dan update otomatis ke klien.',
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Material Procurement',
      desc: 'Katalog material lengkap, perbandingan harga supplier, dan pemesanan langsung dari platform.',
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Equipment Management',
      desc: 'Booking dan jadwal alat berat, tracking utilisasi, dan manajemen maintenance.',
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'RAB & Budgeting',
      desc: 'Kalkulator RAB otomatis berbasis harga pasar regional, tracking pengeluaran vs budget.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Management',
      desc: 'Assign tim ke proyek, tracking kehadiran, dan komunikasi internal terpusat.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics & Reports',
      desc: 'Dashboard performa proyek, laporan keuangan, dan insights untuk decision making.',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: 'Gratis',
      period: '',
      desc: 'Untuk kontraktor perorangan',
      features: ['1 proyek aktif', '2 user', 'Project tracking dasar', 'Kalkulator RAB'],
      cta: 'Mulai Gratis',
      highlight: false,
    },
    {
      name: 'Pro',
      price: 'Rp 499rb',
      period: '/bulan',
      desc: 'Untuk kontraktor kecil-menengah',
      features: ['10 proyek aktif', '10 user', 'Semua fitur Starter', 'Material store', 'Equipment booking', 'Invoice & billing', 'Priority support'],
      cta: 'Coba 14 Hari Gratis',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'Untuk perusahaan konstruksi besar',
      features: ['Unlimited proyek', 'Unlimited user', 'Semua fitur Pro', 'API access', 'White-label option', 'Dedicated account manager', 'Custom integrations', 'SLA 99.9%'],
      cta: 'Hubungi Sales',
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/tech" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#153969] to-[#2563eb] rounded-lg flex items-center justify-center">
                <Building2 className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">BangunHub</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition">Fitur</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition">Harga</a>
              <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition">Tentang</a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/platform"
                className="text-sm text-gray-600 hover:text-gray-900 transition hidden sm:block"
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 bg-[#153969] text-white text-sm font-medium rounded-lg hover:bg-[#1e4d8a] transition"
              >
                Mulai Sekarang
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-6">
                <Zap className="w-3.5 h-3.5" />
                Platform #1 Manajemen Konstruksi di Indonesia
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Kelola Proyek Konstruksi dari{' '}
                <span className="text-[#153969]">Satu Platform</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Project tracking, material procurement, equipment management, dan budgeting — semua dalam satu dashboard yang mudah digunakan.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#153969] text-white font-medium rounded-xl hover:bg-[#1e4d8a] transition shadow-lg shadow-[#153969]/20"
                >
                  Coba Gratis 14 Hari
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
                >
                  Lihat Fitur
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Tidak perlu kartu kredit • Setup dalam 5 menit
              </p>
            </motion.div>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/50 overflow-hidden bg-gray-900 p-1">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 rounded-t-xl">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 text-center">
                    app.bangunhub.id/dashboard
                  </div>
                </div>
              </div>
              {/* Dashboard mockup */}
              <div className="bg-[#0a1628] p-6 md:p-8 rounded-b-xl">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Proyek Aktif', value: '12', color: 'text-blue-400' },
                    { label: 'Total Budget', value: 'Rp 4.2M', color: 'text-green-400' },
                    { label: 'Tim', value: '28 orang', color: 'text-purple-400' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 col-span-2 md:col-span-1">
                    <p className="text-xs text-gray-500 mb-3">Progress Proyek</p>
                    <div className="space-y-2">
                      {[
                        { name: 'Renovasi Rumah Hendra', progress: 65 },
                        { name: 'Rumah Type 45 Cibubur', progress: 40 },
                        { name: 'Fasad Ruko Bogor', progress: 25 },
                      ].map((p, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">{p.name}</span>
                            <span className="text-gray-500">{p.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 col-span-2 md:col-span-1">
                    <p className="text-xs text-gray-500 mb-3">Aktivitas Terbaru</p>
                    <div className="space-y-2.5">
                      {[
                        'Material semen dikirim ke lokasi',
                        'Excavator dijadwalkan Senin',
                        'Invoice #0042 dibayar klien',
                      ].map((a, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                          <p className="text-xs text-gray-400 truncate">{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400 mb-6">Dipercaya oleh kontraktor di seluruh Indonesia</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {['50+ Kontraktor', '200+ Proyek Dikelola', 'Rp 150M+ Budget Tracked', '10 Kota'].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-bold text-gray-800">{s.split(' ')[0]}</p>
                <p className="text-xs text-gray-500">{s.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Satu platform terintegrasi untuk mengelola seluruh aspek proyek konstruksi Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#153969]/5 flex items-center justify-center text-[#153969] mb-4 group-hover:bg-[#153969]/10 transition">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BangunHub */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Dibangun oleh Praktisi Konstruksi
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                BangunHub dikembangkan oleh tim yang memahami industri konstruksi Indonesia.
                Kami tahu tantangan kontraktor — dari tracking progres sampai procurement material —
                karena kami mengalaminya sendiri.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Globe className="w-5 h-5" />, text: 'Harga material terupdate di 10 wilayah Indonesia' },
                  { icon: <Shield className="w-5 h-5" />, text: 'Data proyek terenkripsi dan aman' },
                  { icon: <Smartphone className="w-5 h-5" />, text: 'Akses dari mana saja, kapan saja' },
                  { icon: <Cloud className="w-5 h-5" />, text: 'Cloud-based, tidak perlu install' },
                  { icon: <LineChart className="w-5 h-5" />, text: 'Analytics untuk keputusan lebih baik' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-sm text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#153969] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  R
                </div>
                <div>
                  <p className="font-medium text-gray-900">Rianco</p>
                  <p className="text-xs text-gray-500">Direktur, PT Karya Bangun Semesta</p>
                </div>
              </div>
              <blockquote className="text-gray-600 leading-relaxed italic">
                &ldquo;Sebelum pakai BangunHub, kami manage 10+ proyek pakai WhatsApp dan Excel.
                Sekarang semua terpusat — klien bisa lihat progres real-time, tim procurement bisa order material langsung,
                dan saya bisa monitor semua dari satu dashboard.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Harga Transparan
            </h2>
            <p className="text-gray-600">
              Mulai gratis, upgrade kapan saja sesuai kebutuhan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-2xl p-6 border ${
                  plan.highlight
                    ? 'border-[#153969] ring-2 ring-[#153969]/10 shadow-xl shadow-[#153969]/5'
                    : 'border-gray-200'
                } relative`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#153969] text-white text-xs font-medium rounded-full">
                    Paling Populer
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full py-2.5 text-center text-sm font-medium rounded-xl transition ${
                    plan.highlight
                      ? 'bg-[#153969] text-white hover:bg-[#1e4d8a]'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <section className="py-20 bg-[#153969]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Digitalisasi Proyek Anda?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Bergabung dengan 50+ kontraktor yang sudah menggunakan BangunHub untuk mengelola proyek mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#153969] font-medium rounded-xl hover:bg-gray-100 transition"
            >
              Mulai Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/6281218127503"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition border border-white/20"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-gradient-to-br from-[#153969] to-[#2563eb] rounded-lg flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">BangunHub</span>
              </div>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                Platform manajemen konstruksi all-in-one untuk kontraktor Indonesia.
                Dikembangkan oleh PT Karya Bangun Semesta.
              </p>
              <div className="mt-4">
                <Link href="/" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition">
                  <ChevronRight className="w-3 h-3" />
                  Kunjungi PT Karya Bangun Semesta
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Produk</h4>
              <ul className="space-y-2">
                {['Project Tracking', 'Material Store', 'Equipment Booking', 'RAB Calculator'].map((item, i) => (
                  <li key={i}>
                    <a href="#features" className="text-sm text-gray-500 hover:text-gray-700 transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Perusahaan</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Tentang Kami', href: '/about/profile' },
                  { label: 'Karir', href: '/karir' },
                  { label: 'Kontak', href: '/contact' },
                  { label: 'Privacy Policy', href: '/privacy' },
                ].map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-gray-700 transition">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              © 2025 BangunHub. A product of PT Karya Bangun Semesta. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
