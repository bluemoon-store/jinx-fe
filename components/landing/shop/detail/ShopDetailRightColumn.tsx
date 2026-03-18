import { FunctionComponent } from 'react'
import type { ShopProductDetail } from './types'
import { ShopDetailPurchasePanel } from './ShopDetailPurchasePanel'
import { ShopDetailSummary } from './ShopDetailSummary'

type Props = {
  product: ShopProductDetail
}

export const ShopDetailRightColumn: FunctionComponent<Props> = ({ product }) => {
  return (
    <section className="text-num-16 flex flex-col items-start gap-[45px] text-left">
      <ShopDetailSummary product={product} />
      <ShopDetailPurchasePanel productName={product.name} />
    </section>
  )
}
