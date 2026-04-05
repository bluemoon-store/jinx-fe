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
        className="h-12 w-24 shrink-0 rounded-lg object-cover sm:h-[63px] sm:w-[122px]"
      />
    )
  }
  return (
    <div
      className="h-12 w-24 shrink-0 rounded-lg bg-white/5 ring-1 ring-white/10 sm:h-[63px] sm:w-[122px]"
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
          <div className="text-ghostwhite text-base leading-snug font-bold tracking-[-0.17px] sm:text-[17.5px] sm:leading-[25px]">
            {item.name}
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="text-sm leading-snug font-medium text-[#c2c2e2] sm:text-[17.5px] sm:leading-[25px]">
              {item.variantLabel}
            </span>
            <Image src={checkoutImg.line} alt="" width={10} height={2} />
            <div className="flex items-center gap-[7.5px]">
              <div className="relative h-[18px] w-6 overflow-hidden rounded-[1.5px] border-[0.75px] border-black/10 shadow-[0px_1.5px_2.25px_#0000001a]">
                <Image
                  src={FLAG_SRC}
                  alt=""
                  width={24}
                  height={18}
                  className="h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-blend-overlay"
                  style={{
                    background:
                      'linear-gradient(225deg,rgba(255,255,255,0.3)_0%,rgba(0,0,0,0.27)_26%,rgba(255,255,255,0.26)_37%,rgba(0,0,0,0.55)_49%,rgba(0,0,0,0.24)_59%,rgba(255,255,255,0.3)_74%,rgba(39,39,39,0.22)_90%,rgba(0,0,0,0.2)_100%)',
                  }}
                />
              </div>
              <span className="text-sm leading-snug font-medium text-[#c2c2e2] sm:text-[17.5px] sm:leading-[25px]">
                {item.stateCode}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full shrink-0 flex-wrap items-center justify-between gap-3 sm:w-[283px] sm:justify-between sm:gap-6">
        <div className="border-whitesmoke-300 flex min-h-11 items-center gap-2 rounded-[10px] border-[1.25px] bg-gray-100 px-1.5 py-1 sm:gap-[12.5px]">
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center"
            aria-label="Decrease"
            onClick={() => onDelta(-1)}
          >
            <Image src={checkoutImg.minus} alt="" width={18} height={18} />
          </button>
          <span className="min-w-[2ch] text-center text-lg font-semibold tracking-[-0.2px] text-white sm:text-xl">
            {qtyLabel}
          </span>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center"
            aria-label="Increase"
            onClick={() => onDelta(1)}
          >
            <Image src={checkoutImg.plus} alt="" width={18} height={18} />
          </button>
        </div>
        <span className="text-xl font-bold tracking-[-0.24px] text-white sm:text-2xl">
          {formatUsd(lineTotal)}
        </span>
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center"
          aria-label="Remove"
          onClick={onRemove}
        >
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
      <div className="flex w-full max-w-[729px] flex-col gap-4 sm:gap-6">
        <h2 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
          YOUR CART
        </h2>
        <div className="rounded-xl border border-white/10 bg-gray-200/50 px-4 py-8 text-center sm:px-6 sm:py-10">
          <p className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
            Your cart is empty.
          </p>
          <Link
            href="/shop"
            className="bg-fuchsia mt-4 inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
          >
            Browse store
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-[729px] flex-col gap-6 sm:gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
          YOUR CART
        </h2>
        <span className="text-sm font-medium text-white opacity-75 [text-shadow:0px_0px_8.63px_#00000099] sm:text-base">
          {totalUnits} {totalUnits === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <div className="flex flex-col gap-6 sm:gap-[33px]">
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

        <Image
          src={checkoutImg.divider}
          alt=""
          width={729}
          height={1}
          className="h-px w-full opacity-80"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="border-whitesmoke-300 flex min-h-11 flex-1 items-center gap-2 rounded-lg border bg-gray-200 px-3 py-2 sm:h-[46px]">
            <Image src={checkoutImg.receiptTax} alt="" width={18} height={18} />
            <span className="text-sm font-semibold tracking-[-0.16px] text-[#c2c2e2] opacity-25 sm:text-base">
              Apply a promo code
            </span>
          </div>
          <button
            type="button"
            className="border-darkslateblue min-h-11 shrink-0 rounded-lg border bg-gray-100 px-6 py-2 text-sm font-bold tracking-[-0.16px] text-white hover:bg-gray-700 sm:h-[46px] sm:px-9 sm:text-base"
          >
            Apply
          </button>
        </div>

        <Image
          src={checkoutImg.divider}
          alt=""
          width={729}
          height={1}
          className="h-px w-full opacity-80"
        />

        <div className="flex flex-col gap-3 rounded-xl border border-[#eeeeee1a] bg-gray-100 p-4 sm:p-5">
          <div className="flex justify-between gap-2 opacity-75">
            <span className="text-sm font-semibold text-white sm:text-base">Subtotal</span>
            <span className="text-sm font-semibold text-white sm:text-base">
              {formatUsd(subtotal)}
            </span>
          </div>
          <div className="flex justify-between gap-2 opacity-75">
            <span className="text-sm font-semibold text-white sm:text-base">Discount applied</span>
            <span className="text-sm font-semibold text-white sm:text-base">{formatUsd(0)}</span>
          </div>
          <Image
            src={checkoutImg.divider}
            alt=""
            width={600}
            height={1}
            className="h-px w-full opacity-80"
          />
          <div className="flex flex-wrap justify-between gap-2">
            <span className="text-lg font-bold tracking-[-0.2px] text-white sm:text-xl">
              Total amount due
            </span>
            <span className="text-lg font-bold tracking-[-0.2px] text-white sm:text-xl">
              {formatUsd(subtotal)}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 opacity-75 sm:items-center sm:gap-[5px]">
          <Image
            src={checkoutImg.shield}
            alt=""
            width={18}
            height={18}
            className="mt-0.5 shrink-0 sm:mt-0"
          />
          <p className="text-sm leading-relaxed font-semibold tracking-[-0.16px] text-[#c2c2e2] sm:text-base sm:leading-7">
            Secure Checkout Protected by AES-256 Encryption
          </p>
        </div>
      </div>
    </div>
  )
}
