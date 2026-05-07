export type DropProductImage = {
  url: string | null
  isPrimary?: boolean
}

export type DropProductSummary = {
  id: string
  name: string
  slug: string
  iconUrl?: string | null
  images?: DropProductImage[]
}

export type PublicDrop = {
  id: string
  quantity: number
  claimedCount: number
  expiresAt: string | null
  product: DropProductSummary
  variant: {
    id: string
    label: string
  }
  hasClaimed?: boolean
}

export type DropClaimResult = {
  claimedContent: string
  productSlug: string
  dashboardPath: string
  productId?: string
  variantLabel?: string
}

export type MyDropClaim = {
  id: string
  claimedAt: string
  claimedContent: string
  productSlug: string
  drop: {
    id: string
    product: DropProductSummary
    variant: {
      id: string
      label: string
    }
  }
}
