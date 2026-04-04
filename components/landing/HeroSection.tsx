'use client'

import { FunctionComponent } from 'react'

const tabs = [
  'Cashout',
  'Food',
  'Flights',
  'Groceries',
  'Shopping',
  'Clothing',
  'Gas/Oil',
  'Tickets',
  'Jewelry',
  'Rentals',
  'Streaming',
]

/** Category pills under the hero art — icon URL + label (+ optional primary style). */
const categoryChips: {
  icon: string
  label: string
  variant?: 'default' | 'primary'
}[] = [
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconsquaregridmagnifyingglass.svg',
    label: 'All Giftcards',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/icondollar.svg',
    label: 'Cashout',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconfoodbell.svg',
    label: 'Hotels',
    variant: 'primary',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconcookies.svg',
    label: 'Food',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconairplane.svg',
    label: 'Flights',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconapples.svg',
    label: 'Groceries',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconshoppingbag2.svg',
    label: 'Shopping',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconfashion.svg',
    label: 'Clothing',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/icongas.svg',
    label: 'Gas/Oil',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconticket.svg',
    label: 'Tickets',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconpeopleidcard.svg',
    label: 'Lifestyle',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/icondiamondshine.svg',
    label: 'Jewelry',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconcarfrontview.svg',
    label: 'Rentals',
  },
  {
    icon: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/iconclapboardwide.svg',
    label: 'Streaming',
  },
]

const chipLabelClass =
  'flex items-center justify-center mt-[-1px] font-14-semibold font-[number:var(--14-semibold-font-weight)] text-[#eeeeee] text-[length:var(--14-semibold-font-size)] text-center tracking-[var(--14-semibold-letter-spacing)] leading-[var(--14-semibold-line-height)] whitespace-nowrap [font-style:var(--14-semibold-font-style)]'

const HeroSection: FunctionComponent = () => {
  return (
    <section className="w-full bg-[#051329]">
      <div className="mx-auto w-full overflow-x-auto">
        {/* Hero banner: SVG background + copy + right illustration — height/width follow content */}
        <main className="flex w-full flex-col bg-[#051329] p-4 pb-0! md:p-8">
          <div className="relative flex w-full flex-col overflow-hidden rounded-lg bg-[#051329] bg-[url('/icons/hero-background.svg')] bg-cover bg-center bg-no-repeat">
            {/* Main content: copy (left) + illustration (right) */}
            <div className="relative z-10 flex w-full flex-1 flex-col gap-6 sm:gap-8 lg:flex-row lg:items-stretch lg:justify-between lg:gap-8">
              {/* Left column — headline & search */}
              <div className="flex w-full max-w-[676px] min-w-0 flex-1 flex-col items-stretch gap-3 px-5 pt-4 pb-8 text-left sm:gap-4 sm:px-8 xl:gap-5 xl:px-[75px] xl:py-10">
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
                  <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl border border-solid border-[#ffffff80] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] p-3 shadow-[0px_0px_0px_4px_#ffffff33] backdrop-blur-[12.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(12.5px)_brightness(100%)] sm:flex-nowrap sm:gap-0">
                    <div className="inline-flex min-w-0 flex-1 items-center gap-2.5">
                      <img
                        className="h-[18px] w-[18px] shrink-0"
                        alt="Icon magnifying"
                        src="https://c.animaapp.com/mng8f1pdQTkIkY/img/iconmagnifyingglass2.svg"
                      />
                      <input
                        className="min-w-0 flex-1 border-none bg-transparent p-0 text-left [font-family:'Commissioner',Helvetica] text-sm leading-6 font-bold tracking-[-0.16px] text-white shadow-none ring-0 ring-offset-0 outline-none placeholder:text-white/50 focus:border-transparent focus:shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none sm:text-base sm:leading-7"
                        placeholder="Search for any product or bundle"
                        type="text"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="Submit search"
                      className="shrink-0 cursor-pointer self-center border-0 bg-transparent p-0 transition-opacity hover:opacity-90 focus:ring-0 focus:outline-none active:opacity-80 sm:self-stretch"
                    >
                      <img
                        className="pointer-events-none h-auto w-[30.4px]"
                        alt=""
                        src="https://c.animaapp.com/mng8f1pdQTkIkY/img/button-6.svg"
                      />
                    </button>
                  </div>

                  <div className="flex w-full justify-center sm:justify-start">
                    <button
                      type="button"
                      className="inline-flex min-h-[44px] w-full max-w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-[#ffffff1a] px-4 py-2 text-center transition-colors hover:bg-[#ffffff26] focus:ring-0 focus:outline-none active:bg-[#ffffff1a] sm:min-h-0 sm:w-auto sm:max-w-none sm:justify-center"
                    >
                      <span className="-mt-px min-w-0 text-center [font-family:'Commissioner',Helvetica] text-sm font-bold tracking-[-0.16px] text-white sm:text-base sm:leading-7">
                        Explore all products
                      </span>
                      <img
                        className="mr-[-0.75px] h-[8.17px] w-[4.83px] shrink-0"
                        alt=""
                        src="https://c.animaapp.com/mng8f1pdQTkIkY/img/vector-19.svg"
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-start gap-x-3 gap-y-2 pt-4 sm:gap-3 lg:pt-8">
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
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---litecoin-ltc.svg"
                  />
                  <img
                    className="h-[28.5px] w-[28.5px]"
                    alt="Crypto logos USD"
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---usd-coin.svg"
                  />
                  <img
                    className="h-[28.5px] w-[28.5px]"
                    alt="Crypto logos tether"
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---tether.svg"
                  />
                  <img
                    className="h-[28.5px] w-[28.5px]"
                    alt="Crypto logos"
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---ethereum-eth.svg"
                  />
                  <img
                    className="h-[28.5px] w-[28.5px]"
                    alt="Crypto logos bitcoin"
                    src="https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---bitcoin-3.svg"
                  />
                </div>
              </div>

              {/* Right illustration — height follows width (aspect); no fixed 700px floor */}
              <div className="relative isolate aspect-[666/700] max-h-[min(90vh,720px)] w-full min-w-0 shrink-0 overflow-hidden lg:max-h-[min(92vh,900px)] lg:flex-1">
                <img
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover object-right"
                  src="/icons/hero-banner.svg"
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom tabs from old HeroSection, placed under header banner */}
      <div className="mx-auto w-full max-w-[1476.9px] px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
          {tabs.map((label) => (
            <div key={label} className="group relative w-auto">
              <div className="absolute inset-0 translate-y-1 rounded-[99px] bg-[#003bbf] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              <button
                type="button"
                className="relative z-10 flex min-h-[44px] w-full transform cursor-pointer items-center gap-2 rounded-[99px] border border-dashed border-gray-600 px-4 py-3 text-sm text-white/70 transition-all duration-200 group-hover:-rotate-1 hover:border-[#005eff] hover:bg-[#005eff] hover:text-white sm:w-auto sm:gap-1 sm:py-2 sm:text-base"
              >
                <img className="h-4 w-4 shrink-0" alt="" src="/icons/IconDollar.svg" />
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
