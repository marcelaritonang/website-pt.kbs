'use client';

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

/**
 * ClientShell holds all client-side concerns (context providers, the intro
 * loading animation, navbar, footer) so that the root layout can stay a
 * Server Component and export SEO metadata.
 *
 * IMPORTANT: the page content ({children}) is ALWAYS rendered into the HTML.
 * The LoadingScreen is only a fixed overlay (z-50) painted on top during the
 * first couple of seconds. This keeps the original visual experience intact
 * for humans while ensuring crawlers / AI bots always receive the real
 * content in the server-rendered HTML.
 */
export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          {/* Intro loading overlay (does NOT gate the content anymore) */}
          <AnimatePresence mode="wait">
            {isLoading && (
              <LoadingScreen isLoading={isLoading} setIsLoading={setIsLoading} />
            )}
          </AnimatePresence>

          {/* Main content is always present in the DOM / server HTML */}
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>

          {/* Portal root for modals */}
          <div id="modal-root"></div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
