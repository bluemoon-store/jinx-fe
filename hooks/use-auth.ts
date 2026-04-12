'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import {
  changePasswordAction,
  deleteAccountAction,
  disable2FAAction,
  forgotPasswordAction,
  getCurrentUserAction,
  loginAction,
  logoutAction,
  registerAction,
  resetPasswordAction,
  sendVerificationEmailAction,
  setup2FAAction,
  verify2FAAction,
  verifyOtpAction,
} from '@/actions/auth'
import { ROUTES } from '@/lib/constants'
import { clearTokens, getAccessToken, setTokens } from '@/lib/token'
import { useAppStore } from '@/lib/store'
import { toast } from '@/lib/toast'
import { parseApiError } from '@/lib/api-error'
import type { LoginInput, RegisterInput } from '@/lib/validations'
import type { LoginApiResponse } from '@/types/auth'

export const QUERY_KEYS = {
  currentUser: ['currentUser'] as const,
}

export function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.currentUser,
    queryFn: getCurrentUserAction,
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !!getAccessToken(),
  })
}

export function useLoginMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setAuthUser = useAppStore((s) => s.setAuthUser)
  return useMutation({
    mutationFn: (data: LoginInput) => loginAction(data),
    onSuccess: (result) => {
      if ('requiresTwoFactor' in result) return
      setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken })
      queryClient.setQueryData(QUERY_KEYS.currentUser, result.user)
      setAuthUser(result.user)
      router.push(ROUTES.DASHBOARD_ORDERS)
    },
    onError: (error) => {
      toast.error(parseApiError(error))
    },
  })
}

export function useRegisterMutation() {
  const queryClient = useQueryClient()
  const setAuthUser = useAppStore((s) => s.setAuthUser)
  return useMutation({
    mutationFn: (data: RegisterInput) => registerAction(data),
    onSuccess: (result) => {
      setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken })
      queryClient.setQueryData(QUERY_KEYS.currentUser, result.user)
      setAuthUser(result.user)
    },
    onError: (error) => {
      toast.error(parseApiError(error))
    },
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const clearAuthUser = useAppStore((s) => s.clearAuthUser)
  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.currentUser })
      clearAuthUser()
      router.push(ROUTES.HOME)
    },
    onSettled: () => {
      clearTokens()
    },
    onError: (error) => {
      toast.error(parseApiError(error))
    },
  })
}

export function useAuth() {
  const queryClient = useQueryClient()
  const currentUserQuery = useCurrentUser()
  const { user: localUser } = useAppStore()
  const loginMutation = useLoginMutation()
  const registerMutation = useRegisterMutation()
  const logoutMutation = useLogoutMutation()
  const user = currentUserQuery.data ?? localUser

  async function handleLogin(data: LoginInput): Promise<LoginApiResponse | null> {
    try {
      return await loginMutation.mutateAsync(data)
    } catch {
      return null
    }
  }

  async function handleRegister(data: RegisterInput): Promise<boolean> {
    try {
      await registerMutation.mutateAsync(data)
      return true
    } catch {
      return false
    }
  }

  async function handleLogout(): Promise<void> {
    await logoutMutation.mutateAsync()
  }

  async function handleForgotPassword(email: string): Promise<boolean> {
    try {
      await forgotPasswordAction({ email })
      return true
    } catch {
      return false
    }
  }

  async function handleVerifyOtp(email: string, otp: string): Promise<boolean> {
    try {
      await verifyOtpAction({ email, otp })
      return true
    } catch {
      return false
    }
  }

  async function handleResetPassword(
    email: string,
    otp: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      await resetPasswordAction({ email, otp, newPassword })
      return true
    } catch {
      return false
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading:
      currentUserQuery.isFetching || loginMutation.isPending || registerMutation.isPending,
    handleLogin,
    register: handleRegister,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
    verifyOtp: handleVerifyOtp,
    resetPassword: handleResetPassword,
    refreshCurrentUser: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser }),
    setup2FA: setup2FAAction,
    verify2FA: verify2FAAction,
    disable2FA: disable2FAAction,
    deleteAccount: deleteAccountAction,
    changePassword: changePasswordAction,
    sendVerificationEmail: sendVerificationEmailAction,
  }
}
