'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowLeft, X, ZoomIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Interface for data structures
interface Achievement {
  id: number;
  year: number;
  title: string;
  description: string;
  image: string;
  achievements: string[];
}

interface Certificate {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ProjectItem {
  id: number;
  title: string;
  subBidang: string;
  lokasi: string;
  pemberiTugas: string;
  noTanggal: string;
  image: string;
}

export default function CompanyHistoryPage() {
  const router = useRouter();
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  
  // State for modal/lightbox
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  
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

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  // Company history milestones
  const historyMilestones: Achievement[] = [
    {
      id: 1,
      year: 2011,
      title: "Pendirian Perusahaan",
      description: "PT Karya Bangun Semesta didirikan sebagai perusahaan konstruksi dengan fokus pada pembangunan infrastruktur dan proyek konstruksi.",
      image: "/images/blog/perjalanankami1.jpg",
      achievements: [
        "Memulai bisnis di sektor konstruksi",
        "Fokus awal pada proyek-proyek kecil hingga menengah",
        "Membangun reputasi untuk kualitas dan ketepatan waktu"
      ]
    },
    {
      id: 2,
      year: 2015,
      title: "Sertifikasi ISO",
      description: "Perusahaan berhasil mendapatkan sertifikasi ISO sebagai bukti komitmen kami terhadap standar kualitas internasional.",
      image: "/images/blog/isocertification.jpg",
      achievements: [
        "Perolehan ISO 9001:2015 untuk sistem manajemen mutu",
        "Perolehan ISO 14001:2015 untuk sistem manajemen lingkungan",
        "Perolehan OHSAS 18001:2007 untuk kesehatan dan keselamatan kerja"
      ]
    },
    {
      id: 3,
      year: 2019,
      title: "Perluasan Layanan",
      description: "Memperluas cakupan layanan untuk mencakup berbagai jenis proyek konstruksi dan infrastruktur.",
      image: "/images/blog/perluaslayanan.jpg",
      achievements: [
        "Pengembangan ke proyek perumahan dan bangunan komersial",
        "Penambahan layanan pekerjaan infrastruktur",
        "Memperkuat tim dengan penambahan tenaga ahli berpengalaman"
      ]
    },
    {
      id: 4,
      year: 2021,
      title: "Proyek-Proyek Besar",
      description: "Menangani berbagai proyek besar di berbagai lokasi di Indonesia, menunjukkan kemampuan dan kepercayaan dari klien-klien besar.",
      image: "/images/servicesection-1.jpg",
      achievements: [
        "Proyek Interior & Furniture Club House Zora BSD City bersama PT. Multi Bangun Persada",
        "Pembangunan Sekolah dan Mushola di Parung, Bogor untuk World Assembly Moslem Youth (WAMY)",
        "Pekerjaan Reflected Pond Lobby Grand Hyatt di Jakarta dengan PT. Plaza Indonesia Realty, Tbk"
      ]
    },
    {
      id: 5,
      year: 2022,
      title: "Ekspansi Proyek Infrastruktur",
      description: "Fokus pada pengembangan proyek infrastruktur dan konstruksi bangunan yang lebih kompleks.",
      image: "/images/blog/ekspansi.jpg",
      achievements: [
        "Proyek Cut & Fill, Land Clearing di Kawasan Industri Subang dengan PT. Nusa Raya Cipta",
        "Pembangunan Condotel HAPPER Ciawi Tower A, B, C dengan PT. Lingga Dewata Agung",
        "Rehabilitasi Jalan dan Jembatan Ruas Cipanas-Warung Banten dengan PT. Jaya Konstruksi MF, Tbk"
      ]
    },
    {
      id: 6,
      year: 2023,
      title: "Inovasi dan Keberlanjutan",
      description: "Menerapkan teknologi terbaru dan praktik konstruksi berkelanjutan dalam proyek-proyek kami.",
      image: "/images/blog/inovasi.jpg",
      achievements: [
        "Implementasi teknologi modern dalam manajemen proyek",
        "Fokus pada praktik konstruksi ramah lingkungan",
        "Peningkatan efisiensi dan ketepatan waktu dalam penyelesaian proyek"
      ]
    }
  ];

  // Certifications
  const certifications: Certificate[] = [
    {
      id: 1,
      title: "ISO 9001:2015",
      description: "Sistem Manajemen Mutu",
      image: "/images/iso/iso9001.png"
    },
    {
      id: 2,
      title: "ISO 14001:2015",
      description: "Sistem Manajemen Lingkungan",
      image: "/images/iso/iso14001.png"
    },
    {
      id: 3,
      title: "OHSAS 18001:2007",
      description: "Sistem Manajemen Kesehatan dan Keselamatan Kerja",
      image: "/images/iso/ohsas18001.png"
    },
    {
      id: 4,
      title: "KADIN Perusahaan",
      description: "Keanggotaan Kamar Dagang dan Industri Indonesia",
      image: "/images/iso/kadin.png"
    }
  ];

  // Portfolio projects
  const portfolioProjects: ProjectItem[] = [
    {
      id: 1,
      title: "Pembangunan Condotel HAPPER Ciawi Tower A, B, C",
      subBidang: "Konstruksi Bangunan Gedung",
      lokasi: "Ciawi - Bogor",
      pemberiTugas: "PT. Lingga Dewata Agung",
      noTanggal: "0501-KONTRAK-CH-CLDA-JAP-2022, 20 Juli 2022",
      image: "/images/bangunan/harperciawi.jpg"
    },
    {
      id: 2,
      title: "Proyek Pekerjaan Cut & Fill, Land Clearing, Saluran Drainase, dan Pematangan Lahan",
      subBidang: "Pekerjaan Infrastruktur dan Pematangan Lahan",
      lokasi: "Kawasan Industri Subang",
      pemberiTugas: "PT. Nusa Raya Cipta",
      noTanggal: "053-KONTRAK-KIS-NRC-KBS/2022, 13 Mei 2022",
      image: "/images/servicesection-3.jpg"
    },
    {
      id: 3,
      title: "Interior & Furniture Club House Zora BSD City",
      subBidang: "Interior",
      lokasi: "Tangerang",
      pemberiTugas: "PT. Multi Bangun Persada",
      noTanggal: "79/MBP-KBS/CH-2/2021, 22 Februari 2021",
      image: "/images/bangunan/bsdinterior.jpg"
    },
    {
      id: 4,
      title: "Rehabilitasi Jalan dan Jembatan Ruas Cipanas - Warung Banten",
      subBidang: "Pekerjaan Rehabilitasi Jalan",
      lokasi: "Banten",
      pemberiTugas: "PT. Jaya Konstruksi MF, Tbk",
      noTanggal: "JK/VSPK/02/1001, 30 Agustus 2021",
      image: "/images/bangunan/jembatan.jpg"
    }
  ];

  // Functions to handle modal
  const openModal = (certificate: Certificate) => {
    setSelectedCert(certificate);
    setIsModalOpen(true);
    // Prevent scrolling
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Restore scrolling
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  // Open modal for any image (project or history)
  const openImageModal = (image: string, title: string, description: string = "") => {
    const imageCert: Certificate = {
      id: 999, // Temporary ID
      title,
      description,
      image
    };
    openModal(imageCert);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src="/images/blog/perjalanankami2.jpg" // Gambar untuk halaman sejarah
          alt="Sejarah Perusahaan"
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
                Perjalanan Kami
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90"
              >
                Sejarah dan pencapaian PT Karya Bangun Semesta sejak didirikan pada tahun 2011
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
              Sejarah Perusahaan
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
              PT Karya Bangun Semesta memulai perjalanannya pada tahun 2011 sebagai perusahaan konstruksi dengan visi untuk memberikan kontribusi signifikan pada pembangunan infrastruktur Indonesia. Didirikan dengan komitmen untuk kualitas dan profesionalisme, perusahaan kami telah berkembang secara konsisten dan kini dikenal sebagai salah satu kontraktor terpercaya di industri.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              Dalam perjalanannya, PT Karya Bangun Semesta telah menyelesaikan berbagai proyek penting di berbagai sektor, termasuk konstruksi bangunan, pengembangan infrastruktur, renovasi, dan pekerjaan interior. Berikut ini adalah tonggak penting dalam perjalanan kami.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-16 text-center"
            >
              Perjalanan PT Karya Bangun Semesta
            </motion.h2>

            <div className="flex flex-col space-y-8">
              {historyMilestones.map((milestone) => (
                <motion.div 
                  key={milestone.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  className={`relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                    activeEvent === milestone.id 
                      ? 'ring-2 ring-[#153969] bg-white' 
                      : 'bg-white'
                  }`}
                  onClick={() => setActiveEvent(activeEvent === milestone.id ? null : milestone.id)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative h-64 md:h-auto group">
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div 
                        className="absolute inset-0 bg-black/30 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent onClick
                          openImageModal(milestone.image, milestone.title, milestone.description);
                        }}
                      >
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                          {milestone.year}
                        </h3>
                        
                        {/* Zoom icon on hover */}
                        <div className="absolute top-3 right-3 bg-white/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="h-5 w-5 text-[#153969]" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8">
                      <div className="flex items-center mb-4">
                        <Clock className="h-5 w-5 text-[#153969] mr-2" />
                        <span className="text-sm text-gray-500">{milestone.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-700 mb-4">{milestone.description}</p>
                      
                      {activeEvent === milestone.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 border-t border-gray-200 pt-4"
                        >
                          <h4 className="font-semibold text-[#153969] mb-2">Pencapaian Utama:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {milestone.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-700">{achievement}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                      
                      <div className="mt-4 text-[#153969] text-sm font-medium">
                        {activeEvent === milestone.id ? 'Klik untuk menutup' : 'Klik untuk detil'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Sertifikat Perusahaan
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
              Sebagai bukti komitmen kami terhadap kualitas, keselamatan, dan pengelolaan lingkungan, PT Karya Bangun Semesta telah memperoleh berbagai sertifikasi penting.
            </motion.p>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {certifications.slice(0, 3).map((cert) => (
              <motion.div 
                key={cert.id} 
                variants={fadeInUp} 
                className="bg-white p-6 rounded-lg shadow-md text-center group cursor-pointer"
                onClick={() => openModal(cert)}
              >
                <div className="h-64 relative mb-4 overflow-hidden rounded-md bg-white border border-gray-200">
                  <Image 
                    src={cert.image} 
                    alt={cert.title}
                    fill
                    className="object-contain p-4 transition-all duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/70 p-2 rounded-full">
                      <ZoomIn className="h-6 w-6 text-[#153969]" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#153969]">{cert.title}</h3>
                <p className="text-gray-700 mt-2">{cert.description}</p>
              </motion.div>
            ))}
            
            <motion.div 
              variants={fadeInUp} 
              className="bg-white p-6 rounded-lg shadow-md text-center md:col-span-2 lg:col-span-3 group cursor-pointer"
              onClick={() => openModal(certifications[3])}
            >
              <div className="h-64 relative mb-4 overflow-hidden rounded-md bg-white border border-gray-200">
                <Image 
                  src="/images/iso/kadin.png" 
                  alt="KADIN Perusahaan"
                  fill
                  className="object-contain p-4 transition-all duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/70 p-2 rounded-full">
                    <ZoomIn className="h-6 w-6 text-[#153969]" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#153969]">KADIN Perusahaan</h3>
              <p className="text-gray-700 mt-2">Keanggotaan Kamar Dagang dan Industri Indonesia</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Portofolio Proyek Unggulan
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
              Sepanjang perjalanan kami, PT Karya Bangun Semesta telah menyelesaikan berbagai proyek penting di berbagai kategori.
            </motion.p>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {portfolioProjects.map((project) => (
              <motion.div 
                key={project.id} 
                variants={fadeInUp} 
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div 
                  className="relative h-60 overflow-hidden cursor-pointer"
                  onClick={() => openImageModal(project.image, project.title, project.subBidang)}
                >
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/70 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <ZoomIn className="h-6 w-6 text-[#153969]" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#153969] mb-3">{project.title}</h3>
                  <div className="mb-4">
                    <p className="text-gray-700"><span className="font-semibold">Sub Bidang Pekerjaan:</span> {project.subBidang}</p>
                    <p className="text-gray-700"><span className="font-semibold">Lokasi:</span> {project.lokasi}</p>
                    <p className="text-gray-700"><span className="font-semibold">Pemberi Tugas:</span> {project.pemberiTugas}</p>
                    <p className="text-gray-700"><span className="font-semibold">No/Tanggal:</span> {project.noTanggal}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link 
              href="/projects" 
              className="inline-flex items-center px-6 py-3 bg-[#153969] hover:bg-[#0f2a4d] text-white rounded-md font-medium transition-colors shadow-lg"
            >
              Lihat Semua Proyek
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Values and Vision */}
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
              Nilai-Nilai Kami
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-20 h-1 bg-white mx-auto mb-12"
            />
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeInUp} className="p-6">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Kualitas</h3>
                <p className="text-white/80">
                  Kami berkomitmen untuk memberikan hasil pekerjaan berkualitas tinggi dengan standar internasional dalam setiap proyek yang kami tangani.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="p-6">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Profesionalisme</h3>
                <p className="text-white/80">
                  Kami menjalankan bisnis dengan standar etika dan profesionalisme tinggi, menciptakan kepercayaan dengan klien dan mitra kami.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="p-6">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Inovasi</h3>
                <p className="text-white/80">
                  Kami terus berupaya mengadopsi teknologi dan metode terbaru untuk meningkatkan efisiensi dan kualitas pekerjaan kami di setiap proyek.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision and Future */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl md:text-4xl font-bold text-[#153969] mb-6">Visi Masa Depan</h2>
                <div className="w-16 h-1 bg-[#153969] mb-6"></div>
                <p className="text-lg text-gray-700 mb-4">
                  Sejak didirikan pada tahun 2011, PT Karya Bangun Semesta telah tumbuh menjadi perusahaan konstruksi yang terpercaya dengan berbagai proyek penting di seluruh Indonesia. Kami bangga dengan perjalanan yang telah kami lalui dan proyek-proyek yang telah kami selesaikan.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Menatap ke depan, kami berkomitmen untuk terus berkembang dan meningkatkan layanan kami. Visi kami adalah menjadi perusahaan konstruksi terkemuka yang dikenal karena kualitas, inovasi, dan keberlanjutan dalam setiap proyek yang kami tangani.
                </p>
                <p className="text-lg text-gray-700">
                  Dengan pengalaman luas dan tim profesional yang kami miliki, kami siap menghadapi tantangan-tantangan baru dan berkontribusi lebih besar dalam pembangunan infrastruktur Indonesia.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp} 
                className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl group cursor-pointer"
                onClick={() => openImageModal("/images/berita7/gambar1-b7.jpg", "Visi Masa Depan Perusahaan", "Tim profesional kami siap memberikan solusi terbaik untuk proyek Anda")}
              >
                <Image
                  src="/images/berita7/gambar1-b7.jpg" // Gambar untuk visi masa depan
                  alt="Visi Masa Depan Perusahaan"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/70 p-3 rounded-full">
                    <ZoomIn className="h-6 w-6 text-[#153969]" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
              Jadilah Bagian dari Perjalanan Kami
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-8"
            >
              Tertarik untuk bermitra dengan kami atau ingin mengetahui lebih lanjut tentang layanan kami? Hubungi kami hari ini.
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/contact" className="px-8 py-3 bg-[#153969] hover:bg-[#0f2a4d] text-white rounded-md font-medium transition-colors shadow-lg">
                Hubungi Kami
              </Link>
              <Link href="/services" className="px-8 py-3 border border-[#153969] text-[#153969] hover:bg-[#153969] hover:text-white rounded-md font-medium transition-colors">
                Layanan Kami
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal for Certificate Preview */}
      <AnimatePresence>
        {isModalOpen && selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white/90 backdrop-blur-sm border-b">
                <h2 className="text-xl font-bold text-[#153969]">{selectedCert.title}</h2>
                <motion.button 
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6 text-gray-600" />
                </motion.button>
              </div>
              
              <div className="overflow-y-auto p-6 pt-2 flex flex-col items-center justify-center bg-gray-50 h-[calc(90vh-80px)]">
                <div className="relative w-full h-[70vh] mb-4">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-gray-700 text-center max-w-lg mt-4">
                  {selectedCert.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}