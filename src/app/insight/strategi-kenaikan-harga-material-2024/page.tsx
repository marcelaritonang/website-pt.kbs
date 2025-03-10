'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';
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

// Data artikel untuk kontraktor - versi revisi
const contractorArticle = {
  id: 2,
  title: "5 Strategi Jitu Kontraktor Hadapi Kenaikan Biaya Operasional 2023-2024",
  excerpt: "Panduan praktis bagi pelaku bisnis konstruksi untuk bertahan di tengah fluktuasi harga material dan tenaga kerja.",
  category: "Manajemen",
  image: "/images/berita2/gambar2.png",
  date: "15 Desember 2023",
  readTime: "4 menit",
  author: "Andre Sukanto",
  authorRole: "Komisaris KBS",
  authorImage: "/images/logo-kbs.png",
  slug: "strategi-kenaikan-harga-material-2024",
  content: [
    {
      type: "paragraph",
      content: "Sektor konstruksi Indonesia saat ini dihadapkan pada tantangan serius akibat ketidakstabilan ekonomi, lonjakan harga bahan baku, dan disrupsi rantai pasok global. Para kontraktor perlu merumuskan strategi yang tepat untuk menekan biaya operasional tanpa mengorbankan kualitas pekerjaan. Melalui artikel ini, kami sajikan berbagai pendekatan yang telah terbukti efektif membantu pelaku industri konstruksi bertahan bahkan berkembang di tengah tekanan biaya yang terus meningkat."
    },
    {
      type: "subheading",
      content: "1. Pengelolaan Anggaran yang Presisi"
    },
    {
      type: "paragraph",
      content: "Fondasi dari manajemen biaya yang efektif adalah penganggaran yang detail dan akurat. Kontraktor perlu mengadopsi sistem penganggaran zero-based yang mengevaluasi setiap komponen biaya dari awal, bukan sekadar menyesuaikan angka dari proyek sebelumnya. Implementasikan software manajemen keuangan proyek yang terintegrasi untuk melacak pengeluaran secara real-time dan mengidentifikasi potensi penyimpangan anggaran sebelum terlambat. Lakukan analisis sensitivitas untuk mengantisipasi fluktuasi harga material dan siapkan rencana kontingensi yang realistis untuk setiap skenario perubahan biaya."
    },
    {
      type: "subheading",
      content: "2. Optimalisasi Penggunaan Material dan Tenaga Kerja"
    },
    {
      type: "paragraph",
      content: "Pendekatan Lean Construction menjadi kunci dalam mengoptimalkan pemanfaatan sumber daya. Kurangi waste material melalui perencanaan kuantitas yang akurat dan pengelolaan inventaris yang efisien. Analisis kebutuhan tenaga kerja secara cermat, tentukan kapan tepat menggunakan subkontraktor dan kapan lebih ekonomis untuk mempekerjakan tim tetap. Manfaatkan teknologi BIM (Building Information Modeling) untuk meminimalisir kesalahan desain yang berpotensi menyebabkan pemborosan material dan waktu pekerjaan ulang."
    },
    {
      type: "list",
      items: [
        "Terapkan metode Just-In-Time untuk pengadaan material proyek",
        "Rotasi tenaga kerja untuk mengoptimalkan produktivitas",
        "Gunakan prefabrikasi untuk komponen bangunan yang berulang",
        "Audit penggunaan material secara berkala",
        "Integrasikan teknologi pelacakan inventaris digital"
      ]
    },
    {
      type: "image",
      url: "/images/berita2/gambar1.png",
      caption: "Implementasi teknologi modern dalam proyek konstruksi dapat signifikan meningkatkan efisiensi dan mengurangi biaya operasional"
    },
    {
      type: "subheading",
      content: "3. Adopsi Teknologi dan Inovasi Konstruksi"
    },
    {
      type: "paragraph",
      content: "Digitalisasi proses konstruksi bukan lagi pilihan melainkan keharusan untuk tetap kompetitif. Investasi pada teknologi seperti drone untuk survei lokasi, IoT untuk pemantauan peralatan, dan software manajemen proyek berbasis cloud terbukti memberikan ROI signifikan melalui efisiensi operasional. Pertimbangkan metode konstruksi modular dan teknik fabrikasi off-site yang dapat mempercepat timeline proyek dan mengurangi biaya tenaga kerja di lapangan sampai 20-30%."
    },
    {
      type: "subheading",
      content: "4. Diversifikasi Pemasok dan Negosiasi Strategis"
    },
    {
      type: "paragraph",
      content: "Mengandalkan pemasok tunggal untuk material kritis seperti kanal C, besi beton, atau semen meningkatkan risiko bisnis Anda. Kembangkan jaringan pemasok alternatif dan jalin kemitraan jangka panjang yang saling menguntungkan. Negosiasikan kontrak kerangka kerja (framework agreement) dengan pemasok utama yang menjamin stabilitas harga untuk periode tertentu. Gabungkan pembelian dengan kontraktor lain untuk meningkatkan daya tawar dan mendapatkan diskon volume yang lebih baik. Selalu pantau tren harga material sebelum mengajukan penawaran proyek baru."
    },
    {
      type: "quote",
      content: "Perusahaan konstruksi yang berinvestasi pada pengelolaan rantai pasok dan hubungan pemasok yang strategis rata-rata mengalami penghematan 12-15% pada biaya material dibandingkan kompetitor mereka.",
      author: "Ahmad Faisal, Konsultan Manajemen Proyek"
    },
    {
      type: "subheading",
      content: "5. Manajemen Risiko dan Fleksibilitas Kontrak"
    },
    {
      type: "paragraph",
      content: "Sertakan klausul eskalasi harga (price escalation clause) dalam kontrak proyek jangka panjang untuk mengantisipasi kenaikan biaya material yang signifikan. Implementasikan strategi hedging untuk material utama yang harganya sangat fluktuatif. Adopsi pendekatan manajemen risiko yang komprehensif, identifikasi potensi risiko biaya sejak tahap awal, dan siapkan rencana mitigasi yang terukur. Pertimbangkan asuransi khusus untuk melindungi proyek dari eskalasi biaya ekstrem akibat faktor-faktor di luar kendali seperti bencana alam atau krisis geopolitik."
    },
    {
      type: "subheading",
      content: "Kesimpulan: Adaptasi Berkelanjutan"
    },
    {
      type: "paragraph",
      content: "Keberhasilan dalam menghadapi tekanan biaya operasional terletak pada kemampuan adaptasi berkelanjutan. Lakukan benchmarking rutin terhadap praktik terbaik industri, investasikan pada pengembangan kapabilitas tim dalam manajemen biaya, dan budayakan efisiensi di seluruh lini organisasi. Dengan menggabungkan pendekatan-pendekatan yang telah kami uraikan, kontraktor dapat tidak hanya bertahan menghadapi tantangan ekonomi saat ini, tetapi juga membangun fondasi yang lebih kuat untuk pertumbuhan jangka panjang."
    },
    {
      type: "paragraph",
      content: "Dengan memperhatikan fluktuasi harga bahan baku seperti kanal C dan besi beton, kontraktor dapat lebih akurat dalam membuat estimasi biaya dan mengoptimalkan penggunaan material. Kuncinya adalah keseimbangan antara efisiensi biaya dan kualitas pekerjaan yang tidak boleh dikompromikan, karena reputasi merupakan aset jangka panjang yang jauh lebih berharga dibandingkan penghematan jangka pendek."
    }
  ],
  tags: ["kontraktor", "manajemen biaya", "konstruksi", "efisiensi operasional", "material bangunan"]
};

// Halaman detail artikel
export default function ContractorArticleDetail() {
  const router = useRouter();
  // State untuk progress bar
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
          src={contractorArticle.image}
          alt={contractorArticle.title}
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
              {contractorArticle.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {contractorArticle.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{contractorArticle.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {contractorArticle.readTime}</span>
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
              src={contractorArticle.authorImage} 
              alt={contractorArticle.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{contractorArticle.author}</h3>
              <p className="text-sm text-gray-600">{contractorArticle.authorRole}</p>
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
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(contractorArticle.title)}`, '_blank')}
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
            {contractorArticle.content.map((block, index) => {
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
              {contractorArticle.tags.map((tag, index) => (
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
      </div>
    </main>
  );
}