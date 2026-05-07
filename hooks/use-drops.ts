'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { claimDropAction, listMyDropsAction, listPublicDropsAction } from '@/actions/drops'
import { useAuthModal } from '@/components/auth/auth-modal-context'
import { useCurrentUser } from '@/hooks/use-auth'
import { parseApiError } from '@/lib/api-error'
import { toast } from '@/lib/toast'

export const DROP_QUERY_KEYS = {
  public: ['public-drops'] as const,
  mine: ['my-drops'] as const,
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
    queryKey: DROP_QUERY_KEYS.mine,
    queryFn: listMyDropsAction,
    enabled: Boolean(user) && !isLoading,
  })
}
