'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { InvoiceBadge } from '@/components/checkout/shared/InvoiceBadge'
import { SupportRow } from '@/components/checkout/shared/SupportRow'
import type { ApiCryptoCurrency } from '@/hooks/use-orders'
import { usePaymentStatusQuery } from '@/hooks/use-payments'
import { toast } from '@/lib/toast'

const CRYPTO_ICON: Record<ApiCryptoCurrency, string> = {
  BTC: checkoutImg.btc,
  ETH: checkoutImg.eth,
  LTC: checkoutImg.ltc,
  BCH: checkoutImg.bch,
  USDT_TRC20: checkoutImg.tether,
  USDT_ERC20: checkoutImg.tetherEth,
  USDC_ERC20: checkoutImg.tetherEth,
}

type Props = {
  orderId: string | null
  paymentAddress: string | null
  /** e.g. "0.00037 BTC" */
  cryptoAmountLabel: string | null
  /** e.g. "≈ 25.03 USD" */
  amountUsdLabel: string | null
  cryptoTitle: string
  cryptocurrency: ApiCryptoCurrency
  qrCode?: string | null
  initialTimeRemainingSec?: number
  onNavigateStep: (step: 4 | 5) => void
  /** Return user to payment method step */
  onExpired?: () => void
}

async function copyToClipboard(value: string, description?: string) {
  try {
    if (!navigator?.clipboard?.writeText) {
      toast.error('Could not copy. Please try again.')
      return
    }
    await navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard', { description: description ?? value })
  } catch {
    toast.error('Could not copy. Please try again.')
  }
}

/** Crypto line is like "0.00037 BTC" — copy only the numeric part for wallets/paste. */
function cryptoAmountCopyValue(amountLine: string): string {
  const t = amountLine.replace(/≈/g, '').trim()
  if (!t || t === '—') return t
  return t.split(/\s+/)[0] ?? t
}

export function CompletePaymentPending({
  orderId,
  paymentAddress,
  cryptoAmountLabel,
  amountUsdLabel,
  cryptoTitle,
  cryptocurrency,
  qrCode,
  initialTimeRemainingSec = 20 * 60,
  onNavigateStep,
  onExpired,
}: Props) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialTimeRemainingSec)
  const advancedRef = useRef(false)

  const statusQuery = usePaymentStatusQuery(orderId ?? undefined, {
    enabled: Boolean(orderId),
    refetchInterval: 5000,
  })

  useEffect(() => {
    setRemainingSeconds(initialTimeRemainingSec)
  }, [initialTimeRemainingSec, orderId])

  useEffect(() => {
    if (remainingSeconds <= 0) return

    const id = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [remainingSeconds])

  useEffect(() => {
    advancedRef.current = false
  }, [orderId])

  useEffect(() => {
    const status = statusQuery.data
    if (!status || advancedRef.current) return
    if (typeof status.timeRemaining === 'number' && status.timeRemaining >= 0) {
      setRemainingSeconds(status.timeRemaining)
    }
    if (status.isExpired) {
      advancedRef.current = true
      onExpired?.()
      return
    }
    switch (status.status) {
      case 'EXPIRED':
      case 'FAILED':
        advancedRef.current = true
        onExpired?.()
        break
      case 'PAID':
      case 'CONFIRMING':
        advancedRef.current = true
        onNavigateStep(5)
        break
      case 'CONFIRMED':
      case 'FORWARDING':
      case 'FORWARDED':
        advancedRef.current = true
        onNavigateStep(4)
        break
      default:
        break
    }
  }, [onExpired, onNavigateStep, statusQuery.data])

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0')
  const seconds = String(remainingSeconds % 60).padStart(2, '0')
  const totalWindow = Math.max(initialTimeRemainingSec, 1)
  const progress = Math.min(1, Math.max(0, 1 - remainingSeconds / totalWindow))

  const addr = paymentAddress ?? '—'
  const amountLine = cryptoAmountLabel ?? '—'
  const usdLine = amountUsdLabel ?? ''

  return (
    <div className="sm:gap-num-30 flex w-full max-w-[729px] flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
        <h2 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
          COMPLETE PAYMENT
        </h2>
        <InvoiceBadge />
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-[#eeeeee1a] bg-gray-500 p-4 sm:gap-8 sm:p-6 lg:p-8">
        <div className="flex items-start gap-3 sm:items-center">
          <Image
            src={CRYPTO_ICON[cryptocurrency] ?? checkoutImg.btc}
            alt=""
            width={40}
            height={40}
            className="shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-base font-bold tracking-[0.36px] text-white sm:text-lg">
              Pay with {cryptoTitle}
            </div>
            <p className="text-lightsteelblue-200 text-sm [text-shadow:0px_0px_8.63px_#00000099] sm:text-base">
              Copy the address and send the exact amount to the address
            </p>
          </div>
        </div>

        <div className="flex w-full justify-center">
          {qrCode ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrCode}
              alt="Payment QR"
              width={250}
              height={250}
              className="h-auto w-full max-w-[250px] rounded-lg"
            />
          ) : (
            <Image
              src={checkoutImg.qr}
              alt="Payment QR"
              width={250}
              height={250}
              className="h-auto w-full max-w-[250px] rounded-lg"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-lightsteelblue-200 text-sm font-semibold">Payment Address</span>
          <div className="border-whitesmoke-300 flex min-h-11 items-center justify-between gap-2 rounded-lg border bg-gray-100 px-2 py-2 sm:px-3 sm:py-2.5">
            <Image src={checkoutImg.wallet} alt="" width={18} height={18} className="shrink-0" />
            <span className="min-w-0 flex-1 text-center text-xs font-semibold break-all text-white sm:text-sm md:text-base">
              {addr}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(addr)}
              aria-label="Copy payment address"
              className="focus-visible:ring-fuchsia/40 inline-flex shrink-0 touch-manipulation rounded p-0.5 opacity-90 transition-opacity [-webkit-tap-highlight-color:transparent] hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
            >
              <Image src={checkoutImg.copyFrame} alt="" width={28} height={28} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-lightsteelblue-200 text-sm font-semibold">Amount to pay</span>
          <div className="border-whitesmoke-300 flex min-h-11 items-center justify-between gap-2 rounded-lg border bg-gray-100 px-2 py-2 sm:px-3 sm:py-2.5">
            <Image src={checkoutImg.coins} alt="" width={18} height={18} className="shrink-0" />
            <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-semibold text-white sm:text-base">{amountLine}</span>
              {usdLine ? (
                <>
                  <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
                    ≈
                  </span>
                  <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
                    {usdLine}
                  </span>
                </>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(cryptoAmountCopyValue(amountLine))}
              aria-label="Copy amount to pay"
              className="focus-visible:ring-fuchsia/40 inline-flex shrink-0 touch-manipulation rounded p-0.5 opacity-90 transition-opacity [-webkit-tap-highlight-color:transparent] hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
            >
              <Image src={checkoutImg.copyFrame} alt="" width={28} height={28} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-white">Expires in</div>
            <p className="text-lightsteelblue-200 text-sm font-semibold">
              Pay the amount before timer runs out
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-num-18 w-num-18 relative rounded-full"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              aria-label="Payment time progress"
              style={{
                background: `conic-gradient(#ff00ea ${progress * 360}deg, rgba(255, 255, 255, 0.2) 0deg)`,
              }}
            >
              <div className="absolute inset-[3px] rounded-full bg-[#0a162f]" />
            </div>
            <span className="text-base font-semibold text-white [text-shadow:0px_0px_8.63px_#00000099]">
              {minutes}:{seconds}
            </span>
          </div>
        </div>
      </div>

      <SupportRow />
    </div>
  )
}
