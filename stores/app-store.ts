import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { User } from '@/types/api'
import { STORAGE_KEY } from '../lib/constants'

interface AppState {
  user: User | null
  isAuthenticated: boolean
  setAuthUser: (user: User) => void
  clearAuthUser: () => void
  /** Merge fields into the current user (e.g. after enabling 2FA). No-op if logged out. */
  updateUser: (partial: Partial<User>) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        setAuthUser: (user) => set({ user, isAuthenticated: true }),
        clearAuthUser: () => set({ user: null, isAuthenticated: false }),

        updateUser: (partial) => {
          const u = get().user
          if (!u) return
          set({ user: { ...u, ...partial } })
        },
      }),
      {
        name: STORAGE_KEY,
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      }
    )
  )
)
