'use client'

import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { Reveal } from '@/components/ui/reveal'
import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import { useOrderReviewStore } from '@/lib/order-review-store'
import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FunctionComponent, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Drawer } from 'vaul'

const accountNav = [
  { label: 'Orders', icon: 'IconBasket2' as const, href: DASHBOARD_PATHS.orders },
  { label: 'Drops', icon: 'IconAirdrop2' as const, href: DASHBOARD_PATHS.drops },
  { label: 'Wallet', icon: 'IconBanknote2' as const, href: DASHBOARD_PATHS.wallet },
  { label: 'Reviews', icon: 'IconStar' as const, href: DASHBOARD_PATHS.reviews },
]

const settingsNav = [
  { label: 'General', icon: 'IconSettingsSliderThree' as const, href: DASHBOARD_PATHS.general },
  { label: 'Security', icon: 'IconShieldKeyhole' as const, href: DASHBOARD_PATHS.security },
  { label: 'Deletion', icon: 'IconTrashCan' as const, href: DASHBOARD_PATHS.deletion },
]

const headerByPath: Record<string, { title: string; icon: string }> = {
  [DASHBOARD_PATHS.orders]: { title: 'Orders', icon: 'IconBasket2' },
  [DASHBOARD_PATHS.drops]: { title: 'Drops', icon: 'IconAirdrop2' },
  [DASHBOARD_PATHS.wallet]: { title: 'Wallet', icon: 'IconBanknote2' },
  [DASHBOARD_PATHS.reviews]: { title: 'Reviews', icon: 'IconStar' },
  [DASHBOARD_PATHS.general]: { title: 'General', icon: 'IconSettingsSliderThree' },
  [DASHBOARD_PATHS.security]: { title: 'Security', icon: 'IconShieldKeyhole' },
  [DASHBOARD_PATHS.deletion]: { title: 'Deletion', icon: 'IconTrashCan' },
}

type SidebarNavProps = {
  pathname: string
  onNavigate?: () => void
}

const DashboardSidebarNav: FunctionComponent<SidebarNavProps> = ({ pathname, onNavigate }) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="rounded-num-8 px-num-12 text-slategray flex items-center py-2 text-xs font-semibold uppercase sm:text-[12px]">
          Account
        </div>
        {accountNav.map((item) => {
          const isSelected = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href as Route}
              onClick={onNavigate}
              className={[
                'p-num-10 box-border flex min-h-11 w-full items-center gap-2 overflow-hidden border border-transparent text-left transition-colors',
                item.label === 'Wallet' ? 'justify-between gap-3 sm:gap-5' : '',
                isSelected
                  ? 'rounded-num-8 text-ghostwhite border-[#3B3161] [background:linear-gradient(90deg,_rgba(235,_45,_255,_0.2),_rgba(235,_45,_255,_0)),_linear-gradient(#071935,_#071935)]'
                  : 'rounded-num-8 hover:bg-gray-700',
              ].join(' ')}
              aria-current={isSelected ? 'page' : undefined}
            >
              <div className="flex min-w-0 items-center gap-2">
                <CentralIcon
                  name={item.icon as any}
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={16}
                  ariaHidden={true}
                  color={isSelected ? '#EB2DFF' : undefined}
                />
                <span className="leading-num-20 sm:text-num-14 truncate text-sm font-semibold">
                  {item.label}
                </span>
              </div>
              {item.label === 'Wallet' ? (
                <b className="tracking-num--0_01 font-nata-sans leading-num-20 sm:text-num-14 shrink-0 text-sm text-white">
                  $0.00
                </b>
              ) : null}
            </Link>
          )
        })}
      </div>
      <div className="flex flex-col gap-1">
        <div className="rounded-num-8 px-num-12 text-slategray flex items-center py-2 text-xs font-semibold uppercase sm:text-[12px]">
          SETTINGS
        </div>
        {settingsNav.map((item) => {
          const isSelected = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href as Route}
              onClick={onNavigate}
              className={[
                'rounded-num-8 p-num-10 box-border flex min-h-11 w-full items-center gap-2 overflow-hidden border border-transparent text-left transition-colors',
                isSelected
                  ? 'text-ghostwhite border-[#3B3161] [background:linear-gradient(90deg,_rgba(235,_45,_255,_0.2),_rgba(235,_45,_255,_0)),_linear-gradient(#071935,_#071935)]'
                  : 'hover:bg-gray-700',
              ].join(' ')}
              aria-current={isSelected ? 'page' : undefined}
            >
              <CentralIcon
                name={item.icon as any}
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={16}
                ariaHidden={true}
                color={isSelected ? '#EB2DFF' : undefined}
              />
              <span className="leading-num-20 sm:text-num-14 text-sm font-semibold">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

type Props = { children: ReactNode }

function formatBrandForBreadcrumb(brand: string): string {
  return brand
    .trim()
    .split(/\s+/)
    .map((word) =>
      word.length ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word
    )
    .join(' ')
}

export const DashboardLayoutShell: FunctionComponent<Props> = ({ children }) => {
  const pathname = usePathname()
  const orders = useOrderReviewStore((s) => s.orders)

  const isOrderDetail =
    pathname.startsWith(`${DASHBOARD_PATHS.orders}/`) && pathname !== DASHBOARD_PATHS.orders

  const orderIdFromPath = useMemo(() => {
    if (!isOrderDetail || !pathname.startsWith(`${DASHBOARD_PATHS.orders}/`)) return ''
    const rest = pathname.slice(DASHBOARD_PATHS.orders.length + 1)
    return rest.split('/')[0] ?? ''
  }, [isOrderDetail, pathname])

  const orderForBreadcrumb = useMemo(
    () => (orderIdFromPath ? orders.find((o) => o.id === orderIdFromPath) : undefined),
    [orderIdFromPath, orders]
  )

  const breadcrumbCurrentLabel = orderForBreadcrumb
    ? formatBrandForBreadcrumb(orderForBreadcrumb.brand)
    : 'Order details'

  const pageHeader = !isOrderDetail
    ? (headerByPath[pathname] ?? headerByPath[DASHBOARD_PATHS.orders])
    : null
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  return (
    <div className="text-ghostwhite font-commissioner sm:text-num-14 flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-400 pt-16 text-left text-sm sm:pt-[95px] lg:text-[18px]">
      <Navbar />

      <Drawer.Root
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        direction="left"
        shouldScaleBackground={false}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/55" />
          <Drawer.Content
            aria-describedby={undefined}
            className="border-whitesmoke-300/20 fixed top-0 left-0 z-[51] flex h-[100dvh] w-[min(100vw-2.5rem,288px)] max-w-[100vw] flex-col border-r border-solid bg-gray-400 shadow-[8px_0_40px_rgba(0,0,0,0.35)] outline-none"
          >
            <Drawer.Title className="sr-only">Dashboard navigation</Drawer.Title>
            <div className="flex flex-1 touch-pan-y flex-col gap-5 overflow-y-auto overscroll-contain px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-8">
              <aside
                aria-label="Account navigation"
                className="text-lightsteelblue-200 flex min-w-0 flex-col gap-5"
              >
                <DashboardSidebarNav
                  pathname={pathname}
                  onNavigate={() => setMobileNavOpen(false)}
                />
              </aside>
            </div>
          </Drawer.Content>
        </Drawer.Portal>

        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="border-whitesmoke-300/30 fixed bottom-6 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-solid bg-[#071935] text-white shadow-[0_8px_24px_rgba(0,0,0,0.4)] sm:hidden"
          aria-label="Open dashboard menu"
          aria-expanded={mobileNavOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden={true}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      </Drawer.Root>

      <main className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col gap-4 pb-8 sm:gap-6 lg:gap-12">
        <div className="mx-auto flex w-full max-w-[1476.9px] flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-[224px_1fr] sm:gap-6 lg:gap-8">
            <Reveal variant="slide-left" className="hidden min-w-0 sm:block">
              <aside
                aria-label="Account navigation"
                className="text-lightsteelblue-200 flex min-w-0 flex-col gap-5 sm:gap-4"
              >
                <DashboardSidebarNav pathname={pathname} />
              </aside>
            </Reveal>

            <section className="relative flex min-h-[min(60vh,520px)] min-w-0 flex-col gap-4 md:min-h-0 md:gap-8">
              <Reveal variant="slide-right" delay={80}>
                <div className="flex w-full flex-col gap-3 text-white md:flex-row md:items-center md:justify-between md:gap-4 lg:gap-5">
                  {isOrderDetail ? (
                    <nav
                      aria-label="Breadcrumb"
                      className="font-commissioner leading-num-28 md:text-num-16 flex min-w-0 flex-wrap items-center gap-2 text-base sm:text-lg"
                    >
                      <Link
                        href={DASHBOARD_PATHS.orders as Route}
                        className="hover:text-ghostwhite shrink-0 font-medium text-[#3F4A5A] transition-colors"
                      >
                        Orders
                      </Link>
                      <CentralIcon
                        name="IconChevronRightMedium"
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={16}
                        ariaHidden={true}
                        className="shrink-0 text-[#3F4A5A]"
                      />
                      <span
                        className="text-ghostwhite tracking-num-0_02 min-w-0 truncate font-bold"
                        aria-current="page"
                      >
                        {breadcrumbCurrentLabel}
                      </span>
                    </nav>
                  ) : pageHeader ? (
                    <div className="flex items-center gap-2">
                      <CentralIcon
                        name={pageHeader.icon as any}
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={16}
                        ariaHidden={true}
                        color="#EB2DFF"
                      />
                      <b className="leading-num-28 tracking-num-0_02 md:text-num-16 text-base sm:text-lg">
                        {pageHeader.title}
                      </b>
                    </div>
                  ) : null}
                  <div className="text-lightsteelblue-200 flex w-full min-w-0 flex-wrap items-center gap-2 self-stretch rounded-md bg-gray-300 px-3 py-2.5 text-xs sm:w-fit sm:self-auto sm:px-2 sm:py-1.5 sm:text-[12px]">
                    <span className="shrink-0 leading-[15px] font-semibold">ID</span>
                    <div className="text-ghostwhite flex min-w-0 items-center gap-1.5">
                      <span className="leading-[15px] font-semibold break-all">
                        JNX-LKXJLKNALSDJ
                      </span>
                      <CentralIcon
                        name="IconSquareBehindSquare1"
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={16}
                        ariaHidden={true}
                        className="shrink-0"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              {children}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
