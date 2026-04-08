'use client'

import { useTheme } from 'next-themes'
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'

import { cn } from '@/lib/utils'

type Props = ToasterProps

export function Toaster(props: Props) {
  const { theme } = useTheme()

  const {
    position,
    duration,
    closeButton,
    offset,
    mobileOffset,
    toastOptions,
    className,
    theme: _themeFromProps,
    ...rest
  } = props

  const baseOffset = offset ?? { top: '4.75rem', right: '1.5rem' }
  const baseMobileOffset = mobileOffset ?? { top: '3.75rem', right: '1rem' }

  const defaultClassNames = {
    toast: cn(
      'bg-gray-400/95 text-whitesmoke-100 border border-whitesmoke-400 shadow-[0_18px_45px_rgba(0,0,0,0.6)]',
      'rounded-num-8 px-4 py-3 flex gap-3 items-start'
    ),
    title: 'font-semibold text-sm',
    description: 'mt-1 text-xs text-lightsteelblue-200',
    success: 'border-mediumspringgreen',
    error: 'border-red',
    info: 'border-deepskyblue-200',
    warning: 'border-darkorange',
    content: 'flex-1 min-w-0',
    icon: 'mt-0.5 shrink-0',
  }

  const mergedToastOptions = {
    dismissible: false,
    ...(toastOptions ?? {}),
    classNames: {
      ...defaultClassNames,
      ...(toastOptions?.classNames ?? {}),
    },
  }

  return (
    <SonnerToaster
      position={position ?? 'top-right'}
      duration={duration ?? 4000}
      closeButton={closeButton ?? false}
      offset={baseOffset}
      mobileOffset={baseMobileOffset}
      richColors={false}
      toastOptions={mergedToastOptions}
      className={cn('z-60', className)}
      theme={theme === 'system' || !theme ? 'system' : (theme as ToasterProps['theme'])}
      {...rest}
    />
  )
}

