'use client'

import { DashboardDeletionSection } from '@/components/dashboard/DashboardDeletionSection'
import { Reveal } from '@/components/ui/reveal'
import type { FunctionComponent } from 'react'

const DashboardDeletionPage: FunctionComponent = () => (
  <Reveal variant="fade-up" delay={140}>
    <DashboardDeletionSection />
  </Reveal>
)

export default DashboardDeletionPage
