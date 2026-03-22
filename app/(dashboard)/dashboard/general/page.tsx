'use client'

import { DashboardGeneralSection } from '@/components/dashboard/DashboardGeneralSection'
import { Reveal } from '@/components/ui/reveal'
import type { FunctionComponent } from 'react'

const DashboardGeneralPage: FunctionComponent = () => (
  <Reveal variant="fade-up" delay={140}>
    <DashboardGeneralSection />
  </Reveal>
)

export default DashboardGeneralPage
