'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useCurrentUser } from '@/hooks/use-auth'
import { BrandLoader } from '@/components/ui/BrandLoader'
import { ROUTES } from '@/lib/constants'
import { getAccessToken } from '@/lib/token'

export function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: user, isLoading } = useCurrentUser()

  useEffect(() => {
    if (isLoading) return
    const hasToken = !!getAccessToken()
    if (hasToken && !user) {
      router.replace(`${ROUTES.HOME}?auth=signin`)
      return
    }
    if (!hasToken) {
      router.replace(`${ROUTES.HOME}?auth=signin`)
    }
  }, [isLoading, router, user])

  if (isLoading) {
    return <BrandLoader fullScreen />
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
