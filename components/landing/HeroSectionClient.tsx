'use client'

import CentralIcon from '@central-icons-react/all'
import { CentralIconName } from '@central-icons-react/all/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useCallback, useMemo, useState, useEffect } from 'react'

import type { ProductCategory } from '@/types/product'

type Props = {
  categories: ProductCategory[]
}

const HeroSectionClient: FunctionComponent<Props> = ({ categories }) => {
  const router = useRouter()
  const [heroSearchQuery, setHeroSearchQuery] = useState('')
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false)

  // Preload the background image
  useEffect(() => {
    const img = new Image()
    img.onload = () => setIsBackgroundLoaded(true)
    img.src = '/icons/Main-Background-Hero.webp'
  }, [])

  const categoryTabs = useMemo(
    () => [
      {
        name: 'All Giftcards',
        slug: '',
        icon: 'IconSquareGridMagnifyingGlass',
      },
      ...categories.map((c) => ({ name: c.name, slug: c.slug, icon: c.icon })),
    ],
    [categories]
  )

  const goToShopWithSearch = useCallback(() => {
    const q = heroSearchQuery.trim()
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
  }, [heroSearchQuery, router])

  const goToShopWithCategory = useCallback(
    (slug: string) => {
      if (!slug) {
        router.push('/shop')
        return
      }
      router.push(`/shop?category=${encodeURIComponent(slug)}`)
    },
    [router]
  )

  return (
    <section className="bg-background w-full dark:bg-[#051329]">
      <div className="mx-auto w-full max-w-[1476.9px] overflow-x-auto px-4 sm:px-6 lg:px-8">
        <main className="bg-background flex w-full flex-col pt-4 pb-0 md:pt-8 dark:bg-[#051329]">
          <div className="bg-card relative w-full overflow-hidden rounded-lg lg:aspect-[1476/700] dark:bg-[#051329]">
            <div
              className={`pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_0%,rgba(59,130,246,0.14)_0%,rgba(59,130,246,0)_100%)] transition-opacity duration-500 dark:bg-cover dark:bg-center dark:bg-no-repeat ${
                isBackgroundLoaded 
                  ? 'dark:bg-[url(\'/icons/Main-Background-Hero.webp\')] dark:opacity-100' 
                  : 'dark:opacity-80'
              }`}
              aria-hidden
            />
            <div className="relative z-10 flex w-full flex-1 flex-col gap-6 sm:gap-8 lg:h-full lg:min-h-0 lg:flex-row lg:items-stretch lg:justify-between lg:gap-0">
              <div className="flex w-full max-w-[676px] min-w-0 flex-1 flex-col gap-0 px-5 pt-4 pb-8 text-left sm:px-8 lg:h-full lg:min-h-0 lg:pb-10 xl:px-[75px] xl:py-10">
                <div className="flex flex-col gap-3 sm:gap-4 lg:min-h-0 lg:flex-1 lg:justify-center xl:gap-5">
                  <div className="border-border-subtle bg-card-elevated flex w-full max-w-full min-w-0 flex-col items-center justify-center gap-2 rounded-[60.94px] border-[0.5px] border-solid px-2 py-2 text-center sm:flex-row sm:items-center sm:justify-start sm:gap-2 sm:px-0 sm:py-1 sm:pr-3 sm:pl-1 sm:text-left dark:border-[#ffffff40] dark:shadow-[inset_0px_1px_0px_#ffffff40] dark:[background:radial-gradient(50%_50%_at_47%_-32%,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.08)_100%)]">
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
                    <p className="text-foreground w-full min-w-0 flex-1 text-center [font-family:'Commissioner',Helvetica] text-sm leading-snug font-medium tracking-[0] sm:text-left sm:text-base sm:leading-6 dark:text-white">
                      Launch Offer for all New Users | 5% OFF on all purchases
                    </p>
                  </div>

                  <p className="text-foreground max-w-full text-center [font-family:'Nata_Sans',Helvetica] text-[clamp(1.625rem,4vw+1rem,3.5rem)] leading-[1.05] font-black tracking-[-0.03em] text-balance sm:text-left sm:leading-[1] sm:tracking-[-0.56px] dark:text-[#faf7ff]">
                    <span className="sm:tracking-[-0.31px]">THE </span>
                    <span className="underline sm:tracking-[-0.31px]">ONE STOP</span>
                    <span className="sm:tracking-[-0.31px]"> STORE FOR ALL DIGITAL PURCHASES</span>
                  </p>

                  <p className="text-muted-foreground max-w-full text-center [font-family:'Commissioner',Helvetica] text-lg leading-snug font-medium tracking-[0] text-pretty sm:text-left sm:text-xl sm:leading-[26px] dark:text-white">
                    The fastest way to grab digital goods with zero friction.
                  </p>

                  <div className="flex w-full max-w-[571px] min-w-0 flex-col items-stretch justify-center gap-4">
                    <div className="border-border-subtle bg-card flex w-full min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl border border-solid p-2 backdrop-blur-[12.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(12.5px)_brightness(100%)] sm:flex-nowrap sm:gap-0 dark:border-[#ffffff80] dark:shadow-[0px_0px_0px_4px_#ffffff33] dark:[background:linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]">
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
                          className="text-foreground/80 placeholder:text-foreground/45 min-w-0 flex-1 border-none bg-transparent p-0 text-left [font-family:'Commissioner',Helvetica] text-sm leading-6 font-normal tracking-[-0.16px] shadow-none ring-0 ring-offset-0 outline-none focus:border-transparent focus:shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none sm:text-base sm:leading-7 dark:text-white/75 dark:placeholder:text-white/37.5"
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
                        className="bg-foreground/10 hover:bg-foreground/15 inline-flex size-5 size-[28px] shrink-0 cursor-pointer items-center justify-center self-center rounded-full rounded-md border-0 p-1.5 transition-[opacity,background-color] hover:opacity-100 focus:outline-none active:opacity-90 sm:self-stretch dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_100%)] dark:hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.12)_100%)]"
                      >
                        <CentralIcon
                          name="IconChevronRightSmall"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={18}
                          className="text-foreground dark:text-white"
                          ariaHidden={true}
                        />
                      </button>
                    </div>

                    <div className="flex w-full justify-center sm:justify-start">
                      <Link
                        href="/shop"
                        className="bg-foreground/10 hover:bg-foreground/15 focus-visible:ring-foreground/30 inline-flex min-h-[44px] w-full max-w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-0 px-4 py-2 text-center transition-colors focus:ring-0 focus:outline-none focus-visible:ring-2 active:bg-[#ffffff1a] sm:min-h-0 sm:w-auto sm:max-w-none sm:justify-center dark:bg-[#ffffff1a] dark:hover:bg-[#ffffff26] dark:focus-visible:ring-white/30"
                      >
                        <span className="text-foreground -mt-px min-w-0 text-center [font-family:'Commissioner',Helvetica] text-sm font-bold tracking-[-0.16px] sm:text-base sm:leading-7 dark:text-white">
                          Explore all products
                        </span>
                        <CentralIcon
                          name="IconChevronRightSmall"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={18}
                          className="text-foreground shrink-0 dark:text-white"
                          ariaHidden={true}
                        />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center justify-start gap-x-3 gap-y-2 pt-4 sm:gap-3 lg:pt-8">
                  <div className="text-foreground min-w-0 [font-family:'Commissioner',Helvetica] text-sm leading-snug font-semibold tracking-[-0.16px] sm:text-base sm:leading-7 dark:text-[#faf7ff]">
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

              <div className="relative isolate w-full shrink-0 lg:h-full lg:w-[calc(666/1476*100%)] lg:max-w-none lg:min-w-0 lg:self-stretch">
                {/* Loading placeholder */}
                {!isImageLoaded && (
                  <div className="bg-muted/30 animate-pulse absolute inset-0 rounded-lg lg:rounded-none">
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="bg-muted/50 h-24 w-24 rounded-lg" />
                    </div>
                  </div>
                )}
                
                <img
                  alt=""
                  aria-hidden
                  className={`block h-auto w-full max-w-none object-contain object-right transition-opacity duration-300 lg:h-full lg:w-full lg:object-contain lg:object-right ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  src="/icons/hero-banner.svg"
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="mx-auto w-full max-w-[1776.9px] px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        <div className="font-commissioner flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categoryTabs.map(({ name, slug, icon }) => (
            <div key={slug || 'all'} className="group relative w-auto">
              <div className="absolute inset-0 translate-y-1 rounded-[99px] bg-[#2563eb] opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-[#003bbf]" />

              <button
                type="button"
                onClick={() => goToShopWithCategory(slug)}
                className="border-border-subtle bg-card text-foreground/80 relative z-10 flex min-h-[44px] w-full transform cursor-pointer items-center gap-2 rounded-[99px] border border-dashed px-4 py-3 text-[14px] leading-5 transition-all duration-200 group-hover:-rotate-1 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white sm:w-auto sm:gap-1 sm:py-2 dark:border-gray-600 dark:bg-transparent dark:text-white/70 dark:hover:border-[#005eff] dark:hover:bg-[#005eff]"
              >
                <CentralIcon
                  name={icon as CentralIconName}
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={18}
                  className="text-foreground/80 group-hover:text-white dark:text-white/70"
                  ariaHidden={true}
                />
                <span className="leading-5 font-bold tracking-[0]">{name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSectionClient
