'use client'

import Image from 'next/image'
import Link from 'next/link'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { formatUsd } from '@/lib/cart-format'
import type { CartItem } from '@/lib/cart-store'
import { useCartStore } from '@/lib/cart-store'

const FLAG_SRC = '/icons/flag.svg'

function itemKey(item: CartItem) {
  return `${item.id}-${item.variantLabel}-${item.stateCode}`
}

function LineThumb({ item }: { item: CartItem }) {
  if (item.thumbUrl) {
    return (
      <Image
        src={item.thumbUrl}
        alt=""
        width={122}
        height={63}
        className="h-[63px] w-[122px] shrink-0 rounded-lg object-cover"
      />
    )
  }
  return (
    <div
      className="h-[63px] w-[122px] shrink-0 rounded-lg bg-white/5 ring-1 ring-white/10"
      aria-hidden
    />
  )
}

function CartLine({
  item,
  onDelta,
  onRemove,
}: {
  item: CartItem
  onDelta: (delta: number) => void
  onRemove: () => void
}) {
  const lineTotal = item.unitPrice * item.quantity
  const qtyLabel = String(item.quantity).padStart(2, '0')

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-[15px]">
        <LineThumb item={item} />
        <div className="flex min-w-0 flex-col justify-center gap-0.5">
          <div className="text-[17.5px] font-bold leading-[25px] tracking-[-0.17px] text-ghostwhite">
            {item.name}
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[17.5px] font-medium leading-[25px] text-[#c2c2e2]">{item.variantLabel}</span>
            <Image src={checkoutImg.line} alt="" width={10} height={2} />
            <div className="flex items-center gap-[7.5px]">
              <div className="relative h-[18px] w-6 overflow-hidden rounded-[1.5px] border-[0.75px] border-black/10 shadow-[0px_1.5px_2.25px_#0000001a]">
                <Image src={FLAG_SRC} alt="" width={24} height={18} className="h-full w-full object-cover" />
                <div
                  className="pointer-events-none absolute inset-0 bg-blend-overlay"
                  style={{
                    background:
                      'linear-gradient(225deg,rgba(255,255,255,0.3)_0%,rgba(0,0,0,0.27)_26%,rgba(255,255,255,0.26)_37%,rgba(0,0,0,0.55)_49%,rgba(0,0,0,0.24)_59%,rgba(255,255,255,0.3)_74%,rgba(39,39,39,0.22)_90%,rgba(0,0,0,0.2)_100%)',
                  }}
                />
              </div>
              <span className="text-[17.5px] font-medium leading-[25px] text-[#c2c2e2]">{item.stateCode}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-6 sm:w-[283px] sm:justify-between">
        <div className="flex items-center gap-[12.5px] rounded-[10px] border-[1.25px] border-whitesmoke-300 bg-gray-100 px-1.5 py-0.5">
          <button type="button" className="p-0.5" aria-label="Decrease" onClick={() => onDelta(-1)}>
            <Image src={checkoutImg.minus} alt="" width={18} height={18} />
          </button>
          <span className="text-xl font-semibold tracking-[-0.2px] text-white">{qtyLabel}</span>
          <button type="button" className="p-0.5" aria-label="Increase" onClick={() => onDelta(1)}>
            <Image src={checkoutImg.plus} alt="" width={18} height={18} />
          </button>
        </div>
        <span className="text-2xl font-bold tracking-[-0.24px] text-white">{formatUsd(lineTotal)}</span>
        <button type="button" className="p-1" aria-label="Remove" onClick={onRemove}>
          <Image src={checkoutImg.cross} alt="" width={18} height={18} />
        </button>
      </div>
    </div>
  )
}

export function CartColumn() {
  const items = useCartStore((s) => s.items)
  const adjustItemQuantity = useCartStore((s) => s.adjustItemQuantity)

  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)

  if (!items.length) {
    return (
      <div className="flex w-full max-w-[729px] flex-col gap-6">
        <h2 className="font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-ghostwhite">
          YOUR CART
        </h2>
        <div className="rounded-xl border border-white/10 bg-gray-200/50 px-6 py-10 text-center">
          <p className="text-base font-semibold text-lightsteelblue-200">Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex rounded-lg bg-fuchsia px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
          >
            Browse store
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-[729px] flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-ghostwhite">
          YOUR CART
        </h2>
        <span className="text-base font-medium text-white opacity-75 [text-shadow:0px_0px_8.63px_#00000099]">
          {totalUnits} {totalUnits === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <div className="flex flex-col gap-[33px]">
        {items.map((item) => (
          <CartLine
            key={itemKey(item)}
            item={item}
            onDelta={(delta) =>
              adjustItemQuantity(
                {
                  id: item.id,
                  variantLabel: item.variantLabel,
                  stateCode: item.stateCode,
                },
                delta
              )
            }
            onRemove={() =>
              adjustItemQuantity(
                {
                  id: item.id,
                  variantLabel: item.variantLabel,
                  stateCode: item.stateCode,
                },
                -item.quantity
              )
            }
          />
        ))}

        <Image src={checkoutImg.divider} alt="" width={729} height={1} className="h-px w-full opacity-80" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex h-[46px] flex-1 items-center gap-2 rounded-lg border border-whitesmoke-300 bg-gray-200 px-3 py-2">
            <Image src={checkoutImg.receiptTax} alt="" width={18} height={18} />
            <span className="text-base font-semibold tracking-[-0.16px] text-[#c2c2e2] opacity-25">
              Apply a promo code
            </span>
          </div>
          <button
            type="button"
            className="h-[46px] shrink-0 rounded-lg border border-darkslateblue bg-gray-100 px-9 py-1 text-base font-bold tracking-[-0.16px] text-white hover:bg-gray-700"
          >
            Apply
          </button>
        </div>

        <Image src={checkoutImg.divider} alt="" width={729} height={1} className="h-px w-full opacity-80" />

        <div className="flex flex-col gap-3 rounded-xl border border-[#eeeeee1a] bg-gray-100 p-5">
          <div className="flex justify-between opacity-75">
            <span className="text-base font-semibold text-white">Subtotal</span>
            <span className="text-base font-semibold text-white">{formatUsd(subtotal)}</span>
          </div>
          <div className="flex justify-between opacity-75">
            <span className="text-base font-semibold text-white">Discount applied</span>
            <span className="text-base font-semibold text-white">{formatUsd(0)}</span>
          </div>
          <Image src={checkoutImg.divider} alt="" width={600} height={1} className="h-px w-full opacity-80" />
          <div className="flex justify-between">
            <span className="text-xl font-bold tracking-[-0.2px] text-white">Total amount due</span>
            <span className="text-xl font-bold tracking-[-0.2px] text-white">{formatUsd(subtotal)}</span>
          </div>
        </div>

        <div className="flex items-center gap-[5px] opacity-75">
          <Image src={checkoutImg.shield} alt="" width={18} height={18} />
          <p className="text-base font-semibold leading-7 tracking-[-0.16px] text-[#c2c2e2]">
            Secure Checkout Protected by AES-256 Encryption
          </p>
        </div>
      </div>
    </div>
  )
}
