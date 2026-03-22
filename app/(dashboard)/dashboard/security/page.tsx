'use client'

import { DashboardSecuritySection } from '@/components/dashboard/DashboardSecuritySection'
import { Reveal } from '@/components/ui/reveal'
import type { FunctionComponent } from 'react'

const DashboardSecurityPage: FunctionComponent = () => (
  <Reveal variant="fade-up" delay={140}>
    <DashboardSecuritySection />
  </Reveal>
)

export default DashboardSecurityPage
