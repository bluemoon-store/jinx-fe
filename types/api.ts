export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
}

export interface User {
  id: string
  email: string
  userName: string
  firstName?: string
  lastName?: string
  name: string
  avatar?: string
  role: 'ADMIN' | 'USER' | 'MODERATOR' | 'MANAGER' | 'DEVELOPER'
  isVerified?: boolean
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
