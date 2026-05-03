import { isAxiosError } from 'axios'

import { matchCouponErrorReason } from '@/actions/coupon'
import { friendlyPromoError } from '@/stores/promo-store'

function readAxiosMessage(err: unknown): string | undefined {
  if (!isAxiosError(err)) return undefined
  const data = err.response?.data as { message?: unknown } | undefined
  const m = data?.message
  if (typeof m === 'string') return m
  if (Array.isArray(m) && m.length > 0 && typeof m[0] === 'string') return m[0]
  return undefined
}

/** User-facing toast copy when order creation fails due to coupon validation, or `null` if unrelated. */
export function orderCreateCouponToastMessage(err: unknown): string | null {
  const msg = readAxiosMessage(err)
  if (!msg) return null
  const reason = matchCouponErrorReason(msg)
  if (!reason) return null
  return friendlyPromoError(reason)
}
