'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Building2, Loader2, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function LoginPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = isLogin ? '/api/auth/login/' : '/api/auth/register/';
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Terjadi kesalahan');
        return;
      }

      // Save token & user data
      localStorage.setItem('kbs_token', data.token);
      localStorage.setItem('kbs_user', JSON.stringify(data.user));

      setSuccess(isLogin
        ? (language === 'id' ? 'Login berhasil! Mengalihkan...' : 'Login successful! Redirecting...')
        : (language === 'id' ? 'Registrasi berhasil! Mengalihkan...' : 'Registration successful! Redirecting...')
      );

      setTimeout(() => {
        router.push('/platform/');
      }, 1500);

    } catch {
      setError(language === 'id' ? 'Gagal terhubung ke server' : 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center pt-20 pb-12 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#153969]/10 mb-4">
            <Building2 className="w-8 h-8 text-[#153969]" />
          </div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isLogin
              ? (language === 'id' ? 'Masuk ke Platform' : 'Sign in to Platform')
              : (language === 'id' ? 'Buat Akun Baru' : 'Create New Account')
            }
          </h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isLogin
              ? (language === 'id' ? 'Akses booking alat berat, tracking proyek, dan material store' : 'Access equipment booking, project tracking, and material store')
              : (language === 'id' ? 'Daftar untuk mulai menggunakan platform digital KBS' : 'Register to start using KBS digital platform')
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sign Up Fields */}
          {!isLogin && (
            <>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'id' ? 'Nama Lengkap' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#153969] focus:border-transparent outline-none transition ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder={language === 'id' ? 'Masukkan nama lengkap' : 'Enter your full name'}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'id' ? 'Perusahaan' : 'Company'}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#153969] focus:border-transparent outline-none transition ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder={language === 'id' ? 'Nama perusahaan' : 'Company name'}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'id' ? 'No. Telepon' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#153969] focus:border-transparent outline-none transition ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="+62 812 xxxx xxxx"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email *
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#153969] focus:border-transparent outline-none transition ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="email@company.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Password *
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border focus:ring-2 focus:ring-[#153969] focus:border-transparent outline-none transition ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right">
              <Link href="/platform/forgot-password" className="text-sm text-[#153969] hover:underline">
                {language === 'id' ? 'Lupa password?' : 'Forgot password?'}
              </Link>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#153969] text-white rounded-lg font-medium hover:bg-[#1e4d8a] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {language === 'id' ? 'Memproses...' : 'Processing...'}
              </>
            ) : (
              <>
                {isLogin
                  ? (language === 'id' ? 'Masuk' : 'Sign In')
                  : (language === 'id' ? 'Daftar' : 'Sign Up')
                }
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>


        {/* Toggle Login/Register */}
        <p className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {isLogin
            ? (language === 'id' ? 'Belum punya akun?' : "Don't have an account?")
            : (language === 'id' ? 'Sudah punya akun?' : 'Already have an account?')
          }
          {' '}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
            className="text-[#153969] font-medium hover:underline"
          >
            {isLogin
              ? (language === 'id' ? 'Daftar sekarang' : 'Sign up now')
              : (language === 'id' ? 'Masuk' : 'Sign in')
            }
          </button>
        </p>
      </motion.div>
    </div>
  );
}
