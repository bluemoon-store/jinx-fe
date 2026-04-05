import { Suspense } from 'react'

import { CheckoutPageClient } from '@/components/checkout/CheckoutPageClient'

export const metadata = {
  title: 'Checkout',
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#041329]">
          <div className="mx-auto max-w-[1920px] px-6 py-10 text-lightsteelblue-200">Loading checkout…</div>
        </div>
      }
    >
      <CheckoutPageClient />
    </Suspense>
  )
}
