import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { InvoiceBadge } from '@/components/checkout/shared/InvoiceBadge'
import { SupportRow } from '@/components/checkout/shared/SupportRow'

type Props = { onPaid?: () => void }

export function CompletePaymentPending({ onPaid }: Props) {
  return (
    <div className="flex w-full max-w-[729px] flex-col gap-[30px]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-ghostwhite">
          COMPLETE PAYMENT
        </h2>
        <InvoiceBadge />
      </div>

      <div className="flex flex-col gap-8 rounded-xl border border-[#eeeeee1a] bg-gray-500 p-8">
        <div className="flex items-center gap-3">
          <Image src={checkoutImg.btc} alt="" width={40} height={40} />
          <div className="min-w-0 flex-1">
            <div className="text-lg font-bold tracking-[0.36px] text-white">Pay with Bitcoin</div>
            <p className="text-base text-lightsteelblue-200 [text-shadow:0px_0px_8.63px_#00000099]">
              Copy the address and send the exact amount to the address
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Image src={checkoutImg.qr} alt="Payment QR" width={250} height={250} className="rounded-lg" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-lightsteelblue-200">Payment Address</span>
          <div className="flex items-center justify-between gap-2 rounded-lg border border-whitesmoke-300 bg-gray-100 px-3 py-2.5">
            <Image src={checkoutImg.wallet} alt="" width={18} height={18} />
            <span className="min-w-0 flex-1 truncate text-center text-base font-semibold text-white">
              1FfmbHfnpaZjKFvyi1okTjJJusN455paPH
            </span>
            <Image src={checkoutImg.copyFrame} alt="Copy" width={28} height={28} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-lightsteelblue-200">Amount to pay</span>
          <div className="flex items-center justify-between gap-2 rounded-lg border border-whitesmoke-300 bg-gray-100 px-3 py-2.5">
            <Image src={checkoutImg.coins} alt="" width={18} height={18} />
            <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
              <span className="text-base font-semibold text-white">0.00037 BTC</span>
              <span className="text-base font-semibold text-lightsteelblue-200">≈</span>
              <span className="text-base font-semibold text-lightsteelblue-200">25.03 USD</span>
            </div>
            <Image src={checkoutImg.copyFrame} alt="Copy" width={28} height={28} />
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-white">Expires in</div>
            <p className="text-sm font-semibold text-lightsteelblue-200">Pay the amount before timer runs out</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative h-[18px] w-[18px]">
              <Image
                src={checkoutImg.ellipseA}
                alt=""
                width={16}
                height={16}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <Image
                src={checkoutImg.ellipseB}
                alt=""
                width={16}
                height={16}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <span className="text-base font-semibold text-white [text-shadow:0px_0px_8.63px_#00000099]">16:32</span>
          </div>
        </div>

        {onPaid ? (
          <button
            type="button"
            onClick={onPaid}
            className="w-full rounded-lg border border-white/20 py-2 text-sm font-semibold text-white/80 hover:bg-white/5"
          >
            Simulate payment received (demo)
          </button>
        ) : null}
      </div>

      <SupportRow />
    </div>
  )
}
