import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

const links = ['Terms', 'Privacy', 'Refund', 'Cookies'] as const

export function LegalFooter() {
  return (
    <div className="mt-auto flex flex-wrap items-center justify-center gap-3 pt-10 md:justify-start">
      <span className="font-nata-sans text-sm font-bold text-lightsteelblue-200">LEGAL</span>
      <Image src={checkoutImg.legalSep} alt="" width={18} height={2} className="opacity-80" />
      <div className="flex flex-wrap items-center gap-1">
        {links.map((label) => (
          <button
            key={label}
            type="button"
            className="rounded-xl px-3 py-1.5 text-sm font-semibold text-ghostwhite hover:bg-white/5"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
