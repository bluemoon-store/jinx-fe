'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const PROMO_STORAGE_KEY = 'bm_checkout_promo_v1'

const noopStorage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

const PROMO_CODE_MAP: Record<string, { description: string; discountUsd: number }> = {
  // NEW05: {
  //   description: 'Launch Offer $5 Off',
  //   discountUsd: 5,
  // },
} as const

export type AppliedPromo = {
  code: string
  description: string
  discountUsd: number
}

type PromoState = {
  appliedPromo: AppliedPromo | null
  setAppliedPromo: (promo: AppliedPromo) => void
  clearAppliedPromo: () => void
}

export function resolvePromoCode(rawCode: string, subtotalUsd: number): AppliedPromo | null {
  const code = rawCode.trim().toUpperCase()
  if (!code) return null

  const match = PROMO_CODE_MAP[code as keyof typeof PROMO_CODE_MAP]
  if (!match) return null

  return {
    code,
    description: match.description,
    discountUsd: Math.max(0, Math.min(match.discountUsd, subtotalUsd)),
  }
}

export const usePromoStore = create<PromoState>()(
  persist(
    (set) => ({
      appliedPromo: null,
      setAppliedPromo: (promo) => set({ appliedPromo: promo }),
      clearAppliedPromo: () => set({ appliedPromo: null }),
    }),
    {
      name: PROMO_STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window === 'undefined' ? (noopStorage as Storage) : localStorage
      ),
      partialize: (state) => ({ appliedPromo: state.appliedPromo }),
    }
  )
)
