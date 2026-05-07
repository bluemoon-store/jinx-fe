'use client'

import CentralIcon from '@central-icons-react/all'
import { formatDistanceToNow } from 'date-fns'

import type { Ticket } from '@/types/support'

type TicketListItemProps = {
  ticket: Ticket
  selected: boolean
  onSelect: () => void
}

export function TicketListItem({ ticket, selected, onSelect }: TicketListItemProps) {
  const preview = ticket.lastMessage?.message?.slice(0, 80) ?? ticket.subject ?? 'No messages yet'
  const time = (() => {
    try {
      return formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })
    } catch {
      return ''
    }
  })()
  const unread = ticket.unreadForUser ?? 0

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`border-border-subtle bg-card flex w-full items-center justify-between gap-3 border-b px-4 py-4 text-left transition-colors sm:px-6 ${
        selected ? 'bg-card-elevated' : 'hover:bg-hover-bg'
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
            selected ? 'bg-[#EA2CFF] text-white' : 'bg-card-elevated text-foreground'
          }`}
        >
          <CentralIcon
            name="IconTicket"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={18}
            color="currentColor"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold sm:text-base">{ticket.ticketNumber}</p>
          <p className="text-muted-foreground truncate text-sm">{preview}</p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-muted-foreground text-xs sm:text-sm">{time}</span>
        {unread > 0 ? (
          <span className="rounded-md bg-[#ea2cff] px-1.5 py-0.5 text-xs font-semibold text-white">
            {unread}
          </span>
        ) : null}
      </div>
    </button>
  )
}
