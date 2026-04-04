'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'

type ReviewPurchaseRow = {
  id: string
  brand: string
  logoSrc: string
  itemCount: number
  price: string
  date: string
  time: string
}

const MOCK_REVIEW_ROWS: ReviewPurchaseRow[] = [
  {
    id: '1',
    brand: 'Airbnb',
    logoSrc: '/icons/airbnb.svg',
    itemCount: 2,
    price: '$2.50',
    date: 'March 30, 2026',
    time: '11:11 AM',
  },
  {
    id: '2',
    brand: 'Venmo',
    logoSrc: '/icons/netflix.svg',
    itemCount: 2,
    price: '$2.50',
    date: 'March 30, 2026',
    time: '11:11 AM',
  },
  {
    id: '3',
    brand: 'Dunkin Donuts',
    logoSrc: '/icons/dominos.svg',
    itemCount: 2,
    price: '$2.50',
    date: 'March 30, 2026',
    time: '11:11 AM',
  },
  {
    id: '4',
    brand: 'Affirm',
    logoSrc: '/icons/best-buy.svg',
    itemCount: 2,
    price: '$2.50',
    date: 'March 30, 2026',
    time: '11:11 AM',
  },
  {
    id: '5',
    brand: 'Starbucks',
    logoSrc: '/icons/starbucks.svg',
    itemCount: 1,
    price: '$4.00',
    date: 'March 29, 2026',
    time: '9:20 AM',
  },
  {
    id: '6',
    brand: 'Netflix',
    logoSrc: '/icons/netflix-1.svg',
    itemCount: 3,
    price: '$12.99',
    date: 'March 28, 2026',
    time: '4:45 PM',
  },
  {
    id: '7',
    brand: 'Chipotle',
    logoSrc: '/icons/group-logo.svg',
    itemCount: 2,
    price: '$2.50',
    date: 'March 28, 2026',
    time: '2:00 PM',
  },
  {
    id: '8',
    brand: 'Best Buy',
    logoSrc: '/icons/best-buy.svg',
    itemCount: 1,
    price: '$9.99',
    date: 'March 27, 2026',
    time: '6:30 PM',
  },
  {
    id: '9',
    brand: 'PlayStation',
    logoSrc: '/icons/playstation.svg',
    itemCount: 1,
    price: '$59.99',
    date: 'March 26, 2026',
    time: '8:00 PM',
  },
  {
    id: '10',
    brand: 'Uber',
    logoSrc: '/icons/IconBasket2.svg',
    itemCount: 1,
    price: '$15.00',
    date: 'March 25, 2026',
    time: '7:15 PM',
  },
]

const PAGE_SIZE = 8

const addReviewBtnClass =
  'rounded-num-8 box-border inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 border border-solid border-transparent bg-[#ffffff0d] px-3 py-1.5 font-inherit transition-colors hover:bg-[#ffffff18] focus:outline-none focus:ring-0'

const ReviewRow: FunctionComponent<{ row: ReviewPurchaseRow }> = ({ row }) => {
  return (
    <div className="border-darkslateblue flex flex-col gap-3 border-b border-solid p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
        <div className="rounded-num-8 flex h-14 w-[105px] shrink-0 items-center justify-center overflow-hidden bg-[#0D1B35] shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
          <img className="max-h-full max-w-full object-contain" alt="" src={row.logoSrc} />
        </div>
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
      <button type="button" className={addReviewBtnClass}>
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
    </div>
  )
}

/** Reviews — purchases eligible for review; layout aligned with Orders / dashboard shell (no absolute canvas). */
export const DashboardReviewsSection: FunctionComponent = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return MOCK_REVIEW_ROWS
    return MOCK_REVIEW_ROWS.filter(
      (r) =>
        r.brand.toLowerCase().includes(q) || r.id.includes(q) || r.price.toLowerCase().includes(q)
    )
  }, [search])

  useEffect(() => {
    setPage(0)
  }, [search, filtered.length])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const pageRows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

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
        <div className="bg-[#ffffff0d] px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-lightsteelblue-200 text-sm font-medium sm:text-base">
            Add a review for completed purchases. Your feedback helps other buyers.
          </p>
        </div>
        <div className="flex flex-col">
          {pageRows.map((row) => (
            <ReviewRow key={row.id} row={row} />
          ))}
        </div>
      </div>

      {pageCount > 1 ? (
        <nav
          className="flex items-center justify-center gap-3 pt-2 sm:gap-4"
          aria-label="Review list pages"
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
