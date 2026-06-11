'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Activity, AlertTriangle, BarChart3, Brain, Camera, Cloud,
  Database, Globe, Layers, Lock, Monitor, Radio, Shield,
  Thermometer, TrendingUp, Wifi, Zap, ArrowRight, CheckCircle2,
  Clock, Eye, Gauge, MapPin, Server, Cpu, Bell, LineChart
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

// Simulated real-time data
function useSimulatedData() {
  const [data, setData] = useState({
    activeWorkers: 47,
    safetyScore: 94.2,
    equipmentUtil: 78,
    weatherRisk: 'Low',
    activeAlerts: 2,
    dataPoints: 1247893,
    apiCalls: 34521,
    latency: 42,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        activeWorkers: prev.activeWorkers + Math.floor(Math.random() * 3) - 1,
        safetyScore: Math.min(100, Math.max(85, prev.safetyScore + (Math.random() - 0.5) * 0.3)),
        equipmentUtil: Math.min(100, Math.max(60, prev.equipmentUtil + Math.floor(Math.random() * 5) - 2)),
        weatherRisk: prev.weatherRisk,
        activeAlerts: Math.max(0, prev.activeAlerts + (Math.random() > 0.8 ? 1 : 0) - (Math.random() > 0.7 ? 1 : 0)),
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 50),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 10),
        latency: Math.max(20, Math.min(80, prev.latency + Math.floor(Math.random() * 10) - 5)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return data;
}

export default function AiIntelligencePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { language } = useLanguage();
  const isEn = language === 'en';
  const data = useSimulatedData();

  const aiFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: isEn ? 'Predictive Delay Detection' : 'Prediksi Keterlambatan',
      desc: isEn
        ? 'Machine learning model trained on 10,000+ Indonesian construction projects. Predicts delays 2-4 weeks before they happen with 87% accuracy.'
        : 'Model machine learning dilatih dari 10.000+ proyek konstruksi Indonesia. Memprediksi keterlambatan 2-4 minggu sebelum terjadi dengan akurasi 87%.',
      tech: ['TensorFlow', 'PostgreSQL', 'Python'],
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: isEn ? 'Computer Vision Safety' : 'Computer Vision Keselamatan',
      desc: isEn
        ? 'Real-time CCTV analysis for PPE compliance, unsafe behavior detection, and zone violation alerts. Processes 30fps across 8 camera feeds simultaneously.'
        : 'Analisis CCTV real-time untuk kepatuhan APD, deteksi perilaku tidak aman, dan alert pelanggaran zona. Memproses 30fps dari 8 feed kamera secara bersamaan.',
      tech: ['OpenCV', 'YOLO v8', 'WebSocket'],
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: isEn ? 'IoT Environmental Monitoring' : 'IoT Monitoring Lingkungan',
      desc: isEn
        ? 'Sensor network for temperature, humidity, wind speed, noise levels, and air quality. Automatic work stoppage triggers when conditions exceed safety thresholds.'
        : 'Jaringan sensor untuk suhu, kelembaban, kecepatan angin, kebisingan, dan kualitas udara. Trigger penghentian kerja otomatis saat kondisi melebihi ambang keselamatan.',
      tech: ['MQTT', 'InfluxDB', 'Grafana'],
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: isEn ? 'Budget Intelligence' : 'Budget Intelligence',
      desc: isEn
        ? 'AI-powered cost forecasting that learns from market trends, supplier pricing patterns, and seasonal material cost fluctuations across Indonesia.'
        : 'Forecasting biaya berbasis AI yang belajar dari tren pasar, pola harga supplier, dan fluktuasi biaya material musiman di seluruh Indonesia.',
      tech: ['Prophet', 'Redis', 'REST API'],
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: isEn ? 'GPS Fleet Tracking' : 'GPS Fleet Tracking',
      desc: isEn
        ? 'Real-time heavy equipment location, route optimization, fuel consumption analytics, and maintenance prediction based on usage patterns.'
        : 'Lokasi alat berat real-time, optimasi rute, analitik konsumsi BBM, dan prediksi maintenance berdasarkan pola penggunaan.',
      tech: ['MapBox', 'PostGIS', 'Node.js'],
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: isEn ? 'Progress Analytics Engine' : 'Progress Analytics Engine',
      desc: isEn
        ? 'Automated progress measurement using drone imagery, BIM comparison, and earned value analysis. Daily reports generated without manual input.'
        : 'Pengukuran progress otomatis menggunakan citra drone, perbandingan BIM, dan analisis earned value. Laporan harian tanpa input manual.',
      tech: ['Three.js', 'S3', 'WebGL'],
    },
  ];

  const architecture = [
    { icon: <Globe className="w-5 h-5" />, label: 'Next.js Frontend', desc: isEn ? 'SSR + Client Hydration' : 'SSR + Client Hydration' },
    { icon: <Server className="w-5 h-5" />, label: 'Node.js API', desc: isEn ? 'Express + GraphQL' : 'Express + GraphQL' },
    { icon: <Database className="w-5 h-5" />, label: 'PostgreSQL + Redis', desc: isEn ? 'Relational + Cache' : 'Relational + Cache' },
    { icon: <Cpu className="w-5 h-5" />, label: 'Python ML Service', desc: isEn ? 'TensorFlow + FastAPI' : 'TensorFlow + FastAPI' },
    { icon: <Radio className="w-5 h-5" />, label: 'WebSocket Server', desc: isEn ? 'Real-time Events' : 'Real-time Events' },
    { icon: <Cloud className="w-5 h-5" />, label: 'AWS Infrastructure', desc: isEn ? 'ECS + S3 + CloudFront' : 'ECS + S3 + CloudFront' },
    { icon: <Lock className="w-5 h-5" />, label: 'Auth & Security', desc: isEn ? 'JWT + OAuth 2.0 + RBAC' : 'JWT + OAuth 2.0 + RBAC' },
    { icon: <Wifi className="w-5 h-5" />, label: 'IoT Gateway', desc: isEn ? 'MQTT Broker + Edge' : 'MQTT Broker + Edge' },
  ];

  const metrics = [
    { label: isEn ? 'Active Workers' : 'Pekerja Aktif', value: data.activeWorkers, suffix: '', icon: <Activity className="w-4 h-4" />, color: 'text-green-400' },
    { label: isEn ? 'Safety Score' : 'Skor Keselamatan', value: data.safetyScore.toFixed(1), suffix: '%', icon: <Shield className="w-4 h-4" />, color: 'text-blue-400' },
    { label: isEn ? 'Equipment Utilization' : 'Utilisasi Alat', value: data.equipmentUtil, suffix: '%', icon: <Gauge className="w-4 h-4" />, color: 'text-purple-400' },
    { label: isEn ? 'API Latency' : 'Latensi API', value: data.latency, suffix: 'ms', icon: <Zap className="w-4 h-4" />, color: 'text-yellow-400' },
  ];

  return (
    <div className={isDark ? 'bg-gray-900' : 'bg-white'}>

      {/* Hero */}
      <section className={`pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-950'}`}>
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-blue-300 font-medium">
                  {isEn ? 'Live System — Processing' : 'Sistem Live — Memproses'} {data.dataPoints.toLocaleString()} {isEn ? 'data points' : 'data points'}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
                AI Site Intelligence
              </h1>
              <p className="text-lg md:text-xl mb-4 text-blue-200">
                {isEn
                  ? 'Real-time construction monitoring powered by artificial intelligence.'
                  : 'Monitoring konstruksi real-time diperkuat kecerdasan buatan.'}
              </p>
              <p className="text-base mb-8 leading-relaxed text-gray-400 max-w-2xl">
                {isEn
                  ? 'Predictive analytics, computer vision safety monitoring, IoT environmental sensors, and automated progress measurement — built on enterprise-grade infrastructure.'
                  : 'Predictive analytics, monitoring keselamatan computer vision, sensor IoT lingkungan, dan pengukuran progress otomatis — dibangun di atas infrastruktur enterprise-grade.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/platform/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  {isEn ? 'Request Demo' : 'Minta Demo'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tech"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
                >
                  {isEn ? 'View Platform' : 'Lihat Platform'}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Dashboard Preview */}
      <section className={`py-12 border-y ${isDark ? 'bg-gray-800/50 border-gray-800' : 'bg-gray-900 border-gray-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800/80 border border-gray-700 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={m.color}>{m.icon}</span>
                  <span className="text-xs text-gray-400">{m.label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{m.value}</span>
                  <span className="text-sm text-gray-500">{m.suffix}</span>
                </div>
                <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      i === 0 ? 'bg-green-400' : i === 1 ? 'bg-blue-400' : i === 2 ? 'bg-purple-400' : 'bg-yellow-400'
                    }`}
                    initial={{ width: '0%' }}
                    animate={{ width: `${typeof m.value === 'number' ? Math.min(m.value, 100) : parseFloat(String(m.value))}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-4">
            {isEn ? '↑ Live simulated data — refreshes every 2 seconds' : '↑ Data simulasi live — refresh setiap 2 detik'}
          </p>
        </div>
      </section>

      {/* AI Features */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-950'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              {isEn ? 'AI-Powered Intelligence' : 'Kecerdasan Berbasis AI'}
            </h2>
            <p className="text-base max-w-2xl text-gray-400">
              {isEn
                ? 'Six core AI modules that transform raw construction data into actionable insights and automated decisions.'
                : 'Enam modul AI inti yang mengubah data konstruksi mentah menjadi insight dan keputusan otomatis.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold mb-2 text-white">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400 mb-4">
                  {f.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {f.tech.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded-md bg-gray-700 text-gray-300 border border-gray-600">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-800/30' : 'bg-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              {isEn ? 'System Architecture' : 'Arsitektur Sistem'}
            </h2>
            <p className="text-base max-w-2xl text-gray-400">
              {isEn
                ? 'Microservices architecture designed for real-time data processing, horizontal scaling, and 99.9% uptime.'
                : 'Arsitektur microservices dirancang untuk pemrosesan data real-time, scaling horizontal, dan uptime 99.9%.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {architecture.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="p-4 rounded-xl bg-gray-800 border border-gray-700 text-center"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 bg-blue-500/10 text-blue-400">
                  {item.icon}
                </div>
                <p className="text-xs font-semibold text-white mb-0.5">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Architecture diagram text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-xl bg-gray-800/50 border border-gray-700 font-mono text-xs text-gray-400 overflow-x-auto"
          >
            <pre className="whitespace-pre">
{`┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                                │
│  Next.js SSR  │  React SPA  │  PWA Mobile  │  REST/GraphQL API  │
├─────────────────────────────────────────────────────────────────┤
│                      API GATEWAY                                 │
│  Rate Limiting  │  JWT Auth  │  RBAC  │  Request Routing         │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│  Project Svc │  Material    │  Equipment   │  Analytics Svc     │
│  (Node.js)   │  Svc (Node)  │  Svc (Node)  │  (Python/FastAPI)  │
├──────────────┴──────────────┴──────────────┴────────────────────┤
│                    MESSAGE QUEUE (Redis Pub/Sub)                  │
├──────────────┬──────────────┬───────────────────────────────────┤
│  PostgreSQL  │  InfluxDB    │  S3 Object Storage                │
│  (Primary DB)│  (Time-series)│  (Files, Images, Models)         │
├──────────────┴──────────────┴───────────────────────────────────┤
│                    INFRASTRUCTURE                                 │
│  AWS ECS  │  CloudFront CDN  │  WebSocket  │  MQTT IoT Gateway  │
└─────────────────────────────────────────────────────────────────┘`}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Data Pipeline */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-950'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              {isEn ? 'Data Pipeline' : 'Pipeline Data'}
            </h2>
            <p className="text-base max-w-2xl text-gray-400">
              {isEn
                ? 'From raw sensor data to actionable intelligence in under 500ms.'
                : 'Dari data sensor mentah ke intelligence yang actionable dalam kurang dari 500ms.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '1', title: isEn ? 'Ingest' : 'Ingest', desc: isEn ? 'IoT sensors, cameras, GPS, manual input' : 'Sensor IoT, kamera, GPS, input manual', icon: <Radio className="w-5 h-5" /> },
              { step: '2', title: isEn ? 'Process' : 'Proses', desc: isEn ? 'Stream processing, validation, enrichment' : 'Stream processing, validasi, enrichment', icon: <Cpu className="w-5 h-5" /> },
              { step: '3', title: isEn ? 'Analyze' : 'Analisis', desc: isEn ? 'ML inference, pattern detection, anomalies' : 'ML inference, deteksi pola, anomali', icon: <Brain className="w-5 h-5" /> },
              { step: '4', title: isEn ? 'Decide' : 'Keputusan', desc: isEn ? 'Rule engine, thresholds, auto-actions' : 'Rule engine, threshold, aksi otomatis', icon: <Zap className="w-5 h-5" /> },
              { step: '5', title: isEn ? 'Alert' : 'Alert', desc: isEn ? 'Push notifications, SMS, dashboard update' : 'Push notifikasi, SMS, update dashboard', icon: <Bell className="w-5 h-5" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-4 rounded-xl bg-gray-800 border border-gray-700 text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                  {item.step}
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 mt-2 bg-blue-500/10 text-blue-400">
                  {item.icon}
                </div>
                <p className="text-xs font-semibold text-white mb-1">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* System stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: isEn ? 'Events/Second' : 'Events/Detik', value: '12,000+' },
              { label: isEn ? 'Processing Latency' : 'Latensi Proses', value: '<500ms' },
              { label: isEn ? 'Data Retention' : 'Retensi Data', value: '5 Years' },
              { label: isEn ? 'Availability' : 'Ketersediaan', value: '99.9%' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 text-center">
                <p className="text-lg font-bold text-blue-400">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-800/30' : 'bg-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              {isEn ? 'Security & Compliance' : 'Keamanan & Kepatuhan'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Lock className="w-5 h-5" />, title: 'End-to-End Encryption', desc: isEn ? 'AES-256 at rest, TLS 1.3 in transit' : 'AES-256 saat diam, TLS 1.3 saat transit' },
              { icon: <Shield className="w-5 h-5" />, title: 'Role-Based Access Control', desc: isEn ? 'Granular permissions per project, team, feature' : 'Permission granular per proyek, tim, fitur' },
              { icon: <Eye className="w-5 h-5" />, title: 'Audit Trail', desc: isEn ? 'Complete activity logging with 5-year retention' : 'Logging aktivitas lengkap dengan retensi 5 tahun' },
              { icon: <Database className="w-5 h-5" />, title: 'Automated Backups', desc: isEn ? 'Point-in-time recovery, cross-region replication' : 'Point-in-time recovery, replikasi cross-region' },
              { icon: <Globe className="w-5 h-5" />, title: 'Data Residency', desc: isEn ? 'Data stored in Indonesia (ap-southeast-1)' : 'Data disimpan di Indonesia (ap-southeast-1)' },
              { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Compliance', desc: isEn ? 'SOC 2 Type II ready, ISO 27001 aligned' : 'SOC 2 Type II ready, ISO 27001 aligned' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-3 p-4 rounded-xl bg-gray-800 border border-gray-700"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-green-500/10 text-green-400">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-950'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500/30">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {isEn ? 'Ready to bring AI to your construction site?' : 'Siap membawa AI ke proyek konstruksi Anda?'}
            </h2>
            <p className="text-base mb-8 text-blue-100/80">
              {isEn
                ? 'Join the future of construction management. AI Site Intelligence is available as an add-on to BangunHub Pro and Enterprise plans.'
                : 'Bergabung dengan masa depan manajemen konstruksi. AI Site Intelligence tersedia sebagai add-on untuk paket BangunHub Pro dan Enterprise.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/platform/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
              >
                {isEn ? 'Request Demo' : 'Minta Demo'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/6281218127503"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
              >
                {isEn ? 'Talk to Engineering Team' : 'Bicara dengan Tim Engineering'}
              </a>
            </div>
            <p className="text-xs mt-6 text-blue-200/40">
              Built by the engineering team at PT Karya Bangun Semesta · Jakarta, Indonesia
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
