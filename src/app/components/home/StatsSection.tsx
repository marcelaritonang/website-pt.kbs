'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import KonsultasiModal from '../KonsultasiModal';  // Sesuaikan path import
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const StatsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Content based on language
  const content = {
    en: {
      title: "Ready to Collaborate Together?",
      description: "Do you have a construction project you'd like to realize or are interested in joining and growing with our team? Let's bring your vision to life together!",
      consultButton: "Consult Your Project",
      joinButton: "Join Our Team"
    },
    id: {
      title: "Siap Berkolaborasi Bersama?",
      description: "Apakah Anda memiliki proyek konstruksi yang ingin direalisasikan atau tertarik untuk bergabung dan berkembang bersama tim kami? Mari wujudkan visi Anda bersama kami!",
      consultButton: "Konsultasikan Proyek",
      joinButton: "Bergabung Bersama Kami"
    }
  };

  // Get content based on selected language
  const currentContent = language === 'en' ? content.en : content.id;

  return (
    <section id="stats-section" className={`min-h-[70vh] md:min-h-screen ${isDark ? 'bg-gray-900' : 'bg-[#f8fafc]'} flex items-center py-10 md:py-0 relative overflow-hidden`}>
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Abstract patterns */}
        <div className={`absolute -top-36 -right-36 w-96 h-96 rounded-full ${
          isDark 
            ? 'bg-[#153969]/10 blur-3xl' 
            : 'bg-blue-100/50 blur-3xl'
        }`}></div>
        
        <div className={`absolute bottom-20 -left-20 w-72 h-72 rounded-full ${
          isDark 
            ? 'bg-blue-900/5 blur-3xl' 
            : 'bg-blue-50/80 blur-3xl'
        }`}></div>
        
        {/* Grid pattern overlay */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-grid-pattern-dark opacity-10' 
            : 'bg-grid-pattern opacity-10'
        }`}></div>
        
        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-gray-900/95' 
            : 'bg-gradient-to-br from-[#f8fafc]/80 via-[#f8fafc]/90 to-[#f8fafc]/95'
        }`}></div>
      </div>

      <div className="w-full relative">
        {/* Isometric background shapes - Responsive and theme-aware */}
        <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden">
          <div className={`absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] ${
            isDark 
              ? 'bg-[#153969]/60' 
              : 'bg-[#153969]/20'
          } transform rotate-45 translate-x-1/4 -translate-y-1/4 opacity-70 md:opacity-100 backdrop-blur-xl`} />
          
          <div className={`absolute bottom-0 right-0 w-[100px] md:w-[200px] h-[100px] md:h-[200px] ${
            isDark 
              ? 'bg-blue-900/30' 
              : 'bg-blue-100'
          } transform rotate-45 translate-x-1/2 translate-y-1/2 hidden md:block backdrop-blur-sm`} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-20">
          <div className="max-w-3xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-8"
            >
              <h2 className={`text-3xl md:text-4xl lg:text-6xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              } leading-tight`}>
                {currentContent.title}
              </h2>
              <p className={`text-base md:text-xl ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              } leading-relaxed`}>
                {currentContent.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4">
                {/* Konsultasi button with updated styling */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 
                          ${isDark 
                            ? 'bg-[#153969] hover:bg-[#1e4d8d]' 
                            : 'bg-[#153969] hover:bg-[#1e4d8d]'
                          } text-white text-base md:text-lg font-medium tracking-wide
                          transition-colors duration-300 shadow-md
                          uppercase rounded-lg w-full sm:w-auto`}
                >
                  {currentContent.consultButton}
                </button>

                {/* Career button with updated styling */}
                <Link
                  href="/karir"
                  className={`inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 
                          ${isDark 
                            ? 'border-2 border-[#153969] text-blue-400 hover:bg-[#153969]/30' 
                            : 'border-2 border-[#153969] text-[#153969] hover:bg-[#153969]'
                          } text-base md:text-lg font-medium 
                          tracking-wide ${!isDark && 'hover:text-white'}
                          transition-all duration-300 uppercase rounded-lg w-full sm:w-auto`}
                >
                  {currentContent.joinButton}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal Konsultasi */}
      <KonsultasiModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* CSS for grid patterns */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(21, 57, 105, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(21, 57, 105, 0.1) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        
        .bg-grid-pattern-dark {
          background-image: linear-gradient(to right, rgba(99, 179, 237, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 179, 237, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  );
};

export default StatsSection;