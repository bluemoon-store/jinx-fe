'use client'

import LogOutConfirmModal from '@/components/auth/LogOutConfirmModal'
import { useAuthModal } from '@/components/auth/auth-modal-context'
import { CartEmptyDropdownPanel } from '@/components/landing/CartEmptyDropdownPanel'
import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import { useAppStore } from '@/lib/store'
import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent, useEffect, useRef, useState } from 'react'

const Navbar: FunctionComponent = () => {
  const [mobileNavMenuOpen, setMobileNavMenuOpen] = useState(false)
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false)
  const [desktopUserMenuOpen, setDesktopUserMenuOpen] = useState(false)
  const [userMenuHoverKey, setUserMenuHoverKey] = useState<string | null>(null)
  const [logOutModalOpen, setLogOutModalOpen] = useState(false)
  const [cartMenuOpen, setCartMenuOpen] = useState(false)
  const desktopUserMenuRef = useRef<HTMLDivElement>(null)
  const desktopCartMenuRef = useRef<HTMLDivElement>(null)
  const mobileUserMenuRef = useRef<HTMLDivElement>(null)
  const mobileCartMenuRef = useRef<HTMLDivElement>(null)
  const mobileNavPanelRef = useRef<HTMLDivElement>(null)
  const mobileHamburgerRef = useRef<HTMLButtonElement>(null)
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

  useEffect(() => {
    if (!desktopUserMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      if (desktopUserMenuRef.current && !desktopUserMenuRef.current.contains(e.target as Node)) {
        setDesktopUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [desktopUserMenuOpen])

  useEffect(() => {
    if (!desktopUserMenuOpen && !mobileNavMenuOpen && !mobileUserMenuOpen) {
      setUserMenuHoverKey(null)
    }
  }, [desktopUserMenuOpen, mobileNavMenuOpen, mobileUserMenuOpen])

  useEffect(() => {
    if (!mobileUserMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      if (mobileUserMenuRef.current && !mobileUserMenuRef.current.contains(e.target as Node)) {
        setMobileUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [mobileUserMenuOpen])

  useEffect(() => {
    if (!mobileNavMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node
      if (mobileNavPanelRef.current?.contains(t)) return
      if (mobileHamburgerRef.current?.contains(t)) return
      setMobileNavMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [mobileNavMenuOpen])

  useEffect(() => {
    if (!cartMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node
      if (desktopCartMenuRef.current?.contains(t)) return
      if (mobileCartMenuRef.current?.contains(t)) return
      setCartMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [cartMenuOpen])

  const closeDesktopUserMenu = () => setDesktopUserMenuOpen(false)

  const userDropdownLinks = [
    {
      key: 'orders',
      label: 'Orders',
      icon: 'IconBasket2' as const,
      href: DASHBOARD_PATHS.orders,
    },
    {
      key: 'wallet',
      label: 'Wallet',
      icon: 'IconBanknote2' as const,
      href: DASHBOARD_PATHS.wallet,
      trailing: '$0.00',
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: 'IconSettingsSliderThree' as const,
      href: DASHBOARD_PATHS.general,
    },
  ]

  const themeToggleButton = (className: string) => (
    <button
      type="button"
      onClick={() => setThemeSwitchOn((v) => !v)}
      className={className}
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
  )

  return (
    <header className="text-whitesmoke-100 font-commissioner fixed top-0 right-0 left-0 z-50 box-border flex h-14 w-full shrink-0 items-center justify-between gap-0 border-b border-solid border-gray-100 bg-gray-400/95 px-4 py-0 backdrop-blur-md sm:h-[75px] sm:px-6 lg:px-8 xl:px-14 2xl:px-56">
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
            {themeToggleButton(
              'rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 border border-solid bg-gray-700 pt-px pb-0.5 transition-colors duration-300 ease-out'
            )}
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="rounded-num-8 border-whitesmoke-300 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 border border-solid bg-gray-700 pt-px pb-0.5"
                >
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
                <div className="relative shrink-0" ref={desktopCartMenuRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setCartMenuOpen((o) => !o)
                      setDesktopUserMenuOpen(false)
                    }}
                    aria-expanded={cartMenuOpen}
                    aria-haspopup="dialog"
                    aria-label="Shopping cart"
                    className={`rounded-num-8 box-border flex h-[38px] w-[38px] items-center justify-center border border-solid bg-gray-700 transition-colors ${
                      cartMenuOpen ? 'border-fuchsia-200' : 'border-whitesmoke-300'
                    }`}
                  >
                    <img className="h-[24px] w-[24px]" alt="" src="/icons/IconBasket1-2.svg" />
                  </button>
                  {cartMenuOpen && (
                    <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2">
                      <CartEmptyDropdownPanel onNavigate={() => setCartMenuOpen(false)} />
                    </div>
                  )}
                </div>
                <div className="h-num-19 w-px shrink-0 border-r border-solid border-white opacity-[0.25]" />
                <div className="relative shrink-0" ref={desktopUserMenuRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setDesktopUserMenuOpen((o) => !o)
                      setCartMenuOpen(false)
                    }}
                    aria-expanded={desktopUserMenuOpen}
                    aria-haspopup="true"
                    className="rounded-num-8 block max-h-full w-10 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200"
                  >
                    <img
                      className="rounded-num-8 max-h-full w-10 object-cover"
                      alt=""
                      src="/icons/Ellipse 1.svg"
                    />
                  </button>
                  {desktopUserMenuOpen && (
                    <div
                      className="rounded-num-8 absolute top-full right-0 z-50 mt-2 flex min-w-[232px] flex-col border border-solid border-white/10 bg-[#071935] py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                      role="menu"
                    >
                      {userDropdownLinks.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href as Route}
                          role="menuitem"
                          onClick={closeDesktopUserMenu}
                          onMouseEnter={() => setUserMenuHoverKey(item.key)}
                          onMouseLeave={() => setUserMenuHoverKey(null)}
                          className={`group rounded-num-8 mx-1 flex min-h-11 items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-[#14253F] ${
                            item.trailing ? 'justify-between gap-3' : ''
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-2.5">
                            <CentralIcon
                              name={item.icon as any}
                              join="round"
                              fill="filled"
                              stroke="2"
                              radius="1"
                              size={20}
                              color={userMenuHoverKey === item.key ? '#EB2DFF' : '#9CA8BC'}
                              ariaHidden={true}
                            />
                            <span className="text-lightsteelblue-200 group-hover:text-ghostwhite tracking-num--0_01 font-medium transition-colors group-hover:font-semibold">
                              {item.label}
                            </span>
                          </span>
                          {item.trailing ? (
                            <span className="font-nata-sans text-ghostwhite shrink-0 text-sm font-extrabold tabular-nums">
                              {item.trailing}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                      <div
                        className="border-whitesmoke-300 mx-3 my-1.5 border-t border-solid"
                        role="separator"
                      />
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setLogOutModalOpen(true)
                          closeDesktopUserMenu()
                        }}
                        onMouseEnter={() => setUserMenuHoverKey('logout')}
                        onMouseLeave={() => setUserMenuHoverKey(null)}
                        className="group rounded-num-8 mx-1 flex min-h-11 items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#14253F]"
                      >
                        <CentralIcon
                          name="IconArrowBoxLeft"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={20}
                          color={userMenuHoverKey === 'logout' ? '#EB2DFF' : '#9CA8BC'}
                          ariaHidden={true}
                        />
                        <span className="text-lightsteelblue-200 group-hover:text-ghostwhite tracking-num--0_01 font-medium transition-colors group-hover:font-semibold">
                          Log Out
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile: actions row + hamburger */}
      <div className="flex flex-1 items-center justify-end gap-1.5 lg:hidden">
        {/* Theme toggle — always on mobile bar */}
        <button
          type="button"
          onClick={() => setThemeSwitchOn((v) => !v)}
          className="rounded-num-8 border-whitesmoke-300 box-border flex h-9 shrink-0 items-center justify-center gap-1 border border-solid bg-gray-700 px-1.5 transition-colors duration-300 ease-out"
          aria-pressed={themeSwitchOn}
        >
          <CentralIcon
            name="IconSun"
            join="round"
            fill="filled"
            stroke="1"
            radius="1"
            size={15}
            ariaHidden={true}
          />
          <div
            className={`relative h-[15px] w-[26px] rounded-full transition-colors duration-300 ease-out ${
              themeSwitchOn ? 'bg-fuchsia-200' : 'bg-gray-500'
            }`}
          >
            <div
              className={`absolute top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
                themeSwitchOn ? 'translate-x-[13px]' : 'translate-x-[2px]'
              }`}
            />
          </div>
          <CentralIcon
            name="IconMoon"
            join="round"
            fill="filled"
            stroke="1"
            radius="1"
            size={15}
            ariaHidden={true}
          />
        </button>

        {isLoggedIn ? (
          <>
            {/* Wallet */}
            <button className="rounded-num-8 box-border flex h-9 shrink-0 items-center justify-center gap-1 bg-fuchsia-200 px-2 text-white shadow-[0px_2px_0px_rgba(235,45,255,0.25)]">
              <img className="h-4 w-4" alt="" src="/icons/IconBanknote2.svg" />
              <span className="font-nata-sans tracking-num--0_01 text-sm leading-none font-extrabold">
                $0.00
              </span>
            </button>
            {/* Cart */}
            <div className="relative shrink-0" ref={mobileCartMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setCartMenuOpen((o) => !o)
                  setMobileUserMenuOpen(false)
                  setMobileNavMenuOpen(false)
                }}
                aria-expanded={cartMenuOpen}
                aria-haspopup="dialog"
                aria-label="Shopping cart"
                className={`rounded-num-8 box-border flex h-9 w-9 shrink-0 items-center justify-center border border-solid bg-gray-700 transition-colors ${
                  cartMenuOpen ? 'border-fuchsia-200' : 'border-whitesmoke-300'
                }`}
              >
                <img className="h-5 w-5" alt="" src="/icons/IconBasket1-2.svg" />
              </button>
              {cartMenuOpen && (
                <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2">
                  <CartEmptyDropdownPanel onNavigate={() => setCartMenuOpen(false)} />
                </div>
              )}
            </div>
            {/* Avatar — account menu only (separate from hamburger nav) */}
            <div className="relative shrink-0" ref={mobileUserMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setMobileUserMenuOpen((o) => !o)
                  setMobileNavMenuOpen(false)
                  setCartMenuOpen(false)
                }}
                aria-expanded={mobileUserMenuOpen}
                aria-haspopup="true"
                aria-label="Open account menu"
                className="block"
              >
                <img
                  className="rounded-num-8 h-9 w-9 object-cover"
                  alt=""
                  src="/icons/Ellipse 1.svg"
                />
              </button>
              {mobileUserMenuOpen && (
                <div
                  className="rounded-num-8 absolute top-full right-0 z-50 mt-2 flex min-w-[232px] flex-col border border-solid border-white/10 bg-[#071935] py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                  role="menu"
                >
                  {userDropdownLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href as Route}
                      role="menuitem"
                      className={`group rounded-num-8 mx-1 flex min-h-11 items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-[#14253F] ${
                        item.trailing ? 'justify-between gap-3' : ''
                      }`}
                      onClick={() => setMobileUserMenuOpen(false)}
                      onMouseEnter={() => setUserMenuHoverKey(item.key)}
                      onMouseLeave={() => setUserMenuHoverKey(null)}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <CentralIcon
                          name={item.icon as any}
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={20}
                          color={userMenuHoverKey === item.key ? '#EB2DFF' : '#9CA8BC'}
                          ariaHidden={true}
                        />
                        <span className="text-lightsteelblue-200 group-hover:text-ghostwhite tracking-num--0_01 font-medium transition-colors group-hover:font-semibold">
                          {item.label}
                        </span>
                      </span>
                      {item.trailing ? (
                        <span className="font-nata-sans text-ghostwhite shrink-0 text-sm font-extrabold tabular-nums">
                          {item.trailing}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                  <div
                    className="border-whitesmoke-300 mx-3 my-1.5 border-t border-solid"
                    role="separator"
                  />
                  <button
                    type="button"
                    role="menuitem"
                    className="group rounded-num-8 mx-1 flex min-h-11 items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#14253F]"
                    onClick={() => {
                      setLogOutModalOpen(true)
                      setMobileUserMenuOpen(false)
                    }}
                    onMouseEnter={() => setUserMenuHoverKey('logout')}
                    onMouseLeave={() => setUserMenuHoverKey(null)}
                  >
                    <CentralIcon
                      name="IconArrowBoxLeft"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={20}
                      color={userMenuHoverKey === 'logout' ? '#EB2DFF' : '#9CA8BC'}
                      ariaHidden={true}
                    />
                    <span className="text-lightsteelblue-200 group-hover:text-ghostwhite tracking-num--0_01 font-medium transition-colors group-hover:font-semibold">
                      Log Out
                    </span>
                  </button>
                </div>
              )}
            </div>
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

        {/* Hamburger — site nav + Help only (separate from avatar account menu) */}
        <button
          ref={mobileHamburgerRef}
          type="button"
          onClick={() => {
            setMobileNavMenuOpen((o) => !o)
            setMobileUserMenuOpen(false)
            setCartMenuOpen(false)
          }}
          className="flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg"
          aria-expanded={mobileNavMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileNavMenuOpen ? (
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

      {/* Mobile: hamburger sheet — nav links + Help only */}
      {mobileNavMenuOpen && (
        <div
          ref={mobileNavPanelRef}
          className="absolute top-full right-0 left-0 z-50 flex flex-col gap-1 border-b border-gray-100 bg-gray-400/95 px-4 py-4 backdrop-blur-md lg:hidden"
        >
          {navLinks.map((link) =>
            link.href.startsWith('/') ? (
              <Link
                key={link.label}
                href={link.href as Route}
                className={`rounded-num-8 flex min-h-[44px] items-center gap-2.5 px-4 text-base font-semibold ${
                  isActiveLink(link.href) ? 'bg-gray-300 text-white' : 'opacity-80'
                }`}
                onClick={() => setMobileNavMenuOpen(false)}
                aria-current={isActiveLink(link.href) ? 'page' : undefined}
              >
                <CentralIcon
                  name={navLinks.find((l) => l.href === link.href)?.icon as any}
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={18}
                  color={isActiveLink(link.href) ? '#EB2DFF' : undefined}
                  ariaHidden={true}
                />
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-num-8 flex min-h-[44px] items-center gap-2.5 px-4 text-base font-semibold ${
                  isActiveLink(link.href) ? 'bg-gray-300 text-white' : 'opacity-80'
                }`}
                onClick={() => setMobileNavMenuOpen(false)}
              >
                <CentralIcon
                  name={navLinks.find((l) => l.href === link.href)?.icon as any}
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                />
                {link.label}
              </a>
            )
          )}

          <div className="mt-2 border-t border-solid border-white/10 pt-3">
            <button
              type="button"
              className="rounded-num-8 border-whitesmoke-300 flex min-h-[44px] w-full items-center justify-between gap-2 border border-solid bg-gray-700/60 px-4 text-base font-semibold text-white transition-colors hover:bg-gray-700"
            >
              <span className="flex items-center gap-2.5">
                <img className="h-4 w-4 shrink-0" alt="" src="/icons/IconRescueRing.svg" />
                Help
              </span>
              <b className="tracking-num--0_01 text-base leading-none">0</b>
            </button>
          </div>
        </div>
      )}

      <LogOutConfirmModal
        open={logOutModalOpen}
        onClose={() => setLogOutModalOpen(false)}
        onConfirm={async () => {
          await logout()
          setLogOutModalOpen(false)
        }}
      />
    </header>
  )
}

export default Navbar
