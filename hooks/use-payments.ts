'use client'

import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { getCryptoPaymentAction, getExchangeRatesAction, getPaymentStatusAction } from '@/actions/order'

export const PAYMENTS_QUERY_KEYS = {
  crypto: (orderId: string) => ['payments', 'crypto', orderId] as const,
  status: (orderId: string) => ['payments', 'status', orderId] as const,
  rates: ['payments', 'exchange-rates'] as const,
}

type PaymentStatus = Awaited<ReturnType<typeof getPaymentStatusAction>>

export function useCryptoPaymentQuery(orderId: string | undefined) {
  return useQuery({
    queryKey: PAYMENTS_QUERY_KEYS.crypto(orderId ?? ''),
    queryFn: () => getCryptoPaymentAction(orderId!),
    enabled: Boolean(orderId),
  })
}

type PaymentStatusQueryOptions = Omit<
  UseQueryOptions<
    PaymentStatus,
    Error,
    PaymentStatus,
    ReturnType<typeof PAYMENTS_QUERY_KEYS.status>
  >,
  'queryKey' | 'queryFn'
>

export function usePaymentStatusQuery(
  orderId: string | undefined,
  options?: PaymentStatusQueryOptions
) {
  const { enabled: enabledOption, ...rest } = options ?? {}
  return useQuery({
    queryKey: PAYMENTS_QUERY_KEYS.status(orderId ?? ''),
    queryFn: () => getPaymentStatusAction(orderId!),
    enabled: Boolean(orderId) && (enabledOption ?? true),
    ...rest,
  })
}

export function useExchangeRatesQuery() {
  return useQuery({
    queryKey: PAYMENTS_QUERY_KEYS.rates,
    queryFn: getExchangeRatesAction,
    staleTime: 60_000,
  })
}
