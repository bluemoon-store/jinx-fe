import { Suspense } from 'react'

import { CheckoutPageClient } from '@/components/checkout/CheckoutPageClient'

export const metadata = {
  title: 'Checkout',
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="text-lightsteelblue-200 flex min-h-screen items-center justify-center overflow-x-hidden bg-[#041329] px-4 py-8 text-sm sm:px-6 sm:py-10 sm:text-base lg:px-8">
          Loading checkout…
        </div>
      }
    >
      <CheckoutPageClient />
    </Suspense>
  )
}
