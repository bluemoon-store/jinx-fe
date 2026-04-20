'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  addCartItemAction,
  clearCartAction,
  getCartAction,
  removeCartItemAction,
  syncCartAction,
  updateCartItemAction,
} from '@/actions/cart'
import type { AddCartItemDto, SyncCartItemDto, UpdateCartItemDto } from '@/actions/cart'

export type { AddCartItemDto, ApiCart, ApiCartItem, UpdateCartItemDto } from '@/actions/cart'
import { getAccessToken } from '@/lib/token'

export const CART_QUERY_KEYS = {
  root: () => ['cart'] as const,
}

export function useCartQuery() {
  return useQuery({
    queryKey: CART_QUERY_KEYS.root(),
    queryFn: getCartAction,
    enabled: Boolean(getAccessToken()),
  })
}

export function useAddCartItemMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: AddCartItemDto) => addCartItemAction(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.root() })
    },
  })
}

export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ cartItemId, dto }: { cartItemId: string; dto: UpdateCartItemDto }) =>
      updateCartItemAction(cartItemId, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.root() })
    },
  })
}

export function useRemoveCartItemMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (cartItemId: string) => removeCartItemAction(cartItemId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.root() })
    },
  })
}

export function useClearCartMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => clearCartAction(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.root() })
    },
  })
}

export function useSyncCartMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (items: SyncCartItemDto[]) => syncCartAction(items),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.root() })
    },
  })
}
