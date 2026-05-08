'use client'

import CentralIcon from '@central-icons-react/all'

import { useAuthModal } from '@/components/auth/auth-modal-context'

export function UnauthenticatedDropsGate() {
  const { openAuthModal } = useAuthModal()

  return (
    <div className="border-border-subtle bg-card dark:border-whitesmoke-300 dark:bg-gray-100 mx-auto flex w-full max-w-[579px] flex-col gap-6 rounded-lg border p-4">
      <div className="flex flex-col items-center justify-center gap-[5px] text-center">
        <CentralIcon
          name="IconUser"
          join="round"
          fill="filled"
          stroke="2"
          radius="1"
          size={28}
          color="#EB2DFF"
          ariaHidden
        />
        <h2 className="text-foreground dark:text-white leading-num-28 tracking-num-0.02 text-lg font-bold">
          Become a member to claim drops
        </h2>
        <p className="text-num-16 leading-num-24 text-muted-foreground dark:text-white font-medium opacity-75 [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
          You are not a registered member.
          <br />
          Create account or Login to claim free drops.
        </p>
      </div>

      <div className="h-px w-full bg-foreground/10 dark:bg-white/5" />

      <div className="flex items-stretch gap-4">
        <button
          type="button"
          onClick={() => openAuthModal('signin')}
          className="text-num-16 leading-num-28 tracking-num--0_01 border-border-subtle bg-card text-foreground hover:bg-card-elevated dark:border-[#1E2E47] dark:bg-gray-100 dark:text-white dark:hover:border-[#2A3D5F] dark:hover:bg-white/8 flex h-[52px] flex-[0.8719] items-center justify-center rounded-lg border px-4 font-semibold transition-colors"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => openAuthModal('signup')}
          className="bg-fuchsia text-num-16 leading-num-28 tracking-num--0_01 flex flex-1 items-center justify-center gap-[7.8px] rounded-[7.79px] px-4 py-3 font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] transition-opacity hover:opacity-90"
        >
          <CentralIcon
            name="IconPeople"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            color="#FFFFFF"
            ariaHidden
          />
          Create Account
        </button>
      </div>
    </div>
  )
}
