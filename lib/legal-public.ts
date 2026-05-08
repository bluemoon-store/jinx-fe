export type LegalType = 'TERMS' | 'PRIVACY' | 'REFUND' | 'COOKIE'

export type LegalDoc = {
  type: LegalType
  title: string | null
  contentHtml: string
  updatedAt: string | null
}

type RawLegalDoc = {
  type?: string
  title?: string | null
  content?: string | null
  updatedAt?: string | null
}

function getApiBaseUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!base) return null
  return base.replace(/\/$/, '')
}

function normalizeType(value: unknown): LegalType | null {
  if (typeof value !== 'string') return null
  const upper = value.toUpperCase()
  if (upper === 'TERMS' || upper === 'PRIVACY' || upper === 'REFUND' || upper === 'COOKIE') {
    return upper
  }
  return null
}

function normalizeDoc(raw: RawLegalDoc): LegalDoc | null {
  const type = normalizeType(raw.type)
  if (!type) return null
  return {
    type,
    title: typeof raw.title === 'string' ? raw.title : null,
    contentHtml: typeof raw.content === 'string' ? raw.content : '',
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : null,
  }
}

export async function getLegalDocs(): Promise<LegalDoc[]> {
  const apiBase = getApiBaseUrl()
  if (!apiBase) return []

  try {
    const response = await fetch(`${apiBase}/legal`, { next: { revalidate: 300 } })
    if (!response.ok) return []

    const payload = (await response.json()) as { data?: RawLegalDoc[] } | RawLegalDoc[]
    const data =
      payload && typeof payload === 'object' && 'data' in payload
        ? (payload as { data?: RawLegalDoc[] }).data
        : (payload as RawLegalDoc[])

    if (!Array.isArray(data)) return []
    return data.map(normalizeDoc).filter((doc): doc is LegalDoc => doc !== null)
  } catch {
    return []
  }
}

export async function getLegalDoc(type: LegalType): Promise<LegalDoc | null> {
  const apiBase = getApiBaseUrl()
  if (!apiBase) return null

  try {
    const response = await fetch(`${apiBase}/legal/${type.toLowerCase()}`, {
      next: { revalidate: 300 },
    })
    if (!response.ok) return null

    const payload = (await response.json()) as { data?: RawLegalDoc } | RawLegalDoc
    const data =
      payload && typeof payload === 'object' && 'data' in payload
        ? (payload as { data?: RawLegalDoc }).data
        : (payload as RawLegalDoc)

    return data ? normalizeDoc(data) : null
  } catch {
    return null
  }
}
