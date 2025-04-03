'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Clock, Shield, Award, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';


export default function ConstructionBuilding() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/construction2.jpg"
          alt={language === 'en' ? "Building Construction Services" : "Layanan Konstruksi Bangunan"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                {language === 'en' ? "Building Construction" : "Konstruksi Bangunan"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                {language === 'en' 
                  ? "Professional construction services for commercial, residential, and industrial projects" 
                  : "Layanan konstruksi profesional untuk proyek komersial, residensial, dan industri"}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link 
                  href="/contact"
                  className="inline-flex items-center bg-[#153969] hover:bg-[#0f2a4d] text-white px-6 py-3 rounded-md font-medium transition-colors shadow-lg"
                >
                  {language === 'en' ? "Request Quote" : "Minta Penawaran"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-6 transition-colors duration-300`}
            >
              {language === 'en' ? "Construction Excellence" : "Keunggulan Konstruksi"}
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`w-20 h-1 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mx-auto mb-8 transition-colors duration-300`}
            />
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 transition-colors duration-300`}
            >
              {language === 'en' 
                ? "KBS provides high-quality construction services throughout Indonesia. We prioritize expertise, precision, and reliability in every construction project we handle." 
                : "KBS menyediakan layanan konstruksi berkualitas tinggi di seluruh Indonesia. Kami mengedepankan keahlian, ketepatan, dan keandalan dalam setiap proyek pembangunan yang kami tangani."}
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
            >
              {language === 'en' 
                ? "Our comprehensive construction solutions cover the entire process from initial planning and design to project completion. We take pride in our ability to understand client needs, manage resources efficiently, and maintain the highest standards of expertise throughout the construction process." 
                : "Solusi konstruksi komprehensif kami mencakup seluruh proses dari perencanaan awal dan desain hingga penyelesaian proyek. Kami bangga dengan kemampuan kami untuk memahami kebutuhan klien, mengelola sumber daya secara efisien, dan menjaga standar keahlian tertinggi selama proses konstruksi."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className={`py-12 ${isDark ? 'bg-gray-800/3' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto mb-12 text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
            >
              {language === 'en' ? "Our Construction Approach" : "Pendekatan Konstruksi Kami"}
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className={`w-20 h-1 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mx-auto mb-6 transition-colors duration-300`}
            />
            <motion.p 
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
            >
              {language === 'en' 
                ? "We implement a proven methodology that ensures project success at every stage" 
                : "Kami menerapkan metodologi terbukti yang menjamin keberhasilan proyek di setiap tahap"}
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Step 1 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700 border-blue-500' : 'bg-white border-[#153969]'} rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border-t-4`}
            >
              <div className="flex items-center mb-4">
                <div className={`${isDark ? 'bg-blue-400/10' : 'bg-[#153969]/10'} rounded-full p-3 mr-4 transition-colors duration-300`}>
                  <span className={`flex items-center justify-center w-8 h-8 ${isDark ? 'bg-blue-500' : 'bg-[#153969]'} text-white rounded-full font-bold transition-colors duration-300`}>1</span>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                  {language === 'en' ? "Planning & Design" : "Perencanaan & Desain"}
                </h3>
              </div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                {language === 'en' 
                  ? "Comprehensive planning and innovative design that aligns with your vision and requirements, considering all aspects of the project." 
                  : "Perencanaan menyeluruh dan desain inovatif yang sesuai dengan visi dan kebutuhan Anda, mempertimbangkan semua aspek proyek."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Comprehensive feasibility study" : "Studi kelayakan komprehensif"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Detailed architectural planning" : "Perencanaan arsitektur detail"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Budget optimization strategy" : "Strategi optimasi anggaran"}
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700 border-blue-500' : 'bg-white border-[#153969]'} rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border-t-4`}
            >
              <div className="flex items-center mb-4">
                <div className={`${isDark ? 'bg-blue-400/10' : 'bg-[#153969]/10'} rounded-full p-3 mr-4 transition-colors duration-300`}>
                  <span className={`flex items-center justify-center w-8 h-8 ${isDark ? 'bg-blue-500' : 'bg-[#153969]'} text-white rounded-full font-bold transition-colors duration-300`}>2</span>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                  {language === 'en' ? "Construction Execution" : "Pelaksanaan Konstruksi"}
                </h3>
              </div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                {language === 'en' 
                  ? "Efficient and safe implementation of your project with strict quality control and adherence to schedule." 
                  : "Implementasi proyek Anda secara efisien dan aman dengan kontrol kualitas ketat dan kepatuhan terhadap jadwal."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Skilled workforce management" : "Manajemen tenaga kerja terampil"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Modern construction techniques" : "Teknik konstruksi modern"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Strict safety protocols" : "Protokol keselamatan ketat"}
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700 border-blue-500' : 'bg-white border-[#153969]'} rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border-t-4`}
            >
              <div className="flex items-center mb-4">
                <div className={`${isDark ? 'bg-blue-400/10' : 'bg-[#153969]/10'} rounded-full p-3 mr-4 transition-colors duration-300`}>
                  <span className={`flex items-center justify-center w-8 h-8 ${isDark ? 'bg-blue-500' : 'bg-[#153969]'} text-white rounded-full font-bold transition-colors duration-300`}>3</span>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                  {language === 'en' ? "Handover & Support" : "Serah Terima & Dukungan"}
                </h3>
              </div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                {language === 'en' 
                  ? "Smooth handover process and comprehensive post-construction support to ensure your satisfaction." 
                  : "Proses serah terima yang lancar dan dukungan pasca-konstruksi komprehensif untuk memastikan kepuasan Anda."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Thorough quality inspection" : "Inspeksi kualitas menyeluruh"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Complete documentation" : "Dokumentasi lengkap"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Ongoing maintenance options" : "Opsi pemeliharaan berkelanjutan"}
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.h2 
                variants={fadeInUp}
                className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
              >
                {language === 'en' ? "Our Construction Services" : "Layanan Konstruksi Kami"}
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className={`w-16 h-1 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mb-6 transition-colors duration-300`}
              />
              <motion.p 
                variants={fadeInUp}
                className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 transition-colors duration-300`}
              >
                {language === 'en' 
                  ? "We offer a range of construction services to meet diverse client needs across various sectors, including:" 
                  : "Kami menawarkan berbagai layanan konstruksi untuk memenuhi beragam kebutuhan klien di berbagai sektor, termasuk:"}
              </motion.p>

              <div className="space-y-4">
                <motion.div 
                  variants={fadeInUp}
                  className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg hover:shadow-md transition-all duration-300`}
                >
                  <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>
                    {language === 'en' ? "Commercial Buildings" : "Bangunan Komersial"}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' 
                      ? "Offices, retail spaces, hotels, and mixed-use developments designed for optimal functionality and aesthetic appeal." 
                      : "Kantor, ruang retail, hotel, dan pengembangan mixed-use yang dirancang untuk fungsi optimal dan daya tarik estetika."}
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg hover:shadow-md transition-all duration-300`}
                >
                  <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>
                    {language === 'en' ? "Residential Projects" : "Proyek Residensial"}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' 
                      ? "High-quality apartments, condominiums, and housing complexes built with attention to comfort and community needs." 
                      : "Apartemen berkualitas tinggi, kondominium, dan kompleks perumahan yang dibangun dengan perhatian terhadap kenyamanan dan kebutuhan komunitas."}
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg hover:shadow-md transition-all duration-300`}
                >
                  <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>
                    {language === 'en' ? "Industrial Facilities" : "Fasilitas Industri"}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' 
                      ? "Warehouses, factories, and specialized industrial buildings designed for operational efficiency and safety." 
                      : "Gudang, pabrik, dan bangunan industri khusus yang dirancang untuk efisiensi operasional dan keamanan."}
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg hover:shadow-md transition-all duration-300`}
                >
                  <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>
                    {language === 'en' ? "Institutional Buildings" : "Bangunan Institusional"}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' 
                      ? "Schools, healthcare facilities, and government buildings that serve community needs with purpose-oriented design." 
                      : "Sekolah, fasilitas kesehatan, dan gedung pemerintahan yang melayani kebutuhan masyarakat dengan desain yang berorientasi pada tujuan."}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/construction2.jpg"
                  alt={language === 'en' ? "KBS Construction Services" : "Layanan Konstruksi KBS"}
                  width={600}
                  height={800}
                  className="w-full object-cover h-[500px]"
                />
              </div>
              <div className={`absolute -bottom-6 -left-6 ${isDark ? 'bg-blue-600' : 'bg-[#153969]'} p-6 rounded-lg shadow-lg transition-colors duration-300`}>
                <div className="text-white">
                  <p className="text-2xl font-bold mb-2">15+</p>
                  <p className="text-sm uppercase tracking-wider">
                    {language === 'en' ? "Years Experience" : "Tahun Pengalaman"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`py-16 ${isDark ? 'bg-gray-800/3' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto mb-12 text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
            >
              {language === 'en' ? "Why Choose KBS Construction" : "Mengapa Memilih Konstruksi KBS"}
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className={`w-20 h-1 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mx-auto mb-6 transition-colors duration-300`}
            />
            <motion.p 
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
            >
              {language === 'en' 
                ? "What sets our construction services apart from competitors" 
                : "Apa yang membedakan layanan konstruksi kami dari kompetitor"}
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Feature 1 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300`}
            >
              <Award className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                {language === 'en' ? "Top Quality" : "Kualitas Terbaik"}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                {language === 'en' 
                  ? "Award-winning construction excellence recognized with various industry awards for our projects." 
                  : "Keunggulan konstruksi yang diakui dengan berbagai penghargaan industri untuk proyek-proyek kami."}
              </p>
            </motion.div>

            {/* Feature 2 */}
<motion.div 
  variants={fadeInUp}
  className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300`}
>
  <Clock className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`} />
  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
    {language === 'en' ? "On-Time Delivery" : "Pengerjaan Tepat Waktu"}
  </h3>
  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
    {language === 'en' 
      ? "Consistent track record of completing projects according to agreed schedules without compromising quality." 
      : "Rekam jejak yang konsisten dalam menyelesaikan proyek sesuai dengan jadwal yang disepakati tanpa mengorbankan kualitas."}
  </p>
</motion.div>

{/* Feature 3 */}
<motion.div 
  variants={fadeInUp}
  className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300`}
>
  <Shield className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`} />
  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
    {language === 'en' ? "Safety Excellence" : "Keunggulan Keamanan"}
  </h3>
  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
    {language === 'en' 
      ? "Industry-leading safety protocols and practices with an outstanding safety record." 
      : "Protokol dan praktik keselamatan terdepan di industri dengan catatan keselamatan yang luar biasa."}
  </p>
</motion.div>

{/* Feature 4 */}
<motion.div 
  variants={fadeInUp}
  className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300`}
>
  <Users className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`} />
  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
    {language === 'en' ? "Expert Team" : "Tim Ahli"}
  </h3>
  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
    {language === 'en' 
      ? "Skilled professionals with extensive experience in all aspects of construction." 
      : "Profesional terampil dengan pengalaman luas dalam semua aspek konstruksi."}
  </p>
</motion.div>
</motion.div>
</div>
</section>

{/* Featured Projects */}
<section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
<div className="container mx-auto px-4 md:px-8">
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerChildren}
    className="max-w-4xl mx-auto mb-12 text-center"
  >
    <motion.h2 
      variants={fadeInUp}
      className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
    >
      {language === 'en' ? "Featured Construction Projects" : "Pilihan Proyek Konstruksi"}
    </motion.h2>
    <motion.div 
      variants={fadeInUp}
      className={`w-20 h-1 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mx-auto mb-6 transition-colors duration-300`}
    />
    <motion.p 
      variants={fadeInUp}
      className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
    >
      {language === 'en' 
        ? "Here are some of our flagship projects that we have successfully completed." 
        : "Berikut adalah beberapa proyek unggulan yang telah kami selesaikan dengan sukses."}
    </motion.p>
  </motion.div>
  
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerChildren}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    {/* Project 1 */}
    <motion.div 
      variants={fadeInUp}
      className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300`}
    >
      <div className="p-6">
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
          {language === 'en' ? "Office Building Development" : "Pembangunan Gedung Perkantoran"}
        </h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
          {language === 'en' 
            ? "Modern office building with advanced facilities in Jakarta." 
            : "Gedung perkantoran modern dengan fasilitas canggih di Jakarta."}
        </p>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
          {language === 'en' ? "Location: Jakarta" : "Lokasi: Jakarta"}
        </p>
      </div>
    </motion.div>

    {/* Project 2 */}
    <motion.div 
      variants={fadeInUp}
      className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300`}
    >
      <div className="p-6">
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
          {language === 'en' ? "Premium Residential Complex" : "Kawasan Residensial Premium"}
        </h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
          {language === 'en' 
            ? "Exclusive housing complex with modern design." 
            : "Kompleks perumahan eksklusif dengan desain modern."}
        </p>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
          {language === 'en' ? "Location: Tangerang" : "Lokasi: Tangerang"}
        </p>
      </div>
    </motion.div>

    {/* Project 3 */}
    <motion.div 
      variants={fadeInUp}
      className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300`}
    >
      <div className="p-6">
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
          {language === 'en' ? "Logistics and Warehousing Center" : "Pusat Logistik dan Pergudangan"}
        </h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
          {language === 'en' 
            ? "Warehousing facility with efficient distribution systems." 
            : "Fasilitas pergudangan dengan sistem distribusi efisien."}
        </p>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
          {language === 'en' ? "Location: Jakarta" : "Lokasi: Jakarta"}
        </p>
      </div>
    </motion.div>
  </motion.div>
</div>
</section>

{/* FAQ Section */}
<section className={`py-16 ${isDark ? 'bg-gray-800/3' : 'bg-gray-50'} transition-colors duration-300`}>
<div className="container mx-auto px-4 md:px-8">
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerChildren}
    className="max-w-4xl mx-auto mb-12 text-center"
  >
    <motion.h2 
      variants={fadeInUp}
      className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
    >
      {language === 'en' ? "Frequently Asked Questions" : "Pertanyaan yang Sering Diajukan"}
    </motion.h2>
    <motion.div 
      variants={fadeInUp}
      className={`w-20 h-1 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mx-auto mb-6 transition-colors duration-300`}
    />
    <motion.p 
      variants={fadeInUp}
      className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
    >
      {language === 'en' 
        ? "Common questions about our building construction services" 
        : "Pertanyaan umum tentang layanan konstruksi bangunan kami"}
    </motion.p>
  </motion.div>
  
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerChildren}
    className={`max-w-3xl mx-auto ${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 transition-colors duration-300`}
  >
    <div className="space-y-4">
      <motion.div variants={fadeInUp} className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-200'} pb-4 transition-colors duration-300`}>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq1')}>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
            {language === 'en' 
              ? "What types of buildings do you construct?" 
              : "Apa saja jenis bangunan yang Anda konstruksi?"}
          </h3>
          {activeSection === 'faq1' ? (
            <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
          ) : (
            <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
          )}
        </div>
        {activeSection === 'faq1' && (
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
            {language === 'en' 
              ? "KBS constructs various types of buildings including commercial offices, retail spaces, residential complexes, industrial facilities, educational institutions, healthcare facilities, and government buildings. Our experienced team can handle projects of various scales and complexities throughout Indonesia." 
              : "KBS membangun berbagai jenis bangunan termasuk kantor komersial, ruang retail, kompleks perumahan, fasilitas industri, institusi pendidikan, fasilitas kesehatan, dan gedung pemerintahan. Tim berpengalaman kami dapat menangani proyek dengan berbagai skala dan kompleksitas di seluruh Indonesia."}
          </p>
        )}
      </motion.div>

      <motion.div variants={fadeInUp} className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-200'} pb-4 transition-colors duration-300`}>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq2')}>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
            {language === 'en' 
              ? "How long does it take to complete a project?" 
              : "Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?"}
          </h3>
          {activeSection === 'faq2' ? (
            <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
          ) : (
            <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
          )}
        </div>
        {activeSection === 'faq2' && (
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
            {language === 'en' 
              ? "Project completion time depends on the complexity and scale of the work. We always commit to completing projects according to the agreed schedule while maintaining the best quality." 
              : "Waktu penyelesaian proyek tergantung pada kompleksitas dan skala pekerjaan. Kami selalu berkomitmen untuk menyelesaikan proyek sesuai jadwal yang telah disepakati dengan tetap menjaga kualitas terbaik."}
          </p>
        )}
      </motion.div>

      <motion.div variants={fadeInUp} className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-200'} pb-4 transition-colors duration-300`}>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq3')}>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
            {language === 'en' 
              ? "How do I get a price quote?" 
              : "Bagaimana cara mendapatkan penawaran harga?"}
          </h3>
          {activeSection === 'faq3' ? (
            <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
          ) : (
            <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
          )}
        </div>
        {activeSection === 'faq3' && (
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
            {language === 'en' 
              ? "You can contact us through our contact page to get a consultation and price quote that suits your project needs." 
              : "Anda dapat menghubungi kami melalui halaman kontak untuk mendapatkan konsultasi dan penawaran harga yang sesuai dengan kebutuhan proyek Anda."}
          </p>
        )}
      </motion.div>

      <motion.div variants={fadeInUp}>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq4')}>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
            {language === 'en' 
              ? "Do you offer post-construction services?" 
              : "Apakah kami menawarkan layanan pasca-konstruksi?"}
          </h3>
          {activeSection === 'faq4' ? (
            <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
          ) : (
            <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
          )}
        </div>
        {activeSection === 'faq4' && (
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
            {language === 'en' 
              ? "Yes, we provide comprehensive post-construction services including building maintenance, repairs, renovations, and facility management. We offer customized maintenance packages to ensure your building operates efficiently and maintains its value over time. Our team is ready to handle issues that may arise after project completion." 
              : "Ya, kami menyediakan layanan pasca-konstruksi yang komprehensif termasuk pemeliharaan bangunan, perbaikan, renovasi, dan manajemen fasilitas. Kami menawarkan paket pemeliharaan yang disesuaikan untuk memastikan bangunan Anda beroperasi secara efisien dan mempertahankan nilainya seiring waktu. Tim kami siap menangani masalah yang mungkin muncul setelah penyelesaian proyek."}
          </p>
        )}
      </motion.div>
    </div>
  </motion.div>
</div>
</section>

{/* Call to Action */}
<section className={`py-16 ${isDark ? 'bg-blue-800/3' : 'bg-[#153969]'} text-white transition-colors duration-300`}>
<div className="container mx-auto px-4 md:px-8">
  <div className="max-w-4xl mx-auto text-center">
    <motion.h2 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-3xl md:text-4xl font-bold mb-6"
    >
      {language === 'en' ? "Ready to Start Your Construction Project?" : "Siap Memulai Proyek Konstruksi Anda?"}
    </motion.h2>
    <motion.p 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-lg text-white/90 mb-8"
    >
      {language === 'en' 
        ? "Contact our team today to discuss your construction needs and get tailored solutions for your project." 
        : "Hubungi tim kami hari ini untuk mendiskusikan kebutuhan konstruksi Anda dan dapatkan solusi yang disesuaikan untuk proyek Anda."}
    </motion.p>
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <Link 
        href="/contact" 
        className="inline-flex items-center bg-white text-[#153969] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors shadow-lg"
      >
        {language === 'en' ? "Contact Us" : "Hubungi Kami"}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
      <Link 
        href="/services" 
        className="inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-colors"
      >
        {language === 'en' ? "Explore Other Services" : "Jelajahi Layanan Lainnya"}
      </Link>
    </motion.div>
  </div>
</div>
</section>
</div>
);
}