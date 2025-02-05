'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

const contactInfo = [
  {
    icon: <Phone className="h-6 w-6" />,
    label: "Telepon",
    value: "+62 123 4567 890"
  },
  {
    icon: <Mail className="h-6 w-6" />,
    label: "Email",
    value: "info@kbs.co.id"
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    label: "Alamat",
    value: "Jakarta, Indonesia"
  }
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#091242] mb-4">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Konsultasikan kebutuhan proyek konstruksi Anda dengan tim ahli kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-4 text-[#FF5722]">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.label}</h3>
              <p className="text-gray-600">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}