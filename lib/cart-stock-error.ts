import { isAxiosError } from 'axios'

export type CartStockErrorKind = 'outOfStock' | 'insufficientStock'

function readMessage(err: unknown): string {
  if (!isAxiosError(err)) return ''
  const data = err.response?.data as { message?: unknown } | undefined
  const m = data?.message
  if (typeof m === 'string') return m
  if (Array.isArray(m) && m.length > 0 && typeof m[0] === 'string') return m[0]
  return ''
}

/** Detects cart stock error codes from the API (e.g. Nest `cart.error.outOfStock`). */
export function parseCartStockError(err: unknown): CartStockErrorKind | null {
  const msg = readMessage(err)
  if (!msg) return null
  if (msg === 'cart.error.outOfStock' || msg.includes('outOfStock')) return 'outOfStock'
  if (msg === 'cart.error.insufficientStock' || msg.includes('insufficientStock')) {
    return 'insufficientStock'
  }
  return null
}

export function cartStockErrorToastMessage(kind: CartStockErrorKind): string {
  switch (kind) {
    case 'outOfStock':
      return 'This item is out of stock.'
    case 'insufficientStock':
      return 'Not enough stock for that quantity.'
    default:
      return 'Could not update your cart.'
  }
}
