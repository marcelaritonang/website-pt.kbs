'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Building, Briefcase, Award, Wrench } from 'lucide-react';

// Data berita yang lebih formal dan relevan untuk perusahaan konstruksi menengah
const insightPosts = [
  {
    id: 1,
    title: "Penggunaan Teknologi BIM dalam Optimalisasi Proyek Gedung Perkantoran",
    excerpt: "Implementasi Building Information Modeling (BIM) sebagai solusi efisiensi dalam perencanaan dan pelaksanaan proyek konstruksi gedung perkantoran multi-lantai.",
    category: "Teknologi",
    image: "/images/bim-technology.jpg",
    date: "12 Maret 2024",
    type: "Studi Kasus",
    slug: "teknologi-bim-optimalisasi-proyek"
  },
  {
    id: 2,
    title: "Strategi Mitigasi Risiko dalam Proyek Konstruksi Skala Menengah",
    excerpt: "Analisis pendekatan proaktif dalam mengidentifikasi dan meminimalkan risiko pada tahap perencanaan hingga penyelesaian proyek konstruksi.",
    category: "Manajemen Proyek",
    image: "/images/risk-management.jpg",
    date: "28 Februari 2024",
    type: "Panduan",
    slug: "strategi-mitigasi-risiko-konstruksi"
  },
  {
    id: 3,
    title: "Peresmian Proyek Renovasi Kantor Cabang Bank XYZ",
    excerpt: "PT Karya Bangun Semesta berhasil menyelesaikan proyek renovasi kantor cabang utama Bank XYZ dengan tepat waktu dan sesuai standar keamanan perbankan terkini.",
    category: "Proyek",
    image: "/images/bank-renovation.jpg",
    date: "15 Februari 2024",
    type: "Penyelesaian Proyek",
    slug: "peresmian-renovasi-bank-xyz"
  },
  {
    id: 4,
    title: "Evaluasi Perubahan Regulasi IMB dan Dampaknya Terhadap Pengembangan Properti",
    excerpt: "Ulasan komprehensif mengenai perubahan regulasi Izin Mendirikan Bangunan (IMB) dan implementasinya pada proses perencanaan dan konstruksi.",
    category: "Regulasi",
    image: "/images/building-permit.jpg",
    date: "5 Februari 2024",
    type: "Analisis",
    slug: "evaluasi-perubahan-regulasi-imb"
  },
  {
    id: 5,
    title: "Penggunaan Material Lokal Berkualitas dalam Proyek Konstruksi Berkelanjutan",
    excerpt: "Mengoptimalkan penggunaan material lokal untuk mengurangi jejak karbon sekaligus mendukung industri dalam negeri tanpa mengorbankan kualitas konstruksi.",
    category: "Material",
    image: "/images/local-materials.jpg",
    date: "22 Januari 2024",
    type: "Praktik Terbaik",
    slug: "material-lokal-konstruksi-berkelanjutan"
  },
  {
    id: 6,
    title: "Pendekatan Efisiensi Biaya dalam Renovasi Bangunan Komersial",
    excerpt: "Strategi mengoptimalkan anggaran renovasi dengan tetap mempertahankan kualitas dan nilai estetika pada properti komersial.",
    category: "Biaya & Nilai",
    image: "/images/cost-efficiency.jpg",
    date: "10 Januari 2024",
    type: "Panduan",
    slug: "efisiensi-biaya-renovasi-komersial"
  }
];

// Kategori (untuk filter)
const categories = ["Semua", "Proyek", "Teknologi", "Manajemen Proyek", "Regulasi", "Material", "Biaya & Nilai"];

const BlogNewsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  
  // Filter berita berdasarkan kategori
  const filteredPosts = activeCategory === "Semua" 
    ? insightPosts.slice(0, 4) // Hanya tampilkan 4 artikel terbaru di halaman utama
    : insightPosts.filter(post => post.category === activeCategory).slice(0, 4);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#153969] mb-4">
            Insight & Informasi Industri
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pengetahuan dan pengalaman kami dalam industri konstruksi selama 11 tahun
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md text-sm md:text-base transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#153969] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-[#153969] text-white text-xs font-medium px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <span className="ml-2 bg-white/90 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-md">
                    {post.type}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-gray-500 text-xs mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{post.date}</span>
                </div>
                
                <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {post.excerpt}
                </p>
                
                <Link href={`/insight/${post.slug}`} className="inline-flex items-center text-[#153969] font-medium text-sm hover:underline group mt-2">
                  Baca Selengkapnya
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/insight"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#153969] to-[#718bab] text-white font-medium rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Lihat Semua Insight
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>

        {/* Achievement Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Building className="h-10 w-10 text-[#153969] mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Proyek Sukses</h3>
            <p className="text-sm text-gray-600">Lebih dari 30 proyek konstruksi yang berhasil diselesaikan tepat waktu.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Briefcase className="h-10 w-10 text-[#153969] mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Pengalaman</h3>
            <p className="text-sm text-gray-600">11 tahun pengalaman dalam industri konstruksi skala menengah.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Award className="h-10 w-10 text-[#153969] mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Sertifikasi</h3>
            <p className="text-sm text-gray-600">Memiliki sertifikasi profesional tingkat lanjut di bidang konstruksi.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Wrench className="h-10 w-10 text-[#153969] mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Keahlian</h3>
            <p className="text-sm text-gray-600">Spesialisasi dalam renovasi, konstruksi gedung, dan infrastruktur komersial.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogNewsSection;