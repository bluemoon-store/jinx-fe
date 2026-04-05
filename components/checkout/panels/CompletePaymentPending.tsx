import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { InvoiceBadge } from '@/components/checkout/shared/InvoiceBadge'
import { SupportRow } from '@/components/checkout/shared/SupportRow'

type Props = { onPaid?: () => void }

export function CompletePaymentPending({ onPaid }: Props) {
  return (
    <div className="flex w-full max-w-[729px] flex-col gap-6 sm:gap-[30px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
        <h2 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
          COMPLETE PAYMENT
        </h2>
        <InvoiceBadge />
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-[#eeeeee1a] bg-gray-500 p-4 sm:gap-8 sm:p-6 lg:p-8">
        <div className="flex items-start gap-3 sm:items-center">
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

        <div className="flex w-full justify-center">
          <Image
            src={checkoutImg.qr}
            alt="Payment QR"
            width={250}
            height={250}
            className="h-auto w-full max-w-[250px] rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-lightsteelblue-200 text-sm font-semibold">Payment Address</span>
          <div className="border-whitesmoke-300 flex min-h-11 items-center justify-between gap-2 rounded-lg border bg-gray-100 px-2 py-2 sm:px-3 sm:py-2.5">
            <Image src={checkoutImg.wallet} alt="" width={18} height={18} className="shrink-0" />
            <span className="min-w-0 flex-1 text-center text-xs font-semibold break-all text-white sm:text-sm md:text-base">
              1FfmbHfnpaZjKFvyi1okTjJJusN455paPH
            </span>
            <Image
              src={checkoutImg.copyFrame}
              alt="Copy"
              width={28}
              height={28}
              className="shrink-0"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-lightsteelblue-200 text-sm font-semibold">Amount to pay</span>
          <div className="border-whitesmoke-300 flex min-h-11 items-center justify-between gap-2 rounded-lg border bg-gray-100 px-2 py-2 sm:px-3 sm:py-2.5">
            <Image src={checkoutImg.coins} alt="" width={18} height={18} className="shrink-0" />
            <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-semibold text-white sm:text-base">0.00037 BTC</span>
              <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">≈</span>
              <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
                25.03 USD
              </span>
            </div>
            <Image
              src={checkoutImg.copyFrame}
              alt="Copy"
              width={28}
              height={28}
              className="shrink-0"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-white">Expires in</div>
            <p className="text-lightsteelblue-200 text-sm font-semibold">
              Pay the amount before timer runs out
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative h-[18px] w-[18px]">
              <Image
                src={checkoutImg.ellipseA}
                alt=""
                width={16}
                height={16}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <Image
                src={checkoutImg.ellipseB}
                alt=""
                width={16}
                height={16}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <span className="text-base font-semibold text-white [text-shadow:0px_0px_8.63px_#00000099]">
              16:32
            </span>
          </div>
        </div>

        {onPaid ? (
          <button
            type="button"
            onClick={onPaid}
            className="min-h-11 w-full rounded-lg border border-white/20 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/5"
          >
            Simulate payment received (demo)
          </button>
        ) : null}
      </div>

      <SupportRow />
    </div>
  )
}
