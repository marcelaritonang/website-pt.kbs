'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

// Definisikan tipe untuk post
interface Post {
  id: number;
  title: {
    id: string;
    en: string;
  };
  excerpt: {
    id: string;
    en: string;
  };
  category: string;
  image: string;
  date: {
    id: string;
    en: string;
  };
  readTime: {
    id: string;
    en: string;
  };
  slug: string;
}

// Data berita yang relevan dengan konstruksi di Indonesia (dual bahasa)
const insightPosts: Post[] = [
  {
    id: 1,
    title: {
      id: "PUPR Fokuskan Anggaran 2024 untuk Penyelesaian Infrastruktur Prioritas",
      en: "Public Works Ministry Focuses 2024 Budget on Priority Infrastructure Completion"
    },
    excerpt: {
      id: "PUPR Fokuskan Anggaran 2024 untuk Penyelesaian Infrastruktur Prioritas.",
      en: "Public Works Ministry Focuses 2024 Budget on Priority Infrastructure Completion."
    },
    category: "Proyek",
    image: "/images/blog/rapat-pupr.jpg",
    date: {
      id: "12 Maret 2024",
      en: "March 12, 2024"
    },
    readTime: {
      id: "5 menit",
      en: "5 min"
    },
    slug: "proyek-infrastruktur-jakarta-timur-2024"
  },
  {
    id: 2,
    title: {
      id: "5 Strategi Jitu Kontraktor Hadapi Kenaikan Biaya Operasional 2023-2024",
      en: "5 Effective Strategies for Contractors Facing Rising Operational Costs 2023-2024"
    },
    excerpt: {
      id: "Panduan praktis bagi pelaku bisnis konstruksi untuk bertahan di tengah fluktuasi harga material dan tenaga kerja.",
      en: "Practical guide for construction businesses to survive amid fluctuating material and labor costs."
    },
    category: "Manajemen",
    image: "/images/berita2/gambar2.png",
    date: {
      id: "15 Desember 2023",
      en: "December 15, 2023"
    },
    readTime: {
      id: "4 menit",
      en: "4 min"
    },
    slug: "strategi-kenaikan-harga-material-2024"
  },
  {
    id: 3,
    title: {
      id: "Ingin Renovasi Rumah? Ketahui Sejumlah Izin yang Wajib Dipenuhi",
      en: "Planning a Home Renovation? Know the Required Permits"
    },
    excerpt: {
      id: "Panduan lengkap tentang izin-izin yang perlu disiapkan sebelum memulai renovasi rumah untuk menghindari masalah hukum dan konflik dengan tetangga.",
      en: "Complete guide on permits needed before starting home renovations to avoid legal issues and conflicts with neighbors."
    },
    category: "Regulasi",
    image: "/images/berita3/b3-g2.jpg",
    date: {
      id: "20 Sep 2024",
      en: "Sep 20, 2024"
    },
    readTime: {
      id: "5 menit",
      en: "5 min"
    },
    slug: "izin-wajib-renovasi-rumah-2024"
  },
  {
    id: 4,
    title: {
      id: "Perubahan Regulasi IMB dan Dampaknya pada Konstruksi",
      en: "Building Permit Regulation Changes and Their Impact on Construction"
    },
    excerpt: {
      id: "Analisis perubahan peraturan perizinan bangunan terbaru di Indonesia dan strategi adaptasinya.",
      en: "Analysis of recent changes in building permit regulations in Indonesia and adaptation strategies."
    },
    category: "Regulasi",
    image: "/images/berita4/b4-g4.png",
    date: {
      id: "5 Feb 2024",
      en: "Feb 5, 2024"
    },
    readTime: {
      id: "7 menit",
      en: "7 min"
    },
    slug: "perubahan-regulasi-imb-2024"
  },
  {
    id: 5,
    title: {
      id: "Teknologi Pemantauan Jarak Jauh untuk Pengelolaan Proyek",
      en: "Remote Monitoring Technology for Project Management"
    },
    excerpt: {
      id: "Solusi teknologi terkini untuk mengawasi dan mengelola beberapa proyek konstruksi secara bersamaan.",
      en: "Latest technology solutions for monitoring and managing multiple construction projects simultaneously."
    },
    category: "Teknologi",
    image: "/images/berita5/gambar2-b5.png",
    date: {
      id: "25 Jan 2024",
      en: "Jan 25, 2024"
    },
    readTime: {
      id: "5 menit",
      en: "5 min"
    },
    slug: "teknologi-pemantauan-jarak-jauh-konstruksi"
  },
  {
    id: 6,
    title: {
      id: "Pembangunan Gedung Ramah Lingkungan: Tren dan Standar",
      en: "Green Building Construction: Trends and Standards"
    },
    excerpt: {
      id: "Perkembangan terkini dalam konstruksi berkelanjutan dan sertifikasi green building di Indonesia.",
      en: "Recent developments in sustainable construction and green building certification in Indonesia."
    },
    category: "Proyek",
    image: "/images/berita6/gambar1-b6.jpeg",
    date: {
      id: "18 Jan 2024",
      en: "Jan 18, 2024"
    },
    readTime: {
      id: "6 menit",
      en: "6 min"
    },
    slug: "pembangunan-gedung-ramah-lingkungan"
  },
  {
    id: 7,
    title: {
      id: "Manajemen Risiko Proyek Konstruksi Skala Menengah",
      en: "Risk Management for Medium-Scale Construction Projects"
    },
    excerpt: {
      id: "Pendekatan sistematis untuk mengidentifikasi dan memitigasi risiko dalam proyek konstruksi.",
      en: "Systematic approach to identifying and mitigating risks in construction projects."
    },
    category: "Manajemen",
    image: "/images/berita7/gambar1-b7.jpg",
    date: {
      id: "10 Jan 2024",
      en: "Jan 10, 2024"
    },
    readTime: {
      id: "5 menit",
      en: "5 min"
    },
    slug: "manajemen-risiko-proyek-konstruksi"
  },
  {
    id: 8,
    title: {
      id: "Jasa Konsultasi Pra-Konstruksi untuk Optimalisasi Anggaran",
      en: "Pre-Construction Consultation Services for Budget Optimization"
    },
    excerpt: {
      id: "Bagaimana perencanaan matang sejak awal dapat menghemat biaya dan waktu pelaksanaan proyek.",
      en: "How thorough planning from the beginning can save costs and project implementation time."
    },
    category: "Layanan",
    image: "/images/berita8/gambar1-b8.jpeg",
    date: {
      id: "5 Jan 2024",
      en: "Jan 5, 2024"
    },
    readTime: {
      id: "4 menit",
      en: "4 min"
    },
    slug: "jasa-konsultasi-pra-konstruksi"
  },
  {
    id: 9,
    title: {
      id: "Penyesuaian Standar SNI untuk Bahan Bangunan 2024",
      en: "Adjustment of SNI Standards for Building Materials 2024"
    },
    excerpt: {
      id: "Perubahan regulasi standar nasional untuk material konstruksi dan implikasinya pada industri.",
      en: "Changes in national standard regulations for construction materials and their implications for the industry."
    },
    category: "Regulasi",
    image: "/images/berita9/gambar1-b9.jpg",
    date: {
      id: "28 Des 2023",
      en: "Dec 28, 2023"
    },
    readTime: {
      id: "6 menit",
      en: "6 min"
    },
    slug: "perubahan-standar-sni-bahan-bangunan"
  },
  {
    id: 10,
    title: {
      id: "Implementasi BIM dalam Proyek Renovasi dan Retrofit",
      en: "BIM Implementation in Renovation and Retrofit Projects"
    },
    excerpt: {
      id: "Penggunaan Building Information Modeling untuk meningkatkan akurasi dan efisiensi proyek renovasi.",
      en: "Using Building Information Modeling to improve accuracy and efficiency of renovation projects."
    },
    category: "Teknologi",
    image: "/images/berita10/gambar1-b10.jpg",
    date: {
      id: "15 Des 2023",
      en: "Dec 15, 2023"
    },
    readTime: {
      id: "7 menit",
      en: "7 min"
    },
    slug: "implementasi-bim-proyek-renovasi"
  }
];

// Kategori yang disederhanakan dengan dual bahasa
const categoriesData = {
  id: ["Semua", "Proyek", "Layanan", "Manajemen", "Regulasi", "Teknologi"],
  en: ["All", "Projects", "Services", "Management", "Regulation", "Technology"]
};

// Konstanta untuk mengontrol tampilan
const ITEMS_PER_SLIDE_DESKTOP = 3; // 3 item per slide untuk desktop (3 kolom)
const ITEMS_PER_SLIDE_TABLET = 2; // 2 item per slide untuk tablet (2 kolom)
const ITEMS_PER_SLIDE_MOBILE = 1; // 1 item per slide untuk mobile (1 kolom)
const AUTO_SLIDE_INTERVAL = 5000; // 5 detik interval

const BlogNewsSection: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const categories = language === 'en' ? categoriesData.en : categoriesData.id;
  
  const [activeCategory, setActiveCategory] = useState(language === 'en' ? "All" : "Semua");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Reset active category when language changes
  useEffect(() => {
    setActiveCategory(language === 'en' ? "All" : "Semua");
  }, [language]);
  
  // Update window width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Initial width
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  
  // Determine items per slide based on screen width
  const getItemsPerSlide = () => {
    if (windowWidth >= 1024) return ITEMS_PER_SLIDE_DESKTOP;
    if (windowWidth >= 640) return ITEMS_PER_SLIDE_TABLET;
    return ITEMS_PER_SLIDE_MOBILE;
  };
  
  // Map category between languages
  const getCategoryEquivalent = (category: string) => {
    const index = categoriesData.id.indexOf(category);
    if (index !== -1) {
      return language === 'en' ? categoriesData.en[index] : categoriesData.id[index];
    }
    const enIndex = categoriesData.en.indexOf(category);
    if (enIndex !== -1) {
      return language === 'en' ? categoriesData.en[enIndex] : categoriesData.id[enIndex];
    }
    return category;
  };
  
  // Filter berita berdasarkan kategori
  const filteredPosts = (activeCategory === "Semua" || activeCategory === "All")
    ? [...insightPosts] 
    : insightPosts.filter(post => 
        post.category === activeCategory || 
        post.category === getCategoryEquivalent(activeCategory)
      );

  // Jumlah slide berdasarkan konten yang terfilter
  const totalSlides = Math.ceil(filteredPosts.length / getItemsPerSlide());

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
        console.error("ScrollTo not supported:", error);
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

  // Auto slide interval
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
        console.error("ScrollTo not supported:", error);
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

  // Pilih kategori dan tutup menu dropdown (mobile)
  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setShowCategoryMenu(false);
  };

  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* Removing negative margins and min-height to eliminate gaps */}
      
      {/* Create a seamless gradient with smooth transition between theme modes */}
      <div className="absolute inset-0 transition-colors duration-700">
        {/* Base background color that exactly matches other sections */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isDark 
            ? 'bg-gray-900' 
            : 'bg-[#f8fafc]'
        }`} />
        
        {/* Subtle connecting gradient from previous section */}
        <div className={`absolute top-0 left-0 right-0 h-32 transition-opacity duration-1000 ${
          isDark 
            ? 'bg-gradient-to-b from-[#111827] to-gray-900' 
            : 'bg-gradient-to-b from-[#f8fafc] to-[#f8fafc]'
        } opacity-80`} />
        
        {/* Bottom gradient that transitions to the footer */}
        <div className={`absolute bottom-0 left-0 right-0 h-32 transition-all duration-1000 ${
          isDark 
            ? 'bg-gradient-to-t from-black to-gray-900' 
            : 'bg-gradient-to-t from-white to-[#f8fafc]'
        } opacity-80`} />
        
        {/* Diagonal gradient overlay with 45-degree angle */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-900/95 to-[#111827]/90 opacity-100' 
            : 'bg-gradient-to-br from-[#f8fafc] via-[#f8fafc]/95 to-[#f8fafc]/90 opacity-100'
        }`} />
        
        {/* Subtle radial gradients for depth */}
        <div className={`absolute top-1/4 left-1/4 w-full h-full transition-all duration-1000 ${
          isDark 
            ? 'bg-radial-gradient-dark' 
            : 'bg-radial-gradient-light'
        } opacity-40`} />
        
        {/* Very subtle noise texture overlay with transition */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] transition-opacity duration-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header dengan efek warna gradient */}
        <div className="text-center mb-10 md:mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#153969]'} mb-3 md:mb-4 relative inline-block`}>
              {language === 'en' ? 'Industry Insights & Information' : 'Insight & Informasi Industri'}
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r transition-colors duration-700 ${isDark ? 'from-blue-400/80 to-blue-400/0' : 'from-blue-500/80 to-blue-300/0'}`}></div>
            </h2>
            <p className={`text-sm md:text-base transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              {language === 'en' 
                ? 'Latest developments in the Indonesian construction and property world' 
                : 'Perkembangan terbaru di dunia konstruksi dan properti Indonesia'}
            </p>
          </motion.div>
        </div>

        {/* Mobile Category Dropdown */}
        <div className="md:hidden mb-6 relative z-10">
          <button 
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className={`w-full flex items-center justify-between transition-all duration-700 ${
              isDark ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/80 text-white' : 'bg-white/80 backdrop-blur-xl border-blue-100/80 text-gray-800'
            } p-3 rounded-lg shadow-sm border`}
          >
            <span className="text-sm font-medium transition-colors duration-700">{activeCategory}</span>
            <Filter className={`h-4 w-4 transition-colors duration-700 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
          
          {showCategoryMenu && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-full left-0 right-0 mt-1 transition-all duration-700 ${
                isDark ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/80' : 'bg-white/80 backdrop-blur-xl border-blue-100/80'
              } rounded-lg shadow-lg border z-20 overflow-hidden`}
            >
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => selectCategory(category)}
                  className={`w-full text-left p-3 text-sm transition-all duration-500 ${
                    activeCategory === category
                      ? isDark 
                        ? 'bg-[#153969]/30 text-blue-400 font-medium'
                        : 'bg-[#153969]/10 text-[#153969] font-medium'
                      : isDark
                        ? 'text-gray-300 hover:bg-gray-700/80'
                        : 'text-gray-700 hover:bg-gray-50/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Desktop Category Filters */}
        <div className="hidden md:flex justify-center mb-8 overflow-x-auto pb-2">
          <div className={`transition-all duration-700 ${
            isDark ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/80' : 'bg-white/80 backdrop-blur-xl border-blue-100/80'
          } p-1.5 rounded-full shadow-md flex space-x-1 no-scrollbar border`}>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-500 ${
                  activeCategory === category
                    ? isDark
                      ? 'bg-[#153969] text-white shadow-sm'
                      : 'bg-[#153969] text-white shadow-sm'
                    : isDark
                      ? 'bg-transparent text-gray-300 hover:bg-gray-700/80'
                      : 'bg-transparent text-gray-700 hover:bg-gray-100/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Content */}
        <div className="mb-10 md:mb-16">
          {/* Section title */}
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? 'Featured Insights' : 'Insight Unggulan'}
            </h3>
            
            {/* Navigation arrows - desktop only */}
            <div className="hidden md:flex items-center space-x-2">
              {totalSlides > 1 && (
                <>
                  <button 
                    onClick={prevSlide} 
                    className={`p-2 rounded-full transition-all duration-700 ${
                      isDark 
                        ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/80 text-gray-300 hover:bg-[#153969] hover:text-white' 
                        : 'bg-white/80 backdrop-blur-xl border-blue-100/80 text-gray-600 hover:bg-[#153969] hover:text-white'
                    } border`}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4 transition-colors duration-500" />
                  </button>
                  <button 
                    onClick={nextSlide} 
                    className={`p-2 rounded-full transition-all duration-700 ${
                      isDark 
                        ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/80 text-gray-300 hover:bg-[#153969] hover:text-white' 
                        : 'bg-white/80 backdrop-blur-xl border-blue-100/80 text-gray-600 hover:bg-[#153969] hover:text-white'
                    } border`}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-4 w-4 transition-colors duration-500" />
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
            onTouchStart={pauseAutoPlay}
            onTouchEnd={resumeAutoPlay}
          >
            {filteredPosts.length === 0 ? (
              <div className={`flex justify-center items-center h-48 md:h-64 transition-all duration-700 ${
                isDark ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/80 text-gray-300' : 'bg-white/80 backdrop-blur-xl border-blue-100/80 text-gray-500'
              } rounded-xl shadow-xl border`}>
                <p className="text-sm md:text-base transition-colors duration-700">
                  {language === 'en' ? 'No articles in this category' : 'Tidak ada artikel dalam kategori ini'}
                </p>
              </div>
            ) : (
              <>
                {/* Left Navigation Button - mobile & tablet */}
                {totalSlides > 1 && (
                  <motion.button 
                    onClick={prevSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-2 z-10 transition-all duration-700 ${
                      isDark 
                        ? 'bg-gray-800/90 border-gray-700/80 text-blue-400 hover:bg-[#153969] hover:text-white' 
                        : 'bg-white/90 border-blue-100/80 text-[#153969] hover:bg-[#153969] hover:text-white'
                    } rounded-full p-1.5 md:p-2 shadow-md border`}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 transition-colors duration-500" />
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
                    const itemsPerSlide = getItemsPerSlide();
                    const startIndex = slideIndex * itemsPerSlide;
                    const endIndex = Math.min(startIndex + itemsPerSlide, filteredPosts.length);
                    const postsInThisSlide = filteredPosts.slice(startIndex, endIndex);
                    
                    return (
                      <div 
                        key={slideIndex} 
                        className="min-w-full flex-shrink-0 snap-center px-1"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                                className={`group cursor-pointer transition-all duration-700 ${
                                  isDark 
                                    ? 'bg-gray-800/70 backdrop-blur-xl border-gray-700/80 shadow-xl' 
                                    : 'bg-white/70 backdrop-blur-xl border-blue-100/80 shadow-xl'
                                } rounded-lg overflow-hidden border h-full hover:-translate-y-1 hover:shadow-2xl`}
                                onMouseEnter={() => setHoverCard(post.id)}
                                onMouseLeave={() => setHoverCard(null)}
                              >
                                {/* Image container */}
                                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                                  <Image
                                    src={post.image}
                                    alt={language === 'en' ? post.title.en : post.title.id}
                                    fill
                                    className={`object-cover transition-all duration-500 ${hoverCard === post.id ? 'scale-105' : 'scale-100'}`}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                  
                                  {/* Category badge */}
                                  <div className="absolute bottom-3 left-3">
                                    <span className={`transition-all duration-500 ${
                                      isDark ? 'bg-[#153969]/90' : 'bg-[#153969]/90'
                                    } text-white text-xs px-2.5 py-1 rounded-md`}>
                                      {getCategoryEquivalent(post.category)}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Content */}
                                <div className="p-3 md:p-4">
                                  <div className={`flex items-center justify-between transition-colors duration-700 ${
                                    isDark ? 'text-gray-400' : 'text-gray-500'
                                  } text-xs mb-1 md:mb-2`}>
                                    <span>{language === 'en' ? post.date.en : post.date.id}</span>
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1 transition-colors duration-700" />
                                      <span>{language === 'en' ? post.readTime.en : post.readTime.id}</span>
                                    </div>
                                  </div>
                                  
                                  <h3 className={`font-bold text-sm md:text-base transition-colors duration-700 ${
                                    isDark 
                                      ? 'text-white group-hover:text-blue-300' 
                                      : 'text-gray-800 group-hover:text-[#153969]'
                                  } mb-2 line-clamp-2`}>
                                    {language === 'en' ? post.title.en : post.title.id}
                                  </h3>
                                  
                                  <div className={`inline-flex items-center transition-colors duration-700 ${
                                    isDark ? 'text-blue-400' : 'text-[#153969]'
                                  } font-medium text-xs md:text-sm mt-1`}>
                                    <span>{language === 'en' ? 'Read More' : 'Baca Selengkapnya'}</span>
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

                {/* Right Navigation Button */}
                {totalSlides > 1 && (
                  <motion.button 
                    onClick={nextSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-2 z-10 transition-all duration-700 ${
                      isDark 
                        ? 'bg-gray-800/90 border-gray-700/80 text-blue-400 hover:bg-[#153969] hover:text-white' 
                        : 'bg-white/90 border-blue-100/80 text-[#153969] hover:bg-[#153969] hover:text-white'
                    } rounded-full p-1.5 md:p-2 shadow-md border`}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5 transition-colors duration-500" />
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
                  className={`transition-all duration-500 rounded-full ${
                    currentSlide === index 
                      ? isDark
                        ? 'w-5 md:w-6 h-1.5 md:h-2 bg-blue-400' 
                        : 'w-5 md:w-6 h-1.5 md:h-2 bg-[#153969]'
                      : isDark
                        ? 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-600 hover:bg-gray-500'
                        : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Slide auto-change information - only on desktop */}
          {totalSlides > 1 && (
            <div className={`text-center text-xs transition-colors duration-700 ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-2 hidden md:block`}>
              {language === 'en' ? 'Slides change automatically every 5 seconds' : 'Slide bergeser otomatis setiap 5 detik'}
            </div>
          )}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/insight"
              className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 bg-[#153969] text-white text-xs md:text-sm font-medium rounded-lg shadow-md hover:shadow-xl hover:bg-[#1e4d8d] transition-all duration-500"
            >
              <span className="relative z-10">
                {language === 'en' ? 'View All Insights' : 'Lihat Semua Insight'}
                <ArrowRight className="inline-block ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* CSS for gradient and texture effects */}
      <style jsx global>{`
        .bg-radial-gradient-light {
          background: radial-gradient(circle at center, rgba(219, 234, 254, 0.3) 0%, rgba(248, 250, 252, 0) 70%);
        }
        
        .bg-radial-gradient-dark {
          background: radial-gradient(circle at center, rgba(30, 58, 138, 0.1) 0%, rgba(17, 24, 39, 0) 70%);
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
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