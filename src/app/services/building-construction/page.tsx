'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building, CheckCircle, ArrowRight, Clock, Shield, Award, Users, ChevronDown, ChevronUp } from 'lucide-react';

export default function ConstructionBuilding() {
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
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/construction2.jpg" // Ganti dengan gambar hero Anda
          alt="Layanan Konstruksi Bangunan KBS"
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
                Konstruksi Bangunan
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                Layanan konstruksi profesional untuk proyek komersial, residensial, dan industri
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
                  Minta Penawaran
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Keunggulan Konstruksi
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-8"
            />
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-6"
            >
              KBS menyediakan layanan konstruksi berkualitas tinggi di seluruh Indonesia. Kami mengedepankan keahlian, ketepatan, dan keandalan dalam setiap proyek pembangunan yang kami tangani.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Solusi konstruksi komprehensif kami mencakup seluruh proses dari perencanaan awal dan desain hingga penyelesaian proyek. Kami bangga dengan kemampuan kami untuk memahami kebutuhan klien, mengelola sumber daya secara efisien, dan menjaga standar keahlian tertinggi selama proses konstruksi.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-12 bg-gray-50">
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
              Pendekatan Konstruksi Kami
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-6"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Kami menerapkan metodologi terbukti yang menjamin keberhasilan proyek di setiap tahap
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
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border-t-4 border-[#153969]"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#153969]/10 rounded-full p-3 mr-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#153969] text-white rounded-full font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Perencanaan & Desain</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Perencanaan menyeluruh dan desain inovatif yang sesuai dengan visi dan kebutuhan Anda, mempertimbangkan semua aspek proyek.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Studi kelayakan komprehensif</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Perencanaan arsitektur detail</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Strategi optimasi anggaran</span>
                </li>
              </ul>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border-t-4 border-[#153969]"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#153969]/10 rounded-full p-3 mr-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#153969] text-white rounded-full font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Pelaksanaan Konstruksi</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Implementasi proyek Anda secara efisien dan aman dengan kontrol kualitas ketat dan kepatuhan terhadap jadwal.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Manajemen tenaga kerja terampil</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Teknik konstruksi modern</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Protokol keselamatan ketat</span>
                </li>
              </ul>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border-t-4 border-[#153969]"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#153969]/10 rounded-full p-3 mr-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#153969] text-white rounded-full font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Serah Terima & Dukungan</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Proses serah terima yang lancar dan dukungan pasca-konstruksi komprehensif untuk memastikan kepuasan Anda.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Inspeksi kualitas menyeluruh</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Dokumentasi lengkap</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#153969] mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Opsi pemeliharaan berkelanjutan</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
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
                className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
              >
                Layanan Konstruksi Kami
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-16 h-1 bg-[#153969] mb-6"
              />
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-700 mb-8"
              >
                Kami menawarkan berbagai layanan konstruksi untuk memenuhi beragam kebutuhan klien di berbagai sektor, termasuk:
              </motion.p>

              <div className="space-y-4">
                <motion.div 
                  variants={fadeInUp}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-[#153969] mb-2">Bangunan Komersial</h3>
                  <p className="text-gray-700">
                    Kantor, ruang retail, hotel, dan pengembangan mixed-use yang dirancang untuk fungsi optimal dan daya tarik estetika.
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-[#153969] mb-2">Proyek Residensial</h3>
                  <p className="text-gray-700">
                    Apartemen berkualitas tinggi, kondominium, dan kompleks perumahan yang dibangun dengan perhatian terhadap kenyamanan dan kebutuhan komunitas.
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-[#153969] mb-2">Fasilitas Industri</h3>
                  <p className="text-gray-700">
                    Gudang, pabrik, dan bangunan industri khusus yang dirancang untuk efisiensi operasional dan keamanan.
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-[#153969] mb-2">Bangunan Institusional</h3>
                  <p className="text-gray-700">
                    Sekolah, fasilitas kesehatan, dan gedung pemerintahan yang melayani kebutuhan masyarakat dengan desain yang berorientasi pada tujuan.
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
                  src="/images/construction2.jpg" // Ganti dengan gambar layanan Anda
                  alt="Layanan Konstruksi KBS"
                  width={600}
                  height={800}
                  className="w-full object-cover h-[500px]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#153969] p-6 rounded-lg shadow-lg">
                <div className="text-white">
                  <p className="text-2xl font-bold mb-2">15+</p>
                  <p className="text-sm uppercase tracking-wider">Tahun Pengalaman</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Mengapa Memilih Konstruksi KBS
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-6"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Apa yang membedakan layanan konstruksi kami dari kompetitor
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
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Award className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Kualitas Terbaik</h3>
              <p className="text-gray-600">
                Keunggulan konstruksi yang diakui dengan berbagai penghargaan industri untuk proyek-proyek kami.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Clock className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pengerjaan Tepat Waktu</h3>
              <p className="text-gray-600">
                Rekam jejak yang konsisten dalam menyelesaikan proyek sesuai dengan jadwal yang disepakati tanpa mengorbankan kualitas.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Shield className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Keunggulan Keamanan</h3>
              <p className="text-gray-600">
                Protokol dan praktik keselamatan terdepan di industri dengan catatan keselamatan yang luar biasa.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Users className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tim Ahli</h3>
              <p className="text-gray-600">
                Profesional terampil dengan pengalaman luas dalam semua aspek konstruksi.
              </p>
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
              Pertanyaan umum tentang layanan konstruksi bangunan kami
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
                  <h3 className="text-xl font-bold text-gray-800">Apa saja jenis bangunan yang Anda konstruksi?</h3>
                  {activeSection === 'faq1' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq1' && (
                  <p className="mt-2 text-gray-600">
                    KBS membangun berbagai jenis bangunan termasuk kantor komersial, ruang retail, kompleks perumahan, fasilitas industri, institusi pendidikan, fasilitas kesehatan, dan gedung pemerintahan. Tim berpengalaman kami dapat menangani proyek dengan berbagai skala dan kompleksitas di seluruh Indonesia.
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq3')}>
                  <h3 className="text-xl font-bold text-gray-800">Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?</h3>
                  {activeSection === 'faq3' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq3' && (
                  <p className="mt-2 text-gray-600">
                    Waktu penyelesaian proyek tergantung pada kompleksitas dan skala pekerjaan. Kami selalu berkomitmen untuk menyelesaikan proyek sesuai jadwal yang telah disepakati dengan tetap menjaga kualitas terbaik.
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq4')}>
                  <h3 className="text-xl font-bold text-gray-800">Bagaimana cara mendapatkan penawaran harga?</h3>
                  {activeSection === 'faq4' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq4' && (
                  <p className="mt-2 text-gray-600">
                    Anda dapat menghubungi kami melalui halaman <Link href="/contact" className="text-[#153969] font-semibold">kontak</Link> untuk mendapatkan konsultasi dan penawaran harga yang sesuai dengan kebutuhan proyek Anda.
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq5')}>
                  <h3 className="text-xl font-bold text-gray-800">Apakah kami menawarkan layanan pasca-konstruksi?</h3>
                  {activeSection === 'faq5' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq5' && (
                  <p className="mt-2 text-gray-600">
                    Ya, kami menyediakan layanan pasca-konstruksi yang komprehensif termasuk pemeliharaan bangunan, perbaikan, renovasi, dan manajemen fasilitas. Kami menawarkan paket pemeliharaan yang disesuaikan untuk memastikan bangunan Anda beroperasi secara efisien dan mempertahankan nilainya seiring waktu. Tim kami siap menangani masalah yang mungkin muncul setelah penyelesaian proyek.
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
              Siap Memulai Proyek Konstruksi Anda?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              Hubungi tim kami hari ini untuk mendiskusikan kebutuhan konstruksi Anda dan dapatkan solusi yang disesuaikan untuk proyek Anda.
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
                Hubungi Kami
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Jelajahi Layanan Lainnya
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
