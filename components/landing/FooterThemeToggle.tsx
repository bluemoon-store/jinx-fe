'use client'

import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function FooterThemeToggle() {
  return (
    <div className="box-border flex h-12 min-h-[44px] w-full min-w-0 items-center justify-center rounded-[8.77px] border border-solid border-border-subtle bg-card sm:h-[39.5px] sm:min-h-0 sm:min-w-[56px] sm:px-[6px]">
      <ThemeToggle />
    </div>
  )
}
