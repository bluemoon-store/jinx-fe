'use client'

import { useState } from 'react'

import CentralIcon from '@central-icons-react/all'

type CreateTicketFormProps = {
  onCancel: () => void
  onSubmit: (payload: { message: string; orderNumber: string }) => Promise<void>
  isSubmitting?: boolean
}

export function CreateTicketForm({ onCancel, onSubmit, isSubmitting }: CreateTicketFormProps) {
  const [message, setMessage] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const m = message.trim()
    if (m.length < 1 || m.length > 5000) {
      setError('Message must be between 1 and 5000 characters.')
      return
    }
    if (orderNumber.trim() === '') {
      setError('Order ID is required.')
      return
    }
    await onSubmit({
      message: m,
      orderNumber: orderNumber.trim(),
    })
  }

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <div className="border-border-subtle bg-card-elevated w-full max-w-[520px] rounded-xl border p-4 sm:p-5">
        <div className="border-border-subtle mb-4 flex flex-col items-center justify-center gap-1.5 border-b pb-4 text-center">
          <CentralIcon
            name="IconTicket"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={26}
            color="#EA2CFF"
          />
          <h3 className="text-foreground text-lg font-semibold">Create a Ticket</h3>
          <p className="text-body-foreground text-sm">
            Describe your issue and our team will respond here.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
          <div>
            <label
              htmlFor="ticket-order"
              className="text-muted-foreground mb-2 block text-sm font-medium"
            >
              Order ID <span className="text-[#EA2CFF]">*</span>
            </label>
            <input
              id="ticket-order"
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              className="border-border-subtle bg-input-bg text-foreground placeholder:text-muted-foreground h-12 w-full rounded-lg border px-3 text-sm focus:ring-2 focus:ring-[#ea2cff] focus:outline-none"
              placeholder="ORD-20260507-AB12C"
            />
          </div>

          <div>
            <label
              htmlFor="ticket-message"
              className="text-muted-foreground mb-2 block text-sm font-medium"
            >
              Message <span className="text-[#EA2CFF]">*</span>
            </label>
            <input
              id="ticket-message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={5000}
              className="border-border-subtle bg-input-bg text-foreground placeholder:text-muted-foreground h-12 w-full rounded-lg border px-3 text-sm focus:ring-2 focus:ring-[#ea2cff] focus:outline-none"
              placeholder="Briefly describe your issue."
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onCancel}
              className="border-border-subtle bg-card text-foreground h-12 flex-1 rounded-lg border text-sm font-semibold transition-opacity hover:opacity-90"
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
          <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1AD824]/10">
            <span className="absolute inset-0 animate-pulse rounded-full bg-[#1AD824]/30" />
            <span className="relative h-2 w-2 rounded-full bg-[#1AD824]" />
          </span>
          Our support team is Live
        </div>
      </div>
    </div>
  )
}
