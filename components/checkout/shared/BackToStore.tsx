import Image from 'next/image'
import Link from 'next/link'

import { checkoutImg } from '@/components/checkout/checkout-images'

export function BackToStore() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 w-fit shrink-0 items-center gap-2 self-start rounded-xl bg-white/[0.05] px-3 py-2 text-sm font-semibold text-ghostwhite transition-colors hover:bg-white/10"
    >
      <Image src={checkoutImg.back} alt="" width={14} height={14} />
      Back to store
    </Link>
  )
}
