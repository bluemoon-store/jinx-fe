import { api } from '@/lib/api'
import { clearTokens } from '@/lib/token'
import type { LoginInput, RegisterInput } from '@/lib/validations'
import type { User } from '@/types/api'
import type {
  AuthResponse,
  BackendResponse,
  ForgotPasswordPayload,
  RefreshResponse,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from '@/types/auth'
type BackendUser = Omit<User, 'name'> & { name?: string }

function mapUser(beUser: BackendUser): User {
  return {
    ...beUser,
    name:
      [beUser.firstName, beUser.lastName].filter(Boolean).join(' ').trim() || beUser.userName || '',
  }
}

export async function loginAction(data: LoginInput): Promise<AuthResponse> {
  const res = await api.post<BackendResponse<{ accessToken: string; refreshToken: string; user: BackendUser }>>(
    '/auth/login',
    { email: data.email, password: data.password }
  )
  const { accessToken, refreshToken, user } = res.data.data
  return { accessToken, refreshToken, user: mapUser(user) }
}

export async function registerAction(data: RegisterInput): Promise<AuthResponse> {
  const res = await api.post<BackendResponse<{ accessToken: string; refreshToken: string; user: BackendUser }>>(
    '/auth/signup',
    { email: data.email, password: data.password }
  )
  const { accessToken, refreshToken, user } = res.data.data
  return { accessToken, refreshToken, user: mapUser(user) }
}

export async function logoutAction(): Promise<void> {
  clearTokens()
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
  const res = await api.get<BackendResponse<RefreshResponse>>('/auth/refresh-token', {
    headers: { Authorization: `Bearer ${refreshToken}` },
  })
  return res.data.data
}

export async function getCurrentUserAction(): Promise<User> {
  const res = await api.get<BackendResponse<BackendUser>>('/user/profile')
  return mapUser(res.data.data)
}
