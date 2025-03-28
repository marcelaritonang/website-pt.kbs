'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const FAQSection = () => {
  const [activeSection, setActiveSection] = useState('');

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection('');
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div>
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h2 
                variants={fadeInUp} 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Pertanyaan yang Sering Diajukan
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-gray-600"
              >
                Temukan jawaban untuk pertanyaan umum tentang layanan konstruksi kami
              </motion.p>
            </div>

            <div className="space-y-6">
              <motion.div variants={fadeInUp}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('faq5')}>
                  <h3 className="text-xl font-bold text-gray-800">Apakah kami menawarkan layanan pasca-konstruksi?</h3>
                  {activeSection === 'faq5' ? (
                    <ChevronUp className="h-5 w-5 text-[#153969]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#153969]" />
                  )}
                </div>
                {activeSection === 'faq5' && (
                  <p className="mt-2 text-gray-600">
                    Ya, kami menyediakan layanan pasca-konstruksi yang komprehensif termasuk pemeliharaan bangunan, perbaikan, renovasi, dan manajemen fasilitas. Kami menawarkan paket pemeliharaan yang disesuaikan untuk memastikan bangunan Anda beroperasi secara efisien dan mempertahankan nilainya seiring waktu. Tim kami siap menangani masalah yang mungkin muncul setelah penyelesaian proyek.
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-[#153969] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Siap Memulai Proyek Konstruksi Anda?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              Hubungi tim kami hari ini untuk mendiskusikan kebutuhan konstruksi Anda dan dapatkan solusi yang disesuaikan untuk proyek Anda.
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-white text-[#153969] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors shadow-lg"
              >
                Hubungi Kami
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Jelajahi Layanan Lainnya
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
