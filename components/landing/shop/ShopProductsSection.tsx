/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CentralIcon } from '@central-icons-react/all'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { DashboardLoadMoreFooter } from '@/components/dashboard/DashboardLoadMoreFooter'
import { useDebounce } from '@/hooks/use-debounce'
import { useProductsQuery } from '@/hooks/use-products'
import type { ProductCard } from '@/types/product'

import { ShopProductCard } from './ShopProductCard'
import ShopProductDetailModal from './detail/ShopProductDetailModal'

type Props = {
  selectedCategorySlug: string
}

const PAGE_SIZE = 12
const INITIAL_PAGE = 1

export const ShopProductsSection = ({ selectedCategorySlug }: Props) => {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  const debouncedSearch = useDebounce(query.trim(), 400)

  const [page, setPage] = useState(INITIAL_PAGE)
  const [merged, setMerged] = useState<ProductCard[]>([])

  const [quickBuySlug, setQuickBuySlug] = useState<string | null>(null)
  const [quickBuyPortalEl, setQuickBuyPortalEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setQuickBuyPortalEl(document.body)
  }, [])

  useEffect(() => {
    setPage(INITIAL_PAGE)
    setMerged([])
  }, [debouncedSearch, selectedCategorySlug])

  const listParams = useMemo(
    () => ({
      categorySlug: selectedCategorySlug || undefined,
      page,
      limit: PAGE_SIZE,
      search: debouncedSearch || undefined,
    }),
    [selectedCategorySlug, page, debouncedSearch]
  )

  const { data, isLoading, isFetching } = useProductsQuery(listParams)

  useEffect(() => {
    if (!data?.items) return
    if (page === INITIAL_PAGE) {
      setMerged(data.items)
    } else {
      setMerged((prev) => [...prev, ...data.items])
    }
  }, [data, page])

  const total = data?.total ?? merged.length
  const loaded = merged.length
  const canLoadMore = loaded < total && (data?.items?.length ?? 0) >= PAGE_SIZE

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
              {isLoading && page === INITIAL_PAGE ? '—' : total}
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
          className="tracking-num--0_01 leading-num-28 w-full border-none bg-transparent p-1 font-normal text-white/75 placeholder-white/37.5 outline-none focus:border-none focus:ring-0 focus:outline-none active:border-none active:outline-none"
        />
      </div>

      {isLoading && page === INITIAL_PAGE ? (
        <div className="text-lightsteelblue-100 font-commissioner py-12 text-center text-sm">
          Loading products…
        </div>
      ) : total === 0 ? (
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
            {merged.map((p) => (
              <ShopProductCard
                key={`${p.id}-${p.slug}`}
                name={p.name}
                fromPrice={p.fromPrice.startsWith('$') ? p.fromPrice : `$${p.fromPrice}`}
                imageSrc={p.primaryImageUrl ?? '/icons/airbnb.svg'}
                detailHref={`/shop/${p.slug}`}
                onQuickBuy={() => setQuickBuySlug(p.slug)}
              />
            ))}
          </div>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <nav>
              <DashboardLoadMoreFooter
                shown={loaded}
                total={total}
                canLoadMore={canLoadMore && !isFetching}
                onLoadMore={() => {
                  if (!canLoadMore || isFetching) return
                  setPage((v) => v + 1)
                }}
              />
            </nav>
          </div>
          {quickBuySlug &&
            quickBuyPortalEl &&
            createPortal(
              <div className="fixed inset-0 z-[90] overflow-x-hidden overflow-y-auto overscroll-contain">
                <div className="flex min-h-full justify-center px-4 py-10 sm:px-6 lg:px-8">
                  <button
                    type="button"
                    className="fixed inset-0 bg-black/60"
                    aria-label="Close quick buy dialog"
                    onClick={() => setQuickBuySlug(null)}
                  />
                  <div
                    className="relative z-10 my-auto flex w-full max-w-[min(100vw-2rem,960px)] flex-col items-center overflow-visible"
                    role="dialog"
                    aria-modal="true"
                  >
                    <ShopProductDetailModal
                      productSlug={quickBuySlug}
                      onClose={() => setQuickBuySlug(null)}
                    />
                  </div>
                </div>
              </div>,
              quickBuyPortalEl
            )}
        </>
      )}
    </div>
  )
}
