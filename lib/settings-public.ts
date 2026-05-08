export type PublicSettings = {
  supportLink: string | null
  telegramLink: string | null
  discordLink: string | null
}

type PublicSettingsResponse = {
  supportLink?: string | null
  telegramLink?: string | null
  discordLink?: string | null
}

function getApiBaseUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!base) return null
  return base.replace(/\/$/, '')
}

function toNullableString(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export async function getPublicSettings(): Promise<PublicSettings> {
  const apiBase = getApiBaseUrl()
  if (!apiBase) {
    return { supportLink: null, telegramLink: null, discordLink: null }
  }

  try {
    const response = await fetch(`${apiBase}/settings/public`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return { supportLink: null, telegramLink: null, discordLink: null }
    }

    const payload = (await response.json()) as
      | { data?: PublicSettingsResponse }
      | PublicSettingsResponse

    const data =
      payload && typeof payload === 'object' && 'data' in payload
        ? (payload as { data?: PublicSettingsResponse }).data
        : (payload as PublicSettingsResponse)

    return {
      supportLink: toNullableString(data?.supportLink),
      telegramLink: toNullableString(data?.telegramLink),
      discordLink: toNullableString(data?.discordLink),
    }
  } catch {
    return { supportLink: null, telegramLink: null, discordLink: null }
  }
}
