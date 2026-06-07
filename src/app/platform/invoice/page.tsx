'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Printer, ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  unit?: string;
}

interface OrderData {
  orderId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  items: OrderItem[];
  paymentStatus?: 'paid' | 'pending' | 'failed';
  paymentMethod?: string;
  orderDate?: string;
  notes?: string;
}

export default function InvoicePage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Only load order data from localStorage (not from URL params to prevent phishing)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kbs_last_order');
      if (stored) {
        try {
          setOrderData(JSON.parse(stored));
        } catch {
          // No valid data
        }
      }
    }
  }, [searchParams]);

  // Generate invoice number
  const invoiceNumber = useMemo(() => {
    if (!orderData) return '';
    const date = orderData.orderDate ? new Date(orderData.orderDate) : new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const seq = orderData.orderId
      ? String(orderData.orderId).padStart(4, '0')
      : String(Math.floor(Math.random() * 9000) + 1000);
    return `INV-KBS-${y}${m}${d}-${seq}`;
  }, [orderData]);

  const invoiceDate = useMemo(() => {
    if (!orderData) return '';
    const date = orderData.orderDate ? new Date(orderData.orderDate) : new Date();
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [orderData, language]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const subtotal = useMemo(() => {
    if (!orderData) return 0;
    return orderData.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [orderData]);

  const taxRate = 0.11;
  const taxAmount = Math.round(subtotal * taxRate);
  const grandTotal = subtotal + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'paid':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          label: language === 'id' ? 'Lunas' : 'Paid',
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'failed':
        return {
          icon: <XCircle className="w-4 h-4" />,
          label: language === 'id' ? 'Gagal' : 'Failed',
          className: 'bg-red-100 text-red-800 border-red-200',
        };
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          label: language === 'id' ? 'Menunggu Pembayaran' : 'Pending',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
    }
  };

  if (!orderData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="text-center">
          <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'id' ? 'Data invoice tidak ditemukan.' : 'Invoice data not found.'}
          </p>
          <button
            onClick={() => router.push('/platform')}
            className="px-6 py-2 bg-[#153969] text-white rounded-lg hover:bg-[#1e4d8a] transition"
          >
            {language === 'id' ? 'Kembali ke Platform' : 'Back to Platform'}
          </button>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge(orderData.paymentStatus);

  return (
    <div className={`min-h-screen py-8 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Action Buttons - hidden on print */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <button
          onClick={() => router.push('/platform')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'id' ? 'Kembali ke Platform' : 'Back to Platform'}
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2 bg-[#153969] text-white rounded-lg text-sm font-medium hover:bg-[#1e4d8a] transition"
        >
          <Printer className="w-4 h-4" />
          {language === 'id' ? 'Cetak Invoice' : 'Print Invoice'}
        </button>
      </div>

      {/* Invoice Document */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`max-w-4xl mx-auto rounded-lg shadow-sm print:shadow-none print:rounded-none ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                PT KARYA BANGUN SEMESTA
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Jl. Raya Kalimalang No. 88, Jakarta Timur 13450
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Tel: (021) 8888-7777
              </p>
            </div>
            <div className="text-left md:text-right">
              <h2 className={`text-xl font-bold uppercase tracking-wide ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                Invoice
              </h2>
              <p className={`text-sm mt-1 font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {invoiceNumber}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {invoiceDate}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className={`border-t-2 mb-8 ${isDark ? 'border-gray-700' : 'border-[#153969]'}`} />

          {/* Customer Info & Payment Status */}
          <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-10">
            <div>
              <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'id' ? 'Ditagihkan Kepada' : 'Bill To'}
              </h3>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {orderData.customerName || (language === 'id' ? 'Pelanggan' : 'Customer')}
              </p>
              {orderData.customerEmail && (
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {orderData.customerEmail}
                </p>
              )}
              {orderData.customerPhone && (
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {orderData.customerPhone}
                </p>
              )}
              {orderData.customerAddress && (
                <p className={`text-sm mt-1 max-w-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {orderData.customerAddress}
                </p>
              )}
            </div>

            <div className="md:text-right">
              <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'id' ? 'Status Pembayaran' : 'Payment Status'}
              </h3>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusBadge.className}`}>
                {statusBadge.icon}
                {statusBadge.label}
              </span>
              {orderData.paymentMethod && (
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'id' ? 'Metode: ' : 'Method: '}{orderData.paymentMethod}
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 px-2 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    No
                  </th>
                  <th className={`text-left py-3 px-2 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'id' ? 'Deskripsi' : 'Description'}
                  </th>
                  <th className={`text-center py-3 px-2 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'id' ? 'Jumlah' : 'Qty'}
                  </th>
                  <th className={`text-right py-3 px-2 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'id' ? 'Harga Satuan' : 'Unit Price'}
                  </th>
                  <th className={`text-right py-3 px-2 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}
                  >
                    <td className={`py-3 px-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {index + 1}
                    </td>
                    <td className={`py-3 px-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {item.name}
                      {item.unit && (
                        <span className={`text-xs ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          ({item.unit})
                        </span>
                      )}
                    </td>
                    <td className={`py-3 px-2 text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.qty}
                    </td>
                    <td className={`py-3 px-2 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {formatCurrency(item.price)}
                    </td>
                    <td className={`py-3 px-2 text-right font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                      {formatCurrency(item.price * item.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-10">
            <div className="w-full md:w-72">
              <div className={`flex justify-between py-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className={`flex justify-between py-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <span>PPN (11%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <div className={`flex justify-between py-3 mt-2 border-t-2 font-bold text-base ${
                isDark ? 'border-gray-600 text-white' : 'border-[#153969] text-gray-900'
              }`}>
                <span>{language === 'id' ? 'Total' : 'Grand Total'}</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {orderData.notes && (
            <div className={`mb-8 p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'id' ? 'Catatan' : 'Notes'}
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {orderData.notes}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className={`border-t pt-6 mt-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {language === 'id'
                    ? 'Invoice ini dibuat secara otomatis oleh sistem PT Karya Bangun Semesta.'
                    : 'This invoice was generated automatically by PT Karya Bangun Semesta system.'}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {language === 'id' ? 'Pertanyaan? Hubungi:' : 'Questions? Contact:'}
                </p>
                <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  info@karyabangunsemesta.co.id
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps Section - hidden on print */}
      <div className="max-w-4xl mx-auto mt-8 print:hidden">
        <div className={`rounded-lg p-6 md:p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'id' ? 'Langkah Selanjutnya' : 'Next Steps'}
          </h3>

          {/* Timeline Steps */}
          <div className="relative">
            <div className={`absolute left-4 top-6 bottom-6 w-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />

            {[
              {
                step: 1,
                title: language === 'id' ? 'Pesanan Diterima' : 'Order Received',
                desc: language === 'id' ? 'Pesanan Anda telah masuk ke sistem kami' : 'Your order has been received in our system',
                active: true,
              },
              {
                step: 2,
                title: language === 'id' ? 'Konfirmasi Pembayaran' : 'Payment Confirmation',
                desc: language === 'id' ? 'Tim kami akan mengonfirmasi pembayaran Anda (maks. 1x24 jam)' : 'Our team will confirm your payment (max. 1x24 hours)',
                active: false,
              },
              {
                step: 3,
                title: language === 'id' ? 'Proses & Pengiriman' : 'Processing & Delivery',
                desc: language === 'id' ? 'Pesanan diproses dan dikirim ke lokasi proyek Anda' : 'Order processed and delivered to your project site',
                active: false,
              },
              {
                step: 4,
                title: language === 'id' ? 'Selesai' : 'Completed',
                desc: language === 'id' ? 'Barang diterima, proyek Anda berjalan lancar' : 'Goods received, your project runs smoothly',
                active: false,
              },
            ].map((item) => (
              <div key={item.step} className="relative flex items-start gap-4 mb-6 last:mb-0">
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                  item.active
                    ? 'bg-[#153969] text-white'
                    : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                }`}>
                  {item.step}
                </div>
                <div className="flex-1 pt-1">
                  <p className={`font-medium text-sm ${
                    item.active
                      ? (isDark ? 'text-white' : 'text-gray-900')
                      : (isDark ? 'text-gray-400' : 'text-gray-500')
                  }`}>
                    {item.title}
                  </p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {item.desc}
                  </p>
                </div>
                {item.active && (
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                    {language === 'id' ? 'Saat ini' : 'Current'}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/platform/orders/')}
                className="flex-1 py-3 px-4 bg-[#153969] text-white rounded-lg font-medium hover:bg-[#1e4d8a] transition text-sm text-center"
              >
                {language === 'id' ? 'Lihat Status Pesanan' : 'View Order Status'}
              </button>
              <button
                onClick={() => router.push('/platform/material-store/')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition text-sm text-center border ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {language === 'id' ? 'Belanja Lagi' : 'Continue Shopping'}
              </button>
              <a
                href="https://wa.me/6281218127503"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition text-sm text-center border ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {language === 'id' ? 'Hubungi Tim Kami' : 'Contact Our Team'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
