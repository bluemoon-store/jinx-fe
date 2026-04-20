'use client'

import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createCryptoPaymentAction,
  createOrderAction,
  getOrderAction,
  getOrderDeliveryAction,
  listOrdersAction,
  mapApiOrderToDashboardCard,
  payOrderWithWalletAction,
} from '@/actions/order'
import type {
  ApiOrder,
  CreateCryptoPaymentPayload,
  OrderCreatePayload,
  OrderListParams,
} from '@/actions/order'
import { CART_QUERY_KEYS } from '@/hooks/use-carts'
import { PAYMENTS_QUERY_KEYS } from '@/hooks/use-payments'
import { WALLET_QUERY_KEYS } from '@/hooks/use-wallet'

export type {
  ApiCryptoCurrency,
  ApiOrder,
  CreateCryptoPaymentPayload,
  CryptoPaymentStatusPayload,
  DashboardOrderCardModel,
  OrderCreatePayload,
  OrderListParams,
  PaginatedOrders,
} from '@/actions/order'

export {
  cryptoHumanTitle,
  formatCryptoAmountLine,
  mapApiOrderToDashboardCard,
  mapApiOrderStatus,
} from '@/actions/order'

export const DASHBOARD_ORDERS_PAGE_SIZE = 12

export const ORDERS_QUERY_KEYS = {
  all: ['orders'] as const,
  lists: () => [...ORDERS_QUERY_KEYS.all, 'list'] as const,
  list: (params: OrderListParams) => [...ORDERS_QUERY_KEYS.lists(), params] as const,
  details: () => [...ORDERS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ORDERS_QUERY_KEYS.details(), id] as const,
  delivery: (id: string) => [...ORDERS_QUERY_KEYS.all, 'delivery', id] as const,
}

export function useOrdersListQuery(params: OrderListParams) {
  return useQuery({
    queryKey: ORDERS_QUERY_KEYS.list(params),
    queryFn: () => listOrdersAction(params),
  })
}

export function useOrderQuery<TSelected = ApiOrder>(
  id: string | undefined,
  options?: Omit<UseQueryOptions<ApiOrder, Error, TSelected>, 'queryKey' | 'queryFn' | 'enabled'>
): UseQueryResult<TSelected, Error> {
  return useQuery({
    queryKey: ORDERS_QUERY_KEYS.detail(id ?? ''),
    queryFn: () => getOrderAction(id!),
    ...options,
    enabled: Boolean(id),
  })
}

export function useOrderDeliveryQuery(
  orderId: string | undefined,
  options?: { enabled?: boolean }
) {
  const enabled = options?.enabled ?? true
  return useQuery({
    queryKey: ORDERS_QUERY_KEYS.delivery(orderId ?? ''),
    queryFn: () => getOrderDeliveryAction(orderId!),
    enabled: Boolean(orderId) && enabled,
  })
}

export function useCreateOrderMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: OrderCreatePayload) => createOrderAction(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.lists() })
    },
  })
}

export function useCreateCryptoPaymentMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ orderId, dto }: { orderId: string; dto: CreateCryptoPaymentPayload }) =>
      createCryptoPaymentAction(orderId, dto),
    onSuccess: (_data, { orderId }) => {
      void queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.detail(orderId) })
      void queryClient.invalidateQueries({ queryKey: PAYMENTS_QUERY_KEYS.crypto(orderId) })
    },
  })
}

export function usePayOrderWithWalletMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (orderId: string) => payOrderWithWalletAction(orderId),
    onSuccess: (_data, orderId) => {
      void queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.detail(orderId) })
      void queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.lists() })
      void queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.root() })
      void queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.balance() })
    },
  })
}

export function useDashboardExpiredOrdersQuery(enabled: boolean) {
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEYS.all, 'dashboard', 'expired'] as const,
    queryFn: async () => {
      const res = await listOrdersAction({ page: 1, limit: 80 })
      const orders = res.items
        .filter((o) => o.status === 'CANCELLED' || o.status === 'REFUNDED')
        .map(mapApiOrderToDashboardCard)
      return { orders, totalPages: 1 as const, totalItems: orders.length }
    },
    enabled,
  })
}

export type DashboardOrdersStatusFilter = 'all' | 'paid' | 'pending' | 'expired'

export function useDashboardOrdersInfiniteQuery(
  statusFilter: DashboardOrdersStatusFilter,
  enabled: boolean
) {
  const apiStatus =
    statusFilter === 'paid'
      ? ('COMPLETED' as const)
      : statusFilter === 'pending'
        ? ('PENDING' as const)
        : undefined

  return useInfiniteQuery({
    queryKey: [...ORDERS_QUERY_KEYS.lists(), 'dashboard', 'paged', statusFilter] as const,
    enabled: enabled && statusFilter !== 'expired',
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      listOrdersAction({
        page: pageParam,
        limit: DASHBOARD_ORDERS_PAGE_SIZE,
        status: apiStatus,
      }),
    getNextPageParam: (lastPage) => {
      const cur = lastPage.metadata.currentPage
      const total = lastPage.metadata.totalPages
      return cur < total ? cur + 1 : undefined
    },
  })
}
