// app/ethics/page.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Mail, Phone, Shield, Award, Minimize2, Users, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function EthicsPage() {
  // Get language and theme from context
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Hero Banner */}
      <section className={`${isDark ? 'bg-blue-900' : 'bg-[#153969]'} pt-20 pb-16 relative transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold text-white mt-8 mb-4"
          >
            {language === 'en' ? 'Company Code of Ethics' : 'Kode Etik Perusahaan'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            {language === 'en' 
              ? 'Behavioral and integrity standards of PT Karya Bangun Semesta' 
              : 'Standar perilaku dan integritas PT Karya Bangun Semesta'}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <AnimatedSection className="mb-10">
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg mb-6 transition-colors duration-300`}>
              {language === 'en' 
                ? 'PT Karya Bangun Semesta (KBS) is committed to conducting business with the highest ethical standards. This Code of Ethics serves as a behavioral guideline for all employees, partners, and stakeholders.'
                : 'PT Karya Bangun Semesta (KBS) berkomitmen untuk menjalankan bisnis dengan standar etika tertinggi. Kode Etik ini merupakan pedoman perilaku bagi seluruh karyawan, mitra, dan pemangku kepentingan.'}
            </p>
          </AnimatedSection>

          {/* Core Values */}
          <AnimatedSection className="mb-10">
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-xl p-8 transition-colors duration-300`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-6 flex items-center transition-colors duration-300`}>
                <Shield className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
                {language === 'en' ? 'Core Values' : 'Nilai-Nilai Inti'}
              </h2>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-6"
              >
                <motion.div variants={fadeInUp} className={`flex items-start ${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm hover:shadow-md  transition-colors duration-300`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full ${isDark ? 'bg-blue-600' : 'bg-[#1E4D2B]'} flex items-center justify-center text-white font-bold text-sm mr-3 transition-colors duration-300`}>1</div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {language === 'en' ? 'Integrity' : 'Integritas'}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {language === 'en' ? 'Honesty and transparency in every action' : 'Kejujuran dan transparansi dalam setiap tindakan'}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className={`flex items-start ${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm hover:shadow-md transition-colors duration-300`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full ${isDark ? 'bg-blue-600' : 'bg-[#1E4D2B]'} flex items-center justify-center text-white font-bold text-sm mr-3 transition-colors duration-300`}>2</div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {language === 'en' ? 'Quality' : 'Kualitas'}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {language === 'en' ? 'Highest standards in construction work' : 'Standar tertinggi dalam pekerjaan konstruksi'}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className={`flex items-start ${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm hover:shadow-md transition-colors duration-300`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full ${isDark ? 'bg-blue-600' : 'bg-[#1E4D2B]'} flex items-center justify-center text-white font-bold text-sm mr-3 transition-colors duration-300`}>3</div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {language === 'en' ? 'Safety' : 'Keselamatan'}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {language === 'en' ? 'Top priority for all stakeholders' : 'Prioritas utama bagi semua pemangku kepentingan'}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className={`flex items-start ${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm hover:shadow-md  transition-colors duration-300`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full ${isDark ? 'bg-blue-600' : 'bg-[#1E4D2B]'} flex items-center justify-center text-white font-bold text-sm mr-3 transition-colors duration-300`}>4</div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {language === 'en' ? 'Sustainability' : 'Keberlanjutan'}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {language === 'en' ? 'Responsibility for social and environmental impact' : 'Tanggung jawab terhadap dampak sosial dan lingkungan'}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className={`flex items-start ${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm hover:shadow-md md:col-span-2 transition-colors duration-300`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full ${isDark ? 'bg-blue-600' : 'bg-[#1E4D2B]'} flex items-center justify-center text-white font-bold text-sm mr-3 transition-colors duration-300`}>5</div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                      {language === 'en' ? 'Innovation' : 'Inovasi'}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                      {language === 'en' ? 'Finding the best solutions in every service' : 'Mencari solusi terbaik dalam setiap layanan'}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Key Principles */}
          <AnimatedSection className="mb-10">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 flex items-center transition-colors duration-300`}>
              <Award className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
              {language === 'en' ? 'Key Principles' : 'Prinsip-Prinsip Utama'}
            </h2>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-5 shadow-sm hover:shadow-md transition-colors duration-300`}
              >
                <h3 className={`text-xl font-semibold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 flex items-center transition-colors duration-300`}>
                  <Minimize2 className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Business Ethics' : 'Etika Bisnis'}
                </h3>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Zero-tolerance for corruption and bribery' : 'Zero-tolerance terhadap korupsi dan suap'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Avoiding conflicts of interest' : 'Menghindari konflik kepentingan'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Maintaining confidentiality of company and client information' : 'Menjaga kerahasiaan informasi perusahaan dan klien'}
                    </span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-5 shadow-sm hover:shadow-md transition-colors duration-300`}
              >
                <h3 className={`text-xl font-semibold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 flex items-center transition-colors duration-300`}>
                  <Shield className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Work Safety' : 'Keselamatan Kerja'}
                </h3>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Complying with all HSE procedures and regulations' : 'Mematuhi semua prosedur dan regulasi K3'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Reporting unsafe conditions and practices' : 'Melaporkan kondisi dan praktik tidak aman'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Using personal protective equipment' : 'Menggunakan peralatan perlindungan diri'}
                    </span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-5 shadow-sm hover:shadow-md transition-colors duration-300`}
              >
                <h3 className={`text-xl font-semibold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 flex items-center transition-colors duration-300`}>
                  <Users className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Stakeholder Relations' : 'Hubungan dengan Pemangku Kepentingan'}
                </h3>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Providing high-quality services' : 'Memberikan layanan berkualitas tinggi'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Fulfilling contractual commitments on time' : 'Memenuhi komitmen kontraktual tepat waktu'}
                    </span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-5 shadow-sm hover:shadow-md transition-colors duration-300`}
              >
                <h3 className={`text-xl font-semibold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 flex items-center transition-colors duration-300`}>
                  <Leaf className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Environmental Protection' : 'Perlindungan Lingkungan'}
                </h3>
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Complying with applicable environmental regulations' : 'Mematuhi peraturan lingkungan yang berlaku'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Minimizing waste, pollution, and carbon emissions' : 'Meminimalkan limbah, polusi dan emisi karbon'}
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Reporting */}
          <AnimatedSection className="mb-10" delay={0.2}>
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-xl p-8 transition-colors duration-300`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 flex items-center transition-colors duration-300`}>
                <Mail className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
                {language === 'en' ? 'Violation Reporting' : 'Pelaporan Pelanggaran'}
              </h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 transition-colors duration-300`}>
                {language === 'en' 
                  ? 'Every employee and business partner is encouraged to report suspected violations of this Code of Ethics. KBS prohibits all forms of retaliation against those who report in good faith.' 
                  : 'Setiap karyawan dan mitra bisnis didorong untuk melaporkan dugaan pelanggaran Kode Etik ini. KBS melarang segala bentuk pembalasan terhadap pihak yang melaporkan dengan itikad baik.'}
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border shadow-sm transition-colors duration-300`}
              >
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
                  {language === 'en' ? 'Contact Us:' : 'Hubungi Kami:'}
                </h3>
                
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex items-center"
                  >
                    <Mail className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} mr-3 transition-colors duration-300`} />
                    <a href="mailto:karyabangunsemestas@gmail.com" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#153969] hover:underline'} transition-colors duration-300`}>
                      karyabangunsemestas@gmail.com
                    </a>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex items-center"
                  >
                    <Phone className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} mr-3 transition-colors duration-300`} />
                    <a href="http://wa.me/+6281218127503" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#153969] hover:underline'} transition-colors duration-300`}>
                      +62 812-1812-7503
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Footer note */}
          <AnimatedSection delay={0.3}>
            <div className={`text-center ${isDark ? 'border-gray-700' : 'border-gray-200'} border-t pt-8 transition-colors duration-300`}>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm transition-colors duration-300`}>
                {language === 'en' 
                  ? 'This document is a summary of PT Karya Bangun Semesta\'s Code of Ethics.' 
                  : 'Dokumen ini adalah ringkasan Kode Etik PT Karya Bangun Semesta.'}<br />
                {language === 'en' ? 'Last updated: February 2025' : 'Diperbarui terakhir: Februari 2025'}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}