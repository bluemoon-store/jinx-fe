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
  const product = (raw.product ?? {}) as UnknownRecord
  const variant = (raw.variant ?? {}) as UnknownRecord
  const vouches = Array.isArray(raw.vouches) ? raw.vouches : []

  return {
    id: pickString(raw.claimId ?? raw.id),
    dropId: pickString(raw.dropId ?? raw.drop_id),
    claimedAt: pickString(raw.claimedAt ?? raw.claimed_at),
    claimedContent: pickString(raw.claimedContent ?? raw.claimed_content),
    expiresAt: pickNullableString(raw.expiresAt ?? raw.expires_at),
    description: pickNullableString(raw.description),
    product: {
      id: pickString(raw.productId ?? raw.product_id ?? product.id),
      name: pickString(raw.productName ?? raw.product_name ?? product.name),
      slug: pickString(raw.productSlug ?? raw.product_slug ?? product.slug),
      iconUrl: pickNullableString(raw.productIconUrl ?? raw.product_icon_url ?? product.iconUrl),
      imageUrl: pickNullableString(
        raw.productImageUrl ?? raw.product_image_url ?? product.imageUrl
      ),
      redeemProcess: pickNullableString(
        raw.productRedeemProcess ?? raw.product_redeem_process ?? product.redeemProcess
      ),
      warrantyText: pickNullableString(
        raw.productWarrantyText ?? raw.product_warranty_text ?? product.warrantyText
      ),
    },
    variant: {
      id: pickString(raw.variantId ?? raw.variant_id ?? variant.id),
      label: pickString(raw.variantLabel ?? raw.variant_label ?? variant.label),
      price: pickString(raw.variantPrice ?? raw.variant_price ?? variant.price),
    },
    vouches: vouches.map((vouch) => {
      const row = vouch as UnknownRecord
      return {
        id: pickString(row.id),
        imageUrl: pickNullableString(row.imageUrl ?? row.image_url),
        caption: pickNullableString(row.caption),
        createdAt: pickString(row.createdAt ?? row.created_at),
      }
    }),
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

export async function getMyDropClaimAction(claimId: string): Promise<MyDropClaim> {
  const res = await api.get<BackendResponse<unknown>>(`/drops/me/${claimId}`)
  return mapMyDropClaim(unwrap(res) as UnknownRecord)
}
