import { create } from 'zustand'

import {
  listOrdersAction,
  mapApiOrderStatus,
  mapCryptoToPaymentMethod,
  type ApiOrder,
} from '@/actions/order'
import type { DashboardOrderStatus } from '@/components/dashboard/DashboardOrderCard'
import { reviewsApi } from '@/lib/api'

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
  imageUrl: string | null
  itemCount: number
  price: string
  date: string
  time: string
}

/** Review đã gửi; `purchaseRowId` khóa theo `ReviewPurchaseRow.id`. */
export type OrderReview = {
  id: string
  orderId: string
  purchaseRowId: string
  rating: number
  comment: string
  createdAt: string
}

type OrderReviewState = {
  orders: Order[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  page: number
  totalItems: number
  activeSortBy?: 'createdAt' | 'totalAmount'
  activeSortOrder?: 'asc' | 'desc'
  activeCryptocurrency?: string
  pendingReviewRows: ReviewPurchaseRow[]
  reviewsByPurchaseRowId: Record<string, OrderReview>
  markedUsedByOrderId: Record<string, boolean>
  loadReviewsPageData: (options?: {
    page?: number
    sortBy?: 'createdAt' | 'totalAmount'
    sortOrder?: 'asc' | 'desc'
    cryptocurrency?: string
  }) => Promise<void>
  loadMoreReviews: () => Promise<void>
  setOrders: (orders: Order[]) => void
  setPendingReviewRows: (rows: ReviewPurchaseRow[]) => void
  upsertOrder: (order: Order) => void
  setOrderMarkedUsed: (orderId: string, marked: boolean) => void
  submitReviewForPurchaseRow: (
    purchaseRowId: string,
    payload: Pick<OrderReview, 'rating' | 'comment'>
  ) => Promise<void>
  updateReview: (
    purchaseRowId: string,
    payload: Pick<OrderReview, 'rating' | 'comment'>
  ) => Promise<void>
  removeReview: (purchaseRowId: string) => Promise<void>
}

function formatOrderDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) {
    return { date: '-', time: '-' }
  }
  return {
    date: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  }
}

function toOrderModel(order: ApiOrder): Order {
  const firstItem = order.items?.[0]
  const brand = firstItem?.product?.name || firstItem?.variantLabel || 'Order'
  const itemCount = (order.items ?? []).reduce((sum, item) => sum + item.quantity, 0)
  return {
    id: order.id,
    brand: String(brand).toUpperCase(),
    itemCount,
    price: `$${Number(order.totalAmount || 0).toFixed(2)}`,
    status: mapApiOrderStatus(order.status),
    paymentMethod: mapCryptoToPaymentMethod(order.cryptoPayment?.cryptocurrency),
  }
}

function toPurchaseRow(order: ApiOrder): ReviewPurchaseRow {
  const firstItem = order.items?.[0]
  const brand = firstItem?.product?.name || firstItem?.variantLabel || 'Order'
  const primaryImage =
    firstItem?.product?.images?.find((img) => img.isPrimary) ??
    firstItem?.product?.images?.[0] ??
    null
  const itemCount = (order.items ?? []).reduce((sum, item) => sum + item.quantity, 0)
  const { date, time } = formatOrderDate(order.createdAt as unknown as string)
  return {
    id: order.id,
    brand: String(brand).toUpperCase(),
    imageUrl: primaryImage?.url ?? null,
    itemCount,
    price: `$${Number(order.totalAmount || 0).toFixed(2)}`,
    date,
    time,
  }
}

function toStoreReview(review: {
  id: string
  orderId: string
  rating: number
  comment: string | null
  createdAt: string
}): OrderReview {
  return {
    id: review.id,
    orderId: review.orderId,
    purchaseRowId: review.orderId,
    rating: review.rating,
    comment: review.comment ?? '',
    createdAt: review.createdAt,
  }
}

export const useOrderReviewStore = create<OrderReviewState>()((set) => ({
  orders: [],
  loading: false,
  loadingMore: false,
  error: null,
  page: 1,
  totalItems: 0,
  activeSortBy: undefined,
  activeSortOrder: undefined,
  activeCryptocurrency: undefined,
  pendingReviewRows: [],
  reviewsByPurchaseRowId: {},
  markedUsedByOrderId: {},
  loadReviewsPageData: async (options) => {
    const page = options?.page ?? 1
    set({
      loading: true,
      error: null,
      page: 1,
      totalItems: 0,
      orders: [],
      pendingReviewRows: [],
      reviewsByPurchaseRowId: {},
    })
    try {
      const ordersRes = await listOrdersAction({
        page,
        limit: 12,
        sortBy: options?.sortBy,
        sortOrder: options?.sortOrder,
        cryptocurrency: options?.cryptocurrency,
      })
      const orders = ordersRes.items.map(toOrderModel)
      const pendingReviewRows = ordersRes.items.map(toPurchaseRow)
      const reviewsByPurchaseRowId = ordersRes.items.reduce<Record<string, OrderReview>>(
        (acc, order) => {
          const review = order.review
          if (!review) return acc
          acc[order.id] = toStoreReview(review)
          return acc
        },
        {}
      )
      set({
        orders,
        pendingReviewRows,
        reviewsByPurchaseRowId,
        page,
        totalItems: ordersRes.metadata.totalItems,
        activeSortBy: options?.sortBy,
        activeSortOrder: options?.sortOrder,
        activeCryptocurrency: options?.cryptocurrency,
        loading: false,
      })
    } catch {
      set({
        loading: false,
        error: 'Could not load reviews right now. Please try again.',
      })
    }
  },
  loadMoreReviews: async () => {
    const state = useOrderReviewStore.getState()
    if (state.loading || state.loadingMore) return
    const nextPage = state.page + 1
    const loaded = state.pendingReviewRows.length
    if (loaded >= state.totalItems) return
    set({ loadingMore: true, error: null })
    try {
      const ordersRes = await listOrdersAction({
        page: nextPage,
        limit: 12,
        sortBy: state.activeSortBy,
        sortOrder: state.activeSortOrder,
        cryptocurrency: state.activeCryptocurrency,
      })
      const nextOrders = ordersRes.items.map(toOrderModel)
      const nextRows = ordersRes.items.map(toPurchaseRow)
      const nextReviews = ordersRes.items.reduce<Record<string, OrderReview>>((acc, order) => {
        const review = order.review
        if (!review) return acc
        acc[order.id] = toStoreReview(review)
        return acc
      }, {})
      set((prev) => ({
        orders: [...prev.orders, ...nextOrders],
        pendingReviewRows: [...prev.pendingReviewRows, ...nextRows],
        reviewsByPurchaseRowId: { ...prev.reviewsByPurchaseRowId, ...nextReviews },
        page: nextPage,
        totalItems: ordersRes.metadata.totalItems,
        loadingMore: false,
      }))
    } catch {
      set({
        loadingMore: false,
        error: 'Could not load more reviews right now. Please try again.',
      })
    }
  },
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
  submitReviewForPurchaseRow: async (purchaseRowId, payload) => {
    const created = await reviewsApi.create({
      orderId: purchaseRowId,
      rating: payload.rating,
      comment: payload.comment,
    })
    set((state) => ({
      reviewsByPurchaseRowId: {
        ...state.reviewsByPurchaseRowId,
        [purchaseRowId]: toStoreReview(created),
      },
      error: null,
    }))
  },
  updateReview: async (purchaseRowId, payload) => {
    const existing = useOrderReviewStore.getState().reviewsByPurchaseRowId[purchaseRowId]
    if (!existing) return
    const updated = await reviewsApi.update(existing.id, {
      rating: payload.rating,
      comment: payload.comment,
    })
    set((state) => ({
      reviewsByPurchaseRowId: {
        ...state.reviewsByPurchaseRowId,
        [purchaseRowId]: toStoreReview(updated),
      },
      error: null,
    }))
  },
  removeReview: async (purchaseRowId) => {
    const existing = useOrderReviewStore.getState().reviewsByPurchaseRowId[purchaseRowId]
    if (!existing) return
    await reviewsApi.delete(existing.id)
    set((state) => {
      const { [purchaseRowId]: _, ...rest } = state.reviewsByPurchaseRowId
      return { reviewsByPurchaseRowId: rest, error: null }
    })
  },
}))

export function selectPendingReviewRows(
  rows: ReviewPurchaseRow[],
  reviewsByPurchaseRowId: Record<string, OrderReview>
) {
  return rows.filter((r) => reviewsByPurchaseRowId[r.id] === undefined)
}
