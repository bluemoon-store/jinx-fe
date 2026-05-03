'use client'

import { useState } from 'react'

import CentralIcon from '@central-icons-react/all'

type CreateTicketFormProps = {
  onCancel: () => void
  onSubmit: (payload: { subject: string; message: string; orderId?: string }) => Promise<void>
  isSubmitting?: boolean
}

export function CreateTicketForm({ onCancel, onSubmit, isSubmitting }: CreateTicketFormProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const s = subject.trim()
    const m = message.trim()
    if (s.length < 3 || s.length > 200) {
      setError('Subject must be between 3 and 200 characters.')
      return
    }
    if (m.length < 1 || m.length > 5000) {
      setError('Message must be between 1 and 5000 characters.')
      return
    }
    await onSubmit({
      subject: s,
      message: m,
      orderId: orderId.trim() || undefined,
    })
  }

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <div className="w-full max-w-[520px] rounded-xl border border-[#111E33] bg-[#051329] p-4 sm:p-5">
        <div className="mb-4 flex flex-col items-center justify-center gap-1.5 border-b border-[#111E33] pb-4 text-center">
          <CentralIcon
            name="IconTicket"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={26}
            color="#EA2CFF"
          />
          <h3 className="text-lg font-semibold text-white">Create a Ticket</h3>
          <p className="text-sm text-[#C2C6CD]">
            Describe your issue and our team will respond here. You can optionally link an order.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
          <div>
            <label htmlFor="ticket-subject" className="mb-2 block text-sm font-medium text-[#9EA0C6]">
              Subject <span className="text-[#EA2CFF]">*</span>
            </label>
            <input
              id="ticket-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={200}
              className="h-12 w-full rounded-lg border border-[#111E33] bg-[#031128] px-3 text-sm text-white placeholder:text-[#677084] focus:ring-2 focus:ring-[#ea2cff] focus:outline-none"
              placeholder="What do you need help with?"
            />
          </div>

          <div>
            <label htmlFor="ticket-message" className="mb-2 block text-sm font-medium text-[#9EA0C6]">
              Message <span className="text-[#EA2CFF]">*</span>
            </label>
            <textarea
              id="ticket-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={5000}
              rows={5}
              className="w-full resize-y rounded-lg border border-[#111E33] bg-[#031128] px-3 py-2 text-sm text-white placeholder:text-[#677084] focus:ring-2 focus:ring-[#ea2cff] focus:outline-none"
              placeholder="Include any order numbers, payment details, or steps to reproduce the issue."
            />
          </div>

          <div>
            <label htmlFor="ticket-order" className="mb-2 block text-sm font-medium text-[#9EA0C6]">
              Order ID <span className="text-[#828994]">(optional)</span>
            </label>
            <input
              id="ticket-order"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="h-12 w-full rounded-lg border border-[#111E33] bg-[#031128] px-3 text-sm text-white placeholder:text-[#677084] focus:ring-2 focus:ring-[#ea2cff] focus:outline-none"
              placeholder="UUID of your order if applicable"
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onCancel}
              className="h-12 flex-1 rounded-lg border border-[#1E2E47] bg-[#071935] text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 flex-1 rounded-lg bg-[linear-gradient(180deg,#EA2CFF_0%,#CF2DEB_100%)] text-sm font-semibold text-white shadow-[0px_2px_0px_#eb2dff80] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2 text-center text-sm font-semibold text-[#1AD824]">
          <span className="relative flex h-4 w-4 shrink-0 animate-[pulse_0.8s_ease-in-out_infinite] items-center justify-center rounded-full bg-[#0B5B2A]">
            <span className="h-2 w-2 rounded-full bg-[#1AD824]" />
          </span>
          Our support team is Live
        </div>
      </div>
    </div>
  )
}
