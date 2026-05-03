import { api } from '@/lib/api'
import type { BackendResponse } from '@/types/auth'

function unwrap<T>(res: { data: BackendResponse<T> }): T {
  return res.data.data
}

export type CouponInvalidateReason =
  | 'NOT_FOUND'
  | 'EXPIRED'
  | 'INACTIVE'
  | 'EXHAUSTED'
  | 'CATEGORY_MISMATCH'
  | 'CART_EMPTY'

export type CouponPreview = {
  valid: boolean
  reason?: CouponInvalidateReason
  code?: string
  description?: string | null
  discountType?: 'PERCENT' | 'FIXED'
  discountValue?: number
  subtotal?: string
  applicableSubtotal?: string
  discountAmount?: string
}

export async function previewCouponAction(code: string): Promise<CouponPreview> {
  const res = await api.get<BackendResponse<CouponPreview>>('/coupons/preview', {
    params: { code },
  })
  return unwrap(res)
}

/** Maps Nest/i18n coupon order errors (e.g. `coupon.error.exhausted`) to a structured reason. */
export function matchCouponErrorReason(message: string): CouponInvalidateReason | null {
  const lower = message.toLowerCase()
  if (!lower.includes('coupon.error')) return null
  if (lower.includes('exhausted')) return 'EXHAUSTED'
  if (lower.includes('expired')) return 'EXPIRED'
  if (lower.includes('inactive')) return 'INACTIVE'
  if (lower.includes('category')) return 'CATEGORY_MISMATCH'
  if (lower.includes('cartempty') || lower.includes('cart_empty')) return 'CART_EMPTY'
  if (lower.includes('notfound') || lower.includes('not_found')) return 'NOT_FOUND'
  return 'NOT_FOUND'
}
