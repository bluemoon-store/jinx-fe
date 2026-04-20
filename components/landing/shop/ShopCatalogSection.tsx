'use client'

import { FunctionComponent, Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { ShopCategorySidebar } from '@/components/landing/shop/ShopCategorySidebar'
import { ShopProductsSection } from '@/components/landing/shop/ShopProductsSection'
import { Reveal } from '@/components/ui/reveal'
import type { ProductCategory } from '@/types/product'

type Props = {
  categories: ProductCategory[]
}

/**
 * Isolated client subtree for category + product list so changing selection
 * does not re-render HotSellingProducts / sections below the catalog.
 */
const ShopCatalogSection: FunctionComponent<Props> = ({ categories }) => {
  const searchParams = useSearchParams()
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('')

  useEffect(() => {
    const next = searchParams.get('category')?.trim() ?? ''
    setSelectedCategorySlug(next)
  }, [searchParams])

  const onCategorySelect = useCallback(
    (slug: string) => {
      setSelectedCategorySlug(slug)
      const params = new URLSearchParams(searchParams.toString())
      if (slug) {
        params.set('category', slug)
      } else {
        params.delete('category')
      }
      const qs = params.toString()
      const nextUrl = qs ? `/shop?${qs}` : '/shop'
      window.history.replaceState(null, '', nextUrl)
    },
    [searchParams]
  )

  return (
    <div className="mx-auto flex w-full max-w-[1476.9px] flex-col gap-4 px-4 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8">
      <section className="grid min-w-0 items-start gap-3 text-left sm:grid-cols-[224px_1fr] sm:gap-6 lg:gap-8">
        <Reveal variant="slide-left" className="min-w-0">
          <ShopCategorySidebar
            categories={categories}
            selectedSlug={selectedCategorySlug}
            onSelect={onCategorySelect}
          />
        </Reveal>

        <Reveal variant="slide-right" delay={120} className="min-w-0">
          <Suspense fallback={<div className="min-h-[120px] w-full" aria-hidden />}>
            <ShopProductsSection selectedCategorySlug={selectedCategorySlug} />
          </Suspense>
        </Reveal>
      </section>
    </div>
  )
}

export default ShopCatalogSection
