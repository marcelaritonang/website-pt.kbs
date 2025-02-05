'use client'

import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-blue-900 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      onAnimationComplete={() => document.body.style.overflow = 'unset'}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">KBS</h1>
          <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-white rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [-10, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}