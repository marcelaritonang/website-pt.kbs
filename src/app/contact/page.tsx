// app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Define the FormData interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Kirim data form ke API endpoint yang sudah dibuat di serverless function
      const response = await fetch('https://backend-kbs-website.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
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
      } else {
        // Tambahkan penanganan error
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Terjadi kesalahan saat mengirim pesan');
        console.error('Error sending message:', data.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner - Fixed to fill the top area */}
      <section className="bg-[#153969] pt-12 pb-16 md:pt-16 md:pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-left md:text-center"
          >
            <div className="flex justify-start w-full mb-6 mt-10">
            <button 
              onClick={() => router.push('/')} 
              className="inline-flex items-center text-white/90 hover:text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </button>
          </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3"
            >
              Hubungi Kami
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl md:mx-auto"
            >
              Kami siap melayani dan menjawab pertanyaan Anda
            </motion.p>
            
          </motion.div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden">
          <svg
            className="w-full h-[50px] md:h-[100px] fill-white"
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

      {/* Quick Contact Buttons - Mobile Only */}
      <section className="py-4 md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between gap-3">
            <a 
              href="tel:+6281218127503" 
              className="flex-1 flex items-center justify-center gap-2 bg-[#153969] text-white py-3 rounded-lg"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">Telepon</span>
            </a>
            <a 
              href="mailto:karyabangunsemestas@gmail.com" 
              className="flex-1 flex items-center justify-center gap-2 bg-[#153969]/10 text-[#153969] py-3 rounded-lg border border-[#153969]/20"
            >
              <Mail className="h-4 w-4" />
              <span className="font-medium">Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            {/* Contact Information */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-5 md:p-8 h-full border border-gray-200 shadow-sm">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Informasi Kontak</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-[#153969]/10 rounded-lg text-[#153969] shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Kantor Pusat</h3>
                      <p className="text-gray-600 mt-1 text-sm md:text-base">Jl. Raya Jatiwaringin No.06 2, RT.2/RW.13, Cipinang Melayu, Kec. Makasar, Jakarta Timur, 13620</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-[#153969]/10 rounded-lg text-[#153969] shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Telepon</h3>
                      <a 
                        href="tel:+6281218127503" 
                        className="text-gray-600 mt-1 text-sm md:text-base hover:text-[#153969] transition-colors block"
                      >
                        +6281218127503
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-[#153969]/10 rounded-lg text-[#153969] shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Email</h3>
                      <a 
                        href="mailto:karyabangunsemestas@gmail.com" 
                        className="text-gray-600 mt-1 text-sm md:text-base hover:text-[#153969] transition-colors break-all block"
                      >
                        karyabangunsemestas@gmail.com
                      </a>
                    </div>
                  </div>
                                    
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-[#153969]/10 rounded-lg text-[#153969] shrink-0">
                      <Clock className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">Jam Kerja</h3>
                      <p className="text-gray-600 mt-1 text-sm md:text-base">Senin - Jumat: 08.00 - 17.00</p>
                      <p className="text-gray-600 text-sm md:text-base">Sabtu: 08.00 - 13.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="md:col-span-2"
            >
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-200 shadow-sm">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1 md:mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1 md:mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@contoh.com"
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1 md:mb-2">Nomor Telepon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Masukkan nomor telepon"
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1 md:mb-2">Subjek</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subjek pesan"
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-1 md:mb-2">Pesan</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tulis pesan anda di sini..."
                      rows={4}
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-[#153969] focus:ring-1 focus:ring-[#153969] transition"
                      required
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                      <p>{errorMessage || 'Terjadi kesalahan. Silakan coba lagi nanti.'}</p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 md:py-4 rounded-lg font-medium text-white
                      ${isSubmitting ? 'bg-[#153969]/70' : submitStatus === 'success' ? 'bg-green-600' : submitStatus === 'error' ? 'bg-red-600' : 'bg-[#153969] hover:bg-[#0e2752]'} 
                      transition-colors relative overflow-hidden flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Mengirim...</span>
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Pesan Terkirim!</span>
                      </>
                    ) : submitStatus === 'error' ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Gagal Mengirim!</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Kirim Pesan</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <motion.section 
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="pb-10 md:py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-2 md:p-4 rounded-xl overflow-hidden shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2782454946094!2d106.9077499!3d-6.2283741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c71ea69c59d%3A0x56cb9422a68b353a!2sJl.%20Jatiwaringin%20Raya%20No.6%2C%20RT.2%2FRW.13%2C%20Cipinang%20Melayu%2C%20Kec.%20Makasar%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2013620!5e0!3m2!1sen!2sid!4v1644943283176!5m2!1sen!2sid" 
              width="100%" 
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true} 
              loading="lazy"
              title="PT Karya Bangun Semesta Location"
            ></iframe>
          </div>
        </div>
      </motion.section>
    </main>
  );
}