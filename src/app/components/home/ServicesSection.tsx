'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Building2, Hammer, Factory, Settings } from 'lucide-react';

const services = [
  {
    id: 'buildings',
    title: 'Gedung & Properti',
    icon: Building2,
    image: '/images/servicesection-1.jpg',
    description: 'Pembangunan dan renovasi gedung komersial dan residensial dengan standar kualitas tinggi',
    projects: [
      {
        title: 'Pembangunan Condotel HAPPER Ciawi Tower A, B, C',
        description: 'Pengembangan properti hunian modern dengan fasilitas lengkap'
      },
      {
        title: 'KERATON AT THE PLAZA RESIDENCE',
        description: 'Pekerjaan renovasi lantai 6 dengan standar premium'
      }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Infrastruktur Sipil',
    icon: Hammer,
    image: '/images/servicesection-2.jpg',
    description: 'Pengembangan dan rehabilitasi infrastruktur untuk menunjang kebutuhan masyarakat',
    projects: [
      {
        title: 'Rehabilitasi Jalan dan Jembatan',
        description: 'Ruas Cipanas – Warung Banten, peningkatan kualitas infrastruktur'
      },
      {
        title: 'Saluran Drainase & Pematangan Lahan',
        description: 'Pengembangan sistem drainase dan persiapan lahan konstruksi'
      }
    ]
  },
  {
    id: 'land-development',
    title: 'Pengembangan Lahan',
    icon: Factory,
    image: '/images/servicesection-3.jpg',
    description: 'Pematangan dan pengembangan lahan untuk berbagai kebutuhan proyek',
    projects: [
      {
        title: 'Pekerjaan Cut & Fill',
        description: 'Penyesuaian kontur tanah dan persiapan lahan pembangunan'
      },
      {
        title: 'Pekerjaan Timbunan Perumahan Alam Sutera I',
        description: 'Pengembangan kawasan residensial premium'
      }
    ]
  },
  {
    id: 'special',
    title: 'Proyek Khusus',
    icon: Settings,
    image: '/images/servicesection-4.jpg',
    description: 'Penanganan proyek-proyek dengan spesifikasi dan kebutuhan khusus',
    projects: [
      {
        title: 'Interior & Furniture Club House',
        description: 'Pengerjaan interior dan furnishing untuk Zora BSD City'
      },
      {
        title: 'Pekerjaan Reflected Pond Lobby',
        description: 'Konstruksi fitur air arsitektural di Grand Hyatt'
      }
    ]
  }
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section className="min-h-screen bg-[#f8fafc] py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold text-[#153969] tracking-wider uppercase mb-3"
          >
            LAYANAN KAMI
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Membangun dengan Visi dan Kualitas
          </motion.h3>
        </div>

        {/* Service Navigation */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="flex space-x-8">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service)}
                className="group relative px-4 py-2"
              >
                <span className={`text-lg font-medium transition-colors whitespace-nowrap ${
                  activeService.id === service.id 
                    ? 'text-[#153969]' 
                    : 'text-gray-500 group-hover:text-[#153969]'
                }`}>
                  {service.title}
                </span>
                {activeService.id === service.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#153969]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-12 gap-12 items-start"
          >
            {/* Image Section */}
            <div className="lg:col-span-7 relative h-[600px] rounded-2xl overflow-hidden">
              <motion.div
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </motion.div>
              {/* Service Info Overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur">
                    <activeService.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-white">
                    {activeService.title}
                  </h4>
                </div>
                <p className="text-lg text-white/90 max-w-2xl">
                  {activeService.description}
                </p>
              </motion.div>
            </div>

            {/* Projects List */}
            <div className="lg:col-span-5 space-y-6">
              <h5 className="text-xl font-semibold text-gray-900 mb-8">
                Proyek Unggulan
              </h5>
              {activeService.projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group p-6 rounded-xl bg-white border border-gray-200 hover:border-[#153969] 
                           transition-all duration-300 hover:shadow-lg"
                >
                  <h6 className="text-lg font-semibold text-gray-900 mb-2 
                               group-hover:text-[#153969] transition-colors">
                    {project.title}
                  </h6>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full bg-[#153969] text-white px-8 py-4 rounded-xl 
                         hover:bg-[#1e4d8d] transition-all duration-300 shadow-lg
                         hover:shadow-[#153969]/20"
              >
                Konsultasikan Proyek Anda
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;