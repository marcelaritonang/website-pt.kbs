'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, Briefcase, Users, ChevronRight, GraduationCap, Award, Target, Heart } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function CareerPage() {
  // Get language and theme from context
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Data content with translations
  const benefits = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Pengembangan Karir",
      title_en: "Career Development",
      description: "Program pelatihan berkala dan jenjang karir yang jelas untuk pertumbuhan profesional Anda",
      description_en: "Regular training programs and clear career paths for your professional growth"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Kesejahteraan",
      title_en: "Welfare",
      description: "Paket remunerasi kompetitif, asuransi kesehatan, dan berbagai tunjangan menarik",
      description_en: "Competitive remuneration package, health insurance, and various attractive benefits"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Proyek Bergengsi",
      title_en: "Prestigious Projects",
      description: "Kesempatan terlibat dalam proyek-proyek infrastruktur berskala nasional",
      description_en: "Opportunities to be involved in national-scale infrastructure projects"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Budaya Kolaboratif",
      title_en: "Collaborative Culture",
      description: "Lingkungan kerja yang mendukung inovasi dan kolaborasi antar tim",
      description_en: "Work environment that supports innovation and cross-team collaboration"
    }
  ];

  const jobOpenings = [
    {
      title: "Site Engineer",
      title_en: "Site Engineer",
      type: "Full Time",
      type_en: "Full Time",
      location: "Jakarta",
      department: "Construction",
      department_en: "Construction",
      experience: "1-2 tahun",
      experience_en: "1-2 years",
      education: "S1 Teknik Sipil",
      education_en: "Bachelor's in Civil Engineering",
      description: "Bertanggung jawab untuk mengawasi dan mengelola proyek konstruksi di lapangan.",
      description_en: "Responsible for supervising and managing construction projects in the field.",
      requirements: [
        "Minimal S1 Teknik Sipil",
        "Pengalaman 1-2 tahun di bidang konstruksi",
        "Memahami standard K3",
        "Mampu membaca gambar teknik",
        "Memiliki leadership yang baik",
        "Mampu bekerja dalam tim"
      ],
      requirements_en: [
        "Minimum Bachelor's in Civil Engineering",
        "1-2 years of experience in construction",
        "Understands HSE standards",
        "Able to read technical drawings",
        "Good leadership skills",
        "Able to work in a team"
      ]
    },
    {
      title: "Project Manager",
      title_en: "Project Manager",
      type: "Full Time",
      type_en: "Full Time",
      location: "Jakarta",
      department: "Project Management",
      department_en: "Project Management",
      experience: "2-4 tahun",
      experience_en: "2-4 years",
      education: "S1 Teknik Sipil/Arsitektur",
      education_en: "Bachelor's in Civil Engineering/Architecture",
      description: "Memimpin dan mengelola keseluruhan aspek proyek konstruksi.",
      description_en: "Lead and manage all aspects of construction projects.",
      requirements: [
        "Minimal S1 Teknik Sipil/Arsitektur",
        "Pengalaman 2-4 tahun dalam project management",
        "Sertifikasi PMP/PMI lebih disukai",
        "Kemampuan kepemimpinan yang kuat",
        "Excellent communication skills",
        "Problem solving & analytical thinking"
      ],
      requirements_en: [
        "Minimum Bachelor's in Civil Engineering/Architecture",
        "2-4 years of experience in project management",
        "PMP/PMI certification preferred",
        "Strong leadership abilities",
        "Excellent communication skills",
        "Problem solving & analytical thinking"
      ]
    }
  ];

  return (
    <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-colors duration-300`}>
      {/* Hero Section */}
      <section className={`relative h-[80vh] ${isDark ? 'bg-blue-900' : 'bg-[#153969]'} overflow-hidden transition-colors duration-300`}>
        {/* Background Image with Parallax */}
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/construction1.jpg"
            alt={language === 'en' ? "Career Background" : "Latar Belakang Karir"}
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
                {language === 'en' ? (
                  <>
                    Join and Grow
                    <span className="block mt-2">With KBS</span>
                  </>
                ) : (
                  <>
                    Bergabung dan Berkembang
                    <span className="block mt-2">Bersama KBS</span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                {language === 'en' 
                  ? "Become part of a dedicated team in building the future of Indonesia's infrastructure."
                  : "Mari menjadi bagian dari tim yang berdedikasi dalam membangun masa depan infrastruktur Indonesia."}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Custom Wave with SVG */}
          <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden">
            <svg
              className="w-full h-[100px]"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C320,80 440,60 720,40 C960,20 1200,80 1440,80 L1440,100 L0,100 Z"
                className={isDark ? 'fill-gray-900' : 'fill-white'}
                // Atau jika Anda ingin gelombang terlihat putih di mode terang dan biru gelap di mode gelap:
                // className={isDark ? 'fill-gray-900' : 'fill-white'}
              />
            </svg>
          </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
              {language === 'en' ? "Why Join KBS?" : "Mengapa Bergabung dengan KBS?"}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto transition-colors duration-300`}>
              {language === 'en' 
                ? "We offer a work environment that supports your professional and personal growth"
                : "Kami menawarkan lingkungan kerja yang mendukung pertumbuhan profesional dan personal Anda"}
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
                className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl ${isDark ? 'shadow-none' : 'shadow-md'} hover:shadow-xl transition-shadow`}
              >
                <div className={`${isDark ? 'text-blue-400' : 'text-[#1E4D2B]'} mb-4 transition-colors duration-300`}>{benefit.icon}</div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 transition-colors duration-300`}>
                  {language === 'en' ? benefit.title_en : benefit.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
                  {language === 'en' ? benefit.description_en : benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
              {language === 'en' ? "Available Positions" : "Posisi yang Tersedia"}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
              {language === 'en' ? "Find career opportunities that match your passion" : "Temukan peluang karir yang sesuai dengan passion Anda"}
            </p>
          </motion.div>

          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 hover:shadow-xl transition-all`}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div className="flex-1">
                    <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-300`}>
                      {language === 'en' ? job.title_en : job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className={`flex items-center text-sm ${isDark ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-100'} px-3 py-1 rounded-full transition-colors duration-300`}>
                        <Briefcase className="w-4 h-4 mr-2" />
                        {language === 'en' ? job.type_en : job.type}
                      </span>
                      <span className={`flex items-center text-sm ${isDark ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-100'} px-3 py-1 rounded-full transition-colors duration-300`}>
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </span>
                      <span className={`flex items-center text-sm ${isDark ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-100'} px-3 py-1 rounded-full transition-colors duration-300`}>
                        <Clock className="w-4 h-4 mr-2" />
                        {language === 'en' ? job.experience_en : job.experience}
                      </span>
                      <span className={`flex items-center text-sm ${isDark ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-100'} px-3 py-1 rounded-full transition-colors duration-300`}>
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {language === 'en' ? job.education_en : job.education}
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 transition-colors duration-300`}>
                      {language === 'en' ? job.description_en : job.description}
                    </p>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center px-6 py-3 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#1E4D2B] hover:bg-[#153969]'} text-white rounded-lg transition-colors duration-300`}
                    onClick={() => window.location.href = 'mailto:karir@kbs.co.id'}
                  >
                    {language === 'en' ? "Apply Now" : "Lamar Sekarang"}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>

                <div className={`mt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} pt-6 transition-colors duration-300`}>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
                    {language === 'en' ? "Requirements:" : "Persyaratan:"}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(language === 'en' ? job.requirements_en : job.requirements).map((req, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className={`mt-1.5 w-1.5 h-1.5 ${isDark ? 'bg-blue-400' : 'bg-[#1E4D2B]'} rounded-full transition-colors duration-300`}></div>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>{req}</span>
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
      <section className={`${isDark ? 'bg-blue-900/8' : 'bg-[#153969]'} py-16 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === 'en' ? "Didn't find a suitable position?" : "Tidak menemukan posisi yang sesuai?"}
            </h2>
            <p className="text-gray-300 mb-8">
              {language === 'en' ? "Send your CV for future opportunities" : "Kirimkan CV Anda untuk kesempatan di masa mendatang"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-[#153969] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              onClick={() => window.location.href = 'mailto:karir@kbs.co.id'}
            >
              {language === 'en' ? "Send Your CV" : "Kirim CV Anda"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}