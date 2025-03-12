'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, FileText, Users, Award, Clock, Globe, ChevronDown, ChevronUp } from 'lucide-react';

export default function CompanyProfile() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/company-profile-hero.jpg" // Replace with your actual hero image
          alt="KBS Company Profile"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                Company Profile
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                Building the future with excellence and integrity since 2005
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <a 
                  href="/documents/KBS-Company-Profile.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#153969] hover:bg-[#0f2a4d] text-white px-6 py-3 rounded-md font-medium transition-colors shadow-lg"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  View Full Company Profile
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              About KBS
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-20 h-1 bg-[#153969] mx-auto mb-8"
            />
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-6"
            >
              PT Karya Bersama Sejahtera (KBS) is a leading construction and engineering company in Indonesia. Established in 2005, we have grown to become a trusted partner for various construction projects across the country, from commercial buildings to infrastructure development.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700"
            >
              With our commitment to quality, innovation, and sustainability, we strive to deliver excellence in every project we undertake, ensuring client satisfaction and contributing to Indonesia's development.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Key Information Cards */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Card 1 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Users className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">18+ Years Experience</h3>
              <p className="text-gray-600">
                With over 18 years in the industry, we bring expertise and knowledge to every project.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Award className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">ISO Certified</h3>
              <p className="text-gray-600">
                We maintain the highest standards with ISO 9001, ISO 14001, and OHSAS 18001 certifications.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Clock className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">On-Time Delivery</h3>
              <p className="text-gray-600">
                We pride ourselves on meeting deadlines consistently without compromising quality.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <Globe className="h-12 w-12 text-[#153969] mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Nationwide Projects</h3>
              <p className="text-gray-600">
                Successfully delivered projects throughout Indonesia, from Java.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Vision, Mission, Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
                >
                  Our Vision
                </motion.h2>
                <motion.div 
                  variants={fadeInUp}
                  className="w-16 h-1 bg-[#153969] mb-6"
                />
                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-gray-700 mb-8"
                >
                  To be the leading construction company in Indonesia, recognized for excellence, innovation, and integrity in every project we undertake.
                </motion.p>

                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
                >
                  Our Mission
                </motion.h2>
                <motion.div 
                  variants={fadeInUp}
                  className="w-16 h-1 bg-[#153969] mb-6"
                />
                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-gray-700 mb-4"
                >
                  We are committed to:
                </motion.p>
                <motion.ul 
                  variants={fadeInUp}
                  className="list-disc pl-6 space-y-2 text-gray-700 mb-8"
                >
                  <li>Delivering high-quality construction projects safely, on time, and within budget</li>
                  <li>Implementing innovative solutions and sustainable practices</li>
                  <li>Building long-term relationships with clients based on trust and excellence</li>
                  <li>Developing our employees and contributing positively to communities</li>
                </motion.ul>
              </motion.div>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="bg-gray-50 p-8 rounded-lg shadow-md"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
              >
                Our Core Values
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-16 h-1 bg-[#153969] mb-6"
              />

              <div className="space-y-6">
                <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('excellence')}>
                    <h3 className="text-xl font-bold text-gray-800">Excellence</h3>
                    {activeSection === 'excellence' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'excellence' && (
                    <p className="mt-2 text-gray-600">
                      We strive for excellence in every aspect of our work, consistently exceeding expectations and delivering superior results.
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('integrity')}>
                    <h3 className="text-xl font-bold text-gray-800">Integrity</h3>
                    {activeSection === 'integrity' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'integrity' && (
                    <p className="mt-2 text-gray-600">
                      We conduct our business with the highest standards of honesty, transparency, and ethical behavior, building trust with all stakeholders.
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('innovation')}>
                    <h3 className="text-xl font-bold text-gray-800">Innovation</h3>
                    {activeSection === 'innovation' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'innovation' && (
                    <p className="mt-2 text-gray-600">
                      We embrace new ideas, technologies, and methodologies to continually improve and deliver cutting-edge solutions to our clients.
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('teamwork')}>
                    <h3 className="text-xl font-bold text-gray-800">Teamwork</h3>
                    {activeSection === 'teamwork' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'teamwork' && (
                    <p className="mt-2 text-gray-600">
                      We believe in the power of collaboration, working together across disciplines and with our clients to achieve common goals.
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('responsibility')}>
                    <h3 className="text-xl font-bold text-gray-800">Social Responsibility</h3>
                    {activeSection === 'responsibility' ? (
                      <ChevronUp className="h-5 w-5 text-[#153969]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#153969]" />
                    )}
                  </div>
                  {activeSection === 'responsibility' && (
                    <p className="mt-2 text-gray-600">
                      We are committed to sustainable practices, safety, and giving back to the communities where we operate.
                    </p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company PDF Section */}
      <section className="py-16 bg-[#153969] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Download Our Company Profile
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-white/90 mb-8"
            >
              For more detailed information about our company, services, and past projects, download our comprehensive company profile document.
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="/documents/KBS-Company-Profile.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-[#153969] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors shadow-lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                View Online
              </a>
              <a 
                href="/documents/KBS-Company-Profile.pdf" 
                download
                className="inline-flex items-center bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-[#153969] mb-3"
              >
                Our Journey
              </motion.h2>
              <motion.div 
                variants={fadeInUp}
                className="w-20 h-1 bg-[#153969] mx-auto mb-6"
              />
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-gray-700"
              >
                Key milestones in our company's growth and development
              </motion.p>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#153969]/20"></div>
              
              <div className="space-y-12">
                {/* 2005 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-end w-1/2 pr-8">
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-[#153969]">2005</h3>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Company Founded</h4>
                        <p className="text-gray-600">KBS was established with a vision to become a leading construction company in Indonesia.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </motion.div>

                {/* 2010 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="flex flex-col w-1/2 pl-8">
                      <h3 className="text-xl font-bold text-[#153969]">2010</h3>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">First Major Project</h4>
                      <p className="text-gray-600">Completed our first major commercial building project in Jakarta, establishing our reputation for quality and reliability.</p>
                    </div>
                  </div>
                </motion.div>

                {/* 2015 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-end w-1/2 pr-8">
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-[#153969]">2015</h3>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">ISO Certification</h4>
                        <p className="text-gray-600">Achieved ISO 9001 certification, demonstrating our commitment to quality management systems.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </motion.div>

                {/* 2018 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="flex flex-col w-1/2 pl-8">
                      <h3 className="text-xl font-bold text-[#153969]">2018</h3>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Expansion to East Indonesia</h4>
                      <p className="text-gray-600">Opened our first office in Makassar to better serve clients in Eastern Indonesia and take on infrastructure projects in the region.</p>
                    </div>
                  </div>
                </motion.div>

                {/* 2020 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-end w-1/2 pr-8">
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-[#153969]">2020</h3>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Pandemic Adaptation</h4>
                        <p className="text-gray-600">Successfully adapted to the challenges of the global pandemic, implementing innovative safety protocols and digital solutions.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </motion.div>

                {/* 2023 */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="flex flex-col w-1/2 pl-8">
                      <h3 className="text-xl font-bold text-[#153969]">2023</h3>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Green Building Initiative</h4>
                      <p className="text-gray-600">Launched our commitment to sustainable construction with the completion of our first fully green-certified building project.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Today */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-end w-1/2 pr-8">
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-[#153969]">Today</h3>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Looking to the Future</h4>
                        <p className="text-gray-600">Continuing to grow and innovate, with a focus on sustainable building practices and expanding our service offerings.</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#153969] z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-[#153969] mb-6"
            >
              Partner with KBS for Your Next Project
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-8"
            >
              Ready to discuss your construction needs? Our team is here to help you bring your vision to life with expertise, quality, and dedication.
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/contact" className="px-8 py-3 bg-[#153969] hover:bg-[#0f2a4d] text-white rounded-md font-medium transition-colors shadow-lg">
                Contact Us
              </Link>
              <Link href="/services" className="px-8 py-3 border border-[#153969] text-[#153969] hover:bg-[#153969] hover:text-white rounded-md font-medium transition-colors">
                Our Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}