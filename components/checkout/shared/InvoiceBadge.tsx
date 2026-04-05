import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

type Props = { id?: string }

export function InvoiceBadge({ id = 'JINX-LKXJLKNALSDJ' }: Props) {
  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-gray-100 px-2 py-1.5">
      <span className="text-right text-xs font-semibold text-lightsteelblue-200">Invoice ID</span>
      <div className="flex items-center gap-1">
        <span className="text-right text-xs font-semibold text-ghostwhite">{id}</span>
        <Image src={checkoutImg.invoiceCopy} alt="" width={14} height={14} />
      </div>
    </div>
  )
}
