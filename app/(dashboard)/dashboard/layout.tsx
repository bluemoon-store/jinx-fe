import { DashboardLayoutShell } from '@/components/dashboard/DashboardLayoutShell'
import type { ReactNode } from 'react'

export default function DashboardSegmentLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutShell>{children}</DashboardLayoutShell>
}
