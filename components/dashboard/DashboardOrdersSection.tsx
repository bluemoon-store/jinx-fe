'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'

import type { OrderPaymentMethod } from '@/lib/order-review-store'
import { useOrderReviewStore } from '@/lib/order-review-store'
import {
  siteSelectDropdownList,
  siteSelectDropdownOptionInteractive,
  siteSelectDropdownOptionRow,
  siteSelectDropdownPanel,
} from '@/components/ui/siteSelectDropdown'
import { cn } from '@/lib/utils'

import { DashboardLoadMoreFooter } from './DashboardLoadMoreFooter'
import { DashboardOrderCard } from './DashboardOrderCard'
import type { DashboardOrderStatus } from './DashboardOrderCard'
import { dashboardOrderStatusConfig } from './DashboardOrderCard'
import { DashboardOrderRow } from './DashboardOrderRow'

const PAGE_SIZE = 12

type OrdersViewMode = 'grid' | 'list'

const VIEW_OPTIONS: { value: OrdersViewMode; label: string; icon: string }[] = [
  { value: 'grid', label: 'Grid', icon: 'IconLayoutDashboard' },
  { value: 'list', label: 'List', icon: 'IconListBullets' },
]

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

const dashboardSelectTriggerClass = cn(
  'rounded-num-8 px-num-12 flex min-h-11 w-full min-w-0 items-center gap-2 border border-solid border-[#16243B] bg-gray-100 py-2'
)

type Props = {
  onFilteredCountChange?: (count: number) => void
}

export const DashboardOrdersSection: FunctionComponent<Props> = ({ onFilteredCountChange }) => {
  const orders = useOrderReviewStore((s) => s.orders)
  const [orderSearch, setOrderSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<PaymentMethodFilter>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [viewMode, setViewMode] = useState<OrdersViewMode>('grid')
  const [viewMenuOpen, setViewMenuOpen] = useState(false)
  const viewMenuRef = useRef<HTMLDivElement>(null)
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const statusMenuRef = useRef<HTMLDivElement>(null)
  const [paymentMethodMenuOpen, setPaymentMethodMenuOpen] = useState(false)
  const paymentMethodMenuRef = useRef<HTMLDivElement>(null)
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const sortMenuRef = useRef<HTMLDivElement>(null)
  const selectedViewOption = VIEW_OPTIONS.find((o) => o.value === viewMode) ?? VIEW_OPTIONS[0]
  const toggleMenu = (menu: 'status' | 'payment' | 'sort' | 'view') => {
    setStatusMenuOpen((prev) => (menu === 'status' ? !prev : false))
    setPaymentMethodMenuOpen((prev) => (menu === 'payment' ? !prev : false))
    setSortMenuOpen((prev) => (menu === 'sort' ? !prev : false))
    setViewMenuOpen((prev) => (menu === 'view' ? !prev : false))
  }

  const filtered = useMemo(() => {
    const q = orderSearch.trim().toLowerCase()
    const statusFiltered =
      statusFilter === 'all' ? orders : orders.filter((o) => o.status === statusFilter)
    const methodFiltered =
      paymentMethodFilter === 'all'
        ? statusFiltered
        : statusFiltered.filter((o) => o.paymentMethod === paymentMethodFilter)
    if (!q) return methodFiltered
    return methodFiltered.filter(
      (o) =>
        o.brand.toLowerCase().includes(q) || o.id.includes(q) || o.price.toLowerCase().includes(q)
    )
  }, [orderSearch, orders, paymentMethodFilter, statusFilter])

  useEffect(() => {
    onFilteredCountChange?.(filtered.length)
  }, [filtered.length, onFilteredCountChange])

  useEffect(() => {
    setVisibleCount(Math.min(PAGE_SIZE, filtered.length))
  }, [orderSearch, paymentMethodFilter, statusFilter, sortOption, filtered.length])

  useEffect(() => {
    if (!viewMenuOpen && !statusMenuOpen && !paymentMethodMenuOpen && !sortMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        viewMenuRef.current?.contains(target) ||
        statusMenuRef.current?.contains(target) ||
        paymentMethodMenuRef.current?.contains(target) ||
        sortMenuRef.current?.contains(target)
      )
        return
      setViewMenuOpen(false)
      setStatusMenuOpen(false)
      setPaymentMethodMenuOpen(false)
      setSortMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setViewMenuOpen(false)
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
  }, [paymentMethodMenuOpen, statusMenuOpen, sortMenuOpen, viewMenuOpen])

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
      if (sortOption === 'price_desc') return parsePrice(b.price) - parsePrice(a.price)
      if (sortOption === 'price_asc') return parsePrice(a.price) - parsePrice(b.price)

      const aId = parseId(a.id)
      const bId = parseId(b.id)
      if (aId !== null && bId !== null) {
        return sortOption === 'newest' ? bId - aId : aId - bId
      }
      // Fallback when IDs aren't numeric
      return sortOption === 'newest' ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id)
    })
    return next
  }, [filtered, sortOption])

  const shown = Math.min(visibleCount, sorted.length)
  const canLoadMore = shown < sorted.length
  const visibleOrders = sorted.slice(0, shown)

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
          value={orderSearch}
          onChange={(e) => setOrderSearch(e.target.value)}
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
            onClick={() => toggleMenu('status')}
            className={dashboardSelectTriggerClass}
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Status
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {statusFilter === 'all' ? 'All' : dashboardOrderStatusConfig[statusFilter].label}
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
              className={`absolute top-full left-0 z-20 mt-2 min-w-42 overflow-hidden ${siteSelectDropdownPanel}`}
            >
              <div className={siteSelectDropdownList}>
                {STATUS_OPTIONS.map((opt) => {
                  const statusCfg = opt.value === 'all' ? null : dashboardOrderStatusConfig[opt.value]
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={statusFilter === opt.value}
                      className={cn(
                        siteSelectDropdownOptionRow,
                        siteSelectDropdownOptionInteractive,
                        'text-ghostwhite sm:text-num-14 lg:text-num-16 gap-2 text-sm',
                        statusFilter === opt.value && 'bg-white/5'
                      )}
                      onClick={() => {
                        setStatusFilter(opt.value)
                        setStatusMenuOpen(false)
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
        <div className="relative w-fit max-w-full shrink-0" ref={paymentMethodMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={paymentMethodMenuOpen}
            aria-label="Filter by payment method"
            onClick={() => toggleMenu('payment')}
            className={dashboardSelectTriggerClass}
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
              className={`absolute top-full left-0 z-20 mt-2 min-w-42 overflow-hidden ${siteSelectDropdownPanel}`}
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
                      'text-ghostwhite sm:text-num-14 lg:text-num-16 gap-2 text-sm',
                      paymentMethodFilter === opt.value && 'bg-white/5'
                    )}
                    onClick={() => {
                      setPaymentMethodFilter(opt.value)
                      setPaymentMethodMenuOpen(false)
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
        <div className="relative w-fit max-w-full shrink-0" ref={sortMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortMenuOpen}
            aria-label="Sort orders"
            onClick={() => toggleMenu('sort')}
            className={dashboardSelectTriggerClass}
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
              className={`absolute top-full left-0 z-20 mt-2 min-w-42 overflow-hidden ${siteSelectDropdownPanel}`}
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
                      'text-ghostwhite sm:text-num-14 lg:text-num-16 text-sm whitespace-nowrap',
                      sortOption === opt.value && 'bg-white/5'
                    )}
                    onClick={() => {
                      setSortOption(opt.value)
                      setSortMenuOpen(false)
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </ul>
          ) : null}
        </div>
        <div className="relative w-fit max-w-full shrink-0" ref={viewMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={viewMenuOpen}
            aria-label="View layout"
            onClick={() => toggleMenu('view')}
            className={dashboardSelectTriggerClass}
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              View
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {selectedViewOption.label}
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
          {viewMenuOpen ? (
            <ul
              role="listbox"
              aria-label="View layout"
              className={`absolute top-full right-0 z-20 mt-2 min-w-42 overflow-hidden ${siteSelectDropdownPanel}`}
            >
              <div className={siteSelectDropdownList}>
                {VIEW_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={viewMode === opt.value}
                    className={cn(
                      siteSelectDropdownOptionRow,
                      siteSelectDropdownOptionInteractive,
                      'text-ghostwhite sm:text-num-14 lg:text-num-16 gap-2 text-sm',
                      viewMode === opt.value && 'bg-white/5'
                    )}
                    onClick={() => {
                      setViewMode(opt.value)
                      setViewMenuOpen(false)
                    }}
                  >
                    <CentralIcon
                      name={opt.icon as any}
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={15}
                      ariaHidden={true}
                      className="shrink-0"
                    />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
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
          <b className="tracking-num--0_01 text-base leading-[26px] sm:text-lg">No orders match</b>
          <p className="text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
            Try another search or clear filters to see your orders.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
      {filterBar}
      {viewMode === 'grid' ? (
        <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {visibleOrders.map((o) => (
            <DashboardOrderCard
              key={o.id}
              id={o.id}
              brand={o.brand}
              itemCount={o.itemCount}
              price={o.price}
              status={o.status}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-num-8 divide-y divide-[#16243B] border border-solid border-[#16243B] bg-[#0B1221]">
          {visibleOrders.map((o) => (
            <DashboardOrderRow
              key={o.id}
              id={o.id}
              brand={o.brand}
              itemCount={o.itemCount}
              price={o.price}
              status={o.status}
            />
          ))}
        </div>
      )}

      <nav aria-label="Order list load more">
        <DashboardLoadMoreFooter
          shown={shown}
          total={filtered.length}
          canLoadMore={canLoadMore}
          onLoadMore={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length))}
        />
      </nav>
    </div>
  )
}
