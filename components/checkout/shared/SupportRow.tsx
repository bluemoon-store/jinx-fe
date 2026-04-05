import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

export function SupportRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="text-sm font-semibold text-lightsteelblue-200">Facing Issues?</span>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-xl bg-white/[0.05] px-3 py-1.5 text-[15.4px] font-semibold text-ghostwhite hover:bg-white/10"
      >
        <Image src={checkoutImg.rescue} alt="" width={17} height={17} />
        Contact Support
      </button>
    </div>
  )
}
