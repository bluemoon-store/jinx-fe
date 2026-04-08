'use client'

import CentralIcon from '@central-icons-react/all'
import type { KeyboardEvent } from 'react'
import { FunctionComponent, useId, useRef, useState } from 'react'

export type TwoFactorDisableModalProps = {
  onClose?: () => void
  onDisableSuccess?: (password: string, code: string) => Promise<void>
}

const passwordRowClass =
  'rounded-num-8 border-[#18263E] text-lightsteelblue-200 px-num-12 text-sm sm:text-num-16 flex min-h-11 items-center justify-between gap-3 self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:border-fuchsia focus-within:text-fuchsia focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)] sm:gap-5'

const passwordVisibilityHitClass =
  'inline-flex shrink-0 touch-manipulation items-center justify-center rounded-num-8 p-2 [-webkit-tap-highlight-color:transparent] sm:p-0'

const passwordVisibilityFaceClass =
  'flex h-7 w-7 items-center justify-center rounded-num-8 bg-[#051329] p-1.5'

const inputClass =
  'tracking-num--0_01 leading-num-28 font-normal min-w-0 h-7 flex-1 appearance-none border-0 bg-transparent p-0 text-white/75 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:font-normal placeholder:text-white placeholder:opacity-[0.1875]'

const otpCellWrapClass =
  'rounded-num-8 focus-within:border-fuchsia flex min-h-11 min-w-0 max-w-full items-center justify-center overflow-hidden border border-solid border-[#18263E] bg-gray-100 px-1 py-2 transition-[border-color,box-shadow] focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)] sm:px-2 sm:py-[9px]'

const otpInputClass =
  'tracking-num--0_01 leading-num-28 h-9 w-full min-w-0 appearance-none border-0 bg-transparent p-0 text-center text-sm font-normal text-white/75 shadow-none ring-0 outline-none placeholder:text-white/18.75 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none sm:h-7 sm:text-num-16'

const cancelButtonClass =
  'text-num-16 box-border flex min-h-11 min-w-0 flex-1 cursor-pointer touch-manipulation items-center justify-center rounded-[7.79px] border border-solid border-[#18263E] bg-gray-100 px-4 py-3.5 [-webkit-tap-highlight-color:transparent] sm:py-num-12'

const confirmButtonClass =
  'bg-fuchsia text-num-16 box-border flex min-h-11 min-w-0 flex-1 cursor-pointer touch-manipulation items-center justify-center rounded-[7.79px] px-4 py-3.5 shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] [-webkit-tap-highlight-color:transparent] sm:py-num-12 disabled:cursor-not-allowed disabled:opacity-60'

const TwoFactorDisableModal: FunctionComponent<TwoFactorDisableModalProps> = ({
  onClose,
  onDisableSuccess,
}) => {
  const understandId = useId()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [understood, setUnderstood] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

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

  const otpString = otp.join('')
  const canConfirm =
    password.trim().length > 0 && otpString.length === 6 && understood && !isSubmitting

  const handleConfirm = async () => {
    if (!canConfirm) return
    setIsSubmitting(true)
    try {
      await onDisableSuccess?.(password, otpString)
    } finally {
      setIsSubmitting(false)
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

        <p className="text-num-14 font-commissioner sm:text-num-14 leading-5 font-medium text-[#9EA0C6]">
          To disable Two Factor Authentication, enter your password and the current code from your
          authenticator app.
        </p>

        <section className="text-num-14 text-lightsteelblue font-commissioner flex w-full min-w-0 flex-col items-start gap-3 self-stretch sm:gap-[13px]">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label
              htmlFor="twofa-disable-password"
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
                  id="twofa-disable-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={inputClass}
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

          <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="sm:text-num-14 text-sm leading-5 font-semibold text-[#9EA0C6]">
              2FA Code
            </div>
            <div className="grid w-full min-w-0 grid-cols-6 gap-1.5 self-stretch sm:gap-2">
              {otp.map((digit, index) => (
                <div key={`twofa-disable-otp-${index}`} className={otpCellWrapClass}>
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
                    aria-label={`2FA code digit ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <label
            htmlFor={understandId}
            className="flex cursor-pointer flex-row items-center gap-3 self-stretch text-left"
          >
            <input
              id={understandId}
              type="checkbox"
              className="peer sr-only"
              checked={understood}
              onChange={(e) => setUnderstood(e.target.checked)}
            />
            <span
              aria-hidden
              className="rounded-num-8 peer-checked:border-fuchsia peer-checked:bg-fuchsia box-border flex h-6 w-6 shrink-0 items-center justify-center border border-solid border-[#18263E] bg-gray-100"
            >
              <CentralIcon
                name="IconCheckmark2"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={14}
                ariaHidden={true}
                className={understood ? 'block text-white' : 'hidden text-white'}
              />
            </span>
            <div className="text-lightsteelblue-200 leading-num-20 min-w-0 flex-1 font-semibold">
              Yes, I understand that disabling 2FA will reduce my account security and increase the
              potential for unauthorized access.
            </div>
          </label>

          <footer className="mt-1 flex w-full flex-col gap-3 self-stretch sm:flex-row sm:gap-4">
            <button type="button" onClick={onClose} className={cancelButtonClass}>
              <span className="tracking-num--0_01 leading-num-28 font-semibold text-white">
                Cancel
              </span>
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!canConfirm}
              className={confirmButtonClass}
            >
              <span className="tracking-num--0_01 leading-num-28 font-semibold text-white">
                {isSubmitting ? 'Confirming…' : 'Confirm'}
              </span>
            </button>
          </footer>
        </section>
      </main>
    </section>
  )
}

export default TwoFactorDisableModal
