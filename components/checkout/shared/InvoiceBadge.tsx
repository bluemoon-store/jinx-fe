import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

type Props = { id?: string }

export function InvoiceBadge({ id = 'JINX-LKXJLKNALSDJ' }: Props) {
  return (
    <div className="inline-flex min-h-10 max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-md border border-white/10 bg-gray-100 px-2 py-2 sm:min-h-0 sm:py-1.5">
      <span className="text-lightsteelblue-200 text-right text-sm font-semibold">Invoice ID</span>
      <div className="flex min-w-0 items-center gap-1">
        <span className="text-ghostwhite truncate text-right text-sm font-semibold">{id}</span>
        <Image src={checkoutImg.invoiceCopy} alt="" width={14} height={14} />
      </div>
    </div>
  )
}
