'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY <= 0)
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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
              ? 'bg-white/80 backdrop-blur-md shadow-lg'
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo with enhanced animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/" className="flex items-center space-x-3">
                  <Image
                    src="/images/logo-kbs.png"
                    alt="KBS Logo"
                    width={40}
                    height={40}
                    className="w-auto h-10 rounded-md shadow-lg"
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

              {/* Enhanced Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                  { name: 'Services', href: '/services' },
                  { name: 'Projects', href: '/projects' },
                  { name: 'Contact', href: '/contact' }
                ].map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative font-medium transition-colors text-sm tracking-wider
                        ${isScrolled
                          ? pathname === item.href
                            ? 'text-[#153969]'
                            : 'text-gray-600 hover:text-[#153969]'
                          : pathname === item.href
                            ? 'text-white'
                            : 'text-gray-200 hover:text-white'
                        }`}
                    >
                      {item.name}
                      {pathname === item.href && (
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
                ))}

                {/* Enhanced Get Quote Button */}
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

              {/* Mobile Menu Button with enhanced styling */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`md:hidden p-2 rounded-lg ${
                  isScrolled ? 'text-[#153969]' : 'text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}