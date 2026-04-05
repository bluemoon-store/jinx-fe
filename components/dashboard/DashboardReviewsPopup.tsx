'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useState } from 'react'

import { RATING_STAR_COLORS } from '@/lib/rating-star-colors'

const modalShadowClass =
  'shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,0,0,0.1),0px_6.213004112243652px_9.32px_-6.21px_rgba(0,0,0,0.1)]'

const reviewLabelClass =
  'font-nata-sans text-num-14 leading-num-20 font-semibold tracking-normal text-[#9497BC]'

export type DashboardReviewsPopupProps = {
  brand?: string
  itemCount?: number
  price?: string
  date?: string
  time?: string
  /** When reopening to edit an existing review. */
  initialRating?: number
  initialComment?: string
  onClose?: () => void
  onSubmit?: (payload: { rating: number; comment: string }) => void
}

export const DashboardReviewsPopup: FunctionComponent<DashboardReviewsPopupProps> = ({
  brand = 'Airbnb',
  itemCount = 1,
  price = '$2.50',
  date = 'March 30, 2026',
  time = '11:11 AM',
  initialRating,
  initialComment,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(initialRating ?? 0)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [comment, setComment] = useState(initialComment ?? '')

  const previewRating = hoveredStar ?? rating

  const handleSubmit = () => {
    if (rating < 1) return
    onSubmit?.({ rating, comment: comment.trim() })
  }

  return (
    <div
      className={`text-ghostwhite font-nata-sans py-num-18 relative box-border flex w-full max-w-[419px] flex-col items-start overflow-hidden rounded-xl border border-solid border-gray-500 bg-gray-200 px-4 text-left text-base sm:px-5 ${modalShadowClass} lg:max-w-[480px] lg:text-lg`}
    >
      <div className="flex w-full min-w-0 flex-col items-center gap-6">
        <div className="text-whitesmoke-100 flex w-full flex-col items-start gap-3 self-stretch text-base sm:text-lg lg:text-xl">
          <div className="flex items-center justify-between gap-5 self-stretch">
            <div className="flex min-w-0 flex-1 items-center">
              <h2 className="tracking-num-0.02 relative leading-7 font-extrabold uppercase">
                Add review
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-num-8 h-num-30 w-num-30 box-border flex shrink-0 touch-manipulation items-center justify-center border border-solid border-[#18263E] p-0 [-webkit-tap-highlight-color:transparent]"
              aria-label="Close"
            >
              <CentralIcon
                name="IconCrossSmall"
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={20}
                ariaHidden={true}
                className="text-white/50"
              />
            </button>
          </div>
          <div className="h-px w-full self-stretch bg-gray-100" aria-hidden />
        </div>

        <div className="flex items-center gap-3 self-stretch text-[18px] text-white">
          <div
            className="rounded-num-8 relative flex h-12 w-[98.7px] shrink-0 items-center justify-center overflow-hidden bg-[#0D1B35] shadow-[0px_0px_3.31px_rgba(0,0,0,0.6)]"
            aria-hidden
          />
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <b className="font-commissioner leading-num-28 tracking-num-0.02 relative text-[18px] font-bold text-white">
              {brand}
            </b>
            <div className="font-commissioner text-num-16 leading-num-20 text-lightsteelblue-200 self-stretch font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              <span>
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'} -{' '}
              </span>
              <span className="text-white">{price}</span>
              <span>
                {' '}
                - {date} - {time}
              </span>
            </div>
          </div>
        </div>

        <div className="h-px w-full self-stretch bg-gray-100" aria-hidden />

        <p className={`relative self-stretch ${reviewLabelClass}`}>
          Rate your purchase and overall experience with Jinx Store
        </p>

        <div className="flex flex-col gap-3 self-stretch sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className={`relative ${reviewLabelClass}`}>Your rating</div>
          <div
            className="font-nata-sans flex items-center gap-2"
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
                className="rounded-num-8 focus-visible:ring-fuchsia/40 font-inherit box-border flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center border border-solid border-[#16243B] bg-gray-100 transition-[border-color,box-shadow] [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:outline-none"
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
                  className={previewRating >= n ? undefined : 'text-lightsteelblue-200/40'}
                  style={
                    previewRating >= n
                      ? { color: RATING_STAR_COLORS[previewRating - 1] }
                      : undefined
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex items-start justify-between gap-5 self-stretch">
            <div className={`relative ${reviewLabelClass}`}>Your review</div>
            <div className={`relative ${reviewLabelClass} opacity-50`}>Optional</div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about what you liked or disliked"
            rows={4}
            className="text-num-16 font-nata-sans rounded-num-8 tracking-num--0_01 focus:border-fuchsia box-border min-h-[120px] w-full resize-y border border-solid border-[#16243B] bg-gray-100 px-3 py-2.5 leading-7 font-semibold text-white shadow-none transition-[border-color,box-shadow] outline-none placeholder:text-white placeholder:opacity-25 focus:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]"
          />
        </div>

        <button
          type="button"
          disabled={rating < 1}
          onClick={handleSubmit}
          className="bg-fuchsia text-num-16 box-border flex min-h-11 w-full touch-manipulation items-center justify-center self-stretch rounded-[7.79px] px-4 py-3 font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="relative leading-7 tracking-[-0.01em]">Submit review</span>
        </button>

        <p className="font-commissioner text-ghostwhite relative flex max-w-[285px] items-center justify-center text-center text-xs leading-4 font-semibold tracking-normal italic opacity-50">
          Your feedback helps us improve our products, services, and overall customer experience.
        </p>
      </div>
    </div>
  )
}

export default DashboardReviewsPopup
