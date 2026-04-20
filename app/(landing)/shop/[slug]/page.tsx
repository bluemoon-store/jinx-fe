import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProductBySlugAction } from '@/actions/product'
import { ShopProductDetail } from '@/components/landing/shop/detail/ShopProductDetail'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import type { ProductDetail } from '@/types/product'

export const revalidate = 300

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

async function getProductOrNull(slug: string): Promise<ProductDetail | null> {
  if (!slug) return null
  try {
    return await getProductBySlugAction(slug)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductOrNull(slug)

  if (!product) {
    return {
      title: 'Product not found | Bluemoon Shop',
      description: 'The requested product could not be found.',
    }
  }

  const description = product.description?.trim() || `Buy ${product.name} on Bluemoon Shop.`

  return {
    title: `${product.name} | Bluemoon Shop`,
    description,
    openGraph: {
      title: `${product.name} | Bluemoon Shop`,
      description,
      images: product.heroImageUrl ?? product.primaryImageUrl ?? undefined,
    },
  }
}

export default async function ProductViewPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductOrNull(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="text-num-14 text-ghostwhite font-nata-sans flex min-h-screen w-full flex-col overflow-x-clip bg-gray-400 pt-12 text-left sm:pt-[75px]">
      <Navbar />
      <div className="flex min-w-0 flex-1 flex-col">
        <ShopProductDetail product={product} />
      </div>
      <Footer />
    </div>
  )
}
