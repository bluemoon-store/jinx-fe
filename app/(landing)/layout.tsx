'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useAuthModal } from '@/components/auth/auth-modal-context'
import { useAppStore } from '@/lib/store'

function AuthQueryHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { openAuthModal } = useAuthModal()
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)

  useEffect(() => {
    if (searchParams.get('auth') === 'signin' && !isAuthenticated) {
      openAuthModal('signin')
      const params = new URLSearchParams(searchParams.toString())
      params.delete('auth')
      const newUrl = params.toString() ? `/?${params.toString()}` : '/'
      router.replace(newUrl as any)
    }
  }, [searchParams, isAuthenticated, openAuthModal, router])

  return null
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthQueryHandler />
      {children}
    </div>
  )
}
