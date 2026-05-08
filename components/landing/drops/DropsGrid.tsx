'use client'

import { BrandLoader } from '@/components/ui/BrandLoader'
import { usePublicDropsQuery } from '@/hooks/use-drops'
import { DropCard } from './DropCard'

export function DropsGrid() {
  const { data, isLoading, isError } = usePublicDropsQuery()

  if (isLoading) return <BrandLoader className="py-16" />

  if (isError) {
    return (
      <div className="border-border-subtle bg-card text-foreground/75 rounded-lg border p-8 text-center dark:text-white/75">
        Could not load drops right now. Please try again shortly.
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="flex w-full justify-center">
        <div className="border-border-subtle bg-card font-commissioner rounded-num-8 flex w-full max-w-[540px] flex-col items-center justify-center border border-solid px-6 py-10 text-center sm:px-10 sm:py-12 dark:border-[#16243B] dark:bg-[#071935]">
          <img
            className="h-auto w-[min(100%,220px)] max-w-[220px] object-contain"
            alt=""
            src="/icons/drop-404.svg"
            width={280}
            height={210}
            aria-hidden
          />
          <h2 className="text-foreground tracking-num--0_01 mt-4 text-lg font-bold sm:mt-6 sm:text-xl dark:text-white">
            No Ongoing Drops
          </h2>
          <p className="text-muted-foreground dark:text-lightsteelblue-100 mt-2 max-w-[420px] text-sm leading-6 font-medium sm:text-base">
            Keep an eye on our telegram channel for all the latest updates on the upcoming drops.
          </p>
        </div>
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
