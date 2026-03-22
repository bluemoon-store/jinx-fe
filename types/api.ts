export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'moderator'
  /** When true, account has TOTP 2FA enabled (optional until backend sends it). */
  twoFactorEnabled?: boolean
  createdAt: string
  updatedAt: string
}

export interface Session {
  user: User
  token: string
  expiresAt: string
}
