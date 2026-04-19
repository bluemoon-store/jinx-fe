import { api } from '@/lib/api'
import type { BackendResponse } from '@/types/auth'

function unwrap<T>(res: { data: BackendResponse<T> }): T {
  return res.data.data
}

export type ApiCartItem = {
  id: string
  productId: string
  variantId?: string | null
  quantity: number
  unitPrice: string
  regionLabel?: string | null
  regionCountry?: string | null
}

export type ApiCart = {
  id: string
  userId: string
  items: ApiCartItem[]
  totalAmount: string
  totalItems: number
}

export type AddCartItemDto = {
  productId: string
  quantity: number
  variantId?: string
  regionLabel?: string
  regionCountry?: string
}

export type UpdateCartItemDto = {
  quantity: number
}

export async function getCart(): Promise<ApiCart> {
  const res = await api.get<BackendResponse<ApiCart>>('/cart')
  return unwrap(res)
}

export async function addCartItem(dto: AddCartItemDto): Promise<ApiCart> {
  const res = await api.post<BackendResponse<ApiCart>>('/cart/items', dto)
  return unwrap(res)
}

export async function updateCartItem(
  cartItemId: string,
  dto: UpdateCartItemDto
): Promise<ApiCart> {
  const res = await api.put<BackendResponse<ApiCart>>(`/cart/items/${cartItemId}`, dto)
  return unwrap(res)
}

export async function removeCartItem(cartItemId: string): Promise<ApiCart> {
  const res = await api.delete<BackendResponse<ApiCart>>(`/cart/items/${cartItemId}`)
  return unwrap(res)
}

export async function clearCart(): Promise<ApiCart> {
  const res = await api.delete<BackendResponse<ApiCart>>('/cart')
  return unwrap(res)
}
