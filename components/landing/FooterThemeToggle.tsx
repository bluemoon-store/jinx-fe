'use client'

import { CentralIcon } from '@central-icons-react/all'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useRef, useState } from 'react'

import {
  siteSelectDropdownList,
  siteSelectDropdownOptionInteractive,
  siteSelectDropdownOptionRow,
  siteSelectDropdownPanel,
} from '@/components/ui/siteSelectDropdown'

export default function FooterThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const activeTheme = useMemo(() => {
    if (theme === 'light' || theme === 'dark') return theme
    return resolvedTheme === 'dark' ? 'dark' : 'light'
  }, [theme, resolvedTheme])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const themeOptions = [
    { key: 'light', label: 'Light', icon: 'IconSun' },
    { key: 'dark', label: 'Dark', icon: 'IconMoon' },
  ] as const

  return (
    <div
      ref={rootRef}
      className="relative flex w-full flex-col items-stretch sm:w-auto sm:items-start"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className="border-border-subtle bg-card box-border flex h-12 min-h-[44px] w-full min-w-0 items-center justify-between gap-[8.8px] rounded-[8.77px] border border-solid px-4 py-[1.1px] sm:h-[39.5px] sm:min-h-0 sm:min-w-[193.02px] sm:px-[14.3px]"
      >
        <span className="flex items-center gap-[8.8px]">
          <CentralIcon
            name={activeTheme === 'dark' ? 'IconMoon' : 'IconSun'}
            join="round"
            fill="filled"
            stroke="1"
            radius="1"
            size={18}
            color="currentColor"
            ariaHidden={true}
          />
          <span className="leading-num-21_93 font-semibold capitalize">{activeTheme}</span>
        </span>
        <img
          className={`h-[21.9px] w-fit overflow-hidden transition-transform ${open ? 'rotate-180' : ''}`}
          alt=""
          src="/icons/SVG.svg"
        />
      </button>

      {open && (
        <div
          className={`absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden ${siteSelectDropdownPanel}`}
        >
          <div className={siteSelectDropdownList} role="menu">
            {themeOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(option.key)
                  setOpen(false)
                }}
                className={`${siteSelectDropdownOptionRow} ${siteSelectDropdownOptionInteractive} ${
                  activeTheme === option.key ? 'bg-white/5' : ''
                } gap-2.5 text-sm`}
              >
                <CentralIcon
                  name={option.icon}
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={18}
                  color="currentColor"
                  ariaHidden={true}
                />
                <span className="text-muted-foreground font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
