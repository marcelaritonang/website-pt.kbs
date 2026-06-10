'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Printer, ArrowLeft, CheckCircle, Clock, XCircle, FileText, Package, Truck, Receipt } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface InvoiceItem {
  name: string;
  qty: number;
  price: number;
  unit?: string;
}

interface Invoice {
  id: string;
  type: 'equipment' | 'material';
  date: string;
  items: InvoiceItem[];
  total: number;
  status: string;
  customer: {
    name: string;
    email: string;
  };
}

export default function InvoicePage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const router = useRouter();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    const token = localStorage.getItem('kbs_token');
    const user = JSON.parse(localStorage.getItem('kbs_user') || '{}');
    const allInvoices: Invoice[] = [];

    // Fetch bookings
    try {
      const res = await fetch('/api/bookings/', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        (data.bookings || []).forEach((b: Record<string, unknown>) => {
          allInvoices.push({
            id: `INV-EQ-${String(b.id).padStart(4, '0')}`,
            type: 'equipment',
            date: b.created_at as string,
            items: [{
              name: (b.equipment_name as string) || 'Equipment Rental',
              qty: Math.ceil((new Date(b.end_date as string).getTime() - new Date(b.start_date as string).getTime()) / 86400000),
              price: Math.round((b.total_price as number) / Math.max(1, Math.ceil((new Date(b.end_date as string).getTime() - new Date(b.start_date as string).getTime()) / 86400000))),
              unit: language === 'id' ? 'hari' : 'days',
            }],
            total: b.total_price as number,
            status: b.status as string,
            customer: { name: user.name || '', email: user.email || '' },
          });
        });
      }
    } catch {}

    // Fetch material orders
    try {
      const res = await fetch('/api/orders/', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        (data.orders || []).forEach((o: Record<string, unknown>) => {
          const items = (o.items as Array<{id: number; qty: number}>) || [];
          allInvoices.push({
            id: `INV-MT-${String(o.id).padStart(4, '0')}`,
            type: 'material',
            date: o.created_at as string,
            items: items.map((item) => ({
              name: `Material #${item.id}`,
              qty: item.qty,
              price: Math.round((o.total_price as number) / items.reduce((s, i) => s + i.qty, 0)),
              unit: 'pcs',
            })),
            total: o.total_price as number,
            status: o.status as string,
            customer: { name: user.name || '', email: user.email || '' },
          });
        });
      }
    } catch {}

    // Also check localStorage for recent order
    try {
      const stored = localStorage.getItem('kbs_last_order');
      if (stored && allInvoices.length === 0) {
        const parsed = JSON.parse(stored);
        allInvoices.push({
          id: `INV-${String(parsed.id || '0001').padStart(4, '0')}`,
          type: 'material',
          date: parsed.date || new Date().toISOString(),
          items: (parsed.items || []).map((item: InvoiceItem) => ({
            name: item.name,
            qty: item.qty,
            price: item.price,
            unit: item.unit || '',
          })),
          total: (parsed.items || []).reduce((s: number, i: InvoiceItem) => s + i.price * i.qty, 0),
          status: parsed.status || 'pending',
          customer: {
            name: parsed.customer?.name || user.name || '',
            email: parsed.customer?.email || user.email || '',
          },
        });
      }
    } catch {}

    allInvoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setInvoices(allInvoices);
    if (allInvoices.length > 0) setSelectedInvoice(allInvoices[0]);
    setLoading(false);
  }

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return { icon: <CheckCircle className="w-3.5 h-3.5" />, label: language === 'id' ? 'Lunas' : 'Paid', className: 'bg-green-100 text-green-700' };
      case 'cancelled':
        return { icon: <XCircle className="w-3.5 h-3.5" />, label: language === 'id' ? 'Dibatalkan' : 'Cancelled', className: 'bg-red-100 text-red-700' };
      default:
        return { icon: <Clock className="w-3.5 h-3.5" />, label: language === 'id' ? 'Menunggu' : 'Pending', className: 'bg-amber-100 text-amber-700' };
    }
  };

  const subtotal = selectedInvoice ? selectedInvoice.total : 0;
  const taxRate = 0.11;
  const taxAmount = Math.round(subtotal * taxRate);
  const grandTotal = subtotal + taxAmount;

  if (loading) {
    return (
      <div className={`min-h-screen pt-24 px-4 ${isDark ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className={`h-8 w-48 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <div className={`h-64 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-12 px-4 ${isDark ? 'bg-[#0a1628]' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Receipt className="w-6 h-6 inline-block mr-2 -mt-1" />
              {language === 'id' ? 'Invoice & Tagihan' : 'Invoices & Billing'}
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'id' ? 'Riwayat transaksi dan tagihan Anda' : 'Your transaction and billing history'}
            </p>
          </div>
          {selectedInvoice && (
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-[#153969] text-white rounded-lg text-sm font-medium hover:bg-[#1e4d8a] transition"
            >
              <Printer className="w-4 h-4" />
              {language === 'id' ? 'Cetak' : 'Print'}
            </button>
          )}
        </div>

        {invoices.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-12 text-center border ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200'}`}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <FileText className={`w-8 h-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'id' ? 'Belum Ada Invoice' : 'No Invoices Yet'}
            </h3>
            <p className={`text-sm mb-6 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'id'
                ? 'Invoice akan muncul di sini setelah Anda melakukan booking alat berat atau pembelian material.'
                : 'Invoices will appear here after you make an equipment booking or material purchase.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push('/platform/equipment-booking/')}
                className="px-5 py-2.5 bg-[#153969] text-white rounded-lg text-sm font-medium hover:bg-[#1e4d8a] transition"
              >
                <Truck className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                {language === 'id' ? 'Sewa Alat Berat' : 'Rent Equipment'}
              </button>
              <button
                onClick={() => router.push('/platform/material-store/')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition border ${
                  isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                {language === 'id' ? 'Beli Material' : 'Buy Materials'}
              </button>
            </div>
          </motion.div>
        ) : (
          /* Invoice Layout: List + Detail */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Invoice List */}
            <div className="lg:col-span-1 print:hidden">
              <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200'}`}>
                <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'id' ? `${invoices.length} Invoice` : `${invoices.length} Invoices`}
                  </p>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                  {invoices.map((inv) => {
                    const badge = getStatusBadge(inv.status);
                    const isActive = selectedInvoice?.id === inv.id;
                    return (
                      <button
                        key={inv.id}
                        onClick={() => setSelectedInvoice(inv)}
                        className={`w-full text-left px-4 py-3.5 border-b transition ${
                          isActive
                            ? isDark ? 'bg-blue-500/10 border-gray-700/50' : 'bg-blue-50 border-gray-100'
                            : isDark ? 'hover:bg-gray-700/30 border-gray-700/50' : 'hover:bg-gray-50 border-gray-100'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className={`text-sm font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                              {inv.id}
                            </p>
                            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {formatDate(inv.date)}
                            </p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${badge.className}`}>
                            {badge.icon}
                            {badge.label}
                          </span>
                        </div>
                        <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatCurrency(inv.total)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Invoice Detail */}
            <div className="lg:col-span-2">
              {selectedInvoice && (
                <motion.div
                  key={selectedInvoice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200'}`}
                >
                  <div className="p-6 md:p-8">
                    {/* Invoice Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                      <div>
                        <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          PT KARYA BANGUN SEMESTA
                        </h2>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          Jl. Raya Kalimalang No. 88, Jakarta Timur
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          Tel: +62 812-1812-7503
                        </p>
                      </div>
                      <div className="md:text-right">
                        <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Invoice</p>
                        <p className={`text-sm font-mono font-bold mt-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {selectedInvoice.id}
                        </p>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {formatDate(selectedInvoice.date)}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className={`border-t-2 mb-6 ${isDark ? 'border-[#153969]/50' : 'border-[#153969]'}`} />

                    {/* Customer + Status */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {language === 'id' ? 'Ditagihkan Kepada' : 'Bill To'}
                        </p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {selectedInvoice.customer.name}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {selectedInvoice.customer.email}
                        </p>
                      </div>
                      <div className="md:text-right">
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          Status
                        </p>
                        {(() => {
                          const badge = getStatusBadge(selectedInvoice.status);
                          return (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.className}`}>
                              {badge.icon} {badge.label}
                            </span>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-6 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                            <th className={`text-left py-2.5 px-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {language === 'id' ? 'Item' : 'Item'}
                            </th>
                            <th className={`text-center py-2.5 px-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {language === 'id' ? 'Qty' : 'Qty'}
                            </th>
                            <th className={`text-right py-2.5 px-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {language === 'id' ? 'Harga' : 'Price'}
                            </th>
                            <th className={`text-right py-2.5 px-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedInvoice.items.map((item, i) => (
                            <tr key={i} className={`border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}>
                              <td className={`py-3 px-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                {item.name}
                                {item.unit && <span className={`text-xs ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/{item.unit}</span>}
                              </td>
                              <td className={`py-3 px-2 text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {item.qty}
                              </td>
                              <td className={`py-3 px-2 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {formatCurrency(item.price)}
                              </td>
                              <td className={`py-3 px-2 text-right font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {formatCurrency(item.price * item.qty)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end mb-6">
                      <div className="w-full md:w-64">
                        <div className={`flex justify-between py-1.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span>Subtotal</span>
                          <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className={`flex justify-between py-1.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span>PPN (11%)</span>
                          <span>{formatCurrency(taxAmount)}</span>
                        </div>
                        <div className={`flex justify-between py-2.5 mt-2 border-t-2 font-bold ${
                          isDark ? 'border-gray-600 text-white' : 'border-[#153969] text-gray-900'
                        }`}>
                          <span>Total</span>
                          <span>{formatCurrency(grandTotal)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className={`border-t pt-4 ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        {language === 'id'
                          ? 'Invoice ini dibuat secara otomatis oleh sistem PT Karya Bangun Semesta. Hubungi +62 812-1812-7503 untuk pertanyaan.'
                          : 'This invoice was generated automatically by PT Karya Bangun Semesta system. Contact +62 812-1812-7503 for questions.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
