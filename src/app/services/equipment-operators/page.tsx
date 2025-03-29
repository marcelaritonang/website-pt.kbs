'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CheckCircle, ArrowRight, Briefcase, Shield, HardHat, ChevronDown, ClipboardCheck, MessageCircle } from 'lucide-react';
import CountUp from 'react-countup';

export default function OperatorServices() {
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
            src="/images/bangunan/layanan1.jpg" 
            alt="Layanan Operator"
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
                Layanan Operator
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                Tim operator profesional untuk mengoperasikan peralatan konstruksi dengan aman dan efisien dengan dukungan chat 24/7.
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
                    Rekrut Operator
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
              Operator Terampil & Profesional
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
              KBS menyediakan layanan operator yang komprehensif dengan tim profesional berpengalaman yang terlatih untuk mengoperasikan berbagai jenis peralatan konstruksi. Operator kami memiliki keahlian teknis untuk menangani peralatan dengan aman dan efisien, dan tersedia melalui layanan chat 24/7 untuk dukungan teknis tanpa batas waktu.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Kami memahami bahwa operator yang terampil sangat penting untuk keberhasilan proyek konstruksi. Oleh karena itu, kami hanya merekrut dan melatih individu terbaik yang memiliki kombinasi pengalaman lapangan, pengetahuan teknis, dan komitmen terhadap keselamatan dan efisiensi.
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
              Layanan Operator Kami
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-24 h-2 bg-[#153969] mx-auto mb-6 rounded-full"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Beragam layanan operator untuk memenuhi kebutuhan proyek konstruksi Anda
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
                  <HardHat className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Operator Alat Berat</h3>
              <p className="text-gray-600 mb-4">
                Operator terlatih untuk mengoperasikan berbagai jenis alat berat seperti excavator, bulldozer, dan crane.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Dukungan teknis 24/7</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Kemampuan teknis yang unggul</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Paham prosedur keselamatan</span>
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
                  <ClipboardCheck className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Supervisi & Pengawasan</h3>
              <p className="text-gray-600 mb-4">
                Tim supervisor yang memastikan operasi peralatan berjalan lancar dan sesuai dengan standar keselamatan.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pengawasan operasional</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Manajemen risiko</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Inspeksi keselamatan rutin</span>
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
                  <MessageCircle className="h-8 w-8 text-[#153969]" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Dukungan Chat 24/7</h3>
              <p className="text-gray-600 mb-4">
                Layanan chat teknis tanpa batas waktu untuk konsultasi, bantuan, dan penyelesaian masalah langsung.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Bantuan teknis seketika</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Konsultasi pengoperasian</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Pemecahan masalah cepat</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Operators */}
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
              Keunggulan Operator Kami
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-6"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Apa yang membedakan tim operator KBS dari yang lain
            </motion.p>
          </motion.div>
          
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
                  src="/images/bangunan/layanan2.jpg"
                  alt="Tim Operator KBS"
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
                    <CountUp end={24} suffix="/7" duration={2} />
                  </motion.p>
                  <p className="text-sm uppercase tracking-wider">Dukungan Chat</p>
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
                        <MessageCircle className="h-6 w-6 text-[#153969] relative z-10" />
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
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Dukungan Chat 24/7</h3>
                    <p className="text-gray-600">Tim operator kami tersedia untuk chat konsultasi tanpa batasan waktu. Anda dapat mengajukan pertanyaan, meminta bantuan, atau mendapatkan dukungan teknis kapan saja melalui platform chat kami yang responsif.</p>
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
                        <Briefcase className="h-6 w-6 text-[#153969] relative z-10" />
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
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Pengalaman yang Luas</h3>
                    <p className="text-gray-600">Rata-rata operator kami memiliki pengalaman lebih dari 5 tahun dalam industri konstruksi dengan keahlian di berbagai jenis peralatan dan kondisi proyek, memastikan mereka dapat menangani situasi yang paling menantang sekalipun.</p>
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
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Fokus pada Keselamatan</h3>
                    <p className="text-gray-600">Keselamatan adalah prioritas utama bagi tim operator kami. Mereka dilatih secara menyeluruh dalam protokol keselamatan, pelaporan bahaya, dan teknik operasi yang aman untuk memastikan lingkungan kerja yang aman bagi semua orang di lokasi proyek.</p>
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
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Kerja Tim yang Efektif</h3>
                    <p className="text-gray-600">Operator kami terbiasa bekerja sebagai bagian dari tim yang lebih besar, berkoordinasi secara efektif dengan manajer proyek, pekerja lain, dan klien untuk memastikan operasi yang mulus dan efisien di lokasi konstruksi.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
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
              Jawaban atas pertanyaan umum tentang layanan operator kami
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
                  <h3 className="text-xl font-bold text-gray-800">Apa saja jenis operator yang tersedia di KBS?</h3>
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
                        KBS menyediakan berbagai jenis operator terlatih untuk berbagai peralatan konstruksi. Meskipun operator kami tidak memiliki sertifikasi formal, mereka memiliki pengalaman praktis yang luas dan dapat memberikan dukungan teknis melalui layanan chat 24/7. Operator kami tersedia untuk mengoperasikan alat berat, peralatan jalan, peralatan beton, dan peralatan khusus lainnya. Mereka juga dapat memberikan panduan dan solusi teknis melalui platform chat kami kapan saja Anda membutuhkannya.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq2')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana proses rekrutmen operator KBS?</h3>
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
                        Kami menerapkan proses rekrutmen yang berfokus pada pengalaman praktis dan keterampilan komunikasi. Kami memilih operator berdasarkan pengalaman kerja sebelumnya, tes kemampuan teknis praktis, dan kemampuan memberikan dukungan melalui chat. Meskipun kami tidak mengharuskan sertifikasi formal, kami memastikan semua operator kami memiliki pengetahuan yang kuat tentang peralatan yang mereka operasikan dan kemampuan untuk memberikan dukungan teknis yang efektif melalui platform chat kami 24/7.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq3')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana layanan chat 24/7 berfungsi?</h3>
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
                        Layanan chat 24/7 kami menyediakan akses langsung ke tim operator berpengalaman kapan saja Anda membutuhkannya. Setelah mendaftar untuk layanan ini, Anda akan mendapatkan akses ke platform chat kami yang dapat diakses melalui website atau aplikasi mobile. Anda dapat mengajukan pertanyaan teknis, meminta bantuan untuk pemecahan masalah, atau mendiskusikan pengoperasian peralatan konstruksi tanpa batasan waktu. Tim operator kami selalu siap merespons dengan cepat dan memberikan solusi praktis untuk berbagai masalah yang mungkin Anda hadapi di lokasi proyek.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq4')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana KBS memastikan keselamatan operator dan lokasi kerja?</h3>
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
                        Keselamatan adalah prioritas utama bagi KBS. Meskipun operator kami tidak memiliki sertifikasi formal, mereka dibekali dengan pengetahuan keselamatan yang komprehensif. Kami menerapkan sistem manajemen keselamatan yang mencakup penilaian risiko pra-penugasan, briefing keselamatan harian, inspeksi peralatan rutin, dan protokol pelaporan insiden. Melalui layanan chat 24/7, operator kami juga dapat memberikan panduan keselamatan real-time ketika terjadi situasi darurat atau kondisi berbahaya di lokasi proyek.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq5')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana cara memesan layanan operator dari KBS?</h3>
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
                        Untuk memesan layanan operator dari KBS, hubungi tim layanan pelanggan kami melalui telepon, email, atau formulir di situs web kami. Berikan detail tentang jenis peralatan yang perlu dioperasikan, lokasi proyek, durasi yang dibutuhkan, dan persyaratan khusus lainnya. Anda juga dapat memilih apakah Anda membutuhkan operator fisik di lokasi atau hanya layanan dukungan chat 24/7. Tim kami akan mengevaluasi kebutuhan Anda dan menyarankan solusi yang paling sesuai. Setelah persetujuan, Anda akan mendapatkan akses ke layanan chat kami dan/atau operator akan ditugaskan ke proyek Anda sesuai jadwal yang disepakati.
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
              Tingkatkan Efisiensi Proyek Anda dengan Dukungan Operator 24/7
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              Percayakan dukungan teknis proyek Anda kepada tim operator profesional KBS yang tersedia kapan saja melalui chat untuk hasil yang optimal.
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
                  Mulai Chat dengan Operator
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