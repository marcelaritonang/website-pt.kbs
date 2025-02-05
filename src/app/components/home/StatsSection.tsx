'use client'

import { motion } from 'framer-motion'

const stats = [
  { number: "150+", label: "Proyek Selesai" },
  { number: "20+", label: "Tahun Pengalaman" },
  { number: "50+", label: "Tim Ahli" },
  { number: "100%", label: "Klien Puas" }
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-[#091242]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}