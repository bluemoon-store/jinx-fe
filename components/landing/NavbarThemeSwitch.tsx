'use client'

import { CentralIcon } from '@central-icons-react/all'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

export default function NavbarThemeSwitch() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = useMemo(() => {
    if (!mounted) return false
    if (theme === 'light' || theme === 'dark') return theme === 'dark'
    return resolvedTheme === 'dark'
  }, [mounted, resolvedTheme, theme])

  return (
    <div className="rounded-num-8 border-border-subtle bg-card-elevated sm:px-num-12 box-border flex h-9 shrink-0 items-center justify-center gap-2 border border-solid px-2 pt-px pb-0.5 sm:h-[38px]">
      <CentralIcon
        name="IconSun"
        join="round"
        fill="filled"
        stroke="1"
        radius="1"
        size={16}
        color="currentColor"
        ariaHidden={true}
      />
      <button
        type="button"
        role="switch"
        aria-label="Toggle theme"
        aria-checked={isDark}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="relative h-5 w-9 rounded-full bg-fuchsia-200/90 transition-colors duration-200"
      >
        <span
          className={`absolute top-[1.75px] left-0.5 h-4 w-4 rounded-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.25)] transition duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isDark ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
      <CentralIcon
        name="IconMoon"
        join="round"
        fill="filled"
        stroke="1"
        radius="1"
        size={16}
        color="currentColor"
        ariaHidden={true}
      />
    </div>
  )
}
