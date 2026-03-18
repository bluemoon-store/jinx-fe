import { FunctionComponent } from 'react'
import { ShopDetailHero } from './ShopDetailHero'
import { ShopDetailPagination } from './ShopDetailPagination'
import { ShopDetailRelatedProducts } from './ShopDetailRelatedProducts'
import { ShopDetailRightColumn } from './ShopDetailRightColumn'
import { ShopDetailTopNav } from './ShopDetailTopNav'
import type { ShopProductDetail as ShopProductDetailType } from './types'

type Props = {
  product: ShopProductDetailType
}

export const ShopProductDetail: FunctionComponent<Props> = ({ product }) => {
  return (
    <div className="text-num-14 text-ghostwhite font-commissioner w-full bg-gray-400 text-center">
      <ShopDetailTopNav />

      <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-6 py-10 lg:px-56">
        <section className="grid items-start gap-10 lg:grid-cols-[620px_1fr]">
          <ShopDetailHero product={product} />
          <ShopDetailRightColumn product={product} />
        </section>

        <ShopDetailRelatedProducts related={product.related} />
        <ShopDetailPagination />
      </main>
    </div>
  )
}
