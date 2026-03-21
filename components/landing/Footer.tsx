import Link from 'next/link'
import { FunctionComponent } from 'react'

const Footer: FunctionComponent = () => {
  return (
    <footer className="border-darkslateblue text-ghostwhite box-border flex w-full flex-col items-start gap-6 border-t border-solid bg-gray-500 px-4 py-4 text-left text-base sm:gap-8 sm:px-6 sm:py-8 sm:text-[18px] lg:gap-[41px] lg:px-8 lg:py-[60px] xl:px-14 2xl:px-[223px]">
      {/* Top row: logo, tagline, payment methods, support button */}
      <div className="flex w-full max-w-[1474px] flex-col content-center items-center gap-6 self-stretch sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-5 sm:gap-y-4 lg:flex-nowrap">
        <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-1 sm:flex-row sm:items-center sm:justify-start sm:gap-5">
          <img
            className="h-10 w-16 shrink-0 sm:h-[45.3px] sm:w-[82px]"
            alt=""
            src="/icons/Jin X.svg"
          />
          <div className="hidden h-4 w-px bg-white/25 sm:block" />
          <div className="tracking-num-0_02 text-center text-sm leading-[19px] font-black uppercase [text-shadow:0px_0px_9.29px_rgba(0,_0,_0,_0.6)] sm:text-left sm:text-base">
            Premium digital goods,
            <br />
            delivered fast.
          </div>
          <div className="hidden h-4 w-px bg-white/25 sm:block" />
          <div className="text-num-16 font-commissioner flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="tracking-num--0_01 leading-num-28 text-sm font-semibold sm:text-base">
              Pay securely using
            </div>
            <div className="flex items-center justify-center gap-2">
              <img
                className="rounded-num-6_2 h-[28.5px] w-[28.5px] shrink-0 object-contain"
                alt=""
                src="/icons/Crypto Logos/Bitcoin-1.svg"
              />
              <img
                className="rounded-num-6_2 h-[28.5px] w-[28.5px] shrink-0 object-contain"
                alt=""
                src="/icons/Crypto Logos/Litecoin LTC.svg"
              />
              <img
                className="rounded-num-6_2 h-[28.5px] w-[28.5px] shrink-0 object-contain"
                alt=""
                src="/icons/Crypto Logos/USD Coin.svg"
              />
              <img
                className="rounded-num-6_2 h-[28.5px] w-[28.5px] shrink-0 object-contain"
                alt=""
                src="/icons/Crypto Logos/Tether.svg"
              />
              <div className="rounded-num-6_2 flex h-[28.5px] w-[28.5px] shrink-0 items-center justify-center bg-white">
                <img
                  className="shrink-0 object-contain"
                  alt=""
                  src="/icons/Crypto Logos/Ethereum ETH.svg"
                />
              </div>
              <img
                className="rounded-num-6_2 h-[28.5px] w-[28.5px] shrink-0 object-contain"
                alt=""
                src="/icons/Crypto Logos/Bitcoin.svg"
              />
            </div>
          </div>
        </div>
        <div className="rounded-num-8 border-darkslateblue py-num-4 text-num-16 font-commissioner box-border flex h-12 min-h-[44px] w-full items-center justify-center gap-[8.8px] border border-solid bg-[#0D1B35] px-6 text-white sm:h-[41.7px] sm:min-h-0 sm:w-auto sm:self-start lg:shrink-0 lg:self-center">
          <img className="h-4 w-4" alt="" src="/icons/IconRescueRing.svg" />
          <b className="tracking-num--0_01 leading-num-28">Support</b>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-[var(--color-darkslateblue)]"></div>

      {/* Bottom row: settings, company links, socials */}
      <div className="text-num-15_35 text-lightsteelblue-200 flex w-full flex-col flex-wrap items-center gap-6 self-stretch sm:flex-row sm:items-start sm:justify-between sm:gap-5">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-[15px]">
          <div className="flex flex-col items-center sm:items-start">
            <b className="leading-num-21_93 uppercase">Settings</b>
          </div>
          <div className="text-ghostwhite font-commissioner flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-[9px] sm:text-center">
            <div className="flex w-full flex-col items-stretch sm:w-auto sm:items-start">
              <div className="border-darkslateblue box-border flex h-12 min-h-[44px] w-full min-w-0 items-center justify-between gap-[8.8px] rounded-[8.77px] border border-solid bg-[#0D1B35] px-4 py-[1.1px] sm:h-[39.5px] sm:min-h-0 sm:min-w-[193.02px] sm:px-[14.3px]">
                <div className="flex items-center gap-[8.8px]">
                  <img className="h-[19.7px] w-[19.7px]" alt="" src="/icons/SVG-1.svg" />
                  <div className="flex flex-col items-center overflow-hidden">
                    <div className="leading-num-21_93 font-semibold">English</div>
                  </div>
                </div>
                <img className="h-[21.9px] w-fit overflow-hidden" alt="" src="/icons/SVG.svg" />
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch sm:w-auto sm:items-start">
              <div className="border-darkslateblue box-border flex h-12 min-h-[44px] w-full min-w-0 items-center justify-between gap-[8.8px] rounded-[8.77px] border border-solid bg-[#0D1B35] px-4 py-[1.1px] sm:h-[39.5px] sm:min-h-0 sm:min-w-[193.02px] sm:px-[14.3px]">
                <div className="flex items-center gap-[8.8px]">
                  <img className="h-[19.7px] w-[19.7px]" alt="" src="/icons/IconMoon.svg" />
                  <div className="flex flex-col items-center overflow-hidden">
                    <div className="leading-num-21_93 font-semibold">Dark Mode</div>
                  </div>
                </div>
                <img className="h-[21.9px] w-fit overflow-hidden" alt="" src="/icons/SVG.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-[30px]">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <b className="leading-num-21_93 uppercase">Company</b>
            <div className="hidden h-1 w-[18px] border-b border-solid border-white object-contain opacity-[0.25] sm:block"></div>
            <div className="text-ghostwhite font-commissioner flex flex-wrap items-center justify-center gap-3 sm:gap-[15px]">
              <div className="flex flex-col items-center sm:items-start">
                <Link
                  href="/legal?section=terms"
                  className="rounded-num-8 leading-num-21.93 px-2 py-1 font-semibold transition-colors hover:bg-white/5"
                >
                  Terms
                </Link>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <Link
                  href="/legal?section=privacy"
                  className="rounded-num-8 leading-num-21.93 px-2 py-1 font-semibold transition-colors hover:bg-white/5"
                >
                  Privacy
                </Link>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <Link
                  href="/legal?section=refund"
                  className="rounded-num-8 leading-num-21.93 px-2 py-1 font-semibold transition-colors hover:bg-white/5"
                >
                  Refund
                </Link>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <Link
                  href="/legal?section=cookies"
                  className="rounded-num-8 leading-num-21.93 px-2 py-1 font-semibold transition-colors hover:bg-white/5"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden h-3.5 w-1 border-l border-solid border-white object-contain opacity-[0.25] sm:block"></div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <div className="flex flex-col items-center sm:items-start">
              <b className="leading-num-21_93 uppercase">Socials</b>
            </div>
            <div className="hidden h-1 w-[18px] border-b border-solid border-white object-contain opacity-[0.25] sm:block"></div>
            <div className="text-ghostwhite font-commissioner flex items-center justify-center gap-4 sm:gap-[15px]">
              <div className="flex flex-col items-center sm:items-start">
                <div className="rounded-num-8 flex cursor-pointer items-center gap-[4.4px] px-2 py-1 transition-colors hover:bg-white/5">
                  <img className="max-h-full w-[18px]" alt="" src="/icons/IconTelegram.svg" />
                  <div className="leading-num-21_93 font-semibold">Telegram</div>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="rounded-num-8 flex cursor-pointer items-center gap-[4.4px] px-2 py-1 transition-colors hover:bg-white/5">
                  <img className="max-h-full w-[18px]" alt="" src="/icons/SVG-2.svg" />
                  <div className="leading-num-21_93 font-semibold">Discord</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
