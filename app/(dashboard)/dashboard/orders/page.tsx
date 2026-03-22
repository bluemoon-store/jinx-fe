'use client'

import { DashboardOrdersSection } from '@/components/dashboard/DashboardOrdersSection'
import { Reveal } from '@/components/ui/reveal'
import type { FunctionComponent } from 'react'

const DashboardOrdersPage: FunctionComponent = () => (
  <Reveal variant="fade-up" delay={140}>
    <DashboardOrdersSection />
  </Reveal>
)

export default DashboardOrdersPage
