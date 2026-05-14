'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useState } from 'react'

import { RATING_STAR_COLORS } from '@/lib/rating-star-colors'

const modalShadowClass =
  'shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,0,0,0.1),0px_6.213004112243652px_9.32px_-6.21px_rgba(0,0,0,0.1)]'

const reviewLabelClass =
  'font-commissioner text-num-14 leading-num-20 font-semibold tracking-normal text-muted-foreground dark:text-[#9497BC]'

const starButtonClass =
  'rounded-num-8 focus-visible:ring-fuchsia/40 font-inherit border-border-subtle bg-card-elevated box-border flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center border border-solid transition-[border-color,box-shadow] [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:outline-none dark:border-[#16243B] dark:bg-gray-100'

type ReviewRatingStarsProps = {
  previewRating: number
  rating: number
  onSelect: (n: number) => void
  onHover: (n: number | null) => void
}

const ReviewRatingStars: FunctionComponent<ReviewRatingStarsProps> = ({
  previewRating,
  rating,
  onSelect,
  onHover,
}) => (
  <div
    className="font-commissioner flex flex-wrap items-center gap-2"
    role="group"
    aria-label="Rating"
    onMouseLeave={() => onHover(null)}
  >
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onSelect(n)}
        onMouseEnter={() => onHover(n)}
        className={starButtonClass}
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
          style={previewRating >= n ? { color: RATING_STAR_COLORS[previewRating - 1] } : undefined}
        />
      </button>
    ))}
  </div>
)

type ReviewCloseButtonProps = {
  onClose?: () => void
}

const ReviewCloseButton: FunctionComponent<ReviewCloseButtonProps> = ({ onClose }) => (
  <button
    type="button"
    onClick={onClose}
    className="rounded-num-8 h-num-30 w-num-30 border-border-subtle box-border flex shrink-0 touch-manipulation items-center justify-center border border-solid p-0 [-webkit-tap-highlight-color:transparent] dark:border-[#18263E]"
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
      className="text-muted-foreground dark:text-white/50"
    />
  </button>
)

export type DashboardReviewsPopupProps = {
  brand?: string
  imageUrl?: string | null
  itemCount?: number
  price?: string
  date?: string
  time?: string
  /** When reopening to edit an existing review. */
  initialRating?: number
  initialComment?: string
  onClose?: () => void
  allowDelete?: boolean
  submitting?: boolean
  deleting?: boolean
  onDelete?: () => void | Promise<void>
  onSubmit?: (payload: { rating: number; comment: string }) => void | Promise<void>
}

export const DashboardReviewsPopup: FunctionComponent<DashboardReviewsPopupProps> = ({
  brand = 'Airbnb',
  imageUrl = null,
  itemCount = 1,
  price = '$2.50',
  date = 'March 30, 2026',
  time = '11:11 AM',
  initialRating,
  initialComment,
  onClose,
  allowDelete = false,
  submitting = false,
  deleting = false,
  onDelete,
  onSubmit,
}) => {
  const [rating, setRating] = useState(initialRating ?? 0)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [comment, setComment] = useState(initialComment ?? '')

  const previewRating = hoveredStar ?? rating
  const showReviewBox = rating >= 1
  const isEdit = initialRating !== undefined

  const handleSubmit = () => {
    if (rating < 1) return
    onSubmit?.({ rating, comment: comment.trim() })
  }

  const productThumb = (
    <div
      className="rounded-num-8 bg-card-elevated relative flex h-12 w-[98.7px] shrink-0 items-center justify-center overflow-hidden shadow-[0px_0px_3.31px_rgba(0,0,0,0.6)] dark:bg-[#0D1B35]"
      aria-hidden
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <img
          src="/icons/airbnb.svg"
          alt=""
          className="h-8 w-8 object-contain opacity-70"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  )

  return (
    <div
      className={`text-foreground dark:text-ghostwhite font-commissioner border-border-subtle bg-card py-num-18 relative box-border flex w-full max-w-[419px] flex-col items-start overflow-hidden rounded-xl border border-solid px-4 text-left text-base sm:px-5 dark:border-gray-500 dark:bg-gray-200 ${modalShadowClass} lg:max-w-[480px] lg:text-lg`}
    >
      <div className="flex w-full min-w-0 flex-col items-center gap-6">
        {/* sm+: title + close + divider */}
        <div className="text-foreground dark:text-whitesmoke-100 hidden w-full flex-col items-start gap-3 self-stretch text-base sm:flex sm:text-lg lg:text-xl">
          <div className="flex items-center justify-between gap-5 self-stretch">
            <div className="flex min-w-0 flex-1 items-center">
              <h2 className="tracking-num-0.02 relative leading-7 font-extrabold uppercase">
                {isEdit ? 'Edit review' : 'Add review'}
              </h2>
            </div>
            <ReviewCloseButton onClose={onClose} />
          </div>
          <div className="bg-border-subtle h-px w-full self-stretch dark:bg-gray-100" aria-hidden />
        </div>

        {/* max-sm: image (left) + add-review block (right); sm+: image + product side by side */}
        <div className="flex w-full min-w-0 flex-col gap-3 self-stretch sm:flex-row sm:items-center sm:gap-3">
          <div className="flex w-full min-w-0 flex-row items-start gap-3 sm:w-auto sm:shrink-0">
            {productThumb}
            {/* Mobile: Add review heading, close, prompt, stars — to the right of the image */}
            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:hidden">
              <div className="flex items-start justify-between gap-2">
                <h2 className="tracking-num-0.02 min-w-0 pr-1 text-base leading-snug font-extrabold uppercase">
                  {isEdit ? 'Edit review' : 'Add review'}
                </h2>
                <ReviewCloseButton onClose={onClose} />
              </div>
              <p className={`text-xs leading-snug ${reviewLabelClass}`}>
                Rate your purchase and overall experience with Jinx Store
              </p>
              <div className="flex flex-col gap-1.5">
                <div className={`${reviewLabelClass} text-xs`}>Your rating</div>
                <ReviewRatingStars
                  previewRating={previewRating}
                  rating={rating}
                  onSelect={setRating}
                  onHover={setHoveredStar}
                />
              </div>
            </div>
          </div>

          {/* Product / variant / pricing: full width below on max-sm; beside image on sm+ */}
          <div className="text-foreground flex w-full min-w-0 flex-col items-stretch gap-2 text-[18px] sm:flex-1 dark:text-white">
            <b className="font-commissioner leading-num-28 tracking-num-0.02 text-foreground text-[18px] font-bold dark:text-white">
              {brand}
            </b>
            <div className="font-commissioner text-num-16 leading-num-20 flex flex-col gap-1.5 font-medium sm:hidden">
              <span className="text-muted-foreground dark:text-lightsteelblue-200 [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
              </span>
              <span className="text-foreground text-lg font-bold tracking-tight dark:text-white">
                {price}
              </span>
              <span className="text-muted-foreground dark:text-lightsteelblue-200 [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                {date}
              </span>
              <span className="text-muted-foreground dark:text-lightsteelblue-200 [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                {time}
              </span>
            </div>
            <div className="font-commissioner text-num-16 leading-num-20 text-muted-foreground dark:text-lightsteelblue-200 hidden font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] sm:block dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              <span>
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'} -{' '}
              </span>
              <span className="text-foreground dark:text-white">{price}</span>
              <span>
                {' '}
                - {date} - {time}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-border-subtle h-px w-full self-stretch dark:bg-gray-100" aria-hidden />

        {/* sm+: prompt + rating (mobile shows these beside the image) */}
        <div className="hidden w-full flex-col gap-3 self-stretch sm:flex sm:gap-5">
          <p className={`relative self-stretch ${reviewLabelClass}`}>
            Rate your purchase and overall experience with Jinx Store
          </p>
          <div className="flex flex-col gap-3 self-stretch sm:flex-row sm:items-center sm:justify-between">
            <div className={`relative ${reviewLabelClass}`}>Your rating</div>
            <ReviewRatingStars
              previewRating={previewRating}
              rating={rating}
              onSelect={setRating}
              onHover={setHoveredStar}
            />
          </div>
        </div>

        {showReviewBox ? (
          <div className="animate-fade-in flex w-full flex-col self-stretch motion-reduce:animate-none">
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
                className="text-num-16 font-commissioner rounded-num-8 tracking-num--0_01 focus:border-fuchsia border-border-subtle bg-card-elevated text-foreground placeholder:text-muted-foreground box-border min-h-[120px] w-full resize-y border border-solid px-3 py-2.5 leading-7 font-semibold shadow-none transition-[border-color,box-shadow] outline-none focus:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)] dark:border-[#16243B] dark:bg-gray-100 dark:text-white dark:placeholder:text-white dark:placeholder:opacity-25"
              />
            </div>

            <button
              type="button"
              disabled={rating < 1 || submitting}
              onClick={handleSubmit}
              className="bg-fuchsia text-num-16 mt-4 box-border flex min-h-11 w-full touch-manipulation items-center justify-center self-stretch rounded-[7.79px] px-4 py-3 font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="relative leading-7 tracking-[-0.01em]">
                {submitting ? 'Submitting...' : isEdit ? 'Update review' : 'Submit review'}
              </span>
            </button>
            {allowDelete ? (
              <button
                type="button"
                disabled={deleting}
                onClick={() => void onDelete?.()}
                className="text-num-14 border-border-subtle text-foreground/85 hover:bg-foreground/5 mt-2 box-border flex min-h-10 w-full items-center justify-center rounded-[7.79px] border px-4 py-2.5 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:text-white/85 dark:hover:bg-white/5"
              >
                {deleting ? 'Deleting...' : 'Delete review'}
              </button>
            ) : null}

            <p className="font-commissioner text-muted-foreground dark:text-ghostwhite relative mx-auto mt-2 flex max-w-[285px] items-center justify-center text-center text-xs leading-4 font-semibold tracking-normal italic opacity-70 dark:opacity-50">
              Your feedback helps us improve our products, services, and overall customer
              experience.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DashboardReviewsPopup
