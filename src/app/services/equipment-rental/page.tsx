'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, CheckCircle, ArrowRight, Settings, Shield, Calendar, Wrench, ChevronDown, PanelTop, Forklift } from 'lucide-react';
import CountUp from 'react-countup';

export default function EquipmentRental() {
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
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3 }}
          className="absolute inset-0"
        >
          <Image
            src="/images/bangunan/alat2.jpg" 
            alt="Penyewaan Peralatan Konstruksi"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4"
              >
                Penyewaan Peralatan
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                Solusi lengkap penyewaan peralatan konstruksi berkualitas tinggi untuk berbagai jenis proyek.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link 
                  href="/contact"
                  className="relative inline-flex items-center bg-[#153969] hover:bg-[#0f2a4d] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Cek Ketersediaan
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-0 bg-[#0a1c38] transition-all duration-300 group-hover:h-full z-0"></span>
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
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Solusi Peralatan yang Handal
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { width: 0 },
                visible: { width: "6rem", transition: { duration: 1, delay: 0.3 } }
              }}
              className="h-1 bg-[#153969] mx-auto mb-8"
              style={{ width: "6rem" }}
            />
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-6"
            >
              KBS menyediakan layanan penyewaan peralatan konstruksi berkualitas tinggi untuk memenuhi kebutuhan proyek Anda. Dengan armada peralatan yang terawat dengan baik dan diperbarui secara berkala, kami memastikan efisiensi dan keamanan di lokasi proyek Anda.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Kami menawarkan berbagai jenis peralatan konstruksi, dari alat berat hingga peralatan khusus, dengan opsi sewa harian, mingguan, atau bulanan yang fleksibel. Tim teknisi berpengalaman kami siap memberikan dukungan teknis sepanjang masa sewa.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Equipment */}
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
              Peralatan yang Kami Sediakan
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-24 h-2 bg-[#153969] mx-auto mb-6 rounded-full"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Berbagai jenis peralatan berkualitas untuk mendukung keberhasilan proyek Anda
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Equipment Category 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="bg-white rounded-lg shadow-md p-6 transition-all border-t-4 border-[#153969]"
            >
              <div className="bg-[#153969]/10 p-4 inline-flex rounded-full mb-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Forklift className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Alat Berat</h3>
              <p className="text-gray-600 mb-4">
                Berbagai jenis alat berat untuk penggalian, pengangkatan, dan pemindahan material dalam proyek konstruksi Anda.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Excavator berbagai ukuran</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Bulldozer dan wheel loader</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Crane dan forklift</span>
                </li>
              </ul>
            </motion.div>

            {/* Equipment Category 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="bg-white rounded-lg shadow-md p-6 transition-all border-t-4 border-[#153969]"
            >
              <div className="bg-[#153969]/10 p-4 inline-flex rounded-full mb-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Wrench className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Peralatan Konstruksi</h3>
              <p className="text-gray-600 mb-4">
                Peralatan konstruksi modern untuk meningkatkan produktivitas dan efisiensi di lokasi proyek Anda.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Concrete mixer dan pompa</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Generator dan kompresor</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Scaffolding dan formwork</span>
                </li>
              </ul>
            </motion.div>

            {/* Equipment Category 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="bg-white rounded-lg shadow-md p-6 transition-all border-t-4 border-[#153969]"
            >
              <div className="bg-[#153969]/10 p-4 inline-flex rounded-full mb-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <PanelTop className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Peralatan Khusus</h3>
              <p className="text-gray-600 mb-4">
                Peralatan khusus untuk kebutuhan spesifik proyek, termasuk survei, pengujian, dan pengukuran.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Alat survei dan pengukuran</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Peralatan pengujian material</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Instrumen keselamatan dan monitoring</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rental Process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
            >
              Proses Penyewaan yang Mudah
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-6"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Langkah-langkah sederhana untuk menyewa peralatan dari KBS
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-center"
            >
              <div className="relative mx-auto w-16 h-16 bg-[#153969]/10 rounded-full flex items-center justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-12 h-12 bg-[#153969] rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xl">1</span>
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Konsultasi & Pemilihan</h3>
              <p className="text-gray-600">
                Konsultasikan kebutuhan proyek Anda dengan tim kami dan pilih peralatan yang paling sesuai untuk pekerjaan Anda.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-center"
            >
              <div className="relative mx-auto w-16 h-16 bg-[#153969]/10 rounded-full flex items-center justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                  className="w-12 h-12 bg-[#153969] rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xl">2</span>
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Konfirmasi & Pembayaran</h3>
              <p className="text-gray-600">
                Setelah konfirmasi ketersediaan, kami akan memproses kontrak penyewaan dan metode pembayaran yang fleksibel.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-center"
            >
              <div className="relative mx-auto w-16 h-16 bg-[#153969]/10 rounded-full flex items-center justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 2 }}
                  className="w-12 h-12 bg-[#153969] rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xl">3</span>
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pengiriman & Dukungan</h3>
              <p className="text-gray-600">
                Kami akan mengirimkan peralatan ke lokasi proyek Anda dan menyediakan dukungan teknis selama masa penyewaan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
                  src="/images/bangunan/alat1.jpg"
                  alt="Peralatan Konstruksi KBS"
                  width={600}
                  height={700}
                  className="w-full object-cover h-[500px]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#153969] p-6 rounded-lg shadow-lg">
                <div className="text-white">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold mb-2"
                  >
                    <CountUp end={100} suffix="+" duration={2} />
                  </motion.p>
                  <p className="text-sm uppercase tracking-wider">Unit Peralatan</p>
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
                Mengapa Memilih Layanan Penyewaan Kami
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-16 h-1 bg-[#153969] mb-6"
              />
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-700 mb-6"
              >
                Keunggulan layanan penyewaan peralatan KBS yang membedakan kami dari yang lain.
              </motion.p>

              <div className="space-y-4 mt-8">
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-start bg-white p-4 rounded-lg shadow-md"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="bg-[#153969]/10 p-3 rounded-full mr-4 mt-1 relative overflow-hidden">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Settings className="h-6 w-6 text-[#153969] relative z-10" />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 2 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                      className="absolute inset-0 bg-[#153969]/5 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Peralatan Berkualitas Tinggi</h3>
                    <p className="text-gray-600">Semua peralatan kami dirawat dengan baik dan diinspeksi secara rutin</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-start bg-white p-4 rounded-lg shadow-md"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="bg-[#153969]/10 p-3 rounded-full mr-4 mt-1 relative overflow-hidden">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Truck className="h-6 w-6 text-[#153969] relative z-10" />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 2 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                      className="absolute inset-0 bg-[#153969]/5 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Pengiriman Tepat Waktu</h3>
                    <p className="text-gray-600">Pengiriman dan pengambilan peralatan sesuai jadwal yang disepakati</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-start bg-white p-4 rounded-lg shadow-md"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="bg-[#153969]/10 p-3 rounded-full mr-4 mt-1 relative overflow-hidden">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Calendar className="h-6 w-6 text-[#153969] relative z-10" />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 2 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                      className="absolute inset-0 bg-[#153969]/5 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Periode Sewa Fleksibel</h3>
                    <p className="text-gray-600">Opsi sewa jangka pendek dan jangka panjang yang dapat disesuaikan</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-start bg-white p-4 rounded-lg shadow-md"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="bg-[#153969]/10 p-3 rounded-full mr-4 mt-1 relative overflow-hidden">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Shield className="h-6 w-6 text-[#153969] relative z-10" />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 2 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                      className="absolute inset-0 bg-[#153969]/5 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Dukungan Teknis 24/7</h3>
                    <p className="text-gray-600">Tim dukungan teknis siap membantu kapanpun Anda membutuhkan</p>
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
              Jawaban atas pertanyaan umum tentang layanan penyewaan peralatan kami
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
                  <h3 className="text-xl font-bold text-gray-800">Apa saja jenis peralatan yang tersedia untuk disewa?</h3>
                  <motion.div
                    animate={{ rotate: activeSection === 'faq1' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeSection === 'faq1' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-gray-600">
                        KBS menyediakan berbagai jenis peralatan untuk disewa, termasuk alat berat (excavator, bulldozer, wheel loader, crane, forklift), peralatan konstruksi (concrete mixer, generator, kompresor, scaffolding), dan peralatan khusus (alat survei, pengujian material, dan peralatan keselamatan). Kami terus memperbarui dan memperluas inventaris kami untuk memenuhi kebutuhan proyek konstruksi modern. Silakan hubungi tim kami untuk informasi lengkap tentang ketersediaan peralatan terbaru.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq2')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana proses penyewaan peralatan?</h3>
                  <motion.div
                    animate={{ rotate: activeSection === 'faq2' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeSection === 'faq2' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-gray-600">
                        Proses penyewaan kami sangat sederhana. Pertama, konsultasikan kebutuhan proyek Anda dengan tim kami untuk menentukan peralatan yang tepat. Setelah konfirmasi ketersediaan, kami akan memproses kontrak penyewaan dan metode pembayaran. Kemudian, kami mengirimkan peralatan ke lokasi proyek Anda pada waktu yang disepakati, memberikan instruksi penggunaan jika diperlukan, dan menyediakan dukungan teknis selama masa penyewaan. Setelah selesai, kami akan mengambil peralatan dari lokasi Anda.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq3')}>
                  <h3 className="text-xl font-bold text-gray-800">Apa saja periode penyewaan yang tersedia?</h3>
                  <motion.div
                    animate={{ rotate: activeSection === 'faq3' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeSection === 'faq3' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-gray-600">
                        KBS menawarkan periode penyewaan yang fleksibel untuk memenuhi kebutuhan proyek Anda. Kami menyediakan opsi sewa harian, mingguan, bulanan, dan jangka panjang. Tarif penyewaan kami bersifat progresif, artinya semakin lama Anda menyewa, semakin rendah tarif hariannya. Kami juga dapat menyesuaikan periode penyewaan sesuai dengan jadwal proyek Anda. Untuk proyek yang memerlukan penyesuaian khusus, tim kami siap mendiskusikan solusi yang paling cocok untuk Anda.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq4')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana jika peralatan mengalami kerusakan selama masa sewa?</h3>
                  <motion.div
                    animate={{ rotate: activeSection === 'faq4' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeSection === 'faq4' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-gray-600">
                        Dalam hal peralatan mengalami kerusakan selama masa sewa, KBS menyediakan dukungan teknis 24/7. Segera hubungi hotline dukungan kami, dan tim teknisi kami akan menangani masalah tersebut. Jika masalah tidak dapat diselesaikan di tempat, kami akan mengganti peralatan dengan unit yang setara secepat mungkin untuk meminimalkan gangguan pada proyek Anda. Kerusakan akibat penggunaan normal ditanggung oleh kami, sementara kerusakan akibat kesalahan penggunaan atau kelalaian akan menjadi tanggung jawab penyewa sesuai dengan ketentuan dalam kontrak sewa.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq5')}>
                  <h3 className="text-xl font-bold text-gray-800">Apakah tersedia layanan operator untuk peralatan?</h3>
                  <motion.div
                    animate={{ rotate: activeSection === 'faq5' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {activeSection === 'faq5' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-gray-600">
                        Ya, KBS menyediakan layanan operator terlatih dan bersertifikat untuk berbagai jenis peralatan, terutama untuk alat berat dan peralatan khusus yang memerlukan keahlian khusus. Operator kami sangat berpengalaman dan terbiasa dengan standar keselamatan dan praktik terbaik di industri konstruksi. Layanan operator dapat ditambahkan ke kontrak penyewaan Anda dengan biaya tambahan. Hal ini sangat direkomendasikan untuk peralatan kompleks guna memastikan produktivitas maksimal dan mengurangi risiko kecelakaan atau kerusakan.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              Siap Menyewa Peralatan untuk Proyek Anda?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              Hubungi kami sekarang untuk mendapatkan penawaran khusus dan cek ketersediaan peralatan untuk proyek konstruksi Anda.
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
                className="relative inline-flex items-center bg-white text-[#153969] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors shadow-lg overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Hubungi Kami Sekarang
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-0 bg-gray-200 transition-all duration-300 group-hover:h-full z-0"></span>
              </Link>
              <Link 
                href="/equipment-catalog" 
                className="relative inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Lihat Katalog Peralatan</span>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 z-0"></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}