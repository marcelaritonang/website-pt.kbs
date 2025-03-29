'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Building2, Hammer, Factory, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

// Definisikan tipe untuk project
interface Project {
  title: string;
  description: string;
}

// Definisikan tipe untuk service
interface Service {
  id: string;
  title: string;
  icon: React.ElementType;
  image: string;
  description: string;
  projects: Project[];
}

const services: Service[] = [
  {
    id: 'buildings',
    title: 'Gedung & Properti',
    icon: Building2,
    image: '/images/servicesection-1.jpg',
    description: 'Pembangunan dan renovasi gedung komersial dan residensial dengan standar kualitas tinggi',
    projects: [
      {
        title: 'Pembangunan Condotel HAPPER Ciawi Tower A, B, C',
        description: 'Pengembangan properti hunian modern dengan fasilitas lengkap'
      },
      {
        title: 'KERATON AT THE PLAZA RESIDENCE',
        description: 'Pekerjaan renovasi lantai 6 dengan standar premium'
      }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Infrastruktur Sipil',
    icon: Hammer,
    image: '/images/servicesection-2.jpg',
    description: 'Pengembangan dan rehabilitasi infrastruktur untuk menunjang kebutuhan masyarakat',
    projects: [
      {
        title: 'Rehabilitasi Jalan dan Jembatan',
        description: 'Ruas Cipanas – Warung Banten, peningkatan kualitas infrastruktur'
      },
      {
        title: 'Saluran Drainase & Pematangan Lahan',
        description: 'Pengembangan sistem drainase dan persiapan lahan konstruksi'
      }
    ]
  },
  {
    id: 'land-development',
    title: 'Pengembangan Lahan',
    icon: Factory,
    image: '/images/servicesection-3.jpg',
    description: 'Pematangan dan pengembangan lahan untuk berbagai kebutuhan proyek',
    projects: [
      {
        title: 'Pekerjaan Cut & Fill',
        description: 'Penyesuaian kontur tanah dan persiapan lahan pembangunan'
      },
      {
        title: 'Pekerjaan Timbunan Perumahan Alam Sutera I',
        description: 'Pengembangan kawasan residensial premium'
      }
    ]
  },
  {
    id: 'special',
    title: 'Proyek Khusus',
    icon: Settings,
    image: '/images/servicesection-4.jpg',
    description: 'Penanganan proyek-proyek dengan spesifikasi dan kebutuhan khusus',
    projects: [
      {
        title: 'Interior & Furniture Club House',
        description: 'Pengerjaan interior dan furnishing untuk Zora BSD City'
      },
      {
        title: 'Pekerjaan Reflected Pond Lobby',
        description: 'Konstruksi fitur air arsitektural di Grand Hyatt'
      }
    ]
  }
];

const ServicesSection: React.FC = () => {
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

  return (
    <section className="min-h-screen bg-[#f8fafc] py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm font-semibold text-[#153969] tracking-wider uppercase mb-2 md:mb-3"
          >
            LAYANAN KAMI
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
          >
            Membangun dengan Visi dan Kualitas
          </motion.h3>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button 
            onClick={handlePrevService}
            className="p-2 rounded-full bg-white shadow-md border border-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-[#153969]" />
          </button>
          <span className="text-sm font-medium text-gray-600">
            {activeService.title}
          </span>
          <button 
            onClick={handleNextService}
            className="p-2 rounded-full bg-white shadow-md border border-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-[#153969]" />
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
                <span className={`text-lg font-medium transition-colors whitespace-nowrap ${
                  activeService.id === service.id 
                    ? 'text-[#153969]' 
                    : 'text-gray-500 group-hover:text-[#153969]'
                }`}>
                  {service.title}
                </span>
                {activeService.id === service.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#153969]"
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
                  className={`flex-shrink-0 px-3 py-2 rounded-full ${
                    activeService.id === service.id 
                      ? 'bg-[#153969] text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <ServiceIcon className="w-4 h-4" />
                    <span className="text-xs font-medium whitespace-nowrap">
                      {service.title}
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
            <div className="lg:col-span-7 relative h-[300px] md:h-[450px] lg:h-[600px] rounded-xl md:rounded-2xl overflow-hidden">
              <motion.div
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeService.image}
                  alt={activeService.title}
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
                    {activeService.title}
                  </h4>
                </div>
                <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl line-clamp-2 md:line-clamp-none">
                  {activeService.description}
                </p>
              </motion.div>
            </div>

            {/* Projects List */}
            <div className="lg:col-span-5 space-y-4 md:space-y-6">
              <h5 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-8">
                Proyek Unggulan
              </h5>
              {activeService.projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group p-4 md:p-6 rounded-lg md:rounded-xl bg-white border border-gray-200 hover:border-[#153969] transition-all duration-300 hover:shadow-lg"
                >
                  <h6 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 group-hover:text-[#153969] transition-colors">
                    {project.title}
                  </h6>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 md:mt-8 w-full bg-[#153969] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-[#1e4d8d] transition-all duration-300 shadow-md md:shadow-lg hover:shadow-[#153969]/20 text-sm md:text-base"
              >
                Konsultasikan Proyek Anda
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
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