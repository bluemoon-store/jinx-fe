export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING_USER' | 'RESOLVED' | 'CLOSED'

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface TicketAttachment {
  id: string
  url: string
  fileName: string
  mimeType: string
  size: number
  createdAt?: string
}

export interface TicketMessageUser {
  id: string
  userName?: string
  firstName?: string | null
  lastName?: string | null
  avatar?: string | null
}

export interface TicketMessage {
  id: string
  ticketId: string
  message: string
  isStaff: boolean
  createdAt: string
  user?: TicketMessageUser | null
  attachments?: TicketAttachment[]
  pending?: boolean
}

export interface TicketOrderRef {
  id: string
  orderNumber?: string
}

export interface TicketAssignee {
  id: string
  userName?: string
  firstName?: string | null
  lastName?: string | null
}

export interface Ticket {
  id: string
  ticketNumber: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
  updatedAt: string
  closedAt?: string | null
  orderId?: string | null
  order?: TicketOrderRef | null
  assignedTo?: TicketAssignee | null
  lastMessage?: { message: string; createdAt: string; isStaff: boolean } | null
  unreadForUser?: number
}

export interface TicketDetail extends Ticket {
  messages: TicketMessage[]
}

export interface CreateTicketPayload {
  subject: string
  message: string
  orderId?: string
}

export interface SendMessagePayload {
  message: string
  attachmentIds?: string[]
}

export type ListMyTicketsParams = {
  page?: number
  limit?: number
}

export type PaginatedTickets = {
  items: Ticket[]
  metadata: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

export function isTicketTerminalStatus(status: TicketStatus): boolean {
  return status === 'RESOLVED' || status === 'CLOSED'
}
