'use client'

import { CentralIcon } from '@central-icons-react/all'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ShopProductDetailModal from '@/components/landing/shop/detail/ShopProductDetailModal'
import { Reveal } from '@/components/ui/reveal'

const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const allItems = [
  // Page 1
  { name: 'STARBUCKS', src: '/icons/starbucks.svg' },
  { name: 'TIM HORTONS', src: '/icons/starbucks.svg' },
  { name: 'NORD VPN', src: '/icons/starbucks.svg' },
  { name: 'INSTACART', src: '/icons/starbucks.svg' },
  { name: 'FANDUEL', src: '/icons/starbucks.svg' },
]

export default function NewlyLaunchedSection() {
  const [quickBuyProduct, setQuickBuyProduct] = useState<{
    name: string
    imageSrc: string
  } | null>(null)
  const [quickBuyPortalEl, setQuickBuyPortalEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setQuickBuyPortalEl(document.body)
  }, [])

  return (
    <section className="text-base lg:text-[20px]">
      {/* Section header */}
      <Reveal variant="fade-up">
        <div className="mx-auto flex w-full max-w-[1476.9px] flex-col items-center gap-2 px-4 text-center sm:px-6 lg:gap-2.5 lg:px-8">
          <div className="font-heydex text-limegreen flex items-center gap-2 text-2xl lg:gap-2.5 lg:text-[32px]">
            <div className="flex items-center gap-1">
              <img className="h-5 w-5 lg:h-7 lg:w-7" alt="" src="/icons/IconStarLines.svg" />
              <div className="tracking-num-0_02">NEWLY</div>
            </div>
            <div className="tracking-num-0_02 font-nata-sans text-ghostwhite font-extrabold">
              LAUNCHED
            </div>
          </div>
          <div className="font-commissioner w-full max-w-[580px] text-sm font-medium text-white opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)] sm:text-base">
            Just added to Jinx Store, all new giftcards for you.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </Reveal>

      {/* Products grid */}
      <div className="mx-auto mt-6 w-full max-w-[1476.9px] px-4 sm:px-6 lg:mt-10 lg:px-8">
        <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-3 lg:gap-[17px] xl:grid-cols-5">
          {allItems.map((item, idx) => (
            <Reveal
              key={`${item.name}-${idx}`}
              variant="fade-up"
              delay={idx * 70}
              className="rounded-num-8 box-border flex w-full flex-col items-center justify-center gap-2.5 p-3 [background:linear-gradient(180deg,_rgba(27,_217,_36,_0),_rgba(27,_217,_36,_0.15))_padding-box,_linear-gradient(#0d1b35,_#0d1b35)_padding-box,_linear-gradient(180deg,_rgba(27,_217,_36,_0),_rgba(27,_217,_36,_0.5))_border-box] [border:1px_solid_transparent] lg:gap-3"
            >
              <Link href={`/shop/${slugify(item.name)}`} className="block w-full">
                <img
                  className="rounded-num-8 aspect-[257/125] w-full object-cover shadow-[0px_0px_8.63px_rgba(0,_0,_0,_0.6)]"
                  alt=""
                  src={item.src}
                />
                <div className="flex w-full flex-col items-center gap-0.5">
                  <div className="flex items-center justify-center self-stretch">
                    <div className="tracking-num-0_02 text-sm font-extrabold uppercase lg:text-base">
                      {item.name}
                    </div>
                  </div>
                  <div className="font-commissioner text-whitesmoke-200 flex items-center justify-center gap-0.5 text-sm lg:text-base">
                    <div className="font-medium [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                      from{' '}
                    </div>
                    <div className="rounded-num-6 flex items-center justify-center px-1.5 py-0.5 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
                      <b className="[text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">$2.50</b>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setQuickBuyProduct({ name: item.name, imageSrc: item.src })}
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
        {quickBuyProduct &&
          quickBuyPortalEl &&
          createPortal(
            <div className="fixed inset-0 z-90 flex items-center justify-center p-4 sm:p-6 lg:px-8">
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

        <Reveal variant="fade-up" delay={allItems.length * 70}>
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
    </section>
  )
}
