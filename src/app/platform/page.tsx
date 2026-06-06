'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, BarChart3, ShoppingBag, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function PlatformPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: language === 'id' ? 'Sewa Alat Berat' : 'Equipment Booking',
      description: language === 'id'
        ? 'Booking excavator, dump truck, crane, dan alat berat lainnya secara online. Real-time availability dan harga transparan.'
        : 'Book excavators, dump trucks, cranes, and other heavy equipment online. Real-time availability and transparent pricing.',
      href: '/platform/equipment-booking',
      color: 'bg-blue-500'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: language === 'id' ? 'Tracking Proyek' : 'Project Tracking',
      description: language === 'id'
        ? 'Pantau progress proyek konstruksi real-time. Timeline, foto update, laporan, dan komunikasi dalam satu platform.'
        : 'Monitor construction project progress in real-time. Timeline, photo updates, reports, and communication in one platform.',
      href: '/platform/project-tracking',
      color: 'bg-green-500'
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: language === 'id' ? 'Material Store' : 'Material Store',
      description: language === 'id'
        ? 'Marketplace material bangunan lengkap. Beli semen, besi, pasir, batu, dan material lainnya langsung dari supplier terpercaya.'
        : 'Complete construction material marketplace. Buy cement, steel, sand, gravel, and other materials directly from trusted suppliers.',
      href: '/platform/material-store',
      color: 'bg-orange-500'
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: language === 'id' ? 'Cepat & Efisien' : 'Fast & Efficient',
      description: language === 'id' ? 'Proses booking dan order dalam hitungan menit' : 'Booking and ordering process in minutes'
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: language === 'id' ? 'Aman & Terpercaya' : 'Secure & Trusted',
      description: language === 'id' ? 'Transaksi aman dengan jaminan kualitas' : 'Secure transactions with quality guarantee'
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: language === 'id' ? 'Akses Kapan Saja' : 'Access Anytime',
      description: language === 'id' ? 'Platform tersedia 24/7 dari perangkat manapun' : 'Platform available 24/7 from any device'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#153969] to-[#0a1f3d]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 border border-white/20">
              {language === 'id' ? '🚀 Platform Digital KBS' : '🚀 KBS Digital Platform'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === 'id'
                ? 'Solusi Digital untuk Industri Konstruksi'
                : 'Digital Solutions for Construction Industry'
              }
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {language === 'id'
                ? 'Sewa alat berat, pantau proyek, dan beli material bangunan — semua dalam satu platform terintegrasi.'
                : 'Rent heavy equipment, monitor projects, and buy construction materials — all in one integrated platform.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/platform/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#153969] rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                {language === 'id' ? 'Mulai Sekarang' : 'Get Started'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/50 text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className={`py-20 px-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'id' ? 'Layanan Platform' : 'Platform Services'}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'id'
                ? 'Tiga layanan utama yang membantu bisnis konstruksi Anda lebih efisien'
                : 'Three main services to help your construction business be more efficient'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={feature.href} className="block group">
                  <div className={`p-8 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 ${
                    isDark ? 'bg-gray-900 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-[#153969]/30'
                  }`}>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.color} text-white mb-6`}>
                      {feature.icon}
                    </div>
                    <h3 className={`text-xl font-bold mb-3 group-hover:text-[#153969] transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[#153969] font-medium text-sm group-hover:gap-2 transition-all">
                      {language === 'id' ? 'Lihat Detail' : 'View Details'}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`py-20 px-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {benefit.icon}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {benefit.title}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gray-800' : 'bg-[#153969]'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'id' ? 'Siap Memulai?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            {language === 'id'
              ? 'Daftar gratis dan mulai gunakan platform digital KBS untuk bisnis konstruksi Anda.'
              : 'Register for free and start using the KBS digital platform for your construction business.'
            }
          </p>
          <Link
            href="/platform/login"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#153969] rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {language === 'id' ? 'Daftar Gratis' : 'Register Free'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
