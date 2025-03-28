'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ChevronDown, ChevronUp, Building2, Users, Clock } from 'lucide-react';

// Colors
const brandColors = {
  primary: '#153969',    // Navy Blue
  accent: '#718bab',     // Light Blue
};

// Office location
const officeLocation = {
  name: "Kantor Pusat Jakarta",
  address: "Jl. Raya Jatiwaringin No.06 2, RT.2/RW.13, Cipinang Melayu, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13620"
};

const TeamPage = () => {
  const [showFullStructure, setShowFullStructure] = useState(false);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Stats
  const stats = [
    {
      value: "15+",
      label: "Proyek Selesai ",
      icon: Building2
    },
    {
      value: "100%",
      label: "Kepuasan Client",
      icon: Users
    },
    {
      value: "24/7",
      label: "Dukungan Teknis",
      icon: Clock
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero section */}
      <div className="relative bg-[#153969] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pattern-grid"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Struktur Organisasi</h1>
              <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
              <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
                Mengenal lebih dekat para profesional yang berdedikasi tinggi dan berpengalaman luas dalam memberikan solusi konstruksi terbaik.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Organization Chart Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-5xl mx-auto text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-[#153969] mb-4">Struktur Organisasi Perusahaan</h2>
            <div className="w-20 h-1 bg-[#153969] mx-auto mb-6"></div>
            <p className="text-gray-700 mb-8">
              Kami memiliki struktur organisasi yang dirancang untuk memberikan layanan terbaik dan memastikan kualitas setiap proyek.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            {/* Text-based organizational chart */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-64 px-4 py-3 mb-8 bg-[#153969] text-white rounded-lg font-bold">
                  Winda Dara E. L.
                  <div className="mt-1 text-sm font-normal">KOMISARIS UTAMA</div>
                </div>
                
                <div className="w-0.5 h-8 bg-gray-300"></div>
                
                <div className="flex items-center justify-center">
                  <div className="w-64 px-4 py-3 mb-8 bg-[#153969] text-white rounded-lg font-bold">
                    Andre Sukanto
                    <div className="mt-1 text-sm font-normal">Direktur Utama</div>
                  </div>
                  <div className="w-32 h-0.5 bg-gray-300"></div>
                  <div className="w-64 px-4 py-3 mb-8 bg-[#153969] text-white rounded-lg font-bold">
                    Rolas Budiman S.
                    <div className="mt-1 text-sm font-normal">Legal</div>
                  </div>
                </div>
                
                <div className="w-0.5 h-8 bg-gray-300"></div>
                
                <div className="w-64 px-4 py-3 mb-8 bg-[#153969] text-white rounded-lg font-bold">
                  Iswanto
                  <div className="mt-1 text-sm font-normal">Direktur Operasional</div>
                </div>
                
                <div className="w-0.5 h-8 bg-gray-300"></div>
                
                <div className="w-64 px-4 py-3 mb-8 bg-[#153969] text-white rounded-lg font-bold">
                  Haryanto Permana
                  <div className="mt-1 text-sm font-normal">General Manager</div>
                </div>
                
                <div className="w-0.5 h-8 bg-gray-300"></div>
                
                <div className="flex justify-center w-full mb-8 gap-4">
                  <div className="px-4 py-3 bg-[#718bab] text-white rounded-lg font-bold text-center">
                    Sugiyarto
                    <div className="mt-1 text-sm font-normal">Manager Produksi</div>
                  </div>
                  <div className="px-4 py-3 bg-[#718bab] text-white rounded-lg font-bold text-center">
                    Ahmad Fahrizal
                    <div className="mt-1 text-sm font-normal">Manager Operasional</div>
                  </div>
                  <div className="px-4 py-3 bg-[#718bab] text-white rounded-lg font-bold text-center">
                    Riana Siagian
                    <div className="mt-1 text-sm font-normal">Manager Keuangan</div>
                  </div>
                </div>
                
                {showFullStructure && (
                  <>
                    <div className="w-full max-w-5xl border-t border-dashed border-gray-300 pt-8 mt-4"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                      {/* Produksi Team */}
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-[#153969] mb-4">Divisi Produksi</h3>
                        <div className="space-y-2">
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Fatah Yasin</div>
                            <div className="text-sm text-gray-600">Design</div>
                          </div>
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Rinaldi</div>
                            <div className="text-sm text-gray-600">QC Mesin</div>
                          </div>
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Sabarno</div>
                            <div className="text-sm text-gray-600">QC Produksi</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Operasional Team */}
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-[#153969] mb-4">Divisi Operasional</h3>
                        <div className="space-y-2">
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Paulina</div>
                            <div className="text-sm text-gray-600">Pajak</div>
                          </div>
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Akunting</div>
                            <div className="text-sm text-gray-600">QC Mesin</div>
                          </div>
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Rinaldi</div>
                            <div className="text-sm text-gray-600">QC Mesin</div>
                          </div>
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Paulina</div>
                            <div className="text-sm text-gray-600">Pembukuan</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Support Team */}
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-[#153969] mb-4">Support</h3>
                        <div className="space-y-2">
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Hotlen</div>
                            <div className="text-sm text-gray-600">Gudang</div>
                          </div>
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Sarah</div>
                            <div className="text-sm text-gray-600">Admin</div>
                          </div>
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Sudung</div>
                            <div className="text-sm text-gray-600">Driver</div>
                          </div>
                          <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <div className="font-medium">Simon</div>
                            <div className="text-sm text-gray-600">Kurir</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <button 
                  onClick={() => setShowFullStructure(!showFullStructure)}
                  className="flex items-center gap-2 mt-8 px-6 py-3 bg-white text-[#153969] rounded-md font-medium border border-[#153969] hover:bg-[#153969] hover:text-white transition-colors"
                >
                  {showFullStructure ? 'Tampilkan Lebih Sedikit' : 'Tampilkan Semua Tim'}
                  {showFullStructure ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#153969] mb-4">Nilai-Nilai Perusahaan</h2>
            <div className="w-16 h-1 bg-[#153969] mx-auto mb-6"></div>
            <p className="text-gray-700">
              Nilai-nilai inti yang membentuk budaya kerja dan pendekatan kami terhadap setiap proyek.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#153969]"
            >
              <div className="text-[#153969] text-4xl font-bold mb-3">01</div>
              <h3 className="text-xl font-bold text-[#153969] mb-3">Integritas</h3>
              <p className="text-gray-700">
                Kami berkomitmen pada standar etika tertinggi, transparansi, dan kejujuran dalam setiap aspek pekerjaan kami.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#153969]"
            >
              <div className="text-[#153969] text-4xl font-bold mb-3">02</div>
              <h3 className="text-xl font-bold text-[#153969] mb-3">Kualitas</h3>
              <p className="text-gray-700">
                Kami selalu berupaya melampaui ekspektasi dengan menghasilkan pekerjaan berkualitas tinggi dan fokus pada detail.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#153969]"
            >
              <div className="text-[#153969] text-4xl font-bold mb-3">03</div>
              <h3 className="text-xl font-bold text-[#153969] mb-3">Inovasi</h3>
              <p className="text-gray-700">
                Kami terus mengembangkan metode dan pendekatan baru untuk menghadirkan solusi yang lebih efektif dan efisien.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#153969] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Performa Kami</h2>
            <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg opacity-90">
              Kami berkomitmen untuk memberikan pelayanan terbaik dalam setiap proyek
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20"
              >
                <stat.icon className="w-10 h-10 text-white/80 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#153969] mb-4">Lokasi Kantor</h2>
            <div className="w-16 h-1 bg-[#153969] mx-auto mb-6"></div>
            <p className="text-gray-700">
              Temui tim kami di kantor pusat atau hubungi kami untuk informasi lebih lanjut.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-[#153969] mb-4">{officeLocation.name}</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#153969] mr-3 flex-shrink-0 mt-0.5" />
                    <p>{officeLocation.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-[#153969] mr-3 flex-shrink-0" />
                    <p>+6281218127503</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[#153969] mr-3 flex-shrink-0" />
                    <p>karyabangunsemestas@gmail.com</p>
                  </div>
                </div>
                <div className="mt-6">
                  <a 
                    href="https://wa.me/6281218127503?text=Halo%20saya%20tertarik%20dengan%20layanan%20konstruksi%20Anda"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#153969] text-white rounded-md font-medium hover:bg-[#0f2a4d] transition-colors"
                  >
                    Hubungi Kami
                  </a>
                </div>
              </div>
              <div className="relative h-64 md:h-auto md:min-h-[300px] bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2834932646466!2d106.89975071087225!3d-6.225636261092377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3303cf04dc1%3A0x7db6f4ab01ecd3e7!2sJl.%20Raya%20Jatiwaringin%20No.06%202%2C%20RT.2%2FRW.13%2C%20Cipinang%20Melayu%2C%20Kec.%20Makasar%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2013620!5e0!3m2!1sen!2sid!4v1710817200055!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .pattern-grid {
          background-image: radial-gradient(#ffffff 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default TeamPage;