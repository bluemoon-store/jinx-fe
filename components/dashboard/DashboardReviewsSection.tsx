'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  dashboardOrderStatusConfig,
  type DashboardOrderStatus,
} from '@/components/dashboard/DashboardOrderCard'
import { ratingStarColor } from '@/lib/rating-star-colors'
import {
  type OrderReview,
  type ReviewPurchaseRow,
  type OrderPaymentMethod,
  useOrderReviewStore,
} from '@/stores/order-review-store'
import { toast } from '@/lib/toast'

import { DashboardLoadMoreFooter } from '@/components/dashboard/DashboardLoadMoreFooter'
import { DashboardReviewsPopup } from '@/components/dashboard/DashboardReviewsPopup'
import {
  siteSelectDropdownList,
  siteSelectDropdownOptionInteractive,
  siteSelectDropdownOptionRow,
  siteSelectDropdownPanel,
} from '@/components/ui/siteSelectDropdown'
import { cn } from '@/lib/utils'

type StatusFilter = 'all' | DashboardOrderStatus

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired' },
]

type PaymentMethodFilter = 'all' | OrderPaymentMethod

const PAYMENT_METHOD_OPTIONS: { value: PaymentMethodFilter; label: string; iconSrc?: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bitcoin', label: 'Bitcoin', iconSrc: '/icons/Crypto Logos/Bitcoin.svg' },
  {
    value: 'ethereum',
    label: 'Ethereum',
    iconSrc: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---ethereum-eth.svg',
  },
  { value: 'usdt_tron', label: 'USDT (Tron)', iconSrc: '/icons/Crypto Logos/Tether.svg' },
  { value: 'usdt_ethereum', label: 'USDT (Ethereum)', iconSrc: '/icons/Crypto Logos/Tether.svg' },
  { value: 'litecoin', label: 'Litecoin', iconSrc: '/icons/Crypto Logos/Litecoin LTC.svg' },
  { value: 'bitcoin_cash', label: 'Bitcoin Cash', iconSrc: '/icons/Crypto Logos/Bitcoin-1.svg' },
]

type SortOption = 'newest' | 'oldest' | 'price_desc' | 'price_asc'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price_desc', label: 'Price (High to Low)' },
  { value: 'price_asc', label: 'Price (Low to High)' },
]

const addReviewBtnClass =
  'rounded-xl box-border inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 border border-solid border-border-subtle bg-card-elevated text-foreground dark:border-transparent dark:bg-[#ffffff0d] dark:text-white px-4 py-1.5 font-inherit transition-colors hover:bg-hover-bg dark:hover:bg-[#ffffff18] focus:outline-none focus:ring-0'

const ratedBadgeClass =
  'font-commissioner relative box-border inline-flex w-fit max-w-full items-center gap-3 rounded-xl border border-solid border-border-subtle bg-card-elevated text-foreground dark:border-[rgba(238,238,238,0.1)] dark:bg-gray-200 dark:text-ghostwhite py-1.5 px-3 text-left text-num-15_35 leading-num-21_93'

const dashboardSelectTriggerClass = cn(
  'rounded-num-8 px-num-12 bg-card-elevated text-foreground dark:text-lightsteelblue-100 border-border-subtle dark:border-[#16243B] flex min-h-11 w-full min-w-0 items-center gap-2 border border-solid py-2 max-sm:justify-between max-sm:gap-0',
)

const filterMenuPanelClass = (align: 'start' | 'end') =>
  cn(
    siteSelectDropdownPanel,
    'absolute top-full z-20 mt-2 overflow-hidden min-w-42 max-sm:min-w-0 max-sm:w-full max-sm:left-0 max-sm:right-0',
    align === 'start' && 'left-0',
    align === 'end' && 'right-0 sm:left-auto',
  )

const ReviewRow: FunctionComponent<{
  row: ReviewPurchaseRow
  review?: OrderReview
  status?: DashboardOrderStatus
  canAddReview: boolean
  onAddReview: () => void
}> = ({ row, review, status, canAddReview, onAddReview }) => {
  const statusCfg = status ? dashboardOrderStatusConfig[status] : null

  return (
    <div className="border-border-subtle dark:border-darkslateblue hover:bg-hover-bg flex flex-row flex-wrap items-center gap-3 border-b border-solid p-4 transition-colors last:border-b-0 sm:flex-nowrap sm:items-center sm:justify-between sm:gap-4 sm:p-5 dark:hover:bg-[#13253F]">
      <div
        className="order-1 rounded-num-8 bg-card flex h-14 w-[105px] shrink-0 items-center justify-center overflow-hidden shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)] dark:bg-[#0D1B35]"
        aria-hidden
      >
        {row.imageUrl ? (
          <img
            src={row.imageUrl}
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

      <div className="order-2 flex max-sm:ml-auto shrink-0 flex-col items-end gap-2 sm:order-3">
        {review ? (
          <div className={ratedBadgeClass} aria-disabled="true">
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
          <button
            type="button"
            onClick={onAddReview}
            disabled={!canAddReview}
            title={!canAddReview ? 'Review is available only for paid orders' : undefined}
            className={`${addReviewBtnClass} disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <CentralIcon
              name="IconPlusLarge"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={16}
              ariaHidden={true}
            />
            <span className="tracking-num--0_01 sm:text-num-14 text-foreground text-sm font-semibold dark:text-[#faf7ff]">
              Add Review
            </span>
          </button>
        ) : null}
      </div>

      <div className="order-3 flex w-full min-w-0 basis-full flex-col gap-1 sm:order-2 sm:basis-auto sm:w-auto sm:flex-1">
        <b className="tracking-num-0_02 text-base leading-6 lg:text-[18px]">{row.brand}</b>
        <div
          className={cn(
            'text-muted-foreground dark:text-lightsteelblue-200 text-sm font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]',
            'flex flex-row flex-wrap items-center gap-x-1.5 gap-y-1 sm:gap-2',
            'max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:pb-0.5 [-webkit-overflow-scrolling:touch]'
          )}
        >
          <span>
            {row.itemCount} {row.itemCount === 1 ? 'Item' : 'Items'}
          </span>
          <span className="bg-divider inline-block h-3 w-px shrink-0" aria-hidden />
          <span className="tracking-num--0_01 text-foreground font-semibold dark:text-white">
            {row.price}
          </span>
          <span className="bg-divider inline-block h-3 w-px shrink-0" aria-hidden />
          <span>{row.date}</span>
          <span
            className="bg-divider inline-block h-3 w-px shrink-0 max-sm:hidden"
            aria-hidden
          />
          <span className="hidden sm:inline">{row.time}</span>
          {statusCfg ? (
            <>
              <span className="bg-divider inline-block h-3 w-px shrink-0" aria-hidden />
              <span
                className={cn(
                  'rounded-num-6 border-border-subtle bg-card inline-flex w-fit items-center gap-1 border px-1.5 py-0.5 text-xs font-semibold dark:border-[#16243B] dark:bg-[#0D1B35]',
                  statusCfg.color
                )}
                aria-label={`Payment status: ${statusCfg.label}`}
              >
                <CentralIcon
                  name={statusCfg.icon as any}
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={12}
                  ariaHidden={true}
                />
                <span>{statusCfg.label}</span>
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/** Reviews — purchases eligible for review; layout aligned with Orders / dashboard shell (no absolute canvas). */
export const DashboardReviewsSection: FunctionComponent = () => {
  const orders = useOrderReviewStore((s) => s.orders)
  const loading = useOrderReviewStore((s) => s.loading)
  const error = useOrderReviewStore((s) => s.error)
  const loadingMore = useOrderReviewStore((s) => s.loadingMore)
  const totalItems = useOrderReviewStore((s) => s.totalItems)
  const loadReviewsPageData = useOrderReviewStore((s) => s.loadReviewsPageData)
  const loadMoreReviews = useOrderReviewStore((s) => s.loadMoreReviews)
  const pendingReviewRows = useOrderReviewStore((s) => s.pendingReviewRows)
  const reviewsByPurchaseRowId = useOrderReviewStore((s) => s.reviewsByPurchaseRowId)
  const submitReviewForPurchaseRow = useOrderReviewStore((s) => s.submitReviewForPurchaseRow)
  const updateReview = useOrderReviewStore((s) => s.updateReview)
  const removeReview = useOrderReviewStore((s) => s.removeReview)
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const filterBarRef = useRef<HTMLDivElement>(null)
  const [reviewDialogRow, setReviewDialogRow] = useState<ReviewPurchaseRow | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [deletingRowId, setDeletingRowId] = useState<string | null>(null)

  useEffect(() => {
    const sortParams =
      sortOption === 'oldest'
        ? { sortBy: 'createdAt' as const, sortOrder: 'asc' as const }
        : sortOption === 'price_desc'
          ? { sortBy: 'totalAmount' as const, sortOrder: 'desc' as const }
          : sortOption === 'price_asc'
            ? { sortBy: 'totalAmount' as const, sortOrder: 'asc' as const }
            : { sortBy: 'createdAt' as const, sortOrder: 'desc' as const }
    const cryptocurrency =
      paymentMethodFilter === 'bitcoin'
        ? 'BTC'
        : paymentMethodFilter === 'ethereum'
          ? 'ETH'
          : paymentMethodFilter === 'usdt_tron'
            ? 'USDT_TRC20'
            : paymentMethodFilter === 'usdt_ethereum'
              ? 'USDT_ERC20'
              : paymentMethodFilter === 'litecoin'
                ? 'LTC'
                : paymentMethodFilter === 'bitcoin_cash'
                  ? 'BCH'
                  : undefined

    void loadReviewsPageData({
      page: 1,
      sortBy: sortParams.sortBy,
      sortOrder: sortParams.sortOrder,
      cryptocurrency,
    })
  }, [loadReviewsPageData, paymentMethodFilter, sortOption])
  const toggleMenu = (menu: 'status' | 'payment' | 'sort') => {
    setStatusMenuOpen((prev) => (menu === 'status' ? !prev : false))
    setPaymentMethodMenuOpen((prev) => (menu === 'payment' ? !prev : false))
    setSortMenuOpen((prev) => (menu === 'sort' ? !prev : false))
  }

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

  useEffect(() => {
    const anyOpen =
      statusMenuOpen || paymentMethodMenuOpen || sortMenuOpen || mobileFiltersOpen
    if (!anyOpen) return
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      if (filterBarRef.current?.contains(target)) return
      setStatusMenuOpen(false)
      setPaymentMethodMenuOpen(false)
      setSortMenuOpen(false)
      setMobileFiltersOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setStatusMenuOpen(false)
      setPaymentMethodMenuOpen(false)
      setSortMenuOpen(false)
      setMobileFiltersOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [mobileFiltersOpen, paymentMethodMenuOpen, sortMenuOpen, statusMenuOpen])

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

  const shown = filtered.length
  const canLoadMore = !search.trim() && !loadingMore && shown < totalItems
  const visibleRows = filtered
  const isRefetching = loading && visibleRows.length > 0

  const filterBar = (
    <div
      ref={filterBarRef}
      className="text-muted-foreground dark:text-lightsteelblue-100 lg:text-num-16 flex w-full min-w-0 flex-col gap-2 sm:gap-3 lg:flex-row lg:items-center lg:gap-3"
    >
      <div className="flex min-w-0 w-full flex-row items-stretch gap-2 lg:contents">
        <div className="rounded-num-8 px-num-12 bg-card-elevated border-border-subtle flex min-h-11 min-w-0 flex-1 items-center gap-2 overflow-hidden border border-solid py-0 sm:w-full lg:min-w-[min(100%,240px)] lg:flex-1 dark:border-[#16243B]">
          <CentralIcon
            name="IconMagnifyingGlass"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={18}
            ariaHidden={true}
            className="text-muted-foreground"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search using Order ID, Product Name"
            className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-foreground placeholder:text-muted-foreground min-w-0 flex-1 border-none bg-transparent px-0 py-1 text-sm font-normal outline-none focus:ring-0"
          />
        </div>
        <button
          type="button"
          className="border-border-subtle bg-card-elevated text-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-num-8 border border-solid sm:hidden dark:border-[#16243B]"
          aria-label={mobileFiltersOpen ? 'Close filters' : 'Open filters'}
          aria-expanded={mobileFiltersOpen}
          onClick={() => setMobileFiltersOpen((open) => !open)}
        >
          <CentralIcon
            name="IconFilter1"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={20}
            ariaHidden={true}
          />
        </button>
      </div>

      <div
        className={cn(
          'flex w-full min-w-0 flex-wrap items-center gap-2 sm:flex sm:gap-3 lg:w-auto lg:shrink-0 lg:justify-end',
          !mobileFiltersOpen && 'max-sm:hidden',
          'max-sm:flex-col max-sm:items-stretch',
        )}
      >
        <div className="relative w-fit max-w-full shrink-0 max-sm:w-full" ref={statusMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={statusMenuOpen}
            aria-label="Filter by status"
            onClick={() => toggleMenu('status')}
            className={dashboardSelectTriggerClass}
          >
            <span className="tracking-num--0_01 shrink-0 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Status
            </span>
            <span className="flex min-w-0 items-center gap-1.5 sm:contents">
              <span className="tracking-num--0_01 truncate leading-num-28 text-sm font-semibold max-sm:text-right sm:text-left sm:text-num-14 lg:text-num-16">
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
            </span>
          </button>
          {statusMenuOpen ? (
            <ul
              role="listbox"
              aria-label="Status"
              className={filterMenuPanelClass('start')}
            >
              <div className={siteSelectDropdownList}>
                {STATUS_OPTIONS.map((opt) => {
                  const statusCfg =
                    opt.value === 'all' ? null : dashboardOrderStatusConfig[opt.value]
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={statusFilter === opt.value}
                      className={cn(
                        siteSelectDropdownOptionRow,
                        siteSelectDropdownOptionInteractive,
                        'text-foreground dark:text-ghostwhite sm:text-num-14 lg:text-num-16 gap-2 text-sm',
                        statusFilter === opt.value && 'bg-foreground/5 dark:bg-white/5'
                      )}
                      onClick={() => {
                        setStatusFilter(opt.value)
                        setStatusMenuOpen(false)
                        setMobileFiltersOpen(false)
                      }}
                    >
                      {statusCfg ? (
                        <CentralIcon
                          name={statusCfg.icon as any}
                          join="round"
                          fill="filled"
                          stroke="1"
                          radius="1"
                          size={14}
                          ariaHidden={true}
                          className={`shrink-0 ${statusCfg.color}`}
                        />
                      ) : null}
                      <span>{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            </ul>
          ) : null}
        </div>
        <div className="relative w-fit max-w-full shrink-0 max-sm:w-full" ref={paymentMethodMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={paymentMethodMenuOpen}
            aria-label="Filter by payment method"
            onClick={() => toggleMenu('payment')}
            className={dashboardSelectTriggerClass}
          >
            <span className="tracking-num--0_01 shrink-0 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Payment Method
            </span>
            <span className="flex min-w-0 items-center gap-1.5 sm:contents">
              <span className="tracking-num--0_01 truncate leading-num-28 text-sm font-semibold max-sm:text-right sm:text-left sm:text-num-14 lg:text-num-16">
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
            </span>
          </button>
          {paymentMethodMenuOpen ? (
            <ul
              role="listbox"
              aria-label="Payment Method"
              className={filterMenuPanelClass('start')}
            >
              <div className={siteSelectDropdownList}>
                {PAYMENT_METHOD_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={paymentMethodFilter === opt.value}
                    className={cn(
                      siteSelectDropdownOptionRow,
                      siteSelectDropdownOptionInteractive,
                      'text-foreground dark:text-ghostwhite sm:text-num-14 lg:text-num-16 gap-2 text-sm',
                      paymentMethodFilter === opt.value && 'bg-foreground/5 dark:bg-white/5'
                    )}
                    onClick={() => {
                      setPaymentMethodFilter(opt.value)
                      setPaymentMethodMenuOpen(false)
                      setMobileFiltersOpen(false)
                    }}
                  >
                    {opt.iconSrc ? (
                      <img className="h-5 w-5 shrink-0" alt="" src={opt.iconSrc} />
                    ) : null}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </ul>
          ) : null}
        </div>
        <div className="relative w-fit max-w-full shrink-0 max-sm:w-full" ref={sortMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortMenuOpen}
            aria-label="Sort reviews"
            onClick={() => toggleMenu('sort')}
            className={dashboardSelectTriggerClass}
          >
            <span className="tracking-num--0_01 shrink-0 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Sort by
            </span>
            <span className="flex min-w-0 items-center gap-1.5 sm:contents">
              <span className="tracking-num--0_01 truncate leading-num-28 text-sm font-semibold max-sm:text-right sm:text-left sm:text-num-14 lg:text-num-16">
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
            </span>
          </button>
          {sortMenuOpen ? (
            <ul
              role="listbox"
              aria-label="Sort by"
              className={filterMenuPanelClass('start')}
            >
              <div className={siteSelectDropdownList}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={sortOption === opt.value}
                    className={cn(
                      siteSelectDropdownOptionRow,
                      siteSelectDropdownOptionInteractive,
                      'text-foreground dark:text-ghostwhite sm:text-num-14 lg:text-num-16 text-sm max-sm:whitespace-normal sm:whitespace-nowrap',
                      sortOption === opt.value && 'bg-foreground/5 dark:bg-white/5'
                    )}
                    onClick={() => {
                      setSortOption(opt.value)
                      setSortMenuOpen(false)
                      setMobileFiltersOpen(false)
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )

  if (filtered.length === 0 && !loading) {
    return (
      <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
        {filterBar}
        {loading && filtered.length === 0 ? (
          <div className="flex py-12">
            <div
              className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
              role="status"
              aria-label="Loading reviews"
            />
          </div>
        ) : null}
        {!loading && error ? (
          <div className="text-center">
            <p className="text-sm text-red-300">{error}</p>
            <button
              type="button"
              className="mt-2 text-sm font-semibold text-white underline underline-offset-4"
              onClick={() => void loadReviewsPageData({ page: 1 })}
            >
              Retry
            </button>
          </div>
        ) : null}
        <div className="text-foreground dark:text-ghostwhite font-commissioner flex w-full flex-col items-center gap-2 py-12 text-center">
          <img className="size-28 opacity-90 sm:size-36" alt="" src="/icons/not-found.svg" />
          <b className="tracking-num--0_01 text-base leading-[26px] sm:text-lg">
            No purchases match
          </b>
          <p className="text-muted-foreground dark:text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
            Try another search to find orders you can review.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
      {filterBar}
      {isRefetching ? (
        <div className="flex py-2">
          <div
            className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
            role="status"
            aria-label="Refreshing reviews"
          />
        </div>
      ) : null}
      {loading && visibleRows.length === 0 ? (
        <div className="flex py-12">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
            role="status"
            aria-label="Loading reviews"
          />
        </div>
      ) : (
        <div className="rounded-num-8 border-border-subtle bg-card-elevated dark:border-darkslateblue overflow-hidden border border-solid dark:bg-gray-100">
          {!loading && error ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-red-300">{error}</p>
              <button
                type="button"
                className="mt-2 text-sm font-semibold text-white underline underline-offset-4"
                onClick={() => void loadReviewsPageData({ page: 1 })}
              >
                Retry
              </button>
            </div>
          ) : null}
          <div className="flex flex-col">
            {visibleRows.map(({ row }) => {
              const matchedOrder = orders.find((o) => o.id === row.id)
              return (
                <ReviewRow
                  key={row.id}
                  row={row}
                  review={reviewsByPurchaseRowId[row.id]}
                  status={matchedOrder?.status}
                  canAddReview={matchedOrder?.status === 'paid'}
                  onAddReview={() => setReviewDialogRow(row)}
                />
              )
            })}
          </div>
        </div>
      )}

      <nav aria-label="Review list load more">
        <DashboardLoadMoreFooter
          shown={shown}
          total={search.trim() ? filtered.length : totalItems}
          canLoadMore={canLoadMore}
          onLoadMore={() => void loadMoreReviews()}
        />
      </nav>
      {loadingMore ? (
        <div className="flex py-4">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
            role="status"
            aria-label="Loading more reviews"
          />
        </div>
      ) : null}

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
                  imageUrl={reviewDialogRow.imageUrl}
                  itemCount={reviewDialogRow.itemCount}
                  price={reviewDialogRow.price}
                  date={reviewDialogRow.date}
                  time={reviewDialogRow.time}
                  initialRating={reviewsByPurchaseRowId[reviewDialogRow.id]?.rating}
                  initialComment={reviewsByPurchaseRowId[reviewDialogRow.id]?.comment}
                  submitting={submitting}
                  deleting={deletingRowId === reviewDialogRow.id}
                  allowDelete={Boolean(reviewsByPurchaseRowId[reviewDialogRow.id])}
                  onDelete={async () => {
                    const purchaseRowId = reviewDialogRow.id
                    const existing = reviewsByPurchaseRowId[purchaseRowId]
                    if (!existing) return
                    setDeletingRowId(purchaseRowId)
                    try {
                      await removeReview(purchaseRowId)
                      setReviewDialogRow(null)
                    } catch {
                      toast.error('Could not delete review. Please try again.')
                    } finally {
                      setDeletingRowId(null)
                    }
                  }}
                  onClose={() => setReviewDialogRow(null)}
                  onSubmit={async ({ rating, comment }) => {
                    setSubmitting(true)
                    try {
                      if (reviewsByPurchaseRowId[reviewDialogRow.id]) {
                        await updateReview(reviewDialogRow.id, { rating, comment })
                      } else {
                        await submitReviewForPurchaseRow(reviewDialogRow.id, { rating, comment })
                      }
                      setReviewDialogRow(null)
                    } catch {
                      toast.error('Could not submit review. Please try again.')
                    } finally {
                      setSubmitting(false)
                    }
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
