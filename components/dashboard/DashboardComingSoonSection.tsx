import { Reveal } from '@/components/ui/reveal'
import type { FunctionComponent, ReactNode } from 'react'

type Props = {
  /** e.g. "Orders" — shown in the sentence */
  highlightLabel?: ReactNode
}

export const DashboardComingSoonSection: FunctionComponent<Props> = ({
  highlightLabel = 'Orders',
}) => (
  <Reveal variant="fade-up" delay={220}>
    <div className="flex flex-1 flex-col items-center justify-center py-12 sm:py-16">
      <p className="text-lightsteelblue-100 sm:text-num-14 max-w-md text-center text-sm leading-6">
        This section is coming soon. Choose{' '}
        <span className="text-ghostwhite font-semibold">{highlightLabel}</span> to view your
        purchases.
      </p>
    </div>
  </Reveal>
)
