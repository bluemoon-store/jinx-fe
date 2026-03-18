'use client'

import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import Legal from '@/components/landing/Legal'
import { Reveal } from '@/components/ui/reveal'

export default function LegalPage() {
  return (
    <div className="text-num-14 text-ghostwhite font-nata-sans flex min-h-screen w-full flex-col bg-gray-400 text-left">
      <Navbar />
      <main className="flex flex-1 flex-col pt-14 sm:pt-[75px]">
        <Reveal variant="fade-up" threshold={0}>
          <Legal />
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
