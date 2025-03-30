'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ChevronDown, 
  Menu, 
  X 
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-[9000] ${
        isScrolled ? 'bg-white shadow-md' : isDarkPage ? 'bg-transparent' : 'bg-white shadow-sm'
      }`} 
      style={{ display: 'block' }}
    >
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
                isScrolled || !isDarkPage ? 'text-[#153969]' : 'text-white'
              }`}>
                KBS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.hasDropdown ? (
                  <>
                    {/* Dropdown trigger */}
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center px-2 py-1 font-medium text-sm ${
                        isScrolled || !isDarkPage
                          ? isLinkActive(item.href) ? 'text-[#153969]' : 'text-gray-600'
                          : isLinkActive(item.href) ? 'text-white' : 'text-gray-200'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === index && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-100">
                        <div className="p-2 border-b border-gray-100">
                          <div className="flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-[#153969]">{item.name}</h3>
                            <Link
                              href={item.href}
                              className="text-xs text-blue-500 hover:underline"
                              onClick={() => setActiveDropdown(null)}
                            >
                              Lihat Semua
                            </Link>
                          </div>
                        </div>
                        
                        <div className="py-1 max-h-[70vh] overflow-y-auto">
                          {item.sections?.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-1">
                              <h4 className="px-3 py-1 text-xs font-bold uppercase text-gray-500">
                                {section.title}
                              </h4>
                              
                              {section.items.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  className="block px-3 py-2 hover:bg-gray-50 text-gray-700 hover:text-[#153969]"
                                  onClick={() => handleSubItemClick(subItem.href)}
                                >
                                  <div className="text-sm font-medium">
                                    {subItem.name}
                                  </div>
                                  {subItem.description && (
                                    <div className="text-xs text-gray-500 mt-0.5">
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
                        ? isLinkActive(item.href) ? 'text-[#153969]' : 'text-gray-600'
                        : isLinkActive(item.href) ? 'text-white' : 'text-gray-200'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Get Quote Button */}
            <a
              href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-2 rounded-md font-medium ${
                isScrolled || !isDarkPage
                  ? 'bg-[#153969] text-white shadow-md'
                  : 'bg-white/20 text-white border border-white/50'
              }`}
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full ${
                isScrolled || !isDarkPage
                  ? 'bg-gray-100 text-[#153969]'
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
        <div className="md:hidden bg-white shadow-lg">
          <div className="pt-2 pb-4">
            {navItems.map((item, index) => (
              <div key={index} className="px-4 py-1">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center justify-between w-full py-2 text-gray-700"
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className={`h-4 w-4 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeDropdown === index && (
                      <div className="ml-4 mt-1 border-l-2 border-gray-200 pl-2">
                        <div className="py-1">
                          <Link
                            href={item.href}
                            className="block py-2 text-[#153969] font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Lihat Semua {item.name}
                          </Link>
                        </div>
                        
                        {item.sections?.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="mb-2">
                            <div className="py-1 text-xs font-bold uppercase text-gray-500">
                              {section.title}
                            </div>
                            
                            {section.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className="block py-2 text-gray-700"
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
                    className="block py-2 text-gray-700 font-medium"
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
                Get Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}