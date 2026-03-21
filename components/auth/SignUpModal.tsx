'use client'

import CentralIcon from '@central-icons-react/all'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { FunctionComponent, useId, useState } from 'react'
import { useForm } from 'react-hook-form'

import { registerSchema, type RegisterInput } from '@/lib/validations'

export type SignUpModalProps = {
  onClose?: () => void
  onSignIn?: () => void
  onRegisterSuccess?: (data: RegisterInput) => Promise<void>
}

const inputRowClass =
  'rounded-num-8 border-[#18263E] text-lightsteelblue-200 px-num-12 text-num-16 flex items-center gap-2.5 self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:border-fuchsia focus-within:text-fuchsia focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]'

const inputClass =
  'tracking-num--0_01 leading-num-28 font-semibold min-w-0 h-7 flex-1 appearance-none border-0 bg-transparent p-0 text-white shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:font-semibold placeholder:text-white placeholder:opacity-25'

const passwordRowClass =
  'rounded-num-8 border-[#18263E] text-lightsteelblue-200 px-num-12 text-num-16 flex items-center justify-between gap-5 self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:border-fuchsia focus-within:text-fuchsia focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]'

const ERROR_RULE = 'text-[#C0242A]'
const OK_RULE = 'text-limegreen'

const SignUpModal: FunctionComponent<SignUpModalProps> = ({
  onClose,
  onSignIn,
  onRegisterSuccess,
}) => {
  const termsId = useId()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const password = watch('password', '')
  const passwordRules = {
    hasLen: password.length >= 8,
    hasMixed: /[0-9]/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password),
    hasSpecial: /[#@!]/.test(password),
  }

  return (
    <div className="text-ghostwhite font-nata-sans box-border flex w-full flex-col items-start overflow-hidden rounded-xl border-[1px] border-solid border-gray-500 bg-gray-200 p-4 text-center text-[30px] shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] lg:w-fit">
      <div className="flex items-start gap-6 self-stretch">
        {/* Left: hero + marketing */}
        <section className="rounded-num-8 flex min-h-0 w-[335px] shrink-0 flex-col self-stretch overflow-x-hidden overflow-y-visible [background:linear-gradient(180deg,_#4e2bff,_#b600c7)]">
          <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr_auto]">
            <header className="flex flex-col items-center gap-4 px-6 pt-[27px]">
              <img className="h-[58px] w-[105px]" alt="" src="/icons/Jin X-1.svg" />
              <div className="self-stretch leading-8 font-black tracking-[0.02em] uppercase">
                Drop in.
                <br />
                Cash out.
              </div>
            </header>

            <div className="relative grid min-h-0 grid-cols-1 grid-rows-1">
              <div className="z-0 col-start-1 row-start-1 flex items-center justify-center overflow-visible">
                <img
                  className="pointer-events-none h-full w-full max-w-none scale-200 object-contain"
                  alt=""
                  src="/icons/splash-hero.svg"
                />
              </div>
              <div className="z-10 col-start-1 row-start-1 flex items-center justify-center overflow-hidden px-[13px]">
                <img
                  className="h-[310px] w-[308px] shrink-0 object-cover"
                  alt=""
                  src="/icons/sign-up-left.png"
                />
              </div>
            </div>

            <footer className="text-num-16 mx-auto flex w-full max-w-[232px] flex-col items-center gap-4 px-6 pb-[21.5px] text-left text-white">
              <div className="flex flex-col items-center justify-center gap-[5px] self-stretch">
                <CentralIcon
                  name="IconClockAlert"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={20}
                  ariaHidden={true}
                />
                <div className="leading-6 font-extrabold tracking-[0.02em] uppercase">
                  Instant Access
                </div>
                <div className="leading-num-20 font-commissioner self-stretch text-center font-medium opacity-[0.75]">
                  Get instant access to your favorite brands and services.
                </div>
              </div>
              <div className="border-darkslateblue flex items-center gap-[7.5px] rounded-[30px] border-[1.5px] border-solid bg-gray-200 px-[9px] py-[9px] shadow-[0px_15px_15px_rgba(0,0,0,0.01)]">
                <div className="flex items-center justify-center gap-[7.5px]">
                  <div className="h-num-9 w-[22.5px] rounded-[10.13px] bg-white" />
                  <div className="h-num-9 w-[9px] rounded-[50%] bg-white opacity-[0.25]" />
                  <div className="h-num-9 w-[9px] rounded-[50%] bg-white opacity-[0.25]" />
                  <div className="h-num-9 w-[9px] rounded-[50%] bg-white opacity-[0.25]" />
                  <div className="h-num-9 w-[9px] rounded-[50%] bg-white opacity-[0.25]" />
                </div>
              </div>
            </footer>
          </div>
        </section>

        {/* Right: create account form */}
        <main className="text-whitesmoke-100 flex w-[512px] flex-col items-start gap-[15px] text-left text-[20px]">
          <form
            className="flex flex-col items-center gap-4 self-stretch"
            onSubmit={handleSubmit((data) => onRegisterSuccess?.(data))}
          >
            <div className="flex flex-col items-start gap-3 self-stretch">
              <div className="flex items-center justify-between gap-5 self-stretch">
                <div className="flex items-center">
                  <div className="leading-num-28 font-extrabold tracking-[0.02em] uppercase">
                    Create account
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-num-8 flex h-[30px] w-[30px] shrink-0 items-center justify-center border border-solid border-[#18263E] p-0"
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
            </div>
            <div className="text-num-14 text-lightsteelblue font-commissioner flex flex-col items-start gap-[13px] self-stretch">
              <div className="flex flex-col items-start gap-3 self-stretch">
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <label htmlFor="signup-name" className="leading-num-20 font-semibold">
                    Name
                  </label>
                  <div className={inputRowClass}>
                    <CentralIcon
                      name="IconPeopleCircle"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={18}
                      ariaHidden={true}
                      className="shrink-0"
                    />
                    <input
                      id="signup-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className={inputClass}
                      {...register('name')}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-num-12 font-semibold text-[#C0242A]">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <label htmlFor="signup-email" className="leading-num-20 font-semibold">
                    Email Address
                  </label>
                  <div className={inputRowClass}>
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
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      placeholder="Your email address"
                      className={inputClass}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-num-12 font-semibold text-[#C0242A]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 self-stretch">
                <label
                  htmlFor="signup-password"
                  className="text-lightsteelblue leading-num-20 font-semibold"
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
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Your password"
                      className={inputClass}
                      {...register('password')}
                    />
                  </div>
                  <button
                    type="button"
                    className="rounded-num-8 flex h-7 w-7 shrink-0 items-center justify-center bg-[#051329] p-1.5"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    <CentralIcon
                      name={showPassword ? 'IconEyeOpen' : 'IconEyeSlash'}
                      join="round"
                      fill="outlined"
                      stroke="2"
                      radius="1"
                      size={18}
                      ariaHidden={true}
                    />
                  </button>
                </div>
                {password.length > 0 && (
                  <>
                    <div
                      className={`flex items-center gap-[5px] opacity-[0.75] transition-colors duration-200 ${passwordRules.hasLen ? OK_RULE : ERROR_RULE}`}
                    >
                      <CentralIcon
                        name={passwordRules.hasLen ? 'IconCircleCheck' : 'IconCrossSmall'}
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={18}
                        ariaHidden={true}
                        className={passwordRules.hasLen ? OK_RULE : ERROR_RULE}
                      />
                      <div className="leading-num-20 font-semibold">At least 8 characters</div>
                    </div>
                    <div
                      className={`flex items-center gap-[5px] opacity-[0.75] transition-colors duration-200 ${passwordRules.hasMixed ? OK_RULE : ERROR_RULE}`}
                    >
                      <CentralIcon
                        name={passwordRules.hasMixed ? 'IconCircleCheck' : 'IconCrossSmall'}
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={18}
                        ariaHidden={true}
                        className={passwordRules.hasMixed ? OK_RULE : ERROR_RULE}
                      />
                      <div className="leading-num-20 font-semibold">{`At least one number, uppercase & lowercase letter`}</div>
                    </div>
                    <div
                      className={`flex items-center gap-[5px] opacity-[0.75] transition-colors duration-200 ${passwordRules.hasSpecial ? OK_RULE : ERROR_RULE}`}
                    >
                      <CentralIcon
                        name={passwordRules.hasSpecial ? 'IconCircleCheck' : 'IconCrossSmall'}
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={18}
                        ariaHidden={true}
                        className={passwordRules.hasSpecial ? OK_RULE : ERROR_RULE}
                      />
                      <div className="leading-num-20 font-semibold">
                        At least one special character (# ! @)
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col items-start gap-2 self-stretch">
                <label htmlFor="signup-confirm" className="leading-num-20 font-semibold">
                  Confirm Password
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
                      id="signup-confirm"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      className={inputClass}
                      {...register('confirmPassword')}
                    />
                  </div>
                  <button
                    type="button"
                    className="rounded-num-8 flex h-7 w-7 shrink-0 items-center justify-center bg-[#051329] p-1.5"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                    }
                    aria-pressed={showConfirmPassword}
                  >
                    <CentralIcon
                      name={showConfirmPassword ? 'IconEyeOpen' : 'IconEyeSlash'}
                      join="round"
                      fill="outlined"
                      stroke="2"
                      radius="1"
                      size={18}
                      ariaHidden={true}
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-num-12 font-semibold text-[#C0242A]">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <label
                htmlFor={termsId}
                className="flex cursor-pointer items-center gap-3 self-stretch text-left"
              >
                <input
                  id={termsId}
                  type="checkbox"
                  className="peer sr-only"
                  {...register('termsAccepted')}
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
                    className="hidden text-white peer-checked:block"
                  />
                </span>
                <div className="text-lightsteelblue-200 leading-num-20 font-semibold">
                  <span>{`I agree to the `}</span>
                  <Link href="/legal?section=terms" className="text-white">
                    Terms of Service
                  </Link>
                  <span>{` and `}</span>
                  <Link href="/legal?section=privacy" className="text-white">
                    Privacy Policy
                  </Link>
                  <span> of Jinx Store.</span>
                </div>
              </label>
              {errors.termsAccepted && (
                <p className="text-num-12 font-semibold text-[#C0242A]">
                  {errors.termsAccepted.message}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-fuchsia py-num-12 text-num-16 flex w-full cursor-pointer items-center justify-center self-stretch rounded-[7.79px] px-4 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="tracking-num--0_01 leading-num-28 font-semibold">
                  {isSubmitting ? 'Creating account…' : 'Create Account'}
                </div>
              </button>
            </div>
          </form>
          <div className="h-px w-full self-stretch bg-gray-100" />
          <div className="text-num-16 text-lightsteelblue font-commissioner flex items-center justify-center gap-2.5 self-stretch text-center">
            <div className="tracking-num--0_01 leading-num-28 font-semibold">
              Already have an account?
            </div>
            <button
              type="button"
              onClick={onSignIn}
              className="flex items-center justify-center rounded-md px-1.5 py-0 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]"
            >
              <div className="tracking-num--0_01 leading-num-28 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
                Log In
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SignUpModal
