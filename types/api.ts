export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
}

export interface User {
  id: string
  email: string
  userName: string
  firstName?: string
  lastName?: string
  name: string
  avatar?: string
  role: 'ADMIN' | 'USER' | 'MODERATOR' | 'MANAGER' | 'DEVELOPER'
  isVerified?: boolean
  twoFactorEnabled?: boolean
  createdAt: string
  updatedAt: string
}

export interface Session {
  user: User
  token: string
  expiresAt: string
}

export type ApiCryptoCurrency =
  | 'BTC'
  | 'ETH'
  | 'LTC'
  | 'BCH'
  | 'USDT_ERC20'
  | 'USDT_TRC20'
  | 'USDC_ERC20'

export type ApiPaymentStatus =
  | 'PENDING'
  | 'PAID'
  | 'CONFIRMING'
  | 'CONFIRMED'
  | 'FORWARDING'
  | 'FORWARDED'
  | 'FORWARDING_FAILED'
  | 'EXPIRED'
  | 'FAILED'

export type ApiWallet = {
  id: string
  userId: string
  balance: string
  createdAt: string
  updatedAt: string
}

export type ApiWalletTransactionType = 'DEPOSIT' | 'PURCHASE' | 'REFUND' | 'ADMIN_ADJUST'

export type ApiWalletTransaction = {
  id: string
  walletId: string
  type: ApiWalletTransactionType
  amount: string
  balance: string
  description: string
  referenceId: string | null
  createdAt: string
  updatedAt: string
}

export type ApiWalletTopUp = {
  id: string
  walletId: string
  cryptocurrency: ApiCryptoCurrency
  network: string | null
  paymentAddress: string
  amount: string
  amountUsd: string
  exchangeRate: string | null
  status: ApiPaymentStatus
  confirmations: number
  requiredConfirmations: number
  expiresAt: string
  qrCode: string
  paymentUri: string
  creditedAt: string | null
  createdAt: string
}

export type CreateWalletTopUpPayload = {
  cryptocurrency: ApiCryptoCurrency
  amountUsd: number
}
