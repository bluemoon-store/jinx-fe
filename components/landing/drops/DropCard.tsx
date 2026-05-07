'use client'

import confetti from 'canvas-confetti'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
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
      <Card className="overflow-hidden border-border-subtle bg-card">
        <div className="aspect-[16/10] bg-[#0B1221]">
          {imageSrc ? (
            <img src={imageSrc} alt={drop.product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
              No image
            </div>
          )}
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm text-white/70">{drop.variant.label}</p>
              <h3 className="line-clamp-2 text-base font-semibold">{drop.product.name}</h3>
            </div>
            <Badge className="bg-green-500/20 text-green-300 hover:bg-green-500/20">LIVE</Badge>
          </div>
          <p className="text-sm text-white/75">Available Quantity {available}</p>
          <Button
            className="w-full"
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
            {alreadyClaimed ? 'Already claimed' : 'Claim Free Drop'}
          </Button>
        </div>
      </Card>

      <DropClaimSuccessModal open={modalOpen} claim={claimResult} onClose={() => setModalOpen(false)} />
    </>
  )
}
