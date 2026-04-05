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
    <div className="flex flex-col gap-5 rounded-xl border-[1.5px] border-whitesmoke-300 bg-gray-100 p-[30px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-[15px]">
          <Image src={thumb} alt="" width={122} height={63} className="h-[63px] w-[122px] shrink-0 object-contain" />
          <div>
            <div className="text-[17.5px] font-bold text-ghostwhite">{title}</div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[17.5px] text-[#c2c2e2]">
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
        <span className="text-2xl font-bold text-white">{price}</span>
      </div>
      <Image src={checkoutImg.divider} alt="" width={400} height={1} className="h-px w-full opacity-60" />
      {sealed ? (
        <div
          className="relative flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed border-fuchsia-100 bg-gradient-to-b from-white/25 to-transparent px-9 py-6"
          style={{ backgroundImage: `url(${checkoutImg.unsealBg})`, backgroundSize: 'cover', backgroundPosition: '50% 50%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-fuchsia/40 to-transparent" />
          <Image src={checkoutImg.eyeOpen} alt="" width={26} height={26} className="relative z-10" />
          <span className="relative z-10 font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-slate-50">
            CLICK TO UNSEAL
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 rounded-xl border border-dashed border-fuchsia-100 bg-[linear-gradient(180deg,rgba(235,45,255,0.25)_0%,rgba(235,45,255,0)_100%)] px-9 py-6">
          <span className="font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-slate-50">{code}</span>
          <Image src={checkoutImg.invoiceCopy} alt="" width={26} height={26} />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex items-center justify-between rounded-lg border border-whitesmoke-300 bg-gray-200 p-3 text-left text-base font-bold text-ghostwhite"
        >
          Process to Redeem
          <Image src={checkoutImg.chevronRight} alt="" width={18} height={18} />
        </button>
        <button
          type="button"
          className="flex items-center justify-between rounded-lg border border-whitesmoke-300 bg-gray-200 p-3 text-left text-base font-bold text-ghostwhite"
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
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center gap-8 px-4 py-10">
      <div className="flex flex-col items-center gap-[30px] text-center">
        <Image src={checkoutImg.subscriptionTick} alt="" width={50} height={50} />
        <div>
          <h1 className="font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-ghostwhite">
            PAYMENT SUCCESSFUL
          </h1>
          <p className="mt-2 text-base font-semibold text-lightsteelblue-200">Thank you for shopping with Jinx</p>
        </div>
        <InvoiceBadge />
      </div>

      <div className="grid w-full max-w-[1622px] grid-cols-1 gap-[30px] lg:grid-cols-3">
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
        className="rounded-lg bg-white/10 px-6 py-2 text-sm font-semibold text-ghostwhite hover:bg-white/15"
      >
        Back to store
      </Link>
    </div>
  )
}
