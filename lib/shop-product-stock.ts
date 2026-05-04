import type { ProductCard, ProductQuickBuy } from '@/types/product'

/** Active variants all have zero stock, or no active variants and product-level stock is zero. */
export function isQuickBuyProductOutOfStock(p: ProductQuickBuy): boolean {
  const active = p.variants.filter((v) => v.isActive)
  if (active.length > 0) return active.every((v) => v.stockQuantity <= 0)
  return p.stockQuantity <= 0
}

/** List card without variant breakdown — use aggregate product stock only. */
export function isProductCardOutOfStock(p: ProductCard): boolean {
  return p.stockQuantity <= 0
}
