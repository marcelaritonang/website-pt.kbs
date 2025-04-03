'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowLeft, X, ZoomIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

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
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  
  // State for modal/lightbox
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  
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

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  // Multilingual content
  const content = {
    en: {
      backToHome: "Back to Home",
      pageTitle: "Our Journey",
      subtitle: "The history and achievements of PT Karya Bangun Semesta since its founding in 2011",
      companyHistoryTitle: "Company History",
      companyHistoryText1: "PT Karya Bangun Semesta began its journey in 2011 as a construction company with a vision to make a significant contribution to Indonesia's infrastructure development. Founded with a commitment to quality and professionalism, our company has grown consistently and is now recognized as one of the trusted contractors in the industry.",
      companyHistoryText2: "Throughout its journey, PT Karya Bangun Semesta has completed various important projects in various sectors, including building construction, infrastructure development, renovation, and interior work. Here are important milestones in our journey.",
      timelineTitle: "The Journey of PT Karya Bangun Semesta",
      milestones: [
        {
          id: 1,
          year: 2011,
          title: "Company Establishment",
          description: "PT Karya Bangun Semesta was established as a construction company focusing on infrastructure development and construction projects.",
          image: "/images/blog/perjalanankami1.jpg",
          achievements: [
            "Starting business in the construction sector",
            "Initial focus on small to medium projects",
            "Building a reputation for quality and punctuality"
          ]
        },
        {
          id: 2,
          year: 2015,
          title: "ISO Certification",
          description: "The company successfully obtained ISO certification as proof of our commitment to international quality standards.",
          image: "/images/blog/isocertification.jpg",
          achievements: [
            "Obtained ISO 9001:2015 for quality management systems",
            "Obtained ISO 14001:2015 for environmental management systems",
            "Obtained OHSAS 18001:2007 for occupational health and safety"
          ]
        },
        {
          id: 3,
          year: 2019,
          title: "Service Expansion",
          description: "Expanded the scope of services to cover various types of construction and infrastructure projects.",
          image: "/images/blog/perluaslayanan.jpg",
          achievements: [
            "Development into residential and commercial building projects",
            "Additional infrastructure work services",
            "Strengthening the team with the addition of experienced experts"
          ]
        },
        {
          id: 4,
          year: 2021,
          title: "Major Projects",
          description: "Handled various major projects in various locations in Indonesia, demonstrating capabilities and trust from major clients.",
          image: "/images/servicesection-1.jpg",
          achievements: [
            "Interior & Furniture Club House Zora BSD City project with PT. Multi Bangun Persada",
            "Construction of Schools and Prayer Rooms in Parung, Bogor for World Assembly Moslem Youth (WAMY)",
            "Reflected Pond Lobby Grand Hyatt work in Jakarta with PT. Plaza Indonesia Realty, Tbk"
          ]
        },
        {
          id: 5,
          year: 2022,
          title: "Infrastructure Project Expansion",
          description: "Focus on developing infrastructure projects and more complex building construction.",
          image: "/images/blog/ekspansi.jpg",
          achievements: [
            "Cut & Fill, Land Clearing Project in Subang Industrial Estate with PT. Nusa Raya Cipta",
            "Construction of Condotel HAPPER Ciawi Tower A, B, C with PT. Lingga Dewata Agung",
            "Rehabilitation of Roads and Bridges on the Cipanas-Warung Banten Section with PT. Jaya Konstruksi MF, Tbk"
          ]
        },
        {
          id: 6,
          year: 2023,
          title: "Innovation and Sustainability",
          description: "Implementing the latest technology and sustainable construction practices in our projects.",
          image: "/images/blog/inovasi.jpg",
          achievements: [
            "Implementation of modern technology in project management",
            "Focus on environmentally friendly construction practices",
            "Increased efficiency and timeliness in project completion"
          ]
        }
      ],
      clickForDetails: "Click for details",
      clickToClose: "Click to close",
      mainAchievements: "Main Achievements:",
      certificationTitle: "Company Certifications",
      certificationDesc: "As proof of our commitment to quality, safety, and environmental management, PT Karya Bangun Semesta has obtained various important certifications.",
      certifications: [
        {
          id: 1,
          title: "ISO 9001:2015",
          description: "Quality Management System",
          image: "/images/iso/iso9001.png"
        },
        {
          id: 2,
          title: "ISO 14001:2015",
          description: "Environmental Management System",
          image: "/images/iso/iso14001.png"
        },
        {
          id: 3,
          title: "OHSAS 18001:2007",
          description: "Occupational Health and Safety Management System",
          image: "/images/iso/ohsas18001.png"
        },
        {
          id: 4,
          title: "KADIN Membership",
          description: "Indonesian Chamber of Commerce and Industry Membership",
          image: "/images/iso/kadin.png"
        }
      ],
      portfolioTitle: "Featured Projects Portfolio",
      portfolioDesc: "Throughout our journey, PT Karya Bangun Semesta has completed various important projects in various categories.",
      projects: [
        {
          id: 1,
          title: "Construction of Condotel HAPPER Ciawi Tower A, B, C",
          subBidang: "Building Construction",
          lokasi: "Ciawi - Bogor",
          pemberiTugas: "PT. Lingga Dewata Agung",
          noTanggal: "0501-KONTRAK-CH-CLDA-JAP-2022, July 20, 2022",
          image: "/images/bangunan/harperciawi.jpg"
        },
        {
          id: 2,
          title: "Cut & Fill, Land Clearing, Drainage Channel, and Land Development Project",
          subBidang: "Infrastructure and Land Development Works",
          lokasi: "Subang Industrial Area",
          pemberiTugas: "PT. Nusa Raya Cipta",
          noTanggal: "053-KONTRAK-KIS-NRC-KBS/2022, May 13, 2022",
          image: "/images/servicesection-3.jpg"
        },
        {
          id: 3,
          title: "Interior & Furniture Club House Zora BSD City",
          subBidang: "Interior",
          lokasi: "Tangerang",
          pemberiTugas: "PT. Multi Bangun Persada",
          noTanggal: "79/MBP-KBS/CH-2/2021, February 22, 2021",
          image: "/images/bangunan/bsdinterior.jpg"
        },
        {
          id: 4,
          title: "Rehabilitation of Roads and Bridges in Cipanas - Warung Banten Section",
          subBidang: "Road Rehabilitation Works",
          lokasi: "Banten",
          pemberiTugas: "PT. Jaya Konstruksi MF, Tbk",
          noTanggal: "JK/VSPK/02/1001, August 30, 2021",
          image: "/images/bangunan/jembatan.jpg"
        }
      ],
      viewAllProjects: "View All Projects",
      ourValues: "Our Values",
      qualityTitle: "Quality",
      qualityDesc: "We are committed to delivering high-quality work with international standards in every project we handle.",
      professionalismTitle: "Professionalism",
      professionalismDesc: "We conduct business with high standards of ethics and professionalism, creating trust with our clients and partners.",
      innovationTitle: "Innovation",
      innovationDesc: "We continuously strive to adopt the latest technology and methods to improve the efficiency and quality of our work on every project.",
      futureVisionTitle: "Future Vision",
      futureVisionDesc1: "Since its establishment in 2011, PT Karya Bangun Semesta has grown into a trusted construction company with various important projects throughout Indonesia. We are proud of the journey we have taken and the projects we have completed.",
      futureVisionDesc2: "Looking ahead, we are committed to continuing to grow and improve our services. Our vision is to become a leading construction company known for quality, innovation, and sustainability in every project we handle.",
      futureVisionDesc3: "With our extensive experience and professional team, we are ready to face new challenges and make a greater contribution to Indonesia's infrastructure development.",
      futureVisionImageAlt: "Company's Future Vision",
      futureVisionImageDesc: "Our professional team is ready to provide the best solutions for your project",
      ctaTitle: "Be Part of Our Journey",
      ctaDesc: "Interested in partnering with us or want to know more about our services? Contact us today.",
      contactUs: "Contact Us",
      ourServices: "Our Services",
      subBidang: "Work Sub-Field:",
      lokasi: "Location:",
      pemberiTugas: "Client:",
      noTanggal: "No/Date:"
    },
    id: {
      backToHome: "Kembali ke Beranda",
      pageTitle: "Perjalanan Kami",
      subtitle: "Sejarah dan pencapaian PT Karya Bangun Semesta sejak didirikan pada tahun 2011",
      companyHistoryTitle: "Sejarah Perusahaan",
      companyHistoryText1: "PT Karya Bangun Semesta memulai perjalanannya pada tahun 2011 sebagai perusahaan konstruksi dengan visi untuk memberikan kontribusi signifikan pada pembangunan infrastruktur Indonesia. Didirikan dengan komitmen untuk kualitas dan profesionalisme, perusahaan kami telah berkembang secara konsisten dan kini dikenal sebagai salah satu kontraktor terpercaya di industri.",
      companyHistoryText2: "Dalam perjalanannya, PT Karya Bangun Semesta telah menyelesaikan berbagai proyek penting di berbagai sektor, termasuk konstruksi bangunan, pengembangan infrastruktur, renovasi, dan pekerjaan interior. Berikut ini adalah tonggak penting dalam perjalanan kami.",
      timelineTitle: "Perjalanan PT Karya Bangun Semesta",
      milestones: [
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
      ],
      clickForDetails: "Klik untuk detil",
      clickToClose: "Klik untuk menutup",
      mainAchievements: "Pencapaian Utama:",
      certificationTitle: "Sertifikat Perusahaan",
      certificationDesc: "Sebagai bukti komitmen kami terhadap kualitas, keselamatan, dan pengelolaan lingkungan, PT Karya Bangun Semesta telah memperoleh berbagai sertifikasi penting.",
      certifications: [
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
      ],
      portfolioTitle: "Portofolio Proyek Unggulan",
      portfolioDesc: "Sepanjang perjalanan kami, PT Karya Bangun Semesta telah menyelesaikan berbagai proyek penting di berbagai kategori.",
      projects: [
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
      ],
      viewAllProjects: "Lihat Semua Proyek",
      ourValues: "Nilai-Nilai Kami",
      qualityTitle: "Kualitas",
      qualityDesc: "Kami berkomitmen untuk memberikan hasil pekerjaan berkualitas tinggi dengan standar internasional dalam setiap proyek yang kami tangani.",
      professionalismTitle: "Profesionalisme",
      professionalismDesc: "Kami menjalankan bisnis dengan standar etika dan profesionalisme tinggi, menciptakan kepercayaan dengan klien dan mitra kami.",
      innovationTitle: "Inovasi",
      innovationDesc: "Kami terus berupaya mengadopsi teknologi dan metode terbaru untuk meningkatkan efisiensi dan kualitas pekerjaan kami di setiap proyek.",
      futureVisionTitle: "Visi Masa Depan",
      futureVisionDesc1: "Sejak didirikan pada tahun 2011, PT Karya Bangun Semesta telah tumbuh menjadi perusahaan konstruksi yang terpercaya dengan berbagai proyek penting di seluruh Indonesia. Kami bangga dengan perjalanan yang telah kami lalui dan proyek-proyek yang telah kami selesaikan.",
      futureVisionDesc2: "Menatap ke depan, kami berkomitmen untuk terus berkembang dan meningkatkan layanan kami. Visi kami adalah menjadi perusahaan konstruksi terkemuka yang dikenal karena kualitas, inovasi, dan keberlanjutan dalam setiap proyek yang kami tangani.",
      futureVisionDesc3: "Dengan pengalaman luas dan tim profesional yang kami miliki, kami siap menghadapi tantangan-tantangan baru dan berkontribusi lebih besar dalam pembangunan infrastruktur Indonesia.",
      futureVisionImageAlt: "Visi Masa Depan Perusahaan",
      futureVisionImageDesc: "Tim profesional kami siap memberikan solusi terbaik untuk proyek Anda",
      ctaTitle: "Jadilah Bagian dari Perjalanan Kami",
      ctaDesc: "Tertarik untuk bermitra dengan kami atau ingin mengetahui lebih lanjut tentang layanan kami? Hubungi kami hari ini.",
      contactUs: "Hubungi Kami",
      ourServices: "Layanan Kami",
      subBidang: "Sub Bidang Pekerjaan:",
      lokasi: "Lokasi:",
      pemberiTugas: "Pemberi Tugas:",
      noTanggal: "No/Tanggal:"
    }
  };

  // Get current content based on language
  const currentContent = language === 'en' ? content.en : content.id;
  const historyMilestones = currentContent.milestones;
  const certifications = currentContent.certifications;
  const portfolioProjects = currentContent.projects;

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
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src="/images/blog/perjalanankami2.jpg" // Gambar untuk halaman sejarah
          alt={currentContent.pageTitle}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
              <button 
                onClick={() => router.push('/')} 
                className={`inline-flex items-center ${isDark ? 'bg-[#153969]/80' : 'bg-[#153969]/70'} backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 hover:bg-[#153969] transition-colors duration-300`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {currentContent.backToHome}
              </button>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                {currentContent.pageTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90"
              >
                {currentContent.subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-6 transition-colors duration-300`}
            >
              {currentContent.companyHistoryTitle}
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
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 transition-colors duration-300`}
            >
              {currentContent.companyHistoryText1}
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
            >
              {currentContent.companyHistoryText2}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-16 text-center transition-colors duration-300`}
            >
              {currentContent.timelineTitle}
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
                      ? `ring-2 ring-[#153969] ${isDark ? 'bg-gray-800' : 'bg-white'}` 
                      : isDark ? 'bg-gray-800' : 'bg-white'
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
                          openImageModal(milestone.image , milestone.title, milestone.description);
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
                        <Clock className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mr-2 transition-colors duration-300`} />
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>{milestone.year}</span>
                      </div>
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-300`}>{milestone.title}</h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>{milestone.description}</p>
                      
                      {activeEvent === milestone.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`mt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4 transition-colors duration-300`}
                        >
                          <h4 className={`font-semibold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>{currentContent.mainAchievements}</h4>
                          <ul className={`list-disc pl-5 space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                            {milestone.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                      
                      <div className={`mt-4 ${isDark ? 'text-blue-400' : 'text-[#153969]'} text-sm font-medium transition-colors duration-300`}>
                        {activeEvent === milestone.id ? currentContent.clickToClose : currentContent.clickForDetails}
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
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-6 transition-colors duration-300`}
            >
              {currentContent.certificationTitle}
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
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
            >
              {currentContent.certificationDesc}
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
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md text-center group cursor-pointer transition-colors duration-300`}
                onClick={() => openModal(cert)}
              >
                <div className={`h-64 relative mb-4 overflow-hidden rounded-md ${isDark ? 'bg-gray-700' : 'bg-white'} ${isDark ? 'border-gray-700' : 'border-gray-200'} border transition-colors duration-300`}>
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
                <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`}>{cert.title}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mt-2 transition-colors duration-300`}>{cert.description}</p>
              </motion.div>
            ))}
            
            <motion.div 
              variants={fadeInUp} 
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md text-center md:col-span-2 lg:col-span-3 group cursor-pointer transition-colors duration-300`}
              onClick={() => openModal(certifications[3])}
            >
              <div className={`h-64 relative mb-4 overflow-hidden rounded-md ${isDark ? 'bg-gray-700' : 'bg-white'} ${isDark ? 'border-gray-700' : 'border-gray-200'} border transition-colors duration-300`}>
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
              <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`}>{certifications[3].title}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mt-2 transition-colors duration-300`}>{certifications[3].description}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section className={`py-16 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-6 transition-colors duration-300`}
            >
              {currentContent.portfolioTitle}
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
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
            >
              {currentContent.portfolioDesc}
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
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden group transition-colors duration-300`}
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
                  <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}>{project.title}</h3>
                  <div className="mb-4">
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}><span className="font-semibold">{currentContent.subBidang}</span> {project.subBidang}</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}><span className="font-semibold">{currentContent.lokasi}</span> {project.lokasi}</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}><span className="font-semibold">{currentContent.pemberiTugas}</span> {project.pemberiTugas}</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}><span className="font-semibold">{currentContent.noTanggal}</span> {project.noTanggal}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link 
              href="/projects" 
              className={`inline-flex items-center px-6 py-3 ${isDark ? 'bg-[#153969] hover:bg-[#1e4d8d]' : 'bg-[#153969] hover:bg-[#0f2a4d]'} text-white rounded-md font-medium transition-colors shadow-lg`}
            >
              {currentContent.viewAllProjects}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Values and Vision */}
      <section className={`py-16 ${isDark ? 'bg-[#153969]/10' : 'bg-[#153969]'} text-white transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              {currentContent.ourValues}
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
                <h3 className="text-xl font-bold mb-2">{currentContent.qualityTitle}</h3>
                <p className="text-white/80">
                  {currentContent.qualityDesc}
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="p-6">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{currentContent.professionalismTitle}</h3>
                <p className="text-white/80">
                  {currentContent.professionalismDesc}
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="p-6">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{currentContent.innovationTitle}</h3>
                <p className="text-white/80">
                  {currentContent.innovationDesc}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision and Future */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
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
                <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-6 transition-colors duration-300`}>{currentContent.futureVisionTitle}</h2>
                <div className="w-16 h-1 bg-[#153969] mb-6"></div>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>
                  {currentContent.futureVisionDesc1}
                </p>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>
                  {currentContent.futureVisionDesc2}
                </p>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  {currentContent.futureVisionDesc3}
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp} 
                className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl group cursor-pointer"
                onClick={() => openImageModal("/images/berita7/gambar1-b7.jpg", currentContent.futureVisionImageAlt, currentContent.futureVisionImageDesc)}
              >
                <Image
                  src="/images/berita7/gambar1-b7.jpg" // Gambar untuk visi masa depan
                  alt={currentContent.futureVisionImageAlt}
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
      <section className={`py-16 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-6 transition-colors duration-300`}
            >
              {currentContent.ctaTitle}
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 transition-colors duration-300`}
            >
              {currentContent.ctaDesc}
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link 
                href="/contact" 
                className={`px-8 py-3 ${isDark ? 'bg-[#153969] hover:bg-[#1e4d8d]' : 'bg-[#153969] hover:bg-[#0f2a4d]'} text-white rounded-md font-medium transition-colors shadow-lg`}
              >
                {currentContent.contactUs}
              </Link>
              <Link 
                href="/services" 
                className={`px-8 py-3 ${
                  isDark 
                    ? 'border border-[#153969] text-blue-400 hover:bg-[#153969]/30' 
                    : 'border border-[#153969] text-[#153969] hover:bg-[#153969] hover:text-white'
                } rounded-md font-medium transition-colors duration-300`}
              >
                {currentContent.ourServices}
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
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative z-10 transition-colors duration-300`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`sticky top-0 z-10 flex justify-between items-center p-4 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b transition-colors duration-300`}>
                <h2 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`}>{selectedCert.title}</h2>
                <motion.button 
                  onClick={closeModal}
                  className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className={`h-6 w-6 ${isDark ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`} />
                </motion.button>
              </div>
              
              <div className={`overflow-y-auto p-6 pt-2 flex flex-col items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'} h-[calc(90vh-80px)] transition-colors duration-300`}>
                <div className="relative w-full h-[70vh] mb-4">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-center max-w-lg mt-4 transition-colors duration-300`}>
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