'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, Globe, ExternalLink } from 'lucide-react'

// Define types
interface NavItem {
  name: string;
  href: string;
  description?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavLinkItem {
  name: string;
  href: string;
  hasDropdown: boolean;
  megaMenu?: boolean;
  sections?: NavSection[];
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('id') // 'id' for Indonesian, 'en' for English
  const dropdownRef = useRef<HTMLDivElement>(null)
  const langDropdownRef = useRef<HTMLDivElement>(null)

  // Navigation data for English
  const navItemsEn: NavLinkItem[] = useMemo(() => [
    {
      name: 'Home',
      href: '/',
      hasDropdown: false
    },
    {
      name: 'Who We Are',
      href: '/about',
      hasDropdown: true,
      sections: [
        {
          title: 'About Us',
          items: [
            { name: 'Company Profile', href: '/about/profile' },
            { name: 'Our History', href: '/about/history' },
            { name: 'ISO Certifications', href: '/about/iso' },
            { name: 'Our Team', href: '/about/team' },
            { name: 'Certifications', href: '/about/certifications' }
          ]
        }
      ]
    },
    {
      name: 'Services',
      href: '/services',
      hasDropdown: true,
      sections: [
        {
          title: 'Construction Services',
          items: [
            { name: 'Building Construction', href: '/services/building-construction' },
            { name: 'Infrastructure Development', href: '/services/infrastructure' },
            { name: 'Project Management', href: '/services/project-management' }
          ]
        },
        {
          title: 'Heavy Equipment',
          items: [
            { name: 'Equipment Rental', href: '/services/equipment-rental' },
            { name: 'Operator Services', href: '/services/equipment-operators' },
            { name: 'Maintenance', href: '/services/equipment-maintenance' }
          ]
        },
        {
          title: 'Dump Truck Services',
          items: [
            { name: 'Material Hauling', href: '/services/material-hauling' },
            { name: 'Fleet Management', href: '/services/fleet-management' },
            { name: 'Logistics Solutions', href: '/services/logistics' }
          ]
        }
      ]
    },
    {
      name: 'Projects',
      href: '/projects',
      hasDropdown: false
    },
    {
      name: 'Resources',
      href: '/resources',
      hasDropdown: true,
      sections: [
        {
          title: 'Resources',
          items: [
            { name: 'Tools & Resources', href: '/resources' },
            { name: 'Code of Ethics', href: '/ethics' },
            { name: 'Privacy Policy', href: '/privacy' }
          ]
        },
        {
          title: 'Industry Insights',
          items: [
            { name: 'Blog', href: '/blog' },
            { name: 'Case Studies', href: '/case-studies' },
            { name: 'White Papers', href: '/white-papers' }
          ]
        }
      ]
    },
    {
      name: 'Career',
      href: '/career',
      hasDropdown: false
    },
    {
      name: 'Contact',
      href: '/contact',
      hasDropdown: false
    }
  ], []);

  // Navigation data for Indonesian
  const navItemsId: NavLinkItem[] = useMemo(() => [
    {
      name: 'Beranda',
      href: '/',
      hasDropdown: false
    },
    {
      name: 'Tentang Kami',
      href: '/about',
      hasDropdown: true,
      sections: [
        {
          title: 'Tentang Kami',
          items: [
            { name: 'Profil Perusahaan', href: '/about/profile' },
            { name: 'Sejarah Kami', href: '/about/history' },
            { name: 'Sertifikasi ISO', href: '/about/iso' },
            { name: 'Tim Kami', href: '/about/team' },
            { name: 'Sertifikasi', href: '/about/certifications' }
          ]
        }
      ]
    },
    {
      name: 'Layanan',
      href: '/services',
      hasDropdown: true,
      sections: [
        {
          title: 'Layanan Konstruksi',
          items: [
            { name: 'Konstruksi Bangunan', href: '/services/building-construction' },
            { name: 'Pengembangan Infrastruktur', href: '/services/infrastructure' },
            { name: 'Manajemen Proyek', href: '/services/project-management' }
          ]
        },
        {
          title: 'Peralatan Berat',
          items: [
            { name: 'Penyewaan Peralatan', href: '/services/equipment-rental' },
            { name: 'Layanan Operator', href: '/services/equipment-operators' },
            { name: 'Pemeliharaan', href: '/services/equipment-maintenance' }
          ]
        },
        {
          title: 'Layanan Dump Truck',
          items: [
            { name: 'Pengangkutan Material', href: '/services/material-hauling' },
            { name: 'Manajemen Armada', href: '/services/fleet-management' },
            { name: 'Solusi Logistik', href: '/services/logistics' }
          ]
        }
      ]
    },
    {
      name: 'Proyek',
      href: '/projects',
      hasDropdown: false
    },
    {
      name: 'Sumber Daya',
      href: '/resources',
      hasDropdown: true,
      sections: [
        {
          title: 'Sumber Daya',
          items: [
            { name: 'Alat & Sumber Daya', href: '/resources' },
            { name: 'Kode Etik', href: '/ethics' },
            { name: 'Kebijakan Privasi', href: '/privacy' }
          ]
        },
        {
          title: 'Wawasan Industri',
          items: [
            { name: 'Blog', href: '/blog' },
            { name: 'Studi Kasus', href: '/case-studies' },
            { name: 'Makalah Putih', href: '/white-papers' }
          ]
        }
      ]
    },
    {
      name: 'Karir',
      href: '/karir',
      hasDropdown: false
    },
    {
      name: 'Kontak',
      href: '/contact',
      hasDropdown: false
    }
  ], []);

  // Function to switch language
  const switchLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    setLanguageOpen(false);
    
    // Save language preference in localStorage
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch (error) {
      console.error('Could not save language preference:', error);
    }
  };

  // Load saved language preference on mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      // Silent fail if localStorage is unavailable
    }
  }, []);

  // Determine which navigation items to use based on current language
  const navItems = currentLanguage === 'id' ? navItemsId : navItemsEn;

  // Rest of your component code remains the same...
  // (Scroll handler, dropdown logic, etc.)

  return (
    <AnimatePresence>
      {(isScrollingUp || !isScrolled) && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed w-full z-50 transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/90 backdrop-blur-md shadow-lg'
              : 'bg-transparent'
          }`}
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo with animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/" className="flex items-center space-x-3" aria-label="KBS homepage">
                  <Image
                    src="/images/logo-kbs.png"
                    alt="KBS Logo"
                    width={40}
                    height={40}
                    className="w-auto h-10 rounded-md shadow-lg"
                    priority
                  />
                  <span className={`text-2xl font-bold bg-gradient-to-r 
                    ${isScrolled 
                      ? 'from-[#153969] to-[#718bab]' 
                      : 'from-white to-gray-200'} 
                    text-transparent bg-clip-text transition-all duration-300`}>
                    KBS
                  </span>
                </Link>
              </motion.div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
                {navItems.map((item, index) => (
                  <div key={index} className="relative">
                    {item.hasDropdown ? (
                      <div>
                        <motion.button
                          onClick={() => toggleDropdown(index)}
                          whileHover={{ y: -2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className={`flex items-center relative font-medium transition-colors text-sm tracking-wider
                            ${isScrolled
                              ? isLinkActive(item.href)
                                ? 'text-[#153969]'
                                : 'text-gray-600 hover:text-[#153969]'
                              : isLinkActive(item.href)
                                ? 'text-white'
                                : 'text-gray-200 hover:text-white'
                            }`}
                          aria-expanded={activeDropdown === index}
                          aria-controls={`dropdown-menu-${index}`}
                        >
                          {item.name}
                          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                          {isLinkActive(item.href) && (
                            <motion.div
                              layoutId="navUnderline"
                              className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                                isScrolled ? 'bg-[#153969]' : 'bg-white'
                              }`}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </motion.button>
                      
                        {/* Enhanced dropdown menu */}
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              id={`dropdown-menu-${index}`}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={dropdownVariants}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 w-full min-w-[400px] mt-1 p-4 bg-white shadow-lg rounded-md z-50"
                              style={{ 
                                transform: 'translateX(-50%)',
                                left: '50%'
                              }}
                            >
                              <div className="border-b-2 border-[#153969] pb-1 mb-3 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-[#153969]">{item.name}</h3>
                                <Link 
                                  href={item.href} 
                                  className="text-sm text-[#153969] hover:underline flex items-center"
                                >
                                  View All <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                              </div>
                              
                              <div className="flex justify-between gap-10">
                                {item.sections && item.sections.map((section, sectionIndex) => (
                                  <div key={sectionIndex} className="flex-1">
                                    <h4 className="text-sm font-semibold text-[#153969] mb-2 pb-1 border-b border-gray-200">
                                      {section.title}
                                    </h4>
                                    <ul className="space-y-2">
                                      {section.items.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                          <Link
                                            href={subItem.href}
                                            className={`text-gray-700 hover:text-[#153969] text-sm block py-1 transition-colors ${isLinkActive(subItem.href) ? 'font-medium text-[#153969]' : ''}`}
                                          >
                                            {subItem.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Link
                          href={item.href}
                          className={`relative font-medium transition-colors text-sm tracking-wider
                            ${isScrolled
                              ? isLinkActive(item.href)
                                ? 'text-[#153969]'
                                : 'text-gray-600 hover:text-[#153969]'
                              : isLinkActive(item.href)
                                ? 'text-white'
                                : 'text-gray-200 hover:text-white'
                            }`}
                        >
                          {item.name}
                          {isLinkActive(item.href) && (
                            <motion.div
                              layoutId="navUnderline"
                              className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                                isScrolled ? 'bg-[#153969]' : 'bg-white'
                              }`}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Language Switcher */}
                <div className="relative" ref={langDropdownRef}>
                  <motion.button
                    onClick={() => setLanguageOpen(!languageOpen)}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`flex items-center relative font-medium transition-colors text-sm tracking-wider
                      ${isScrolled ? 'text-gray-600 hover:text-[#153969]' : 'text-gray-200 hover:text-white'}`}
                    aria-expanded={languageOpen}
                    aria-label="Change language"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    <span className="uppercase">{currentLanguage}</span>
                    <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${languageOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {languageOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => switchLanguage('id')}
                            className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                              currentLanguage === 'id'
                                ? 'bg-gray-100 text-[#153969] font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            aria-label="Switch to Indonesian"
                          >
                            <span className="mr-2">🇮🇩</span> Indonesia
                          </button>
                          <button
                            onClick={() => switchLanguage('en')}
                            className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                              currentLanguage === 'en'
                                ? 'bg-gray-100 text-[#153969] font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            aria-label="Switch to English"
                          >
                            <span className="mr-2">🇬🇧</span> English
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Get Quote Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative overflow-hidden px-6 py-2 rounded-md font-medium
                    transition-all duration-300 ${
                      isScrolled
                        ? 'bg-gradient-to-r from-[#153969] to-[#718bab] text-white shadow-lg hover:shadow-[#153969]/50'
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/50'
                    }`}
                >
                  <span className="relative z-10">Get Quote</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#153969] to-[#718bab] opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                {/* Mobile Language Switcher */}
                <div className="relative" ref={langDropdownRef}>
                  <motion.button
                    onClick={() => setLanguageOpen(!languageOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-md ${
                      isScrolled ? 'text-[#153969]' : 'text-white'
                    }`}
                    aria-label="Change language"
                  >
                    <Globe className="h-5 w-5" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {languageOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => switchLanguage('id')}
                            className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                              currentLanguage === 'id'
                                ? 'bg-gray-100 text-[#153969] font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span className="mr-2">🇮🇩</span> Indonesia
                          </button>
                          <button
                            onClick={() => switchLanguage('en')}
                            className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                              currentLanguage === 'en'
                                ? 'bg-gray-100 text-[#153969] font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span className="mr-2">🇬🇧</span> English
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Menu Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`p-2 rounded-md ${
                    isScrolled ? 'text-[#153969]' : 'text-white'
                  }`}
                  aria-expanded={isMobileMenuOpen}
                  aria-label="Toggle mobile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white shadow-lg overflow-hidden"
              >
                <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                  {navItems.map((item, index) => (
                    <div key={index} className="py-1">
                      {item.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(index)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-md ${
                              isLinkActive(item.href)
                                ? 'bg-[#153969]/10 text-[#153969] font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            aria-expanded={activeDropdown === index}
                          >
                            <span>{item.name}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-300 ${
                                activeDropdown === index ? 'transform rotate-180' : ''
                              }`} 
                            />
                          </button>

                          <AnimatePresence>
                            {activeDropdown === index && (
                              <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={dropdownVariants}
                                transition={{ duration: 0.2 }}
                                className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3"
                              >
                                {item.sections && item.sections.map((section, sectionIndex) => (
                                  <div key={sectionIndex} className="mb-2">
                                    <div className="text-sm font-semibold text-[#153969] py-1">{section.title}</div>
                                    {section.items.map((subItem, subItemIndex) => (
                                      <Link
                                        key={subItemIndex}
                                        href={subItem.href}
                                        className={`block px-3 py-2 rounded-md text-sm ${
                                          isLinkActive(subItem.href)
                                            ? 'bg-[#153969]/10 text-[#153969] font-medium'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 rounded-md ${
                            isLinkActive(item.href)
                              ? 'bg-[#153969]/10 text-[#153969] font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <button className="w-full py-3 bg-gradient-to-r from-[#153969] to-[#718bab] text-white rounded-md font-medium">
                      Get Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}