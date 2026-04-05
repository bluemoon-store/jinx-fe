function titleCaseWord(word: string): string {
  if (word.includes('&')) {
    return word
      .split('&')
      .map((p) => (p ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p))
      .join('&')
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

/** Title case for list/detail display (e.g. AIRBNB → Airbnb, BEST BUY → Best Buy, H&M → H&M). */
export function formatOrderBrandLabel(brand: string): string {
  const cleaned = brand.replace(/['']/g, ' ').trim()
  if (!cleaned) return brand
  return cleaned.split(/\s+/).map(titleCaseWord).join(' ')
}
