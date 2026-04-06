'use client'

import Image from 'next/image'
import CentralIcon from '@central-icons-react/all'
import { useState } from 'react'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { InvoiceBadge } from '@/components/checkout/shared/InvoiceBadge'
import { SupportRow } from '@/components/checkout/shared/SupportRow'
import { RATING_STAR_COLORS } from '@/lib/rating-star-colors'

const SUCCESS_CARDS = [
  {
    title: 'Venmo',
    credits: '$250 Credits',
    price: '$3.00',
    thumb: checkoutImg.productVenmoS,
    contents: checkoutImg.contentsS1,
    code: 'EF - ABDS - 11354 - DOEOP',
    sealed: false,
    rating: 0,
  },
  {
    title: 'Airbnb',
    credits: '$2500 Credits',
    price: '$11.00',
    thumb: checkoutImg.productAirbnbS,
    contents: checkoutImg.contentsS2,
    code: '',
    sealed: true,
    rating: 0,
  },
  {
    title: 'Airbnb',
    credits: '$2500 Credits',
    price: '$11.00',
    thumb: checkoutImg.productAirbnbS2,
    contents: checkoutImg.contentsS3,
    code: '',
    sealed: true,
    rating: 0,
  },
] as const

function RatingStarsInteractive({ initialRating }: { initialRating: number }) {
  const [rating, setRating] = useState(() => Math.min(5, Math.max(0, Math.round(initialRating))))
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const previewRating = hoveredStar ?? rating

  return (
    <div
      className="font-nata-sans flex shrink-0 items-center gap-2"
      role="group"
      aria-label="Rating"
      onMouseLeave={() => setHoveredStar(null)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => setRating(n)}
          onMouseEnter={() => setHoveredStar(n)}
          className="rounded-num-8 focus-visible:ring-fuchsia/40 box-border flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center border border-solid border-[#18263E] bg-[#19263F] transition-[border-color,box-shadow] [-webkit-tap-highlight-color:transparent] hover:border-white/20 focus-visible:ring-2 focus-visible:outline-none"
          aria-label={`${n} stars`}
          aria-pressed={rating >= n}
        >
          <CentralIcon
            name="IconStar"
            join="round"
            fill="filled"
            stroke="1"
            radius="3"
            size={22}
            ariaHidden={true}
            className={previewRating >= n ? undefined : 'text-lightsteelblue-200/35'}
            style={
              previewRating >= n && previewRating > 0
                ? { color: RATING_STAR_COLORS[previewRating - 1] }
                : undefined
            }
          />
        </button>
      ))}
    </div>
  )
}

function SuccessCard({
  title,
  credits,
  price,
  thumb,
  contents,
  code,
  sealed,
  initialRating,
  onUnseal,
}: {
  title: string
  credits: string
  price: string
  thumb: string
  contents: string
  code: string
  sealed: boolean
  initialRating: number
  onUnseal?: () => void
}) {
  return (
    <div className="border-whitesmoke-300 flex flex-col gap-4 rounded-xl border-[1.5px] bg-gray-100 p-4 sm:gap-5 sm:p-6 md:p-num-30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-num-15">
          <Image
            src={thumb}
            alt=""
            width={122}
            height={63}
            className="h-12 w-24 shrink-0 object-contain sm:h-[63px] sm:w-num-122"
          />
          <div className="min-w-0">
            <div className="text-ghostwhite text-base font-bold sm:text-[17.5px]">{title}</div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#c2c2e2] sm:text-[17.5px]">
              <span className="opacity-75">{credits}</span>
              <Image src={checkoutImg.line} alt="" width={10} height={2} />
              <div className="flex items-center gap-2">
                <div className="relative h-num-18 w-6 overflow-hidden rounded-[1.5px] border border-black/10">
                  <Image
                    src={contents}
                    alt=""
                    width={24}
                    height={18}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span>CA</span>
              </div>
            </div>
          </div>
        </div>
        <span className="shrink-0 text-xl font-bold text-white sm:text-2xl">{price}</span>
      </div>
      <Image
        src={checkoutImg.divider}
        alt=""
        width={400}
        height={1}
        className="h-px w-full opacity-60"
      />
      {sealed ? (
        <button
          type="button"
          onClick={onUnseal}
          className="relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-fuchsia-100 bg-linear-to-b from-white/25 to-transparent px-4 py-5 text-left sm:flex-row sm:gap-3 sm:px-9 sm:py-6"
          style={{
            backgroundImage: `url(${checkoutImg.unsealBg})`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
          }}
        >
          <div className="from-fuchsia/40 absolute inset-0 bg-linear-to-b to-transparent" />
          <Image
            src={checkoutImg.eyeOpen}
            alt=""
            width={26}
            height={26}
            className="relative z-10"
          />
          <span className="font-nata-sans relative z-10 text-center text-lg font-extrabold tracking-[0.48px] text-slate-50 sm:text-2xl">
            CLICK TO UNSEAL
          </span>
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-fuchsia-100 bg-[linear-gradient(180deg,rgba(235,45,255,0.25)_0%,rgba(235,45,255,0)_100%)] px-4 py-5 sm:flex-row sm:gap-3 sm:px-9 sm:py-6">
          <span className="font-nata-sans text-center text-base font-extrabold tracking-[0.48px] break-all text-slate-50 sm:text-2xl">
            {code}
          </span>
          <Image src={checkoutImg.invoiceCopy} alt="" width={26} height={26} />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="border-whitesmoke-300 text-ghostwhite flex min-h-11 items-center justify-between rounded-lg border bg-gray-200 p-3 text-left text-sm font-bold sm:text-base"
        >
          Process to Redeem
          <Image src={checkoutImg.chevronRight} alt="" width={18} height={18} />
        </button>
        <button
          type="button"
          className="border-whitesmoke-300 text-ghostwhite flex min-h-11 items-center justify-between rounded-lg border bg-gray-200 p-3 text-left text-sm font-bold sm:text-base"
        >
          Warranty
          <Image src={checkoutImg.chevronRight} alt="" width={18} height={18} />
        </button>
      </div>
      <Image
        src={checkoutImg.divider}
        alt=""
        width={400}
        height={1}
        className="h-px w-full opacity-60"
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CentralIcon
            name="IconStar"
            join="round"
            fill="filled"
            stroke="1"
            radius="3"
            size={18}
            ariaHidden={true}
            className="text-lightsteelblue-200 shrink-0"
          />
          <span className="text-lg font-bold tracking-[0.36px] text-white">Add Review</span>
        </div>
        <div className="border-whitesmoke-300 flex flex-col gap-4 rounded-xl border border-solid bg-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-5">
          <span className="font-nata-sans text-num-14 leading-num-20 font-semibold tracking-normal text-[#9497BC]">
            Your rating
          </span>
          <RatingStarsInteractive initialRating={initialRating} />
        </div>
      </div>
    </div>
  )
}

export function Step5Success({ onUnseal }: { onUnseal?: () => void }) {
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center sm:gap-num-30">
        <Image
          src={checkoutImg.subscriptionTick}
          alt=""
          width={50}
          height={50}
          className="h-12 w-12 sm:h-[50px] sm:w-[50px]"
        />
        <div className="max-w-md px-1">
          <h1 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
            PAYMENT SUCCESSFUL
          </h1>
          <p className="text-lightsteelblue-200 mt-2 text-sm font-semibold sm:text-base">
            Thank you for shopping with Jinx
          </p>
        </div>
        <InvoiceBadge />
      </div>

      <div className="grid w-full min-w-0 max-w-[1920px] grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 2xl:grid-cols-3">
        {SUCCESS_CARDS.map((card) => (
          <SuccessCard
            key={`${card.title}-${card.thumb}`}
            title={card.title}
            credits={card.credits}
            price={card.price}
            thumb={card.thumb}
            contents={card.contents}
            code={card.code}
            sealed={card.sealed}
            initialRating={card.rating}
            onUnseal={card.sealed ? onUnseal : undefined}
          />
        ))}
      </div>

      <SupportRow />
    </div>
  )
}
