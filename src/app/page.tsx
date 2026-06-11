'use client'

import HeroSection from '@/app/components/home/HeroSection'
import ServicesSection from './components/home/ServicesSection'
import PlatformSection from './components/home/PlatformSection'
import StatsSection from './components/home/StatsSection'
import LocationSection from './components/home/LocationSection'
import BlogNewsSection from './components/home/BlogNewsSection'
import VisionMissionSection from './components/home/VisionMissionSection'
import TechSection from './components/home/TechSection'


export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection/>

      <VisionMissionSection />

      <ServicesSection />

      <PlatformSection />

      <TechSection />

      <LocationSection />

      <BlogNewsSection />

      <StatsSection />

    </main>
  )
}