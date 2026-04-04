import { create } from 'zustand'

export type CartItem = {
  id: string
  name: string
  variantLabel: string
  stateCode: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item, quantity) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) =>
          i.id === item.id && i.variantLabel === item.variantLabel && i.stateCode === item.stateCode
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
  clear: () => set({ items: [] }),
}))
