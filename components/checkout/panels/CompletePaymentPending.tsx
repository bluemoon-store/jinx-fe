'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { InvoiceBadge } from '@/components/checkout/shared/InvoiceBadge'
import { SupportRow } from '@/components/checkout/shared/SupportRow'
import { getPaymentStatus } from '@/lib/order-api'
import { toast } from '@/lib/toast'

type Props = {
  orderId: string | null
  paymentAddress: string | null
  /** e.g. "0.00037 BTC" */
  cryptoAmountLabel: string | null
  /** e.g. "≈ 25.03 USD" */
  amountUsdLabel: string | null
  cryptoTitle: string
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

export function CompletePaymentPending({
  orderId,
  paymentAddress,
  cryptoAmountLabel,
  amountUsdLabel,
  cryptoTitle,
  qrCode,
  initialTimeRemainingSec = 20 * 60,
  onNavigateStep,
  onExpired,
}: Props) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialTimeRemainingSec)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const advancedRef = useRef(false)

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

  const pollOnce = useCallback(async () => {
    if (!orderId || advancedRef.current) return
    try {
      const status = await getPaymentStatus(orderId)
      if (advancedRef.current) return
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
    } catch {
      // Keep polling; transient network errors should not block payment
    }
  }, [onExpired, onNavigateStep, orderId])

  useEffect(() => {
    if (!orderId) return undefined
    advancedRef.current = false
    pollRef.current = setInterval(() => {
      void pollOnce()
    }, 5000)
    void pollOnce()
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [orderId, pollOnce])

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0')
  const seconds = String(remainingSeconds % 60).padStart(2, '0')
  const totalWindow = Math.max(initialTimeRemainingSec, 1)
  const progress = 1 - remainingSeconds / totalWindow

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
          <Image src={checkoutImg.btc} alt="" width={40} height={40} className="shrink-0" />
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
                  <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">≈</span>
                  <span className="text-lightsteelblue-200 text-sm font-semibold sm:text-base">
                    {usdLine}
                  </span>
                </>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(amountLine.replace(/≈/g, '').trim())}
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
            <div className="h-num-18 w-num-18 relative">
              <Image
                src={checkoutImg.ellipseA}
                alt=""
                width={16}
                height={16}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <Image
                src={checkoutImg.ellipseB}
                alt=""
                width={16}
                height={16}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${progress * 360}deg)`,
                  transformOrigin: 'center',
                }}
              />
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
