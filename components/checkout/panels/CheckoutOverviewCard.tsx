'use client'

import Image from 'next/image'
import Link from 'next/link'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { formatUsd } from '@/lib/cart-format'
import type { CartItem } from '@/lib/cart-store'
import { useCartStore } from '@/lib/cart-store'

const FLAG_SRC = '/icons/flag.svg'
const BUYER_PROTECTION_USD = 5

function itemKey(item: CartItem) {
  return `${item.id}-${item.variantLabel}-${item.stateCode}`
}

function LineThumb({ item }: { item: CartItem }) {
  if (item.thumbUrl) {
    return (
      <Image src={item.thumbUrl} alt="" width={122} height={63} className="h-[63px] w-[122px] shrink-0 rounded-lg object-cover" />
    )
  }
  return <div className="h-[63px] w-[122px] shrink-0 rounded-lg bg-white/5 ring-1 ring-white/10" aria-hidden />
}

function LineItemReadonly({ item }: { item: CartItem }) {
  const lineTotal = item.unitPrice * item.quantity
  const qtyLabel = String(item.quantity).padStart(2, '0')

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-[15px]">
        <LineThumb item={item} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="text-[17.5px] font-bold leading-[25px] tracking-[-0.17px] text-ghostwhite">{item.name}</div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[17.5px] font-medium text-[#c2c2e2]">{item.variantLabel}</span>
            <Image src={checkoutImg.line} alt="" width={10} height={2} />
            <div className="flex items-center gap-[7.5px]">
              <div className="relative h-[18px] w-6 overflow-hidden rounded-[1.5px] border-[0.75px] border-black/10">
                <Image src={FLAG_SRC} alt="" width={24} height={18} className="h-full w-full object-cover" />
                <div
                  className="pointer-events-none absolute inset-0 bg-blend-overlay"
                  style={{
                    background:
                      'linear-gradient(225deg,rgba(255,255,255,0.3)_0%,rgba(0,0,0,0.27)_26%,rgba(255,255,255,0.26)_37%,rgba(0,0,0,0.55)_49%,rgba(0,0,0,0.24)_59%,rgba(255,255,255,0.3)_74%,rgba(39,39,39,0.22)_90%,rgba(0,0,0,0.2)_100%)',
                  }}
                />
              </div>
              <span className="text-[17.5px] font-medium text-[#c2c2e2]">{item.stateCode}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-4 sm:w-[200px] sm:justify-between">
        <div className="rounded-[10px] border-[1.25px] border-whitesmoke-300 bg-gray-100 px-1.5 py-0.5">
          <span className="text-xl font-semibold tracking-[-0.2px] text-white">{qtyLabel}</span>
        </div>
        <span className="text-2xl font-bold tracking-[-0.24px] text-white">{formatUsd(lineTotal)}</span>
      </div>
    </div>
  )
}

/** Left column: “Checkout overview” with payment breakdown (steps 4 & 6). */
export function CheckoutOverviewCard() {
  const items = useCartStore((s) => s.items)

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const discount = 0
  const totalDue = subtotal - discount + BUYER_PROTECTION_USD

  if (!items.length) {
    return (
      <div className="flex w-full max-w-[729px] flex-col gap-6">
        <h2 className="text-center font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-ghostwhite">
          CHECKOUT OVERVIEW
        </h2>
        <div className="rounded-xl border border-dashed border-white/25 bg-gray-200/50 px-6 py-10 text-center">
          <p className="text-base font-semibold text-lightsteelblue-200">No items in your cart.</p>
          <Link href="/shop" className="mt-4 inline-flex text-sm font-semibold text-fuchsia-200 hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-[729px] flex-col gap-8">
      <h2 className="text-center font-nata-sans text-2xl font-extrabold tracking-[0.48px] text-ghostwhite">
        CHECKOUT OVERVIEW
      </h2>

      <div className="flex flex-col gap-8 rounded-[25px] border border-dashed border-white/25 bg-gray-200 p-8">
        <div className="flex flex-col gap-8">
          {items.map((item) => (
            <LineItemReadonly key={itemKey(item)} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-white/20" />
          <span className="rounded-[99px] bg-white/10 px-3 py-1 text-[12.8px] font-semibold text-white">
            Payment Details
          </span>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-[#eeeeee1a] bg-gray-100 p-5">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-white opacity-75">Payment Method</span>
            <div className="flex items-center gap-2.5">
              <Image src={checkoutImg.btcSmall} alt="" width={20} height={20} />
              <span className="text-base font-semibold text-white">Bitcoin (BTC)</span>
            </div>
          </div>
          <Image src={checkoutImg.divider} alt="" width={600} height={1} className="h-px w-full opacity-80" />
          <div className="flex justify-between opacity-75">
            <span className="text-base font-semibold text-white">Subtotal</span>
            <span className="text-base font-semibold text-white">{formatUsd(subtotal)}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex max-w-[389px] flex-wrap items-center gap-2">
              <Image src={checkoutImg.receiptTaxAlt} alt="" width={18} height={18} />
              <span className="text-base font-semibold text-white opacity-75">Discount applied</span>
            </div>
            <span className="text-base font-semibold text-white">{formatUsd(-discount)}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Image src={checkoutImg.basketLine} alt="" width={18} height={18} />
              <span className="text-base font-semibold text-white opacity-75">Enhanced Buyer Protection</span>
            </div>
            <span className="text-base font-semibold text-white">{formatUsd(BUYER_PROTECTION_USD)}</span>
          </div>
          <Image src={checkoutImg.divider} alt="" width={600} height={1} className="h-px w-full opacity-80" />
          <div className="flex justify-between">
            <span className="text-xl font-bold tracking-[-0.2px] text-white">Total amount due</span>
            <span className="text-xl font-bold tracking-[-0.2px] text-white">{formatUsd(totalDue)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[5px] opacity-75">
        <Image src={checkoutImg.shield} alt="" width={18} height={18} />
        <p className="text-base font-semibold leading-7 tracking-[-0.16px] text-[#c2c2e2]">
          Secure Checkout Protected by AES-256 Encryption
        </p>
      </div>
    </div>
  )
}
