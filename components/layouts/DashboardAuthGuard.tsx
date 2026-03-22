'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'

/**
 * Waits for Zustand persist to rehydrate before trusting auth flags. Without this,
 * the first paint can be "logged out" while storage still loads, then flip to
 * "logged in" — remounting the dashboard tree and tripping React (e.g. hooks
 * count mismatch in the app router client shell).
 */
export function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, isLoading, initializeAuth } = useAppStore()
  const [persistReady, setPersistReady] = useState(false)

  useEffect(() => {
    if (useAppStore.persist.hasHydrated()) {
      setPersistReady(true)
      return
    }
    const unsub = useAppStore.persist.onFinishHydration(() => setPersistReady(true))
    return unsub
  }, [])

  useEffect(() => {
    if (!persistReady) return
    void initializeAuth()
  }, [persistReady, initializeAuth])

  useEffect(() => {
    if (!persistReady || isLoading) return
    if (!isAuthenticated) {
      router.replace(`${ROUTES.HOME}?auth=signin`)
    }
  }, [persistReady, isAuthenticated, isLoading, router])

  if (!persistReady || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
