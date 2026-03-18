import { FunctionComponent } from 'react'

import { ShopProductCard } from './ShopProductCard'

const PRODUCTS = Array.from({ length: 12 }, (_, i) => ({ id: i }))

export const ShopProductsGrid: FunctionComponent = () => {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4">
      {PRODUCTS.map((p) => (
        <ShopProductCard key={p.id} />
      ))}
    </div>
  )
}
