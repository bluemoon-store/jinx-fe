import type { Metadata } from 'next'
import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { Reveal } from '@/components/ui/reveal'
import { VouchesGrid } from '@/components/vouches/VouchesGrid'

export const metadata: Metadata = {
  title: 'Vouches | BlueMoon',
  description: 'Public proof of delivery and testimonials from our customers.',
}

export default function VouchesPage() {
  return (
    <div className="text-num-14 text-foreground font-nata-sans flex min-h-screen w-full flex-col bg-background text-left">
      <Navbar />
      <main className="flex flex-1 flex-col pt-14 sm:pt-[75px]">
        <div className="mx-auto flex w-full max-w-[1476.9px] flex-1 flex-col px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:px-8">
          <Reveal variant="fade-up">
            <header className="mb-10 flex flex-col gap-3 text-center sm:mb-14">
              <h1 className="font-nata-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl uppercase">
                Customer <span className="text-fuchsia">Vouches</span>
              </h1>
              <p className="mx-auto max-w-2xl text-base text-lightsteelblue-100 sm:text-lg">
                Real proof of delivery from our community. Every image is automatically watermarked
                to prevent theft.
              </p>
            </header>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <VouchesGrid />
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  )
}
