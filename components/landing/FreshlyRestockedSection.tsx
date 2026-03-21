'use client'

import { CentralIcon } from '@central-icons-react/all'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
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
  { name: 'AIRBNB', src: '/icons/airbnb.svg' },
  { name: 'VENMO', src: '/icons/airbnb.svg' },
  { name: 'DUNKIN', src: '/icons/airbnb.svg' },
  { name: 'AFFIRM', src: '/icons/airbnb.svg' },
  { name: 'MOD PIZZA', src: '/icons/airbnb.svg' },
  // Page 2
  { name: 'FIVE BELOW', src: '/icons/airbnb.svg' },
  { name: 'SHIPT', src: '/icons/airbnb.svg' },
  { name: 'TACO BELL', src: '/icons/airbnb.svg' },
  { name: 'BURGER KING', src: '/icons/airbnb.svg' },
  { name: 'SEAT GEEK', src: '/icons/airbnb.svg' },
  // Page 3
  { name: 'WALMART', src: '/icons/airbnb.svg' },
  { name: 'TARGET', src: '/icons/airbnb.svg' },
  { name: 'BEST BUY', src: '/icons/airbnb.svg' },
  { name: 'COSTCO', src: '/icons/airbnb.svg' },
  { name: 'CVS', src: '/icons/airbnb.svg' },
  // Page 4
  { name: 'HOME DEPOT', src: '/icons/airbnb.svg' },
  { name: 'IKEA', src: '/icons/airbnb.svg' },
  { name: 'WAYFAIR', src: '/icons/airbnb.svg' },
  { name: 'OVERSTOCK', src: '/icons/airbnb.svg' },
  { name: 'BED BATH', src: '/icons/airbnb.svg' },
  // Page 5
  { name: 'GAP', src: '/icons/airbnb.svg' },
  { name: 'H&M', src: '/icons/airbnb.svg' },
  { name: 'ZARA', src: '/icons/airbnb.svg' },
  { name: 'NIKE', src: '/icons/airbnb.svg' },
  { name: 'ADIDAS', src: '/icons/airbnb.svg' },
]

const ITEMS_PER_PAGE = 5
const TOTAL_PAGES = Math.ceil(allItems.length / ITEMS_PER_PAGE)

export default function FreshlyRestockedSection() {
  const [page, setPage] = useState(0)

  const items = allItems.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))

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
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
          {items.map((item, idx) => (
            <Reveal
              key={item.name}
              variant="fade-up"
              delay={idx * 70}
              className="border-darkslateblue rounded-num-8 xl:p-num-12 box-border flex w-full flex-col items-center justify-center gap-2.5 border border-solid bg-[#0D1B35] p-4 sm:gap-3 sm:p-5 lg:p-6"
            >
              <Link href={`/shop/${slugify(item.name)}`} className="block w-full">
                <img
                  className="rounded-num-8 aspect-video w-full object-cover shadow-[0px_0px_8.63px_rgba(0,0,0,0.6)]"
                  alt=""
                  src={item.src}
                />
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
                        $2.50
                      </b>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

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
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
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
            disabled={page === TOTAL_PAGES - 1}
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
