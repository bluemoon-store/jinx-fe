'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  forgotPasswordAction,
  resetPasswordAction,
  verifyOtpAction,
} from '@/actions/auth'
import { ROUTES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'
import type { LoginInput, RegisterInput } from '@/lib/validations'

export function useAuth() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, login, register, logout } = useAppStore()

  async function handleLogin(data: LoginInput): Promise<boolean> {
    try {
      await login(data)
      toast.success('Welcome back!')
      return true
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Invalid email or password')
      return false
    }
  }

  async function handleRegister(data: RegisterInput): Promise<boolean> {
    try {
      await register(data)
      toast.success('Account created successfully!')
      return true
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Could not create account')
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
      toast.success('OTP sent to your email')
      return true
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Could not send OTP')
      return false
    }
  }

  async function handleVerifyOtp(email: string, otp: string): Promise<boolean> {
    try {
      await verifyOtpAction({ email, otp })
      return true
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Invalid OTP')
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
      toast.success('Password reset successfully. Please log in.')
      return true
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Could not reset password')
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
