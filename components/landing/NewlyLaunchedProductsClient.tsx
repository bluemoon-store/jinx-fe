'use client'

import { CentralIcon } from '@central-icons-react/all'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import ShopProductDetailModal from '@/components/landing/shop/detail/ShopProductDetailModal'
import { Reveal } from '@/components/ui/reveal'
import type { ProductQuickBuy } from '@/types/product'

type Props = {
  items: ProductQuickBuy[]
}

export default function NewlyLaunchedProductsClient({ items: allItems }: Props) {
  const [quickBuyProduct, setQuickBuyProduct] = useState<ProductQuickBuy | null>(null)
  const [quickBuyPortalEl, setQuickBuyPortalEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setQuickBuyPortalEl(document.body)
  }, [])

  return (
    <div className="mx-auto mt-6 w-full max-w-[1476.9px] px-4 sm:px-6 lg:mt-10 lg:px-8">
      {allItems.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center text-sm">
          No new products available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-3 lg:gap-[17px] xl:grid-cols-5">
          {allItems.map((item, idx) => (
            <Reveal
              key={item.id}
              variant="fade-up"
              delay={idx * 70}
              className="rounded-num-8 box-border flex w-full flex-col items-center justify-center gap-2 p-3 [background:linear-gradient(180deg,_rgba(27,_217,_36,_0),_rgba(27,_217,_36,_0.15))_padding-box,_linear-gradient(var(--card),_var(--card))_padding-box,_linear-gradient(180deg,_rgba(27,_217,_36,_0),_rgba(27,_217,_36,_0.5))_border-box] [border:1px_solid_transparent]"
            >
              <Link href={`/shop/${item.slug}`} className="flex w-full flex-col gap-2">
                <img
                  className="rounded-num-8 aspect-video w-full object-cover shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]"
                  alt=""
                  src={item.primaryImageUrl ?? '/icons/placeholder.svg'}
                />
                <div className="flex w-full flex-col items-center gap-0.5">
                  <div className="flex flex-wrap items-center justify-center gap-1.5 self-stretch">
                    <div className="tracking-num-0_02 min-w-0 text-center text-sm font-extrabold uppercase lg:text-base">
                      {item.name}
                    </div>
                  </div>
                  <div className="font-commissioner text-body-foreground flex items-center justify-center gap-0.5 text-sm lg:text-base">
                    <div className="font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                      from{' '}
                    </div>
                    <div className="rounded-num-6 flex items-center justify-center px-1.5 py-0.5 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
                      <b className="[text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                        {item.fromPrice.startsWith('$') ? item.fromPrice : `$${item.fromPrice}`}
                      </b>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setQuickBuyProduct(item)}
                className="font-commissioner rounded-num-6 sm:px-num-10 sm:text-num-14 py-num-8 box-border flex h-10 w-full items-center justify-center gap-1.5 bg-[#1B3E3D] px-4 text-white sm:gap-[5px]"
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

      <Reveal variant="fade-up" delay={(allItems.length || 1) * 70}>
        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/shop"
            className="border-border-subtle rounded-num-30 font-commissioner bg-card-elevated text-foreground box-border inline-flex w-full max-w-md items-center justify-center gap-2.5 border-[1.5px] border-solid px-6 py-2.5 text-center text-base shadow-[0px_15px_15px_rgba(0,0,0,0.01)] transition-opacity hover:opacity-90 sm:w-auto"
          >
            <span className="leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              View All Products
            </span>
            <svg
              className="text-foreground h-2 w-[5px] shrink-0"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M1 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
