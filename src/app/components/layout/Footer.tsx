'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Youtube, Linkedin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Multi-language content
  const mainLinks = language === 'en' 
    ? [
        { name: "Contact Us", href: "/contact" },
        { name: "Code of Ethics", href: "/ethics" },
        { name: "Career Information", href: "/karir" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Tools & Resources", href: "/resources" }
      ]
    : [
        { name: "Hubungi Kami", href: "/contact" },
        { name: "Kode Etik", href: "/ethics" },
        { name: "Informasi Karir", href: "/karir" },
        { name: "Kebijakan Privasi", href: "/privacy" },
        { name: "Alat & Sumber Daya", href: "/resources" }
      ];

  const socialLinks = [
    { 
      icon: <Instagram className="w-5 h-5" />, 
      href: "https://www.instagram.com/karyabangunsemesta?igsh=OHFjM3J5azd4NnVw",
      label: "Instagram"
    },
    { 
      icon: <Youtube className="w-5 h-5" />, 
      href: "https://youtube.com/kbs",
      label: "Youtube"
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: "https://linkedin.com/company/kbs",
      label: "LinkedIn"
    }
  ];

  const contactInfo = {
    email: "karyabangunsemestas@gmail.com",
    whatsapp: "+6281218127503"
  };

  const copyright = {
    en: {
      rights: "All rights reserved",
      company: "PT Karya Bangun Semesta"
    },
    id: {
      rights: "Hak cipta dilindungi",
      company: "PT Karya Bangun Semesta"
    }
  };

  const currentRights = language === 'en' ? copyright.en : copyright.id;

  return (
    <footer className={`relative ${
      isDark 
        ? 'bg-gradient-to-t from-black via-gray-900 to-gray-900' 
        : 'bg-gradient-to-t from-white via-[#f8fafc] to-[#f8fafc]'
    } overflow-hidden`}>
      {/* Background gradient patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Background shapes for visual interest */}
        <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full ${
          isDark 
            ? 'bg-[#153969]/10 blur-2xl' 
            : 'bg-blue-50/70 blur-2xl'
        } opacity-70`}></div>
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full ${
          isDark 
            ? 'bg-blue-900/5 blur-2xl' 
            : 'bg-blue-100/40 blur-2xl'
        } opacity-50`}></div>
        
        {/* Grid pattern overlay */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-grid-pattern-dark opacity-5' 
            : 'bg-grid-pattern opacity-10'
        }`}></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 relative z-10">
        {/* Top Navigation */}
        <nav className="py-6">
          <ul className="flex flex-wrap justify-center sm:justify-start items-center gap-x-8 gap-y-2">
            {mainLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`${
                    isDark 
                      ? 'text-blue-300 hover:text-white' 
                      : 'text-[#153969] hover:text-[#1e4d8d]'
                  } transition-colors text-sm`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Middle Section with Logo, Contact and Social */}
        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left column: Logo and Contact Info */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo */}
            <div className="w-16 h-16 relative">
              <div className={`absolute inset-0 rounded-full ${
                isDark ? 'bg-white/10' : 'bg-blue-50'
              } -z-10 transform scale-75 blur-sm`}></div>
              <Image 
                src="/images/logo-kbs.png" 
                alt="KBS Logo" 
                width={64}
                height={64}
                className="w-full h-full object-contain relative z-10"
              />
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-2">
              <a 
                href={`mailto:${contactInfo.email}`}
                className={`flex items-center ${
                  isDark 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-700 hover:text-[#153969]'
                } transition-colors`}
              >
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">{contactInfo.email}</span>
              </a>
              <a 
                href={`https://wa.me/${contactInfo.whatsapp.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${
                  isDark 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-700 hover:text-[#153969]'
                } transition-colors`}
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{contactInfo.whatsapp}</span>
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDark 
                    ? 'text-blue-400 hover:text-white' 
                    : 'text-[#153969] hover:text-[#1e4d8d]'
                } transition-colors p-2 rounded-full hover:bg-opacity-10 ${
                  isDark ? 'hover:bg-blue-800' : 'hover:bg-blue-100'
                }`}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={`${
          isDark ? 'border-gray-800' : 'border-gray-100'
        } border-t`}></div>

        {/* Copyright Section */}
        <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Copyright © {new Date().getFullYear()} {currentRights.company}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {currentRights.rights}
          </p>
        </div>
      </div>

      {/* CSS for grid patterns */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(21, 57, 105, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(21, 57, 105, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        
        .bg-grid-pattern-dark {
          background-image: linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;