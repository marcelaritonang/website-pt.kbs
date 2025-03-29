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

// Data artikel untuk izin renovasi rumah
const renovationArticle = {
  id: 3,
  title: "Ingin Renovasi Rumah? Ketahui Sejumlah Izin yang Wajib Dipenuhi",
  excerpt: "Panduan lengkap tentang izin-izin yang perlu disiapkan sebelum memulai renovasi rumah untuk menghindari masalah hukum dan konflik dengan tetangga.",
  category: "Regulasi",
  image: "/images/berita3/b3-g1.png",
  date: "20 September 2024",
  readTime: "5 menit",
  author: "Tim Redaksi KBS",
  authorRole: "Adaptasi dari detikProperti",
  authorImage: "/images/logo-kbs.png",
  slug: "izin-wajib-renovasi-rumah-2024",
  content: [
    {
      type: "paragraph",
      content: "Merenovasi rumah tak hanya sekadar menghitung biaya yang harus dikeluarkan, tetapi juga perlu menyiapkan beberapa izin yang wajib dipenuhi. Meskipun merenovasi rumah merupakan hak pemilik, namun selama proses renovasi dapat bersinggungan dengan kenyamanan dan ketertiban lingkungan tempat tinggal."
    },
    {
      type: "paragraph",
      content: "Sebagai contoh, suara berisik dari para tukang yang sedang getok-getok palu atau merobohkan tembok. Lalu, suara dari tukang yang sedang memotong keramik atau kayu sering mengganggu kenyamanan. Belum lagi debu-debu bangunan yang bertebangan membuat halaman rumah tetangga mudah kotor."
    },
    {
      type: "paragraph",
      content: "Hal-hal tersebut tentu harus dipikirkan oleh pemilik rumah sebelum melakukan renovasi. Jika tidak, maka dikhawatirkan dapat memicu konflik dengan tetangga yang tak senang dengan aktivitas renovasi rumah."
    },
    {
      type: "image",
      url: "/images/berita3/b3-g2.jpg",
      caption: "Aktivitas renovasi rumah dapat menimbulkan gangguan bagi lingkungan sekitar jika tidak dipersiapkan dengan baik"
    },
    {
      type: "subheading",
      content: "Izin yang Wajib Dipenuhi Sebelum Renovasi Rumah"
    },
    {
      type: "paragraph",
      content: "Andi Saputra selaku advokat hukum mengatakan, ada beberapa izin yang harus dipenuhi oleh pemilik rumah sebelum melakukan renovasi. Berikut adalah beberapa izin renovasi rumah yang wajib disiapkan:"
    },
    {
      type: "list",
      items: [
        "Meminta Izin Kepada Tetangga Sekitar",
        "Izin Mendirikan Bangunan (IMB) atau Persetujuan Bangunan Gedung (PBG)",
        "Meminta Izin Kepada Pihak Berwenang (RT/RW)"
      ]
    },
    {
      type: "subheading",
      content: "1. Meminta Izin Kepada Tetangga Sekitar"
    },
    {
      type: "paragraph",
      content: "Dalam hal ini, izin yang dimaksud bukanlah izin tertulis. Izin kepada tetangga sekitar cukup lewat verbal, seperti yang dilakukan pada umumnya. Anda bisa mengadakan syukuran dengan mengundang tetangga sekitar untuk mendoakan kelancaran pembangunan renovasi."
    },
    {
      type: "paragraph",
      content: "Jika rumah Anda berada di kompleks perumahan, Anda bisa menyampaikan berita renovasi ke grup WhatsApp. Lewat pesan yang dikirim ke grup tetangga, Anda bisa menyampaikan permohonan maaf jika dalam beberapa waktu mendatang akan dilakukan renovasi rumah. Beberapa dampak yang ditimbulkan termasuk suara berisik, debu berterbangan, hingga akses jalan yang mungkin terhambat."
    },
    {
      type: "quote",
      content: "Komunikasi yang baik dengan tetangga sekitar sebelum melakukan renovasi dapat mencegah terjadinya konflik dan memastikan proses renovasi berjalan lancar.",
      author: "Andi Saputra, Advokat Hukum"
    },
    {
      type: "subheading",
      content: "2. Izin Mendirikan Bangunan (IMB)"
    },
    {
      type: "paragraph",
      content: "Saat melakukan renovasi rumah, Anda juga perlu menyiapkan Izin Mendirikan Bangunan (IMB). Izin ini diperlukan jika Anda merenovasi rumah dengan mengubah layout ruang, membongkar tembok untuk memperluas ruang, menambah tingkat bangunan dari lantai 1 menjadi lantai 2, 3, atau 4, hingga merubah fasad rumah walau hanya kecil."
    },
    {
      type: "paragraph",
      content: "Apabila renovasi dilakukan oleh perusahaan profesional, mereka biasanya sudah memasukkan biaya pengurusan IMB dalam paket renovasinya. Jika Anda mengubah fungsi rumah menjadi kos-kosan atau tempat usaha juga membutuhkan IMB."
    },
    {
      type: "paragraph",
      content: "Sebagai informasi, setelah adanya Undang-undang Cipta Kerja, IMB kini telah diganti menjadi Persetujuan Bangunan Gedung (PBG). Aturan ini diatur dalam ketentuan Pasal 24 dan Pasal 185 huruf b Undang-Undang Nomor 11 tahun 2020 tentang Cipta Kerja dan Peraturan Pemerintah Nomor 16 tahun 2021."
    },
    {
      type: "image",
      url: "/images/berita3/b3-g3.jpeg",
      caption: "Dokumen Persetujuan Bangunan Gedung (PBG) yang menggantikan IMB sesuai UU Cipta Kerja"
    },
    {
      type: "subheading",
      content: "3. Meminta Izin Kepada Pihak Berwenang"
    },
    {
      type: "paragraph",
      content: "Agar proses renovasi rumah berjalan lancar tanpa ada gangguan, Anda bisa melapor kepada pihak berwenang seperti RT atau RW. Namun, izin ini sebenarnya tidak terlalu penting dan sah-sah saja jika tidak melapor."
    },
    {
      type: "paragraph",
      content: "Akan tetapi, jika Anda ingin membangun rumah yang membutuhkan izin tertulis berupa tanda tangan dari tetangga di sekitar tempat tinggal, maka perlu menyertakan juga izin dari pihak RT dan RW setempat. Izin ini biasanya muncul karena bangunan yang direnovasi cukup besar dan pengerjaannya lama, sehingga dapat mengganggu ketertiban."
    },
    {
      type: "subheading",
      content: "Konsekuensi Tidak Memenuhi Izin Renovasi"
    },
    {
      type: "paragraph",
      content: "Tidak memenuhi izin yang diperlukan untuk renovasi rumah dapat menyebabkan beberapa konsekuensi. Dalam kasus yang paling ringan, Anda mungkin menghadapi komplain dari tetangga atau bahkan konflik sosial dengan lingkungan sekitar. Pada tingkat yang lebih serius, renovasi tanpa IMB atau PBG dapat mengakibatkan sanksi administratif berupa denda, penghentian pembangunan, atau bahkan pembongkaran."
    },
    {
      type: "paragraph",
      content: "Selain itu, jika terjadi kecelakaan atau kerusakan pada properti tetangga akibat aktivitas renovasi, Anda dapat dimintai pertanggungjawaban hukum dan ganti rugi. Oleh karena itu, sangat penting untuk memastikan semua izin telah dipenuhi sebelum memulai proyek renovasi rumah."
    },
    {
      type: "quote",
      content: "Mengurus izin renovasi mungkin terasa merepotkan pada awalnya, namun akan menjadi investasi jangka panjang untuk mencegah masalah hukum dan menjaga hubungan baik dengan lingkungan sekitar.",
      author: "Pakar Properti"
    },
    {
      type: "subheading",
      content: "Kesimpulan"
    },
    {
      type: "paragraph",
      content: "Merenovasi rumah merupakan keputusan penting yang membutuhkan perencanaan matang, tidak hanya dari segi anggaran dan desain, tetapi juga dalam hal perizinan. Memastikan semua izin yang diperlukan telah dipenuhi sebelum memulai renovasi akan menghindarkan Anda dari masalah hukum dan konflik dengan tetangga."
    },
    {
      type: "paragraph",
      content: "Dengan memperhatikan izin-izin yang telah dijelaskan di atas, proses renovasi rumah Anda dapat berjalan dengan lancar dan tidak merugikan pihak lain. Ingat, komunikasi yang baik dengan tetangga dan pihak berwenang merupakan kunci sukses dalam proyek renovasi rumah."
    }
  ],
  relatedArticles: [
    {
      id: 4,
      title: "Perubahan Regulasi IMB dan Dampaknya pada Konstruksi",
      excerpt: "Analisis perubahan peraturan perizinan bangunan terbaru di Indonesia dan strategi adaptasinya.",
      category: "Regulasi",
      image: "/images/berita4/b4-g4.png",
      date: "5 Februari 2024",
      readTime: "7 menit",
      slug: "perubahan-regulasi-imb-2024"
    },
    {
      id: 10,
      title: "Implementasi BIM untuk Efisiensi Proyek Renovasi Modern",
      excerpt: "Bagaimana Building Information Modeling meningkatkan akurasi, efisiensi biaya, dan kualitas dalam proyek renovasi.",
      category: "Teknologi",
      image: "/images/berita10/gambar1-b10.jpg",
      date: "15 Februari 2024",
      readTime: "7 menit",
      slug: "implementasi-bim-proyek-renovasi"
    },
    {
      id: 2,
      title: "5 Strategi Jitu Kontraktor Hadapi Kenaikan Biaya Operasional 2023-2024",
      excerpt: "Panduan praktis bagi pelaku bisnis konstruksi untuk bertahan di tengah fluktuasi harga material dan tenaga kerja.",
      category: "Manajemen",
      image: "/images/berita2/gambar2.png",
      date: "15 Desember 2023",
      readTime: "4 menit",
      slug: "strategi-kenaikan-harga-material-2024"
    }
  ],
  tags: ["renovasi rumah", "izin bangunan", "IMB", "PBG", "regulasi properti"]
};

// Halaman detail artikel
export default function RenovationArticleDetail() {
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
          src={renovationArticle.image}
          alt={renovationArticle.title}
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
              {renovationArticle.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {renovationArticle.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{renovationArticle.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {renovationArticle.readTime}</span>
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
              src={renovationArticle.authorImage} 
              alt={renovationArticle.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{renovationArticle.author}</h3>
              <p className="text-sm text-gray-600">{renovationArticle.authorRole}</p>
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
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(renovationArticle.title)}`, '_blank')}
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
            {renovationArticle.content.map((block, index) => {
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
              {renovationArticle.tags.map((tag, index) => (
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
            {renovationArticle.relatedArticles.map((relatedArticle, index) => (
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