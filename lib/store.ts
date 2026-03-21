import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import {
  loginAction,
  logoutAction,
  registerAction,
  refreshTokenAction,
} from '@/actions/auth'
import type { User } from '@/types/api'
import type { LoginInput, RegisterInput } from './validations'
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './token'
import { api } from './api'
import { STORAGE_KEY } from './constants'

interface AppState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginInput) => Promise<void>
  register: (data: RegisterInput) => Promise<void>
  logout: () => Promise<void>
  refreshTokens: () => Promise<string>
  initializeAuth: () => Promise<void>
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,

        login: async (data) => {
          set({ isLoading: true })
          try {
            const result = await loginAction(data)
            setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken })
            set({ user: result.user, isAuthenticated: true, isLoading: false })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },

        register: async (data) => {
          set({ isLoading: true })
          try {
            const result = await registerAction(data)
            setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken })
            set({ user: result.user, isAuthenticated: true, isLoading: false })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },

        logout: async () => {
          try {
            await logoutAction()
          } catch {
            // best-effort server-side invalidation
          }
          clearTokens()
          set({ user: null, isAuthenticated: false, isLoading: false })
        },

        refreshTokens: async () => {
          const refreshToken = getRefreshToken()
          if (!refreshToken) {
            await get().logout()
            throw new Error('No refresh token')
          }
          try {
            const result = await refreshTokenAction(refreshToken)
            setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken })
            return result.accessToken
          } catch (error) {
            await get().logout()
            throw error
          }
        },

        initializeAuth: async () => {
          const accessToken = getAccessToken()
          if (!accessToken) {
            set({ user: null, isAuthenticated: false, isLoading: false })
            return
          }
          set({ isLoading: true })
          try {
            const res = await api.get<{ data: User }>('/auth/me')
            set({ user: res.data.data, isAuthenticated: true, isLoading: false })
          } catch (error: any) {
            if (error?.response?.status === 401) {
              try {
                await get().refreshTokens()
                const res = await api.get<{ data: User }>('/auth/me')
                set({ user: res.data.data, isAuthenticated: true, isLoading: false })
              } catch {
                set({ user: null, isAuthenticated: false, isLoading: false })
              }
            } else {
              set({ isLoading: false })
            }
          }
        },
      }),
      {
        name: STORAGE_KEY,
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      }
    )
  )
)
