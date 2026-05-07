'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { previewCouponAction } from '@/actions/coupon'
import { checkoutImg } from '@/components/checkout/checkout-images'
import { useCouponPreviewMutation } from '@/hooks/use-coupons'
import { useRemoveCartItemMutation, useUpdateCartItemMutation } from '@/hooks/use-carts'
import { parseApiError } from '@/lib/api-error'
import { cartStockErrorToastMessage, parseCartStockError } from '@/lib/cart-stock-error'
import { formatUsd } from '@/lib/cart-format'
import { toast } from '@/lib/toast'
import { getAccessToken } from '@/lib/token'
import type { CartItem } from '@/stores/cart-store'
import { useCartStore } from '@/stores/cart-store'
import { useBuyerProtectionStore } from '@/stores/buyer-protection-store'
import { autoDescribePromo, friendlyPromoError, usePromoStore } from '@/stores/promo-store'
import CentralIcon from '@central-icons-react/all'

import styles from './CartColumn.module.css'

const BUYER_PROTECTION_ENHANCED_USD = 5

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
    <div className="flex w-full max-w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      <div className="flex min-w-0 flex-1 items-start gap-[15px] sm:items-center">
        <LineThumb item={item} />
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <div className="flex max-w-full min-w-0 flex-wrap items-center gap-x-2 sm:gap-x-2.5">
            <span className="text-ghostwhite max-w-full text-base leading-snug font-bold tracking-[-0.17px] break-words sm:text-[17.5px] sm:leading-[25px]">
              {item.name}
            </span>
          </div>
          <span
            className="min-w-0 truncate text-sm leading-snug font-medium text-[#c2c2e2] sm:text-[17.5px] sm:leading-[25px]"
            title={item.variantLabel}
          >
            {item.variantLabel}
          </span>
        </div>
      </div>
      <div className="flex w-full max-w-full min-w-0 shrink-0 flex-wrap content-center items-center justify-between gap-x-3 gap-y-2 sm:ml-auto sm:w-auto sm:flex-nowrap sm:justify-end sm:gap-x-4">
        <div className="border-whitesmoke-300 flex min-h-9 shrink-0 items-center gap-1 rounded-lg border bg-gray-100 px-0.5 py-0.5 sm:gap-2">
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center"
            aria-label="Decrease"
            onClick={() => onDelta(-1)}
          >
            <Image src={checkoutImg.minus} alt="" width={16} height={16} />
          </button>
          <span className="min-w-[2ch] text-center text-base font-semibold tracking-[-0.2px] text-white sm:text-lg">
            {qtyLabel}
          </span>
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center"
            aria-label="Increase"
            onClick={() => onDelta(1)}
          >
            <Image src={checkoutImg.plus} alt="" width={16} height={16} />
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

export function CartColumn({ checkoutStep }: { checkoutStep: number }) {
  const previewMutation = useCouponPreviewMutation()
  const updateCartItemMutation = useUpdateCartItemMutation()
  const removeCartItemMutation = useRemoveCartItemMutation()

  const syncBackendLineQuantity = useCallback(
    (item: CartItem, nextQuantity: number) => {
      const backendId = item.backendCartItemId
      if (!backendId || !getAccessToken()) return
      void (async () => {
        try {
          if (nextQuantity <= 0) {
            await removeCartItemMutation.mutateAsync(backendId)
          } else {
            await updateCartItemMutation.mutateAsync({
              cartItemId: backendId,
              dto: { quantity: nextQuantity },
            })
          }
        } catch (err) {
          console.error('cart line backend sync', err)
        }
      })()
    },
    [removeCartItemMutation, updateCartItemMutation]
  )

  const items = useCartStore((s) => s.items)
  const adjustItemQuantity = useCartStore((s) => s.adjustItemQuantity)
  const setItemQuantity = useCartStore((s) => s.setItemQuantity)
  const coverage = useBuyerProtectionStore((s) => s.coverage)
  const appliedPromo = usePromoStore((s) => s.appliedPromo)
  const setAppliedPromo = usePromoStore((s) => s.setAppliedPromo)
  const clearAppliedPromo = usePromoStore((s) => s.clearAppliedPromo)
  const markPromoStale = usePromoStore((s) => s.markPromoStale)

  const cartSignature = useMemo(
    () =>
      items
        .map(
          (i) =>
            `${i.id}:${i.variantId ?? ''}:${i.quantity}:${i.unitPrice}:${i.backendCartItemId ?? ''}`
        )
        .join('|'),
    [items]
  )
  const prevCartSignatureRef = useRef<string>('')

  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const promoDiscountUsd = Math.min(appliedPromo?.discountUsd ?? 0, subtotal)
  const buyerProtectionUsd = coverage === 'enhanced' ? BUYER_PROTECTION_ENHANCED_USD : 0
  const includeBuyerProtectionInSummary = checkoutStep >= 1
  const totalDue =
    subtotal - promoDiscountUsd + (includeBuyerProtectionInSummary ? buyerProtectionUsd : 0)
  const mountedRef = useRef(false)
  const [coverageFlash, setCoverageFlash] = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    setCoverageFlash(true)
    const timer = window.setTimeout(() => setCoverageFlash(false), 2000)
    return () => window.clearTimeout(timer)
  }, [coverage])

  useEffect(() => {
    if (!appliedPromo) {
      prevCartSignatureRef.current = cartSignature
      return
    }
    const prev = prevCartSignatureRef.current
    if (prev && prev !== cartSignature) {
      markPromoStale()
    }
    prevCartSignatureRef.current = cartSignature
  }, [appliedPromo, cartSignature, markPromoStale])

  /** Re-preview when the cart changes (or on mount) — reads latest code from the store to avoid duplicating the Apply request. */
  useEffect(() => {
    let cancelled = false
    const timer = window.setTimeout(() => {
      void (async () => {
        const code = usePromoStore.getState().appliedPromo?.code
        if (!code || !getAccessToken()) return
        try {
          const res = await previewCouponAction(code)
          if (cancelled) return
          if (!res.valid) {
            clearAppliedPromo()
            toast.error(friendlyPromoError(res.reason))
            return
          }
          if (res.discountType == null || res.discountValue == null) {
            clearAppliedPromo()
            toast.error(friendlyPromoError())
            return
          }
          setAppliedPromo({
            code: res.code ?? code,
            description: res.description?.trim() ? res.description : autoDescribePromo(res),
            discountUsd: Number.parseFloat(res.discountAmount ?? '0'),
            discountType: res.discountType,
            discountValue: res.discountValue,
          })
        } catch {
          /* keep applied promo on transient errors */
        }
      })()
    }, 400)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [cartSignature, clearAppliedPromo, setAppliedPromo])

  const handleApplyPromo = async () => {
    const code = promoInput.trim().toUpperCase()
    if (!code) return
    if (!getAccessToken()) {
      setPromoError('Please sign in to apply a promo code')
      return
    }
    try {
      const res = await previewMutation.mutateAsync(code)
      if (!res.valid) {
        setPromoError(friendlyPromoError(res.reason))
        return
      }
      if (res.discountType == null || res.discountValue == null) {
        setPromoError(friendlyPromoError())
        return
      }
      setAppliedPromo({
        code: res.code ?? code,
        description: res.description?.trim() ? res.description : autoDescribePromo(res),
        discountUsd: Number.parseFloat(res.discountAmount ?? '0'),
        discountType: res.discountType,
        discountValue: res.discountValue,
      })
      setPromoInput('')
      setPromoError('')
    } catch {
      setPromoError('Could not validate promo code. Try again.')
    }
  }

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
            onDelta={(delta) => {
              const prevQty = item.quantity
              const nextQty = Math.max(0, Math.min(99, item.quantity + delta))
              const lineKey = {
                id: item.id,
                variantId: item.variantId,
                variantLabel: item.variantLabel,
              }
              adjustItemQuantity(lineKey, delta)

              const backendId = item.backendCartItemId
              if (!backendId || !getAccessToken()) {
                syncBackendLineQuantity(item, nextQty)
                return
              }

              void (async () => {
                try {
                  if (nextQty <= 0) {
                    await removeCartItemMutation.mutateAsync(backendId)
                  } else {
                    await updateCartItemMutation.mutateAsync({
                      cartItemId: backendId,
                      dto: { quantity: nextQty },
                    })
                  }
                } catch (err) {
                  setItemQuantity(lineKey, prevQty)
                  const kind = parseCartStockError(err)
                  toast.error(kind ? cartStockErrorToastMessage(kind) : parseApiError(err))
                }
              })()
            }}
            onRemove={() => {
              syncBackendLineQuantity(item, 0)
              adjustItemQuantity(
                {
                  id: item.id,
                  variantId: item.variantId,
                  variantLabel: item.variantLabel,
                },
                -item.quantity
              )
            }}
          />
        ))}

        <Image
          src={checkoutImg.divider}
          alt=""
          width={800}
          height={1}
          className="h-px w-full opacity-80"
        />

        {appliedPromo ? (
          <div className="border-fuchsia/80 flex min-h-11 items-center justify-between gap-5 rounded-lg border bg-gray-200 px-3 py-2 shadow-[0px_0px_0px_3px_rgba(235,45,255,0.2)] sm:h-[56px]">
            <div className="flex min-w-0 items-center gap-2">
              <CentralIcon
                name="IconReceiptTax"
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={18}
                color="#eb2dff"
              />
              <div className="min-w-0 text-sm font-semibold tracking-[-0.16px] sm:text-base">
                <span className="mr-1.5 text-[#eb2dff]">{appliedPromo.code}</span>
                <span className="text-white opacity-75">({appliedPromo.description})</span>
              </div>
            </div>
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 text-sm font-medium tracking-[-0.16px] text-[#ff2a2a] hover:brightness-110 sm:text-base"
              onClick={clearAppliedPromo}
            >
              <span>Remove</span>
              <Image src={checkoutImg.cross} alt="" width={18} height={18} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <label
                className={`${styles.promoField} border-whitesmoke-300 flex min-h-11 flex-1 items-center gap-2 rounded-lg border bg-gray-200 px-3 py-2 sm:h-[46px]`}
              >
                <Image src={checkoutImg.receiptTax} alt="" width={18} height={18} />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value)
                    if (promoError) setPromoError('')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') void handleApplyPromo()
                  }}
                  placeholder="Apply a promo code"
                  autoComplete="off"
                  className="h-full w-full border-0 bg-transparent text-sm font-semibold tracking-[-0.16px] text-[#c2c2e2] shadow-none placeholder:text-[#c2c2e2]/45 focus:border-0 focus:shadow-none sm:text-base"
                />
              </label>
              <button
                type="button"
                disabled={previewMutation.isPending}
                className="border-darkslateblue min-h-11 shrink-0 rounded-lg border bg-gray-100 px-6 py-2 text-sm font-bold tracking-[-0.16px] text-white hover:bg-gray-700 enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 sm:h-[46px] sm:px-9 sm:text-base"
                onClick={() => void handleApplyPromo()}
              >
                Apply
              </button>
            </div>
            {promoError ? (
              <p className="text-xs font-semibold text-[#ff4b6a] sm:text-sm">{promoError}</p>
            ) : null}
          </div>
        )}

        <Image
          src={checkoutImg.divider}
          alt=""
          width={800}
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
          <div className="flex flex-wrap items-center justify-between gap-2 opacity-75">
            <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2">
              <Image
                src={checkoutImg.receiptTaxAlt}
                alt=""
                width={18}
                height={18}
                className="shrink-0"
              />
              <span className="text-sm font-semibold text-white sm:text-base">
                Discount applied
              </span>
              {appliedPromo ? (
                <span className="text-fuchsia text-sm font-bold sm:text-base">
                  {appliedPromo.code}
                </span>
              ) : null}
            </div>
            <span className="text-sm font-semibold text-white sm:text-base">
              {formatUsd(-promoDiscountUsd)}
            </span>
          </div>
          {includeBuyerProtectionInSummary ? (
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
                {buyerProtectionUsd > 0 ? `+${formatUsd(buyerProtectionUsd)}` : formatUsd(0)}
              </span>
            </div>
          ) : null}
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
