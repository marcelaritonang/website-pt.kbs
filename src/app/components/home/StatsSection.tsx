  'use client';

  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import Link from 'next/link';
  import KonsultasiModal from '../KonsultasiModal';  // Sesuaikan path import

  const StatsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <section className="min-h-[70vh] md:min-h-screen bg-white flex items-center py-10 md:py-0">
        <div className="w-full relative">
          {/* Background Shape - Responsive */}
          <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#1E4D2B] transform rotate-45 translate-x-1/4 -translate-y-1/4 opacity-70 md:opacity-100" />
            <div className="absolute bottom-0 right-0 w-[100px] md:w-[200px] h-[100px] md:h-[200px] bg-blue-100 transform rotate-45 translate-x-1/2 translate-y-1/2 hidden md:block" />
          </div>

          <div className="max-w-7xl mx-auto px-4 py-8 md:py-20">
            <div className="max-w-3xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4 md:space-y-8"
              >
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Siap Berkolaborasi Bersama?
                </h2>
                <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                  Apakah Anda memiliki proyek konstruksi yang ingin direalisasikan atau tertarik untuk 
                  bergabung dan berkembang bersama tim kami? Mari wujudkan visi Anda bersama kami!
                </p>

                <div className="flex flex-col gap-3 pt-2 md:pt-4">
                  {/* Ganti Link dengan button untuk membuka modal */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 
                            bg-[#1E4D2B] text-white text-base md:text-lg font-medium tracking-wide
                            hover:bg-[#153969] transition-colors duration-300 shadow-md
                            uppercase rounded-md md:rounded-none w-full"
                  >
                    Konsultasikan Proyek
                  </button>

                  <Link
                    href="/karir"
                    className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 
                            border-2 border-[#1E4D2B] text-[#1E4D2B] text-base md:text-lg font-medium 
                            tracking-wide hover:bg-[#1E4D2B] hover:text-white
                            transition-all duration-300 uppercase rounded-md md:rounded-none w-full"
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