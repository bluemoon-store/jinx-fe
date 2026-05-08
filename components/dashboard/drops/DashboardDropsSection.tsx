'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'

import { useMyDropsQuery } from '@/hooks/use-drops'
import {
  siteSelectDropdownList,
  siteSelectDropdownOptionInteractive,
  siteSelectDropdownOptionRow,
  siteSelectDropdownPanel,
} from '@/components/ui/siteSelectDropdown'
import { cn } from '@/lib/utils'

import { DashboardDropsLoadMoreFooter } from './DashboardDropsLoadMoreFooter'
import { DashboardDropCard } from './DashboardDropCard'
import { DashboardDropRow } from './DashboardDropRow'

type DropsViewMode = 'grid' | 'list'

const VIEW_OPTIONS: { value: DropsViewMode; label: string; icon: string }[] = [
  { value: 'grid', label: 'Grid', icon: 'IconLayoutDashboard' },
  { value: 'list', label: 'List', icon: 'IconListBullets' },
]

const dashboardSelectTriggerClass = cn(
  'rounded-num-8 px-num-12 bg-card-elevated text-foreground dark:text-lightsteelblue-100 border-border-subtle dark:border-[#16243B] flex min-h-11 w-full min-w-0 items-center gap-2 border border-solid py-2'
)

function formatClaimDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function getDropStatus(expiresAt: string | null): 'claimed' | 'expired' {
  if (!expiresAt) return 'claimed'
  const expires = new Date(expiresAt)
  if (Number.isNaN(expires.getTime())) return 'claimed'
  return expires.getTime() <= Date.now() ? 'expired' : 'claimed'
}

type Props = {
  onFilteredCountChange?: (count: number) => void
}

type SortOption = 'newest' | 'oldest'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
]

export const DashboardDropsSection: FunctionComponent<Props> = ({ onFilteredCountChange }) => {
  const [dropSearch, setDropSearch] = useState('')
  const [viewMode, setViewMode] = useState<DropsViewMode>('grid')
  const [viewMenuOpen, setViewMenuOpen] = useState(false)
  const viewMenuRef = useRef<HTMLDivElement>(null)
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const sortMenuRef = useRef<HTMLDivElement>(null)

  const myDropsQuery = useMyDropsQuery()
  const dropsList = useMemo(() => {
    const list = [...(myDropsQuery.data ?? [])]
    if (sortOption === 'newest') {
      return list.sort((a, b) => new Date(b.claimedAt).getTime() - new Date(a.claimedAt).getTime())
    }
    return list.sort((a, b) => new Date(a.claimedAt).getTime() - new Date(b.claimedAt).getTime())
  }, [myDropsQuery.data, sortOption])

  const selectedViewOption = VIEW_OPTIONS.find((o) => o.value === viewMode) ?? VIEW_OPTIONS[0]

  const toggleMenu = (menu: 'view' | 'sort') => {
    setViewMenuOpen((prev) => (menu === 'view' ? !prev : false))
    setSortMenuOpen((prev) => (menu === 'sort' ? !prev : false))
  }

  const filtered = useMemo(() => {
    const q = dropSearch.trim().toLowerCase()
    if (!q) return dropsList
    return dropsList.filter(
      (d) =>
        d.product.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.variant.label.toLowerCase().includes(q)
    )
  }, [dropSearch, dropsList])

  useEffect(() => {
    onFilteredCountChange?.(filtered.length)
  }, [filtered.length, onFilteredCountChange])

  useEffect(() => {
    if (!viewMenuOpen && !sortMenuOpen) return
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      if (viewMenuRef.current?.contains(target) || sortMenuRef.current?.contains(target)) return
      setViewMenuOpen(false)
      setSortMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setViewMenuOpen(false)
      setSortMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [viewMenuOpen, sortMenuOpen])

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
          value={dropSearch}
          onChange={(e) => setDropSearch(e.target.value)}
          placeholder="Search using Product Name"
          className="tracking-num--0_01 leading-num-28 sm:text-num-14 lg:text-num-16 text-foreground placeholder:text-muted-foreground min-w-0 flex-1 border-none bg-transparent px-0 py-1 text-sm font-normal outline-none focus:ring-0"
        />
      </div>

      <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-3 lg:w-auto lg:shrink-0 lg:justify-end">
        <div className="relative w-fit max-w-full shrink-0" ref={sortMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortMenuOpen}
            aria-label="Sort drops"
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
                    key={opt.value}
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
                    key={opt.value}
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

  if (filtered.length === 0 && !myDropsQuery.isLoading) {
    return (
      <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
        {filterBar}
        <div className="text-foreground dark:text-ghostwhite font-commissioner flex w-full flex-col items-center gap-2 py-12 text-center">
          <img className="size-28 opacity-90 sm:size-36" alt="" src="/icons/not-found.svg" />
          <b className="tracking-num--0_01 text-base leading-[26px] sm:text-lg">
            {myDropsQuery.isError ? 'Could not load drops' : 'No drops match'}
          </b>
          <p className="text-muted-foreground dark:text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
            {myDropsQuery.isError
              ? 'Please refresh the page or try again later.'
              : 'Try another search to see your claimed drops.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
      {filterBar}
      {myDropsQuery.isLoading ? (
        <div className="flex py-12">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
            role="status"
            aria-label="Loading drops"
          />
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((d) => {
                const status = getDropStatus(d.expiresAt)
                return (
                  <DashboardDropCard
                    key={d.id}
                    id={d.id}
                    name={d.product.name}
                    imageUrl={d.product.imageUrl ?? d.product.iconUrl}
                    variantLabel={d.variant.label}
                    claimedAt={formatClaimDate(d.claimedAt)}
                    status={status}
                  />
                )
              })}
            </div>
          ) : (
            <div className="rounded-num-8 border-border-subtle bg-card divide-border-subtle divide-y border border-solid dark:divide-[#16243B] dark:border-[#16243B] dark:bg-[#0B1221]">
              {filtered.map((d) => {
                const status = getDropStatus(d.expiresAt)
                return (
                  <DashboardDropRow
                    key={d.id}
                    id={d.id}
                    name={d.product.name}
                    imageUrl={d.product.imageUrl ?? d.product.iconUrl}
                    variantLabel={d.variant.label}
                    claimedAt={formatClaimDate(d.claimedAt)}
                    status={status}
                  />
                )
              })}
            </div>
          )}

          <nav aria-label="Drop list load more">
            <DashboardDropsLoadMoreFooter
              shown={filtered.length}
              total={dropsList.length}
              canLoadMore={false} // listMyDropsAction doesn't support pagination yet
              onLoadMore={() => {}}
            />
          </nav>
        </>
      )}
    </div>
  )
}
