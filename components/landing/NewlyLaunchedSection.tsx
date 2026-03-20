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
  { name: 'STARBUCKS', src: '/icons/starbucks.svg' },
  { name: 'TIM HORTONS', src: '/icons/starbucks.svg' },
  { name: 'NORD VPN', src: '/icons/starbucks.svg' },
  { name: 'INSTACART', src: '/icons/starbucks.svg' },
  { name: 'FANDUEL', src: '/icons/starbucks.svg' },
  // Page 2
  { name: 'NETFLIX', src: '/icons/starbucks.svg' },
  { name: 'AMAZON', src: '/icons/starbucks.svg' },
  { name: 'SPOTIFY', src: '/icons/starbucks.svg' },
  { name: 'APPLE', src: '/icons/starbucks.svg' },
  { name: 'GOOGLE PLAY', src: '/icons/starbucks.svg' },
  // Page 3
  { name: 'UBER', src: '/icons/starbucks.svg' },
  { name: 'DOORDASH', src: '/icons/starbucks.svg' },
  { name: 'GRUBHUB', src: '/icons/starbucks.svg' },
  { name: 'CHIPOTLE', src: '/icons/starbucks.svg' },
  { name: 'DOMINOS', src: '/icons/starbucks.svg' },
  // Page 4
  { name: 'XBOX', src: '/icons/starbucks.svg' },
  { name: 'PLAYSTATION', src: '/icons/starbucks.svg' },
  { name: 'STEAM', src: '/icons/starbucks.svg' },
  { name: 'ROBLOX', src: '/icons/starbucks.svg' },
  { name: 'NINTENDO', src: '/icons/starbucks.svg' },
  // Page 5
  { name: 'AIRBNB', src: '/icons/starbucks.svg' },
  { name: 'HOTELS.COM', src: '/icons/starbucks.svg' },
  { name: 'EXPEDIA', src: '/icons/starbucks.svg' },
  { name: 'DELTA', src: '/icons/starbucks.svg' },
  { name: 'UNITED', src: '/icons/starbucks.svg' },
]

const ITEMS_PER_PAGE = 5
const TOTAL_PAGES = Math.ceil(allItems.length / ITEMS_PER_PAGE)

export default function NewlyLaunchedSection() {
  const [page, setPage] = useState(0)

  const items = allItems.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))

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
          {items.map((item, idx) => (
            <Reveal
              key={item.name}
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
            </Reveal>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex w-full items-center justify-center gap-3 lg:mt-8">
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
