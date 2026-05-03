'use client'

import type { TicketMessage } from '@/types/support'

import { MessageBubble } from '@/components/support/MessageBubble'

type MessageListProps = {
  messages: TicketMessage[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
    </div>
  )
}
