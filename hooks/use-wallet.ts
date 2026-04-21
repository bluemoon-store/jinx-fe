'use client'

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createWalletTopUpAction,
  getWalletBalanceAction,
  getWalletTopUpAction,
  getWalletTopUpStatusAction,
  getWalletTransactionsAction,
  type WalletTopUpStatusResponse,
  type WalletTransactionsParams,
} from '@/actions/wallet'
import type { CreateWalletTopUpPayload } from '@/types/api'

export const WALLET_QUERY_KEYS = {
  all: ['wallet'] as const,
  balance: () => [...WALLET_QUERY_KEYS.all, 'balance'] as const,
  transactions: (params: WalletTransactionsParams) =>
    [...WALLET_QUERY_KEYS.all, 'transactions', params] as const,
  topup: (id: string) => [...WALLET_QUERY_KEYS.all, 'topup', id] as const,
  topupStatus: (id: string) => [...WALLET_QUERY_KEYS.all, 'topup-status', id] as const,
}

type WalletBalanceQueryOptions = {
  enabled?: boolean
}

export function useWalletBalanceQuery(options?: WalletBalanceQueryOptions) {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.balance(),
    queryFn: getWalletBalanceAction,
    staleTime: 30_000,
    enabled: options?.enabled ?? true,
  })
}

export function useWalletTransactionsQuery(params: WalletTransactionsParams) {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.transactions(params),
    queryFn: () => getWalletTransactionsAction(params),
  })
}

export function useWalletTransactionsInfiniteQuery(params: Omit<WalletTransactionsParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...WALLET_QUERY_KEYS.all, 'transactions-infinite', params] as const,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getWalletTransactionsAction({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const cur = lastPage.metadata.currentPage
      const total = lastPage.metadata.totalPages
      return cur < total ? cur + 1 : undefined
    },
  })
}

export function useCreateWalletTopUpMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateWalletTopUpPayload) => createWalletTopUpAction(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.balance() })
      void queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all })
    },
  })
}

export function useWalletTopUpQuery(topUpId: string | undefined) {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.topup(topUpId ?? ''),
    queryFn: () => getWalletTopUpAction(topUpId!),
    enabled: Boolean(topUpId),
  })
}

function shouldPoll(status: WalletTopUpStatusResponse['status'] | undefined) {
  return (
    status === 'PENDING' || status === 'CONFIRMING' || status === 'PAID' || status === 'FORWARDING'
  )
}

export function useWalletTopUpStatusQuery(topUpId: string | undefined) {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.topupStatus(topUpId ?? ''),
    queryFn: () => getWalletTopUpStatusAction(topUpId!),
    enabled: Boolean(topUpId),
    refetchInterval: (query) => {
      const data = query.state.data
      return shouldPoll(data?.status) ? 8_000 : false
    },
  })
}
