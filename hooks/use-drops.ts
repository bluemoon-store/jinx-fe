'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import {
  claimDropAction,
  getMyDropClaimAction,
  listMyDropsAction,
  listPublicDropsAction,
} from '@/actions/drops'
import { useAuthModal } from '@/components/auth/auth-modal-context'
import { useCurrentUser } from '@/hooks/use-auth'
import { parseApiError } from '@/lib/api-error'
import { toast } from '@/lib/toast'
import type { MyDropClaim } from '@/types/drops'

export const DROP_QUERY_KEYS = {
  public: ['public-drops'] as const,
  mine: ['my-drops'] as const,
}

export const DROPS_QUERY_KEYS = {
  all: ['drops'] as const,
  myList: () => [...DROPS_QUERY_KEYS.all, 'me', 'list'] as const,
  myDetail: (id: string) => [...DROPS_QUERY_KEYS.all, 'me', 'detail', id] as const,
}

function mapDropErrorToToast(message: string): string | null {
  const lower = message.toLowerCase()
  if (!lower.includes('drop.error')) return null
  if (lower.includes('exhausted')) return 'This drop has been fully claimed.'
  if (lower.includes('expired')) return 'This drop has expired.'
  if (lower.includes('notallowed') || lower.includes('not_allowed')) {
    return "You're not eligible for this drop."
  }
  if (lower.includes('alreadyclaimed') || lower.includes('already_claimed')) {
    return "You've already claimed this drop."
  }
  return null
}

export function usePublicDropsQuery() {
  return useQuery({
    queryKey: DROP_QUERY_KEYS.public,
    queryFn: listPublicDropsAction,
  })
}

export function useClaimDropMutation() {
  const queryClient = useQueryClient()
  const { openAuthModal } = useAuthModal()

  return useMutation({
    mutationFn: (dropId: string) => claimDropAction(dropId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: DROP_QUERY_KEYS.public })
      void queryClient.invalidateQueries({ queryKey: DROP_QUERY_KEYS.mine })
      void queryClient.invalidateQueries({ queryKey: DROPS_QUERY_KEYS.myList() })
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        openAuthModal('signin')
        return
      }
      const message = parseApiError(error)
      const toastMessage = mapDropErrorToToast(message)
      toast.error(toastMessage ?? message)
      if (toastMessage === "You've already claimed this drop.") {
        void queryClient.invalidateQueries({ queryKey: DROP_QUERY_KEYS.public })
      }
    },
  })
}

export function useMyDropsQuery() {
  const { data: user, isLoading } = useCurrentUser()
  return useQuery({
    queryKey: DROPS_QUERY_KEYS.myList(),
    queryFn: listMyDropsAction,
    enabled: Boolean(user) && !isLoading,
  })
}

export function useMyDropClaimQuery<TSelected = MyDropClaim>(
  claimId: string | undefined,
  options?: {
    enabled?: boolean
    select?: (claim: MyDropClaim) => TSelected
  }
) {
  const { data: user, isLoading } = useCurrentUser()
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: DROPS_QUERY_KEYS.myDetail(claimId ?? ''),
    queryFn: () => getMyDropClaimAction(claimId!),
    enabled: Boolean(claimId) && Boolean(user) && !isLoading && (options?.enabled ?? true),
    select: options?.select,
    initialData: () => {
      if (!claimId) return undefined
      const list = (queryClient.getQueryData(DROPS_QUERY_KEYS.myList()) ?? []) as MyDropClaim[]
      return list.find((item) => item.id === claimId)
    },
  })
}
