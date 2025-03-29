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

// Data artikel tentang manajemen risiko proyek konstruksi
const riskManagementArticle = {
  id: 7,
  title: "Manajemen Risiko Proyek Konstruksi: Strategi Efektif untuk Keberhasilan Proyek",
  excerpt: "Pendekatan sistematis untuk mengidentifikasi dan memitigasi risiko dalam proyek konstruksi skala menengah untuk meningkatkan peluang keberhasilan.",
  category: "Manajemen",
  image: "/images/berita7/gambar1-b7.jpg",
  date: "10 Januari 2024",
  readTime: "5 menit",
  author: "Tim Redaksi KBS",
  authorRole: "Divisi Manajemen Proyek",
  authorImage: "/images/logo-kbs.png",
  slug: "manajemen-risiko-proyek-konstruksi",
  content: [
    {
      type: "paragraph",
      content: "Dalam industri konstruksi yang dinamis, ketidakpastian merupakan hal yang tak terhindarkan. Manajemen risiko konstruksi telah menjadi komponen strategis yang menentukan keberhasilan atau kegagalan proyek, terutama dalam skala menengah di mana sumber daya lebih terbatas dibandingkan proyek-proyek besar. Dengan tingkat kompleksitas proyek yang semakin meningkat, pendekatan sistematis terhadap risiko menjadi kebutuhan, bukan lagi sekadar pilihan."
    },
    {
      type: "image",
      url: "/images/berita7/gambar1-b7.jpg",
      caption: "Ilustrasi manajemen risiko konstruksi dengan tim profesional melakukan analisis proyek"
    },
    {
      type: "subheading",
      content: "Apa itu Manajemen Risiko Konstruksi?"
    },
    {
      type: "paragraph",
      content: "Manajemen risiko konstruksi adalah metodologi sistematis untuk mengidentifikasi, menganalisis, dan merespons faktor-faktor yang berpotensi menghambat keberhasilan proyek. Berdasarkan data dari PMI (Project Management Institute) terbaru, proyek konstruksi yang menerapkan manajemen risiko secara efektif mengalami 28% peningkatan dalam ketepatan waktu penyelesaian dan 23% pengurangan biaya yang tidak dianggarkan."
    },
    {
      type: "paragraph",
      content: "Bukan sekadar tentang menghindari masalah, manajemen risiko modern lebih menekankan pada konversi ketidakpastian menjadi peluang untuk inovasi, efisiensi, dan nilai tambah. Pendekatan ini telah mengalami transformasi signifikan dengan pemanfaatan teknologi digital, analitik data, dan metodologi kolaboratif."
    },
    {
      type: "subheading",
      content: "Mengapa Manajemen Risiko Krusial untuk Proyek Konstruksi"
    },
    {
      type: "paragraph",
      content: "Proyek konstruksi skala menengah di Indonesia menghadapi tantangan unik dari volatilitas harga material hingga kompleksitas regulasi. Penelitian terbaru dari Asosiasi Kontraktor Indonesia menunjukkan bahwa 67% proyek konstruksi mengalami keterlambatan dan 45% melebihi anggaran yang dialokasikan. Manajemen risiko yang efektif memberikan beberapa keuntungan strategis:"
    },
    {
      type: "list",
      items: [
        "Optimalisasi Biaya - Identifikasi dini risiko finansial menurunkan potensi pembengkakan biaya hingga 35%",
        "Ketepatan Jadwal - Pengurangan keterlambatan proyek hingga 40% melalui antisipasi hambatan dan perencanaan kontinjensi",
        "Keamanan yang Ditingkatkan - Penurunan insiden keselamatan hingga 60% melalui analisis risiko proaktif",
        "Kualitas Terjamin - Pengurangan rework dan defect hingga 25% melalui identifikasi risiko kualitas sejak awal",
        "Hubungan Stakeholder yang Lebih Baik - Transparansi dalam pengelolaan risiko meningkatkan kepercayaan semua pihak yang terlibat"
      ]
    },
    {
      type: "subheading",
      content: "Tren Terkini dalam Manajemen Risiko Konstruksi"
    },
    {
      type: "paragraph",
      content: "Inovasi teknologi telah revolusioner mengubah cara risiko dikelola dalam proyek konstruksi. Beberapa tren terkini yang semakin diadopsi di Indonesia termasuk:"
    },
    {
      type: "list",
      items: [
        "Integrasi BIM (Building Information Modeling) - Visualisasi digital proyek untuk identifikasi risiko lebih akurat",
        "IoT dan Sensor Real-time - Pemantauan kondisi lapangan secara langsung untuk deteksi risiko secara instan",
        "Analitik Prediktif - Algoritma AI untuk memprediksi risiko berdasarkan data historis dan tren pasar",
        "Metodologi Agile - Pendekatan iteratif untuk adaptasi cepat terhadap perubahan dan risiko yang muncul",
        "Manajemen Risiko Kolaboratif - Platform berbasis cloud yang memungkinkan semua stakeholder berkontribusi dalam identifikasi dan respons risiko"
      ]
    },
    {
      type: "subheading",
      content: "Kategori Risiko Utama dalam Proyek Konstruksi"
    },
    {
      type: "paragraph",
      content: "Berdasarkan analisis ratusan proyek konstruksi skala menengah di Indonesia, risiko dapat dikelompokkan dalam beberapa kategori utama:"
    },
    {
      type: "list",
      items: [
        "Risiko Finansial - Fluktuasi harga material (terutama baja dan semen yang mengalami volatilitas hingga 40% dalam 2 tahun terakhir), keterlambatan pembayaran, dan perubahan nilai tukar",
        "Risiko Jadwal - Keterlambatan perizinan, kondisi cuaca ekstrem, dan keterbatasan tenaga kerja terampil",
        "Risiko Teknis - Kondisi tanah yang tidak diantisipasi, perubahan desain, dan masalah kualitas material",
        "Risiko Kontraktual - Ketidakjelasan klausul kontrak, perselisihan dengan subkontraktor, dan perubahan lingkup pekerjaan",
        "Risiko Keselamatan dan Lingkungan - Potensi kecelakaan kerja, polusi, dan dampak sosial terhadap komunitas sekitar"
      ]
    },
    {
      type: "subheading",
      content: "Strategi Implementasi Manajemen Risiko Efektif"
    },
    {
      type: "paragraph",
      content: "Untuk mengoptimalkan pengelolaan risiko, kontraktor skala menengah disarankan mengadopsi pendekatan terstruktur dengan langkah-langkah berikut:"
    },
    {
      type: "list",
      items: [
        "Perencanaan Komprehensif - Identifikasi risiko dari awal dengan melibatkan semua stakeholder kunci",
        "Pemetaan Probabilitas dan Dampak - Kuantifikasi risiko berdasarkan kemungkinan terjadinya dan besarnya dampak potensial",
        "Strategi Respons Terukur - Pengembangan rencana mitigasi spesifik untuk setiap risiko signifikan",
        "Alokasi Sumber Daya Strategis - Penempatan anggaran dan tim kontinjensi untuk risiko prioritas tinggi",
        "Pemantauan Berkelanjutan - Penggunaan dashboard digital untuk tracking risiko secara real-time",
        "Evaluasi dan Pembelajaran - Review paska-proyek untuk mengembangkan database risiko internal"
      ]
    },
    {
      type: "quote",
      content: "Kesuksesan proyek konstruksi modern tidak lagi ditentukan oleh seberapa baik kita merespons masalah, tetapi seberapa cerdas kita mengantisipasi dan mengelola risiko sebelum menjadi masalah.",
      author: "Dr. Hendra Wijaya, Pakar Manajemen Konstruksi"
    },
    {
      type: "subheading",
      content: "Kesimpulan"
    },
    {
      type: "paragraph",
      content: "Manajemen risiko konstruksi telah berevolusi dari pendekatan reaktif menjadi strategi proaktif yang memberikan keunggulan kompetitif bagi perusahaan konstruksi di era yang semakin tidak pasti. Dengan mengadopsi metodologi terbaru dan memanfaatkan teknologi digital, kontraktor skala menengah dapat meningkatkan tingkat keberhasilan proyek secara signifikan."
    },
    {
      type: "paragraph",
      content: "Investasi dalam sistem manajemen risiko yang efektif bukan lagi dipandang sebagai biaya tambahan, melainkan komponen esensial yang memberikan pengembalian investasi melalui pengurangan biaya, peningkatan efisiensi, dan reputasi yang lebih baik di industri. Dalam lanskap konstruksi Indonesia yang terus berkembang, kemampuan untuk mengelola risiko dengan cerdas akan menjadi pembeda utama antara perusahaan yang hanya bertahan dengan perusahaan yang benar-benar unggul."
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
  tags: ["manajemen risiko", "proyek konstruksi", "mitigasi risiko", "efisiensi konstruksi", "keberhasilan proyek"]
};

// Halaman detail artikel
export default function RiskManagementArticleDetail() {
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
          src={riskManagementArticle.image}
          alt={riskManagementArticle.title}
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
              {riskManagementArticle.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {riskManagementArticle.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{riskManagementArticle.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {riskManagementArticle.readTime}</span>
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
              src={riskManagementArticle.authorImage} 
              alt={riskManagementArticle.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{riskManagementArticle.author}</h3>
              <p className="text-sm text-gray-600">{riskManagementArticle.authorRole}</p>
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
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(riskManagementArticle.title)}`, '_blank')}
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
            {riskManagementArticle.content.map((block, index) => {
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
              {riskManagementArticle.tags.map((tag, index) => (
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
          {riskManagementArticle.relatedArticles.map((relatedArticle, index) => (
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