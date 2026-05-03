'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createTicketAction,
  getTicketDetailAction,
  listMyTicketsAction,
  resolveTicketAction,
  sendMessageAction,
} from '@/actions/support'
import { useCurrentUser } from '@/hooks/use-auth'
import { parseApiError } from '@/lib/api-error'
import { toast } from '@/lib/toast'
import type { CreateTicketPayload, ListMyTicketsParams, TicketDetail, TicketMessage } from '@/types/support'

export const SUPPORT_QUERY_KEYS = {
  all: ['support-tickets'] as const,
  lists: () => [...SUPPORT_QUERY_KEYS.all, 'list'] as const,
  list: (params: ListMyTicketsParams) => [...SUPPORT_QUERY_KEYS.lists(), params] as const,
  details: () => [...SUPPORT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...SUPPORT_QUERY_KEYS.details(), id] as const,
}

export function useMyTicketsQuery(
  params?: ListMyTicketsParams,
  options?: { enabled?: boolean }
) {
  const page = params?.page ?? 1
  const limit = params?.limit ?? 50
  const { data: user, isLoading: userLoading } = useCurrentUser()
  return useQuery({
    queryKey: SUPPORT_QUERY_KEYS.list({ page, limit }),
    queryFn: () => listMyTicketsAction({ page, limit }),
    enabled: (options?.enabled ?? true) && Boolean(user) && !userLoading,
  })
}

export function useTicketDetailQuery(
  ticketId: string | undefined | null,
  options?: { enabled?: boolean }
) {
  const { data: user, isLoading: userLoading } = useCurrentUser()
  return useQuery({
    queryKey: SUPPORT_QUERY_KEYS.detail(ticketId ?? ''),
    queryFn: () => getTicketDetailAction(ticketId!),
    enabled:
      Boolean(ticketId) && Boolean(user) && !userLoading && (options?.enabled ?? true),
  })
}

export function useCreateTicketMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateTicketPayload) => createTicketAction(payload),
    onSuccess: (detail) => {
      void queryClient.invalidateQueries({ queryKey: SUPPORT_QUERY_KEYS.lists() })
      queryClient.setQueryData(SUPPORT_QUERY_KEYS.detail(detail.id), detail)
    },
    onError: (e) => {
      toast.error(parseApiError(e))
    },
  })
}

export function useSendMessageMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ ticketId, message }: { ticketId: string; message: string }) =>
      sendMessageAction(ticketId, { message }),
    onMutate: async ({ ticketId, message }) => {
      await queryClient.cancelQueries({ queryKey: SUPPORT_QUERY_KEYS.detail(ticketId) })
      const previous = queryClient.getQueryData<TicketDetail>(SUPPORT_QUERY_KEYS.detail(ticketId))
      const tempId = `pending-${Date.now()}`
      const optimistic: TicketMessage = {
        id: tempId,
        ticketId,
        message,
        isStaff: false,
        createdAt: new Date().toISOString(),
        pending: true,
      }
      if (previous) {
        queryClient.setQueryData<TicketDetail>(SUPPORT_QUERY_KEYS.detail(ticketId), {
          ...previous,
          messages: [...(previous.messages ?? []), optimistic],
        })
      }
      return { previous, tempId, ticketId }
    },
    onError: (err, { ticketId }, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(SUPPORT_QUERY_KEYS.detail(ticketId), ctx.previous)
      }
      toast.error(parseApiError(err))
    },
    onSuccess: (data, { ticketId }, ctx) => {
      queryClient.setQueryData<TicketDetail | undefined>(SUPPORT_QUERY_KEYS.detail(ticketId), (old) => {
        if (!old) return old
        const without = (old.messages ?? []).filter((m) => m.id !== ctx?.tempId)
        return { ...old, messages: [...without, { ...data, pending: false }] }
      })
      void queryClient.invalidateQueries({ queryKey: SUPPORT_QUERY_KEYS.lists() })
    },
  })
}

export function useResolveTicketMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ticketId: string) => resolveTicketAction(ticketId),
    onSuccess: (row, ticketId) => {
      void queryClient.invalidateQueries({ queryKey: SUPPORT_QUERY_KEYS.lists() })
      queryClient.setQueryData<TicketDetail | undefined>(SUPPORT_QUERY_KEYS.detail(ticketId), (old) => {
        if (!old) return old
        return {
          ...old,
          status: row.status,
          closedAt: row.closedAt ?? old.closedAt,
          updatedAt: row.updatedAt,
        }
      })
      toast.success('Ticket marked as resolved.')
    },
    onError: (e) => {
      toast.error(parseApiError(e))
    },
  })
}
