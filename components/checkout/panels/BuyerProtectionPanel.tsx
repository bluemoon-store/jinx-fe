import Image from 'next/image'
import CentralIcon from '@central-icons-react/all'
import { useEffect, useRef, useState } from 'react'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { useBuyerProtectionStore } from '@/lib/buyer-protection-store'

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <Image
        src={checkoutImg.checkSmall}
        alt=""
        width={18}
        height={18}
        className="mt-0.5 shrink-0"
      />
      <p className="text-lightsteelblue-200 text-sm leading-6 font-medium [text-shadow:0px_0px_8.63px_#00000099]">
        {text}
      </p>
    </div>
  )
}

type Props = { onBack: () => void; onContinue: () => void }

export function BuyerProtectionPanel({ onBack, onContinue }: Props) {
  const coverage = useBuyerProtectionStore((s) => s.coverage)
  const setCoverage = useBuyerProtectionStore((s) => s.setCoverage)
  const isSelected = (planId: 'enhanced' | 'basic') => coverage === planId
  const hasMountedRef = useRef(false)
  const [highlightPlan, setHighlightPlan] = useState<'enhanced' | 'basic' | null>(null)

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }
    setHighlightPlan(coverage)
    const timer = window.setTimeout(() => setHighlightPlan(null), 2000)
    return () => window.clearTimeout(timer)
  }, [coverage])

  return (
    <div className="flex w-full max-w-[729px] flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="text-ghostwhite focus-visible:ring-fuchsia/40 inline-flex items-center justify-center bg-transparent p-0 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#041329] focus-visible:outline-none"
            aria-label="Back"
          >
            <CentralIcon
              name="IconArrowLeft"
              join="round"
              fill="outlined"
              stroke="2"
              radius="1"
              size={20}
              ariaHidden={true}
              className="text-ghostwhite"
            />
          </button>
          <h2 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
            BUYER PROTECTION
          </h2>
        </div>
        <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
          Secure your checkout
        </span>
      </div>

      <div className="flex flex-col gap-4 sm:gap-num-15">
        <button
          type="button"
          onClick={() => setCoverage('enhanced')}
          aria-pressed={isSelected('enhanced')}
          className={`flex w-full flex-col gap-4 rounded-xl border bg-gray-500 p-4 text-left transition-colors sm:gap-6 sm:p-6 ${
            isSelected('enhanced')
              ? 'border-fuchsia shadow-[0px_0px_0px_3px_#eb2dff33]'
              : 'border-[#eeeeee1a] hover:border-white/30'
          }`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex max-w-[400px] min-w-0 items-center gap-2.5">
                <div
                  className={`border-whitesmoke-300 flex h-5 w-5 items-center justify-center rounded-full border-[0.83px] ${
                    isSelected('enhanced') ? 'bg-fuchsia' : 'bg-transparent'
                  }`}
                >
                  {isSelected('enhanced') ? (
                    <div className="h-2.5 w-2.5 rounded-[5px] bg-white" />
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-lg font-bold tracking-[0.36px] text-white">
                    Enhanced Protection
                  </span>
                  <span className="text-limegreen inline-flex items-center gap-0.5 rounded-[4.8px] bg-[linear-gradient(180deg,rgba(27,217,36,0.05)_0%,rgba(27,217,36,0.14)_100%)] px-[4.8px] py-0 text-[12.8px] font-semibold [text-shadow:0px_0px_6.9px_#00000099]">
                    <Image
                      src={checkoutImg.radioOn}
                      alt=""
                      width={12}
                      height={12}
                      className="inline"
                    />
                    Most Popular
                  </span>
                </div>
              </div>
              <span
                className={`text-xl font-bold tracking-[0.4px] text-white transition-colors duration-300 ${
                  highlightPlan === 'enhanced' ? 'text-fuchsia [text-shadow:0px_0px_18px_rgba(235,45,255,0.95)]' : ''
                }`}
              >
                +5.00 USD
              </span>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-[509px] flex-col gap-1">
                <Benefit text="Full reimbursement or instant replacement for failed or missing deliveries" />
                <Benefit text="Protection against inactive or compromised account issues" />
                <Benefit text="Real-time tracking support for missing or delayed links" />
                <Benefit text="24/7 priority assistance with fast-track resolution options" />
              </div>
              <CentralIcon
                name="IconShieldCheck"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={68}
                className="mx-auto shrink-0 text-[#0E1B30] lg:mx-0"
              />
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setCoverage('basic')}
          aria-pressed={isSelected('basic')}
          className={`flex w-full flex-col gap-4 rounded-xl border bg-gray-500 p-4 text-left transition-colors sm:gap-6 sm:p-6 ${
            isSelected('basic')
              ? 'border-fuchsia shadow-[0px_0px_0px_3px_#eb2dff33]'
              : 'border-[#eeeeee1a] hover:border-white/30'
          }`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div
                  className={`border-whitesmoke-300 flex h-5 w-5 items-center justify-center rounded-full border ${
                    isSelected('basic') ? 'bg-fuchsia' : 'bg-transparent'
                  }`}
                >
                  {isSelected('basic') ? (
                    <div className="h-2.5 w-2.5 rounded-[5px] bg-white" />
                  ) : null}
                </div>
                <span className="text-lg font-bold tracking-[0.36px] text-white">
                  Basic Coverage
                </span>
              </div>
              <span
                className={`text-xl font-bold tracking-[0.4px] text-white transition-colors duration-300 ${
                  highlightPlan === 'basic' ? 'text-fuchsia [text-shadow:0px_0px_18px_rgba(235,45,255,0.95)]' : ''
                }`}
              >
                Free
              </span>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-[509px] flex-col gap-1">
                <Benefit text="No reimbursement or replacement coverage guaranteed" />
                <Benefit text="Limited support availability" />
                <Benefit text="No expedited resolution services" />
                <Benefit text="Standard assistance only" />
              </div>
              <CentralIcon
                name="IconSupport"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={68}
                className="mx-auto shrink-0 text-[#0E1B30] lg:mx-0"
              />
            </div>
          </div>
        </button>
      </div>

      <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-2 opacity-75 sm:items-center sm:gap-[5px]">
          <Image
            src={checkoutImg.basketDecor}
            alt=""
            width={18}
            height={18}
            className="mt-0.5 shrink-0 sm:mt-0"
          />
          <p className="text-sm leading-relaxed font-semibold tracking-[-0.16px] text-[#c2c2e2] sm:text-base sm:leading-7">
            Protected by Jinx Buyer Protection
          </p>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="bg-fuchsia min-h-11 w-full rounded-[7.79px] px-6 py-3 text-sm font-semibold text-white shadow-[0px_2px_0px_#eb2dff80] hover:brightness-110 sm:w-auto sm:px-12 sm:text-base"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  )
}
