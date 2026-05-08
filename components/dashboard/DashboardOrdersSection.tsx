'use client'

import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'

import type { OrderPaymentMethod } from '@/stores/order-review-store'
import {
  mapApiOrderToDashboardCard,
  useDashboardExpiredOrdersQuery,
  useDashboardOrdersInfiniteQuery,
  type DashboardOrderCardModel,
} from '@/hooks/use-orders'
import {
  siteSelectDropdownList,
  siteSelectDropdownOptionInteractive,
  siteSelectDropdownOptionRow,
  siteSelectDropdownPanel,
} from '@/components/ui/siteSelectDropdown'
import { cn } from '@/lib/utils'

import { DashboardLoadMoreFooter } from './DashboardLoadMoreFooter'
import { DashboardOrderCard } from './DashboardOrderCard'
import type { DashboardOrderStatus } from './DashboardOrderCard'
import { dashboardOrderStatusConfig } from './DashboardOrderCard'
import { DashboardOrderRow } from './DashboardOrderRow'

type OrdersViewMode = 'grid' | 'list'

const VIEW_OPTIONS: { value: OrdersViewMode; label: string; icon: string }[] = [
  { value: 'grid', label: 'Grid', icon: 'IconLayoutDashboard' },
  { value: 'list', label: 'List', icon: 'IconListBullets' },
]

type StatusFilter = 'all' | DashboardOrderStatus

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired' },
]

type PaymentMethodFilter = 'all' | OrderPaymentMethod

const PAYMENT_METHOD_OPTIONS: { value: PaymentMethodFilter; label: string; iconSrc?: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bitcoin', label: 'Bitcoin', iconSrc: '/icons/Crypto Logos/Bitcoin.svg' },
  {
    value: 'ethereum',
    label: 'Ethereum',
    iconSrc: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---ethereum-eth.svg',
  },
  { value: 'usdt_tron', label: 'USDT (Tron)', iconSrc: '/icons/Crypto Logos/Tether.svg' },
  { value: 'usdt_ethereum', label: 'USDT (Ethereum)', iconSrc: '/icons/Crypto Logos/Tether.svg' },
  { value: 'litecoin', label: 'Litecoin', iconSrc: '/icons/Crypto Logos/Litecoin LTC.svg' },
  { value: 'bitcoin_cash', label: 'Bitcoin Cash', iconSrc: '/icons/Crypto Logos/Bitcoin-1.svg' },
]

type SortOption = 'newest' | 'oldest' | 'price_desc' | 'price_asc'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price_desc', label: 'Price (High to Low)' },
  { value: 'price_asc', label: 'Price (Low to High)' },
]

const dashboardSelectTriggerClass = cn(
  'rounded-num-8 px-num-12 bg-card-elevated text-foreground dark:text-lightsteelblue-100 border-border-subtle dark:border-[#16243B] flex min-h-11 w-full min-w-0 items-center gap-2 border border-solid py-2'
)

type Props = {
  onFilteredCountChange?: (count: number) => void
}

export const DashboardOrdersSection: FunctionComponent<Props> = ({ onFilteredCountChange }) => {
  const [orderSearch, setOrderSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<PaymentMethodFilter>('all')
  const [viewMode, setViewMode] = useState<OrdersViewMode>('grid')
  const [viewMenuOpen, setViewMenuOpen] = useState(false)
  const viewMenuRef = useRef<HTMLDivElement>(null)
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const statusMenuRef = useRef<HTMLDivElement>(null)
  const [paymentMethodMenuOpen, setPaymentMethodMenuOpen] = useState(false)
  const paymentMethodMenuRef = useRef<HTMLDivElement>(null)
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const sortMenuRef = useRef<HTMLDivElement>(null)
  const selectedViewOption = VIEW_OPTIONS.find((o) => o.value === viewMode) ?? VIEW_OPTIONS[0]
  const expiredMode = statusFilter === 'expired'
  const orderSortParams =
    sortOption === 'oldest'
      ? { sortBy: 'createdAt' as const, sortOrder: 'asc' as const }
      : sortOption === 'price_desc'
        ? { sortBy: 'totalAmount' as const, sortOrder: 'desc' as const }
        : sortOption === 'price_asc'
          ? { sortBy: 'totalAmount' as const, sortOrder: 'asc' as const }
          : { sortBy: 'createdAt' as const, sortOrder: 'desc' as const }

  const expiredQuery = useDashboardExpiredOrdersQuery(expiredMode)
  const pagedQuery = useDashboardOrdersInfiniteQuery(
    statusFilter,
    !expiredMode,
    orderSortParams.sortBy,
    orderSortParams.sortOrder
  )

  const ordersList = useMemo(() => {
    if (expiredMode) return expiredQuery.data?.orders ?? []
    const pages = pagedQuery.data?.pages ?? []
    return pages.flatMap((p) => p.items.map(mapApiOrderToDashboardCard))
  }, [expiredMode, expiredQuery.data, pagedQuery.data])

  const totalPages = expiredMode ? 1 : (pagedQuery.data?.pages[0]?.metadata.totalPages ?? 1)
  const totalItems = expiredMode
    ? (expiredQuery.data?.totalItems ?? 0)
    : (pagedQuery.data?.pages[0]?.metadata.totalItems ?? 0)

  const listLoading = expiredMode ? expiredQuery.isLoading : pagedQuery.isLoading

  const listError = expiredMode ? expiredQuery.isError : pagedQuery.isError

  const toggleMenu = (menu: 'status' | 'payment' | 'sort' | 'view') => {
    setStatusMenuOpen((prev) => (menu === 'status' ? !prev : false))
    setPaymentMethodMenuOpen((prev) => (menu === 'payment' ? !prev : false))
    setSortMenuOpen((prev) => (menu === 'sort' ? !prev : false))
    setViewMenuOpen((prev) => (menu === 'view' ? !prev : false))
  }

  const filtered = useMemo(() => {
    const q = orderSearch.trim().toLowerCase()
    const statusFiltered =
      statusFilter === 'all' || expiredMode
        ? ordersList
        : ordersList.filter((o) => o.status === statusFilter)
    const methodFiltered =
      paymentMethodFilter === 'all'
        ? statusFiltered
        : statusFiltered.filter((o) => o.paymentMethod === paymentMethodFilter)
    if (!q) return methodFiltered
    return methodFiltered.filter(
      (o) =>
        o.brand.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.price.toLowerCase().includes(q)
    )
  }, [expiredMode, orderSearch, ordersList, paymentMethodFilter, statusFilter])

  useEffect(() => {
    onFilteredCountChange?.(filtered.length)
  }, [filtered.length, onFilteredCountChange])

  useEffect(() => {
    if (!viewMenuOpen && !statusMenuOpen && !paymentMethodMenuOpen && !sortMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        viewMenuRef.current?.contains(target) ||
        statusMenuRef.current?.contains(target) ||
        paymentMethodMenuRef.current?.contains(target) ||
        sortMenuRef.current?.contains(target)
      )
        return
      setViewMenuOpen(false)
      setStatusMenuOpen(false)
      setPaymentMethodMenuOpen(false)
      setSortMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setViewMenuOpen(false)
      setStatusMenuOpen(false)
      setPaymentMethodMenuOpen(false)
      setSortMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [paymentMethodMenuOpen, statusMenuOpen, sortMenuOpen, viewMenuOpen])

  const visibleOrders = filtered
  const totalForFooter =
    orderSearch.trim() || paymentMethodFilter !== 'all'
      ? filtered.length
      : expiredMode
        ? filtered.length
        : totalItems
  const canLoadMore =
    !expiredMode &&
    !pagedQuery.isFetchingNextPage &&
    pagedQuery.hasNextPage &&
    !orderSearch.trim() &&
    paymentMethodFilter === 'all'
  const shown = visibleOrders.length

  const filterBar = (
    <div className="text-muted-foreground dark:text-lightsteelblue-100 lg:text-num-16 flex w-full min-w-0 flex-col gap-2 sm:gap-3 lg:flex-row lg:items-center lg:gap-3">
      <div className="rounded-num-8 px-num-12 bg-card-elevated border-border-subtle flex min-h-11 w-full min-w-0 items-center gap-2 overflow-hidden border border-solid py-0 lg:min-w-[min(100%,240px)] lg:flex-1 dark:border-[#16243B]">
        <CentralIcon
          name="IconMagnifyingGlass"
          join="round"
          fill="filled"
          stroke="2"
          radius="1"
          size={18}
          ariaHidden={true}
          className="text-muted-foreground"
        />
        <input
          type="search"
          value={orderSearch}
          onChange={(e) => setOrderSearch(e.target.value)}
          placeholder="Search using Order ID, Product Name"
          className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-foreground placeholder:text-muted-foreground min-w-0 flex-1 border-none bg-transparent px-0 py-1 text-sm font-normal outline-none focus:ring-0"
        />
      </div>

      <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-3 lg:w-auto lg:shrink-0 lg:justify-end">
        <div className="relative w-fit max-w-full shrink-0" ref={statusMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={statusMenuOpen}
            aria-label="Filter by status"
            onClick={() => toggleMenu('status')}
            className={dashboardSelectTriggerClass}
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Status
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {statusFilter === 'all' ? 'All' : dashboardOrderStatusConfig[statusFilter].label}
            </span>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={16}
              ariaHidden={true}
              className="shrink-0"
            />
          </button>
          {statusMenuOpen ? (
            <ul
              role="listbox"
              aria-label="Status"
              className={`absolute top-full left-0 z-20 mt-2 min-w-42 overflow-hidden ${siteSelectDropdownPanel}`}
            >
              <div className={siteSelectDropdownList}>
                {STATUS_OPTIONS.map((opt) => {
                  const statusCfg =
                    opt.value === 'all' ? null : dashboardOrderStatusConfig[opt.value]
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={statusFilter === opt.value}
                      className={cn(
                        siteSelectDropdownOptionRow,
                        siteSelectDropdownOptionInteractive,
                        'text-foreground dark:text-ghostwhite sm:text-num-14 lg:text-num-16 gap-2 text-sm',
                        statusFilter === opt.value && 'bg-foreground/5 dark:bg-white/5'
                      )}
                      onClick={() => {
                        setStatusFilter(opt.value)
                        setStatusMenuOpen(false)
                      }}
                    >
                      {statusCfg ? (
                        <CentralIcon
                          name={statusCfg.icon as any}
                          join="round"
                          fill="filled"
                          stroke="1"
                          radius="1"
                          size={14}
                          ariaHidden={true}
                          className={`shrink-0 ${statusCfg.color}`}
                        />
                      ) : null}
                      <span>{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            </ul>
          ) : null}
        </div>
        <div className="relative w-fit max-w-full shrink-0" ref={paymentMethodMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={paymentMethodMenuOpen}
            aria-label="Filter by payment method"
            onClick={() => toggleMenu('payment')}
            className={dashboardSelectTriggerClass}
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Payment Method
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {PAYMENT_METHOD_OPTIONS.find((o) => o.value === paymentMethodFilter)?.label ?? 'All'}
            </span>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={16}
              ariaHidden={true}
              className="shrink-0"
            />
          </button>
          {paymentMethodMenuOpen ? (
            <ul
              role="listbox"
              aria-label="Payment Method"
              className={`absolute top-full left-0 z-20 mt-2 min-w-42 overflow-hidden ${siteSelectDropdownPanel}`}
            >
              <div className={siteSelectDropdownList}>
                {PAYMENT_METHOD_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={paymentMethodFilter === opt.value}
                    className={cn(
                      siteSelectDropdownOptionRow,
                      siteSelectDropdownOptionInteractive,
                      'text-foreground dark:text-ghostwhite sm:text-num-14 lg:text-num-16 gap-2 text-sm',
                      paymentMethodFilter === opt.value && 'bg-foreground/5 dark:bg-white/5'
                    )}
                    onClick={() => {
                      setPaymentMethodFilter(opt.value)
                      setPaymentMethodMenuOpen(false)
                    }}
                  >
                    {opt.iconSrc ? (
                      <img className="h-5 w-5 shrink-0" alt="" src={opt.iconSrc} />
                    ) : null}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </ul>
          ) : null}
        </div>
        <div className="relative w-fit max-w-full shrink-0" ref={sortMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortMenuOpen}
            aria-label="Sort orders"
            onClick={() => toggleMenu('sort')}
            className={dashboardSelectTriggerClass}
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              Sort by
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? 'Newest'}
            </span>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={16}
              ariaHidden={true}
              className="shrink-0"
            />
          </button>
          {sortMenuOpen ? (
            <ul
              role="listbox"
              aria-label="Sort by"
              className={`absolute top-full left-0 z-20 mt-2 min-w-42 overflow-hidden ${siteSelectDropdownPanel}`}
            >
              <div className={siteSelectDropdownList}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={sortOption === opt.value}
                    className={cn(
                      siteSelectDropdownOptionRow,
                      siteSelectDropdownOptionInteractive,
                      'text-foreground dark:text-ghostwhite sm:text-num-14 lg:text-num-16 text-sm whitespace-nowrap',
                      sortOption === opt.value && 'bg-foreground/5 dark:bg-white/5'
                    )}
                    onClick={() => {
                      setSortOption(opt.value)
                      setSortMenuOpen(false)
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </ul>
          ) : null}
        </div>
        <div className="relative w-fit max-w-full shrink-0" ref={viewMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={viewMenuOpen}
            aria-label="View layout"
            onClick={() => toggleMenu('view')}
            className={dashboardSelectTriggerClass}
          >
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold opacity-50">
              View
            </span>
            <span className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-sm font-semibold">
              {selectedViewOption.label}
            </span>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={16}
              ariaHidden={true}
              className="shrink-0"
            />
          </button>
          {viewMenuOpen ? (
            <ul
              role="listbox"
              aria-label="View layout"
              className={`absolute top-full right-0 z-20 mt-2 min-w-42 overflow-hidden ${siteSelectDropdownPanel}`}
            >
              <div className={siteSelectDropdownList}>
                {VIEW_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={viewMode === opt.value}
                    className={cn(
                      siteSelectDropdownOptionRow,
                      siteSelectDropdownOptionInteractive,
                      'text-foreground dark:text-ghostwhite sm:text-num-14 lg:text-num-16 gap-2 text-sm',
                      viewMode === opt.value && 'bg-foreground/5 dark:bg-white/5'
                    )}
                    onClick={() => {
                      setViewMode(opt.value)
                      setViewMenuOpen(false)
                    }}
                  >
                    <CentralIcon
                      name={opt.icon as any}
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={15}
                      ariaHidden={true}
                      className="shrink-0"
                    />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )

  const hasActiveFilters =
    orderSearch.trim() !== '' || statusFilter !== 'all' || paymentMethodFilter !== 'all'

  if (filtered.length === 0 && !listLoading) {
    if (listError) {
      return (
        <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
          {filterBar}
          <div className="text-foreground dark:text-ghostwhite font-commissioner flex w-full flex-col items-center gap-2 py-12 text-center">
            <img className="size-28 opacity-90 sm:size-36" alt="" src="/icons/not-found.svg" />
            <b className="tracking-num--0_01 text-base leading-[26px] sm:text-lg">
              Could not load orders
            </b>
            <p className="text-muted-foreground dark:text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
              Please refresh the page or try again later.
            </p>
          </div>
        </div>
      )
    }

    if (hasActiveFilters) {
      return (
        <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
          {filterBar}
          <div className="text-foreground dark:text-ghostwhite font-commissioner flex w-full flex-col items-center gap-2 py-12 text-center">
            <img className="size-28 opacity-90 sm:size-36" alt="" src="/icons/not-found.svg" />
            <b className="tracking-num--0_01 text-base leading-[26px] sm:text-lg">
              No orders match
            </b>
            <p className="text-muted-foreground dark:text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
              Try another search or clear filters to see your orders.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
        {filterBar}
        <div className="text-foreground dark:text-ghostwhite font-commissioner flex w-full flex-col items-center gap-0 py-12 text-center sm:py-16">
          <img
            className="size-36 sm:size-44 lg:size-52"
            alt=""
            src="/icons/order-404.svg"
            aria-hidden
          />
          <b className="tracking-num--0_01 mt-2 text-lg leading-7 font-bold sm:text-xl">
            No Orders Yet
          </b>
          <p className="text-muted-foreground dark:text-lightsteelblue-100 sm:text-num-14 max-w-[360px] text-sm leading-6 font-medium">
            Explore our catalog and add products to your cart to view them here.
          </p>
          <Link
            href={'/shop' as Route}
            aria-label="Explore Our Shop"
            className="rounded-num-8 p-num-12 bg-active-bg text-foreground border-border-subtle hover:bg-hover-bg mt-4 box-border flex min-h-[52px] w-full max-w-[420px] items-center justify-center gap-3 border border-solid transition-colors dark:border-[#16243B] dark:bg-[#0F1B33] dark:text-white dark:hover:bg-[#15243F]"
          >
            <CentralIcon
              name="IconBasket1"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={20}
              ariaHidden={true}
              className="text-foreground shrink-0 dark:text-white"
            />
            <span className="tracking-num--0_01 sm:text-num-16 text-sm font-semibold">
              Explore Our Shop
            </span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
      {filterBar}
      {listLoading && ordersList.length === 0 ? (
        <div className="flex py-12">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
            role="status"
            aria-label="Loading orders"
          />
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {visibleOrders.map((o) => (
                <DashboardOrderCard
                  key={o.id}
                  id={o.id}
                  brand={o.brand}
                  imageUrl={o.imageUrl}
                  itemCount={o.itemCount}
                  price={o.price}
                  status={o.status}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-num-8 border-border-subtle bg-card divide-border-subtle divide-y border border-solid dark:divide-[#16243B] dark:border-[#16243B] dark:bg-[#0B1221]">
              {visibleOrders.map((o) => (
                <DashboardOrderRow
                  key={o.id}
                  id={o.id}
                  brand={o.brand}
                  imageUrl={o.imageUrl}
                  itemCount={o.itemCount}
                  price={o.price}
                  status={o.status}
                />
              ))}
            </div>
          )}

          <nav aria-label="Order list load more">
            <DashboardLoadMoreFooter
              shown={shown}
              total={totalForFooter}
              canLoadMore={canLoadMore}
              onLoadMore={() => void pagedQuery.fetchNextPage()}
            />
          </nav>
        </>
      )}
    </div>
  )
}
