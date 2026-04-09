import clsx from 'clsx'
import { useMemo, useState } from 'react'

type CountryFlagShape = 'rectangle' | 'square' | 'circle'

type CountryFlagProps = {
  countryCode: string
  size?: number
  shape?: CountryFlagShape
  className?: string
  alt?: string
}

const DEFAULT_FALLBACK_FLAG_SRC = '/icons/flag.svg'

function normalizeCountryCode(countryCode: string): string {
  return countryCode.trim().toLowerCase()
}

export function CountryFlag({
  countryCode,
  size = 20,
  shape = 'rectangle',
  className,
  alt,
}: CountryFlagProps) {
  const [hasLoadError, setHasLoadError] = useState(false)

  const normalizedCode = useMemo(() => normalizeCountryCode(countryCode), [countryCode])
  const remoteFlagSrc = useMemo(
    () => `https://flagcdn.com/w80/${normalizedCode}.png`,
    [normalizedCode]
  )
  const shapeClass = shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-[4px]' : ''
  const dimensions =
    shape === 'rectangle'
      ? { width: size, height: Math.round((size * 18) / 28) }
      : { width: size, height: size }

  return (
    <img
      src={hasLoadError ? DEFAULT_FALLBACK_FLAG_SRC : remoteFlagSrc}
      alt={alt ?? `${countryCode.toUpperCase()} flag`}
      width={dimensions.width}
      height={dimensions.height}
      className={clsx('shrink-0 object-cover', shapeClass, className)}
      style={{ width: dimensions.width, height: dimensions.height }}
      loading="lazy"
      onError={() => setHasLoadError(true)}
    />
  )
}
