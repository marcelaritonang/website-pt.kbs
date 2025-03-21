'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, MapPin, Building, Filter, X, DollarSign, ExternalLink } from 'lucide-react';

// Define interfaces for TypeScript
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  client: string;
  date: string;
  contractNumber?: string;
  value: string;
  description: string;
  scope?: string;
  subCategory?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProjectsPage() {
  // Refs
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<number>(6);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Project categories
  const categories: Category[] = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'building', name: 'Konstruksi Bangunan' },
    { id: 'infrastructure', name: 'Infrastruktur' },
    { id: 'interior', name: 'Interior' },
    { id: 'rehabilitation', name: 'Rehabilitasi' },
    { id: 'landDevelopment', name: 'Pengembangan Lahan' },
    { id: 'waterStructure', name: 'Bangunan Air' },
  ];

  // Project data berdasarkan daftar proyek dari gambar
  const projectsData: Project[] = [
    {
      id: 1,
      title: "Proyek Pekerjaan Cut & Fill, Jalan dan Saluran, Bangunan Rumah bertipe Type",
      category: "building",
      subCategory: "Konstruksi Sipil & ME",
      image: "/images/projects/project1.jpg",
      location: "Semarang",
      client: "PT. Anugerah Griya Lestari",
      date: "9 Agustus 2014",
      contractNumber: "22/DH/AGL/9/08",
      value: "Rp 41.212.000.000",
      description: "Proyek konstruksi perumahan yang mencakup pekerjaan cut & fill, pembangunan jalan dan saluran, serta konstruksi rumah bertipe.",
      scope: "Konstruksi"
    },
    {
      id: 2,
      title: "Rehabilitasi Jalan dan Jembatan Ruas Cipanas - Warung Banten",
      category: "rehabilitation",
      subCategory: "Pekerjaan Rehabilitasi Jalan",
      image: "/images/projects/project2.jpg",
      location: "Banten",
      client: "PT. Jaya Konstruksi MP, TBK",
      date: "30 Agustus 2021",
      contractNumber: "JKN/SPK/2021/011",
      value: "Rp 5.146.000.000",
      description: "Proyek rehabilitasi jalan dan jembatan pada ruas Cipanas-Warung Banten untuk meningkatkan kualitas infrastruktur jalan.",
      scope: "Timbunan"
    },
    {
      id: 3,
      title: "Pekerjaan Reflected Pond Lobby Grand Hyatt",
      category: "interior",
      subCategory: "Interior",
      image: "/images/projects/project3.jpg",
      location: "Jakarta",
      client: "PT. Plaza Indonesia Realty TBK",
      date: "11 April 2021",
      contractNumber: "GH/PE/G/04",
      value: "Rp 2.867.000.000",
      description: "Pekerjaan reflected pond untuk area lobby hotel Grand Hyatt Jakarta dengan konsep desain modern.",
      scope: "Interior Lobby"
    },
    {
      id: 4,
      title: "Interior & Furniture Club House Zora BSD City",
      category: "interior",
      subCategory: "Interior",
      image: "/images/projects/project4.jpg",
      location: "Tangerang",
      client: "PT. Multi Bangun Persada",
      date: "22 Februari 2021",
      contractNumber: "79/MBP-KBS/CH/2/2021",
      value: "Rp 58.325.785.000",
      description: "Pekerjaan interior dan furniture untuk club house di kawasan perumahan Zora BSD City.",
      scope: "Interior"
    },
    {
      id: 5,
      title: "Pembangunan Sekolah dan Mushola",
      category: "building",
      subCategory: "Konstruksi Bangunan Gedung",
      image: "/images/projects/project5.jpg",
      location: "Parung - Bogor",
      client: "World Assembly Muslim Youth (WAMY)",
      date: "25 Januari 2021",
      contractNumber: "WAM/Y36/KBS/PSM/1/2021",
      value: "Rp 385.244.276.000",
      description: "Proyek pembangunan fasilitas sekolah dan mushola di kawasan Parung, Bogor untuk organisasi WAMY.",
      scope: "Bangunan Gedung"
    },
    {
      id: 6,
      title: "Pekerjaan Timbunan (Urugan) Perumahan Alam Sutera I",
      category: "landDevelopment",
      subCategory: "Pekerjaan Perumahan",
      image: "/images/projects/project6.jpg",
      location: "Tangerang",
      client: "PT. Aneka Jaring Indonesia",
      date: "16 Maret 2021",
      contractNumber: "AJI/SPK/2021/09",
      value: "Rp 127.873.000.000",
      description: "Pekerjaan timbunan dan urugan untuk pengembangan perumahan Alam Sutera I.",
      scope: "Pematangan Lahan"
    },
    {
      id: 7,
      title: "Pekerjaan Timbunan (Urugan) Perumahan Alam Sutera II Cikupa",
      category: "landDevelopment",
      subCategory: "Pekerjaan Perumahan",
      image: "/images/projects/project7.jpg",
      location: "Cikupa - Tangerang",
      client: "PT. Pratama Widya",
      date: "21 April 2021",
      contractNumber: "PW/SPK-KBS/2021",
      value: "Rp 82.658.685.000",
      description: "Pekerjaan timbunan dan urugan untuk pengembangan perumahan Alam Sutera II di kawasan Cikupa.",
      scope: "Pematangan Lahan"
    },
    {
      id: 8,
      title: "Pembangunan Condotel HAPPER Ciawi Tower A, B, C",
      category: "building",
      subCategory: "Konstruksi Bangunan Gedung",
      image: "/images/projects/project8.jpg",
      location: "Ciawi - Bogor",
      client: "PT. Lingga Dewata Agung",
      date: "20 Juli 2022",
      contractNumber: "0501-KONTRAK-CH-CLDA-JAP-2022",
      value: "Rp 465.245.478.000",
      description: "Proyek pembangunan condotel yang terdiri dari 3 tower di kawasan Ciawi, Bogor.",
      scope: "Bangunan Gedung"
    },
    {
      id: 9,
      title: "Proyek Banjir Kanal Timur Paket 30",
      category: "infrastructure",
      subCategory: "Pekerjaan Batu",
      image: "/images/projects/project9.jpg",
      location: "Bekasi",
      client: "PT. Jaya Konstruksi MP, TBK",
      date: "15 Mei 2001",
      contractNumber: "11/15/2001",
      value: "Rp 726.895.250",
      description: "Proyek pengendalian banjir melalui pembangunan Banjir Kanal Timur paket 30 di area Bekasi.",
      scope: "Pekerjaan Batu"
    },
    {
      id: 10,
      title: "Proyek Normalisasi Kali Pesanggrahan Paket 3",
      category: "infrastructure",
      subCategory: "Pekerjaan Tanah",
      image: "/images/projects/project10.jpg",
      location: "Jakarta",
      client: "PT. Pembangunan Perumahan (Persero)",
      date: "25 Januari 2012",
      contractNumber: "1/25/2012",
      value: "Rp 21.282.023.300",
      description: "Proyek normalisasi Kali Pesanggrahan untuk mengatasi masalah banjir di Jakarta.",
      scope: "Pengerukan Lumpur"
    },
    {
      id: 11,
      title: "Proyek Pekerjaan Cut & Fill, Land Clearing, Saluran Drainase dan Pekerjaan Jalan Utama Kawasan Industri Subang",
      category: "infrastructure",
      subCategory: "Pekerjaan Infrastruktur dan Pematangan Lahan",
      image: "/images/projects/project11.jpg",
      location: "Kalijati - Subang",
      client: "PT. Nusa Raya Cipta",
      date: "13 Mei 2022",
      contractNumber: "063-KONTRAK-KIS-NRC-KBS 2022",
      value: "Rp 332.280.000.000",
      description: "Proyek pengembangan infrastruktur kawasan industri di Subang yang mencakup pekerjaan cut & fill, land clearing, pembangunan saluran drainase, dan pembangunan jalan utama.",
      scope: "Pengerjaan Lahan"
    },
    {
      id: 12,
      title: "Proyek Dredging and Embankment Cilegon/Anyer Floodway",
      category: "infrastructure",
      subCategory: "Pekerjaan Dredging and Dispose",
      image: "/images/projects/project12.jpg",
      location: "Jakarta",
      client: "ADHI-WASKITA JV",
      date: "21 Februari 2014",
      contractNumber: "02/SPP/JUFMP-2/A/ADHI-WASKON JV/2014",
      value: "Rp 31.663.220.000",
      description: "Proyek pengerukan dan pembuatan tanggul di area Cilegon/Anyer untuk mengendalikan banjir.",
      scope: "Saluran"
    },
    {
      id: 13,
      title: "Pembangunan Pengamanan Pantai di Jakarta",
      category: "waterStructure",
      subCategory: "Pekerjaan Bangunan Air",
      image: "/images/projects/project13.jpg",
      location: "Jakarta",
      client: "BBWS Ciliwung – Cisadane",
      date: "30 Juni 2014",
      contractNumber: "HK.02.03/PPK.SP-LSRWT PSA-CCS/V/17",
      value: "Rp 8.324.450.000",
      description: "Proyek pembangunan struktur pengamanan pantai untuk melindungi area pesisir Jakarta dari abrasi dan dampak kenaikan permukaan air laut.",
      scope: "Pemancangan"
    },
    {
      id: 14,
      title: "Normalisasi Kali Krukut",
      category: "waterStructure",
      subCategory: "Pekerjaan Bangunan Air",
      image: "/images/projects/project14.jpg",
      location: "Jakarta",
      client: "BBWS Ciliwung – Cisadane",
      date: "18 Mei 2015",
      contractNumber: "HK.02.03/PPK.SP-LSRWT PSA-CCS/V/138",
      value: "Rp 23.373.916.000",
      description: "Proyek normalisasi Kali Krukut untuk mengatasi masalah banjir dan meningkatkan kapasitas aliran air.",
      scope: "Pemancangan"
    },
    {
      id: 15,
      title: "Pemeliharaan Situ Tangerang",
      category: "waterStructure",
      subCategory: "Pemeliharaan Bangunan Air",
      image: "/images/projects/project15.jpg",
      location: "Bogor",
      client: "Pekerjaan Umum Perumahan Rakyat",
      date: "23 Maret 2016",
      contractNumber: "HK.02.03/PPK-OPSDA II/SATKER PSDA/C/JN/2016/717",
      value: "Rp 2.239.137.000",
      description: "Proyek pemeliharaan Situ Tangerang untuk menjaga fungsi resapan air dan mencegah banjir di area sekitar.",
      scope: "Galian"
    },
    {
      id: 16,
      title: "Pekerjaan Struktur, Sipil, MEP dan Interior Restoran Seuara JB Mansion",
      category: "building",
      subCategory: "Konstruksi Bangunan Gedung",
      image: "/images/projects/project16.jpg",
      location: "Jakarta",
      client: "PT. Multi Bangun Persada",
      date: "17 Februari 2020",
      contractNumber: "215/MBP-KBS/SP/RR/II/2020",
      value: "Rp 22.553.037.000",
      description: "Proyek renovasi dan pembangunan struktur, sipil, MEP dan interior untuk restoran Seuara di JB Mansion.",
      scope: "Struktur"
    },
    {
      id: 17,
      title: "Pekerjaan Struktur Sipil, MEP dan Interior Showroom Bergler Krisshaku",
      category: "building",
      subCategory: "Konstruksi Bangunan Gedung",
      image: "/images/projects/project17.jpg",
      location: "Tangerang",
      client: "PT. Multi Bangun Persada",
      date: "23 Juni 2020",
      contractNumber: "422/MBP-KBS/SBK/VI/2020",
      value: "Rp 324.566.170.000",
      description: "Proyek pembangunan showroom Bergler Krisshaku yang mencakup pekerjaan struktur, sipil, MEP, dan interior.",
      scope: "Struktur"
    },
    {
      id: 18,
      title: "Infrastruktur Kawasan Proyek OPD Kabupaten Karawang",
      category: "infrastructure",
      subCategory: "Konstruksi Bangunan Umum",
      image: "/images/projects/project18.jpg",
      location: "Karawang",
      client: "PT. Trincanala Sakti Utama",
      date: "06 April 2020",
      contractNumber: "OPD/26/TSU/KBS/IV/20",
      value: "Rp 258.112.576.000",
      description: "Proyek pembangunan infrastruktur kawasan OPD di Kabupaten Karawang untuk mendukung aktivitas pemerintahan.",
      scope: "Infrastruktur"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    hover: { 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };
  
  // Handle view detail
  const handleViewDetail = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Scroll to projects when filter is applied
  const scrollToProjects = () => {
    if (projectsRef.current) {
      const yOffset = -100; // Offset to account for sticky header
      const y = projectsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Filter projects based on category and search term
  useEffect(() => {
    let filtered = projectsData;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.client.toLowerCase().includes(searchLower) ||
        project.location.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        (project.subCategory && project.subCategory.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredProjects(filtered);
    
    // If filter changes, scroll to projects section
    if ((activeCategory !== 'all' || searchTerm) && projectsRef.current) {
      scrollToProjects();
    }
  }, [activeCategory, searchTerm]);

  // Load more projects function
  const loadMoreProjects = () => {
    setVisibleProjects(prev => prev + 6);
  };

  // Toggle filter function for mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Reset filters
  const resetFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/projects-hero.jpg"
          alt="Proyek Kami"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block bg-[#153969] text-white px-3 py-1 rounded text-sm font-medium mb-3">Portofolio</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Proyek Kami
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Portofolio lengkap proyek-proyek yang telah kami kerjakan dengan berbagai klien terkemuka
                </p>
                <button 
                  onClick={scrollToProjects}
                  className="px-6 py-3 bg-[#153969] hover:bg-[#0f2a4d] text-white rounded-md font-medium transition-colors shadow-md inline-flex items-center gap-2"
                >
                  Lihat Proyek
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="py-8 md:py-12 bg-gray-50 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Cari proyek..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-[#153969] focus:outline-none focus:ring-1 focus:ring-[#153969]"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="h-4 w-4" />
                  </div>
                </div>
                
                {/* Mobile Filter Toggle */}
                <button
                  onClick={toggleFilter}
                  className="md:hidden flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
              
              {/* Desktop Category Filters */}
              <div className="hidden md:flex items-center space-x-2 overflow-x-auto py-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                      activeCategory === category.id
                        ? 'bg-[#153969] text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                {(activeCategory !== 'all' || searchTerm) && (
                  <button
                    onClick={resetFilters}
                    className="whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 flex items-center gap-1"
                  >
                    <X className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile Category Filters */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 md:hidden"
                >
                  <div className="flex flex-wrap gap-2 py-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setIsFilterOpen(false);
                        }}
                        className={`whitespace-nowrap px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                          activeCategory === category.id
                            ? 'bg-[#153969] text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                    {(activeCategory !== 'all' || searchTerm) && (
                      <button
                        onClick={() => {
                          resetFilters();
                          setIsFilterOpen(false);
                        }}
                        className="whitespace-nowrap px-3 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center gap-1"
                      >
                        <X className="h-3 w-3" />
                        Reset Filter
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Active Filters Summary */}
            {(activeCategory !== 'all' || searchTerm) && (
              <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500">
                <span className="mr-2">Filter aktif:</span>
                {activeCategory !== 'all' && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full mr-2 mb-1 inline-flex items-center">
                    {categories.find(c => c.id === activeCategory)?.name}
                  </span>
                )}
                {searchTerm && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full mr-2 mb-1 inline-flex items-center">
                    "{searchTerm}"
                  </span>
                )}
                <span className="text-gray-400">
                  {filteredProjects.length} proyek ditemukan
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-6xl mx-auto"
          >
            {filteredProjects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.slice(0, visibleProjects).map((project) => (
                      <motion.div 
                        key={project.id}
                        layout
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                          <div className="absolute top-3 right-3">
                            <span className="bg-[#153969] text-white text-xs font-semibold px-2.5 py-1.5 rounded-full">
                              {categories.find(c => c.id === project.category)?.name || 'Proyek'}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                            <h3 className="text-lg font-bold mb-1 line-clamp-2">
                              {project.title}
                            </h3>
                            <div className="flex items-center text-white/90 text-sm">
                              <MapPin className="h-3.5 w-3.5 mr-1 inline-flex" />
                              {project.location}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                          <div className="flex items-start">
                              <Building className="h-4 w-4 text-[#153969] mr-1.5 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-sm line-clamp-1">{project.client}</span>
                            </div>
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                              {project.date.split(' ')[2]}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 text-[#153969] mr-1.5 flex-shrink-0" />
                              <span>{project.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="h-4 w-4 text-[#153969] mr-1.5 flex-shrink-0" />
                              <span className="font-medium">{project.value}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                              {project.subCategory}
                            </div>
                            <button 
                              onClick={() => handleViewDetail(project)}
                              className="text-[#153969] text-sm font-medium hover:text-[#0f2a4d] flex items-center gap-1 transition-colors"
                            >
                              Detail
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {visibleProjects < filteredProjects.length && (
                  <div className="mt-12 text-center">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={loadMoreProjects}
                      className="px-8 py-3 bg-white border border-[#153969] text-[#153969] hover:bg-[#153969] hover:text-white rounded-full font-medium transition-all duration-300 shadow-sm inline-flex items-center"
                    >
                      Muat Lebih Banyak
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </motion.button>
                  </div>
                )}
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 max-w-lg mx-auto"
              >
                <div className="bg-gray-50 p-10 rounded-xl mb-6">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Proyek Ditemukan</h3>
                  <p className="text-gray-600 mb-6">
                    Tidak ada proyek yang cocok dengan kriteria pencarian Anda. Silakan coba pencarian lain atau pilih kategori yang berbeda.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-[#153969] hover:bg-[#0f2a4d] text-white rounded-full font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Reset Filter
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden relative z-10"
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-colors z-10"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-[#153969] text-white text-xs px-2.5 py-1 rounded-full">
                      {categories.find(c => c.id === selectedProject.category)?.name}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                      {selectedProject.subCategory}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{selectedProject.title}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Informasi Proyek</h3>
                    <p className="text-gray-700 mb-6">{selectedProject.description}</p>
                    
                    {selectedProject.scope && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-800 mb-2">Ruang Lingkup Pekerjaan</h4>
                        <p className="text-gray-700">
                          {selectedProject.scope}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Detail Proyek</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500">Klien</p>
                        <p className="font-medium text-gray-800">{selectedProject.client}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Lokasi</p>
                        <p className="font-medium text-gray-800">{selectedProject.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tanggal</p>
                        <p className="font-medium text-gray-800">{selectedProject.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Nomor Kontrak</p>
                        <p className="font-medium text-gray-800">{selectedProject.contractNumber || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Nilai Proyek</p>
                        <p className="font-medium text-gray-800">{selectedProject.value}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link href="/contact" className="block w-full py-2.5 bg-[#153969] text-white text-center rounded-lg font-medium hover:bg-[#0f2a4d] transition-colors">
                        Hubungi Kami
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Portfolio Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-[#153969] mb-3">
              Portofolio Kami dalam Angka
            </h2>
            <div className="w-16 h-1 bg-[#153969] mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-3xl font-bold text-[#153969] mb-2">18+</div>
              <div className="text-gray-600">Proyek Selesai</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-3xl font-bold text-[#153969] mb-2">10+</div>
              <div className="text-gray-600">Kota & Kabupaten</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-3xl font-bold text-[#153969] mb-2">15+</div>
              <div className="text-gray-600">Klien Puas</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center transform transition-transform hover:scale-105 duration-300">
              <div className="text-3xl font-bold text-[#153969] mb-2">95%</div>
              <div className="text-gray-600">Tepat Waktu</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#153969] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002-2h2a2 2 0 002 2M9 5v2h6V5" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Punya Proyek yang Ingin Dikerjakan?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Tim kami siap membantu mewujudkan proyek Anda dengan kualitas terbaik dan profesionalisme tinggi
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="px-8 py-3 bg-white text-[#153969] hover:bg-gray-100 rounded-full font-medium transition-colors shadow-lg">
                Hubungi Kami
              </Link>
              <Link href="/services" className="px-8 py-3 border border-white hover:bg-white/10 text-white rounded-full font-medium transition-colors">
                Lihat Layanan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}