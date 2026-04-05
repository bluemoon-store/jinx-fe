import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

export function SupportRow() {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
      <span className="text-center text-sm font-semibold text-lightsteelblue-200 sm:text-left">
        Facing Issues?
      </span>
      <button
        type="button"
        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold text-ghostwhite hover:bg-white/10 sm:min-h-0 sm:py-1.5"
      >
        <Image src={checkoutImg.rescue} alt="" width={17} height={17} />
        Contact Support
      </button>
    </div>
  )
}
