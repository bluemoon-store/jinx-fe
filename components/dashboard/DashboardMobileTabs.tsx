'use client'

import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FunctionComponent } from 'react'

const mainTabs = [
  { label: 'Orders', href: DASHBOARD_PATHS.orders },
  { label: 'Drops', href: DASHBOARD_PATHS.drops },
  { label: 'Wallet', href: DASHBOARD_PATHS.wallet },
  { label: 'Reviews', href: DASHBOARD_PATHS.reviews },
  { label: 'Settings', href: DASHBOARD_PATHS.settings },
] as const

function isMainTabActive(pathname: string, href: string): boolean {
  if (pathname === href) return true
  if (href === DASHBOARD_PATHS.orders && pathname.startsWith(`${DASHBOARD_PATHS.orders}/`))
    return true
  if (href === DASHBOARD_PATHS.drops && pathname.startsWith(`${DASHBOARD_PATHS.drops}/`))
    return true
  if (
    href === DASHBOARD_PATHS.settings &&
    (pathname === DASHBOARD_PATHS.general ||
      pathname === DASHBOARD_PATHS.security ||
      pathname === DASHBOARD_PATHS.deletion)
  )
    return true
  return false
}

const tabClass = (active: boolean) =>
  [
    'font-commissioner relative -mb-px box-border flex min-h-[48px] min-w-0 flex-1 shrink-0 basis-0 items-center justify-center border-b-2 px-2 py-3 text-center text-sm font-semibold transition-colors',
    active
      ? 'text-foreground border-[#EB2DFF] dark:text-white'
      : 'text-muted-foreground border-transparent',
  ].join(' ')

export const DashboardMobileTabs: FunctionComponent = () => {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Dashboard navigation"
      className="border-border-subtle bg-background/98 flex w-full shrink-0 flex-nowrap items-stretch overflow-x-auto border-b border-solid backdrop-blur-md [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
    >
      {mainTabs.map((tab) => {
        const active = isMainTabActive(pathname, tab.href)
        return (
          <Link
            key={tab.href}
            href={tab.href as Route}
            className={tabClass(active)}
            aria-current={active ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
