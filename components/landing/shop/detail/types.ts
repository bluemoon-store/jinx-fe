export type ShopProductTag = 'Hot' | 'NFA' | 'New'

export type ShopRelatedProduct = {
  id: string
  name: string
  fromPrice: string
  imageSrc?: string
}

export type ShopProductDetail = {
  slug: string
  breadcrumbs: string[]
  name: string
  shortNotice: string
  summary: string
  tags: ShopProductTag[]
  heroImageSrc?: string
  related: ShopRelatedProduct[]
}
