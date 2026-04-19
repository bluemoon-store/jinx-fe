'use client'

import type { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'

import { CartColumn } from '@/components/checkout/cart/CartColumn'
import { BuyerProtectionPanel } from '@/components/checkout/panels/BuyerProtectionPanel'
import { CheckoutOverviewCard } from '@/components/checkout/panels/CheckoutOverviewCard'
import { CompletePaymentConfirmed } from '@/components/checkout/panels/CompletePaymentConfirmed'
import { CompletePaymentPending } from '@/components/checkout/panels/CompletePaymentPending'
import { PaymentMethodPanel } from '@/components/checkout/panels/PaymentMethodPanel'
import { BackToStore } from '@/components/checkout/shared/BackToStore'
import { CheckoutLogo } from '@/components/checkout/shared/CheckoutLogo'
import { LegalFooter } from '@/components/checkout/shared/LegalFooter'
import { Step5Success } from '@/components/checkout/steps/Step5Success'
import { formatUsd } from '@/lib/cart-format'
import { useAddCartItemMutation, useClearCartMutation } from '@/hooks/use-carts'
import {
  cryptoHumanTitle,
  formatCryptoAmountLine,
  useCreateCryptoPaymentMutation,
  useCreateOrderMutation,
  usePayOrderWithWalletMutation,
  type ApiCryptoCurrency,
} from '@/hooks/use-orders'
import { useCryptoPaymentQuery } from '@/hooks/use-payments'
import type { CartItem } from '@/stores/cart-store'
import { useCartStore } from '@/stores/cart-store'
import { getAccessToken } from '@/lib/token'
import { useBuyerProtectionStore } from '@/stores/buyer-protection-store'
import { toast } from '@/lib/toast'

function SuccessTopBar({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <BackToStore onBack={onBack} label="Back to home" />
      <div className="self-end sm:self-auto">
        <CheckoutLogo variant="default" />
      </div>
    </div>
  )
}

type PaymentSnapshot = {
  address: string
  cryptoLine: string
  usdLine: string
  title: string
  qr?: string | null
  timeRemaining: number
}

const MAX_CHECKOUT_STEP = 5

export function CheckoutPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const clearCartMutation = useClearCartMutation()
  const addCartItemMutation = useAddCartItemMutation()
  const createOrderMutation = useCreateOrderMutation()
  const createCryptoPaymentMutation = useCreateCryptoPaymentMutation()
  const payOrderWithWalletMutation = usePayOrderWithWalletMutation()

  // Depend on mutateAsync only: the full mutation result object changes whenever
  // mutation status updates (pending/success), which would otherwise recreate this
  // callback every request and retrigger the cart sync layout effect in a loop.
  const clearCart = clearCartMutation.mutateAsync
  const addCartItem = addCartItemMutation.mutateAsync

  const pushLocalCartItemsToBackend = useCallback(
    async (localItems: CartItem[]) => {
      await clearCart()
      const setBackendCartItemId = useCartStore.getState().setBackendCartItemId
      for (const item of localItems) {
        const res = await addCartItem({
          productId: item.id,
          quantity: item.quantity,
          variantId: item.variantId,
          regionLabel: item.regionLabel,
          regionCountry: item.regionCountry,
        })
        const backendItem = res.items.find(
          (i) =>
            i.productId === item.id &&
            (i.variantId ?? '') === (item.variantId ?? '') &&
            (i.regionLabel ?? '') === item.regionLabel
        )
        if (backendItem) {
          setBackendCartItemId(
            {
              id: item.id,
              variantId: item.variantId,
              variantLabel: item.variantLabel,
              regionLabel: item.regionLabel,
              regionCountry: item.regionCountry,
            },
            backendItem.id
          )
        }
      }
    },
    [addCartItem, clearCart]
  )
  const raw = searchParams.get('step')
  const step = Math.min(MAX_CHECKOUT_STEP, Math.max(1, raw ? Number.parseInt(raw, 10) || 1 : 1))
  const orderIdParam = searchParams.get('orderId')

  const [cartBackendGate, setCartBackendGate] = useState<'loading' | 'ready' | 'error'>(() =>
    step > 2 ? 'ready' : 'loading'
  )
  const cartBackendSyncedRef = useRef(false)

  useLayoutEffect(() => {
    if (step > 2) {
      setCartBackendGate('ready')
      return
    }

    let cancelled = false

    ;(async () => {
      const token = getAccessToken()
      const localItems = useCartStore.getState().items
      if (!token || !localItems.length) {
        if (!cancelled) setCartBackendGate('ready')
        return
      }
      if (cartBackendSyncedRef.current) {
        if (!cancelled) setCartBackendGate('ready')
        return
      }

      if (!cancelled) setCartBackendGate('loading')
      try {
        await pushLocalCartItemsToBackend(localItems)
        if (cancelled) return
        cartBackendSyncedRef.current = true
        setCartBackendGate('ready')
      } catch (err) {
        console.error('checkout cart sync', err)
        if (!cancelled) {
          toast.error('Could not sync your cart with the server. Please try again.')
          setCartBackendGate('error')
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [step, pushLocalCartItemsToBackend])

  const retryCartBackendSync = useCallback(() => {
    void (async () => {
      const token = getAccessToken()
      const localItems = useCartStore.getState().items
      if (!token || !localItems.length) {
        setCartBackendGate('ready')
        return
      }
      setCartBackendGate('loading')
      try {
        await pushLocalCartItemsToBackend(localItems)
        cartBackendSyncedRef.current = true
        setCartBackendGate('ready')
      } catch (err) {
        console.error('checkout cart sync retry', err)
        toast.error('Could not sync your cart with the server. Please try again.')
        setCartBackendGate('error')
      }
    })()
  }, [pushLocalCartItemsToBackend])

  const [paymentBusy, setPaymentBusy] = useState(false)
  const [paymentSnapshot, setPaymentSnapshot] = useState<PaymentSnapshot | null>(null)

  const cryptoPaymentQuery = useCryptoPaymentQuery(
    step === 3 && orderIdParam ? orderIdParam : undefined
  )

  const fireConfetti = useCallback(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return

    confetti({
      particleCount: 150,
      spread: 60,
      origin: { x: 0.5, y: 0.25 },
      zIndex: 60,
    })
  }, [])

  const unsealConfettiFiredRef = useRef(false)

  const handleUnsealWithConfetti = useCallback(() => {
    if (unsealConfettiFiredRef.current) return
    unsealConfettiFiredRef.current = true
    fireConfetti()
  }, [fireConfetti])

  const setStep = useCallback(
    (n: number, opts?: { clearOrder?: boolean }) => {
      const next = Math.min(MAX_CHECKOUT_STEP, Math.max(1, n))
      const sp = new URLSearchParams(searchParams.toString())
      sp.set('step', String(next))
      const oid = searchParams.get('orderId')
      if (next >= 3 && oid && !opts?.clearOrder) {
        sp.set('orderId', oid)
      }
      if (next < 3 || opts?.clearOrder) {
        sp.delete('orderId')
      }
      router.push(`/checkout?${sp.toString()}` as Route)
    },
    [router, searchParams]
  )

  const handleBack = useCallback(() => {
    if (step <= 1) {
      router.push('/shop')
      return
    }
    if (step === 3) {
      setPaymentSnapshot(null)
      setStep(2, { clearOrder: true })
      return
    }
    setStep(step - 1)
  }, [router, setStep, step])

  useEffect(() => {
    if (step !== 4) unsealConfettiFiredRef.current = false
  }, [step])

  const paymentSnapshotFromQuery = useMemo((): PaymentSnapshot | null => {
    const pay = cryptoPaymentQuery.data
    if (!pay) return null
    const c = pay.cryptocurrency as ApiCryptoCurrency
    return {
      address: pay.paymentAddress,
      cryptoLine: formatCryptoAmountLine(pay.amount, c),
      usdLine: `${formatUsd(Number.parseFloat(pay.amountUsd))} USD`,
      title: cryptoHumanTitle(c),
      qr: pay.qrCode,
      timeRemaining: pay.timeRemaining,
    }
  }, [cryptoPaymentQuery.data])

  const effectivePaymentSnapshot = paymentSnapshot ?? paymentSnapshotFromQuery

  useEffect(() => {
    if (step !== 3 || !orderIdParam || paymentSnapshot || !cryptoPaymentQuery.isError) return
    toast.error('Could not load payment details')
  }, [cryptoPaymentQuery.isError, orderIdParam, paymentSnapshot, step])

  const handlePaymentMethodConfirm = useCallback(
    async (cryptocurrency: ApiCryptoCurrency) => {
      setPaymentBusy(true)
      try {
        const items = useCartStore.getState().items
        if (!items.length) {
          toast.error('Your cart is empty')
          return
        }
        const buyerProtection = useBuyerProtectionStore.getState().coverage === 'enhanced'

        const order = await createOrderMutation.mutateAsync({
          currency: 'USD',
          buyerProtection,
        })
        const newOrderId = order.id

        const pay = await createCryptoPaymentMutation.mutateAsync({
          orderId: newOrderId,
          dto: { cryptocurrency },
        })

        setPaymentSnapshot({
          address: pay.paymentAddress,
          cryptoLine: formatCryptoAmountLine(pay.amount, cryptocurrency),
          usdLine: `${formatUsd(Number.parseFloat(pay.amountUsd))} USD`,
          title: cryptoHumanTitle(cryptocurrency),
          qr: pay.qrCode,
          timeRemaining: pay.timeRemaining,
        })

        const sp = new URLSearchParams(searchParams.toString())
        sp.set('step', '3')
        sp.set('orderId', newOrderId)
        router.push(`/checkout?${sp.toString()}` as Route)
      } catch {
        toast.error('Checkout failed. Please try again.')
      } finally {
        setPaymentBusy(false)
      }
    },
    [createCryptoPaymentMutation, createOrderMutation, router, searchParams]
  )

  const handleWalletPayment = useCallback(async () => {
    setPaymentBusy(true)
    try {
      const items = useCartStore.getState().items
      if (!items.length) {
        toast.error('Your cart is empty')
        return
      }
      const buyerProtection = useBuyerProtectionStore.getState().coverage === 'enhanced'

      const order = await createOrderMutation.mutateAsync({
        currency: 'USD',
        buyerProtection,
      })

      const paid = await payOrderWithWalletMutation.mutateAsync(order.id)
      if (paid.status !== 'COMPLETED') {
        toast.error('Wallet payment could not be completed.')
        return
      }

      await clearCartMutation.mutateAsync()
      useCartStore.getState().clear()

      const sp = new URLSearchParams(searchParams.toString())
      sp.set('step', '4')
      sp.set('orderId', order.id)
      router.push(`/checkout?${sp.toString()}` as Route)
      fireConfetti()
    } catch {
      toast.error('Checkout failed. Please try again.')
    } finally {
      setPaymentBusy(false)
    }
  }, [clearCartMutation, createOrderMutation, fireConfetti, payOrderWithWalletMutation, router, searchParams])

  if (step === 4) {
    return (
      <div
        className="flex min-h-screen flex-col overflow-x-hidden bg-gray-500 px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 0%, rgba(27,217,36,0.2) 0%, rgba(27,217,36,0) 100%), linear-gradient(0deg, #010f25 0%, #010f25 100%)',
        }}
      >
        <div className="mx-auto w-full max-w-[1700px] min-w-0 flex-1">
          <SuccessTopBar onBack={() => router.push('/')} />
          <Step5Success onUnseal={handleUnsealWithConfetti} orderId={orderIdParam} />
        </div>
      </div>
    )
  }

  if (cartBackendGate !== 'ready' && step <= 2) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#041329] px-6 py-16">
        <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
          {cartBackendGate === 'loading' ? (
            <>
              <div
                className="border-t-fuchsia h-10 w-10 animate-spin rounded-full border-2 border-white/20"
                aria-hidden
              />
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold tracking-[-0.2px] text-white">Syncing cart…</p>
                <p className="text-sm leading-relaxed font-medium text-[#c2c2e2]">
                  Preparing your checkout session with the server.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold tracking-[-0.2px] text-white">Cart sync failed</p>
              <p className="text-sm leading-relaxed font-medium text-[#c2c2e2]">
                We could not copy your cart to the server. You can try again or return to the store.
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={retryCartBackendSync}
                  className="bg-fuchsia rounded-lg px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
                >
                  Try again
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/shop' as Route)}
                  className="rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Back to store
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden lg:flex-row">
      <aside className="flex w-full min-w-0 flex-col border-white/5 bg-gray-500 lg:min-h-screen lg:w-1/2 lg:border-r">
        <div className="mx-auto flex w-full max-w-[952px] min-w-0 flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:mx-0 lg:w-fit lg:max-w-[952px] lg:min-w-[809px] lg:self-end lg:px-8 xl:px-12">
          <BackToStore onBack={handleBack} label={step <= 1 ? 'Back to store' : 'Back'} />
          <div className="mt-6 flex w-full min-w-0 flex-1 flex-col sm:mt-8 lg:mt-10">
            {step === 1 || step === 2 ? <CartColumn checkoutStep={step} /> : null}
            {step === 3 ? <CheckoutOverviewCard centerSecurityNote /> : null}
            {step === 5 ? <CheckoutOverviewCard /> : null}
          </div>
          <LegalFooter />
        </div>
      </aside>

      <main className="flex w-full min-w-0 flex-col bg-[#041329] lg:min-h-screen lg:w-1/2">
        <div className="relative mx-auto flex w-full max-w-[800px] min-w-0 flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:mx-0 lg:self-start lg:px-8 xl:px-12">
          <div className="flex shrink-0 justify-end pb-2">
            <CheckoutLogo variant="alt" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col pt-2 sm:pt-4 lg:pt-6">
            {step === 1 ? (
              <BuyerProtectionPanel onBack={handleBack} onContinue={() => setStep(2)} />
            ) : null}
            {step === 2 ? (
              <PaymentMethodPanel
                onBack={() => setStep(1)}
                onContinue={handlePaymentMethodConfirm}
                onWalletContinue={handleWalletPayment}
                busy={paymentBusy}
              />
            ) : null}
            {step === 3 ? (
              <CompletePaymentPending
                orderId={orderIdParam}
                paymentAddress={effectivePaymentSnapshot?.address ?? null}
                cryptoAmountLabel={effectivePaymentSnapshot?.cryptoLine ?? null}
                amountUsdLabel={effectivePaymentSnapshot?.usdLine ?? null}
                cryptoTitle={effectivePaymentSnapshot?.title ?? 'Cryptocurrency'}
                qrCode={effectivePaymentSnapshot?.qr}
                initialTimeRemainingSec={effectivePaymentSnapshot?.timeRemaining ?? 20 * 60}
                onNavigateStep={(s) => setStep(s)}
                onExpired={() => {
                  setPaymentSnapshot(null)
                  toast.error('Payment window expired. Please choose a payment method again.')
                  setStep(2, { clearOrder: true })
                }}
              />
            ) : null}
            {step === 5 ? <CompletePaymentConfirmed /> : null}
          </div>
        </div>
      </main>
    </div>
  )
}
