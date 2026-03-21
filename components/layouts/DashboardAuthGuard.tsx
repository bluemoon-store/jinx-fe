'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'

export function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, isLoading, initializeAuth } = useAppStore()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`${ROUTES.HOME}?auth=signin`)
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return <>{children}</>
}
