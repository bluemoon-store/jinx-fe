'use client'

import { FunctionComponent, useState } from 'react'

import { HotSellingProducts } from '@/components/landing/shop/HotSellingProducts'
import { ShopCategorySidebar } from '@/components/landing/shop/ShopCategorySidebar'
import Navbar from '@/components/landing/Navbar'
import HowToPurchaseSection from '@/components/landing/HowToPurchaseSection'
import FAQSection from '@/components/landing/FAQSection'
import Footer from '@/components/landing/Footer'
import { ShopProductsSection } from '@/components/landing/shop/ShopProductsSection'
import { Reveal } from '@/components/ui/reveal'

const CatalogPageFilled: FunctionComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Giftcards')

  return (
    <div className="text-ghostwhite font-nata-sans sm:text-num-14 flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-400 pt-12 text-left text-sm sm:pt-[75px]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col gap-4 sm:gap-6 lg:gap-12">
        <div className="mx-auto w-full max-w-[1476.9px] px-4 sm:px-6 lg:px-8">
          <HotSellingProducts />
        </div>

        <div className="mx-auto flex w-full max-w-[1476.9px] flex-col gap-4 px-4 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8">
          <section className="grid min-w-0 items-start gap-3 text-left sm:grid-cols-[224px_1fr] sm:gap-6 lg:gap-8">
            <Reveal variant="slide-left" className="min-w-0">
              <ShopCategorySidebar
                selectedLabel={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </Reveal>

            <Reveal variant="slide-right" delay={120} className="min-w-0">
              <ShopProductsSection selectedCategory={selectedCategory} />
            </Reveal>
          </section>
        </div>

        <div className="mt-14">
          <HowToPurchaseSection />
        </div>
        <div className="my-14">
          <FAQSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CatalogPageFilled
