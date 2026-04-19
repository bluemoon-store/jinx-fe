/* eslint-disable react/no-unescaped-entities */
'use client'

import { FunctionComponent } from 'react'
import { useParams } from 'next/navigation'

import { ShopProductDetail } from '@/components/landing/shop/detail/ShopProductDetail'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import { BrandLoader } from '@/components/ui/BrandLoader'
import { parseApiError } from '@/lib/api-error'
import { useProductDetailQuery } from '@/hooks/use-products'

const ProductViewPage: FunctionComponent = () => {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug ?? ''

  const { data: product, isLoading, isError, error } = useProductDetailQuery(slug)

  if (!slug) return null

  return (
    <div className="text-num-14 text-ghostwhite font-nata-sans flex min-h-screen w-full flex-col overflow-x-clip bg-gray-400 pt-12 text-left sm:pt-[75px]">
      <Navbar />
      <div className="flex min-w-0 flex-1 flex-col">
        {isLoading ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 py-24">
            <BrandLoader />
            <p className="text-lightsteelblue-100 text-sm">Loading product…</p>
          </div>
        ) : isError || !product ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
            <p className="text-lg font-semibold text-white">Product not found</p>
            <p className="text-lightsteelblue-100 max-w-md text-sm">{parseApiError(error)}</p>
          </div>
        ) : (
          <ShopProductDetail product={product} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProductViewPage
