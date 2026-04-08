'use client'

import AuthModalLayer from '@/components/auth/AuthModalLayer'
import { AuthModalProvider } from '@/components/auth/auth-modal-context'
import { Toaster } from '@/components/ui/sonner'
import { useAppStore } from '@/lib/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const initializeAuth = useAppStore((s) => s.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

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
          {children}
          <AuthModalLayer />
          <Toaster />
        </AuthModalProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
