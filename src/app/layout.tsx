'use client';

import './globals.css';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Menggunakan state untuk kontrol loading
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="id">
      <body>
        <div className="relative">
          {/* Menggunakan isLoading dan setIsLoading sebagai props */}
          <LoadingScreen 
            isLoading={isLoading} 
            setIsLoading={setIsLoading} 
          />
          
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </body>
    </html>
  );
}