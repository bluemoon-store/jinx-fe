'use client'

import CentralIcon from '@central-icons-react/all'
import { CentralIconName } from '@central-icons-react/all/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useCallback, useState } from 'react'

const tabs = [
  {
    label: 'All Giftcards',
    icon: 'IconSquareGridMagnifyingGlass',
  },
  {
    label: 'Cashout',
    icon: 'IconDollar',
  },
  {
    label: 'Hotels',
    icon: 'IconFoodBell',
  },
  {
    label: 'Food',
    icon: 'IconCookies',
  },
  {
    label: 'Flights',
    icon: 'IconAirplane',
  },
  {
    label: 'Groceries',
    icon: 'IconApples',
  },
  {
    label: 'Shopping',
    icon: 'IconShoppingBag2',
  },
  {
    label: 'Clothing',
    icon: 'IconFashion',
  },
  {
    label: 'Gas/Oil',
    icon: 'IconGas',
  },
  {
    label: 'Tickets',
    icon: 'IconTicket',
  },
  {
    label: 'Lifestyle',
    icon: 'IconPeopleIdCard',
  },
  {
    label: 'Jewelry',
    icon: 'IconDiamondShine',
  },
  {
    label: 'Rentals',
    icon: 'IconCarFrontView',
  },
  {
    label: 'Streaming',
    icon: 'IconClapboardWide',
  },
]

const HeroSection: FunctionComponent = () => {
  const router = useRouter()
  const [heroSearchQuery, setHeroSearchQuery] = useState('')

  const goToShopWithSearch = useCallback(() => {
    const q = heroSearchQuery.trim()
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
  }, [heroSearchQuery, router])

  return (
    <section className="w-full bg-[#051329]">
      {/* Match SellingSection / NewlyLaunchedSection: centered column max width */}
      <div className="mx-auto w-full max-w-[1476.9px] overflow-x-auto px-4 sm:px-6 lg:px-8">
        {/* Hero banner: SVG background + copy + right illustration — height/width follow content */}
        <main className="flex w-full flex-col bg-[#051329] pt-4 pb-0 md:pt-8">
          {/*
            Canvas matches hero-background.png (1476×700). Right art is hero-banner.svg (666×700)
            — same height as the background so the illustration aligns without crop or extra gutter.
          */}
          <div className="relative w-full overflow-hidden rounded-lg bg-[#051329] lg:aspect-[1476/700]">
            <div
              className="pointer-events-none absolute inset-0 bg-[url('/icons/hero-background.png')] bg-cover bg-center bg-no-repeat"
              aria-hidden
            />
            {/* Main content: copy (left) + illustration (right) */}
            <div className="relative z-10 flex w-full flex-1 flex-col gap-6 sm:gap-8 lg:h-full lg:min-h-0 lg:flex-row lg:items-stretch lg:justify-between lg:gap-0">
              {/* Left column — headline & search */}
              <div className="flex w-full max-w-[676px] min-w-0 flex-1 flex-col gap-0 px-5 pt-4 pb-8 text-left sm:px-8 lg:h-full lg:min-h-0 lg:pb-10 xl:px-[75px] xl:py-10">
                {/* Sale → Explore: vertically nudged toward middle on lg; Pay row stays at bottom */}
                <div className="flex flex-col gap-3 sm:gap-4 lg:min-h-0 lg:flex-1 lg:justify-center xl:gap-5">
                  {/* Promo pill — stacks on narrow viewports, wraps long copy */}
                  <div className="flex w-full max-w-full min-w-0 flex-col items-center justify-center gap-2 rounded-[60.94px] border-[0.5px] border-solid border-[#ffffff40] px-2 py-2 text-center shadow-[inset_0px_1px_0px_#ffffff40] [background:radial-gradient(50%_50%_at_47%_-32%,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.08)_100%)] sm:flex-row sm:items-center sm:justify-start sm:gap-[29.73px] sm:px-0 sm:py-1 sm:pr-3 sm:pl-1 sm:text-left">
                    <div className="inline-flex w-fit shrink-0 items-center justify-center gap-[5px]">
                      <div className="inline-flex items-center justify-center gap-[2.5px] rounded-[33px] border border-solid border-[#eeeeee80] bg-white px-2 py-1 shadow-[0px_1px_1px_#0000000f]">
                        <img
                          className="h-[14.57px] w-[14.57px] shrink-0"
                          alt="Icon percent"
                          src="https://c.animaapp.com/mng8f1pdQTkIkY/img/iconpercent.svg"
                        />
                        <div className="-mt-px [font-family:'Commissioner',Helvetica] text-sm leading-5 font-bold tracking-[0] text-[#d625fb]">
                          SALE
                        </div>
                      </div>
                    </div>
                    <p className="w-full min-w-0 flex-1 text-center [font-family:'Commissioner',Helvetica] text-sm leading-snug font-medium tracking-[0] text-white sm:text-left sm:text-base sm:leading-6">
                      Launch Offer for all New Users | 5% OFF on all purchases
                    </p>
                  </div>

                  <p className="max-w-full text-center [font-family:'Nata_Sans',Helvetica] text-[clamp(1.625rem,4vw+1rem,3.5rem)] leading-[1.05] font-black tracking-[-0.03em] text-balance text-[#faf7ff] sm:text-left sm:leading-[1] sm:tracking-[-0.56px]">
                    <span className="sm:tracking-[-0.31px]">THE </span>
                    <span className="underline sm:tracking-[-0.31px]">ONE STOP</span>
                    <span className="sm:tracking-[-0.31px]"> STORE FOR ALL DIGITAL PURCHASES</span>
                  </p>

                  <p className="max-w-full text-center [font-family:'Commissioner',Helvetica] text-lg leading-snug font-medium tracking-[0] text-pretty text-white sm:text-left sm:text-xl sm:leading-[26px]">
                    The fastest way to grab digital goods with zero friction.
                  </p>

                  <div className="flex w-full max-w-[571px] min-w-0 flex-col items-stretch justify-center gap-4">
                    <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl border border-solid border-[#ffffff80] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] p-2 shadow-[0px_0px_0px_4px_#ffffff33] backdrop-blur-[12.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(12.5px)_brightness(100%)] sm:flex-nowrap sm:gap-0">
                      <div className="inline-flex min-w-0 flex-1 items-center gap-2.5">
                        <img
                          className="h-[18px] w-[18px] shrink-0"
                          alt="Icon magnifying"
                          src="https://c.animaapp.com/mng8f1pdQTkIkY/img/iconmagnifyingglass2.svg"
                        />
                        <input
                          value={heroSearchQuery}
                          onChange={(e) => setHeroSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              goToShopWithSearch()
                            }
                          }}
                          className="min-w-0 flex-1 border-none bg-transparent p-0 text-left [font-family:'Commissioner',Helvetica] text-sm leading-6 font-normal tracking-[-0.16px] text-white/75 shadow-none ring-0 ring-offset-0 outline-none placeholder:text-white/37.5 focus:border-transparent focus:shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none sm:text-base sm:leading-7"
                          placeholder="Search for any product or bundle"
                          type="text"
                          enterKeyHint="search"
                          autoComplete="off"
                          inputMode="search"
                        />
                      </div>
                      <button
                        type="button"
                        aria-label="Submit search"
                        onClick={goToShopWithSearch}
                        className="inline-flex size-5 size-[28px] shrink-0 cursor-pointer items-center justify-center self-center rounded-full rounded-md border-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_100%)] p-1.5 transition-[opacity,background-color] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.12)_100%)] hover:opacity-100 focus:outline-none active:opacity-90 sm:self-stretch"
                      >
                        <CentralIcon
                          name="IconChevronRightSmall"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={18}
                          color="#FFFFFF"
                          ariaHidden={true}
                        />
                      </button>
                    </div>

                    <div className="flex w-full justify-center sm:justify-start">
                      <Link
                        href="/shop"
                        className="inline-flex min-h-[44px] w-full max-w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-[#ffffff1a] px-4 py-2 text-center transition-colors hover:bg-[#ffffff26] focus:ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:bg-[#ffffff1a] sm:min-h-0 sm:w-auto sm:max-w-none sm:justify-center"
                      >
                        <span className="-mt-px min-w-0 text-center [font-family:'Commissioner',Helvetica] text-sm font-bold tracking-[-0.16px] text-white sm:text-base sm:leading-7">
                          Explore all products
                        </span>
                        <CentralIcon
                          name="IconChevronRightSmall"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={18}
                          color="#FFFFFF"
                          ariaHidden={true}
                          className="shrink-0"
                        />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center justify-start gap-x-3 gap-y-2 pt-4 sm:gap-3 lg:pt-8">
                  <div className="min-w-0 [font-family:'Commissioner',Helvetica] text-sm leading-snug font-semibold tracking-[-0.16px] text-[#faf7ff] sm:text-base sm:leading-7">
                    Pay securely using
                  </div>
                  <img
                    className="h-[28.5px] w-[28.5px]"
                    alt="Crypto logos bitcoin"
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---bitcoin-11.svg"
                  />
                  <img
                    className="h-[28.5px] w-[28.5px]"
                    alt="Crypto logos"
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---ethereum-eth.svg"
                  />
                  <img
                    className="h-[28.5px] w-[28.5px]"
                    alt="Crypto logos tether"
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---tether.svg"
                  />
                  <img
                    className="h-[28.5px] w-[28.5px]"
                    alt="Crypto logos"
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---litecoin-ltc.svg"
                  />
                  <img
                    className="h-[28.5px] w-[28.5px]"
                    alt="Crypto logos bitcoin"
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---bitcoin-3.svg"
                  />
                </div>
              </div>

              {/* Right illustration — 666/1476 of row width × full height; matches background art */}
              <div className="relative isolate w-full shrink-0 lg:h-full lg:w-[calc(666/1476*100%)] lg:max-w-none lg:min-w-0 lg:self-stretch">
                <img
                  alt=""
                  aria-hidden
                  className="block h-auto w-full max-w-none object-contain object-right lg:h-full lg:w-full lg:object-contain lg:object-right"
                  src="/icons/hero-banner.svg"
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom tabs from old HeroSection, placed under header banner */}
      <div className="mx-auto w-full max-w-[1476.9px] px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        <div className="font-commissioner flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
          {tabs.map(({ label, icon }) => (
            <div key={label} className="group relative w-auto">
              <div className="absolute inset-0 translate-y-1 rounded-[99px] bg-[#003bbf] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              <button
                type="button"
                className="relative z-10 flex min-h-[44px] w-full transform cursor-pointer items-center gap-2 rounded-[99px] border border-dashed border-gray-600 px-4 py-3 text-sm text-white/70 transition-all duration-200 group-hover:-rotate-1 hover:border-[#005eff] hover:bg-[#005eff] hover:text-white sm:w-auto sm:gap-1 sm:py-2 sm:text-base"
              >
                <CentralIcon
                  name={icon as CentralIconName}
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={18}
                  color="#FFFFFF"
                  ariaHidden={true}
                />
                <span className="leading-5 font-semibold">{label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
