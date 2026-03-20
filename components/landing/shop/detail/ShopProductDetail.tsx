import { FunctionComponent } from 'react'
import { ShopDetailHero } from './ShopDetailHero'
import { ShopDetailRelatedProducts } from './ShopDetailRelatedProducts'
import { ShopDetailRightColumn } from './ShopDetailRightColumn'
import FAQSection from '@/components/landing/FAQSection'
import type { ShopProductDetail as ShopProductDetailType } from './types'

type Props = {
  product: ShopProductDetailType
}

export const ShopProductDetail: FunctionComponent<Props> = ({ product }) => {
  return (
    <section className="text-num-14 text-ghostwhite font-commissioner w-full bg-gray-400">
      <main className="mx-auto flex w-full max-w-[1476.9px] flex-col gap-6 px-4 py-4 sm:gap-8 sm:px-6 sm:py-6 lg:gap-6 lg:px-8 lg:py-8">
        <section className="mb-6 grid items-start gap-6 sm:mb-8 sm:gap-8 lg:mb-10 lg:grid-cols-[minmax(280px,620px)_1fr] lg:gap-10">
          <ShopDetailHero product={product} />
          <ShopDetailRightColumn product={product} />
        </section>

        <div className="bg-whitesmoke-300 h-px w-full" />

        <div className="pt-8 sm:pt-10 lg:pt-14">
          <ShopDetailRelatedProducts related={product.related} />
        </div>

        <div className="pt-8 sm:pt-10 lg:pt-14">
          <FAQSection />
        </div>
      </main>
    </section>
  )
}
