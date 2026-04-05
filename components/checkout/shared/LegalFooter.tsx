import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

const links = ['Terms', 'Privacy', 'Refund', 'Cookies'] as const

export function LegalFooter() {
  return (
    <div className="mt-auto flex flex-wrap items-center justify-center gap-2 pt-6 sm:gap-3 sm:pt-10 md:justify-start">
      <span className="font-nata-sans text-sm font-bold text-lightsteelblue-200">LEGAL</span>
      <Image src={checkoutImg.legalSep} alt="" width={18} height={2} className="opacity-80" />
      <div className="flex flex-wrap items-center justify-center gap-1 md:justify-start">
        {links.map((label) => (
          <button
            key={label}
            type="button"
            className="min-h-11 rounded-xl px-3 py-2 text-sm font-semibold text-ghostwhite hover:bg-white/5 sm:min-h-0 sm:py-1.5"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
