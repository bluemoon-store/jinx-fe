'use client'

import { BrandLoader } from '@/components/ui/BrandLoader'
import { usePublicDropsQuery } from '@/hooks/use-drops'
import { DropCard } from './DropCard'

export function DropsGrid() {
  const { data, isLoading, isError } = usePublicDropsQuery()

  if (isLoading) return <BrandLoader className="py-16" />

  if (isError) {
    return (
      <div className="border-border-subtle bg-card text-foreground/75 dark:text-white/75 rounded-lg border p-8 text-center">
        Could not load drops right now. Please try again shortly.
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="border-border-subtle bg-card text-foreground/75 dark:text-white/75 rounded-lg border p-8 text-center">
        No live drops available right now.
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {data.map((drop) => (
        <div key={drop.id} className="flex w-full justify-center md:w-[calc(50%-0.5rem)]">
          <DropCard drop={drop} />
        </div>
      ))}
    </div>
  )
}
