'use client'

import { motion } from 'framer-motion'
import { Building2, HardHat, Users } from 'lucide-react'

const services = [
  {
    icon: <Building2 className="w-12 h-12" />,
    title: "Konstruksi Gedung",
    description: "Pembangunan gedung komersial dan residensial dengan standar tinggi"
  },
  {
    icon: <HardHat className="w-12 h-12" />,
    title: "Manajemen Proyek",
    description: "Pengelolaan proyek konstruksi yang efisien dan tepat waktu"
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "Tim Profesional",
    description: "Didukung oleh tim ahli berpengalaman di bidangnya"
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#091242] mb-4">
            Layanan Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Menyediakan berbagai layanan konstruksi dengan kualitas terbaik
            untuk memenuhi kebutuhan proyek Anda
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="text-[#091242] group-hover:text-[#FF5722] transition-colors mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#091242] mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}