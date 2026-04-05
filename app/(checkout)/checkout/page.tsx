import { Suspense } from 'react'

import { CheckoutPageClient } from '@/components/checkout/CheckoutPageClient'

export const metadata = {
  title: 'Checkout',
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen overflow-x-hidden bg-[#041329]">
          <div className="mx-auto max-w-[1920px] px-4 py-8 text-sm text-lightsteelblue-200 sm:px-6 sm:py-10 sm:text-base lg:px-8">
            Loading checkout…
          </div>
        </div>
      }
    >
      <CheckoutPageClient />
    </Suspense>
  )
}
