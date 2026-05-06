'use client'

import CentralIcon from '@central-icons-react/all'
import { format } from 'date-fns'

import type { TicketDetail } from '@/types/support'

const STATUS_LABEL: Record<string, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In progress',
  WAITING_USER: 'Awaiting your reply',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
}

type TicketHeaderProps = {
  ticket: TicketDetail
  onResolve: () => void
  isResolving?: boolean
}

export function TicketHeader({ ticket, onResolve, isResolving }: TicketHeaderProps) {
  const created = (() => {
    try {
      return format(new Date(ticket.createdAt), 'MMM d, yyyy')
    } catch {
      return ''
    }
  })()

  const isClosed = ticket.status === 'CLOSED' || ticket.status === 'RESOLVED'

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-lg border border-border-subtle bg-card-elevated p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EA2CFF]">
          <CentralIcon
            name="IconTicket"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={18}
            color="#ffffff"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-foreground">{ticket.ticketNumber}</p>
          <p className="truncate text-sm text-muted-foreground">
            {ticket.subject}
            <span className="text-muted-foreground"> — Created: {created}</span>
          </p>
          <p className="mt-1 text-xs font-semibold text-[#EA2CFF]">{STATUS_LABEL[ticket.status] ?? ticket.status}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:items-end">
        <span className="text-sm font-semibold text-foreground">Issue solved?</span>
        <button
          type="button"
          disabled={isClosed || isResolving}
          onClick={onResolve}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-hover-bg disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CentralIcon
            name="IconCircleCheck"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            color="#1AD824"
          />
          {isResolving ? 'Closing…' : 'Close Ticket'}
        </button>
      </div>
    </div>
  )
}
