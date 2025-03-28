'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building, CheckCircle, ArrowRight, Clock, Shield, Award, Users, ChevronDown, ChevronUp } from 'lucide-react';

export default function InfrastructureDevelopment() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/images/bangunan/infrastruktur.jpg" 
          alt="Pengembangan Infrastruktur"
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
                Pengembangan Infrastruktur
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                Infrastruktur berkualitas adalah fondasi pertumbuhan ekonomi dan peningkatan kualitas hidup.
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
                  Konsultasi Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Membangun Masa Depan
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-24 h-1 bg-[#153969] mx-auto mb-8"
            />
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-6"
            >
              KBS memiliki pengalaman luas dalam pengembangan proyek infrastruktur skala besar di seluruh Indonesia. Dengan pendekatan terintegrasi dan teknologi modern, kami memberikan solusi infrastruktur yang efisien, berkelanjutan, dan tahan lama.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Tim kami terdiri dari insinyur berpengalaman, manajer proyek, dan spesialis teknis yang bekerja sama untuk mengatasi tantangan paling kompleks dalam pembangunan infrastruktur dan menghasilkan proyek berkualitas tinggi yang mendukung perkembangan ekonomi dan sosial.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Infrastruktur Services */}
      <section className="py-20 bg-gray-50">
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
              className="text-4xl md:text-5xl font-extrabold text-[#153969] mb-3"
            >
              Layanan Infrastruktur Kami
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-24 h-2 bg-[#153969] mx-auto mb-6 rounded-full"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Menyediakan solusi pembangunan infrastruktur terbaik untuk kemajuan bangsa.
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
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-[#153969]"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Jalan & Jembatan</h3>
              <p className="text-gray-600 mb-4">Membangun jaringan transportasi yang lebih baik dan terintegrasi.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Konstruksi jalan tol dan jalan arteri</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Jembatan suspensi dan viaduct</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Perbaikan dan pemeliharaan jalan</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-[#153969]"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Drainase & Irigasi</h3>
              <p className="text-gray-600 mb-4">Solusi air untuk mendukung lingkungan yang lebih baik dan bebas banjir.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Sistem drainase perkotaan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Jaringan irigasi pertanian</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pengendalian banjir dan erosi</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-[#153969]"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Kawasan Industri</h3>
              <p className="text-gray-600 mb-4">Membantu pengembangan kawasan industri yang modern dan efisien.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Perencanaan kawasan industri</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Infrastruktur pendukung industri</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Fasilitas utilitas terpadu</span>
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
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-[#153969]"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Pelabuhan & Bandara</h3>
              <p className="text-gray-600 mb-4">Meningkatkan konektivitas transportasi nasional dan internasional.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Terminal penumpang dan kargo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Dermaga dan area penyimpanan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Infrastruktur landasan pacu</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 5 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-[#153969]"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Energi & Utilitas</h3>
              <p className="text-gray-600 mb-4">Membangun infrastruktur energi untuk mendukung pertumbuhan ekonomi.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Jaringan transmisi dan distribusi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pembangkit listrik</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Sistem penyediaan air bersih</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 6 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-[#153969]"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Bangunan Publik</h3>
              <p className="text-gray-600 mb-4">Konstruksi fasilitas publik untuk peningkatan kesejahteraan masyarakat.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Rumah sakit dan fasilitas kesehatan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Sekolah dan perguruan tinggi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Gedung pemerintahan dan olahraga</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pilihan Proyek Konstruksi */}
                  <section className="py-16 md:py-24 bg-gray-50">
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
                    className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
                  >
                    Pilihan Proyek Konstruksi
                  </motion.h2>
                  <motion.div 
                    variants={fadeInUp}
                    className="w-20 h-1 bg-[#153969] mx-auto mb-6"
                  />
                  <motion.p 
                    variants={fadeInUp}
                    className="text-lg text-gray-700"
                  >
                    Berikut adalah beberapa proyek unggulan yang telah kami selesaikan dengan sukses.
                  </motion.p>
                </motion.div>
                
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerChildren}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {/* Proyek 1 */}
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Pembangunan Gedung Perkantoran</h3>
                      <p className="text-gray-600 mb-4">Gedung perkantoran modern dengan fasilitas canggih di Jakarta.</p>
                      <p className="text-gray-500 text-sm">Lokasi: Jakarta</p>
                    </div>
                  </motion.div>
      
                  {/* Proyek 2 */}
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Kawasan Residensial Premium</h3>
                      <p className="text-gray-600 mb-4">Kompleks perumahan eksklusif dengan desain modern.</p>
                      <p className="text-gray-500 text-sm">Lokasi: Tangerang</p>
                    </div>
                  </motion.div>
      
                  {/* Proyek 3 */}
                  <motion.div 
                    variants={fadeInUp}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Pusat Logistik dan Pergudangan</h3>
                      <p className="text-gray-600 mb-4">Fasilitas pergudangan dengan sistem distribusi efisien.</p>
                      <p className="text-gray-500 text-sm">Lokasi: Jakarta</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

      {/* Our Expertise */}
      <section className="py-16 bg-gray-50">
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
                  src="/images/bangunan/infrastruktur2.jpg" // Ganti dengan gambar layanan Anda
                  alt="Keahlian Infrastruktur KBS"
                  width={600}
                  height={700}
                  className="w-full object-cover h-[500px]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#153969] p-6 rounded-lg shadow-lg">
                <div className="text-white">
                  <p className="text-2xl font-bold mb-2">15+</p>
                  <p className="text-sm uppercase tracking-wider">Proyek Infrastruktur</p>
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
                className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
              >
                Keahlian Kami dalam Infrastruktur
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-16 h-1 bg-[#153969] mb-6"
              />
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-700 mb-6"
              >
                KBS memiliki tim spesialis yang berdedikasi untuk infrastruktur dengan keahlian teknis dan pengalaman lebih dari 18 tahun dalam berbagai proyek skala besar.
              </motion.p>

              <div className="space-y-4 mt-8">
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="bg-[#153969]/10 p-3 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-[#153969]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Keamanan & Keandalan</h3>
                    <p className="text-gray-600">Mengutamakan keamanan dan keandalan dalam setiap proyek infrastruktur</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="bg-[#153969]/10 p-3 rounded-full mr-4">
                    <Award className="h-6 w-6 text-[#153969]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Standar Internasional</h3>
                    <p className="text-gray-600">Menerapkan standar internasional dan praktik terbaik global</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="bg-[#153969]/10 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-[#153969]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Penyelesaian Tepat Waktu</h3>
                    <p className="text-gray-600">Komitmen untuk menyelesaikan proyek tepat waktu sesuai jadwal</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
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
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
            >
              Pertanyaan yang Sering Diajukan
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-6"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Jawaban untuk pertanyaan umum tentang layanan infrastruktur kami
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6"
          >
            <div className="space-y-4">
              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq1')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana KBS menangani proyek infrastruktur skala besar?</h3>
                  {activeSection === 'faq1' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq1' && (
                  <p className="mt-2 text-gray-600">
                    KBS menerapkan pendekatan manajemen proyek terintegrasi untuk proyek infrastruktur skala besar. Kami membentuk tim khusus yang terdiri dari berbagai disiplin ilmu, menggunakan teknologi manajemen proyek terkini, dan menerapkan metodologi yang sudah terbukti. Setiap proyek melalui tahap perencanaan detail, pelaksanaan dengan kontrol ketat, dan pemantauan berkelanjutan untuk memastikan kualitas, keselamatan, dan penyelesaian tepat waktu sesuai dengan spesifikasi dan anggaran yang disepakati.
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq2')}>
                <h3 className="text-xl font-bold text-gray-800">Apa keunggulan KBS dalam pengembangan infrastruktur?</h3>
                  {activeSection === 'faq2' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq2' && (
                  <p className="mt-2 text-gray-600">
                    Keunggulan KBS meliputi pengalaman lebih dari 18 tahun dalam proyek infrastruktur di seluruh Indonesia, tim berpengalaman dengan keahlian teknis tinggi, penggunaan teknologi modern dan inovatif, komitmen terhadap keberlanjutan, pendekatan terintegrasi yang memadukan berbagai aspek infrastruktur, dan rekam jejak yang kuat dalam menyelesaikan proyek tepat waktu dengan kualitas terbaik.
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq3')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana KBS memastikan kualitas proyek infrastruktur?</h3>
                  {activeSection === 'faq3' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq3' && (
                  <p className="mt-2 text-gray-600">
                    KBS memiliki sistem manajemen mutu yang ketat dengan sertifikasi ISO 9001. Kami menerapkan kontrol kualitas di setiap tahap proyek, mulai dari perencanaan hingga penyelesaian. Tim quality assurance kami melakukan inspeksi dan pengujian rutin, menerapkan standar industri terbaru, menggunakan material berkualitas tinggi, dan memastikan kepatuhan terhadap semua peraturan dan spesifikasi teknis yang berlaku untuk menghasilkan infrastruktur yang andal dan tahan lama.
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq4')}>
                  <h3 className="text-xl font-bold text-gray-800">Apakah KBS menerapkan prinsip keberlanjutan dalam proyek infrastruktur?</h3>
                  {activeSection === 'faq4' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq4' && (
                  <p className="mt-2 text-gray-600">
                    Ya, KBS sangat berkomitmen pada prinsip keberlanjutan dalam setiap proyek infrastruktur. Kami mengintegrasikan praktik konstruksi ramah lingkungan, menggunakan material yang hemat energi dan sumber daya, menerapkan solusi untuk meminimalkan dampak lingkungan, dan mempertimbangkan aspek sosial dalam perencanaan proyek. Kami juga memiliki sertifikasi ISO 14001 untuk sistem manajemen lingkungan dan terus mencari inovasi untuk membuat infrastruktur yang lebih berkelanjutan.
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq5')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana proses kerja sama dengan KBS untuk proyek infrastruktur?</h3>
                  {activeSection === 'faq5' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq5' && (
                  <p className="mt-2 text-gray-600">
                    Kerja sama dengan KBS dimulai dengan konsultasi awal untuk memahami kebutuhan dan tujuan proyek. Kemudian, kami melakukan studi kelayakan dan menyusun proposal komprehensif yang mencakup desain, anggaran, dan jadwal. Setelah kesepakatan, kami membentuk tim proyek dan memulai tahap pelaksanaan. Selama proses konstruksi, kami memberikan laporan perkembangan rutin dan melibatkan klien dalam pengambilan keputusan penting. Proses berakhir dengan serah terima proyek dan layanan dukungan pasca-konstruksi.
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-[#153969] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Siap Memulai Proyek Infrastruktur Anda?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              Jadikan KBS sebagai mitra pembangunan infrastruktur tepercaya yang akan membantu mewujudkan visi Anda menjadi kenyataan.
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
                Konsultasi Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Pelajari Layanan Lainnya
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}