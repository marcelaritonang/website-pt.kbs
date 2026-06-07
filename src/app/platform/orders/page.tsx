'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Phone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  unit?: string;
}

interface Order {
  id: number;
  date: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'processing' | 'delivered' | 'completed';
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export default function OrdersPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kbs_last_order');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setOrders([parsed]);
        } catch {
          // No valid data
        }
      }
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusInfo = (status: string) => {
    const statuses: Record<string, { label: string; color: string; step: number }> = {
      pending: {
        label: language === 'id' ? 'Menunggu Konfirmasi' : 'Awaiting Confirmation',
        color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
        step: 1,
      },
      confirmed: {
        label: language === 'id' ? 'Dikonfirmasi' : 'Confirmed',
        color: 'text-blue-600 bg-blue-50 border-blue-200',
        step: 2,
      },
      processing: {
        label: language === 'id' ? 'Sedang Diproses' : 'Processing',
        color: 'text-purple-600 bg-purple-50 border-purple-200',
        step: 3,
      },
      delivered: {
        label: language === 'id' ? 'Dalam Pengiriman' : 'In Delivery',
        color: 'text-orange-600 bg-orange-50 border-orange-200',
        step: 4,
      },
      completed: {
        label: language === 'id' ? 'Selesai' : 'Completed',
        color: 'text-green-600 bg-green-50 border-green-200',
        step: 5,
      },
    };
    return statuses[status] || statuses.pending;
  };

  const steps = [
    { key: 'pending', icon: Clock, label: language === 'id' ? 'Pesanan Masuk' : 'Order Placed' },
    { key: 'confirmed', icon: CheckCircle, label: language === 'id' ? 'Dikonfirmasi' : 'Confirmed' },
    { key: 'processing', icon: Package, label: language === 'id' ? 'Diproses' : 'Processing' },
    { key: 'delivered', icon: Truck, label: language === 'id' ? 'Dikirim' : 'Shipped' },
    { key: 'completed', icon: CheckCircle, label: language === 'id' ? 'Selesai' : 'Done' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <section className="relative pt-28 pb-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#153969] to-[#0a1f3d]"></div>
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {language === 'id' ? 'Pesanan Saya' : 'My Orders'}
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              {language === 'id'
                ? 'Pantau status pesanan dan riwayat transaksi Anda'
                : 'Track your order status and transaction history'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/platform/')}
          className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg text-sm font-medium transition ${
            isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'id' ? 'Kembali' : 'Back'}
        </button>

        {orders.length === 0 ? (
          <div className={`text-center py-16 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <Package className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'id' ? 'Belum ada pesanan' : 'No orders yet'}
            </p>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {language === 'id'
                ? 'Mulai belanja material atau booking alat berat'
                : 'Start shopping for materials or booking equipment'}
            </p>
            <button
              onClick={() => router.push('/platform/material-store/')}
              className="px-6 py-3 bg-[#153969] text-white rounded-lg font-medium hover:bg-[#1e4d8a] transition"
            >
              {language === 'id' ? 'Mulai Belanja' : 'Start Shopping'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => {
              const statusInfo = getStatusInfo(order.status || 'pending');
              const currentStep = statusInfo.step;
              const total = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`rounded-xl overflow-hidden shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                >
                  {/* Order Header */}
                  <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'id' ? 'Order' : 'Order'} #KBS-{String(order.id).padStart(4, '0')}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {order.date ? formatDate(order.date) : '-'}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="px-6 py-6">
                    <div className="flex items-center justify-between mb-2">
                      {steps.map((step, i) => {
                        const isActive = i < currentStep;
                        const isCurrent = i === currentStep - 1;
                        const StepIcon = step.icon;
                        return (
                          <div key={step.key} className="flex flex-col items-center flex-1">
                            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                              isActive
                                ? 'bg-[#153969] text-white'
                                : isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
                            } ${isCurrent ? 'ring-2 ring-[#153969]/30' : ''}`}>
                              <StepIcon className="w-4 h-4" />
                            </div>
                            <p className={`text-[10px] mt-1 text-center ${
                              isActive
                                ? (isDark ? 'text-gray-200' : 'text-gray-800')
                                : (isDark ? 'text-gray-500' : 'text-gray-400')
                            } ${isCurrent ? 'font-semibold' : ''}`}>
                              {step.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {/* Progress Bar */}
                    <div className="flex items-center mt-1 px-4">
                      {steps.slice(0, -1).map((_, i) => (
                        <div key={i} className={`flex-1 h-1 rounded ${
                          i < currentStep - 1
                            ? 'bg-[#153969]'
                            : isDark ? 'bg-gray-700' : 'bg-gray-200'
                        }`} />
                      ))}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className={`px-6 py-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {item.name}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {item.qty} {item.unit || 'x'} × {formatCurrency(item.price)}
                            </p>
                          </div>
                          <p className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                            {formatCurrency(item.price * item.qty)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className={`flex justify-between items-center mt-4 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Total
                      </span>
                      <span className="text-lg font-bold text-[#153969]">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`px-6 py-4 border-t ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => router.push('/platform/invoice/')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition border ${
                          isDark
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                            : 'border-gray-300 text-gray-700 hover:bg-white'
                        }`}
                      >
                        {language === 'id' ? 'Lihat Invoice' : 'View Invoice'}
                      </button>
                      <a
                        href="https://wa.me/6281218127503"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-[#153969] text-white hover:bg-[#1e4d8a] transition text-center flex items-center justify-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {language === 'id' ? 'Hubungi Tim' : 'Contact Team'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Info Section */}
        <div className={`mt-8 p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'id' ? 'Informasi Penting' : 'Important Information'}
          </h3>
          <ul className={`text-sm space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>• {language === 'id' ? 'Tim kami akan mengonfirmasi pesanan dalam 1x24 jam kerja.' : 'Our team will confirm orders within 1x24 working hours.'}</li>
            <li>• {language === 'id' ? 'Pembayaran dapat dilakukan via transfer bank atau tunai di lokasi.' : 'Payment can be made via bank transfer or cash on site.'}</li>
            <li>• {language === 'id' ? 'Pengiriman material dilakukan dengan armada kami sendiri.' : 'Material delivery is done with our own fleet.'}</li>
            <li>• {language === 'id' ? 'Untuk pertanyaan lebih lanjut, hubungi tim kami via WhatsApp.' : 'For further questions, contact our team via WhatsApp.'}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
