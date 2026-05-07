'use client'

import { DashboardDropsSection } from '@/components/dashboard/drops/DashboardDropsSection'
import { Reveal } from '@/components/ui/reveal'
import type { FunctionComponent } from 'react'

const DashboardDropsPage: FunctionComponent = () => (
  <Reveal variant="fade-up" delay={140}>
    <DashboardDropsSection />
  </Reveal>
)

export default DashboardDropsPage
