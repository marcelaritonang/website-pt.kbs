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

// Data artikel untuk perubahan IMB ke PBG - diparafrase dan dibuat lebih original
const imbToPbgArticle = {
  id: 4,
  title: "Evolusi Perizinan Bangunan: Dari IMB ke PBG dan Implikasinya bagi Industri Konstruksi",
  excerpt: "Tinjauan komprehensif mengenai transformasi sistem perizinan bangunan di Indonesia dan strategi adaptasi bagi pelaku industri konstruksi.",
  category: "Regulasi",
  image: "/images/berita4/b4-g4.png",
  date: "5 Februari 2024",
  readTime: "7 menit",
  author: "Tim Riset KBS",
  authorRole: "Divisi Analisis Kebijakan Konstruksi",
  authorImage: "/images/logo-kbs.png",
  slug: "perubahan-regulasi-imb-2024",
  content: [
    {
      type: "paragraph",
      content: "Industri konstruksi dan properti di Indonesia telah mengalami perubahan signifikan dalam beberapa tahun terakhir, terutama dalam aspek regulasi dan perizinan. Salah satu transformasi paling mendasar adalah peralihan dari sistem Izin Mendirikan Bangunan (IMB) menuju paradigma baru Persetujuan Bangunan Gedung (PBG). Perubahan ini bukan sekadar pergantian terminologi, melainkan cerminan dari pendekatan yang lebih komprehensif terhadap pembangunan berkelanjutan dan keselamatan struktur."
    },
    {
      type: "paragraph",
      content: "Berdasarkan penelitian dan analisis tim KBS, peralihan ini merupakan respon terhadap kebutuhan akan sistem perizinan yang lebih terintegrasi, transparan, dan selaras dengan perkembangan teknologi konstruksi modern. Melalui artikel ini, kami menyajikan perspektif mendalam tentang transformasi tersebut dan implikasinya bagi seluruh pemangku kepentingan dalam ekosistem konstruksi di Indonesia."
    },
    {
      type: "paragraph",
      content: "Transformasi kebijakan ini diimplementasikan melalui Peraturan Pemerintah Nomor 16 Tahun 2021 yang merupakan turunan dari Undang-Undang Cipta Kerja. Regulasi baru ini secara fundamental mengubah pendekatan perizinan dari model konvensional IMB menjadi mekanisme PBG yang lebih berorientasi pada standar dan kepatuhan teknis."
    },
    {
      type: "image",
      url: "/images/berita4/b4-g1.jpg",
      caption: "Ilustrasi dokumen PBG yang menjadi instrumen regulasi baru dalam perizinan bangunan di Indonesia"
    },
    {
      type: "subheading",
      content: "Rasionalisasi Transformasi Perizinan Bangunan"
    },
    {
      type: "paragraph",
      content: "Berdasarkan hasil kajian KBS terhadap evolusi regulasi konstruksi, terdapat beberapa faktor pendorong utama yang mendasari perubahan dari IMB ke PBG. Transformasi ini tidak hanya ditujukan untuk penyederhanaan birokrasi, tetapi juga untuk meningkatkan standar kualitas dan keamanan bangunan di Indonesia."
    },
    {
      type: "list",
      items: [
        "Peningkatan Presisi Teknis: PBG menetapkan parameter yang lebih terukur dan detail dibandingkan IMB, mencakup aspek-aspek teknis, struktural, dan keselamatan bangunan yang lebih komprehensif.",
        "Adaptasi Teknologi: Seiring perkembangan metode konstruksi berbasis teknologi, PBG dirancang untuk mengakomodasi inovasi dalam desain dan pelaksanaan proyek konstruksi.",
        "Keberlanjutan dan Dampak Lingkungan: Sistem PBG memberikan penekanan lebih pada aspek keberlanjutan bangunan dan evaluasi dampak lingkungan, mendukung agenda pembangunan ramah lingkungan.",
        "Standardisasi Keamanan: PBG mengimplementasikan protokol keselamatan yang lebih ketat untuk meminimalisir risiko struktural dan kecelakaan konstruksi.",
        "Diversifikasi Tipologi Proyek: Sistem baru ini lebih adaptif terhadap keragaman jenis proyek konstruksi modern yang semakin kompleks dan multifungsi."
      ]
    },
    {
      type: "image",
      url: "/images/berita4/b4-g2.png",
      caption: "Visualisasi perbedaan proses perizinan dalam sistem IMB dan PBG berdasarkan analisis KBS"
    },
    {
      type: "subheading",
      content: "Implikasi Strategis bagi Industri Konstruksi"
    },
    {
      type: "paragraph",
      content: "Hasil analisis tim KBS menunjukkan bahwa transisi dari IMB ke PBG memiliki beberapa implikasi strategis yang perlu diantisipasi oleh seluruh pelaku industri konstruksi. Pemahaman terhadap implikasi ini akan membantu perusahaan konstruksi dalam menavigasi lanskap regulasi baru secara efektif."
    },
    {
      type: "list",
      items: [
        "Peningkatan Standar Kepatuhan: PBG menuntut tingkat kepatuhan yang lebih tinggi terhadap standar teknis dan prosedural, mendorong peningkatan kualitas praktik konstruksi secara menyeluruh.",
        "Akselerasi Adopsi Prinsip Berkelanjutan: Dengan penekanan pada aspek keberlanjutan, PBG mendorong industri untuk mengadopsi material dan metode konstruksi yang lebih ramah lingkungan.",
        "Integrasi Teknologi Konstruksi: Regulasi baru memfasilitasi dan mendorong penggunaan teknologi digital dan otomasi dalam perencanaan dan pelaksanaan proyek.",
        "Peningkatan Kualitas dan Durabilitas: Standar teknis yang lebih ketat dalam PBG berpotensi meningkatkan umur pakai dan kualitas bangunan secara signifikan."
      ]
    },
    {
      type: "quote",
      content: "Transformasi dari IMB ke PBG menghadirkan paradigma baru yang tidak hanya berfokus pada prosedur perizinan, tetapi lebih komprehensif dalam memastikan kualitas, keamanan, dan keberlanjutan infrastruktur nasional. Adaptasi terhadap sistem baru ini akan menjadi faktor kunci dalam menentukan daya saing perusahaan konstruksi di era regulasi modern.",
      author: "Tim Riset KBS"
    },
    {
      type: "subheading",
      content: "Diferensiasi Fundamental IMB dan PBG"
    },
    {
      type: "paragraph",
      content: "Studi komparatif yang dilakukan oleh KBS mengidentifikasi beberapa perbedaan mendasar antara sistem IMB dan PBG. IMB secara tradisional merupakan instrumen perizinan administratif yang diperlukan sebelum atau selama proses konstruksi. Dokumen teknis memang menjadi lampiran dalam pengajuan IMB, namun fokus utamanya tetap pada aspek perizinan."
    },
    {
      type: "paragraph",
      content: "Berbeda dengan IMB, PBG merupakan kerangka regulasi yang lebih komprehensif yang menentukan bagaimana sebuah bangunan harus direncanakan, dibangun, dan dioperasikan. PBG menetapkan standar teknis yang mencakup seluruh siklus hidup bangunan, mulai dari perencanaan, konstruksi, hingga pemanfaatan."
    },
    {
      type: "paragraph",
      content: "Standar teknis PBG meliputi aspek perencanaan dan perancangan, metodologi konstruksi, sistem pengawasan, dan protokol pemanfaatan. Selain itu, PBG juga mengatur ketentuan khusus untuk kategori bangunan tertentu seperti Bangunan Gedung Cagar Budaya (BGCB), Bangunan Gedung Fungsi Khusus (BGFK), Bangunan Gedung Hijau (BGH), dan Bangunan Gedung Negara (BGN)."
    },
    {
      type: "paragraph",
      content: "Perbedaan fundamental lainnya adalah pada pendekatan regulasi. IMB berfokus pada perizinan sebagai prasyarat administratif, sementara PBG berorientasi pada kepatuhan terhadap standar teknis sebagai indikator kualitas dan keamanan bangunan."
    },
    {
      type: "subheading",
      content: "Konsekuensi Ketidakpatuhan Terhadap PBG"
    },
    {
      type: "paragraph",
      content: "Berdasarkan analisis terhadap kerangka regulasi yang baru, tim KBS mengidentifikasi bahwa ketidakpatuhan terhadap ketentuan PBG dapat mengakibatkan konsekuensi administratif yang lebih terstruktur dan bertahap. Sanksi-sanksi ini dirancang untuk mendorong kepatuhan dan koreksi, bukan semata-mata punitive."
    },
    {
      type: "list",
      items: [
        "Peringatan tertulis sebagai notifikasi awal",
        "Pembatasan aktivitas konstruksi untuk mencegah pelanggaran berlanjut",
        "Penghentian sementara atau permanen terhadap kegiatan konstruksi",
        "Penghentian pemanfaatan bangunan yang tidak memenuhi standar",
        "Pembekuan status PBG sebagai langkah intermediasi",
        "Pencabutan PBG untuk pelanggaran serius",
        "Pembekuan atau pencabutan Sertifikat Laik Fungsi (SLF)",
        "Dalam kasus ekstrem, dapat dikeluarkan perintah pembongkaran"
      ]
    },
    {
      type: "paragraph",
      content: "Penting untuk dicatat bahwa regulasi transisi mengakomodasi bangunan yang telah memperoleh IMB sebelum diberlakukannya peraturan baru. Izin yang telah diterbitkan tetap berlaku hingga masa berlakunya berakhir, memberikan kelonggaran adaptasi bagi pemilik bangunan eksisting."
    },
    {
      type: "subheading",
      content: "Rekomendasi Adaptasi untuk Pelaku Industri Konstruksi"
    },
    {
      type: "paragraph",
      content: "Berdasarkan hasil analisis mendalam dari tim KBS, berikut adalah beberapa rekomendasi strategis untuk membantu pelaku industri konstruksi dalam beradaptasi dengan paradigma PBG:"
    },
    {
      type: "list",
      items: [
        "Investasi pada Literasi Regulasi: Membangun pemahaman komprehensif tentang kerangka PBG dan implikasinya bagi praktik konstruksi Anda.",
        "Pengembangan Kompetensi Internal: Meningkatkan kapasitas tim teknis dalam memahami dan mengimplementasikan standar PBG dalam setiap aspek proyek.",
        "Modernisasi Infrastruktur Teknologi: Mengintegrasikan solusi digital yang mendukung kepatuhan terhadap standar PBG dan meningkatkan efisiensi proses dokumentasi.",
        "Kemitraan dengan Spesialis Regulasi: Membangun kerja sama dengan konsultan yang memiliki keahlian spesifik dalam regulasi PBG untuk memastikan kepatuhan optimal.",
        "Implementasi Sistem Audit Internal: Mengembangkan protokol evaluasi berkala untuk memastikan proyek-proyek tetap selaras dengan persyaratan PBG sepanjang siklus hidupnya."
      ]
    },
    {
      type: "quote",
      content: "Transisi regulasi menuju PBG menawarkan momentum strategis bagi perusahaan konstruksi untuk melakukan transformasi proses dan standar internal. Perusahaan yang mampu mengadaptasi perubahan ini dengan cepat akan memiliki keunggulan kompetitif yang signifikan dalam lanskap industri konstruksi yang baru.",
      author: "Analis Senior KBS"
    },
    {
      type: "subheading",
      content: "Kesimpulan dan Prospek"
    },
    {
      type: "paragraph",
      content: "Pergeseran dari paradigma IMB menuju sistem PBG merepresentasikan evolusi penting dalam ekosistem regulasi konstruksi Indonesia. Perubahan ini mencerminkan kesadaran yang semakin tinggi akan pentingnya standar bangunan, keselamatan struktur, dan keberlanjutan lingkungan dalam konteks pembangunan nasional."
    },
    {
      type: "paragraph",
      content: "Meskipun transisi ini membawa kompleksitas dan tantangan adaptasi bagi industri, perspektif jangka panjangnya menjanjikan peningkatan kualitas, keamanan, dan keberlanjutan infrastruktur nasional. Bagi pelaku industri konstruksi, kemampuan untuk menavigasi perubahan regulasi ini dengan efektif akan menjadi determinan penting dalam keberlanjutan dan pertumbuhan bisnis di era baru perizinan bangunan."
    },
    {
      type: "paragraph",
      content: "KBS berkomitmen untuk terus memantau implementasi sistem PBG dan menyediakan analisis serta wawasan strategis untuk membantu klien dan mitra kami dalam beradaptasi dengan lanskap regulasi yang terus berevolusi. Untuk konsultasi lebih lanjut mengenai implikasi PBG terhadap proyek konstruksi Anda, silakan hubungi tim ahli regulasi kami."
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
      excerpt: "Panduan lengkap tentang izin-izin yang perlu disiapkan sebelum memulai renovasi rumah untuk menghindari masalah hukum dan konflik dengan tetangga.",
      category: "Regulasi",
      image: "/images/berita3/b3-g1.png",
      date: "20 September 2024",
      readTime: "5 menit",
      slug: "izin-wajib-renovasi-rumah-2024"
    },
    {
      id: 5,
      title: "Teknologi Pemantauan Jarak Jauh untuk Pengelolaan Proyek",
      excerpt: "Solusi teknologi terkini untuk mengawasi dan mengelola beberapa proyek konstruksi secara bersamaan.",
      category: "Teknologi",
      image: "/images/remote-monitoring.jpg",
      date: "25 Jan 2024",
      readTime: "5 menit",
      slug: "teknologi-pemantauan-jarak-jauh-konstruksi"
    }
  ],
  tags: ["regulasi konstruksi", "PBG", "IMB", "Cipta Kerja", "standar bangunan", "kepatuhan regulasi"]
};

// Halaman detail artikel
export default function ImbToPbgArticleDetail() {
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
          src={imbToPbgArticle.image}
          alt={imbToPbgArticle.title}
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
              {imbToPbgArticle.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {imbToPbgArticle.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{imbToPbgArticle.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {imbToPbgArticle.readTime}</span>
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
              src={imbToPbgArticle.authorImage} 
              alt={imbToPbgArticle.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{imbToPbgArticle.author}</h3>
              <p className="text-sm text-gray-600">{imbToPbgArticle.authorRole}</p>
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
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(imbToPbgArticle.title)}`, '_blank')}
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
            {imbToPbgArticle.content.map((block, index) => {
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
              {imbToPbgArticle.tags.map((tag, index) => (
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
            {imbToPbgArticle.relatedArticles.map((relatedArticle, index) => (
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