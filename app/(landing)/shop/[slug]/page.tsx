import { FunctionComponent } from 'react'
import { ShopProductDetail } from '@/components/landing/shop/detail/ShopProductDetail'
import type { ShopProductDetail as ShopProductDetailType } from '@/components/landing/shop/detail/types'

type PageProps = {
  params: Promise<{ slug: string }>
}

const ProductViewPage: FunctionComponent<PageProps> = async ({ params }) => {
  const { slug } = await params

  const product: ShopProductDetailType = {
    slug,
    breadcrumbs: ['All Products', 'Food', 'Mod Pizza'],
    name: 'Mod Pizza',
    shortNotice: 'This gift card is only redeemable on the e-commerce platform',
    summary:
      'Nam lectus quam, convallis eu nisi a, laoreet dictum dolor. Praesent aliquam neque nibh, ac mollis lectus rhoncus eu. Sed dolor diam, consequat vitae magna sit amet, pellentesque accumsan ligula.',
    tags: ['Hot', 'NFA', 'New'],
    heroImageSrc: undefined,
    related: [
      { id: 'airbnb', name: 'AIRBNB', fromPrice: '$2.50' },
      { id: 'venmo', name: 'VENMO', fromPrice: '$2.50' },
      { id: 'dunkin', name: 'DUNKIN DONUTS', fromPrice: '$2.50' },
      { id: 'affirm', name: 'AFFIRM', fromPrice: '$2.50' },
      { id: 'mod', name: 'MOD PIZZA', fromPrice: '$2.50' },
      { id: 'five-below', name: 'FIVE BELOW', fromPrice: '$2.50' },
      { id: 'shipt', name: 'SHIPT', fromPrice: '$2.50' },
      { id: 'taco-bell', name: 'TACO BELL', fromPrice: '$2.50' },
      { id: 'burger-king', name: 'BURGER KING', fromPrice: '$2.50' },
      { id: 'seat-geek', name: 'SEAT GEEK', fromPrice: '$2.50' },
    ],
  }

  return <ShopProductDetail product={product} />
}

export default ProductViewPage
