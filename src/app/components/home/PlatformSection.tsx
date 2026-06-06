'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const PlatformSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { language } = useLanguage();

  const services = [
    {
      title: language === 'id' ? 'Sewa Alat Berat' : 'Equipment Rental',
      description: language === 'id'
        ? 'Booking excavator, dump truck, crane, bulldozer secara online. Harga transparan, tersedia harian dan bulanan.'
        : 'Book excavators, dump trucks, cranes, bulldozers online. Transparent pricing, available daily and monthly.',
      image: '/images/equipment/excavator-1.jpg',
      href: '/platform/equipment-booking',
      price: language === 'id' ? 'Mulai Rp 1.500.000/hari' : 'From Rp 1,500,000/day',
      badge: language === 'id' ? 'Tersedia 6 Unit' : '6 Units Available',
    },
    {
      title: language === 'id' ? 'Material Bangunan' : 'Building Materials',
      description: language === 'id'
        ? 'Marketplace semen, besi, pasir, kayu, cat dengan harga kompetitif. Antar langsung ke lokasi proyek.'
        : 'Marketplace for cement, steel, sand, wood, paint at competitive prices. Direct delivery to project site.',
      image: '/images/materials/semen-1.jpg',
      href: '/platform/material-store',
      price: language === 'id' ? 'Mulai Rp 62.000/sak' : 'From Rp 62,000/bag',
      badge: language === 'id' ? '8+ Produk' : '8+ Products',
    },
    {
      title: language === 'id' ? 'Tracking Proyek' : 'Project Tracking',
      description: language === 'id'
        ? 'Pantau progress proyek real-time. Dashboard lengkap dengan milestone, budget, dan laporan otomatis.'
        : 'Monitor project progress in real-time. Complete dashboard with milestones, budget, and automated reports.',
      image: '/images/equipment/crane-1.jpg',
      href: '/platform/project-tracking',
      price: language === 'id' ? 'Gratis untuk Member' : 'Free for Members',
      badge: language === 'id' ? 'Real-time' : 'Real-time',
    },
    {
      title: language === 'id' ? 'Konsultasi Gratis' : 'Free Consultation',
      description: language === 'id'
        ? 'Konsultasi langsung dengan tim ahli kami untuk perencanaan proyek, estimasi biaya, dan pemilihan material yang tepat. Tanpa biaya, tanpa kewajiban.'
        : 'Consult directly with our expert team for project planning, cost estimation, and material selection. No cost, no obligation.',
      image: '/images/equipment/operator-1.jpg',
      href: '/contact',
      price: language === 'id' ? 'Gratis / Free' : 'Free',
      badge: language === 'id' ? 'Tim Ahli' : 'Expert Team',
    },
  ];

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'id' ? 'Layanan Kami' : 'Our Services'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'id'
              ? 'Solusi lengkap untuk kebutuhan konstruksi Anda — dari perencanaan hingga pelaksanaan.'
              : 'Complete solutions for your construction needs — from planning to execution.'}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={service.href} className="group block h-full">
                <div className={`rounded-2xl overflow-hidden h-full border transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 group-hover:border-blue-500'
                    : 'bg-white border-gray-200 group-hover:border-blue-400'
                }`}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {service.badge}
                    </span>
                    <span className="absolute bottom-3 left-3 text-white text-sm font-semibold">
                      {service.price}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {service.description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                      <span>{language === 'id' ? 'Lihat Selengkapnya' : 'View Details'}</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            {language === 'id' ? 'Hubungi Tim Kami' : 'Contact Our Team'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformSection;
