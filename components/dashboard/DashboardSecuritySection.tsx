'use client'

import { useAuthModal } from '@/components/auth/auth-modal-context'
import { useAuth } from '@/hooks/use-auth'
import CentralIcon from '@central-icons-react/all'
import { FunctionComponent } from 'react'

import { useAppStore } from '@/lib/store'
import { toast } from '@/lib/toast'

/** Security settings — layout refactored from Figma (flex, no absolute/relative positioning). */
export const DashboardSecuritySection: FunctionComponent = () => {
  const { openAuthModal } = useAuthModal()
  const { user } = useAuth()
  const twoFactorEnabled = user?.twoFactorEnabled ?? false

  return (
    <section className="font-commissioner gap-num-30 flex w-full flex-col items-start text-left text-[18px] text-white">
      {/* Password reset */}
      <article className="border-darkslateblue box-border flex min-h-[98.7px] w-full shrink-0 flex-col gap-4 overflow-hidden rounded-lg border border-solid bg-gray-100 p-4 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <b className="leading-num-28 tracking-num-0_02 self-stretch">Reset Password</b>
          <div className="text-num-16 text-lightsteelblue-200 self-stretch leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Please request a password reset link to be sent to your registered email address.
          </div>
        </div>
        <div className="text-num-16 flex w-full min-w-0 shrink-0 items-stretch sm:w-auto sm:items-center">
          <button
            type="button"
            onClick={() => {
              // openAuthModal('forgot')
              toast.info('Password reset link requested', {
                description: 'Please check your registered email inbox.',
              })
            }}
            className="border-whitesmoke-300 font-inherit box-border flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-solid bg-gray-200 px-3 py-2 text-inherit sm:min-h-0 sm:w-auto sm:justify-start"
          >
            <CentralIcon
              name="IconPassword"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={20}
              ariaHidden={true}
            />
            <span className="leading-num-28 tracking-num--0_01 text-center font-semibold sm:text-left">
              Request Password Reset Link
            </span>
          </button>
        </div>
      </article>

      <div className="h-px w-full bg-[#152950]" />

      {/* Two-factor authentication */}
      <article className="border-darkslateblue box-border flex min-h-[98.7px] w-full shrink-0 flex-col gap-4 overflow-hidden rounded-lg border border-solid bg-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <b className="leading-num-28 tracking-num-0_02">2 Factor Authentication</b>
            {twoFactorEnabled ? (
              <div className="text-num-16 text-limegreen flex items-center justify-center gap-0.5 rounded-md px-1.5 py-0 text-center [background:linear-gradient(180deg,rgba(34,197,94,0.08),rgba(34,197,94,0.18))]">
                <CentralIcon
                  name="IconCheckmark2"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={12}
                  ariaHidden={true}
                  className="text-limegreen"
                />
                <div className="text-limegreen leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                  Enabled
                </div>
              </div>
            ) : (
              <div className="text-num-16 text-red flex items-center justify-center gap-0.5 rounded-md px-1.5 py-0 text-center [background:linear-gradient(180deg,rgba(255,42,42,0.05),rgba(255,42,42,0.14))]">
                <CentralIcon
                  name="IconCrossSmall"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={20}
                  ariaHidden={true}
                  color="#ff2a2a"
                />
                <div className="leading-6 font-semibold text-red-500 [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                  Not Enabled
                </div>
              </div>
            )}
          </div>
          <div className="text-num-16 text-lightsteelblue-200 self-stretch leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Implement an additional layer of security for your account.
          </div>
        </div>
        <div className="text-num-16 flex w-full shrink-0 items-stretch sm:w-auto sm:items-center">
          {twoFactorEnabled ? (
            <button
              type="button"
              onClick={() => openAuthModal('2fa-disable')}
              className="border-whitesmoke-300 font-inherit box-border flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-solid bg-gray-200 px-3 py-2 text-inherit sm:min-h-0 sm:w-auto sm:px-6"
            >
              <span className="leading-num-28 tracking-num--0_01 text-center font-semibold sm:text-left">
                Disable 2FA
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('2fa-enable')}
              className="bg-fuchsia box-border flex min-h-11 w-full cursor-pointer items-center justify-center overflow-hidden rounded-[7.79px] px-9 py-2 shadow-[0px_2px_0px_rgba(235,45,255,0.5)] sm:min-h-0 sm:w-auto"
            >
              <span className="leading-num-28 tracking-num--0_01 font-semibold">Enable 2FA</span>
            </button>
          )}
        </div>
      </article>
    </section>
  )
}
