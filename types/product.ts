export type ProductTag = 'Hot' | 'NFA' | 'New'

export interface ProductVariant {
  id: string
  label: string
  price: string
  stockQuantity: number
  isActive: boolean
  sortOrder: number
}

export interface ProductCategory {
  name: string
  slug: string
  icon: string
}

export interface ProductCard {
  id: string
  name: string
  slug: string
  flair: string | null
  iconUrl: string | null
  fromPrice: string
  primaryImageUrl: string | null
  category: { name: string; slug: string; icon: string | null }
  isHot: boolean
  isNew: boolean
  isNFA: boolean
  isRestocked: boolean
  stockQuantity: number
}

/** List (and related) payloads include enough fields to render Quick Buy without a detail fetch */
export type ProductQuickBuy = ProductCard & {
  description: string
  tags: ProductTag[]
  variants: ProductVariant[]
}

export interface ProductDetail extends ProductQuickBuy {
  shortNotice: string | null
  redeemProcess: string | null
  warrantyText: string | null
  countryOfOrigin: string | null
  heroImageUrl: string | null
  breadcrumbs: string[]
  related: ProductQuickBuy[]
}
