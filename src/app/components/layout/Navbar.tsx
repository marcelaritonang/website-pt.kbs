'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X, 
  Phone,
  ArrowRight,
} from 'lucide-react';

// Tipe data untuk item navigasi
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
  sections?: NavSection[];
}

// Data navigasi
const navItems: NavLinkItem[] = [
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
          { 
            name: 'Company Profile', 
            href: '/about/profile',
            description: 'Vision, mission, and company values' 
          },
          { 
            name: 'Our History', 
            href: '/about/history',
            description: 'Journey since establishment in 2005' 
          },
          { 
            name: 'Certifications', 
            href: '/about/iso',
            description: 'International quality certifications' 
          },
          { 
            name: 'Our Team', 
            href: '/about/team',
            description: 'Professional and dedicated members' 
          }
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
          { 
            name: 'Building Construction', 
            href: '/services/building-construction',
            description: 'Commercial and residential buildings' 
          },
          { 
            name: 'Infrastructure Development', 
            href: '/services/infrastructure',
            description: 'Roads, bridges, and public works' 
          },
          { 
            name: 'Project Management', 
            href: '/services/project-management',
            description: 'End-to-end project management' 
          }
        ]
      },
      {
        title: 'Heavy Equipment',
        items: [
          { 
            name: 'Equipment Rental', 
            href: '/services/equipment-rental',
            description: 'Excavators and machinery rental' 
          },
          { 
            name: 'Operator Services', 
            href: '/services/equipment-operators',
            description: 'Skilled equipment operators' 
          },
          { 
            name: 'Maintenance', 
            href: '/services/equipment-maintenance',
            description: 'Regular maintenance services' 
          }
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
          { 
            name: 'Tools & Resources', 
            href: '/resources',
            description: 'Industry guides and calculators' 
          },
          { 
            name: 'Code of Ethics', 
            href: '/ethics',
            description: 'Ethical business practices' 
          },
          { 
            name: 'Privacy Policy', 
            href: '/privacy',
            description: 'Data protection policy' 
          }
        ]
      },
      {
        title: 'Industry Insights',
        items: [
          { 
            name: 'Blog', 
            href: '/blog',
            description: 'Construction trends and updates' 
          },
          { 
            name: 'Case Studies', 
            href: '/case-studies',
            description: 'Analysis of successful projects' 
          }
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
    name: 'Contact',
    href: '/contact',
    hasDropdown: false
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);
  
  // Fungsi untuk mendeteksi apakah halaman ini memiliki background gelap
  const isDarkPage = pathname === '/' || 
                    pathname.startsWith('/projects') || 
                    pathname.startsWith('/services');

  // Track scroll untuk mengubah warna background navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set initial scroll state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Menangani klik di luar dropdown untuk menutupnya
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // Cek klik di luar dropdown
      if (activeDropdown !== null) {
        const activeRef = dropdownRefs.current[activeDropdown];
        if (activeRef && !activeRef.contains(e.target as Node)) {
          setActiveDropdown(null);
        }
      }
      
      // Cek klik di luar menu mobile
      if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Pastikan klik bukan pada tombol toggle menu
        const toggleButton = document.getElementById('mobile-menu-toggle');
        if (toggleButton && !toggleButton.contains(e.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [activeDropdown, isMobileMenuOpen]);

  // Mencegah scroll saat menu mobile terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Fungsi navigasi - PERBAIKAN: Hapus preventDefault untuk allow navigation
  const handleNavigation = (href: string) => {
    // Tutup dropdown dan menu mobile
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    
    // Navigasi langsung ke halaman yang diminta
    router.push(href);
  };

  // Toggle dropdown
  const toggleDropdown = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to parent elements
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Cek apakah link aktif
  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };
  
  // Mempersiapkan ref untuk setiap dropdown
  const setDropdownRef = (el: HTMLDivElement | null, index: number) => {
    dropdownRefs.current[index] = el;
  };

  return (
    <>
      {/* Fixed Navbar - Selalu terlihat */}
      <header 
        className={`fixed top-0 left-0 right-0 w-full z-[9000] transition-colors duration-500 ${
          isScrolled ? 'bg-white shadow-md' : isDarkPage ? 'bg-transparent' : 'bg-white shadow-sm'
        }`} 
        style={{ display: 'block' }} // Pastikan selalu terlihat
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <Link 
                href="/" 
                className="flex items-center space-x-2 transition transform hover:scale-105 duration-300"
              >
                <Image
                  src="/images/logo-kbs.png"
                  alt="KBS Logo"
                  width={40}
                  height={40}
                  className="w-auto h-8 md:h-10 rounded-md shadow-md"
                  priority
                />
                <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                  isScrolled || !isDarkPage 
                    ? 'text-[#153969]' 
                    : 'text-white'
                }`}>
                  KBS
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <div 
                  key={index} 
                  className="relative"
                  ref={(el) => setDropdownRef(el, index)}
                >
                  {item.hasDropdown ? (
                    <>
                      {/* Dropdown trigger - Semua klik membuka dropdown */}
                      <button
                        onClick={(e) => toggleDropdown(index, e)}
                        className={`flex items-center px-2 py-1 font-medium text-sm tracking-wider transition-all duration-300 hover:-translate-y-1 ${
                          isScrolled || !isDarkPage
                            ? isLinkActive(item.href) 
                              ? 'text-[#153969]' 
                              : 'text-gray-600 hover:text-[#153969]'
                            : isLinkActive(item.href)
                              ? 'text-white' 
                              : 'text-gray-200 hover:text-white'
                        }`}
                        aria-expanded={activeDropdown === index}
                      >
                        {item.name}
                        <ChevronDown 
                          className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`} 
                        />
                        
                        {isLinkActive(item.href) && (
                          <div className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                            isScrolled || !isDarkPage ? 'bg-[#153969]' : 'bg-white'
                          }`} />
                        )}
                      </button>

                      {/* Dropdown Menu dengan Animasi */}
                      <div
                        className={`absolute left-0 mt-2 w-64 py-2 bg-white rounded-lg shadow-xl z-50 border border-gray-100 transition-all duration-300 origin-top overflow-hidden ${
                          activeDropdown === index 
                            ? 'opacity-100 visible translate-y-0 scale-100' 
                            : 'opacity-0 invisible -translate-y-4 scale-95 pointer-events-none'
                        }`}
                        style={{ transform: 'translateX(-30%)', left: '50%' }}
                      >
                        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                          <h3 className="text-base font-semibold text-[#153969]">{item.name}</h3>
                          
                          {/* Link ke halaman utama */}
                          <Link
                            href={item.href}
                            className="text-xs text-blue-500 hover:text-blue-700 hover:underline transition"
                            onClick={() => handleNavigation(item.href)}
                          >
                            Lihat Semua
                          </Link>
                        </div>
                        
                        <div className="px-2 py-2 max-h-[70vh] overflow-y-auto">
                          {item.sections?.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-2">
                              <h4 className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                                {section.title}
                              </h4>
                              
                              {section.items.map((subItem, subIndex) => (
                                <div 
                                  key={subIndex} 
                                  className="block px-2 py-2 hover:bg-gray-50 rounded-md transition-colors duration-200 group cursor-pointer"
                                  onClick={() => {
                                    handleNavigation(subItem.href);
                                  }}
                                >
                                  <div className={`text-sm font-medium transition-colors duration-200 ${
                                    isLinkActive(subItem.href) ? 'text-[#153969]' : 'text-gray-700 group-hover:text-[#153969]'
                                  }`}>
                                    {subItem.name}
                                  </div>
                                  {subItem.description && (
                                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-1 group-hover:text-gray-600 transition-colors duration-200">
                                      {subItem.description}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    // Links tanpa dropdown
                    <Link
                      href={item.href}
                      className={`relative px-2 py-1 font-medium text-sm tracking-wider transition-all duration-300 hover:-translate-y-1 ${
                        isScrolled || !isDarkPage
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
                        <div className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                          isScrolled || !isDarkPage ? 'bg-[#153969]' : 'bg-white'
                        }`} />
                      )}
                    </Link>
                  )}
                </div>
              ))}

              {/* Desktop - Get Quote Button */}
              <a
                href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled || !isDarkPage
                    ? 'bg-[#153969] text-white shadow-md hover:bg-[#0f2849] hover:shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/50'
                }`}
              >
                Get Quote
              </a>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Quick Call Button - Mobile Only */}
              <a
                href="tel:+6281218127503"
                className={`p-2 rounded-full transition transform hover:scale-110 active:scale-95 duration-200 ${
                  isScrolled || !isDarkPage
                    ? 'bg-[#153969] text-white'
                    : 'bg-white/20 text-white backdrop-blur-sm'
                }`}
                aria-label="Call us"
              >
                <Phone className="w-4 h-4" />
              </a>
              
              {/* Mobile Menu Toggle */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full transition transform hover:scale-110 active:scale-95 duration-200 ${
                  isScrolled || !isDarkPage
                    ? 'bg-gray-100 text-[#153969]'
                    : 'bg-white/20 text-white backdrop-blur-sm'
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Slide in from side with animation */}
      <div 
        className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay with fade */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel with slide animation */}
        <div 
          ref={menuRef}
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl flex flex-col transition-transform duration-300 transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logo-kbs.png"
                alt="KBS Logo"
                width={32}
                height={32}
                className="w-auto h-8 rounded-md shadow-sm"
              />
              <span className="text-lg font-bold text-[#153969]">KBS</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Menu Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-2">
            {navItems.map((item, index) => (
              <div key={index} className="mb-1">
                {item.hasDropdown ? (
                  <div>
                    {/* HANYA TOGGLE DROPDOWN PADA MOBILE */}
                    <button
                      onClick={(e) => toggleDropdown(index, e)}
                      className={`flex items-center justify-between w-full px-3 py-3 rounded-md transition-colors duration-200 ${
                        isLinkActive(item.href)
                          ? 'bg-[#153969]/10 text-[#153969] font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      aria-expanded={activeDropdown === index}
                    >
                      <span className="text-base">{item.name}</span>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {/* Dropdown content dengan animasi */}
                    <div 
                      className={`ml-2 my-1 border-l-2 border-gray-200 pl-2 transition-all duration-300 overflow-hidden ${
                        activeDropdown === index 
                          ? 'max-h-96 opacity-100' 
                          : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="py-1">
                        {/* Link ke halaman utama di awal dropdown */}
                        <Link
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm text-[#153969] font-medium hover:bg-[#153969]/5 rounded-md"
                        >
                          <span>Lihat Semua {item.name}</span>
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </Link>
                      </div>

                      {item.sections?.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-2">
                          <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                            {section.title}
                          </div>
                          
                          {section.items.map((subItem, subItemIndex) => (
                            <div
                              key={subItemIndex}
                              className="flex flex-col px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-200 cursor-pointer"
                              onClick={() => {
                                handleNavigation(subItem.href);
                              }}
                            >
                              <div className={`text-sm font-medium ${
                                isLinkActive(subItem.href) ? 'text-[#153969]' : 'text-gray-700'
                              }`}>
                                {subItem.name}
                              </div>
                              {subItem.description && (
                                <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                  {subItem.description}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center w-full px-3 py-3 rounded-md transition-colors duration-200 ${
                      isLinkActive(item.href)
                        ? 'bg-[#153969]/10 text-[#153969] font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-base">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          {/* Menu Footer */}
          <div className="p-4 border-t border-gray-100">
            <a 
              href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 bg-[#153969] text-white rounded-md font-medium text-center shadow-md transition transform hover:scale-105 active:scale-95 duration-200"
            >
              Get Quote
            </a>
            
            <div className="mt-4 text-center text-xs text-gray-500">
              © 2024 KBS. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}