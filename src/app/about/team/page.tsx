'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ChevronDown, ChevronUp, Building2, Users, Clock, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const StrukturOrganisasi = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showFullStructure, setShowFullStructure] = useState(false);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Multilingual content
  const content = {
    en: {
      backToHome: "Back to Home",
      pageTitle: "Organization Structure",
      pageSubtitle: "Get to know more closely the highly dedicated professionals with extensive experience in providing the best construction solutions.",
      organizationTitle: "Company Organization Structure",
      organizationSubtitle: "We have an organizational structure designed to provide the best service and ensure the quality of each project.",
      showMore: "Show All Teams",
      showLess: "Show Less",
      companyValues: "Company Values",
      valuesSubtitle: "Core values that shape our work culture and approach to every project.",
      value1Title: "Integrity",
      value1Description: "We are committed to the highest ethical standards, transparency, and honesty in every aspect of our work.",
      value2Title: "Quality",
      value2Description: "We always strive to exceed expectations by producing high-quality work and focusing on details.",
      value3Title: "Innovation",
      value3Description: "We continue to develop new methods and approaches to deliver more effective and efficient solutions.",
      performance: "Our Performance",
      performanceSubtitle: "We are committed to providing the best service in every project",
      projectsCompleted: "Projects Completed",
      clientSatisfaction: "Client Satisfaction",
      technicalSupport: "Technical Support",
      officeLocation: "Office Location",
      officeSubtitle: "Meet our team at headquarters or contact us for more information.",
      officeName: "Jakarta Headquarters",
      contactUs: "Contact Us",
      teamTitles: {
        productionTitle: "Production Division",
        operationalTitle: "Operational Division",
        supportTitle: "Support",
      }
    },
    id: {
      backToHome: "Kembali ke Beranda",
      pageTitle: "Struktur Organisasi",
      pageSubtitle: "Mengenal lebih dekat para profesional yang berdedikasi tinggi dan berpengalaman luas dalam memberikan solusi konstruksi terbaik.",
      organizationTitle: "Struktur Organisasi Perusahaan",
      organizationSubtitle: "Kami memiliki struktur organisasi yang dirancang untuk memberikan layanan terbaik dan memastikan kualitas setiap proyek.",
      showMore: "Tampilkan Semua Tim",
      showLess: "Tampilkan Lebih Sedikit",
      companyValues: "Nilai-Nilai Perusahaan",
      valuesSubtitle: "Nilai-nilai inti yang membentuk budaya kerja dan pendekatan kami terhadap setiap proyek.",
      value1Title: "Integritas",
      value1Description: "Kami berkomitmen pada standar etika tertinggi, transparansi, dan kejujuran dalam setiap aspek pekerjaan kami.",
      value2Title: "Kualitas",
      value2Description: "Kami selalu berupaya melampaui ekspektasi dengan menghasilkan pekerjaan berkualitas tinggi dan fokus pada detail.",
      value3Title: "Inovasi",
      value3Description: "Kami terus mengembangkan metode dan pendekatan baru untuk menghadirkan solusi yang lebih efektif dan efisien.",
      performance: "Performa Kami",
      performanceSubtitle: "Kami berkomitmen untuk memberikan pelayanan terbaik dalam setiap proyek",
      projectsCompleted: "Proyek Selesai",
      clientSatisfaction: "Kepuasan Client",
      technicalSupport: "Dukungan Teknis",
      officeLocation: "Lokasi Kantor",
      officeSubtitle: "Temui tim kami di kantor pusat atau hubungi kami untuk informasi lebih lanjut.",
      officeName: "Kantor Pusat Jakarta",
      contactUs: "Hubungi Kami",
      teamTitles: {
        productionTitle: "Divisi Produksi",
        operationalTitle: "Divisi Operasional",
        supportTitle: "Support",
      }
    }
  };

  // Get current content based on language
  const currentContent = language === 'en' ? content.en : content.id;

  // Office location
  const officeLocation = {
    name: currentContent.officeName,
    address: "Jl. Raya Jatiwaringin No.06 2, RT.2/RW.13, Cipinang Melayu, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13620"
  };

  // Stats
  const stats = [
    {
      value: "15+",
      label: language === 'en' ? "Projects Completed" : "Proyek Selesai",
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

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-colors duration-300`}>
      {/* Hero section */}
      <div className={`relative ${isDark ? 'bg-[#153969]/80' : 'bg-[#153969]'} text-white py-20 overflow-hidden transition-colors duration-300`}>
        <div className="absolute inset-0 opacity-20 pattern-grid"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{currentContent.pageTitle}</h1>
              <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
              <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
                {currentContent.pageSubtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tombol Kembali ke Beranda */}
      <div className={`container mx-auto px-4 md:px-8 py-4 ${isDark ? 'text-white' : 'text-black'} transition-colors duration-300`}>
        <Link href="/" className={`inline-flex items-center ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#153969] hover:text-[#0f2a4d]'} hover:underline transition-colors duration-300`}>
          <ArrowLeft className="mr-2 h-5 w-5" />
          {currentContent.backToHome}
        </Link>
      </div>

      {/* Organization Chart Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-5xl mx-auto text-center mb-8"
          >
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-4 transition-colors duration-300`}>{currentContent.organizationTitle}</h2>
            <div className="w-20 h-1 bg-[#153969] mx-auto mb-6"></div>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 transition-colors duration-300`}>
              {currentContent.organizationSubtitle}
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            {/* Text-based organizational chart - Responsive version */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 md:p-8 transition-colors duration-300`}>
              <div className="flex flex-col items-center text-center">
                {/* Level 1 - Komisaris Utama */}
                <div className="w-full max-w-64 px-4 py-3 mb-4 md:mb-8 bg-[#153969] text-white rounded-lg font-bold">
                  Winda Dara E. L.
                  <div className="mt-1 text-sm font-normal">KOMISARIS UTAMA</div>
                </div>
                
                <div className={`w-0.5 h-4 md:h-8 ${isDark ? 'bg-gray-600' : 'bg-gray-300'} transition-colors duration-300`}></div>
                
                {/* Level 2 - Direktur Utama & Legal */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full mb-4 md:mb-8 gap-4">
                  <div className="w-full max-w-64 px-4 py-3 bg-[#153969] text-white rounded-lg font-bold">
                    Andre Sukanto
                    <div className="mt-1 text-sm font-normal">Direktur Utama</div>
                  </div>
                  <div className={`h-4 w-0.5 md:h-0.5 md:w-8 ${isDark ? 'bg-gray-600' : 'bg-gray-300'} block md:hidden transition-colors duration-300`}></div>
                  <div className={`hidden md:block w-32 h-0.5 ${isDark ? 'bg-gray-600' : 'bg-gray-300'} transition-colors duration-300`}></div>
                  <div className="w-full max-w-64 px-4 py-3 bg-[#153969] text-white rounded-lg font-bold">
                    Rolas Budiman S.
                    <div className="mt-1 text-sm font-normal">Legal</div>
                  </div>
                </div>
                
                <div className={`w-0.5 h-4 md:h-8 ${isDark ? 'bg-gray-600' : 'bg-gray-300'} transition-colors duration-300`}></div>
                
                {/* Level 3 - Direktur Operasional */}
                <div className="w-full max-w-64 px-4 py-3 mb-4 md:mb-8 bg-[#153969] text-white rounded-lg font-bold">
                  Iswanto
                  <div className="mt-1 text-sm font-normal">Direktur Operasional</div>
                </div>
                
                <div className={`w-0.5 h-4 md:h-8 ${isDark ? 'bg-gray-600' : 'bg-gray-300'} transition-colors duration-300`}></div>
                
                {/* Level 4 - General Manager */}
                <div className="w-full max-w-64 px-4 py-3 mb-4 md:mb-8 bg-[#153969] text-white rounded-lg font-bold">
                  Haryanto Permana
                  <div className="mt-1 text-sm font-normal">General Manager</div>
                </div>
                
                <div className={`w-0.5 h-4 md:h-8 ${isDark ? 'bg-gray-600' : 'bg-gray-300'} transition-colors duration-300`}></div>
                
                {/* Level 5 - Managers */}
                <div className="flex flex-col md:flex-row justify-center w-full mb-4 md:mb-8 gap-4">
                  <div className="w-full md:w-auto px-4 py-3 bg-[#718bab] text-white rounded-lg font-bold text-center">
                    Sugiyarto
                    <div className="mt-1 text-sm font-normal">Manager Produksi</div>
                  </div>
                  <div className="w-full md:w-auto px-4 py-3 bg-[#718bab] text-white rounded-lg font-bold text-center">
                    Ahmad Fahrizal
                    <div className="mt-1 text-sm font-normal">Manager Operasional</div>
                  </div>
                  <div className="w-full md:w-auto px-4 py-3 bg-[#718bab] text-white rounded-lg font-bold text-center">
                    Riana Siagian
                    <div className="mt-1 text-sm font-normal">Manager Keuangan</div>
                  </div>
                </div>
                
                {showFullStructure && (
                  <>
                    <div className={`w-full max-w-5xl border-t border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'} pt-4 md:pt-8 mt-4 transition-colors duration-300`}></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 md:mt-8 w-full">
                      {/* Produksi Team */}
                      <div className="text-center">
                        <h3 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`}>{currentContent.teamTitles.productionTitle}</h3>
                        <div className="space-y-2">
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Fatah Yasin</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Design</div>
                          </div>
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Rinaldi</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>QC Mesin</div>
                          </div>
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Sabarno</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>QC Produksi</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Operasional Team */}
                      <div className="text-center">
                        <h3 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`}>{currentContent.teamTitles.operationalTitle}</h3>
                        <div className="space-y-2">
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Paulina</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Pajak</div>
                          </div>
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Akunting</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>QC Mesin</div>
                          </div>
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Rinaldi</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>QC Mesin</div>
                          </div>
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Paulina</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Pembukuan</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Support Team */}
                      <div className="text-center">
                        <h3 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`}>{currentContent.teamTitles.supportTitle}</h3>
                        <div className="space-y-2">
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Hotlen</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Gudang</div>
                          </div>
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Sarah</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Admin</div>
                          </div>
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Sudung</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Driver</div>
                          </div>
                          <div className={`px-4 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300`}>
                            <div className="font-medium">Simon</div>
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Kurir</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <button 
                  onClick={() => setShowFullStructure(!showFullStructure)}
                  className={`flex items-center gap-2 mt-6 md:mt-8 px-6 py-3 ${
                    isDark 
                      ? 'bg-gray-800 text-blue-400 border-blue-400 hover:bg-blue-900/30' 
                      : 'bg-white text-[#153969] border-[#153969] hover:bg-[#153969] hover:text-white'
                  } rounded-md font-medium border transition-colors duration-300`}
                >
                  {showFullStructure ? currentContent.showLess : currentContent.showMore}
                  {showFullStructure ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className={`py-12 md:py-16 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
          >
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-4 transition-colors duration-300`}>{currentContent.companyValues}</h2>
            <div className="w-16 h-1 bg-[#153969] mx-auto mb-6"></div>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
              {currentContent.valuesSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-sm border-t-4 border-[#153969] transition-colors duration-300`}
            >
              <div className="text-[#153969] text-4xl font-bold mb-3">01</div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}>{currentContent.value1Title}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                {currentContent.value1Description}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-sm border-t-4 border-[#153969] transition-colors duration-300`}
            >
              <div className="text-[#153969] text-4xl font-bold mb-3">02</div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}>{currentContent.value2Title}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                {currentContent.value2Description}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-sm border-t-4 border-[#153969] transition-colors duration-300`}
            >
              <div className="text-[#153969] text-4xl font-bold mb-3">03</div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}>{currentContent.value3Title}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                {currentContent.value3Description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-12 md:py-16 ${isDark ? 'bg-[#153969]/70' : 'bg-[#153969]'} text-white transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{currentContent.performance}</h2>
            <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg opacity-90">
              {currentContent.performanceSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20"
              >
                <stat.icon className="w-10 h-10 text-white/80 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
          >
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-4 transition-colors duration-300`}>{currentContent.officeLocation}</h2>
            <div className="w-16 h-1 bg-[#153969] mx-auto mb-6"></div>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
              {currentContent.officeSubtitle}
            </p>
          </motion.div>

          <div className={`max-w-5xl mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-colors duration-300`}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`}>{officeLocation.name}</h3>
                <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  <div className="flex items-start">
                    <MapPin className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mr-3 flex-shrink-0 mt-0.5 transition-colors duration-300`} />
                    <p>{officeLocation.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mr-3 flex-shrink-0 transition-colors duration-300`} />
                    <p>+6281218127503</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mr-3 flex-shrink-0 transition-colors duration-300`} />
                    <p className="break-words">karyabangunsemestas@gmail.com</p>
                    
                  </div>
                </div>
                <div className="mt-6">
                  <a 
                    href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-6 py-3 ${
                      isDark 
                        ? 'bg-[#153969]/80 hover:bg-[#153969]' 
                        : 'bg-[#153969] hover:bg-[#0f2a4d]'
                    } text-white rounded-md font-medium transition-colors duration-300 shadow-md`}
                  >
                    {currentContent.contactUs}
                  </a>
                </div>
              </div>
              <div className="relative h-64 md:h-auto md:min-h-[300px] bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2834932646466!2d106.89975071087225!3d-6.225636261092377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3303cf04dc1%3A0x7db6f4ab01ecd3e7!2sJl.%20Raya%20Jatiwaringin%20No.06%202%2C%20RT.2%2FRW.13%2C%20Cipinang%20Melayu%2C%20Kec.%20Makasar%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2013620!5e0!3m2!1sen!2sid!4v1710817200055!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back to Home Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Link 
          href="/" 
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            isDark 
              ? 'bg-[#153969]/80 hover:bg-[#153969]' 
              : 'bg-[#153969] hover:bg-[#0f2a4d]'
          } text-white shadow-lg transition-colors duration-300`}
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      <style jsx>{`
        .pattern-grid {
          background-image: radial-gradient(#ffffff 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default StrukturOrganisasi;
                    