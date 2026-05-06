import { Suspense } from 'react'

import { VerifyEmailPageClient } from '@/components/auth/VerifyEmailPageClient'
import { BrandLoader } from '@/components/ui/BrandLoader'

export const metadata = {
  title: 'Verify email',
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <BrandLoader
          fullScreen
          className="overflow-x-hidden bg-[#041329] px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
          iconClassName="h-10"
        />
      }
    >
      <VerifyEmailPageClient />
    </Suspense>
  )
}
