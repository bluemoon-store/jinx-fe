import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { InvoiceBadge } from '@/components/checkout/shared/InvoiceBadge'
import { SupportRow } from '@/components/checkout/shared/SupportRow'

export function CompletePaymentConfirmed() {
  return (
    <div className="flex w-full max-w-[729px] flex-col gap-6 sm:gap-[30px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
        <h2 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
          COMPLETE PAYMENT
        </h2>
        <InvoiceBadge />
      </div>

      <div className="flex flex-col gap-6 sm:gap-[30px]">
        <div className="flex flex-col rounded-xl border border-[#eeeeee1a] bg-gray-500">
          <div className="flex items-start gap-3 p-4 sm:items-center sm:p-6 lg:p-8">
            <Image src={checkoutImg.btc} alt="" width={40} height={40} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-base font-bold tracking-[0.36px] text-white sm:text-lg">
                Pay with Bitcoin
              </div>
              <p className="text-lightsteelblue-200 text-sm [text-shadow:0px_0px_8.63px_#00000099] sm:text-base">
                Copy the address and send the exact amount to the address
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl border border-[#eeeeee1a] bg-[linear-gradient(180deg,rgba(27,217,36,0.25)_0%,rgba(27,217,36,0)_100%),linear-gradient(0deg,rgba(5,19,41,1)_0%,rgba(5,19,41,1)_100%)] p-4 sm:p-5">
            <Image src={checkoutImg.subscriptionTick} alt="" width={30} height={30} />
            <div className="text-center">
              <div className="text-base font-bold tracking-[0.36px] text-white sm:text-lg">
                Payment Successful
              </div>
              <div className="text-sm font-semibold text-white opacity-75 sm:text-base">
                Confirmations (3/3)
              </div>
            </div>
          </div>
        </div>

        <SupportRow />
      </div>
    </div>
  )
}
