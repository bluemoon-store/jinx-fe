'use client'

import { FunctionComponent, useState } from 'react'

const Navbar: FunctionComponent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // start in dark mode (switch to the right / pink)
  const [themeSwitchOn, setThemeSwitchOn] = useState(true)

  const navLinks = [
    { label: 'Shop', href: '#', icon: '/icons/IconBasket1-1.svg' },
    { label: 'Drops', href: '#', icon: '/icons/IconGift1.svg' },
    { label: 'FAQs', href: '#', icon: '/icons/IconCircleQuestionmark.svg' },
    { label: 'Support', href: '#', icon: '/icons/IconRescueRing.svg' },
  ]

  return (
    <header className="text-whitesmoke-100 font-commissioner relative box-border flex h-14 w-full shrink-0 items-center justify-between gap-0 overflow-y-auto border-b border-solid border-gray-100 bg-transparent px-4 py-0 sm:h-[75px] sm:px-6 lg:px-8 xl:px-14 2xl:px-56">
      {/* Logo and nav links */}
      <nav className="flex h-14 flex-1 shrink-0 items-center gap-2 sm:gap-4 lg:gap-[15px]">
        <img
          className="h-8 w-14 shrink-0 sm:h-[45.3px] sm:w-[82px]"
          alt=""
          src="/icons/Jin X.svg"
        />
        <div className="h-num-19 hidden w-px shrink-0 border-r border-solid border-white opacity-[0.25] lg:block" />
        {/* Desktop nav links */}
        <div className="hidden items-center gap-2 opacity-75 lg:flex lg:gap-3.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="sm:px-num-4 flex items-center gap-1.5 px-2 py-2 sm:py-[13.6px]"
            >
              <img className="hidden h-[21px] w-[21px] lg:block" alt="" src={link.icon} />
              <span className="leading-num-20 text-sm font-semibold sm:text-base">
                {link.label}
              </span>
              {link.label !== 'FAQs' && link.label !== 'Support' && (
                <img className="hidden h-5 w-4 lg:block" alt="" src="/icons/Frame.svg" />
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Wallet and user actions - desktop */}
      <div className="hidden items-center gap-2 lg:flex">
        <div className="text-num-16 text-ghostwhite flex items-center justify-center gap-2 self-stretch rounded-xl py-[26px] text-left">
          <div className="flex shrink-0 items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setThemeSwitchOn((v) => !v)}
              className="rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 border border-solid bg-gray-300 pt-px pb-0.5 transition-colors duration-300 ease-out"
              aria-pressed={themeSwitchOn}
            >
              <img className="h-4 w-4" alt="" src="/icons/IconSun.svg" />
              {/* Inner switch track/handle (no icon) */}
              <div
                className={`relative h-[18px] w-[30.8px] rounded-[31.5px] transition-colors duration-300 ease-out ${
                  themeSwitchOn ? 'bg-fuchsia-200' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`absolute top-1/2 left-[4px] h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
                    themeSwitchOn ? 'translate-x-[10px]' : 'translate-x-0'
                  }`}
                />
              </div>
              <img className="h-4 w-4" alt="" src="/icons/IconMoon.svg" />
            </button>
            <button className="rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 border border-solid bg-gray-300 pt-px pb-0.5">
              <img className="h-4 w-4" alt="" src="/icons/IconRescueRing.svg" />
              <b className="tracking-num--0_01 leading-num-28">0</b>
            </button>
            <button className="rounded-num-8 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 bg-fuchsia-200 pt-px pb-0.5 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)]">
              <img className="h-4 w-4" alt="" src="/icons/IconBanknote2.svg" />
              <span className="tracking-num--0_01 leading-num-28 font-semibold">Wallet</span>
              <span className="font-nata-sans tracking-num--0_01 leading-num-28 font-extrabold">
                $0.00
              </span>
            </button>
          </div>
          <div className="h-num-19 w-px shrink-0 border-r border-solid border-white opacity-[0.25]" />
          <div className="flex h-[46px] shrink-0 items-center gap-2">
            <div className="rounded-num-8 border-whitesmoke-300 box-border flex h-[38px] w-[38px] items-center justify-center border border-solid bg-gray-300">
              <img className="h-[24px] w-[24px]" alt="" src="/icons/IconBasket1-2.svg" />
            </div>
            <div className="h-num-19 w-px shrink-0 border-r border-solid border-white opacity-[0.25]" />
            <img
              className="rounded-num-8 max-h-full w-10 shrink-0 object-cover"
              alt=""
              src="/icons/Ellipse 1.svg"
            />
          </div>
        </div>
      </div>

      {/* Mobile: wallet + menu button */}
      <div className="flex flex-1 items-center justify-end gap-2 lg:hidden">
        <div className="text-num-16 text-ghostwhite flex items-center justify-center gap-1 text-left sm:gap-2">
          <button className="rounded-num-8 box-border flex h-11 min-h-[44px] shrink-0 items-center justify-center gap-1 bg-fuchsia-200 px-3 pt-px pb-0.5 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.25)] sm:px-4">
            <img className="h-4 w-4" alt="" />
            <span className="font-nata-sans tracking-num--0_01 leading-num-28 text-sm font-extrabold sm:text-base">
              $0.00
            </span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 left-0 z-50 flex flex-col gap-2 border-b border-gray-100 bg-gray-400 px-4 py-4 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex min-h-[44px] items-center px-4 text-base font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar
