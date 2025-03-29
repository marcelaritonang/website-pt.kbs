'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const slides = [
  {
    image: "/images/company.jpg",
    category: "PT Karya Bangun Semesta",
    title: "Karya Nyata, Membangun Semesta",
    description: "Menjadi perusahaan terpercaya dan terdepan dalam layanan General Contractor, Dump Truck, dan Heavy Equipment, dengan menghadirkan solusi pembangunan yang inovatif, berkualitas tinggi, dan berkelanjutan."
  },
  {
    image: "/images/construction1.jpg",
    category: "Gedung Modern",
    title: "Konstruksi Gedung Perkantoran",
    description: "Pembangunan gedung komersial dan residensial dengan standar tinggi"
  },
  {
    image: "/images/construction2.jpg", 
    category: "Infrastruktur",
    title: "Pengembangan Infrastruktur",
    description: "Pembangunan infrastruktur kota dengan teknologi modern"
  },
  {
    image: "/images/construction3.jpg",
    category: "Residensial",
    title: "Perumahan Elite",
    description: "Pembangunan kawasan perumahan modern berkualitas"
  }
];

// Pemetaan slide ke section content terkait
const slideToSection = {
  0: "about", // Company info ke About
  1: "services", // Gedung Modern ke Services
  2: "projects", // Infrastruktur ke Projects
  3: "contact" // Residensial ke Contact
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs untuk menyimpan interval timer
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update company colors
  const brandColors = {
    primary: '#153969',    // Navy Blue
    secondary: '#1E4D2B',  // Dark Green
    accent: '#4A90E2',     // Light Blue
    neutral: '#E5E5E5'     // Light Gray
  };

  // Deteksi ukuran layar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial render
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Client-side mounting check
  useEffect(() => {
    setIsMounted(true);
    return () => {
      // Cleanup intervals
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Auto play - improved with useRef for cleanup
  useEffect(() => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
    
    if (isPlaying && isMounted) {
      slideIntervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = null;
      }
    };
  }, [isPlaying, isMounted]);

  // Progress bar - improved with useRef for cleanup
  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    if (isPlaying && isMounted) {
      setProgress(0);
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) return 0;
          return prev + 1;
        });
      }, 50);
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [currentSlide, isPlaying, isMounted]);

  // Function to pause carousel when user interacts
  const handleUserInteraction = (index: number) => {
    // Temporarily pause autoplay on user interaction
    setIsPlaying(false);
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    
    // Resume autoplay after 8 seconds
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  };

  // Handle Explore More button click
  const handleExploreClick = () => {
    // Get section ID based on current slide
    const sectionId = slideToSection[currentSlide as keyof typeof slideToSection];
    if (!sectionId) return;
    
    // Find the section element and scroll to it
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      clipPath: direction > 0 
        ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
        : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      opacity: 1,
      scale : 1 
    }),
    center: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      opacity: 1,
      scale : 1
    },
    exit: (direction: number) => ({
      clipPath: direction < 0
        ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
        : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      opacity: 1
    })
  };

  // Icons
  const PauseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );

  const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  return (
    // Perbaikan 1: Menambahkan overflow-x-hidden pada root container
    <div className="relative h-screen w-full max-w-[100vw] overflow-x-hidden bg-black">
      {/* Color Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none transition-colors duration-1000"
        style={{
          backgroundColor: brandColors.primary,
          mixBlendMode: 'overlay',
          opacity: 0.15
        }}
      />

      {/* Main Slider */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <motion.div 
            className="relative h-full w-full overflow-hidden"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
          >
            {/* Perbaikan 2: Ensuring the image doesn't stretch beyond viewport */}
            <div className="absolute inset-0">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)'
              }}
            />
          </motion.div>

          {/* Content Container - Mobile Optimized */}
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20">
            {/* Perbaikan 3: Pastikan konten tidak lebih lebar dari viewport */}
            <div className="w-full max-w-[calc(100vw-48px)] md:max-w-lg">
              {/* Category Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-3 md:mb-4"
              >
                <span className="inline-block bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-sm 
                                text-blue-100 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider 
                                border border-blue-500/20 shadow-lg">
                  {isMobile && currentSlide === 0 ? "PT KBS" : slides[currentSlide].category}
                </span>
              </motion.div>

              {/* Title - Simplified for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-4 md:mb-6"
              >
                {isMobile ? (
                  <h1 className="text-4xl font-bold text-white leading-tight">
                    {currentSlide === 1 ? "Konstruksi Gedung Perkantoran" : 
                     currentSlide === 2 ? "Pengembangan Infrastruktur" : 
                     currentSlide === 3 ? "Perumahan Elite" : "Karya Nyata"}
                  </h1>
                ) : (
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    {slides[currentSlide].title.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + (i * 0.1) }}
                        className="inline-block mr-4"
                      >
                        <span className="inline-block bg-gradient-to-r from-white via-gray-100 to-gray-300 
                                        text-transparent bg-clip-text transform hover:scale-105 
                                        transition-transform duration-300"
                        >
                          {word}
                        </span>
                      </motion.span>
                    ))}
                  </h1>
                )}
              </motion.div>

              {/* Description - Shortened & Simplified for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mb-5 md:mb-8"
              >
                <p className="text-white/90 text-sm md:text-xl leading-relaxed
                            backdrop-blur-sm rounded-lg border border-white/10 
                            p-4 bg-black/30">
                  {isMobile 
                    ? slides[currentSlide].description.split('.')[0] + '.' 
                    : slides[currentSlide].description}
                </p>
              </motion.div>

              {/* Explore Button - Simplified */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <button 
                  onClick={handleExploreClick}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 
                            text-white px-6 py-2.5 rounded-md text-sm font-medium
                            hover:from-blue-700 hover:to-blue-800 
                            shadow-md hover:shadow-blue-500/30"
                >
                  Jelajahi Lebih Lanjut
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Redesigned for Mobile */}
      <div className={`absolute ${isMobile ? 'bottom-6 inset-x-0 px-6' : 'bottom-8 left-20 right-20'} z-20`}>
        <div className="flex flex-col gap-4">
          {/* Indicator Dots for Mobile */}
          {isMobile && (
            <div className="flex justify-center gap-2 mb-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleUserInteraction(index)}
                  className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/30'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Navigation Tabs and Controls */}
          <div className="flex justify-between items-center w-full">
            {!isMobile && (
              <div className="flex gap-6">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => handleUserInteraction(index)}
                    className="relative py-2 focus:outline-none"
                    aria-label={`Tampilkan slide ${slide.category}`}
                  >
                    <span className={`text-sm transition-colors duration-300 ${
                      currentSlide === index ? 'text-white' : 'text-gray-400'
                    }`}>
                      {slide.category}
                    </span>
                    {currentSlide === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Navigation Controls for Mobile */}
            {isMobile && (
              <div className="w-full flex justify-between items-center">
                <button 
                  onClick={() => handleUserInteraction((currentSlide - 1 + slides.length) % slides.length)}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                  aria-label="Slide sebelumnya"
                >
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                
                <div className="text-xs text-white/70 font-medium">
                  {currentSlide === 0 ? 'PT KBS' : 
                   currentSlide === 1 ? 'Gedung' : 
                   currentSlide === 2 ? 'Infrastruktur' : 'Residensial'}
                </div>
                
                <button 
                  onClick={() => handleUserInteraction((currentSlide + 1) % slides.length)}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                  aria-label="Slide berikutnya"
                >
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            )}

            {/* Play/Pause Control */}
            {!isMobile && (
              <div className="relative">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    className="text-gray-600"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="24"
                    cy="24"
                  />
                  <circle
                    className="text-white"
                    strokeWidth="2"
                    strokeDasharray={125.6}
                    strokeDashoffset={125.6 * (1 - progress / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="24"
                    cy="24"
                  />
                </svg>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center text-white hover:text-yellow-500 transition-colors focus:outline-none"
                  aria-label={isPlaying ? "Jeda slideshow" : "Putar slideshow"}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>
            )}
          </div>
          
          {/* Play/Pause for Mobile - Simplified */}
          {isMobile && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
              aria-label={isPlaying ? "Jeda slideshow" : "Putar slideshow"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}