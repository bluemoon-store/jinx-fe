'use client'

import { FunctionComponent, useCallback, useEffect, useState } from 'react'

import { ForgotPasswordA, ForgotPasswordB } from '@/components/auth/ForgotPasswordModal'
import ResetPasswordModal from '@/components/auth/ResetPasswordModal'
import SignInModal from '@/components/auth/SignInModal'
import SignUpModal from '@/components/auth/SignUpModal'
import { useAuth } from '@/hooks/use-auth'
import type { LoginInput, RegisterInput } from '@/lib/validations'

import { useAuthModal } from './auth-modal-context'

const AuthModalLayer: FunctionComponent = () => {
  const { view, closeAuthModal, openAuthModal } = useAuthModal()
  const { login, register, forgotPassword, verifyOtp, resetPassword } = useAuth()
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
    [login, closeAuthModal],
  )

  const handleRegister = useCallback(
    async (data: RegisterInput) => {
      const ok = await register(data)
      if (ok) closeAuthModal()
    },
    [register, closeAuthModal],
  )

  const handleSendOtp = useCallback(
    async (email: string) => {
      const ok = await forgotPassword(email)
      if (ok) {
        setForgotEmail(email)
        openAuthModal('forgot-otp')
      }
    },
    [forgotPassword, openAuthModal],
  )

  const handleVerifyOtp = useCallback(
    async (otp: string) => {
      const ok = await verifyOtp(forgotEmail, otp)
      if (ok) openAuthModal('reset')
    },
    [verifyOtp, forgotEmail, openAuthModal],
  )

  const handleResetPassword = useCallback(
    async (newPassword: string) => {
      const ok = await resetPassword(forgotEmail, '', newPassword)
      if (ok) {
        setForgotEmail('')
        closeAuthModal()
        openAuthModal('signin')
      }
    },
    [resetPassword, forgotEmail, closeAuthModal, openAuthModal],
  )

  if (!view) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close dialog"
        onClick={closeAuthModal}
      />
      <div
        className="relative z-10 max-h-[90vh] w-full max-w-[min(100vw-2rem,960px)] overflow-y-auto overflow-x-auto"
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
