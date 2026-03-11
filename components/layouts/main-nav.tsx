import Link from 'next/link'

import { ThemeToggle } from '@/components/ui/theme-toggle'

export function MainNav() {
  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Jinx.to</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/dashboard" className="text-foreground/60 hover:text-foreground">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
