'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, setIsLoading }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        >
          <div className="relative w-[200px] h-[200px]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Red triangle and rectangles */}
              <motion.path
                d="M60 40 L100 20 L140 40 L140 60 L60 60 Z"
                fill="none"
                stroke="#FF3A2D"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />



              {/* Blue shapes - middle */}
              <motion.path
                d="M60 120 L140 120 L140 140 L100 160 L60 140 Z"
                fill="none"
                stroke="#153969"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
              />

              {/* Additional decorative lines */}
              <motion.line
                x1="80" y1="170"
                x2="120" y2="170"
                stroke="#153969"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              />
            </svg>

            {/* Progress Bar */}
            <motion.div
              className="absolute -bottom-10 left-0 w-full h-0.5 bg-gray-100 overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF3A2D] to-[#153969]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Decorative corner elements */}
            {[0, 90, 180, 270].map((rotation, index) => (
              <motion.div
                key={rotation}
                className="absolute w-6 h-6"
                style={{
                  top: index < 2 ? '-10px' : 'auto',
                  bottom: index >= 2 ? '-10px' : 'auto',
                  left: [0, 2].includes(index) ? '-10px' : 'auto',
                  right: [1, 3].includes(index) ? '-10px' : 'auto',
                  transform: `rotate(${rotation}deg)`
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 + index * 0.1 }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <motion.path
                    d="M12 2 L22 12 L12 22 L2 12 Z"
                    stroke={index === 0 ? "#FF3A2D" : "#153969"}
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;