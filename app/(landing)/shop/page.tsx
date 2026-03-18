import { FunctionComponent } from 'react'

import { HotSellingProducts } from '@/components/landing/shop/HotSellingProducts'
import { ShopAnnotations } from '@/components/landing/shop/ShopAnnotations'
import { ShopCategorySidebar } from '@/components/landing/shop/ShopCategorySidebar'
import { ShopDecorations } from '@/components/landing/shop/ShopDecorations'
import { ShopLoadMore } from '@/components/landing/shop/ShopLoadMore'
import { ShopProductsGrid } from '@/components/landing/shop/ShopProductsGrid'
import { ShopProductsHeader } from '@/components/landing/shop/ShopProductsHeader'
import { ShopProgress } from '@/components/landing/shop/ShopProgress'
import { ShopSearchBar } from '@/components/landing/shop/ShopSearchBar'
import { ShopTopBar } from '@/components/landing/shop/ShopTopBar'

const CatalogPageFilled: FunctionComponent = () => {
  return (
    <div className="text-num-20 text-ghostwhite font-nata-sans w-full bg-gray-400 text-center">
      <ShopTopBar />

      <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-12 py-10">
        <div className="mx-auto w-full max-w-[1474px] px-6 lg:px-56">
          <HotSellingProducts />
        </div>

        <div className="flex w-full flex-col gap-8 px-6 lg:px-56">
          <ShopDecorations />

          <section className="grid items-start gap-8 text-left sm:grid-cols-[224px_1fr]">
            <ShopCategorySidebar />

            <div className="flex min-w-0 flex-col gap-4">
              <ShopProductsHeader />
              <ShopSearchBar />
              <ShopProductsGrid />

              <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
                <ShopLoadMore />
                <ShopProgress />
              </div>
            </div>
          </section>
        </div>

        <ShopAnnotations />
      </main>
    </div>
  )
}

export default CatalogPageFilled
