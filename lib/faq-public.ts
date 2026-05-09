export type FaqItem = {
  id: string
  question: string
  answerHtml: string
  position: number
}

export type FaqCategory = {
  id: string
  name: string
  slug: string
  position: number
  items: FaqItem[]
}

type RawFaqItem = {
  id?: string
  question?: string
  answerHtml?: string
  position?: number
}

type RawFaqCategory = {
  id?: string
  name?: string
  slug?: string
  position?: number
  items?: RawFaqItem[]
}

function getApiBaseUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!base) return null
  return base.replace(/\/$/, '')
}

function normalizeFaqItem(item: RawFaqItem): FaqItem | null {
  if (typeof item.id !== 'string' || typeof item.question !== 'string') return null
  return {
    id: item.id,
    question: item.question,
    answerHtml: typeof item.answerHtml === 'string' ? item.answerHtml : '',
    position: typeof item.position === 'number' ? item.position : 0,
  }
}

function normalizeFaqCategory(category: RawFaqCategory): FaqCategory | null {
  if (
    typeof category.id !== 'string' ||
    typeof category.name !== 'string' ||
    typeof category.slug !== 'string'
  ) {
    return null
  }
  const items = Array.isArray(category.items)
    ? category.items.map(normalizeFaqItem).filter((item): item is FaqItem => item !== null)
    : []
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    position: typeof category.position === 'number' ? category.position : 0,
    items,
  }
}

export async function getFaqs(): Promise<FaqCategory[]> {
  const apiBase = getApiBaseUrl()
  if (!apiBase) return []

  try {
    const response = await fetch(`${apiBase}/faq`, { next: { revalidate: 60 } })
    if (!response.ok) return []

    const payload = (await response.json()) as { data?: RawFaqCategory[] } | RawFaqCategory[]
    const data =
      payload && typeof payload === 'object' && 'data' in payload
        ? (payload as { data?: RawFaqCategory[] }).data
        : (payload as RawFaqCategory[])

    if (!Array.isArray(data)) return []
    return data.map(normalizeFaqCategory).filter((item): item is FaqCategory => item !== null)
  } catch {
    return []
  }
}
