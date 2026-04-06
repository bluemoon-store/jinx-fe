'use client'

import type { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import confetti from 'canvas-confetti'

import { CartColumn } from '@/components/checkout/cart/CartColumn'
import { BuyerProtectionPanel } from '@/components/checkout/panels/BuyerProtectionPanel'
import { CheckoutOverviewCard } from '@/components/checkout/panels/CheckoutOverviewCard'
import { CompletePaymentConfirmed } from '@/components/checkout/panels/CompletePaymentConfirmed'
import { CompletePaymentPending } from '@/components/checkout/panels/CompletePaymentPending'
import { PaymentMethodPanel } from '@/components/checkout/panels/PaymentMethodPanel'
import { BackToStore } from '@/components/checkout/shared/BackToStore'
import { CheckoutLogo } from '@/components/checkout/shared/CheckoutLogo'
import { LegalFooter } from '@/components/checkout/shared/LegalFooter'
import { Step1GuestColumn } from '@/components/checkout/steps/Step1GuestColumn'
import { Step5Success } from '@/components/checkout/steps/Step5Success'

function SuccessTopBar({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <BackToStore onBack={onBack} />
      <div className="self-end sm:self-auto">
        <CheckoutLogo variant="default" />
      </div>
    </div>
  )
}

export function CheckoutPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const raw = searchParams.get('step')
  const step = Math.min(6, Math.max(1, raw ? Number.parseInt(raw, 10) || 1 : 1))

  const fireConfetti = useCallback(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return

    confetti({
      particleCount: 150,
      spread: 60,
      origin: { x: 0.5, y: 0.25 },
      zIndex: 60,
    })
  }, [])

  const setStep = useCallback(
    (n: number) => {
      const next = Math.min(6, Math.max(1, n))
      router.push(`/checkout?step=${next}` as Route)
    },
    [router]
  )

  const handleBack = useCallback(() => {
    if (step <= 1) {
      router.push('/shop')
      return
    }
    setStep(step - 1)
  }, [router, setStep, step])

  useEffect(() => {
    if (step !== 5) return
    fireConfetti()
  }, [fireConfetti, step])

  if (step === 5) {
    return (
      <div
        className="flex min-h-screen flex-col overflow-x-hidden bg-gray-500 px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 0%, rgba(27,217,36,0.2) 0%, rgba(27,217,36,0) 100%), linear-gradient(0deg, #010f25 0%, #010f25 100%)',
        }}
      >
        <div className="mx-auto w-full max-w-[1700px] min-w-0 flex-1">
          <SuccessTopBar onBack={handleBack} />
          <Step5Success onUnseal={fireConfetti} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden lg:flex-row">
      <aside className="flex w-full min-w-0 flex-col border-white/5 bg-gray-500 lg:min-h-screen lg:w-1/2 lg:border-r">
        <div className="mx-auto flex w-full max-w-[952px] min-w-0 flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:mx-0 lg:w-fit lg:max-w-[952px] lg:min-w-[809px] lg:self-end lg:px-8 xl:px-12">
          <BackToStore onBack={handleBack} label={step <= 1 ? 'Back to store' : 'Back'} />
          <div className="mt-6 flex w-full min-w-0 flex-1 flex-col sm:mt-8 lg:mt-10">
            {step === 1 || step === 2 || step === 3 ? <CartColumn /> : null}
            {step === 4 ? <CheckoutOverviewCard centerSecurityNote /> : null}
            {step === 6 ? <CheckoutOverviewCard /> : null}
          </div>
          <LegalFooter />
        </div>
      </aside>

      <main className="flex w-full min-w-0 flex-col bg-[#041329] lg:min-h-screen lg:w-1/2">
        <div className="relative mx-auto flex w-full max-w-[800px] min-w-0 flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:mx-0 lg:self-start lg:px-8 xl:px-12">
          <div className="flex shrink-0 justify-end pb-2">
            <CheckoutLogo variant="alt" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col pt-2 sm:pt-4 lg:pt-6">
            {step === 1 ? <Step1GuestColumn onContinue={() => setStep(2)} /> : null}
            {step === 2 ? (
              <BuyerProtectionPanel onBack={() => setStep(1)} onContinue={() => setStep(3)} />
            ) : null}
            {step === 3 ? (
              <PaymentMethodPanel onBack={() => setStep(2)} onContinue={() => setStep(4)} />
            ) : null}
            {step === 4 ? <CompletePaymentPending onPaid={() => setStep(5)} /> : null}
            {step === 6 ? <CompletePaymentConfirmed /> : null}
          </div>
        </div>
      </main>
    </div>
  )
}
