'use client'

import { useEffect } from 'react'

import { getSupportTicketSocket } from '@/lib/support-socket'

/**
 * Join the Socket.IO room for `ticketId` while mounted so `ticket:message` / `ticket:updated` are delivered.
 */
export function useSupportTicketRoom(ticketId: string | null) {
  useEffect(() => {
    if (!ticketId) return

    const socket = getSupportTicketSocket()
    if (!socket) return

    const join = () => {
      socket.emit('ticket:join', { ticketId })
    }
    if (socket.connected) join()
    socket.on('connect', join)

    return () => {
      socket.off('connect', join)
      socket.emit('ticket:leave', { ticketId })
    }
  }, [ticketId])
}
