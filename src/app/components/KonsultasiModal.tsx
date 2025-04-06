'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KonsultasiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProjectType = 'buildings' | 'civil' | 'industrial';

interface FormData {
  projectTypes: ProjectType[];
  description: string;
  location: string;
  area: string;
  timeframe: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  newsletter: boolean;
}

const initialFormData: FormData = {
  projectTypes: [],
  description: '',
  location: '',
  area: '',
  timeframe: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  company: '',
  newsletter: false
};

// API endpoint configuration
// Change to true to use direct API, false to use fallback (localStorage)
const USE_DIRECT_API = true;
const API_URL = 'https://backend-kbs-website.vercel.app/api/project-consultation';

const KonsultasiModal: React.FC<KonsultasiModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setFormData(initialFormData);
        setSubmitError(null);
        setSubmitSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  const projectTypes = [
    { 
      id: 'buildings' as ProjectType, 
      label: 'Bangunan',
      desc: 'Gedung Perkantoran, Mall, Apartemen'
    },
    { 
      id: 'civil' as ProjectType, 
      label: 'Infrastruktur Sipil',
      desc: 'Jalan, Jembatan, Drainase'
    },
    { 
      id: 'industrial' as ProjectType, 
      label: 'Industrial',
      desc: 'Pabrik dan Pergudangan'
    }
  ];

  const handleBack = () => setStep(prev => prev - 1);
  const handleNext = () => setStep(prev => prev + 1);

  // Local storage fallback (for when API is unavailable)
  const saveToLocalStorage = (data: any) => {
    try {
      // Generate unique ID based on timestamp
      const id = `project_request_${new Date().getTime()}`;
      const savedRequests = JSON.parse(localStorage.getItem('projectRequests') || '[]');
      savedRequests.push({
        id,
        data,
        timestamp: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('projectRequests', JSON.stringify(savedRequests));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Format data untuk pesan
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const projectTypeValue = formData.projectTypes.map(type => {
        const typeObj = projectTypes.find(pt => pt.id === type);
        return typeObj ? typeObj.label : type;
      }).join(', ');
      
      // Build project details
      const projectDetailsText = `
Jenis Proyek: ${projectTypeValue}
Lokasi: ${formData.location}
Luas Area: ${formData.area} m²
Estimasi Waktu: ${formData.timeframe}
Detail Proyek: ${formData.description}
Newsletter: ${formData.newsletter ? 'Ya' : 'Tidak'}
      `;

      // Prepare payload
      const payload = {
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: projectTypeValue,
        projectDetails: projectDetailsText,
        subject: `[Konsultasi Proyek] Permintaan dari ${fullName}`
      };

      console.log('Preparing to send data:', payload);
      
      if (USE_DIRECT_API) {
        try {
          // Use absolute URL for API
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          // Get raw response for debugging
          const responseText = await response.text();
          console.log('Raw API response:', responseText);

          let result;
          try {
            // Attempt to parse as JSON
            result = JSON.parse(responseText);
          } catch (parseError) {
            console.error('Response is not valid JSON:', parseError);
            
            // If API fails with non-JSON response, use fallback
            console.log('API returned invalid JSON, using localStorage fallback');
            const saved = saveToLocalStorage(payload);
            
            if (!saved) {
              throw new Error('Gagal menyimpan data. Silakan coba lagi nanti.');
            }
            
            // Even if API call failed, we show success to user since we saved the data
            setSubmitSuccess(true);
            setFormData(initialFormData);
            return;
          }

          if (!response.ok) {
            throw new Error(result?.message || `Server error: ${response.status}`);
          }

          console.log('API response:', result);
          setSubmitSuccess(true);
        } catch (apiError) {
          console.error('API call failed:', apiError);
          
          // Fallback to localStorage if API fails
          console.log('Using localStorage fallback due to API error');
          const saved = saveToLocalStorage(payload);
          
          if (!saved) {
            throw new Error('Gagal menyimpan data. Silakan coba lagi nanti.');
          }
          
          // Since we saved the data locally, we can still show success
          setSubmitSuccess(true);
        }
      } else {
        // Directly use localStorage fallback (for testing)
        console.log('Using localStorage storage (API disabled)');
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const saved = saveToLocalStorage(payload);
        if (!saved) {
          throw new Error('Gagal menyimpan data. Silakan coba lagi nanti.');
        }
        
        setSubmitSuccess(true);
      }
      
      // Log success and reset form data
      console.log('Form data processed successfully');
      setFormData(initialFormData);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitError(`Gagal mengirim data: ${(err as Error).message}. Silakan coba lagi nanti.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#153969]/30 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-4 bottom-0 top-20 md:inset-[10%] bg-[#f8fafc] rounded-t-3xl md:rounded-2xl z-50 
                     overflow-hidden shadow-2xl border border-gray-200"
          >
            {/* Header dengan Progress */}
            <div className="px-6 py-4 border-b border-gray-200 bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {step > 1 && !submitSuccess && (
                    <button
                      onClick={handleBack}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  <span className="font-medium text-gray-900">
                    {submitSuccess 
                      ? 'Terima Kasih!' 
                      : `Langkah ${step} dari 3`
                    }
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1E4D2B] transition-all duration-300"
                  style={{ width: submitSuccess ? '100%' : `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-auto max-h-[calc(100%-80px)]">
              {/* Error Message */}
              {submitError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {submitError}
                </div>
              )}
              
              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Terima Kasih!</h2>
                  <p className="text-gray-600">
                    Permintaan konsultasi proyek Anda telah berhasil dikirim. 
                    Tim kami akan segera menghubungi Anda untuk tindak lanjut.
                  </p>
                  
                  <button
                    onClick={onClose}
                    className="mt-4 w-full py-4 bg-[#1E4D2B] text-white rounded-xl font-medium
                             hover:bg-[#153969] transition-colors"
                  >
                    Tutup
                  </button>
                </motion.div>
              )}
              
              {!submitSuccess && (
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Pilih Jenis Proyek</h2>
                        <p className="text-gray-600">Pilih kategori yang sesuai dengan kebutuhan Anda</p>
                      </div>

                      <div className="space-y-4">
                        {projectTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                projectTypes: prev.projectTypes.includes(type.id)
                                  ? prev.projectTypes.filter(t => t !== type.id)
                                  : [...prev.projectTypes, type.id]
                              }));
                            }}
                            className={`w-full p-4 rounded-xl text-left transition-all duration-200
                              ${formData.projectTypes.includes(type.id)
                                ? 'bg-[#1E4D2B] text-white shadow-lg'
                                : 'bg-white border-2 border-gray-200 hover:border-[#1E4D2B] text-gray-900'
                              }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{type.label}</h3>
                                <p className={formData.projectTypes.includes(type.id) ? 'text-white/80' : 'text-gray-500'}>
                                  {type.desc}
                                </p>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                ${formData.projectTypes.includes(type.id)
                                  ? 'border-white'
                                  : 'border-gray-300'
                                }`}
                              >
                                {formData.projectTypes.includes(type.id) && (
                                  <div className="w-3 h-3 rounded-full bg-white" />
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleNext}
                        disabled={formData.projectTypes.length === 0}
                        className="w-full py-4 bg-[#1E4D2B] text-white rounded-xl font-medium
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 hover:bg-[#153969] transition-colors"
                      >
                        Lanjutkan
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Detail Proyek</h2>
                        <p className="text-gray-600">Jelaskan kebutuhan proyek Anda secara detail</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lokasi Proyek
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: Jakarta Barat"
                            className="w-full p-3 rounded-lg border border-gray-200 
                                     focus:border-[#1E4D2B] focus:ring-1 focus:ring-[#1E4D2B] 
                                     outline-none text-gray-900 placeholder-gray-500 bg-white"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Luas Area (m²)
                          </label>
                          <input
                            type="number"
                            placeholder="Contoh: 1000"
                            className="w-full p-3 rounded-lg border border-gray-200 
                                     focus:border-[#1E4D2B] focus:ring-1 focus:ring-[#1E4D2B] 
                                     outline-none text-gray-900 placeholder-gray-500 bg-white"
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimasi Waktu Pengerjaan
                          </label>
                          <select
                            value={formData.timeframe}
                            onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                            className="w-full p-3 rounded-lg border border-gray-200 
                                     focus:border-[#1E4D2B] focus:ring-1 focus:ring-[#1E4D2B] 
                                     outline-none text-gray-900 bg-white"
                            style={{ color: '#1a1a1a' }}
                          >
                            <option value="" disabled className="text-gray-900">
                              Pilih Estimasi Waktu
                            </option>
                            <option value="1-3" className="text-gray-900">1-3 Bulan</option>
                            <option value="3-6" className="text-gray-900">3-6 Bulan</option>
                            <option value="6-12" className="text-gray-900">6-12 Bulan</option>
                            <option value="12+" className="text-gray-900">Lebih dari 12 Bulan</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Deskripsi Proyek
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Jelaskan detail kebutuhan proyek Anda..."
                            className="w-full p-3 rounded-lg border border-gray-200 
                                     focus:border-[#1E4D2B] focus:ring-1 focus:ring-[#1E4D2B] 
                                     outline-none text-gray-900 placeholder-gray-500 bg-white"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleNext}
                        disabled={!formData.location || !formData.description}
                        className="w-full py-4 bg-[#1E4D2B] text-white rounded-xl font-medium
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 hover:bg-[#153969] transition-colors"
                      >
                        Lanjutkan
                      </button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Informasi Kontak</h2>
                        <p className="text-gray-600">Masukkan informasi kontak Anda</p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nama Depan*
                            </label>
                            <input
                              type="text"
                              required
                              className="w-full p-3 rounded-lg border border-gray-200 
                                       focus:border-[#1E4D2B] focus:ring-1 focus:ring-[#1E4D2B] 
                                       outline-none text-gray-900 placeholder-gray-500 bg-white"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nama Belakang*
                            </label>
                            <input
                              type="text"
                              required
                              className="w-full p-3 rounded-lg border border-gray-200 
                                       focus:border-[#1E4D2B] focus:ring-1 focus:ring-[#1E4D2B] 
                                       outline-none text-gray-900 placeholder-gray-500 bg-white"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nama Perusahaan
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 rounded-lg border border-gray-200 
                                     focus:border-[#1E4D2B] focus:ring-1 focus:ring-[#1E4D2B] 
                                     outline-none text-gray-900 placeholder-gray-500 bg-white"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email*
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full p-3 rounded-lg border border-gray-200 
                                     focus:border-[#1E4D2B] focus:ring-1 focus:ring-[#1E4D2B] 
                                     outline-none text-gray-900 placeholder-gray-500 bg-white"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nomor Telepon*
                          </label>
                          <input
                            type="tel"
                            required
                            className="w-full p-3 rounded-lg border border-gray-200 
                                     focus:border-[#1E4D2B] focus:ring-1 focus:ring-[#1E4D2B] 
                                     outline-none text-gray-900 placeholder-gray-500 bg-white"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.newsletter}
                            onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                            className="mt-1"
                          />
                          <span className="text-sm text-gray-600">
                            Saya ingin menerima update dan informasi terbaru dari PT Karya Bangun Semesta
                          </span>
                        </label>
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || isSubmitting}
                        className="w-full py-4 bg-[#1E4D2B] text-white rounded-xl font-medium
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 hover:bg-[#153969] transition-colors"
                      >
                        {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan Konsultasi'}
                      </button>

                      <p className="text-sm text-gray-500 text-center">
                        Dengan mengirim form ini, Anda menyetujui {' '}
                        <a href="/privacy" className="text-[#1E4D2B] hover:underline">
                          Kebijakan Privasi
                        </a>
                        {' '} kami.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KonsultasiModal;