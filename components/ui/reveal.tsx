'use client'

/**
 * Scroll-reveal animation system
 *
 * ─── QUICK START ──────────────────────────────────────────────────────────────
 *
 * Single element:
 *   <Reveal variant="fade-up">
 *     <HeroSection />
 *   </Reveal>
 *
 * Staggered list (children animate in sequence):
 *   <StaggerReveal stagger={120} variant="fade-up">
 *     {items.map(item => <Card key={item.id} {...item} />)}
 *   </StaggerReveal>
 *
 * ─── PROPS ────────────────────────────────────────────────────────────────────
 *
 * variant   — animation style (default: 'fade-up')
 *             'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right'
 *
 * delay     — ms before animation starts after element enters view (default: 0)
 * duration  — ms for the animation to complete (default: 600)
 * once      — stay visible after first reveal, never re-animate (default: true)
 * threshold — 0–1 fraction of element visible before triggering (default: 0.15)
 * rootMargin— adjust trigger zone, e.g. '0px 0px -80px 0px' (default)
 * className — forwarded to the wrapper div
 *
 * ─── STAGGER-SPECIFIC PROPS ───────────────────────────────────────────────────
 *
 * baseDelay    — initial delay before the first child animates (default: 0)
 * stagger      — ms added per child (default: 100)
 * itemClassName— className forwarded to each Reveal wrapper div
 */

import { Children, CSSProperties, ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

// ─── Types ────────────────────────────────────────────────────────────────────

export type RevealVariant = 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right'

// ─── Internal maps ────────────────────────────────────────────────────────────

const keyframeMap: Record<RevealVariant, string> = {
  'fade-up': 'reveal-fade-up',
  'fade-in': 'reveal-fade-in',
  'scale-in': 'reveal-scale-in',
  'slide-left': 'reveal-slide-left',
  'slide-right': 'reveal-slide-right',
}

/** Initial hidden state before the element enters the viewport */
const hiddenStyle: Record<RevealVariant, CSSProperties> = {
  'fade-up': { opacity: 0, transform: 'translateY(32px)' },
  'fade-in': { opacity: 0 },
  'scale-in': { opacity: 0, transform: 'scale(0.92)' },
  'slide-left': { opacity: 0, transform: 'translateX(-40px)' },
  'slide-right': { opacity: 0, transform: 'translateX(40px)' },
}

// ─── <Reveal> ─────────────────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  /** Delay in ms before animation plays after element enters view */
  delay?: number
  /** Duration of the animation in ms */
  duration?: number
  /** If true, element stays visible after first reveal and never re-animates */
  once?: boolean
  /** 0–1 fraction of element that must be visible before triggering */
  threshold?: number
  /** IntersectionObserver rootMargin — shift the trigger zone */
  rootMargin?: string
  className?: string
}

export function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  className,
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold, rootMargin, once })

  // cubic-bezier(0.22, 1, 0.36, 1) = spring-like ease-out — snappy entry, no bounce
  const style: CSSProperties = isVisible
    ? {
        animation: `${keyframeMap[variant]} ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`,
      }
    : hiddenStyle[variant]

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

// ─── <StaggerReveal> ──────────────────────────────────────────────────────────

interface StaggerRevealProps {
  children: ReactNode
  variant?: RevealVariant
  /** Delay before the very first child animates */
  baseDelay?: number
  /** Extra ms added for each subsequent child */
  stagger?: number
  duration?: number
  once?: boolean
  threshold?: number
  rootMargin?: string
  /** className on the outer wrapper div */
  className?: string
  /** className forwarded to every Reveal wrapper div */
  itemClassName?: string
}

export function StaggerReveal({
  children,
  variant = 'fade-up',
  baseDelay = 0,
  stagger = 100,
  duration = 600,
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  className,
  itemClassName,
}: StaggerRevealProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <Reveal
          key={i}
          variant={variant}
          delay={baseDelay + i * stagger}
          duration={duration}
          once={once}
          threshold={threshold}
          rootMargin={rootMargin}
          className={itemClassName}
        >
          {child}
        </Reveal>
      ))}
    </div>
  )
}
