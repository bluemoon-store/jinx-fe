'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useMemo, useState } from 'react'

import type { ProductCategory } from '@/types/product'

type Row = {
  name: string
  slug: string
  icon: string
  highlight?: boolean
}

export const ShopCategorySidebar: FunctionComponent<{
  categories: ProductCategory[]
  selectedSlug: string
  onSelect: (slug: string) => void
}> = ({ categories, selectedSlug, onSelect }) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  const rows: Row[] = useMemo(
    () => [
      {
        name: 'All Giftcards',
        slug: '',
        icon: 'IconSquareGridMagnifyingGlass',
        highlight: true,
      },
      ...categories.map((c) => ({ name: c.name, slug: c.slug, icon: c.icon })),
    ],
    [categories]
  )

  return (
    <aside className="text-muted-foreground font-commissioner sm:text-num-16 flex w-full flex-col gap-2 text-left text-sm sm:w-56 sm:gap-3">
      <div className="tracking-num-0.02 text-foreground shrink-0 font-extrabold uppercase">
        Category
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible sm:pb-0">
        {rows.map((c) => {
          const isSelected = selectedSlug === c.slug
          const isHoverActive = hoveredSlug === c.slug && !isSelected

          return (
            <button
              key={c.slug || 'all'}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(c.slug)}
              onMouseEnter={() => setHoveredSlug(c.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className={[
                isSelected
                  ? 'rounded-num-8 sm:p-num-10 flex min-h-[44px] shrink-0 items-center gap-2 border border-solid border-active-border p-3 text-left text-foreground bg-active-bg dark:border-[#3B3161] dark:text-white dark:[background:linear-gradient(90deg,rgba(235,45,255,0.2),rgba(235,45,255,0)),linear-gradient(#071935,#071935)] sm:w-full'
                  : 'rounded-num-12 sm:px-num-15 flex min-h-[44px] shrink-0 items-center gap-2 px-3 py-2 sm:w-full',
                isHoverActive ? 'bg-hover-bg dark:bg-gray-700' : '',
              ].join(' ')}
            >
              <CentralIcon
                name={c.icon as never}
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={20}
                color={isSelected ? '#EB2DFF' : undefined}
              />
              <div className="flex flex-col items-center">
                <div className="tracking-num--0_01 leading-num-28 text-left font-semibold">
                  {c.name}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
