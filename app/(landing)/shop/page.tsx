import { getCategoriesAction, getProductsAction } from '@/actions/product'
import FAQSectionServer from '@/components/landing/FAQSectionServer'
import FooterServer from '@/components/landing/FooterServer'
import HowToPurchaseSection from '@/components/landing/HowToPurchaseSection'
import Navbar from '@/components/landing/Navbar'
import { HotSellingProducts } from '@/components/landing/shop/HotSellingProducts'
import ShopCatalogSection from '@/components/landing/shop/ShopCatalogSection'
import type { ProductCard, ProductCategory } from '@/types/product'

/** Hot list + categories are fetched at build time and revalidated (ISR). */
export const revalidate = 300

export default async function ShopPage() {
  let hotProducts: ProductCard[] = []
  let categories: ProductCategory[] = []

  try {
    const [hotRes, cats] = await Promise.all([
      getProductsAction({ isHot: true, limit: 10 }),
      getCategoriesAction(),
    ])
    hotProducts = hotRes.items
    categories = cats
  } catch {
    hotProducts = []
    categories = []
  }

  return (
    <div className="text-foreground font-nata-sans sm:text-num-14 bg-background flex min-h-screen w-full flex-col overflow-x-hidden pt-12 text-left text-sm sm:pt-[75px]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col gap-4 sm:gap-6 lg:gap-12">
        <div className="mx-auto w-full max-w-[1476.9px] px-4 sm:px-6 lg:px-8">
          <HotSellingProducts items={hotProducts} />
        </div>

        <ShopCatalogSection categories={categories} />

        <div className="mt-14">
          <HowToPurchaseSection />
        </div>
        <div className="my-14">
          <FAQSectionServer />
        </div>
      </main>

      <FooterServer />
    </div>
  )
}
