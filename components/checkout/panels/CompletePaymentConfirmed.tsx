import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { InvoiceBadge } from '@/components/checkout/shared/InvoiceBadge'
import { SupportRow } from '@/components/checkout/shared/SupportRow'

export function CompletePaymentConfirmed() {
  return (
    <div className="flex w-full max-w-[729px] flex-col gap-[30px]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-ghostwhite">
          COMPLETE PAYMENT
        </h2>
        <InvoiceBadge />
      </div>

      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col rounded-xl border border-[#eeeeee1a] bg-gray-500">
          <div className="flex items-center gap-3 p-8">
            <Image src={checkoutImg.btc} alt="" width={40} height={40} />
            <div className="min-w-0 flex-1">
              <div className="text-lg font-bold tracking-[0.36px] text-white">Pay with Bitcoin</div>
              <p className="text-base text-lightsteelblue-200 [text-shadow:0px_0px_8.63px_#00000099]">
                Copy the address and send the exact amount to the address
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl border border-[#eeeeee1a] bg-[linear-gradient(180deg,rgba(27,217,36,0.25)_0%,rgba(27,217,36,0)_100%),linear-gradient(0deg,rgba(5,19,41,1)_0%,rgba(5,19,41,1)_100%)] p-5">
            <Image src={checkoutImg.subscriptionTick} alt="" width={30} height={30} />
            <div className="text-center">
              <div className="text-lg font-bold tracking-[0.36px] text-white">Payment Successful</div>
              <div className="text-base font-semibold text-white opacity-75">Confirmations (3/3)</div>
            </div>
          </div>
        </div>

        <SupportRow />
      </div>
    </div>
  )
}
