'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle, ArrowRight, Clock, Shield, Award, Users, ChevronDown, BarChart3, Briefcase } from 'lucide-react';
import CountUp from 'react-countup';

export default function ProjectManagement() {
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
            src="/images/bangunan/manajemen.jpg" 
            alt="Manajemen Proyek"
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
                Manajemen Proyek
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                Solusi manajemen proyek terpadu untuk memastikan keberhasilan proyek dari awal hingga akhir.
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
                    Konsultasi Sekarang
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
              Kepemimpinan Proyek yang Efektif
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
              KBS menawarkan layanan manajemen proyek komprehensif yang memastikan setiap tahap proyek berjalan lancar dan efisien. Dengan pendekatan terstruktur dan strategis, kami membantu klien mewujudkan visi mereka tepat waktu dan sesuai anggaran.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Tim manajer proyek berpengalaman kami menggabungkan keahlian teknis dengan keterampilan manajemen untuk mengkoordinasikan semua aspek proyek, dari perencanaan awal hingga penyelesaian akhir, menyediakan kepemimpinan yang kuat dan komunikasi yang efektif sepanjang proses.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Project Management Process */}
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
              Proses Manajemen Proyek
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-24 h-2 bg-[#153969] mx-auto mb-6 rounded-full"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Metodologi teruji kami untuk mengelola proyek secara efektif dari awal hingga akhir
            </motion.p>
          </motion.div>
          
          <div className="relative">
            {/* Vertical line with animation */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#153969]/20">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 right-0 bg-[#153969] h-full origin-top"
              ></motion.div>
            </div>
            
            <div className="space-y-12">
              {/* Step 1 */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex flex-col items-center md:items-end md:w-1/2 md:pr-12 text-center md:text-right">
                    <div className="bg-[#153969]/10 rounded-full p-3 md:hidden mb-4">
                      <span className="flex items-center justify-center w-8 h-8 bg-[#153969] text-white rounded-full font-bold">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#153969]">Inisiasi Proyek</h3>
                    <p className="text-gray-700 mt-2">
                      Mendefinisikan ruang lingkup, tujuan, dan ekspektasi proyek. Mengidentifikasi pemangku kepentingan, menilai kelayakan, dan mengembangkan rencana awal.
                    </p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#153969] z-10 items-center justify-center">
                    <motion.span 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      className="text-white font-bold"
                    >
                      1
                    </motion.span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0"></div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="hidden md:block md:w-1/2 md:pr-12"></div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#153969] z-10 items-center justify-center">
                    <motion.span 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      className="text-white font-bold"
                    >
                      2
                    </motion.span>
                  </div>
                  <div className="flex flex-col items-center md:items-start md:w-1/2 md:pl-12 text-center md:text-left">
                    <div className="bg-[#153969]/10 rounded-full p-3 md:hidden mb-4">
                      <span className="flex items-center justify-center w-8 h-8 bg-[#153969] text-white rounded-full font-bold">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#153969]">Perencanaan</h3>
                    <p className="text-gray-700 mt-2">
                      Mengembangkan rencana proyek terperinci, termasuk jadwal, anggaran, alokasi sumber daya, rencana komunikasi, dan strategi manajemen risiko.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex flex-col items-center md:items-end md:w-1/2 md:pr-12 text-center md:text-right">
                    <div className="bg-[#153969]/10 rounded-full p-3 md:hidden mb-4">
                      <span className="flex items-center justify-center w-8 h-8 bg-[#153969] text-white rounded-full font-bold">3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#153969]">Eksekusi</h3>
                    <p className="text-gray-700 mt-2">
                      Menerapkan rencana proyek, mengkoordinasikan tim dan sumber daya, melaksanakan kegiatan proyek, dan memantau kemajuan secara berkelanjutan.
                    </p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#153969] z-10 items-center justify-center">
                    <motion.span 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      className="text-white font-bold"
                    >
                      3
                    </motion.span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0"></div>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="hidden md:block md:w-1/2 md:pr-12"></div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#153969] z-10 items-center justify-center">
                    <motion.span 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      className="text-white font-bold"
                    >
                      4
                    </motion.span>
                  </div>
                  <div className="flex flex-col items-center md:items-start md:w-1/2 md:pl-12 text-center md:text-left">
                    <div className="bg-[#153969]/10 rounded-full p-3 md:hidden mb-4">
                      <span className="flex items-center justify-center w-8 h-8 bg-[#153969] text-white rounded-full font-bold">4</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#153969]">Monitoring & Kontrol</h3>
                    <p className="text-gray-700 mt-2">
                      Melacak kinerja proyek, membandingkan dengan rencana, mengelola perubahan, dan mengambil tindakan korektif jika diperlukan.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Step 5 */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex flex-col items-center md:items-end md:w-1/2 md:pr-12 text-center md:text-right">
                    <div className="bg-[#153969]/10 rounded-full p-3 md:hidden mb-4">
                      <span className="flex items-center justify-center w-8 h-8 bg-[#153969] text-white rounded-full font-bold">5</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#153969]">Penyelesaian</h3>
                    <p className="text-gray-700 mt-2">
                      Menyelesaikan semua aktivitas proyek, mendokumentasikan pembelajaran, serah terima hasil proyek, dan memformalkan penyelesaian proyek.
                    </p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#153969] z-10 items-center justify-center">
                    <motion.span 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      className="text-white font-bold"
                    >
                      5
                    </motion.span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 md:py-24">
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
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
            >
              Layanan Manajemen Proyek Kami
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-6"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Solusi manajemen proyek komprehensif untuk setiap tahap proyek
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <ClipboardList className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pengelolaan Proyek Konstruksi</h3>
              <p className="text-gray-600 mb-4">
                Manajemen proyek konstruksi dari perencanaan hingga penyelesaian, termasuk koordinasi subkontraktor, pengawasan kualitas, dan kepatuhan terhadap standar keselamatan.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Perencanaan dan koordinasi proyek</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Manajemen kontrak dan subkontraktor</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pemantauan kepatuhan dan keselamatan</span>
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
                  <BarChart3 className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Manajemen Anggaran & Jadwal</h3>
              <p className="text-gray-600 mb-4">
                Optimalisasi anggaran dan jadwal proyek untuk memastikan penyelesaian tepat waktu dalam batasan biaya yang ditetapkan, serta pengelolaan perubahan ruang lingkup.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pengendalian biaya dan estimasi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Perencanaan dan pemantauan jadwal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Manajemen perubahan ruang lingkup</span>
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
                  <Briefcase className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Konsultasi Manajemen Proyek</h3>
              <p className="text-gray-600 mb-4">
                Layanan konsultasi untuk membantu organisasi meningkatkan praktik manajemen proyek, mengembangkan metodologi, dan melatih tim proyek.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pengembangan metodologi proyek</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pelatihan tim manajemen proyek</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pengkajian dan perbaikan proses</span>
                </li>
              </ul>
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
                  src="/images/bangunan/manajemen2.jpg"
                  alt="Tim Manajemen Proyek KBS"
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
                    <CountUp end={15} suffix="+" duration={2} />
                  </motion.p>
                  <p className="text-sm uppercase tracking-wider">Proyek Berhasil</p>
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
                Mengapa Memilih Layanan Manajemen Proyek Kami
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-16 h-1 bg-[#153969] mb-6"
              />
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-700 mb-6"
              >
                Kami membawa keahlian dan pengalaman untuk memastikan keberhasilan proyek Anda dalam setiap aspek.
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
                      <Users className="h-6 w-6 text-[#153969] relative z-10" />
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
                    <h3 className="text-lg font-bold text-gray-800">Tim Berpengalaman</h3>
                    <p className="text-gray-600">Manajer proyek bersertifikasi dengan pengalaman lintas industri yang ekstensif</p>
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
                      <Award className="h-6 w-6 text-[#153969] relative z-10" />
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
                    <h3 className="text-lg font-bold text-gray-800">Metodologi Teruji</h3>
                    <p className="text-gray-600">Pendekatan manajemen proyek terstruktur yang telah terbukti efektif</p>
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
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Pengerjaan Tepat Waktu</h3>
                    <p className="text-gray-600">Rekam jejak yang terbukti dalam menyelesaikan proyek sesuai jadwal</p>
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
                    <h3 className="text-lg font-bold text-gray-800">Mitigasi Risiko</h3>
                    <p className="text-gray-600">Identifikasi proaktif dan pengelolaan risiko untuk mencegah masalah</p>
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
              Jawaban untuk pertanyaan umum tentang layanan manajemen proyek kami
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
                  <h3 className="text-xl font-bold text-gray-800">Apa peran manajer proyek KBS dalam proyek konstruksi?</h3>
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
                        Manajer proyek KBS bertindak sebagai penghubung utama antara klien, arsitek, insinyur, kontraktor, dan pemangku kepentingan lainnya. Mereka bertanggung jawab untuk mengembangkan rencana proyek, mengoordinasikan sumber daya, memantau kemajuan, mengelola anggaran, memastikan kepatuhan terhadap standar kualitas dan keselamatan, serta menyelesaikan masalah yang muncul. Tujuan utama mereka adalah memastikan proyek selesai tepat waktu, sesuai anggaran, dan memenuhi semua persyaratan yang ditetapkan.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq2')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana KBS mengelola perubahan ruang lingkup selama proyek?</h3>
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
                        KBS mengimplementasikan proses manajemen perubahan yang ketat untuk menangani perubahan ruang lingkup. Setiap permintaan perubahan didokumentasikan secara formal, dievaluasi dampaknya terhadap jadwal, biaya, dan kualitas, kemudian dikomunikasikan kepada semua pemangku kepentingan. Kami menggunakan sistem pelacakan perubahan untuk memastikan transparansi dan memfasilitasi pengambilan keputusan berbasis informasi. Pendekatan ini membantu meminimalkan perubahan yang tidak direncanakan dan memastikan dampak perubahan yang diperlukan dikelola secara efektif.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Lanjutkan untuk FAQ lainnya dengan gaya yang sama */}
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
              Siap Untuk Meningkatkan Keberhasilan Proyek Anda?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              Jadikan KBS sebagai mitra manajemen proyek Anda dan nikmati proyek yang dijalankan dengan lancar dan efisien, selesai tepat waktu dan sesuai anggaran.
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
                  Diskusikan Proyek Anda
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
                <span className="relative z-10">Pelajari Layanan Lainnya</span>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 z-0"></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}