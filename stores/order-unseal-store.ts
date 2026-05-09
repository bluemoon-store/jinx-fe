'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/** Bump if persisted shape changes. */
export const ORDER_UNSEAL_STORAGE_KEY = 'bm_checkout_order_unseal_v1'

const noopStorage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

export function orderUnsealStorageKey(orderId: string, lineId: string) {
  return `${orderId}::${lineId}`
}

type OrderUnsealState = {
  /** Keys from `orderUnsealStorageKey`; value true when the peel has been removed for that line. */
  unsealed: Record<string, boolean>
  markUnsealed: (orderId: string, lineId: string) => void
}

export const useOrderUnsealStore = create<OrderUnsealState>()(
  persist(
    (set) => ({
      unsealed: {},
      markUnsealed: (orderId, lineId) =>
        set((s) => {
          const key = orderUnsealStorageKey(orderId, lineId)
          if (s.unsealed[key]) return s
          return { unsealed: { ...s.unsealed, [key]: true } }
        }),
    }),
    {
      name: ORDER_UNSEAL_STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window === 'undefined' ? (noopStorage as Storage) : localStorage
      ),
      partialize: (state) => ({ unsealed: state.unsealed }),
    }
  )
)
