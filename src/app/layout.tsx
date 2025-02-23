'use client';

import './globals.css';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Inter } from 'next/font/google';

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

// Define types for props
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Handle initial loading
  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="id" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-white">
        {/* Loading Screen */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col min-h-screen"
            >
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add portal root for modals */}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}