'use client'

import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'

import { BrandLoader } from '@/components/ui/BrandLoader'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { useMyDropsQuery } from '@/hooks/use-drops'
import { toast } from '@/lib/toast'

function formatClaimDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

async function copyClaimContent(content: string) {
  if (!navigator?.clipboard?.writeText) {
    toast.error('Could not copy. Please try again.')
    return
  }
  try {
    await navigator.clipboard.writeText(content)
    toast.success('Copied')
  } catch {
    toast.error('Could not copy. Please try again.')
  }
}

export default function DashboardDropsPage() {
  const myDropsQuery = useMyDropsQuery()

  if (myDropsQuery.isLoading) {
    return (
      <Reveal variant="fade-up" delay={140}>
        <BrandLoader className="py-12" />
      </Reveal>
    )
  }

  if (myDropsQuery.isError) {
    return (
      <Reveal variant="fade-up" delay={140}>
        <div className="py-12 text-center text-white/70">Could not load your drops right now.</div>
      </Reveal>
    )
  }

  const claims = myDropsQuery.data ?? []

  if (!claims.length) {
    return (
      <Reveal variant="fade-up" delay={140}>
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-lg font-semibold text-white">No drops claimed yet</p>
          <p className="text-sm text-white/70">Claim your first free drop from the public drops page.</p>
          <Link href="/drops" className="text-fuchsia text-sm font-semibold underline-offset-4 hover:underline">
            Go to /drops
          </Link>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal variant="fade-up" delay={140}>
      <div className="space-y-3">
        {claims.map((claim) => {
          const product = claim.drop.product
          const imageSrc = product.images?.find((img) => img.isPrimary && img.url)?.url ?? product.images?.[0]?.url
          return (
            <article
              key={claim.id}
              className="flex flex-col gap-3 rounded-xl border border-[#1f2e47] bg-[#0B1221] p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[#111a2d]">
                  {imageSrc ? (
                    <img src={imageSrc} alt={product.name} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{product.name}</p>
                  <p className="truncate text-xs text-white/65">{claim.drop.variant.label}</p>
                  <p className="mt-1 text-xs text-white/65">Claimed on {formatClaimDate(claim.claimedAt)}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" onClick={() => void copyClaimContent(claim.claimedContent)}>
                  PRODUCT ITEMS
                </Button>
                <Link
                  href={`/shop/${claim.productSlug}` as Route}
                  className="inline-flex h-9 items-center gap-1 rounded-md border border-[#33415d] px-3 text-xs font-semibold text-white/85 hover:bg-white/5"
                >
                  Learn more
                  <CentralIcon
                    name="IconArrowRight"
                    join="round"
                    fill="filled"
                    stroke="1"
                    radius="1"
                    size={14}
                    ariaHidden
                  />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </Reveal>
  )
}
