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

export default function SellingHotProductsClient({ items }: Props) {
  const [quickBuyProduct, setQuickBuyProduct] = useState<ProductQuickBuy | null>(null)
  const [quickBuyPortalEl, setQuickBuyPortalEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setQuickBuyPortalEl(document.body)
  }, [])

  return (
    <div className="mx-auto mt-8 w-full max-w-[1476.9px] px-4 sm:mt-10 sm:px-6 lg:px-8">
      {items.length === 0 ? (
        <div className="text-lightsteelblue-100 py-12 text-center text-sm">
          No hot products available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item, idx) => (
            <Reveal
              key={item.id}
              variant="scale-in"
              delay={idx * 70}
              className="max-w-num-281 w-full text-lg sm:text-[20px]"
            >
              <div className="block w-full">
                <div className="relative flex flex-col items-center pt-[50px] sm:pt-14">
                  <img
                    className="pointer-events-none absolute inset-x-0 top-6 bottom-0 z-0 mx-auto h-[calc(50%-24px)] w-[85%] object-cover"
                    alt=""
                    src="/icons/Vector 6.svg"
                  />

                  <div className="rounded-num-8 relative z-20 -mb-[44px] flex h-[88px] w-[88px] items-center justify-center overflow-hidden shadow-[0px_0px_8.63px_rgba(0,0,0,0.6)] sm:-mb-[45px] sm:h-[90px] sm:w-[90px]">
                    <img
                      className="h-full w-full object-cover"
                      alt={`${item.name} logo`}
                      src={item.iconUrl ?? item.primaryImageUrl ?? '/icons/placeholder.svg'}
                    />
                  </div>

                  <div
                    className="rounded-num-8 relative z-10 w-full overflow-hidden p-px"
                    style={{
                      boxShadow:
                        '0 0 4px 1px rgba(255,42,42,0.45), 0 0 14px 3px rgba(255,42,42,0.25), 0 0 28px 6px rgba(255,42,42,0.08)',
                    }}
                  >
                    <div
                      className="pointer-events-none absolute z-0 aspect-square w-[220%]"
                      style={{
                        top: '50%',
                        left: '50%',
                        background:
                          'conic-gradient(from 0deg, rgba(255,42,42,0.65) 0deg, rgba(255,107,107,0.7) 60deg, rgba(255,120,80,0.28) 120deg, rgba(255,120,80,0.18) 210deg, rgba(255,42,42,0.55) 260deg, rgba(255,107,107,0.6) 320deg)',
                        animation: 'border-spin 3.2s linear infinite',
                      }}
                    />

                    <div
                      className="rounded-num-8 relative z-10 flex flex-col items-center justify-end gap-3 px-3 pt-[56px] pb-3 sm:pt-[62px]"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255,42,42,0.04), rgba(255,42,42,0.18)), #0d1b35',
                      }}
                    >
                      <Link href={`/shop/${item.slug}`} className="block w-full min-w-0">
                        <div className="flex w-full max-w-full min-w-0 flex-col items-center gap-0.5">
                          <div className="flex w-full min-w-0 flex-col items-center gap-1">
                            <div className="flex w-full min-w-0 justify-center">
                              <div className="flex max-w-full min-w-0 items-center gap-[5px]">
                                <div className="tracking-num-0.02 min-w-0 truncate text-center font-extrabold uppercase">
                                  {item.name}
                                </div>
                                <img
                                  className="h-num-20.2 w-num-31 shrink-0"
                                  alt=""
                                  src="/icons/Hot.svg"
                                />
                              </div>
                            </div>
                            {item.flair?.trim() ? (
                              <span className="border-fuchsia-300/40 bg-fuchsia-500/15 text-fuchsia-100 max-w-full truncate rounded-full border border-solid px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                                {item.flair.trim()}
                              </span>
                            ) : null}
                          </div>
                          <div className="text-num-16 text-whitesmoke-200 font-commissioner flex items-center justify-center gap-0.5">
                            <div className="leading-num-24 font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                              from{' '}
                            </div>
                            <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-white [background:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.14))]">
                              <b className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                                {item.fromPrice.startsWith('$')
                                  ? item.fromPrice
                                  : `$${item.fromPrice}`}
                              </b>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setQuickBuyProduct(item)}
                        className="font-commissioner rounded-num-6 sm:px-num-10 sm:text-num-14 py-num-8 box-border flex h-10 w-full items-center justify-center gap-1.5 bg-[#48293D] px-4 text-white sm:gap-[5px]"
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
                        <span className="tracking-num--0_01 leading-num-24 font-semibold">
                          Quick Buy
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

      <Reveal variant="fade-up" delay={(items.length || 1) * 70}>
        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/shop"
            className="border-darkslateblue rounded-num-30 font-commissioner box-border inline-flex w-full max-w-md items-center justify-center gap-2.5 border-[1.5px] border-solid bg-gray-100 px-6 py-2.5 text-center text-base text-white shadow-[0px_15px_15px_rgba(0,0,0,0.01)] transition-opacity hover:opacity-90 sm:w-auto"
          >
            <span className="leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              View All Products
            </span>
            <svg
              className="h-2 w-[5px] shrink-0 text-white"
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
