'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Star, Minus, Plus, Truck, Shield, CreditCard, Package, X, Loader2, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function MaterialStorePage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{id: number, qty: number}[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

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
  const totalPrice = cart.reduce((sum, item) => {
    const material = materials.find(m => m.id === item.id);
    return sum + (material ? material.price * item.qty : 0);
  }, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem('kbs_token');
    if (!token) {
      router.push('/platform/login/');
      return;
    }

    if (!shippingAddress.trim()) {
      setCheckoutError(language === 'id' ? 'Alamat pengiriman wajib diisi' : 'Shipping address is required');
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError('');

    try {
      const res = await fetch('/api/materials/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          shipping_address: shippingAddress,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCheckoutError(data.error || 'Checkout gagal');
        return;
      }

      setCheckoutSuccess(true);
      setTimeout(() => {
        setShowCheckout(false);
        setCheckoutSuccess(false);
        setCart([]);
        setShippingAddress('');
      }, 3000);

    } catch {
      setCheckoutError(language === 'id' ? 'Gagal terhubung ke server' : 'Connection failed');
    } finally {
      setCheckoutLoading(false);
    }
  };

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
          <button
            onClick={() => setShowCheckout(true)}
            className="flex items-center gap-3 px-6 py-3 bg-[#153969] text-white rounded-full shadow-lg hover:bg-[#1e4d8a] transition"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="font-medium">
              {formatPrice(totalPrice)}
            </span>
          </button>
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
                  className="object-cover"
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

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className={`w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              {checkoutSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'id' ? 'Order Berhasil!' : 'Order Successful!'}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'id'
                      ? 'Pesanan Anda sedang diproses. Tim kami akan menghubungi untuk konfirmasi pengiriman.'
                      : 'Your order is being processed. Our team will contact you for delivery confirmation.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <ShoppingCart className="inline w-5 h-5 mr-2" />
                      {language === 'id' ? 'Checkout' : 'Checkout'}
                    </h3>
                    <button onClick={() => setShowCheckout(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-3 mb-4">
                    {cart.map(cartItem => {
                      const material = materials.find(m => m.id === cartItem.id);
                      if (!material) return null;
                      return (
                        <div key={cartItem.id} className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                            <Image src={material.image} alt={material.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {material.name}
                            </p>
                            <p className="text-xs text-gray-500">{cartItem.qty} × {formatPrice(material.price)}</p>
                          </div>
                          <p className="text-sm font-bold text-[#153969]">
                            {formatPrice(material.price * cartItem.qty)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Total */}
                  <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Total ({totalItems} {language === 'id' ? 'item' : 'items'})
                      </span>
                      <span className="text-xl font-bold text-[#153969]">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'id' ? 'Alamat Pengiriman' : 'Shipping Address'} *
                    </label>
                    <textarea
                      value={shippingAddress}
                      onChange={e => { setShippingAddress(e.target.value); setCheckoutError(''); }}
                      rows={3}
                      placeholder={language === 'id' ? 'Masukkan alamat lengkap pengiriman...' : 'Enter complete shipping address...'}
                      className={`w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-[#153969] resize-none ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  {/* Error */}
                  {checkoutError && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                      {checkoutError}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full py-3 bg-[#153969] text-white rounded-lg font-medium hover:bg-[#1e4d8a] transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {language === 'id' ? 'Memproses...' : 'Processing...'}
                      </>
                    ) : (
                      <>
                        {language === 'id' ? 'Bayar Sekarang' : 'Pay Now'} — {formatPrice(totalPrice)}
                      </>
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
