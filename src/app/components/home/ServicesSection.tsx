'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Building2, Hammer, Factory, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

// Helper function to convert translation value to string
const asString = (value: any): string => {
  if (value === null || value === undefined) return '';
  return String(value);
};

// Definisikan tipe untuk project
interface Project {
  title: string;
  description: string;
}

// Definisikan tipe untuk service
interface Service {
  id: string;
  titleKey: string;
  icon: React.ElementType;
  image: string;
  descriptionKey: string;
  projectsKeys: string[];
}

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Services data using translation keys
  const services: Service[] = [
    {
      id: 'buildings',
      titleKey: 'services.buildings.title',
      icon: Building2,
      image: '/images/servicesection-1.jpg',
      descriptionKey: 'services.buildings.description',
      projectsKeys: ['services.buildings.project1', 'services.buildings.project2']
    },
    {
      id: 'infrastructure',
      titleKey: 'services.infrastructure.title',
      icon: Hammer,
      image: '/images/servicesection-2.jpg',
      descriptionKey: 'services.infrastructure.description',
      projectsKeys: ['services.infrastructure.project1', 'services.infrastructure.project2']
    },
    {
      id: 'land-development',
      titleKey: 'services.landDevelopment.title',
      icon: Factory,
      image: '/images/servicesection-3.jpg',
      descriptionKey: 'services.landDevelopment.description',
      projectsKeys: ['services.landDevelopment.project1', 'services.landDevelopment.project2']
    },
    {
      id: 'special',
      titleKey: 'services.special.title',
      icon: Settings,
      image: '/images/servicesection-4.jpg',
      descriptionKey: 'services.special.description',
      projectsKeys: ['services.special.project1', 'services.special.project2']
    }
  ];

  const [activeService, setActiveService] = useState<Service>(services[0]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleNextService = () => {
    const newIndex = (activeIndex + 1) % services.length;
    setActiveIndex(newIndex);
    setActiveService(services[newIndex]);
  };

  const handlePrevService = () => {
    const newIndex = (activeIndex - 1 + services.length) % services.length;
    setActiveIndex(newIndex);
    setActiveService(services[newIndex]);
  };

  // Function to handle scrolling tabs into view on mobile
  const scrollTabIntoView = (index: number) => {
    if (scrollRef.current) {
      const tabElements = scrollRef.current.children[0].children;
      if (tabElements && tabElements.length > index) {
        const tabElement = tabElements[index] as HTMLElement;
        if (tabElement) {
          tabElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    }
  };

  const selectService = (service: Service, index: number) => {
    setActiveService(service);
    setActiveIndex(index);
    scrollTabIntoView(index);
  };

  // Get translated project data for the active service
  const getTranslatedProjects = (): Project[] => {
    return activeService.projectsKeys.map(key => {
      // Split key into title and description keys
      const baseKey = key;
      const titleKey = `${baseKey}.title`;
      const descriptionKey = `${baseKey}.description`;
      
      return {
        title: asString(t(titleKey)),
        description: asString(t(descriptionKey))
      };
    });
  };

  const projects = getTranslatedProjects();
  
  // Pre-convert text values that we need
  const sectionTitle = asString(t('services.sectionTitle'));
  const sectionSubtitle = asString(t('services.sectionSubtitle'));
  const featuredProjectsTitle = asString(t('services.featuredProjects'));
  const consultButtonText = asString(t('services.consultButton'));
  
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
        
        {/* Bottom diagonal gradient that creates a smooth transition to next section */}
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-xs md:text-sm font-semibold transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-[#153969]'} tracking-wider uppercase mb-2 md:mb-3`}
          >
            {sectionTitle}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-2xl md:text-4xl lg:text-5xl font-bold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'} mb-4 md:mb-6`}
          >
            {sectionSubtitle}
          </motion.h3>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button 
            onClick={handlePrevService}
            className={`p-2 rounded-full transition-all duration-500 ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700/80' 
                : 'bg-white/90 border-gray-100/80'
            } shadow-md border`}
          >
            <ChevronLeft className={`w-5 h-5 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
          </button>
          <span className={`text-sm font-medium transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {asString(t(activeService.titleKey))}
          </span>
          <button 
            onClick={handleNextService}
            className={`p-2 rounded-full transition-all duration-500 ${
              isDark 
                ? 'bg-gray-800/90 border-gray-700/80' 
                : 'bg-white/90 border-gray-100/80'
            } shadow-md border`}
          >
            <ChevronRight className={`w-5 h-5 transition-colors duration-700 ${isDark ? 'text-blue-400' : 'text-[#153969]'}`} />
          </button>
        </div>

        {/* Service Navigation - Desktop */}
        <div className="hidden md:flex justify-center mb-12 overflow-x-auto">
          <div className="flex space-x-8">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => selectService(service, index)}
                className="group relative px-4 py-2"
              >
                <span className={`text-lg font-medium transition-colors duration-500 whitespace-nowrap ${
                  activeService.id === service.id 
                    ? isDark ? 'text-blue-400' : 'text-[#153969]' 
                    : isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-[#153969]'
                }`}>
                  {asString(t(service.titleKey))}
                </span>
                {activeService.id === service.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-700 ${isDark ? 'bg-blue-400' : 'bg-[#153969]'}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Service Navigation - Mobile Tabs */}
        <div className="flex md:hidden mb-6 overflow-x-auto hide-scrollbar" ref={scrollRef}>
          <div className="flex space-x-3 w-full">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => selectService(service, index)}
                  className={`flex-shrink-0 px-3 py-2 rounded-full transition-all duration-500 ${
                    activeService.id === service.id 
                      ? isDark ? 'bg-[#153969] text-white' : 'bg-[#153969] text-white'
                      : isDark ? 'bg-gray-800/80 border-gray-700/80 text-gray-300' : 'bg-white/80 border-gray-200/80 text-gray-700'
                  } ${isDark ? 'border-gray-700/80' : 'border'} shadow-md backdrop-blur-sm`}
                >
                  <div className="flex items-center space-x-2">
                    <ServiceIcon className="w-4 h-4 transition-colors duration-500" />
                    <span className="text-xs font-medium whitespace-nowrap transition-colors duration-500">
                      {asString(t(service.titleKey))}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-12 gap-6 md:gap-12 items-start"
          >
            {/* Image Section */}
            <div className="lg:col-span-7 relative h-[300px] md:h-[450px] lg:h-[600px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
              <motion.div
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeService.image}
                  alt={asString(t(activeService.titleKey))}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </motion.div>
              {/* Service Info Overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                  <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-white/10 backdrop-blur">
                    {React.createElement(activeService.icon, { className: "w-4 h-4 md:w-6 md:h-6 text-white" })}
                  </div>
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    {asString(t(activeService.titleKey))}
                  </h4>
                </div>
                <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl line-clamp-2 md:line-clamp-none">
                  {asString(t(activeService.descriptionKey))}
                </p>
              </motion.div>
            </div>

            {/* Projects List */}
            <div className="lg:col-span-5 space-y-4 md:space-y-6">
              <h5 className={`text-lg md:text-xl font-semibold transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'} mb-4 md:mb-8`}>
                {featuredProjectsTitle}
              </h5>
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`group p-4 md:p-6 rounded-lg md:rounded-xl transition-all duration-500 ${
                    isDark 
                      ? 'bg-gray-800/60 backdrop-blur-xl border-gray-700/70 hover:border-blue-500/70 shadow-lg' 
                      : 'bg-white/60 backdrop-blur-xl border-gray-200/70 hover:border-[#153969]/70 shadow-lg'
                  } border hover:shadow-xl`}
                >
                  <h6 className={`text-base md:text-lg font-semibold transition-colors duration-500 ${
                    isDark 
                      ? 'text-white group-hover:text-blue-400' 
                      : 'text-gray-900 group-hover:text-[#153969]'
                  } mb-1 md:mb-2`}>
                    {project.title}
                  </h6>
                  <p className={`text-sm md:text-base transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {project.description}
                  </p>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-6 md:mt-8 w-full ${
                  isDark 
                    ? 'bg-[#153969] hover:bg-[#1e4d8d] hover:shadow-[#153969]/20' 
                    : 'bg-[#153969] hover:bg-[#1e4d8d] hover:shadow-[#153969]/20'
                } text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl transition-all duration-500 shadow-md md:shadow-lg text-sm md:text-base`}
              >
                {consultButtonText}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
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
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;