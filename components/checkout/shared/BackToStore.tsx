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
      className={`text-ghostwhite inline-flex min-h-11 w-fit shrink-0 items-center gap-2 self-start rounded-xl bg-transparent px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/10 ${className ?? ''}`}
    >
      <CentralIcon
        name="IconArrowLeft"
        join="round"
        fill="outlined"
        stroke="2"
        radius="1"
        size={20}
        ariaHidden={true}
        className="text-ghostwhite"
      />
      {label ?? 'Back to store'}
    </button>
  )
}
