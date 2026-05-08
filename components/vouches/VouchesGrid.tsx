'use client'

import { getVouchesAction } from '@/actions/vouch'
import { DashboardLoadMoreFooter } from '@/components/dashboard/DashboardLoadMoreFooter'
import { BrandLoader } from '@/components/ui/BrandLoader'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { FunctionComponent } from 'react'

import { VouchCard } from './VouchCard'

export const VouchesGrid: FunctionComponent = () => {
  const query = useInfiniteQuery({
    queryKey: ['vouches', 'public'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getVouchesAction({ page: pageParam, limit: 12, sort: 'newest' }),
    getNextPageParam: (lastPage) =>
      lastPage.metadata.currentPage < lastPage.metadata.totalPages
        ? lastPage.metadata.currentPage + 1
        : undefined,
  })

  const pages = query.data?.pages ?? []
  const vouches = pages.flatMap((page) => page.items)
  const total = pages[0]?.metadata.totalItems ?? 0

  if (query.isLoading) {
    return <BrandLoader className="py-14" />
  }

  if (query.isError) {
    return (
      <div className="text-foreground/70 dark:text-white/70 py-14 text-center">
        Failed to load vouches.
      </div>
    )
  }

  if (vouches.length === 0) {
    return <div className="text-foreground/70 dark:text-white/70 py-14 text-center">No vouches yet.</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {vouches.map((vouch) => (
          <VouchCard key={vouch.id} vouch={vouch} />
        ))}
      </div>
      <DashboardLoadMoreFooter
        shown={vouches.length}
        total={total}
        canLoadMore={Boolean(query.hasNextPage) && !query.isFetchingNextPage}
        onLoadMore={() => void query.fetchNextPage()}
      />
    </div>
  )
}
