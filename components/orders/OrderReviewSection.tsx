'use client'

import CentralIcon from '@central-icons-react/all'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { ApiOrder } from '@/actions/order'
import { ORDERS_QUERY_KEYS } from '@/hooks/use-orders'
import { reviewsApi } from '@/lib/api'
import { RATING_STAR_COLORS } from '@/lib/rating-star-colors'
import { toast } from '@/lib/toast'

export const ORDER_REVIEW_CARD_SHADOW_CLASS =
  'shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,0,0,0.1),0px_6.213004112243652px_9.32px_-6.21px_rgba(0,0,0,0.1)]'

export type OrderReviewSectionProps = {
  orderId: string
  /** From order detail query; survives refresh when persisted on the server. */
  review: ApiOrder['review']
}

/**
 * Order-level review form (rating + optional comment), matching Dashboard → Order Detail.
 */
export function OrderReviewSection({ orderId, review: reviewFromOrder }: OrderReviewSectionProps) {
  const queryClient = useQueryClient()

  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [reviewSent, setReviewSent] = useState(false)
  const [existingReviewId, setExistingReviewId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!orderId) return

    setExistingReviewId(null)
    setRating(0)
    setComment('')
    setReviewSent(false)

    const review = reviewFromOrder
    if (!review || review.orderId !== orderId) return

    setExistingReviewId(review.id)
    setRating(review.rating)
    setComment(review.comment ?? '')
    setReviewSent(true)
  }, [
    orderId,
    reviewFromOrder?.id,
    reviewFromOrder?.orderId,
    reviewFromOrder?.rating,
    reviewFromOrder?.comment,
  ])

  const previewRating = hoveredStar ?? rating
  const showReviewBox = rating >= 1

  return (
    <>
      <hr className="bg-divider h-px w-full border-0" aria-hidden />

      <section aria-labelledby="add-review-heading" className="flex flex-col gap-4">
        <div className="text-foreground/75 flex items-center gap-2 dark:text-white">
          <CentralIcon
            name="IconStar"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={18}
            ariaHidden={true}
          />
          <h2 id="add-review-heading" className="leading-num-28 tracking-num-0_02 font-bold">
            {existingReviewId ? 'Edit Review' : 'Add Review'}
          </h2>
        </div>

        <div
          className={`text-num-14 text-muted-foreground dark:text-lightsteelblue-200 border-border-subtle bg-card-elevated gap-num-18 flex flex-col overflow-hidden rounded-xl border border-solid p-5 dark:border-gray-600 dark:bg-gray-200 ${ORDER_REVIEW_CARD_SHADOW_CLASS}`}
        >
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="leading-num-20 font-semibold">Your Rating</span>
            <div
              className="flex items-center gap-2"
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
                  className="rounded-num-8 focus-visible:ring-fuchsia/40 border-border-subtle bg-card box-border flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center border border-solid transition-[border-color,box-shadow] [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:outline-none dark:border-[#16243B] dark:bg-gray-100"
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

          {showReviewBox ? (
            <div className="animate-fade-in flex w-full flex-col gap-4 self-stretch motion-reduce:animate-none">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <span className="leading-num-20 font-semibold">Your Review</span>
                  <span className="leading-num-20 font-semibold opacity-50">Optional</span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about what you liked or disliked"
                  rows={4}
                  className="text-num-16 font-commissioner rounded-num-8 tracking-num--0_01 focus:border-fuchsia border-border-subtle bg-card text-foreground placeholder:text-muted-foreground box-border min-h-[120px] w-full resize-y border border-solid px-3 py-2.5 leading-7 font-semibold shadow-none transition-[border-color,box-shadow] outline-none focus:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)] dark:border-[#16243B] dark:bg-gray-100 dark:text-white dark:placeholder:text-white dark:placeholder:opacity-25"
                />
              </div>

              <button
                type="button"
                disabled={rating < 1 || submitting || (reviewSent && !existingReviewId)}
                onClick={async () => {
                  if (!orderId || rating < 1 || submitting) return
                  setSubmitting(true)
                  try {
                    if (existingReviewId) {
                      await reviewsApi.update(existingReviewId, { rating, comment })
                      toast.success('Review updated')
                    } else {
                      const created = await reviewsApi.create({
                        orderId,
                        rating,
                        comment,
                      })
                      setExistingReviewId(created.id)
                      toast.success('Review submitted')
                    }
                    await queryClient.invalidateQueries({
                      queryKey: ORDERS_QUERY_KEYS.detail(orderId),
                    })
                    await queryClient.invalidateQueries({
                      queryKey: ORDERS_QUERY_KEYS.lists(),
                    })
                    setReviewSent(true)
                  } catch {
                    toast.error('Failed to submit review. Please try again.')
                  } finally {
                    setSubmitting(false)
                  }
                }}
                className="bg-fuchsia text-num-16 tracking-num--0_01 flex min-h-11 w-full items-center justify-center self-stretch rounded-[7.79px] px-4 py-3 font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting
                  ? 'Submitting...'
                  : existingReviewId
                    ? 'Update Review'
                    : 'Submit Review'}
              </button>

              <p className="font-commissioner text-muted-foreground dark:text-ghostwhite text-center text-xs leading-4 font-semibold italic opacity-70 dark:opacity-50">
                Your feedback helps us improve our products, services, and overall customer
                experience.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
