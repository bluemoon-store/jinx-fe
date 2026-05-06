import { api } from '@/lib/api'
import { formatUsd } from '@/lib/cart-format'
import type { DashboardOrderStatus } from '@/components/dashboard/DashboardOrderCard'
import type { OrderPaymentMethod } from '@/stores/order-review-store'
import type { BackendResponse } from '@/types/auth'

function unwrap<T>(res: { data: BackendResponse<T> }): T {
  return res.data.data
}

export type ApiOrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED'

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

export type ApiOrderItem = {
  id: string
  orderId: string
  productId: string
  quantity: number
  priceAtPurchase: string
  variantId?: string | null
  variantLabel?: string | null
  regionLabel?: string | null
  regionCountry?: string | null
  deliveredContent?: string | null
  deliveredAt?: string | null
  product?: {
    slug?: string
    name?: string
    description?: string | null
    shortNotice?: string | null
    warrantyText?: string | null
    redeemProcess?: string | null
    images?: Array<{ url: string | null; isPrimary: boolean; sortOrder?: number }>
  }
  vouches?: Array<{
    id: string
    imageUrl: string
    caption: string | null
    createdAt: string
  }>
}

export type ApiCryptoPayment = {
  id?: string
  paymentId?: string
  cryptocurrency: ApiCryptoCurrency
  paymentAddress: string
  amount: string
  amountUsd: string
  qrCode: string
  status: ApiPaymentStatus
  expiresAt: string
  timeRemaining: number
  confirmations?: number
  requiredConfirmations?: number
  paymentUri?: string
}

export type ApiOrder = {
  id: string
  orderNumber: string
  userId?: string | null
  guestEmail?: string | null
  createdAt: string
  updatedAt: string
  status: ApiOrderStatus
  totalAmount: string
  currency: string
  subtotalAmount?: string | null
  discountAmount?: string | null
  couponCode?: string | null
  couponId?: string | null
  /** Legacy field; prefer `couponCode` when present. */
  promoCode?: string | null
  buyerProtection?: boolean
  buyerProtectionAmount?: string | null
  items?: ApiOrderItem[]
  cryptoPayment?: ApiCryptoPayment | null
  review?: {
    id: string
    orderId: string
    rating: number
    comment: string | null
    createdAt: string
  } | null
}

export type OrderListParams = {
  page?: number
  limit?: number
  status?: ApiOrderStatus
  sortBy?: 'createdAt' | 'totalAmount'
  sortOrder?: 'asc' | 'desc'
  cryptocurrency?: string
}

export type PaginatedOrders = {
  items: ApiOrder[]
  metadata: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

export type OrderCreatePayload = {
  currency?: string
  buyerProtection?: boolean
  couponCode?: string
}

export type CreateCryptoPaymentPayload = {
  cryptocurrency: ApiCryptoCurrency
}

export type OrderDeliveryItem = {
  itemId: string
  productName: string
  content: string
  downloadLink?: string | null
  deliveredAt: string
}

export type OrderDeliveryResponse = {
  orderId: string
  orderNumber: string
  items: OrderDeliveryItem[]
}

export async function createOrderAction(dto: OrderCreatePayload): Promise<ApiOrder> {
  const res = await api.post<BackendResponse<ApiOrder>>('/orders', dto)
  return unwrap(res)
}

export async function createCryptoPaymentAction(
  orderId: string,
  dto: CreateCryptoPaymentPayload
): Promise<ApiCryptoPayment> {
  const res = await api.post<BackendResponse<ApiCryptoPayment>>(
    `/orders/${orderId}/crypto-payment`,
    {
      cryptocurrency: dto.cryptocurrency,
    }
  )
  return unwrap(res)
}

export async function payOrderWithWalletAction(orderId: string): Promise<ApiOrder> {
  const res = await api.post<BackendResponse<ApiOrder>>(`/orders/${orderId}/wallet-payment`, {})
  return unwrap(res)
}

export async function getCryptoPaymentAction(orderId: string): Promise<ApiCryptoPayment> {
  const res = await api.get<BackendResponse<ApiCryptoPayment>>(`/orders/${orderId}/crypto-payment`)
  return unwrap(res)
}

export type CryptoPaymentStatusPayload = {
  paymentId: string
  status: ApiPaymentStatus
  paymentAddress: string
  amount: string
  timeRemaining: number
  isExpired: boolean
}

export async function getPaymentStatusAction(orderId: string): Promise<CryptoPaymentStatusPayload> {
  const res = await api.get<BackendResponse<CryptoPaymentStatusPayload>>(
    `/orders/${orderId}/crypto-payment/status`
  )
  return unwrap(res)
}

export async function getOrderDeliveryAction(orderId: string): Promise<OrderDeliveryResponse> {
  const res = await api.get<BackendResponse<OrderDeliveryResponse>>(`/orders/${orderId}/delivery`)
  return unwrap(res)
}

export async function listOrdersAction(params: OrderListParams): Promise<PaginatedOrders> {
  const res = await api.get<BackendResponse<PaginatedOrders>>('/orders', {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 12,
      status: params.status,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      cryptocurrency: params.cryptocurrency,
    },
  })
  return unwrap(res)
}

export async function getOrderAction(id: string): Promise<ApiOrder> {
  const res = await api.get<BackendResponse<ApiOrder>>(`/orders/${id}`)
  return unwrap(res)
}

export type ApiExchangeRate = {
  cryptocurrency: ApiCryptoCurrency
  fiatCurrency: string
  rate: number
  updatedAt: string
}

export type ApiAllExchangeRates = {
  rates: ApiExchangeRate[]
  fiatCurrency: string
  timestamp: string
}

export async function getExchangeRatesAction(): Promise<ApiAllExchangeRates> {
  const res = await api.get<BackendResponse<ApiAllExchangeRates>>('/crypto/exchange-rates')
  return unwrap(res)
}

export function mapApiOrderStatus(status: ApiOrderStatus): DashboardOrderStatus {
  if (status === 'COMPLETED') return 'paid'
  if (status === 'PENDING') return 'pending'
  return 'expired'
}

export function mapCryptoToPaymentMethod(c?: ApiCryptoCurrency | null): OrderPaymentMethod {
  switch (c) {
    case 'BTC':
      return 'bitcoin'
    case 'ETH':
      return 'ethereum'
    case 'USDT_TRC20':
      return 'usdt_tron'
    case 'USDT_ERC20':
    case 'USDC_ERC20':
      return 'usdt_ethereum'
    case 'LTC':
      return 'litecoin'
    case 'BCH':
      return 'bitcoin_cash'
    default:
      return 'bitcoin'
  }
}

export type DashboardOrderCardModel = {
  id: string
  brand: string
  imageUrl: string | null
  itemCount: number
  price: string
  status: DashboardOrderStatus
  paymentMethod: OrderPaymentMethod
  orderNumber: string
}

export function cryptoHumanTitle(c: ApiCryptoCurrency): string {
  const titles: Record<ApiCryptoCurrency, string> = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    USDT_TRC20: 'USDT (Tron)',
    USDT_ERC20: 'USDT (Ethereum)',
    USDC_ERC20: 'USDC (Ethereum)',
    LTC: 'Litecoin',
    BCH: 'Bitcoin Cash',
  }
  return titles[c]
}

export function formatCryptoAmountLine(amount: string, c: ApiCryptoCurrency): string {
  const suffix: Record<ApiCryptoCurrency, string> = {
    BTC: 'BTC',
    ETH: 'ETH',
    USDT_TRC20: 'USDT',
    USDT_ERC20: 'USDT',
    USDC_ERC20: 'USDC',
    LTC: 'LTC',
    BCH: 'BCH',
  }
  return `${amount} ${suffix[c]}`
}

export function mapApiOrderToDashboardCard(order: ApiOrder): DashboardOrderCardModel {
  const items = order.items ?? []
  const itemCount = items.reduce((s, i) => s + i.quantity, 0)
  const first = items[0]
  const primaryImage =
    first?.product?.images?.find((img) => img.isPrimary) ?? first?.product?.images?.[0] ?? null
  const imageUrl = primaryImage?.url ?? null
  const brand =
    (first?.variantLabel && String(first.variantLabel).trim()) || first?.product?.name || 'Order'
  const total = Number.parseFloat(order.totalAmount)
  const price = Number.isFinite(total) ? formatUsd(total) : formatUsd(0)
  return {
    id: order.id,
    brand: String(brand).toUpperCase(),
    imageUrl,
    itemCount,
    price,
    status: mapApiOrderStatus(order.status),
    paymentMethod: mapCryptoToPaymentMethod(order.cryptoPayment?.cryptocurrency),
    orderNumber: order.orderNumber,
  }
}
