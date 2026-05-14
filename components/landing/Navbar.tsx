'use client'

import LogOutConfirmModal from '@/components/auth/LogOutConfirmModal'
import { useAuthModal } from '@/components/auth/auth-modal-context'
import CartDropdownPanel from '@/components/landing/CartDropdownPanel'
import NavbarThemeSwitch from '@/components/landing/NavbarThemeSwitch'
import { useAuth } from '@/hooks/use-auth'
import { useWalletBalanceQuery } from '@/hooks/use-wallet'
import {
  siteSelectDropdownList,
  siteSelectDropdownOptionInteractive,
  siteSelectDropdownOptionRow,
  siteSelectDropdownPanel,
} from '@/components/ui/siteSelectDropdown'
import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import { useCartStore } from '@/stores/cart-store'
import CentralIcon from '@central-icons-react/all'
import { AnimatePresence, motion } from 'framer-motion'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Drawer } from 'vaul'

const MOBILE_DRAWER_NAV_GRID = 'grid grid-cols-2 gap-2'

const mobileDrawerNavTileClass = (index: number, total: number) =>
  [
    'border-border-subtle bg-card-elevated hover:bg-hover-bg box-border flex w-[calc(50%-0.25rem)] max-w-[calc(50%-0.25rem)] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors',
    index === total - 1 && total % 2 === 1 ? 'col-span-2 justify-self-center' : '',
  ]
    .filter(Boolean)
    .join(' ')

const Navbar: FunctionComponent = () => {
  const [mobileNavMenuOpen, setMobileNavMenuOpen] = useState(false)
  const [desktopUserMenuOpen, setDesktopUserMenuOpen] = useState(false)
  const [userMenuHoverKey, setUserMenuHoverKey] = useState<string | null>(null)
  const [logOutModalOpen, setLogOutModalOpen] = useState(false)
  const [cartMenuOpen, setCartMenuOpen] = useState(false)
  const desktopUserMenuRef = useRef<HTMLDivElement>(null)
  const desktopCartMenuRef = useRef<HTMLDivElement>(null)
  const mobileCartMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { openAuthModal, isAuthenticated } = useAuthModal()
  const { logout, user } = useAuth()
  const walletBalanceQuery = useWalletBalanceQuery({ enabled: isAuthenticated })
  const cartItems = useCartStore((s) => s.items)
  const prevCartItemCountRef = useRef(0)
  const hasMountedRef = useRef(false)
  const isLoggedIn = isAuthenticated
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const walletBalanceLabel = (() => {
    const raw = Number.parseFloat(walletBalanceQuery.data?.balance ?? '0')
    const amount = Number.isFinite(raw) ? raw : 0
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  })()

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      prevCartItemCountRef.current = cartItemCount
      return
    }

    const previousCount = prevCartItemCountRef.current
    prevCartItemCountRef.current = cartItemCount

    if (cartItemCount <= previousCount) return

    setCartMenuOpen(true)
  }, [cartItemCount])

  const navLinks = [
    { label: 'Shop', href: '/shop', icon: 'IconBasket1' },
    { label: 'Drops', href: '/drops', icon: 'IconAirdrop2' },
    { label: 'Vouches', href: '/vouches', icon: 'IconReceiptBill' },
    { label: 'FAQs', href: '/faqs', icon: 'IconCircleQuestionmark' },
    { label: 'Support', href: '/support', icon: 'IconRescueRing' },
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
    if (!desktopUserMenuOpen && !mobileNavMenuOpen) {
      setUserMenuHoverKey(null)
    }
  }, [desktopUserMenuOpen, mobileNavMenuOpen])

  useEffect(() => {
    setMobileNavMenuOpen(false)
  }, [pathname])

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
      trailing: walletBalanceLabel,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: 'IconSettingsSliderThree' as const,
      href: DASHBOARD_PATHS.general,
    },
  ]

  return (
    <header className="text-foreground font-commissioner border-border-subtle bg-background/95 fixed top-0 right-0 left-0 z-50 box-border flex h-14 w-full shrink-0 items-center justify-between gap-0 border-b border-solid px-4 py-0 backdrop-blur-md sm:h-[75px] sm:px-6 lg:px-8 xl:px-14 2xl:px-56">
      {/* Logo and nav links */}
      <nav className="lg:gap-num-15 flex h-14 flex-1 shrink-0 items-center gap-2 sm:gap-4">
        <Link href="/" className="shrink-0">
          <img
            className="h-8 w-14 sm:h-[45.3px] sm:w-[82px]"
            alt="Bluemoon"
            src="/icons/Jin X.svg"
          />
        </Link>
        <div className="h-num-19 border-divider hidden w-px shrink-0 border-r border-solid lg:block" />
        {/* Desktop nav links */}
        <div className="hidden items-center gap-2 lg:flex lg:gap-3.5">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href)
            const className = `sm:px-num-12 flex items-center gap-1.5 rounded-num-8 px-2 py-2 sm:py-[13.6px] ${
              isActive
                ? 'opacity-100'
                : 'opacity-75 transition-colors hover:bg-hover-bg hover:opacity-100'
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
        <div className="text-num-16 text-foreground flex items-center justify-center gap-2 self-stretch rounded-xl py-[26px] text-left">
          <div className="flex shrink-0 items-center justify-center gap-2">
            <NavbarThemeSwitch />
            {isLoggedIn ? (
              <>
                <Link
                  href={DASHBOARD_PATHS.wallet as Route}
                  className="rounded-num-8 px-num-12 box-border flex h-[38px] shrink-0 items-center justify-center gap-2 bg-fuchsia-200 pt-px pb-0.5 text-white shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
                >
                  <img className="h-4 w-4" alt="" src="/icons/IconBanknote2.svg" />
                  <span className="tracking-num--0_01 leading-num-28 font-semibold">Wallet</span>
                  <span className="font-nata-sans tracking-num--0_01 leading-num-28 font-extrabold">
                    {walletBalanceLabel}
                  </span>
                </Link>
                <div className="h-num-19 border-divider w-px shrink-0 border-r border-solid" />
              </>
            ) : null}
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
                  className={`rounded-num-8 bg-card-elevated box-border flex h-[38px] w-[38px] items-center justify-center border border-solid transition-colors ${
                    cartMenuOpen ? 'border-fuchsia-200' : 'border-whitesmoke-300'
                  }`}
                >
                  <CentralIcon
                    name="IconBasket1"
                    join="round"
                    fill="filled"
                    stroke="1"
                    radius="1"
                    size={24}
                    color="currentColor"
                    ariaHidden={true}
                  />
                  {cartItemCount > 0 && (
                    <span className="bg-fuchsia absolute -top-1 -right-1 rounded-full px-1.5 text-[10px] leading-4 font-bold text-white">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {cartMenuOpen ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full right-0 z-50 mt-2 origin-top-right"
                    >
                      <CartDropdownPanel />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
              {isLoggedIn && (
                <>
                  <div className="h-num-19 border-divider w-px shrink-0 border-r border-solid" />
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
                        className={`absolute top-full right-0 z-50 mt-2 min-w-[232px] overflow-hidden ${siteSelectDropdownPanel}`}
                        role="menu"
                      >
                        <div className={siteSelectDropdownList}>
                          {userDropdownLinks.map((item) => (
                            <Link
                              key={item.key}
                              href={item.href as Route}
                              role="menuitem"
                              onClick={closeDesktopUserMenu}
                              onMouseEnter={() => setUserMenuHoverKey(item.key)}
                              onMouseLeave={() => setUserMenuHoverKey(null)}
                              className={`${siteSelectDropdownOptionRow} ${siteSelectDropdownOptionInteractive} group text-sm ${
                                item.trailing ? 'justify-between gap-3' : 'gap-2.5'
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
                                <span className="text-muted-foreground group-hover:text-foreground tracking-num--0_01 font-medium transition-colors group-hover:font-semibold">
                                  {item.label}
                                </span>
                              </span>
                              {item.trailing ? (
                                <span className="font-nata-sans text-foreground shrink-0 text-sm font-extrabold tabular-nums">
                                  {item.trailing}
                                </span>
                              ) : null}
                            </Link>
                          ))}
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setLogOutModalOpen(true)
                              closeDesktopUserMenu()
                            }}
                            onMouseEnter={() => setUserMenuHoverKey('logout')}
                            onMouseLeave={() => setUserMenuHoverKey(null)}
                            className={`${siteSelectDropdownOptionRow} ${siteSelectDropdownOptionInteractive} group gap-2.5 text-left text-sm`}
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
                            <span className="text-muted-foreground group-hover:text-foreground tracking-num--0_01 font-medium transition-colors group-hover:font-semibold">
                              Log Out
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            {!isLoggedIn ? (
              <>
                <div className="h-num-19 border-divider w-px shrink-0 border-r border-solid" />
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="rounded-num-8 px-num-12 border-border-subtle bg-card-elevated text-foreground box-border flex h-[38px] shrink-0 items-center justify-center gap-2 border border-solid pt-px pb-0.5"
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
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile: actions row + hamburger */}
      <div className="flex flex-1 items-center justify-end gap-1.5 lg:hidden">
        <NavbarThemeSwitch />
        {isLoggedIn ? (
          <Link
            href={DASHBOARD_PATHS.wallet as Route}
            className="rounded-num-8 box-border flex h-9 shrink-0 items-center justify-center gap-1 bg-fuchsia-200 px-2 text-white shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
          >
            <img className="h-4 w-4" alt="" src="/icons/IconBanknote2.svg" />
            <span className="font-nata-sans tracking-num--0_01 text-sm leading-none font-extrabold">
              {walletBalanceLabel}
            </span>
          </Link>
        ) : null}
        <div className="relative shrink-0" ref={mobileCartMenuRef}>
          <button
            type="button"
            onClick={() => {
              setCartMenuOpen((o) => !o)
              setMobileNavMenuOpen(false)
            }}
            aria-expanded={cartMenuOpen}
            aria-haspopup="dialog"
            aria-label="Shopping cart"
            className={`rounded-num-8 bg-card-elevated box-border flex h-9 w-9 shrink-0 items-center justify-center border border-solid transition-colors ${
              cartMenuOpen ? 'border-fuchsia-200' : 'border-whitesmoke-300'
            }`}
          >
            <CentralIcon
              name="IconBasket1"
              join="round"
              fill="filled"
              stroke="1"
              radius="1"
              size={20}
              color="currentColor"
              ariaHidden={true}
            />
            {cartItemCount > 0 && (
              <span className="bg-fuchsia absolute -top-1 -right-1 rounded-full px-1.5 text-[10px] leading-4 font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {cartMenuOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute top-full right-0 z-50 mt-2 origin-top-right"
              >
                <CartDropdownPanel />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Hamburger — site nav and account (mobile) */}
        <button
          type="button"
          onClick={() => {
            setMobileNavMenuOpen((o) => !o)
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

      {/* Mobile: hamburger bottom drawer — nav links */}
      <Drawer.Root
        open={mobileNavMenuOpen}
        onOpenChange={setMobileNavMenuOpen}
        shouldScaleBackground={false}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/55 lg:hidden" />
          <Drawer.Content
            aria-describedby={undefined}
            className="border-border-subtle bg-background fixed right-0 bottom-0 left-0 z-51 flex max-h-[85dvh] flex-col rounded-t-[20px] border-t border-solid outline-none lg:hidden"
          >
            <Drawer.Title className="sr-only">Site navigation</Drawer.Title>
            <div className="bg-muted-foreground/20 mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full" />
            <div className="flex flex-col gap-2 overflow-y-auto overscroll-contain px-6 pt-4 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
              {!isLoggedIn ? (
                <div className="border-border-subtle flex flex-col gap-2">
                  <div className="border-border-subtle mb-4 flex flex-col gap-2 border-b border-solid pb-4">
                    <button
                      type="button"
                      onClick={() => {
                        openAuthModal('signin')
                        setMobileNavMenuOpen(false)
                      }}
                      className="rounded-num-8 px-num-12 border-border-subtle bg-card-elevated text-foreground box-border flex min-h-[44px] w-full items-center justify-center gap-2 border border-solid py-2.5"
                    >
                      <span className="tracking-num--0_01 leading-num-28 font-semibold">
                        Log In
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        openAuthModal('signup')
                        setMobileNavMenuOpen(false)
                      }}
                      className="rounded-num-8 px-num-12 box-border flex min-h-[44px] w-full items-center justify-center gap-2 bg-fuchsia-200 py-2.5 text-white shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
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
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-muted-foreground px-1 text-[11px] font-bold tracking-wider uppercase">
                      Menu
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href as Route}
                          onClick={() => setMobileNavMenuOpen(false)}
                          className="border-border-subtle bg-card-elevated hover:bg-hover-bg flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                        >
                          <CentralIcon
                            name={link.icon as any}
                            join="round"
                            fill="filled"
                            stroke="2"
                            radius="1"
                            size={24}
                            color="#9CA8BC"
                            ariaHidden={true}
                          />
                          <span className="text-foreground text-xs font-semibold">
                            {link.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6 pt-2">
                  <div className="border-border-subtle bg-card-elevated flex items-center justify-between gap-3 rounded-2xl border border-solid p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={user?.avatar || '/icons/Ellipse 1.svg'}
                        alt={user?.userName || 'User'}
                        className="bg-muted h-12 w-12 shrink-0 rounded-full object-cover"
                        onError={(e) => {
                          const el = e.currentTarget
                          el.onerror = null
                          el.src = '/icons/Ellipse 1.svg'
                        }}
                      />
                      <div className="flex min-w-0 flex-col items-start">
                        <span className="text-foreground truncate text-base leading-none font-bold">
                          {user?.userName || 'User'}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLogOutModalOpen(true)
                        setMobileNavMenuOpen(false)
                      }}
                      className="flex shrink-0 items-center gap-1.5 rounded-xl border border-solid border-red-500/45 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-500/20 dark:border-red-400/45 dark:text-red-400 dark:hover:bg-red-500/15"
                    >
                      <CentralIcon
                        name="IconArrowBoxLeft"
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={16}
                        color="currentColor"
                        ariaHidden={true}
                      />
                      Sign Out
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-muted-foreground px-1 text-[11px] font-bold tracking-wider uppercase">
                      Account
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={DASHBOARD_PATHS.orders as Route}
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconBasket2"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">Orders</span>
                      </Link>
                      <Link
                        href={DASHBOARD_PATHS.drops as Route}
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconAirdrop2"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">Drops</span>
                      </Link>
                      <Link
                        href={DASHBOARD_PATHS.wallet as Route}
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconBanknote2"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">Wallet</span>
                      </Link>
                      <Link
                        href={DASHBOARD_PATHS.reviews as Route}
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconStar"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">Reviews</span>
                      </Link>
                      <Link
                        href={DASHBOARD_PATHS.settings as Route}
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg col-span-2 flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconSettingsSliderThree"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">Settings</span>
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-muted-foreground px-1 text-[11px] font-bold tracking-wider uppercase">
                      Explore
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/shop"
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconBasket1"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">Shop</span>
                      </Link>
                      <Link
                        href="/drops"
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconAirdrop2"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">Drops</span>
                      </Link>
                      <Link
                        href="/vouches"
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconReceiptBill"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">Vouches</span>
                      </Link>
                      <Link
                        href="/faqs"
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconCircleQuestionmark"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">FAQs</span>
                      </Link>
                      <Link
                        href="/support"
                        onClick={() => setMobileNavMenuOpen(false)}
                        className="border-border-subtle bg-card-elevated hover:bg-hover-bg col-span-2 flex flex-col items-center justify-center gap-2 rounded-2xl border border-solid py-4 transition-colors"
                      >
                        <CentralIcon
                          name="IconRescueRing"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={24}
                          color="#9CA8BC"
                          ariaHidden={true}
                        />
                        <span className="text-foreground text-xs font-semibold">Support</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

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
