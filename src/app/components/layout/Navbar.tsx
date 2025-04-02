'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown, Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const pathname = usePathname();
  const router = useRouter();
  const { language, changeLanguage, t } = useLanguage();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Fungsi untuk mendeteksi apakah halaman ini memiliki background gelap
  const isDarkPage = pathname === '/' || 
                    pathname.startsWith('/projects') || 
                    pathname.startsWith('/services');

  // Data navigasi dengan terjemahan
  const navItems: NavLinkItem[] = [
    {
      name: t('nav.home'),
      href: '/',
      hasDropdown: false
    },
    {
      name: t('nav.whoWeAre'),
      href: '/about',
      hasDropdown: true,
      sections: [
        {
          title: t('nav.aboutUs'),
          items: [
            { 
              name: t('nav.companyProfile'), 
              href: '/about/profile',
              description: t('nav.companyProfileDesc')
            },
            { 
              name: t('nav.ourHistory'), 
              href: '/about/history',
              description: t('nav.ourHistoryDesc')
            },
            { 
              name: t('nav.certifications'), 
              href: '/about/iso',
              description: t('nav.certificationsDesc')
            },
            { 
              name: t('nav.ourTeam'), 
              href: '/about/team',
              description: t('nav.ourTeamDesc')
            }
          ]
        }
      ]
    },
    {
      name: t('nav.services'),
      href: '/services',
      hasDropdown: true,
      sections: [
        {
          title: t('nav.constructionServices'),
          items: [
            { 
              name: t('nav.buildingConstruction'), 
              href: '/services/building-construction',
              description: t('nav.buildingConstructionDesc')
            },
            { 
              name: t('nav.infrastructureDevelopment'), 
              href: '/services/infrastructure',
              description: t('nav.infrastructureDesc')
            },
            { 
              name: t('nav.projectManagement'), 
              href: '/services/project-management',
              description: t('nav.projectManagementDesc')
            }
          ]
        },
        {
          title: t('nav.heavyEquipment'),
          items: [
            { 
              name: t('nav.equipmentRental'), 
              href: '/services/equipment-rental',
              description: t('nav.equipmentRentalDesc') 
            },
            { 
              name: t('nav.operatorServices'), 
              href: '/services/equipment-operators',
              description: t('nav.operatorServicesDesc')
            },
            { 
              name: t('nav.maintenance'), 
              href: '/services/equipment-maintenance',
              description: t('nav.maintenanceDesc')
            }
          ]
        }
      ]
    },
    {
      name: t('nav.projects'),
      href: '/projects',
      hasDropdown: false
    },
    {
      name: t('nav.resources'),
      href: '/resources',
      hasDropdown: true,
      sections: [
        {
          title: t('nav.resources'),
          items: [
            { 
              name: t('nav.toolsResources'), 
              href: '/resources',
              description: t('nav.toolsResourcesDesc')
            },
            { 
              name: t('nav.codeOfEthics'), 
              href: '/ethics',
              description: t('nav.codeOfEthicsDesc')
            },
            { 
              name: t('nav.privacyPolicy'), 
              href: '/privacy',
              description: t('nav.privacyPolicyDesc')
            }
          ]
        },
        {
          title: t('nav.industryInsights'),
          items: [
            { 
              name: t('nav.blog'), 
              href: '/blog',
              description: t('nav.blogDesc')
            }
          ]
        }
      ]
    },
    {
      name: t('nav.careers'),
      href: '/karir',
      hasDropdown: false
    },
    {
      name: t('nav.contact'),
      href: '/contact',
      hasDropdown: false
    }
  ];

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

  // Toggle dropdown
  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Menangani klik pada item dropdown
  const handleSubItemClick = (href: string) => {
    // Tutup dropdown dan menu mobile
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    
    // Navigasi ke halaman yang diminta
    router.push(href);
  };

  // Cek apakah link aktif
  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Toggle language
  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-[9000] ${
      isScrolled 
        ? isDark 
          ? 'bg-gray-900 shadow-md' 
          : 'bg-white shadow-md' 
        : isDarkPage 
          ? 'bg-transparent' 
          : isDark 
            ? 'bg-gray-900 shadow-sm' 
            : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo-kbs.png"
                alt="KBS Logo"
                width={40}
                height={40}
                className="w-auto h-8 md:h-10 rounded-md"
                priority
              />
              <span className={`text-xl md:text-2xl font-bold ${
                isScrolled || !isDarkPage 
                  ? isDark 
                    ? 'text-white' 
                    : 'text-[#153969]' 
                  : 'text-white'
              }`}>
                KBS
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-6">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      {/* Dropdown trigger */}
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`flex items-center px-2 py-1 font-medium text-sm ${
                          isScrolled || !isDarkPage
                            ? isLinkActive(item.href) 
                              ? isDark 
                                ? 'text-blue-400' 
                                : 'text-[#153969]' 
                              : isDark 
                                ? 'text-gray-300' 
                                : 'text-gray-600'
                            : isLinkActive(item.href) 
                              ? 'text-white' 
                              : 'text-gray-200'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === index && (
                        <div className={`absolute left-1/2 -translate-x-1/2 mt-1 w-64 rounded-md shadow-lg z-50 border ${
                          isDark 
                            ? 'bg-gray-800 border-gray-700' 
                            : 'bg-white border-gray-100'
                        }`}>
                          <div className={`p-2 border-b ${
                            isDark ? 'border-gray-700' : 'border-gray-100'
                          }`}>
                            <div className="flex justify-between items-center">
                              <h3 className={`text-sm font-semibold ${
                                isDark ? 'text-blue-400' : 'text-[#153969]'
                              }`}>
                                {item.name}
                              </h3>
                            </div>
                          </div>
                          
                          <div className="py-1 max-h-[70vh] overflow-y-auto">
                            {item.sections?.map((section, sectionIndex) => (
                              <div key={sectionIndex} className="mb-1">
                                <h4 className={`px-3 py-1 text-xs font-bold uppercase ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {section.title}
                                </h4>
                                
                                {section.items.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className={`block px-3 py-2 ${
                                      isDark 
                                        ? 'text-gray-200 hover:bg-gray-700 hover:text-blue-400' 
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#153969]'
                                    }`}
                                    onClick={() => handleSubItemClick(subItem.href)}
                                  >
                                    <div className="text-sm font-medium">
                                      {subItem.name}
                                    </div>
                                    {subItem.description && (
                                      <div className={`text-xs mt-0.5 ${
                                        isDark ? 'text-gray-400' : 'text-gray-500'
                                      }`}>
                                        {subItem.description}
                                      </div>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-2 py-1 font-medium text-sm ${
                        isScrolled || !isDarkPage
                          ? isLinkActive(item.href) 
                            ? isDark 
                              ? 'text-blue-400' 
                              : 'text-[#153969]' 
                            : isDark 
                              ? 'text-gray-300' 
                              : 'text-gray-600'
                          : isLinkActive(item.href) 
                            ? 'text-white' 
                            : 'text-gray-200'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Right Controls */}
            <div className="flex items-center ml-6 space-x-2">
              {/* Language Switcher */}
              <button 
                onClick={toggleLanguage}
                className={`p-2 rounded-full ${
                  isScrolled || !isDarkPage 
                    ? isDark 
                      ? 'text-gray-300' 
                      : 'text-gray-600' 
                    : 'text-white'
                }`}
                aria-label={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
              >
                <Globe className="h-5 w-5" />
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isScrolled || !isDarkPage 
                    ? isDark 
                      ? 'text-gray-300' 
                      : 'text-gray-600' 
                    : 'text-white'
                }`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Get Quote Button */}
              <a
                href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-2 px-6 py-2 rounded-md font-medium ${
                  isScrolled || !isDarkPage
                    ? 'bg-[#153969] text-white shadow-md'
                    : 'bg-white/20 text-white border border-white/50'
                }`}
              >
                {t('nav.getQuote')}
              </a>
            </div>
          </div>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className={`p-2 rounded-full ${
                isScrolled || !isDarkPage 
                  ? isDark 
                    ? 'text-gray-300' 
                    : 'text-gray-600' 
                  : 'text-white'
              }`}
            >
              <Globe className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isScrolled || !isDarkPage 
                  ? isDark 
                    ? 'text-gray-300' 
                    : 'text-gray-600' 
                  : 'text-white'
              }`}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full ${
                isScrolled || !isDarkPage
                  ? isDark 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-100 text-[#153969]'
                  : 'bg-white/20 text-white'
              }`}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden shadow-lg ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className="pt-2 pb-4">
            {navItems.map((item, index) => (
              <div key={index} className="px-4 py-1">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center justify-between w-full py-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className={`h-4 w-4 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeDropdown === index && (
                      <div className={`ml-4 mt-1 border-l-2 pl-2 ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        {item.sections?.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="mb-2">
                            <div className={`py-1 text-xs font-bold uppercase ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {section.title}
                            </div>
                            
                            {section.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className={`block py-2 ${
                                  isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-2 font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="mt-4 px-4">
              <a
                href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 bg-[#153969] text-white rounded-md text-center font-medium"
              >
                {t('nav.getQuote')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}