import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

const links = ['Terms', 'Privacy', 'Refund', 'Cookies'] as const

export function LegalFooter() {
  return (
    <div className="mt-auto flex w-full min-w-0 flex-wrap items-center justify-start gap-2 pt-6 sm:gap-3 sm:pt-10">
      <span className="font-nata-sans text-lightsteelblue-200 text-sm font-bold">LEGAL</span>
      <Image src={checkoutImg.legalSep} alt="" width={18} height={2} className="opacity-80" />
      <div className="flex min-w-0 flex-wrap items-center justify-start gap-1">
        {links.map((label) => (
          <button
            key={label}
            type="button"
            className="text-ghostwhite min-h-11 rounded-xl px-3 py-2 text-sm font-semibold hover:bg-white/5 sm:min-h-0 sm:py-1.5"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
