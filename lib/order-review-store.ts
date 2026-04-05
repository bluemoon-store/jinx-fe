import { create } from 'zustand'

import type { DashboardOrderStatus } from '@/components/dashboard/DashboardOrderCard'

/** Đơn hàng — trùng mock Orders dashboard. */
export type Order = {
  id: string
  brand: string
  itemCount: number
  price: string
  status: DashboardOrderStatus
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

const seedOrders: Order[] = [
  { id: '1', brand: 'AIRBNB', itemCount: 2, price: '$2.50', status: 'paid' },
  { id: '2', brand: 'VENMO', itemCount: 2, price: '$2.50', status: 'pending' },
  { id: '3', brand: "DUNKIN'", itemCount: 2, price: '$2.50', status: 'paid' },
  { id: '4', brand: 'AFFIRM', itemCount: 2, price: '$2.50', status: 'expired' },
  { id: '5', brand: 'STARBUCKS', itemCount: 1, price: '$4.00', status: 'paid' },
  { id: '6', brand: 'NETFLIX', itemCount: 3, price: '$12.99', status: 'pending' },
  { id: '7', brand: 'CHIPOTLE', itemCount: 2, price: '$2.50', status: 'paid' },
  { id: '8', brand: 'BEST BUY', itemCount: 1, price: '$9.99', status: 'expired' },
  { id: '9', brand: 'AIRBNB', itemCount: 2, price: '$2.50', status: 'paid' },
  { id: '10', brand: 'VENMO', itemCount: 2, price: '$2.50', status: 'pending' },
  { id: '11', brand: "DUNKIN'", itemCount: 2, price: '$2.50', status: 'paid' },
  { id: '12', brand: 'AFFIRM', itemCount: 2, price: '$2.50', status: 'paid' },
  { id: '13', brand: 'UBER', itemCount: 1, price: '$15.00', status: 'pending' },
  { id: '14', brand: 'PLAYSTATION', itemCount: 2, price: '$2.50', status: 'paid' },
  { id: '15', brand: 'H&M', itemCount: 4, price: '$24.00', status: 'expired' },
  { id: '16', brand: 'WALMART', itemCount: 2, price: '$2.50', status: 'paid' },
]

const seedPendingReviewRows: ReviewPurchaseRow[] = [
  {
    id: '1',
    brand: 'Airbnb',
    itemCount: 2,
    price: '$2.50',
    date: 'March 30, 2026',
    time: '11:11 AM',
  },
  {
    id: '2',
    brand: 'Venmo',
    itemCount: 2,
    price: '$2.50',
    date: 'March 30, 2026',
    time: '11:11 AM',
  },
  {
    id: '3',
    brand: 'Dunkin Donuts',
    itemCount: 2,
    price: '$2.50',
    date: 'March 30, 2026',
    time: '11:11 AM',
  },
  {
    id: '4',
    brand: 'Affirm',
    itemCount: 2,
    price: '$2.50',
    date: 'March 30, 2026',
    time: '11:11 AM',
  },
  {
    id: '5',
    brand: 'Starbucks',
    itemCount: 1,
    price: '$4.00',
    date: 'March 29, 2026',
    time: '9:20 AM',
  },
  {
    id: '6',
    brand: 'Netflix',
    itemCount: 3,
    price: '$12.99',
    date: 'March 28, 2026',
    time: '4:45 PM',
  },
  {
    id: '7',
    brand: 'Chipotle',
    itemCount: 2,
    price: '$2.50',
    date: 'March 28, 2026',
    time: '2:00 PM',
  },
  {
    id: '8',
    brand: 'Best Buy',
    itemCount: 1,
    price: '$9.99',
    date: 'March 27, 2026',
    time: '6:30 PM',
  },
  {
    id: '9',
    brand: 'PlayStation',
    itemCount: 1,
    price: '$59.99',
    date: 'March 26, 2026',
    time: '8:00 PM',
  },
  {
    id: '10',
    brand: 'Uber',
    itemCount: 1,
    price: '$15.00',
    date: 'March 25, 2026',
    time: '7:15 PM',
  },
]

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
  orders: seedOrders,
  pendingReviewRows: seedPendingReviewRows,
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
