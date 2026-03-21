import { DashboardAuthGuard } from '@/components/layouts/DashboardAuthGuard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardAuthGuard>
      <div className="flex min-h-screen w-full flex-col">{children}</div>
    </DashboardAuthGuard>
  )
}
