/** Parse API decimal strings like "12.50" or "$12.50" into a USD number. */
export function parseUsdDecimalString(value: string): number {
  const n = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

/** Format a dollar amount for cart / checkout UI. */
export function formatUsd(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
