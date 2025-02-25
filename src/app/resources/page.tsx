'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, FileText, Download, ExternalLink, BookOpen, Calculator } from 'lucide-react';


export default function ResourcesPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Resources data
  const documents = [
    {
      title: "Katalog Layanan",
      description: "Informasi lengkap tentang layanan konstruksi kami",
      icon: <FileText className="w-10 h-10" />,
      link: "#",
      type: "PDF (2.5 MB)"
    },
    {
      title: "Company Profile",
      description: "Profil perusahaan dan portofolio proyek",
      icon: <BookOpen className="w-10 h-10" />,
      link: "#",
      type: "PDF (3.8 MB)"
    },
    {
      title: "Standar K3L",
      description: "Standar keselamatan, kesehatan kerja, dan lingkungan",
      icon: <FileText className="w-10 h-10" />,
      link: "#",
      type: "PDF (1.2 MB)"
    }
  ];

  const tools = [
    {
      title: "Kalkulator Estimasi Biaya",
      description: "Alat untuk menghitung estimasi biaya proyek konstruksi dasar",
      icon: <Calculator className="w-10 h-10" />,
      link: "#",
      type: "Online Tool"
    },
    {
      title: "Checklist Persiapan Proyek",
      description: "Daftar periksa untuk persiapan proyek konstruksi",
      icon: <FileText className="w-10 h-10" />,
      link: "#",
      type: "Excel (0.5 MB)"
    },
    {
      title: "Template Pelaporan Proyek",
      description: "Template untuk pelaporan kemajuan proyek",
      icon: <FileText className="w-10 h-10" />,
      link: "#",
      type: "Word (0.3 MB)"
    }
  ];

  const externalResources = [
    {
      title: "Peraturan Pemerintah tentang Konstruksi",
      description: "Kumpulan peraturan pemerintah terkait industri konstruksi",
      icon: <ExternalLink className="w-10 h-10" />,
      link: "https://www.pu.go.id/",
      type: "External Link"
    },
    {
      title: "SNI Konstruksi Bangunan",
      description: "Standar Nasional Indonesia untuk konstruksi bangunan",
      icon: <ExternalLink className="w-10 h-10" />,
      link: "https://www.bsn.go.id/",
      type: "External Link"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-[#153969] pt-20 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mt-8 mb-4"
          >
            Tools & Resources
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Akses dokumen, tools, dan sumber daya untuk kebutuhan proyek konstruksi Anda
          </motion.p>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden">
          <svg
            className="w-full h-[100px] fill-white"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C320,80 440,60 720,40 C960,20 1200,80 1440,80 L1440,100 L0,100 Z"
              fill="white"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-[#1E4D2B]" />
              Dokumen Perusahaan
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm transition-all"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#153969]/10 p-3 rounded-lg text-[#153969] mr-4">
                      {doc.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{doc.type}</span>
                        <motion.a
                          href={doc.link}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center text-sm font-medium text-[#1E4D2B] hover:text-[#153969]"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Wrench  className="w-6 h-6 mr-2 text-[#1E4D2B]" />
              Tools dan Template
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm transition-all"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#1E4D2B]/10 p-3 rounded-lg text-[#1E4D2B] mr-4">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{tool.type}</span>
                        <motion.a
                          href={tool.link}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center text-sm font-medium text-[#1E4D2B] hover:text-[#153969]"
                        >
                          {tool.type === "Online Tool" ? (
                            <>
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Access Tool
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-1" />
                              Download
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <ExternalLink className="w-6 h-6 mr-2 text-[#1E4D2B]" />
              Sumber Daya Eksternal
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {externalResources.map((resource, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm transition-all"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gray-100 p-3 rounded-lg text-gray-600 mr-4">
                      {resource.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{resource.type}</span>
                        <motion.a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center text-sm font-medium text-[#1E4D2B] hover:text-[#153969]"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Visit Website
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
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Butuh bantuan atau sumber daya tambahan?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Jika Anda membutuhkan dokumen atau informasi khusus yang tidak tersedia di sini, jangan ragu untuk menghubungi tim kami.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-[#1E4D2B] text-white rounded hover:bg-[#153969] transition-colors"
          >
            Hubungi Kami
          </motion.a>
        </div>
      </section>
    </main>
  );
}