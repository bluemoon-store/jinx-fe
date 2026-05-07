'use client'

import CentralIcon from '@central-icons-react/all'

import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { DropsGrid } from '@/components/landing/drops/DropsGrid'
import { UnauthenticatedDropsGate } from '@/components/landing/drops/UnauthenticatedDropsGate'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { useAuthModal } from '@/components/auth/auth-modal-context'

const TELEGRAM_DROPS_URL = process.env.NEXT_PUBLIC_TELEGRAM_DROPS_URL?.trim() ?? ''

export default function DropsPage() {
  const { isAuthenticated } = useAuthModal()

  return (
    <div className="text-foreground flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-14 sm:pt-[75px]">
        <Reveal variant="fade-up" threshold={0}>
          <section className="mx-auto w-full max-w-[1200px] px-6 py-10 lg:px-12 lg:py-14">
            <header className="mb-6 space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">🎁 Claim Free Drops</h1>
              <p className="max-w-2xl text-sm text-white/75 sm:text-base">
                Limited giveaways from the Jinx catalog. Claim one free unit while stock lasts.
              </p>
            </header>

            {TELEGRAM_DROPS_URL ? (
              <Card className="mb-6 border-border-subtle bg-card p-4">
                <a
                  href={TELEGRAM_DROPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold">Join our Telegram Drops Channel</p>
                    <p className="text-xs text-white/70">
                      Be the first to know when new free drops go live.
                    </p>
                  </div>
                  <CentralIcon
                    name="IconArrowRight"
                    join="round"
                    fill="filled"
                    stroke="1"
                    radius="1"
                    size={18}
                    ariaHidden
                  />
                </a>
              </Card>
            ) : null}

            {isAuthenticated ? <DropsGrid /> : <UnauthenticatedDropsGate />}
          </section>
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
