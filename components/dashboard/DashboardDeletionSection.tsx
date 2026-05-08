'use client'

import { useAuthModal } from '@/components/auth/auth-modal-context'
import CentralIcon from '@central-icons-react/all'
import { FunctionComponent } from 'react'

/** Account deletion warning + opens delete confirmation modal (auth pattern). */
export const DashboardDeletionSection: FunctionComponent = () => {
  const { openAuthModal } = useAuthModal()

  return (
    <section className="font-commissioner p-num-18 text-foreground dark:text-white box-border flex w-full flex-col gap-4 overflow-hidden rounded-lg border border-dashed border-red-500 text-left text-lg [background:linear-gradient(180deg,rgba(255,42,42,0.08),rgba(255,42,42,0)),var(--card-elev)] dark:[background:linear-gradient(180deg,rgba(255,42,42,0.2),rgba(255,42,42,0)),linear-gradient(#0d1b35,#0d1b35)] sm:flex-row sm:items-center sm:gap-3">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-[5px]">
        <b className="leading-num-28 tracking-num-0_02 self-stretch">Account Deletion Request</b>
        <div className="text-muted-foreground dark:text-lightsteelblue-200 w-full max-w-full text-base leading-5 font-medium [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)] sm:max-w-[754px]">
          Please be advised that this action will permanently erase all your data, including your
          user profile, account balance, order history, and settings. Once your account is deleted,
          this action cannot be undone.
        </div>
      </div>

      <div className="flex w-full shrink-0 items-stretch text-base sm:w-auto sm:items-center">
        <button
          type="button"
          onClick={() => openAuthModal('delete-account')}
          className="border-red box-border flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-solid bg-card text-foreground dark:bg-gray-200 dark:text-white px-3 py-2 sm:min-h-0 sm:w-auto"
        >
          <CentralIcon
            name="IconTrashCan"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={20}
            ariaHidden={true}
            color="#ff2a2a"
          />
          <span className="leading-num-28 tracking-num--0_01 font-semibold">Delete Account</span>
        </button>
      </div>
    </section>
  )
}
