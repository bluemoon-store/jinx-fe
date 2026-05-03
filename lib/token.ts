import { COOKIE_KEYS, TOKEN_KEYS } from './constants'

import type { AuthTokens } from '@/types/auth'

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN)
}

export function setTokens(tokens: AuthTokens): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, tokens.accessToken)
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, tokens.refreshToken)
  document.cookie = `${COOKIE_KEYS.ACCESS_TOKEN}=${tokens.accessToken}; path=/; SameSite=Lax`
  window.dispatchEvent(new Event('bm-access-token-changed'))
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN)
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN)
  document.cookie = `${COOKIE_KEYS.ACCESS_TOKEN}=; path=/; max-age=0; SameSite=Lax`
  window.dispatchEvent(new Event('bm-access-token-changed'))
}
