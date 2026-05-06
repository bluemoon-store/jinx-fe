import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CART_STORAGE_KEY } from '@/lib/constants'

export type CartItem = {
  id: string
  name: string
  variantId?: string
  variantLabel: string
  /** Unit price in USD (dollars, not cents). */
  unitPrice: number
  quantity: number
  /** Optional product image for cart / checkout line art. */
  thumbUrl?: string
  /** Backend cart_items row id after POST /v1/cart/items (or checkout sync). */
  backendCartItemId?: string
}

export type CartItemKey = Pick<CartItem, 'id' | 'variantId' | 'variantLabel'>

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void
  adjustItemQuantity: (key: CartItemKey, delta: number) => void
  /** Sets absolute quantity for a line (0 removes). Used to revert failed server syncs. */
  setItemQuantity: (key: CartItemKey, quantity: number) => void
  setBackendCartItemId: (key: CartItemKey, backendCartItemId: string) => void
  clear: () => void
}

const noopStorage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

function lineKeyParts(item: Pick<CartItem, 'id' | 'variantId' | 'variantLabel'>) {
  return {
    id: item.id,
    variantId: item.variantId ?? '',
    variantLabel: item.variantLabel,
  }
}

export function sameCartLine(
  a: Pick<CartItem, 'id' | 'variantId' | 'variantLabel'>,
  b: Pick<CartItem, 'id' | 'variantId' | 'variantLabel'>
) {
  const ka = lineKeyParts(a)
  const kb = lineKeyParts(b)
  return ka.id === kb.id && ka.variantId === kb.variantId && ka.variantLabel === kb.variantLabel
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity) =>
        set((state) => {
          const existingIndex = state.items.findIndex((i) => sameCartLine(i, item))

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
          const idx = state.items.findIndex((i) => sameCartLine(i, key))
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
      setItemQuantity: (key, quantity) =>
        set((state) => {
          const idx = state.items.findIndex((i) => sameCartLine(i, key))
          if (idx < 0) return state
          const next = [...state.items]
          const q = Math.max(0, Math.min(99, quantity))
          if (q === 0) {
            next.splice(idx, 1)
          } else {
            next[idx] = { ...next[idx], quantity: q }
          }
          return { items: next }
        }),
      setBackendCartItemId: (key, backendCartItemId) =>
        set((state) => {
          const idx = state.items.findIndex((i) => sameCartLine(i, key))
          if (idx < 0) return state
          const next = [...state.items]
          next[idx] = { ...next[idx], backendCartItemId }
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
