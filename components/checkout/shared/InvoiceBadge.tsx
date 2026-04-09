'use client'

import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { toast } from '@/lib/toast'

type Props = { id?: string }

export function InvoiceBadge({ id = 'JINX-LKXJLKNALSDJ' }: Props) {
  const copyInvoiceId = async () => {
    try {
      if (!navigator?.clipboard?.writeText) {
        toast.error('Could not copy. Please try again.')
        return
      }
      await navigator.clipboard.writeText(id)
      toast.success('Copied to clipboard', { description: id })
    } catch {
      toast.error('Could not copy. Please try again.')
    }
  }

  return (
    <div className="inline-flex min-h-10 max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-md border border-white/10 bg-gray-100 px-2 py-2 sm:min-h-0 sm:py-1.5">
      <span className="text-lightsteelblue-200 text-right text-sm font-semibold">Invoice ID</span>
      <div className="flex min-w-0 items-center gap-1">
        <span className="text-ghostwhite truncate text-right text-sm font-semibold">{id}</span>
        <button
          type="button"
          onClick={copyInvoiceId}
          aria-label="Copy invoice ID"
          className="text-ghostwhite focus-visible:ring-fuchsia/40 inline-flex shrink-0 touch-manipulation rounded p-0.5 opacity-80 transition-opacity [-webkit-tap-highlight-color:transparent] hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
        >
          <Image src={checkoutImg.invoiceCopy} alt="" width={14} height={14} />
        </button>
      </div>
    </div>
  )
}
