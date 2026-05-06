'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { formatUsd } from '@/lib/cart-format'
import type { CartItem } from '@/stores/cart-store'
import { useCartStore } from '@/stores/cart-store'
import { useBuyerProtectionStore } from '@/stores/buyer-protection-store'
import { usePromoStore } from '@/stores/promo-store'
import type { ApiCryptoCurrency } from '@/hooks/use-orders'
import { useOrderQuery } from '@/hooks/use-orders'

const BUYER_PROTECTION_ENHANCED_USD = 5

const CRYPTO_LABEL: Record<ApiCryptoCurrency, string> = {
  BTC: 'Bitcoin (BTC)',
  ETH: 'Ethereum (ETH)',
  LTC: 'Litecoin (LTC)',
  BCH: 'Bitcoin Cash (BCH)',
  USDT_TRC20: 'USDT (TRC-20)',
  USDT_ERC20: 'USDT (ERC-20)',
  USDC_ERC20: 'USDC (ERC-20)',
}

const CRYPTO_ICON_SMALL: Record<ApiCryptoCurrency, string> = {
  BTC: checkoutImg.btcSmall,
  ETH: checkoutImg.eth,
  LTC: checkoutImg.ltc,
  BCH: checkoutImg.bch,
  USDT_TRC20: checkoutImg.tether,
  USDT_ERC20: checkoutImg.tetherEth,
  USDC_ERC20: checkoutImg.tetherEth,
}

function itemKey(item: CartItem) {
  return `${item.id}-${item.variantId ?? ''}-${item.variantLabel}`
}

function LineThumb({ item }: { item: CartItem }) {
  if (item.thumbUrl) {
    return (
      <Image
        src={item.thumbUrl}
        alt=""
        width={122}
        height={63}
        className="sm:w-num-122 h-12 w-24 shrink-0 rounded-lg object-cover sm:h-[63px]"
      />
    )
  }
  return (
    <div
      className="sm:w-num-122 h-12 w-24 shrink-0 rounded-lg bg-white/5 ring-1 ring-white/10 sm:h-[63px]"
      aria-hidden
    />
  )
}

function LineItemReadonly({ item }: { item: CartItem }) {
  const lineTotal = item.unitPrice * item.quantity
  const qtyLabel = String(item.quantity).padStart(2, '0')

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="gap-num-15 flex min-w-0 flex-1 items-center">
        <LineThumb item={item} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex max-w-full min-w-0 flex-wrap items-center gap-x-2 sm:gap-x-2.5">
            <span className="text-ghostwhite max-w-full text-base leading-snug font-bold tracking-[-0.17px] wrap-break-word sm:text-[17.5px] sm:leading-[25px]">
              {item.name}
            </span>
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
export function CheckoutOverviewCard({
  centerSecurityNote,
  cryptocurrency,
  orderId,
}: {
  centerSecurityNote?: boolean
  cryptocurrency?: ApiCryptoCurrency
  orderId?: string
}) {
  const items = useCartStore((s) => s.items)
  const coverage = useBuyerProtectionStore((s) => s.coverage)
  const appliedPromo = usePromoStore((s) => s.appliedPromo)
  const orderQuery = useOrderQuery(orderId)
  const order = orderQuery.data

  const displayItems = useMemo(() => {
    if (!orderId) return items
    const orderItems = order?.items ?? []
    return orderItems.map((oi) => {
      const thumbUrl =
        oi.product?.images?.find((image) => image.isPrimary)?.url ??
        oi.product?.images?.find((image) => Boolean(image.url))?.url ??
        undefined
      return {
        id: oi.productId,
        name: oi.product?.name ?? 'Product',
        variantId: oi.variantId ?? undefined,
        variantLabel: oi.variantLabel ?? 'Standard',
        unitPrice: Number.parseFloat(oi.priceAtPurchase) || 0,
        quantity: oi.quantity,
        thumbUrl: thumbUrl ?? undefined,
      }
    })
  }, [items, order?.items, orderId])

  const lineItemsSubtotal = orderId
    ? (order?.items ?? []).reduce(
        (sum, i) => sum + (Number.parseFloat(i.priceAtPurchase) || 0) * i.quantity,
        0
      )
    : displayItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const subtotalFromOrder = orderId
    ? Number.parseFloat(order?.subtotalAmount ?? '')
    : Number.NaN
  const subtotal =
    orderId && Number.isFinite(subtotalFromOrder) && subtotalFromOrder >= 0
      ? subtotalFromOrder
      : lineItemsSubtotal
  const discount = orderId
    ? Number.parseFloat(order?.discountAmount ?? '0') || 0
    : Math.min(appliedPromo?.discountUsd ?? 0, subtotal)
  const buyerProtectionUsd = orderId
    ? order?.buyerProtection
      ? Number.parseFloat(order?.buyerProtectionAmount ?? '0') || 0
      : 0
    : coverage === 'enhanced'
      ? BUYER_PROTECTION_ENHANCED_USD
      : 0
  const totalDue = orderId
    ? Number.parseFloat(order?.totalAmount ?? '0') || 0
    : subtotal - discount + buyerProtectionUsd
  const effectiveCrypto = (order?.cryptoPayment?.cryptocurrency ??
    cryptocurrency ??
    'BTC') as ApiCryptoCurrency
  const paymentLabel = CRYPTO_LABEL[effectiveCrypto] ?? 'Cryptocurrency'
  const promoCodeLabel = orderId
    ? (order?.couponCode ?? order?.promoCode ?? null)
    : appliedPromo?.code
  const protectionLabel = orderId
    ? order?.buyerProtection
      ? 'Enhanced Buyer Protection'
      : 'Basic Coverage'
    : coverage === 'enhanced'
      ? 'Enhanced Buyer Protection'
      : 'Basic Coverage'
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

  if (orderId && orderQuery.isPending) {
    return (
      <div className="flex w-full max-w-[729px] flex-col gap-4 sm:gap-6">
        <h2 className="font-nata-sans text-ghostwhite text-center text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
          CHECKOUT OVERVIEW
        </h2>
        <div className="flex flex-col gap-4 rounded-[20px] border border-dashed border-white/25 bg-gray-200 p-4 sm:p-6">
          <div className="h-16 w-full animate-pulse rounded bg-white/10" />
          <div className="h-16 w-full animate-pulse rounded bg-white/10" />
          <div className="h-32 w-full animate-pulse rounded bg-white/10" />
        </div>
      </div>
    )
  }

  if (!displayItems.length) {
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
          {displayItems.map((item) => (
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
                src={CRYPTO_ICON_SMALL[effectiveCrypto] ?? checkoutImg.btcSmall}
                alt=""
                width={20}
                height={20}
                className="shrink-0"
              />
              <span className="truncate text-sm font-semibold text-white sm:text-base">
                {paymentLabel}
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
              {promoCodeLabel ? (
                <span className="text-fuchsia text-sm font-bold sm:text-base">
                  {promoCodeLabel}
                </span>
              ) : null}
            </div>
            <span className="shrink-0 text-sm font-semibold text-white sm:text-base">
              {formatUsd(-Math.abs(discount))}
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
                {protectionLabel}
              </span>
            </div>
            <span className="shrink-0 text-sm font-semibold text-white sm:text-base">
              {buyerProtectionUsd > 0 ? `+${formatUsd(buyerProtectionUsd)}` : formatUsd(0)}
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
          centerSecurityNote
            ? 'items-center justify-center text-center'
            : 'items-start sm:items-center'
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
