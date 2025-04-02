'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Download, FileText, ArrowLeft, Users, Award, Clock, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function ProfilPerusahaan() {
  const router = useRouter();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  // Content based on language
  const content = {
    en: {
      backToHome: "Back to Home",
      pageTitle: "Company Profile",
      subtitle: "Building the future with excellence and integrity since 2005",
      viewFullProfile: "View Full Company Profile",
      aboutTitle: "About KBS",
      aboutText1: "PT Karya Bersama Sejahtera (KBS) is a leading construction and engineering company in Indonesia. Founded in 2005, we have grown to become a trusted partner for various construction projects throughout the country, from commercial buildings to infrastructure development.",
      aboutText2: "With our commitment to quality, innovation, and sustainability, we strive to deliver excellence in every project we undertake, ensuring client satisfaction and contributing to Indonesia's development.",
      stats: {
        experience: {
          title: "18+ Years Experience",
          desc: "With over 18 years in the industry, we bring expertise and knowledge to every project."
        },
        iso: {
          title: "ISO Certified",
          desc: "We maintain the highest standards with ISO 9001, ISO 14001, and OHSAS 18001 certifications."
        },
        delivery: {
          title: "On-Time Delivery",
          desc: "We take pride in consistently meeting deadlines without compromising on quality."
        },
        national: {
          title: "National Projects",
          desc: "Successfully completed projects across Indonesia, from Java to other regions."
        }
      },
      vision: {
        title: "Our Vision",
        text: "To become a leading construction company in Indonesia, known for excellence, innovation, and integrity in every project we undertake."
      },
      mission: {
        title: "Our Mission",
        intro: "We are committed to:",
        points: [
          "Delivering high-quality construction projects safely, on time, and within budget",
          "Implementing innovative solutions and sustainable practices",
          "Building long-term relationships with clients based on trust and excellence",
          "Developing our employees and contributing positively to communities"
        ]
      },
      values: {
        title: "Our Core Values",
        items: {
          excellence: {
            title: "Excellence",
            desc: "We strive for excellence in every aspect of our work, consistently exceeding expectations and delivering superior results."
          },
          integrity: {
            title: "Integrity",
            desc: "We conduct our business with the highest standards of honesty, transparency, and ethical behavior, building trust with all stakeholders."
          },
          innovation: {
            title: "Innovation",
            desc: "We embrace new ideas, technologies, and methodologies to continuously improve and deliver cutting-edge solutions to our clients."
          },
          teamwork: {
            title: "Teamwork",
            desc: "We believe in the power of collaboration, working together across disciplines and with our clients to achieve common goals."
          },
          responsibility: {
            title: "Social Responsibility",
            desc: "We are committed to sustainable practices, safety, and giving back to the communities where we operate."
          }
        }
      },
      downloadSection: {
        title: "Download Our Company Profile",
        desc: "For more detailed information about our company, services, and previous projects, download our comprehensive company profile document.",
        viewOnline: "View Online",
        download: "Download PDF"
      },
      journey: {
        title: "Our Journey",
        subtitle: "Key milestones in our company's growth and development",
        milestones: [
          {
            year: "2005",
            title: "Company Founded",
            desc: "KBS was established with a vision to become a leading construction company in Indonesia."
          },
          {
            year: "2010",
            title: "First Major Project",
            desc: "Completed our first major commercial building project in Jakarta, establishing our reputation for quality and reliability."
          },
          {
            year: "2015",
            title: "ISO Certification",
            desc: "Achieved ISO 9001 certification, demonstrating our commitment to quality management systems."
          },
          {
            year: "2018",
            title: "Expansion to Eastern Indonesia",
            desc: "Opened our first office in Makassar to serve clients in Eastern Indonesia and work on infrastructure projects in the region."
          },
          {
            year: "2020",
            title: "Pandemic Adaptation",
            desc: "Successfully adapted to the challenges of the global pandemic, implementing innovative safety protocols and digital solutions."
          },
          {
            year: "2023",
            title: "Green Building Initiative",
            desc: "Launched our commitment to sustainable construction with the completion of our first certified green building project."
          },
          {
            year: "Now",
            title: "Looking to the Future",
            desc: "Continuing to grow and innovate, with a focus on sustainable building practices and expanding our service offerings."
          }
        ]
      },
      cta: {
        title: "Partner with KBS for Your Next Project",
        desc: "Ready to discuss your construction needs? Our team is ready to help you bring your vision to life with expertise, quality, and dedication.",
        contact: "Contact Us",
        services: "Our Services"
      }
    },
    id: {
      backToHome: "Kembali ke Beranda",
      pageTitle: "Profil Perusahaan",
      subtitle: "Membangun masa depan dengan keunggulan dan integritas sejak 2005",
      viewFullProfile: "Lihat Profil Perusahaan Lengkap",
      aboutTitle: "Tentang KBS",
      aboutText1: "PT Karya Bersama Sejahtera (KBS) adalah perusahaan konstruksi dan teknik terkemuka di Indonesia. Didirikan pada tahun 2005, kami telah berkembang menjadi mitra terpercaya untuk berbagai proyek konstruksi di seluruh negeri, mulai dari bangunan komersial hingga pengembangan infrastruktur.",
      aboutText2: "Dengan komitmen kami terhadap kualitas, inovasi, dan keberlanjutan, kami berusaha memberikan keunggulan dalam setiap proyek yang kami lakukan, memastikan kepuasan klien dan berkontribusi pada pembangunan Indonesia.",
      stats: {
        experience: {
          title: "18+ Tahun Pengalaman",
          desc: "Dengan lebih dari 18 tahun di industri, kami membawa keahlian dan pengetahuan untuk setiap proyek."
        },
        iso: {
          title: "Bersertifikat ISO",
          desc: "Kami mempertahankan standar tertinggi dengan sertifikasi ISO 9001, ISO 14001, dan OHSAS 18001."
        },
        delivery: {
          title: "Pengiriman Tepat Waktu",
          desc: "Kami bangga dapat memenuhi tenggat waktu secara konsisten tanpa mengorbankan kualitas."
        },
        national: {
          title: "Proyek Nasional",
          desc: "Berhasil menyelesaikan proyek di seluruh Indonesia, dari Jawa hingga daerah lainnya."
        }
      },
      vision: {
        title: "Visi Kami",
        text: "Menjadi perusahaan konstruksi terkemuka di Indonesia, dikenal karena keunggulan, inovasi, dan integritas dalam setiap proyek yang kami lakukan."
      },
      mission: {
        title: "Misi Kami",
        intro: "Kami berkomitmen untuk:",
        points: [
          "Memberikan proyek konstruksi berkualitas tinggi dengan aman, tepat waktu, dan sesuai anggaran",
          "Menerapkan solusi inovatif dan praktik berkelanjutan",
          "Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan dan keunggulan",
          "Mengembangkan karyawan kami dan berkontribusi positif pada masyarakat"
        ]
      },
      values: {
        title: "Nilai-Nilai Inti Kami",
        items: {
          excellence: {
            title: "Keunggulan",
            desc: "Kami berusaha untuk mencapai keunggulan dalam setiap aspek pekerjaan kami, secara konsisten melebihi harapan dan memberikan hasil yang unggul."
          },
          integrity: {
            title: "Integritas",
            desc: "Kami menjalankan bisnis kami dengan standar kejujuran, transparansi, dan perilaku etis tertinggi, membangun kepercayaan dengan semua pemangku kepentingan."
          },
          innovation: {
            title: "Inovasi",
            desc: "Kami merangkul ide, teknologi, dan metodologi baru untuk terus meningkatkan dan memberikan solusi terdepan kepada klien kami."
          },
          teamwork: {
            title: "Kerja Sama Tim",
            desc: "Kami percaya pada kekuatan kolaborasi, bekerja sama di seluruh disiplin dan dengan klien kami untuk mencapai tujuan bersama."
          },
          responsibility: {
            title: "Tanggung Jawab Sosial",
            desc: "Kami berkomitmen pada praktik berkelanjutan, keselamatan, dan memberikan kembali kepada masyarakat di mana kami beroperasi."
          }
        }
      },
      downloadSection: {
        title: "Unduh Profil Perusahaan Kami",
        desc: "Untuk informasi lebih rinci tentang perusahaan kami, layanan, dan proyek-proyek sebelumnya, unduh dokumen profil perusahaan kami yang komprehensif.",
        viewOnline: "Lihat Online",
        download: "Unduh PDF"
      },
      journey: {
        title: "Perjalanan Kami",
        subtitle: "Tonggak penting dalam pertumbuhan dan perkembangan perusahaan kami",
        milestones: [
          {
            year: "2005",
            title: "Perusahaan Didirikan",
            desc: "KBS didirikan dengan visi untuk menjadi perusahaan konstruksi terkemuka di Indonesia."
          },
          {
            year: "2010",
            title: "Proyek Besar Pertama",
            desc: "Menyelesaikan proyek bangunan komersial besar pertama kami di Jakarta, membangun reputasi kami untuk kualitas dan keandalan."
          },
          {
            year: "2015",
            title: "Sertifikasi ISO",
            desc: "Meraih sertifikasi ISO 9001, menunjukkan komitmen kami terhadap sistem manajemen mutu."
          },
          {
            year: "2018",
            title: "Ekspansi ke Indonesia Timur",
            desc: "Membuka kantor pertama kami di Makassar untuk melayani klien di Indonesia Timur dan mengerjakan proyek infrastruktur di wilayah tersebut."
          },
          {
            year: "2020",
            title: "Adaptasi Pandemi",
            desc: "Berhasil beradaptasi dengan tantangan pandemi global, menerapkan protokol keselamatan inovatif dan solusi digital."
          },
          {
            year: "2023",
            title: "Inisiatif Bangunan Hijau",
            desc: "Meluncurkan komitmen kami untuk konstruksi berkelanjutan dengan penyelesaian proyek bangunan bersertifikat hijau pertama kami."
          },
          {
            year: "Sekarang",
            title: "Menatap Masa Depan",
            desc: "Terus tumbuh dan berinovasi, dengan fokus pada praktik bangunan berkelanjutan dan memperluas penawaran layanan kami."
          }
        ]
      },
      cta: {
        title: "Bermitra dengan KBS untuk Proyek Anda Berikutnya",
        desc: "Siap untuk membahas kebutuhan konstruksi Anda? Tim kami siap membantu Anda mewujudkan visi Anda dengan keahlian, kualitas, dan dedikasi.",
        contact: "Hubungi Kami",
        services: "Layanan Kami"
      }
    }
  };

  // Get content based on current language
  const currentContent = language === 'en' ? content.en : content.id;
  
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
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/blog/comprof.jpg"
          alt="KBS Company Profile"
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
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                {currentContent.subtitle}
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
                  className="inline-flex items-center bg-[#153969] hover:bg-[#1e4d8d] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  {currentContent.viewFullProfile}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
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
              {currentContent.aboutTitle}
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
              {currentContent.aboutText1}
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
            >
              {currentContent.aboutText2}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Cards Section */}
      <section className={`py-12 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {/* Experience Card */}
            <motion.div 
              variants={fadeInUp}
              className={`${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700/50' 
                  : 'bg-white border-gray-200/50'
              } rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border`}
            >
              <Users className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                {currentContent.stats.experience.title}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                {currentContent.stats.experience.desc}
              </p>
            </motion.div>

            {/* ISO Card */}
            <motion.div 
              variants={fadeInUp}
              className={`${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700/50' 
                  : 'bg-white border-gray-200/50'
              } rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border`}
            >
              <Award className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                {currentContent.stats.iso.title}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                {currentContent.stats.iso.desc}
              </p>
            </motion.div>

            {/* Delivery Card */}
            <motion.div 
              variants={fadeInUp}
              className={`${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700/50' 
                  : 'bg-white border-gray-200/50'
              } rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border`}
            >
              <Clock className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                {currentContent.stats.delivery.title}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                {currentContent.stats.delivery.desc}
              </p>
            </motion.div>

            {/* National Projects Card */}
            <motion.div 
              variants={fadeInUp}
              className={`${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700/50' 
                  : 'bg-white border-gray-200/50'
              } rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border`}
            >
              <Globe className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-4 transition-colors duration-300`} />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                {currentContent.stats.national.title}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                {currentContent.stats.national.desc}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                <motion.h2 
                  variants={fadeInUp}
                  className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
                >
                  {currentContent.vision.title}
                </motion.h2>
                <motion.div 
                  variants={fadeInUp}
                  className="w-16 h-1 bg-[#153969] mb-6"
                />
                <motion.p 
                  variants={fadeInUp}
                  className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 transition-colors duration-300`}
                >
                  {currentContent.vision.text}
                </motion.p>

                <motion.h2 
                  variants={fadeInUp}
                  className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
                >
                  {currentContent.mission.title}
                </motion.h2>
                <motion.div 
                  variants={fadeInUp}
                  className="w-16 h-1 bg-[#153969] mb-6"
                />
                <motion.p 
                  variants={fadeInUp}
                  className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}
                >
                  {currentContent.mission.intro}
                </motion.p>
                <motion.ul 
                  variants={fadeInUp}
                  className={`list-disc pl-6 space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 transition-colors duration-300`}
                >
                  {currentContent.mission.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className={`${
                isDark 
                  ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/70 shadow-lg' 
                  : 'bg-gray-50/80 backdrop-blur-xl border-gray-200/70 shadow-lg'
              } p-6 md:p-8 rounded-lg border transition-all duration-300`}
            >
              <motion.h2 
                variants={fadeInUp}
                className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
              >
                {currentContent.values.title}
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-16 h-1 bg-[#153969] mb-6"
              />

              <div className="space-y-4 md:space-y-6">
                {/* Excellence */}
                <motion.div 
                  variants={fadeInUp} 
                  className={`border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200'} pb-4 transition-colors duration-300`}
                >
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('excellence')}>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                      {currentContent.values.items.excellence.title}
                    </h3>
                    {activeSection === 'excellence' ? (
                      <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    )}
                  </div>
                  {activeSection === 'excellence' && (
                    <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                      {currentContent.values.items.excellence.desc}
                    </p>
                  )}
                </motion.div>

                {/* Integrity */}
                <motion.div 
                  variants={fadeInUp} 
                  className={`border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200'} pb-4 transition-colors duration-300`}
                >
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('integrity')}>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                      {currentContent.values.items.integrity.title}
                    </h3>
                    {activeSection === 'integrity' ? (
                      <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    )}
                  </div>
                  {activeSection === 'integrity' && (
                    <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                      {currentContent.values.items.integrity.desc}
                    </p>
                  )}
                </motion.div>

                {/* Innovation */}
                <motion.div 
                  variants={fadeInUp} 
                  className={`border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200'} pb-4 transition-colors duration-300`}
                >
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('innovation')}>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                      {currentContent.values.items.innovation.title}
                    </h3>
                    {activeSection === 'innovation' ? (
                      <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    )}
                  </div>
                  {activeSection === 'innovation' && (
                    <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                      {currentContent.values.items.innovation.desc}
                    </p>
                  )}
                </motion.div>

                {/* Teamwork */}
                <motion.div 
                  variants={fadeInUp} 
                  className={`border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200'} pb-4 transition-colors duration-300`}
                >
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('teamwork')}>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                      {currentContent.values.items.teamwork.title}
                    </h3>
                    {activeSection === 'teamwork' ? (
                      <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    )}
                  </div>
                  {activeSection === 'teamwork' && (
                    <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                      {currentContent.values.items.teamwork.desc}
                    </p>
                  )}
                </motion.div>

                {/* Social Responsibility */}
                <motion.div variants={fadeInUp}>
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('responsibility')}>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                      {currentContent.values.items.responsibility.title}
                    </h3>
                    {activeSection === 'responsibility' ? (
                      <ChevronUp className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`} />
                    )}
                  </div>
                  {activeSection === 'responsibility' && (
                    <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                      {currentContent.values.items.responsibility.desc}
                    </p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Section */}
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
              {currentContent.downloadSection.title}
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              {currentContent.downloadSection.desc}
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
                className="inline-flex items-center bg-white text-[#153969] hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                {currentContent.downloadSection.viewOnline}
              </a>
              <a 
                href="/documents/KBS-Profil-Perusahaan.pdf" 
                download
                className="inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                <Download className="mr-2 h-5 w-5" />
                {currentContent.downloadSection.download}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
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
                className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-3 transition-colors duration-300`}
              >
                {currentContent.journey.title}
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-20 h-1 bg-[#153969] mx-auto mb-6"
              />
              <motion.p
                variants={fadeInUp}
                className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}
              >
                {currentContent.journey.subtitle}
              </motion.p>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 ${isDark ? 'bg-[#153969]/30' : 'bg-[#153969]/20'} transition-colors duration-300`}></div>
              
              <div className="space-y-12">
                {currentContent.journey.milestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative"
                  >
                    <div className="flex items-center">
                      {/* Left side (even items) */}
                      {index % 2 === 0 && (
                        <div className="flex flex-col items-end w-1/2 pr-8">
                          <div className="text-right">
                            <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`}>{milestone.year}</h3>
                            <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>{milestone.title}</h4>
                            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>{milestone.desc}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Center dot */}
                      <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} z-10 transition-colors duration-300`}></div>
                      
                      {/* Right side (odd items) */}
                      {index % 2 === 1 && (
                        <div className="w-1/2 pr-8"></div>
                      )}
                      {index % 2 === 0 && (
                        <div className="w-1/2 pl-8"></div>
                      )}
                      {index % 2 === 1 && (
                        <div className="flex flex-col w-1/2 pl-8">
                          <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`}>{milestone.year}</h3>
                          <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>{milestone.title}</h4>
                          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>{milestone.desc}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
              {currentContent.cta.title}
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8 transition-colors duration-300`}
            >
              {currentContent.cta.desc}
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/contact" className={`px-8 py-3 ${isDark ? 'bg-[#153969] hover:bg-[#1e4d8d]' : 'bg-[#153969] hover:bg-[#0f2a4d]'} text-white rounded-lg font-medium transition-colors duration-300 shadow-lg`}>
                {currentContent.cta.contact}
              </Link>
              <Link href="/services" className={`px-8 py-3 ${
                isDark 
                  ? 'border border-[#153969] text-blue-400 hover:bg-[#153969]/30' 
                  : 'border border-[#153969] text-[#153969] hover:bg-[#153969] hover:text-white'
              } rounded-lg font-medium transition-colors duration-300`}>
                {currentContent.cta.services}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}