import { FunctionComponent } from 'react'
import { ShopDetailHero } from './ShopDetailHero'
import { ShopDetailRelatedProducts } from './ShopDetailRelatedProducts'
import { ShopDetailRightColumn } from './ShopDetailRightColumn'
import FAQSection from '@/components/landing/FAQSection'
import type { ProductDetail } from '@/types/product'
import { Reveal } from '@/components/ui/reveal'

type Props = {
  product: ProductDetail
}

export const ShopProductDetail: FunctionComponent<Props> = ({ product }) => {
  return (
    <section className="text-num-14 text-foreground font-commissioner w-full bg-background">
      <main className="mx-auto flex w-full max-w-[1476.9px] flex-col gap-6 px-4 py-4 sm:gap-8 sm:px-6 sm:py-6 lg:gap-6 lg:px-8 lg:py-8">
        <section className="mb-6 grid grid-cols-1 items-start gap-6 sm:mb-8 sm:gap-8 lg:mb-10 lg:grid-cols-2 lg:gap-10">
          <Reveal
            variant="slide-left"
            delay={0}
            className="w-full max-w-full min-w-0 lg:sticky lg:top-[75px] lg:z-10 lg:self-start"
          >
            <ShopDetailHero product={product} />
          </Reveal>
          <Reveal variant="slide-right" delay={120} className="min-w-0">
            <ShopDetailRightColumn product={product} />
          </Reveal>
        </section>

        <div className="bg-border-subtle h-px w-full" />

        <Reveal variant="fade-up" delay={150}>
          <div className="pt-8 sm:pt-10 lg:pt-14">
            <ShopDetailRelatedProducts related={product.related} />
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={250}>
          <div className="pt-8 sm:pt-10 lg:pt-14">
            <FAQSection />
          </div>
        </Reveal>
      </main>
    </section>
  )
}
