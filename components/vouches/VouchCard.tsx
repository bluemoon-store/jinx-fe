'use client'

import type { Vouch } from '@/lib/api'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import type { FunctionComponent } from 'react'

type Props = {
  vouch: Vouch
}

export const VouchCard: FunctionComponent<Props> = ({ vouch }) => {
  return (
    <article className="rounded-num-12 border-darkslateblue/70 flex h-full flex-col gap-3 border bg-[#0B1221] p-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <Image src={vouch.imageUrl} alt={vouch.caption ?? 'Customer vouch'} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lightsteelblue-100 line-clamp-2 min-h-10 text-sm">
          {vouch.caption?.trim() || 'Shared a delivery proof screenshot.'}
        </p>
        <div className="text-xs text-white/70">
          by <span className="font-semibold text-white">{vouch.user.userName}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <Link href={`/shop/${vouch.product.slug}`} className="text-fuchsia truncate font-semibold">
            {vouch.product.name}
          </Link>
          <span className="text-white/50">{format(new Date(vouch.createdAt), 'MMM d, yyyy')}</span>
        </div>
      </div>
    </article>
  )
}

