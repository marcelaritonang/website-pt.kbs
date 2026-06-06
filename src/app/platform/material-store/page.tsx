'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Star, Minus, Plus, Truck, Shield, CreditCard, Package } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function MaterialStorePage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{id: number, qty: number}[]>([]);

  const categories = [
    { id: 'all', name: language === 'id' ? 'Semua' : 'All' },
    { id: 'semen', name: language === 'id' ? 'Semen' : 'Cement' },
    { id: 'besi', name: language === 'id' ? 'Besi' : 'Steel' },
    { id: 'pasir', name: language === 'id' ? 'Pasir & Batu' : 'Sand & Gravel' },
    { id: 'kayu', name: language === 'id' ? 'Kayu' : 'Wood' },
    { id: 'cat', name: language === 'id' ? 'Cat' : 'Paint' },
  ];

  const materials = [
    {
      id: 1,
      name: 'Semen Portland Tipe I (50kg)',
      category: 'semen',
      brand: 'Tiga Roda',
      price: 72000,
      unit: language === 'id' ? '/sak' : '/bag',
      rating: 4.8,
      sold: 1240,
      stock: 500,
      image: '/images/materials/semen-1.jpg'
    },
    {
      id: 2,
      name: 'Besi Beton Polos 10mm (12m)',
      category: 'besi',
      brand: 'Krakatau Steel',
      price: 95000,
      unit: language === 'id' ? '/batang' : '/bar',
      rating: 4.7,
      sold: 890,
      stock: 350,
      image: '/images/materials/besi-1.jpg'
    },
    {
      id: 3,
      name: 'Pasir Bangka Halus',
      category: 'pasir',
      brand: 'Supplier Lokal',
      price: 450000,
      unit: '/m³',
      rating: 4.5,
      sold: 560,
      stock: 200,
      image: '/images/materials/pasir-1.jpg'
    },
    {
      id: 4,
      name: 'Kayu Meranti 6x12 (4m)',
      category: 'kayu',
      brand: 'Borneo Wood',
      price: 185000,
      unit: language === 'id' ? '/batang' : '/piece',
      rating: 4.6,
      sold: 320,
      stock: 150,
      image: '/images/materials/kayu-1.jpg'
    },
    {
      id: 5,
      name: 'Cat Tembok Interior (5kg)',
      category: 'cat',
      brand: 'Dulux',
      price: 165000,
      unit: language === 'id' ? '/pail' : '/pail',
      rating: 4.9,
      sold: 780,
      stock: 400,
      image: '/images/materials/cat-1.jpg'
    },
    {
      id: 6,
      name: 'Semen PCC (40kg)',
      category: 'semen',
      brand: 'Holcim',
      price: 62000,
      unit: language === 'id' ? '/sak' : '/bag',
      rating: 4.7,
      sold: 950,
      stock: 600,
      image: '/images/materials/semen-2.jpg'
    },
    {
      id: 7,
      name: 'Batu Split 2-3cm',
      category: 'pasir',
      brand: 'Supplier Lokal',
      price: 380000,
      unit: '/m³',
      rating: 4.4,
      sold: 430,
      stock: 100,
      image: '/images/materials/batu-1.jpg'
    },
    {
      id: 8,
      name: 'Besi Wiremesh M8 (2.1x5.4m)',
      category: 'besi',
      brand: 'Gunung Garuda',
      price: 320000,
      unit: language === 'id' ? '/lembar' : '/sheet',
      rating: 4.8,
      sold: 210,
      stock: 80,
      image: '/images/materials/besi-2.jpg'
    },
  ];

  const filteredMaterials = materials.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const getCartQty = (id: number) => {
    const item = cart.find(c => c.id === id);
    return item ? item.qty : 0;
  };

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing) {
        return prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing && existing.qty > 1) {
        return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
      }
      return prev.filter(c => c.id !== id);
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#153969] to-[#0a1f3d]"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'id' ? 'Material Store' : 'Material Store'}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              {language === 'id'
                ? 'Beli material bangunan berkualitas langsung dari supplier terpercaya. Harga bersaing, pengiriman cepat.'
                : 'Buy quality construction materials directly from trusted suppliers. Competitive prices, fast delivery.'
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
                  placeholder={language === 'id' ? 'Cari material...' : 'Search materials...'}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 shadow-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            href="/platform/login"
            className="flex items-center gap-3 px-6 py-3 bg-[#153969] text-white rounded-full shadow-lg hover:bg-[#1e4d8a] transition"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="font-medium">
              {language === 'id' ? 'Lihat Keranjang' : 'View Cart'}
            </span>
          </Link>
        </div>
      )}

      {/* Benefits Bar */}
      <section className={`border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Truck className="w-5 h-5" />, text: language === 'id' ? 'Gratis Ongkir >5 Ton' : 'Free Shipping >5 Tons' },
              { icon: <Shield className="w-5 h-5" />, text: language === 'id' ? 'Jaminan Kualitas' : 'Quality Guarantee' },
              { icon: <CreditCard className="w-5 h-5" />, text: language === 'id' ? 'Bayar Tempo 30 Hari' : 'Net 30 Payment' },
              { icon: <Package className="w-5 h-5" />, text: language === 'id' ? 'Stok Selalu Ready' : 'Always In Stock' },
            ].map((item, index) => (
              <div key={index} className={`flex items-center gap-2 justify-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="text-[#153969]">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
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

        {/* Results */}
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {language === 'id'
            ? `Menampilkan ${filteredMaterials.length} produk`
            : `Showing ${filteredMaterials.length} products`
          }
        </p>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredMaterials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`rounded-xl overflow-hidden border transition hover:shadow-lg ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className={`text-xs mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {item.brand}
                </p>
                <h3 className={`text-sm font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.rating} • {language === 'id' ? `${item.sold} terjual` : `${item.sold} sold`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#153969]">
                      {formatPrice(item.price)}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {item.unit}
                    </span>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="mt-3">
                  {getCartQty(item.id) > 0 ? (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                          isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {getCartQty(item.id)}
                      </span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#153969] text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item.id)}
                      className="w-full py-2 rounded-lg text-sm font-medium bg-[#153969] text-white hover:bg-[#1e4d8a] transition"
                    >
                      {language === 'id' ? '+ Keranjang' : '+ Add to Cart'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
