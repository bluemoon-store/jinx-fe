'use client'

import type { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

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

function StepDots({ step, onStep }: { step: number; onStep: (n: number) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onStep(n)}
          className={`h-2.5 w-2.5 rounded-full transition-colors ${
            n === step ? 'bg-fuchsia' : 'bg-white/20 hover:bg-white/40'
          }`}
          aria-label={`Go to step ${n}`}
        />
      ))}
    </div>
  )
}

function SuccessTopBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <BackToStore />
      <CheckoutLogo variant="default" />
    </div>
  )
}

export function CheckoutPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const raw = searchParams.get('step')
  const step = Math.min(6, Math.max(1, raw ? Number.parseInt(raw, 10) || 1 : 1))

  const setStep = useCallback(
    (n: number) => {
      const next = Math.min(6, Math.max(1, n))
      router.push(`/checkout?step=${next}` as Route)
    },
    [router],
  )

  if (step === 5) {
    return (
      <div
        className="flex min-h-screen flex-col bg-gray-500 px-4 py-8"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 0%, rgba(27,217,36,0.2) 0%, rgba(27,217,36,0) 100%), linear-gradient(0deg, #010f25 0%, #010f25 100%)',
        }}
      >
        <div className="mx-auto w-full max-w-[1622px] flex-1">
          <SuccessTopBar />
          <Step5Success />
          <LegalFooter />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#041329]">
      <div className="mx-auto flex max-w-[1920px] flex-col lg:min-h-screen lg:flex-row">
        <aside className="flex flex-col border-white/5 bg-gray-500 px-5 py-8 lg:w-1/2 lg:max-w-[952px] lg:border-r lg:px-10 xl:px-16">
          <BackToStore />
          <div className="mt-10 flex flex-1 flex-col">
            {step === 1 || step === 2 || step === 3 ? <CartColumn /> : null}
            {step === 4 || step === 6 ? <CheckoutOverviewCard /> : null}
          </div>
          <LegalFooter />
        </aside>

        <main className="relative flex flex-1 flex-col px-5 py-8 lg:px-10 xl:px-16">
          <div className="flex shrink-0 justify-end">
            <CheckoutLogo variant="alt" />
          </div>
          <div className="flex flex-1 flex-col pt-4 lg:pt-6">
            {step === 1 ? <Step1GuestColumn onContinue={() => setStep(2)} /> : null}
            {step === 2 ? <BuyerProtectionPanel onContinue={() => setStep(3)} /> : null}
            {step === 3 ? <PaymentMethodPanel onContinue={() => setStep(4)} /> : null}
            {step === 4 ? (
              <CompletePaymentPending onPaid={() => setStep(5)} />
            ) : null}
            {step === 6 ? <CompletePaymentConfirmed /> : null}
          </div>
          <StepDots step={step} onStep={setStep} />
        </main>
      </div>
    </div>
  )
}
