import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './token'
import { HTTP_STATUS } from './constants'

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
