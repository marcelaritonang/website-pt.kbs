'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Search, ChevronDown, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

// Definisikan tipe untuk post
interface Post {
  id: number;
  title: string;
  title_en?: string;
  excerpt: string;
  excerpt_en?: string;
  category: string;
  category_en?: string;
  image: string;
  date: string;
  date_en?: string;
  readTime: string;
  readTime_en?: string;
  slug: string;
}

// Data berita yang relevan dengan konstruksi di Indonesia dengan dukungan bilingual
const insightPosts: Post[] = [
  {
    id: 1,
    title: "PUPR Fokuskan Anggaran 2024 untuk Penyelesaian Infrastruktur Prioritas",
    title_en: "PUPR Focuses 2024 Budget for Priority Infrastructure Completion",
    excerpt: "PUPR Fokuskan Anggaran 2024 untuk Penyelesaian Infrastruktur Prioritas.",
    excerpt_en: "PUPR Focuses 2024 Budget for Priority Infrastructure Completion.",
    category: "Proyek",
    category_en: "Project",
    image: "/images/blog/rapat-pupr.jpg",
    date: "12 Maret 2024",
    date_en: "March 12, 2024",
    readTime: "5 menit",
    readTime_en: "5 minutes",
    slug: "proyek-infrastruktur-jakarta-timur-2024"
  },
  {
    id: 2,
    title: "5 Strategi Jitu Kontraktor Hadapi Kenaikan Biaya Operasional 2023-2024",
    title_en: "5 Effective Strategies for Contractors to Face Operational Cost Increases 2023-2024",
    excerpt: "Panduan praktis bagi pelaku bisnis konstruksi untuk bertahan di tengah fluktuasi harga material dan tenaga kerja.",
    excerpt_en: "Practical guide for construction businesses to survive amid fluctuations in material and labor costs.",
    category: "Manajemen",
    category_en: "Management",
    image: "/images/berita2/gambar2.png",
    date: "15 Desember 2023",
    date_en: "December 15, 2023",
    readTime: "4 menit",
    readTime_en: "4 minutes",
    slug: "strategi-kenaikan-harga-material-2024"
  },
  {
    id: 3,
    title: "Ingin Renovasi Rumah? Ketahui Sejumlah Izin yang Wajib Dipenuhi",
    title_en: "Planning Home Renovation? Know the Required Permits",
    excerpt: "Panduan lengkap tentang izin-izin yang perlu disiapkan sebelum memulai renovasi rumah untuk menghindari masalah hukum dan konflik dengan tetangga.",
    excerpt_en: "Complete guide on permits needed before starting home renovations to avoid legal issues and conflicts with neighbors.",
    category: "Regulasi",
    category_en: "Regulation",
    image: "/images/berita3/b3-g2.jpg",
    date: "20 Sep 2024",
    date_en: "Sep 20, 2024",
    readTime: "5 menit",
    readTime_en: "5 minutes",
    slug: "izin-wajib-renovasi-rumah-2024"
  },
  {
    id: 4,
    title: "Perubahan Regulasi IMB dan Dampaknya pada Konstruksi",
    title_en: "Building Permit Regulation Changes and Their Impact on Construction",
    excerpt: "Analisis perubahan peraturan perizinan bangunan terbaru di Indonesia dan strategi adaptasinya.",
    excerpt_en: "Analysis of the latest building permit regulation changes in Indonesia and adaptation strategies.",
    category: "Regulasi",
    category_en: "Regulation",
    image: "/images/berita4/b4-g4.png",
    date: "5 Feb 2024",
    date_en: "Feb 5, 2024",
    readTime: "7 menit",
    readTime_en: "7 minutes",
    slug: "perubahan-regulasi-imb-2024"
  },
  {
    id: 5,
    title: "Teknologi Pemantauan Jarak Jauh untuk Pengelolaan Proyek",
    title_en: "Remote Monitoring Technology for Project Management",
    excerpt: "Solusi teknologi terkini untuk mengawasi dan mengelola beberapa proyek konstruksi secara bersamaan.",
    excerpt_en: "Latest technology solutions to monitor and manage multiple construction projects simultaneously.",
    category: "Teknologi",
    category_en: "Technology",
    image: "/images/berita5/gambar2-b5.png",
    date: "25 Jan 2024",
    date_en: "Jan 25, 2024",
    readTime: "5 menit",
    readTime_en: "5 minutes",
    slug: "teknologi-pemantauan-jarak-jauh-konstruksi"
  },
  {
    id: 6,
    title: "Pembangunan Gedung Ramah Lingkungan: Tren dan Standar",
    title_en: "Environmentally Friendly Building Construction: Trends and Standards",
    excerpt: "Perkembangan terkini dalam konstruksi berkelanjutan dan sertifikasi green building di Indonesia.",
    excerpt_en: "Latest developments in sustainable construction and green building certification in Indonesia.",
    category: "Proyek",
    category_en: "Project",
    image: "/images/berita6/gambar1-b6.jpeg",
    date: "18 Jan 2024",
    date_en: "Jan 18, 2024",
    readTime: "6 menit",
    readTime_en: "6 minutes",
    slug: "pembangunan-gedung-ramah-lingkungan"
  },
  {
    id: 7,
    title: "Manajemen Risiko Proyek Konstruksi Skala Menengah",
    title_en: "Medium-Scale Construction Project Risk Management",
    excerpt: "Pendekatan sistematis untuk mengidentifikasi dan memitigasi risiko dalam proyek konstruksi.",
    excerpt_en: "Systematic approach to identify and mitigate risks in construction projects.",
    category: "Manajemen",
    category_en: "Management",
    image: "/images/berita7/gambar1-b7.jpg",
    date: "10 Jan 2024",
    date_en: "Jan 10, 2024",
    readTime: "5 menit",
    readTime_en: "5 minutes",
    slug: "manajemen-risiko-proyek-konstruksi"
  },
  {
    id: 8,
    title: "Jasa Konsultasi Pra-Konstruksi untuk Optimalisasi Anggaran",
    title_en: "Pre-Construction Consultation Services for Budget Optimization",
    excerpt: "Bagaimana perencanaan matang sejak awal dapat menghemat biaya dan waktu pelaksanaan proyek.",
    excerpt_en: "How thorough planning from the beginning can save project implementation costs and time.",
    category: "Layanan",
    category_en: "Service",
    image: "/images/berita8/gambar1-b8.jpeg",
    date: "5 Jan 2024",
    date_en: "Jan 5, 2024",
    readTime: "4 menit",
    readTime_en: "4 minutes",
    slug: "jasa-konsultasi-pra-konstruksi"
  },
  {
    id: 9,
    title: "Penyesuaian Standar SNI untuk Bahan Bangunan 2024",
    title_en: "Adjustments to SNI Standards for Building Materials 2024",
    excerpt: "Perubahan regulasi standar nasional untuk material konstruksi dan implikasinya pada industri.",
    excerpt_en: "Changes in national standard regulations for construction materials and their implications for the industry.",
    category: "Regulasi",
    category_en: "Regulation",
    image: "/images/berita9/gambar1-b9.jpg",
    date: "28 Des 2023",
    date_en: "Dec 28, 2023",
    readTime: "6 menit",
    readTime_en: "6 minutes",
    slug: "perubahan-standar-sni-bahan-bangunan"
  },
  {
    id: 10,
    title: "Implementasi BIM dalam Proyek Renovasi dan Retrofit",
    title_en: "BIM Implementation in Renovation and Retrofit Projects",
    excerpt: "Penggunaan Building Information Modeling untuk meningkatkan akurasi dan efisiensi proyek renovasi.",
    excerpt_en: "Using Building Information Modeling to improve accuracy and efficiency of renovation projects.",
    category: "Teknologi",
    category_en: "Technology",
    image: "/images/berita10/gambar1-b10.jpg",
    date: "15 Des 2023",
    date_en: "Dec 15, 2023",
    readTime: "7 menit",
    readTime_en: "7 minutes",
    slug: "implementasi-bim-proyek-renovasi"
  }
];

// Blog Page Component
const BlogPage = () => {
  // Use language and theme from context
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Kategori yang disederhanakan dengan dukungan bilingual
  const categories = language === 'en' 
    ? ["All", "Project", "Service", "Management", "Regulation", "Technology"]
    : ["Semua", "Proyek", "Layanan", "Manajemen", "Regulasi", "Teknologi"];

  const [activeCategory, setActiveCategory] = useState(language === 'en' ? "All" : "Semua");
  const [searchValue, setSearchValue] = useState("");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const router = useRouter();
  
  // Helper function to map between English and Indonesian categories
  const getCategoryEquivalent = (category: string, targetLang: 'en' | 'id'): string => {
    const categoryMap: Record<string, string> = {
      'Semua': 'All',
      'Proyek': 'Project',
      'Layanan': 'Service',
      'Manajemen': 'Management',
      'Regulasi': 'Regulation',
      'Teknologi': 'Technology'
    };
    
    return targetLang === 'en' 
      ? categoryMap[category] || category 
      : Object.keys(categoryMap).find(key => categoryMap[key] === category) || category;
  };

  // Function to get category value based on language
  const getLocalizedCategory = (post: Post) => {
    return language === 'en' && post.category_en ? post.category_en : post.category;
  };
  
  // Filter berita berdasarkan kategori dan pencarian
  const filteredPosts = insightPosts
    .filter(post => {
      const categoryToCompare = language === 'en' ? 'All' : 'Semua';
      return activeCategory === categoryToCompare || getLocalizedCategory(post) === activeCategory;
    })
    .filter(post => {
      if (searchValue === "") return true;
      
      const searchTermLower = searchValue.toLowerCase();
      const title = language === 'en' && post.title_en ? post.title_en : post.title;
      const excerpt = language === 'en' && post.excerpt_en ? post.excerpt_en : post.excerpt;
      
      return (
        title.toLowerCase().includes(searchTermLower) ||
        excerpt.toLowerCase().includes(searchTermLower)
      );
    });
  
  // Urutan berdasarkan tanggal (terbaru terlebih dahulu)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = language === 'en' && a.date_en ? new Date(a.date_en) : new Date(a.date);
    const dateB = language === 'en' && b.date_en ? new Date(b.date_en) : new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Pilih kategori dan tutup menu dropdown (mobile)
  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setShowCategoryMenu(false);
  };

  // Animasi variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section dengan Background Biru */}
      <div className={`relative ${isDark ? 'bg-blue-900' : 'bg-[#0e2752]'} text-white pt-8 pb-16 md:pb-20 transition-colors duration-300`}>
        <div className="absolute inset-0 opacity-20 pattern-grid"></div>
        
        {/* Container dengan margin yang disesuaikan untuk konten rata kiri */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <button 
                onClick={() => router.push('/')} 
                className="inline-flex items-center text-white/90 hover:text-white bg-white/10 px-4 py-2 rounded-full mb-10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}
              </button>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              >
                {language === 'en' ? 'Insights & Information' : 'Insight & Informasi'}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-lg md:text-xl text-white/90 max-w-3xl"
              >
                {language === 'en' 
                  ? 'Latest information and knowledge about the construction and property world in Indonesia'
                  : 'Informasi terkini dan pengetahuan seputar dunia konstruksi dan properti di Indonesia'}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      >
        <div className="flex flex-col gap-y-6">
          {/* Baris pencarian & filter */}
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-6">
            {/* Kolom pencarian - sebelah kiri */}
            <div className="w-full md:w-2/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search articles...' : 'Cari artikel...'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={`w-full px-4 py-3 pl-10 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40' 
                      : 'bg-white border-gray-200 text-gray-800 focus:ring-[#153969]/40'
                  } border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all`}
                />
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </div>
            
            {/* Kategori - sebelah kanan */}
            <div className="w-full md:w-1/3">
              {/* Filter Kategori - Mobile */}
              <div className="md:hidden relative">
                <button 
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className={`w-full flex items-center justify-between ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-200 text-gray-800'
                  } p-3 rounded-lg shadow-sm border transition-colors duration-300`}
                >
                  <span className="flex items-center">
                    <Filter className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'} mr-2`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {language === 'en' ? 'Category: ' : 'Kategori: '}{activeCategory}
                    </span>
                  </span>
                  <ChevronDown className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
                
                {showCategoryMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-full left-0 right-0 mt-1 ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    } rounded-lg shadow-lg border z-20 overflow-hidden transition-colors duration-300`}
                  >
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => selectCategory(category)}
                        className={`w-full text-left p-3 text-sm transition-colors ${
                          activeCategory === category
                            ? isDark 
                              ? 'bg-blue-900/30 text-blue-400 font-medium' 
                              : 'bg-[#153969]/10 text-[#153969] font-medium'
                            : isDark 
                              ? 'text-gray-300 hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
              
              {/* Filter Kategori - Desktop */}
              <div className="hidden md:flex flex-wrap justify-start">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-2 rounded-md text-sm whitespace-nowrap transition-all duration-300 mx-1 mb-1 ${
                      activeCategory === category
                        ? isDark 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'bg-[#153969] text-white shadow-sm'
                        : isDark 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Hasil Pencarian */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-left"
          >
            <h2 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
              {language === 'en' 
                ? `Showing ${sortedPosts.length} articles${activeCategory !== "All" ? ` in ${activeCategory} category` : ""}`
                : `Menampilkan ${sortedPosts.length} artikel${activeCategory !== "Semua" ? ` kategori ${activeCategory}` : ""}`}
            </h2>
          </motion.div>
          
          {/* Artikel Grid dengan Animasi Stagger */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link href={`/insight/${post.slug}`} className="block h-full">
                  <div className={`${
                    isDark ? 'bg-gray-800 hover:shadow-gray-700' : 'bg-white hover:shadow-lg'
                  } rounded-lg overflow-hidden shadow-md transition-all duration-300 h-full flex flex-col`}>
                    {/* Image container */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={language === 'en' && post.title_en ? post.title_en : post.title}
                        fill
                        className="object-cover transition-all duration-500 hover:scale-105"
                      />
                      
                      {/* Category badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`${
                          getLocalizedCategory(post) === (language === 'en' ? 'Project' : 'Proyek') ? 'bg-blue-600' :
                          getLocalizedCategory(post) === (language === 'en' ? 'Management' : 'Manajemen') ? 'bg-purple-600' :
                          getLocalizedCategory(post) === (language === 'en' ? 'Regulation' : 'Regulasi') ? 'bg-red-600' :
                          getLocalizedCategory(post) === (language === 'en' ? 'Technology' : 'Teknologi') ? 'bg-green-600' :
                          getLocalizedCategory(post) === (language === 'en' ? 'Service' : 'Layanan') ? 'bg-orange-600' : 'bg-[#153969]'
                        } text-white text-xs px-2.5 py-1 rounded-md`}>
                          {getLocalizedCategory(post)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                          {language === 'en' && post.date_en ? post.date_en : post.date}
                        </span>
                        <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{language === 'en' && post.readTime_en ? post.readTime_en : post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className={`font-bold text-base md:text-lg ${isDark ? 'text-white' : 'text-gray-800'} mb-2 line-clamp-2 transition-colors duration-300`}>
                        {language === 'en' && post.title_en ? post.title_en : post.title}
                      </h3>
                      
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 line-clamp-3 flex-grow transition-colors duration-300`}>
                        {language === 'en' && post.excerpt_en ? post.excerpt_en : post.excerpt}
                      </p>
                      
                      <div className={`inline-flex items-center ${isDark ? 'text-blue-400' : 'text-[#153969]'} font-medium text-sm mt-auto group transition-colors duration-300`}>
                        <span>{language === 'en' ? 'Read More' : 'Baca Selengkapnya'}</span>
                        <ArrowRight className="ml-1 h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Tidak Ada Hasil */}
          {sortedPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 text-center shadow-sm transition-colors duration-300`}
            >
              <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-16 w-16 mx-auto ${isDark ? 'text-gray-600' : 'text-gray-300'}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className={`text-lg font-medium mt-4 ${isDark ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
                  {language === 'en' ? 'No matching articles found' : 'Tidak ditemukan artikel yang sesuai'}
                </h3>
                <p className={`${isDark ? 'text-gray-500' : 'text-gray-400'} mt-2 transition-colors duration-300`}>
                  {language === 'en' 
                    ? 'Please try a different keyword or select a different category'
                    : 'Silakan coba kata kunci lain atau pilih kategori yang berbeda'}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchValue("");
                  setActiveCategory(language === 'en' ? "All" : "Semua");
                }}
                className={`mt-4 px-4 py-2 ${
                  isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#153969] hover:bg-[#0f2a4d]'
                } text-white rounded-lg transition-colors`}
              >
                {language === 'en' ? 'Reset Search' : 'Reset Pencarian'}
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* CSS untuk styling */}
      <style jsx global>{`
        .pattern-grid {
          background-image: radial-gradient(#ffffff 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;