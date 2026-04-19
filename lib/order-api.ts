import { api } from '@/lib/api'
import type { BackendResponse } from '@/types/auth'
import type { OrderPaymentMethod } from '@/lib/order-review-store'
import type { DashboardOrderStatus } from '@/components/dashboard/DashboardOrderCard'
import { formatUsd } from '@/lib/cart-format'

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
  product?: { name?: string }
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
  paymentUri?: string
}

export type ApiOrder = {
  id: string
  orderNumber: string
  userId?: string | null
  guestEmail?: string | null
  status: ApiOrderStatus
  totalAmount: string
  currency: string
  promoCode?: string | null
  discountAmount?: string | null
  buyerProtection?: boolean
  buyerProtectionAmount?: string | null
  items?: ApiOrderItem[]
  cryptoPayment?: ApiCryptoPayment | null
}

export type OrderListParams = {
  page?: number
  limit?: number
  status?: ApiOrderStatus
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
  promoCode?: string
  buyerProtection?: boolean
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

export async function createOrder(dto: OrderCreatePayload): Promise<ApiOrder> {
  const res = await api.post<BackendResponse<ApiOrder>>('/orders', dto)
  return unwrap(res)
}

export async function createCryptoPayment(
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

export async function getCryptoPayment(orderId: string): Promise<ApiCryptoPayment> {
  const res = await api.get<BackendResponse<ApiCryptoPayment>>(`/orders/${orderId}/crypto-payment`)
  return unwrap(res)
}

export async function getPaymentStatus(orderId: string): Promise<{
  paymentId: string
  status: ApiPaymentStatus
  paymentAddress: string
  amount: string
  timeRemaining: number
  isExpired: boolean
}> {
  const res = await api.get<
    BackendResponse<{
      paymentId: string
      status: ApiPaymentStatus
      paymentAddress: string
      amount: string
      timeRemaining: number
      isExpired: boolean
    }>
  >(`/orders/${orderId}/crypto-payment/status`)
  return unwrap(res)
}

export async function getOrderDelivery(orderId: string): Promise<OrderDeliveryResponse> {
  const res = await api.get<BackendResponse<OrderDeliveryResponse>>(`/orders/${orderId}/delivery`)
  return unwrap(res)
}

export async function listOrders(params: OrderListParams): Promise<PaginatedOrders> {
  const res = await api.get<BackendResponse<PaginatedOrders>>('/orders', {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 12,
      status: params.status,
    },
  })
  return unwrap(res)
}

export async function getOrder(id: string): Promise<ApiOrder> {
  const res = await api.get<BackendResponse<ApiOrder>>(`/orders/${id}`)
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
  const brand =
    (first?.variantLabel && String(first.variantLabel).trim()) ||
    first?.product?.name ||
    'Order'
  const total = Number.parseFloat(order.totalAmount)
  const price = Number.isFinite(total) ? formatUsd(total) : formatUsd(0)
  return {
    id: order.id,
    brand: String(brand).toUpperCase(),
    itemCount,
    price,
    status: mapApiOrderStatus(order.status),
    paymentMethod: mapCryptoToPaymentMethod(order.cryptoPayment?.cryptocurrency),
    orderNumber: order.orderNumber,
  }
}
