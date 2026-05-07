'use client'

import CentralIcon from '@central-icons-react/all'
import { useQueryClient } from '@tanstack/react-query'
import { Reveal } from '@/components/ui/reveal'
import { formatUsd } from '@/lib/cart-format'
import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import { RATING_STAR_COLORS } from '@/lib/rating-star-colors'
import { reviewsApi } from '@/lib/api'
import { deleteVouchAction } from '@/actions/vouch'
import { VouchUploadModal } from '@/components/vouches/VouchUploadModal'
import {
  ORDERS_QUERY_KEYS,
  mapApiOrderToDashboardCard,
  mapApiOrderStatus,
  useOrderDeliveryQuery,
  useOrderQuery,
} from '@/hooks/use-orders'
import type { OrderPaymentMethod } from '@/stores/order-review-store'
import { useOrderReviewStore } from '@/stores/order-review-store'
import { toast } from '@/lib/toast'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { FunctionComponent, useEffect, useRef, useState } from 'react'

const modalShadowClass =
  'shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,0,0,0.1),0px_6.213004112243652px_9.32px_-6.21px_rgba(0,0,0,0.1)]'

const PAYMENT_CRYPTO_META: Record<OrderPaymentMethod, { src: string; label: string }> = {
  bitcoin: { src: '/icons/Crypto Logos/Bitcoin.svg', label: 'Bitcoin' },
  ethereum: {
    src: 'https://c.animaapp.com/mng8f1pdQTkIkY/img/crypto-logos---ethereum-eth.svg',
    label: 'Ethereum',
  },
  usdt_tron: { src: '/icons/Crypto Logos/Tether.svg', label: 'USDT (Tron)' },
  usdt_ethereum: { src: '/icons/Crypto Logos/Tether.svg', label: 'USDT (Ethereum)' },
  litecoin: { src: '/icons/Crypto Logos/Litecoin LTC.svg', label: 'Litecoin' },
  bitcoin_cash: { src: '/icons/Crypto Logos/Bitcoin-1.svg', label: 'Bitcoin Cash' },
}

const DashboardOrderDetailPage: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const params = useParams()
  const searchParams = useSearchParams()
  const rawId = typeof params.id === 'string' ? params.id : ''
  const shouldOpenVouch = searchParams.get('vouch') === 'true'
  const markedUsedByOrderId = useOrderReviewStore((s) => s.markedUsedByOrderId)
  const setOrderMarkedUsed = useOrderReviewStore((s) => s.setOrderMarkedUsed)

  const orderQuery = useOrderQuery(rawId || undefined)
  const apiOrder = orderQuery.data
  const deliveryQuery = useOrderDeliveryQuery(rawId || undefined, {
    enabled: Boolean(rawId) && apiOrder?.status === 'COMPLETED',
  })

  const deliveryCode =
    apiOrder?.status === 'COMPLETED' ? (deliveryQuery.data?.items[0]?.content ?? null) : null

  const card = apiOrder ? mapApiOrderToDashboardCard(apiOrder) : null

  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [reviewSent, setReviewSent] = useState(false)
  const [existingReviewId, setExistingReviewId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [isProcessToRedeemOpen, setIsProcessToRedeemOpen] = useState(false)
  const [isOrderWarrantyOpen, setIsOrderWarrantyOpen] = useState(false)
  const [redeemCodeCopied, setRedeemCodeCopied] = useState(false)
  const [vouchModalOpen, setVouchModalOpen] = useState(false)
  const [vouchOrderItemId, setVouchOrderItemId] = useState('')
  const redeemCopiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (redeemCopiedTimeoutRef.current) clearTimeout(redeemCopiedTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (shouldOpenVouch && apiOrder?.items && apiOrder.items.length > 0) {
      // Find first item that has less than 5 vouches
      const itemToVouch = apiOrder.items.find((i) => (i.vouches?.length || 0) < 5)
      if (itemToVouch) {
        setVouchOrderItemId(itemToVouch.id)
        setVouchModalOpen(true)
      }
    }
  }, [shouldOpenVouch, apiOrder?.items])

  const handleDeleteVouch = async (vouchId: string) => {
    if (!confirm('Are you sure you want to delete this vouch?')) return
    try {
      await deleteVouchAction(vouchId)
      toast.success('Vouch deleted')
      await queryClient.invalidateQueries({
        queryKey: ORDERS_QUERY_KEYS.detail(rawId),
      })
    } catch {
      toast.error('Failed to delete vouch')
    }
  }

  useEffect(() => {
    if (!rawId || apiOrder?.status !== 'COMPLETED') return

    setExistingReviewId(null)
    setRating(0)
    setComment('')
    setReviewSent(false)
    const review = apiOrder.review
    if (!review || review.orderId !== rawId) return
    setExistingReviewId(review.id)
    setRating(review.rating)
    setComment(review.comment ?? '')
    setReviewSent(true)
  }, [rawId, apiOrder?.status, apiOrder?.review])

  const previewRating = hoveredStar ?? rating
  const showReviewBox = rating >= 1
  const firstItem = apiOrder?.items?.[0]
  const purchaseAgainSlug = firstItem?.product?.slug ?? firstItem?.productId
  const purchaseAgainHref = purchaseAgainSlug
    ? (`/shop/${purchaseAgainSlug}` as Route)
    : ('/shop' as Route)
  const primaryProductImage =
    firstItem?.product?.images?.find((img) => img.isPrimary) ??
    firstItem?.product?.images?.[0] ??
    null
  const heroSrc = primaryProductImage?.url ?? '/icons/airbnb.svg'

  if (rawId && orderQuery.isPending) {
    return (
      <Reveal variant="fade-up" delay={140}>
        <div className="flex py-12">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
            role="status"
            aria-label="Loading order"
          />
        </div>
      </Reveal>
    )
  }

  if (!rawId || orderQuery.isError || !apiOrder || !card) {
    return (
      <Reveal variant="fade-up" delay={140}>
        <div className="text-ghostwhite font-commissioner flex w-full flex-col items-center gap-3 py-12 text-center">
          <img className="size-28 opacity-90 sm:size-36" alt="" src="/icons/not-found.svg" />
          <b className="tracking-num--0_01 text-base leading-[26px] sm:text-lg">Order not found</b>
          <p className="text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
            This order does not exist or was removed.
          </p>
          <Link
            href={DASHBOARD_PATHS.orders as Route}
            className="text-fuchsia hover:text-fuchsia/90 mt-2 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
          >
            <CentralIcon
              name="IconChevronLeft"
              join="round"
              fill="filled"
              stroke="2"
              radius="1"
              size={18}
              ariaHidden={true}
            />
            Back to orders
          </Link>
        </div>
      </Reveal>
    )
  }

  const redeemDisplay = deliveryCode?.trim() || 'XXXXXXXXXXXXXXX'
  const isMultilineRedeem = redeemDisplay !== 'XXXXXXXXXXXXXXX' && redeemDisplay.includes('\n')

  const handleCopyRedeemCode = async () => {
    const code = redeemDisplay === 'XXXXXXXXXXXXXXX' ? '' : redeemDisplay
    try {
      if (!code) {
        toast.error('No redeem code available yet.')
        return
      }
      if (!navigator?.clipboard?.writeText) {
        toast.error('Could not copy. Please try again.')
        return
      }
      await navigator.clipboard.writeText(code)
      toast.success('Copied to clipboard', { description: code })
      setRedeemCodeCopied(true)
      if (redeemCopiedTimeoutRef.current) clearTimeout(redeemCopiedTimeoutRef.current)
      redeemCopiedTimeoutRef.current = setTimeout(() => setRedeemCodeCopied(false), 3000)
    } catch {
      toast.error('Could not copy. Please try again.')
    }
  }

  const handleCopyOrderId = async () => {
    const idText = apiOrder.orderNumber
    try {
      if (!navigator?.clipboard?.writeText) {
        toast.error('Could not copy. Please try again.')
        return
      }
      await navigator.clipboard.writeText(idText)
      toast.success('Copied to clipboard', { description: idText })
    } catch {
      toast.error('Could not copy. Please try again.')
    }
  }

  const dashStatus = mapApiOrderStatus(apiOrder.status)
  const paymentLabel =
    dashStatus === 'paid' ? 'Paid' : dashStatus === 'pending' ? 'Pending' : 'Expired'
  const paymentIcon =
    dashStatus === 'paid'
      ? 'IconCircleCheck'
      : dashStatus === 'pending'
        ? 'IconClockAlert'
        : 'IconCrossSmall'

  const paymentStatusIconClass =
    dashStatus === 'paid'
      ? 'text-limegreen'
      : dashStatus === 'pending'
        ? 'text-gold'
        : 'text-darkorange'

  const markedAsUsed = markedUsedByOrderId[card.id] === true
  const isPaidOrder = dashStatus === 'paid'

  const statusBadgeLabel = markedAsUsed ? 'Used' : paymentLabel
  const statusBadgeIcon = markedAsUsed ? 'IconDoupleCheckmark2Small' : paymentIcon

  const cryptoUi = PAYMENT_CRYPTO_META[card.paymentMethod]

  const firstLine = apiOrder.items?.[0]
  const redeemProcess = firstLine?.product?.redeemProcess ?? null
  const warrantyText = firstLine?.product?.warrantyText ?? null

  return (
    <Reveal variant="fade-up" delay={140}>
      <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
        <article className="text-num-16 font-commissioner box-border flex w-full min-w-0 flex-col gap-8 rounded-xl border border-solid border-gray-600 bg-gray-100 p-5 text-left text-white sm:p-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* Product preview & primary actions */}
          <section className="flex w-full min-w-0 flex-col gap-5 lg:w-1/2">
            <div className="rounded-num-12 flex aspect-447/255 max-h-[255px] w-full items-center justify-center overflow-hidden bg-[#051329]">
              <img
                className="max-h-full max-w-full object-contain object-center"
                alt=""
                src={heroSrc}
                width={447}
                height={256}
              />
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href={purchaseAgainHref}
                className="rounded-num-8 p-num-12 box-border flex min-h-[52px] flex-1 items-center justify-center gap-3 border border-solid border-gray-600 bg-[#19263F] transition-colors hover:bg-[#1f2d4a]"
              >
                <CentralIcon
                  name="IconBasket2"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                  className="shrink-0 text-white"
                />
                <span className="tracking-num--0_01 leading-num-28 font-semibold">
                  Purchase Again
                </span>
              </Link>
              <button
                type="button"
                disabled={!isPaidOrder}
                title={!isPaidOrder ? 'Available when payment is complete' : undefined}
                onClick={() => {
                  if (!isPaidOrder) return
                  setOrderMarkedUsed(card.id, !markedAsUsed)
                }}
                className="rounded-num-8 p-num-12 box-border flex min-h-[52px] flex-1 items-center justify-center gap-3 border border-solid border-gray-600 bg-[#19263F] transition-colors hover:bg-[#1f2d4a] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#19263F]"
              >
                {markedAsUsed ? (
                  <>
                    <CentralIcon
                      name="IconArrowUndoUp"
                      join="round"
                      fill="filled"
                      stroke="1"
                      radius="1"
                      size={18}
                      ariaHidden={true}
                      className="text-lightsteelblue-100 shrink-0"
                    />
                    <span className="tracking-num--0_01 leading-num-28 font-semibold">
                      Mark as Unused
                    </span>
                  </>
                ) : (
                  <>
                    <CentralIcon
                      name="IconDoupleCheckmark2Small"
                      join="round"
                      fill="filled"
                      stroke="1"
                      radius="1"
                      size={18}
                      ariaHidden={true}
                      className="text-lightsteelblue-100 shrink-0"
                    />
                    <span className="tracking-num--0_01 leading-num-28 font-semibold">
                      Mark as Used
                    </span>
                  </>
                )}
              </button>
            </div>

            <hr className="h-px w-full border-0 bg-gray-600" aria-hidden />

            <section aria-labelledby="vouches-heading" className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white opacity-75">
                <CentralIcon
                  name="IconShieldCheck"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={20}
                  color="currentColor"
                  className="shrink-0"
                />
                <h2 id="vouches-heading" className="leading-num-28 tracking-num-0_02 font-bold">
                  Add a Vouch
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {apiOrder.items?.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-solid border-gray-600 bg-gray-200 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-white uppercase">
                          {item.variantLabel || item.product?.name}
                        </p>
                        <p className="text-lightsteelblue-200 text-xs">
                          {item.vouches?.length || 0} / 5 vouches posted
                        </p>
                      </div>
                      {(item.vouches?.length || 0) < 5 && (
                        <button
                          onClick={() => {
                            setVouchOrderItemId(item.id)
                            setVouchModalOpen(true)
                          }}
                          className="bg-fuchsia/10 text-fuchsia hover:bg-fuchsia/20 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors"
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
                            className="group relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100"
                          >
                            <Image src={vouch.imageUrl} alt="Vouch" fill className="object-cover" />
                            <button
                              onClick={() => handleDeleteVouch(vouch.id)}
                              className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <CentralIcon
                                name="IconTrashCan"
                                join="round"
                                fill="filled"
                                stroke="2"
                                radius="1"
                                size={12}
                                ariaHidden={true}
                                color="#ff2a2a"
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-white/30 italic">
                        No vouches shared for this item yet.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <hr className="h-px w-full border-0 bg-gray-600" aria-hidden />

            <div className="text-num-14 text-lightsteelblue-200 flex w-full flex-wrap items-center justify-center gap-3">
              <span className="leading-num-20 font-semibold">Facing Issues?</span>
              <Link
                href={'/support' as Route}
                className="text-ghostwhite rounded-num-8 px-num-12 text-num-15_35 leading-num-21_93 flex items-center gap-2 bg-[#19263F] py-1.5 font-semibold transition-colors hover:bg-[#1f2d4a]"
              >
                <CentralIcon
                  name="IconRescueRing"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={17}
                  ariaHidden={true}
                />
                Contact Support
              </Link>
            </div>
          </section>

          {/* Order metadata, redeem, accordions, review */}
          <div className="text-whitesmoke-100 flex min-w-0 flex-1 flex-col gap-6 sm:gap-8 lg:w-1/2 lg:text-[18px]">
            <header className="font-nata-sans flex flex-col gap-2 self-stretch">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="tracking-num-0_02 leading-8 font-extrabold uppercase">
                  {card.brand}
                </h1>
                <div className="px-num-12 text-lightsteelblue-100 font-commissioner flex items-center gap-2 rounded-xl bg-[#19263F] py-1.5 text-[13px]">
                  <CentralIcon
                    name={
                      statusBadgeIcon as
                        | 'IconDoupleCheckmark2Small'
                        | 'IconCircleCheck'
                        | 'IconClockAlert'
                        | 'IconCrossSmall'
                    }
                    join="round"
                    fill="filled"
                    stroke="1"
                    radius="1"
                    size={18}
                    ariaHidden={true}
                    className={markedAsUsed ? 'shrink-0' : `shrink-0 ${paymentStatusIconClass}`}
                  />
                  <span className="leading-num-20 font-semibold">{statusBadgeLabel}</span>
                </div>
              </div>
              <div className="text-num-16 font-commissioner gap-x-num-15 flex flex-wrap items-center gap-y-2 text-white">
                <span className="tracking-num--0_01 leading-num-28 font-semibold opacity-75">
                  {formatUsd(Number.parseFloat(apiOrder.totalAmount))}
                </span>
                <span className="h-3.5 w-px shrink-0 bg-white/25" aria-hidden />
                <span className="tracking-num--0_01 leading-num-28 font-semibold opacity-75">
                  Cryptocurrency
                </span>
                <span className="h-3.5 w-px shrink-0 bg-white/25" aria-hidden />
                <span className="flex items-center gap-2">
                  <img
                    className="size-[19.5px] shrink-0 rounded-[4.24px]"
                    alt=""
                    src={cryptoUi.src}
                  />
                  <span className="tracking-num--0_01 leading-num-28 font-semibold opacity-75">
                    {cryptoUi.label}
                  </span>
                </span>
              </div>
            </header>

            <div className="rounded-num-8 border-fuchsia font-nata-sans gap-num-15 flex flex-wrap items-center justify-center self-stretch border border-dashed p-6 text-[22px] [background:linear-gradient(180deg,rgba(235,45,255,0),rgba(235,45,255,0.25))] sm:p-9 sm:text-[24px]">
              {redeemCodeCopied ? (
                <button
                  type="button"
                  onClick={handleCopyRedeemCode}
                  className="tracking-num-0_02 gap-num-15 focus-visible:ring-fuchsia/40 flex w-full min-w-0 cursor-pointer touch-manipulation items-center justify-center rounded-md text-center leading-8 font-extrabold uppercase [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:outline-none"
                  aria-label="Copy redeem code"
                >
                  <span
                    role="status"
                    aria-live="polite"
                    className="gap-num-15 flex items-center justify-center"
                  >
                    <CentralIcon
                      name="IconCheckCircle2"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={26}
                      ariaHidden={true}
                      className="shrink-0 text-[#0CC967]"
                    />
                    Copied
                  </span>
                </button>
              ) : isMultilineRedeem ? (
                <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <pre
                    className="tracking-num-0_02 max-h-[min(50vh,280px)] w-full min-w-0 flex-1 overflow-auto text-left text-base leading-relaxed font-extrabold break-words whitespace-pre-wrap text-white sm:text-lg"
                    tabIndex={0}
                  >
                    {redeemDisplay}
                  </pre>
                  <button
                    type="button"
                    onClick={handleCopyRedeemCode}
                    className="focus-visible:ring-fuchsia/40 shrink-0 touch-manipulation self-end rounded-md p-1 [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:outline-none sm:self-start"
                    aria-label="Copy redeem code"
                  >
                    <CentralIcon
                      name="IconSquareBehindSquare1"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={26}
                      ariaHidden={true}
                    />
                  </button>
                </div>
              ) : (
                <>
                  <span className="tracking-num-0_02 text-center leading-8 font-extrabold break-all uppercase">
                    {redeemDisplay}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyRedeemCode}
                    className="focus-visible:ring-fuchsia/40 shrink-0 touch-manipulation rounded-md p-1 [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:outline-none"
                    aria-label="Copy redeem code"
                  >
                    <CentralIcon
                      name="IconSquareBehindSquare1"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={26}
                      ariaHidden={true}
                    />
                  </button>
                </>
              )}
            </div>

            <div className="text-num-16 text-ghostwhite flex flex-col gap-4 self-stretch">
              <div className="rounded-num-12 box-border flex w-full flex-col items-start overflow-hidden border border-solid border-gray-600 bg-gray-200 p-4 sm:p-5">
                <button
                  type="button"
                  aria-expanded={isProcessToRedeemOpen}
                  className="flex w-full items-center justify-between gap-0 self-stretch"
                  onClick={() => setIsProcessToRedeemOpen((v) => !v)}
                >
                  <b className="tracking-num--0_01 leading-num-28 flex-1 text-left">
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
                    style={{
                      transform: isProcessToRedeemOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isProcessToRedeemOpen ? '1fr' : '0fr' }}
                >
                  <div className="w-full overflow-hidden">
                    <div className="bg-whitesmoke-300 relative left-1/2 mt-2 h-px w-screen -translate-x-1/2" />
                    <div className="pt-num-6 pb-num-6 w-full">
                      {redeemProcess ? (
                        <p className="leading-num-24 whitespace-pre-wrap opacity-[0.8]">
                          {redeemProcess}
                        </p>
                      ) : (
                        <div className="flex flex-col items-start gap-5 text-white">
                          <div className="leading-num-24 opacity-[0.8]">
                            <b>Step 1: Add to Cart</b>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">
                                Choose your variant and quantity, then click{' '}
                                <span className="font-medium">Add to Cart</span>.
                              </li>
                            </ul>
                          </div>

                          <div className="leading-num-24 opacity-[0.8]">
                            <b>Step 2: Complete Checkout</b>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">
                                Finish payment using the available options, and confirm your order.
                              </li>
                            </ul>
                          </div>

                          <div className="leading-num-24 opacity-[0.8]">
                            <b>Step 3: Redeem on the Platform</b>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">
                                After purchase, your code will appear in your account.
                              </li>
                              <li className="mb-0">
                                Enter the code at checkout on the e-commerce platform.
                              </li>
                              <li className="mb-0">
                                <span className="font-medium">If you need help</span>, contact
                                support from the page footer.
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-num-12 box-border flex w-full flex-col items-start overflow-hidden border border-solid border-gray-600 bg-gray-200 p-4 sm:p-5">
                <button
                  type="button"
                  aria-expanded={isOrderWarrantyOpen}
                  className="flex w-full items-center justify-between gap-0 self-stretch"
                  onClick={() => setIsOrderWarrantyOpen((v) => !v)}
                >
                  <b className="tracking-num--0_01 leading-num-28 flex-1 text-left">Warranty</b>
                  <CentralIcon
                    name="IconChevronDownMedium"
                    join="round"
                    fill="outlined"
                    stroke="1"
                    radius="1"
                    size={20}
                    className="text-white opacity-75 transition-transform duration-300 ease-in-out"
                    style={{
                      transform: isOrderWarrantyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOrderWarrantyOpen ? '1fr' : '0fr' }}
                >
                  <div className="w-full overflow-hidden">
                    <div className="bg-whitesmoke-300 relative left-1/2 mt-2 h-px w-screen -translate-x-1/2" />
                    <div className="pt-num-6 pb-num-6 w-full">
                      {warrantyText ? (
                        <p className="leading-num-24 whitespace-pre-wrap opacity-[0.8]">
                          {warrantyText}
                        </p>
                      ) : (
                        <div className="flex flex-col items-start gap-5 text-white">
                          <div className="leading-num-24 opacity-[0.8]">
                            <b>Warranty Coverage</b>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">
                                If your code is invalid or cannot be applied, we will help you
                                resolve it as quickly as possible.
                              </li>
                            </ul>
                          </div>

                          <div className="leading-num-24 opacity-[0.8]">
                            <b>How to Request Help</b>
                            <p className="m-0">
                              Contact support within 48 hours with your order details.
                            </p>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">
                                <span className="font-medium">Include your order id</span> and
                                screenshot (if available).
                              </li>
                              <li>
                                <span className="font-medium">
                                  We will investigate and provide a replacement or resolution.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="h-px w-full border-0 bg-gray-600" aria-hidden />

            <section aria-labelledby="order-details-heading" className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white opacity-75">
                <CentralIcon
                  name="IconRewrite1"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={20}
                  ariaHidden={true}
                />
                <h2
                  id="order-details-heading"
                  className="leading-num-28 tracking-num-0_02 font-bold"
                >
                  Order Details
                </h2>
              </div>

              <div className="text-num-14 text-lightsteelblue-200 flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-num-8 py-num-10 px-num-12 flex min-h-[52px] min-w-0 flex-wrap items-center justify-between gap-3 border border-solid border-gray-600 bg-gray-200">
                    <span className="leading-num-20 font-semibold">Order ID</span>
                    <button
                      type="button"
                      onClick={handleCopyOrderId}
                      className="text-num-16 tracking-num--0_01 focus-visible:ring-fuchsia/40 flex max-w-full min-w-0 flex-1 touch-manipulation items-center justify-end gap-2 rounded-md font-semibold text-white [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:outline-none"
                      aria-label={`Copy order ID ${apiOrder.orderNumber}`}
                    >
                      <span className="min-w-0 truncate text-right">{apiOrder.orderNumber}</span>
                      <CentralIcon
                        name="IconSquareBehindSquare1"
                        join="round"
                        fill="filled"
                        stroke="2"
                        radius="1"
                        size={16}
                        ariaHidden={true}
                        className="shrink-0"
                      />
                    </button>
                  </div>
                  <div className="rounded-num-8 py-num-10 px-num-12 flex min-h-[52px] min-w-0 flex-wrap items-center justify-between gap-3 border border-solid border-gray-600 bg-gray-200">
                    <span className="leading-num-20 font-semibold">Payment Status</span>
                    <span className="text-num-16 tracking-num--0_01 flex items-center gap-1.5 font-semibold text-white">
                      <CentralIcon
                        name={paymentIcon as 'IconCircleCheck'}
                        join="round"
                        fill="filled"
                        stroke="1"
                        radius="1"
                        size={16}
                        ariaHidden={true}
                        className={paymentStatusIconClass}
                      />
                      {paymentLabel}
                    </span>
                  </div>
                </div>

                <div className="rounded-num-8 py-num-10 px-num-12 flex flex-wrap items-center justify-between gap-3 border border-solid border-gray-600 bg-gray-200">
                  <span className="leading-num-20 font-semibold">Variant</span>
                  <span className="text-num-16 tracking-num--0_01 max-w-full text-right font-semibold text-white sm:max-w-[65%]">
                    {firstLine?.variantLabel ?? '—'}
                  </span>
                </div>

                <div className="rounded-num-8 py-num-10 px-num-12 flex flex-wrap items-center justify-between gap-3 border border-solid border-gray-600 bg-gray-200">
                  <span className="leading-num-20 font-semibold">Quantity</span>
                  <span className="text-num-16 tracking-num--0_01 font-semibold text-white">
                    {String(card.itemCount).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </section>

            {apiOrder.status === 'COMPLETED' ? (
              <>
                <hr className="h-px w-full border-0 bg-gray-600" aria-hidden />

                <section aria-labelledby="add-review-heading" className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-white opacity-75">
                    <CentralIcon
                      name="IconStar"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={18}
                      ariaHidden={true}
                    />
                    <h2
                      id="add-review-heading"
                      className="leading-num-28 tracking-num-0_02 font-bold"
                    >
                      {existingReviewId ? 'Edit Review' : 'Add Review'}
                    </h2>
                  </div>

                  <div
                    className={`text-num-14 text-lightsteelblue-200 gap-num-18 flex flex-col overflow-hidden rounded-xl border border-solid border-gray-600 bg-gray-200 p-5 ${modalShadowClass}`}
                  >
                    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="leading-num-20 font-semibold">Your Rating</span>
                      <div
                        className="flex items-center gap-2"
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
                            className="rounded-num-8 focus-visible:ring-fuchsia/40 box-border flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center border border-solid border-[#16243B] bg-gray-100 transition-[border-color,box-shadow] [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:outline-none"
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
                              className={
                                previewRating >= n ? undefined : 'text-lightsteelblue-200/40'
                              }
                              style={
                                previewRating >= n
                                  ? { color: RATING_STAR_COLORS[previewRating - 1] }
                                  : undefined
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {showReviewBox ? (
                      <div className="animate-fade-in flex w-full flex-col gap-4 self-stretch motion-reduce:animate-none">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <span className="leading-num-20 font-semibold">Your Review</span>
                            <span className="leading-num-20 font-semibold opacity-50">
                              Optional
                            </span>
                          </div>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us about what you liked or disliked"
                            rows={4}
                            className="text-num-16 font-commissioner rounded-num-8 tracking-num--0_01 focus:border-fuchsia box-border min-h-[120px] w-full resize-y border border-solid border-[#16243B] bg-gray-100 px-3 py-2.5 leading-7 font-semibold text-white shadow-none transition-[border-color,box-shadow] outline-none placeholder:text-white placeholder:opacity-25 focus:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]"
                          />
                        </div>

                        <button
                          type="button"
                          disabled={rating < 1 || submitting || (reviewSent && !existingReviewId)}
                          onClick={async () => {
                            if (!rawId || rating < 1 || submitting) return
                            setSubmitting(true)
                            try {
                              if (existingReviewId) {
                                await reviewsApi.update(existingReviewId, { rating, comment })
                                toast.success('Review updated')
                              } else {
                                const created = await reviewsApi.create({
                                  orderId: rawId,
                                  rating,
                                  comment,
                                })
                                setExistingReviewId(created.id)
                                toast.success('Review submitted')
                              }
                              await queryClient.invalidateQueries({
                                queryKey: ORDERS_QUERY_KEYS.detail(rawId),
                              })
                              await queryClient.invalidateQueries({
                                queryKey: ORDERS_QUERY_KEYS.lists(),
                              })
                              setReviewSent(true)
                            } catch {
                              toast.error('Failed to submit review. Please try again.')
                            } finally {
                              setSubmitting(false)
                            }
                          }}
                          className="bg-fuchsia text-num-16 tracking-num--0_01 flex min-h-11 w-full items-center justify-center self-stretch rounded-[7.79px] px-4 py-3 font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {submitting
                            ? 'Submitting...'
                            : existingReviewId
                              ? 'Update Review'
                              : 'Submit Review'}
                        </button>

                        <p className="font-commissioner text-ghostwhite text-center text-xs leading-4 font-semibold italic opacity-50">
                          Your feedback helps us improve our products, services, and overall
                          customer experience.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </section>
              </>
            ) : null}
          </div>
        </article>

        <VouchUploadModal
          target={{ type: 'order-item', orderId: rawId, orderItemId: vouchOrderItemId }}
          open={vouchModalOpen}
          onOpenChange={setVouchModalOpen}
        />
      </div>
    </Reveal>
  )
}

export default DashboardOrderDetailPage
