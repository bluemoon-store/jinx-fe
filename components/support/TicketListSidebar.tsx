'use client'

import CentralIcon from '@central-icons-react/all'

import type { Ticket } from '@/types/support'

import { TicketListItem } from '@/components/support/TicketListItem'

type TicketListSidebarProps = {
  tickets: Ticket[]
  selectedTicketId: string | null
  onSelectTicket: (id: string) => void
  onCreateClick: () => void
  isLoading?: boolean
  isAuthenticated?: boolean
}

export function TicketListSidebar({
  tickets,
  selectedTicketId,
  onSelectTicket,
  onCreateClick,
  isLoading,
  isAuthenticated = true,
}: TicketListSidebarProps) {
  const showEmpty = isAuthenticated && !isLoading && tickets.length === 0

  return (
    <aside className="flex flex-col border-b border-border-subtle bg-footer lg:w-[360px] lg:border-r lg:border-b-0">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-card lg:max-h-none">
        {!isAuthenticated || showEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
            <CentralIcon
              name="IconTicket"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={36}
              color="#EA2CFF"
              className="mb-2"
            />
            <h3 className="text-lg font-semibold text-foreground">No Tickets Created</h3>
            <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              {isAuthenticated
                ? 'You have no tickets on your account'
                : 'Sign in to view and create support tickets'}
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-1 items-center justify-center px-6 py-10">
            <div
              className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
              role="status"
              aria-label="Loading tickets"
            />
          </div>
        ) : (
          <div className="max-h-[380px] flex-1 overflow-y-auto lg:max-h-none">
            {tickets.map((ticket) => (
              <TicketListItem
                key={ticket.id}
                ticket={ticket}
                selected={selectedTicketId === ticket.id}
                onSelect={() => onSelectTicket(ticket.id)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-border-subtle bg-card p-4 sm:p-6">
        <button
          type="button"
          onClick={onCreateClick}
          disabled={!isAuthenticated}
          className="h-14 w-full rounded-[9px] bg-[linear-gradient(180deg,#EA2CFF_0%,#CF2DEB_100%)] text-lg font-semibold text-white shadow-[0px_2px_0px_#eb2dff80] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Create New Ticket
        </button>
      </div>
    </aside>
  )
}
