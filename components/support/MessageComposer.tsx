'use client'

import CentralIcon from '@central-icons-react/all'

type MessageComposerProps = {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  disabled?: boolean
  lockMessage?: string
  isSending?: boolean
}

export function MessageComposer({
  value,
  onChange,
  onSend,
  disabled,
  lockMessage,
  isSending,
}: MessageComposerProps) {
  if (disabled) {
    return (
      <div className="mt-5 rounded-lg border border-border-subtle bg-card-elevated px-4 py-3">
        <p className="text-sm text-body-foreground">
          {lockMessage ?? 'You cannot send messages on this ticket right now.'}
        </p>
      </div>
    )
  }

  return (
    <form
      className="mt-5"
      onSubmit={(e) => {
        e.preventDefault()
        onSend()
      }}
    >
      <div className="relative flex-1">
        <div className="text-body-foreground pointer-events-none absolute top-1/2 left-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md bg-card">
          <CentralIcon
            name="IconPaperclip1"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={16}
            color="currentColor"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your message here"
          className="h-13 w-full rounded-lg border border-border-subtle bg-card-elevated pr-28 pl-14 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-[#ea2cff] focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSending || !value.trim()}
          className="absolute top-1/2 right-1.5 inline-flex h-8 -translate-y-1/2 items-center gap-1.5 rounded-md bg-[#ea2cff] px-4 text-sm font-semibold text-white shadow-[0px_2px_0px_#eb2dff80] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
          <CentralIcon
            name="IconArrowCornerDownRight"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={14}
            color="#FFFFFF"
          />
        </button>
      </div>
    </form>
  )
}
