import { FunctionComponent } from 'react'

/** Security settings — layout refactored from Figma (flex, no absolute/relative positioning). */
export const DashboardSecuritySection: FunctionComponent = () => {
  return (
    <section className="font-commissioner flex w-full flex-col items-start gap-num-30 text-left text-[18px] text-white">
      {/* Password reset */}
      <article className="border-darkslateblue box-border flex w-full min-h-[98.7px] shrink-0 flex-col gap-4 overflow-hidden rounded-lg border border-solid bg-gray-100 p-4 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <b className="self-stretch leading-num-28 tracking-num-0_02">Reset Password</b>
          <div className="text-num-16 text-lightsteelblue-200 self-stretch leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Please request a password reset link to be sent to your registered email address.
          </div>
        </div>
        <div className="text-num-16 flex shrink-0 items-center">
          <div className="border-whitesmoke-300 flex items-center gap-2 overflow-hidden rounded-lg border border-solid bg-gray-200 px-3 py-2">
            <img className="h-5 w-5" alt="" />
            <div className="leading-num-28 font-semibold tracking-num--0_01">
              Request Password Reset Link
            </div>
          </div>
        </div>
      </article>

      <img className="h-px max-h-full w-full max-w-full shrink-0 self-stretch" alt="" />

      {/* Two-factor authentication */}
      <article className="border-darkslateblue box-border flex w-full min-h-[98.7px] shrink-0 flex-col gap-4 overflow-hidden rounded-lg border border-solid bg-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <b className="leading-num-28 tracking-num-0_02">2 Factor Authentication</b>
            <div className="text-num-16 text-red flex items-center justify-center gap-0.5 rounded-md px-1.5 py-0 text-center [background:linear-gradient(180deg,rgba(255,42,42,0.05),rgba(255,42,42,0.14))]">
              <img className="h-3.5 w-3.5 shrink-0" alt="" />
              <div className="leading-6 font-semibold [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                Not Enabled
              </div>
            </div>
          </div>
          <div className="text-num-16 text-lightsteelblue-200 self-stretch leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            Implement an additional layer of security for your account.
          </div>
        </div>
        <div className="text-num-16 flex shrink-0 items-center">
          <div className="bg-fuchsia flex items-center justify-center overflow-hidden rounded-[7.79px] px-9 py-2 shadow-[0px_2px_0px_rgba(235,45,255,0.5)]">
            <div className="leading-num-28 font-semibold tracking-num--0_01">Enable 2FA</div>
          </div>
        </div>
      </article>
    </section>
  )
}
