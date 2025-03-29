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

  // Updated shape variants for paired shapes - mobile responsive
  const shapeContainerVariants = {
    initial: { 
      opacity: 0,
      x: 100
    },
    animate: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  // Icons
  const PauseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );

  const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  // Update getIsometricShape to include all slides with paired shapes - with mobile responsive
  const getIsometricShape = (slideIndex: number) => {
    const shapes = {
      0: [ // Company intro shapes
        {
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          background: `linear-gradient(135deg, ${brandColors.primary}CC, ${brandColors.primary}66)`,
          rotate: 0,
          delay: 0
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          background: `linear-gradient(135deg, ${brandColors.secondary}CC, ${brandColors.secondary}66)`,
          rotate: 180,
          delay: 0.2
        }
      ],
      1: [ // Modern Building shapes
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          background: `linear-gradient(135deg, ${brandColors.primary}BB, ${brandColors.accent}66)`,
          rotate: 45,
          delay: 0
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          background: `linear-gradient(135deg, ${brandColors.secondary}BB, ${brandColors.primary}66)`,
          rotate: -45,
          delay: 0.2
        }
      ],
      2: [ // Infrastructure shapes
        {
          clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
          background: `linear-gradient(135deg, ${brandColors.accent}CC, ${brandColors.primary}66)`,
          rotate: 0,
          delay: 0
        },
        {
          clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
          background: `linear-gradient(135deg, ${brandColors.primary}CC, ${brandColors.secondary}66)`,
          rotate: 45,
          delay: 0.2
        }
      ],
      3: [ // Residential shapes
        {
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          background: `linear-gradient(135deg, ${brandColors.secondary}CC, ${brandColors.primary}66)`,
          rotate: 0,
          delay: 0
        },
        {
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          background: `linear-gradient(135deg, ${brandColors.primary}CC, ${brandColors.accent}66)`,
          rotate: 30,
          delay: 0.2
        }
      ]
    };

    // Responsive size adjustments
    const containerSize = isMobile ? { width: '250px', height: '200px' } : { width: '700px', height: '600px' };
    const shapeSize = isMobile ? '150px' : '300px';
    const posOffsets = isMobile ? { top: 5, right: 5 } : { top: 15, right: 10 };

    return (
      <motion.div
        variants={shapeContainerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative"
        style={{
          width: containerSize.width,
          height: containerSize.height
        }}
      >
        {shapes[slideIndex as keyof typeof shapes].map((shape, i) => (
          <motion.div
            key={i}
            variants={{
              initial: { 
                opacity: 0,
                scale: 0.5,
                x: 100,
                rotate: shape.rotate - 30
              },
              animate: { 
                opacity: isMobile ? 0.3 : 0.4, // Slightly more transparent on mobile
                scale: 1,
                x: 0,
                rotate: shape.rotate,
                transition: {
                  duration: 0.8,
                  delay: shape.delay,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }
              },
              exit: { 
                opacity: 0,
                scale: 0.5,
                x: 100,
                rotate: shape.rotate + 30,
                transition: {
                  duration: 0.4,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }
              }
            }}
            className="absolute"
            style={{
              top: `${20 + (i * posOffsets.top)}%`,
              right: `${10 + (i * posOffsets.right)}%`,
              width: shapeSize,
              height: shapeSize,
              clipPath: shape.clipPath,
              background: shape.background,
              mixBlendMode: 'screen',
              filter: 'blur(1px)',
              zIndex: 2 - i
            }}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
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
          {/* Background Image dengan Zoom Effect */}
          <motion.div 
            className="relative h-full w-full overflow-hidden"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover transform transition-transform scale-110"
              priority
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)'
              }}
            />
          </motion.div>

          {/* Content - Responsive for mobile */}
          <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-20">
            {/* Category Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="inline-block bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-sm 
                              text-blue-400 px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider 
                              border border-blue-500/20 shadow-lg">
                {slides[currentSlide].category}
              </span>
            </motion.div>

            {/* Title with Enhanced Styling - Mobile responsive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="my-3 sm:my-6"
            >
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight">
                {slides[currentSlide].title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="inline-block mr-2 sm:mr-4"
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
            </motion.div>

            {/* Description with Enhanced Styling - Mobile responsive */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed
                          backdrop-blur-sm rounded-lg border border-white/10 
                          p-3 sm:p-6 bg-black/20"
            >
              {isMobile 
                ? slides[currentSlide].description.split(' ').slice(0, 14).join(' ') + '...' 
                : slides[currentSlide].description}
            </motion.p>

            {/* Explore More Button improved with scroll to section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-4 sm:mt-8"
            >
              <button 
                onClick={handleExploreClick}
                className="bg-gradient-to-r from-blue-500 to-blue-600 
                          text-white px-5 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base
                          hover:from-blue-600 hover:to-blue-700
                          transform hover:scale-105 transition-all duration-300
                          shadow-lg hover:shadow-blue-500/50"
              >
                Jelajahi Lebih Lanjut
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Updated Isometric Shapes positioning - hidden on small mobile */}
      <div className={`absolute ${isMobile ? '-right-20 -top-10' : '-right-48 top-1/2 -translate-y-1/2'} z-10 pointer-events-none ${isMobile && 'scale-50'}`}>
        <AnimatePresence mode="wait">
          {getIsometricShape(currentSlide)}
        </AnimatePresence>
      </div>

      {/* Navigation - Improved with direct section links and mobile responsiveness */}
      <div className={`absolute bottom-8 left-4 sm:left-20 right-4 sm:right-20 ${isMobile ? 'flex flex-col gap-3' : 'flex justify-between'} items-center z-20`}>
        <div className={`flex ${isMobile ? 'gap-2 overflow-x-auto no-scrollbar' : 'gap-6'} w-full`}>
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => handleUserInteraction(index)}
              className={`relative py-2 focus:outline-none ${isMobile ? 'flex-1 min-w-0' : ''}`}
              aria-label={`Tampilkan slide ${slide.category}`}
            >
              <span className={`text-xs sm:text-sm transition-colors duration-300 truncate block ${
                currentSlide === index ? 'text-white' : 'text-gray-400'
              }`}>
                {isMobile && index === 0 
                  ? "PT KBS" 
                  : slide.category}
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

        {/* Play/Pause Control */}
        <div className={`relative ${isMobile ? 'mt-2' : ''}`}>
          <svg className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} transform -rotate-90`}>
            <circle
              className="text-gray-600"
              strokeWidth="2"
              stroke="currentColor"
              fill="transparent"
              r={isMobile ? "16" : "20"}
              cx={isMobile ? "20" : "24"}
              cy={isMobile ? "20" : "24"}
            />
            <circle
              className="text-white"
              strokeWidth="2"
              strokeDasharray={isMobile ? 100.48 : 125.6}
              strokeDashoffset={(isMobile ? 100.48 : 125.6) * (1 - progress / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={isMobile ? "16" : "20"}
              cx={isMobile ? "20" : "24"}
              cy={isMobile ? "20" : "24"}
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
      </div>

      {/* Swipe indicator for mobile */}
      {isMobile && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="flex items-center text-white/70 text-xs"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Geser</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}