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
      className="h-[47px] w-[82px] shrink-0"
      priority
    />
  )
}
