'use client'

import CentralIcon from '@central-icons-react/all'
import { format } from 'date-fns'

import type { TicketMessage } from '@/types/support'

function formatTime(iso: string): string {
  try {
    return format(new Date(iso), 'h:mm a')
  } catch {
    return ''
  }
}

type MessageBubbleProps = {
  message: TicketMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = !message.isStaff
  const time = formatTime(message.createdAt)

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <>
          <span className="text-xs text-[#646B86]">{time}</span>
          <div className="max-w-[90%] rounded-lg bg-[#ea2cff] px-4 py-3 text-sm font-semibold text-white sm:max-w-[78%] sm:text-base">
            {message.message}
          </div>
        </>
      ) : (
        <>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EA2CFF] text-base font-semibold text-white">
            <CentralIcon
              name="IconUser"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={18}
              color="#FFFFFF"
            />
          </div>
          <div className="max-w-[90%] rounded-lg border border-[#152850] bg-[#0d1b35] px-4 py-3 text-sm text-[#c2c2e2] sm:max-w-[78%] sm:text-base">
            {message.message}
          </div>
          <span className="text-xs text-[#646B86]">{time}</span>
        </>
      )}
    </div>
  )
}
