'use client'

import CentralIcon from '@central-icons-react/all'
import { zodResolver } from '@hookform/resolvers/zod'
import type { KeyboardEvent } from 'react'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations'

export type ForgotPasswordAProps = {
  onClose?: () => void
  onBackToSignIn?: () => void
  onSendOtp?: (email: string) => Promise<void>
  onCreateAccount?: () => void
}

export const ForgotPasswordA: FunctionComponent<ForgotPasswordAProps> = ({
  onClose,
  onBackToSignIn,
  onSendOtp,
  onCreateAccount,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) })

  return (
    <section className="text-ghostwhite font-nata-sans mx-auto box-border flex w-full max-w-[419px] flex-col items-start overflow-hidden rounded-xl border-[1px] border-solid border-gray-500 bg-gray-200 p-4 text-left text-base shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] sm:p-5 sm:text-lg lg:max-w-[520px] lg:p-6 lg:text-[20px]">
      <main className="text-whitesmoke-100 flex w-full min-w-0 flex-col items-start gap-3 sm:gap-[15px]">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <header className="font-nata-sans flex flex-col items-start gap-3 self-stretch">
            <div className="flex items-center gap-2 self-stretch sm:gap-5">
              <button
                type="button"
                onClick={onBackToSignIn}
                className="rounded-num-8 box-border flex h-[30px] w-[30px] shrink-0 touch-manipulation items-center justify-center border border-solid border-[#18263E] p-0 [-webkit-tap-highlight-color:transparent]"
                aria-label="Back to log in"
              >
                <CentralIcon
                  name="IconChevronLeft"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                  className="text-white/50"
                />
              </button>
              <div className="flex min-w-0 flex-1 items-center justify-center px-1">
                <div className="leading-num-28 text-center text-lg font-extrabold tracking-[0.02em] uppercase sm:text-xl lg:text-[20px]">
                  FORGOT PASSWORD
                </div>
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

          <section className="text-ghostwhite rounded-num-8 box-border flex w-full min-w-0 flex-col items-start self-stretch bg-gray-100 p-3 sm:p-4">
            <div className="flex items-start self-stretch">
              <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                <b className="tracking-num--0_01 text-sm leading-snug font-bold sm:text-base sm:leading-[18px]">
                  Enter Registered Email Address
                </b>
                <div className="text-lightsteelblue-100 self-stretch text-xs leading-snug font-medium sm:text-[13px] sm:leading-[17px]">
                  You will receive a One Time Passcode to login to your account.
                </div>
              </div>
            </div>
          </section>

          <form
            className="text-num-14 text-lightsteelblue font-commissioner flex flex-col items-start gap-3 self-stretch sm:gap-[13px]"
            onSubmit={handleSubmit((data) => onSendOtp?.(data.email))}
          >
            <div className="flex flex-col items-start gap-2 self-stretch">
              <label htmlFor="forgot-email" className="leading-num-20 font-semibold">
                Email Address
              </label>
              <div className="rounded-num-8 text-lightsteelblue-200 px-num-12 focus-within:border-fuchsia focus-within:text-fuchsia sm:text-num-16 flex min-h-11 items-center gap-2.5 self-stretch overflow-hidden border border-solid border-[#18263E] bg-gray-100 py-2.5 text-sm transition-[border-color,box-shadow,color] focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]">
                <CentralIcon
                  name="IconEmail1"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                  className="shrink-0"
                />
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  className="tracking-num--0_01 leading-num-28 h-7 min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 font-normal text-white/75 shadow-none ring-0 outline-none placeholder:font-normal placeholder:text-white placeholder:opacity-[0.1875] focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-num-12 font-semibold text-[#C0242A]">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-fuchsia text-num-16 sm:py-num-12 mt-2 box-border flex touch-manipulation items-center justify-center self-stretch rounded-[7.79px] px-4 py-3.5 shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="tracking-num--0_01 leading-num-28 font-semibold">
                {isSubmitting ? 'Sending…' : 'Send OTP'}
              </div>
            </button>
          </form>
        </div>

        <div className="h-px w-full self-stretch bg-gray-100" />

        <footer className="text-num-16 text-lightsteelblue font-commissioner flex flex-row flex-wrap items-center justify-center gap-2.5 self-stretch text-center">
          <div className="tracking-num--0_01 leading-num-28 text-lightsteelblue-200 font-semibold">
            Don't have an account?
          </div>
          <button
            type="button"
            onClick={onCreateAccount}
            className="flex touch-manipulation items-center justify-center rounded-md px-1.5 py-0 text-white [-webkit-tap-highlight-color:transparent] [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]"
          >
            <div className="tracking-num--0_01 leading-num-28 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              Create Account
            </div>
          </button>
        </footer>
      </main>
    </section>
  )
}

export type ForgotPasswordBProps = {
  onClose?: () => void
  onBackToEmail?: () => void
  onContinueToReset?: (otp: string) => Promise<void>
  onCreateAccount?: () => void
}

export const ForgotPasswordB: FunctionComponent<ForgotPasswordBProps> = ({
  onClose,
  onBackToEmail,
  onContinueToReset,
  onCreateAccount,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [resendSeconds, setResendSeconds] = useState(120)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (resendSeconds <= 0) return
    const timer = window.setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [resendSeconds])

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

  const handleSubmit = async () => {
    const otpString = otp.join('')
    if (otpString.length < 6) return
    setIsSubmitting(true)
    try {
      await onContinueToReset?.(otpString)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resendMinutes = Math.floor(resendSeconds / 60)
  const resendRemainSeconds = String(resendSeconds % 60).padStart(2, '0')

  return (
    <section className="text-ghostwhite font-nata-sans mx-auto box-border flex w-full max-w-[419px] flex-col items-start overflow-hidden rounded-xl border-[1px] border-solid border-gray-500 bg-gray-200 p-4 text-left text-base shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] sm:p-5 sm:text-lg lg:max-w-[520px] lg:p-6 lg:text-[20px]">
      <main className="text-whitesmoke-100 flex w-full min-w-0 flex-col items-start gap-3 sm:gap-[15px]">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <header className="font-nata-sans flex flex-col items-start gap-3 self-stretch">
            <div className="flex items-center gap-2 self-stretch sm:gap-5">
              <button
                type="button"
                onClick={onBackToEmail}
                className="rounded-num-8 box-border flex h-[30px] w-[30px] shrink-0 touch-manipulation items-center justify-center border border-solid border-[#18263E] p-0 [-webkit-tap-highlight-color:transparent]"
                aria-label="Back to email step"
              >
                <CentralIcon
                  name="IconChevronLeft"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                  className="text-white/50"
                />
              </button>
              <div className="flex min-w-0 flex-1 items-center justify-center px-1">
                <div className="leading-num-28 text-center text-lg font-extrabold tracking-[0.02em] uppercase sm:text-xl lg:text-[20px]">
                  FORGOT PASSWORD
                </div>
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

          <section className="text-ghostwhite rounded-num-8 box-border flex w-full min-w-0 flex-col items-start self-stretch bg-gray-100 p-3 sm:p-4">
            <div className="flex items-start self-stretch">
              <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                <b className="tracking-num--0_01 text-sm leading-snug font-bold sm:text-base sm:leading-[18px]">
                  Enter OTP received on your registered email address
                </b>
                <div className="text-lightsteelblue-100 self-stretch text-xs leading-snug font-medium sm:text-[13px] sm:leading-[17px]">
                  Enter the 6 digit passcode to reset your password.
                </div>
              </div>
            </div>
          </section>

          <section className="text-num-14 text-lightsteelblue font-commissioner flex w-full min-w-0 flex-col items-start gap-3 self-stretch sm:gap-[13px]">
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="sm:text-num-14 text-sm leading-5 font-semibold">
                One Time Passcode
              </div>
              <div className="grid w-full min-w-0 grid-cols-6 gap-1.5 self-stretch sm:gap-2">
                {otp.map((digit, index) => (
                  <div
                    key={`otp-${index}`}
                    className="rounded-num-8 focus-within:border-fuchsia flex min-h-11 max-w-full min-w-0 items-center justify-center overflow-hidden border border-solid border-[#18263E] bg-gray-100 px-1 py-2 transition-[border-color,box-shadow] focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)] sm:px-2 sm:py-[9px]"
                  >
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
                      className="tracking-num--0_01 leading-num-28 sm:text-num-16 h-9 w-full min-w-0 appearance-none border-0 bg-transparent p-0 text-center text-sm font-normal text-white/75 shadow-none ring-0 outline-none placeholder:text-white/18.75 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none sm:h-7"
                      placeholder="0"
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || otp.join('').length < 6}
              className="bg-fuchsia text-num-16 sm:py-num-12 mt-2 box-border flex touch-manipulation items-center justify-center self-stretch rounded-[7.79px] px-4 py-3.5 shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="tracking-num--0_01 leading-num-28 font-semibold">
                {isSubmitting ? 'Verifying…' : 'Reset Password'}
              </div>
            </button>
            <div className="text-lightsteelblue-200 flex flex-col items-center justify-center gap-1 self-stretch text-center sm:flex-row sm:flex-wrap sm:gap-2">
              <div className="sm:text-num-14 text-sm leading-5 font-semibold">{`Didn't receive an OTP? `}</div>
              {resendSeconds > 0 ? (
                <div className="sm:text-num-14 text-sm leading-5 font-semibold text-white">
                  {`Resend (${resendMinutes}:${resendRemainSeconds} mins)`}
                </div>
              ) : (
                <button
                  type="button"
                  className="sm:text-num-14 min-h-11 text-sm leading-5 font-semibold text-white underline sm:min-h-0"
                  onClick={() => setResendSeconds(120)}
                >
                  Resend
                </button>
              )}
            </div>
          </section>
        </div>

        <div className="h-px w-full self-stretch bg-gray-100" />

        <footer className="text-num-16 text-lightsteelblue font-commissioner flex flex-row flex-wrap items-center justify-center gap-2.5 self-stretch text-center">
          <div className="tracking-num--0_01 leading-num-28 text-lightsteelblue-200 font-semibold">
            Don't have an account?
          </div>
          <button
            type="button"
            onClick={onCreateAccount}
            className="flex touch-manipulation items-center justify-center rounded-md px-1.5 py-0 text-white [-webkit-tap-highlight-color:transparent] [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]"
          >
            <div className="tracking-num--0_01 leading-num-28 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              Create Account
            </div>
          </button>
        </footer>
      </main>
    </section>
  )
}

export default ForgotPasswordB
