import { api } from '@/lib/api'
import { getRefreshToken } from '@/lib/token'
import type { LoginInput, RegisterInput } from '@/lib/validations'
import type { ApiResponse } from '@/types/api'
import type {
  AuthResponse,
  ForgotPasswordPayload,
  RefreshResponse,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from '@/types/auth'

export async function loginAction(data: LoginInput): Promise<AuthResponse> {
  const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', data)
  return res.data.data
}

export async function registerAction(data: RegisterInput): Promise<AuthResponse> {
  const { termsAccepted: _terms, ...payload } = data
  const res = await api.post<ApiResponse<AuthResponse>>('/auth/register', payload)
  return res.data.data
}

export async function logoutAction(): Promise<void> {
  const refreshToken = getRefreshToken()
  await api.post('/auth/logout', { refreshToken })
}

export async function forgotPasswordAction(payload: ForgotPasswordPayload): Promise<void> {
  await api.post('/auth/forgot-password', payload)
}

export async function verifyOtpAction(payload: VerifyOtpPayload): Promise<void> {
  await api.post('/auth/verify-otp', payload)
}

export async function resetPasswordAction(payload: ResetPasswordPayload): Promise<void> {
  await api.post('/auth/reset-password', payload)
}

export async function refreshTokenAction(refreshToken: string): Promise<RefreshResponse> {
  const res = await api.post<ApiResponse<RefreshResponse>>('/auth/refresh', { refreshToken })
  return res.data.data
}
