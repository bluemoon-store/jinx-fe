import type { User } from './api'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse extends AuthTokens {
  user: User
}

export interface RefreshResponse extends AuthTokens {}

export interface ForgotPasswordPayload {
  email: string
}

export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface ResetPasswordPayload {
  email: string
  otp: string
  newPassword: string
}
