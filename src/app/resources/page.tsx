'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, FileText, Download, ExternalLink, BookOpen, Calculator } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
export default function ResourcesPage() {
  // Get language and theme from context
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Resources data with translations
  const documents = [
    {
      title: "Katalog Layanan",
      title_en: "Services Catalog",
      description: "Informasi lengkap tentang layanan konstruksi kami",
      description_en: "Complete information about our construction services",
      icon: <FileText className="w-10 h-10" />,
      link: "#",
      type: "PDF (2.5 MB)"
    },
    {
      title: "Company Profile",
      title_en: "Company Profile",
      description: "Profil perusahaan dan portofolio proyek",
      description_en: "Company profile and project portfolio",
      icon: <BookOpen className="w-10 h-10" />,
      link: "#",
      type: "PDF (3.8 MB)"
    },
    {
      title: "Standar K3L",
      title_en: "HSE Standards",
      description: "Standar keselamatan, kesehatan kerja, dan lingkungan",
      description_en: "Health, safety, and environmental standards",
      icon: <FileText className="w-10 h-10" />,
      link: "#",
      type: "PDF (1.2 MB)"
    }
  ];

  const tools = [
    {
      title: "Kalkulator Estimasi Biaya",
      title_en: "Cost Estimation Calculator",
      description: "Alat untuk menghitung estimasi biaya proyek konstruksi dasar",
      description_en: "Tool for calculating basic construction project cost estimates",
      icon: <Calculator className="w-10 h-10" />,
      link: "#",
      type: "Online Tool",
      type_en: "Online Tool"
    },
    {
      title: "Checklist Persiapan Proyek",
      title_en: "Project Preparation Checklist",
      description: "Daftar periksa untuk persiapan proyek konstruksi",
      description_en: "Checklist for construction project preparation",
      icon: <FileText className="w-10 h-10" />,
      link: "#",
      type: "Excel (0.5 MB)",
      type_en: "Excel (0.5 MB)"
    },
    {
      title: "Template Pelaporan Proyek",
      title_en: "Project Reporting Template",
      description: "Template untuk pelaporan kemajuan proyek",
      description_en: "Template for project progress reporting",
      icon: <FileText className="w-10 h-10" />,
      link: "#",
      type: "Word (0.3 MB)",
      type_en: "Word (0.3 MB)"
    }
  ];

  const externalResources = [
    {
      title: "Peraturan Pemerintah tentang Konstruksi",
      title_en: "Government Regulations on Construction",
      description: "Kumpulan peraturan pemerintah terkait industri konstruksi",
      description_en: "Collection of government regulations related to the construction industry",
      icon: <ExternalLink className="w-10 h-10" />,
      link: "https://www.pu.go.id/",
      type: "External Link",
      type_en: "External Link"
    },
    {
      title: "SNI Konstruksi Bangunan",
      title_en: "SNI Building Construction",
      description: "Standar Nasional Indonesia untuk konstruksi bangunan",
      description_en: "Indonesian National Standards for building construction",
      icon: <ExternalLink className="w-10 h-10" />,
      link: "https://www.bsn.go.id/",
      type: "External Link",
      type_en: "External Link"
    }
  ];

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Hero Banner */}
      <section className={`${isDark ? 'bg-blue-900' : 'bg-[#153969]'} pt-20 pb-16 relative transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mt-8 mb-4"
          >
            {language === 'en' ? "Tools & Resources" : "Tools & Resources"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            {language === 'en' 
              ? "Access documents, tools, and resources for your construction project needs" 
              : "Akses dokumen, tools, dan sumber daya untuk kebutuhan proyek konstruksi Anda"}
          </motion.p>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden">
          <svg
            className="w-full h-[100px]"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C320,80 440,60 720,40 C960,20 1200,80 1440,80 L1440,100 L0,100 Z"
              className={isDark ? 'fill-gray-900' : 'fill-white'}
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Documents Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8 flex items-center transition-colors duration-300`}>
              <FileText className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
              {language === 'en' ? "Company Documents" : "Dokumen Perusahaan"}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6 ${isDark ? 'shadow-none' : 'shadow-sm'} transition-all`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-[#153969]/10 text-[#153969]'} p-3 rounded-lg mr-4 transition-colors duration-300`}>
                      {doc.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                        {language === 'en' ? doc.title_en : doc.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 transition-colors duration-300`}>
                        {language === 'en' ? doc.description_en : doc.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} transition-colors duration-300`}>{doc.type}</span>
                        <motion.a
                          href={doc.link}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`inline-flex items-center text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#1E4D2B] hover:text-[#153969]'} transition-colors duration-300`}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          {language === 'en' ? "Download" : "Download"}
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8 flex items-center transition-colors duration-300`}>
              <Wrench className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
              {language === 'en' ? "Tools and Templates" : "Tools dan Template"}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6 ${isDark ? 'shadow-none' : 'shadow-sm'} transition-all`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-[#1E4D2B]/10 text-[#1E4D2B]'} p-3 rounded-lg mr-4 transition-colors duration-300`}>
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                        {language === 'en' ? tool.title_en : tool.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 transition-colors duration-300`}>
                        {language === 'en' ? tool.description_en : tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} transition-colors duration-300`}>
                          {language === 'en' ? tool.type_en || tool.type : tool.type}
                        </span>
                        <motion.a
                          href={tool.link}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`inline-flex items-center text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#1E4D2B] hover:text-[#153969]'} transition-colors duration-300`}
                        >
                          {tool.type === "Online Tool" ? (
                            <>
                              <ExternalLink className="w-4 h-4 mr-1" />
                              {language === 'en' ? "Access Tool" : "Akses Tool"}
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-1" />
                              {language === 'en' ? "Download" : "Download"}
                            </>
                          )}
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* External Resources */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8 flex items-center transition-colors duration-300`}>
              <ExternalLink className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
              {language === 'en' ? "External Resources" : "Sumber Daya Eksternal"}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {externalResources.map((resource, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-6 ${isDark ? 'shadow-none' : 'shadow-sm'} transition-all`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} p-3 rounded-lg mr-4 transition-colors duration-300`}>
                      {resource.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                        {language === 'en' ? resource.title_en : resource.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 transition-colors duration-300`}>
                        {language === 'en' ? resource.description_en : resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} transition-colors duration-300`}>
                          {language === 'en' ? resource.type_en || resource.type : resource.type}
                        </span>
                        <motion.a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`inline-flex items-center text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#1E4D2B] hover:text-[#153969]'} transition-colors duration-300`}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          {language === 'en' ? "Visit Website" : "Kunjungi Website"}
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Section */}
      <section className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-16 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
            {language === 'en' ? "Need help or additional resources?" : "Butuh bantuan atau sumber daya tambahan?"}
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-2xl mx-auto transition-colors duration-300`}>
            {language === 'en' 
              ? "If you need specific documents or information not available here, don't hesitate to contact our team." 
              : "Jika Anda membutuhkan dokumen atau informasi khusus yang tidak tersedia di sini, jangan ragu untuk menghubungi tim kami."}
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center px-6 py-3 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#1E4D2B] hover:bg-[#153969]'} text-white rounded transition-colors duration-300`}
          >
            {language === 'en' ? "Contact Us" : "Hubungi Kami"}
          </motion.a>
        </div>
      </section>
    </main>
  );
}