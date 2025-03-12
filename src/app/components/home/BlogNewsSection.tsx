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
    title: "PUPR Fokuskan Anggaran 2024 untuk Penyelesaian Infrastruktur Prioritas",
    excerpt: "PUPR Fokuskan Anggaran 2024 untuk Penyelesaian Infrastruktur Prioritas.",
    category: "Proyek",
    image: "/images/blog/rapat-pupr.jpg",
    date: "12 Maret 2024",
    readTime: "5 menit",
    slug: "proyek-infrastruktur-jakarta-timur-2024"
  },
  {
    id: 2,
    title: "5 Strategi Jitu Kontraktor Hadapi Kenaikan Biaya Operasional 2023-2024",
    excerpt: "Panduan praktis bagi pelaku bisnis konstruksi untuk bertahan di tengah fluktuasi harga material dan tenaga kerja.",
    category: "Manajemen",
    image: "/images/berita2/gambar2.png",
    date: "15 Desember 2023",
    readTime: "4 menit",
    slug: "strategi-kenaikan-harga-material-2024"
  },
  {
    id: 3,
    title: "Ingin Renovasi Rumah? Ketahui Sejumlah Izin yang Wajib Dipenuhi",
    excerpt: "Panduan lengkap tentang izin-izin yang perlu disiapkan sebelum memulai renovasi rumah untuk menghindari masalah hukum dan konflik dengan tetangga.",
    category: "Regulasi",
    image: "/images/berita3/b3-g2.jpg",
    date: "20 Sep 2024",
    readTime: "5 menit",
    slug: "izin-wajib-renovasi-rumah-2024"
  },
  {
    id: 4,
    title: "Perubahan Regulasi IMB dan Dampaknya pada Konstruksi",
    excerpt: "Analisis perubahan peraturan perizinan bangunan terbaru di Indonesia dan strategi adaptasinya.",
    category: "Regulasi",
    image: "/images/berita4/b4-g4.png",
    date: "5 Feb 2024",
    readTime: "7 menit",
    slug: "perubahan-regulasi-imb-2024"
  },
  {
    id: 5,
    title: "Teknologi Pemantauan Jarak Jauh untuk Pengelolaan Proyek",
    excerpt: "Solusi teknologi terkini untuk mengawasi dan mengelola beberapa proyek konstruksi secara bersamaan.",
    category: "Teknologi",
    image: "/images/berita5/gambar2-b5.png",
    date: "25 Jan 2024",
    readTime: "5 menit",
    slug: "teknologi-pemantauan-jarak-jauh-konstruksi"
  },
  {
    id: 6,
    title: "Pembangunan Gedung Ramah Lingkungan: Tren dan Standar",
    excerpt: "Perkembangan terkini dalam konstruksi berkelanjutan dan sertifikasi green building di Indonesia.",
    category: "Proyek",
    image: "/images/berita6/gambar1-b6.jpeg",
    date: "18 Jan 2024",
    readTime: "6 menit",
    slug: "pembangunan-gedung-ramah-lingkungan"
  },
  {
    id: 7,
    title: "Manajemen Risiko Proyek Konstruksi Skala Menengah",
    excerpt: "Pendekatan sistematis untuk mengidentifikasi dan memitigasi risiko dalam proyek konstruksi.",
    category: "Manajemen",
    image: "/images/berita7/gambar1-b7.jpg",
    date: "10 Jan 2024",
    readTime: "5 menit",
    slug: "manajemen-risiko-proyek-konstruksi"
  },
  {
    id: 8,
    title: "Jasa Konsultasi Pra-Konstruksi untuk Optimalisasi Anggaran",
    excerpt: "Bagaimana perencanaan matang sejak awal dapat menghemat biaya dan waktu pelaksanaan proyek.",
    category: "Layanan",
    image: "/images/berita8/gambar1-b8.jpeg",
    date: "5 Jan 2024",
    readTime: "4 menit",
    slug: "jasa-konsultasi-pra-konstruksi"
  },
  {
    id: 9,
    title: "Penyesuaian Standar SNI untuk Bahan Bangunan 2024",
    excerpt: "Perubahan regulasi standar nasional untuk material konstruksi dan implikasinya pada industri.",
    category: "Regulasi",
    image: "/images/berita9/gambar1-b9.jpg",
    date: "28 Des 2023",
    readTime: "6 menit",
    slug: "perubahan-standar-sni-bahan-bangunan"
  },
  {
    id: 10,
    title: "Implementasi BIM dalam Proyek Renovasi dan Retrofit",
    excerpt: "Penggunaan Building Information Modeling untuk meningkatkan akurasi dan efisiensi proyek renovasi.",
    category: "Teknologi",
    image: "/images/berita10/gambar1-b10.jpg",
    date: "15 Des 2023",
    readTime: "7 menit",
    slug: "implementasi-bim-proyek-renovasi"
  }
];

// Kategori yang disederhanakan
const categories = ["Semua", "Proyek", "Layanan", "Manajemen", "Regulasi", "Teknologi"];

// Konstanta untuk mengontrol tampilan
const ITEMS_PER_SLIDE = 3; // 3 item per slide (3 kolom)
const AUTO_SLIDE_INTERVAL = 2000; // 2 detik interval

const BlogNewsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Filter berita berdasarkan kategori
  const filteredPosts = activeCategory === "Semua" 
    ? [...insightPosts] 
    : insightPosts.filter(post => post.category === activeCategory);

  // Jumlah slide berdasarkan konten yang terfilter
  const totalSlides = Math.ceil(filteredPosts.length / ITEMS_PER_SLIDE);

  // Fungsi untuk memastikan slide index valid
  const getValidSlideIndex = (index: number) => {
    if (totalSlides <= 0) return 0;
    return Math.max(0, Math.min(index, totalSlides - 1));
  };

  // Fungsi untuk scroll ke slide tertentu
  const scrollToSlide = (slideIndex: number) => {
    const validIndex = getValidSlideIndex(slideIndex);
    
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth;
      const newPosition = slideWidth * validIndex;
      
      try {
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
      
      setCurrentSlide(validIndex);
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

  // Auto slide interval - sekarang setiap 2 detik
  useEffect(() => {
    if (!isPaused && totalSlides > 1) {
      const timer = setTimeout(() => {
        nextSlide();
      }, AUTO_SLIDE_INTERVAL);
      
      autoPlayRef.current = timer;
      
      return () => {
        if (autoPlayRef.current) {
          clearTimeout(autoPlayRef.current);
        }
      };
    }
  }, [currentSlide, isPaused, totalSlides]);

  // Reset current slide ketika category berubah
  useEffect(() => {
    setCurrentSlide(0);
    if (carouselRef.current) {
      try {
        carouselRef.current.scrollTo({
          left: 0,
          behavior: 'auto'
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

  // Handler untuk scroll manual
  const handleScroll = () => {
    if (carouselRef.current && carouselRef.current.clientWidth > 0) {
      const scrollPosition = Math.round(carouselRef.current.scrollLeft / carouselRef.current.clientWidth);
      if (scrollPosition !== currentSlide && scrollPosition < totalSlides) {
        setCurrentSlide(scrollPosition);
      }
    }
  };

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header dengan efek warna gradient */}
        <div className="text-center mb-10 relative">
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

        {/* Category Filters */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="bg-white p-1.5 rounded-full shadow-md flex space-x-1 no-scrollbar">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
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

        {/* Featured Content */}
        <div className="mb-12">
          {/* Section title */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-semibold text-gray-900">Featured Insights</h3>
            
            {/* Navigation arrows - desktop only */}
            <div className="hidden md:flex items-center space-x-2">
              {totalSlides > 1 && (
                <>
                  <button 
                    onClick={prevSlide} 
                    className="p-2 rounded-full bg-white shadow-sm text-gray-600 hover:bg-[#153969] hover:text-white transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={nextSlide} 
                    className="p-2 rounded-full bg-white shadow-sm text-gray-600 hover:bg-[#153969] hover:text-white transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Carousel Container */}
          <div 
            className="relative"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
          >
            {filteredPosts.length === 0 ? (
              <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">Tidak ada artikel dalam kategori ini</p>
              </div>
            ) : (
              <>
                {/* Left Navigation Button - mobile only */}
                {totalSlides > 1 && (
                  <motion.button 
                    onClick={prevSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -ml-2 z-10 bg-white/90 rounded-full p-2 shadow-md text-[#153969] hover:bg-[#153969] hover:text-white transition-all duration-300 focus:outline-none"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                )}
                
                {/* Carousel */}
                <div 
                  ref={carouselRef}
                  className="overflow-x-auto hide-scrollbar flex snap-x snap-mandatory pb-4"
                  onScroll={handleScroll}
                >
                  {/* Render slides */}
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                    // Dapatkan subset post untuk slide ini
                    const startIndex = slideIndex * ITEMS_PER_SLIDE;
                    const endIndex = Math.min(startIndex + ITEMS_PER_SLIDE, filteredPosts.length);
                    const postsInThisSlide = filteredPosts.slice(startIndex, endIndex);
                    
                    return (
                      <div 
                        key={slideIndex} 
                        className="min-w-full flex-shrink-0 snap-center px-1"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                          {postsInThisSlide.map((post) => (
                            <Link 
                              key={post.id}
                              href={`/insight/${post.slug}`}
                              className="block"
                            >
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full hover:-translate-y-1"
                                onMouseEnter={() => setHoverCard(post.id)}
                                onMouseLeave={() => setHoverCard(null)}
                              >
                                {/* Image container */}
                                <div className="relative h-48 overflow-hidden">
                                  <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className={`object-cover transition-all duration-500 ${hoverCard === post.id ? 'scale-105' : 'scale-100'}`}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                  
                                  {/* Category badge */}
                                  <div className="absolute bottom-3 left-3">
                                    <span className="bg-[#153969]/90 text-white text-xs px-2.5 py-1 rounded-md">
                                      {post.category}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Content */}
                                <div className="p-4">
                                  <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
                                    <span>{post.date}</span>
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{post.readTime}</span>
                                    </div>
                                  </div>
                                  
                                  <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2 group-hover:text-[#153969] transition-colors">
                                    {post.title}
                                  </h3>
                                  
                                  <div className="inline-flex items-center text-[#153969] font-medium text-sm mt-1">
                                    <span>Baca Selengkapnya</span>
                                    <ArrowRight className="ml-1 h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                                  </div>
                                </div>
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Navigation Button - mobile only */}
                {totalSlides > 1 && (
                  <motion.button 
                    onClick={nextSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 -mr-2 z-10 bg-white/90 rounded-full p-2 shadow-md text-[#153969] hover:bg-[#153969] hover:text-white transition-all duration-300 focus:outline-none"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                )}
              </>
            )}
          </div>

          {/* Pagination Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
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
          )}
          
          {/* Slide auto-change information */}
          {totalSlides > 1 && (
            <div className="text-center text-xs text-gray-400 mt-2">
              Slide bergeser otomatis setiap 2 detik
            </div>
          )}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/insight"
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#153969] to-[#2e5694] text-white text-sm font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
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

      {/* CSS untuk menyembunyikan scrollbar */}
      <style jsx global>{`
        .hide-scrollbar, .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar, 
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
};

export default BlogNewsSection;