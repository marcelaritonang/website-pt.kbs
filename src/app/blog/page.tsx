'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Search, ChevronDown, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Definisikan tipe untuk post
interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
}

// Data berita yang relevan dengan konstruksi di Indonesia
const insightPosts: Post[] = [
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

// Blog Page Component
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchValue, setSearchValue] = useState("");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const router = useRouter();
  
  // Filter berita berdasarkan kategori dan pencarian
  const filteredPosts = insightPosts
    .filter(post => activeCategory === "Semua" || post.category === activeCategory)
    .filter(post => 
      searchValue === "" || 
      post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchValue.toLowerCase())
    );
  
  // Urutan berdasarkan tanggal (terbaru terlebih dahulu)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section dengan Background Biru */}
      <div className="relative bg-[#0e2752] text-white pt-8 pb-16 md:pb-20">
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
                Kembali ke Beranda
              </button>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              >
                Insight & Informasi
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-lg md:text-xl text-white/90 max-w-3xl"
              >
                Informasi terkini dan pengetahuan seputar dunia konstruksi dan properti di Indonesia
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
                  placeholder="Cari artikel..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#153969]/40 transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Kategori - sebelah kanan */}
            <div className="w-full md:w-1/3">
              {/* Filter Kategori - Mobile */}
              <div className="md:hidden relative">
                <button 
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className="w-full flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                >
                  <span className="flex items-center">
                    <Filter className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-800">Kategori: {activeCategory}</span>
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                
                {showCategoryMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden"
                  >
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => selectCategory(category)}
                        className={`w-full text-left p-3 text-sm transition-colors ${
                          activeCategory === category
                            ? 'bg-[#153969]/10 text-[#153969] font-medium'
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
                        ? 'bg-[#153969] text-white shadow-sm'
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
            <h2 className="text-lg font-medium text-gray-900">
              Menampilkan {sortedPosts.length} artikel
              {activeCategory !== "Semua" ? ` kategori ${activeCategory}` : ""}
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
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    {/* Image container */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-all duration-500 hover:scale-105"
                      />
                      
                      {/* Category badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`bg-[#153969] text-white text-xs px-2.5 py-1 rounded-md ${
                          post.category === 'Proyek' ? 'bg-blue-600' :
                          post.category === 'Manajemen' ? 'bg-purple-600' :
                          post.category === 'Regulasi' ? 'bg-red-600' :
                          post.category === 'Teknologi' ? 'bg-green-600' :
                          post.category === 'Layanan' ? 'bg-orange-600' : 'bg-[#153969]'
                        }`}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
                        <span>{post.date}</span>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-base md:text-lg text-gray-800 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="inline-flex items-center text-[#153969] font-medium text-sm mt-auto group">
                        <span>Baca Selengkapnya</span>
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
              className="bg-white rounded-lg p-8 text-center shadow-sm"
            >
              <div className="text-gray-500 mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 mx-auto text-gray-300" 
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
                <h3 className="text-lg font-medium mt-4">Tidak ditemukan artikel yang sesuai</h3>
                <p className="text-gray-400 mt-2">Silakan coba kata kunci lain atau pilih kategori yang berbeda</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchValue("");
                  setActiveCategory("Semua");
                }}
                className="mt-4 px-4 py-2 bg-[#153969] text-white rounded-lg hover:bg-[#0f2a4d] transition-colors"
              >
                Reset Pencarian
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