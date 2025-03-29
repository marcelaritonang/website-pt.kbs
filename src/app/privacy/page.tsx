// app/privacy/page.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Scale, AlertCircle, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            Kebijakan Privasi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Komitmen kami untuk melindungi data dan informasi Anda
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
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#153969] mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-[#1E4D2B]" />
                Pendahuluan
              </h2>

                    <p className="text-gray-700 mb-4">
                    PT Karya Bangun Semesta berkomitmen untuk melindungi privasi Anda. 
                    Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi 
                    informasi pribadi Anda ketika Anda menggunakan layanan kami atau mengunjungi website kami.
                    </p>
              <p className="text-gray-700">
                Dengan menggunakan layanan kami, Anda menyetujui praktik yang dijelaskan dalam kebijakan privasi ini.
              </p>
            </div>
          </AnimatedSection>

          

          {/* How We Use Information */}
          <AnimatedSection className="mb-10" delay={0.2}>
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-[#1E4D2B]" />
                Bagaimana Kami Menggunakan Informasi
              </h2>
              
              <p className="text-gray-700 mb-4">
                Kami menggunakan informasi yang kami kumpulkan untuk:
              </p>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                  <span>Menyediakan, memelihara, dan meningkatkan layanan kami</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                  <span>Memproses dan menyelesaikan transaksi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                  <span>Mengirimkan informasi teknis, pembaruan, dan pesan administratif</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                  <span>Menanggapi komentar, pertanyaan, dan permintaan Anda</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                  <span>Memahami bagaimana Anda menggunakan layanan kami</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                  <span>Mendeteksi, menyelidiki, dan mencegah aktivitas penipuan</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          {/* Data Sharing and Security */}
          <AnimatedSection className="mb-10" delay={0.3}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-[#1E4D2B]" />
                  Berbagi Data
                </h2>
                
                <p className="text-gray-700 mb-4">
                  Kami tidak menjual informasi pribadi Anda kepada pihak ketiga. Kami dapat membagikan informasi dengan:
                </p>
                
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Penyedia layanan yang membantu kami menjalankan bisnis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Otoritas hukum jika diwajibkan oleh hukum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Dalam kasus merger, akuisisi, atau penjualan aset</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-[#1E4D2B]" />
                  Keamanan Data
                </h2>
                
                <p className="text-gray-700 mb-4">
                  Kami menerapkan langkah-langkah keamanan untuk melindungi informasi Anda, termasuk:
                </p>
                
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Enkripsi data yang dikirim</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Perlindungan akses secara ketat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Prosedur cadangan dan pemulihan data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1E4D2B] font-bold mr-2">•</span>
                    <span>Pemantauan keamanan secara regular</span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Your Rights */}
          <AnimatedSection className="mb-10" delay={0.4}>
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Scale className="w-6 h-6 mr-2 text-[#1E4D2B]" />
                Hak-Hak Anda
              </h2>
              
              <p className="text-gray-700 mb-4">
                Anda memiliki hak-hak tertentu sehubungan dengan informasi pribadi Anda, termasuk:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#153969] mb-2">Hak Akses</h3>
                  <p className="text-gray-700 text-sm">
                    Anda dapat meminta salinan informasi pribadi yang kami simpan tentang Anda.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#153969] mb-2">Hak Koreksi</h3>
                  <p className="text-gray-700 text-sm">
                    Anda dapat meminta kami memperbaiki informasi yang tidak akurat.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#153969] mb-2">Hak Penghapusan</h3>
                  <p className="text-gray-700 text-sm">
                    Dalam keadaan tertentu, Anda dapat meminta kami menghapus data Anda.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#153969] mb-2">Hak Pembatasan</h3>
                  <p className="text-gray-700 text-sm">
                    Anda dapat meminta kami membatasi pemrosesan informasi Anda.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Changes to Privacy Policy and Contact */}
          <AnimatedSection delay={0.5}>
            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-[#1E4D2B]" />
                  Perubahan Kebijakan Privasi
                </h2>
                
                <p className="text-gray-700">
                  Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan tersebut akan berlaku segera setelah kami
                  mempublikasikan versi yang diperbarui di website kami. Kami mendorong Anda untuk secara berkala meninjau Kebijakan Privasi
                  ini untuk mengetahui perubahan terbaru.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#153969] mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-[#1E4D2B]" />
                  Hubungi Kami
                </h2>
                <p className="text-gray-700 mb-6">
                  Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau praktik privasi kami, silakan hubungi kami di:
                </p>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
                >
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
                      <a href="tel:+6281218127503" className="text-[#153969] hover:underline">
                        +62 812-1812-7503
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              <div className="text-center border-t border-gray-200 pt-8">
                <p className="text-gray-600 text-sm">
                  Kebijakan Privasi ini berlaku efektif sejak 1 Februari 2025.<br />
                  Terakhir diperbarui: Februari 2025
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}