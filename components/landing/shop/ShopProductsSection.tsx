/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CentralIcon } from '@central-icons-react/all'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { DashboardLoadMoreFooter } from '@/components/dashboard/DashboardLoadMoreFooter'

import { ShopProductCard } from './ShopProductCard'
import ShopProductDetailModal from './detail/ShopProductDetailModal'

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
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const [quickBuyProduct, setQuickBuyProduct] = useState<ShopListItem | null>(null)
  const [quickBuyPortalEl, setQuickBuyPortalEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setQuickBuyPortalEl(document.body)
  }, [])

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
          stroke="2"
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
                onQuickBuy={() => setQuickBuyProduct(p)}
              />
            ))}
          </div>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <nav>
              <DashboardLoadMoreFooter
                shown={loaded}
                total={total}
                canLoadMore={loaded < total}
                onLoadMore={() => setVisibleCount((v) => Math.min(total, v + PAGE_SIZE))}
              />
            </nav>
          </div>
          {quickBuyProduct &&
            quickBuyPortalEl &&
            createPortal(
              <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 lg:px-8">
                <button
                  type="button"
                  className="absolute inset-0 bg-black/60"
                  aria-label="Close quick buy dialog"
                  onClick={() => setQuickBuyProduct(null)}
                />
                <div
                  className="relative z-10 flex w-full max-w-[min(100vw-2rem,960px)] flex-col items-center overflow-visible"
                  role="dialog"
                  aria-modal="true"
                >
                  <ShopProductDetailModal
                    productName={quickBuyProduct.name}
                    imageSrc={quickBuyProduct.imageSrc}
                    onClose={() => setQuickBuyProduct(null)}
                  />
                </div>
              </div>,
              quickBuyPortalEl
            )}
        </>
      )}
    </div>
  )
}
