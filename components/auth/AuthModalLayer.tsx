'use client'

import { FunctionComponent, useCallback, useEffect, useState } from 'react'

import { ForgotPasswordA, ForgotPasswordB } from '@/components/auth/ForgotPasswordModal'
import ResetPasswordModal from '@/components/auth/ResetPasswordModal'
import SignInModal from '@/components/auth/SignInModal'
import SignUpModal from '@/components/auth/SignUpModal'
import { useAuth } from '@/hooks/use-auth'
import type { LoginInput, RegisterInput } from '@/lib/validations'

import { useAuthModal } from './auth-modal-context'

/** Set to false when forgot-password / OTP / reset-password APIs are ready. */
const MOCK_FORGOT_PASSWORD_FLOW = true

const AuthModalLayer: FunctionComponent = () => {
  const { view, closeAuthModal, openAuthModal } = useAuthModal()
  const { login, register, forgotPassword, verifyOtp, resetPassword, logout } = useAuth()
  const [forgotEmail, setForgotEmail] = useState('')

  useEffect(() => {
    if (!view) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [view, closeAuthModal])

  useEffect(() => {
    if (!view) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [view])

  const handleLogin = useCallback(
    async (data: LoginInput) => {
      const ok = await login(data)
      if (ok) closeAuthModal()
    },
    [login, closeAuthModal]
  )

  const handleRegister = useCallback(
    async (data: RegisterInput) => {
      const ok = await register(data)
      if (ok) closeAuthModal()
    },
    [register, closeAuthModal]
  )

  const handleSendOtp = useCallback(
    async (email: string) => {
      if (MOCK_FORGOT_PASSWORD_FLOW) {
        setForgotEmail(email)
        openAuthModal('forgot-otp')
        return
      }
      const ok = await forgotPassword(email)
      if (ok) {
        setForgotEmail(email)
        openAuthModal('forgot-otp')
      }
    },
    [forgotPassword, openAuthModal]
  )

  const handleVerifyOtp = useCallback(
    async (otp: string) => {
      if (MOCK_FORGOT_PASSWORD_FLOW) {
        openAuthModal('reset')
        return
      }
      const ok = await verifyOtp(forgotEmail, otp)
      if (ok) openAuthModal('reset')
    },
    [verifyOtp, forgotEmail, openAuthModal]
  )

  const handleResetPassword = useCallback(
    async (newPassword: string) => {
      if (MOCK_FORGOT_PASSWORD_FLOW) {
        setForgotEmail('')
        closeAuthModal()
        await logout()
        return
      }
      const ok = await resetPassword(forgotEmail, '', newPassword)
      if (ok) {
        setForgotEmail('')
        closeAuthModal()
        await logout()
      }
    },
    [resetPassword, forgotEmail, closeAuthModal, logout]
  )

  if (!view) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:px-8">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close dialog"
        onClick={closeAuthModal}
      />
      <div
        className="relative z-10 flex max-h-[90dvh] w-full max-w-[min(100vw-2rem,960px)] flex-col items-center overflow-x-hidden overflow-y-auto sm:max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {view === 'signin' && (
          <SignInModal
            onClose={closeAuthModal}
            onContinueToDashboard={handleLogin}
            onForgotPassword={() => openAuthModal('forgot')}
            onSignUp={() => openAuthModal('signup')}
          />
        )}
        {view === 'signup' && (
          <SignUpModal
            onClose={closeAuthModal}
            onSignIn={() => openAuthModal('signin')}
            onRegisterSuccess={handleRegister}
          />
        )}
        {view === 'forgot' && (
          <ForgotPasswordA
            onClose={closeAuthModal}
            onBackToSignIn={() => openAuthModal('signin')}
            onSendOtp={handleSendOtp}
            onCreateAccount={() => openAuthModal('signup')}
          />
        )}
        {view === 'forgot-otp' && (
          <ForgotPasswordB
            onClose={closeAuthModal}
            onBackToEmail={() => openAuthModal('forgot')}
            onContinueToReset={handleVerifyOtp}
            onCreateAccount={() => openAuthModal('signup')}
          />
        )}
        {view === 'reset' && (
          <ResetPasswordModal onClose={closeAuthModal} onResetSuccess={handleResetPassword} />
        )}
      </div>
    </div>
  )
}

export default AuthModalLayer
