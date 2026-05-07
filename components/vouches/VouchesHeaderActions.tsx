'use client'

import CentralIcon from '@central-icons-react/all'
import Link from 'next/link'

import { useAuthModal } from '@/components/auth/auth-modal-context'

export function VouchesHeaderActions() {
  const { isAuthenticated, openAuthModal } = useAuthModal()

  if (isAuthenticated) {
    return (
      <Link
        href="/dashboard/orders"
        className="border-whitesmoke-300 hover:border-whitesmoke-400 flex items-center gap-[15px] rounded-lg border bg-gray-100 p-4 transition-colors [background:linear-gradient(180deg,_rgba(235,_45,_255,_0),_rgba(235,_45,_255,_0.18)),_linear-gradient(#0d1b35,_#0d1b35)]"
      >
        <span className="bg-fuchsia flex h-8 w-8 shrink-0 items-center justify-center rounded-[7.11px]">
          <CentralIcon
            name="IconPaperPlane"
            join="round"
            fill="filled"
            stroke="1"
            radius="1"
            size={18}
            color="#FFFFFF"
            ariaHidden
          />
        </span>
        <span className="flex flex-col">
          <span className="text-lg leading-num-28 tracking-num-0_02 font-bold text-white">
            Share Your Vouch
          </span>
          <span className="text-num-16 leading-num-24 text-whitesmoke-200 font-medium">
            Upload proof from your orders to feature here
          </span>
        </span>
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={() => openAuthModal('signup')}
      className="border-whitesmoke-300 hover:border-whitesmoke-400 flex items-center gap-[15px] rounded-lg border bg-gray-100 p-4 text-left transition-colors [background:linear-gradient(180deg,_rgba(235,_45,_255,_0),_rgba(235,_45,_255,_0.18)),_linear-gradient(#0d1b35,_#0d1b35)]"
    >
      <span className="bg-fuchsia flex h-8 w-8 shrink-0 items-center justify-center rounded-[7.11px]">
        <CentralIcon
          name="IconPaperPlane"
          join="round"
          fill="filled"
          stroke="1"
          radius="1"
          size={18}
          color="#FFFFFF"
          ariaHidden
        />
      </span>
      <span className="flex flex-col">
        <span className="text-lg leading-num-28 tracking-num-0_02 font-bold text-white">
          Share Your Vouch
        </span>
        <span className="text-num-16 leading-num-24 text-whitesmoke-200 font-medium">
          Sign up to upload proof from your orders
        </span>
      </span>
    </button>
  )
}
