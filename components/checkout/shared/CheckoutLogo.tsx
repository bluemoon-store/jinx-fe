import Image from 'next/image'

import { checkoutImg } from '@/components/checkout/checkout-images'

type Props = { variant?: 'default' | 'alt' }

export function CheckoutLogo({ variant = 'default' }: Props) {
  const src = variant === 'alt' ? checkoutImg.logoAlt : checkoutImg.logo
  return (
    <Image
      src={src}
      alt="Jinx"
      width={82}
      height={47}
      className="h-9 w-auto max-w-[72px] shrink-0 sm:h-[47px] sm:max-w-[82px]"
      priority
    />
  )
}
