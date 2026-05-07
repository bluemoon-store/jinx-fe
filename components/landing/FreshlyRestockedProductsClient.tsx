'use client'

import { CentralIcon } from '@central-icons-react/all'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import ShopProductDetailModal from '@/components/landing/shop/detail/ShopProductDetailModal'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'
import type { ProductQuickBuy } from '@/types/product'

const ITEMS_PER_PAGE = 10

type Props = {
  items: ProductQuickBuy[]
}

export default function FreshlyRestockedProductsClient({ items: allItems }: Props) {
  const totalPages = Math.max(1, Math.ceil(allItems.length / ITEMS_PER_PAGE))

  const [page, setPage] = useState(0)
  const [quickBuyProduct, setQuickBuyProduct] = useState<ProductQuickBuy | null>(null)
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
    <div className="mx-auto mt-6 w-full max-w-[1476.9px] px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8">
      {allItems.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center text-sm">
          No restocked products available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
          {items.map((item, idx) => (
            <Reveal
              key={item.id}
              variant="fade-up"
              delay={idx * 70}
              className="border-border-subtle rounded-num-8 p-num-12 box-border flex h-full w-full flex-col items-stretch gap-2.5 border border-solid bg-card sm:gap-3"
            >
              <Link href={`/shop/${item.slug}`} className="flex w-full flex-1 flex-col gap-2">
                <div className="rounded-num-8 relative aspect-video w-full overflow-hidden bg-card-elevated">
                  <img
                    className="block h-full w-full object-cover"
                    alt=""
                    src={item.primaryImageUrl ?? '/icons/placeholder.svg'}
                  />
                </div>
                <div className="mx-auto flex w-full max-w-38 flex-col items-center gap-0.5 sm:max-w-42">
                  <div className="flex flex-wrap items-center justify-center gap-1.5 self-stretch">
                    <div className="tracking-num-0.02 min-w-0 flex-1 truncate text-center text-sm font-extrabold uppercase sm:text-base">
                      {item.name}
                    </div>
                  </div>
                  <div className="text-body-foreground font-commissioner flex items-center justify-center gap-0.5 text-sm font-medium sm:text-base">
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
                onClick={() => setQuickBuyProduct(item)}
                className="font-commissioner rounded-num-6 sm:px-num-10 sm:text-num-14 py-num-8 mt-auto box-border flex h-10 w-full items-center justify-center gap-1.5 bg-active-bg px-4 text-foreground sm:gap-[5px]"
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
      {quickBuyProduct &&
        quickBuyPortalEl &&
        createPortal(
          <div className="fixed inset-0 z-90 overflow-x-hidden overflow-y-auto overscroll-contain">
            <div className="flex min-h-full justify-center px-4 py-10 sm:px-6 lg:px-8">
              <button
                type="button"
                className="fixed inset-0 bg-black/60"
                aria-label="Close quick buy dialog"
                onClick={() => setQuickBuyProduct(null)}
              />
              <div
                className="relative z-10 my-auto flex w-full max-w-[min(100vw-2rem,960px)] flex-col items-center overflow-visible"
                role="dialog"
                aria-modal="true"
              >
                <ShopProductDetailModal
                  product={quickBuyProduct}
                  onClose={() => setQuickBuyProduct(null)}
                />
              </div>
            </div>
          </div>,
          quickBuyPortalEl
        )}

      {allItems.length > 0 && (
        <div className="mt-6 flex w-full items-center justify-center gap-3 sm:mt-8 lg:mt-10">
          <button
            type="button"
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous page"
            className="border-border-subtle flex h-[30px] w-[30px] items-center justify-center rounded-full border border-solid bg-card-elevated shadow-[0px_15px_15px_rgba(0,0,0,0.01)] transition-opacity hover:not-disabled:opacity-80 disabled:opacity-25"
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

          <div className="border-border-subtle flex items-center gap-[7.5px] rounded-[30px] border-[1.5px] border-solid bg-card-elevated px-[9px] py-[9px] shadow-[0px_15px_15px_rgba(0,0,0,0.01)]">
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
            className="border-border-subtle flex h-[30px] w-[30px] items-center justify-center rounded-full border border-solid bg-card-elevated shadow-[0px_15px_15px_rgba(0,0,0,0.01)] transition-opacity hover:not-disabled:opacity-80 disabled:opacity-25"
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
      )}
    </div>
  )
}
