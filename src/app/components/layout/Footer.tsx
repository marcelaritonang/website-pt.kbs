import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Youtube, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const mainLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Code of Ethics", href: "/ethics" },
    { name: "Career Information", href: "/careers" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Tools & Resources", href: "/resources" }
  ];

  const socialLinks = [
    { 
      icon: <Instagram className="w-5 h-5" />, 
      href: "https://www.instagram.com/karyabangunsemesta?igsh=OHFjM3J5azd4NnVw",
      label: "Instagram"
    },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: "https://twitter.com/kbs",
      label: "Twitter"
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

  return (
    <footer className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Top Navigation */}
        <nav className="py-6">
          <ul className="flex flex-wrap justify-center sm:justify-start items-center gap-x-8 gap-y-2">
            {mainLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="text-[#153969] hover:text-[#1E4D2B] transition-colors text-sm"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Middle Section with Logo and Social */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo */}
          <div className="w-16 h-16">
            <Image 
              src="/images/logo.jpg" 
              alt="KBS Logo" 
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#153969] hover:text-[#1E4D2B] transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sm text-gray-600">
            Copyright © {new Date().getFullYear()} PT Karya Bangun Semesta
          </p>
          <p className="text-sm text-gray-600">
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;