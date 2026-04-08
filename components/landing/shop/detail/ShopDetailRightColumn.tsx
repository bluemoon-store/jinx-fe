import { FunctionComponent } from 'react'
import type { ShopProductDetail } from './types'
import { ShopDetailPurchasePanel } from './ShopDetailPurchasePanel'
import { ShopDetailSummary } from './ShopDetailSummary'

type Props = {
  product: ShopProductDetail
}

export const ShopDetailRightColumn: FunctionComponent<Props> = ({ product }) => {
  return (
    <section className="text-num-16 flex min-w-0 flex-col items-start gap-6 text-left sm:gap-8 lg:gap-[45px]">
      <ShopDetailSummary product={product} />
      <div className="border-darkslateblue h-px w-full border-t border-solid" />
      <ShopDetailPurchasePanel productName={product.name} productImageSrc={product.heroImageSrc} />
    </section>
  )
}
