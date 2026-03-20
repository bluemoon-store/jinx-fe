'use client'

import { CentralIcon } from '@central-icons-react/all'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <CentralIcon
        name="IconSun"
        join="round"
        fill="outlined"
        stroke="1"
        radius="1"
        size={20}
        className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <CentralIcon
        name="IconMoon"
        join="round"
        fill="outlined"
        stroke="1"
        radius="1"
        size={20}
        className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
