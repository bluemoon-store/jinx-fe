import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CART_STORAGE_KEY } from '@/lib/constants'

export type CartItem = {
  id: string
  name: string
  variantLabel: string
  stateCode: string
  /** Unit price in USD (dollars, not cents). */
  unitPrice: number
  quantity: number
  /** Optional product image for cart / checkout line art. */
  thumbUrl?: string
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void
  adjustItemQuantity: (
    key: Pick<CartItem, 'id' | 'variantLabel' | 'stateCode'>,
    delta: number
  ) => void
  clear: () => void
}

const noopStorage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.id === item.id &&
              i.variantLabel === item.variantLabel &&
              i.stateCode === item.stateCode
          )

          if (existingIndex >= 0) {
            const next = [...state.items]
            next[existingIndex] = {
              ...next[existingIndex],
              quantity: Math.min(99, next[existingIndex].quantity + quantity),
            }
            return { items: next }
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: Math.min(99, quantity),
              },
            ],
          }
        }),
      adjustItemQuantity: (key, delta) =>
        set((state) => {
          const idx = state.items.findIndex(
            (i) =>
              i.id === key.id &&
              i.variantLabel === key.variantLabel &&
              i.stateCode === key.stateCode
          )
          if (idx < 0) return state
          const next = [...state.items]
          const q = Math.max(0, Math.min(99, next[idx].quantity + delta))
          if (q === 0) {
            next.splice(idx, 1)
          } else {
            next[idx] = { ...next[idx], quantity: q }
          }
          return { items: next }
        }),
      clear: () => set({ items: [] }),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window === 'undefined' ? (noopStorage as Storage) : localStorage
      ),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
