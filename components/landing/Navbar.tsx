'use client'

import { useAuthModal } from '@/components/auth/auth-modal-context'
import { useAppStore } from '@/lib/store'
import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent, useState } from 'react'

const Navbar: FunctionComponent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { openAuthModal, isAuthenticated } = useAuthModal()
  const logout = useAppStore((s) => s.logout)
  // start in dark mode (switch to the right / pink)
  const [themeSwitchOn, setThemeSwitchOn] = useState(true)
  const isLoggedIn = isAuthenticated

  const navLinks = [
    { label: 'Shop', href: '/shop', icon: 'IconBasket1' },
    { label: 'Drops', href: '#', icon: 'IconGift1' },
    { label: 'FAQs', href: '/faqs', icon: 'IconCircleQuestionmark' },
    { label: 'Support', href: '#', icon: 'IconRescueRing' },
  ]

  const isActiveLink = (href: string) => {
    if (!href.startsWith('/')) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="text-whitesmoke-100 font-commissioner fixed top-0 right-0 left-0 z-50 box-border flex h-14 w-full shrink-0 items-center justify-between gap-0 overflow-y-auto border-b border-solid border-gray-100 bg-gray-400/80 px-4 py-0 backdrop-blur sm:h-[75px] sm:px-6 lg:px-8 xl:px-14 2xl:px-56">
      {/* Logo and nav links */}
      <nav className="flex h-14 flex-1 shrink-0 items-center gap-2 sm:gap-4 lg:gap-[15px]">
        <Link href="/" className="shrink-0">
          <img
            className="h-8 w-14 sm:h-[45.3px] sm:w-[82px]"
            alt="Bluemoon"
            src="/icons/Jin X.svg"
          />
        </Link>
        <div className="h-num-19 hidden w-px shrink-0 border-r border-solid border-white opacity-[0.25] lg:block" />
        {/* Desktop nav links */}
        <div className="hidden items-center gap-2 lg:flex lg:gap-3.5">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href)
            const className = `sm:px-num-12 flex items-center gap-1.5 rounded-num-8 px-2 py-2 sm:py-[13.6px] ${
              isActive
                ? 'opacity-100'
                : 'opacity-75 transition-colors hover:bg-[#121F34] hover:opacity-100'
            }`
            const content = (
              <>
                <CentralIcon
                  name={link.icon as any}
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={21}
                  color={isActive ? '#EB2DFF' : undefined}
                  ariaHidden={true}
                />
                <span className="leading-num-20 text-sm font-semibold sm:text-base">
                  {link.label}
                </span>
              </>
            )
            return link.href.startsWith('/') ? (
              <Link
                key={link.label}
                href={link.href as Route}
                className={className}
                aria-current={isActive ? 'page' : undefined}
              >
                {content}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={className}>
                {content}
              </a>
            )
          })}
        </div>
      </nav>

      {/* Wallet and user actions - desktop */}
      <div className="hidden items-center gap-2 lg:flex">
        <div className="text-num-16 text-ghostwhite flex items-center justify-center gap-2 self-stretch rounded-xl py-[26px] text-left">
          <div className="flex shrink-0 items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setThemeSwitchOn((v) => !v)}
              className="rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 border border-solid bg-gray-700 pt-px pb-0.5 transition-colors duration-300 ease-out"
              aria-pressed={themeSwitchOn}
            >
              <CentralIcon
                name="IconSun"
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={20}
                ariaHidden={true}
              />
              {/* Inner switch track/handle (no icon) */}
              <div
                className={`h-num-18 relative w-[30.8px] rounded-[31.5px] transition-colors duration-300 ease-out ${
                  themeSwitchOn ? 'bg-fuchsia-200' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`left-num-4 absolute top-1/2 h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
                    themeSwitchOn ? 'translate-x-[10px]' : 'translate-x-0'
                  }`}
                />
              </div>
              <CentralIcon
                name="IconMoon"
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={20}
                ariaHidden={true}
              />
            </button>
            {isLoggedIn ? (
              <>
                <button className="rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 border border-solid bg-gray-700 pt-px pb-0.5">
                  <img className="h-4 w-4" alt="" src="/icons/IconRescueRing.svg" />
                  <b className="tracking-num--0_01 leading-num-28">0</b>
                </button>
                <button className="rounded-num-8 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 bg-fuchsia-200 pt-px pb-0.5 text-white shadow-[0px_2px_0px_rgba(235,45,255,0.25)]">
                  <img className="h-4 w-4" alt="" src="/icons/IconBanknote2.svg" />
                  <span className="tracking-num--0_01 leading-num-28 font-semibold">Wallet</span>
                  <span className="font-nata-sans tracking-num--0_01 leading-num-28 font-extrabold">
                    $0.00
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 border border-solid bg-gray-700 pt-px pb-0.5 text-white"
                >
                  <span className="tracking-num--0_01 leading-num-28 font-semibold">Log In</span>
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('signup')}
                  className="rounded-num-8 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 bg-fuchsia-200 pt-px pb-0.5 text-white shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
                >
                  <CentralIcon
                    name="IconPeople"
                    join="round"
                    fill="filled"
                    stroke="1"
                    radius="1"
                    size={16}
                    ariaHidden={true}
                  />
                  <span className="tracking-num--0_01 leading-num-28 font-semibold">
                    Create Account
                  </span>
                </button>
              </>
            )}
          </div>
          {isLoggedIn && (
            <>
              <div className="h-num-19 w-px shrink-0 border-r border-solid border-white opacity-[0.25]" />
              <div className="flex h-[46px] shrink-0 items-center gap-2">
                <div className="rounded-num-8 border-whitesmoke-300 box-border flex h-[38px] w-[38px] items-center justify-center border border-solid bg-gray-700">
                  <img className="h-[24px] w-[24px]" alt="" src="/icons/IconBasket1-2.svg" />
                </div>
                <div className="h-num-19 w-px shrink-0 border-r border-solid border-white opacity-[0.25]" />
                <img
                  className="rounded-num-8 max-h-full w-10 shrink-0 object-cover"
                  alt=""
                  src="/icons/Ellipse 1.svg"
                />
                <button
                  type="button"
                  onClick={() => logout()}
                  className="rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 border border-solid bg-gray-700 pt-px pb-0.5 text-white"
                >
                  <span className="tracking-num--0_01 leading-num-28 font-semibold">Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile: wallet + menu button */}
      <div className="flex flex-1 items-center justify-end gap-2 lg:hidden">
        <div className="text-num-16 text-ghostwhite flex items-center justify-center gap-1 text-left sm:gap-2">
          <button className="rounded-num-8 box-border flex h-11 min-h-[44px] shrink-0 items-center justify-center gap-1 bg-fuchsia-200 px-3 pt-px pb-0.5 text-white shadow-[0px_2px_0px_rgba(235,45,255,0.25)] sm:px-4">
            <img className="h-4 w-4" alt="" src="/icons/IconBanknote2.svg" />
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
          {navLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link
                key={link.label}
                href={link.href as Route}
                className={`rounded-num-8 flex min-h-[44px] items-center px-4 text-base font-semibold ${
                  isActiveLink(link.href) ? 'bg-gray-300 text-white' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActiveLink(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-num-8 flex min-h-[44px] items-center px-4 text-base font-semibold ${
                  isActiveLink(link.href) ? 'bg-gray-300 text-white' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
          {!isLoggedIn && (
            <div className="mt-2 flex flex-col gap-2 border-t border-solid border-white/10 pt-4">
              <button
                type="button"
                className="rounded-num-8 border-whitesmoke-300 flex min-h-[44px] items-center justify-center gap-2 border border-solid bg-gray-300 px-4 text-base font-semibold text-white"
                onClick={() => {
                  openAuthModal('signin')
                  setMobileMenuOpen(false)
                }}
              >
                <img className="h-4 w-4" alt="" src="/icons/IconPeopleIdCard.svg" />
                Log In
              </button>
              <button
                type="button"
                className="rounded-num-8 flex min-h-[44px] items-center justify-center gap-2 bg-fuchsia-200 px-4 text-base font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
                onClick={() => {
                  openAuthModal('signup')
                  setMobileMenuOpen(false)
                }}
              >
                <img className="h-4 w-4" alt="" src="/icons/IconPeopleIdCard.svg" />
                Create Account
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
