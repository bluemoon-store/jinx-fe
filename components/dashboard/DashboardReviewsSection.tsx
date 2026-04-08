'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import type { DashboardOrderStatus } from '@/components/dashboard/DashboardOrderCard'
import { ratingStarColor } from '@/lib/rating-star-colors'
import {
  type OrderReview,
  type ReviewPurchaseRow,
  type OrderPaymentMethod,
  useOrderReviewStore,
} from '@/lib/order-review-store'

import { DashboardLoadMoreFooter } from '@/components/dashboard/DashboardLoadMoreFooter'
import { DashboardReviewsPopup } from '@/components/dashboard/DashboardReviewsPopup'

const PAGE_SIZE = 8

type StatusFilter = 'all' | DashboardOrderStatus

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired' },
]

type PaymentMethodFilter = 'all' | OrderPaymentMethod

const PAYMENT_METHOD_OPTIONS: { value: PaymentMethodFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'usdt_tron', label: 'USDT (Tron)' },
  { value: 'usdt_ethereum', label: 'USDT (Ethereum)' },
  { value: 'litecoin', label: 'Litecoin' },
  { value: 'bitcoin_cash', label: 'Bitcoin Cash' },
]

type SortOption = 'newest' | 'oldest' | 'price_desc' | 'price_asc'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price_desc', label: 'Price (High to Low)' },
  { value: 'price_asc', label: 'Price (Low to High)' },
]

const addReviewBtnClass =
  'rounded-xl box-border inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 border border-solid border-transparent bg-[#ffffff0d] px-4 py-1.5 font-inherit transition-colors hover:bg-[#ffffff18] focus:outline-none focus:ring-0'

const ratedBadgeClass =
  'font-commissioner relative box-border inline-flex w-fit max-w-full items-center gap-3 rounded-xl border border-solid border-[rgba(238,238,238,0.1)] bg-gray-200 py-1.5 px-3 text-left text-num-15_35 leading-num-21_93 text-ghostwhite'

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
  const orders = useOrderReviewStore((s) => s.orders)
  const pendingReviewRows = useOrderReviewStore((s) => s.pendingReviewRows)
  const reviewsByPurchaseRowId = useOrderReviewStore((s) => s.reviewsByPurchaseRowId)
  const submitReviewForPurchaseRow = useOrderReviewStore((s) => s.submitReviewForPurchaseRow)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<PaymentMethodFilter>('all')
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const statusMenuRef = useRef<HTMLDivElement>(null)
  const [paymentMethodMenuOpen, setPaymentMethodMenuOpen] = useState(false)
  const paymentMethodMenuRef = useRef<HTMLDivElement>(null)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const sortMenuRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [reviewDialogRow, setReviewDialogRow] = useState<ReviewPurchaseRow | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const rowsWithOrder = pendingReviewRows.map((r) => ({
      row: r,
      order: orders.find((o) => o.id === r.id),
    }))

    const byStatus =
      statusFilter === 'all'
        ? rowsWithOrder
        : rowsWithOrder.filter((r) => r.order?.status === statusFilter)

    const byPayment =
      paymentMethodFilter === 'all'
        ? byStatus
        : byStatus.filter((r) => r.order?.paymentMethod === paymentMethodFilter)

    if (!q) return byPayment

    return byPayment.filter(
      ({ row }) =>
        row.brand.toLowerCase().includes(q) ||
        row.id.includes(q) ||
        row.price.toLowerCase().includes(q)
    )
  }, [orders, paymentMethodFilter, pendingReviewRows, search, statusFilter])

  const sorted = useMemo(() => {
    const parsePrice = (price: string) => {
      const n = Number(price.replace(/[^0-9.]/g, ''))
      return Number.isFinite(n) ? n : 0
    }

    const parseId = (id: string) => {
      const n = Number(id)
      return Number.isFinite(n) ? n : null
    }

    const next = [...filtered]
    next.sort((a, b) => {
      const aRow = a.row
      const bRow = b.row

      if (sortOption === 'price_desc') return parsePrice(bRow.price) - parsePrice(aRow.price)
      if (sortOption === 'price_asc') return parsePrice(aRow.price) - parsePrice(bRow.price)

      const aId = parseId(aRow.id)
      const bId = parseId(bRow.id)
      if (aId !== null && bId !== null) {
        return sortOption === 'newest' ? bId - aId : aId - bId
      }
      // Fallback when IDs aren't numeric
      return sortOption === 'newest'
        ? bRow.id.localeCompare(aRow.id)
        : aRow.id.localeCompare(bRow.id)
    })
    return next
  }, [filtered, sortOption])

  useEffect(() => {
    setVisibleCount(Math.min(PAGE_SIZE, filtered.length))
  }, [filtered.length, paymentMethodFilter, search, sortOption, statusFilter])

  useEffect(() => {
    if (!statusMenuOpen && !paymentMethodMenuOpen && !sortMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        statusMenuRef.current?.contains(target) ||
        paymentMethodMenuRef.current?.contains(target) ||
        sortMenuRef.current?.contains(target)
      )
        return
      setStatusMenuOpen(false)
      setPaymentMethodMenuOpen(false)
      setSortMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setStatusMenuOpen(false)
      setPaymentMethodMenuOpen(false)
      setSortMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [paymentMethodMenuOpen, sortMenuOpen, statusMenuOpen])

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

  const shown = Math.min(visibleCount, sorted.length)
  const canLoadMore = shown < sorted.length
  const visibleRows = sorted.slice(0, shown)

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
          className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 min-w-0 flex-1 border-none bg-transparent px-0 py-1 text-sm font-normal text-white/75 placeholder-white/37.5 outline-none focus:ring-0"
        />
      </div>

      <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-3 lg:w-auto lg:shrink-0 lg:justify-end">
        <div className="relative w-fit max-w-full shrink-0" ref={statusMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={statusMenuOpen}
            aria-label="Filter by status"
            onClick={() => setStatusMenuOpen((o) => !o)}
            className="rounded-num-8 px-num-12 flex min-h-11 w-full min-w-0 items-center gap-2 border border-solid border-[#16243B] bg-gray-100 py-2"
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Status
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label ?? 'All'}
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
          </button>
          {statusMenuOpen ? (
            <ul
              role="listbox"
              aria-label="Status"
              className="border-darkslateblue rounded-num-8 absolute top-full left-0 z-20 mt-1 min-w-42 overflow-hidden border border-solid bg-gray-100 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              {STATUS_OPTIONS.map((opt) => (
                <li key={opt.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={statusFilter === opt.value}
                    className={`tracking-num--0_01 text-ghostwhite sm:text-num-14 lg:text-num-16 w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-white/10 ${
                      statusFilter === opt.value ? 'bg-[#16243B]' : ''
                    }`}
                    onClick={() => {
                      setStatusFilter(opt.value)
                      setStatusMenuOpen(false)
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="relative w-fit max-w-full shrink-0" ref={paymentMethodMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={paymentMethodMenuOpen}
            aria-label="Filter by payment method"
            onClick={() => setPaymentMethodMenuOpen((o) => !o)}
            className="rounded-num-8 px-num-12 flex min-h-11 w-full min-w-0 items-center gap-2 border border-solid border-[#16243B] bg-gray-100 py-2"
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Payment Method
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {PAYMENT_METHOD_OPTIONS.find((o) => o.value === paymentMethodFilter)?.label ?? 'All'}
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
          </button>
          {paymentMethodMenuOpen ? (
            <ul
              role="listbox"
              aria-label="Payment Method"
              className="border-darkslateblue rounded-num-8 absolute top-full left-0 z-20 mt-1 min-w-42 overflow-hidden border border-solid bg-gray-100 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              {PAYMENT_METHOD_OPTIONS.map((opt) => (
                <li key={opt.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={paymentMethodFilter === opt.value}
                    className={`tracking-num--0_01 text-ghostwhite sm:text-num-14 lg:text-num-16 w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-white/10 ${
                      paymentMethodFilter === opt.value ? 'bg-[#16243B]' : ''
                    }`}
                    onClick={() => {
                      setPaymentMethodFilter(opt.value)
                      setPaymentMethodMenuOpen(false)
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="relative w-fit max-w-full shrink-0" ref={sortMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortMenuOpen}
            aria-label="Sort reviews"
            onClick={() => setSortMenuOpen((o) => !o)}
            className="rounded-num-8 px-num-12 flex min-h-11 w-full min-w-0 items-center gap-2 border border-solid border-[#16243B] bg-gray-100 py-2"
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Sort by
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? 'Newest'}
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
          </button>
          {sortMenuOpen ? (
            <ul
              role="listbox"
              aria-label="Sort by"
              className="border-darkslateblue rounded-num-8 absolute top-full left-0 z-20 mt-1 min-w-42 overflow-hidden border border-solid bg-gray-100 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              {SORT_OPTIONS.map((opt) => (
                <li key={opt.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={sortOption === opt.value}
                    className={`tracking-num--0_01 text-ghostwhite sm:text-num-14 lg:text-num-16 w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-white/10 ${
                      sortOption === opt.value ? 'bg-[#16243B]' : ''
                    }`}
                    onClick={() => {
                      setSortOption(opt.value)
                      setSortMenuOpen(false)
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
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
          {visibleRows.map(({ row }) => (
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
        <DashboardLoadMoreFooter
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
