import { FunctionComponent } from 'react'
import type { ProductDetail } from '@/types/product'
import { ShopDetailPurchasePanel } from './ShopDetailPurchasePanel'
import { ShopDetailSummary } from './ShopDetailSummary'

type Props = {
  product: ProductDetail
}

export const ShopDetailRightColumn: FunctionComponent<Props> = ({ product }) => {
  return (
    <section className="text-num-16 flex min-w-0 flex-col items-start gap-4 text-left sm:gap-5 lg:gap-6">
      <ShopDetailSummary product={product} />
      <ShopDetailPurchasePanel product={product} />
    </section>
  )
}
