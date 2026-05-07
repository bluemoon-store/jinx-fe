import Image from 'next/image'
import Link from 'next/link'

import { checkoutImg } from '@/components/checkout/checkout-images'

export function SupportRow() {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
      <span className="text-lightsteelblue-200 text-center text-sm font-semibold sm:text-left">
        Facing Issues?
      </span>
      <Link
        href="/support"
        className="text-ghostwhite inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10 sm:min-h-0 sm:py-1.5"
      >
        <Image src={checkoutImg.rescue} alt="" width={17} height={17} />
        Contact Support
      </Link>
    </div>
  )
}
