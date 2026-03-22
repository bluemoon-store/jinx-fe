import { DASHBOARD_PATHS } from '@/lib/dashboard-routes'
import type { Route } from 'next'
import { redirect } from 'next/navigation'

export default function DashboardIndexPage() {
  redirect(DASHBOARD_PATHS.orders as Route)
}
