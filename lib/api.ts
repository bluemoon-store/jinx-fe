import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './token'
import { HTTP_STATUS } from './constants'
import type { BackendResponse } from '@/types/auth'

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

function drainQueue(token: string | null, error: unknown = null) {
  failedQueue.forEach((p) => {
    if (token) p.resolve(token)
    else p.reject(error)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig

    if (error.response?.status !== HTTP_STATUS.UNAUTHORIZED || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      isRefreshing = false
      drainQueue(null, error)
      clearTokens()
      if (typeof window !== 'undefined') {
        window.location.replace('/?auth=signin')
      }
      return Promise.reject(error)
    }

    try {
      // Use a fresh axios instance to avoid triggering this interceptor again
      const refreshClient = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/v1',
        headers: { 'Content-Type': 'application/json' },
      })
      const res = await refreshClient.get('/auth/refresh-token', {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
      const { accessToken, refreshToken: newRefreshToken } = res.data.data
      setTokens({ accessToken, refreshToken: newRefreshToken })
      if (typeof window !== 'undefined') {
        void import('@/lib/support-socket')
          .then((m) => {
            m.refreshSupportSocketAuth()
          })
          .catch(() => {
            /* optional module */
          })
      }
      drainQueue(accessToken)
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return api(originalRequest)
    } catch (refreshError) {
      drainQueue(null, refreshError)
      clearTokens()
      if (typeof window !== 'undefined') {
        window.location.replace('/?auth=signin')
      }
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

function unwrap<T>(res: { data: BackendResponse<T> }): T {
  return res.data.data
}

export type CreateReviewDto = {
  orderId: string
  rating: number
  comment?: string
}

export type UpdateReviewDto = {
  rating?: number
  comment?: string
}

export type ReviewListParams = {
  page?: number
  limit?: number
  sort?: 'newest' | 'oldest' | 'rating_high' | 'rating_low'
}

export type ReviewListItem = {
  id: string
  orderId: string
  rating: number
  comment: string | null
  createdAt: string
  order: {
    brand: string
    itemCount: number
    price: string
    date: string
    time: string
    paymentMethod: string
  }
}

export type PaginatedResponse<T> = {
  items: T[]
  metadata: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

export const reviewsApi = {
  async create(data: CreateReviewDto): Promise<ReviewListItem> {
    const res = await api.post<BackendResponse<ReviewListItem>>('/reviews', data)
    return unwrap(res)
  },
  async list(params?: ReviewListParams): Promise<PaginatedResponse<ReviewListItem>> {
    const res = await api.get<BackendResponse<PaginatedResponse<ReviewListItem>>>('/reviews', {
      params,
    })
    return unwrap(res)
  },
  async update(id: string, data: UpdateReviewDto): Promise<ReviewListItem> {
    const res = await api.put<BackendResponse<ReviewListItem>>(`/reviews/${id}`, data)
    return unwrap(res)
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/reviews/${id}`)
  },
}
