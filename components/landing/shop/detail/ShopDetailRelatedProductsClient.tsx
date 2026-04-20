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

export const ShopDetailRelatedProductsClient = ({ items: allItems }: Props) => {
  const [quickBuyProduct, setQuickBuyProduct] = useState<ProductQuickBuy | null>(null)
  const [quickBuyPortalEl, setQuickBuyPortalEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setQuickBuyPortalEl(document.body)
  }, [])

  return (
    <section className="overflow-x-hidden text-sm sm:text-base lg:text-lg">
      <Reveal variant="fade-up">
        <div className="mx-auto w-full max-w-[1476.9px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-2 text-center sm:gap-2.5 lg:gap-3">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <div className="tracking-num-0.02 text-xl font-extrabold sm:text-2xl lg:text-[32px]">
                MORE
              </div>
              <div className="font-heydex flex items-center gap-1.5 text-fuchsia-200 sm:gap-2">
                <div className="tracking-num-0.02 text-xl font-extrabold sm:text-2xl lg:text-[32px]">
                  PRODUCTS
                </div>
              </div>
              <div className="tracking-num-0.02 text-xl font-extrabold sm:text-2xl lg:text-[32px]">
                LIKE THIS
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

      <div className="mx-auto mt-6 w-full max-w-[1476.9px] px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8">
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
          {allItems.map((item, idx) => (
            <Reveal
              key={`${item.id}-${idx}`}
              variant="fade-up"
              delay={idx * 70}
              className="border-darkslateblue rounded-num-8 p-num-12 box-border flex h-full w-full flex-col items-stretch gap-2 border border-solid bg-gray-200"
            >
              <Link
                href={`/shop/${item.slug}`}
                className="flex w-full min-w-0 flex-1 flex-col items-center gap-2"
              >
                <div className="rounded-num-8 aspect-video w-full overflow-hidden shadow-[0px_0px_8.63px_rgba(0,0,0,0.6)]">
                  <img
                    className="h-full w-full object-cover"
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
                onClick={() => setQuickBuyProduct(item)}
                className="font-commissioner rounded-num-6 sm:px-num-10 sm:text-num-14 py-num-8 mt-auto box-border flex h-10 w-full shrink-0 items-center justify-center gap-1.5 bg-[#19263F] px-4 text-white sm:gap-[5px]"
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
      </div>
    </section>
  )
}
