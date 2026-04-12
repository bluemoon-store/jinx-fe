import { api } from '@/lib/api'
import { clearTokens } from '@/lib/token'
import type { LoginInput, RegisterInput } from '@/lib/validations'
import type { User } from '@/types/api'
import type {
  AuthResponse,
  BackendResponse,
  ChangePasswordPayload,
  DeleteAccountPayload,
  ForgotPasswordPayload,
  LoginApiResponse,
  RefreshResponse,
  ResetPasswordLinkPayload,
  ResetPasswordPayload,
  Setup2FAPayload,
  Setup2FAResponse,
  Verify2FAPayload,
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

type LoginBackendPayload =
  | { accessToken: string; refreshToken: string; user: BackendUser }
  | { requiresTwoFactor: true; twoFactorToken: string }

export async function loginAction(data: LoginInput): Promise<LoginApiResponse> {
  const res = await api.post<BackendResponse<LoginBackendPayload>>('/auth/login', {
    email: data.email,
    password: data.password,
  })
  const payload = res.data.data
  if ('requiresTwoFactor' in payload) {
    return { requiresTwoFactor: true, twoFactorToken: payload.twoFactorToken }
  }
  const { accessToken, refreshToken, user } = payload
  return { accessToken, refreshToken, user: mapUser(user) }
}

export async function verify2FALoginAction(
  twoFactorToken: string,
  code: string
): Promise<AuthResponse> {
  const res = await api.post<
    BackendResponse<{ accessToken: string; refreshToken: string; user: BackendUser }>
  >('/auth/2fa/verify-login', { twoFactorToken, code })
  const { accessToken, refreshToken, user } = res.data.data
  return { accessToken, refreshToken, user: mapUser(user) }
}

export async function registerAction(data: RegisterInput): Promise<AuthResponse> {
  const res = await api.post<
    BackendResponse<{ accessToken: string; refreshToken: string; user: BackendUser }>
  >('/auth/signup', { email: data.email, password: data.password })
  const { accessToken, refreshToken, user } = res.data.data
  return { accessToken, refreshToken, user: mapUser(user) }
}

export async function logoutAction(): Promise<void> {
  clearTokens()
}

export async function forgotPasswordAction(payload: ForgotPasswordPayload): Promise<void> {
  await api.post('/auth/forgot-password', payload)
}

/** Security dashboard — sends reset link email (does not use OTP /forgot-password). */
export async function forgotPasswordLinkAction(payload: ForgotPasswordPayload): Promise<void> {
  await api.post('/auth/forgot-password-link', payload)
}

export async function verifyOtpAction(payload: VerifyOtpPayload): Promise<void> {
  await api.post('/auth/verify-otp', payload)
}

export async function resetPasswordAction(payload: ResetPasswordPayload): Promise<void> {
  await api.post('/auth/reset-password', payload)
}

export async function resetPasswordLinkAction(payload: ResetPasswordLinkPayload): Promise<void> {
  await api.post('/auth/reset-password-link', payload)
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

export async function setup2FAAction(password: string): Promise<Setup2FAResponse> {
  const payload: Setup2FAPayload = { password }
  const res = await api.post<BackendResponse<Setup2FAResponse>>('/auth/2fa/setup', payload)
  return res.data.data
}

export async function verify2FAAction(code: string): Promise<void> {
  const payload: Verify2FAPayload = { code }
  await api.post('/auth/2fa/verify', payload)
}

export async function disable2FAAction(password: string, code: string): Promise<void> {
  await api.delete('/auth/2fa', { data: { password, code } })
}

export async function deleteAccountAction(password: string): Promise<void> {
  const payload: DeleteAccountPayload = { password }
  await api.delete('/user', { data: payload })
}

export async function changePasswordAction(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const payload: ChangePasswordPayload = { currentPassword, newPassword }
  await api.put('/auth/change-password', payload)
}

export async function sendVerificationEmailAction(): Promise<void> {
  await api.post('/auth/send-verification-email')
}

export async function verifyEmailAction(token: string): Promise<void> {
  await api.get('/auth/verify-email', { params: { token } })
}
