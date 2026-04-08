'use client'

import { useTheme } from 'next-themes'
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'

import { cn } from '@/lib/utils'
import CentralIcon from '@central-icons-react/all'

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

  const baseOffset = offset ?? { top: '1rem', right: '1rem' }
  const baseMobileOffset = mobileOffset ?? { top: '1rem', right: '1rem' }

  const defaultClassNames = {
    toast: cn(
      '!bg-gray-700 !text-ghostwhite !border-gray-600 border shadow-[0px_16px_16px_rgba(0,0,0,0.05),_0px_4px_4px_rgba(0,0,0,0.08)]',
      'rounded-lg px-3 py-2 flex gap-2.5 items-start',
      'font-commissioner text-left'
    ),
    title:
      'tracking-[-0.01em] leading-6 font-semibold text-base whitespace-nowrap overflow-hidden text-ellipsis',
    description:
      'tracking-[-0.01em] leading-5 font-medium text-[13px] text-ghostwhite/70 !mt-0 whitespace-normal line-clamp-2',
    success: 'border-mediumspringgreen',
    error: 'border-red',
    info: 'border-deepskyblue-200',
    warning: 'border-darkorange',
    content: 'flex-1 min-w-0 flex flex-col gap-0.5 overflow-hidden',
    icon: 'shrink-0 self-center',
  }

  const mergedToastOptions = {
    dismissible: false,
    unstyled: true,
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
      icons={{
        success: (
          <CentralIcon
            name="IconCheckCircle2"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={18}
            ariaHidden={true}
          />
        ),
        warning: (
          <CentralIcon
            name="IconExclamationTriangle"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={18}
            ariaHidden={true}
            className="text-[#FF2A2A]"
          />
        ),
      }}
      toastOptions={mergedToastOptions}
      className={cn('z-60', className)}
      theme={theme === 'system' || !theme ? 'system' : (theme as ToasterProps['theme'])}
      {...rest}
    />
  )
}
