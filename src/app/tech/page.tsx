'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function TechLandingPage() {
  const features = [
    {
      title: 'Project Tracking',
      desc: 'Monitor progres proyek real-time dengan timeline, milestones, dan update otomatis ke seluruh stakeholder.',
    },
    {
      title: 'Material Procurement',
      desc: 'Katalog material lengkap dengan perbandingan harga supplier dan pemesanan langsung dari platform.',
    },
    {
      title: 'Equipment Management',
      desc: 'Booking alat berat, penjadwalan penggunaan, dan tracking utilisasi dalam satu tempat.',
    },
    {
      title: 'Budget & RAB',
      desc: 'Kalkulator RAB otomatis berbasis harga pasar regional. Tracking pengeluaran vs anggaran.',
    },
    {
      title: 'Team Coordination',
      desc: 'Assign tim ke proyek, komunikasi internal terpusat, dan tracking kehadiran lapangan.',
    },
    {
      title: 'Reports & Analytics',
      desc: 'Dashboard performa proyek, laporan keuangan otomatis, dan insights untuk keputusan bisnis.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0EBE3]">

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#F0EBE3]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/tech" className="text-[#323232] text-lg tracking-[0.2em] font-medium uppercase">
              BangunHub
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-[#323232]/70 hover:text-[#323232] transition">Fitur</a>
              <a href="#pricing" className="text-sm text-[#323232]/70 hover:text-[#323232] transition">Harga</a>
              <a href="#about" className="text-sm text-[#323232]/70 hover:text-[#323232] transition">Tentang</a>
            </div>
            <Link
              href="/platform/login"
              className="px-5 py-2 bg-[#323232] text-white text-sm rounded-full hover:bg-[#1a1a1a] transition"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm text-[#323232]/50 mb-6 tracking-wide">
              Platform manajemen konstruksi
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] text-[#323232] leading-[1.15] mb-8 font-light">
              Kelola seluruh proyek konstruksi dari satu platform yang terintegrasi.
            </h1>
            <Link
              href="/platform/login"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#323232] text-white text-sm font-medium rounded-full hover:bg-[#1a1a1a] transition"
            >
              MULAI SEKARANG
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-[#323232]/10" />
      </div>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-[#323232]/50 mb-12 tracking-wide"
          >
            Apa yang kami tawarkan
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h3 className="text-lg text-[#323232] font-medium mb-3">{f.title}</h3>
                <p className="text-sm text-[#323232]/60 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-[#323232]/10" />
      </div>

      {/* Stats */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Kontraktor' },
              { value: '200+', label: 'Proyek dikelola' },
              { value: '10', label: 'Wilayah' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl text-[#323232] font-light mb-2">{stat.value}</p>
                <p className="text-xs text-[#323232]/50 tracking-wide uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-[#323232]/10" />
      </div>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-[#323232]/50 mb-4 tracking-wide"
          >
            Harga
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl text-[#323232] font-light mb-14 max-w-xl"
          >
            Transparan dan sederhana.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: 'Gratis',
                desc: 'Untuk kontraktor perorangan',
                features: ['1 proyek aktif', '2 user', 'Project tracking', 'Kalkulator RAB'],
              },
              {
                name: 'Pro',
                price: 'Rp 499.000',
                period: '/bulan',
                desc: 'Untuk kontraktor kecil-menengah',
                features: ['10 proyek aktif', '10 user', 'Semua fitur Starter', 'Material store', 'Equipment booking', 'Invoice & billing'],
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                desc: 'Untuk perusahaan konstruksi besar',
                features: ['Unlimited proyek', 'Unlimited user', 'Semua fitur Pro', 'API access', 'White-label', 'Dedicated support'],
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-2xl border ${
                  plan.highlight
                    ? 'bg-[#323232] text-white border-[#323232]'
                    : 'bg-white/50 border-[#323232]/10'
                }`}
              >
                <p className={`text-sm font-medium mb-1 ${plan.highlight ? 'text-white/70' : 'text-[#323232]/50'}`}>
                  {plan.name}
                </p>
                <div className="mb-2">
                  <span className={`text-2xl font-medium ${plan.highlight ? 'text-white' : 'text-[#323232]'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-[#323232]/40'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-xs mb-6 ${plan.highlight ? 'text-white/50' : 'text-[#323232]/40'}`}>
                  {plan.desc}
                </p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-[#323232]/70'}`}>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full py-2.5 text-center text-sm font-medium rounded-full transition ${
                    plan.highlight
                      ? 'bg-white text-[#323232] hover:bg-white/90'
                      : 'bg-[#323232] text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Hubungi kami' : 'Mulai'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-[#323232]/10" />
      </div>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl text-[#323232] font-light mb-6 leading-tight">
              Siap mengelola proyek dengan lebih efisien?
            </h2>
            <p className="text-[#323232]/50 text-base mb-8 leading-relaxed">
              Bergabung dengan 50+ kontraktor di seluruh Indonesia yang sudah menggunakan BangunHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/platform/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#323232] text-white text-sm font-medium rounded-full hover:bg-[#1a1a1a] transition"
              >
                MULAI GRATIS
              </Link>
              <a
                href="https://wa.me/6281218127503"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[#323232] text-sm font-medium rounded-full border border-[#323232]/20 hover:border-[#323232]/40 transition"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-[#323232]/10 py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-[#323232] text-sm tracking-[0.15em] font-medium uppercase mb-3">BangunHub</p>
              <p className="text-xs text-[#323232]/50 leading-relaxed">
                Platform manajemen konstruksi all-in-one.<br />
                Dikembangkan oleh PT Karya Bangun Semesta.
              </p>
              <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#323232]/40 hover:text-[#323232]/70 transition mt-3">
                <ArrowRight className="w-3 h-3" />
                karyabangunsemesta.my.id
              </Link>
            </div>
            <div>
              <p className="text-xs text-[#323232]/40 uppercase tracking-wider mb-3">Produk</p>
              <ul className="space-y-2">
                {['Project Tracking', 'Material Store', 'Equipment Booking', 'RAB Calculator'].map((item, i) => (
                  <li key={i}>
                    <a href="#features" className="text-sm text-[#323232]/60 hover:text-[#323232] transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-[#323232]/40 uppercase tracking-wider mb-3">Perusahaan</p>
              <ul className="space-y-2">
                {[
                  { label: 'Tentang', href: '/about/profile' },
                  { label: 'Karir', href: '/karir' },
                  { label: 'Kontak', href: '/contact' },
                  { label: 'Privasi', href: '/privacy' },
                ].map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="text-sm text-[#323232]/60 hover:text-[#323232] transition">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-[#323232]/5">
            <p className="text-xs text-[#323232]/30">
              © 2025 BangunHub — PT Karya Bangun Semesta
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
