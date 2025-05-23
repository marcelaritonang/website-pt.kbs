// app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

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
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
      // Log data yang akan dikirim untuk debugging
      console.log('Sending form data:', formData);
      
      // Menambahkan timeout control
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 detik timeout
      
      // Gunakan backend URL yang dapat dikonfigurasi melalui environment variable
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-kbs-website.vercel.app';
      console.log('Using backend URL:', backendUrl);
      
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
        credentials: 'omit'
      });
      
      clearTimeout(timeoutId);
      
      // Log response status untuk debugging
      console.log('Response status:', response.status);
      
      // Baca response sebagai text terlebih dahulu
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      // Parse response JSON
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error(language === 'en' 
          ? 'Could not process server response: ' + responseText.substring(0, 100)
          : 'Tidak dapat memproses respons dari server: ' + responseText.substring(0, 100));
      }
      
      if (response.ok) {
        setSubmitStatus('success');
        console.log('Form submitted successfully');
        
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
        setErrorMessage(data?.message || (language === 'en' 
          ? 'An error occurred while sending the message'
          : 'Terjadi kesalahan saat mengirim pesan'));
        console.error('Error response:', data);
      }
    } catch (error: unknown) {
      setSubmitStatus('error');
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setErrorMessage(language === 'en' 
            ? 'Connection timeout. Please try again later.'
            : 'Koneksi timeout. Silakan coba lagi nanti.');
        } else if (error.message.includes('fetch')) {
          setErrorMessage(language === 'en'
            ? 'Could not connect to server. Please make sure your internet connection is stable.'
            : 'Tidak dapat terhubung ke server. Pastikan koneksi internet Anda stabil.');
        } else {
          // Tampilkan pesan error yang lebih detail
          setErrorMessage(language === 'en'
            ? `Failed to send message: ${error.message}`
            : `Gagal mengirim pesan: ${error.message}`);
        }
      } else {
        // Fallback untuk error yang bukan instance dari Error
        setErrorMessage(language === 'en'
          ? 'Failed to send message, please try again later.'
          : 'Gagal mengirim pesan, silakan coba lagi nanti.');
      }
      
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
    <main className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      {/* Hero Banner - Fixed to fill the top area */}
      <section className={`${isDark ? 'bg-blue-900/20' : 'bg-[#153969]'} pt-12 pb-16 md:pt-16 md:pb-20 relative transition-colors duration-300`}>
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
              {language === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}
            </button>
          </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3"
            >
              {language === 'en' ? 'Contact Us' : 'Hubungi Kami'}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl md:mx-auto"
            >
              {language === 'en' 
                ? 'We are ready to serve and answer your questions' 
                : 'Kami siap melayani dan menjawab pertanyaan Anda'}
            </motion.p>
            
          </motion.div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden">
          <svg
            className="w-full h-[50px] md:h-[100px]"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C320,80 440,60 720,40 C960,20 1200,80 1440,80 L1440,100 L0,100 Z"
              className={isDark ? 'fill-gray-900' : 'fill-white'}
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
              className={`flex-1 flex items-center justify-center gap-2 ${isDark ? 'bg-blue-600' : 'bg-[#153969]'} text-white py-3 rounded-lg transition-colors duration-300`}
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">{language === 'en' ? 'Call' : 'Telepon'}</span>
            </a>
            <a 
              href="mailto:karyabangunsemestas@gmail.com" 
              className={`flex-1 flex items-center justify-center gap-2 ${
                isDark 
                  ? 'bg-blue-900/30 text-blue-400 border-blue-800' 
                  : 'bg-[#153969]/10 text-[#153969] border-[#153969]/20'
              } py-3 rounded-lg border transition-colors duration-300`}
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
              <div className={`${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-gray-50 border-gray-200'
              } rounded-xl md:rounded-2xl p-5 md:p-8 h-full border shadow-sm transition-colors duration-300`}>
                <h2 className={`text-xl md:text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>
                  {language === 'en' ? 'Contact Information' : 'Informasi Kontak'}
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`p-2 md:p-3 ${
                      isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-[#153969]/10 text-[#153969]'
                    } rounded-lg shrink-0 transition-colors duration-300`}>
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium transition-colors duration-300`}>
                        {language === 'en' ? 'Headquarters' : 'Kantor Pusat'}
                      </h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1 text-sm md:text-base transition-colors duration-300`}>
                        Jl. Raya Jatiwaringin No.06 2, RT.2/RW.13, Cipinang Melayu, Kec. Makasar, Jakarta Timur, 13620
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`p-2 md:p-3 ${
                      isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-[#153969]/10 text-[#153969]'
                    } rounded-lg shrink-0 transition-colors duration-300`}>
                      <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium transition-colors duration-300`}>
                        {language === 'en' ? 'Phone' : 'Telepon'}
                      </h3>
                      <a 
                        href="tel:+6281218127503" 
                        className={`${
                          isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-[#153969]'
                        } mt-1 text-sm md:text-base transition-colors block`}
                      >
                        +6281218127503
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`p-2 md:p-3 ${
                      isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-[#153969]/10 text-[#153969]'
                    } rounded-lg shrink-0 transition-colors duration-300`}>
                      <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium transition-colors duration-300`}>
                        Email
                      </h3>
                      <a 
                        href="mailto:karyabangunsemestas@gmail.com" 
                        className={`${
                          isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-[#153969]'
                        } mt-1 text-sm md:text-base transition-colors break-all block`}
                      >
                        karyabangunsemestas@gmail.com
                      </a>
                    </div>
                  </div>
                                    
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`p-2 md:p-3 ${
                      isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-[#153969]/10 text-[#153969]'
                    } rounded-lg shrink-0 transition-colors duration-300`}>
                      <Clock className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium transition-colors duration-300`}>
                        {language === 'en' ? 'Working Hours' : 'Jam Kerja'}
                      </h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1 text-sm md:text-base transition-colors duration-300`}>
                        {language === 'en' ? 'Monday - Friday: 08.00 - 17.00' : 'Senin - Jumat: 08.00 - 17.00'}
                      </p>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm md:text-base transition-colors duration-300`}>
                        {language === 'en' ? 'Saturday: 08.00 - 13.00' : 'Sabtu: 08.00 - 13.00'}
                      </p>
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
              <div className={`${
                isDark 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-gray-50 border-gray-200'
              } rounded-xl md:rounded-2xl p-5 md:p-8 border shadow-sm transition-colors duration-300`}>
                <h2 className={`text-xl md:text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 md:mb-6 transition-colors duration-300`}>
                  {language === 'en' ? 'Send Message' : 'Kirim Pesan'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm mb-1 md:mb-2 transition-colors duration-300`}>
                        {language === 'en' ? 'Full Name' : 'Nama Lengkap'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'Enter your full name' : 'Masukkan nama lengkap'}
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-[#153969] focus:ring-[#153969]'
                        } focus:outline-none focus:ring-1 transition-colors duration-300`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm mb-1 md:mb-2 transition-colors duration-300`}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-[#153969] focus:ring-[#153969]'
                        } focus:outline-none focus:ring-1 transition-colors duration-300`}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm mb-1 md:mb-2 transition-colors duration-300`}>
                        {language === 'en' ? 'Phone Number' : 'Nomor Telepon'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'Enter your phone number' : 'Masukkan nomor telepon'}
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-[#153969] focus:ring-[#153969]'
                        } focus:outline-none focus:ring-1 transition-colors duration-300`}
                      />
                    </div>
                    <div>
                      <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm mb-1 md:mb-2 transition-colors duration-300`}>
                        {language === 'en' ? 'Subject' : 'Subjek'}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'Message subject' : 'Subjek pesan'}
                        className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-[#153969] focus:ring-[#153969]'
                        } focus:outline-none focus:ring-1 transition-colors duration-300`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm mb-1 md:mb-2 transition-colors duration-300`}>
                      {language === 'en' ? 'Message' : 'Pesan'}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Write your message here...' : 'Tulis pesan anda di sini...'}
                      rows={4}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-[#153969] focus:ring-[#153969]'
                      } focus:outline-none focus:ring-1 transition-colors duration-300`}
                      required
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                      <p>{errorMessage || (language === 'en' ? 'An error occurred. Please try again later.' : 'Terjadi kesalahan. Silakan coba lagi nanti.')}</p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 md:py-4 rounded-lg font-medium text-white
                      ${isSubmitting 
                        ? isDark ? 'bg-blue-600/70' : 'bg-[#153969]/70' 
                        : submitStatus === 'success' 
                          ? 'bg-green-600' 
                          : submitStatus === 'error' 
                            ? 'bg-red-600' 
                            : isDark 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'bg-[#153969] hover:bg-[#0e2752]'
                      } 
                      transition-colors relative overflow-hidden flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{language === 'en' ? 'Sending...' : 'Mengirim...'}</span>
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{language === 'en' ? 'Message Sent!' : 'Pesan Terkirim!'}</span>
                      </>
                    ) : submitStatus === 'error' ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>{language === 'en' ? 'Failed to Send!' : 'Gagal Mengirim!'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>{language === 'en' ? 'Send Message' : 'Kirim Pesan'}</span>
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
          <div className={`${
            isDark ? 'bg-gray-800' : 'bg-gray-50'
          } p-2 md:p-4 rounded-xl overflow-hidden shadow-sm transition-colors duration-300`}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2782454946094!2d106.9077499!3d-6.2283741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c71ea69c59d%3A0x56cb9422a68b353a!2sJl.%20Jatiwaringin%20Raya%20No.6%2C%20RT.2%2FRW.13%2C%20Cipinang%20Melayu%2C%20Kec.%20Makasar%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2013620!5e0!3m2!1sen!2sid!4v1644943283176!5m2!1sen!2sid" 
              width="100%" 
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true} 
              loading="lazy"
              title={language === 'en' ? "PT Karya Bangun Semesta Location" : "Lokasi PT Karya Bangun Semesta"}
            ></iframe>
          </div>
        </div>
      </motion.section>
    </main>
  );
}