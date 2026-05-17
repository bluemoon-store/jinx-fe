export type LandingTexts = {
  heroTitle: string
  heroSubtitle: string
  hotSellingDesc: string
  freshlyDesc: string
  newlyDesc: string
  howToDesc: string
  featuresDesc: string
  faqDesc: string
}

type LandingTextsResponse = Partial<{
  heroTitle: string | null
  heroSubtitle: string | null
  hotSellingDesc: string | null
  freshlyDesc: string | null
  newlyDesc: string | null
  howToDesc: string | null
  featuresDesc: string | null
  faqDesc: string | null
}>

export const LANDING_TEXT_DEFAULTS: LandingTexts = {
  heroTitle: 'THE ONE STOP STORE FOR ALL DIGITAL PURCHASES',
  heroSubtitle: 'The fastest way to grab digital goods with zero friction.',
  hotSellingDesc:
    'From everyday essentials to premium digital rewards discover categories built for instant access.',
  freshlyDesc:
    'Products with stocks just refreshed, they keep selling so quick.',
  newlyDesc: 'Just added to Jinx Store, all new giftcards for you.',
  howToDesc:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  featuresDesc:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  faqDesc:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

function getApiBaseUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!base) return null
  return base.replace(/\/$/, '')
}

function pick(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : fallback
}

export async function getLandingTexts(): Promise<LandingTexts> {
  const apiBase = getApiBaseUrl()
  if (!apiBase) return LANDING_TEXT_DEFAULTS

  try {
    const response = await fetch(`${apiBase}/settings/landing`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) return LANDING_TEXT_DEFAULTS

    const payload = (await response.json()) as
      | { data?: LandingTextsResponse }
      | LandingTextsResponse

    const data =
      payload && typeof payload === 'object' && 'data' in payload
        ? (payload as { data?: LandingTextsResponse }).data
        : (payload as LandingTextsResponse)

    return {
      heroTitle: pick(data?.heroTitle, LANDING_TEXT_DEFAULTS.heroTitle),
      heroSubtitle: pick(data?.heroSubtitle, LANDING_TEXT_DEFAULTS.heroSubtitle),
      hotSellingDesc: pick(data?.hotSellingDesc, LANDING_TEXT_DEFAULTS.hotSellingDesc),
      freshlyDesc: pick(data?.freshlyDesc, LANDING_TEXT_DEFAULTS.freshlyDesc),
      newlyDesc: pick(data?.newlyDesc, LANDING_TEXT_DEFAULTS.newlyDesc),
      howToDesc: pick(data?.howToDesc, LANDING_TEXT_DEFAULTS.howToDesc),
      featuresDesc: pick(data?.featuresDesc, LANDING_TEXT_DEFAULTS.featuresDesc),
      faqDesc: pick(data?.faqDesc, LANDING_TEXT_DEFAULTS.faqDesc),
    }
  } catch {
    return LANDING_TEXT_DEFAULTS
  }
}
