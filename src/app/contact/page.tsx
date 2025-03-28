// app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

// Define the FormData interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi pengiriman form
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form setelah berhasil
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitStatus('');
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner - Fixed to fill the top area */}
      <section className="bg-[#153969] pt-20 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mt-8 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Kami siap melayani dan menjawab pertanyaan Anda
          </p>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden">
          <svg
            className="w-full h-[100px] fill-white"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C320,80 440,60 720,40 C960,20 1200,80 1440,80 L1440,100 L0,100 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Informasi Kontak</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#153969]/10 rounded-lg text-[#153969]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Kantor Pusat</h3>
                      <p className="text-gray-600 mt-1">Jl. Raya Jatiwaringin No.06 2, RT.2/RW.13, Cipinang Melayu, Kec. Makasar, Jakarta Timur, 13620</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#153969]/10 rounded-lg text-[#153969]">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Telepon</h3>
                      <p className="text-gray-600 mt-1">+6281218127503</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#153969]/10 rounded-lg text-[#153969]">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Email</h3>
                      <p className="text-gray-600 mt-1">karyabangunsemestas@gmail.com</p>
                    </div>
                  </div>
                                    
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#153969]/10 rounded-lg text-[#153969]">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Jam Kerja</h3>
                      <p className="text-gray-600 mt-1">Senin - Jumat: 08.00 - 17.00</p>
                      <p className="text-gray-600">Sabtu: 08.00 - 13.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Nomor Telepon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Subjek</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Pesan</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-medium text-white 
                      ${isSubmitting ? 'bg-blue-600' : 'bg-[#1E4D2B] hover:bg-[#153969]'} 
                      transition-colors relative overflow-hidden`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Mengirim...
                      </span>
                    ) : submitStatus === 'success' ? (
                      'Pesan Terkirim!'
                    ) : (
                      'Kirim Pesan'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-4 rounded-xl overflow-hidden shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2782454946094!2d106.9077499!3d-6.2283741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c71ea69c59d%3A0x56cb9422a68b353a!2sJl.%20Jatiwaringin%20Raya%20No.6%2C%20RT.2%2FRW.13%2C%20Cipinang%20Melayu%2C%20Kec.%20Makasar%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2013620!5e0!3m2!1sen!2sid!4v1644943283176!5m2!1sen!2sid" 
              width="100%" 
              height="450" 
              style={{ border: 0 }}
              allowFullScreen={true} 
              loading="lazy"
              title="PT Karya Bangun Semesta Location"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}