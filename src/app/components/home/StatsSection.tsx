'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import KonsultasiModal from '../KonsultasiModal';  // Sesuaikan path import

const StatsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="min-h-screen bg-white flex items-center">
      <div className="w-full relative">
        {/* Background Shape */}
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1E4D2B] transform rotate-45 translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-blue-100 transform rotate-45 translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-6xl font-bold text-gray-900">
                Siap Berkolaborasi Bersama?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Apakah Anda memiliki proyek konstruksi yang ingin direalisasikan atau tertarik untuk 
                bergabung dan berkembang bersama tim kami? Mari wujudkan visi Anda bersama kami!
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                {/* Ganti Link dengan button untuk membuka modal */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 
                           bg-[#1E4D2B] text-white text-lg font-medium tracking-wide
                           hover:bg-[#153969] transition-colors duration-300
                           uppercase"
                >
                  Konsultasikan Proyek
                </button>

                <Link
                  href="/karir"
                  className="inline-flex items-center justify-center px-8 py-4 
                           border-2 border-[#1E4D2B] text-[#1E4D2B] text-lg font-medium 
                           tracking-wide hover:bg-[#1E4D2B] hover:text-white
                           transition-all duration-300 uppercase"
                >
                  Bergabung Bersama Kami
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal Konsultasi */}
      <KonsultasiModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default StatsSection;