// app/ethics/page.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Mail, Phone, Shield, Award, Minimize2, Users, Leaf } from 'lucide-react';

export default function EthicsPage() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Component for animated sections with TypeScript fixes
  const AnimatedSection = ({ 
    children, 
    className, 
    delay = 0 
  }: { 
    children: React.ReactNode; 
    className?: string; 
    delay?: number;
  }) => {
    const controls = useAnimation();
    
    // Instead of using react-intersection-observer, we'll use a simpler approach
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              controls.start("visible");
            }
          });
        },
        { threshold: 0.1 }
      );
      
      const currentRef = document.getElementById(`section-${delay}`);
      if (currentRef) {
        observer.observe(currentRef);
      }
      
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [controls, delay]);

    return (
      <motion.div
        id={`section-${delay}`}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className={className}
        style={{ originY: 0.5 }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-[#153969] pt-20 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold text-white mt-8 mb-4"
          >
            Kode Etik Perusahaan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Standar perilaku dan integritas PT Karya Bangun Semesta
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <AnimatedSection className="mb-10">
            <p className="text-gray-700 text-lg mb-6">
              PT Karya Bangun Semesta (KBS) berkomitmen untuk menjalankan bisnis dengan standar etika tertinggi. 
              Kode Etik ini merupakan pedoman perilaku bagi seluruh karyawan, mitra, dan pemangku kepentingan.
            </p>
          </AnimatedSection>

          {/* Core Values */}
          <AnimatedSection className="mb-10">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#153969] mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-[#1E4D2B]" />
                Nilai-Nilai Inti
              </h2>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-6"
              >
                <motion.div variants={fadeInUp} className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#1E4D2B] flex items-center justify-center text-white font-bold text-sm mr-3">1</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Integritas</h3>
                    <p className="text-gray-700">Kejujuran dan transparansi dalam setiap tindakan</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#1E4D2B] flex items-center justify-center text-white font-bold text-sm mr-3">2</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Kualitas</h3>
                    <p className="text-gray-700">Standar tertinggi dalam pekerjaan konstruksi</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#1E4D2B] flex items-center justify-center text-white font-bold text-sm mr-3">3</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Keselamatan</h3>
                    <p className="text-gray-700">Prioritas utama bagi semua pemangku kepentingan</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#1E4D2B] flex items-center justify-center text-white font-bold text-sm mr-3">4</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Keberlanjutan</h3>
                    <p className="text-gray-700">Tanggung jawab terhadap dampak sosial dan lingkungan</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#1E4D2B] flex items-center justify-center text-white font-bold text-sm mr-3">5</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Inovasi</h3>
                    <p className="text-gray-700">Mencari solusi terbaik dalam setiap layanan</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Key Principles */}
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-[#1E4D2B]" />
              Prinsip-Prinsip Utama
            </h2>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-[#153969] mb-3 flex items-center">
                  <Minimize2 className="w-5 h-5 mr-2" />
                  Etika Bisnis
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Zero-tolerance terhadap korupsi dan suap</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Menghindari konflik kepentingan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Menjaga kerahasiaan informasi perusahaan dan klien</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-[#153969] mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Keselamatan Kerja
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Mematuhi semua prosedur dan regulasi K3</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Melaporkan kondisi dan praktik tidak aman</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Menggunakan peralatan perlindungan diri</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-[#153969] mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Hubungan dengan Pemangku Kepentingan
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Memberikan layanan berkualitas tinggi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Memenuhi komitmen kontraktual tepat waktu</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-[#153969] mb-3 flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  Perlindungan Lingkungan
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Mematuhi peraturan lingkungan yang berlaku</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Meminimalkan limbah, polusi dan emisi karbon</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Reporting */}
          <AnimatedSection className="mb-10" delay={0.2}>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#153969] mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-2 text-[#1E4D2B]" />
                Pelaporan Pelanggaran
              </h2>
              <p className="text-gray-700 mb-6">
                Setiap karyawan dan mitra bisnis didorong untuk melaporkan dugaan pelanggaran Kode Etik ini. 
                KBS melarang segala bentuk pembalasan terhadap pihak yang melaporkan dengan itikad baik.
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hubungi Kami:</h3>
                
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex items-center"
                  >
                    <Mail className="w-5 h-5 text-[#1E4D2B] mr-3" />
                    <a href="mailto:karyabangunsemestas@gmail.com" className="text-[#153969] hover:underline">
                      karyabangunsemestas@gmail.com
                    </a>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex items-center"
                  >
                    <Phone className="w-5 h-5 text-[#1E4D2B] mr-3" />
                    <a href="http://wa.me/+6281218127503" className="text-[#153969] hover:underline">
                      +62 812-1812-7503
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Footer note */}
          <AnimatedSection delay={0.3}>
            <div className="text-center border-t border-gray-200 pt-8">
              <p className="text-gray-600 text-sm">
                Dokumen ini adalah ringkasan Kode Etik PT Karya Bangun Semesta.<br />
                Diperbarui terakhir: Februari 2025
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}