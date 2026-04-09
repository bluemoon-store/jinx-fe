import { Suspense } from 'react'

import { CheckoutPageClient } from '@/components/checkout/CheckoutPageClient'
import { BrandLoader } from '@/components/ui/BrandLoader'

export const metadata = {
  title: 'Checkout',
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <BrandLoader
          fullScreen
          label="Loading checkout..."
          className="overflow-x-hidden bg-[#041329] px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
          iconClassName="h-10"
        />
      }
    >
      <CheckoutPageClient />
    </Suspense>
  )
}
