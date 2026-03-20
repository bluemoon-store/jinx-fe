/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CentralIcon } from '@central-icons-react/all'
import { useEffect, useMemo, useState } from 'react'

import { ShopProductCard } from './ShopProductCard'

type Props = {
  selectedCategory: string
}

type ShopListItem = {
  id: string
  name: string
  fromPrice: string
  imageSrc: string
  category: string
}

const ALL_CATEGORIES = [
  'All Giftcards',
  'Cashout',
  'Hotels',
  'Food',
  'Flights',
  'Groceries',
  'Shopping',
  'Clothing',
  'Gas/Oil',
  'Tickets',
  'Lifestyle',
  'Jewelry',
  'Rentals',
  'Streaming',
]

const BASE_PRODUCTS: Omit<ShopListItem, 'id'>[] = [
  { name: 'DOMINOS', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Food' },
  { name: 'CHIPOTLE', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Food' },
  { name: 'NETFLIX', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Streaming' },
  { name: 'PLAYSTATION', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Lifestyle' },
  { name: 'BEST BUY', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Shopping' },
  { name: 'AIRBNB', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Hotels' },
  { name: 'AMAZON', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Shopping' },
  { name: 'STARBUCKS', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Food' },
  { name: 'WALMART', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Shopping' },
  { name: 'TARGET', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Shopping' },
  { name: 'H&M', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Clothing' },
  { name: 'UBER', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg', category: 'Lifestyle' },
]

const TOTAL_PRODUCTS = 100
const PAGE_SIZE = 12
const INITIAL_VISIBLE = 12

const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const ShopProductsSection = ({ selectedCategory }: Props) => {
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const allProducts: ShopListItem[] = useMemo(() => {
    return Array.from({ length: TOTAL_PRODUCTS }, (_, i) => {
      const base = BASE_PRODUCTS[i % BASE_PRODUCTS.length]
      return { ...base, id: `p-${i}` }
    })
  }, [])

  const filteredProducts = useMemo(() => {
    const safeCategory = ALL_CATEGORIES.includes(selectedCategory)
      ? selectedCategory
      : 'All Giftcards'
    const q = query.trim().toLowerCase()

    return allProducts.filter((p) => {
      const categoryOk = safeCategory === 'All Giftcards' ? true : p.category === safeCategory
      const searchOk = q ? p.name.toLowerCase().includes(q) : true
      return categoryOk && searchOk
    })
  }, [allProducts, query, selectedCategory])

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE)
  }, [query, selectedCategory])

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const total = filteredProducts.length
  const loaded = visibleProducts.length
  const ratio = total > 0 ? Math.max(0, Math.min(1, loaded / total)) : 0

  return (
    <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-5">
        <div className="flex items-center">
          <div className="tracking-num-0_02 text-sm font-extrabold uppercase sm:text-base">
            All Products
          </div>
        </div>
        <div className="text-lightsteelblue-200 font-commissioner sm:text-num-14 flex items-center gap-1.5 text-right text-xs sm:gap-2.5">
          <span className="leading-num-20 font-semibold">Available Products : </span>
          <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-center text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
            <b className="leading-num-20 [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              {total}
            </b>
          </div>
        </div>
      </div>

      <div className="text-num-16 text-lightsteelblue-100 rounded-num-8 border-darkslateblue px-num-12 flex min-h-[44px] w-full items-center gap-2 overflow-hidden border border-solid bg-gray-100 py-1">
        <CentralIcon
          name="IconMagnifyingGlass2"
          join="round"
          fill="filled"
          stroke="1"
          radius="1"
          size={20}
          color="#FFFFFF"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for any product or bundle"
          className="tracking-num--0_01 leading-num-28 w-full border-none bg-transparent p-1 font-semibold text-white placeholder-white/50 outline-none focus:border-none focus:ring-0 focus:outline-none active:border-none active:outline-none"
        />
      </div>

      {total === 0 ? (
        <div className="text-ghostwhite font-commissioner flex w-full flex-col items-center gap-[5px] py-12 text-left text-lg">
          <img className="size-36 opacity-90 md:size-52" alt="" src="/icons/not-found.svg" />
          <div className="flex flex-col items-center">
            <b className="relative leading-[26px] tracking-[-0.01em]">
              We couldn't find any matches
            </b>
          </div>
          <div className="text-lightsteelblue-100 w-[411px] max-w-full text-center text-base leading-6 font-medium">
            There are no products that match your search criteria. Please refine your search and try
            again.
          </div>
        </div>
      ) : (
        <>
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {visibleProducts.map((p) => (
              <ShopProductCard
                key={p.id}
                name={p.name}
                fromPrice={p.fromPrice}
                imageSrc={p.imageSrc}
                detailHref={`/shop/${slugify(p.name)}`}
              />
            ))}
          </div>

          <div className="flex flex-col items-stretch justify-between gap-4 pt-4 sm:flex-row sm:items-center">
            <button
              type="button"
              disabled={loaded >= total}
              onClick={() => setVisibleCount((v) => Math.min(total, v + PAGE_SIZE))}
              className="border-darkslateblue font-commissioner sm:py-num-10 sm:text-num-16 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[30px] border-[1.5px] border-solid bg-[#0D1B35] px-4 py-3 text-sm text-white shadow-[0px_15px_15px_rgba(0,_0,_0,_0.01)] disabled:cursor-not-allowed disabled:opacity-25 sm:w-auto sm:gap-2.5 sm:px-6"
            >
              <span className="leading-num-24 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                Load More Products
              </span>
              <CentralIcon
                name="IconChevronDownMedium"
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={20}
                color="#FFFFFF"
              />
            </button>

            <div className="font-commissioner sm:text-num-16 lg:max-w-num-281 flex w-full items-center justify-between gap-3 text-sm text-white sm:gap-4">
              <div className="rounded-num-8 bg-fuchsia/25 flex h-[3px] min-w-[60px] flex-1 overflow-hidden shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)] sm:w-[196px] sm:flex-none">
                <div
                  className="rounded-num-8 bg-fuchsia h-full min-w-0 shrink-0 shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)]"
                  style={{ width: `${ratio * 100}%` }}
                />
              </div>
              <div className="flex shrink-0 items-center">
                <div className="leading-num-24 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                  {loaded} of {total}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
