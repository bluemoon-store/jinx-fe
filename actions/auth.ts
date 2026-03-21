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

// TODO: remove mock when API is ready
const MOCK_AUTH = true

const MOCK_RESPONSE: AuthResponse = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  user: {
    id: 'mock-user-1',
    name: 'Mock User',
    email: 'mock@bluemoon.dev',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
}

export async function loginAction(data: LoginInput): Promise<AuthResponse> {
  if (MOCK_AUTH) return MOCK_RESPONSE // TODO: remove when API ready
  const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', data)
  return res.data.data
}

export async function registerAction(data: RegisterInput): Promise<AuthResponse> {
  if (MOCK_AUTH) return MOCK_RESPONSE // TODO: remove when API ready
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
