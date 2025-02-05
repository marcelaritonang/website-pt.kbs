    import { Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#091242] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src="/logo.png"
                alt="KBS Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold">KBS</span>
            </div>
            <p className="text-gray-400">
              Konstruksi berkualitas dengan standar internasional
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['About Us', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                'Building Construction',
                'Project Planning',
                'Interior Design',
                'Renovation'
              ].map((service) => (
                <li key={service} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+62 123 4567 890</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>info@kbs.co.id</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PT Karya Bangun Semesta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}