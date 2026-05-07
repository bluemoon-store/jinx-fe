'use client'

import confetti from 'canvas-confetti'
import CentralIcon from '@central-icons-react/all'
import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useClaimDropMutation } from '@/hooks/use-drops'
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
  const [claimResult, setClaimResult] = useState<DropClaimResult | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const available = Math.max(0, drop.quantity - drop.claimedCount)
  const imageSrc = useMemo(() => pickImage(drop), [drop])
  const alreadyClaimed = Boolean(drop.hasClaimed)

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

          <div className="flex w-full items-start text-left">
            <Button
              className="bg-fuchsia hover:bg-fuchsia h-[38px] w-full gap-2 rounded-lg px-3 pt-px pb-0.5 tracking-[-0.01em] shadow-[0px_2px_0px_rgba(235,45,255,0.25)] transition-opacity hover:opacity-90"
              disabled={claimMutation.isPending || alreadyClaimed}
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
              {alreadyClaimed ? 'Already claimed' : 'Claim Free Drop'}
              <ChevronRight className="h-[14px] w-[14px]" />
            </Button>
          </div>
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
