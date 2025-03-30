'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Download, FileText, ArrowLeft,Users, Award, Clock, Globe, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProfilPerusahaan() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  // Varian animasi
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
      {/* Bagian Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/blog/comprof.jpg" // Ganti dengan gambar hero Anda
          alt="KBS Profil Perusahaan"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
            <button 
                onClick={() => router.push('/')} 
                className="inline-flex items-center text-white bg-[#153969]/70 backdrop-blur-sm px-4 py-2 rounded-full mb-6 hover:bg-[#153969] transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Beranda
              </button>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                Profil Perusahaan
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                Membangun masa depan dengan keunggulan dan integritas sejak 2005
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <a 
                  href="/documents/KBS-Profil-Perusahaan.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#153969] hover:bg-[#0f2a4d] text-white px-6 py-3 rounded-md font-medium transition-colors shadow-lg"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Lihat Profil Perusahaan Lengkap
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

     

      {/* Bagian Pengenalan */}
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
              Tentang KBS
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
              PT Karya Bersama Sejahtera (KBS) adalah perusahaan konstruksi dan teknik terkemuka di Indonesia. Didirikan pada tahun 2005, kami telah berkembang menjadi mitra terpercaya untuk berbagai proyek konstruksi di seluruh negeri, mulai dari bangunan komersial hingga pengembangan infrastruktur.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              {`Dengan komitmen kami terhadap kualitas, inovasi, dan keberlanjutan, kami berusaha memberikan keunggulan dalam setiap proyek yang kami lakukan, memastikan kepuasan klien dan berkontribusi pada pembangunan Indonesia.`}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Kartu Informasi Utama */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Kartu 1 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Users className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">18+ Tahun Pengalaman</h3>
              <p className="text-gray-600">
                Dengan lebih dari 18 tahun di industri, kami membawa keahlian dan pengetahuan untuk setiap proyek.
              </p>
            </motion.div>

            {/* Kartu 2 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Award className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Bersertifikat ISO</h3>
              <p className="text-gray-600">
                Kami mempertahankan standar tertinggi dengan sertifikasi ISO 9001, ISO 14001, dan OHSAS 18001.
              </p>
            </motion.div>

            {/* Kartu 3 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Clock className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pengiriman Tepat Waktu</h3>
              <p className="text-gray-600">
                Kami bangga dapat memenuhi tenggat waktu secara konsisten tanpa mengorbankan kualitas.
              </p>
            </motion.div>

            {/* Kartu 4 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Globe className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Proyek Nasional</h3>
              <p className="text-gray-600">
                Berhasil menyelesaikan proyek di seluruh Indonesia, dari Jawa hingga daerah lainnya.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visi, Misi, Nilai Perusahaan */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
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
                  Visi Kami
                </motion.h2>
                <motion.div 
                  variants={fadeInUp}
                  className="w-16 h-1 bg-[#153969] mb-6"
                />
                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-gray-700 mb-8"
                >
                  Menjadi perusahaan konstruksi terkemuka di Indonesia, dikenal karena keunggulan, inovasi, dan integritas dalam setiap proyek yang kami lakukan.
                </motion.p>

                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
                >
                  Misi Kami
                </motion.h2>
                <motion.div 
                  variants={fadeInUp}
                  className="w-16 h-1 bg-[#153969] mb-6"
                />
                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-gray-700 mb-4"
                >
                  Kami berkomitmen untuk:
                </motion.p>
                <motion.ul 
                  variants={fadeInUp}
                  className="list-disc pl-6 space-y-2 text-gray-700 mb-8"
                >
                  <li>Memberikan proyek konstruksi berkualitas tinggi dengan aman, tepat waktu, dan sesuai anggaran</li>
                  <li>Menerapkan solusi inovatif dan praktik berkelanjutan</li>
                  <li>Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan dan keunggulan</li>
                  <li>Mengembangkan karyawan kami dan berkontribusi positif pada masyarakat</li>
                </motion.ul>
              </motion.div>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="bg-gray-50 p-8 rounded-lg shadow-md"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
              >
                Nilai-Nilai Inti Kami
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-16 h-1 bg-[#153969] mb-6"
              />

              <div className="space-y-6">
                <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('excellence')}>
                    <h3 className="text-xl font-bold text-gray-800">Keunggulan</h3>
                    {activeSection === 'excellence' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'excellence' && (
                    <p className="mt-2 text-gray-600">
                      Kami berusaha untuk mencapai keunggulan dalam setiap aspek pekerjaan kami, secara konsisten melebihi harapan dan memberikan hasil yang unggul.
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('integrity')}>
                    <h3 className="text-xl font-bold text-gray-800">Integritas</h3>
                    {activeSection === 'integrity' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'integrity' && (
                    <p className="mt-2 text-gray-600">
                      Kami menjalankan bisnis kami dengan standar kejujuran, transparansi, dan perilaku etis tertinggi, membangun kepercayaan dengan semua pemangku kepentingan.
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('innovation')}>
                    <h3 className="text-xl font-bold text-gray-800">Inovasi</h3>
                    {activeSection === 'innovation' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'innovation' && (
                    <p className="mt-2 text-gray-600">
                      Kami merangkul ide, teknologi, dan metodologi baru untuk terus meningkatkan dan memberikan solusi terdepan kepada klien kami.
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('teamwork')}>
                    <h3 className="text-xl font-bold text-gray-800">Kerja Sama Tim</h3>
                    {activeSection === 'teamwork' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'teamwork' && (
                    <p className="mt-2 text-gray-600">
                      Kami percaya pada kekuatan kolaborasi, bekerja sama di seluruh disiplin dan dengan klien kami untuk mencapai tujuan bersama.
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('responsibility')}>
                    <h3 className="text-xl font-bold text-gray-800">Tanggung Jawab Sosial</h3>
                    {activeSection === 'responsibility' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'responsibility' && (
                    <p className="mt-2 text-gray-600">
                      Kami berkomitmen pada praktik berkelanjutan, keselamatan, dan memberikan kembali kepada masyarakat di mana kami beroperasi.
                    </p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bagian PDF Perusahaan */}
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
              Unduh Profil Perusahaan Kami
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              Untuk informasi lebih rinci tentang perusahaan kami, layanan, dan proyek-proyek sebelumnya, unduh dokumen profil perusahaan kami yang komprehensif.
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="/documents/KBS-Profil-Perusahaan.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-[#153969] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors shadow-lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                Lihat Online
              </a>
              <a 
                href="/documents/KBS-Profil-Perusahaan.pdf" 
                download
                className="inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                <Download className="mr-2 h-5 w-5" />
                Unduh PDF
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Linimasa Sejarah Perusahaan */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
              >
                Perjalanan Kami
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-20 h-1 bg-[#153969] mx-auto mb-6"
              />
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-700"
              >
                Tonggak penting dalam pertumbuhan dan perkembangan perusahaan kami
              </motion.p>
            </motion.div>

            <div className="relative">
              {/* Garis vertikal */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#153969]/20"></div>
              
              <div className="space-y-12">
                {/* 2005 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-end w-1/2 pr-8">
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-[#153969]">2005</h3>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Perusahaan Didirikan</h4>
                        <p className="text-gray-600">KBS didirikan dengan visi untuk menjadi perusahaan konstruksi terkemuka di Indonesia.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </motion.div>

                {/* 2010 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="flex flex-col w-1/2 pl-8">
                      <h3 className="text-xl font-bold text-[#153969]">2010</h3>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Proyek Besar Pertama</h4>
                      <p className="text-gray-600">Menyelesaikan proyek bangunan komersial besar pertama kami di Jakarta, membangun reputasi kami untuk kualitas dan keandalan.</p>
                    </div>
                  </div>
                </motion.div>

                {/* 2015 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-end w-1/2 pr-8">
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-[#153969]">2015</h3>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Sertifikasi ISO</h4>
                        <p className="text-gray-600">Meraih sertifikasi ISO 9001, menunjukkan komitmen kami terhadap sistem manajemen mutu.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </motion.div>

                {/* 2018 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="flex flex-col w-1/2 pl-8">
                      <h3 className="text-xl font-bold text-[#153969]">2018</h3>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Ekspansi ke Indonesia Timur</h4>
                      <p className="text-gray-600">Membuka kantor pertama kami di Makassar untuk melayani klien di Indonesia Timur dan mengerjakan proyek infrastruktur di wilayah tersebut.</p>
                    </div>
                  </div>
                </motion.div>

                {/* 2020 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-end w-1/2 pr-8">
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-[#153969]">2020</h3>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Adaptasi Pandemi</h4>
                        <p className="text-gray-600">Berhasil beradaptasi dengan tantangan pandemi global, menerapkan protokol keselamatan inovatif dan solusi digital.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </motion.div>

                {/* 2023 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="flex flex-col w-1/2 pl-8">
                      <h3 className="text-xl font-bold text-[#153969]">2023</h3>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Inisiatif Bangunan Hijau</h4>
                      <p className="text-gray-600">Meluncurkan komitmen kami untuk konstruksi berkelanjutan dengan penyelesaian proyek bangunan bersertifikat hijau pertama kami.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Sekarang */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-end w-1/2 pr-8">
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-[#153969]">Sekarang</h3>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Menatap Masa Depan</h4>
                        <p className="text-gray-600">Terus tumbuh dan berinovasi, dengan fokus pada praktik bangunan berkelanjutan dan memperluas penawaran layanan kami.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ajakan Bertindak */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Bermitra dengan KBS untuk Proyek Anda Berikutnya
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-8"
            >
              Siap untuk membahas kebutuhan konstruksi Anda? Tim kami siap membantu Anda mewujudkan visi Anda dengan keahlian, kualitas, dan dedikasi.
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/kontak" className="px-8 py-3 bg-[#153969] hover:bg-[#0f2a4d] text-white rounded-md font-medium transition-colors shadow-lg">
                Hubungi Kami
              </Link>
              <Link href="/layanan" className="px-8 py-3 border border-[#153969] text-[#153969] hover:bg-[#153969] hover:text-white rounded-md font-medium transition-colors">
                Layanan Kami
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );}