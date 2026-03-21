'use client'

import { useRouter } from 'next/navigation'

import { forgotPasswordAction, resetPasswordAction, verifyOtpAction } from '@/actions/auth'
import { ROUTES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'
import type { LoginInput, RegisterInput } from '@/lib/validations'

export function useAuth() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, login, register, logout } = useAppStore()

  async function handleLogin(data: LoginInput): Promise<boolean> {
    try {
      await login(data)
      router.push(ROUTES.DASHBOARD)
      return true
    } catch {
      return false
    }
  }

  async function handleRegister(data: RegisterInput): Promise<boolean> {
    try {
      await register(data)
      return true
    } catch {
      return false
    }
  }

  async function handleLogout(): Promise<void> {
    await logout()
    router.push(ROUTES.HOME)
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
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
    verifyOtp: handleVerifyOtp,
    resetPassword: handleResetPassword,
  }
}
