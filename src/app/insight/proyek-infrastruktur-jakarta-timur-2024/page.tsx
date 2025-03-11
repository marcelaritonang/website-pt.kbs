'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Define proper TypeScript interfaces for your data
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

interface ArticleData {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorImage: string;
  slug: string;
  content: ContentBlock[];
  relatedArticles: RelatedArticle[];
  tags: string[];
}

// Data untuk halaman detail artikel
const article: ArticleData = {
  id: 1,
  title: "PUPR Fokuskan Anggaran 2024 untuk Penyelesaian Infrastruktur Prioritas",
  excerpt: "Menteri PUPR menegaskan penyelesaian program strategis nasional dan kegiatan prioritas melalui kontrak tahun jamak menjadi fokus utama anggaran 2024.",
  category: "Regulasi",
  image: "/images/blog/rapat-pupr.jpg",
  date: "12 Maret 2024",
  readTime: "5 menit",
  author: "Admin KBS",
  authorRole: "Pengelola Konten",
  authorImage: "/images/logo-kbs.png",
  slug: "pupr-fokuskan-anggaran-2024-infrastruktur-prioritas",
  content: [
    {
      type: "paragraph",
      content: "Jakarta - Menteri Pekerjaan Umum dan Perumahan Rakyat (PUPR) Basuki Hadimuljono mengungkapkan anggaran pada tahun depan difokuskan untuk penyelesaian pembangunan infrastruktur prioritas."
    },
    {
      type: "paragraph",
      content: "\"Prioritas utama program tahun anggaran atau TA 2024 yaitu penyelesaian Program Strategis Nasional dan kegiatan prioritas melalui kontrak tahun jamak (multiyears contract atau MYC), pelaksanaan program OPOR (Operasi, Pemeliharaan, Optimalisasi, dan Rehabilitasi), serta pelaksanaan direktif Presiden, di antaranya pembangunan pasar, jalan daerah, air minum, dan sekolah,\" kata Basuki dalam rapat kerja (raker) bersama Komisi V DPR RI, di Jakarta, Rabu."
    },
    {
      type: "paragraph",
      content: "Dia mengatakan, sesuai arahan Presiden Joko Widodo (Jokowi), seluruh pekerjaan konstruksi program TA 2024 tuntas pada tahun 2024, sehingga infrastruktur tersebut dapat segera dirasakan manfaatnya oleh masyarakat."
    },
    {
      type: "image",
      url: "/images/blog/basuki-Hadimuljono.jpg",
      caption: "Menteri PUPR Basuki Hadimuljono saat rapat kerja bersama Komisi V DPR RI di Jakarta"
    },
    {
      type: "subheading",
      content: "Rincian Anggaran dan Alokasi PUPR 2024"
    },
    {
      type: "paragraph",
      content: "Pagu anggaran Kementerian PUPR TA 2024 ditetapkan sebesar Rp146,98 triliun. Kegiatan prioritas bidang sumber daya air sebesar Rp47,64 triliun, antara lain pembangunan 23 unit bendungan, revitalisasi danau, pembangunan irigasi 4.000 hektare, rehabilitasi dan peningkatan irigasi 38.000 hektare, pembangunan pengendali banjir dan pengaman pantai 57,5 km, pembangunan prasarana air baku kapasitas 2,5 m3/detik, dan pembangunan 7 unit embung."
    },
    {
      type: "paragraph",
      content: "\"Kegiatan prioritas bidang jalan dan jembatan sebesar Rp55,40 triliun, antara lain peningkatan konektivitas jalan bebas hambatan 546,13 km, preservasi rutin jalan 47.603 km, peningkatan kapasitas dan preservasi peningkatan struktur jalan 2.117,75 km, preservasi dan penggantian jembatan 7,12 km, pembangunan jalan 318,41 km, pembangunan dan duplikasi jembatan 3,89 km, peningkatan aksesibilitas flyover/underpass/terowongan 918,75 meter, serta dukungan Inpres Jalan Daerah 26,25 km,\" kata Basuki."
    },
    {
      type: "subheading",
      content: "Fokus pada Permukiman dan Perumahan"
    },
    {
      type: "paragraph",
      content: "Pada bidang permukiman sebesar Rp32,70 triliun, antara lain pembangunan dan peningkatan Sistem Penyediaan Air Minum (SPAM) kapasitas 2.985 liter/detik, perluasan SPAM sebanyak 20.638 sambungan rumah (SR), sistem pengelolaan air limbah domestik dengan layanan 11.370 kepala keluarga (KK), sistem pengelolaan persampahan dengan layanan 231.012 KK, Tempat Pengolahan Sampah Reduce-Reuse-Recycle (TPS3R) di 173 lokasi, sanitasi di 1.279 lembaga pendidikan keagamaan, dan penataan Kawasan Strategis Pariwisata Nasional (KSPN)."
    },
    {
      type: "list",
      items: [
        "Pengembangan penyelenggaraan bangunan gedung seluas 27.720 m²",
        "Pengembangan penyelenggaraan penataan bangunan dan lingkungan di 5 kawasan",
        "Rehabilitasi dan renovasi sarana prasarana sekolah/madrasah sebanyak 328 unit",
        "Rehabilitasi dan renovasi 25 pasar",
        "Pembangunan sarana prasarana olahraga sebanyak 25 unit",
        "Renovasi 21 stadion"
      ]
    },
    {
      type: "quote",
      content: "Seluruh pekerjaan konstruksi program TA 2024 harus tuntas pada tahun 2024, sehingga infrastruktur tersebut dapat segera dirasakan manfaatnya oleh masyarakat.",
      author: "Basuki Hadimuljono, Menteri PUPR"
    },
    {
      type: "subheading",
      content: "Dukungan Manajemen dan Pengembangan Infrastruktur"
    },
    {
      type: "paragraph",
      content: "Selanjutnya pada bidang perumahan sebesar Rp9,25 triliun, antara lain pembangunan rumah susun (lanjutan pembangunan rusun ASN dan Hankam di IKN 2.585 unit, rusun bersifat kontrak MYC 2023-2024 sebanyak 2.316 unit, dan pembangunan rusun baru direktif 578 unit). Lalu, pembangunan rumah khusus (rusus) terdampak bencana 553 unit, lanjutan pembangunan hunian tetap (huntap) di Sulawesi Tengah, dan pembangunan rumah tapak jabatan menteri di IKN (36 unit), pembangunan Prasarana, Sarana dan Utilitas (PSU) 26.686 unit untuk perumahan bagi masyarakat berpenghasilan rendah (MBR)."
    },
    {
      type: "paragraph",
      content: "Sedangkan dukungan manajemen di Direktorat Jenderal (Ditjen) Bina Konstruksi, Ditjen Pembiayaan Infrastruktur PU dan Perumahan, dan Badan Pengembangan Infrastruktur Wilayah (BPIW) sebesar Rp1,99 triliun terdiri dari perencanaan, pembinaan konstruksi, pengawasan, pembiayaan infrastruktur, penguatan SDM, dan layanan manajemen."
    },
    {
      type: "paragraph",
      content: "Dengan alokasi anggaran ini, diharapkan bahwa seluruh proyek infrastruktur prioritas dapat diselesaikan tepat waktu dan memberikan manfaat maksimal bagi masyarakat. Kementerian PUPR terus berkomitmen untuk mendukung pembangunan infrastruktur yang berkesinambungan demi kemajuan ekonomi nasional."
    }
  ],
  relatedArticles: [
    {
      id: 2,
      title: "Strategi Menghadapi Kenaikan Harga Material Konstruksi",
      excerpt: "Pendekatan praktis mengoptimalkan biaya proyek di tengah fluktuasi harga material bangunan.",
      category: "Manajemen",
      image: "/images/berita2/gambar2.png",
      date: "28 Feb 2024",
      readTime: "4 menit",
      slug: "strategi-kenaikan-harga-material-2024"
    },
    {
      id: 4,
      title: "Perubahan Regulasi IMB dan Dampaknya pada Konstruksi",
      excerpt: "Analisis perubahan peraturan perizinan bangunan terbaru di Indonesia dan strategi adaptasinya.",
      category: "Regulasi",
      image: "/images/berita4/b4-g2.png",
      date: "5 Feb 2024",
      readTime: "7 menit",
      slug: "perubahan-regulasi-imb-2024"
    },
    {
      id: 9,
      title: "Penyesuaian Standar SNI untuk Bahan Bangunan 2024",
      excerpt: "Perubahan regulasi standar nasional untuk material konstruksi dan implikasinya pada industri.",
      category: "Regulasi",
      image: "/images/articles/building-standards/hero.jpg",
      date: "28 Des 2023",
      readTime: "6 menit",
      slug: "perubahan-standar-sni-bahan-bangunan"
    }
  ],
  tags: ["infrastruktur", "pupr", "anggaran", "2024", "pembangunan", "regulasi"]
};

// Halaman detail artikel
export default function ArticleDetail() {
  const router = useRouter();
  // State untuk progress bar yang menunjukkan seberapa jauh pembacaan artikel
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
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
          src={article.image}
          alt={article.title}
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
              {article.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {article.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{article.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {article.readTime}</span>
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
              src={article.authorImage} 
              alt={article.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{article.author}</h3>
              <p className="text-sm text-gray-600">{article.authorRole}</p>
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
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
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
            {article.content.map((block, index) => {
              const delay = 0.4 + (index * 0.05);
              
              // Filtering out certain images to make the article more focused
              if (block.type === 'image' && 
                  (block.url === "/images/articles/infrastructure-priority/water-system.jpg" || 
                   block.url === "/images/articles/infrastructure-priority/dam-construction.jpg")) {
                return null;
              }
              
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
                      <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-md">
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
              {article.tags.map((tag, index) => (
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
            {article.relatedArticles.map((relatedArticle, index) => (
              <Link 
                key={relatedArticle.id} 
                href={`/insight/${relatedArticle.slug}`}
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
                    
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-[#153969] transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
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