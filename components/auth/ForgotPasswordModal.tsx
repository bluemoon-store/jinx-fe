'use client'

import CentralIcon from '@central-icons-react/all'
import { zodResolver } from '@hookform/resolvers/zod'
import { FunctionComponent, useEffect, useState } from 'react'
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
    <section className="text-ghostwhite font-nata-sans mx-auto box-border flex w-full flex-col items-start overflow-hidden rounded-xl border-[1px] border-solid border-gray-500 bg-gray-200 p-4 text-left text-sm shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] lg:w-fit">
      <main className="flex w-[448px] max-w-full flex-col items-start gap-[15px]">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <header className="font-nata-sans flex flex-col items-start gap-3 self-stretch text-xl">
            <div className="flex items-center justify-between gap-5 self-stretch">
              <button
                type="button"
                onClick={onBackToSignIn}
                className="rounded-num-8 flex h-[30px] w-[30px] items-center justify-center border border-solid border-[#18263E] p-0"
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
              <div className="flex items-center">
                <div className="leading-num-28 font-extrabold tracking-[0.02em] uppercase">
                  FORGOT PASSWORD
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-num-8 flex h-[30px] w-[30px] items-center justify-center border border-solid border-[#18263E] p-0"
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

          <section className="text-ghostwhite rounded-num-8 box-border flex min-w-[416px] flex-col items-start self-stretch bg-gray-100 p-3">
            <div className="flex items-start self-stretch">
              <div className="flex flex-1 flex-col items-start gap-0.5">
                <b className="tracking-num--0_01 flex h-[19px] shrink-0 items-center self-stretch leading-[18px]">
                  Enter Registered Email Address
                </b>
                <div className="text-lightsteelblue-100 self-stretch text-[13px] leading-[17px] font-medium">
                  You will receive a One Time Passcode to login to your account.
                </div>
              </div>
            </div>
          </section>

          <form
            className="text-num-14 text-lightsteelblue font-commissioner flex flex-col items-start gap-[13px] self-stretch"
            onSubmit={handleSubmit((data) => onSendOtp?.(data.email))}
          >
            <div className="flex flex-col items-start gap-2 self-stretch">
              <label htmlFor="forgot-email" className="leading-num-20 font-semibold">
                Email Address
              </label>
              <div className="rounded-num-8 text-lightsteelblue-200 px-num-12 text-num-16 focus-within:border-fuchsia focus-within:text-fuchsia flex items-center gap-2.5 self-stretch overflow-hidden border border-solid border-[#18263E] bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]">
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
                  className="tracking-num--0_01 leading-num-28 h-7 min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 font-semibold text-white shadow-none ring-0 outline-none placeholder:font-semibold placeholder:text-white placeholder:opacity-25 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
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
              className="bg-fuchsia py-num-12 text-num-16 mt-2 flex items-center justify-center self-stretch rounded-[7.79px] px-4 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="tracking-num--0_01 leading-num-28 font-semibold">
                {isSubmitting ? 'Sending…' : 'Send OTP'}
              </div>
            </button>
          </form>
        </div>

        <div className="h-px w-full self-stretch bg-gray-100" />

        <footer className="text-num-16 text-lightsteelblue font-commissioner flex items-center justify-center gap-2.5 self-stretch text-center">
          <div className="tracking-num--0_01 leading-num-28 text-lightsteelblue-200 font-semibold">
            Don't have an account?
          </div>
          <button
            type="button"
            onClick={onCreateAccount}
            className="flex items-center justify-center rounded-md px-1.5 py-0 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]"
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

  useEffect(() => {
    if (resendSeconds <= 0) return
    const timer = window.setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [resendSeconds])

  const updateOtp = (index: number, value: string) => {
    const next = value.replace(/\D/g, '').slice(-1)
    setOtp((prev) => prev.map((v, i) => (i === index ? next : v)))
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
    <section className="text-ghostwhite font-nata-sans mx-auto box-border flex w-full flex-col items-start overflow-hidden rounded-xl border-[1px] border-solid border-gray-500 bg-gray-200 p-4 text-left text-[14px] shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] lg:w-fit">
      <main className="flex w-[448px] max-w-full flex-col items-start gap-[15px]">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <header className="font-nata-sans flex flex-col items-start gap-3 self-stretch text-[20px]">
            <div className="flex items-center justify-between gap-5 self-stretch">
              <button
                type="button"
                onClick={onBackToEmail}
                className="rounded-num-8 flex h-[30px] w-[30px] items-center justify-center border border-solid border-[#18263E] p-0"
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
              <div className="flex items-center">
                <div className="leading-num-28 font-extrabold tracking-[0.02em] uppercase">
                  FORGOT PASSWORD
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-num-8 flex h-[30px] w-[30px] items-center justify-center border border-solid border-[#18263E] p-0"
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

          <section className="rounded-num-8 p-num-12 text-ghostwhite box-border flex min-w-[416px] flex-col items-start self-stretch bg-gray-100">
            <div className="flex items-start self-stretch">
              <div className="flex flex-1 flex-col items-start gap-0.5">
                <b className="tracking-num--0_01 flex h-[19px] shrink-0 items-center self-stretch leading-[18px]">
                  Enter OTP received on your registered email address
                </b>
                <div className="text-lightsteelblue-100 self-stretch text-[13px] leading-[17px] font-medium">
                  Enter the 6 digit passcode to reset your password.
                </div>
              </div>
            </div>
          </section>

          <section className="text-num-14 text-lightsteelblue font-commissioner flex flex-col items-start gap-[13px] self-stretch">
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="leading-5 font-semibold">One Time Passcode</div>
              <div className="text-num-16 flex items-start gap-2 self-stretch">
                {otp.map((digit, index) => (
                  <div
                    key={`otp-${index}`}
                    className="rounded-num-8 focus-within:border-fuchsia flex flex-1 items-center justify-center overflow-hidden border border-solid border-[#18263E] bg-gray-100 px-2 py-[9px] transition-[border-color,box-shadow] focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]"
                  >
                    <input
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => updateOtp(index, e.target.value)}
                      className="tracking-num--0_01 leading-num-28 h-7 w-full appearance-none border-0 bg-transparent p-0 text-center font-semibold text-white shadow-none ring-0 outline-none placeholder:text-white/25 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
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
              className="bg-fuchsia py-num-12 text-num-16 mt-2 flex items-center justify-center self-stretch rounded-[7.79px] px-4 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="tracking-num--0_01 leading-num-28 font-semibold">
                {isSubmitting ? 'Verifying…' : 'Reset Password'}
              </div>
            </button>
            <div className="text-lightsteelblue-200 flex items-center justify-center gap-2 self-stretch text-center">
              <div className="leading-5 font-semibold">{`Didn't receive an OTP? `}</div>
              {resendSeconds > 0 ? (
                <div className="leading-5 font-semibold text-white">
                  {`Resend (${resendMinutes}:${resendRemainSeconds} mins)`}
                </div>
              ) : (
                <button
                  type="button"
                  className="leading-5 font-semibold text-white underline"
                  onClick={() => setResendSeconds(120)}
                >
                  Resend
                </button>
              )}
            </div>
          </section>
        </div>

        <div className="h-px w-full self-stretch bg-gray-100" />

        <footer className="text-num-16 text-lightsteelblue font-commissioner flex items-center justify-center gap-2.5 self-stretch text-center">
          <div className="tracking-num--0_01 leading-num-28 text-lightsteelblue-200 font-semibold">
            Don't have an account?
          </div>
          <button
            type="button"
            onClick={onCreateAccount}
            className="flex items-center justify-center rounded-md px-1.5 py-0 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]"
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
