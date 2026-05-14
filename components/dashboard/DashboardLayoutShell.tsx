'use client'

import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { Reveal } from '@/components/ui/reveal'
import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import { mapApiOrderToDashboardCard, useOrderQuery } from '@/hooks/use-orders'
import { useMyDropClaimQuery } from '@/hooks/use-drops'
import { useCurrentUser } from '@/hooks/use-auth'
import { DashboardMobileTabs } from '@/components/dashboard/DashboardMobileTabs'
import { formatOrderBrandLabel } from '@/components/dashboard/dashboard-order-brand'
import { useWalletBalanceQuery } from '@/hooks/use-wallet'
import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, type FunctionComponent, type ReactNode } from 'react'

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
  [DASHBOARD_PATHS.settings]: { title: 'Settings', icon: 'IconSettingsSliderThree' },
}

type SidebarNavProps = {
  pathname: string
  walletBalanceLabel: string
  onNavigate?: () => void
}

const DashboardSidebarNav: FunctionComponent<SidebarNavProps> = ({
  pathname,
  walletBalanceLabel,
  onNavigate,
}) => {
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
                  ? 'rounded-num-8 border-active-border bg-active-bg text-foreground dark:text-ghostwhite dark:border-[#3B3161] dark:[background:linear-gradient(90deg,rgba(235,45,255,0.2),rgba(235,45,255,0)),linear-gradient(#071935,#071935)]'
                  : 'rounded-num-8 hover:bg-hover-bg dark:hover:bg-gray-700',
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
                <b className="tracking-num--0_01 font-nata-sans leading-num-20 sm:text-num-14 text-foreground shrink-0 text-sm dark:text-white">
                  {walletBalanceLabel}
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
                  ? 'border-active-border bg-active-bg text-foreground dark:text-ghostwhite dark:border-[#3B3161] dark:[background:linear-gradient(90deg,rgba(235,45,255,0.2),rgba(235,45,255,0)),linear-gradient(#071935,#071935)]'
                  : 'hover:bg-hover-bg dark:hover:bg-gray-700',
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

export const DashboardLayoutShell: FunctionComponent<Props> = ({ children }) => {
  const pathname = usePathname()
  const walletBalanceQuery = useWalletBalanceQuery()
  const walletBalanceLabel = useMemo(() => {
    const raw = Number.parseFloat(walletBalanceQuery.data?.balance ?? '0')
    const amount = Number.isFinite(raw) ? raw : 0
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }, [walletBalanceQuery.data?.balance])

  const isOrderDetail =
    pathname.startsWith(`${DASHBOARD_PATHS.orders}/`) && pathname !== DASHBOARD_PATHS.orders
  const isDropDetail =
    pathname.startsWith(`${DASHBOARD_PATHS.drops}/`) && pathname !== DASHBOARD_PATHS.drops

  const orderIdFromPath = useMemo(() => {
    if (!isOrderDetail || !pathname.startsWith(`${DASHBOARD_PATHS.orders}/`)) return ''
    const rest = pathname.slice(DASHBOARD_PATHS.orders.length + 1)
    return rest.split('/')[0] ?? ''
  }, [isOrderDetail, pathname])

  const orderCrumbQuery = useOrderQuery(orderIdFromPath || undefined, {
    select: (o) => formatOrderBrandLabel(mapApiOrderToDashboardCard(o).brand),
  })

  const dropClaimIdFromPath = useMemo(() => {
    if (!isDropDetail || !pathname.startsWith(`${DASHBOARD_PATHS.drops}/`)) return ''
    const rest = pathname.slice(DASHBOARD_PATHS.drops.length + 1)
    return rest.split('/')[0] ?? ''
  }, [isDropDetail, pathname])

  const dropCrumbQuery = useMyDropClaimQuery(dropClaimIdFromPath || undefined, {
    select: (claim) => formatOrderBrandLabel(claim.product.name),
  })

  const breadcrumbCurrentLabel = isOrderDetail
    ? (orderCrumbQuery.data ?? 'Order details')
    : (dropCrumbQuery.data ?? 'Drop details')

  const pageHeader =
    !isOrderDetail && !isDropDetail
      ? (headerByPath[pathname] ?? headerByPath[DASHBOARD_PATHS.orders])
      : null
  const currentUserQuery = useCurrentUser()
  const displayUserId = currentUserQuery.data?.id ?? ''

  const displayUserIdShort = useMemo(() => {
    if (!displayUserId) return '—'
    if (displayUserId.length <= 18) return displayUserId
    return `${displayUserId.slice(0, 8)}...${displayUserId.slice(-6)}`
  }, [displayUserId])
  return (
    <div className="text-foreground dark:text-ghostwhite font-commissioner sm:text-num-14 bg-background flex min-h-screen w-full flex-col overflow-x-hidden pt-16 text-left text-sm sm:pt-[95px] lg:text-[18px]">
      <Navbar />

      <DashboardMobileTabs />

      <main className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col gap-4 pb-8 sm:gap-6 lg:gap-12">
        <div className="mx-auto flex w-full max-w-[1476.9px] flex-1 flex-col px-5 py-4 sm:px-6 sm:pt-0 sm:pb-0 lg:px-8">
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-[224px_1fr] sm:gap-6 lg:gap-8">
            <Reveal variant="slide-left" className="hidden min-w-0 sm:block">
              <aside
                aria-label="Account navigation"
                className="text-muted-foreground flex min-w-0 flex-col gap-5 sm:gap-4"
              >
                <DashboardSidebarNav pathname={pathname} walletBalanceLabel={walletBalanceLabel} />
              </aside>
            </Reveal>

            <section className="relative flex min-h-[min(60vh,520px)] min-w-0 flex-col gap-4 md:min-h-0 md:gap-8">
              <Reveal variant="slide-right" delay={80}>
                <div className="text-foreground flex w-full min-w-0 flex-row flex-nowrap items-center justify-between gap-2 sm:gap-4 lg:gap-5 dark:text-white">
                  <div className="min-w-0 flex-1">
                    {isOrderDetail || isDropDetail ? (
                      <nav
                        aria-label="Breadcrumb"
                        className="font-commissioner leading-num-28 md:text-num-16 flex min-w-0 flex-nowrap items-center gap-2 text-base"
                      >
                      <Link
                        href={
                          (isOrderDetail ? DASHBOARD_PATHS.orders : DASHBOARD_PATHS.drops) as Route
                        }
                        className="text-muted-foreground hover:text-foreground dark:hover:text-ghostwhite shrink-0 font-medium transition-colors"
                      >
                        {isOrderDetail ? 'Orders' : 'Drops'}
                      </Link>
                      <CentralIcon
                        name="IconChevronRightMedium"
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={16}
                        ariaHidden={true}
                        className="text-muted-foreground shrink-0"
                      />
                      <span
                        className="text-foreground dark:text-ghostwhite tracking-num-0_02 min-w-0 truncate font-bold"
                        aria-current="page"
                      >
                        {breadcrumbCurrentLabel}
                      </span>
                    </nav>
                  ) : pageHeader ? (
                    <div className="flex min-w-0 items-center gap-2">
                      <CentralIcon
                        name={pageHeader.icon as any}
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={16}
                        ariaHidden={true}
                        color="#EB2DFF"
                        className="shrink-0"
                      />
                      <b className="leading-num-28 tracking-num-0_02 text-num-16 truncate">
                        {pageHeader.title}
                      </b>
                    </div>
                  ) : null}
                  </div>
                  <div className="text-muted-foreground border-border-subtle bg-card-elevated flex w-auto max-w-[45%] shrink-0 flex-nowrap items-center gap-1.5 rounded-md border px-2 py-2 text-xs sm:max-w-none sm:w-fit sm:gap-2 sm:px-2 sm:py-1.5 sm:text-[12px]">
                    <span className="shrink-0 leading-[15px] font-semibold">User ID</span>
                    <div className="text-foreground dark:text-ghostwhite flex min-w-0 flex-1 items-center gap-1">
                      <span className="leading-[15px] hidden min-w-0 font-semibold break-all sm:inline">
                        {displayUserId || '—'}
                      </span>
                      <span className="leading-[15px] min-w-0 truncate font-semibold sm:hidden">
                        {displayUserIdShort}
                      </span>
                      <button
                        type="button"
                        disabled={!displayUserId}
                        onClick={() => {
                          const valueToCopy = displayUserId
                          if (!valueToCopy) return
                          navigator.clipboard
                            .writeText(valueToCopy)
                            .then(() => {
                              import('@/lib/toast').then(({ toast }) => {
                                toast.success('Copied to clipboard', {
                                  description: valueToCopy,
                                })
                              })
                            })
                            .catch(() => {
                              import('@/lib/toast').then(({ toast }) => {
                                toast.error('Could not copy. Please try again.')
                              })
                            })
                        }}
                        aria-label="Copy ID"
                        className="inline-flex h-5 w-5 items-center justify-center text-current disabled:pointer-events-none disabled:opacity-40"
                      >
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
                      </button>
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
