'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface HeroSectionProps {
  slides: {
    image: string;
    title: string;
    category: string;
    description: string;
  }[];
}

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

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);

  // Update company colors
  const brandColors = {
    primary: '#153969',    // Navy Blue
    secondary: '#1E4D2B',  // Dark Green
    accent: '#4A90E2',     // Light Blue
    neutral: '#E5E5E5'     // Light Gray
  };

  // Auto play
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Progress bar
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    if (isPlaying) {
      setProgress(0);
      progressInterval = setInterval(() => {
        setProgress((prev) => (prev + 1) % 100);
      }, 50);
    }
    return () => clearInterval(progressInterval);
  }, [currentSlide, isPlaying]);

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

  // Updated shape variants for paired shapes
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

  const shapeElementVariants = {
    initial: { 
      opacity: 0,
      scale: 0,
      rotate: -20,
      y: 50
    },
    animate: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0,
      rotate: 20,
      y: -50,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96]
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

  // Update getIsometricShape to include all slides with paired shapes
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

    return (
      <motion.div
        variants={shapeContainerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-[700px] h-[600px]"
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
                opacity: 0.4,
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
              top: `${20 + (i * 15)}%`,
              right: `${10 + (i * 10)}%`,
              width: '300px',
              height: '300px',
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

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-20">
            {/* Category Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="inline-block bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-sm 
                              text-blue-400 px-6 py-2 rounded-full text-sm font-semibold tracking-wider 
                              border border-blue-500/20 shadow-lg">
                {slides[currentSlide].category}
              </span>
            </motion.div>

            {/* Title with Enhanced Styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="my-6"
            >
              <h1 className="text-7xl font-bold leading-tight">
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
            </motion.div>

            {/* Description with Enhanced Styling */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-xl text-gray-300 max-w-2xl leading-relaxed
                          backdrop-blur-sm rounded-lg border border-white/10 
                          p-6 bg-black/20"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* Optional CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-8"
            >
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 
                                text-white px-8 py-3 rounded-lg
                                hover:from-blue-600 hover:to-blue-700
                                transform hover:scale-105 transition-all duration-300
                                shadow-lg hover:shadow-blue-500/50">
                Explore More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Updated Isometric Shapes positioning */}
      <div className="absolute -right-48 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          {getIsometricShape(currentSlide)}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-20 right-20 flex justify-between items-center z-20">
        <div className="flex gap-6">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className="relative py-2"
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

        {/* Play/Pause Control */}
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
            className="absolute inset-0 flex items-center justify-center text-white hover:text-yellow-500 transition-colors"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}