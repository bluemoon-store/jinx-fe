'use client'

import type { Vouch } from '@/lib/api'
import CentralIcon from '@central-icons-react/all'
import { format } from 'date-fns'
import Link from 'next/link'
import type { FunctionComponent } from 'react'

type Props = {
  vouch: Vouch
}

export const VouchCard: FunctionComponent<Props> = ({ vouch }) => {
  const alt = vouch.caption?.trim() || 'Customer vouch'

  return (
    <article className="font-nata-sans border-darkslateblue relative box-border flex w-full flex-col items-center gap-3 rounded-lg border border-solid bg-gray-100 p-3 text-center text-base text-ghostwhite">
      <div className="relative w-full shrink-0 overflow-hidden rounded-md">
        <img src={vouch.imageUrl} alt={alt} className="block h-auto w-full object-contain" loading="lazy" />
      </div>

      <div className="flex max-w-full flex-col items-center gap-0.5">
        <div className="flex w-full items-center justify-center">
          <Link
            href={`/shop/${vouch.product.slug}`}
            className="relative shrink-0 font-extrabold uppercase leading-6 tracking-num-0.02 text-ghostwhite transition-colors hover:text-fuchsia-200"
          >
            {vouch.product.name}
          </Link>
        </div>
        <div className="font-commissioner flex items-center justify-center rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.14))] px-1.5 py-0 text-white">
          <b className="relative leading-6 font-bold [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
            {format(new Date(vouch.createdAt), 'MMM d, yyyy')}
          </b>
        </div>
      </div>

      <div className="font-commissioner text-limegreen-100 bg-limegreen-200 flex items-center justify-center gap-[5px] rounded-[10px] px-1 py-0">
        <CentralIcon
          name="IconShieldCheck"
          join="round"
          fill="filled"
          stroke="1"
          radius="1"
          size={14}
          color="#1bd924"
          ariaHidden
        />
        <div className="relative font-semibold leading-7 tracking-[-0.01em]">Verified Customer</div>
      </div>
    </article>
  )
}
