'use client'

import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'

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
  if (!open || !claim) return null

  const handleCopy = async () => {
    if (!navigator?.clipboard?.writeText) {
      toast.error('Could not copy. Please try again.')
      return
    }
    try {
      await navigator.clipboard.writeText(claim.claimedContent)
      toast.success('Copied')
    } catch {
      toast.error('Could not copy. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close modal"
        onClick={onClose}
      />
      <Card className="relative z-10 w-full max-w-xl border-[#1f2e47] bg-[#0B1221] p-6 text-white">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-full bg-green-500/20 p-2">
              <CentralIcon
                name="IconCircleCheck"
                join="round"
                fill="filled"
                stroke="1"
                radius="1"
                size={28}
                color="#22c55e"
                ariaHidden
              />
            </div>
            <h3 className="text-xl font-bold">FREE DROP CLAIMED SUCCESSFULLY</h3>
            <p className="text-sm text-white/75">
              You were among the few lucky recipients of a free drop.
            </p>
          </div>

          <div className="rounded-lg border border-[#1f2e47] bg-[#111a2d] p-3">
            <p className="mb-2 text-sm font-semibold text-white/80">Here&apos;s what you got in the drop</p>
            <Button className="w-full" onClick={handleCopy}>
              PRODUCT ITEMS
            </Button>
          </div>

          <div className="space-y-2 text-sm">
            <Link
              href={`/shop/${claim.productSlug}` as Route}
              className="flex items-center justify-between rounded-md border border-[#1f2e47] px-3 py-2 hover:bg-white/5"
            >
              <span>Learn more about the product</span>
              <CentralIcon name="IconArrowRight" join="round" fill="filled" stroke="1" radius="1" size={16} />
            </Link>
            <Link
              href={claim.dashboardPath as Route}
              className="flex items-center justify-between rounded-md border border-[#1f2e47] px-3 py-2 hover:bg-white/5"
            >
              <span>View in your dashboard</span>
              <CentralIcon name="IconArrowRight" join="round" fill="filled" stroke="1" radius="1" size={16} />
            </Link>
          </div>

          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
