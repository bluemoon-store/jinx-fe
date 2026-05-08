'use client'

import Image from 'next/image'
import CentralIcon from '@central-icons-react/all'
import { useMemo, useState } from 'react'

import { checkoutImg } from '@/components/checkout/checkout-images'
import { InvoiceBadge } from '@/components/checkout/shared/InvoiceBadge'
import { SupportRow } from '@/components/checkout/shared/SupportRow'
import { formatUsd } from '@/lib/cart-format'
import type { CartItem } from '@/stores/cart-store'
import { useCartStore } from '@/stores/cart-store'
import { useOrderDeliveryQuery, useOrderQuery, ORDERS_QUERY_KEYS } from '@/hooks/use-orders'
import { RATING_STAR_COLORS } from '@/lib/rating-star-colors'
import { toast } from '@/lib/toast'
import { deleteVouchAction } from '@/actions/vouch'
import { VouchUploadModal } from '@/components/vouches/VouchUploadModal'
import { useQueryClient } from '@tanstack/react-query'
import styles from './Step5Success.module.css'

function itemKey(item: CartItem) {
  return `${item.id}-${item.variantId ?? ''}-${item.variantLabel}`
}

type SuccessDisplayItem = CartItem & {
  orderItemId?: string
  vouches?: Array<{ id: string; imageUrl: string; caption: string | null; createdAt: string }>
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

function RatingStarsInteractive({ initialRating }: { initialRating: number }) {
  const [rating, setRating] = useState(() => Math.min(5, Math.max(0, Math.round(initialRating))))
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const previewRating = hoveredStar ?? rating

  return (
    <div
      className="font-nata-sans flex shrink-0 items-center gap-2"
      role="group"
      aria-label="Rating"
      onMouseLeave={() => setHoveredStar(null)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => setRating(n)}
          onMouseEnter={() => setHoveredStar(n)}
          className="rounded-num-8 focus-visible:ring-fuchsia/40 box-border flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center border border-solid border-[#18263E] bg-[#19263F] transition-[border-color,box-shadow] [-webkit-tap-highlight-color:transparent] hover:border-white/20 focus-visible:ring-2 focus-visible:outline-none"
          aria-label={`${n} stars`}
          aria-pressed={rating >= n}
        >
          <CentralIcon
            name="IconStar"
            join="round"
            fill="filled"
            stroke="1"
            radius="3"
            size={22}
            ariaHidden={true}
            className={previewRating >= n ? undefined : 'text-lightsteelblue-200/35'}
            style={
              previewRating >= n && previewRating > 0
                ? { color: RATING_STAR_COLORS[previewRating - 1] }
                : undefined
            }
          />
        </button>
      ))}
    </div>
  )
}

function SuccessCard({
  item,
  onUnseal,
  deliveredCode,
  codeLoading,
  codeError,
  onAddVouch,
  onDeleteVouch,
}: {
  item: SuccessDisplayItem
  onUnseal?: () => void
  deliveredCode?: string | null
  codeLoading: boolean
  codeError: boolean
  onAddVouch?: (orderItemId: string) => void
  onDeleteVouch?: (vouchId: string) => void
}) {
  const [revealed, setRevealed] = useState(false)
  const [isProcessOpen, setIsProcessOpen] = useState(false)
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false)
  const lineTotal = item.unitPrice * item.quantity
  const fallbackMask = 'XXXXXXXXXXXXXXX'
  const effectiveCode =
    deliveredCode && deliveredCode.trim() ? deliveredCode.trim() : codeError ? fallbackMask : null

  return (
    <div className="border-whitesmoke-300 md:p-num-30 flex w-full max-w-[560px] flex-col gap-4 rounded-xl border-[1.5px] bg-gray-100 p-4 text-left sm:gap-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="sm:gap-num-15 flex min-w-0 items-start gap-3">
          {item.thumbUrl ? (
            <Image
              src={item.thumbUrl}
              alt=""
              width={122}
              height={63}
              className="sm:w-num-122 h-12 w-24 shrink-0 rounded-lg object-cover sm:h-[63px]"
            />
          ) : (
            <div
              className="sm:w-num-122 h-12 w-24 shrink-0 rounded-lg bg-white/5 ring-1 ring-white/10 sm:h-[63px]"
              aria-hidden
            />
          )}
          <div className="min-w-0">
            <div className="flex max-w-full min-w-0 flex-wrap items-center gap-x-2 sm:gap-x-2.5">
              <span className="text-ghostwhite max-w-full text-base font-bold wrap-break-word sm:text-[17.5px]">
                {item.name}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-[#c2c2e2] sm:text-[17.5px]">
              <span className="min-w-0 truncate opacity-75" title={item.variantLabel}>
                {item.variantLabel}
              </span>
            </div>
          </div>
        </div>
        <span className="shrink-0 text-xl font-bold text-white sm:text-2xl">
          {formatUsd(lineTotal)}
        </span>
      </div>
      <Image
        src={checkoutImg.divider}
        alt=""
        width={400}
        height={1}
        className="h-px w-full opacity-60"
      />
      <div className={styles.unsealWrapper}>
        <div className="flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-fuchsia-100 bg-[linear-gradient(180deg,rgba(235,45,255,0.25)_0%,rgba(235,45,255,0)_100%)] px-4 py-5 sm:flex-row sm:gap-3 sm:px-9 sm:py-6">
          <span className="font-nata-sans text-center text-base font-extrabold tracking-[0.48px] break-all text-slate-50 sm:text-2xl">
            {codeLoading ? (
              <span className="inline-block h-7 w-48 max-w-full animate-pulse rounded bg-white/10 sm:h-8 sm:w-64" />
            ) : revealed ? (
              (effectiveCode ?? fallbackMask)
            ) : (
              fallbackMask
            )}
          </span>
          {revealed && effectiveCode && !codeLoading ? (
            <button
              type="button"
              onClick={() => copyToClipboard(effectiveCode)}
              aria-label="Copy code"
              className="focus-visible:ring-fuchsia/40 inline-flex shrink-0 touch-manipulation rounded p-0.5 opacity-90 transition-opacity [-webkit-tap-highlight-color:transparent] hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
            >
              <Image src={checkoutImg.invoiceCopy} alt="" width={26} height={26} />
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => {
            if (revealed) return
            onUnseal?.()
            setRevealed(true)
          }}
          className={`${styles.peelButton} ${revealed ? styles.peeled : ''}`}
          aria-label="Click to unseal"
          aria-hidden={revealed}
          tabIndex={revealed ? -1 : 0}
        >
          <span className={styles.peelText}>
            <Image
              src={checkoutImg.eyeOpen}
              alt=""
              width={26}
              height={26}
              className={styles.peelIcon}
            />
            <span>Click to unseal</span>
          </span>
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="rounded-num-12 box-border flex w-full flex-col items-start overflow-hidden border border-solid border-gray-600 bg-gray-200 p-4">
          <button
            type="button"
            aria-expanded={isProcessOpen}
            className="flex w-full items-center justify-between gap-0 self-stretch"
            onClick={() => setIsProcessOpen((v) => !v)}
          >
            <b className="tracking-num--0_01 leading-num-28 flex-1 text-left text-white">
              Process to Redeem
            </b>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={20}
              className="text-white opacity-75 transition-transform duration-300 ease-in-out"
              style={{ transform: isProcessOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          <div
            className="grid w-full transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: isProcessOpen ? '1fr' : '0fr' }}
          >
            <div className="w-full overflow-hidden">
              <div className="bg-whitesmoke-300 relative left-1/2 mt-2 h-px w-screen -translate-x-1/2" />
              <div className="pt-num-6 pb-num-6 w-full">
                <div className="text-lightsteelblue-200 flex flex-col items-start gap-3 text-sm sm:text-base">
                  <p className="m-0 font-semibold text-white">{item.name}</p>
                  <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                    <li className="mb-0">Variant: {item.variantLabel}</li>
                    <li className="mb-0">Total paid: {formatUsd(lineTotal)}</li>
                    <li>
                      {revealed && effectiveCode
                        ? `Use code ${effectiveCode} at checkout on the product platform.`
                        : 'Unseal this product to reveal your redeem code first.'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-num-12 box-border flex w-full flex-col items-start overflow-hidden border border-solid border-gray-600 bg-gray-200 p-4">
          <button
            type="button"
            aria-expanded={isWarrantyOpen}
            className="flex w-full items-center justify-between gap-0 self-stretch"
            onClick={() => setIsWarrantyOpen((v) => !v)}
          >
            <b className="tracking-num--0_01 leading-num-28 flex-1 text-left text-white">
              Warranty
            </b>
            <CentralIcon
              name="IconChevronDownMedium"
              join="round"
              fill="outlined"
              stroke="1"
              radius="1"
              size={20}
              className="text-white opacity-75 transition-transform duration-300 ease-in-out"
              style={{ transform: isWarrantyOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          <div
            className="grid w-full transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: isWarrantyOpen ? '1fr' : '0fr' }}
          >
            <div className="w-full overflow-hidden">
              <div className="bg-whitesmoke-300 relative left-1/2 mt-2 h-px w-screen -translate-x-1/2" />
              <div className="pt-num-6 pb-num-6 w-full">
                <div className="text-lightsteelblue-200 flex flex-col items-start gap-3 text-sm sm:text-base">
                  <p className="m-0 font-semibold text-white">Warranty Coverage</p>
                  <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                    <li className="mb-0">
                      If this {item.name} code is invalid or cannot be applied, we will help resolve
                      it as quickly as possible.
                    </li>
                    <li>
                      Contact support within 48 hours and include your product ({item.variantLabel}
                      ).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={checkoutImg.divider}
        alt=""
        width={400}
        height={1}
        className="h-px w-full opacity-60"
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <CentralIcon
            name="IconShieldCheck"
            join="round"
            fill="filled"
            stroke="2"
            radius="1"
            size={18}
            ariaHidden={true}
            className="text-lightsteelblue-200 shrink-0"
          />
          <span className="text-lg font-bold tracking-[0.36px] text-white">Add a Vouch</span>
        </div>

        <div className="border-whitesmoke-300 rounded-xl border border-solid bg-gray-200 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-lightsteelblue-200 text-sm font-semibold">
              {item.vouches?.length || 0} / 5 vouches posted
            </p>
            {(item.vouches?.length || 0) < 5 && (
              <button
                type="button"
                onClick={() => item.orderItemId && onAddVouch?.(item.orderItemId)}
                className="bg-fuchsia/10 text-fuchsia hover:bg-fuchsia/20 rounded-lg px-3 py-1.5 text-sm font-bold transition-colors"
              >
                Add Vouch
              </button>
            )}
          </div>

          {item.vouches && item.vouches.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {item.vouches.map((vouch) => (
                <div
                  key={vouch.id}
                  className="group relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100"
                >
                  <Image src={vouch.imageUrl} alt="Vouch" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => onDeleteVouch?.(vouch.id)}
                    className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <CentralIcon
                      name="IconTrashCan"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={10}
                      ariaHidden={true}
                      color="#ff2a2a"
                    />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/30 text-xs italic">No vouches shared for this item yet.</p>
          )}
        </div>
      </div>
      <Image
        src={checkoutImg.divider}
        alt=""
        width={400}
        height={1}
        className="h-px w-full opacity-60"
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CentralIcon
            name="IconStar"
            join="round"
            fill="filled"
            stroke="1"
            radius="3"
            size={18}
            ariaHidden={true}
            className="text-lightsteelblue-200 shrink-0"
          />
          <span className="text-lg font-bold tracking-[0.36px] text-white">Add Review</span>
        </div>
        <div className="border-whitesmoke-300 flex flex-col gap-4 rounded-xl border border-solid bg-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-5">
          <span className="font-commissioner text-num-14 leading-num-20 font-semibold tracking-normal text-[#9497BC]">
            Your rating
          </span>
          <RatingStarsInteractive initialRating={0} />
        </div>
      </div>
    </div>
  )
}

export function Step5Success({
  onUnseal,
  orderId,
}: {
  onUnseal?: () => void
  orderId?: string | null
}) {
  const queryClient = useQueryClient()
  const items = useCartStore((s) => s.items)
  const orderQuery = useOrderQuery(orderId ?? undefined)
  const order = orderQuery.data
  const deliveryQuery = useOrderDeliveryQuery(orderId ?? undefined, {
    enabled: Boolean(orderId) && order?.status === 'COMPLETED',
  })

  const [vouchModalOpen, setVouchModalOpen] = useState(false)
  const [vouchOrderItemId, setVouchOrderItemId] = useState('')

  const handleDeleteVouch = async (vouchId: string) => {
    if (!confirm('Are you sure you want to delete this vouch?')) return
    try {
      await deleteVouchAction(vouchId)
      toast.success('Vouch deleted')
      if (orderId) {
        await queryClient.invalidateQueries({
          queryKey: ORDERS_QUERY_KEYS.detail(orderId),
        })
      }
    } catch {
      toast.error('Failed to delete vouch')
    }
  }

  const displayItems = useMemo<SuccessDisplayItem[]>(() => {
    if (!orderId) return items
    const orderItems = order?.items ?? []
    return orderItems.map((oi) => {
      const thumbUrl =
        oi.product?.images?.find((image) => image.isPrimary)?.url ??
        oi.product?.images?.find((image) => Boolean(image.url))?.url ??
        undefined
      return {
        id: oi.productId,
        name: oi.product?.name ?? 'Product',
        variantId: oi.variantId ?? undefined,
        variantLabel: oi.variantLabel ?? 'Standard',
        unitPrice: Number.parseFloat(oi.priceAtPurchase) || 0,
        quantity: oi.quantity,
        thumbUrl: thumbUrl ?? undefined,
        orderItemId: oi.id,
        vouches: oi.vouches,
      }
    })
  }, [items, order?.items, orderId])

  const deliveryByKey = useMemo(() => {
    if (!order || order.status !== 'COMPLETED' || !deliveryQuery.data || !orderId) return {}
    const delivery = deliveryQuery.data
    const next: Record<string, string> = {}
    for (const line of displayItems) {
      if (!line.orderItemId) continue
      const row = delivery.items.find((d) => d.itemId === line.orderItemId)
      if (row?.content) {
        next[itemKey(line)] = row.content
      }
    }
    return next
  }, [deliveryQuery.data, displayItems, order, orderId])

  const deliveryLoading =
    Boolean(orderId) &&
    (orderQuery.isPending ||
      (order?.status === 'COMPLETED' && deliveryQuery.isPending && !deliveryQuery.data))

  const deliveryError = orderQuery.isError || deliveryQuery.isError

  const receiptCouponCode = order?.couponCode ?? order?.promoCode ?? null
  const receiptDiscountUsd =
    order?.discountAmount != null && order.discountAmount !== ''
      ? Number.parseFloat(order.discountAmount) || 0
      : 0

  if (orderId && orderQuery.isPending) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] flex-col items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="h-7 w-56 animate-pulse rounded bg-white/10 sm:h-8 sm:w-72" />
        <div className="flex w-full max-w-[560px] flex-col gap-4 rounded-xl border border-white/10 bg-gray-100 p-6">
          <div className="h-14 w-full animate-pulse rounded bg-white/10" />
          <div className="h-24 w-full animate-pulse rounded bg-white/10" />
          <div className="h-14 w-full animate-pulse rounded bg-white/10" />
        </div>
      </div>
    )
  }

  if (!displayItems.length) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] flex-col items-center gap-6 px-4 py-8 text-center sm:gap-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col items-center gap-3 py-12">
          <Image
            className="h-12 w-12 opacity-90 sm:h-[50px] sm:w-[50px]"
            alt=""
            src="/icons/not-found.svg"
            width={50}
            height={50}
          />
          <h1 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
            PAYMENT SUCCESSFUL
          </h1>
          <p className="text-lightsteelblue-200 mt-1 text-sm font-semibold sm:text-base">
            No items found for this checkout.
          </p>
        </div>
        <SupportRow />
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="sm:gap-num-30 flex flex-col items-center gap-6 text-center">
        <Image
          src={checkoutImg.subscriptionTick}
          alt=""
          width={50}
          height={50}
          className="h-12 w-12 sm:h-[50px] sm:w-[50px]"
        />
        <div className="max-w-md px-1">
          <h1 className="font-nata-sans text-ghostwhite text-xl font-extrabold tracking-[0.48px] sm:text-2xl">
            PAYMENT SUCCESSFUL
          </h1>
          <p className="text-lightsteelblue-200 mt-2 text-sm font-semibold sm:text-base">
            Thank you for shopping with Jinx
          </p>
          {orderId && order && receiptDiscountUsd > 0 ? (
            <p className="text-lightsteelblue-200 mt-2 text-sm font-semibold sm:text-base">
              {receiptCouponCode ? (
                <>
                  Promo <span className="text-fuchsia">{receiptCouponCode}</span>
                  {' · '}
                </>
              ) : null}
              Savings {formatUsd(receiptDiscountUsd)}
            </p>
          ) : null}
        </div>
        <InvoiceBadge />
      </div>

      <div className="flex w-full max-w-[1920px] min-w-0 flex-wrap justify-center gap-6 sm:gap-8">
        {displayItems.map((item) => (
          <SuccessCard
            key={itemKey(item)}
            item={item}
            onUnseal={onUnseal}
            deliveredCode={deliveryByKey[itemKey(item)]}
            codeLoading={deliveryLoading}
            codeError={deliveryError}
            onAddVouch={(id) => {
              setVouchOrderItemId(id)
              setVouchModalOpen(true)
            }}
            onDeleteVouch={handleDeleteVouch}
          />
        ))}
      </div>

      <SupportRow />

      <VouchUploadModal
        target={{
          type: 'order-item',
          orderId: orderId ?? undefined,
          orderItemId: vouchOrderItemId,
        }}
        open={vouchModalOpen}
        onOpenChange={setVouchModalOpen}
      />
    </div>
  )
}
