// app/privacy/page.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Scale, AlertCircle, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function PrivacyPolicyPage() {
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
            {language === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            {language === 'en' 
              ? 'Our commitment to protecting your data and information' 
              : 'Komitmen kami untuk melindungi data dan informasi Anda'}
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
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-xl p-8 transition-colors duration-300`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-6 flex items-center transition-colors duration-300`}>
                <Shield className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
                {language === 'en' ? 'Introduction' : 'Pendahuluan'}
              </h2>

              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>
                {language === 'en' 
                  ? 'PT Karya Bangun Semesta is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services or visit our website.'
                  : 'PT Karya Bangun Semesta berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika Anda menggunakan layanan kami atau mengunjungi website kami.'}
              </p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                {language === 'en' 
                  ? 'By using our services, you agree to the practices described in this privacy policy.'
                  : 'Dengan menggunakan layanan kami, Anda menyetujui praktik yang dijelaskan dalam kebijakan privasi ini.'}
              </p>
            </div>
          </AnimatedSection>

          {/* How We Use Information */}
          <AnimatedSection className="mb-10" delay={0.2}>
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-sm transition-colors duration-300`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 flex items-center transition-colors duration-300`}>
                <Eye className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
                {language === 'en' ? 'How We Use Information' : 'Bagaimana Kami Menggunakan Informasi'}
              </h2>
              
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>
                {language === 'en' ? 'We use the information we collect to:' : 'Kami menggunakan informasi yang kami kumpulkan untuk:'}
              </p>
              
              <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                <li className="flex items-start">
                  <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                  <span>
                    {language === 'en' 
                      ? 'Provide, maintain, and improve our services' 
                      : 'Menyediakan, memelihara, dan meningkatkan layanan kami'}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                  <span>
                    {language === 'en' 
                      ? 'Process and complete transactions' 
                      : 'Memproses dan menyelesaikan transaksi'}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                  <span>
                    {language === 'en' 
                      ? 'Send technical information, updates, and administrative messages' 
                      : 'Mengirimkan informasi teknis, pembaruan, dan pesan administratif'}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                  <span>
                    {language === 'en' 
                      ? 'Respond to your comments, questions, and requests' 
                      : 'Menanggapi komentar, pertanyaan, dan permintaan Anda'}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                  <span>
                    {language === 'en' 
                      ? 'Understand how you use our services' 
                      : 'Memahami bagaimana Anda menggunakan layanan kami'}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                  <span>
                    {language === 'en' 
                      ? 'Detect, investigate, and prevent fraudulent activities' 
                      : 'Mendeteksi, menyelidiki, dan mencegah aktivitas penipuan'}
                  </span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          {/* Data Sharing and Security */}
          <AnimatedSection className="mb-10" delay={0.3}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-colors duration-300`}>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center transition-colors duration-300`}>
                  <UserCheck className={`w-5 h-5 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
                  {language === 'en' ? 'Data Sharing' : 'Berbagi Data'}
                </h2>
                
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>
                  {language === 'en' 
                    ? 'We do not sell your personal information to third parties. We may share information with:' 
                    : 'Kami tidak menjual informasi pribadi Anda kepada pihak ketiga. Kami dapat membagikan informasi dengan:'}
                </p>
                
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' 
                        ? 'Service providers that help us run our business' 
                        : 'Penyedia layanan yang membantu kami menjalankan bisnis'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' 
                        ? 'Legal authorities if required by law' 
                        : 'Otoritas hukum jika diwajibkan oleh hukum'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' 
                        ? 'In case of mergers, acquisitions, or asset sales' 
                        : 'Dalam kasus merger, akuisisi, atau penjualan aset'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-colors duration-300`}>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center transition-colors duration-300`}>
                  <Lock className={`w-5 h-5 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
                  {language === 'en' ? 'Data Security' : 'Keamanan Data'}
                </h2>
                
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>
                  {language === 'en' 
                    ? 'We implement security measures to protect your information, including:' 
                    : 'Kami menerapkan langkah-langkah keamanan untuk melindungi informasi Anda, termasuk:'}
                </p>
                
                <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Encryption of transmitted data' : 'Enkripsi data yang dikirim'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Strict access protection' : 'Perlindungan akses secara ketat'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Data backup and recovery procedures' : 'Prosedur cadangan dan pemulihan data'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} font-bold mr-2 transition-colors duration-300`}>•</span>
                    <span>
                      {language === 'en' ? 'Regular security monitoring' : 'Pemantauan keamanan secara regular'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Your Rights */}
          <AnimatedSection className="mb-10" delay={0.4}>
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-sm transition-colors duration-300`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 flex items-center transition-colors duration-300`}>
                <Scale className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
                {language === 'en' ? 'Your Rights' : 'Hak-Hak Anda'}
              </h2>
              
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>
                {language === 'en' 
                  ? 'You have certain rights regarding your personal information, including:' 
                  : 'Anda memiliki hak-hak tertentu sehubungan dengan informasi pribadi Anda, termasuk:'}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors duration-300`}>
                  <h3 className={`font-semibold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>
                    {language === 'en' ? 'Right to Access' : 'Hak Akses'}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm transition-colors duration-300`}>
                    {language === 'en' 
                      ? 'You can request a copy of the personal information we hold about you.' 
                      : 'Anda dapat meminta salinan informasi pribadi yang kami simpan tentang Anda.'}
                  </p>
                </div>
                
                <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors duration-300`}>
                  <h3 className={`font-semibold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>
                    {language === 'en' ? 'Right to Correction' : 'Hak Koreksi'}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm transition-colors duration-300`}>
                    {language === 'en' 
                      ? 'You can ask us to correct inaccurate information.' 
                      : 'Anda dapat meminta kami memperbaiki informasi yang tidak akurat.'}
                  </p>
                </div>
                
                <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors duration-300`}>
                  <h3 className={`font-semibold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>
                    {language === 'en' ? 'Right to Erasure' : 'Hak Penghapusan'}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm transition-colors duration-300`}>
                    {language === 'en' 
                      ? 'In certain circumstances, you can request that we delete your data.' 
                      : 'Dalam keadaan tertentu, Anda dapat meminta kami menghapus data Anda.'}
                  </p>
                </div>
                
                <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors duration-300`}>
                  <h3 className={`font-semibold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>
                    {language === 'en' ? 'Right to Restriction' : 'Hak Pembatasan'}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm transition-colors duration-300`}>
                    {language === 'en' 
                      ? 'You can request that we restrict the processing of your information.' 
                      : 'Anda dapat meminta kami membatasi pemrosesan informasi Anda.'}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Changes to Privacy Policy and Contact */}
          <AnimatedSection delay={0.5}>
            <div className="space-y-8">
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-colors duration-300`}>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center transition-colors duration-300`}>
                  <AlertCircle className={`w-5 h-5 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
                  {language === 'en' ? 'Changes to Privacy Policy' : 'Perubahan Kebijakan Privasi'}
                </h2>
                
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  {language === 'en' 
                    ? 'We may update this Privacy Policy from time to time. The changes will take effect immediately after we publish the updated version on our website. We encourage you to periodically review this Privacy Policy to stay informed of the latest changes.' 
                    : 'Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan tersebut akan berlaku segera setelah kami mempublikasikan versi yang diperbarui di website kami. Kami mendorong Anda untuk secara berkala meninjau Kebijakan Privasi ini untuk mengetahui perubahan terbaru.'}
                </p>
              </div>
              
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-xl p-8 transition-colors duration-300`}>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 flex items-center transition-colors duration-300`}>
                  <Mail className={`w-6 h-6 mr-2 ${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} transition-colors duration-300`} />
                  {language === 'en' ? 'Contact Us' : 'Hubungi Kami'}
                </h2>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 transition-colors duration-300`}>
                  {language === 'en' 
                    ? 'If you have any questions about this Privacy Policy or our privacy practices, please contact us at:' 
                    : 'Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau praktik privasi kami, silakan hubungi kami di:'}
                </p>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 border shadow-sm transition-colors duration-300`}
                >
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
                      <a href="tel:+6281218127503" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#153969] hover:underline'} transition-colors duration-300`}>
                        +62 812-1812-7503
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              <div className={`text-center ${isDark ? 'border-gray-700' : 'border-gray-200'} border-t pt-8 transition-colors duration-300`}>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm transition-colors duration-300`}>
                  {language === 'en' 
                    ? 'This Privacy Policy is effective as of February 1, 2025.' 
                    : 'Kebijakan Privasi ini berlaku efektif sejak 1 Februari 2025.'}<br />
                  {language === 'en' ? 'Last updated: February 2025' : 'Terakhir diperbarui: Februari 2025'}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}