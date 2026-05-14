'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import CentralIcon from '@central-icons-react/all'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { useAuthModal } from '@/components/auth/auth-modal-context'
import type { ApiCryptoCurrency } from '@/hooks/use-orders'
import { useExchangeRatesQuery } from '@/hooks/use-payments'

const rows = [
  {
    icon: checkoutImg.btc,
    title: 'Bitcoin',
    sub: 'BTC',
    w: 40,
    h: 40,
    crypto: 'BTC' as const,
  },
  {
    icon: checkoutImg.eth,
    title: 'Ethereum',
    sub: 'ETH',
    w: 40,
    h: 40,
    crypto: 'ETH' as const,
  },
  {
    icon: checkoutImg.tether,
    title: 'USDT (Tron)',
    sub: 'USDT - TRX',
    w: 43,
    h: 42,
    crypto: 'USDT_TRC20' as const,
  },
  {
    icon: checkoutImg.tetherEth,
    title: 'USDT (Ethereum)',
    sub: 'USDT - ERC 20',
    w: 43,
    h: 42,
    crypto: 'USDT_ERC20' as const,
  },
  {
    icon: checkoutImg.ltc,
    title: 'Litecoin',
    sub: 'LTC',
    w: 40,
    h: 40,
    crypto: 'LTC' as const,
  },
  {
    icon: checkoutImg.bch,
    title: 'Bitcoin Cash',
    sub: 'BCH',
    w: 40,
    h: 40,
    crypto: 'BCH' as const,
  },
] as const

const STABLE: ReadonlySet<ApiCryptoCurrency> = new Set(['USDT_ERC20', 'USDT_TRC20', 'USDC_ERC20'])

const VOLATILE_SUFFIX: Partial<Record<ApiCryptoCurrency, string>> = {
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC',
  BCH: 'BCH',
}

function amountForRow(
  crypto: ApiCryptoCurrency,
  totalUsd: number,
  rates: { rates: Array<{ cryptocurrency: ApiCryptoCurrency; rate: number }> } | undefined,
  ratesLoading: boolean
): string {
  if (STABLE.has(crypto)) {
    if (crypto === 'USDC_ERC20') return `${totalUsd.toFixed(2)} USDC`
    return `${totalUsd.toFixed(2)} USDT`
  }
  if (ratesLoading) return '—'
  const rate = rates?.rates.find((r) => r.cryptocurrency === crypto)?.rate
  if (rate == null || !Number.isFinite(rate) || rate <= 0) return '—'
  const suffix = VOLATILE_SUFFIX[crypto]
  if (!suffix) return '—'
  return `${(totalUsd / rate).toFixed(6)} ${suffix}`
}

type Props = {
  totalUsd: number
  onBack: () => void
  onContinue: (cryptocurrency: ApiCryptoCurrency) => void
  onWalletContinue?: () => void
  busy?: boolean
}

export function PaymentMethodPanel({
  totalUsd,
  onBack,
  onContinue,
  onWalletContinue,
  busy,
}: Props) {
  const { openAuthModal, isAuthenticated } = useAuthModal()
  const ratesQuery = useExchangeRatesQuery()
  const ratesLoading = ratesQuery.isPending || (ratesQuery.isFetching && !ratesQuery.data)

  const amountByCrypto = useMemo(() => {
    const map = new Map<ApiCryptoCurrency, string>()
    for (const row of rows) {
      map.set(row.crypto, amountForRow(row.crypto, totalUsd, ratesQuery.data, ratesLoading))
    }
    return map
  }, [ratesLoading, ratesQuery.data, totalUsd])

  return (
    <div className="flex w-full max-w-[729px] flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="text-ghostwhite focus-visible:ring-fuchsia/40 hidden items-center justify-center bg-transparent p-0 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#041329] focus-visible:outline-none md:inline-flex"
            aria-label="Back"
          >
            <CentralIcon
              name="IconArrowLeft"
              join="round"
              fill="outlined"
              stroke="2"
              radius="1"
              size={22}
              ariaHidden={true}
              className="text-ghostwhite shrink-0"
            />
          </button>
          <h2 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
            PAYMENT METHOD
          </h2>
        </div>
        <p className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
          Pay securely using any method
        </p>
      </div>

      <div className="flex flex-col rounded-xl border border-[#eeeeee1a] bg-gray-500">
        {rows.map((row, i) => (
          <div key={row.title}>
            {i > 0 ? (
              <Image
                src={checkoutImg.divider}
                alt=""
                width={800}
                height={1}
                className="h-px w-full"
              />
            ) : null}
            <button
              type="button"
              disabled={busy}
              onClick={() => onContinue(row.crypto)}
              className="focus-visible:ring-fuchsia/40 flex w-full flex-nowrap items-center gap-3 p-4 text-left transition-colors hover:bg-[#0E1B30] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:p-[22px]"
            >
              <Image src={row.icon} alt="" width={row.w} height={row.h} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-base font-bold tracking-[0.36px] text-white sm:text-lg">
                  {row.title}
                </div>
                <div className="text-lightsteelblue-200 truncate text-sm [text-shadow:0px_0px_8.63px_#00000099] sm:text-base">
                  {row.sub}
                </div>
              </div>
              <span className="shrink-0 self-center text-base font-bold tracking-[0.4px] text-white sm:text-xl">
                {amountByCrypto.get(row.crypto) ?? '—'}
              </span>
            </button>
          </div>
        ))}
        {isAuthenticated && onWalletContinue ? (
          <>
            <Image
              src={checkoutImg.divider}
              alt=""
              width={800}
              height={1}
              className="h-px w-full"
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => onWalletContinue()}
              className="focus-visible:ring-fuchsia/40 flex w-full flex-nowrap items-center gap-3 p-4 text-left transition-colors hover:bg-[#0E1B30] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:p-[22px]"
            >
              <Image
                src={checkoutImg.banknote}
                alt=""
                width={32}
                height={32}
                className="shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-lg font-bold tracking-[0.36px] text-white">
                  Wallet
                </div>
                <div className="text-lightsteelblue-200 truncate text-base [text-shadow:0px_0px_8.63px_#00000099]">
                  Pay using account balance
                </div>
              </div>
              <span className="text-lightsteelblue-200 shrink-0 self-center text-base font-bold tracking-[0.4px]">
                Instant
              </span>
            </button>
          </>
        ) : null}
      </div>

      {!isAuthenticated ? (
        <div className="gap-num-15 flex flex-col">
          <span className="text-base font-semibold text-white opacity-75">Unavailable Methods</span>
          <div className="flex min-h-[88px] flex-col items-stretch justify-center gap-3 rounded-xl border border-[#eeeeee1a] bg-gray-500 px-4 py-4 sm:flex-row sm:items-center sm:px-[22px]">
            <div className="flex flex-1 items-center gap-3 opacity-50">
              <Image src={checkoutImg.banknote} alt="" width={32} height={32} />
              <div>
                <div className="text-lg font-bold tracking-[0.36px] text-white">Wallet</div>
                <div className="text-lightsteelblue-200 text-base [text-shadow:0px_0px_8.63px_#00000099]">
                  Pay using account balance
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openAuthModal('signin')}
              className="focus-visible:ring-fuchsia/40 flex items-center gap-2 text-sm font-semibold text-white transition-opacity [text-shadow:0px_0px_8.63px_#00000099] hover:opacity-85 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-500 focus-visible:outline-none sm:text-base"
            >
              Sign in to unlock
              <Image src={checkoutImg.lockFrame} alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
