'use client'

import type { ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useCurrentUser } from '@/hooks/use-auth'
import { SUPPORT_QUERY_KEYS } from '@/hooks/use-support'
import { disconnectSupportTicketSocket, getSupportTicketSocket } from '@/lib/support-socket'
import { getAccessToken } from '@/lib/token'
import type { TicketDetail, TicketMessage } from '@/types/support'

function isSocketTicketMessage(payload: unknown): payload is TicketMessage {
  if (!payload || typeof payload !== 'object') return false
  const o = payload as Record<string, unknown>
  return (
    typeof o.ticketId === 'string' &&
    typeof o.id === 'string' &&
    typeof o.message === 'string' &&
    typeof o.isStaff === 'boolean'
  )
}

function isTicketUpdatePayload(payload: unknown): payload is Partial<TicketDetail> & { id: string } {
  if (!payload || typeof payload !== 'object') return false
  const o = payload as Record<string, unknown>
  return typeof o.id === 'string'
}

export function SupportRealtimeProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()

  useEffect(() => {
    if (!user?.id || !getAccessToken()) {
      disconnectSupportTicketSocket()
      return
    }

    const attachListeners = () => {
      const socket = getSupportTicketSocket()
      if (!socket) return null

      const onMessage = (payload: unknown) => {
        if (!isSocketTicketMessage(payload)) return
        const message = payload
        const ticketId = message.ticketId

        queryClient.setQueryData<TicketDetail | undefined>(SUPPORT_QUERY_KEYS.detail(ticketId), (old) => {
          if (!old) return old
          const list = old.messages ?? []
          if (list.some((m) => m.id === message.id)) {
            return {
              ...old,
              messages: list.map((m) => (m.id === message.id ? { ...message, pending: false } : m)),
            }
          }
          return {
            ...old,
            messages: [...list, { ...message, pending: false }],
          }
        })

        void queryClient.invalidateQueries({ queryKey: SUPPORT_QUERY_KEYS.lists() })
      }

      const onUpdated = (payload: unknown) => {
        if (!isTicketUpdatePayload(payload)) return
        const patch = payload
        const id = patch.id

        queryClient.setQueryData<TicketDetail | undefined>(SUPPORT_QUERY_KEYS.detail(id), (old) => {
          if (!old) return old
          return {
            ...old,
            status: patch.status ?? old.status,
            priority: patch.priority ?? old.priority,
            updatedAt: (patch.updatedAt as string | undefined) ?? old.updatedAt,
            closedAt: patch.closedAt !== undefined ? patch.closedAt : old.closedAt,
            assignedTo: patch.assignedTo !== undefined ? patch.assignedTo : old.assignedTo,
            lastMessage: patch.lastMessage !== undefined ? patch.lastMessage : old.lastMessage,
          }
        })

        void queryClient.invalidateQueries({ queryKey: SUPPORT_QUERY_KEYS.lists() })
      }

      socket.on('ticket:message', onMessage)
      socket.on('ticket:updated', onUpdated)

      return () => {
        socket.off('ticket:message', onMessage)
        socket.off('ticket:updated', onUpdated)
      }
    }

    let detach = attachListeners()

    const onTokenChange = () => {
      detach?.()
      disconnectSupportTicketSocket()
      detach = attachListeners()
    }

    window.addEventListener('bm-access-token-changed', onTokenChange)

    return () => {
      window.removeEventListener('bm-access-token-changed', onTokenChange)
      detach?.()
      disconnectSupportTicketSocket()
    }
  }, [user?.id, queryClient])

  return <>{children}</>
}
