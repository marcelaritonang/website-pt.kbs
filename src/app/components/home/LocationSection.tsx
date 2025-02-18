'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building2, Users, Clock, MapPin } from 'lucide-react';

const brandColors = {
  primary: '#153969',    // Navy Blue
  secondary: '#1E4D2B',  // Dark Green
  accent: '#4A90E2',     // Light Blue
};

const officeLocation = {
  top: "60%",
  left: "25%",
  name: "Kantor Pusat Jakarta",
  address: "Jl. Raya Jatiwaringin No.06 2, RT.2/RW.13, Cipinang Melayu, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13620"
};

const LocationSection = () => {
  const stats = [
    {
      value: "15+",
      label: "Proyek Selesai ",
      icon: Building2
    },
    {
      value: "100%",
      label: "Kepuasan Client",
      icon: Users
    },
    {
      value: "24/7",
      label: "Dukungan Teknis",
      icon: Clock
    }
  ];

  return (
    <section className="relative min-h-screen bg-[#343541] py-20 overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 pattern-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Lokasi Kami
            </h2>
            <p className="text-xl text-gray-300">
              Melayani Proyek Konstruksi di Seluruh Indonesia
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Map Section */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/indonesia-map-2.png"
                  alt="Peta Lokasi PT Karya Bangun Semesta"
                  fill
                  className="object-cover"
                />
                {/* Office Location Marker */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: officeLocation.top,
                    left: officeLocation.left
                  }}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-[#153969] to-[#718bab] rounded-full shadow-lg shadow-blue-400/50" />
                  <div className="w-6 h-6 bg-gradient-to-r from-[#153969]/50 to-[#718bab]/50 rounded-full animate-ping absolute inset-0" />
                  <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-700/90 px-4 py-2 rounded-lg whitespace-nowrap border border-gray-600">
                    <span className="text-[#718bab] text-sm font-medium">{officeLocation.name}</span>
                  </div>
                </motion.div>

                {/* Map Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#343541] via-transparent opacity-40" />
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-700/20 backdrop-blur rounded-xl p-6 border border-gray-600"
                >
                  <stat.icon className="w-8 h-8 text-[#718bab] mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5 space-y-8">
            {/* Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-700/20 backdrop-blur rounded-2xl p-8 border border-gray-600"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-[#153969]/10 mt-1">
                  <MapPin className="w-6 h-6 text-[#718bab]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Kantor Pusat</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {officeLocation.address}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Service Areas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-700/20 backdrop-blur rounded-2xl p-8 border border-gray-600"
            >
              <h4 className="text-2xl font-bold text-white mb-6">Area Layanan</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#153969] to-[#718bab] rounded-full" />
                  <span className="text-gray-300">Konstruksi Bangunan Komersial</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#153969] to-[#718bab] rounded-full" />
                  <span className="text-gray-300">Infrastruktur & Jalan</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#153969] to-[#718bab] rounded-full" />
                  <span className="text-gray-300">Proyek Industri & Manufaktur</span>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="w-full bg-gradient-to-r from-[#153969] to-[#718bab] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Hubungi Kami
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pattern-grid {
          background-image: radial-gradient(#ffffff 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </section>
  );
};

export default LocationSection;