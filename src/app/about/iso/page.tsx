'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ZoomIn, Award, BookOpen, FileText, Check, 
  ChevronUp, ChevronDown, ExternalLink, Users,
  ChevronLeft
} from 'lucide-react';

const CertificationsPage = () => {
  // State for selected category and modal
  const [activeCategory, setActiveCategory] = useState<string>('iso');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      } 
    }
  };
  
  // Certification categories
  type Category = {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
  };
  
  const categories: Category[] = [
    { 
      id: 'iso', 
      name: 'Sertifikasi ISO', 
      icon: <Award className="h-5 w-5" />,
      description: 'Standar internasional yang memastikan kualitas, keamanan dan efisiensi produk, jasa dan sistem'
    },
    { 
      id: 'legal', 
      name: 'Dokumen Legal', 
      icon: <FileText className="h-5 w-5" />,
      description: 'Dokumen resmi yang menjamin keabsahan dan legalitas operasional perusahaan'
    },
    { 
      id: 'membership', 
      name: 'Keanggotaan', 
      icon: <BookOpen className="h-5 w-5" />,
      description: 'Pengakuan keanggotaan dalam asosiasi industri dan organisasi terkait konstruksi'
    }
  ];
  
  // Certification type
  type Certification = {
    id: number;
    title: string;
    image: string;
    description: string;
    category: string;
  };
  
  // All certifications
  const certifications: Certification[] = [
    // ISO Certifications
    {
      id: 1,
      title: 'ISO 14001 : 2015',
      image: '/images/iso/iso14001.png',
      description: 'Standar Sistem Manajemen Lingkungan',
      category: 'iso'
    },
    {
      id: 2,
      title: 'ISO 9001 : 2015',
      image: '/images/iso/iso9001.png',
      description: 'Standar Sistem Manajemen Mutu',
      category: 'iso'
    },
    {
      id: 3,
      title: 'OHSAS 18001 : 2007',
      image: '/images/iso/ohsas18001.png',
      description: 'Standar Sistem Manajemen Keselamatan dan Kesehatan Kerja',
      category: 'iso'
    },
    
    // Legal Documents
    {
      id: 4,
      title: 'SBUJK-0361168',
      image: '/images/iso/sbujk0361168.png',
      description: 'Sertifikat Badan Usaha Jasa Konstruksi',
      category: 'legal'
    },
    {
      id: 5,
      title: 'SBUJK-0361167',
      image: '/images/iso/sbujk0361167.png',
      description: 'Sertifikat Badan Usaha Jasa Konstruksi',
      category: 'legal'
    },
    {
      id: 6,
      title: 'SIUJK Perusahaan',
      image: '/images/iso/siujk.png',
      description: 'Surat Izin Usaha Jasa Konstruksi',
      category: 'legal'
    },
    
    // Membership Certifications
    {
      id: 7,
      title: 'KADIN Perusahaan',
      image: '/images/iso/kadin.png',
      description: 'Sertifikat Keanggotaan Kamar Dagang dan Industri',
      category: 'membership'
    },
    {
      id: 8,
      title: 'Anggota Ketenagakerjaan BPJS',
      image: '/images/iso/bpjs.png',
      description: 'Sertifikat Keanggotaan BPJS Ketenagakerjaan',
      category: 'membership'
    },
    {
      id: 9,
      title: 'GAPENSI Perusahaan',
      image: '/images/iso/gapensi.png',
      description: 'Gabungan Pelaksana Konstruksi Nasional Indonesia',
      category: 'membership'
    }
  ];

  // FAQ List
  const faqList = [
    {
      id: 1,
      question: 'Mengapa sertifikasi penting bagi perusahaan konstruksi?',
      answer: 'Sertifikasi memberikan jaminan kepada klien bahwa perusahaan konstruksi memiliki kompetensi, kualifikasi, dan kepatuhan terhadap standar industri. Sertifikasi juga berperan penting dalam mengikuti tender proyek pemerintah maupun swasta, meningkatkan reputasi perusahaan, dan memastikan praktik bisnis yang berkelanjutan.'
    },
    {
      id: 2,
      question: 'Apa saja manfaat dari sertifikasi ISO bagi perusahaan?',
      answer: 'Sertifikasi ISO menawarkan berbagai manfaat, termasuk peningkatan efisiensi operasional, pengurangan pemborosan dan kesalahan, peningkatan kepuasan pelanggan, keunggulan kompetitif dalam tender, akses lebih mudah ke pasar global, pengurangan risiko kecelakaan kerja, dan pengelolaan dampak lingkungan yang lebih baik.'
    },
    {
      id: 3,
      question: 'Bagaimana proses memperoleh sertifikasi untuk perusahaan konstruksi?',
      answer: 'Proses memperoleh sertifikasi umumnya melibatkan beberapa tahap: persiapan dokumen yang diperlukan, pemenuhan persyaratan administratif, implementasi sistem manajemen sesuai standar yang dituju, audit internal, audit eksternal oleh badan sertifikasi, perbaikan ketidaksesuaian jika ada, dan akhirnya penerbitan sertifikat. Proses ini memerlukan komitmen manajemen dan partisipasi seluruh karyawan.'
    },
    {
      id: 4,
      question: 'Berapa lama masa berlaku sertifikasi?',
      answer: 'Masa berlaku sertifikasi bervariasi tergantung jenis sertifikat. Sertifikasi ISO biasanya berlaku selama 3 tahun dengan audit pengawasan tahunan. Sertifikasi SBUJK biasanya berlaku 3 tahun. Sementara keanggotaan asosiasi industri seperti GAPENSI umumnya perlu diperpanjang setiap tahun. Penting untuk memperhatikan tanggal berlaku dan mempersiapkan proses perpanjangan sebelum masa berlaku habis.'
    },
    {
      id: 5,
      question: 'Mengapa PT Karya Bangun Semesta memprioritaskan sertifikasi?',
      answer: 'PT Karya Bangun Semesta memprioritaskan sertifikasi sebagai bagian dari komitmen kami untuk memberikan layanan berkualitas tertinggi kepada klien. Kami percaya bahwa standar dan sertifikasi bukan sekadar formalitas, tetapi merupakan fondasi dari budaya kualitas, keselamatan, dan efisiensi. Dengan mempertahankan berbagai sertifikasi, kami memastikan bahwa setiap proyek dilaksanakan dengan standar profesional tertinggi.'
    }
  ];


  // Benefits of having certifications
  const certificationBenefits = [
    {
      title: 'Keunggulan Kompetitif',
      description: 'Meningkatkan daya saing perusahaan dalam tender proyek pemerintah maupun swasta',
      icon: <Award className="h-8 w-8 md:h-10 md:w-10" />
    },
    {
      title: 'Jaminan Kualitas',
      description: 'Memastikan standar kualitas yang konsisten dalam setiap proyek yang dikerjakan',
      icon: <Check className="h-8 w-8 md:h-10 md:w-10" />
    },
    {
      title: 'Akses Proyek',
      description: 'Memperluas akses ke proyek-proyek besar yang mensyaratkan sertifikasi tertentu',
      icon: <FileText className="h-8 w-8 md:h-10 md:w-10" />
    },
    {
      title: 'Kepercayaan Klien',
      description: 'Meningkatkan kepercayaan klien dan pemangku kepentingan terhadap perusahaan',
      icon: <Users className="h-8 w-8 md:h-10 md:w-10" />
    }
  ];
  
  // Open modal with selected certification
  const openModal = (cert: Certification) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable scrolling
    document.body.style.overflow = 'unset';
  };

  // Toggle FAQ
  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };
  
  // Filter certifications by active category
  const filteredCertifications = certifications.filter(cert => cert.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tombol kembali ke beranda - Ditambahkan di bagian atas */}
      <div className="sticky top-0 z-40 bg-[#153969] text-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center py-3 text-white text-sm font-medium">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Navbar dengan background biru - Responsive text size */}
      <div className="bg-[#153969] text-white relative">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-24 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Sertifikasi & Legalitas
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto">
            Komitmen kami terhadap kualitas, keselamatan, dan standar lingkungan
          </p>
        </div>
        {/* Wave effect at bottom - Fix, sekarang selalu terlihat */}
        <div className="absolute -bottom-1 left-0 right-0 h-16 overflow-hidden z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path fill="#f9fafb" fillOpacity="1" d="M0,64L80,85.3C160,107,320,149,480,154.7C640,160,800,128,960,122.7C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="bg-gray-50 py-6 md:py-8 relative z-20 -mt-2">
        <div className="container mx-auto px-4 md:px-8">
          {/* Why Certifications Matter Section - Responsive layout */}
          <section className="mb-8 md:mb-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-[#153969] text-white p-5 md:p-8 flex items-center">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Mengapa Sertifikasi Penting</h2>
                    <p className="text-sm md:text-base mb-4 md:mb-6">
                      Dalam industri konstruksi, sertifikasi bukan sekadar formalitas. Sertifikasi merupakan bukti komitmen kami terhadap standar tertinggi dalam kualitas, keselamatan, dan praktik bisnis yang berkelanjutan.
                    </p>
                    <ul className="space-y-2 text-sm md:text-base">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-1 flex-shrink-0" />
                        <span>Jaminan standar kualitas konsisten</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-1 flex-shrink-0" />
                        <span>Kepatuhan terhadap regulasi nasional dan internasional</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-1 flex-shrink-0" />
                        <span>Persyaratan untuk mengikuti tender proyek besar</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-1 flex-shrink-0" />
                        <span>Peningkatan efisiensi dan pengurangan pemborosan</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2 p-5 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-[#153969] mb-4">Manfaat Sertifikasi bagi Klien Kami</h3>
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {certificationBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 p-2 md:p-3 rounded-full text-blue-600 mr-3">
                          {benefit.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-base">{benefit.title}</h4>
                          <p className="text-xs md:text-sm text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Link href="/contact" className="inline-flex items-center text-[#153969] text-sm md:text-base font-medium hover:underline">
                      Hubungi kami untuk informasi lebih lanjut
                      <ExternalLink className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Category Selector - Mobile scrollable dengan border */}
          <div className="flex overflow-x-auto pb-2 mb-6 md:mb-8 hide-scrollbar">
            <div className="inline-flex space-x-2 rounded-xl bg-white p-1 shadow-sm mx-auto border border-gray-200">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-[#153969] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`mr-1 md:mr-2 ${activeCategory === category.id ? 'text-white' : 'text-[#153969]'}`}>
                    {category.icon}
                  </div>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Certifications Grid - Responsive columns dengan border dan shadow yang lebih jelas */}
          <div className="max-w-6xl mx-auto mb-10 md:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.5, 
                        delay: index * 0.1 
                      } 
                    }
                  }}
                  className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-all duration-300 flex flex-col cursor-pointer touch-manipulation"
                  onClick={() => openModal(cert)}
                >
                  <div className="relative h-48 md:h-64 bg-gray-50 flex items-center justify-center border-b flex-grow group">
                    <div className="relative h-40 md:h-56 w-full max-w-[180px] md:max-w-[220px] mx-auto transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#153969]/0 flex items-center justify-center transition-all duration-300 group-hover:bg-[#153969]/10">
                      <ZoomIn className="text-white opacity-0 transform scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
                    </div>
                  </div>
                  <div className="p-3 md:p-4 text-center">
                    <h3 className="text-base md:text-lg font-bold text-[#153969] mb-1">{cert.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{cert.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Section - Mobile friendly */}
          <section className="mb-10 md:mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6 md:mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-[#153969] mb-2 md:mb-3">Pertanyaan Umum Tentang Sertifikasi</h2>
                <p className="text-sm md:text-base text-gray-700">
                  Berikut beberapa jawaban atas pertanyaan yang sering diajukan tentang sertifikasi dan legalitas dalam industri konstruksi.
                </p>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {faqList.map((faq) => (
                  <div 
                    key={faq.id} 
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="flex justify-between items-center w-full p-3 md:p-4 text-left"
                    >
                      <h3 className="font-medium text-sm md:text-base text-gray-800 pr-2">{faq.question}</h3>
                      {openFaq === faq.id ? 
                        <ChevronUp className="h-4 w-4 md:h-5 md:w-5 text-[#153969] flex-shrink-0" /> :
                        <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-500 flex-shrink-0" />
                      }
                    </button>
                    
                    <AnimatePresence>
                      {openFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 md:p-4 pt-0 border-t border-gray-200 text-gray-700 text-xs md:text-sm">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-8 md:mt-12 text-center"
          >
            <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 max-w-3xl mx-auto">
              Sertifikasi dan legalitas ini menjadi bukti komitmen kami dalam menjaga kualitas pelayanan, kepatuhan terhadap regulasi, serta memastikan keselamatan dan kesehatan kerja dalam setiap proyek yang kami kerjakan.
            </p>
            <motion.a 
              href="/contact" 
              className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-[#153969] hover:bg-[#0f2a4d] text-white rounded-md font-medium transition-colors shadow-md text-sm md:text-base"
              whileTap={{ scale: 0.95 }}
            >
              Hubungi Kami untuk Informasi Lebih Lanjut
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Modal for Certificate Preview - Enhanced for mobile */}
      <AnimatePresence>
        {isModalOpen && selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4" onClick={closeModal}>
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
              className="bg-white rounded-xl w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-hidden relative z-10 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-3 md:p-4 bg-white/90 backdrop-blur-sm border-b border-gray-200">
                <h2 className="text-lg md:text-xl font-bold text-[#153969]">{selectedCert.title}</h2>
                <motion.button 
                  onClick={closeModal}
                  className="p-1 md:p-2 rounded-full hover:bg-gray-100 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
                </motion.button>
              </div>
              
              <div className="overflow-y-auto p-4 md:p-6 flex flex-col items-center justify-center bg-gray-50 h-[calc(90vh-80px)]">
                <div className="relative w-full h-[60vh] md:h-[70vh] mb-3 md:mb-4">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-xs md:text-sm text-gray-700 text-center max-w-lg mt-2 md:mt-4">
                  {selectedCert.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tombol kembali ke home yang selalu muncul di bawah */}
      <div className="fixed bottom-4 right-4 z-40">
        <Link 
          href="/" 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#153969] text-white shadow-lg hover:bg-[#0f2a4d] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </Link>
      </div>

      {/* CSS for hiding scrollbar on mobile */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Additional touch optimization for mobile */
        .touch-manipulation {
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
};

export default CertificationsPage;