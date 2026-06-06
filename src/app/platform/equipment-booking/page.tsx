'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Star, Search, Phone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function EquipmentBookingPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: language === 'id' ? 'Semua' : 'All' },
    { id: 'excavator', name: 'Excavator' },
    { id: 'dump-truck', name: 'Dump Truck' },
    { id: 'crane', name: 'Crane' },
    { id: 'bulldozer', name: 'Bulldozer' },
    { id: 'roller', name: 'Roller' },
  ];

  const equipment = [
    {
      id: 1,
      name: 'Excavator CAT 320D',
      category: 'excavator',
      image: '/images/equipment/excavator-1.jpg',
      price: 2500000,
      unit: language === 'id' ? '/hari' : '/day',
      rating: 4.8,
      reviews: 24,
      available: true,
      specs: { weight: '20 ton', capacity: '0.9 m³', reach: '9.9 m' },
      location: 'Jakarta Timur'
    },
    {
      id: 2,
      name: 'Dump Truck Hino 500',
      category: 'dump-truck',
      image: '/images/equipment/dump-truck-1.jpg',
      price: 1800000,
      unit: language === 'id' ? '/hari' : '/day',
      rating: 4.6,
      reviews: 38,
      available: true,
      specs: { weight: '15 ton', capacity: '10 m³', engine: '260 HP' },
      location: 'Bekasi'
    },
    {
      id: 3,
      name: 'Mobile Crane 25 Ton',
      category: 'crane',
      image: '/images/equipment/crane-1.jpg',
      price: 5500000,
      unit: language === 'id' ? '/hari' : '/day',
      rating: 4.9,
      reviews: 15,
      available: true,
      specs: { capacity: '25 ton', boom: '33 m', type: 'Hydraulic' },
      location: 'Tangerang'
    },
    {
      id: 4,
      name: 'Bulldozer Komatsu D65',
      category: 'bulldozer',
      image: '/images/equipment/bulldozer-1.jpg',
      price: 3200000,
      unit: language === 'id' ? '/hari' : '/day',
      rating: 4.7,
      reviews: 19,
      available: false,
      specs: { weight: '17.5 ton', blade: '3.9 m', engine: '205 HP' },
      location: 'Bogor'
    },
    {
      id: 5,
      name: 'Vibro Roller Bomag',
      category: 'roller',
      image: '/images/equipment/roller-1.jpg',
      price: 1500000,
      unit: language === 'id' ? '/hari' : '/day',
      rating: 4.5,
      reviews: 12,
      available: true,
      specs: { weight: '12 ton', width: '2.1 m', type: 'Tandem' },
      location: 'Depok'
    },
    {
      id: 6,
      name: 'Excavator Komatsu PC200',
      category: 'excavator',
      image: '/images/equipment/excavator-2.jpg',
      price: 2800000,
      unit: language === 'id' ? '/hari' : '/day',
      rating: 4.8,
      reviews: 31,
      available: true,
      specs: { weight: '22 ton', capacity: '1.0 m³', reach: '10.2 m' },
      location: 'Jakarta Selatan'
    },
  ];

  const filteredEquipment = equipment.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#153969] to-[#0a1f3d]"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'id' ? 'Sewa Alat Berat Online' : 'Online Heavy Equipment Rental'}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              {language === 'id'
                ? 'Pilih dan booking alat berat untuk proyek Anda. Tersedia berbagai jenis alat dengan harga transparan.'
                : 'Choose and book heavy equipment for your project. Various types available with transparent pricing.'
              }
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'id' ? 'Cari alat berat...' : 'Search equipment...'}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 shadow-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter & Content */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-[#153969] text-white'
                  : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {language === 'id'
            ? `Menampilkan ${filteredEquipment.length} alat berat`
            : `Showing ${filteredEquipment.length} equipment`
          }
        </p>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`rounded-2xl overflow-hidden border transition hover:shadow-lg ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Truck className={`w-16 h-16 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                {/* Availability Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                  item.available
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {item.available
                    ? (language === 'id' ? 'Tersedia' : 'Available')
                    : (language === 'id' ? 'Disewa' : 'Rented')
                  }
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.name}
                </h3>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.rating}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      ({item.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Specs */}
                <div className={`flex flex-wrap gap-2 mb-4`}>
                  {Object.entries(item.specs).map(([key, value]) => (
                    <span key={key} className={`px-2 py-1 rounded text-xs ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {value}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <span className={`text-xl font-bold text-[#153969]`}>
                      {formatPrice(item.price)}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.unit}
                    </span>
                  </div>
                  <button
                    disabled={!item.available}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      item.available
                        ? 'bg-[#153969] text-white hover:bg-[#1e4d8a]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {item.available
                      ? (language === 'id' ? 'Booking' : 'Book Now')
                      : (language === 'id' ? 'Tidak Tersedia' : 'Unavailable')
                    }
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`mt-12 p-8 rounded-2xl text-center ${isDark ? 'bg-gray-800' : 'bg-[#153969]/5'}`}>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'id' ? 'Butuh alat berat yang tidak ada di daftar?' : 'Need equipment not on the list?'}
          </h3>
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'id'
              ? 'Hubungi tim kami untuk request khusus dan penawaran terbaik.'
              : 'Contact our team for special requests and best offers.'
            }
          </p>
          <a
            href="https://wa.me/6281218127503"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#153969] text-white rounded-lg font-medium hover:bg-[#1e4d8a] transition"
          >
            <Phone className="w-4 h-4" />
            {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
          </a>
        </div>
      </section>
    </div>
  );
}
