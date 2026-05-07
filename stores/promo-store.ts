'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { CouponInvalidateReason, CouponPreview } from '@/actions/coupon'
import { formatUsd } from '@/lib/cart-format'

export const PROMO_STORAGE_KEY = 'bm_checkout_promo_v2'

const noopStorage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

export type AppliedPromo = {
  code: string
  description: string
  discountUsd: number
  discountType: 'PERCENT' | 'FIXED'
  discountValue: number
}

export function friendlyPromoError(reason?: CouponInvalidateReason): string {
  switch (reason) {
    case 'NOT_FOUND':
      return "We couldn't find that code"
    case 'EXPIRED':
      return 'This code has expired'
    case 'INACTIVE':
      return 'This code is no longer active'
    case 'EXHAUSTED':
      return 'This code has been fully redeemed'
    case 'CATEGORY_MISMATCH':
      return "This code doesn't apply to items in your cart"
    case 'CART_EMPTY':
      return 'Add items to your cart before applying a code'
    default:
      return 'This promo code could not be applied'
  }
}

/** Fallback label when the API omits `description`. */
export function autoDescribePromo(
  p: Pick<CouponPreview, 'discountType' | 'discountValue'>
): string {
  const value = p.discountValue ?? 0
  if (p.discountType === 'PERCENT') {
    return `${value}% off`
  }
  return `${formatUsd(value)} off`
}

type PromoState = {
  appliedPromo: AppliedPromo | null
  /** True after cart contents change until a successful preview refresh. */
  isStale: boolean
  setAppliedPromo: (promo: AppliedPromo) => void
  clearAppliedPromo: () => void
  markPromoStale: () => void
}

export const usePromoStore = create<PromoState>()(
  persist(
    (set, get) => ({
      appliedPromo: null,
      isStale: false,
      setAppliedPromo: (promo) => set({ appliedPromo: promo, isStale: false }),
      clearAppliedPromo: () => set({ appliedPromo: null, isStale: false }),
      markPromoStale: () => {
        if (get().appliedPromo) set({ isStale: true })
      },
    }),
    {
      name: PROMO_STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window === 'undefined' ? (noopStorage as Storage) : localStorage
      ),
      partialize: (state) => ({ appliedPromo: state.appliedPromo, isStale: state.isStale }),
    }
  )
)
