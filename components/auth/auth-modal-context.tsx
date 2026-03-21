'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { useAppStore } from '@/lib/store'

export type AuthModalView = 'signin' | 'signup' | 'forgot' | 'forgot-otp' | 'reset' | null

type AuthModalContextValue = {
  view: AuthModalView
  isAuthenticated: boolean
  openAuthModal: (view: Exclude<AuthModalView, null>) => void
  closeAuthModal: () => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<AuthModalView>(null)
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)

  const openAuthModal = useCallback((v: Exclude<AuthModalView, null>) => {
    setView(v)
  }, [])

  const closeAuthModal = useCallback(() => {
    setView(null)
  }, [])

  const value = useMemo(
    () => ({ view, isAuthenticated, openAuthModal, closeAuthModal }),
    [view, isAuthenticated, openAuthModal, closeAuthModal]
  )

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext)
  if (!ctx) {
    throw new Error('useAuthModal must be used within AuthModalProvider')
  }
  return ctx
}
