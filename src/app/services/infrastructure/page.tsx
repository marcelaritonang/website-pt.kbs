'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Clock, Shield, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function InfrastructureDevelopment() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { language } = useLanguage();
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
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/images/bangunan/infrastruktur.jpg"
          alt={language === 'en' ? "Infrastructure Development" : "Pengembangan Infrastruktur"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4"
              >
                {language === 'en' ? "Infrastructure Development" : "Pengembangan Infrastruktur"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                {language === 'en' 
                  ? "Quality infrastructure is the foundation of economic growth and improved quality of life." 
                  : "Infrastruktur berkualitas adalah fondasi pertumbuhan ekonomi dan peningkatan kualitas hidup."}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link 
                  href="/contact"
                  className="inline-flex items-center bg-[#153969] hover:bg-[#0f2a4d] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {language === 'en' ? "Consult Now" : "Konsultasi Sekarang"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className={`py-16 md:py-20 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-6 transition-colors duration-300`}
            >
              {language === 'en' ? "Building the Future" : "Membangun Masa Depan"}
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`w-24 h-1 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mx-auto mb-8 transition-colors duration-300`}
            />
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 transition-colors duration-300`}
            >
              {language === 'en' 
                ? "KBS has extensive experience in developing large-scale infrastructure projects throughout Indonesia. With an integrated approach and modern technology, we provide efficient, sustainable, and durable infrastructure solutions."
                : "KBS memiliki pengalaman luas dalam pengembangan proyek infrastruktur skala besar di seluruh Indonesia. Dengan pendekatan terintegrasi dan teknologi modern, kami memberikan solusi infrastruktur yang efisien, berkelanjutan, dan tahan lama."}
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
            >
              {language === 'en'
                ? "Our team consists of experienced engineers, project managers, and technical specialists who work together to overcome the most complex challenges in infrastructure development and deliver high-quality projects that support economic and social development."
                : "Tim kami terdiri dari insinyur berpengalaman, manajer proyek, dan spesialis teknis yang bekerja sama untuk mengatasi tantangan paling kompleks dalam pembangunan infrastruktur dan menghasilkan proyek berkualitas tinggi yang mendukung perkembangan ekonomi dan sosial."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Infrastructure Services */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/3' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <motion.h2 
              variants={fadeInUp}
              className={`text-4xl md:text-5xl font-extrabold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
            >
              {language === 'en' ? "Our Infrastructure Services" : "Layanan Infrastruktur Kami"}
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className={`w-24 h-2 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mx-auto mb-6 rounded-full transition-colors duration-300`}
            />
            <motion.p 
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
            >
              {language === 'en'
                ? "Providing the best infrastructure development solutions for the nation's progress."
                : "Menyediakan solusi pembangunan infrastruktur terbaik untuk kemajuan bangsa."}
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Service 1 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700 border-blue-500' : 'bg-white border-[#153969]'} rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 transition-colors duration-300`}
            >
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
                {language === 'en' ? "Roads & Bridges" : "Jalan & Jembatan"}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                {language === 'en'
                  ? "Building better and integrated transportation networks."
                  : "Membangun jaringan transportasi yang lebih baik dan terintegrasi."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Toll roads and arterial road construction" : "Konstruksi jalan tol dan jalan arteri"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Suspension bridges and viaducts" : "Jembatan suspensi dan viaduct"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Road repair and maintenance" : "Perbaikan dan pemeliharaan jalan"}
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700 border-blue-500' : 'bg-white border-[#153969]'} rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 transition-colors duration-300`}
            >
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
                {language === 'en' ? "Drainage & Irrigation" : "Drainase & Irigasi"}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                {language === 'en'
                  ? "Water solutions to support a better environment and flood-free areas."
                  : "Solusi air untuk mendukung lingkungan yang lebih baik dan bebas banjir."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Urban drainage systems" : "Sistem drainase perkotaan"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Agricultural irrigation networks" : "Jaringan irigasi pertanian"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Flood and erosion control" : "Pengendalian banjir dan erosi"}
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700 border-blue-500' : 'bg-white border-[#153969]'} rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 transition-colors duration-300`}
            >
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
                {language === 'en' ? "Industrial Areas" : "Kawasan Industri"}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                {language === 'en'
                  ? "Helping develop modern and efficient industrial areas."
                  : "Membantu pengembangan kawasan industri yang modern dan efisien."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Industrial area planning" : "Perencanaan kawasan industri"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Industrial supporting infrastructure" : "Infrastruktur pendukung industri"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Integrated utility facilities" : "Fasilitas utilitas terpadu"}
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Additional Services */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
          >
            {/* Service 4 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700 border-blue-500' : 'bg-white border-[#153969]'} rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 transition-colors duration-300`}
            >
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
                {language === 'en' ? "Ports & Airports" : "Pelabuhan & Bandara"}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                {language === 'en'
                  ? "Improving national and international transportation connectivity."
                  : "Meningkatkan konektivitas transportasi nasional dan internasional."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Passenger and cargo terminals" : "Terminal penumpang dan kargo"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Piers and storage areas" : "Dermaga dan area penyimpanan"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Runway infrastructure" : "Infrastruktur landasan pacu"}
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Service 5 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700 border-blue-500' : 'bg-white border-[#153969]'} rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 transition-colors duration-300`}
            >
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
                {language === 'en' ? "Energy & Utilities" : "Energi & Utilitas"}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                {language === 'en'
                  ? "Building energy infrastructure to support economic growth."
                  : "Membangun infrastruktur energi untuk mendukung pertumbuhan ekonomi."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Transmission and distribution networks" : "Jaringan transmisi dan distribusi"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Power generation plants" : "Pembangkit listrik"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Clean water supply systems" : "Sistem penyediaan air bersih"}
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Service 6 */}
            <motion.div 
              variants={fadeInUp}
              className={`${isDark ? 'bg-gray-700 border-blue-500' : 'bg-white border-[#153969]'} rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 transition-colors duration-300`}
            >
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
                {language === 'en' ? "Public Buildings" : "Bangunan Publik"}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                {language === 'en'
                  ? "Construction of public facilities for improved community welfare."
                  : "Konstruksi fasilitas publik untuk peningkatan kesejahteraan masyarakat."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Hospitals and healthcare facilities" : "Rumah sakit dan fasilitas kesehatan"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Schools and universities" : "Sekolah dan perguruan tinggi"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                    {language === 'en' ? "Government and sports buildings" : "Gedung pemerintahan dan olahraga"}
                  </span>
                </li>
              </ul>
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
              {language === 'en' ? "Featured Projects" : "Pilihan Proyek Konstruksi"}
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
                  {language === 'en' ? "Highway Construction Project" : "Proyek Pembangunan Jalan Tol"}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                  {language === 'en'
                    ? "Highway construction with advanced technology and safety features."
                    : "Pembangunan jalan tol dengan teknologi canggih dan fitur keselamatan."}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                  {language === 'en' ? "Location: Jakarta - Bandung" : "Lokasi: Jakarta - Bandung"}
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
                  {language === 'en' ? "Urban Drainage System" : "Sistem Drainase Perkotaan"}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                  {language === 'en'
                    ? "Comprehensive drainage system to prevent flooding in urban areas."
                    : "Sistem drainase komprehensif untuk mencegah banjir di daerah perkotaan."}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                  {language === 'en' ? "Location: Jakarta" : "Lokasi: Jakarta"}
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
                  {language === 'en' ? "Industrial Area Development" : "Pengembangan Kawasan Industri"}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>
                  {language === 'en'
                    ? "Integrated industrial area with complete supporting facilities."
                    : "Kawasan industri terpadu dengan fasilitas pendukung lengkap."}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                  {language === 'en' ? "Location: Bekasi" : "Lokasi: Bekasi"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/bangunan/infrastruktur2.jpg"
                  alt={language === 'en' ? "KBS Infrastructure Expertise" : "Keahlian Infrastruktur KBS"}
                  width={600}
                  height={700}
                  className="w-full object-cover h-[500px]"
                />
              </div>
              <div className={`absolute -bottom-6 -right-6 ${isDark ? 'bg-blue-600' : 'bg-[#153969]'} p-6 rounded-lg shadow-lg transition-colors duration-300`}>
                <div className="text-white">
                  <p className="text-2xl font-bold mb-2">15+</p>
                  <p className="text-sm uppercase tracking-wider">
                    {language === 'en' ? "Infrastructure Projects" : "Proyek Infrastruktur"}
                  </p>
                </div>
              </div>
            </motion.div>

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
                {language === 'en' ? "Our Infrastructure Expertise" : "Keahlian Kami dalam Infrastruktur"}
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className={`w-16 h-1 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mb-6 transition-colors duration-300`}
              />
              <motion.p 
                variants={fadeInUp}
                className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 transition-colors duration-300`}
              >
                {language === 'en'
                  ? "KBS has a dedicated team of infrastructure specialists with technical expertise and over 18 years of experience in various large-scale projects."
                  : "KBS memiliki tim spesialis yang berdedikasi untuk infrastruktur dengan keahlian teknis dan pengalaman lebih dari 18 tahun dalam berbagai proyek skala besar."}
              </motion.p>

              <div className="space-y-4 mt-8">
                <motion.div 
                  variants={fadeInUp}
                  className={`flex items-center ${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-md transition-colors duration-300`}
                >
                  <div className={`${isDark ? 'bg-blue-400/10' : 'bg-[#153969]/10'} p-3 rounded-full mr-4 transition-colors duration-300`}>
                    <Shield className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                      {language === 'en' ? "Safety & Reliability" : "Keamanan & Keandalan"}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                      {language === 'en'
                        ? "Prioritizing safety and reliability in every infrastructure project"
                        : "Mengutamakan keamanan dan keandalan dalam setiap proyek infrastruktur"}
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className={`flex items-center ${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-md transition-colors duration-300`}
                >
                  <div className={`${isDark ? 'bg-blue-400/10' : 'bg-[#153969]/10'} p-3 rounded-full mr-4 transition-colors duration-300`}>
                    <Award className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                      {language === 'en' ? "International Standards" : "Standar Internasional"}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                      {language === 'en'
                        ? "Implementing international standards and global best practices"
                        : "Menerapkan standar internasional dan praktik terbaik global"}
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className={`flex items-center ${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-md transition-colors duration-300`}
                >
                  <div className={`${isDark ? 'bg-blue-400/10' : 'bg-[#153969]/10'} p-3 rounded-full mr-4 transition-colors duration-300`}>
                    <Clock className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                      {language === 'en' ? "On-Time Completion" : "Penyelesaian Tepat Waktu"}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                      {language === 'en'
                        ? "Commitment to completing projects on time according to schedule"
                        : "Komitmen untuk menyelesaikan proyek tepat waktu sesuai jadwal"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
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
                ? "Answers to common questions about our infrastructure services"
                : "Jawaban untuk pertanyaan umum tentang layanan infrastruktur kami"}
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
                      ? "How does KBS handle large-scale infrastructure projects?"
                      : "Bagaimana KBS menangani proyek infrastruktur skala besar?"}
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
                      ? "KBS implements an integrated project management approach for large-scale infrastructure projects. We form specialized teams from various disciplines, use the latest project management technology, and apply proven methodologies. Each project goes through detailed planning, strict control implementation, and continuous monitoring to ensure quality, safety, and timely completion according to specifications and agreed budget."
                      : "KBS menerapkan pendekatan manajemen proyek terintegrasi untuk proyek infrastruktur skala besar. Kami membentuk tim khusus yang terdiri dari berbagai disiplin ilmu, menggunakan teknologi manajemen proyek terkini, dan menerapkan metodologi yang sudah terbukti. Setiap proyek melalui tahap perencanaan detail, pelaksanaan dengan kontrol ketat, dan pemantauan berkelanjutan untuk memastikan kualitas, keselamatan, dan penyelesaian tepat waktu sesuai dengan spesifikasi dan anggaran yang disepakati."}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-200'} pb-4 transition-colors duration-300`}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq2')}>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                    {language === 'en'
                      ? "What are KBS's advantages in infrastructure development?"
                      : "Apa keunggulan KBS dalam pengembangan infrastruktur?"}
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
                      ? "KBS's advantages include over 18 years of experience in infrastructure projects throughout Indonesia, an experienced team with high technical expertise, use of modern and innovative technology, commitment to sustainability, an integrated approach that combines various aspects of infrastructure, and a strong track record in completing projects on time with the best quality."
                      : "Keunggulan KBS meliputi pengalaman lebih dari 18 tahun dalam proyek infrastruktur di seluruh Indonesia, tim berpengalaman dengan keahlian teknis tinggi, penggunaan teknologi modern dan inovatif, komitmen terhadap keberlanjutan, pendekatan terintegrasi yang memadukan berbagai aspek infrastruktur, dan rekam jejak yang kuat dalam menyelesaikan proyek tepat waktu dengan kualitas terbaik."}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-200'} pb-4 transition-colors duration-300`}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq3')}>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                    {language === 'en'
                      ? "How does KBS ensure the quality of infrastructure projects?"
                      : "Bagaimana KBS memastikan kualitas proyek infrastruktur?"}
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
                      ? "KBS has a strict quality management system with ISO 9001 certification. We implement quality control at every stage of the project, from planning to completion. Our quality assurance team conducts routine inspections and testing, applies the latest industry standards, uses high-quality materials, and ensures compliance with all applicable regulations and technical specifications to produce reliable and durable infrastructure."
                      : "KBS memiliki sistem manajemen mutu yang ketat dengan sertifikasi ISO 9001. Kami menerapkan kontrol kualitas di setiap tahap proyek, mulai dari perencanaan hingga penyelesaian. Tim quality assurance kami melakukan inspeksi dan pengujian rutin, menerapkan standar industri terbaru, menggunakan material berkualitas tinggi, dan memastikan kepatuhan terhadap semua peraturan dan spesifikasi teknis yang berlaku untuk menghasilkan infrastruktur yang andal dan tahan lama."}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-200'} pb-4 transition-colors duration-300`}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq4')}>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                    {language === 'en'
                      ? "Does KBS apply sustainability principles in infrastructure projects?"
                      : "Apakah KBS menerapkan prinsip keberlanjutan dalam proyek infrastruktur?"}
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
                      ? "Yes, KBS is strongly committed to sustainability principles in every infrastructure project. We integrate environmentally friendly construction practices, use energy-efficient and resource-saving materials, implement solutions to minimize environmental impact, and consider social aspects in project planning. We also have ISO 14001 certification for environmental management systems and continue to seek innovations to create more sustainable infrastructure."
                      : "Ya, KBS sangat berkomitmen pada prinsip keberlanjutan dalam setiap proyek infrastruktur. Kami mengintegrasikan praktik konstruksi ramah lingkungan, menggunakan material yang hemat energi dan sumber daya, menerapkan solusi untuk meminimalkan dampak lingkungan, dan mempertimbangkan aspek sosial dalam perencanaan proyek. Kami juga memiliki sertifikasi ISO 14001 untuk sistem manajemen lingkungan dan terus mencari inovasi untuk membuat infrastruktur yang lebih berkelanjutan."}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq5')}>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                    {language === 'en'
                      ? "How does the collaboration process with KBS work for infrastructure projects?"
                      : "Bagaimana proses kerja sama dengan KBS untuk proyek infrastruktur?"}
                  </h3>
                  {activeSection === 'faq5' ? (
                    <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                  ) : (
                    <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                  )}
                </div>
                {activeSection === 'faq5' && (
                  <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                    {language === 'en'
                      ? "Collaboration with KBS begins with an initial consultation to understand the project's needs and objectives. We then conduct a feasibility study and prepare a comprehensive proposal that includes design, budget, and schedule. After agreement, we form a project team and begin the implementation phase. During the construction process, we provide regular progress reports and involve clients in important decision-making. The process ends with project handover and post-construction support services."
                      : "Kerja sama dengan KBS dimulai dengan konsultasi awal untuk memahami kebutuhan dan tujuan proyek. Kemudian, kami melakukan studi kelayakan dan menyusun proposal komprehensif yang mencakup desain, anggaran, dan jadwal. Setelah kesepakatan, kami membentuk tim proyek dan memulai tahap pelaksanaan. Selama proses konstruksi, kami memberikan laporan perkembangan rutin dan melibatkan klien dalam pengambilan keputusan penting. Proses berakhir dengan serah terima proyek dan layanan dukungan pasca-konstruksi."}
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
              {language === 'en' 
                ? "Ready to Start Your Infrastructure Project?" 
                : "Siap Memulai Proyek Infrastruktur Anda?"}
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              {language === 'en'
                ? "Make KBS your trusted infrastructure development partner that will help bring your vision to reality."
                : "Jadikan KBS sebagai mitra pembangunan infrastruktur tepercaya yang akan membantu mewujudkan visi Anda menjadi kenyataan."}
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
                {language === 'en' ? "Free Consultation" : "Konsultasi Gratis"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                {language === 'en' ? "Explore Other Services" : "Pelajari Layanan Lainnya"}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}