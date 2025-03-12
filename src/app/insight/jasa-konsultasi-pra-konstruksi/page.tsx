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

// Data artikel tentang jasa konsultasi pra-konstruksi
const preConstructionArticle = {
  id: 8,
  title: "Jasa Konsultasi Pra-Konstruksi untuk Optimalisasi Anggaran",
  excerpt: "Bagaimana perencanaan matang sejak awal dapat menghemat biaya dan waktu pelaksanaan proyek konstruksi serta meningkatkan kualitas hasil akhir.",
  category: "Layanan",
  image: "/images/berita8/gambar1-b8.jpeg",
  date: "5 Januari 2024",
  readTime: "4 menit",
  author: "Tim Redaksi KBS",
  authorRole: "Divisi Konsultasi",
  authorImage: "/images/logo-kbs.png",
  slug: "jasa-konsultasi-pra-konstruksi",
  content: [
    {
      type: "paragraph",
      content: "Keberhasilan sebuah proyek konstruksi tidak hanya ditentukan pada tahap pelaksanaan, tetapi sangat dipengaruhi oleh kualitas perencanaan awal. Jasa konsultasi pra-konstruksi merupakan pendekatan strategis yang semakin penting dalam upaya optimalisasi anggaran, efisiensi waktu, dan peningkatan kualitas hasil akhir proyek. Artikel ini akan membahas bagaimana layanan tersebut dapat memberikan nilai tambah signifikan bagi pemilik proyek."
    },
    {
      type: "image",
      url: "/images/berita8/gambar2-b8.jpg",
      caption: "Tim konsultan pra-konstruksi sedang melakukan analisis perencanaan proyek"
    },
    {
      type: "subheading",
      content: "Apa itu Konsultasi Pra-Konstruksi?"
    },
    {
      type: "paragraph",
      content: "Konsultasi pra-konstruksi adalah proses perencanaan komprehensif yang dilakukan sebelum tahap konstruksi dimulai. Layanan ini melibatkan analisis mendalam terhadap berbagai aspek proyek, mulai dari kelayakan konsep, perencanaan anggaran, pemilihan metode konstruksi, hingga pengembangan strategi pengadaan dan penjadwalan. Tujuan utamanya adalah memastikan proyek berjalan efisien dengan meminimalkan risiko dan memaksimalkan nilai investasi."
    },
    {
      type: "paragraph",
      content: "Menurut studi dari Construction Industry Institute (CII), proyek yang menginvestasikan 5-10% dari total anggaran untuk tahap perencanaan pra-konstruksi mampu menghemat hingga 20% dari total biaya proyek dan mengurangi durasi pelaksanaan hingga 30%. Angka ini menunjukkan pentingnya perencanaan matang sebelum pelaksanaan konstruksi dimulai."
    },
    {
      type: "subheading",
      content: "Manfaat Utama Konsultasi Pra-Konstruksi"
    },
    {
      type: "paragraph",
      content: "Investasi dalam layanan konsultasi pra-konstruksi memberikan berbagai manfaat strategis yang berdampak langsung pada kesuksesan proyek. Berdasarkan pengalaman dan data empiris dari berbagai proyek di Indonesia, berikut adalah beberapa manfaat utamanya:"
    },
    {
      type: "list",
      items: [
        "Penghematan Biaya - Identifikasi awal potensi masalah dan optimalisasi desain dapat menghemat 15-25% dari total biaya proyek",
        "Penjadwalan Efektif - Perencanaan yang realistis mengurangi keterlambatan dan risiko penyimpangan jadwal hingga 40%",
        "Peningkatan Kualitas - Analisis komprehensif memastikan pemilihan material dan metode konstruksi optimal",
        "Mitigasi Risiko - Identifikasi dini dan pengelolaan risiko proyek mengurangi potensi masalah selama pelaksanaan",
        "Efisiensi Pengadaan - Strategi pengadaan yang tepat memaksimalkan nilai dan kualitas dari setiap rupiah yang diinvestasikan",
        "Sinkronisasi Tim - Memastikan semua pemangku kepentingan memiliki pemahaman dan ekspektasi yang sama terhadap proyek"
      ]
    },
    {
      type: "quote",
      content: "Investasi dalam perencanaan pra-konstruksi adalah investasi dalam keberhasilan proyek. Lebih baik menghabiskan waktu di atas kertas daripada menghadapi masalah di lapangan yang jauh lebih mahal dan menyita waktu.",
      author: "Ir. Bambang Susanto, Senior Konsultan Konstruksi"
    },
    {
      type: "subheading",
      content: "Komponen Layanan Konsultasi Pra-Konstruksi"
    },
    {
      type: "paragraph",
      content: "Layanan konsultasi pra-konstruksi yang komprehensif mencakup beberapa komponen penting yang saling terintegrasi:"
    },
    {
      type: "list",
      items: [
        "Studi Kelayakan - Evaluasi aspek teknis, finansial, dan regulasi untuk menentukan kelayakan proyek",
        "Pengembangan Konsep - Eksplorasi dan pengembangan alternatif desain yang memenuhi tujuan proyek",
        "Estimasi Biaya - Penyusunan anggaran detail dengan metode bottom-up untuk akurasi maksimal",
        "Analisis Nilai (Value Engineering) - Evaluasi sistematis untuk mengoptimalkan nilai tanpa mengorbankan kualitas",
        "Perencanaan Konstruksi - Pengembangan strategi pelaksanaan yang efisien dan minim risiko",
        "Penjadwalan Master - Penyusunan jadwal realistis dengan mempertimbangkan semua batasan dan ketergantungan",
        "Strategi Pengadaan - Pengembangan pendekatan yang optimal untuk pemilihan kontraktor dan supplier",
        "Manajemen Risiko - Identifikasi, analisis, dan pengembangan strategi mitigasi risiko proyek"
      ]
    },
    {
      type: "subheading",
      content: "Kondisi Proyek yang Membutuhkan Konsultasi Pra-Konstruksi"
    },
    {
      type: "paragraph",
      content: "Tidak semua proyek memiliki kebutuhan yang sama terhadap layanan konsultasi pra-konstruksi. Namun, terdapat beberapa kondisi di mana layanan ini menjadi sangat krusial:"
    },
    {
      type: "list",
      items: [
        "Proyek dengan Kompleksitas Tinggi - Bangunan dengan sistem khusus atau fungsi spesifik",
        "Batasan Anggaran Ketat - Proyek dengan budget terbatas yang membutuhkan optimalisasi maksimal",
        "Jadwal Terbatas - Proyek dengan target penyelesaian yang agresif dan tidak fleksibel",
        "Proyek Berisiko Tinggi - Konstruksi pada lokasi yang sulit atau dengan teknologi baru",
        "Pengalaman Terbatas - Pemilik proyek yang belum berpengalaman dalam mengembangkan proyek serupa",
        "Stakeholder Beragam - Proyek yang melibatkan banyak pemangku kepentingan dengan kepentingan berbeda"
      ]
    },
    {
      type: "subheading",
      content: "Studi Kasus: Optimalisasi Proyek Gedung Perkantoran"
    },
    {
      type: "paragraph",
      content: "Salah satu contoh keberhasilan implementasi konsultasi pra-konstruksi dapat dilihat dari proyek pembangunan gedung perkantoran 12 lantai di Jakarta. Dengan anggaran awal Rp85 miliar dan target penyelesaian 18 bulan, pemilik proyek menghadapi tantangan besar untuk memenuhi ekspektasi kualitas dalam keterbatasan yang ada."
    },
    {
      type: "paragraph",
      content: "Tim konsultan pra-konstruksi melakukan analisis komprehensif dan mengidentifikasi beberapa area optimalisasi, termasuk:"
    },
    {
      type: "list",
      items: [
        "Perubahan sistem struktur yang menghemat 12% biaya material tanpa mengurangi kekuatan",
        "Redesain sistem MEP (Mekanikal, Elektrikal, Plumbing) untuk efisiensi operasional jangka panjang",
        "Strategi pengadaan bertahap yang mengoptimalkan aliran kas dan pemanfaatan sumber daya",
        "Penjadwalan yang mempertimbangkan kondisi cuaca dan ketersediaan material di pasaran"
      ]
    },
    {
      type: "paragraph",
      content: "Hasil akhir: proyek tersebut berhasil diselesaikan dalam waktu 16 bulan dengan biaya total Rp78 miliar, menghemat 8% anggaran dan 2 bulan waktu pelaksanaan. Yang lebih penting, gedung memiliki efisiensi operasional 15% lebih baik dari desain awal, memberikan penghematan jangka panjang yang signifikan."
    },
    {
      type: "subheading",
      content: "Memilih Konsultan Pra-Konstruksi yang Tepat"
    },
    {
      type: "paragraph",
      content: "Keberhasilan konsultasi pra-konstruksi sangat bergantung pada kualitas konsultan yang dipilih. Berikut adalah beberapa kriteria yang perlu dipertimbangkan dalam memilih mitra konsultan:"
    },
    {
      type: "list",
      items: [
        "Pengalaman Relevan - Telah menangani proyek dengan skala dan kompleksitas serupa",
        "Multi-disiplin - Memiliki tim dengan berbagai latar belakang keahlian (struktural, MEP, arsitektur, manajemen proyek)",
        "Pendekatan Berbasis Data - Menggunakan analisis kuantitatif dan metodologi terstruktur dalam rekomendasi",
        "Komunikasi Efektif - Mampu menjelaskan konsep teknis secara jelas kepada stakeholder non-teknis",
        "Pemahaman Pasar Lokal - Mengenal dengan baik kondisi industri konstruksi lokal, termasuk peraturan, supplier, dan kontraktor",
        "Reputasi Baik - Memiliki rekam jejak keberhasilan yang dapat diverifikasi dan referensi positif dari klien sebelumnya"
      ]
    },
    {
      type: "subheading",
      content: "Kesimpulan"
    },
    {
      type: "paragraph",
      content: "Jasa konsultasi pra-konstruksi merupakan investasi strategis yang menawarkan pengembalian signifikan dalam bentuk penghematan biaya, efisiensi waktu, dan peningkatan kualitas proyek. Dalam lanskap konstruksi yang semakin kompleks dan kompetitif, pendekatan proaktif melalui perencanaan komprehensif sejak awal menjadi pembeda utama antara proyek yang berhasil dan yang menghadapi berbagai masalah selama pelaksanaan."
    },
    {
      type: "paragraph",
      content: "Dengan melibatkan konsultan pra-konstruksi yang berpengalaman, pemilik proyek dapat memaksimalkan nilai investasi mereka, meminimalkan risiko, dan mencapai hasil akhir yang sesuai dengan ekspektasi atau bahkan melebihinya. Pendekatan ini memungkinkan pengambilan keputusan berbasis data dan pertimbangan mendalam, bukan sekadar intuisi atau kebiasaan lama yang tidak selalu optimal."
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
      id: 7,
      title: "Manajemen Risiko Proyek Konstruksi Skala Menengah",
      excerpt: "Pendekatan sistematis untuk mengidentifikasi dan memitigasi risiko dalam proyek konstruksi.",
      category: "Manajemen",
      image: "/images/berita7/gambar1-b7.jpg",
      date: "10 Jan 2024",
      readTime: "5 menit",
      slug: "manajemen-risiko-proyek-konstruksi"
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
    }
  ],
  tags: ["konsultasi pra-konstruksi", "optimalisasi anggaran", "manajemen proyek", "perencanaan konstruksi", "efisiensi proyek"]
};

// Halaman detail artikel
export default function PreConstructionArticleDetail() {
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
          src={preConstructionArticle.image}
          alt={preConstructionArticle.title}
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
              {preConstructionArticle.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {preConstructionArticle.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{preConstructionArticle.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {preConstructionArticle.readTime}</span>
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
              src={preConstructionArticle.authorImage} 
              alt={preConstructionArticle.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{preConstructionArticle.author}</h3>
              <p className="text-sm text-gray-600">{preConstructionArticle.authorRole}</p>
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
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(preConstructionArticle.title)}`, '_blank')}
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
            {preConstructionArticle.content.map((block, index) => {
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
          
          {/* Tags - tanpa link */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 mb-16"
          >
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Tags:</span>
              {preConstructionArticle.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700"
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
            {preConstructionArticle.relatedArticles.map((relatedArticle, index) => (
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