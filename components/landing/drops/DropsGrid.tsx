'use client'

import { BrandLoader } from '@/components/ui/BrandLoader'
import { usePublicDropsQuery } from '@/hooks/use-drops'
import { DropCard } from './DropCard'

export function DropsGrid() {
  const { data, isLoading, isError } = usePublicDropsQuery()

  if (isLoading) return <BrandLoader className="py-16" />

  if (isError) {
    return (
      <div className="rounded-lg border border-border-subtle bg-card p-8 text-center text-white/75">
        Could not load drops right now. Please try again shortly.
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="rounded-lg border border-border-subtle bg-card p-8 text-center text-white/75">
        No live drops available right now.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {data.map((drop) => (
        <DropCard key={drop.id} drop={drop} />
      ))}
    </div>
  )
}
