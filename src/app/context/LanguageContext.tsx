'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Translations
const translations = {
  en: {
    services: {
      sectionTitle: "OUR SERVICES",
      sectionSubtitle: "Building with Vision and Quality",
      featuredProjects: "Featured Projects",
      consultButton: "Consult Your Project",
      
      buildings: {
        title: "Buildings & Properties",
        description: "Construction and renovation of commercial and residential buildings with high quality standards",
        project1: {
          title: "HAPPER Ciawi Condotel Construction Tower A, B, C",
          description: "Development of modern residential properties with complete facilities"
        },
        project2: {
          title: "KERATON AT THE PLAZA RESIDENCE",
          description: "Premium standard 6th floor renovation work"
        }
      },
      infrastructure: {
        title: "Civil Infrastructure",
        description: "Development and rehabilitation of infrastructure to support community needs",
        project1: {
          title: "Road and Bridge Rehabilitation",
          description: "Cipanas - Warung Banten section, infrastructure quality improvement"
        },
        project2: {
          title: "Drainage Channels & Land Development",
          description: "Development of drainage systems and construction site preparation"
        }
      },
      landDevelopment: {
        title: "Land Development",
        description: "Land preparation and development for various project needs",
        project1: {
          title: "Cut & Fill Work",
          description: "Soil contour adjustment and construction site preparation"
        },
        project2: {
          title: "Alam Sutera I Residential Embankment Work",
          description: "Development of premium residential areas"
        }
      },
      special: {
        title: "Special Projects",
        description: "Handling projects with specific specifications and needs",
        project1: {
          title: "Club House Interior & Furniture",
          description: "Interior work and furnishing for Zora BSD City"
        },
        project2: {
          title: "Reflected Pond Lobby Work",
          description: "Construction of architectural water features at Grand Hyatt"
        }
      }
    },
    nav: {
      home: "Home",
      whoWeAre: "Who We Are",
      aboutUs: "About Us",
      companyProfile: "Company Profile",
      companyProfileDesc: "Vision, mission, and company values",
      ourHistory: "Our History",
      ourHistoryDesc: "Journey since establishment in 2005",
      certifications: "Certifications",
      certificationsDesc: "International quality certifications",
      ourTeam: "Our Team",
      ourTeamDesc: "Professional and dedicated members",
      services: "Services",
      constructionServices: "Construction Services",
      buildingConstruction: "Building Construction",
      buildingConstructionDesc: "Commercial and residential buildings",
      infrastructureDevelopment: "Infrastructure Development",
      infrastructureDesc: "Roads, bridges, and public works",
      projectManagement: "Project Management",
      projectManagementDesc: "End-to-end project management",
      heavyEquipment: "Heavy Equipment",
      equipmentRental: "Equipment Rental",
      equipmentRentalDesc: "Excavators and machinery rental",
      operatorServices: "Operator Services",
      operatorServicesDesc: "Skilled equipment operators",
      maintenance: "Maintenance",
      maintenanceDesc: "Regular maintenance services",
      projects: "Projects",
      resources: "Resources",
      toolsResources: "Tools & Resources",
      toolsResourcesDesc: "Industry guides and calculators",
      codeOfEthics: "Code of Ethics",
      codeOfEthicsDesc: "Ethical business practices",
      privacyPolicy: "Privacy Policy",
      privacyPolicyDesc: "Data protection policy",
      industryInsights: "Industry Insights",
      blog: "Blog",
      blogDesc: "Construction trends and updates",
      careers: "Careers",
      contact: "Contact",
      getQuote: "Get Information"
    },
    visionMission: {
      title: "Vision & Mission",
      visionTab: "Vision",
      missionTab: "Mission",
      visionTitle: "Vision",
      visionText: "To become a trusted and leading company in General Contractor, Dump Truck, and Heavy Equipment services, by delivering innovative, high-quality, and sustainable building solutions.",
      missionTitle: "Mission",
      missionPoint1: "Providing High Quality Services Deliver construction, transportation, and heavy equipment services that meet safety standards, efficiency, and customer satisfaction.",
      missionPoint2: "Improving Competence and Innovation Adopt the latest technology and empower professional human resources to create effective and modern development solutions."
    },
    hero: {
      slides: [
        {
          category: "PT Karya Bangun Semesta",
          title: "Real Work, Building the Universe",
          description: "Becoming a trusted and leading company in General Contractor, Dump Truck, and Heavy Equipment services, by delivering innovative, high-quality, and sustainable building solutions."
        },
        {
          category: "Modern Building",
          title: "Office Building Construction",
          description: "Construction of commercial and residential buildings with high standards"
        },
        {
          category: "Infrastructure",
          title: "Infrastructure Development",
          description: "City infrastructure development with modern technology"
        },
        {
          category: "Residential",
          title: "Elite Housing",
          description: "Development of quality modern residential areas"
        }
      ],
      exploreButton: "Explore More",
      pauseSlideshow: "Pause slideshow",
      playSlideshow: "Play slideshow",
      swipe: "Swipe"
    }
  },
  id: {
    services: {
      sectionTitle: "LAYANAN KAMI",
      sectionSubtitle: "Membangun dengan Visi dan Kualitas",
      featuredProjects: "Proyek Unggulan",
      consultButton: "Konsultasikan Proyek Anda",
      
      buildings: {
        title: "Gedung & Properti",
        description: "Pembangunan dan renovasi gedung komersial dan residensial dengan standar kualitas tinggi",
        project1: {
          title: "Pembangunan Condotel HAPPER Ciawi Tower A, B, C",
          description: "Pengembangan properti hunian modern dengan fasilitas lengkap"
        },
        project2: {
          title: "KERATON AT THE PLAZA RESIDENCE",
          description: "Pekerjaan renovasi lantai 6 dengan standar premium"
        }
      },
      infrastructure: {
        title: "Infrastruktur Sipil",
        description: "Pengembangan dan rehabilitasi infrastruktur untuk menunjang kebutuhan masyarakat",
        project1: {
          title: "Rehabilitasi Jalan dan Jembatan",
          description: "Ruas Cipanas – Warung Banten, peningkatan kualitas infrastruktur"
        },
        project2: {
          title: "Saluran Drainase & Pematangan Lahan",
          description: "Pengembangan sistem drainase dan persiapan lahan konstruksi"
        }
      },
      landDevelopment: {
        title: "Pengembangan Lahan",
        description: "Pematangan dan pengembangan lahan untuk berbagai kebutuhan proyek",
        project1: {
          title: "Pekerjaan Cut & Fill",
          description: "Penyesuaian kontur tanah dan persiapan lahan pembangunan"
        },
        project2: {
          title: "Pekerjaan Timbunan Perumahan Alam Sutera I",
          description: "Pengembangan kawasan residensial premium"
        }
      },
      special: {
        title: "Proyek Khusus",
        description: "Penanganan proyek-proyek dengan spesifikasi dan kebutuhan khusus",
        project1: {
          title: "Interior & Furniture Club House",
          description: "Pengerjaan interior dan furnishing untuk Zora BSD City"
        },
        project2: {
          title: "Pekerjaan Reflected Pond Lobby",
          description: "Konstruksi fitur air arsitektural di Grand Hyatt"
        }
      }
    },
    nav: {
      home: "Beranda",
      whoWeAre: "Tentang Kami",
      aboutUs: "Tentang Kami",
      companyProfile: "Profil Perusahaan",
      companyProfileDesc: "Visi, misi, dan nilai perusahaan",
      ourHistory: "Sejarah Kami",
      ourHistoryDesc: "Perjalanan sejak didirikan tahun 2005",
      certifications: "Sertifikasi",
      certificationsDesc: "Sertifikasi kualitas internasional",
      ourTeam: "Tim Kami",
      ourTeamDesc: "Anggota profesional dan berdedikasi",
      services: "Layanan",
      constructionServices: "Layanan Konstruksi",
      buildingConstruction: "Konstruksi Bangunan",
      buildingConstructionDesc: "Bangunan komersial dan residensial",
      infrastructureDevelopment: "Pembangunan Infrastruktur",
      infrastructureDesc: "Jalan, jembatan, dan pekerjaan umum",
      projectManagement: "Manajemen Proyek",
      projectManagementDesc: "Manajemen proyek end-to-end",
      heavyEquipment: "Alat Berat",
      equipmentRental: "Penyewaan Alat",
      equipmentRentalDesc: "Penyewaan excavator dan mesin",
      operatorServices: "Layanan Operator",
      operatorServicesDesc: "Operator alat berat terampil",
      maintenance: "Pemeliharaan",
      maintenanceDesc: "Layanan pemeliharaan berkala",
      projects: "Proyek",
      resources: "Sumber Daya",
      toolsResources: "Alat & Sumber Daya",
      toolsResourcesDesc: "Panduan industri dan kalkulator",
      codeOfEthics: "Kode Etik",
      codeOfEthicsDesc: "Praktik bisnis etis",
      privacyPolicy: "Kebijakan Privasi",
      privacyPolicyDesc: "Kebijakan perlindungan data",
      industryInsights: "Wawasan Industri",
      blog: "Blog",
      blogDesc: "Tren dan pembaruan konstruksi",
      careers: "Karir",
      contact: "Kontak",
      getQuote: "Dapatkan Penawaran"
    },
    visionMission: {
      title: "Visi & Misi Perusahaan",
      visionTab: "Visi",
      missionTab: "Misi",
      visionTitle: "Visi",
      visionText: "Menjadi perusahaan terpercaya dan terdepan dalam layanan General Contractor, Dump Truck, dan Heavy Equipment, dengan menghadirkan solusi pembangunan yang inovatif, berkualitas tinggi, dan berkelanjutan.",
      missionTitle: "Misi",
      missionPoint1: "Memberikan Layanan Berkualitas Tinggi Menyediakan layanan konstruksi, pengangkutan, dan alat berat yang memenuhi standar keselamatan, efisiensi, dan kepuasan pelanggan.",
      missionPoint2: "Meningkatkan Kompetensi dan Inovasi Mengadopsi teknologi terkini dan memberdayakan sumber daya manusia profesional untuk menciptakan solusi pembangunan yang efektif dan modern."
    },
    hero: {
      slides: [
        {
          category: "PT Karya Bangun Semesta",
          title: "Karya Nyata, Membangun Semesta",
          description: "Menjadi perusahaan terpercaya dan terdepan dalam layanan General Contractor, Dump Truck, dan Heavy Equipment, dengan menghadirkan solusi pembangunan yang inovatif, berkualitas tinggi, dan berkelanjutan."
        },
        {
          category: "Gedung Modern",
          title: "Konstruksi Gedung Perkantoran",
          description: "Pembangunan gedung komersial dan residensial dengan standar tinggi"
        },
        {
          category: "Infrastruktur",
          title: "Pengembangan Infrastruktur",
          description: "Pembangunan infrastruktur kota dengan teknologi modern"
        },
        {
          category: "Residensial",
          title: "Perumahan Elite",
          description: "Pembangunan kawasan perumahan modern berkualitas"
        }
      ],
      exploreButton: "Jelajahi Lebih Lanjut",
      pauseSlideshow: "Jeda slideshow",
      playSlideshow: "Putar slideshow",
      swipe: "Geser"
    }
  }
};

// Type definitions
export type Language = 'en' | 'id';
export type TranslationKey = string;

// Define recursive type for the translations object
export type TranslationObject = {
  [key: string]: string | string[] | TranslationObject | Array<TranslationObject>;
};

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string | TranslationObject;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  
  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage === 'en' || savedLanguage === 'id') {
        setLanguage(savedLanguage as Language);
      }
    }
  }, []);
  
  // Function to change language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };
  
  // Translation function
  const t = (key: TranslationKey): string | TranslationObject => {
    const keys = key.split('.');
    let result: TranslationObject | string = translations[language] as TranslationObject;
    
    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = result[k] as TranslationObject | string;
      } else {
        // Fallback to English if translation not found
        let enResult: TranslationObject | string = translations['en'] as TranslationObject;
        for (const enK of keys) {
          if (typeof enResult === 'object' && enResult !== null && enK in enResult) {
            enResult = enResult[enK] as TranslationObject | string;
          } else {
            return key; // Fallback to key if not found in English either
          }
        }
        return enResult || key;
      }
    }
    
    return result;
  };
  
  // Create context value object
  const contextValue: LanguageContextType = {
    language,
    changeLanguage,
    t
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}