import { cn } from '@/lib/utils'

type BrandLoaderProps = {
  label?: string
  fullScreen?: boolean
  className?: string
  iconClassName?: string
}

export function BrandLoader({
  label,
  fullScreen = false,
  className,
  iconClassName,
}: BrandLoaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'min-h-screen bg-[#010F25]',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={label ?? 'Loading'}
    >
      <img
        src="/icons/loader.svg"
        alt=""
        aria-hidden="true"
        className={cn('h-12 w-auto', iconClassName)}
      />
    </div>
  )
}
