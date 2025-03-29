import React, { ReactElement, useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, BookmarkIcon, CheckIcon, MenuIcon, XIcon } from 'lucide-react';

const AnimatedIsometric = () => {
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
            fill="#153969"
            fillOpacity="0.1"
          />
          <path
            d="M100 120L180 70L180 170L100 220L100 120Z"
            fill="#153969"
            fillOpacity="0.15"
          />
          <path
            d="M100 120L100 220L20 170L20 70L100 120Z"
            fill="#153969"
            fillOpacity="0.2"
          />
          {/* Windows */}
          {[...Array(3)].map((_, i) => (
            <rect
              key={i}
              x={60 + i * 30}
              y={80}
              width="15"
              height="20"
              fill="#153969"
              fillOpacity="0.3"
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
            fill="#1E4D2B"
            fillOpacity="0.2"
          />
          <path
            d="M120 60L180 90L180 110L120 80L120 60Z"
            fill="#1E4D2B"
            fillOpacity="0.15"
          />
          <path
            d="M100 50L160 30L180 90L120 60L100 50Z"
            fill="#1E4D2B"
            fillOpacity="0.25"
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
            fill="#4A90E2"
            fillOpacity="0.15"
          />
          <path
            d="M60 100L140 100L140 140L60 140L60 100Z"
            fill="#4A90E2"
            fillOpacity="0.2"
          />
          {/* Equipment */}
          <path
            d="M80 110L120 110L130 120L70 120L80 110Z"
            fill="#4A90E2"
            fillOpacity="0.25"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const VisionMissionSection = () => {
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
  const splitText = (text: string): ReactElement[] => {
    return text.split(' ').map((word: string, i: number) => (
      <motion.span
        key={i}
        variants={textVariants}
        className="inline-block mr-2"
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <section className="relative bg-white py-6 md:py-8 overflow-hidden min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50" />
      
      {/* Animated Isometric Elements */}
      <AnimatedIsometric />
      
      {/* Content Container */}
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-4 md:mb-6"
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4"
            variants={textContainerVariants}
          >
            {splitText("Visi & Misi Perusahaan")}
          </motion.h2>
          <motion.div 
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"
            variants={textVariants}
          />
        </motion.div>

        {/* Tab navigation for mobile */}
        <div className="flex justify-center mb-4 md:hidden">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                activeTab === 'vision' 
                  ? 'bg-white shadow text-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              Visi
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                activeTab === 'mission' 
                  ? 'bg-white shadow text-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              Misi
            </button>
          </div>
        </div>

        {/* Vision & Mission Content */}
        <div className="space-y-4">
          {/* Vision Card - Always visible on desktop, conditionally on mobile */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`relative group bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-blue-100 shadow-xl ${
              activeTab !== 'vision' ? 'hidden md:block' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                <EyeIcon className="w-5 h-5 text-blue-500" />
              </div>
              <motion.h3 variants={textVariants} className="text-xl md:text-2xl font-bold text-gray-900">
                Visi
              </motion.h3>
            </div>
            <motion.p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {splitText("Menjadi perusahaan terpercaya dan terdepan dalam layanan General Contractor, Dump Truck, dan Heavy Equipment, dengan menghadirkan solusi pembangunan yang inovatif, berkualitas tinggi, dan berkelanjutan.")}
            </motion.p>
          </motion.div>

          {/* Mission Card - Always visible on desktop, conditionally on mobile */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`relative group bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-blue-100 shadow-xl ${
              activeTab !== 'mission' ? 'hidden md:block' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                <BookmarkIcon className="w-5 h-5 text-blue-500" />
              </div>
              <motion.h3 variants={textVariants} className="text-xl md:text-2xl font-bold text-gray-900">
                Misi
              </motion.h3>
            </div>
            <ul className="space-y-3">
              {[
                "Memberikan Layanan Berkualitas Tinggi Menyediakan layanan konstruksi, pengangkutan, dan alat berat yang memenuhi standar keselamatan, efisiensi, dan kepuasan pelanggan.",
                "Meningkatkan Kompetensi dan Inovasi Mengadopsi teknologi terkini dan memberdayakan sumber daya manusia profesional untuk menciptakan solusi pembangunan yang efektif dan modern."
              ].map((mission, index) => (
                <motion.li
                  key={index}
                  variants={textVariants}
                  className="flex gap-2 md:gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-1">
                    <CheckIcon className="w-3 h-3 text-blue-500" />
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {splitText(mission)}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;