'use client'

import confetti from 'canvas-confetti'
import CentralIcon from '@central-icons-react/all'
import type { Route } from 'next'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useClaimDropMutation, useMyDropsQuery } from '@/hooks/use-drops'
import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import type { DropClaimResult, PublicDrop } from '@/types/drops'
import { DropClaimSuccessModal } from './DropClaimSuccessModal'

function pickImage(drop: PublicDrop): string | null {
  const images = drop.product.images ?? []
  const primary = images.find((img) => img.isPrimary && img.url)?.url
  return primary ?? images[0]?.url ?? drop.product.iconUrl ?? null
}

function fireDropConfetti() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return
  confetti({
    particleCount: 150,
    spread: 60,
    origin: { x: 0.5, y: 0.25 },
    zIndex: 70,
  })
}

type Props = {
  drop: PublicDrop
}

export function DropCard({ drop }: Props) {
  const claimMutation = useClaimDropMutation()
  const { data: myClaims } = useMyDropsQuery()
  const [claimResult, setClaimResult] = useState<DropClaimResult | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const available = Math.max(0, drop.quantity - drop.claimedCount)
  const imageSrc = useMemo(() => pickImage(drop), [drop])
  const alreadyClaimed = Boolean(drop.hasClaimed)
  const claimIdForDrop = useMemo(
    () => myClaims?.find((c) => c.dropId === drop.id)?.id,
    [myClaims, drop.id]
  )
  const dropDetailHref = useMemo((): Route => {
    if (claimIdForDrop) return `/dashboard/drops/${claimIdForDrop}` as Route
    return DASHBOARD_PATHS.drops as Route
  }, [claimIdForDrop])
  const dropDetailVouchHref = useMemo((): Route => {
    if (claimIdForDrop) return `/dashboard/drops/${claimIdForDrop}#vouches-heading` as Route
    return DASHBOARD_PATHS.drops as Route
  }, [claimIdForDrop])

  return (
    <>
      <Card className="border-fuchsia font-commissioner relative flex w-full flex-col gap-6 overflow-hidden border bg-gray-100 p-6 text-center text-sm text-white shadow-[0px_0px_0px_5px_rgba(235,45,255,0.25)] md:flex-row md:items-stretch">
        <div className="h-[200px] w-full shrink-0 overflow-hidden rounded-lg bg-[#0b1221] shadow-[0px_0px_8.63px_rgba(0,0,0,0.6)] md:h-auto md:w-1/2">
          {imageSrc ? (
            <img src={imageSrc} alt={drop.product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col items-start justify-center gap-6">
          <div className="flex flex-col items-start justify-center gap-2.5">
            <div className="flex flex-col items-start gap-2.5">
              <div className="flex items-center justify-center gap-2 rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.14))] px-2 py-1">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[rgba(255,42,42,0.125)]">
                  <div className="h-2 w-2 rounded-full bg-[#ff2a2a]" />
                </div>
                <b className="[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">LIVE</b>
              </div>
              <div className="font-nata-sans text-ghostwhite text-left text-xl font-extrabold tracking-[0.02em] uppercase">
                {drop.product.name}
              </div>
            </div>

            <div className="text-whitesmoke-200/75 flex items-center justify-center gap-[5px] text-base">
              <div className="leading-6 font-medium [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                Available Quantity
              </div>
              <div className="flex items-center justify-center rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.14))] px-1.5 py-0 text-white">
                <b className="leading-6 [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
                  {available}
                </b>
              </div>
            </div>
          </div>

          {alreadyClaimed ? (
            <div className="flex w-full flex-col gap-4">
              <Link
                href={dropDetailHref}
                className="border-whitesmoke-300 group flex w-full min-h-[52px] items-center justify-between gap-3 rounded-lg border bg-gray-200 px-3 py-2.5 transition-colors hover:bg-gray-700 sm:px-4"
              >
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                    <CentralIcon
                      name="IconCheckCircle2"
                      join="round"
                      fill="filled"
                      stroke="2"
                      radius="1"
                      size={22}
                      ariaHidden
                      className="shrink-0 text-[#0b1221]"
                    />
                  </span>
                  <span className="text-lightsteelblue-100 text-left text-sm leading-snug font-semibold sm:text-base">
                    You have already claimed this drop
                  </span>
                </span>
                <CentralIcon
                  name="IconChevronRightMedium"
                  join="round"
                  fill="outlined"
                  stroke="1"
                  radius="1"
                  size={18}
                  className="text-lightsteelblue-200 shrink-0 transition-transform group-hover:translate-x-0.5"
                  ariaHidden
                />
              </Link>

              <div className="border-white/10 flex w-full flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <p className="text-lightsteelblue-200 text-left text-sm leading-snug font-medium">
                  Add a vouch to get another chance to claim the drop
                </p>
                <Link
                  href={dropDetailVouchHref}
                  className="bg-fuchsia hover:bg-fuchsia inline-flex h-[38px] w-full shrink-0 items-center justify-center gap-2 rounded-lg px-4 pt-px pb-0.5 text-sm font-semibold tracking-[-0.01em] text-white shadow-[0px_2px_0px_rgba(235,45,255,0.25)] transition-opacity hover:opacity-90 sm:w-auto sm:min-w-[148px]"
                >
                  <CentralIcon
                    name="IconReceiptBill"
                    join="round"
                    fill="filled"
                    stroke="2"
                    radius="1"
                    size={18}
                    color="#FFFFFF"
                    ariaHidden
                  />
                  Add vouch
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex w-full items-start text-left">
              <Button
                className="bg-fuchsia hover:bg-fuchsia h-[38px] w-full gap-2 rounded-lg px-3 pt-px pb-0.5 tracking-[-0.01em] shadow-[0px_2px_0px_rgba(235,45,255,0.25)] transition-opacity hover:opacity-90"
                disabled={claimMutation.isPending}
                onClick={() => {
                  claimMutation.mutate(drop.id, {
                    onSuccess: (result) => {
                      setClaimResult(result)
                      setModalOpen(true)
                      fireDropConfetti()
                    },
                  })
                }}
              >
                <CentralIcon
                  name="IconAirdrop2"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={18}
                  color="#FFFFFF"
                  ariaHidden
                />
                Claim Free Drop
                <ChevronRight className="h-[14px] w-[14px]" />
              </Button>
            </div>
          )}
        </div>
      </Card>

      <DropClaimSuccessModal
        open={modalOpen}
        claim={claimResult}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
