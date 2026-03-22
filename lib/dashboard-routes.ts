/** Dashboard URL segments — use with pathname, not selection state. */
export const DASHBOARD_PATHS = {
  orders: '/dashboard/orders',
  drops: '/dashboard/drops',
  wallet: '/dashboard/wallet',
  reviews: '/dashboard/reviews',
  general: '/dashboard/general',
  security: '/dashboard/security',
  deletion: '/dashboard/deletion',
} as const

export type DashboardPath = (typeof DASHBOARD_PATHS)[keyof typeof DASHBOARD_PATHS]
