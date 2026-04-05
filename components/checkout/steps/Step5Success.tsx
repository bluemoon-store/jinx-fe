import Image from 'next/image'
import Link from 'next/link'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { InvoiceBadge } from '@/components/checkout/shared/InvoiceBadge'
import { SupportRow } from '@/components/checkout/shared/SupportRow'

function SuccessCard({
  title,
  credits,
  price,
  thumb,
  contents,
  code,
  sealed,
  banner,
}: {
  title: string
  credits: string
  price: string
  thumb: string
  contents: string
  code: string
  sealed: boolean
  banner: string
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border-[1.5px] border-whitesmoke-300 bg-gray-100 p-4 sm:gap-5 sm:p-6 md:p-[30px]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-[15px]">
          <Image
            src={thumb}
            alt=""
            width={122}
            height={63}
            className="h-12 w-24 shrink-0 object-contain sm:h-[63px] sm:w-[122px]"
          />
          <div className="min-w-0">
            <div className="text-base font-bold text-ghostwhite sm:text-[17.5px]">{title}</div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#c2c2e2] sm:text-[17.5px]">
              <span className="opacity-75">{credits}</span>
              <Image src={checkoutImg.line} alt="" width={10} height={2} />
              <div className="flex items-center gap-2">
                <div className="relative h-[18px] w-6 overflow-hidden rounded-[1.5px] border border-black/10">
                  <Image src={contents} alt="" width={24} height={18} className="h-full w-full object-cover" />
                </div>
                <span>CA</span>
              </div>
            </div>
          </div>
        </div>
        <span className="shrink-0 text-xl font-bold text-white sm:text-2xl">{price}</span>
      </div>
      <Image src={checkoutImg.divider} alt="" width={400} height={1} className="h-px w-full opacity-60" />
      {sealed ? (
        <div
          className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-fuchsia-100 bg-gradient-to-b from-white/25 to-transparent px-4 py-5 sm:flex-row sm:gap-3 sm:px-9 sm:py-6"
          style={{ backgroundImage: `url(${checkoutImg.unsealBg})`, backgroundSize: 'cover', backgroundPosition: '50% 50%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-fuchsia/40 to-transparent" />
          <Image src={checkoutImg.eyeOpen} alt="" width={26} height={26} className="relative z-10" />
          <span className="relative z-10 text-center font-nata-sans text-lg font-extrabold tracking-[0.48px] text-slate-50 sm:text-2xl">
            CLICK TO UNSEAL
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-fuchsia-100 bg-[linear-gradient(180deg,rgba(235,45,255,0.25)_0%,rgba(235,45,255,0)_100%)] px-4 py-5 sm:flex-row sm:gap-3 sm:px-9 sm:py-6">
          <span className="break-all text-center font-nata-sans text-base font-extrabold tracking-[0.48px] text-slate-50 sm:text-2xl">
            {code}
          </span>
          <Image src={checkoutImg.invoiceCopy} alt="" width={26} height={26} />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex min-h-11 items-center justify-between rounded-lg border border-whitesmoke-300 bg-gray-200 p-3 text-left text-sm font-bold text-ghostwhite sm:text-base"
        >
          Process to Redeem
          <Image src={checkoutImg.chevronRight} alt="" width={18} height={18} />
        </button>
        <button
          type="button"
          className="flex min-h-11 items-center justify-between rounded-lg border border-whitesmoke-300 bg-gray-200 p-3 text-left text-sm font-bold text-ghostwhite sm:text-base"
        >
          Warranty
          <Image src={checkoutImg.chevronRight} alt="" width={18} height={18} />
        </button>
      </div>
      <Image src={checkoutImg.divider} alt="" width={400} height={1} className="h-px w-full opacity-60" />
      <div className="flex items-center gap-2 opacity-75">
        <Image src={checkoutImg.star} alt="" width={18} height={18} />
        <span className="text-lg font-bold tracking-[0.36px] text-white">Add Review</span>
      </div>
      <Image src={banner} alt="" width={400} height={120} className="w-full object-contain" />
    </div>
  )
}

export function Step5Success() {
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center sm:gap-[30px]">
        <Image src={checkoutImg.subscriptionTick} alt="" width={50} height={50} className="h-12 w-12 sm:h-[50px] sm:w-[50px]" />
        <div className="max-w-md px-1">
          <h1 className="font-nata-sans text-xl font-extrabold tracking-[0.48px] text-ghostwhite sm:text-2xl">
            PAYMENT SUCCESSFUL
          </h1>
          <p className="mt-2 text-sm font-semibold text-lightsteelblue-200 sm:text-base">
            Thank you for shopping with Jinx
          </p>
        </div>
        <InvoiceBadge />
      </div>

      <div className="grid w-full min-w-0 max-w-[1622px] grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
        <SuccessCard
          title="Venmo"
          credits="$250 Credits"
          price="$3.00"
          thumb={checkoutImg.productVenmoS}
          contents={checkoutImg.contentsS1}
          code="EF - ABDS - 11354 - DOEOP"
          sealed={false}
          banner={checkoutImg.facBanner}
        />
        <SuccessCard
          title="Airbnb"
          credits="$2500 Credits"
          price="$11.00"
          thumb={checkoutImg.productAirbnbS}
          contents={checkoutImg.contentsS2}
          code=""
          sealed
          banner={checkoutImg.facBanner2}
        />
        <SuccessCard
          title="Airbnb"
          credits="$2500 Credits"
          price="$11.00"
          thumb={checkoutImg.productAirbnbS2}
          contents={checkoutImg.contentsS3}
          code=""
          sealed
          banner={checkoutImg.facBanner3}
        />
      </div>

      <SupportRow />

      <Link
        href="/"
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white/10 px-6 py-2.5 text-sm font-semibold text-ghostwhite hover:bg-white/15"
      >
        Back to store
      </Link>
    </div>
  )
}
