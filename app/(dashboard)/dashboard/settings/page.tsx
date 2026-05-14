'use client'

import { DashboardGeneralSection } from '@/components/dashboard/DashboardGeneralSection'
import { DashboardSecuritySection } from '@/components/dashboard/DashboardSecuritySection'
import { DashboardDeletionSection } from '@/components/dashboard/DashboardDeletionSection'
import { Reveal } from '@/components/ui/reveal'
import type { FunctionComponent } from 'react'

const DashboardSettingsPage: FunctionComponent = () => (
  <div className="flex flex-col gap-12 sm:gap-16">
    <Reveal variant="fade-up" delay={140}>
      <DashboardGeneralSection />
    </Reveal>
    <Reveal variant="fade-up" delay={200}>
      <div className="bg-divider h-px w-full" />
    </Reveal>
    <Reveal variant="fade-up" delay={260}>
      <DashboardSecuritySection />
    </Reveal>
    <Reveal variant="fade-up" delay={320}>
      <div className="bg-divider h-px w-full" />
    </Reveal>
    <Reveal variant="fade-up" delay={380}>
      <DashboardDeletionSection />
    </Reveal>
  </div>
)

export default DashboardSettingsPage
