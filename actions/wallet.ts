import { api } from '@/lib/api'
import type {
  ApiWallet,
  ApiWalletTopUp,
  ApiWalletTransaction,
  ApiWalletTransactionType,
  CreateWalletTopUpPayload,
} from '@/types/api'
import type { BackendResponse } from '@/types/auth'

function unwrap<T>(res: { data: BackendResponse<T> }): T {
  return res.data.data
}

export type WalletTransactionsParams = {
  page?: number
  limit?: number
  type?: ApiWalletTransactionType
}

export type WalletTransactionsResponse = {
  items: ApiWalletTransaction[]
  metadata: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

export type WalletTopUpStatusResponse = {
  id: string
  status: ApiWalletTopUp['status']
  confirmations: number
  requiredConfirmations: number
  expiresAt: string
  creditedAt: string | null
}

export async function getWalletBalanceAction(): Promise<ApiWallet> {
  const res = await api.get<BackendResponse<ApiWallet>>('/wallet/balance')
  return unwrap(res)
}

export async function getWalletTransactionsAction(
  params: WalletTransactionsParams
): Promise<WalletTransactionsResponse> {
  const res = await api.get<BackendResponse<WalletTransactionsResponse>>('/wallet/transactions', {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 20,
      type: params.type,
    },
  })
  return unwrap(res)
}

export async function createWalletTopUpAction(
  dto: CreateWalletTopUpPayload
): Promise<ApiWalletTopUp> {
  const res = await api.post<BackendResponse<ApiWalletTopUp>>('/wallet/topup', dto)
  return unwrap(res)
}

export async function getWalletTopUpAction(topUpId: string): Promise<ApiWalletTopUp> {
  const res = await api.get<BackendResponse<ApiWalletTopUp>>(`/wallet/topup/${topUpId}`)
  return unwrap(res)
}

export async function getWalletTopUpStatusAction(
  topUpId: string
): Promise<WalletTopUpStatusResponse> {
  const res = await api.get<BackendResponse<WalletTopUpStatusResponse>>(
    `/wallet/topup/${topUpId}/status`
  )
  return unwrap(res)
}
