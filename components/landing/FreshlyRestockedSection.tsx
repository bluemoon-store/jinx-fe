'use client'

import { CentralIcon } from '@central-icons-react/all'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import ShopProductDetailModal from '@/components/landing/shop/detail/ShopProductDetailModal'
import { Reveal } from '@/components/ui/reveal'
import { useRestockedProductsQuery } from '@/hooks/use-products'

const ITEMS_PER_PAGE = 10

export default function FreshlyRestockedSection() {
  const { data, isLoading } = useRestockedProductsQuery(59)
  const allItems = data?.items ?? []

  const totalPages = Math.max(1, Math.ceil(allItems.length / ITEMS_PER_PAGE))

  const [page, setPage] = useState(0)
  const [quickBuySlug, setQuickBuySlug] = useState<string | null>(null)
  const [quickBuyPortalEl, setQuickBuyPortalEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setQuickBuyPortalEl(document.body)
  }, [])

  const items = useMemo(
    () => allItems.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
    [allItems, page]
  )

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1))

  return (
    <section className="overflow-x-hidden text-sm sm:text-base lg:text-lg">
      {/* Section header */}
      <Reveal variant="fade-up">
        <div className="mx-auto w-full max-w-[1476.9px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-2 text-center sm:gap-2.5 lg:gap-3">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <div className="tracking-num-0.02 text-xl font-extrabold sm:text-2xl lg:text-[32px]">
                FRESHLY
              </div>
              <div className="text-mediumslateblue-100 font-heydex flex items-center gap-1.5 sm:gap-2">
                <img
                  className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                  alt=""
                  src="/icons/IconPlanning.svg"
                />
                <div className="tracking-num-0.02 text-xl font-extrabold sm:text-2xl lg:text-[32px]">
                  ReSToCKED
                </div>
              </div>
            </div>
            <div className="font-commissioner max-w-num-580 lg:leading-num-24 w-full text-sm leading-6 font-medium text-white opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)] sm:text-base sm:leading-7">
              Products with stocks just refreshed, they keep selling so quick.
              <br className="hidden sm:block" />
              <span className="hidden sm:inline">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Products grid */}
      <div className="mx-auto mt-6 w-full max-w-[1476.9px] px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8">
        {isLoading ? (
          <div className="text-lightsteelblue-100 py-12 text-center">Loading restocked products…</div>
        ) : (
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
          {items.map((item, idx) => (
            <Reveal
              key={item.id}
              variant="fade-up"
              delay={idx * 70}
              className="border-darkslateblue rounded-num-8 xl:p-num-12 box-border flex h-full w-full flex-col items-stretch gap-2.5 border border-solid bg-[#0D1B35] p-4 sm:gap-3 sm:p-5 lg:p-6"
            >
              <Link href={`/shop/${item.slug}`} className="flex w-full flex-1 flex-col">
                <div className="rounded-num-8 relative aspect-4/3 w-full overflow-hidden bg-[#0A162D]">
                  <img
                    className="block h-full w-full object-cover"
                    alt=""
                    src={item.primaryImageUrl ?? '/icons/airbnb.svg'}
                  />
                </div>
                <div className="mx-auto flex w-full max-w-38 flex-col items-center gap-0.5 sm:max-w-42">
                  <div className="flex items-center justify-center self-stretch">
                    <div className="tracking-num-0.02 w-full truncate text-center text-sm font-extrabold uppercase sm:text-base">
                      {item.name}
                    </div>
                  </div>
                  <div className="text-whitesmoke-200 font-commissioner flex items-center justify-center gap-0.5 text-sm font-medium sm:text-base">
                    <div className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                      from{' '}
                    </div>
                    <div className="rounded-num-6 py-num-0 flex items-center justify-center px-2 text-white [background:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.14))] sm:px-2.5">
                      <b className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                        {item.fromPrice.startsWith('$') ? item.fromPrice : `$${item.fromPrice}`}
                      </b>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setQuickBuySlug(item.slug)}
                className="font-commissioner rounded-num-6 sm:px-num-10 sm:text-num-14 py-num-8 mt-auto box-border flex h-10 w-full items-center justify-center gap-1.5 bg-[#19263F] px-4 text-white sm:gap-[5px]"
              >
                <CentralIcon
                  name="IconZap"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={16}
                  className="text-white"
                />
                <span className="tracking-num--0_01 leading-num-24 font-semibold">Quick Buy</span>
              </button>
            </Reveal>
          ))}
        </div>
        )}
        {quickBuySlug &&
          quickBuyPortalEl &&
          createPortal(
            <div className="fixed inset-0 z-90 flex items-center justify-center p-4 sm:p-6 lg:px-8">
              <button
                type="button"
                className="absolute inset-0 bg-black/60"
                aria-label="Close quick buy dialog"
                onClick={() => setQuickBuySlug(null)}
              />
              <div
                className="relative z-10 flex w-full max-w-[min(100vw-2rem,960px)] flex-col items-center overflow-visible"
                role="dialog"
                aria-modal="true"
              >
                <ShopProductDetailModal
                  productSlug={quickBuySlug}
                  onClose={() => setQuickBuySlug(null)}
                />
              </div>
            </div>,
            quickBuyPortalEl
          )}

        {/* Pagination */}
        <div className="mt-6 flex w-full items-center justify-center gap-3 sm:mt-8 lg:mt-10">
          <button
            type="button"
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous page"
            className="border-darkslateblue flex h-[30px] w-[30px] items-center justify-center rounded-full border border-solid bg-gray-200 shadow-[0px_15px_15px_rgba(0,0,0,0.01)] transition-opacity hover:not-disabled:opacity-80 disabled:opacity-25"
          >
            <CentralIcon
              name="IconChevronLeft"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={16}
              className="text-white"
            />
          </button>

          <div className="border-darkslateblue flex items-center gap-[7.5px] rounded-[30px] border-[1.5px] border-solid bg-gray-200 px-[9px] py-[9px] shadow-[0px_15px_15px_rgba(0,0,0,0.01)]">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={cn(
                  'rounded-[13.5px] bg-white transition-all duration-300',
                  i === page ? 'h-3 w-[30px]' : 'h-3 w-3 opacity-25'
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            disabled={page === totalPages - 1}
            aria-label="Next page"
            className="border-darkslateblue flex h-[30px] w-[30px] items-center justify-center rounded-full border border-solid bg-gray-200 shadow-[0px_15px_15px_rgba(0,0,0,0.01)] transition-opacity hover:not-disabled:opacity-80 disabled:opacity-25"
          >
            <CentralIcon
              name="IconChevronRight"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={16}
              className="text-white"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
