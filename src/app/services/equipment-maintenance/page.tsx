'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { WrenchIcon, CheckCircle, ArrowRight, ClipboardList, Shield, Clock, Zap, ChevronDown, ChevronUp, Wrench, CalendarClock } from 'lucide-react';
import CountUp from 'react-countup';

export default function MaintenanceServices() {
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
            src="/images/bangunan/maintenence2.jpg" 
            alt="Layanan Pemeliharaan"
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
                Layanan Pemeliharaan
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                Solusi pemeliharaan komprehensif untuk menjaga bangunan dan infrastruktur Anda dalam kondisi optimal.
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
                    Jadwalkan Pemeliharaan
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
              Pemeliharaan Profesional & Preventif
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
              KBS menyediakan layanan pemeliharaan komprehensif yang dirancang untuk memperpanjang masa pakai dan meningkatkan kinerja aset bangunan serta infrastruktur Anda. Tim teknisi kami yang berpengalaman menggunakan pendekatan proaktif untuk mengidentifikasi dan mengatasi masalah potensial sebelum berkembang menjadi perbaikan besar yang mahal.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Kami menawarkan berbagai paket pemeliharaan yang dapat disesuaikan dengan kebutuhan spesifik proyek dan anggaran Anda, mulai dari pemeliharaan rutin hingga program pemeliharaan preventif komprehensif dengan pemantauan dan pemeriksaan berkala.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services */}
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
              Layanan Pemeliharaan Kami
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-24 h-2 bg-[#153969] mx-auto mb-6 rounded-full"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Solusi pemeliharaan menyeluruh untuk menjaga aset properti Anda
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
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
                  <WrenchIcon className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pemeliharaan Korektif</h3>
              <p className="text-gray-600 mb-4">
                Perbaikan cepat dan efisien untuk masalah yang diidentifikasi, meminimalkan gangguan pada operasi harian Anda.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Perbaikan darurat</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Penggantian komponen</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Perbaikan struktural</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 2 */}
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
                  <ClipboardList className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pemeliharaan Preventif</h3>
              <p className="text-gray-600 mb-4">
                Program pemeliharaan terjadwal untuk mencegah kerusakan dan memperpanjang masa pakai aset bangunan Anda.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Inspeksi rutin</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Perawatan terjadwal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Penggantian komponen sesuai jadwal</span>
                </li>
              </ul>
            </motion.div>

            {/* Service 3 */}
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
                  <Zap className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pemeliharaan Prediktif</h3>
              <p className="text-gray-600 mb-4">
                Penggunaan teknologi modern untuk memprediksi dan mencegah masalah potensial sebelum terjadi.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Analisis kondisi peralatan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pemantauan teknologi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Perencanaan pemeliharaan lanjutan</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Maintenance Areas */}
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
              Area Pemeliharaan Kami
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-6"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Layanan pemeliharaan komprehensif untuk berbagai aspek bangunan dan infrastruktur
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Area 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-[#153969]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-[#153969]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sistem Mekanikal</h3>
              <p className="text-gray-600">
                Pemeliharaan HVAC, elevator, eskalator, sistem pemipaan, dan peralatan mekanis lainnya.
              </p>
            </motion.div>

            {/* Area 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-[#153969]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-[#153969]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sistem Elektrikal</h3>
              <p className="text-gray-600">
                Pemeliharaan sistem distribusi listrik, pencahayaan, genset, dan sistem keamanan elektronik.
              </p>
            </motion.div>

            {/* Area 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-[#153969]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <WrenchIcon className="h-8 w-8 text-[#153969]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Struktural & Arsitektural</h3>
              <p className="text-gray-600">
                Pemeliharaan komponen struktural, eksterior bangunan, atap, dan elemen arsitektural.
              </p>
            </motion.div>

            {/* Area 4 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow text-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-[#153969]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#153969]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Keselamatan & Keamanan</h3>
              <p className="text-gray-600">
                Pemeliharaan sistem pemadam kebakaran, sprinkler, alarm, dan sistem keamanan terpadu.
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
              className="relative order-2 lg:order-1"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/bangunan/maintenence.jpg"
                  alt="Tim Pemeliharaan KBS"
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
                    <CountUp end={98} suffix="%" duration={2} />
                  </motion.p>
                  <p className="text-sm uppercase tracking-wider">Tingkat Respons</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="order-1 lg:order-2"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
              >
                Mengapa Memilih Layanan Pemeliharaan Kami
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-16 h-1 bg-[#153969] mb-6"
              />
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-700 mb-6"
              >
                Kami menyediakan solusi pemeliharaan handal yang menjaga investasi properti Anda dan meningkatkan nilai aset jangka panjang.
              </motion.p>

              <div className="space-y-6">
                <motion.div 
                  variants={fadeInUp}
                  className="flex"
                >
                  <div className="mr-4">
                    <div className="bg-[#153969]/10 p-3 rounded-full relative overflow-hidden">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <CalendarClock className="h-6 w-6 text-[#153969] relative z-10" />
                      </motion.div>
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 2 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="absolute inset-0 bg-[#153969]/5 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Respons Cepat 24/7</h3>
                    <p className="text-gray-600">Tim pemeliharaan kami siap merespons keadaan darurat 24 jam sehari, 7 hari seminggu, dengan waktu respons rata-rata 30 menit untuk permintaan darurat.</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex"
                >
                  <div className="mr-4">
                    <div className="bg-[#153969]/10 p-3 rounded-full relative overflow-hidden">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Wrench className="h-6 w-6 text-[#153969] relative z-10" />
                      </motion.div>
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 2 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="absolute inset-0 bg-[#153969]/5 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Teknisi Berpengalaman</h3>
                    <p className="text-gray-600">Tim teknisi kami memiliki pengalaman rata-rata lebih dari 10 tahun di berbagai bidang pemeliharaan, memastikan setiap masalah ditangani oleh ahlinya.</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex"
                >
                  <div className="mr-4">
                    <div className="bg-[#153969]/10 p-3 rounded-full relative overflow-hidden">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ClipboardList className="h-6 w-6 text-[#153969] relative z-10" />
                      </motion.div>
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 2 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="absolute inset-0 bg-[#153969]/5 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Sistem Manajemen Terintegrasi</h3>
                    <p className="text-gray-600">Kami menggunakan sistem manajemen pemeliharaan terkomputerisasi untuk melacak, mengelola, dan mendokumentasikan semua aktivitas pemeliharaan, memastikan transparansi dan akuntabilitas.</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex"
                >
                  <div className="mr-4">
                    <div className="bg-[#153969]/10 p-3 rounded-full relative overflow-hidden">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Clock className="h-6 w-6 text-[#153969] relative z-10" />
                      </motion.div>
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 2 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="absolute inset-0 bg-[#153969]/5 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Pendekatan Proaktif</h3>
                    <p className="text-gray-600">Kami mengidentifikasi dan mengatasi masalah potensial sebelum menjadi perbaikan mahal, menghemat waktu dan biaya jangka panjang sambil meminimalkan gangguan operasional.</p>
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
              Jawaban atas pertanyaan umum tentang layanan pemeliharaan kami
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
                  <h3 className="text-xl font-bold text-gray-800">Apa saja layanan pemeliharaan yang ditawarkan KBS?</h3>
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
                        KBS menawarkan berbagai layanan pemeliharaan komprehensif, termasuk pemeliharaan korektif untuk perbaikan masalah yang ada, pemeliharaan preventif dengan jadwal perawatan rutin untuk mencegah kerusakan, dan pemeliharaan prediktif menggunakan teknologi modern untuk memprediksi masalah potensial. Kami melayani sistem mekanikal, elektrikal, struktural, arsitektural, serta sistem keselamatan dan keamanan bangunan. Semua layanan kami dapat disesuaikan dengan kebutuhan spesifik proyek dan anggaran Anda.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq2')}>
                  <h3 className="text-xl font-bold text-gray-800">Seberapa cepat tim pemeliharaan Anda merespons permintaan darurat?</h3>
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
                        Tim pemeliharaan KBS tersedia 24/7 untuk keadaan darurat dengan waktu respons rata-rata 30 menit. Untuk permintaan non-darurat, kami biasanya merespons dalam waktu 4 jam kerja. Kami memiliki sistem klasifikasi prioritas yang jelas untuk memastikan masalah paling kritis ditangani terlebih dahulu, dengan tingkat respons 98% untuk permintaan darurat sesuai SLA yang disepakati.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq3')}>
                  <h3 className="text-xl font-bold text-gray-800">Apa perbedaan antara pemeliharaan preventif dan prediktif?</h3>
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
                        Pemeliharaan preventif mengikuti jadwal perawatan yang telah ditentukan berdasarkan waktu atau penggunaan, seperti pemeriksaan bulanan atau penggantian filter setiap tiga bulan. Sebaliknya, pemeliharaan prediktif menggunakan teknologi pemantauan dan analisis data untuk memperkirakan kapan peralatan kemungkinan akan gagal atau membutuhkan perhatian. Ini memungkinkan intervensi yang lebih tepat waktu dan efisien, menghindari penggantian komponen yang belum perlu diganti sekaligus mencegah kegagalan yang tidak terduga.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq4')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana cara memesan layanan pemeliharaan dari KBS?</h3>
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
                        Untuk memesan layanan pemeliharaan dari KBS, Anda dapat menghubungi tim layanan pelanggan kami melalui telepon, email, atau formulir di situs web kami. Tim konsultan kami akan melakukan penilaian awal kebutuhan Anda, mengunjungi lokasi jika diperlukan, dan mengembangkan proposal pemeliharaan yang disesuaikan. Setelah kontrak disepakati, kami akan menyusun jadwal pemeliharaan, melakukan pemeriksaan awal, dan mulai memberikan layanan sesuai dengan paket yang Anda pilih.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq5')}>
                  <h3 className="text-xl font-bold text-gray-800">Apa manfaat investasi dalam program pemeliharaan preventif?</h3>
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
                        Investasi dalam program pemeliharaan preventif memberikan berbagai manfaat jangka panjang. Ini memperpanjang masa pakai aset dan peralatan bangunan, mengurangi frekuensi perbaikan darurat yang mahal, menurunkan biaya operasional, meningkatkan keandalan sistem, memaksimalkan efisiensi energi, meningkatkan keamanan dan keselamatan penghuni bangunan, serta mempertahankan nilai properti. Klien kami rata-rata melihat penghematan 15-30% pada biaya pemeliharaan total dalam jangka panjang, dengan pengurangan 40-60% pada pemadaman sistem yang tidak direncanakan.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Maintenance Packages */}
      <section className="py-16 bg-gray-50">
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
              Paket Pemeliharaan
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-6"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Solusi pemeliharaan yang fleksibel untuk memenuhi kebutuhan spesifik Anda
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
            >
              <div className="bg-[#153969] p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-1">Paket Dasar</h3>
                <p className="opacity-90">Pemeliharaan Essensial</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Pemeliharaan korektif saat dibutuhkan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Inspeksi kuartalan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Pemeliharaan preventif dasar</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Laporan kondisi tahunan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Respons 24 jam untuk darurat</span>
                  </li>
                </ul>
                <div className="text-center">
                  <Link 
                    href="/contact"
                    className="inline-block bg-[#153969] hover:bg-[#0f2a4d] text-white font-medium px-6 py-3 rounded-lg transition-colors w-full"
                  >
                    Dapatkan Penawaran
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Package 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 relative"
            >
              <div className="absolute top-6 right-6">
                <span className="bg-[#ff6b6b] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Paling Populer
                </span>
              </div>
              <div className="bg-[#153969] p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-1">Paket Standar</h3>
                <p className="opacity-90">Pemeliharaan Komprehensif</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Semua layanan Paket Dasar</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Inspeksi bulanan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Program pemeliharaan preventif penuh</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Pemantauan sistem dasar</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Respons 4 jam untuk darurat</span>
                  </li>
                </ul>
                <div className="text-center">
                  <Link 
                    href="/contact"
                    className="inline-block bg-[#153969] hover:bg-[#0f2a4d] text-white font-medium px-6 py-3 rounded-lg transition-colors w-full"
                  >
                    Dapatkan Penawaran
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Package 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
            >
              <div className="bg-[#153969] p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-1">Paket Premium</h3>
                <p className="opacity-90">Pemeliharaan Total</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Semua layanan Paket Standar</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Inspeksi mingguan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Pemeliharaan prediktif dengan IoT</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Pemantauan sistem real-time</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Respons 1 jam untuk darurat</span>
                  </li>
                </ul>
                <div className="text-center">
                  <Link 
                    href="/contact"
                    className="inline-block bg-[#153969] hover:bg-[#0f2a4d] text-white font-medium px-6 py-3 rounded-lg transition-colors w-full"
                  >
                    Dapatkan Penawaran
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
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
              Lindungi Investasi Anda dengan Pemeliharaan Profesional
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              Tingkatkan kinerja dan umur pakai aset bangunan Anda dengan program pemeliharaan komprehensif dari KBS.
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
                  Jadwalkan Konsultasi Gratis
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
                href="/services" 
                className="relative inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Jelajahi Layanan Lainnya</span>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 z-0"></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}