'use client'

import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useState } from 'react'

import { verifyEmailAction } from '@/actions/auth'
import { BrandLoader } from '@/components/ui/BrandLoader'
import { QUERY_KEYS } from '@/hooks/use-auth'
import { parseApiError } from '@/lib/api-error'
import { ROUTES } from '@/lib/constants'
import { useAppStore } from '@/stores/app-store'

type VerifyState = 'loading' | 'success' | 'error'

export const VerifyEmailPageClient: FunctionComponent = () => {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const updateUser = useAppStore((s) => s.updateUser)
  const token = searchParams.get('token')
  const [state, setState] = useState<VerifyState>('loading')
  const [detail, setDetail] = useState('')

  useEffect(() => {
    if (!token?.trim()) {
      setState('error')
      setDetail(
        'This link is missing a verification token. Request a new email from your account settings.'
      )
      return
    }

    let cancelled = false

    ;(async () => {
      try {
        await verifyEmailAction(token.trim())
        if (!cancelled) {
          // Do not await refetch: an active `currentUser` query can hang the UI here indefinitely.
          void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser })
          updateUser({ isVerified: true })
          setState('success')
          setDetail('Email verified! You can continue to your dashboard.')
        }
      } catch (e) {
        if (!cancelled) {
          setState('error')
          setDetail(parseApiError(e))
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [token, queryClient, updateUser])

  if (state === 'loading') {
    return (
      <BrandLoader
        fullScreen
        className="overflow-x-hidden bg-[#041329] px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
        iconClassName="h-10"
      />
    )
  }

  const isSuccess = state === 'success'

  return (
    <div className="font-commissioner flex min-h-screen flex-col items-center justify-center gap-6 bg-[#041329] px-4 py-12 text-center text-white">
      <div className="max-w-md space-y-3">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {isSuccess ? 'You are all set' : 'Verification failed'}
        </h1>
        <p className="text-sm leading-relaxed text-white/75 sm:text-base">{detail}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link
          href={ROUTES.DASHBOARD_ORDERS}
          className="bg-fuchsia inline-flex min-h-11 items-center justify-center rounded-[7.79px] px-6 py-2.5 text-sm font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)]"
        >
          Go to Dashboard
        </Link>
        <Link
          href={ROUTES.HOME}
          className="border-darkslateblue inline-flex min-h-11 items-center justify-center rounded-lg border border-solid bg-gray-300 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
