'use client'

import CentralIcon from '@central-icons-react/all'
import { FunctionComponent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type LogOutConfirmModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
}

const LogOutConfirmModal: FunctionComponent<LogOutConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  if (typeof document === 'undefined') return null

  const handleConfirm = async () => {
    setIsSubmitting(true)
    try {
      await onConfirm()
    } finally {
      setIsSubmitting(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[110] flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-6 lg:px-8">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <section
        className="text-ghostwhite font-nata-sans relative z-10 box-border flex w-full max-w-[419px] shrink-0 flex-col items-start overflow-hidden rounded-xl border border-solid border-gray-500 bg-gray-200 p-4 text-left text-base shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,_0,_0,_0.1),_0px_6.213004112243652px_9.32px_-6.21px_rgba(0,_0,_0,_0.1)] sm:p-5 sm:text-lg lg:max-w-[480px] lg:p-6 lg:text-[20px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
      >
        <div className="text-whitesmoke-100 flex w-full min-w-0 flex-col items-start gap-4 self-stretch sm:gap-5">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="flex items-center justify-between gap-2 self-stretch sm:gap-5">
              <h2
                id="logout-dialog-title"
                className="leading-num-28 text-lg font-extrabold tracking-[0.02em] uppercase sm:text-xl lg:text-[20px]"
              >
                LOG OUT
              </h2>
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
          </div>

          <p className="text-lightsteelblue-100 font-commissioner text-sm leading-6 font-medium sm:text-base sm:leading-[22px]">
            Are you sure you want to log out of your account?
          </p>

          <div className="font-commissioner mt-1 flex w-full min-w-0 flex-col gap-3 self-stretch sm:mt-0 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-num-8 border-darkslateblue text-num-16 box-border flex min-h-11 min-w-0 flex-1 touch-manipulation items-center justify-center border border-solid bg-[#0D1B35] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#14253F] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-12 sm:py-3.5"
            >
              No, Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="bg-fuchsia text-num-16 box-border flex min-h-11 min-w-0 flex-1 touch-manipulation items-center justify-center rounded-[7.79px] px-4 py-3 font-semibold text-white shadow-[0px_2px_0px_rgba(235,_45,_255,_0.5)] [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-12 sm:py-3.5"
            >
              {isSubmitting ? 'Logging out…' : 'Yes, Log Out'}
            </button>
          </div>
        </div>
      </section>
    </div>,
    document.body
  )
}

export default LogOutConfirmModal
