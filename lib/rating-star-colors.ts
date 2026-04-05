/** All filled stars share this color for a given rating level (1 … 5). */
export const RATING_STAR_COLORS = ['#E31D1C', '#DC5D13', '#FFBC11', '#A6FF20', '#1BD924'] as const

export function ratingStarColor(rating: number): string {
  const clamped = Math.min(5, Math.max(1, Math.round(rating)))
  return RATING_STAR_COLORS[clamped - 1]
}
