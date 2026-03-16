'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  /** Fraction of element that must be visible before triggering (0–1). Default: 0.15 */
  threshold?: number
  /** Shrinks the viewport box used for intersection. Negative bottom value means
   *  the element must scroll 60px past the fold before triggering. Default: '0px 0px -60px 0px' */
  rootMargin?: string
  /** Only trigger once — element stays visible after first reveal. Default: true */
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}
