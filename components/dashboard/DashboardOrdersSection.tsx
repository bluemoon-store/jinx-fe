'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'

import { useOrderReviewStore } from '@/lib/order-review-store'

import { DashboardLoadMoreFooter } from './DashboardLoadMoreFooter'
import { DashboardOrderCard } from './DashboardOrderCard'
import { DashboardOrderRow } from './DashboardOrderRow'

const PAGE_SIZE = 12

type OrdersViewMode = 'grid' | 'list'

const VIEW_OPTIONS: { value: OrdersViewMode; label: string }[] = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
]

type Props = {
  onFilteredCountChange?: (count: number) => void
}

export const DashboardOrdersSection: FunctionComponent<Props> = ({ onFilteredCountChange }) => {
  const orders = useOrderReviewStore((s) => s.orders)
  const [orderSearch, setOrderSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [viewMode, setViewMode] = useState<OrdersViewMode>('grid')
  const [viewMenuOpen, setViewMenuOpen] = useState(false)
  const viewMenuRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = orderSearch.trim().toLowerCase()
    if (!q) return orders
    return orders.filter(
      (o) =>
        o.brand.toLowerCase().includes(q) || o.id.includes(q) || o.price.toLowerCase().includes(q)
    )
  }, [orderSearch, orders])

  useEffect(() => {
    onFilteredCountChange?.(filtered.length)
  }, [filtered.length, onFilteredCountChange])

  useEffect(() => {
    setVisibleCount(Math.min(PAGE_SIZE, filtered.length))
  }, [orderSearch, filtered.length])

  useEffect(() => {
    if (!viewMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      if (viewMenuRef.current?.contains(e.target as Node)) return
      setViewMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [viewMenuOpen])

  const shown = Math.min(visibleCount, filtered.length)
  const canLoadMore = shown < filtered.length
  const visibleOrders = filtered.slice(0, shown)

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
        <div className="relative w-fit max-w-full shrink-0" ref={viewMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={viewMenuOpen}
            aria-label="View layout"
            onClick={() => setViewMenuOpen((o) => !o)}
            className="rounded-num-8 px-num-12 flex min-h-11 w-full min-w-0 items-center gap-2 border border-solid border-[#16243B] bg-gray-100 py-2"
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              View
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {VIEW_OPTIONS.find((o) => o.value === viewMode)?.label ?? 'Grid'}
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
              className="border-darkslateblue rounded-num-8 absolute top-full right-0 z-20 mt-1 min-w-[10.5rem] overflow-hidden border border-solid bg-gray-100 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              {VIEW_OPTIONS.map((opt) => (
                <li key={opt.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={viewMode === opt.value}
                    className={`tracking-num--0_01 text-ghostwhite sm:text-num-14 lg:text-num-16 w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-white/10 ${
                      viewMode === opt.value ? 'bg-[#16243B]' : ''
                    }`}
                    onClick={() => {
                      setViewMode(opt.value)
                      setViewMenuOpen(false)
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
