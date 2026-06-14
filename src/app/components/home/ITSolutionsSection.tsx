'use client';

import { motion } from 'framer-motion';
import { Code2, Brain, Monitor, Workflow, Database, Cloud, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function ITSolutionsSection() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEn = language === 'en';

  const solutions = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: isEn ? 'Web & Mobile Development' : 'Web & Mobile Development',
      desc: isEn
        ? 'Custom web apps and PWAs built with Next.js, React, and TypeScript. Client portals, dashboards, and field-worker mobile apps.'
        : 'Web app custom dan PWA dibangun dengan Next.js, React, dan TypeScript. Portal klien, dashboard, dan aplikasi mobile pekerja lapangan.',
      tags: ['Next.js', 'React', 'TypeScript', 'PWA'],
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: isEn ? 'AI & Machine Learning' : 'AI & Machine Learning',
      desc: isEn
        ? 'Predictive models for project delays, computer vision for site safety, and NLP chatbots for automated reporting.'
        : 'Model prediktif untuk keterlambatan proyek, computer vision untuk keselamatan site, dan chatbot NLP untuk pelaporan otomatis.',
      tags: ['TensorFlow', 'Python', 'YOLO', 'FastAPI'],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: isEn ? 'Data Platform & Analytics' : 'Data Platform & Analytics',
      desc: isEn
        ? 'Real-time data pipelines, IoT sensor integration, and business intelligence dashboards for construction operations.'
        : 'Data pipeline real-time, integrasi sensor IoT, dan dashboard business intelligence untuk operasi konstruksi.',
      tags: ['PostgreSQL', 'Redis', 'InfluxDB', 'Grafana'],
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: isEn ? 'Cloud Infrastructure' : 'Cloud Infrastructure',
      desc: isEn
        ? 'Scalable microservices on AWS, CI/CD automation, container orchestration, and 99.9% uptime SLA.'
        : 'Microservices scalable di AWS, otomasi CI/CD, orkestrasi container, dan SLA uptime 99.9%.',
      tags: ['AWS', 'Docker', 'GitHub Actions', 'Terraform'],
    },
  ];

  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-8 h-[2px] ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
            <span className={`text-sm font-medium tracking-wider uppercase ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {isEn ? 'Technology Division' : 'Divisi Teknologi'}
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEn ? 'IT Solutions & Digital Products' : 'Solusi IT & Produk Digital'}
          </h2>
          <p className={`text-base max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isEn
              ? 'We\'re not just a construction company. Our in-house engineering team builds the software that powers modern construction — from project tracking to AI-driven safety systems.'
              : 'Kami bukan sekadar perusahaan konstruksi. Tim engineering internal kami membangun software yang menggerakkan konstruksi modern — dari project tracking hingga sistem keselamatan berbasis AI.'}
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/30'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${
                isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                {s.icon}
              </div>
              <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {s.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag, j) => (
                  <span
                    key={j}
                    className={`text-xs px-2 py-0.5 rounded-md ${
                      isDark
                        ? 'bg-gray-700 text-gray-300 border border-gray-600'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-6 md:p-8 rounded-xl border ${
            isDark
              ? 'bg-gradient-to-r from-blue-900/30 to-gray-800/50 border-blue-500/20'
              : 'bg-gradient-to-r from-blue-50 to-white border-blue-200'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Code2 className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {isEn ? 'Our Flagship Product' : 'Produk Unggulan'}
                </span>
              </div>
              <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                BangunHub — Construction Management Platform
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {isEn
                  ? 'All-in-one SaaS for project tracking, material procurement, equipment booking, and real-time analytics. Used by 50+ contractors.'
                  : 'SaaS all-in-one untuk tracking proyek, pengadaan material, booking alat berat, dan analitik real-time. Digunakan 50+ kontraktor.'}
              </p>
            </div>
            <Link
              href="/tech"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                isDark
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isEn ? 'View Platform' : 'Lihat Platform'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '6+', label: isEn ? 'Engineers on team' : 'Engineer di tim' },
            { value: '50+', label: isEn ? 'Contractors using our platform' : 'Kontraktor pakai platform kami' },
            { value: '3', label: isEn ? 'Active SaaS products' : 'Produk SaaS aktif' },
            { value: '24/7', label: isEn ? 'System monitoring' : 'Monitoring sistem' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`text-center p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}
            >
              <p className={`text-xl md:text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {stat.value}
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
