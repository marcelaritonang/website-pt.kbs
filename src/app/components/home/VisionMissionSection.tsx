import React, { ReactElement, useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, BookmarkIcon, CheckIcon, } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

// Helper function to convert translation value to string
const asString = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  return String(value);
};

const AnimatedIsometric = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Animation variants for isometric shapes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const shapeVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      x: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  // Adjust position and size for mobile responsiveness
  return (
    <motion.div 
      className="absolute -right-8 md:-right-24 top-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] opacity-50 md:opacity-100"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Building 1 - Reduced size on mobile */}
      <motion.div
        variants={shapeVariants}
        className="absolute top-0 right-40 md:right-96 w-32 h-32 md:w-64 md:h-64"
        animate={{
          y: [-5, 5, -5],
          rotate: [-1, 1, -1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M100 20L180 70L100 120L20 70L100 20Z"
            fill={isDark ? "#4A90E2" : "#153969"}
            fillOpacity={isDark ? "0.2" : "0.1"}
            className="transition-all duration-700"
          />
          <path
            d="M100 120L180 70L180 170L100 220L100 120Z"
            fill={isDark ? "#4A90E2" : "#153969"}
            fillOpacity={isDark ? "0.25" : "0.15"}
            className="transition-all duration-700"
          />
          <path
            d="M100 120L100 220L20 170L20 70L100 120Z"
            fill={isDark ? "#4A90E2" : "#153969"}
            fillOpacity={isDark ? "0.3" : "0.2"}
            className="transition-all duration-700"
          />
          {/* Windows */}
          {[...Array(3)].map((_, i) => (
            <rect
              key={i}
              x={60 + i * 30}
              y={80}
              width="15"
              height="20"
              fill={isDark ? "#4A90E2" : "#153969"}
              fillOpacity={isDark ? "0.4" : "0.3"}
              className="transition-all duration-700"
            />
          ))}
        </svg>
      </motion.div>

      {/* Crane Structure - Hidden on small screens, visible on larger */}
      <motion.div
        variants={shapeVariants}
        className="absolute top-16 md:top-32 right-32 md:right-64 w-32 h-32 md:w-64 md:h-64 hidden sm:block"
        animate={{
          y: [0, 8, 0],
          rotate: [0, -2, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M100 50L120 60L120 160L100 150L100 50Z"
            fill={isDark ? "#6B7280" : "#1E4D2B"}
            fillOpacity={isDark ? "0.3" : "0.2"}
            className="transition-all duration-700"
          />
          <path
            d="M120 60L180 90L180 110L120 80L120 60Z"
            fill={isDark ? "#6B7280" : "#1E4D2B"}
            fillOpacity={isDark ? "0.25" : "0.15"}
            className="transition-all duration-700"
          />
          <path
            d="M100 50L160 30L180 90L120 60L100 50Z"
            fill={isDark ? "#6B7280" : "#1E4D2B"}
            fillOpacity={isDark ? "0.35" : "0.25"}
            className="transition-all duration-700"
          />
        </svg>
      </motion.div>

      {/* Construction Platform */}
      <motion.div
        variants={shapeVariants}
        className="absolute top-32 md:top-64 right-16 md:right-32 w-32 h-32 md:w-64 md:h-64"
        animate={{
          y: [3, -3, 3],
          x: [-3, 3, -3]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M40 80L160 80L180 100L20 100L40 80Z"
            fill={isDark ? "#6366F1" : "#4A90E2"}
            fillOpacity={isDark ? "0.3" : "0.15"}
            className="transition-all duration-700"
          />
          <path
            d="M60 100L140 100L140 140L60 140L60 100Z"
            fill={isDark ? "#6366F1" : "#4A90E2"}
            fillOpacity={isDark ? "0.35" : "0.2"}
            className="transition-all duration-700"
          />
          {/* Equipment */}
          <path
            d="M80 110L120 110L130 120L70 120L80 110Z"
            fill={isDark ? "#6366F1" : "#4A90E2"}
            fillOpacity={isDark ? "0.4" : "0.25"}
            className="transition-all duration-700"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const VisionMissionSection = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('vision'); // 'vision' or 'mission'
  
  // Text animation variants
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Split text into words for animation with proper typing
  const splitText = (text: unknown): ReactElement[] => {
    // Convert to string first
    const textString = asString(text);
    if (!textString) return []; // Guard against empty string
    
    return textString.split(' ').map((word: string, i: number) => (
      <motion.span
        key={i}
        variants={textVariants}
        className="inline-block mr-2"
      >
        {word}
      </motion.span>
    ));
  };

  // Get mission points from translations
  const missionPoints = [
    t('visionMission.missionPoint1'),
    t('visionMission.missionPoint2')
  ];

  return (
    <section className="relative min-h-screen flex items-center py-10 md:py-20 overflow-hidden">
      {/* Create a seamless gradient with smooth transition between theme modes */}
      <div className="absolute inset-0 transition-colors duration-700">
        {/* Main background gradient - note the transition-all for smooth theme change */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isDark 
            ? 'bg-gray-900' 
            : 'bg-[#f8fafc]'
        }`} />
        
        {/* Top gradient for visual interest */}
        <div className={`absolute top-0 left-0 right-0 h-64 transition-opacity duration-1000 ${
          isDark 
            ? 'bg-gradient-to-b from-blue-900/10 to-transparent' 
            : 'bg-gradient-to-b from-blue-50/50 to-transparent'
        }`} />
        
        {/* Bottom diagonal gradient that creates a smooth transition to services section */}
        <div className={`absolute bottom-0 left-0 right-0 h-2/5 transition-all duration-1000 ${
          isDark 
            ? 'bg-gradient-to-t from-[#111827] via-[#111827]/70 to-transparent' 
            : 'bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/70 to-transparent'
        }`} />
        
        {/* Diagonal gradient overlay with 45-degree angle */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-900/95 to-[#111827]/90 opacity-100' 
            : 'bg-gradient-to-br from-[#f8fafc] via-[#f8fafc]/95 to-[#f8fafc]/90 opacity-100'
        }`} />
        
        {/* Subtle radial gradients for depth */}
        <div className={`absolute top-1/4 left-1/4 w-full h-full transition-all duration-1000 ${
          isDark 
            ? 'bg-radial-gradient-dark' 
            : 'bg-radial-gradient-light'
        } opacity-40`} />
        
        {/* Very subtle noise texture overlay with transition */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] transition-opacity duration-1000"></div>
      </div>
      
      {/* Animated Isometric Elements */}
      <AnimatedIsometric />
      
      {/* Content Container */}
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div 
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-6 md:mb-10"
        >
          <motion.h2 
            className={`text-2xl md:text-3xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'} mb-3 md:mb-4`}
            variants={textContainerVariants}
          >
            {language === 'en' ? 'Vision & Mission' : 'Visi & Misi'}
          </motion.h2>
          <motion.div 
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full transition-all duration-700"
            variants={textVariants}
          />
        </motion.div>

        {/* Tab navigation for mobile */}
        <div className="flex justify-center mb-6 md:hidden">
          <div className={`flex rounded-lg transition-all duration-700 ${
            isDark 
              ? 'bg-gray-800/70 backdrop-blur-md' 
              : 'bg-white/70 backdrop-blur-md shadow-sm'
            } p-1`}
          >
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-500 ${
                activeTab === 'vision' 
                  ? isDark 
                    ? 'bg-[#153969] text-white'
                    : 'bg-[#153969] text-white' 
                  : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-[#153969]'
              }`}
            >
              {language === 'en' ? 'Vision' : 'Visi'}
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-500 ${
                activeTab === 'mission' 
                  ? isDark 
                    ? 'bg-[#153969] text-white'
                    : 'bg-[#153969] text-white' 
                  : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-[#153969]'
              }`}
            >
              {language === 'en' ? 'Mission' : 'Misi'}
            </button>
          </div>
        </div>

        {/* Vision & Mission Content */}
        <div className="space-y-6">
          {/* Vision Card - Always visible on desktop, conditionally on mobile */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`relative group transition-all duration-700 ${
              isDark 
                ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/70 shadow-lg' 
                : 'bg-white/60 backdrop-blur-xl border-blue-100/70 shadow-lg'
            } p-6 rounded-xl border ${
              activeTab !== 'vision' ? 'hidden md:block' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl transition-all duration-700 ${
                isDark ? 'bg-[#153969]/50 border-gray-600/50' : 'bg-blue-50/80 border-blue-100/80'
              } border`}>
                <EyeIcon className={`w-5 h-5 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
              </div>
              <motion.h3 
                variants={textVariants} 
                className={`text-xl md:text-2xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {language === 'en' ? 'Vision' : 'Visi'}
              </motion.h3>
            </div>
            <motion.p className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-sm md:text-base`}>
              {splitText(t('visionMission.visionText'))}
            </motion.p>
          </motion.div>

          {/* Mission Card - Always visible on desktop, conditionally on mobile */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`relative group transition-all duration-700 ${
              isDark 
                ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/70 shadow-lg' 
                : 'bg-white/60 backdrop-blur-xl border-blue-100/70 shadow-lg'
            } p-6 rounded-xl border ${
              activeTab !== 'mission' ? 'hidden md:block' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl transition-all duration-700 ${
                isDark ? 'bg-[#153969]/50 border-gray-600/50' : 'bg-blue-50/80 border-blue-100/80'
              } border`}>
                <BookmarkIcon className={`w-5 h-5 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
              </div>
              <motion.h3 
                variants={textVariants} 
                className={`text-xl md:text-2xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {language === 'en' ? 'Mission' : 'Misi'}
              </motion.h3>
            </div>
            <ul className="space-y-4">
              {missionPoints.map((mission, index) => (
                <motion.li
                  key={index}
                  variants={textVariants}
                  className="flex gap-3"
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full transition-all duration-700 ${
                    isDark ? 'bg-[#153969]/50 border-gray-600/50' : 'bg-blue-50/80 border-blue-100/80'
                  } border flex items-center justify-center mt-1`}>
                    <CheckIcon className={`w-3 h-3 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
                  </div>
                  <p className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-sm md:text-base`}>
                    {splitText(mission)}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* CSS for gradient and texture effects */}
      <style jsx global>{`
        .bg-radial-gradient-light {
          background: radial-gradient(circle at center, rgba(219, 234, 254, 0.3) 0%, rgba(248, 250, 252, 0) 70%);
        }
        
        .bg-radial-gradient-dark {
          background: radial-gradient(circle at center, rgba(30, 58, 138, 0.1) 0%, rgba(17, 24, 39, 0) 70%);
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
};

export default VisionMissionSection;