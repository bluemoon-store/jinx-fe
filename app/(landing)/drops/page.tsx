'use client'

import CentralIcon from '@central-icons-react/all'

import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { DropsGrid } from '@/components/landing/drops/DropsGrid'
import { UnauthenticatedDropsGate } from '@/components/landing/drops/UnauthenticatedDropsGate'
import { Reveal } from '@/components/ui/reveal'
import { useAuthModal } from '@/components/auth/auth-modal-context'

const TELEGRAM_DROPS_URL = process.env.NEXT_PUBLIC_TELEGRAM_DROPS_URL?.trim() ?? ''

export default function DropsPage() {
  const { isAuthenticated } = useAuthModal()

  return (
    <div className="text-foreground bg-background flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-14 sm:pt-[75px]">
        <Reveal variant="fade-up" threshold={0}>
          <section className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-16 lg:py-14">
            <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CentralIcon
                    name="IconAirdrop2"
                    join="round"
                    fill="filled"
                    stroke="2"
                    radius="1"
                    size={21}
                    color="#EB2DFF"
                    ariaHidden
                  />
                  <h1 className="leading-num-28 tracking-num-0.02 text-lg font-bold text-white">
                    Claim Free Drops
                  </h1>
                </div>
                <p className="text-num-16 leading-num-24 text-lightsteelblue-200 font-medium">
                  Claim free drops from our most premium selection of products
                </p>
              </div>

              <a
                href={TELEGRAM_DROPS_URL || '#'}
                target="_blank"
                rel="noreferrer"
                className="border-whitesmoke-300 font-commissioner relative box-border flex w-full shrink-0 flex-col items-start overflow-hidden rounded-lg border border-solid p-4 text-left text-lg text-white [background:linear-gradient(180deg,rgba(0,136,204,0),rgba(0,136,204,0.25)),linear-gradient(#0d1b35,#0d1b35)] lg:w-auto"
              >
                <div className="gap-num-15 flex items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7.11px] bg-[#0088CC]">
                    <CentralIcon
                      name="IconTelegram"
                      join="round"
                      fill="filled"
                      stroke="1"
                      radius="1"
                      size={18}
                      color="#FFFFFF"
                      ariaHidden
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <b className="tracking-num-0.02 relative leading-7">Join Telegram Channel</b>
                    <div className="text-whitesmoke-100 relative text-base leading-6 font-medium">
                      Stay updated on all the latest drops
                    </div>
                  </div>
                </div>
              </a>
            </header>

            {isAuthenticated ? <DropsGrid /> : <UnauthenticatedDropsGate />}
          </section>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
