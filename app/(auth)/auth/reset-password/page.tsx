import { Suspense } from 'react'

import { ResetPasswordPageClient } from '@/components/auth/ResetPasswordPageClient'
import { BrandLoader } from '@/components/ui/BrandLoader'

export const metadata = {
  title: 'Reset password',
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <BrandLoader
          fullScreen
          label="Loading…"
          className="overflow-x-hidden bg-[#041329] px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
          iconClassName="h-10"
        />
      }
    >
      <ResetPasswordPageClient />
    </Suspense>
  )
}
