import type { User } from './api'

export interface BackendResponse<T> {
  statusCode: number
  message: string
  data: T
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse extends AuthTokens {
  user: User
}

export interface TwoFactorChallengeResponse {
  requiresTwoFactor: true
  twoFactorToken: string
}

export type LoginApiResponse = AuthResponse | TwoFactorChallengeResponse

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

/** Token from email link — POST /auth/reset-password-link */
export interface ResetPasswordLinkPayload {
  token: string
  newPassword: string
}

export interface Setup2FAPayload {
  password: string
}

export interface Setup2FAResponse {
  secret: string
  qrCode: string
  otpAuthUrl: string
}

export interface Verify2FAPayload {
  code: string
}

export interface Disable2FAPayload {
  password: string
  code: string
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

export interface DeleteAccountPayload {
  password: string
}
