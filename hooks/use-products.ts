'use client'

import { useQuery } from '@tanstack/react-query'

import type { GetProductsParams } from '@/actions/product'
import { getCategoriesAction, getProductBySlugAction, getProductsAction } from '@/actions/product'

export const PRODUCT_QUERY_KEYS = {
  products: (params: GetProductsParams | undefined) => ['products', params] as const,
  hot: () => ['products', 'hot'] as const,
  restocked: () => ['products', 'restocked'] as const,
  newlyLaunched: () => ['products', 'new'] as const,
  detail: (slug: string) => ['product', 'detail', slug] as const,
  categories: () => ['product', 'categories'] as const,
}

export function useProductsQuery(params?: GetProductsParams) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.products(params),
    queryFn: () => getProductsAction(params),
  })
}

export function useHotProductsQuery(limit = 10) {
  return useQuery({
    queryKey: [...PRODUCT_QUERY_KEYS.hot(), limit] as const,
    queryFn: () => getProductsAction({ isHot: true, limit }),
  })
}

export function useRestockedProductsQuery(limit = 59) {
  return useQuery({
    queryKey: [...PRODUCT_QUERY_KEYS.restocked(), limit] as const,
    queryFn: () => getProductsAction({ isRestocked: true, limit }),
  })
}

export function useNewProductsQuery(limit = 5) {
  return useQuery({
    queryKey: [...PRODUCT_QUERY_KEYS.newlyLaunched(), limit] as const,
    queryFn: () => getProductsAction({ isNew: true, limit }),
  })
}

export function useProductDetailQuery(slug: string) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.detail(slug),
    queryFn: () => getProductBySlugAction(slug),
    enabled: Boolean(slug),
  })
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.categories(),
    queryFn: getCategoriesAction,
    staleTime: 10 * 60 * 1000,
  })
}
