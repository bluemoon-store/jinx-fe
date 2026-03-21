'use client'

import { FunctionComponent, useEffect } from 'react'

import { ForgotPasswordA, ForgotPasswordB } from '@/components/auth/ForgotPasswordModal'
import ResetPasswordModal from '@/components/auth/ResetPasswordModal'
import SignInModal from '@/components/auth/SignInModal'
import SignUpModal from '@/components/auth/SignUpModal'

import { useAuthModal } from './auth-modal-context'

const AuthModalLayer: FunctionComponent = () => {
  const { view, closeAuthModal, openAuthModal, signIn } = useAuthModal()

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
            onContinueToDashboard={signIn}
            onForgotPassword={() => openAuthModal('forgot')}
            onSignUp={() => openAuthModal('signup')}
          />
        )}
        {view === 'signup' && (
          <SignUpModal onClose={closeAuthModal} onSignIn={() => openAuthModal('signin')} />
        )}
        {view === 'forgot' && (
          <ForgotPasswordA
            onClose={closeAuthModal}
            onBackToSignIn={() => openAuthModal('signin')}
            onSendOtp={() => openAuthModal('forgot-otp')}
            onCreateAccount={() => openAuthModal('signup')}
          />
        )}
        {view === 'forgot-otp' && (
          <ForgotPasswordB
            onClose={closeAuthModal}
            onBackToEmail={() => openAuthModal('forgot')}
            onContinueToReset={() => openAuthModal('reset')}
            onCreateAccount={() => openAuthModal('signup')}
          />
        )}
        {view === 'reset' && <ResetPasswordModal onClose={closeAuthModal} />}
      </div>
    </div>
  )
}

export default AuthModalLayer
