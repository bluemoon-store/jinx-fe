'use client'

import { io, type Socket } from 'socket.io-client'

import { getAccessToken } from '@/lib/token'

let socket: Socket | null = null
let lastToken: string | null = null

function resolveTicketsSocketBase(): string {
  const explicit = process.env.NEXT_PUBLIC_WS_URL?.replace(/\/$/, '')
  if (explicit) return explicit

  const feApi = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
  if (feApi && /^https?:\/\//i.test(feApi)) {
    return feApi.replace(/\/v1\/?$/i, '')
  }

  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return ''
}

export function getSupportTicketSocket(): Socket | null {
  if (typeof window === 'undefined') return null

  const token = getAccessToken()
  if (!token) {
    disconnectSupportTicketSocket()
    return null
  }

  const base = resolveTicketsSocketBase()
  if (!base) {
    return null
  }

  if (socket && lastToken === token) {
    return socket
  }

  if (socket) {
    socket.disconnect()
    socket = null
  }

  lastToken = token
  socket = io(`${base}/tickets`, {
    path: '/socket.io',
    auth: { token },
    transports: ['websocket', 'polling'],
  })

  return socket
}

export function disconnectSupportTicketSocket(): void {
  if (socket) {
    socket.disconnect()
    socket = null
  }
  lastToken = null
}

/**
 * Re-handshake after JWT rotation (called from the axios refresh interceptor).
 */
export function refreshSupportSocketAuth(): void {
  const token = getAccessToken()
  if (!token) {
    disconnectSupportTicketSocket()
    return
  }
  if (!socket) return
  lastToken = token
  socket.auth = { token }
  socket.disconnect()
  socket.connect()
}

/** @deprecated Prefer {@link getSupportTicketSocket} */
export const connectSupportSocket = getSupportTicketSocket

/** @deprecated Prefer {@link disconnectSupportTicketSocket} */
export const disconnectSupportSocket = disconnectSupportTicketSocket

/** @deprecated Prefer {@link getSupportTicketSocket} */
export const getSupportSocket = getSupportTicketSocket
