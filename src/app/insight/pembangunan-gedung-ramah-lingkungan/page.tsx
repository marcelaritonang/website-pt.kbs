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

// Data artikel tentang gedung ramah lingkungan
const greenBuildingArticle = {
  id: 6,
  title: "Pembangunan Gedung Ramah Lingkungan: Tren dan Standar",
  excerpt: "Perkembangan terkini dalam konstruksi berkelanjutan dan sertifikasi green building di Indonesia.",
  category: "Proyek",
  image: "/images/berita6/gambar1-b6.jpeg",
  date: "18 Januari 2024",
  readTime: "6 menit",
  author: "Tim Redaksi KBS",
  authorRole: "Divisi Riset Sustainability",
  authorImage: "/images/logo-kbs.png",
  slug: "pembangunan-gedung-ramah-lingkungan",
  content: [
    {
      type: "paragraph",
      content: "Pembangunan gedung ramah lingkungan atau green building terus mengalami peningkatan signifikan di Indonesia dalam beberapa tahun terakhir. Konsep ini bukan sekadar tren sementara, melainkan kebutuhan mendesak dalam upaya mengurangi dampak lingkungan dari sektor konstruksi yang menurut data Kementerian Lingkungan Hidup dan Kehutanan berkontribusi sebesar 28 persen dari total emisi gas rumah kaca nasional."
    },
    {
      type: "paragraph",
      content: "Green building sendiri merupakan konsep bangunan yang dirancang untuk menjadi efisien dan ramah lingkungan. Bangunan jenis ini harus mempertimbangkan dampak terhadap lingkungan seminimal mungkin, mulai dari tahap perencanaan, konstruksi, pengoperasian, hingga pemeliharaan. Selain itu, green building juga harus memaksimalkan penggunaan sumber daya alam yang tersedia dan menghindari penggunaan material bangunan yang berlebihan."
    },
    {
      type: "image",
      url: "/images/berita6/gambar2-b6.png",
      caption: "Ilustrasi konsep green building dengan integrasi elemen-elemen ramah lingkungan"
    },
    {
      type: "subheading",
      content: "Tren Terkini dalam Konstruksi Ramah Lingkungan"
    },
    {
      type: "paragraph",
      content: "Berdasarkan laporan Green Building Council Indonesia (GBCI), terdapat beberapa tren terkini dalam pembangunan gedung ramah lingkungan yang semakin berkembang di tanah air:"
    },
    {
      type: "list",
      items: [
        "Konstruksi Prefabrikasi: Metode ini mengurangi limbah konstruksi hingga 90% dan menghemat waktu pembangunan. Di Jakarta, beberapa pengembang komersial telah mengadopsi sistem ini untuk mengurangi dampak lingkungan.",
        "Material Berkelanjutan: Penggunaan bahan bangunan daur ulang atau berasal dari sumber terbarukan seperti bambu, kayu bersertifikat FSC, dan beton ramah lingkungan meningkat 45% dalam dua tahun terakhir.",
        "Sistem Pengolahan Air Mandiri: Instalasi pengolahan air limbah dan sistem rainwater harvesting telah menjadi fitur standar dalam gedung komersial baru di kota-kota besar.",
        "Desain Bangunan Biophilic: Mengintegrasikan unsur-unsur alam ke dalam desain bangunan untuk meningkatkan kesehatan dan produktivitas penghuni. Tren ini meningkat tajam setelah pandemi COVID-19.",
        "Zero Energy Building (ZEB): Konsep bangunan yang menghasilkan energi sama dengan atau lebih dari yang dikonsumsi, dengan penggunaan panel surya dan teknologi efisiensi energi lainnya."
      ]
    },
    {
      type: "paragraph",
      content: "Tidak hanya di gedung perkantoran atau komersial, tren green building juga mulai merambah ke sektor perumahan. Menurut penelitian Pusat Penelitian dan Pengembangan Perumahan dan Permukiman, terjadi peningkatan minat sebesar 35% dari konsumen perumahan untuk hunian yang menerapkan prinsip ramah lingkungan sejak tahun 2020."
    },
    {
      type: "image",
      url: "/images/berita6/gambar3-b6.jpg",
      caption: "Gedung dengan instalasi panel surya, salah satu fitur utama dalam konsep Zero Energy Building"
    },
    {
      type: "subheading",
      content: "Standar dan Sertifikasi Green Building di Indonesia"
    },
    {
      type: "paragraph",
      content: "Indonesia memiliki beberapa standar dan sertifikasi untuk green building yang menjadi acuan bagi pengembang, arsitek, dan kontraktor dalam membangun gedung ramah lingkungan. Berikut adalah beberapa standar utama yang berlaku di Indonesia:"
    },
    {
      type: "list",
      items: [
        "GREENSHIP: Dikembangkan oleh Green Building Council Indonesia (GBCI), GREENSHIP merupakan sistem penilaian yang mengukur tingkat kehijauan suatu bangunan. Sertifikasi ini memiliki beberapa kategori seperti GREENSHIP Homes untuk perumahan, GREENSHIP New Building untuk gedung baru, dan GREENSHIP Existing Building untuk gedung yang sudah beroperasi.",
        "SNI 03-6389-2011: Standar Nasional Indonesia untuk Konservasi Energi Selubung Bangunan pada Bangunan Gedung yang mengatur persyaratan teknis desain selubung bangunan untuk efisiensi energi.",
        "Peraturan Menteri PUPR No. 02/PRT/M/2015: Tentang Bangunan Gedung Hijau yang menjadi panduan nasional dalam pembangunan gedung hijau di Indonesia.",
        "EDGE (Excellence in Design for Greater Efficiencies): Sertifikasi internasional dari IFC (International Finance Corporation) yang berfokus pada penghematan energi, air, dan penggunaan material yang efisien.",
        "LEED (Leadership in Energy and Environmental Design): Sertifikasi internasional dari USGBC (U.S. Green Building Council) yang mulai banyak diadopsi oleh gedung-gedung prestisius di Indonesia."
      ]
    },
    {
      type: "paragraph",
      content: "Berdasarkan data GBCI per Desember 2023, terdapat lebih dari 210 bangunan di Indonesia yang telah memperoleh sertifikasi GREENSHIP, meningkat 25% dibandingkan tahun sebelumnya. Sementara untuk sertifikasi EDGE, tercatat 45 proyek di Indonesia telah mendapatkan sertifikasi ini dengan total luas bangunan mencapai 1,2 juta meter persegi."
    },
    {
      type: "quote",
      content: "Sertifikasi green building bukan sekadar label, tetapi bukti komitmen terhadap keberlanjutan dan juga memberikan nilai tambah secara ekonomi. Gedung bersertifikasi hijau memiliki nilai jual hingga 15% lebih tinggi dan biaya operasional hingga 30% lebih rendah dibandingkan gedung konvensional.",
      author: "Ir. Hari Wahyudi, Ketua Green Building Council Indonesia"
    },
    {
      type: "subheading",
      content: "Manfaat Ekonomi dan Lingkungan dari Green Building"
    },
    {
      type: "paragraph",
      content: "Penerapan konsep green building memberikan sejumlah manfaat, tidak hanya bagi lingkungan tetapi juga secara ekonomi bagi pemilik dan pengguna bangunan:"
    },
    {
      type: "list",
      items: [
        "Efisiensi Energi: Gedung ramah lingkungan dapat menghemat penggunaan energi hingga 50% dibandingkan bangunan konvensional, terutama dari sistem pendingin udara dan pencahayaan.",
        "Penghematan Air: Dengan teknologi daur ulang air dan fixture hemat air, konsumsi air dapat dikurangi hingga 40%, yang berarti penghematan biaya operasional yang signifikan.",
        "Peningkatan Nilai Properti: Studi dari Jones Lang LaSalle menunjukkan gedung dengan sertifikasi hijau memiliki tingkat okupansi 4-8% lebih tinggi dan nilai jual yang meningkat 6-15%.",
        "Peningkatan Produktivitas Penghuni: Desain yang memperhatikan kualitas udara, pencahayaan alami, dan koneksi dengan alam terbukti meningkatkan produktivitas hingga 15% dan mengurangi tingkat absensi karyawan.",
        "Pengurangan Jejak Karbon: Setiap gedung hijau rata-rata mengurangi emisi CO2 sebesar 30-40 ton per tahun, setara dengan menanam 1.200 pohon."
      ]
    },
    {
      type: "image",
      url: "/images/berita6/gambar4-b6.png",
      caption: "Green roof atau atap hijau pada gedung modern, mengurangi efek urban heat island dan meningkatkan efisiensi energi"
    },
    {
      type: "subheading",
      content: "Tantangan dalam Implementasi Green Building di Indonesia"
    },
    {
      type: "paragraph",
      content: "Meskipun telah menunjukkan pertumbuhan positif, implementasi green building di Indonesia masih menghadapi sejumlah tantangan yang perlu diatasi:"
    },
    {
      type: "list",
      items: [
        "Biaya Awal yang Tinggi: Investasi awal untuk teknologi dan material ramah lingkungan masih cukup tinggi, walaupun dalam jangka panjang akan memberikan penghematan.",
        "Keterbatasan Tenaga Ahli: Masih terbatasnya tenaga profesional yang memiliki sertifikasi dan keahlian dalam desain dan konstruksi green building.",
        "Kesadaran dan Edukasi: Meskipun meningkat, kesadaran dan pemahaman masyarakat tentang pentingnya green building masih perlu ditingkatkan.",
        "Regulasi yang Belum Optimal: Beberapa daerah belum memiliki regulasi khusus yang mendorong atau mensyaratkan penerapan green building.",
        "Ketersediaan Material Ramah Lingkungan: Pasokan material yang ramah lingkungan dan bersertifikasi masih terbatas di beberapa daerah."
      ]
    },
    {
      type: "paragraph",
      content: "Untuk mengatasi tantangan ini, diperlukan kolaborasi antara pemerintah, swasta, asosiasi profesi, dan lembaga pendidikan. Pemerintah telah mulai memberikan insentif seperti pengurangan pajak bumi dan bangunan serta kemudahan perizinan bagi gedung yang menerapkan konsep ramah lingkungan di beberapa kota besar seperti Jakarta, Surabaya, dan Bandung."
    },
    {
      type: "subheading",
      content: "Prospek Masa Depan Green Building di Indonesia"
    },
    {
      type: "paragraph",
      content: "Dengan komitmen Indonesia untuk mengurangi emisi gas rumah kaca sebesar 29% pada tahun 2030 dalam Nationally Determined Contribution (NDC), green building diperkirakan akan semakin berkembang di masa depan. Beberapa proyeksi dan rencana pengembangan termasuk:"
    },
    {
      type: "list",
      items: [
        "Pengembangan Ibu Kota Negara (IKN) Nusantara sebagai kota hijau dengan standar green building untuk seluruh bangunan pemerintah dan komersial.",
        "Target GBCI untuk mencapai 1.000 bangunan bersertifikasi hijau pada tahun 2030.",
        "Pengembangan teknologi pintar (smart building) yang terintegrasi dengan konsep green building.",
        "Perluasan penerapan konsep green building ke sektor perumahan yang lebih terjangkau.",
        "Peningkatan riset dan inovasi material konstruksi ramah lingkungan yang berbasis sumber daya lokal."
      ]
    },
    {
      type: "quote",
      content: "Transformasi menuju green building bukanlah pilihan, melainkan keharusan bagi industri konstruksi Indonesia untuk berkontribusi dalam mitigasi perubahan iklim. Komitmen ini perlu diwujudkan dalam setiap aspek pembangunan, dari tingkat kebijakan hingga implementasi di lapangan.",
      author: "Dr. Suryati Prasetyo, Peneliti Senior Lembaga Ilmu Pengetahuan Indonesia"
    },
    {
      type: "paragraph",
      content: "Adopsi green building yang semakin luas tentu juga membutuhkan dukungan dari berbagai pihak, termasuk konsultan properti yang dapat memberikan saran dan solusi terbaik bagi para pemilik, pengembang, dan pengelola bangunan. Konsultasi properti dapat membantu meningkatkan efisiensi sumber daya bangunan berupa energi, air dan bahan sekaligus mengurangi dampak bangunan pada kesehatan manusia dan lingkungan."
    },
    {
      type: "subheading",
      content: "Kesimpulan"
    },
    {
      type: "paragraph",
      content: "Pembangunan gedung ramah lingkungan di Indonesia telah menunjukkan perkembangan yang positif dengan tren dan standar yang semakin berkembang. Meskipun masih menghadapi berbagai tantangan, prospek ke depan cukup menjanjikan dengan dukungan regulasi dan meningkatnya kesadaran akan pentingnya keberlanjutan."
    },
    {
      type: "paragraph",
      content: "Seiring dengan semakin matangnya industri konstruksi hijau di Indonesia, diharapkan akan semakin banyak gedung yang tidak hanya mendukung kesehatan dan kenyamanan penghuninya, tetapi juga memberikan kontribusi positif terhadap upaya pelestarian lingkungan dan mitigasi perubahan iklim secara global. Green building bukan lagi sekadar tren, melainkan standar baru dalam industri konstruksi masa depan."
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
      image: "/images/berita5/gambar1-b5.png",
      date: "25 Januari 2024",
      readTime: "5 menit",
      slug: "teknologi-pemantauan-jarak-jauh-konstruksi"
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
  tags: ["green building", "konstruksi berkelanjutan", "sertifikasi hijau", "efisiensi energi", "bangunan ramah lingkungan", "GREENSHIP"]
};

// Halaman detail artikel
export default function GreenBuildingArticleDetail() {
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
          src={greenBuildingArticle.image}
          alt={greenBuildingArticle.title}
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
              {greenBuildingArticle.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center text-white/90 gap-4 md:gap-6"
            >
              <span className="bg-[#153969] text-white text-sm font-medium px-3 py-1 rounded-md">
                {greenBuildingArticle.category}
              </span>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{greenBuildingArticle.date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Waktu baca: {greenBuildingArticle.readTime}</span>
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
              src={greenBuildingArticle.authorImage} 
              alt={greenBuildingArticle.author} 
              width={60} 
              height={60} 
              className="rounded-full border-2 border-gray-200"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{greenBuildingArticle.author}</h3>
              <p className="text-sm text-gray-600">{greenBuildingArticle.authorRole}</p>
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
                onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(greenBuildingArticle.title)}`, '_blank')}
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
            {greenBuildingArticle.content.map((block, index) => {
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
              {greenBuildingArticle.tags.map((tag, index) => (
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
            {greenBuildingArticle.relatedArticles.map((relatedArticle, index) => (
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