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

// Data artikel tentang perubahan standar SNI
const sniStandardsArticle = {
  id: 9,
  title: "Penyesuaian Standar SNI untuk Bahan Bangunan 2024",
  excerpt: "Perubahan regulasi standar nasional untuk material konstruksi dan implikasinya pada industri konstruksi di Indonesia.",
  category: "Regulasi",
  image: "/images/berita9/gambar1-b9.jpg",
  date: "28 Desember 2023",
  readTime: "6 menit",
  author: "Tim KBS",
  authorRole: "Divisi Penelitian & Regulasi",
  authorImage: "/images/logo-kbs.png",
  slug: "perubahan-standar-sni-bahan-bangunan",
  content: [
    {
      type: "paragraph",
      content: "Badan Standardisasi Nasional (BSN) Indonesia baru-baru ini mengumumkan serangkaian penyesuaian pada Standar Nasional Indonesia (SNI) untuk bahan bangunan yang akan diberlakukan secara penuh pada tahun 2024. Perubahan ini merupakan respons terhadap perkembangan teknologi, tuntutan keberlanjutan, dan kebutuhan untuk menyelaraskan standar nasional dengan praktik terbaik internasional."
    },
    {
      type: "paragraph",
      content: "Standar Nasional Indonesia (SNI) merupakan acuan teknis yang ditetapkan oleh BSN, berfungsi sebagai panduan kualitas dan keamanan produk, termasuk material konstruksi. Regulasi ini bersifat mengikat untuk proyek-proyek pemerintah dan menjadi rekomendasi kuat untuk proyek swasta, sehingga perubahan pada standar tersebut memiliki implikasi signifikan bagi seluruh sektor konstruksi."
    },
    {
      type: "image",
      url: "/images/berita9/gambar2-b9.jpg",
      caption: "Uji laboratorium untuk material konstruksi sesuai standar SNI terbaru"
    },
    {
      type: "subheading",
      content: "Perubahan Utama pada Standar SNI 2024"
    },
    {
      type: "paragraph",
      content: "Penyesuaian standar yang akan diberlakukan tahun 2024 mencakup beberapa material utama dalam konstruksi. Berdasarkan dokumen teknis yang dirilis BSN, berikut rangkuman perubahan signifikan yang perlu diperhatikan pelaku industri:"
    },
    {
      type: "list",
      items: [
        "Semen dan Beton - Peningkatan persyaratan ketahanan dan umur pakai, dengan penambahan kategori kelas lingkungan agresif dan standar pengujian beton berkelanjutan",
        "Baja Konstruksi - Revisi standar kekuatan tarik dan leleh minimal, serta penambahan kategori baja tahan korosi untuk lingkungan spesifik",
        "Material Atap - Pengetatan standar ketahanan terhadap cuaca ekstrem, termasuk angin kencang dan hujan asam",
        "Kaca dan Fasad - Peningkatan persyaratan performa termal dan insulasi, serta indeks proteksi radiasi UV",
        "Kayu dan Produk Kayu - Penambahan klasifikasi dan persyaratan untuk kayu rekayasa, serta standar keberlanjutan sumber",
        "Material Finishing - Pembatasan kandungan Volatile Organic Compounds (VOC) pada cat, pelapis, dan bahan adhesif"
      ]
    },
    {
      type: "paragraph",
      content: "Salah satu perubahan paling signifikan adalah penambahan klasifikasi dan persyaratan terkait ketahanan material terhadap kondisi iklim ekstrem. Hal ini merupakan respons terhadap peningkatan frekuensi cuaca ekstrem yang terjadi akibat perubahan iklim global, yang memerlukan penyesuaian pada standar bahan bangunan untuk memastikan keamanan dan ketahanan jangka panjang."
    },
    {
      type: "subheading",
      content: "Dampak pada Industri Konstruksi"
    },
    {
      type: "paragraph",
      content: "Penyesuaian standar SNI berimplikasi luas pada berbagai pemangku kepentingan dalam industri konstruksi. Berikut analisis dampak pada beberapa sektor kunci:"
    },
    {
      type: "list",
      items: [
        "Produsen Material - Kebutuhan untuk menyesuaikan proses produksi dan kontrol kualitas, serta kemungkinan investasi pada teknologi dan peralatan baru",
        "Kontraktor dan Pengembang - Potensi kenaikan biaya material dan perlunya penyesuaian spesifikasi teknis dalam dokumen tender dan kontrak",
        "Konsultan dan Perencana - Tantangan dalam memperbarui pengetahuan teknis dan menyesuaikan spesifikasi desain sesuai standar terbaru",
        "Instansi Pengawas - Peningkatan kompleksitas dalam proses verifikasi kepatuhan dan pengujian material",
        "Pemilik Proyek - Potensi peningkatan biaya awal, tetapi juga potensi penghematan jangka panjang dari material yang lebih tahan lama"
      ]
    },
    {
      type: "quote",
      content: "Perubahan standar SNI memang akan membutuhkan penyesuaian dari industri, tetapi harus dilihat sebagai investasi jangka panjang untuk meningkatkan kualitas dan keberlanjutan infrastruktur nasional, bukan semata-mata sebagai beban regulasi tambahan.",
      author: "Prof. Dr. Ir. Sutanto, Pakar Material Konstruksi dan anggota Komite Teknis BSN"
    },
    {
      type: "subheading",
      content: "Analisis Biaya dan Manfaat"
    },
    {
      type: "paragraph",
      content: "Studi dampak regulasi yang dilakukan oleh Kementerian Pekerjaan Umum dan Perumahan Rakyat bersama BSN mengindikasikan adanya struktur biaya-manfaat yang perlu diperhatikan para pemangku kepentingan:"
    },
    {
      type: "list",
      items: [
        "Biaya Kepatuhan Jangka Pendek - Estimasi kenaikan biaya material berkisar 5-12% untuk memenuhi standar baru, tergantung kategori material",
        "Biaya Peralihan - Perlu investasi dalam pelatihan, pengujian, dan sertifikasi baru, terutama bagi produsen lokal",
        "Manfaat Jangka Panjang - Pengurangan biaya pemeliharaan sebesar 15-30% selama siklus hidup bangunan berkat material yang lebih tahan lama",
        "Pengurangan Risiko - Penurunan risiko kegagalan struktural dan kebutuhan rekonstruksi dini, dengan penghematan potensial hingga 20%",
        "Manfaat Sosial dan Lingkungan - Peningkatan keselamatan penghuni, pengurangan limbah konstruksi, dan penurunan emisi karbon dari produksi material berulang"
      ]
    },
    {
      type: "paragraph",
      content: "Melihat struktur biaya-manfaat tersebut, penyesuaian standar SNI sebenarnya dapat dipandang sebagai katalis untuk inovasi dan efisiensi jangka panjang, meskipun membutuhkan investasi awal yang lebih tinggi."
    },
    {
      type: "subheading",
      content: "Periode Transisi dan Implementasi"
    },
    {
      type: "paragraph",
      content: "Menyadari potensi disrupsi yang dapat terjadi, BSN dan Kementerian PUPR menetapkan periode transisi dan implementasi bertahap:"
    },
    {
      type: "list",
      items: [
        "Januari-Juni 2024: Periode sosialisasi dan penyesuaian, standar lama dan baru dapat digunakan secara paralel",
        "Juli-Desember 2024: Implementasi parsial, dengan penerapan wajib untuk proyek pemerintah dan BUMN",
        "Januari 2025: Implementasi penuh, berlaku untuk semua proyek konstruksi baru",
        "Proyek yang telah berjalan: Dapat melanjutkan dengan standar yang berlaku saat kontrak ditandatangani",
        "Insentif kepatuhan dini: Kemudahan akses pendanaan dan prioritas dalam proyek pemerintah bagi pelaku industri yang mengadopsi standar baru lebih awal"
      ]
    },
    {
      type: "paragraph",
      content: "Pendekatan bertahap ini memberikan ruang bagi industri untuk beradaptasi, sekaligus mendorong transisi proaktif menuju standar yang lebih tinggi. BSN juga menyediakan layanan konsultasi teknis dan program pelatihan untuk membantu pemangku kepentingan memahami dan menerapkan perubahan secara efektif."
    },
    {
      type: "subheading",
      content: "Tantangan dan Peluang bagi Industri Lokal"
    },
    {
      type: "paragraph",
      content: "Penyesuaian standar SNI menghadirkan tantangan signifikan, namun juga membuka peluang strategis bagi produsen material lokal:"
    },
    {
      type: "list",
      items: [
        "Tantangan Kapasitas - Kebutuhan untuk meningkatkan kemampuan pengujian dan kontrol kualitas, yang mungkin mahal bagi produsen skala kecil-menengah",
        "Kesenjangan Teknologi - Beberapa standar baru memerlukan teknologi produksi yang belum umum tersedia di Indonesia",
        "Persaingan Impor - Risiko peningkatan impor dari produsen luar negeri yang sudah memenuhi standar serupa di pasar global",
        "Peluang Spesialisasi - Ceruk pasar baru untuk material yang memenuhi persyaratan spesifik dalam standar terbaru",
        "Stimulus Inovasi - Dorongan untuk penelitian dan pengembangan material konstruksi yang lebih sesuai dengan kondisi lokal",
        "Ekspansi Ekspor - Produk yang memenuhi standar yang diselaraskan dengan praktik internasional berpotensi lebih kompetitif di pasar global"
      ]
    },
    {
      type: "paragraph",
      content: "Untuk memaksimalkan peluang dan meminimalkan tantangan, kolaborasi antara pemerintah, akademisi, dan industri menjadi sangat penting. Program pendampingan teknis, akses ke fasilitas pengujian bersama, dan insentif fiskal untuk investasi dalam peningkatan kapasitas produksi dapat membantu industri lokal beradaptasi dan bahkan unggul dalam standar baru."
    },
    {
      type: "subheading",
      content: "Rekomendasi untuk Pelaku Industri"
    },
    {
      type: "paragraph",
      content: "Berdasarkan analisis dampak dan jadwal implementasi, berikut adalah rekomendasi tindakan bagi berbagai pelaku industri konstruksi:"
    },
    {
      type: "list",
      items: [
        "Produsen Material - Segera lakukan gap analysis terhadap standar baru, prioritaskan investasi pada pengembangan produk yang paling signifikan dampaknya",
        "Importir dan Distributor - Perbarui spesifikasi pengadaan dan verifikasi sertifikasi internasional yang setara dengan SNI terbaru",
        "Kontraktor - Audit rantai pasok material, perbarui database spesifikasi internal, dan tingkatkan keterampilan staf terkait kontrol kualitas",
        "Konsultan Perencana - Tingkatkan pengetahuan tentang material alternatif yang memenuhi standar baru, dan integrasikan pertimbangan keberlanjutan dalam desain",
        "Pengembang - Evaluasi struktur biaya untuk mengakomodasi potensi kenaikan biaya material, dan komunikasikan nilai tambah kepada pembeli",
        "Lembaga Pendidikan - Perbarui kurikulum terkait material konstruksi dan standar bangunan untuk mempersiapkan tenaga kerja masa depan"
      ]
    },
    {
      type: "paragraph",
      content: "Pro-aktivitas dalam mengantisipasi dan mempersiapkan diri menghadapi perubahan standar akan memberikan keunggulan kompetitif dalam industri yang semakin menekankan kualitas dan keberlanjutan."
    },
    {
      type: "subheading",
      content: "Kesimpulan"
    },
    {
      type: "paragraph",
      content: "Penyesuaian Standar Nasional Indonesia untuk bahan bangunan 2024 merepresentasikan langkah penting dalam evolusi sektor konstruksi nasional. Perubahan ini merespons tuntutan peningkatan ketahanan infrastruktur, pertimbangan keberlanjutan, dan kebutuhan harmonisasi dengan standar global."
    },
    {
      type: "paragraph",
      content: "Meskipun akan membawa tantangan adaptasi dalam jangka pendek, terutama terkait biaya kepatuhan dan penyesuaian proses, manfaat jangka panjang dalam hal keamanan, ketahanan, dan keberlanjutan memberikan justifikasi kuat untuk transisi ini. Bagi pelaku industri, perubahan ini sebaiknya dipandang sebagai katalis untuk inovasi dan peningkatan kualitas, bukan semata-mata beban regulasi tambahan."
    },
    {
      type: "paragraph",
      content: "Dengan persiapan yang memadai, pemahaman mendalam tentang perubahan teknis, dan strategi implementasi yang terencana, industri konstruksi Indonesia dapat memanfaatkan momentum ini untuk meningkatkan standar dan daya saing secara keseluruhan, serta berkontribusi pada pembangunan infrastruktur nasional yang lebih berkelanjutan dan tangguh."
    }
  ],
  relatedArticles: [
    {
      id: 3,
      title: "Ingin Renovasi Rumah? Ketahui Sejumlah Izin yang Wajib Dipenuhi",
      excerpt: "Panduan lengkap tentang izin-izin yang perlu disiapkan sebelum memulai renovasi rumah untuk menghindari masalah hukum.",
      category: "Regulasi",
      image: "/images/berita3/b3-g2.jpg",
      date: "20 Sep 2024",
      readTime: "5 menit",
      slug: "izin-wajib-renovasi-rumah-2024"
    },
    {
      id: 4,
      title: "Perubahan Regulasi IMB dan Dampaknya pada Konstruksi",
      excerpt: "Analisis perubahan peraturan perizinan bangunan terbaru di Indonesia dan strategi adaptasinya.",
      category: "Regulasi",
      image: "/images/berita4/b4-g4.png",
      date: "5 Feb 2024",
      readTime: "7 menit",
      slug: "perubahan-regulasi-imb-2024"
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
    }
  ],
  tags: ["standar sni", "material konstruksi", "regulasi bangunan", "industri konstruksi", "bahan bangunan", "keberlanjutan"]
};

// Halaman detail artikel
export default function SNIStandardsArticleDetail() {
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
          src={sniStandardsArticle.image}
          alt={sniStandardsArticle.title}
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
              {sniStandardsArticle.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {sniStandardsArticle.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{sniStandardsArticle.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {sniStandardsArticle.readTime}</span>
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
              src={sniStandardsArticle.authorImage} 
              alt={sniStandardsArticle.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{sniStandardsArticle.author}</h3>
              <p className="text-sm text-gray-600">{sniStandardsArticle.authorRole}</p>
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
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(sniStandardsArticle.title)}`, '_blank')}
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
            {sniStandardsArticle.content.map((block, index) => {
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
                  
                // Continuing from the partial code:
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
              {sniStandardsArticle.tags.map((tag, index) => (
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
            {sniStandardsArticle.relatedArticles.map((relatedArticle, index) => (
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