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
  twoFactorEnabled?: boolean
  createdAt: string
  updatedAt: string
}

export interface Session {
  user: User
  token: string
  expiresAt: string
}
