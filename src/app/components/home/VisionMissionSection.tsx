import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, BookmarkIcon, CheckIcon } from 'lucide-react';

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

  return (
    <motion.div 
      className="absolute -right-48 top-1/2 -translate-y-1/2 w-[600px] h-[600px]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Building 1 */}
      <motion.div
        variants={shapeVariants}
        className="absolute top-0 right-96 w-64 h-64"
        animate={{
          y: [-10, 10, -10],
          rotate: [-2, 2, -2]
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

      {/* Crane Structure */}
      <motion.div
        variants={shapeVariants}
        className="absolute top-32 right-64 w-64 h-64"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0]
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
        className="absolute top-64 right-32 w-64 h-64"
        animate={{
          y: [5, -5, 5],
          x: [-5, 5, -5]
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
    <section className="relative bg-white py-24 overflow-hidden min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50" />
      
      {/* Animated Isometric Elements */}
      <AnimatedIsometric />
      
      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl font-bold text-gray-900 mb-6"
            variants={textContainerVariants}
          >
            {splitText("Visi & Misi Perusahaan")}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"
            variants={textVariants}
          />
        </motion.div>

        {/* Vision & Mission Content */}
        <div className="space-y-8">
          {/* Vision Card */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative group bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-blue-100 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <EyeIcon className="w-6 h-6 text-blue-500" />
              </div>
              <motion.h3 variants={textVariants} className="text-3xl font-bold text-gray-900">
                Visi
              </motion.h3>
            </div>
            <motion.p className="text-gray-600 leading-relaxed text-lg">
              {splitText("Menjadi perusahaan terpercaya dan terdepan dalam layanan General Contractor, Dump Truck, dan Heavy Equipment, dengan menghadirkan solusi pembangunan yang inovatif, berkualitas tinggi, dan berkelanjutan.")}
            </motion.p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative group bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-blue-100 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <BookmarkIcon className="w-6 h-6 text-blue-500" />
              </div>
              <motion.h3 variants={textVariants} className="text-3xl font-bold text-gray-900">
                Misi
              </motion.h3>
            </div>
            <ul className="space-y-6">
              {[
                "Memberikan Layanan Berkualitas Tinggi Menyediakan layanan konstruksi, pengangkutan, dan alat berat yang memenuhi standar keselamatan, efisiensi, dan kepuasan pelanggan.",
                "Meningkatkan Kompetensi dan Inovasi Mengadopsi teknologi terkini dan memberdayakan sumber daya manusia profesional untuk menciptakan solusi pembangunan yang efektif dan modern."
              ].map((mission, index) => (
                <motion.li
                  key={index}
                  variants={textVariants}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-1">
                    <CheckIcon className="w-3 h-3 text-blue-500" />
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
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