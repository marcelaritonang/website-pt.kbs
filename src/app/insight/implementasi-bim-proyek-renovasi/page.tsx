'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useRouter } from 'next/navigation';



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

// Data artikel tentang implementasi BIM dalam proyek renovasi
const bimRenovationArticle = {
  id: 10,
  title: "Implementasi BIM untuk Efisiensi Proyek Renovasi Modern",
  excerpt: "Bagaimana Building Information Modeling (BIM) meningkatkan akurasi, efisiensi biaya, dan kualitas dalam proyek renovasi bangunan.",
  category: "Teknologi",
  image: "/images/berita10/gambar2-b10.png",
  date: "15 Februari 2024",
  readTime: "7 menit",
  author: "Tim Redaksi KBS",
  authorRole: "Divisi Teknologi Konstruksi",
  authorImage: "/images/logo-kbs.png",
  slug: "implementasi-bim-proyek-renovasi",
  content: [
    {
      type: "paragraph",
      content: "Building Information Modeling (BIM) telah mentransformasi cara industri konstruksi merancang dan membangun struktur baru. Namun, implementasi BIM dalam proyek renovasi – yang seringkali lebih kompleks karena adanya keterbatasan struktur yang ada – kini semakin mendapat perhatian sebagai solusi untuk mengatasi tantangan spesifik dalam proyek modifikasi bangunan. Artikel ini mengulas bagaimana teknologi BIM memberikan nilai tambah signifikan dalam proyek renovasi modern."
    },
    {
      type: "paragraph",
      content: "Berbeda dengan konstruksi baru, proyek renovasi menghadapi tantangan unik berupa ketidakpastian kondisi eksisting, dokumentasi yang tidak lengkap, dan kebutuhan untuk meminimalkan gangguan pada pengguna bangunan. BIM, dengan kemampuannya menciptakan representasi digital komprehensif dari karakteristik fisik dan fungsional bangunan, menawarkan solusi presisi untuk menghadapi kompleksitas ini."
    },
    {
      type: "image",
      url: "/images/berita10/gambar3-b10.png",
      caption: "Visualisasi 3D model BIM untuk proyek renovasi gedung perkantoran"
    },
    {
      type: "subheading",
      content: "Mengapa BIM Vital untuk Proyek Renovasi Modern"
    },
    {
      type: "paragraph",
      content: "Dalam konteks renovasi, BIM bukan sekadar alat visualisasi, tetapi platform terintegrasi yang menawarkan berbagai keuntungan strategis. Studi terbaru dari Universitas Indonesia dan Institut Teknologi Bandung menunjukkan bahwa implementasi BIM dalam proyek renovasi di Indonesia dapat menghasilkan penghematan biaya hingga 18% dan pengurangan waktu pengerjaan sekitar 22% dibandingkan dengan pendekatan konvensional."
    },
    {
      type: "list",
      items: [
        "Dokumentasi Akurat Kondisi Eksisting - Teknologi pemindaian laser 3D terintegrasi dengan BIM memungkinkan penciptaan model as-built presisi hingga toleransi milimeter",
        "Deteksi Konflik Dini - Identifikasi tabrakan antara sistem baru dan infrastruktur eksisting sebelum konstruksi dimulai, mengurangi perubahan di lapangan hingga 65%",
        "Perencanaan Tahapan Lebih Baik - Simulasi urutan konstruksi memungkinkan analisis dampak setiap fase pada pengguna bangunan",
        "Komunikasi Stakeholder yang Ditingkatkan - Visualisasi intuitive memudahkan pemilik bangunan, kontraktor, dan pengguna memahami lingkup pekerjaan",
        "Pengelolaan Risiko Lebih Efektif - Antisipasi potensi masalah struktural dan teknis sebelum pekerjaan dimulai",
        "Keberlanjutan Ditingkatkan - Analisis terhadap kinerja energi dan pilihan material mendukung renovasi yang lebih ramah lingkungan"
      ]
    },
    {
      type: "subheading",
      content: "Proses Implementasi BIM dalam Proyek Renovasi"
    },
    {
      type: "paragraph",
      content: "Menerapkan BIM dalam proyek renovasi melibatkan serangkaian tahapan strategis. Berdasarkan praktik terbaik dari proyek-proyek renovasi sukses di Indonesia, pendekatan sistematis berikut direkomendasikan:"
    },
    {
      type: "subheading",
      content: "1. Akuisisi Data dan Pemodelan Kondisi Eksisting"
    },
    {
      type: "paragraph",
      content: "Langkah awal krusial dalam proyek renovasi berbasis BIM adalah menciptakan model digital akurat dari kondisi bangunan saat ini. Teknologi yang semakin mudah diakses telah mendukung proses ini:"
    },
    {
      type: "list",
      items: [
        "Pemindaian Laser 3D - Menciptakan point cloud detail dengan akurasi ±2mm, menangkap dimensi dan geometri eksisting",
        "Fotogrametri - Penggunaan foto digital untuk membuat model 3D, terutama efektif untuk elemen fasad dan detail arsitektural",
        "Integrasi Dokumen Historis - Digitalisasi gambar dan dokumen konstruksi lama dengan verifikasi lapangan",
        "Survei Georeferensi - Memastikan model berada dalam sistem koordinat yang benar, penting untuk renovasi dengan perluasan area"
      ]
    },
    {
      type: "image",
      url: "/images/berita10/gambar4-b10.jpg",
      caption: "Proses pemindaian laser 3D untuk menciptakan point cloud bangunan eksisting"
    },
    {
      type: "paragraph",
      content: "Dalam kasus proyek renovasi Gedung Heritage Bank Mandiri di Jakarta, kombinasi pemindaian laser dan survei tradisional menghasilkan model as-built dengan perbedaan maksimal 5mm dari kondisi aktual, memungkinkan perencanaan modifikasi struktural dengan presisi tinggi meski bekerja dengan bangunan berumur 80 tahun."
    },
    {
      type: "subheading",
      content: "2. Perencanaan dan Desain Renovasi Terintegrasi"
    },
    {
      type: "paragraph",
      content: "Dengan model kondisi eksisting sebagai fondasi, tim desain dapat mengembangkan solusi renovasi yang mempertimbangkan semua konstrain yang ada. Keunggulan pendekatan BIM dalam fase ini adalah:"
    },
    {
      type: "list",
      items: [
        "Kolaborasi Multi-disiplin - Arsitek, engineer struktur, MEP, dan spesialis lain bekerja pada model terintegrasi",
        "Simulasi Skenario - Evaluasi beberapa alternatif desain dengan analisis dampak komprehensif",
        "Validasi Persyaratan Regulasi - Verifikasi otomatis terhadap kode bangunan dan persyaratan aksesibilitas",
        "Analisis Struktural Real-time - Evaluasi dampak modifikasi pada integritas struktural bangunan eksisting",
        "Integrasi Sistem Building Physics - Simulasi pencahayaan, akustik, dan performa termal untuk renovasi yang nyaman"
      ]
    },
    {
      type: "quote",
      content: "BIM memungkinkan kita melihat masa lalu dan masa depan bangunan secara simultan. Dengan pemahaman komprehensif tentang kondisi eksisting, kita dapat merancang intervensi yang tepat dengan keyakinan yang jauh lebih tinggi.",
      author: "Ir. Andika Pratama, Konsultan BIM Senior"
    },
    {
      type: "subheading",
      content: "3. Perencanaan Konstruksi dan Logistik"
    },
    {
      type: "paragraph",
      content: "Penjadwalan dan perencanaan logistik sering menjadi tantangan terbesar dalam proyek renovasi, terutama untuk bangunan yang tetap beroperasi selama konstruksi. BIM 4D (integrasi timeline) dan 5D (integrasi biaya) memberikan keunggulan signifikan:"
    },
    {
      type: "list",
      items: [
        "Simulasi Timeline Konstruksi - Visualisasi sekuensial proses renovasi dengan mempertimbangkan ketergantungan antar aktivitas",
        "Perencanaan Area Kerja - Optimasi ruang yang terbatas pada lokasi renovasi dan zonasi untuk meminimalkan gangguan",
        "Mitigasi Risiko Gangguan - Identifikasi potensi dampak pada operasional bangunan dan pengembangan strategi mitigasi",
        "Analisis Value Engineering - Evaluasi alternatif material dan metode dari perspektif biaya siklus hidup",
        "Logistik Just-in-Time - Koordinasi pengiriman material dan peralatan sesuai kebutuhan aktual di lapangan"
      ]
    },
    {
      type: "paragraph",
      content: "Pada proyek renovasi Rumah Sakit Cipto Mangunkusumo Wing A, implementasi BIM 4D memungkinkan rumah sakit tetap beroperasi sepanjang proses renovasi 18 bulan dengan gangguan minimal. Simulasi terperinci mengidentifikasi bahwa penggunaan prefabrikasi untuk komponen tertentu dapat mengurangi waktu kerja di lokasi hingga 35%."
    },
    {
      type: "subheading",
      content: "4. Eksekusi dan Monitoring Konstruksi"
    },
    {
      type: "paragraph",
      content: "Fase implementasi renovasi mendapat manfaat signifikan dari integrasi BIM dengan teknologi lapangan, memastikan pelaksanaan sesuai dengan desain digital yang presisi:"
    },
    {
      type: "list",
      items: [
        "Augmented Reality (AR) di Lapangan - Overlay model BIM pada lingkungan nyata untuk panduan instalasi presisi",
        "Tracking Progress Real-time - Pembaruan status konstruksi pada model BIM melalui survei mobile dan IoT",
        "Manajemen Perubahan Terintegrasi - Proses RFI (Request for Information) dan perubahan desain yang terhubung langsung dengan model",
        "Quality Assurance Digital - Verifikasi pekerjaan terhadap toleransi yang ditentukan dalam model",
        "Dokumentasi As-built Dinamis - Pembaruan model terus-menerus untuk mencerminkan kondisi aktual"
      ]
    },
    {
      type: "paragraph",
      content: "Adopsi teknologi pendukung BIM di lapangan menjadi semakin mudah dengan tersedianya aplikasi mobile yang terjangkau. Proyek renovasi Plaza Indonesia mengimplementasikan sistem tablet AR untuk memandu pekerja dalam instalasi sistem MEP kompleks di ruang yang terbatas, mengurangi kesalahan pemasangan hingga 92% dibandingkan dengan metode konvensional."
    },
    {
      type: "subheading",
      content: "5. Integrasi dengan Facility Management"
    },
    {
      type: "paragraph",
      content: "Nilai BIM berlanjut setelah renovasi selesai, menawarkan fondasi solid untuk manajemen fasilitas yang lebih efisien:"
    },
    {
      type: "list",
      items: [
        "Transfer Data Komprehensif - Semua informasi teknis dari proyek renovasi tersedia untuk tim operasional",
        "Perencanaan Maintenance Presisi - Jadwal pemeliharaan berdasarkan lokasi dan spesifikasi aktual komponen",
        "Manajemen Aset Digital - Tracking komponen bangunan dengan history lengkap dan informasi garansi",
        "Respon Darurat yang Ditingkatkan - Akses cepat ke informasi lokasi utilitas penting dan sistem keselamatan",
        "Fondasi untuk Renovasi Masa Depan - Data akurat menjadi baseline untuk modifikasi selanjutnya"
      ]
    },
    {
      type: "subheading",
      content: "Tantangan dan Solusi dalam Implementasi BIM untuk Renovasi"
    },
    {
      type: "paragraph",
      content: "Meskipun manfaatnya substansial, penerapan BIM dalam proyek renovasi di Indonesia masih menghadapi beberapa hambatan spesifik. Berikut tantangan utama dan solusi praktis yang telah terbukti efektif:"
    },
    {
      type: "list",
      items: [
        "Keterbatasan Data Eksisting - Solusi: Kombinasi teknologi pemindaian dengan verifikasi lapangan selektif untuk area kritis",
        "Investasi Awal Tinggi - Solusi: Pendekatan bertahap dengan prioritas pada fungsi BIM yang memberikan nilai tertinggi dalam konteks spesifik proyek",
        "Kesenjangan Keterampilan - Solusi: Program pelatihan targeted dan kolaborasi dengan konsultan BIM berpengalaman",
        "Resistensi Perubahan - Solusi: Demonstrasi ROI dengan pilot project dan dokumentasi studi kasus lokal",
        "Interoperabilitas Sistem - Solusi: Standarisasi format file dan protokol pertukaran data di awal proyek"
      ]
    },
    {
      type: "paragraph",
      content: "Pada konteks regulasi Indonesia, asosiasi industri seperti AAUI (Asosiasi Ahli Utilitas Indonesia) dan IAI (Ikatan Arsitek Indonesia) telah mengembangkan panduan implementasi BIM yang sensitif terhadap kondisi lokal, membantu menjembatani gap antara standar internasional dengan realitas praktik di lapangan."
    },
    {
      type: "subheading",
      content: "Studi Kasus: Renovasi Plaza Indonesia, Jakarta"
    },
    {
      type: "paragraph",
      content: "Untuk memberikan gambaran konkret tentang keberhasilan implementasi BIM dalam proyek renovasi besar, berikut rangkuman studi kasus renovasi Plaza Indonesia yang diselesaikan pada akhir 2023:"
    },
    {
      type: "list",
      items: [
        "Lingkup Proyek: Renovasi mall seluas 77,000 m² termasuk area retail, sistem MEP, dan fasad, semuanya dilakukan dengan mall tetap beroperasi",
        "Tantangan Utama: Dokumentasi as-built yang tidak lengkap, jadwal ketat 14 bulan, dan kebutuhan untuk meminimalkan gangguan pada tenant",
        "Pendekatan BIM: Pemindaian laser 3D komprehensif, model 7D terintegrasi (termasuk keberlanjutan dan analisis siklus hidup), dan implementasi AR untuk konstruksi",
        "Hasil Terukur: Penyelesaian 12% lebih cepat dari rencana awal, pengurangan RFI 73%, pengurangan pemborosan material 24%, dan penghematan biaya keseluruhan 15%",
        "Manfaat Berkelanjutan: Model as-built akurat menjadi fondasi untuk sistem FM digital dengan efisiensi operasional 28% lebih tinggi"
      ]
    },
    {
      type: "paragraph",
      content: "Faktor kunci keberhasilan dalam proyek ini adalah komitmen awal seluruh stakeholder terhadap workflow BIM, pelatihan intensif tim kontraktor, dan implementasi platform kolaborasi cloud yang memungkinkan koordinasi real-time antar semua pihak terlibat."
    },
    {
      type: "subheading",
      content: "Rekomendasi Implementasi untuk Proyek Renovasi Skala Menengah"
    },
    {
      type: "paragraph",
      content: "Sementara proyek besar telah menunjukkan keberhasilan implementasi BIM komprehensif, perusahaan konstruksi skala menengah dapat mengadopsi pendekatan bertahap dengan fokus pada komponen BIM yang memberikan nilai tertinggi:"
    },
    {
      type: "list",
      items: [
        "Prioritaskan pemodelan 3D akurat untuk area kompleks dan deteksi konflik sebagai manfaat utama",
        "Investasi awal dalam pelatihan 2-3 staf inti sebagai BIM champions yang akan memimpin implementasi",
        "Manfaatkan layanan BIM outsourcing untuk fungsi spesifik seperti pemindaian laser, daripada investasi besar pada peralatan",
        "Tetapkan ekspektasi ROI yang realistis dengan mengidentifikasi metrics sukses spesifik sebelum proyek dimulai",
        "Mulai dengan proyek pilot yang memiliki kompleksitas moderat untuk membangun kepercayaan dan kemampuan tim"
      ]
    },
    {
      type: "quote",
      content: "Kunci keberhasilan implementasi BIM dalam renovasi bukan pada adopsi semua fitur sekaligus, tetapi pada identifikasi fungsi spesifik yang menyelesaikan tantangan terbesar dalam proyek Anda, kemudian berkembang dari sana.",
      author: "Maya Wulandari, BIM Manager, PT Konstruksi Digital Indonesia"
    },
    {
      type: "subheading",
      content: "Tren Masa Depan BIM dalam Proyek Renovasi"
    },
    {
      type: "paragraph",
      content: "Perkembangan teknologi terus memperluas kapabilitas BIM untuk proyek renovasi. Beberapa tren yang akan semakin relevan dalam konteks Indonesia meliputi:"
    },
    {
      type: "list",
      items: [
        "Digital Twin Dinamis - Model BIM yang terus diperbarui melalui sensor IoT, mencerminkan kondisi bangunan secara real-time",
        "Integrasi AI dan Machine Learning - Algoritma prediktif untuk mengidentifikasi kebutuhan maintenance dan mencegah kegagalan sistem",
        "Realitas Campuran (Mixed Reality) - Kombinasi AR dan VR untuk visualisasi holistik dan simulasi pengalaman pengguna paska-renovasi",
        "Blockchain untuk Verifikasi - Sistem terdesentralisasi untuk memvalidasi kualitas dan asal material dalam rantai pasok renovasi",
        "BIM untuk Analisis Keberlanjutan - Tools terintegrasi untuk evaluasi embodied carbon dan dampak lingkungan renovasi vs pembangunan baru"
      ]
    },
    {
      type: "subheading",
      content: "Kesimpulan"
    },
    {
      type: "paragraph",
      content: "Implementasi BIM dalam proyek renovasi menawarkan paradigma baru yang mengatasi kompleksitas unik dalam memodifikasi struktur eksisting. Dengan menciptakan representasi digital yang komprehensif dan akurat, BIM memungkinkan perencanaan lebih presisi, eksekusi lebih efisien, dan hasil akhir berkualitas lebih tinggi."
    },
    {
      type: "paragraph",
      content: "Untuk industri konstruksi Indonesia yang diproyeksikan akan mengalami peningkatan signifikan dalam proyek renovasi dan retrofitting gedung selama dekade mendatang, adopsi BIM bukan lagi sekadar opsi teknologi, tetapi kebutuhan strategis untuk tetap kompetitif. Perusahaan yang investasi dalam kapabilitas ini sekarang akan memposisikan diri pada garis depan transformasi digital yang tak terelakkan dalam sektor konstruksi."
    },
    {
      type: "paragraph",
      content: "Dengan pendekatan sistematis yang memprioritaskan kebutuhan spesifik proyek, kolaborasi multi-disiplin, dan peningkatan kapasitas berkelanjutan, implementasi BIM dalam renovasi akan menghasilkan bangunan yang tidak hanya diperbaharui secara fisik, tetapi juga dioptimalkan untuk kinerja, keberlanjutan, dan nilai jangka panjang."
    }
  ],
  relatedArticles: [
    {
      id: 5,
      title: "Teknologi Pemantauan Jarak Jauh untuk Pengelolaan Proyek",
      excerpt: "Solusi teknologi terkini untuk mengawasi dan mengelola beberapa proyek konstruksi secara bersamaan.",
      category: "Teknologi",
      image: "/images/berita5/gambar2-b5.png",
      date: "25 Januari 2024",
      readTime: "5 menit",
      slug: "teknologi-pemantauan-jarak-jauh-konstruksi"
    },
    {
      id: 6,
      title: "Pembangunan Gedung Ramah Lingkungan: Tren dan Standar",
      excerpt: "Perkembangan terkini dalam konstruksi berkelanjutan dan sertifikasi green building di Indonesia.",
      category: "Proyek",
      image: "/images/berita6/gambar1-b6.jpeg",
      date: "18 Jan 2024",
      readTime: "6 menit",
      slug: "pembangunan-gedung-ramah-lingkungan"
    },
    {
      id: 8,
      title: "Jasa Konsultasi Pra-Konstruksi untuk Optimalisasi Anggaran",
      excerpt: "Bagaimana perencanaan matang sejak awal dapat menghemat biaya dan waktu pelaksanaan proyek.",
      category: "Layanan",
      image: "/images/berita7/gambar1-b7.jpg",
      date: "5 Jan 2024",
      readTime: "4 menit",
      slug: "jasa-konsultasi-pra-konstruksi"
    }
  ],
  tags: ["BIM", "renovasi bangunan", "teknologi konstruksi", "digitalisasi konstruksi", "pemindaian laser 3D", "manajemen proyek", "facility management"]
};

// Halaman detail artikel
export default function BIMRenovationArticleDetail() {
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
          src={bimRenovationArticle.image}
          alt={bimRenovationArticle.title}
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
              {bimRenovationArticle.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {bimRenovationArticle.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{bimRenovationArticle.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {bimRenovationArticle.readTime}</span>
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
              src={bimRenovationArticle.authorImage} 
              alt={bimRenovationArticle.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{bimRenovationArticle.author}</h3>
              <p className="text-sm text-gray-600">{bimRenovationArticle.authorRole}</p>
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
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(bimRenovationArticle.title)}`, '_blank')}
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
            {bimRenovationArticle.content.map((block, index) => {
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
              {bimRenovationArticle.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
                >
                  {tag}
                </span>
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
            {bimRenovationArticle.relatedArticles.map((relatedArticle, index) => (
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
  )};