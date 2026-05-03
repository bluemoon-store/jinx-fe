import { api } from '@/lib/api'
import type { BackendResponse } from '@/types/auth'
import type {
  CreateTicketPayload,
  ListMyTicketsParams,
  PaginatedTickets,
  SendMessagePayload,
  TicketDetail,
  TicketMessage,
  Ticket,
} from '@/types/support'

function unwrap<T>(res: { data: BackendResponse<T> }): T {
  return res.data.data
}

type ApiTicketRow = Ticket & { unreadCount?: number }

function mapListItem(row: ApiTicketRow): Ticket {
  const { unreadCount, ...rest } = row
  return {
    ...rest,
    unreadForUser: typeof unreadCount === 'number' ? unreadCount : rest.unreadForUser,
  }
}

export async function createTicketAction(payload: CreateTicketPayload): Promise<TicketDetail> {
  const res = await api.post<BackendResponse<TicketDetail>>('/tickets', payload)
  return unwrap(res)
}

export async function listMyTicketsAction(params?: ListMyTicketsParams): Promise<PaginatedTickets> {
  const res = await api.get<BackendResponse<{ items: ApiTicketRow[]; metadata: PaginatedTickets['metadata'] }>>(
    '/tickets',
    {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 50,
      },
    }
  )
  const raw = unwrap(res)
  return {
    metadata: raw.metadata,
    items: raw.items.map(mapListItem),
  }
}

export async function getTicketDetailAction(id: string): Promise<TicketDetail> {
  const res = await api.get<BackendResponse<TicketDetail>>(`/tickets/${id}`)
  return unwrap(res)
}

export async function sendMessageAction(id: string, payload: SendMessagePayload): Promise<TicketMessage> {
  const res = await api.post<BackendResponse<TicketMessage>>(`/tickets/${id}/messages`, payload)
  return unwrap(res)
}

export async function resolveTicketAction(id: string): Promise<Ticket> {
  const res = await api.post<BackendResponse<Ticket>>(`/tickets/${id}/resolve`, {})
  return unwrap(res)
}
