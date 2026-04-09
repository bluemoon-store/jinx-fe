'use client'

import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { Reveal } from '@/components/ui/reveal'
import CentralIcon from '@central-icons-react/all'
import Link from 'next/link'

export default function SupportPage() {
  return (
    <div className="text-num-14 text-ghostwhite font-nata-sans flex min-h-screen w-full flex-col bg-gray-400 text-left">
      <Navbar />
      <main className="flex flex-1 flex-col pt-14 sm:pt-[75px]">
        <Reveal variant="fade-up" threshold={0}>
          <div className="box-border flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:mx-auto lg:px-8">
            <header className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[18px]">
                <CentralIcon
                  name="IconRescueRing"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={24}
                  color="#FF00FF"
                />
                <h1 className="tracking-num-0.02 leading-num-28 font-semibold">Support</h1>
              </div>
              <p className="text-lightsteelblue-200 text-base leading-relaxed">
                Need help with an order, payment, or your account? Our team is here to assist you.
              </p>
            </header>

            <section className="border-darkslateblue rounded-num-8 flex flex-col gap-4 border border-solid bg-gray-500/50 p-6">
              <h2 className="text-num-16 font-commissioner font-semibold">Contact us</h2>
              <p className="text-lightsteelblue-200 text-base">
                Email{' '}
                <a
                  href="mailto:support@bluemoon.example"
                  className="text-ghostwhite font-semibold underline decoration-white/30 underline-offset-2 transition-colors hover:decoration-white"
                >
                  support@bluemoon.example
                </a>{' '}
                and include your order ID when applicable so we can help faster.
              </p>
            </section>

            <p className="text-lightsteelblue-200 text-base">
              For quick answers, browse our{' '}
              <Link href="/faqs" className="text-ghostwhite font-semibold underline decoration-white/30 underline-offset-2 transition-colors hover:decoration-white">
                FAQs
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
