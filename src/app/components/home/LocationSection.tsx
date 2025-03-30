'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building2, Users, Clock, MapPin, ArrowRight, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const officeLocation = {
  top: "58%",
  left: "25%",
  name: "Kantor Pusat Jakarta",
  address: "Jl. Raya Jatiwaringin No.06 2, RT.2/RW.13, Cipinang Melayu, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13620",
  phone: "+6281218127503",
  email: "karyabangunsemestas@gmail.com"
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

  const serviceAreas = [
    "Konstruksi Bangunan Komersial",
    "Infrastruktur & Jalan",
    "Proyek Industri & Manufaktur",
    "Renovasi & Remodeling",
    "Desain & Perencanaan"
  ];

  return (
    <section className="relative bg-[#343541] py-12 md:py-20 overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 pattern-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Lokasi Kami
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Melayani Proyek Konstruksi di Seluruh Indonesia
            </p>
          </motion.div>
        </div>

        {/* Mobile Stats - Only shows on small screens */}
        <div className="grid grid-cols-3 gap-2 mb-8 md:hidden">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-700/20 backdrop-blur rounded-lg p-3 border border-gray-600"
            >
              <stat.icon className="w-6 h-6 text-[#718bab] mb-1" />
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-6 md:gap-12">
          {/* Map Section */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
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
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-[#153969] to-[#718bab] rounded-full shadow-lg shadow-blue-400/50" />
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-[#153969]/50 to-[#718bab]/50 rounded-full animate-ping absolute inset-0" />
                  <div className="absolute -bottom-16 md:-bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-700/90 px-3 py-1 md:px-4 md:py-2 rounded-lg whitespace-nowrap border border-gray-600">
                    <span className="text-[#718bab] text-xs md:text-sm font-medium">{officeLocation.name}</span>
                  </div>
                </motion.div>

                {/* Map Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#343541] via-transparent opacity-40" />
              </div>
            </motion.div>

            {/* Stats Grid - Only shows on medium screens and above */}
            <div className="hidden md:grid grid-cols-3 gap-6 mt-8">
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
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            {/* Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-700/20 backdrop-blur rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-600"
            >
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-[#153969]/10 mt-1">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#718bab]" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Kantor Pusat</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {officeLocation.address}
                  </p>
                </div>
              </div>
              
              {/* Contact Info - Added for better mobile usability */}
              <div className="border-t border-gray-600 pt-4 mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#718bab]" />
                  <a 
                    href={`tel:${officeLocation.phone}`} 
                    className="text-gray-300 text-sm md:text-base hover:text-white transition-colors"
                  >
                    {officeLocation.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#718bab]" />
                  <a 
                    href={`mailto:${officeLocation.email}`}
                    className="text-gray-300 text-sm md:text-base hover:text-white transition-colors"
                  >
                    {officeLocation.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Service Areas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-700/20 backdrop-blur rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-600"
            >
              <h4 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Area Layanan</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {serviceAreas.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#153969] to-[#718bab] rounded-full" />
                    <span className="text-gray-300 text-sm md:text-base">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons - Improved for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a 
                href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex-1 block bg-gradient-to-r from-[#153969] to-[#718bab] text-white font-semibold px-4 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:scale-110 inline-block transition-transform duration-300">
                  Hubungi Kami via WhatsApp
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#1c4b8c] to-[#5677a3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              
              
            </motion.div>
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