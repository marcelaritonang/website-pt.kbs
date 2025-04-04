'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, Briefcase, Users, ChevronRight, GraduationCap, Award, Target, Heart } from 'lucide-react';
import Image from 'next/image';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Data content
const benefits = [
  {
    icon: <Award className="w-8 h-8" />,
    title: "Pengembangan Karir",
    description: "Program pelatihan berkala dan jenjang karir yang jelas untuk pertumbuhan profesional Anda"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Kesejahteraan",
    description: "Paket remunerasi kompetitif, asuransi kesehatan, dan berbagai tunjangan menarik"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Proyek Bergengsi",
    description: "Kesempatan terlibat dalam proyek-proyek infrastruktur berskala nasional"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Budaya Kolaboratif",
    description: "Lingkungan kerja yang mendukung inovasi dan kolaborasi antar tim"
  }
];

const jobOpenings = [
  {
    title: "Site Engineer",
    type: "Full Time",
    location: "Jakarta",
    department: "Construction",
    experience: "1-2 tahun",
    education: "S1 Teknik Sipil",
    description: "Bertanggung jawab untuk mengawasi dan mengelola proyek konstruksi di lapangan.",
    requirements: [
      "Minimal S1 Teknik Sipil",
      "Pengalaman 1-2 tahun di bidang konstruksi",
      "Memahami standard K3",
      "Mampu membaca gambar teknik",
      "Memiliki leadership yang baik",
      "Mampu bekerja dalam tim"
    ]
  },
  {
    title: "Project Manager",
    type: "Full Time",
    location: "Jakarta",
    department: "Project Management",
    experience: "2-4 tahun",
    education: "S1 Teknik Sipil/Arsitektur",
    description: "Memimpin dan mengelola keseluruhan aspek proyek konstruksi.",
    requirements: [
      "Minimal S1 Teknik Sipil/Arsitektur",
      "Pengalaman 2-4 tahun dalam project management",
      "Sertifikasi PMP/PMI lebih disukai",
      "Kemampuan kepemimpinan yang kuat",
      "Excellent communication skills",
      "Problem solving & analytical thinking"
    ]
  }
];

export default function CareerPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-[#153969] overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/construction1.jpg"
            alt="Career Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Bergabung dan Berkembang
                <span className="block mt-2">Bersama KBS</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Mari menjadi bagian dari tim yang berdedikasi dalam membangun masa depan infrastruktur Indonesia.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Custom Wave with SVG */}
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Bergabung dengan KBS?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami menawarkan lingkungan kerja yang mendukung pertumbuhan profesional dan personal Anda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-[#1E4D2B] mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Posisi yang Tersedia</h2>
            <p className="text-lg text-gray-600">Temukan peluang karir yang sesuai dengan passion Anda</p>
          </motion.div>

          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {job.type}
                      </span>
                      <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </span>
                      <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4 mr-2" />
                        {job.experience}
                      </span>
                      <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {job.education}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">{job.description}</p>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-[#1E4D2B] text-white rounded-lg hover:bg-[#153969] transition-colors"
                    onClick={() => window.location.href = 'mailto:karir@kbs.co.id'}
                  >
                    Lamar Sekarang
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Persyaratan:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {job.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="mt-1.5 w-1.5 h-1.5 bg-[#1E4D2B] rounded-full"></div>
                        <span className="text-gray-600">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#153969] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Tidak menemukan posisi yang sesuai?
            </h2>
            <p className="text-gray-300 mb-8">
              Kirimkan CV Anda untuk kesempatan di masa mendatang
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-[#153969] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              onClick={() => window.location.href = 'mailto:karir@kbs.co.id'}
            >
              Kirim CV Anda
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}