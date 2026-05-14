import CentralIcon from '@central-icons-react/all'

type Props = {
  onBack?: () => void
  label?: string
  className?: string
}

export function BackToStore({ onBack, label, className }: Props) {
  return (
    <button
      type="button"
      onClick={onBack}
      className={`text-ghostwhite focus-visible:ring-fuchsia/40 inline-flex min-h-11 w-fit shrink-0 items-center gap-1.5 bg-transparent px-0 py-1 text-left text-sm font-semibold transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${className ?? ''}`}
    >
      <CentralIcon
        name="IconArrowLeft"
        join="round"
        fill="outlined"
        stroke="2"
        radius="1"
        size={20}
        ariaHidden={true}
        className="text-ghostwhite shrink-0"
      />
      {label ?? 'Back to store'}
    </button>
  )
}
