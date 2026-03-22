import { FunctionComponent } from 'react'

/** Account deletion warning + action — refactored from Figma (flex, no absolute/relative). */
export const DashboardDeletionSection: FunctionComponent = () => {
  return (
    <section className="border-red font-commissioner box-border flex w-full flex-col gap-4 overflow-hidden rounded-lg border border-dashed p-num-18 text-left text-lg text-white sm:flex-row sm:items-center sm:gap-3 [background:linear-gradient(180deg,rgba(255,42,42,0.2),rgba(255,42,42,0)),linear-gradient(#0d1b35,#0d1b35)]">
      {/* Copy */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-[5px]">
        <b className="self-stretch leading-num-28 tracking-num-0_02">Account Deletion Request</b>
        <div className="text-lightsteelblue-200 w-full max-w-full text-base leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)] sm:max-w-[754px]">
          Please be advised that this action will permanently erase all your data, including your
          user profile, account balance, order history, and settings. Once your account is deleted,
          this action cannot be undone.
        </div>
      </div>

      {/* Danger action */}
      <div className="flex shrink-0 items-center text-base">
        <div className="bg-gray-200 border-red flex items-center gap-2 overflow-hidden rounded-lg border border-solid px-3 py-2">
          <img className="h-5 w-5 shrink-0" alt="" />
          <div className="leading-num-28 font-semibold tracking-num--0_01">Delete Account</div>
        </div>
      </div>
    </section>
  )
}
