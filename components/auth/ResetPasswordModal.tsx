'use client'

import CentralIcon from '@central-icons-react/all'
import { zodResolver } from '@hookform/resolvers/zod'
import { FunctionComponent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations'

export type ResetPasswordModalProps = {
  onClose?: () => void
  onResetSuccess?: (newPassword: string) => Promise<void>
}

const passwordRowClass =
  'rounded-num-8 border-[#18263E] text-lightsteelblue-200 px-num-12 text-num-16 flex items-center justify-between gap-5 self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:border-fuchsia focus-within:text-fuchsia focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]'

const inputClass =
  'tracking-num--0_01 leading-num-28 font-semibold min-w-0 h-7 flex-1 appearance-none border-0 bg-transparent p-0 text-white shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:font-semibold placeholder:text-white placeholder:opacity-25'

const ERROR_RULE = 'text-[#C0242A]'
const OK_RULE = 'text-limegreen'

const ResetPassword: FunctionComponent<ResetPasswordModalProps> = ({ onClose, onResetSuccess }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) })

  const newPassword = watch('newPassword', '')
  const passwordRules = {
    hasLen: newPassword.length >= 8,
    hasMixed: /[0-9]/.test(newPassword) && /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword),
    hasSpecial: /[#@!]/.test(newPassword),
  }

  return (
    <section className="text-num-14 text-whitesmoke-100 font-commissioner box-border flex w-full flex-col items-start overflow-hidden rounded-xl border-[1px] border-solid border-gray-300 bg-gray-200 px-5 py-[18px] text-left shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] lg:w-fit">
      <main className="flex w-[419px] flex-col items-start gap-[15px]">
        <div className="flex flex-col items-center gap-4 self-stretch">
          <header className="font-nata-sans flex flex-col items-start gap-3 self-stretch text-[20px]">
            <div className="flex items-center justify-between gap-5 self-stretch">
              <div className="flex items-center">
                <div className="leading-num-28 font-extrabold tracking-[0.02em] uppercase">
                  RESET PASSWORD
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
          </header>

          <section className="rounded-num-8 text-ghostwhite box-border flex min-w-[416px] flex-col items-start self-stretch bg-gray-100 p-3">
            <div className="flex items-start self-stretch">
              <div className="flex flex-1 flex-col items-start gap-0.5">
                <b className="tracking-num--0_01 flex h-[19px] shrink-0 items-center self-stretch leading-[18px]">
                  Create a new password
                </b>
                <div className="text-lightsteelblue-100 self-stretch text-[13px] leading-[17px] font-medium">
                  You will be logged out of all devices once you reset your password.
                </div>
              </div>
            </div>
          </section>

          <form
            className="flex flex-col items-start gap-4 self-stretch"
            onSubmit={handleSubmit((data) => onResetSuccess?.(data.newPassword))}
          >
            <div className="text-limegreen flex flex-col items-start gap-4 self-stretch">
              <div className="flex flex-col items-start gap-2 self-stretch">
                <div className="leading-num-20 text-lightsteelblue-200 font-semibold">Password</div>
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
                      id="reset-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="New password"
                      className={inputClass}
                      {...register('newPassword')}
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
                {newPassword.length > 0 && (
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
                        size={14}
                        ariaHidden={true}
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
                        size={14}
                        ariaHidden={true}
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
                        size={14}
                        ariaHidden={true}
                      />
                      <div className="leading-num-20 font-semibold">
                        At least one special character (# ! @)
                      </div>
                    </div>
                  </>
                )}
                {errors.newPassword && (
                  <p className="text-num-12 font-semibold text-[#C0242A]">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="text-lightsteelblue-200 flex flex-col items-start gap-2 self-stretch">
                <div className="leading-num-20 font-semibold">Confirm Password</div>
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
                      id="reset-confirm"
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
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-fuchsia text-num-16 flex items-center justify-center self-stretch rounded-[7.79px] px-4 py-3 text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="tracking-num--0_01 leading-num-28 font-semibold">
                {isSubmitting ? 'Resetting…' : 'Reset Password'}
              </div>
            </button>
          </form>
        </div>

        <div className="h-px w-full self-stretch bg-gray-100" />

        <footer className="text-num-16 text-lightsteelblue-200 flex items-center justify-center gap-2.5 self-stretch text-center">
          <div className="tracking-num--0_01 leading-num-28 font-semibold">Having issues?</div>
          <div className="flex items-center justify-center rounded-md px-1.5 py-0 text-white [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.05),_rgba(255,_255,_255,_0.14))]">
            <div className="tracking-num--0_01 leading-num-28 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)]">
              Create a Ticket
            </div>
          </div>
        </footer>
      </main>
    </section>
  )
}

export default ResetPassword
