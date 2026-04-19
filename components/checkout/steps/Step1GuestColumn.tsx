'use client'

import CentralIcon from '@central-icons-react/all'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { useAuthModal } from '@/components/auth/auth-modal-context'
import z from 'zod'

type GuestCheckoutFormValues = {
  email: string
  termsAccepted: boolean
}

const fieldShell =
  'rounded-num-8 border-[#18263E] text-lightsteelblue-200 px-num-12 text-sm sm:text-num-16 flex min-h-11 items-center gap-2.5 self-stretch overflow-hidden border border-solid bg-gray-100 py-2.5 transition-[border-color,box-shadow,color] focus-within:border-fuchsia focus-within:text-fuchsia focus-within:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]'

const inputClass =
  'tracking-num--0_01 leading-num-28 font-normal min-w-0 h-7 flex-1 appearance-none border-0 bg-transparent p-0 text-white/75 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:font-normal placeholder:text-white placeholder:opacity-[0.1875]'

type Props = { onContinue: () => void }

export function Step1GuestColumn({ onContinue }: Props) {
  const termsId = useId()
  const { openAuthModal } = useAuthModal()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GuestCheckoutFormValues>({
    resolver: zodResolver(z.any()),
    defaultValues: { email: '', termsAccepted: false },
  })

  const termsAccepted = watch('termsAccepted') === true

  return (
    <div className="flex w-full max-w-[729px] flex-col gap-6 sm:gap-8 lg:gap-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
        <h2 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
          CHECKOUT
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
            Already have an account?
          </span>
          <button
            type="button"
            onClick={() => openAuthModal('signin')}
            className="inline-flex items-center rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.14)_100%)] px-2 py-1.5 text-sm font-semibold text-white [text-shadow:0px_0px_8.63px_#00000099] sm:px-1.5 sm:text-base"
          >
            Log In
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(() => onContinue())}
        className="flex w-full max-w-[766px] flex-col gap-5 rounded-xl border border-[#eeeeee1a] bg-[#010f25] p-4 sm:gap-6 sm:p-6 md:p-8"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="guest-checkout-email"
            className="text-lightsteelblue-200 text-sm font-semibold"
          >
            Email
          </label>
          <div className={fieldShell}>
            <CentralIcon
              name="IconEmail1"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={18}
              ariaHidden={true}
              className="text-lightsteelblue-200 shrink-0"
            />
            <input
              id="guest-checkout-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
              {...register('email')}
            />
          </div>
          {errors.email ? (
            <p className="text-num-12 font-semibold text-[#C0242A]">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={termsId} className="flex cursor-pointer items-center gap-3 text-left">
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
                className={termsAccepted ? 'block text-white' : 'hidden text-white'}
              />
            </span>
            <span className="text-lightsteelblue-200 min-w-0 flex-1 text-sm leading-5 font-semibold">
              I agree to the{' '}
              <Link
                href="/legal?section=terms"
                className="text-white underline-offset-2 hover:underline"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/legal?section=privacy"
                className="text-white underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.termsAccepted ? (
            <p className="text-num-12 font-semibold text-[#C0242A]">
              {errors.termsAccepted.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-fuchsia text-num-16 sm:py-num-12 box-border flex min-h-11 w-full cursor-pointer touch-manipulation items-center justify-center self-stretch rounded-[7.79px] px-4 py-3.5 font-semibold text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[48px]"
        >
          {isSubmitting ? 'Continuing…' : 'Continue'}
        </button>
      </form>
    </div>
  )
}
