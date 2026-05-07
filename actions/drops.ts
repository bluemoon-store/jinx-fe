import { api } from '@/lib/api'
import type { BackendResponse } from '@/types/auth'
import type { DropClaimResult, MyDropClaim, PublicDrop } from '@/types/drops'

type UnknownRecord = Record<string, unknown>

function unwrap<T>(res: { data: BackendResponse<T> }): T {
  return res.data.data
}

function pickString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback
}

function pickNullableString(v: unknown): string | null {
  return typeof v === 'string' ? v : null
}

function pickNumber(v: unknown, fallback = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback
}

function mapPublicDrop(raw: UnknownRecord): PublicDrop {
  const product = (raw.product ?? {}) as UnknownRecord
  const variant = (raw.variant ?? {}) as UnknownRecord
  const imageRows = Array.isArray(product.images) ? product.images : []

  return {
    id: pickString(raw.id),
    quantity: pickNumber(raw.quantity),
    claimedCount: pickNumber(raw.claimedCount ?? raw.claimed_count),
    expiresAt: pickNullableString(raw.expiresAt ?? raw.expires_at),
    hasClaimed: Boolean(raw.hasClaimed ?? raw.has_claimed),
    product: {
      id: pickString(product.id),
      name: pickString(product.name),
      slug: pickString(product.slug),
      iconUrl: pickNullableString(product.iconUrl ?? product.icon_url),
      images: imageRows.map((img) => {
        const row = img as UnknownRecord
        return {
          url: pickNullableString(row.url),
          isPrimary: Boolean(row.isPrimary ?? row.is_primary),
        }
      }),
    },
    variant: {
      id: pickString(variant.id),
      label: pickString(variant.label),
    },
  }
}

function mapMyDropClaim(raw: UnknownRecord): MyDropClaim {
  const drop = (raw.drop ?? {}) as UnknownRecord
  const product = (drop.product ?? raw.product ?? {}) as UnknownRecord
  const variant = (drop.variant ?? raw.variant ?? {}) as UnknownRecord

  return {
    id: pickString(raw.id),
    claimedAt: pickString(raw.claimedAt ?? raw.claimed_at),
    claimedContent: pickString(raw.claimedContent ?? raw.claimed_content),
    productSlug: pickString(raw.productSlug ?? raw.product_slug ?? product.slug),
    drop: {
      id: pickString(drop.id),
      product: {
        id: pickString(product.id),
        name: pickString(product.name),
        slug: pickString(product.slug),
        iconUrl: pickNullableString(product.iconUrl ?? product.icon_url),
        images: Array.isArray(product.images)
          ? product.images.map((img) => {
              const row = img as UnknownRecord
              return {
                url: pickNullableString(row.url),
                isPrimary: Boolean(row.isPrimary ?? row.is_primary),
              }
            })
          : [],
      },
      variant: {
        id: pickString(variant.id),
        label: pickString(variant.label),
      },
    },
  }
}

export async function listPublicDropsAction(): Promise<PublicDrop[]> {
  const res = await api.get<BackendResponse<unknown>>('/drops')
  const data = unwrap(res)
  if (!Array.isArray(data)) return []
  return data.map((row) => mapPublicDrop(row as UnknownRecord))
}

export async function claimDropAction(dropId: string): Promise<DropClaimResult> {
  const res = await api.post<BackendResponse<DropClaimResult>>(`/drops/${dropId}/claim`, {})
  return unwrap(res)
}

export async function listMyDropsAction(): Promise<MyDropClaim[]> {
  const res = await api.get<BackendResponse<unknown>>('/drops/me')
  const data = unwrap(res)
  if (!Array.isArray(data)) return []
  return data.map((row) => mapMyDropClaim(row as UnknownRecord))
}
