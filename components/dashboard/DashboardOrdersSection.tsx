'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'

import { DashboardOrderCard, type DashboardOrderStatus } from './DashboardOrderCard'

type OrderRow = {
  id: string
  brand: string
  itemCount: number
  price: string
  status: DashboardOrderStatus
}

const MOCK_ORDERS: OrderRow[] = [
  {
    id: '1',
    brand: 'AIRBNB',
    itemCount: 2,
    price: '$2.50',
    status: 'paid',
  },
  {
    id: '2',
    brand: 'VENMO',
    itemCount: 2,
    price: '$2.50',
    status: 'pending',
  },
  {
    id: '3',
    brand: "DUNKIN'",
    itemCount: 2,
    price: '$2.50',
    status: 'paid',
  },
  {
    id: '4',
    brand: 'AFFIRM',
    itemCount: 2,
    price: '$2.50',
    status: 'expired',
  },
  {
    id: '5',
    brand: 'STARBUCKS',
    itemCount: 1,
    price: '$4.00',
    status: 'paid',
  },
  {
    id: '6',
    brand: 'NETFLIX',
    itemCount: 3,
    price: '$12.99',
    status: 'pending',
  },
  {
    id: '7',
    brand: 'CHIPOTLE',
    itemCount: 2,
    price: '$2.50',
    status: 'paid',
  },
  {
    id: '8',
    brand: 'BEST BUY',
    itemCount: 1,
    price: '$9.99',
    status: 'expired',
  },
  {
    id: '9',
    brand: 'AIRBNB',
    itemCount: 2,
    price: '$2.50',
    status: 'paid',
  },
  {
    id: '10',
    brand: 'VENMO',
    itemCount: 2,
    price: '$2.50',
    status: 'pending',
  },
  {
    id: '11',
    brand: "DUNKIN'",
    itemCount: 2,
    price: '$2.50',
    status: 'paid',
  },
  {
    id: '12',
    brand: 'AFFIRM',
    itemCount: 2,
    price: '$2.50',
    status: 'paid',
  },
  {
    id: '13',
    brand: 'UBER',
    itemCount: 1,
    price: '$15.00',
    status: 'pending',
  },
  {
    id: '14',
    brand: 'PLAYSTATION',
    itemCount: 2,
    price: '$2.50',
    status: 'paid',
  },
  {
    id: '15',
    brand: 'H&M',
    itemCount: 4,
    price: '$24.00',
    status: 'expired',
  },
  {
    id: '16',
    brand: 'WALMART',
    itemCount: 2,
    price: '$2.50',
    status: 'paid',
  },
]

const PAGE_SIZE = 12

type Props = {
  onFilteredCountChange?: (count: number) => void
}

export const DashboardOrdersSection: FunctionComponent<Props> = ({ onFilteredCountChange }) => {
  const [orderSearch, setOrderSearch] = useState('')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    const q = orderSearch.trim().toLowerCase()
    if (!q) return MOCK_ORDERS
    return MOCK_ORDERS.filter(
      (o) =>
        o.brand.toLowerCase().includes(q) || o.id.includes(q) || o.price.toLowerCase().includes(q)
    )
  }, [orderSearch])

  useEffect(() => {
    onFilteredCountChange?.(filtered.length)
  }, [filtered.length, onFilteredCountChange])

  useEffect(() => {
    setPage(0)
  }, [orderSearch, filtered.length])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const pageOrders = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  const filterBar = (
    <div className="text-lightsteelblue-100 lg:text-num-16 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:flex lg:flex-wrap lg:items-stretch lg:gap-3">
      <div className="rounded-num-8 px-num-12 lg:col-span-none flex min-h-11 min-w-0 items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-0 sm:col-span-2 lg:min-w-[min(100%,240px)] lg:flex-1">
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
      <div className="rounded-num-8 px-num-12 flex min-h-11 items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-2 lg:shrink-0">
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
      <div className="rounded-num-8 px-num-12 flex min-h-11 min-w-0 flex-wrap items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-2 lg:shrink-0">
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
      <div className="rounded-num-8 px-num-12 flex min-h-11 items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-2 lg:shrink-0">
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
      <div className="rounded-num-8 px-num-12 lg:col-span-none flex min-h-11 items-center gap-2 overflow-hidden border border-solid border-[#16243B] bg-gray-100 py-2 sm:col-span-2 lg:w-auto lg:shrink-0">
        <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
          View
        </span>
        <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
          Grid
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
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {pageOrders.map((o) => (
          <DashboardOrderCard
            key={o.id}
            brand={o.brand}
            itemCount={o.itemCount}
            price={o.price}
            status={o.status}
          />
        ))}
      </div>

      {pageCount > 1 ? (
        <nav
          className="flex items-center justify-center gap-3 pt-2 sm:gap-4"
          aria-label="Order pages"
        >
          <button
            type="button"
            className="text-lightsteelblue-200 hover:text-ghostwhite rounded-num-8 flex min-h-11 min-w-11 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            disabled={safePage <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            aria-label="Previous page"
          >
            <CentralIcon
              name="IconChevronLeft"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={20}
              ariaHidden={true}
            />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                className={
                  i === safePage
                    ? 'h-2 w-8 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.35)]'
                    : 'h-2 w-2 rounded-full bg-white/25 transition-colors hover:bg-white/45'
                }
                aria-label={`Page ${i + 1}`}
                aria-current={i === safePage ? 'page' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            className="text-lightsteelblue-200 hover:text-ghostwhite rounded-num-8 flex min-h-11 min-w-11 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            aria-label="Next page"
          >
            <CentralIcon
              name="IconChevronRight"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={20}
              ariaHidden={true}
            />
          </button>
        </nav>
      ) : null}
    </div>
  )
}
