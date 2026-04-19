/* eslint-disable react/no-unescaped-entities */
'use client'

import Link from 'next/link'
import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useState } from 'react'

import { useHotProductsQuery } from '@/hooks/use-products'

import { Reveal } from '@/components/ui/reveal'

export const HotSellingProducts: FunctionComponent = () => {
  const [isHidden, setIsHidden] = useState(false)
  const { data, isLoading } = useHotProductsQuery(10)

  const items = data?.items ?? []

  return (
    <>
      <Reveal variant="fade-up">
        <header className="text-whitesmoke-100 font-commissioner sm:text-num-14 box-border flex min-h-[56px] w-full items-center justify-between gap-2 overflow-y-auto border-b-[1px] border-solid border-gray-100 py-4 text-xs sm:min-h-[75px] sm:gap-4 lg:gap-4">
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-[5px]">
            <CentralIcon
              name="IconFire3"
              join="round"
              fill="filled"
              stroke="1"
              radius="1"
              size={20}
              color="#FF2A2A"
            />
            <div className="tracking-num-0_02 truncate text-xs font-extrabold sm:text-sm">
              HOT SELLING PRODUCTS
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsHidden((v) => !v)}
            className="border-darkslateblue font-commissioner sm:text-num-14 flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-3xl border-[1.2px] border-solid bg-[#0D1B35] px-4 py-2 text-xs text-white shadow-[0px_12px_12px_rgba(0,_0,_0,_0.01)] sm:gap-2"
          >
            <span className="leading-num-20 font-semibold">
              {isHidden ? 'Show Products' : 'Hide Products'}
            </span>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="filled"
              stroke="1"
              radius="1"
              size={20}
              className="transition-transform duration-300 ease-in-out"
              style={{ transform: isHidden ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
        </header>
      </Reveal>

      <section
        aria-hidden={isHidden}
        className={`grid w-full transition-[grid-template-rows,opacity] duration-200 ease-out ${
          isHidden ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        style={{
          gridTemplateRows: isHidden ? '0fr' : '1fr',
          willChange: 'grid-template-rows, opacity',
        }}
      >
        <div className="min-h-0 overflow-hidden">
          {isLoading ? (
            <div className="text-lightsteelblue-100 p-6 text-center text-sm">
              Loading hot products…
            </div>
          ) : (
            <div className="grid grid-cols-1 justify-items-center gap-4 p-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-6">
              {items.map((item, idx) => (
                <Reveal
                  key={item.id}
                  variant="fade-up"
                  delay={idx * 70}
                  rootMargin="0px 0px -20px 0px"
                  className="w-full"
                >
                  <Link
                    href={`/shop/${item.slug}`}
                    className="rounded-num-8 relative z-10 block w-full overflow-hidden p-px"
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
                      className="rounded-num-8 relative z-10 flex w-full min-w-0 flex-col overflow-hidden p-3"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255,42,42,0.04), rgba(255,42,42,0.18)), #0d1b35',
                      }}
                    >
                      <div className="flex w-full items-center gap-3 sm:gap-[17px]">
                        <img
                          className="h-12 w-12 shrink-0 scale-110 object-contain sm:h-[60px] sm:w-[60px]"
                          alt=""
                          src={item.primaryImageUrl ?? '/icons/best-buy.svg'}
                        />

                        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5 sm:gap-[5px]">
                          <div className="flex items-center gap-1 sm:gap-[5px]">
                            <div className="tracking-num-0_02 truncate text-sm leading-[20px] font-extrabold uppercase sm:text-base sm:leading-[20px]">
                              {item.name}
                            </div>
                            {item.isHot ? (
                              <div className="font-heydex flex items-center gap-1.5 text-[#FF2A2A] sm:gap-2">
                                <div className="tracking-num-0.02 text-base font-extrabold sm:text-lg">
                                  Hot
                                </div>
                              </div>
                            ) : null}
                          </div>
                          <div className="text-whitesmoke-300 font-commissioner sm:text-num-16 flex items-center gap-0.5 text-sm">
                            <div className="leading-num-24 font-medium text-[#C0BABF] [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">{`from `}</div>
                            <div className="rounded-num-6 py-num-0 flex items-center justify-center px-1.5 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
                              <b className="leading-num-24 [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                                {item.fromPrice.startsWith('$')
                                  ? item.fromPrice
                                  : `$${item.fromPrice}`}
                              </b>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
