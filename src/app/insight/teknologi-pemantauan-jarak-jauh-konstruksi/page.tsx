'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Interface untuk konten artikel
interface ContentBlock {
  type: 'paragraph' | 'subheading' | 'image' | 'list' | 'quote';
  content?: string;
  url?: string;
  caption?: string;
  items?: string[];
  author?: string;
}

interface RelatedArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
}

// Component untuk Lightbox (tampilan gambar yang diperbesar)
const ImageLightbox = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  caption 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  imageUrl: string; 
  caption?: string;
}) => {
  // Menangani klik tombol escape untuk menutup
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Mencegah scroll pada body
      window.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.body.style.overflow = 'auto'; // Mengembalikan scroll pada body
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[80vh] w-full">
              <Image
                src={imageUrl}
                alt={caption || "Gambar yang diperbesar"}
                fill
                quality={100}
                className="object-contain"
              />
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            
            {caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 text-white text-center">
                {caption}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Data artikel tentang teknologi pemantauan jarak jauh
const remoteMonitoringArticle = {
  id: 5,
  title: "Teknologi Pemantauan Jarak Jauh untuk Pengelolaan Proyek",
  excerpt: "Solusi teknologi terkini untuk mengawasi dan mengelola beberapa proyek konstruksi secara bersamaan.",
  category: "Teknologi",
  image: "/images/berita5/gambar2-b5.png",  
  date: "25 Januari 2024",
  readTime: "5 menit",
  author: "Admin Insight",
  authorRole: "Editor Teknologi Konstruksi",
  authorImage: "/images/logo-kbs.png",
  slug: "teknologi-pemantauan-jarak-jauh-konstruksi",
  content: [
    {
      type: "paragraph",
      content: "Industri konstruksi di Indonesia saat ini menghadapi tantangan yang semakin kompleks dalam mengelola beberapa proyek secara bersamaan, terutama ketika lokasi proyek tersebar di berbagai wilayah geografis. Di era digital ini, teknologi pemantauan jarak jauh (remote monitoring) muncul sebagai solusi yang menawarkan efisiensi dan kontrol yang lebih baik bagi para pengelola proyek konstruksi."
    },
    {
      type: "paragraph",
      content: "Sistem pemantauan jarak jauh memungkinkan manajer proyek, pengawas lapangan, dan pemangku kepentingan lainnya untuk mengakses informasi proyek secara real-time, memantau progress, dan membuat keputusan berbasis data tanpa harus berada di lokasi fisik. Menurut survei terbaru dari Asosiasi Kontraktor Indonesia, perusahaan yang mengadopsi teknologi pemantauan jarak jauh melaporkan peningkatan efisiensi proyek hingga 23% dibandingkan metode tradisional."
    },
    {
      type: "image",
      url: "/images/berita5/gambar1-b5.png",
      caption: "Contoh dashboard sistem pemantauan proyek real-time yang semakin umum digunakan dalam industri konstruksi"
    },
    {
      type: "subheading",
      content: "Teknologi Kunci dalam Pemantauan Proyek Jarak Jauh"
    },
    {
      type: "paragraph",
      content: "Berdasarkan studi yang dilakukan oleh Institut Teknologi Konstruksi Indonesia, berikut adalah beberapa teknologi kunci yang terbukti efektif dalam meningkatkan pengelolaan proyek konstruksi di era digital:"
    },
    {
      type: "list",
      items: [
        "IoT dan Sensor Terpadu: Perangkat Internet of Things (IoT) yang ditempatkan di berbagai titik strategis lokasi proyek dapat mengumpulkan data secara kontinu tentang kondisi lingkungan, penggunaan material, operasi peralatan, dan parameter penting lainnya.",
        "Drone dan Fotogrametri: Drone dilengkapi dengan kamera resolusi tinggi memungkinkan inspeksi visual reguler dan pemetaan lokasi proyek dengan akurasi tinggi, menghasilkan model 3D dan pengukuran yang presisi.",
        "Teknologi Cloud dan Kolaborasi Real-time: Platform berbasis cloud memungkinkan akses ke dokumen proyek, laporan kemajuan, dan komunikasi tim dari mana saja dan kapan saja, memfasilitasi kolaborasi yang mulus antara kantor pusat dan lokasi proyek.",
        "Kamera CCTV dengan Analitik Cerdas: Sistem CCTV modern dilengkapi dengan analitik cerdas yang dapat mendeteksi anomali, memantau kehadiran pekerja, dan bahkan mengidentifikasi potensi risiko keselamatan.",
        "Aplikasi Mobile Terintegrasi: Aplikasi khusus memungkinkan staf lapangan melaporkan kemajuan, permasalahan, dan dokumentasi visual secara instan, sehingga mengurangi kebutuhan akan laporan manual."
      ]
    },
    {
      type: "image",
      url: "/images/berita5/gambar3-b5.jpg",
      caption: "Drone sedang melakukan survei udara pada proyek konstruksi untuk pemantauan kemajuan dan pemetaan"
    },
    {
      type: "subheading",
      content: "Manfaat Implementasi Teknologi Pemantauan Jarak Jauh"
    },
    {
      type: "paragraph",
      content: "Penerapan teknologi pemantauan jarak jauh dalam proyek konstruksi membawa sejumlah manfaat yang signifikan. Berdasarkan studi kasus dari berbagai proyek di Indonesia dan analisis oleh Kementerian Pekerjaan Umum dan Perumahan Rakyat, berikut adalah beberapa keuntungan utama yang telah terdokumentasi:"
    },
    {
      type: "list",
      items: [
        "Peningkatan Efisiensi Operasional: Pengurangan waktu tempuh dan biaya perjalanan yang terkait dengan kunjungan lokasi fisik, menghasilkan efisiensi operasional rata-rata hingga 30%.",
        "Pengambilan Keputusan Berbasis Data: Akses ke data real-time dan historis memungkinkan pengambilan keputusan yang lebih cepat dan akurat, mengurangi kesalahan hingga 25% menurut laporan KPMG Construction Technology 2023.",
        "Peningkatan Keselamatan Kerja: Identifikasi dini terhadap potensi bahaya dan pemantauan kepatuhan protokol keselamatan, menurunkan insiden kecelakaan kerja hingga 40% pada proyek-proyek yang telah menerapkan sistem monitoring terpadu.",
        "Transparansi dan Akuntabilitas: Pelaporan yang lebih transparan kepada klien dan pemangku kepentingan, meningkatkan kepercayaan dan kepuasan klien secara signifikan.",
        "Optimalisasi Penggunaan Sumber Daya: Pelacakan penggunaan material dan peralatan yang lebih efisien, mengurangi pemborosan dan meningkatkan keberlanjutan proyek."
      ]
    },
    {
      type: "quote",
      content: "Teknologi pemantauan jarak jauh telah mengubah paradigma pengelolaan proyek dari reaktif menjadi proaktif. Kemampuan untuk mengidentifikasi dan mengatasi masalah potensial sebelum menjadi kritis merupakan nilai tambah yang sangat signifikan bagi industri konstruksi modern.",
      author: "Dr. Hendra Wijaya, Pakar Teknologi Konstruksi"
    },
    {
      type: "subheading",
      content: "Studi Kasus: Implementasi pada Proyek Infrastruktur Nasional"
    },
    {
      type: "paragraph",
      content: "Salah satu contoh keberhasilan penerapan teknologi pemantauan jarak jauh adalah pada proyek pembangunan infrastruktur nasional di lima provinsi berbeda di Indonesia. Tantangan utama yang dihadapi adalah koordinasi tim yang tersebar dan pemantauan kemajuan secara konsisten di semua lokasi. Pengelola proyek mengimplementasikan sistem terpadu yang mencakup:"
    },
    {
      type: "list",
      items: [
        "Jaringan kamera CCTV dengan akses streaming langsung melalui dashboard terpusat",
        "Sistem pemantauan IoT untuk melacak penggunaan material dan operasi peralatan berat",
        "Platform kolaborasi berbasis cloud untuk koordinasi tim dan manajemen dokumen",
        "Survei drone mingguan untuk pemantauan kemajuan dan pembuatan model 3D",
        "Aplikasi mobile untuk pelaporan lapangan dan komunikasi tim"
      ]
    },
    {
      type: "paragraph",
      content: "Hasil dari implementasi ini sangat mengesankan. Proyek tersebut berhasil diselesaikan 15% lebih cepat dari jadwal, dengan penghematan biaya sebesar 18% dibandingkan estimasi awal. Selain itu, terjadi peningkatan signifikan dalam koordinasi tim dan komunikasi dengan stakeholder, yang menghasilkan tingkat kepuasan yang lebih tinggi dan peluang bisnis tambahan."
    },
    {
      type: "image",
      url: "/images/berita5/gambar4-b5.jpg",
      caption: "Contoh aplikasi mobile untuk pemantauan dan pelaporan proyek di lapangan yang digunakan oleh berbagai kontraktor"
    },
    {
      type: "subheading",
      content: "Tantangan dan Solusi dalam Implementasi"
    },
    {
      type: "paragraph",
      content: "Meskipun manfaatnya sangat menjanjikan, implementasi teknologi pemantauan jarak jauh menghadirkan beberapa tantangan. Berdasarkan wawancara dengan berbagai pelaku industri, berikut adalah tantangan umum yang dihadapi beserta solusi yang dapat diterapkan:"
    },
    {
      type: "list",
      items: [
        "Infrastruktur Konektivitas: Tantangan konektivitas internet di lokasi terpencil dapat diatasi dengan solusi satelit dan jaringan mesh untuk menjamin transfer data.",
        "Resistensi Adaptasi Teknologi: Pelatihan komprehensif dan pendampingan bagi staf lapangan merupakan kunci untuk memastikan adopsi teknologi yang mulus dan efektif.",
        "Integrasi dengan Sistem yang Ada: Pengembangan middleware kustom dapat memastikan interoperabilitas antara teknologi baru dan sistem warisan yang masih digunakan.",
        "Keamanan Data: Implementasi protokol keamanan berlapis dan enkripsi end-to-end sangat penting untuk melindungi data sensitif proyek.",
        "Biaya Awal yang Tinggi: Pendekatan bertahap dalam implementasi dengan fokus pada teknologi yang memberikan ROI tercepat dapat menunjukkan nilai bisnis dan memudahkan pengambilan keputusan investasi."
      ]
    },
    {
      type: "paragraph",
      content: "Dengan pendekatan yang terencana dan strategis, tantangan-tantangan ini dapat diatasi, memungkinkan perusahaan konstruksi untuk mengoptimalkan manfaat dari teknologi pemantauan jarak jauh."
    },
    {
      type: "subheading",
      content: "Tren Masa Depan dalam Pemantauan Proyek Jarak Jauh"
    },
    {
      type: "paragraph",
      content: "Menurut laporan dari Deloitte Global Construction Technology Trends 2024, beberapa tren berikut diperkirakan akan membentuk masa depan pengelolaan proyek konstruksi dalam 3-5 tahun mendatang:"
    },
    {
      type: "list",
      items: [
        "Integrasi Kecerdasan Buatan dan Machine Learning: Algoritma AI yang dapat memprediksi potensi masalah, mengoptimalkan jadwal, dan memberikan rekomendasi proaktif.",
        "Realitas Campuran (Mixed Reality): Teknologi AR/VR yang memungkinkan inspeksi virtual real-time dan konsultasi jarak jauh dengan pakar spesialis.",
        "Robotika dan Otomasi: Robot otonom untuk inspeksi, pemantauan, dan bahkan tugas konstruksi tertentu di lingkungan yang berpotensi berbahaya.",
        "Digital Twin yang Lebih Canggih: Representasi digital proyek yang semakin akurat dan dinamis, memungkinkan simulasi dan analisis skenario yang lebih kompleks.",
        "5G dan Edge Computing: Infrastruktur komunikasi generasi berikutnya yang akan mendukung transfer data real-time dengan latensi minimal dan volume yang lebih besar."
      ]
    },
    {
      type: "quote",
      content: "Masa depan pengelolaan proyek konstruksi terletak pada kemampuan untuk mengintegrasikan teknologi digital secara mulus ke dalam operasi sehari-hari. Perusahaan yang mengadopsi dan menguasai teknologi pemantauan jarak jauh akan memiliki keunggulan kompetitif yang signifikan dalam industri yang semakin kompleks dan menuntut ini.",
      author: "Prof. Ahmad Darmawan, Pusat Studi Teknologi Konstruksi Universitas Indonesia"
    },
    {
      type: "subheading",
      content: "Rekomendasi untuk Implementasi"
    },
    {
      type: "paragraph",
      content: "Bagi perusahaan konstruksi yang berencana mengimplementasikan atau meningkatkan kapabilitas pemantauan jarak jauh mereka, berikut adalah rekomendasi pendekatan bertahap yang disarankan oleh konsultan teknologi konstruksi terkemuka:"
    },
    {
      type: "list",
      items: [
        "Mulai dengan Penilaian Kebutuhan: Identifikasi area spesifik yang akan mendapat manfaat terbesar dari pemantauan jarak jauh.",
        "Pilot Project: Implementasikan teknologi pada skala kecil untuk memvalidasi konsep dan menyempurnakan pendekatan sebelum penerapan yang lebih luas.",
        "Integrasi dan Interoperabilitas: Pastikan teknologi baru dapat berintegrasi dengan sistem yang ada untuk menghindari silo informasi.",
        "Investasi dalam Pelatihan: Alokasikan sumber daya yang memadai untuk melatih staf tentang penggunaan teknologi baru secara efektif.",
        "Peninjauan dan Evaluasi Berkala: Tinjau efektivitas implementasi secara teratur dan sesuaikan strategi berdasarkan umpan balik dan perkembangan teknologi."
      ]
    },
    {
      type: "paragraph",
      content: "Dengan pendekatan yang terstruktur dan fokus pada kebutuhan bisnis spesifik, perusahaan konstruksi dapat memaksimalkan manfaat dari teknologi pemantauan jarak jauh dan meningkatkan daya saing mereka di pasar yang semakin digital."
    },
    {
      type: "subheading",
      content: "Kesimpulan"
    },
    {
      type: "paragraph",
      content: "Teknologi pemantauan jarak jauh telah mengubah cara perusahaan konstruksi mengelola dan mengawasi proyek-proyek mereka. Dengan memberikan visibilitas real-time, mendukung pengambilan keputusan berbasis data, dan meningkatkan kolaborasi tim, teknologi ini menjadi kunci dalam menghadapi tantangan industri konstruksi modern."
    },
    {
      type: "paragraph",
      content: "Meskipun implementasinya mungkin menghadirkan beberapa tantangan, manfaat jangka panjang dalam hal efisiensi, keselamatan, dan penghematan biaya jauh melebihi investasi awal. Bagi perusahaan yang berkomitmen pada inovasi dan perbaikan berkelanjutan, mengadopsi teknologi pemantauan jarak jauh bukan lagi sekadar pilihan, tetapi kebutuhan strategis untuk tetap kompetitif di era digital."
    },
    {
      type: "paragraph",
      content: "Dengan semakin berkembangnya teknologi dan semakin terjangkaunya solusi pemantauan jarak jauh, diharapkan semakin banyak perusahaan konstruksi di Indonesia yang dapat memanfaatkan solusi-solusi ini untuk meningkatkan efisiensi dan kualitas proyek, serta berkontribusi pada kemajuan infrastruktur nasional secara keseluruhan."
    }
  ],
  relatedArticles: [
    {
      id: 2,
      title: "5 Strategi Jitu Kontraktor Hadapi Kenaikan Biaya Operasional 2023-2024",
      excerpt: "Panduan praktis bagi pelaku bisnis konstruksi untuk bertahan di tengah fluktuasi harga material dan tenaga kerja.",
      category: "Manajemen",
      image: "/images/berita2/gambar2.png",
      date: "15 Desember 2023",
      readTime: "4 menit",
      slug: "strategi-kenaikan-harga-material-2024"
    },
    {
      id: 3,
      title: "Ingin Renovasi Rumah? Ketahui Sejumlah Izin yang Wajib Dipenuhi",
      excerpt: "Panduan lengkap tentang izin-izin yang perlu disiapkan sebelum memulai renovasi rumah untuk menghindari masalah hukum.",
      category: "Regulasi",
      image: "/images/berita3/b3-g1.png",
      date: "20 September 2024",
      readTime: "5 menit",
      slug: "izin-wajib-renovasi-rumah-2024"
    },
    {
      id: 4,
      title: "Evolusi Perizinan Bangunan: Dari IMB ke PBG dan Implikasinya bagi Industri Konstruksi",
      excerpt: "Tinjauan komprehensif mengenai transformasi sistem perizinan bangunan di Indonesia dan strategi adaptasi bagi pelaku industri.",
      category: "Regulasi",
      image: "/images/berita4/b4-g4.png",
      date: "5 Februari 2024",
      readTime: "7 menit",
      slug: "perubahan-regulasi-imb-2024"
    }
  ],
  tags: ["teknologi konstruksi", "pemantauan jarak jauh", "IoT", "drone", "pengelolaan proyek", "digitalisasi konstruksi"]
};

// Halaman detail artikel
export default function RemoteMonitoringArticleDetail() {
  const router = useRouter();
  
  // State untuk progress bar
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // State untuk lightbox (viewer gambar)
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{url: string; caption?: string}>({url: ""});
  
  // Function untuk membuka lightbox
  const openLightbox = (url: string, caption?: string) => {
    setCurrentImage({url, caption});
    setLightboxOpen(true);
  };
  
  // Function untuk menutup lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  // Effect untuk menangani progress bar berdasarkan scroll
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };
    
    window.addEventListener('scroll', updateReadingProgress);
    
    return () => {
      window.removeEventListener('scroll', updateReadingProgress);
    };
  }, []);
  
  // Function to copy current URL to clipboard for sharing
  const copyLinkToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link berhasil disalin!');
        })
        .catch(err => {
          console.error('Gagal menyalin link: ', err);
        });
    }
  };
  
  return (
    <main className="bg-white min-h-screen">
      {/* Lightbox Component */}
      <ImageLightbox 
        isOpen={lightboxOpen} 
        onClose={closeLightbox} 
        imageUrl={currentImage.url} 
        caption={currentImage.caption} 
      />
      
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
        style={{ 
          backgroundImage: `linear-gradient(to right, #153969 ${readingProgress}%, transparent 0)` 
        }}
      />
      
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-gray-900">
        <Image
          src={remoteMonitoringArticle.image}
          alt={remoteMonitoringArticle.title}
          fill
          className="object-cover opacity-80"
          priority
          quality={95}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 md:pb-16">
            <button 
              onClick={() => router.push('/')} 
              className="inline-flex items-center text-white bg-[#153969]/70 backdrop-blur-sm px-4 py-2 rounded-full mb-6 hover:bg-[#153969] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Insight
            </button>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl mb-4"
            >
              {remoteMonitoringArticle.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {remoteMonitoringArticle.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{remoteMonitoringArticle.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {remoteMonitoringArticle.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mt-12">
          {/* Author info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg"
          >
            <Image 
              src={remoteMonitoringArticle.authorImage} 
              alt={remoteMonitoringArticle.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{remoteMonitoringArticle.author}</h3>
              <p className="text-sm text-gray-600">{remoteMonitoringArticle.authorRole}</p>
            </div>
          </motion.div>
          
          {/* Share and Bookmark buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-between items-center mb-8 sticky top-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Share:</span>
              <button 
                onClick={() => typeof window !== 'undefined' && window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button 
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(remoteMonitoringArticle.title)}`, '_blank')}
                className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button 
                onClick={() => typeof window !== 'undefined' && window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button
                onClick={copyLinkToClipboard}
                className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                aria-label="Copy link"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
            
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center ${isBookmarked ? 'text-[#153969]' : 'text-gray-600 hover:text-[#153969]'} transition-colors`}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this article"}
            >
              <Bookmark className={`h-5 w-5 mr-1 ${isBookmarked ? 'fill-[#153969]' : ''}`} />
              <span className="text-sm">{isBookmarked ? 'Disimpan' : 'Simpan'}</span>
            </button>
          </motion.div>
          
          {/* Article content with motion animations */}
          <div className="prose prose-lg max-w-none">
            {remoteMonitoringArticle.content.map((block, index) => {
              const delay = 0.4 + (index * 0.05);
              
              switch (block.type) {
                case 'paragraph':
                  return (
                    <motion.p 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay }}
                      className="text-gray-700 mb-6"
                    >
                      {block.content}
                    </motion.p>
                  );
                  
                case 'subheading':
                  return (
                    <motion.h2 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay }}
                      className="text-2xl font-bold text-gray-900 mt-10 mb-4"
                    >
                      {block.content}
                    </motion.h2>
                  );
                  
                case 'list':
                  return (
                    <motion.ul 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay }}
                      className="list-disc pl-6 mb-6 space-y-2"
                    >
                      {block.items && block.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700">
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  );
                  
                case 'image':
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay }}
                      className="my-8"
                    >
                      <div 
                        className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-md group cursor-pointer"
                        onClick={() => block.url && openLightbox(block.url, block.caption)}
                      >
                        {block.url && (
                          <Image
                            src={block.url}
                            alt={block.caption || ""}
                            fill
                            quality={95}
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="bg-white/80 rounded-full p-2">
                            <ZoomIn className="h-6 w-6 text-gray-800" />
                          </div>
                        </div>
                      </div>
                      {block.caption && (
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          {block.caption}
                        </p>
                      )}
                    </motion.div>
                  );
                  
                case 'quote':
                  return (
                    <motion.blockquote 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay }}
                      className="border-l-4 border-[#153969] pl-4 italic my-8 bg-blue-50/50 p-4 rounded-r-lg"
                    >
                      <p className="text-gray-700">{block.content}</p>
                      {block.author && (
                        <cite className="text-sm text-gray-500 mt-2 block">
                          — {block.author}
                        </cite>
                      )}
                    </motion.blockquote>
                  );
                  
                default:
                  return null;
              }
            })}
          </div>
          
          {/* Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 mb-16"
          >
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Tags:</span>
              {remoteMonitoringArticle.tags.map((tag, index) => (
                <Link 
                  key={index}
                  href={`/insight?tag=${tag}`} 
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Related Articles */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="max-w-6xl mx-auto mt-16 mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 relative">
            Artikel Terkait
            <span className="absolute bottom-0 left-0 w-20 h-1 bg-[#153969]"></span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {remoteMonitoringArticle.relatedArticles.map((relatedArticle, index) => (
              <Link 
                key={relatedArticle.id} 
                href={`/insight/${relatedArticle.slug}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      fill
                      quality={90}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-[#153969]/90 text-white text-xs font-medium px-2 py-0.5 rounded">
                        {relatedArticle.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center text-gray-500 text-xs mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{relatedArticle.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{relatedArticle.readTime}</span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-[#153969] transition-colors line-clamp-2 h-12">
                      {relatedArticle.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2 h-10">
                      {relatedArticle.excerpt}
                    </p>
                    
                    <span className="inline-flex items-center text-[#153969] text-sm group-hover:underline">
                      Baca Selengkapnya
                      <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}