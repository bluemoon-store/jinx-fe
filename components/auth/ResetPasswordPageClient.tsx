'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FunctionComponent, useCallback } from 'react'

import { logoutAction, resetPasswordLinkAction } from '@/actions/auth'
import ResetPasswordForm from '@/components/auth/ResetPasswordModal'
import { QUERY_KEYS } from '@/hooks/use-auth'
import { parseApiError } from '@/lib/api-error'
import { ROUTES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'
import { toast } from '@/lib/toast'
import { useQueryClient } from '@tanstack/react-query'

export const ResetPasswordPageClient: FunctionComponent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const clearAuthUser = useAppStore((s) => s.clearAuthUser)
  const token = searchParams.get('token')?.trim() ?? ''

  const handleResetSuccess = useCallback(
    async (newPassword: string) => {
      if (!token) return
      try {
        await resetPasswordLinkAction({ token, newPassword })
        toast.success('Password updated', {
          description: 'Please sign in with your new password.',
        })
        await logoutAction()
        queryClient.removeQueries({ queryKey: QUERY_KEYS.currentUser })
        clearAuthUser()
        router.push(ROUTES.HOME)
      } catch (e) {
        toast.error(parseApiError(e))
      }
    },
    [token, queryClient, clearAuthUser, router]
  )

  if (!token) {
    return (
      <div className="font-commissioner flex min-h-screen flex-col items-center justify-center gap-6 bg-[#041329] px-4 py-12 text-center text-white">
        <div className="max-w-md space-y-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Invalid reset link</h1>
          <p className="text-sm leading-relaxed text-white/75 sm:text-base">
            This link is missing a reset token. Request a new password reset from your account
            settings or the sign-in screen.
          </p>
        </div>
        <Link
          href={ROUTES.HOME}
          className="bg-fuchsia inline-flex min-h-11 items-center justify-center rounded-[7.79px] px-6 py-2.5 text-sm font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)]"
        >
          Go Home
        </Link>
      </div>
    )
  }

  return (
    <div className="font-commissioner flex min-h-screen flex-col items-center justify-center bg-[#041329] px-4 py-12 text-white">
      <ResetPasswordForm layout="page" onResetSuccess={handleResetSuccess} />
    </div>
  )
}
