import { create } from 'zustand'

import type { DashboardOrderStatus } from '@/components/dashboard/DashboardOrderCard'

/** Đơn hàng — trùng mock Orders dashboard. */
export type OrderPaymentMethod =
  | 'bitcoin'
  | 'ethereum'
  | 'usdt_tron'
  | 'usdt_ethereum'
  | 'litecoin'
  | 'bitcoin_cash'

export type Order = {
  id: string
  brand: string
  itemCount: number
  price: string
  status: DashboardOrderStatus
  paymentMethod: OrderPaymentMethod
}

/** Một dòng “có thể review” trên trang Reviews (mock cũ). */
export type ReviewPurchaseRow = {
  id: string
  brand: string
  itemCount: number
  price: string
  date: string
  time: string
}

/** Review đã gửi; `purchaseRowId` khóa theo `ReviewPurchaseRow.id`. */
export type OrderReview = {
  purchaseRowId: string
  rating: number
  comment: string
  createdAt: string
}

type OrderReviewState = {
  orders: Order[]
  /** Hàng chờ review (seed giống mock Reviews cũ). */
  pendingReviewRows: ReviewPurchaseRow[]
  /** Review đã gửi, key = `ReviewPurchaseRow.id`. */
  reviewsByPurchaseRowId: Record<string, OrderReview>
  /** User-marked “code redeemed / used” on order detail; key = `Order.id`. */
  markedUsedByOrderId: Record<string, boolean>
  setOrders: (orders: Order[]) => void
  setPendingReviewRows: (rows: ReviewPurchaseRow[]) => void
  upsertOrder: (order: Order) => void
  setOrderMarkedUsed: (orderId: string, marked: boolean) => void
  submitReviewForPurchaseRow: (
    purchaseRowId: string,
    payload: Pick<OrderReview, 'rating' | 'comment'>
  ) => void
  removeReview: (purchaseRowId: string) => void
}

export const useOrderReviewStore = create<OrderReviewState>()((set) => ({
  orders: [],
  pendingReviewRows: [],
  reviewsByPurchaseRowId: {},
  markedUsedByOrderId: {},
  setOrders: (orders) => set({ orders }),
  setPendingReviewRows: (pendingReviewRows) => set({ pendingReviewRows }),
  upsertOrder: (order) =>
    set((state) => {
      const idx = state.orders.findIndex((o) => o.id === order.id)
      if (idx < 0) return { orders: [...state.orders, order] }
      const next = [...state.orders]
      next[idx] = order
      return { orders: next }
    }),
  setOrderMarkedUsed: (orderId, marked) =>
    set((state) => ({
      markedUsedByOrderId: {
        ...state.markedUsedByOrderId,
        [orderId]: marked,
      },
    })),
  submitReviewForPurchaseRow: (purchaseRowId, payload) =>
    set((state) => ({
      reviewsByPurchaseRowId: {
        ...state.reviewsByPurchaseRowId,
        [purchaseRowId]: {
          purchaseRowId,
          rating: payload.rating,
          comment: payload.comment,
          createdAt: new Date().toISOString(),
        },
      },
    })),
  removeReview: (purchaseRowId) =>
    set((state) => {
      const { [purchaseRowId]: _, ...rest } = state.reviewsByPurchaseRowId
      return { reviewsByPurchaseRowId: rest }
    }),
}))

export function selectPendingReviewRows(
  rows: ReviewPurchaseRow[],
  reviewsByPurchaseRowId: Record<string, OrderReview>
) {
  return rows.filter((r) => reviewsByPurchaseRowId[r.id] === undefined)
}
