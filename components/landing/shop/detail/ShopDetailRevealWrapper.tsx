'use client'

import { FunctionComponent, ReactNode } from 'react'

import { Reveal } from '@/components/ui/reveal'

export const ShopDetailRevealWrapper: FunctionComponent<{
  children: ReactNode
}> = ({ children }) => {
  // Use fade-in to avoid visible layout "jump" on initial reload.
  return <Reveal variant="fade-in">{children}</Reveal>
}
