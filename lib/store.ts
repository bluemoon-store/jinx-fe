import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { User } from '@/types/api'

interface AppState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        setUser: (user) => set({ user }),
        setLoading: (isLoading) => set({ isLoading }),
      }),
      {
        name: 'jinx-to-storage',
        partialize: (state) => ({ user: state.user }),
      }
    )
  )
)
