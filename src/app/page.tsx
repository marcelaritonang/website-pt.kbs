'use client'

import HeroSection from '@/app/components/home/HeroSection'
import ServicesSection from './components/home/ServicesSection'
import StatsSection from './components/home/StatsSection'
import LocationSection from './components/home/LocationSection'
import BlogNewsSection from './components/home/BlogNewsSection'
// import ContactSection from './components/home/ContactSection'

import VisionMissionSection from './components/home/VisionMissionSection'

// Data yang bisa dipindahkan ke utils/data.ts nanti


export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection/>
      
      <VisionMissionSection />
      
      <ServicesSection />
      
      <LocationSection />
      
      <BlogNewsSection />

      <StatsSection />
      {/* <ContactSection /> */}

    </main>
  )
}