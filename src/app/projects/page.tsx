'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, MapPin, Building, Filter, X, ExternalLink, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

// Define interfaces for TypeScript
interface Project {
  id: number;
  title: string;
  title_en?: string;
  category: string;
  image: string;
  location: string;
  client: string;
  date: string;
  contractNumber?: string;
  description: string;
  description_en?: string;
  scope?: string;
  scope_en?: string;
  subCategory?: string;
  subCategory_en?: string;
}

interface Category {
  id: string;
  name: string;
  name_en: string;
}

export default function ProjectsPage() {
  // Language and Theme context
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Client-side rendering state
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Project categories
  const categories: Category[] = [
    { id: 'all', name: 'Semua Kategori', name_en: 'All Categories' },
    { id: 'building', name: 'Konstruksi Bangunan', name_en: 'Building Construction' },
    { id: 'infrastructure', name: 'Infrastruktur', name_en: 'Infrastructure' },
    { id: 'interior', name: 'Interior', name_en: 'Interior' },
    { id: 'rehabilitation', name: 'Rehabilitasi', name_en: 'Rehabilitation' },
    { id: 'landDevelopment', name: 'Pengembangan Lahan', name_en: 'Land Development' },
    { id: 'waterStructure', name: 'Bangunan Air', name_en: 'Water Structure' },
  ];

  // Project data with English translations
  const projectsData: Project[] = [
    {
      id: 1,
      title: "Proyek Pekerjaan Cut & Fill, Jalan dan Saluran, Bangunan Rumah bertipe Type",
      title_en: "Cut & Fill, Road and Channel Works, Typical Houses Construction Project",
      category: "building",
      subCategory: "Konstruksi Sipil & ME",
      subCategory_en: "Civil & Mechanical Electrical Construction",
      image: "/images/proyek/1.jpg",
      location: "Semarang",
      client: "PT. Anugerah Griya Lestari",
      date: "9 Agustus 2014",
      contractNumber: "22/DH/AGL/9/08",
      description: "Proyek konstruksi perumahan yang mencakup pekerjaan cut & fill, pembangunan jalan dan saluran, serta konstruksi rumah bertipe.",
      description_en: "Housing construction project including cut & fill work, road and channel construction, and typical house construction.",
      scope: "Konstruksi",
      scope_en: "Construction"
    },
    {
      id: 2,
      title: "Proyek Banjir Kanal Timur Paket 30",
      title_en: "East Flood Canal Project Package 30",
      category: "infrastructure",
      subCategory: "Pekerjaan Batu",
      subCategory_en: "Stone Works",
      image: "/images/proyek/2.jpg",
      location: "Bekasi",
      client: "PT. Jaya Konstruksi MP, TBK",
      date: "15 Mei 2001",
      contractNumber: "11/15/2001",
      description: "Proyek pengendalian banjir melalui pembangunan Banjir Kanal Timur paket 30 di area Bekasi.",
      description_en: "Flood control project through the construction of the East Flood Canal package 30 in the Bekasi area.",
      scope: "Pekerjaan Batu",
      scope_en: "Stone Works"
    },
    {
      id: 3,
      title: "Proyek Normalisasi Kali Pesanggrahan Paket 3",
      title_en: "Pesanggrahan River Normalization Project Package 3",
      category: "infrastructure",
      subCategory: "Pekerjaan Tanah",
      subCategory_en: "Earth Works",
      image: "/images/proyek/3.jpg",
      location: "Jakarta",
      client: "PT. Pembangunan Perumahan (Persero)",
      date: "25 Januari 2012",
      contractNumber: "1/25/2012",
      description: "Proyek normalisasi Kali Pesanggrahan untuk mengatasi masalah banjir di Jakarta.",
      description_en: "Pesanggrahan River normalization project to address flooding issues in Jakarta.",
      scope: "Pengerukan Lumpur",
      scope_en: "Mud Dredging"
    },
    {
      id: 4,
      title: "Proyek Dredging and Embankment cengkareng Floodway",
      title_en: "Cengkareng Floodway Dredging and Embankment Project",
      category: "infrastructure",
      subCategory: "Pekerjaan Dredging and Dispose",
      subCategory_en: "Dredging and Disposal Works",
      image: "/images/proyek/4.jpg",
      location: "Jakarta",
      client: "ADHI-WASKITA JV",
      date: "21 Februari 2014",
      contractNumber: "02/SPP/JUFMP-2/A/ADHI-WASKON JV/2014",
      description: "Proyek pengerukan dan pembuatan tanggul di area cengkareng untuk mengendalikan banjir.",
      description_en: "Dredging and embankment project in the Cengkareng area for flood control.",
      scope: "Saluran",
      scope_en: "Channel"
    },
    {
      id: 5,
      title: "Pembangunan Pengamanan Pantai di Jakarta",
      title_en: "Jakarta Coastal Protection Construction",
      category: "waterStructure",
      subCategory: "Pekerjaan Bangunan Air",
      subCategory_en: "Water Structure Works",
      image: "/images/proyek/5.jpg",
      location: "Jakarta",
      client: "BBWS Ciliwung – Cisadane",
      date: "30 Juni 2014",
      contractNumber: "HK.02.03/PPK.SP-LSRWT PSA-CCS/V/17",
      description: "Proyek pembangunan struktur pengamanan pantai untuk melindungi area pesisir Jakarta dari abrasi dan dampak kenaikan permukaan air laut.",
      description_en: "Coastal protection structure construction project to protect Jakarta's coastal areas from abrasion and sea level rise impacts.",
      scope: "Pemancangan",
      scope_en: "Piling"
    },
    // Rest of the projects follow a similar pattern...
    {
      id: 6,
      title: "Normalisasi Kali Krukut",
      title_en: "Krukut River Normalization",
      category: "waterStructure",
      subCategory: "Pekerjaan Bangunan Air",
      subCategory_en: "Water Structure Works",
      image: "/images/proyek/6.jpg",
      location: "Jakarta",
      client: "BBWS Ciliwung – Cisadane",
      date: "18 Mei 2015",
      contractNumber: "HK.02.03/PPK.SP-LSRWT PSA-CCS/V/138",
      description: "Proyek normalisasi Kali Krukut untuk mengatasi masalah banjir dan meningkatkan kapasitas aliran air.",
      description_en: "Krukut River normalization project to address flooding issues and increase water flow capacity.",
      scope: "Pemancangan",
      scope_en: "Piling"
    },
    {
      id: 7,
      title: "Pemeliharaan Situ tarogong",
      title_en: "Situ Tarogong Maintenance",
      category: "waterStructure",
      subCategory: "Pemeliharaan Bangunan Air",
      subCategory_en: "Water Structure Maintenance",
      image: "/images/proyek/7.jpeg",
      location: "Bogor",
      client: "Pekerjaan Umum Perumahan Rakyat",
      date: "23 Maret 2016",
      contractNumber: "HK.02.03/PPK-OPSDA II/SATKER PSDA/C/JN/2016/717",
      description: "Proyek pemeliharaan Situ tarogong untuk menjaga fungsi resapan air dan mencegah banjir di area sekitar.",
      description_en: "Situ Tarogong maintenance project to maintain water absorption function and prevent flooding in surrounding areas.",
      scope: "Galian",
      scope_en: "Excavation"
    },
    {
      id: 8,
      title: "Rehabilitasi Jalan dan Jembatan Ruas Cipanas - Warung Banten",
      title_en: "Cipanas - Warung Banten Road and Bridge Rehabilitation",
      category: "rehabilitation",
      subCategory: "Pekerjaan Rehabilitasi Jalan",
      subCategory_en: "Road Rehabilitation Works",
      image: "/images/proyek/8.jpg",
      location: "Banten",
      client: "PT. Jaya Konstruksi MP, TBK",
      date: "30 Agustus 2021",
      contractNumber: "JKN/SPK/2021/011",
      description: "Proyek rehabilitasi jalan dan jembatan pada ruas Cipanas-Warung Banten untuk meningkatkan kualitas infrastruktur jalan.",
      description_en: "Road and bridge rehabilitation project on the Cipanas-Warung Banten section to improve road infrastructure quality.",
      scope: "Timbunan",
      scope_en: "Embankment"
    },
    {
      id: 9,
      title: "Pekerjaan Reflected Pond Lobby Grand Hyatt",
      title_en: "Grand Hyatt Lobby Reflected Pond Works",
      category: "interior",
      subCategory: "Interior",
      subCategory_en: "Interior",
      image: "/images/proyek/grandhyatt-rev.jpeg",
      location: "Jakarta",
      client: "PT. Plaza Indonesia Realty TBK",
      date: "11 April 2021",
      contractNumber: "GH/PE/G/04",
      description: "Pekerjaan reflected pond untuk area lobby hotel Grand Hyatt Jakarta dengan konsep desain modern.",
      description_en: "Reflected pond works for the Grand Hyatt Jakarta hotel lobby area with a modern design concept.",
      scope: "Interior Lobby",
      scope_en: "Lobby Interior"
    },
    {
      id: 10,
      title: "Interior & Furniture Club House Zora BSD City",
      title_en: "Zora BSD City Club House Interior & Furniture",
      category: "interior",
      subCategory: "Interior",
      subCategory_en: "Interior",
      image: "/images/proyek/10.jpg",
      location: "Tangerang",
      client: "PT. Multi Bangun Persada",
      date: "22 Februari 2021",
      contractNumber: "79/MBP-KBS/CH/2/2021",
      description: "Pekerjaan interior dan furniture untuk club house di kawasan perumahan Zora BSD City.",
      description_en: "Interior and furniture works for the club house in the Zora BSD City residential area.",
      scope: "Interior",
      scope_en: "Interior"
    },
    {
      id: 11,
      title: "Pembangunan Sekolah dan Mushola",
      title_en: "School and Prayer Room Construction",
      category: "building",
      subCategory: "Konstruksi Bangunan Gedung",
      subCategory_en: "Building Construction",
      image: "/images/proyek/11.jpg",
      location: "Parung - Bogor",
      client: "World Assembly Muslim Youth (WAMY)",
      date: "25 Januari 2021",
      contractNumber: "WAM/Y36/KBS/PSM/1/2021",
      description: "Proyek pembangunan fasilitas sekolah dan mushola di kawasan Parung, Bogor untuk organisasi WAMY.",
      description_en: "School and prayer room facility construction project in Parung, Bogor for the WAMY organization.",
      scope: "Bangunan Gedung",
      scope_en: "Building"
    },
    {
      id: 12,
      title: "Pekerjaan Timbunan (Urugan) Perumahan Alam Sutera I",
      title_en: "Alam Sutera I Residential Embankment (Fill) Works",
      category: "landDevelopment",
      subCategory: "Pekerjaan Perumahan",
      subCategory_en: "Residential Works",
      image: "/images/proyek/12.jpg",
      location: "Tangerang",
      client: "PT. Aneka Jaring Indonesia",
      date: "16 Maret 2021",
      contractNumber: "AJI/SPK/2021/09",
      description: "Pekerjaan timbunan dan urugan untuk pengembangan perumahan Alam Sutera I.",
      description_en: "Embankment and fill works for Alam Sutera I residential development.",
      scope: "Pematangan Lahan",
      scope_en: "Land Development"
    },
    {
      id: 13,
      title: "Pekerjaan Timbunan (Urugan) Perumahan Alam Sutera II Cikupa",
      title_en: "Alam Sutera II Cikupa Residential Embankment (Fill) Works",
      category: "landDevelopment",
      subCategory: "Pekerjaan Perumahan",
      subCategory_en: "Residential Works",
      image: "/images/proyek/13.jpg",
      location: "Cikupa - Tangerang",
      client: "PT. Pratama Widya",
      date: "21 April 2021",
      contractNumber: "PW/SPK-KBS/2021",
      description: "Pekerjaan timbunan dan urugan untuk pengembangan perumahan Alam Sutera II di kawasan Cikupa.",
      description_en: "Embankment and fill works for Alam Sutera II residential development in the Cikupa area.",
      scope: "Pematangan Lahan",
      scope_en: "Land Development"
    },
    {
      id: 14,
      title: "Pembangunan Condotel HAPPER Ciawi Tower A, B, C",
      title_en: "HAPPER Ciawi Condotel Tower A, B, C Construction",
      category: "building",
      subCategory: "Konstruksi Bangunan Gedung",
      subCategory_en: "Building Construction",
      image: "/images/proyek/14.jpg",
      location: "Ciawi - Bogor",
      client: "PT. Lingga Dewata Agung",
      date: "20 Juli 2022",
      contractNumber: "0501-KONTRAK-CH-CLDA-JAP-2022",
      description: "Proyek pembangunan condotel yang terdiri dari 3 tower di kawasan Ciawi, Bogor.",
      description_en: "Condotel construction project consisting of 3 towers in the Ciawi area, Bogor.",
      scope: "Bangunan Gedung",
      scope_en: "Building"
    },
    {
      id: 15,
      title: "Pekerjaan Struktur, Sipil, MEP dan Interior Restoran sevara iki ramen",
      title_en: "Sevara Iki Ramen Restaurant Structural, Civil, MEP and Interior Works",
      category: "building",
      subCategory: "Konstruksi Bangunan Gedung",
      subCategory_en: "Building Construction",
      image: "/images/proyek/15.jpg",
      location: "Jakarta",
      client: "PT. Multi Bangun Persada",
      date: "17 Februari 2020",
      contractNumber: "215/MBP-KBS/SP/RR/II/2020",
      description: "Proyek renovasi dan pembangunan struktur, sipil, MEP dan interior untuk restoran Seuara di JB Mansion.",
      description_en: "Renovation and construction of structural, civil, MEP and interior works for Sevara restaurant at JB Mansion.",
      scope: "Struktur",
      scope_en: "Structure"
    },
    {
      id: 16,
      title: "Pekerjaan Struktur Sipil, MEP dan Interior Showroom bengkel mitshubishi",
      title_en: "Mitsubishi Workshop Showroom Civil Structure, MEP and Interior Works",
      category: "building",
      subCategory: "Konstruksi Bangunan Gedung",
      subCategory_en: "Building Construction",
      image: "/images/proyek/16.jpg",
      location: "Tangerang",
      client: "PT. Multi Bangun Persada",
      date: "23 Juni 2020",
      contractNumber: "422/MBP-KBS/SBK/VI/2020",
      description: "Proyek pembangunan showroom Bergler Krisshaku yang mencakup pekerjaan struktur, sipil, MEP, dan interior.",
      description_en: "Bergler Krisshaku showroom construction project including structural, civil, MEP, and interior works.",
      scope: "Struktur",
      scope_en: "Structure"
    },
    {
      id: 17,
      title: "Infrastruktur Kawasan Proyek OPD Kabupaten Karawang",
      title_en: "Karawang Regency OPD Project Area Infrastructure",
      category: "infrastructure",
      subCategory: "Konstruksi Bangunan Umum",
      subCategory_en: "Public Building Construction",
      image: "/images/proyek/17.jpg",
      location: "Karawang",
      client: "PT. Trincanala Sakti Utama",
      date: "06 April 2020",
      contractNumber: "OPD/26/TSU/KBS/IV/20",
      description: "Proyek pembangunan infrastruktur kawasan OPD di Kabupaten Karawang untuk mendukung aktivitas pemerintahan.",
      description_en: "Infrastructure development project for the OPD area in Karawang Regency to support government activities.",
      scope: "Infrastruktur",
      scope_en: "Infrastructure"
    },
    {
      id: 18,
      title: "Proyek Pekerjaan Cut & Fill, Land Clearing, Saluran Drainase dan Pekerjaan Jalan Utama Kawasan Industri Subang",
      title_en: "Subang Industrial Estate Cut & Fill, Land Clearing, Drainage Channel and Main Road Works Project",
      category: "infrastructure",
      subCategory: "Pekerjaan Infrastruktur dan Pematangan Lahan",
      subCategory_en: "Infrastructure and Land Development Works",
      image: "/images/proyek/18.jpg",
      location: "Kalijati - Subang",
      client: "PT. Nusa Raya Cipta",
      date: "13 Mei 2022",
      contractNumber: "063-KONTRAK-KIS-NRC-KBS 2022",
      description: "Proyek pengembangan infrastruktur kawasan industri di Subang yang mencakup pekerjaan cut & fill, land clearing, pembangunan saluran drainase, dan pembangunan jalan utama.",
      description_en: "Infrastructure development project for an industrial estate in Subang, including cut & fill work, land clearing, drainage channel construction, and main road construction.",
      scope: "Pengerjaan Lahan",
      scope_en: "Land Works"
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
  
  // Set isMounted to true when component mounts and track scroll position
  useEffect(() => {
    setIsMounted(true);
    
    // Ensure body is not locked on component mount
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
    
    // Track scroll position for "back to top" button
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollPosition(window.scrollY);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    
    // Cleanup function
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
      
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  // Handle view detail
  const handleViewDetail = (project: Project, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default action
    e.stopPropagation(); // Stop event propagation
    
    setSelectedProject(project);
    setIsModalOpen(true);
    
    // Prevent scrolling when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    
    // Restore scrolling
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleEscapeKey);
      
      return () => {
        window.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isModalOpen]);

  // Safely scroll to projects section
  const scrollToProjects = () => {
    if (!isMounted) return;
    
    if (projectsRef.current) {
      try {
        const yOffset = -100; // Offset to account for sticky header
        const y = projectsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } catch (error) {
        console.error('Error scrolling to projects:', error);
        // Fallback to simpler version
        projectsRef.current.scrollIntoView();
      }
    }
  };

  // Filter projects based on category and search term
  useEffect(() => {
    if (!isMounted) return;
    
    let filtered = projectsData;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project => {
        const titleField = language === 'en' && project.title_en ? project.title_en : project.title;
        const descriptionField = language === 'en' && project.description_en ? project.description_en : project.description;
        const subCategoryField = language === 'en' && project.subCategory_en ? project.subCategory_en : project.subCategory;
        
        return (
          titleField.toLowerCase().includes(searchLower) ||
          project.client.toLowerCase().includes(searchLower) ||
          project.location.toLowerCase().includes(searchLower) ||
          descriptionField.toLowerCase().includes(searchLower) ||
          (subCategoryField && subCategoryField.toLowerCase().includes(searchLower))
        );
      });
    }
    
    setFilteredProjects(filtered);
    
    // If filter changes, scroll to projects section
    if ((activeCategory !== 'all' || searchTerm) && projectsRef.current) {
      // Use setTimeout to prevent issues with scrolling
      setTimeout(() => {
        scrollToProjects();
      }, 100);
    }
  }, [activeCategory, searchTerm, isMounted, language]);

  // Initialize filteredProjects when component mounts
  useEffect(() => {
    setFilteredProjects(projectsData);
  }, []);

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
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-colors duration-300`}>
      

      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/proyek/utama.jpg"
          alt={language === 'en' ? "Our Projects" : "Proyek Kami"}
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
                <span className="inline-block bg-[#153969] text-white px-3 py-1 rounded text-sm font-medium mb-3">
                  {language === 'en' ? "Portfolio" : "Portofolio"}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {language === 'en' ? "Our Projects" : "Proyek Kami"}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  {language === 'en' 
                    ? "Complete portfolio of projects we have worked on with various leading clients" 
                    : "Portofolio lengkap proyek-proyek yang telah kami kerjakan dengan berbagai klien terkemuka"}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={scrollToProjects}
                    className="px-6 py-3 bg-[#153969] hover:bg-[#0f2a4d] text-white rounded-md font-medium transition-colors shadow-md inline-flex items-center gap-2"
                  >
                    {language === 'en' ? "View Projects" : "Lihat Proyek"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <Link 
                    href="/" 
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-md font-medium transition-colors shadow-md inline-flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    {language === 'en' ? "Home" : "Beranda"}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <nav className={`${isDark ? 'bg-gray-800 shadow-gray-900' : 'bg-white shadow-md'} py-3 sticky top-0 z-50 transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors duration-300`}>
              Logo Perusahaan
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#153969]'} transition-colors`}>
                {language === 'en' ? "Home" : "Beranda"}
              </Link>
              <Link href="/services" className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#153969]'} transition-colors`}>
                {language === 'en' ? "Services" : "Layanan"}
              </Link>
              <Link href="/projects" className={`${isDark ? 'text-blue-400' : 'text-[#153969]'} font-medium`}>
                {language === 'en' ? "Projects" : "Proyek"}
              </Link>
              <Link href="/contact" className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#153969]'} transition-colors`}>
                {language === 'en' ? "Contact" : "Kontak"}
              </Link>
            </div>
            
            <div className="md:hidden">
              {/* Mobile Menu Button */}
              <button className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#153969]'} transition-colors`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search and Filter Section */}
      <section className={`py-8 md:py-12 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} sticky top-[57px] z-40 shadow-sm transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder={language === 'en' ? "Search projects..." : "Cari proyek..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-full ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                        : 'bg-white border-gray-300 focus:border-[#153969] focus:ring-[#153969]'
                    } focus:outline-none focus:ring-1 transition-colors duration-300`}
                  />
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                    <Search className="h-4 w-4" />
                  </div>
                </div>
                
                {/* Mobile Filter Toggle */}
                <button
                  onClick={toggleFilter}
                  className={`md:hidden flex items-center justify-center gap-2 px-4 py-2 rounded-full ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' 
                      : 'bg-white border border-gray-300 shadow-sm hover:bg-gray-50'
                  } transition-colors duration-300`}
                >
                  <Filter className="h-4 w-4" />
                  <span>{language === 'en' ? "Filter" : "Filter"}</span>
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
                        ? isDark 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'bg-[#153969] text-white shadow-sm'
                        : isDark 
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600' 
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {language === 'en' ? category.name_en : category.name}
                  </button>
                ))}
                {(activeCategory !== 'all' || searchTerm) && (
                  <button
                    onClick={resetFilters}
                    className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm ${
                      isDark 
                        ? 'border border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                    } flex items-center gap-1 transition-colors duration-300`}
                  >
                    <X className="h-3 w-3" />
                    {language === 'en' ? "Reset" : "Reset"}
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
                            ? isDark 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-[#153969] text-white'
                            : isDark 
                              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600' 
                              : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {language === 'en' ? category.name_en : category.name}
                      </button>
                    ))}
                    {(activeCategory !== 'all' || searchTerm) && (
                      <button
                        onClick={() => {
                          resetFilters();
                          setIsFilterOpen(false);
                        }}
                        className={`whitespace-nowrap px-3 py-2 rounded-full text-sm font-medium ${
                          isDark 
                            ? 'bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600' 
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                        } flex items-center gap-1 transition-colors duration-300`}
                      >
                        <X className="h-3 w-3" />
                        {language === 'en' ? "Reset Filter" : "Reset Filter"}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Active Filters Summary */}
            {(activeCategory !== 'all' || searchTerm) && (
              <div className={`mt-4 flex flex-wrap items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                <span className="mr-2">{language === 'en' ? "Active filters:" : "Filter aktif:"}</span>
                {activeCategory !== 'all' && (
                  <span className={`${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-700'} px-2 py-1 rounded-full mr-2 mb-1 inline-flex items-center transition-colors duration-300`}>
                    {language === 'en' 
                      ? categories.find(c => c.id === activeCategory)?.name_en 
                      : categories.find(c => c.id === activeCategory)?.name}
                  </span>
                )}
                {searchTerm && (
                  <span className={`${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-700'} px-2 py-1 rounded-full mr-2 mb-1 inline-flex items-center transition-colors duration-300`}>
                    &quot;{searchTerm}&quot;
                  </span>
                )}
                <span className={`${isDark ? 'text-gray-500' : 'text-gray-400'} transition-colors duration-300`}>
                  {filteredProjects.length} {language === 'en' ? "projects found" : "proyek ditemukan"}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className={`py-12 md:py-16 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
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
                        className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300`}
                      >
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={language === 'en' && project.title_en ? project.title_en : project.title}
                            fill
                            className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                          <div className="absolute top-3 right-3">
                            <span className="bg-[#153969] text-white text-xs font-semibold px-2.5 py-1.5 rounded-full">
                              {language === 'en' 
                                ? categories.find(c => c.id === project.category)?.name_en 
                                : categories.find(c => c.id === project.category)?.name || 'Proyek'}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                            <h3 className="text-lg font-bold mb-1 line-clamp-2">
                              {language === 'en' && project.title_en ? project.title_en : project.title}
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
                              <Building className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mr-1.5 flex-shrink-0 mt-0.5 transition-colors duration-300`} />
                              <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm line-clamp-1 transition-colors duration-300`}>{project.client}</span>
                            </div>
                            <span className={`text-xs ${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-700'} px-2 py-0.5 rounded-full transition-colors duration-300`}>
                              {project.date.split(' ')[2]}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Calendar className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-[#153969]'} mr-1.5 flex-shrink-0 transition-colors duration-300`} />
                              <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>{project.date}</span>
                            </div>
                          </div>
                          
                          <div className={`mt-4 pt-4 ${isDark ? 'border-gray-700' : 'border-gray-100'} border-t flex items-center justify-between transition-colors duration-300`}>
                            <div className={`text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} px-2 py-1 rounded-full transition-colors duration-300`}>
                              {language === 'en' && project.subCategory_en ? project.subCategory_en : project.subCategory}
                            </div>
                            <button 
                              onClick={(e) => handleViewDetail(project, e)}
                              className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#153969] hover:text-[#0f2a4d]'} text-sm font-medium flex items-center gap-1 transition-colors`}
                            >
                              {language === 'en' ? "Details" : "Detail"}
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
                      className={`px-8 py-3 ${
                        isDark 
                          ? 'bg-gray-800 border border-blue-500 text-blue-400 hover:bg-blue-900/30' 
                          : 'bg-white border border-[#153969] text-[#153969] hover:bg-[#153969] hover:text-white'
                      } rounded-full font-medium transition-all duration-300 shadow-sm inline-flex items-center`}
                    >
                      {language === 'en' ? "Load More" : "Muat Lebih Banyak"}
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
                <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} p-10 rounded-xl mb-6 transition-colors duration-300`}>
                  <svg className={`w-16 h-16 ${isDark ? 'text-gray-600' : 'text-gray-300'} mx-auto mb-4 transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                    {language === 'en' ? "No Projects Found" : "Tidak Ada Proyek Ditemukan"}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 transition-colors duration-300`}>
                    {language === 'en' 
                      ? "No projects match your search criteria. Please try another search or select a different category." 
                      : "Tidak ada proyek yang cocok dengan kriteria pencarian Anda. Silakan coba pencarian lain atau pilih kategori yang berbeda."}
                  </p>
                  <button
                    onClick={resetFilters}
                    className={`px-6 py-2 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#153969] hover:bg-[#0f2a4d]'} text-white rounded-full font-medium transition-colors inline-flex items-center gap-2`}
                  >
                    <X className="h-4 w-4" />
                    {language === 'en' ? "Reset Filters" : "Reset Filter"}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal - Conditional rendering with isMounted check */}
      {isMounted && (
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
                className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 transition-colors duration-300`}
              >
                <div className="relative h-64 md:h-80">
                  <Image
                    src={selectedProject.image}
                    alt={language === 'en' && selectedProject.title_en ? selectedProject.title_en : selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-colors z-10"
                    aria-label={language === 'en' ? "Close Modal" : "Tutup Modal"}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-[#153969] text-white text-xs px-2.5 py-1 rounded-full">
                        {language === 'en' 
                          ? categories.find(c => c.id === selectedProject.category)?.name_en 
                          : categories.find(c => c.id === selectedProject.category)?.name}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                        {language === 'en' && selectedProject.subCategory_en 
                          ? selectedProject.subCategory_en 
                          : selectedProject.subCategory}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {language === 'en' && selectedProject.title_en 
                        ? selectedProject.title_en 
                        : selectedProject.title}
                    </h2>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-300`}>
                        {language === 'en' ? "Project Information" : "Informasi Proyek"}
                      </h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 transition-colors duration-300`}>
                        {language === 'en' && selectedProject.description_en 
                          ? selectedProject.description_en 
                          : selectedProject.description}
                      </p>
                      
                      {selectedProject.scope && (
                        <div className="mb-6">
                          <h4 className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                            {language === 'en' ? "Scope of Work" : "Ruang Lingkup Pekerjaan"}
                          </h4>
                          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                            {language === 'en' && selectedProject.scope_en 
                              ? selectedProject.scope_en 
                              : selectedProject.scope}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors duration-300`}>
                      <h3 className={`font-bold ${isDark ? 'text-white border-gray-600' : 'text-gray-900 border-b'} mb-4 border-b pb-2 transition-colors duration-300`}>
                        {language === 'en' ? "Project Details" : "Detail Proyek"}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                            {language === 'en' ? "Client" : "Klien"}
                          </p>
                          <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} transition-colors duration-300`}>
                            {selectedProject.client}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                            {language === 'en' ? "Location" : "Lokasi"}
                          </p>
                          <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} transition-colors duration-300`}>
                            {selectedProject.location}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                            {language === 'en' ? "Date" : "Tanggal"}
                          </p>
                          <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} transition-colors duration-300`}>
                            {selectedProject.date}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                            {language === 'en' ? "Contract Number" : "Nomor Kontrak"}
                          </p>
                          <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} transition-colors duration-300`}>
                            {selectedProject.contractNumber || '-'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-col gap-2">
                        <Link 
                          href="/contact" 
                          className={`block w-full py-2.5 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#153969] hover:bg-[#0f2a4d]'} text-white text-center rounded-lg font-medium transition-colors`}
                        >
                          {language === 'en' ? "Contact Us" : "Hubungi Kami"}
                        </Link>
                        <button 
                          onClick={closeModal}
                          className={`block w-full py-2.5 ${
                            isDark 
                              ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          } text-center rounded-lg font-medium transition-colors`}
                        >
                          {language === 'en' ? "Close" : "Tutup"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Portfolio Stats */}
      <section className={`py-16 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}>
              {language === 'en' ? "Our Portfolio in Numbers" : "Portofolio Kami dalam Angka"}
            </h2>
            <div className={`w-16 h-1 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'} mx-auto mb-6 transition-colors duration-300`}></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-sm text-center transform transition-transform hover:scale-105 duration-300`}>
            <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>18+</div>
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                {language === 'en' ? "Completed Projects" : "Proyek Selesai"}
              </div>
            </div>
            
            <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-sm text-center transform transition-transform hover:scale-105 duration-300`}>
              <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>10+</div>
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                {language === 'en' ? "Cities & Regencies" : "Kota & Kabupaten"}
              </div>
            </div>
            
            <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-sm text-center transform transition-transform hover:scale-105 duration-300`}>
              <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>15+</div>
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                {language === 'en' ? "Satisfied Clients" : "Klien Puas"}
              </div>
            </div>
            
            <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-sm text-center transform transition-transform hover:scale-105 duration-300`}>
              <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-2 transition-colors duration-300`}>95%</div>
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                {language === 'en' ? "On-Time Delivery" : "Tepat Waktu"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Navigation */}
      <section className={`py-16 ${isDark ? 'bg-blue-900' : 'bg-[#153969]'} relative overflow-hidden transition-colors duration-300`}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002-2h2a2 2 0 002 2M9 5v2h6V5" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {language === 'en' ? "Have a Project You Want to Build?" : "Punya Proyek yang Ingin Dikerjakan?"}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {language === 'en' 
                ? "Our team is ready to help bring your project to life with the best quality and high professionalism" 
                : "Tim kami siap membantu mewujudkan proyek Anda dengan kualitas terbaik dan profesionalisme tinggi"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-8 py-3 bg-white text-[#153969] hover:bg-gray-100 rounded-full font-medium transition-colors shadow-lg">
                {language === 'en' ? "Contact Us" : "Hubungi Kami"}
              </Link>
              <Link href="/services" className="px-8 py-3 border border-white hover:bg-white/10 text-white rounded-full font-medium transition-colors">
                {language === 'en' ? "View Services" : "Lihat Layanan"}
              </Link>
              <Link href="/" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors">
                <Home className="h-4 w-4 inline-block mr-2" />
                {language === 'en' ? "Back to Home" : "Kembali ke Beranda"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Navigation Button (visible when scrolling) */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <Link 
          href="/" 
          className={`${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#153969] hover:bg-[#0f2a4d]'} p-3 rounded-full shadow-lg transition-colors text-white flex items-center justify-center`}
          aria-label={language === 'en' ? "Back to Home" : "Kembali ke Beranda"}
        >
          <Home className="h-5 w-5" />
        </Link>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-white hover:bg-gray-100 text-[#153969]'} p-3 rounded-full shadow-lg transition-colors flex items-center justify-center`}
          aria-label={language === 'en' ? "Back to Top" : "Kembali ke Atas"}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
      </div>

      {/* Shortcuts Menu - Mobile Only */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t py-2 px-4 z-40 transition-colors duration-300`}>
        <div className="flex justify-between items-center">
          <Link href="/" className={`flex flex-col items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-[#153969]'} transition-colors`}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">{language === 'en' ? "Home" : "Beranda"}</span>
          </Link>
          
          <Link href="/about" className={`flex flex-col items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-[#153969]'} transition-colors`}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-xs mt-1">{language === 'en' ? "About" : "Tentang"}</span>
          </Link>
          
          <Link href="/services" className={`flex flex-col items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-[#153969]'} transition-colors`}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-xs mt-1">{language === 'en' ? "Services" : "Layanan"}</span>
          </Link>
          
          <div className={`flex flex-col items-center ${isDark ? 'text-blue-400' : 'text-[#153969]'} transition-colors`}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span className="text-xs mt-1 font-medium">{language === 'en' ? "Projects" : "Proyek"}</span>
          </div>
          
          <Link href="/contact" className={`flex flex-col items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-[#153969]'} transition-colors`}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span className="text-xs mt-1">{language === 'en' ? "Contact" : "Kontak"}</span>
          </Link>
        </div>
      </div>

      {/* Back to Top Button - Appears when scrolling down */}
      {isMounted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollPosition > 500 ? 1 : 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`hidden md:flex fixed bottom-4 left-4 z-40 ${
            isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'
          } shadow-lg rounded-full p-3 transition-colors`}
          aria-label={language === 'en' ? "Back to Top" : "Kembali ke Atas"}
        >
          <svg className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </motion.button>
      )}
    </div>
  );
}