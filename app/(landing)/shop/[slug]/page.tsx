import { FunctionComponent } from 'react'
import { ShopProductDetail } from '@/components/landing/shop/detail/ShopProductDetail'
import type { ShopProductDetail as ShopProductDetailType } from '@/components/landing/shop/detail/types'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

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
    heroImageSrc: '/icons/detail-shop.svg',
    related: [
      { id: 'airbnb', name: 'AIRBNB', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg' },
      { id: 'venmo', name: 'VENMO', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg' },
      { id: 'dunkin', name: 'DUNKIN DONUTS', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      { id: 'affirm', name: 'AFFIRM', fromPrice: '$2.50', imageSrc: '/icons/airbnb.svg' },
      { id: 'mod', name: 'MOD PIZZA', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      {
        id: 'five-below',
        name: 'FIVE BELOW',
        fromPrice: '$2.50',
        imageSrc: '/icons/starbucks.svg',
      },
      { id: 'shipt', name: 'SHIPT', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      {
        id: 'taco-bell',
        name: 'TACO BELL',
        fromPrice: '$2.50',
        imageSrc: '/icons/starbucks.svg',
      },
      {
        id: 'burger-king',
        name: 'BURGER KING',
        fromPrice: '$2.50',
        imageSrc: '/icons/starbucks.svg',
      },
      { id: 'seat-geek', name: 'SEAT GEEK', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      { id: 'chipotle', name: 'CHIPOTLE', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      { id: 'walmart', name: 'WALMART', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      { id: 'target', name: 'TARGET', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      { id: 'amazon', name: 'AMAZON', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      { id: 'starbucks', name: 'STARBUCKS', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      { id: 'subway', name: 'SUBWAY', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      { id: 'applebee', name: "APPLEBEE'S", fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      {
        id: 'bath-body',
        name: 'BATH & BODY WORKS',
        fromPrice: '$2.50',
        imageSrc: '/icons/starbucks.svg',
      },
      { id: 'grubhub', name: 'GRUBHUB', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
      { id: 'sephora', name: 'SEPHORA', fromPrice: '$2.50', imageSrc: '/icons/starbucks.svg' },
    ],
  }

  return (
    <div className="text-num-14 text-ghostwhite font-nata-sans flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-400 pt-12 text-left sm:pt-[75px]">
      <Navbar />
      <div className="flex min-w-0 flex-1 flex-col">
        <ShopProductDetail product={product} />
      </div>
      <Footer />
    </div>
  )
}

export default ProductViewPage
