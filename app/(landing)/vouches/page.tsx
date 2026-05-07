import type { Metadata } from 'next'
import CentralIcon from '@central-icons-react/all'

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
    <div className="text-foreground flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-14 sm:pt-[75px]">
        <Reveal variant="fade-up" threshold={0}>
          <section className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-16 lg:py-14">
            <header className="mb-10 flex flex-col items-center gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-2">
                  <CentralIcon
                    name="IconReceiptBill"
                    join="round"
                    fill="filled"
                    stroke="2"
                    radius="1"
                    size={21}
                    color="#EB2DFF"
                    ariaHidden
                  />
                  <h1 className="text-lg leading-num-28 tracking-num-0.02 font-bold text-white">
                    Customer Vouches
                  </h1>
                </div>
                <p className="text-num-16 leading-num-24 text-lightsteelblue-200 font-medium">
                  Vouches from our real customers.
                </p>
              </div>
            </header>

            <VouchesGrid />
          </section>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
