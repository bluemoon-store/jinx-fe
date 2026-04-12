'use client'

import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { verify2FALoginAction } from '@/actions/auth'
import { ForgotPasswordA, ForgotPasswordB } from '@/components/auth/ForgotPasswordModal'
import ResetPasswordModal from '@/components/auth/ResetPasswordModal'
import SignInModal from '@/components/auth/SignInModal'
import SignUpModal from '@/components/auth/SignUpModal'
import DeleteAccountModal from '@/components/auth/DeleteAccountModal'
import TwoFactorDisableModal from '@/components/auth/TwoFactorDisableModal'
import TwoFactorEnableModal from '@/components/auth/TwoFactorEnableModal'
import TwoFactorLoginModal from '@/components/auth/TwoFactorLoginModal'
import { QUERY_KEYS, useAuth } from '@/hooks/use-auth'
import { ROUTES } from '@/lib/constants'
import { parseApiError } from '@/lib/api-error'
import { useAppStore } from '@/lib/store'
import { setTokens } from '@/lib/token'
import { toast } from '@/lib/toast'
import type { LoginInput, RegisterInput } from '@/lib/validations'

import { useAuthModal } from './auth-modal-context'

const AuthModalLayer: FunctionComponent = () => {
  const { view, closeAuthModal, openAuthModal } = useAuthModal()
  const queryClient = useQueryClient()
  const router = useRouter()
  const {
    handleLogin,
    register,
    forgotPassword,
    verifyOtp,
    resetPassword,
    logout,
    setup2FA,
    verify2FA,
    disable2FA,
    deleteAccount,
  } = useAuth()
  const updateUser = useAppStore((s) => s.updateUser)
  const setAuthUser = useAppStore((s) => s.setAuthUser)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotOtp, setForgotOtp] = useState('')
  const [twoFactorToken, setTwoFactorToken] = useState('')

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

  const handlePasswordLogin = useCallback(
    async (data: LoginInput) => {
      const result = await handleLogin(data)
      if (!result) return
      if ('requiresTwoFactor' in result) {
        setTwoFactorToken(result.twoFactorToken)
        openAuthModal('2fa-login')
        return
      }
      closeAuthModal()
    },
    [handleLogin, closeAuthModal, openAuthModal]
  )

  const handleTwoFactorLogin = useCallback(
    async (code: string) => {
      try {
        const result = await verify2FALoginAction(twoFactorToken, code)
        setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken })
        queryClient.setQueryData(QUERY_KEYS.currentUser, result.user)
        setAuthUser(result.user)
        setTwoFactorToken('')
        closeAuthModal()
        router.push(ROUTES.DASHBOARD_ORDERS)
      } catch (e) {
        toast.error(parseApiError(e))
      }
    },
    [twoFactorToken, queryClient, setAuthUser, closeAuthModal, router]
  )

  const handleTwoFactorLoginBack = useCallback(() => {
    setTwoFactorToken('')
    openAuthModal('signin')
  }, [openAuthModal])

  const handleRegister = useCallback(
    async (data: RegisterInput) => {
      const ok = await register(data)
      if (ok) closeAuthModal()
    },
    [register, closeAuthModal]
  )

  const handleSendOtp = useCallback(
    async (email: string) => {
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
      setForgotOtp(otp)
      const ok = await verifyOtp(forgotEmail, otp)
      if (ok) openAuthModal('reset')
    },
    [verifyOtp, forgotEmail, openAuthModal]
  )

  const handleResetPassword = useCallback(
    async (newPassword: string) => {
      const ok = await resetPassword(forgotEmail, forgotOtp, newPassword)
      if (ok) {
        setForgotEmail('')
        setForgotOtp('')
        closeAuthModal()
        toast.success('Password updated', {
          description: 'You can sign in with your new password.',
        })
        await logout()
      }
    },
    [resetPassword, forgotEmail, forgotOtp, closeAuthModal, logout]
  )

  const handleTwoFactorSetup = useCallback(
    async (password: string) => setup2FA(password),
    [setup2FA]
  )

  const handleTwoFactorVerifySuccess = useCallback(
    async (code: string) => {
      await verify2FA(code)
      updateUser({ twoFactorEnabled: true })
      closeAuthModal()
    },
    [verify2FA, updateUser, closeAuthModal]
  )

  const handleTwoFactorDisable = useCallback(
    async (password: string, code: string) => {
      try {
        await disable2FA(password, code)
        updateUser({ twoFactorEnabled: false })
        closeAuthModal()
      } catch (e) {
        toast.error(parseApiError(e))
      }
    },
    [disable2FA, updateUser, closeAuthModal]
  )

  const handleDeleteAccount = useCallback(
    async (password: string) => {
      try {
        await deleteAccount(password)
        closeAuthModal()
        await logout()
      } catch (e) {
        toast.error(parseApiError(e))
      }
    },
    [deleteAccount, closeAuthModal, logout]
  )

  return (
    <AnimatePresence>
      {view ? (
        <motion.div
          key="auth-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:px-8"
        >
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
                onContinueToDashboard={handlePasswordLogin}
                onForgotPassword={() => openAuthModal('forgot')}
                onSignUp={() => openAuthModal('signup')}
              />
            )}
            {view === '2fa-login' && (
              <TwoFactorLoginModal
                onClose={closeAuthModal}
                onBack={handleTwoFactorLoginBack}
                onVerify={handleTwoFactorLogin}
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
            {view === '2fa-enable' && (
              <TwoFactorEnableModal
                onClose={closeAuthModal}
                onSetup={handleTwoFactorSetup}
                onVerifySuccess={handleTwoFactorVerifySuccess}
              />
            )}
            {view === '2fa-disable' && (
              <TwoFactorDisableModal
                onClose={closeAuthModal}
                onDisableSuccess={handleTwoFactorDisable}
              />
            )}
            {view === 'delete-account' && (
              <DeleteAccountModal onClose={closeAuthModal} onDeleteConfirm={handleDeleteAccount} />
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default AuthModalLayer
