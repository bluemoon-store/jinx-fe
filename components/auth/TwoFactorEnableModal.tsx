'use client'

import CentralIcon from '@central-icons-react/all'
import type { KeyboardEvent } from 'react'
import { FunctionComponent, useEffect, useId, useRef, useState } from 'react'

import { parseApiError } from '@/lib/api-error'
import type { Setup2FAResponse } from '@/types/auth'

export type TwoFactorEnableModalProps = {
  onClose?: () => void
  onSetup: (password: string) => Promise<Setup2FAResponse>
  onVerifySuccess: (code: string) => Promise<void>
}

const passwordRowClass =
  'rounded-num-8 border-[#18263E] text-lightsteelblue-200 px-num-12 text-sm sm:text-num-16 flex min-h-11 items-center justify-between gap-3 self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:border-fuchsia focus-within:text-fuchsia focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)] sm:gap-5'

const passwordVisibilityHitClass =
  'inline-flex shrink-0 touch-manipulation items-center justify-center rounded-num-8 p-2 [-webkit-tap-highlight-color:transparent] sm:p-0'

const passwordVisibilityFaceClass =
  'flex h-7 w-7 items-center justify-center rounded-num-8 bg-[#051329] p-1.5'

const passwordInputClass =
  'tracking-num--0_01 leading-num-28 font-normal min-w-0 h-7 flex-1 appearance-none border-0 bg-transparent p-0 text-white/75 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:font-normal placeholder:text-white placeholder:opacity-[0.1875]'

const otpCellWrapClass =
  'rounded-num-8 focus-within:border-fuchsia flex min-h-11 min-w-0 max-w-full items-center justify-center overflow-hidden border border-solid border-[#18263E] bg-gray-100 px-1 py-2 transition-[border-color,box-shadow] focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)] sm:px-2 sm:py-[9px]'

const otpInputClass =
  'tracking-num--0_01 leading-num-28 h-9 w-full min-w-0 appearance-none border-0 bg-transparent p-0 text-center text-sm font-normal text-white/75 shadow-none ring-0 outline-none placeholder:text-white/18.75 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none sm:h-7 sm:text-num-16'

const keyInputRowClass =
  'rounded-num-8 border-[#18263E] px-num-12 text-sm sm:text-num-16 flex min-h-11 items-center justify-center self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5'

const keyInputClass =
  'tracking-num--0_01 leading-num-28 text-sm font-semibold min-w-0 h-7 w-full flex-1 appearance-none border-0 bg-transparent p-0 text-center text-[#9EA0C6] shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:text-num-16'

const keyButtonClass = `${keyInputRowClass} cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200`

const continueButtonClass =
  'bg-fuchsia text-num-16 sm:py-num-12 mt-1 box-border flex w-full touch-manipulation items-center justify-center self-stretch rounded-[7.79px] px-4 py-3.5 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-60'

type Step = 'password' | 'verify'

const TwoFactorEnableModal: FunctionComponent<TwoFactorEnableModalProps> = ({
  onClose,
  onSetup,
  onVerifySuccess,
}) => {
  const passwordFieldId = useId()
  const [step, setStep] = useState<Step>('password')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [enroll, setEnroll] = useState<Setup2FAResponse | null>(null)
  const [setupError, setSetupError] = useState<string | null>(null)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const copiedResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copiedResetTimeoutRef.current) clearTimeout(copiedResetTimeoutRef.current)
    }
  }, [])

  const focusOtpInput = (i: number) => {
    queueMicrotask(() => otpInputRefs.current[i]?.focus())
  }

  const updateOtp = (index: number, value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length > 1) {
      const slice = digits.slice(0, 6 - index)
      const chars = slice.split('')
      setOtp((prev) => {
        const next = [...prev]
        chars.forEach((c, i) => {
          if (index + i < 6) next[index + i] = c
        })
        return next
      })
      focusOtpInput(Math.min(index + chars.length, 5))
      return
    }
    const next = digits.slice(-1)
    setOtp((prev) => prev.map((v, i) => (i === index ? next : v)))
    if (next && index < 5) focusOtpInput(index + 1)
  }

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      e.preventDefault()
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const handlePasswordContinue = async () => {
    const trimmed = password.trim()
    if (!trimmed) return
    setSetupError(null)
    setIsSubmitting(true)
    try {
      const data = await onSetup(trimmed)
      setEnroll(data)
      setStep('verify')
      setOtp(['', '', '', '', '', ''])
      setVerifyError(null)
    } catch (e) {
      setSetupError(parseApiError(e))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerify = async () => {
    const otpString = otp.join('')
    if (otpString.length < 6) return
    setVerifyError(null)
    setIsSubmitting(true)
    try {
      await onVerifySuccess(otpString)
    } catch (e) {
      setVerifyError(parseApiError(e))
    } finally {
      setIsSubmitting(false)
    }
  }

  const manualKey = enroll?.secret ?? ''

  const handleCopyKey = async () => {
    if (!manualKey) return
    try {
      if (!navigator?.clipboard?.writeText) return
      await navigator.clipboard.writeText(manualKey)
      setCopied(true)
      if (copiedResetTimeoutRef.current) clearTimeout(copiedResetTimeoutRef.current)
      copiedResetTimeoutRef.current = setTimeout(() => setCopied(false), 3000)
    } catch {
      // no-op
    }
  }

  return (
    <section className="text-ghostwhite font-nata-sans mx-auto box-border flex w-full max-w-[419px] flex-col items-start overflow-hidden rounded-xl border-[1px] border-solid border-gray-500 bg-gray-200 p-4 text-left text-base shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] sm:p-5 sm:text-lg lg:max-w-[520px] lg:p-6 lg:text-[20px]">
      <main className="text-whitesmoke-100 flex w-full min-w-0 flex-col items-start gap-3 sm:gap-[15px]">
        <header className="font-nata-sans flex w-full min-w-0 flex-col items-start gap-3 self-stretch">
          <div className="flex items-center justify-between gap-2 self-stretch sm:gap-5">
            <div className="flex min-w-0 flex-1 items-center">
              <h2 className="leading-num-28 text-lg font-extrabold tracking-[0.02em] uppercase sm:text-xl lg:text-[20px]">
                2 factor authentication
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-num-8 box-border flex h-[30px] w-[30px] shrink-0 touch-manipulation items-center justify-center border border-solid border-[#18263E] p-0 [-webkit-tap-highlight-color:transparent]"
              aria-label="Close"
            >
              <CentralIcon
                name="IconCrossSmall"
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={20}
                ariaHidden={true}
                className="text-white/50"
              />
            </button>
          </div>
          <div className="h-px w-full self-stretch bg-gray-100" />
        </header>

        {step === 'password' ? (
          <>
            <p className="text-num-14 font-commissioner sm:text-num-14 leading-5 font-medium text-[#9EA0C6]">
              Enter your account password to generate a new authenticator secret and QR code.
            </p>
            <section className="text-num-14 text-lightsteelblue font-commissioner flex w-full min-w-0 flex-col items-start gap-3 self-stretch sm:gap-[13px]">
              <div className="flex flex-col items-start gap-2 self-stretch">
                <label
                  htmlFor={passwordFieldId}
                  className="leading-num-20 font-semibold text-[#9EA0C6]"
                >
                  Password
                </label>
                <div className={passwordRowClass}>
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <CentralIcon
                      name="IconKey1"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={18}
                      ariaHidden={true}
                      className="shrink-0"
                    />
                    <input
                      id={passwordFieldId}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className={passwordInputClass}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className={passwordVisibilityHitClass}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    <span className={passwordVisibilityFaceClass}>
                      <CentralIcon
                        name={showPassword ? 'IconEyeOpen' : 'IconEyeSlash'}
                        join="round"
                        fill="outlined"
                        stroke="2"
                        radius="1"
                        size={18}
                        ariaHidden={true}
                      />
                    </span>
                  </button>
                </div>
              </div>
              {setupError ? (
                <p className="text-num-14 font-commissioner text-red-400" role="alert">
                  {setupError}
                </p>
              ) : null}
              <button
                type="button"
                onClick={handlePasswordContinue}
                disabled={isSubmitting || !password.trim()}
                className={continueButtonClass}
              >
                <span className="tracking-num--0_01 leading-num-28 font-semibold text-white">
                  {isSubmitting ? 'Continuing…' : 'Continue'}
                </span>
              </button>
            </section>
          </>
        ) : (
          <>
            <p className="text-num-14 font-commissioner sm:text-num-14 leading-5 font-medium text-[#9EA0C6]">
              Scan the QR code with your authenticator app or manually input the key.
            </p>

            <div className="to-fuchsia mx-auto w-fit max-w-full rounded-xl bg-gradient-to-b from-[#3B82F6] via-[#8B5CF6] p-[3px] shadow-[0_0_24px_rgba(235,45,255,0.15)]">
              <div className="flex rounded-[10px] bg-gray-200 p-2 sm:p-3">
                {enroll?.qrCode ? (
                  <img
                    src={enroll.qrCode}
                    alt="Authenticator QR code"
                    width={134}
                    height={134}
                    className="block h-auto w-[134px] max-w-full object-contain"
                    decoding="async"
                  />
                ) : null}
              </div>
            </div>

            <section className="text-num-14 font-commissioner flex w-full min-w-0 flex-col items-start gap-2 self-stretch text-[#9EA0C6] sm:gap-[13px]">
              <label htmlFor="twofa-manual-key" className="leading-num-20 font-semibold">
                Key
              </label>
              <button
                type="button"
                onClick={handleCopyKey}
                className={keyButtonClass}
                aria-label="Copy 2FA key"
              >
                {copied ? (
                  <span
                    role="status"
                    aria-live="polite"
                    className="sm:text-num-16 flex w-full items-center justify-center gap-2 text-sm font-semibold text-white"
                  >
                    <CentralIcon
                      name="IconCheckCircle2"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={18}
                      ariaHidden={true}
                      className="text-[#0CC967]"
                    />
                    Copied
                  </span>
                ) : (
                  <span id="twofa-manual-key" className={keyInputClass}>
                    {manualKey}
                  </span>
                )}
              </button>
            </section>

            <div className="h-px w-full self-stretch bg-gray-100" aria-hidden />

            <section className="text-num-14 font-commissioner flex w-full min-w-0 flex-col items-start gap-3 self-stretch sm:gap-[13px]">
              <p className="sm:text-num-14 text-sm leading-5 font-medium text-[#9EA0C6]">
                Enter the current code from your authentication app to proceed.
              </p>
              <div className="flex flex-col items-start gap-2 self-stretch">
                <div className="sm:text-num-14 text-sm leading-5 font-semibold text-[#9EA0C6]">
                  Enter Code
                </div>
                <div className="grid w-full min-w-0 grid-cols-6 gap-1.5 self-stretch sm:gap-2">
                  {otp.map((digit, index) => (
                    <div key={`twofa-enroll-otp-${index}`} className={otpCellWrapClass}>
                      <input
                        ref={(el) => {
                          otpInputRefs.current[index] = el
                        }}
                        inputMode="numeric"
                        autoComplete={index === 0 ? 'one-time-code' : 'off'}
                        maxLength={index === 0 ? 6 : 1}
                        value={digit}
                        onChange={(e) => updateOtp(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={otpInputClass}
                        placeholder="0"
                        aria-label={`Authenticator code digit ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {verifyError ? (
                <p className="text-num-14 font-commissioner text-red-400" role="alert">
                  {verifyError}
                </p>
              ) : null}
              <button
                type="button"
                onClick={handleVerify}
                disabled={isSubmitting || otp.join('').length < 6}
                className={continueButtonClass}
              >
                <span className="tracking-num--0_01 leading-num-28 font-semibold text-white">
                  {isSubmitting ? 'Verifying…' : 'Verify'}
                </span>
              </button>
            </section>
          </>
        )}
      </main>
    </section>
  )
}

export default TwoFactorEnableModal
