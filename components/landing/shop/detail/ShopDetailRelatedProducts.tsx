import type { ProductQuickBuy } from '@/types/product'
import { ShopDetailRelatedProductsClient } from './ShopDetailRelatedProductsClient'

type Props = {
  related: ProductQuickBuy[]
}

const MAX_RELATED_ITEMS = 10

export const ShopDetailRelatedProducts = ({ related }: Props) => {
  const items = related.slice(0, MAX_RELATED_ITEMS)

  if (!items.length) return null

  return <ShopDetailRelatedProductsClient items={items} />
}
