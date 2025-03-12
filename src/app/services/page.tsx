'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, HardHat, Hammer, Watch, Users, TrendingUp, Scale, Shield, Check } from 'lucide-react';

export default function ServicesPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

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

  // Services data
  const constructionServices = [
    {
      id: 1,
      title: "Konstruksi Bangunan",
      icon: <Building2 className="w-10 h-10 text-white" />,
      description: "Layanan konstruksi bangunan komprehensif untuk proyek komersial, residensial, dan institusional dari berbagai skala.",
      image: "/images/servicepage/gambar2.jpg",
      features: [
        "Bangunan komersial & perkantoran",
        "Kompleks perumahan & apartemen",
        "Fasilitas industri & gudang",
        "Bangunan institusional",
        "Area ritel & pusat perbelanjaan"
      ],
      link: "/services/building-construction"
    },
    {
      id: 2,
      title: "Pembangunan Infrastruktur",
      icon: <HardHat className="w-10 h-10 text-white" />,
      description: "Layanan khusus untuk proyek infrastruktur termasuk jalan, jembatan, dan pekerjaan umum yang melayani masyarakat.",
      image: "/images/servicepage/gambar3.jpg",
      features: [
        "Konstruksi & pemeliharaan jalan",
        "Pembangunan jembatan",
        "Sistem penyediaan air",
        "Infrastruktur drainase & saluran pembuangan",
        "Pendukung infrastruktur listrik"
      ],
      link: "/services/infrastructure"
    },
    {
      id: 3,
      title: "Manajemen Proyek",
      icon: <Watch className="w-10 h-10 text-white" />,
      description: "Layanan manajemen proyek menyeluruh yang memastikan proyek konstruksi Anda selesai tepat waktu dan sesuai anggaran.",
      image: "/images/servicepage/gambar4.jpg",
      features: [
        "Perencanaan & penjadwalan komprehensif",
        "Pengelolaan anggaran & pengendalian biaya",
        "Jaminan & pengendalian mutu",
        "Manajemen & mitigasi risiko",
        "Pemantauan & pelaporan kemajuan"
      ],
      link: "/services/project-management"
    },
    {
      id: 4,
      title: "Renovasi & Retrofitting",
      icon: <Hammer className="w-10 h-10 text-white" />,
      description: "Layanan renovasi dan retrofitting profesional untuk memodernisasi dan meningkatkan struktur yang ada dengan tetap mempertahankan integritasnya.",
      image: "/images/servicepage/gambar5.jpg",
      features: [
        "Renovasi interior & eksterior",
        "Peningkatan sistem bangunan",
        "Penguatan & penguatan struktural",
        "Peningkatan efisiensi energi",
        "Restorasi bangunan bersejarah"
      ],
      link: "/services/renovation"
    }
  ];

  const equipmentServices = [
    {
      id: 5,
      title: "Penyewaan Alat Berat",
      icon: <HardHat className="w-10 h-10 text-white" />,
      description: "Berbagai peralatan konstruksi tersedia untuk disewa, dari excavator hingga mesin khusus untuk kebutuhan proyek Anda.",
      image: "/images/servicesection-3.jpg",
      features: [
        "Excavator & alat pemindah tanah",
        "Crane & peralatan pengangkat",
        "Peralatan pencampur & penempatan beton",
        "Compactor & road roller",
        "Generator & solusi daya"
      ],
      link: "/services/equipment-rental"
    },
    
    {
      id: 7,
      title: "Layanan Pemeliharaan",
      icon: <TrendingUp className="w-10 h-10 text-white" />,
      description: "Layanan pemeliharaan komprehensif untuk peralatan konstruksi untuk meminimalkan downtime dan memaksimalkan produktivitas.",
      image: "/images/servicepage/gambar6.jpg",
      features: [
        "Program pemeliharaan preventif",
        "Layanan perbaikan darurat",
        "Penggantian & penyediaan suku cadang",
        "Inspeksi & diagnostik peralatan",
        "Pelatihan pemeliharaan untuk staf"
      ],
      link: "/services/equipment-maintenance"
    }
  ];

  // Gabungkan semua layanan
  const allServices = [...constructionServices, ...equipmentServices];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/servicepage/gambar1.jpg" // Update with your hero image for services
          alt="Layanan KBS"
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
                Layanan Kami
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90"
              >
                Solusi konstruksi dan peralatan komprehensif untuk mewujudkan visi Anda
              </motion.p>
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
              Solusi Konstruksi Komprehensif
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
              Di KBS, kami menawarkan spektrum lengkap layanan konstruksi dan solusi peralatan untuk memenuhi semua kebutuhan proyek Anda. Dari konstruksi bangunan komersial hingga pengembangan infrastruktur khusus, tim kami memiliki keahlian dan sumber daya untuk memberikan hasil luar biasa.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Komitmen kami terhadap kualitas, keselamatan, dan kepuasan klien adalah inti dari semua yang kami lakukan. Jelajahi layanan kami di bawah ini untuk melihat bagaimana kami dapat membantu mewujudkan visi Anda.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Mengapa Memilih KBS
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-8"
            />
          </div>
          
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
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#153969]"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-[#153969]/10 mr-4">
                  <Shield className="h-6 w-6 text-[#153969]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Jaminan Kualitas</h3>
              </div>
              <p className="text-gray-600">
                Kami menjamin pekerjaan kami dengan garansi kualitas dan mematuhi standar industri tertinggi dalam semua proyek kami.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#153969]"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-[#153969]/10 mr-4">
                  <Users className="h-6 w-6 text-[#153969]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Tim Ahli</h3>
              </div>
              <p className="text-gray-600">
                Tim profesional bersertifikasi kami membawa pengalaman bertahun-tahun dan pengetahuan khusus ke setiap proyek.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#153969]"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-[#153969]/10 mr-4">
                  <Watch className="h-6 w-6 text-[#153969]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Pengiriman Tepat Waktu</h3>
              </div>
              <p className="text-gray-600">
                Kami memahami pentingnya tenggat waktu dan bangga dapat menyelesaikan proyek tepat waktu tanpa mengorbankan kualitas.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#153969]"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-[#153969]/10 mr-4">
                  <Scale className="h-6 w-6 text-[#153969]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Harga Kompetitif</h3>
              </div>
              <p className="text-gray-600">
                Kami menawarkan harga transparan dan kompetitif dengan rincian detail untuk memastikan Anda mendapatkan nilai terbaik untuk investasi Anda.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Tanpa kategori dan tanpa link "Pelajari Lebih Lanjut" */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Layanan Kami
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-8"
            />
          </div>

          {/* Services Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {allServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl group"
              >
                <div className="relative h-56">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <div className="p-3 rounded-full bg-[#153969] inline-flex mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-[#153969] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Proses Layanan Kami
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
              className="text-lg text-gray-700"
            >
              Kami mengikuti pendekatan terstruktur untuk memastikan setiap proyek dilaksanakan dengan sempurna
            </motion.p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-[#153969]"></div>
              
              <div className="space-y-12">
                {/* Step 1 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex flex-col md:w-1/2 md:pr-8 pl-12 md:pl-0 md:items-end mb-6 md:mb-0 relative">
                      <div className="absolute left-0 md:right-0 md:left-auto flex items-center justify-center w-8 h-8 rounded-full bg-[#153969] text-white z-10 md:transform md:translate-x-4">
                        1
                      </div>
                      <div className="md:text-right">
                        <h3 className="text-xl font-bold text-[#153969]">Konsultasi Awal</h3>
                        <p className="text-gray-600">
                          Kami memulai dengan konsultasi mendetail untuk memahami visi, persyaratan, dan tujuan Anda untuk proyek tersebut.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
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
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="hidden md:block md:w-1/2"></div>
                    <div className="flex flex-col md:w-1/2 md:pl-8 pl-12 md:items-start relative">
                      <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#153969] text-white z-10 md:transform md:-translate-x-4">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#153969]">Perencanaan & Desain</h3>
                        <p className="text-gray-600">
                          Tim kami mengembangkan rencana dan desain komprehensif yang disesuaikan dengan kebutuhan spesifik Anda, termasuk jadwal dan anggaran.
                        </p>
                      </div>
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
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex flex-col md:w-1/2 md:pr-8 pl-12 md:pl-0 md:items-end mb-6 md:mb-0 relative">
                      <div className="absolute left-0 md:right-0 md:left-auto flex items-center justify-center w-8 h-8 rounded-full bg-[#153969] text-white z-10 md:transform md:translate-x-4">
                        3
                      </div>
                      <div className="md:text-right">
                        <h3 className="text-xl font-bold text-[#153969]">Proposal & Perjanjian</h3>
                        <p className="text-gray-600">
                          Kami menyajikan proposal terperinci yang menguraikan biaya, jadwal, dan hasil, diikuti dengan perjanjian formal setelah disetujui.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
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
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="hidden md:block md:w-1/2"></div>
                    <div className="flex flex-col md:w-1/2 md:pl-8 pl-12 md:items-start relative">
                      <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#153969] text-white z-10 md:transform md:-translate-x-4">
                        4
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#153969]">Pelaksanaan Proyek</h3>
                        <p className="text-gray-600">
                          Tim terampil kami melaksanakan rencana dengan presisi, mematuhi standar kualitas dan keselamatan tertinggi.
                        </p>
                      </div>
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
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex flex-col md:w-1/2 md:pr-8 pl-12 md:pl-0 md:items-end mb-6 md:mb-0 relative">
                      <div className="absolute left-0 md:right-0 md:left-auto flex items-center justify-center w-8 h-8 rounded-full bg-[#153969] text-white z-10 md:transform md:translate-x-4">
                        5
                      </div>
                      <div className="md:text-right">
                        <h3 className="text-xl font-bold text-[#153969]">Pemantauan & Pelaporan</h3>
                        <p className="text-gray-600">
                          Kami memberikan pembaruan rutin dan laporan terperinci sepanjang proyek, memastikan transparansi penuh.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                </motion.div>

                {/* Step 6 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="hidden md:block md:w-1/2"></div>
                    <div className="flex flex-col md:w-1/2 md:pl-8 pl-12 md:items-start relative">
                      <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#153969] text-white z-10 md:transform md:-translate-x-4">
                        6
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#153969]">Jaminan Kualitas</h3>
                        <p className="text-gray-600">
                          Kami melakukan pemeriksaan kualitas menyeluruh untuk memastikan semua pekerjaan memenuhi standar tinggi kami dan harapan Anda.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 7 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex flex-col md:w-1/2 md:pr-8 pl-12 md:pl-0 md:items-end mb-6 md:mb-0 relative">
                      <div className="absolute left-0 md:right-0 md:left-auto flex items-center justify-center w-8 h-8 rounded-full bg-[#153969] text-white z-10 md:transform md:translate-x-4">
                        7
                      </div>
                      <div className="md:text-right">
                        <h3 className="text-xl font-bold text-[#153969]">Penyelesaian & Serah Terima Proyek</h3>
                        <p className="text-gray-600">
                          Setelah selesai, kami melakukan inspeksi akhir bersama Anda dan menyediakan semua dokumentasi dan dukungan yang diperlukan.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Pertanyaan yang Sering Diajukan
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-8"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-6"
            >
              {/* FAQ Item 1 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Jenis proyek apa saja yang ditangani KBS?</h3>
                <p className="text-gray-700">
                  KBS menangani berbagai proyek konstruksi, termasuk bangunan komersial, kompleks perumahan, pengembangan infrastruktur, dan fasilitas industri. Kami memiliki pengalaman dengan proyek dari berbagai skala dan kompleksitas, dari renovasi kecil hingga pengembangan skala besar.
                </p>
              </motion.div>

              {/* FAQ Item 2 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bagaimana Anda memastikan kualitas dalam layanan konstruksi Anda?</h3>
                <p className="text-gray-700">
                  Kualitas adalah inti dari semua yang kami lakukan. Kami mempertahankan langkah-langkah pengendalian mutu yang ketat di semua tahap konstruksi, hanya menggunakan material berkualitas yang memenuhi atau melampaui standar industri, mempekerjakan profesional yang terampil, dan melakukan inspeksi serta pengujian rutin untuk memastikan kualitas pengerjaan tertinggi.
                </p>
              </motion.div>

              {/* FAQ Item 3 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Peralatan apa yang tersedia untuk disewa?</h3>
                <p className="text-gray-700">
                  Armada peralatan sewa kami mencakup excavator, bulldozer, backhoe, loader, compactor, generator, mixer beton, dan berbagai mesin khusus. Semua peralatan kami terawat dengan baik, diservis secara teratur, dan mematuhi standar keamanan untuk memastikan kinerja yang andal pada proyek Anda.
                </p>
              </motion.div>

              {/* FAQ Item 4 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Apakah Anda dapat menangani layanan desain dan konstruksi?</h3>
                <p className="text-gray-700">
                  Ya, kami menawarkan layanan design-build di mana kami menangani aspek desain dan konstruksi proyek Anda. Pendekatan terintegrasi ini merampingkan proses, mengurangi masalah komunikasi, dan sering kali menghasilkan penghematan biaya dan penyelesaian proyek yang lebih cepat.
                </p>
              </motion.div>

              
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
              Siap Memulai Proyek Anda?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              Hubungi kami hari ini untuk mendiskusikan kebutuhan konstruksi Anda dan temukan bagaimana layanan kami dapat mewujudkan visi Anda.
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
                className="px-8 py-3 bg-white text-[#153969] hover:bg-gray-100 rounded-md font-medium transition-colors shadow-lg"
              >
                Hubungi Kami
              </Link>
              <a 
                href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white hover:bg-white/10 text-white rounded-md font-medium transition-colors"
              >
                Dapatkan Penawaran
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}