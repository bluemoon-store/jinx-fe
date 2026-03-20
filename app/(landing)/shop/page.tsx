import { FunctionComponent } from 'react'

import { HotSellingProducts } from '@/components/landing/shop/HotSellingProducts'
import { ShopCategorySidebar } from '@/components/landing/shop/ShopCategorySidebar'
import { ShopDecorations } from '@/components/landing/shop/ShopDecorations'
import { ShopLoadMore } from '@/components/landing/shop/ShopLoadMore'
import { ShopProductsGrid } from '@/components/landing/shop/ShopProductsGrid'
import { ShopProductsHeader } from '@/components/landing/shop/ShopProductsHeader'
import { ShopProgress } from '@/components/landing/shop/ShopProgress'
import { ShopSearchBar } from '@/components/landing/shop/ShopSearchBar'
import { ShopTopBar } from '@/components/landing/shop/ShopTopBar'
import Navbar from '@/components/landing/Navbar'
import HowToPurchaseSection from '@/components/landing/HowToPurchaseSection'
import FAQSection from '@/components/landing/FAQSection'
import Footer from '@/components/landing/Footer'

const CatalogPageFilled: FunctionComponent = () => {
  return (
    <div className="text-num-14 text-ghostwhite font-nata-sans flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-400 text-left">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col gap-6 py-6 pt-12 sm:gap-8 sm:py-8 sm:pt-[75px] lg:gap-12 lg:py-10">
        <ShopTopBar />

        <div className="mx-auto w-full max-w-[1474px] px-4 sm:px-6 lg:px-8 xl:px-24 2xl:px-56">
          <HotSellingProducts />
        </div>

        <div className="flex w-full flex-col gap-6 px-4 sm:gap-8 sm:px-6 lg:px-8 xl:px-24 2xl:px-56">
          <ShopDecorations />

          <section className="grid items-start gap-6 text-left sm:grid-cols-[224px_1fr] sm:gap-8">
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

        <HowToPurchaseSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  )
}

export default CatalogPageFilled
