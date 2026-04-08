import clsx from 'clsx'

type CountryFlagShape = 'rectangle' | 'square' | 'circle'

type CountryFlagProps = {
  countryCode: string
  size?: number
  shape?: CountryFlagShape
  className?: string
  alt?: string
}

const DEFAULT_FALLBACK_FLAG_SRC = '/icons/flag.svg'

// Extend this map as new Untitled UI assets are added under /public/icons/flags.
const COUNTRY_FLAG_SRC_BY_CODE: Record<string, string> = {
  CA: '/icons/flag.svg',
}

function resolveFlagSrc(countryCode: string): string {
  const normalizedCode = countryCode.trim().toUpperCase()
  return COUNTRY_FLAG_SRC_BY_CODE[normalizedCode] ?? DEFAULT_FALLBACK_FLAG_SRC
}

export function CountryFlag({
  countryCode,
  size = 20,
  shape = 'rectangle',
  className,
  alt,
}: CountryFlagProps) {
  const shapeClass =
    shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-[4px]' : 'rounded-sm'

  return (
    <img
      src={resolveFlagSrc(countryCode)}
      alt={alt ?? `${countryCode.toUpperCase()} flag`}
      width={size}
      height={size}
      className={clsx('shrink-0 object-cover', shapeClass, className)}
    />
  )
}
