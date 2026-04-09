'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { CountryFlag } from '@/components/ui/CountryFlag'
import { formatUsd } from '@/lib/cart-format'
import type { CartItem } from '@/lib/cart-store'
import { useCartStore } from '@/lib/cart-store'
import { useBuyerProtectionStore } from '@/lib/buyer-protection-store'

const BUYER_PROTECTION_ENHANCED_USD = 5

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
        className="h-12 w-24 shrink-0 rounded-lg object-cover sm:h-[63px] sm:w-num-122"
      />
    )
  }
  return (
    <div
      className="h-12 w-24 shrink-0 rounded-lg bg-white/5 ring-1 ring-white/10 sm:h-[63px] sm:w-num-122"
      aria-hidden
    />
  )
}

function LineItemReadonly({ item }: { item: CartItem }) {
  const lineTotal = item.unitPrice * item.quantity
  const qtyLabel = String(item.quantity).padStart(2, '0')

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-num-15">
        <LineThumb item={item} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex min-w-0 max-w-full flex-wrap items-center gap-x-2 sm:gap-x-2.5">
            <span className="text-ghostwhite max-w-full break-words text-base leading-snug font-bold tracking-[-0.17px] sm:text-[17.5px] sm:leading-[25px]">
              {item.name}
            </span>
            <div className="flex shrink-0 items-center gap-[7.5px]">
              <div className="relative h-num-18 w-6 overflow-hidden rounded-[1.5px] border-[0.75px] border-black/10 shadow-[0px_1.5px_2.25px_#0000001a]">
                <CountryFlag
                  countryCode="CA"
                  alt="Canada flag"
                  className="h-full w-full"
                  size={24}
                  shape="rectangle"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-blend-overlay"
                  style={{
                    background:
                      'linear-gradient(225deg,rgba(255,255,255,0.3)_0%,rgba(0,0,0,0.27)_26%,rgba(255,255,255,0.26)_37%,rgba(0,0,0,0.55)_49%,rgba(0,0,0,0.24)_59%,rgba(255,255,255,0.3)_74%,rgba(39,39,39,0.22)_90%,rgba(0,0,0,0.2)_100%)',
                  }}
                />
              </div>
              <span className="text-sm font-medium text-[#c2c2e2] sm:text-[17.5px]">
                {item.stateCode}
              </span>
            </div>
          </div>
          <span
            className="min-w-0 truncate text-sm font-medium text-[#c2c2e2] sm:text-[17.5px]"
            title={item.variantLabel}
          >
            {item.variantLabel}
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-4 sm:w-[200px] sm:justify-between">
        <div className="border-whitesmoke-300 rounded-[10px] border-[1.25px] bg-gray-100 px-1.5 py-0.5">
          <span className="text-xl font-semibold tracking-[-0.2px] text-white">{qtyLabel}</span>
        </div>
        <span className="text-xl font-bold tracking-[-0.24px] text-white sm:text-2xl">
          {formatUsd(lineTotal)}
        </span>
      </div>
    </div>
  )
}

/** Left column: “Checkout overview” with payment breakdown (steps 4 & 6). */
export function CheckoutOverviewCard({ centerSecurityNote }: { centerSecurityNote?: boolean }) {
  const items = useCartStore((s) => s.items)
  const coverage = useBuyerProtectionStore((s) => s.coverage)

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const discount = 0
  const buyerProtectionUsd = coverage === 'enhanced' ? BUYER_PROTECTION_ENHANCED_USD : 0
  const totalDue = subtotal - discount + buyerProtectionUsd
  const mountedRef = useRef(false)
  const [coverageFlash, setCoverageFlash] = useState(false)

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    setCoverageFlash(true)
    const timer = window.setTimeout(() => setCoverageFlash(false), 2000)
    return () => window.clearTimeout(timer)
  }, [coverage])

  if (!items.length) {
    return (
      <div className="flex w-full max-w-[729px] flex-col gap-4 sm:gap-6">
        <h2 className="font-nata-sans text-ghostwhite text-center text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
          CHECKOUT OVERVIEW
        </h2>
        <div className="rounded-xl border border-dashed border-white/25 bg-gray-200/50 px-4 py-8 text-center sm:px-6 sm:py-10">
          <p className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
            No items in your cart.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-flex min-h-11 items-center justify-center text-sm font-semibold text-fuchsia-200 hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-[729px] flex-col gap-6 sm:gap-8">
      <h2 className="font-nata-sans text-ghostwhite text-center text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
        CHECKOUT OVERVIEW
      </h2>

      <div className="flex flex-col gap-6 rounded-[20px] border border-dashed border-white/25 bg-gray-200 p-4 sm:gap-8 sm:rounded-[25px] sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          {items.map((item) => (
            <LineItemReadonly key={itemKey(item)} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-white/20" />
          <span className="rounded-num-99 bg-white/10 px-3 py-1 text-[12.8px] font-semibold text-white">
            Payment Details
          </span>
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-[#eeeeee1a] bg-gray-100 p-4 sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-semibold text-white opacity-75 sm:text-base">
              Payment Method
            </span>
            <div className="flex min-w-0 items-center gap-2.5">
              <Image
                src={checkoutImg.btcSmall}
                alt=""
                width={20}
                height={20}
                className="shrink-0"
              />
              <span className="truncate text-sm font-semibold text-white sm:text-base">
                Bitcoin (BTC)
              </span>
            </div>
          </div>
          <Image
            src={checkoutImg.divider}
            alt=""
            width={600}
            height={1}
            className="h-px w-full opacity-80"
          />
          <div className="flex justify-between gap-2 opacity-75">
            <span className="text-sm font-semibold text-white sm:text-base">Subtotal</span>
            <span className="text-sm font-semibold text-white sm:text-base">
              {formatUsd(subtotal)}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2 sm:max-w-[389px]">
              <Image
                src={checkoutImg.receiptTaxAlt}
                alt=""
                width={18}
                height={18}
                className="shrink-0"
              />
              <span className="text-sm font-semibold text-white opacity-75 sm:text-base">
                Discount applied
              </span>
            </div>
            <span className="shrink-0 text-sm font-semibold text-white sm:text-base">
              {formatUsd(-discount)}
            </span>
          </div>
          <div
            className={`flex flex-wrap items-center justify-between gap-2 transition-colors duration-300 ${
              coverageFlash ? 'text-fuchsia [text-shadow:0px_0px_18px_rgba(235,45,255,0.95)]' : ''
            }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <Image
                src={checkoutImg.basketLine}
                alt=""
                width={18}
                height={18}
                className="shrink-0"
              />
              <span className="text-sm font-semibold text-white opacity-75 sm:text-base">
                {coverage === 'enhanced' ? 'Enhanced Buyer Protection' : 'Basic Coverage'}
              </span>
            </div>
            <span className="shrink-0 text-sm font-semibold text-white sm:text-base">
              {formatUsd(buyerProtectionUsd)}
            </span>
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
            <span
              className={`text-lg font-bold tracking-[-0.2px] text-white transition-colors duration-300 sm:text-xl ${
                coverageFlash ? 'text-fuchsia [text-shadow:0px_0px_18px_rgba(235,45,255,0.95)]' : ''
              }`}
            >
              {formatUsd(totalDue)}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`flex gap-2 opacity-75 sm:gap-[5px] ${
          centerSecurityNote ? 'items-center justify-center text-center' : 'items-start sm:items-center'
        }`}
      >
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
  )
}
