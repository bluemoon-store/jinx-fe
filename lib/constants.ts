export const APP_NAME = 'Jinx.to'
export const APP_DESCRIPTION = 'Modern web application'

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'bluemoon_access_token',
  REFRESH_TOKEN: 'bluemoon_refresh_token',
} as const

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'access-token',
} as const

export const STORAGE_KEY = 'bluemoon-auth-storage'

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  DASHBOARD_ORDERS: '/dashboard/orders',
  LOGIN: '/login',
  REGISTER: '/register',
  SETTINGS: '/dashboard/general',
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const
