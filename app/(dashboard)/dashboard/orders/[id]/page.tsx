'use client'

import CentralIcon from '@central-icons-react/all'
import { Reveal } from '@/components/ui/reveal'
import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import { RATING_STAR_COLORS } from '@/lib/rating-star-colors'
import { useOrderReviewStore } from '@/lib/order-review-store'
import type { Route } from 'next'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FunctionComponent, useMemo, useState } from 'react'

const modalShadowClass =
  'shadow-[0px_15.532510757446289px_23.3px_-4.66px_rgba(0,0,0,0.1),0px_6.213004112243652px_9.32px_-6.21px_rgba(0,0,0,0.1)]'

function iconSrcForBrand(brand: string): string {
  const u = brand.toUpperCase()
  if (u.includes('NETFLIX')) return '/icons/netflix.svg'
  if (u.includes('AIRBNB')) return '/icons/airbnb.svg'
  if (u.includes('STARBUCKS')) return '/icons/starbucks.svg'
  if (u.includes('BEST BUY') || u.includes('BESTBUY')) return '/icons/best-buy.svg'
  if (u.includes('PLAYSTATION')) return '/icons/playstation.svg'
  if (u.includes('CHIPOTLE')) return '/icons/Chipotle Mexican Grill, Inc..svg'
  return '/icons/airbnb.svg'
}

function orderDisplayId(id: string): string {
  return `OJ-92930049${id.padStart(2, '0')}`
}

function redeemCodeForOrder(id: string): string {
  return `AB-123-456-${id.padStart(3, '0')}`
}

const DashboardOrderDetailPage: FunctionComponent = () => {
  const params = useParams()
  const rawId = typeof params.id === 'string' ? params.id : ''
  const orders = useOrderReviewStore((s) => s.orders)
  const markedUsedByOrderId = useOrderReviewStore((s) => s.markedUsedByOrderId)
  const setOrderMarkedUsed = useOrderReviewStore((s) => s.setOrderMarkedUsed)

  const order = useMemo(() => orders.find((o) => o.id === rawId), [orders, rawId])

  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [reviewSent, setReviewSent] = useState(false)
  const [isProcessToRedeemOpen, setIsProcessToRedeemOpen] = useState(false)
  const [isOrderWarrantyOpen, setIsOrderWarrantyOpen] = useState(false)

  const previewRating = hoveredStar ?? rating
  const heroSrc = order ? iconSrcForBrand(order.brand) : '/icons/airbnb.svg'

  if (!order) {
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

  const paymentLabel =
    order.status === 'paid' ? 'Paid' : order.status === 'pending' ? 'Pending' : 'Expired'
  const paymentIcon =
    order.status === 'paid'
      ? 'IconCircleCheck'
      : order.status === 'pending'
        ? 'IconClockAlert'
        : 'IconCrossSmall'

  const paymentStatusIconClass =
    order.status === 'paid'
      ? 'text-limegreen'
      : order.status === 'pending'
        ? 'text-gold'
        : 'text-darkorange'

  const markedAsUsed = markedUsedByOrderId[order.id] === true
  const isPaidOrder = order.status === 'paid'

  const statusBadgeLabel = markedAsUsed ? 'Used' : paymentLabel
  const statusBadgeIcon = markedAsUsed ? 'IconDoupleCheckmark2Small' : paymentIcon

  return (
    <Reveal variant="fade-up" delay={140}>
      <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
        <article className="text-num-16 font-commissioner box-border flex w-full min-w-0 flex-col gap-8 rounded-xl border border-solid border-gray-600 bg-gray-100 p-5 text-left text-white sm:p-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* Product preview & primary actions */}
          <section className="flex w-full min-w-0 flex-col gap-5 lg:max-w-[min(100%,447px)] lg:shrink-0">
            <div className="rounded-num-12 flex aspect-447/255 max-h-[255px] w-full items-center justify-center overflow-hidden shadow-[0px_0px_12px_rgba(0,0,0,0.45)]">
              <img
                className="h-full w-full object-cover"
                alt=""
                src={heroSrc}
                width={447}
                height={256}
              />
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
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
              </button>
              <button
                type="button"
                disabled={!isPaidOrder}
                title={!isPaidOrder ? 'Available when payment is complete' : undefined}
                onClick={() => {
                  if (!isPaidOrder) return
                  setOrderMarkedUsed(order.id, !markedAsUsed)
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

            <div className="text-num-14 text-lightsteelblue-200 flex w-full flex-wrap items-center justify-center gap-3">
              <span className="leading-num-20 font-semibold">Facing Issues?</span>
              <button
                type="button"
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
              </button>
            </div>
          </section>

          {/* Order metadata, redeem, accordions, review */}
          <div className="text-whitesmoke-100 flex min-w-0 flex-1 flex-col gap-6 sm:gap-8 lg:text-[18px]">
            <header className="font-nata-sans flex flex-col gap-2 self-stretch">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="tracking-num-0_02 leading-8 font-extrabold uppercase">
                  {order.brand}
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
                  {order.price}
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
                    src="/icons/Crypto Logos/Ethereum ETH.svg"
                  />
                  <span className="tracking-num--0_01 leading-num-28 font-semibold opacity-75">
                    Ethereum
                  </span>
                </span>
              </div>
            </header>

            <div className="rounded-num-8 border-fuchsia font-nata-sans gap-num-15 flex flex-wrap items-center justify-center self-stretch border border-dashed p-6 text-[22px] [background:linear-gradient(180deg,rgba(235,45,255,0),rgba(235,45,255,0.25))] sm:p-9 sm:text-[24px]">
              <span className="tracking-num-0_02 text-center leading-8 font-extrabold break-all uppercase">
                {redeemCodeForOrder(order.id)}
              </span>
              <button
                type="button"
                className="shrink-0 touch-manipulation rounded-md p-1 [-webkit-tap-highlight-color:transparent]"
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
                      <div className="flex flex-col items-start gap-5 text-white">
                        <div className="leading-num-24 opacity-[0.8]">
                          <b>Step 1: Add to Cart</b>
                          <p className="m-0">
                            Choose your variant and quantity, then click{' '}
                            <span className="font-medium">Add to Cart</span>.
                          </p>
                        </div>

                        <div className="leading-num-24 opacity-[0.8]">
                          <b>Step 2: Complete Checkout</b>
                          <p className="m-0">
                            Finish payment using the available options, and confirm your order.
                          </p>
                        </div>

                        <div className="leading-num-24 opacity-[0.8]">
                          <b>Step 3: Redeem on the Platform</b>
                          <p className="m-0">
                            After purchase, your code will appear in your account. Enter the code at
                            checkout on the e-commerce platform.
                          </p>
                          <ul className="m-0 pl-[21px] text-[length:inherit]">
                            <li className="mb-0">
                              <span className="font-medium">If you need help</span>, contact support
                              from the page footer.
                            </li>
                          </ul>
                        </div>
                      </div>
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
                      <div className="flex flex-col items-start gap-5 text-white">
                        <div className="leading-num-24 opacity-[0.8]">
                          <b>Warranty Coverage</b>
                          <p className="m-0">
                            If your code is invalid or cannot be applied, we will help you resolve
                            it as quickly as possible.
                          </p>
                        </div>

                        <div className="leading-num-24 opacity-[0.8]">
                          <b>How to Request Help</b>
                          <p className="m-0">
                            Contact support within 48 hours with your order details.
                          </p>
                          <ul className="m-0 pl-[21px] text-[length:inherit]">
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
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
                  <div className="rounded-num-8 py-num-10 px-num-12 flex min-h-[52px] flex-1 flex-wrap items-center justify-between gap-3 border border-solid border-gray-600 bg-gray-200">
                    <span className="leading-num-20 font-semibold">Order ID</span>
                    <span className="text-num-16 tracking-num--0_01 flex min-w-0 items-center gap-2 font-semibold text-white">
                      <span className="truncate">{orderDisplayId(order.id)}</span>
                      <button
                        type="button"
                        className="shrink-0 touch-manipulation [-webkit-tap-highlight-color:transparent]"
                        aria-label="Copy order ID"
                      >
                        <CentralIcon
                          name="IconSquareBehindSquare1"
                          join="round"
                          fill="filled"
                          stroke="2"
                          radius="1"
                          size={16}
                          ariaHidden={true}
                        />
                      </button>
                    </span>
                  </div>
                  <div className="rounded-num-8 py-num-10 px-num-12 flex min-h-[52px] flex-1 flex-wrap items-center justify-between gap-3 border border-solid border-gray-600 bg-gray-200">
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
                    1 Year | 4K Ultra HD | Single Account Gift Card
                  </span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="rounded-num-8 py-num-10 px-num-12 flex flex-1 flex-wrap items-center justify-between gap-3 border border-solid border-gray-600 bg-gray-200">
                    <span className="leading-num-20 font-semibold">Country</span>
                    <span className="text-num-16 tracking-num--0_01 flex items-center gap-2 font-semibold text-white">
                      <img
                        className="h-num-19 w-[26px] shrink-0 rounded-sm border border-white/10 object-cover shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
                        alt=""
                        src="/icons/flag.svg"
                      />
                      CA
                    </span>
                  </div>
                  <div className="rounded-num-8 py-num-10 px-num-12 flex flex-1 flex-wrap items-center justify-between gap-3 border border-solid border-gray-600 bg-gray-200">
                    <span className="leading-num-20 font-semibold">Quantity</span>
                    <span className="text-num-16 tracking-num--0_01 font-semibold text-white">
                      {String(order.itemCount).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </section>

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
                <h2 id="add-review-heading" className="leading-num-28 tracking-num-0_02 font-bold">
                  Add Review
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
                          className={previewRating >= n ? undefined : 'text-lightsteelblue-200/40'}
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

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <span className="leading-num-20 font-semibold">Your Review</span>
                    <span className="leading-num-20 font-semibold opacity-50">Optional</span>
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about what you liked or disliked"
                    rows={4}
                    className="text-num-16 font-nata-sans rounded-num-8 tracking-num--0_01 focus:border-fuchsia box-border min-h-[120px] w-full resize-y border border-solid border-[#16243B] bg-gray-100 px-3 py-2.5 leading-7 font-semibold text-white shadow-none outline-none placeholder:text-white placeholder:opacity-25 focus:shadow-[0px_0px_0px_3px_rgba(235,45,255,0.25)]"
                  />
                </div>

                <button
                  type="button"
                  disabled={rating < 1 || reviewSent}
                  onClick={() => {
                    if (rating < 1) return
                    setReviewSent(true)
                  }}
                  className="bg-fuchsia text-num-16 tracking-num--0_01 flex min-h-11 w-full items-center justify-center self-stretch rounded-[7.79px] px-4 py-3 font-semibold text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {reviewSent ? 'Review submitted' : 'Submit Review'}
                </button>

                <p className="font-commissioner text-ghostwhite text-center text-xs leading-4 font-semibold italic opacity-50">
                  Your feedback helps us improve our products, services, and overall customer
                  experience.
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </Reveal>
  )
}

export default DashboardOrderDetailPage
