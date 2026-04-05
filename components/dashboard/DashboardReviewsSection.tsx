'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { ratingStarColor } from '@/lib/rating-star-colors'
import {
  type OrderReview,
  type ReviewPurchaseRow,
  useOrderReviewStore,
} from '@/lib/order-review-store'

import { DashboardReviewsPopup } from '@/components/dashboard/DashboardReviewsPopup'

const PAGE_SIZE = 8

const addReviewBtnClass =
  'rounded-xl box-border inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 border border-solid border-transparent bg-[#ffffff0d] px-4 py-1.5 font-inherit transition-colors hover:bg-[#ffffff18] focus:outline-none focus:ring-0'

const ratedBadgeClass =
  'font-commissioner relative box-border inline-flex w-fit max-w-full items-center gap-3 rounded-xl border border-solid border-[rgba(238,238,238,0.1)] bg-gray-200 py-1.5 px-3 text-left text-num-15_35 leading-num-21_93 text-ghostwhite'

/** Figma: summary + fuchsia track/fill (#eb2dff / 25% track) + pill button on gray-100 (#0d1b35) + darkslateblue border (#152950). */
const ReviewsLoadMoreFooter: FunctionComponent<{
  shown: number
  total: number
  onLoadMore: () => void
  canLoadMore: boolean
}> = ({ shown, total, onLoadMore, canLoadMore }) => {
  const ratio = total > 0 ? shown / total : 0

  return (
    <div className="font-commissioner relative flex w-full flex-col items-center justify-center gap-5 pt-2 text-center text-base text-white sm:gap-5">
      <div className="flex w-full max-w-[261px] flex-col items-center justify-center gap-2.5">
        <div className="flex items-center justify-center">
          <p className="relative leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Showing {shown} out of {total}
          </p>
        </div>
        <div className="relative h-[3.5px] w-[196px] max-w-full">
          <div
            className="bg-fuchsia/25 absolute top-0 left-0 h-[3px] w-full rounded-lg shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
            aria-hidden
          />
          <div
            className="bg-fuchsia absolute top-[0.5px] left-0 h-[3px] max-w-full rounded-lg shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
            style={{ width: `${ratio * 100}%` }}
            aria-hidden
          />
        </div>
      </div>
      <button
        type="button"
        disabled={!canLoadMore}
        onClick={onLoadMore}
        className="border-darkslateblue rounded-num-30 flex items-center justify-center border-[1.5px] border-solid bg-gray-100 px-6 py-2.5 shadow-[0px_15px_15px_rgba(0,0,0,0.01)] transition-opacity disabled:cursor-not-allowed disabled:opacity-25"
      >
        <span className="relative leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
          Load More
        </span>
      </button>
    </div>
  )
}

const ReviewRow: FunctionComponent<{
  row: ReviewPurchaseRow
  review?: OrderReview
  onAddReview: () => void
}> = ({ row, review, onAddReview }) => {
  return (
    <div className="border-darkslateblue flex flex-row items-center justify-between gap-3 border-b border-solid p-4 transition-colors last:border-b-0 hover:bg-[#13253F] sm:gap-4 sm:p-5">
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <div
          className="rounded-num-8 flex h-14 w-[105px] shrink-0 items-center justify-center overflow-hidden bg-[#0D1B35] shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]"
          aria-hidden
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <b className="tracking-num-0_02 text-base leading-6 lg:text-[18px]">{row.brand}</b>
          <div className="text-lightsteelblue-200 flex flex-wrap items-center gap-x-1 gap-y-1 text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)] sm:gap-2">
            <span>
              {row.itemCount} {row.itemCount === 1 ? 'Item' : 'Items'}
            </span>
            <span className="hidden h-3 w-px shrink-0 bg-[#152950] sm:inline-block" aria-hidden />
            <span className="tracking-num--0_01 font-semibold text-white">{row.price}</span>
            <span className="hidden h-3 w-px shrink-0 bg-[#152950] sm:inline-block" aria-hidden />
            <span>{row.date}</span>
            <span className="hidden h-3 w-px shrink-0 bg-[#152950] sm:inline-block" aria-hidden />
            <span>{row.time}</span>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        {review ? (
          <div className={ratedBadgeClass}>
            <div className="relative font-semibold">Rated </div>
            <div className="flex items-center gap-0.5">
              <div className="relative font-semibold">{review.rating}</div>
              <CentralIcon
                name="IconStar"
                join="round"
                fill="filled"
                stroke="1"
                radius="3"
                size={16}
                ariaHidden={true}
                className="relative h-4 w-4 shrink-0"
                style={{ color: ratingStarColor(review.rating) }}
              />
            </div>
          </div>
        ) : null}
        {!review ? (
          <button type="button" onClick={onAddReview} className={addReviewBtnClass}>
            <CentralIcon
              name="IconPlusLarge"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={16}
              ariaHidden={true}
            />
            <span className="tracking-num--0_01 sm:text-num-14 text-sm font-semibold text-[#faf7ff]">
              Add Review
            </span>
          </button>
        ) : null}
      </div>
    </div>
  )
}

/** Reviews — purchases eligible for review; layout aligned with Orders / dashboard shell (no absolute canvas). */
export const DashboardReviewsSection: FunctionComponent = () => {
  const pendingReviewRows = useOrderReviewStore((s) => s.pendingReviewRows)
  const reviewsByPurchaseRowId = useOrderReviewStore((s) => s.reviewsByPurchaseRowId)
  const submitReviewForPurchaseRow = useOrderReviewStore((s) => s.submitReviewForPurchaseRow)
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [reviewDialogRow, setReviewDialogRow] = useState<ReviewPurchaseRow | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return pendingReviewRows
    return pendingReviewRows.filter(
      (r) =>
        r.brand.toLowerCase().includes(q) || r.id.includes(q) || r.price.toLowerCase().includes(q)
    )
  }, [search, pendingReviewRows])

  useEffect(() => {
    setVisibleCount(Math.min(PAGE_SIZE, filtered.length))
  }, [search, filtered.length])

  useEffect(() => {
    if (!reviewDialogRow) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setReviewDialogRow(null)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [reviewDialogRow])

  const shown = Math.min(visibleCount, filtered.length)
  const canLoadMore = shown < filtered.length
  const visibleRows = filtered.slice(0, shown)

  const filterBar = (
    <div className="text-lightsteelblue-100 lg:text-num-16 flex w-full min-w-0 flex-col gap-2 sm:gap-3 lg:flex-row lg:items-center lg:gap-3">
      <div className="rounded-num-8 px-num-12 flex min-h-11 w-full min-w-0 items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-0 lg:min-w-[min(100%,240px)] lg:flex-1">
        <CentralIcon
          name="IconMagnifyingGlass"
          join="round"
          fill="filled"
          stroke="2"
          radius="1"
          size={18}
          ariaHidden={true}
          className="text-lightsteelblue-200"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search using Order ID, Product Name"
          className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 min-w-0 flex-1 border-none bg-transparent px-0 py-1 text-sm font-semibold text-white placeholder-white/50 outline-none focus:ring-0"
        />
      </div>

      <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-3 lg:w-auto lg:shrink-0 lg:justify-end">
        <div className="rounded-num-8 px-num-12 flex min-h-11 w-fit max-w-full shrink-0 items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-2">
          <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
            Status
          </span>
          <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
            All
          </span>
          <CentralIcon
            name="IconChevronDownMedium"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            ariaHidden={true}
            className="shrink-0"
          />
        </div>
        <div className="rounded-num-8 px-num-12 flex min-h-11 w-fit max-w-full shrink-0 flex-wrap items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-2">
          <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
            Payment Method
          </span>
          <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
            All
          </span>
          <CentralIcon
            name="IconChevronDownMedium"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            ariaHidden={true}
            className="shrink-0"
          />
        </div>
        <div className="rounded-num-8 px-num-12 flex min-h-11 w-fit max-w-full shrink-0 items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-2">
          <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
            Sort by
          </span>
          <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
            Newest
          </span>
          <CentralIcon
            name="IconChevronDownMedium"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            ariaHidden={true}
            className="shrink-0"
          />
        </div>
        <div className="rounded-num-8 px-num-12 flex min-h-11 w-fit max-w-full shrink-0 items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-2">
          <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
            View
          </span>
          <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
            List
          </span>
          <CentralIcon
            name="IconChevronDownMedium"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            ariaHidden={true}
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  )

  if (filtered.length === 0) {
    return (
      <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
        {filterBar}
        <div className="text-ghostwhite font-commissioner flex w-full flex-col items-center gap-2 py-12 text-center">
          <img className="size-28 opacity-90 sm:size-36" alt="" src="/icons/not-found.svg" />
          <b className="tracking-num--0_01 text-base leading-[26px] sm:text-lg">
            No purchases match
          </b>
          <p className="text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
            Try another search to find orders you can review.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
      {filterBar}

      <div className="rounded-num-8 border-darkslateblue overflow-hidden border border-solid bg-gray-100">
        <div className="flex flex-col">
          {visibleRows.map((row) => (
            <ReviewRow
              key={row.id}
              row={row}
              review={reviewsByPurchaseRowId[row.id]}
              onAddReview={() => setReviewDialogRow(row)}
            />
          ))}
        </div>
      </div>

      <nav aria-label="Review list load more">
        <ReviewsLoadMoreFooter
          shown={shown}
          total={filtered.length}
          canLoadMore={canLoadMore}
          onLoadMore={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length))}
        />
      </nav>

      {reviewDialogRow && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="fixed inset-0 z-[110] flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-6 lg:px-8"
              role="presentation"
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/60"
                aria-label="Close dialog"
                onClick={() => setReviewDialogRow(null)}
              />
              <div className="relative z-10 flex w-full max-w-[min(100vw-2rem,480px)] justify-center">
                <DashboardReviewsPopup
                  key={reviewDialogRow.id}
                  brand={reviewDialogRow.brand}
                  itemCount={reviewDialogRow.itemCount}
                  price={reviewDialogRow.price}
                  date={reviewDialogRow.date}
                  time={reviewDialogRow.time}
                  initialRating={reviewsByPurchaseRowId[reviewDialogRow.id]?.rating}
                  initialComment={reviewsByPurchaseRowId[reviewDialogRow.id]?.comment}
                  onClose={() => setReviewDialogRow(null)}
                  onSubmit={({ rating, comment }) => {
                    submitReviewForPurchaseRow(reviewDialogRow.id, { rating, comment })
                    setReviewDialogRow(null)
                  }}
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
