'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building2, Users, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const LocationSection = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Content based on language
  const officeLocation = {
    top: "58%",
    left: "25%",
    name: language === 'en' ? "Jakarta Head Office" : "Kantor Pusat Jakarta",
    address: language === 'en' 
      ? "Jl. Raya Jatiwaringin No.06 2, RT.2/RW.13, Cipinang Melayu, Makasar, East Jakarta, DKI Jakarta 13620"
      : "Jl. Raya Jatiwaringin No.06 2, RT.2/RW.13, Cipinang Melayu, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13620",
    phone: "+6281218127503",
    email: "karyabangunsemestas@gmail.com"
  };

  const stats = [
    {
      value: "15+",
      label: language === 'en' ? "Completed Projects" : "Proyek Selesai",
      icon: Building2
    },
    {
      value: "100%",
      label: language === 'en' ? "Client Satisfaction" : "Kepuasan Client",
      icon: Users
    },
    {
      value: "24/7",
      label: language === 'en' ? "Technical Support" : "Dukungan Teknis",
      icon: Clock
    }
  ];

  const serviceAreas = language === 'en' 
    ? [
        "Commercial Building Construction",
        "Infrastructure & Roads",
        "Industrial & Manufacturing Projects",
        "Renovation & Remodeling",
        "Design & Planning"
      ]
    : [
        "Konstruksi Bangunan Komersial",
        "Infrastruktur & Jalan",
        "Proyek Industri & Manufaktur",
        "Renovasi & Remodeling",
        "Desain & Perencanaan"
      ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-10 md:py-20 overflow-hidden">
      {/* Create a seamless gradient with smooth transition between theme modes */}
      <div className="absolute inset-0 transition-colors duration-700">
        {/* Main background gradient - note the transition-all for smooth theme change */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isDark 
            ? 'bg-gray-900' 
            : 'bg-[#f8fafc]'
        }`} />
        
        {/* Top gradient for visual interest */}
        <div className={`absolute top-0 left-0 right-0 h-64 transition-opacity duration-1000 ${
          isDark 
            ? 'bg-gradient-to-b from-blue-900/10 to-transparent' 
            : 'bg-gradient-to-b from-blue-50/50 to-transparent'
        }`} />
        
        {/* Bottom diagonal gradient that creates a smooth transition to footer section */}
        <div className={`absolute bottom-0 left-0 right-0 h-2/5 transition-all duration-1000 ${
          isDark 
            ? 'bg-gradient-to-t from-[#111827] via-[#111827]/70 to-transparent' 
            : 'bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/70 to-transparent'
        }`} />
        
        {/* Diagonal gradient overlay with 45-degree angle */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-900/95 to-[#111827]/90 opacity-100' 
            : 'bg-gradient-to-br from-[#f8fafc] via-[#f8fafc]/95 to-[#f8fafc]/90 opacity-100'
        }`} />
        
        {/* Subtle radial gradients for depth */}
        <div className={`absolute top-1/4 left-1/4 w-full h-full transition-all duration-1000 ${
          isDark 
            ? 'bg-radial-gradient-dark' 
            : 'bg-radial-gradient-light'
        } opacity-40`} />
        
        {/* Very subtle noise texture overlay with transition */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] transition-opacity duration-1000"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className={`text-2xl md:text-3xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'} mb-3 md:mb-4`}>
              {language === 'en' ? 'Our Location' : 'Lokasi Kami'}
            </h2>
            <motion.div 
              className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full transition-all duration-700"
              variants={fadeIn}
            />
            <p className={`text-lg md:text-xl mt-4 transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'en' ? 'Serving Construction Projects Throughout Indonesia' : 'Melayani Proyek Konstruksi di Seluruh Indonesia'}
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
              className={`transition-all duration-700 ${
                isDark 
                  ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/80' 
                  : 'bg-white/80 backdrop-blur-xl border-blue-100/80 shadow-xl'
              } rounded-lg p-3 border`}
            >
              <stat.icon className={`w-6 h-6 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-blue-500'} mb-1`} />
              <div className={`text-xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
              <div className={`text-xs transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
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
              className={`relative rounded-xl md:rounded-2xl overflow-hidden transition-all duration-700 ${
                isDark ? 'shadow-2xl border-gray-700/80' : 'shadow-xl border-blue-100/80'
              } border`}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={isDark ? "/images/indonesia-map-3.png" : "/images/indonesia-map-2.png"}
                  alt={language === 'en' ? "PT Karya Bangun Semesta Location Map" : "Peta Lokasi PT Karya Bangun Semesta"}
                  fill
                  className="object-cover transition-opacity duration-1000"
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
                  <div className={`w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r ${
                    isDark ? 'from-blue-600 to-blue-400' : 'from-blue-600 to-blue-400'
                  } rounded-full shadow-lg shadow-blue-400/50 transition-all duration-700`} />
                  <div className={`w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r ${
                    isDark ? 'from-blue-600/50 to-blue-400/50' : 'from-blue-600/50 to-blue-400/50'
                  } rounded-full animate-ping absolute inset-0 transition-all duration-700`} />
                  <div className={`absolute -bottom-16 md:-bottom-24 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                    isDark 
                      ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700/90' 
                      : 'bg-white/90 backdrop-blur-sm border-gray-200/90'
                  } px-3 py-1 md:px-4 md:py-2 rounded-lg whitespace-nowrap border`}>
                    <span className={`transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-blue-600'} text-xs md:text-sm font-medium`}>
                      {officeLocation.name}
                    </span>
                  </div>
                </motion.div>

                {/* Map Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-700 ${
                  isDark 
                    ? 'from-gray-900 via-transparent' 
                    : 'from-white via-transparent'
                } opacity-40`} />
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
                  className={`transition-all duration-700 ${
                    isDark 
                      ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/70 shadow-lg' 
                      : 'bg-white/60 backdrop-blur-xl border-blue-100/70 shadow-lg'
                  } rounded-xl p-6 border`}
                >
                  <stat.icon className={`w-8 h-8 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-blue-500'} mb-3`} />
                  <div className={`text-3xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>{stat.value}</div>
                  <div className={`text-sm transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
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
              className={`relative group transition-all duration-700 ${
                isDark 
                  ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/70 shadow-lg' 
                  : 'bg-white/60 backdrop-blur-xl border-blue-100/70 shadow-lg'
              } rounded-xl md:rounded-2xl p-5 md:p-8 border`}
            >
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-700 ${
                  isDark ? 'bg-[#153969]/50 border-gray-600/50' : 'bg-blue-50/80 border-blue-100/80'
                } border mt-1`}>
                  <MapPin className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                </div>
                <div>
                  <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {language === 'en' ? 'Head Office' : 'Kantor Pusat'}
                  </h3>
                  <p className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm md:text-base leading-relaxed`}>
                    {officeLocation.address}
                  </p>
                </div>
              </div>
              
              {/* Contact Info - Added for better mobile usability */}
              <div className={`border-t transition-colors duration-700 ${isDark ? 'border-gray-700/70' : 'border-gray-200/70'} pt-4 mt-4 space-y-3`}>
                <div className="flex items-center gap-3">
                  <Phone className={`w-4 h-4 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  <a 
                    href={`tel:${officeLocation.phone}`} 
                    className={`transition-colors duration-500 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm md:text-base`}
                  >
                    {officeLocation.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className={`w-4 h-4 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  <a 
                    href={`mailto:${officeLocation.email}`}
                    className={`transition-colors duration-500 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm md:text-base`}
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
              className={`relative group transition-all duration-700 ${
                isDark 
                  ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/70 shadow-lg' 
                  : 'bg-white/60 backdrop-blur-xl border-blue-100/70 shadow-lg'
              } rounded-xl md:rounded-2xl p-5 md:p-8 border`}
            >
              <h4 className={`text-xl md:text-2xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'} mb-4 md:mb-6`}>
                {language === 'en' ? 'Service Areas' : 'Area Layanan'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {serviceAreas.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 bg-gradient-to-r transition-all duration-700 ${
                      isDark ? 'from-blue-500 to-blue-400' : 'from-blue-500 to-blue-400'
                    } rounded-full`} />
                    <span className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm md:text-base`}>
                      {service}
                    </span>
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
                className="group flex-1 block bg-[#153969] text-white font-semibold px-4 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-center transition-all duration-500 hover:shadow-lg hover:shadow-[#153969]/20 relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:scale-110 inline-block transition-transform duration-300">
                  {language === 'en' ? 'Contact Us via WhatsApp' : 'Hubungi Kami via WhatsApp'}
                </span>
                <span className="absolute inset-0 bg-[#1e4d8d] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </a>
              
              <a 
                href="mailto:karyabangunsemestas@gmail.com"
                className={`group flex-1 block px-4 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-center transition-all duration-500 relative overflow-hidden border ${
                  isDark 
                    ? 'border-blue-500/80 text-blue-400 hover:text-white' 
                    : 'border-blue-500/80 text-blue-600 hover:text-white'
                }`}
              >
                <span className="relative z-10 group-hover:scale-110 inline-block transition-transform duration-300">
                  {language === 'en' ? 'Email Us' : 'Email Kami'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CSS for gradient and texture effects */}
      <style jsx global>{`
        .bg-radial-gradient-light {
          background: radial-gradient(circle at center, rgba(219, 234, 254, 0.3) 0%, rgba(248, 250, 252, 0) 70%);
        }
        
        .bg-radial-gradient-dark {
          background: radial-gradient(circle at center, rgba(30, 58, 138, 0.1) 0%, rgba(17, 24, 39, 0) 70%);
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
};

export default LocationSection;