'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, X, Menu, Phone } from 'lucide-react'

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
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Improved scroll handler
  useEffect(() => {
    // Enable smooth scrolling globally
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY <= 0);
      setLastScrollY(currentScrollY);
    };
    
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset scroll behavior on cleanup
      document.documentElement.style.scrollBehavior = '';
    };
  }, [lastScrollY]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    
    // Close dropdown when pressing escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Disable body scroll when mobile menu is open
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

  // Enhanced smooth scroll handling
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Close any open dropdown and mobile menu
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    
    // If it's a hash link on the current page
    if (href.includes('#') && pathname === href.split('#')[0]) {
      const targetId = href.split('#')[1];
      const element = document.getElementById(targetId);
      
      if (element) {
        // Smooth scroll implementation that works across browsers
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
        return;
      }
    }

    // Use Next.js routing with delayed execution for smoother transitions
    setTimeout(() => {
      router.push(href);
    }, 300);
    
    // If the link is to another page, do a smooth transition
    if (pathname !== href.split('#')[0]) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigation data
  const navItems: NavLinkItem[] = useMemo(() => [
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
  ], []);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Check if link is active
  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Improved animation variants for a smoother experience
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -8, 
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -8, 
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {(isScrollingUp || !isScrolled) && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed w-full z-50 transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-md shadow-lg'
              : 'bg-transparent'
          }`}
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo with animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/" className="flex items-center space-x-2 md:space-x-3" aria-label="KBS homepage"
                  onClick={(e) => handleNavigation(e, '/')}>
                  <Image
                    src="/images/logo-kbs.png"
                    alt="KBS Logo"
                    width={40}
                    height={40}
                    className="w-auto h-8 md:h-10 rounded-md shadow-lg"
                    priority
                  />
                  <span className={`text-xl md:text-2xl font-bold bg-gradient-to-r 
                    ${isScrolled 
                      ? 'from-[#153969] to-[#718bab]' 
                      : 'from-white to-gray-200'} 
                    text-transparent bg-clip-text transition-all duration-300`}>
                    KBS
                  </span>
                </Link>
              </motion.div>

              {/* Navigation Links - Desktop Only */}
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
                      
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              id={`dropdown-menu-${index}`}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={dropdownVariants}
                              className="absolute left-0 mt-2 w-64 py-2 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-100"
                              style={{ 
                                transform: 'translateX(-30%)',
                                left: '50%'
                              }}
                            >
                              <div className="px-3 py-2 border-b border-gray-100">
                                <h3 className="text-base font-semibold text-[#153969]">{item.name}</h3>
                              </div>
                              
                              <div className="px-2 py-2 max-h-[70vh] overflow-y-auto">
                                {item.sections && item.sections.map((section, sectionIndex) => (
                                  <div key={sectionIndex} className="mb-2">
                                    <h4 className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                                      {section.title}
                                    </h4>
                                    
                                    {section.items.map((subItem, subIndex) => (
                                      <Link
                                        key={subIndex}
                                        href={subItem.href}
                                        onClick={(e) => handleNavigation(e, subItem.href)}
                                        className="flex flex-col px-2 py-2 hover:bg-gray-50 rounded-md transition-colors group"
                                      >
                                        <span className={`text-sm font-medium ${isLinkActive(subItem.href) ? 'text-[#153969]' : 'text-gray-700 group-hover:text-[#153969]'}`}>
                                          {subItem.name}
                                        </span>
                                        {subItem.description && (
                                          <span className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                            {subItem.description}
                                          </span>
                                        )}
                                      </Link>
                                    ))}
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
                          onClick={(e) => handleNavigation(e, item.href)}
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

                {/* Get Quote Button - Desktop */}
                <motion.a
                  href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative overflow-hidden px-6 py-2 rounded-md font-medium
                    transition-all duration-300 ${
                      isScrolled
                        ? 'bg-gradient-to-r from-[#153969] to-[#718bab] text-white shadow-md hover:shadow-xl'
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/50'
                    }`}
                >
                  <span className="relative z-10">Get Quote</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#1c4b8c] to-[#5677a3] opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </motion.a>
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center space-x-2">
                {/* Quick Call Button - Mobile Only */}
                <motion.a
                  href="tel:+6281218127503"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full ${
                    isScrolled 
                      ? 'bg-[#153969] text-white'
                      : 'bg-white/20 text-white backdrop-blur-sm'
                  }`}
                  aria-label="Call us"
                >
                  <Phone className="w-4 h-4" />
                </motion.a>
                
                {/* Mobile Menu Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`p-2 rounded-full ${
                    isScrolled 
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
                </motion.button>
              </div>
            </div>
          </div>

          {/* Improved Mobile Menu - Full Screen Slide In */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                ref={mobileMenuRef}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                className="fixed top-0 right-0 bottom-0 w-full sm:w-[330px] bg-white shadow-xl z-50 flex flex-col"
              >
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
                    className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2">
                  {navItems.map((item, index) => (
                    <div key={index} className="mb-1">
                      {item.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(index)}
                            className={`flex items-center justify-between w-full px-3 py-3 rounded-md ${
                              isLinkActive(item.href)
                                ? 'bg-[#153969]/10 text-[#153969] font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            aria-expanded={activeDropdown === index}
                          >
                            <span className="text-base">{item.name}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-300 ${
                                activeDropdown === index ? 'transform rotate-180' : ''
                              }`} 
                            />
                          </button>

                          <AnimatePresence>
                            {activeDropdown === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="ml-2 my-1 border-l-2 border-gray-200 pl-2"
                              >
                                {item.sections && item.sections.map((section, sectionIndex) => (
                                  <div key={sectionIndex} className="mb-2">
                                    <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                                      {section.title}
                                    </div>
                                    
                                    {section.items.map((subItem, subItemIndex) => (
                                      <Link
                                        key={subItemIndex}
                                        href={subItem.href}
                                        onClick={(e) => handleNavigation(e, subItem.href)}
                                        className="flex flex-col px-3 py-2 hover:bg-gray-50 rounded-md"
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
                          onClick={(e) => handleNavigation(e, item.href)}
                          className={`flex items-center w-full px-3 py-3 rounded-md ${
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
                
                <div className="p-4 border-t border-gray-100">
                  <a 
                    href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-[#153969] to-[#718bab] text-white rounded-md font-medium text-center shadow-md"
                  >
                    Get Quote
                  </a>
                  
                  <div className="mt-4 text-center text-xs text-gray-500">
                    © 2024 KBS. All rights reserved.
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const smoothScrollPolyfill = (element: Element, _options: ScrollIntoViewOptions) => {
  const { top } = element.getBoundingClientRect();
  const startPosition = window.pageYOffset;
  const targetPosition = startPosition + top;
  
  const duration = 1000; // ms
  const startTime = performance.now();
  
  const easingFunction = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  
  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeProgress = easingFunction(progress);
    
    window.scrollTo(0, startPosition + (targetPosition - startPosition) * easeProgress);
    
    if (progress < 1) {
      window.requestAnimationFrame(animateScroll);
    }
  };
  
  window.requestAnimationFrame(animateScroll);
};