import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <Image src={checkoutImg.checkSmall} alt="" width={18} height={18} className="mt-0.5 shrink-0" />
      <p className="text-sm font-medium leading-6 text-lightsteelblue-200 [text-shadow:0px_0px_8.63px_#00000099]">
        {text}
      </p>
    </div>
  )
}

type Props = { onContinue: () => void }

export function BuyerProtectionPanel({ onContinue }: Props) {
  return (
    <div className="flex w-full max-w-[729px] flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2.5">
          <Image src={checkoutImg.buyerShield} alt="" width={22} height={22} className="shrink-0" />
          <h2 className="font-nata-sans text-xl font-extrabold tracking-[0.48px] text-ghostwhite sm:text-2xl">
            BUYER PROTECTION
          </h2>
        </div>
        <span className="text-sm font-semibold text-lightsteelblue-200 sm:text-base">Secure your checkout</span>
      </div>

      <div className="flex flex-col gap-4 sm:gap-[15px]">
        <div className="flex flex-col gap-4 rounded-xl border border-fuchsia bg-gray-500 p-4 shadow-[0px_0px_0px_3px_#eb2dff33] sm:gap-6 sm:p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 max-w-[400px] items-center gap-2.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-[0.83px] border-whitesmoke-300 bg-fuchsia">
                  <div className="h-2.5 w-2.5 rounded-[5px] bg-white" />
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-lg font-bold tracking-[0.36px] text-white">Enhanced Protection</span>
                  <span className="inline-flex items-center gap-0.5 rounded-[4.8px] bg-[linear-gradient(180deg,rgba(27,217,36,0.05)_0%,rgba(27,217,36,0.14)_100%)] px-[4.8px] py-0 text-[12.8px] font-semibold text-limegreen [text-shadow:0px_0px_6.9px_#00000099]">
                    <Image src={checkoutImg.radioOn} alt="" width={12} height={12} className="inline" />
                    Most Popular
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-[0.4px] text-white">+5.00 USD</span>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
              <div className="flex max-w-[509px] flex-col gap-1">
                <Benefit text="Full reimbursement or instant replacement for failed or missing deliveries" />
                <Benefit text="Protection against inactive or compromised account issues" />
                <Benefit text="Real-time tracking support for missing or delayed links" />
                <Benefit text="24/7 priority assistance with fast-track resolution options" />
              </div>
              <Image
                src={checkoutImg.shield}
                alt=""
                width={68}
                height={68}
                className="mx-auto shrink-0 lg:mx-0"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-[#eeeeee1a] bg-gray-500 p-4 sm:gap-6 sm:p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-whitesmoke-300" />
                <span className="text-lg font-bold tracking-[0.36px] text-white">Basic Coverage</span>
              </div>
              <span className="text-xl font-bold tracking-[0.4px] text-white">Free</span>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
              <div className="flex max-w-[509px] flex-col gap-1">
                <Benefit text="No reimbursement or replacement coverage guaranteed" />
                <Benefit text="Limited support availability" />
                <Benefit text="No expedited resolution services" />
                <Benefit text="Standard assistance only" />
              </div>
              <Image
                src={checkoutImg.supportIcon}
                alt=""
                width={68}
                height={68}
                className="mx-auto shrink-0 lg:mx-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-2 opacity-75 sm:items-center sm:gap-[5px]">
          <Image src={checkoutImg.basketDecor} alt="" width={18} height={18} className="mt-0.5 shrink-0 sm:mt-0" />
          <p className="text-sm font-semibold leading-relaxed tracking-[-0.16px] text-[#c2c2e2] sm:text-base sm:leading-7">
            Protected by Jinx Buyer Protection
          </p>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="min-h-11 w-full rounded-[7.79px] bg-fuchsia px-6 py-3 text-sm font-semibold text-white shadow-[0px_2px_0px_#eb2dff80] hover:brightness-110 sm:w-auto sm:px-12 sm:text-base"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  )
}
