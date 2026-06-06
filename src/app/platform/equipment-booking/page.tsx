'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Search, Phone, Calendar, X, Loader2, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface Equipment {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  available: boolean;
  specs: Record<string, string>;
  location: string;
}

export default function EquipmentBookingPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [bookingDates, setBookingDates] = useState({ start: '', end: '' });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const categories = [
    { id: 'all', name: language === 'id' ? 'Semua' : 'All' },
    { id: 'excavator', name: 'Excavator' },
    { id: 'dump-truck', name: 'Dump Truck' },
    { id: 'crane', name: 'Crane' },
    { id: 'bulldozer', name: 'Bulldozer' },
    { id: 'roller', name: 'Roller' },
  ];

  const equipment: Equipment[] = [
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

  const calculateDays = () => {
    if (!bookingDates.start || !bookingDates.end) return 0;
    const start = new Date(bookingDates.start);
    const end = new Date(bookingDates.end);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const handleBooking = async () => {
    const token = localStorage.getItem('kbs_token');
    if (!token) {
      router.push('/platform/login/');
      return;
    }

    if (!bookingDates.start || !bookingDates.end) {
      setBookingError(language === 'id' ? 'Pilih tanggal mulai dan selesai' : 'Select start and end date');
      return;
    }

    setBookingLoading(true);
    setBookingError('');

    try {
      const res = await fetch('/api/equipment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          equipment_id: selectedEquipment?.id,
          start_date: bookingDates.start,
          end_date: bookingDates.end,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setBookingError(data.error || 'Booking gagal');
        return;
      }

      setBookingSuccess(true);
      setTimeout(() => {
        setSelectedEquipment(null);
        setBookingSuccess(false);
        setBookingDates({ start: '', end: '' });
      }, 3000);

    } catch {
      setBookingError(language === 'id' ? 'Gagal terhubung ke server' : 'Connection failed');
    } finally {
      setBookingLoading(false);
    }
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
              className={`group rounded-2xl overflow-hidden border transition hover:shadow-lg ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
                    onClick={() => { setSelectedEquipment(item); setBookingError(''); setBookingSuccess(false); }}
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

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedEquipment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEquipment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className={`w-full max-w-md rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              {bookingSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'id' ? 'Booking Berhasil!' : 'Booking Successful!'}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'id'
                      ? 'Tim kami akan menghubungi Anda untuk konfirmasi.'
                      : 'Our team will contact you for confirmation.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'id' ? 'Booking Alat Berat' : 'Book Equipment'}
                    </h3>
                    <button onClick={() => setSelectedEquipment(null)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Equipment Info */}
                  <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={selectedEquipment.image} alt={selectedEquipment.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedEquipment.name}</p>
                        <p className="text-[#153969] font-semibold">{formatPrice(selectedEquipment.price)}{selectedEquipment.unit}</p>
                      </div>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Calendar className="inline w-4 h-4 mr-1" />
                        {language === 'id' ? 'Tanggal Mulai' : 'Start Date'}
                      </label>
                      <input
                        type="date"
                        value={bookingDates.start}
                        onChange={e => setBookingDates({ ...bookingDates, start: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-[#153969] ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Calendar className="inline w-4 h-4 mr-1" />
                        {language === 'id' ? 'Tanggal Selesai' : 'End Date'}
                      </label>
                      <input
                        type="date"
                        value={bookingDates.end}
                        onChange={e => setBookingDates({ ...bookingDates, end: e.target.value })}
                        min={bookingDates.start || new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-[#153969] ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Total Price */}
                  {calculateDays() > 0 && (
                    <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {calculateDays()} {language === 'id' ? 'hari' : 'days'} × {formatPrice(selectedEquipment.price)}
                        </span>
                        <span className="text-lg font-bold text-[#153969]">
                          {formatPrice(calculateDays() * selectedEquipment.price)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {bookingError && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                      {bookingError}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleBooking}
                    disabled={bookingLoading}
                    className="w-full py-3 bg-[#153969] text-white rounded-lg font-medium hover:bg-[#1e4d8a] transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {bookingLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {language === 'id' ? 'Memproses...' : 'Processing...'}
                      </>
                    ) : (
                      language === 'id' ? 'Konfirmasi Booking' : 'Confirm Booking'
                    )}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
