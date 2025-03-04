'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

// Data berita yang relevan dengan konstruksi di Indonesia
const insightPosts = [
  {
    id: 1,
    title: "Proyek Infrastruktur Prioritas di Jakarta Timur 2024",
    excerpt: "Tinjauan proyek-proyek strategis di kawasan Jakarta Timur yang mendukung perkembangan ekonomi lokal.",
    category: "Proyek",
    image: "/images/jakarta-infrastructure.jpg",
    date: "12 Maret 2024",
    readTime: "5 menit",
    slug: "proyek-infrastruktur-jakarta-timur-2024"
  },
  {
    id: 2,
    title: "Strategi Menghadapi Kenaikan Harga Material Konstruksi",
    excerpt: "Pendekatan praktis mengoptimalkan biaya proyek di tengah fluktuasi harga material bangunan.",
    category: "Manajemen",
    image: "/images/construction-materials.jpg",
    date: "28 Feb 2024",
    readTime: "4 menit",
    slug: "strategi-kenaikan-harga-material-2024"
  },
  {
    id: 3,
    title: "Renovasi Bangunan Komersial dengan Tetap Beroperasi",
    excerpt: "Teknik renovasi yang meminimalkan gangguan operasional pada gedung komersial yang aktif.",
    category: "Layanan",
    image: "/images/commercial-renovation.jpg",
    date: "15 Feb 2024",
    readTime: "6 menit",
    slug: "renovasi-tanpa-ganggu-operasional"
  },
  {
    id: 4,
    title: "Perubahan Regulasi IMB dan Dampaknya pada Konstruksi",
    excerpt: "Analisis perubahan peraturan perizinan bangunan terbaru di Indonesia dan strategi adaptasinya.",
    category: "Regulasi",
    image: "/images/building-permit.jpg",
    date: "5 Feb 2024",
    readTime: "7 menit",
    slug: "perubahan-regulasi-imb-2024"
  },
  {
    id: 5,
    title: "Teknologi Pemantauan Jarak Jauh untuk Pengelolaan Proyek",
    excerpt: "Solusi teknologi terkini untuk mengawasi dan mengelola beberapa proyek konstruksi secara bersamaan.",
    category: "Teknologi",
    image: "/images/remote-monitoring.jpg",
    date: "25 Jan 2024",
    readTime: "5 menit",
    slug: "teknologi-pemantauan-jarak-jauh-konstruksi"
  },
  {
    id: 6,
    title: "Pembangunan Gedung Ramah Lingkungan: Tren dan Standar",
    excerpt: "Perkembangan terkini dalam konstruksi berkelanjutan dan sertifikasi green building di Indonesia.",
    category: "Proyek",
    image: "/images/green-building.jpg",
    date: "18 Jan 2024",
    readTime: "6 menit",
    slug: "pembangunan-gedung-ramah-lingkungan"
  },
  {
    id: 7,
    title: "Manajemen Risiko Proyek Konstruksi Skala Menengah",
    excerpt: "Pendekatan sistematis untuk mengidentifikasi dan memitigasi risiko dalam proyek konstruksi.",
    category: "Manajemen",
    image: "/images/risk-management.jpg",
    date: "10 Jan 2024",
    readTime: "5 menit",
    slug: "manajemen-risiko-proyek-konstruksi"
  },
  {
    id: 8,
    title: "Jasa Konsultasi Pra-Konstruksi untuk Optimalisasi Anggaran",
    excerpt: "Bagaimana perencanaan matang sejak awal dapat menghemat biaya dan waktu pelaksanaan proyek.",
    category: "Layanan",
    image: "/images/pre-construction.jpg",
    date: "5 Jan 2024",
    readTime: "4 menit",
    slug: "jasa-konsultasi-pra-konstruksi"
  },
  {
    id: 9,
    title: "Penyesuaian Standar SNI untuk Bahan Bangunan 2024",
    excerpt: "Perubahan regulasi standar nasional untuk material konstruksi dan implikasinya pada industri.",
    category: "Regulasi",
    image: "/images/building-standards.jpg",
    date: "28 Des 2023",
    readTime: "6 menit",
    slug: "perubahan-standar-sni-bahan-bangunan"
  },
  {
    id: 10,
    title: "Implementasi BIM dalam Proyek Renovasi dan Retrofit",
    excerpt: "Penggunaan Building Information Modeling untuk meningkatkan akurasi dan efisiensi proyek renovasi.",
    category: "Teknologi",
    image: "/images/bim-technology.jpg",
    date: "15 Des 2023",
    readTime: "7 menit",
    slug: "implementasi-bim-proyek-renovasi"
  }
];

// Kategori yang disederhanakan - hanya yang paling penting
const categories = ["Semua", "Proyek", "Layanan", "Manajemen", "Regulasi", "Teknologi"];

const BlogNewsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Filter berita berdasarkan kategori
  const filteredPosts = activeCategory === "Semua" 
    ? insightPosts
    : insightPosts.filter(post => post.category === activeCategory);

  // Jumlah slide berdasarkan konten yang terfilter (2 item per slide untuk tampilan lebih baik)
  const totalSlides = Math.ceil(filteredPosts.length / 2);

  // Fungsi untuk scroll manual tanpa menggunakan properti yang tidak didukung
  const scrollToSlide = (slideIndex: number) => {
    if (carouselRef.current) {
      // Gunakan pendekatan alternatif untuk scrolling
      const slideWidth = carouselRef.current.clientWidth;
      const newPosition = slideWidth * slideIndex;
      
      try {
        // Menggunakan scroll manual daripada scrollLeft dan scrollTo
        carouselRef.current.scrollTo({
          left: newPosition,
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback jika scrollTo tidak didukung
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = newPosition;
        }
      }
      
      setCurrentSlide(slideIndex);
    }
  };

  // Fungsi untuk next slide
  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    scrollToSlide(nextIndex);
  };

  // Fungsi untuk previous slide
  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    scrollToSlide(prevIndex);
  };

  // Auto slide setiap 2 detik dengan validasi tipe
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        nextSlide();
      }, 2000) as NodeJS.Timeout;
      
      autoPlayRef.current = timer;
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, isPaused, totalSlides]);

  // Reset current slide ketika category berubah
  useEffect(() => {
    setCurrentSlide(0);
    if (carouselRef.current) {
      try {
        carouselRef.current.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }
  }, [activeCategory]);

  // Pause auto slide saat hover
  const pauseAutoPlay = () => setIsPaused(true);
  const resumeAutoPlay = () => setIsPaused(false);

  // Handler untuk scroll manual dengan pengaman error
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const clientWidth = carouselRef.current.clientWidth;
      
      if (clientWidth > 0) {
        const scrollPosition = Math.round(scrollLeft / clientWidth);
        if (scrollPosition !== currentSlide) {
          setCurrentSlide(scrollPosition);
        }
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header dengan efek warna gradient */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#153969] mb-3 relative inline-block">
              Insight & Informasi Industri
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/80 to-blue-300/0"></div>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Perkembangan terbaru di dunia konstruksi dan properti Indonesia
            </p>
          </motion.div>
        </div>

        {/* Category Filters dengan efek pill yang lebih menarik */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-full shadow-md flex space-x-1">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#153969] text-white shadow-sm'
                    : 'bg-transparent text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container with Navigation Buttons */}
        <div 
          className="relative"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Left Navigation Button */}
          <motion.button 
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white/90 rounded-full p-2 shadow-md text-[#153969] hover:bg-[#153969] hover:text-white transition-all duration-300 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          
          {/* Carousel dengan efek parallax */}
          <div 
            ref={carouselRef}
            className="overflow-x-auto hide-scrollbar flex pb-4"
            onScroll={handleScroll}
          >
            {/* Render slides based on calculated total - 2 artikel per slide */}
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div 
                key={slideIndex} 
                className="min-w-full flex-shrink-0 px-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.slice(slideIndex * 2, slideIndex * 2 + 2).map((post) => (
                    <Link 
                      key={post.id}
                      href={`/insight/${post.slug}`}
                      className="block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1"
                        onMouseEnter={() => setHoverCard(post.id)}
                        onMouseLeave={() => setHoverCard(null)}
                      >
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className={`object-cover transition-all duration-700 ${hoverCard === post.id ? 'scale-110 brightness-110' : 'scale-100'}`}
                          />
                          {/* Overlay gradien yang lebih dramatis */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500" />
                          
                          {/* Informasi kategori yang lebih menonjol */}
                          <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center">
                            <span className="bg-[#153969]/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">
                              {post.category}
                            </span>
                            <div className="flex items-center space-x-2 text-white text-xs">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{post.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center text-gray-500 text-xs mb-2">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Waktu baca: {post.readTime}</span>
                          </div>
                          
                          <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-[#153969] transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                            {post.excerpt}
                          </p>
                          
                          <div className="inline-flex items-center text-[#153969] font-medium text-sm group-hover:underline mt-auto">
                            <span className="relative">
                              Baca Selengkapnya
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                            </span>
                            <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Button */}
          <motion.button 
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white/90 rounded-full p-2 shadow-md text-[#153969] hover:bg-[#153969] hover:text-white transition-all duration-300 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Pagination Indicators dengan efek yang lebih baik */}
        <div className="flex justify-center space-x-3 mt-6 mb-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? 'w-6 h-2 bg-[#153969]' 
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Waktu auto-slide info */}
        <div className="text-center text-xs text-gray-400 mb-6">
          Slide bergeser otomatis setiap 2 detik
        </div>
        
        {/* View All Button dengan efek yang lebih menarik */}
        <div className="text-center mt-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/insight"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#153969] to-[#2e5694] text-white text-sm font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">
                Lihat Semua Insight
                <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#1c4d8c] to-[#3a68ad] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* CSS untuk menyembunyikan scrollbar tapi tetap memungkinkan scrolling */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
};

export default BlogNewsSection;