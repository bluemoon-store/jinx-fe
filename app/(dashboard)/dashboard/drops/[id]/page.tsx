'use client'

import { deleteDropClaimVouchAction } from '@/actions/vouch'
import { formatOrderBrandLabel } from '@/components/dashboard/dashboard-order-brand'
import { Reveal } from '@/components/ui/reveal'
import { VouchUploadModal } from '@/components/vouches/VouchUploadModal'
import { DROPS_QUERY_KEYS, useMyDropClaimQuery } from '@/hooks/use-drops'
import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import { toast } from '@/lib/toast'
import { useOrderReviewStore } from '@/stores/order-review-store'
import CentralIcon from '@central-icons-react/all'
import { useQueryClient } from '@tanstack/react-query'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FunctionComponent, useRef, useState } from 'react'

const DashboardDropDetailPage: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const params = useParams()
  const rawId = typeof params.id === 'string' ? params.id : ''
  const claimQuery = useMyDropClaimQuery(rawId || undefined)
  const claim = claimQuery.data
  const [isProcessOpen, setIsProcessOpen] = useState(false)
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false)
  const [redeemCodeCopied, setRedeemCodeCopied] = useState(false)
  const [vouchModalOpen, setVouchModalOpen] = useState(false)
  const redeemCopiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const markedUsedByDropClaimId = useOrderReviewStore((s) => s.markedUsedByDropClaimId)
  const setDropClaimMarkedUsed = useOrderReviewStore((s) => s.setDropClaimMarkedUsed)

  if (rawId && claimQuery.isPending) {
    return (
      <Reveal variant="fade-up" delay={140}>
        <div className="flex py-12">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-fuchsia-400"
            role="status"
            aria-label="Loading drop claim"
          />
        </div>
      </Reveal>
    )
  }

  if (!rawId || claimQuery.isError || !claim) {
    return (
      <Reveal variant="fade-up" delay={140}>
        <div className="text-foreground dark:text-ghostwhite font-commissioner flex w-full flex-col items-center gap-3 py-12 text-center">
          <img className="size-28 opacity-90 sm:size-36" alt="" src="/icons/not-found.svg" />
          <b className="tracking-num--0_01 text-base leading-[26px] sm:text-lg">Drop not found</b>
          <p className="text-muted-foreground dark:text-lightsteelblue-100 sm:text-num-14 max-w-[411px] text-sm leading-6 font-medium">
            This drop does not exist or was removed.
          </p>
          <Link
            href={DASHBOARD_PATHS.drops as Route}
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
            Back to drops
          </Link>
        </div>
      </Reveal>
    )
  }

  const heroSrc = claim.product.imageUrl ?? claim.product.iconUrl ?? '/icons/airbnb.svg'
  const markedAsUsed = markedUsedByDropClaimId[claim.id] === true
  const isExpired =
    claim.expiresAt != null &&
    !Number.isNaN(new Date(claim.expiresAt).getTime()) &&
    new Date(claim.expiresAt).getTime() <= Date.now()
  const statusLabel = markedAsUsed ? 'Used' : isExpired ? 'Expired' : 'Claimed'
  const statusIcon = markedAsUsed
    ? 'IconDoupleCheckmark2Small'
    : isExpired
      ? 'IconClockAlert'
      : 'IconCircleCheck'
  const redeemDisplay = claim.claimedContent.trim() || 'XXXXXXXXXXXXXXX'
  const isMultilineRedeem = redeemDisplay !== 'XXXXXXXXXXXXXXX' && redeemDisplay.includes('\n')

  const handleCopyRedeemCode = async () => {
    const code = redeemDisplay === 'XXXXXXXXXXXXXXX' ? '' : redeemDisplay
    if (!code) {
      toast.error('No redeem code available yet.')
      return
    }
    try {
      await navigator.clipboard.writeText(code)
      toast.success('Copied to clipboard', { description: code })
      setRedeemCodeCopied(true)
      if (redeemCopiedTimeoutRef.current) clearTimeout(redeemCopiedTimeoutRef.current)
      redeemCopiedTimeoutRef.current = setTimeout(() => setRedeemCodeCopied(false), 3000)
    } catch {
      toast.error('Could not copy. Please try again.')
    }
  }

  const handleCopyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success('Copied to clipboard', { description: `${label}: ${value}` })
    } catch {
      toast.error('Could not copy. Please try again.')
    }
  }

  return (
    <Reveal variant="fade-up" delay={140}>
      <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
        <article className="text-num-16 font-commissioner text-foreground border-border-subtle bg-card box-border flex w-full min-w-0 flex-col gap-8 rounded-xl border border-solid p-5 text-left sm:p-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16 dark:border-gray-600 dark:bg-gray-100 dark:text-white">
          <section className="flex w-full min-w-0 flex-col gap-5 lg:w-1/2">
            <div className="rounded-num-12 bg-card-elevated flex aspect-447/255 max-h-[255px] w-full items-center justify-center overflow-hidden dark:bg-[#051329]">
              <img
                className="max-h-full max-w-full object-contain object-center"
                alt=""
                src={heroSrc}
              />
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => setDropClaimMarkedUsed(claim.id, !markedAsUsed)}
                className="rounded-num-8 p-num-12 bg-active-bg text-foreground border-border-subtle box-border flex min-h-[52px] flex-1 items-center justify-center gap-3 border border-solid dark:border-gray-600 dark:bg-[#19263F] dark:text-white"
              >
                <CentralIcon
                  name="IconDoupleCheckmark2Small"
                  join="round"
                  fill="filled"
                  stroke="1"
                  radius="1"
                  size={18}
                  ariaHidden={true}
                  className="text-foreground dark:text-lightsteelblue-100 shrink-0"
                />
                <span className="tracking-num--0_01 leading-num-28 font-semibold">
                  {markedAsUsed ? 'Mark as Unused' : 'Mark as Used'}
                </span>
              </button>
            </div>
            <hr className="bg-divider h-px w-full border-0" aria-hidden />
            <section aria-labelledby="vouches-heading" className="flex flex-col gap-4">
              <div className="text-foreground/75 flex items-center gap-2 dark:text-white">
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

              <div className="border-border-subtle bg-card-elevated rounded-xl border border-solid p-4 dark:border-gray-600 dark:bg-gray-200">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-base font-bold uppercase dark:text-white">
                      {claim.variant.label}
                    </p>
                    <p className="text-muted-foreground dark:text-lightsteelblue-200 text-sm">
                      {claim.vouches.length} / 5 vouches posted
                    </p>
                  </div>
                  {claim.vouches.length < 5 && (
                    <button
                      onClick={() => setVouchModalOpen(true)}
                      className="bg-fuchsia/10 text-fuchsia hover:bg-fuchsia/20 rounded-lg px-3 py-1.5 text-sm font-bold transition-colors"
                    >
                      Add Vouch
                    </button>
                  )}
                </div>

                {claim.vouches.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {claim.vouches.map((vouch) => (
                      <div
                        key={vouch.id}
                        className="group bg-card relative h-20 w-20 overflow-hidden rounded-lg dark:bg-gray-100"
                      >
                        {vouch.imageUrl ? (
                          <Image src={vouch.imageUrl} alt="Vouch" fill className="object-cover" />
                        ) : null}
                        <button
                          onClick={async () => {
                            if (!confirm('Are you sure you want to delete this vouch?')) return
                            try {
                              await deleteDropClaimVouchAction(vouch.id)
                              toast.success('Vouch deleted')
                              await queryClient.invalidateQueries({
                                queryKey: DROPS_QUERY_KEYS.myDetail(claim.id),
                              })
                              await queryClient.invalidateQueries({
                                queryKey: DROPS_QUERY_KEYS.myList(),
                              })
                            } catch {
                              toast.error('Failed to delete vouch')
                            }
                          }}
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
                  <p className="text-muted-foreground/70 text-xs italic dark:text-white/30">
                    No vouches shared for this claim yet.
                  </p>
                )}
              </div>
            </section>

            <hr className="bg-divider h-px w-full border-0" aria-hidden />

            <div className="text-num-14 text-muted-foreground dark:text-lightsteelblue-200 flex w-full flex-wrap items-center justify-center gap-3">
              <span className="leading-num-20 font-semibold">Facing Issues?</span>
              <Link
                href={'/support' as Route}
                className="text-foreground dark:text-ghostwhite rounded-num-8 px-num-12 text-num-15_35 leading-num-21_93 bg-active-bg hover:bg-hover-bg flex items-center gap-2 py-1.5 font-semibold transition-colors dark:bg-[#19263F] dark:hover:bg-[#1f2d4a]"
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
          <div className="text-foreground dark:text-whitesmoke-100 flex min-w-0 flex-1 flex-col gap-6 sm:gap-8 lg:w-1/2 lg:text-[18px]">
            <header className="font-nata-sans flex flex-col gap-2 self-stretch">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="tracking-num-0_02 leading-8 font-extrabold uppercase">
                  {formatOrderBrandLabel(claim.product.name)}
                </h1>
                <div className="px-num-12 text-muted-foreground dark:text-lightsteelblue-100 font-commissioner bg-active-bg flex items-center gap-2 rounded-xl py-1.5 text-[13px] dark:bg-[#19263F]">
                  <CentralIcon
                    name={statusIcon as any}
                    join="round"
                    fill="filled"
                    stroke="1"
                    radius="1"
                    size={18}
                    ariaHidden={true}
                    className="shrink-0"
                  />
                  <span className="leading-num-20 font-semibold">{statusLabel}</span>
                </div>
              </div>
            </header>
            <div className="rounded-num-8 border-fuchsia font-nata-sans gap-num-15 flex flex-wrap items-center justify-center self-stretch border border-dashed p-6 text-[22px] [background:linear-gradient(180deg,rgba(235,45,255,0),rgba(235,45,255,0.25))] sm:p-9 sm:text-[24px]">
              {redeemCodeCopied ? (
                <span className="gap-num-15 flex items-center justify-center">
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
              ) : isMultilineRedeem ? (
                <pre className="tracking-num-0_02 max-h-[min(50vh,280px)] w-full min-w-0 flex-1 overflow-auto text-left text-base leading-relaxed font-extrabold break-words whitespace-pre-wrap text-white sm:text-lg">
                  {redeemDisplay}
                </pre>
              ) : (
                <span className="tracking-num-0_02 text-center leading-8 font-extrabold break-all uppercase">
                  {redeemDisplay}
                </span>
              )}
              <button
                type="button"
                onClick={handleCopyRedeemCode}
                className="focus-visible:ring-fuchsia/40 shrink-0 rounded-md p-1"
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
            <div className="text-num-16 text-foreground dark:text-ghostwhite flex flex-col gap-4 self-stretch">
              <div className="rounded-num-12 border-border-subtle bg-card-elevated box-border flex w-full flex-col items-start overflow-hidden border border-solid p-4 sm:p-5 dark:border-gray-600 dark:bg-gray-200">
                <button
                  type="button"
                  aria-expanded={isProcessOpen}
                  className="flex w-full items-center justify-between gap-0 self-stretch"
                  onClick={() => setIsProcessOpen((v) => !v)}
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
                    className="text-foreground opacity-75 transition-transform duration-300 ease-in-out dark:text-white"
                    style={{ transform: isProcessOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isProcessOpen ? '1fr' : '0fr' }}
                >
                  <div className="w-full overflow-hidden">
                    <div className="bg-border-subtle dark:bg-whitesmoke-300 relative left-1/2 mt-2 h-px w-screen -translate-x-1/2" />
                    <div className="pt-num-6 pb-num-6 w-full">
                      {claim.product.redeemProcess ? (
                        <p className="leading-num-24 whitespace-pre-wrap opacity-[0.8]">
                          {claim.product.redeemProcess}
                        </p>
                      ) : (
                        <div className="text-foreground flex flex-col items-start gap-5 dark:text-white">
                          <div className="leading-num-24 opacity-[0.8]">
                            <b>Step 1: Open Redeem Page</b>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">
                                Open the target redeem page and make sure you are signed in.
                              </li>
                            </ul>
                          </div>

                          <div className="leading-num-24 opacity-[0.8]">
                            <b>Step 2: Enter Code</b>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">
                                Copy your claim code and paste it into the redeem field.
                              </li>
                            </ul>
                          </div>

                          <div className="leading-num-24 opacity-[0.8]">
                            <b>Step 3: Confirm</b>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">
                                Submit the redeem form and verify the reward appears on your
                                account.
                              </li>
                              <li className="mb-0">
                                If it fails, contact support with your claim id and a screenshot.
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-num-12 border-border-subtle bg-card-elevated box-border flex w-full flex-col items-start overflow-hidden border border-solid p-4 sm:p-5 dark:border-gray-600 dark:bg-gray-200">
                <button
                  type="button"
                  aria-expanded={isWarrantyOpen}
                  className="flex w-full items-center justify-between gap-0 self-stretch"
                  onClick={() => setIsWarrantyOpen((v) => !v)}
                >
                  <b className="tracking-num--0_01 leading-num-28 flex-1 text-left">Warranty</b>
                  <CentralIcon
                    name="IconChevronDownMedium"
                    join="round"
                    fill="outlined"
                    stroke="1"
                    radius="1"
                    size={20}
                    className="text-foreground opacity-75 transition-transform duration-300 ease-in-out dark:text-white"
                    style={{ transform: isWarrantyOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isWarrantyOpen ? '1fr' : '0fr' }}
                >
                  <div className="w-full overflow-hidden">
                    <div className="bg-border-subtle dark:bg-whitesmoke-300 relative left-1/2 mt-2 h-px w-screen -translate-x-1/2" />
                    <div className="pt-num-6 pb-num-6 w-full">
                      {claim.product.warrantyText ? (
                        <p className="leading-num-24 whitespace-pre-wrap opacity-[0.8]">
                          {claim.product.warrantyText}
                        </p>
                      ) : (
                        <div className="text-foreground flex flex-col items-start gap-5 dark:text-white">
                          <div className="leading-num-24 opacity-[0.8]">
                            <b>Warranty Coverage</b>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">
                                If your claim code is invalid or blocked, we will help resolve it.
                              </li>
                            </ul>
                          </div>

                          <div className="leading-num-24 opacity-[0.8]">
                            <b>How to Request Help</b>
                            <p className="m-0">
                              Contact support within 48 hours and include the details below.
                            </p>
                            <ul className="m-0 list-none text-[length:inherit] [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:left-1 [&>li]:before:content-['•']">
                              <li className="mb-0">Claim ID and drop ID.</li>
                              <li>Screenshot of the redeem error.</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="bg-divider h-px w-full border-0" aria-hidden />
            <section className="flex flex-col gap-3">
              <div className="rounded-num-8 border-border-subtle bg-card-elevated py-num-10 px-num-12 flex min-h-[52px] min-w-0 flex-wrap items-center justify-between gap-3 border border-solid dark:border-gray-600 dark:bg-gray-200">
                <span className="text-muted-foreground dark:text-lightsteelblue-200 leading-num-20 font-semibold">
                  Claim ID
                </span>
                <button
                  type="button"
                  onClick={() => void handleCopyText(claim.id, 'Claim ID')}
                  className="text-num-16 tracking-num--0_01 text-foreground focus-visible:ring-fuchsia/40 flex max-w-full min-w-0 flex-1 items-center justify-end gap-2 rounded-md font-semibold dark:text-white"
                  aria-label={`Copy claim ID ${claim.id}`}
                >
                  <span className="min-w-0 truncate text-right">{claim.id}</span>
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
              <div className="rounded-num-8 border-border-subtle bg-card-elevated py-num-10 px-num-12 flex min-h-[52px] min-w-0 flex-wrap items-center justify-between gap-3 border border-solid dark:border-gray-600 dark:bg-gray-200">
                <span className="text-muted-foreground dark:text-lightsteelblue-200 leading-num-20 font-semibold">
                  Drop ID
                </span>
                <button
                  type="button"
                  onClick={() => void handleCopyText(claim.dropId, 'Drop ID')}
                  className="text-num-16 tracking-num--0_01 text-foreground focus-visible:ring-fuchsia/40 flex max-w-full min-w-0 flex-1 items-center justify-end gap-2 rounded-md font-semibold dark:text-white"
                  aria-label={`Copy drop ID ${claim.dropId}`}
                >
                  <span className="min-w-0 truncate text-right">{claim.dropId}</span>
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
              <div className="rounded-num-8 border-border-subtle bg-card-elevated py-num-10 px-num-12 flex min-h-[52px] min-w-0 flex-wrap items-center justify-between gap-3 border border-solid dark:border-gray-600 dark:bg-gray-200">
                <span className="text-muted-foreground dark:text-lightsteelblue-200 leading-num-20 font-semibold">
                  Claimed At
                </span>
                <span className="text-num-16 tracking-num--0_01 text-foreground max-w-full text-right font-semibold dark:text-white">
                  {new Date(claim.claimedAt).toLocaleString('en-US')}
                </span>
              </div>
              <div className="rounded-num-8 border-border-subtle bg-card-elevated py-num-10 px-num-12 flex min-h-[52px] min-w-0 flex-wrap items-center justify-between gap-3 border border-solid dark:border-gray-600 dark:bg-gray-200">
                <span className="text-muted-foreground dark:text-lightsteelblue-200 leading-num-20 font-semibold">
                  Variant
                </span>
                <span className="text-num-16 tracking-num--0_01 text-foreground max-w-full text-right font-semibold dark:text-white">
                  {claim.variant.label}
                </span>
              </div>
            </section>
          </div>
        </article>
        <VouchUploadModal
          target={{ type: 'drop-claim', dropClaimId: claim.id }}
          open={vouchModalOpen}
          onOpenChange={setVouchModalOpen}
        />
      </div>
    </Reveal>
  )
}

export default DashboardDropDetailPage
