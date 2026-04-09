'use client'

import type { Route } from 'next'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { siteSelectDropdownPanel } from '@/components/ui/siteSelectDropdown'

type Props = {
  /** Close dropdown when navigating (e.g. to /shop). */
  onNavigate?: () => void
}

/** Empty-cart flyout content with illustration from `/icons/cart-empty.svg`. */
export const CartEmptyDropdownPanel: FunctionComponent<Props> = ({ onNavigate }) => (
  <div
    className={`w-max max-w-[min(100vw-2rem,400px)] min-w-0 shrink-0 p-num-15 ${siteSelectDropdownPanel}`}
    role="dialog"
    aria-label="Shopping cart"
  >
    <div className="flex flex-col items-center text-center">
      <div className="flex shrink-0 items-center justify-center" aria-hidden>
        <img
          src="/icons/cart-empty.svg"
          alt=""
          width={133}
          height={107}
          className="h-auto w-[133px] max-w-full object-contain"
        />
      </div>
      <h3 className="text-ghostwhite text-md mb-2 font-bold tracking-tight">Your Cart is Empty</h3>
      <p className="text-lightsteelblue-200 mb-num-15 max-w-[260px] text-sm leading-relaxed">
        There&apos;s nothing in your cart. Let&apos;s get shopping!
      </p>
      <Link
        href={'/shop' as Route}
        onClick={onNavigate}
        className="rounded-num-8 sm:text-md box-border flex min-h-11 w-full touch-manipulation items-center justify-center bg-[#13253F] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#14253F]"
      >
        Browse Store
      </Link>
    </div>
  </div>
)
