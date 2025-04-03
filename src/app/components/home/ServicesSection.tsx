'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

// Utility function to safely get string from translation
function asString(value: any): string {
  if (value === null || value === undefined) return '';
  return String(value);
}

// Define category type
type ServiceCategory = 'buildings' | 'infrastructure' | 'landDevelopment' | 'special';

// Define service category interface
interface ServiceCategoryItem {
  id: ServiceCategory;
  icon: string;
}

const ServiceSection: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<ServiceCategory>('buildings');
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  // Define service categories
  const serviceCategories: ServiceCategoryItem[] = [
    { id: 'buildings', icon: '/icons/building.svg' },
    { id: 'infrastructure', icon: '/icons/infrastructure.svg' },
    { id: 'landDevelopment', icon: '/icons/land.svg' },
    { id: 'special', icon: '/icons/special.svg' }
  ];

  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className={`text-sm md:text-base font-bold tracking-wider ${isDark ? 'text-blue-400' : 'text-[#153969]'} mb-3 transition-colors duration-300`}>
            {asString(t('services.sectionTitle'))}
          </h2>
          <h3 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
            {asString(t('services.sectionSubtitle'))}
          </h3>
          <div className="w-16 h-1 bg-[#153969] mx-auto"></div>
        </motion.div>
        
        {/* Service Categories Tabs */}
        <div className="flex flex-wrap justify-center mb-10 md:mb-16 gap-2 md:gap-4">
          {serviceCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex flex-col items-center px-4 py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === category.id
                  ? `${isDark ? 'bg-[#153969]/80 text-white' : 'bg-[#153969] text-white'}`
                  : `${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
              }`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src={category.icon} 
                alt={asString(t(`services.${category.id}.title`))} 
                width={32} 
                height={32} 
                className={`mb-2 ${activeTab === category.id ? 'brightness-0 invert' : isDark ? 'brightness-0 invert-[0.7]' : ''}`}
              />
              <span>{asString(t(`services.${category.id}.title`))}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Active Service Description */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
            {asString(t(`services.${activeTab}.description`))}
          </p>
        </motion.div>
        
        {/* Featured Projects */}
        <div className="mb-12">
          <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-[#153969]'} mb-8 text-center transition-colors duration-300`}>
            {asString(t('services.featuredProjects'))}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Project 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0 }
                }
              }}
              className={`rounded-lg overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}
            >
              <div className="relative h-56 md:h-64">
                <Image
                  src={`/images/services/${activeTab}1.jpg`}
                  alt={asString(t(`services.${activeTab}.project1.title`))}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className={`text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#153969]'} transition-colors duration-300`}>
                  {asString(t(`services.${activeTab}.project1.title`))}
                </h4>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  {asString(t(`services.${activeTab}.project1.description`))}
                </p>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.2 }
                }
              }}
              className={`rounded-lg overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}
            >
              <div className="relative h-56 md:h-64">
                <Image
                  src={`/images/services/${activeTab}2.jpg`}
                  alt={asString(t(`services.${activeTab}.project2.title`))}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className={`text-lg md:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#153969]'} transition-colors duration-300`}>
                  {asString(t(`services.${activeTab}.project2.title`))}
                </h4>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  {asString(t(`services.${activeTab}.project2.description`))}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <Link 
            href="/contact"
            className={`inline-flex items-center px-6 py-3 rounded-md font-medium ${
              isDark 
                ? 'bg-[#153969]/80 hover:bg-[#153969] text-white' 
                : 'bg-[#153969] hover:bg-[#0f2a4d] text-white'
            } transition-colors duration-300 shadow-md`}
          >
            {asString(t('services.consultButton'))}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;