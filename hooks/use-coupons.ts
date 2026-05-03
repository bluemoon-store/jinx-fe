'use client'

import { useMutation } from '@tanstack/react-query'

import { previewCouponAction } from '@/actions/coupon'

export function useCouponPreviewMutation() {
  return useMutation({
    mutationFn: (code: string) => previewCouponAction(code),
    gcTime: 0,
  })
}
