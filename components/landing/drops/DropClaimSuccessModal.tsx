'use client'

import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from '@/lib/toast'
import type { DropClaimResult } from '@/types/drops'

type Props = {
  open: boolean
  claim: DropClaimResult | null
  onClose: () => void
}

export function DropClaimSuccessModal({ open, claim, onClose }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!mounted || !open || !claim) return null

  const handleCopy = async () => {
    if (!navigator?.clipboard?.writeText) {
      toast.error('Could not copy. Please try again.')
      return
    }
    try {
      await navigator.clipboard.writeText(claim.claimedContent)
      toast.success('Copied to clipboard', { description: claim.claimedContent })
    } catch {
      toast.error('Could not copy. Please try again.')
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close modal"
        onClick={onClose}
      />
      <Card className="relative z-10 w-full max-w-[500px] rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(27,217,36,0.25)_0%,rgba(27,217,36,0)_55%),linear-gradient(#051329,#051329)] p-6 text-white shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,0,0,0.1),0px_6.213004112243652px_9.32px_-6.21px_rgba(0,0,0,0.1)] sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <Image
              src={checkoutImg.subscriptionTick}
              alt=""
              width={50}
              height={50}
              className="h-12 w-12 sm:h-[50px] sm:w-[50px]"
            />
            <h3 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] uppercase sm:text-2xl">
              Free Drop
              <br />
              Claimed Successfully
            </h3>
            <p className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
              You were among the few lucky recipients of a free drop.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-bold text-white sm:text-base">
              Here&apos;s what you got in the drop
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="focus-visible:ring-fuchsia/40 group flex min-h-[64px] w-full touch-manipulation items-center justify-center gap-3 rounded-xl border border-dashed border-fuchsia-100 bg-[linear-gradient(180deg,rgba(235,45,255,0.25)_0%,rgba(235,45,255,0)_100%)] px-4 py-4 transition-opacity [-webkit-tap-highlight-color:transparent] hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none sm:px-9 sm:py-5"
              aria-label="Copy product items"
            >
              <span className="font-nata-sans text-base font-extrabold tracking-[0.48px] text-slate-50 sm:text-xl">
                PRODUCT ITEMS
              </span>
              <Image
                src={checkoutImg.invoiceCopy}
                alt=""
                width={26}
                height={26}
                className="shrink-0 opacity-90 transition-opacity group-hover:opacity-100"
              />
            </button>
          </div>

          <div className="h-px w-full bg-white/10" />

          <div className="flex flex-col gap-2.5">
            <Link
              href={`/shop/${claim.productSlug}` as Route}
              onClick={onClose}
              className="border-whitesmoke-300 group flex items-center justify-between gap-3 rounded-xl border bg-gray-200 px-4 py-3.5 transition-colors hover:bg-gray-700 sm:px-5 sm:py-4"
            >
              <span className="flex items-center gap-3">
                <CentralIcon
                  name="IconBox2"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={22}
                  className="text-white"
                  ariaHidden
                />
                <span className="text-sm font-bold text-white sm:text-base">
                  Learn more about the product
                </span>
              </span>
              <CentralIcon
                name="IconChevronRightMedium"
                join="round"
                fill="outlined"
                stroke="1"
                radius="1"
                size={18}
                className="text-lightsteelblue-200 transition-transform group-hover:translate-x-0.5"
                ariaHidden
              />
            </Link>

            <Link
              href={claim.dashboardPath as Route}
              onClick={onClose}
              className="border-whitesmoke-300 group flex items-center justify-between gap-3 rounded-xl border bg-gray-200 px-4 py-3.5 transition-colors hover:bg-gray-700 sm:px-5 sm:py-4"
            >
              <span className="flex items-center gap-3">
                <CentralIcon
                  name="IconSquareGridMagnifyingGlass"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={22}
                  className="text-white"
                  ariaHidden
                />
                <span className="text-sm font-bold text-white sm:text-base">
                  View in your dashboard
                </span>
              </span>
              <CentralIcon
                name="IconChevronRightMedium"
                join="round"
                fill="outlined"
                stroke="1"
                radius="1"
                size={18}
                className="text-lightsteelblue-200 transition-transform group-hover:translate-x-0.5"
                ariaHidden
              />
            </Link>
          </div>

          <div className="h-px w-full bg-white/10" />

          <Button
            variant="outline"
            onClick={onClose}
            className="h-11 rounded-[7.79px] border border-white/10 bg-gray-100 text-base font-semibold text-white shadow-[0px_2px_0px_rgba(13,27,53,0.5)] hover:bg-gray-700 hover:text-white"
          >
            Close
          </Button>
        </div>
      </Card>
    </div>
  )

  return createPortal(modalContent, document.body)
}
