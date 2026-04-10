'use client'

import AuthModalLayer from '@/components/auth/AuthModalLayer'
import { AuthModalProvider } from '@/components/auth/auth-modal-context'
import { Toaster } from '@/components/ui/sonner'
import { useCurrentUser } from '@/hooks/use-auth'
import { useAppStore } from '@/lib/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

function AuthBootstrap() {
  const { data: user, isLoading } = useCurrentUser()
  const setAuthUser = useAppStore((s) => s.setAuthUser)
  const clearAuthUser = useAppStore((s) => s.clearAuthUser)

  useEffect(() => {
    if (isLoading) return
    if (user) setAuthUser(user)
    else clearAuthUser()
  }, [isLoading, user, setAuthUser, clearAuthUser])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthModalProvider>
          <AuthBootstrap />
          {children}
          <AuthModalLayer />
          <Toaster />
        </AuthModalProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
