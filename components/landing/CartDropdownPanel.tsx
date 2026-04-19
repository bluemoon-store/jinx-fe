'use client'

import { Fragment, type FunctionComponent } from 'react'

import CentralIcon from '@central-icons-react/all'
import Link from 'next/link'

import { CountryFlag } from '@/components/ui/CountryFlag'
import type { CartItem } from '@/lib/cart-store'
import { formatUsd } from '@/lib/cart-format'
import { useCartStore } from '@/lib/cart-store'
import { siteSelectDropdownPanel } from '@/components/ui/siteSelectDropdown'

import { CartEmptyDropdownPanel } from './CartEmptyDropdownPanel'

const CartDivider: FunctionComponent = () => (
  <div className="h-px w-full shrink-0 bg-white/10" role="separator" />
)

type CartLineProps = {
  item: CartItem
  onDelta: (delta: number) => void
}

const CartLine: FunctionComponent<CartLineProps> = ({ item, onDelta }) => (
  <div className="flex w-full min-w-0 items-center gap-3">
    <div className="h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-300/25 ring-1 ring-white/10">
      {item.thumbUrl ? (
        <img
          className="block h-full w-full scale-110 object-cover object-center"
          alt={`${item.name} thumbnail`}
          src={item.thumbUrl}
          width={56}
          height={40}
        />
      ) : (
        <div className="h-full w-full" aria-hidden />
      )}
    </div>
    <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
      <b className="tracking-num--0_01 leading-num-20">{item.name}</b>
      <div className="flex flex-wrap items-center gap-2 text-center text-[#C3C3E3]">
        <div className="leading-num-20 font-medium">{item.variantLabel}</div>
        <div className="border-whitesmoke-200/10 box-border h-px w-[9px] shrink-0 border-t border-solid" />
        <div className="flex items-center gap-1.5">
          <div className="grid h-3 w-4 shrink-0 place-items-stretch overflow-hidden rounded-[1.2px] border-[0.6px] border-gray-300 shadow-[0px_1.2000732421875px_1.8px_rgba(0,0,0,0.1)]">
            <CountryFlag
              countryCode={item.regionCountry ?? 'CA'}
              shape="rectangle"
              alt="Region flag"
              className="col-span-full row-span-full h-full w-full object-cover"
              size={16}
            />
          </div>
          <div className="leading-num-20 font-medium">{item.regionLabel}</div>
        </div>
      </div>
    </div>
    <div className="text-num-16 ms-3 box-border flex shrink-0 items-center gap-2.5 overflow-hidden rounded-lg border border-white/10 bg-gray-100 px-2 py-1 text-white sm:ms-4">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="flex items-center justify-center"
        onClick={() => onDelta(-1)}
      >
        <CentralIcon
          name="IconMinusLarge"
          join="round"
          fill="outlined"
          stroke="2"
          radius="1"
          size={14}
          className="h-3.5 w-3.5"
        />
      </button>
      <div className="flex items-center">
        <div className="tracking-num--0_01 leading-7 font-semibold">
          {item.quantity.toString().padStart(2, '0')}
        </div>
      </div>
      <button
        type="button"
        aria-label="Increase quantity"
        className="flex items-center justify-center"
        onClick={() => onDelta(1)}
      >
        <CentralIcon
          name="IconPlusLarge"
          join="round"
          fill="outlined"
          stroke="2"
          radius="1"
          size={14}
          className="h-3.5 w-3.5"
        />
      </button>
    </div>
  </div>
)

export const CartDropdownPanel: FunctionComponent = () => {
  const items = useCartStore((s) => s.items)
  const adjustItemQuantity = useCartStore((s) => s.adjustItemQuantity)

  if (!items.length) {
    return <CartEmptyDropdownPanel />
  }

  const cartTotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  const lineKey = (item: CartItem) =>
    `${item.id}-${item.variantId ?? ''}-${item.variantLabel}-${item.regionLabel}`

  return (
    <div
      className={`p-num-15 w-max max-w-[min(100vw-2rem,480px)] min-w-0 shrink-0 ${siteSelectDropdownPanel}`}
      role="dialog"
      aria-label="Shopping cart"
    >
      <div className="gap-num-15 text-num-14 text-ghostwhite font-commissioner flex w-full min-w-0 flex-col text-left">
        {items.map((item) => (
          <Fragment key={lineKey(item)}>
            <CartLine
              item={item}
              onDelta={(delta) =>
                adjustItemQuantity(
                  {
                    id: item.id,
                    variantId: item.variantId,
                    variantLabel: item.variantLabel,
                    regionLabel: item.regionLabel,
                    regionCountry: item.regionCountry,
                  },
                  delta
                )
              }
            />
            <CartDivider />
          </Fragment>
        ))}

        <div className="flex items-center justify-between gap-5 self-stretch text-center text-[13px] text-[#C3C3E3]">
          <div className="leading-num-20 font-medium">Cart Total</div>
          <b className="text-num-16 leading-6 text-white [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            {formatUsd(cartTotal)}
          </b>
        </div>

        <CartDivider />

        <div className="flex items-start self-stretch text-white">
          <Link
            href="/checkout"
            className="bg-fuchsia flex h-[38px] flex-1 items-center justify-center gap-2 rounded-lg px-3 pt-px pb-0.5 shadow-[0px_2px_0px_rgba(235,45,255,0.25)]"
          >
            <div className="tracking-num--0_01 leading-[26px] font-semibold">
              Proceed to Checkout
            </div>
            <CentralIcon
              name="IconChevronRightMedium"
              join="round"
              fill="outlined"
              stroke="2"
              radius="1"
              size={14}
              className="shrink-0 text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartDropdownPanel
