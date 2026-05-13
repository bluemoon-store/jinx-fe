'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { BrandLoader } from '@/components/ui/BrandLoader'

const REVEAL_MS = 520

type NotifyFn = () => void

const LandingPageReadyContext = createContext<NotifyFn | null>(null)

export function useLandingPageReadyNotify(): NotifyFn | null {
  return useContext(LandingPageReadyContext)
}

type Props = {
  children: ReactNode
}

export function LandingPageReadyGate({ children }: Props) {
  const [ready, setReady] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)
  const didNotify = useRef(false)

  const notifyLandingReady = useCallback(() => {
    if (didNotify.current) return
    didNotify.current = true
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const id = window.setTimeout(() => setShowOverlay(false), REVEAL_MS)
    return () => window.clearTimeout(id)
  }, [ready])

  const value = useMemo(() => notifyLandingReady, [notifyLandingReady])

  return (
    <LandingPageReadyContext.Provider value={value}>
      <div className="relative">
        <div
          className={`transition-opacity duration-500 ease-out ${ready ? 'opacity-100' : 'opacity-0'}`}
        >
          {children}
        </div>
        {showOverlay ? (
          <div
            className={`bg-background fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-500 ease-in dark:bg-[#051329] ${
              ready ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
            aria-hidden={ready}
          >
            <BrandLoader label="Loading page" iconClassName="h-16 w-auto sm:h-20" />
          </div>
        ) : null}
      </div>
    </LandingPageReadyContext.Provider>
  )
}
