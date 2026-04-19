export type ProductTag = 'Hot' | 'NFA' | 'New'

export interface ProductVariant {
  id: string
  label: string
  price: string
  currency: string
  stockQuantity: number
  isActive: boolean
  sortOrder: number
}

export interface ProductRegion {
  id: string
  label: string
  countryCode: string
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
  fromPrice: string
  primaryImageUrl: string | null
  category: { name: string; slug: string }
  isHot: boolean
  isNew: boolean
  isNFA: boolean
  isRestocked: boolean
  stockQuantity: number
}

export interface ProductDetail extends ProductCard {
  shortNotice: string | null
  description: string
  redeemProcess: string | null
  warrantyText: string | null
  countryOfOrigin: string | null
  heroImageUrl: string | null
  breadcrumbs: string[]
  variants: ProductVariant[]
  regions: ProductRegion[]
  related: ProductCard[]
  tags: ProductTag[]
}
