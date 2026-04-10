import { isAxiosError } from 'axios'

/**
 * Extracts a user-facing message from any thrown value.
 *
 * BE error shape:
 *   { statusCode, message, timestamp, error }
 *
 * Priority:
 *   1. BE `message` field (already human-readable)
 *   2. Network / timeout heuristics
 *   3. Generic fallback
 */
export function parseApiError(error: unknown): string {
  if (isAxiosError(error)) {
    // BE responded with a structured error body
    const msg: unknown = error.response?.data?.message
    if (typeof msg === 'string' && msg.trim()) return msg.trim()

    // Array of validation messages (class-validator)
    if (Array.isArray(msg) && msg.length > 0) return String(msg[0])

    // Network / timeout
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return 'Unable to reach the server. Check your connection.'
    }
    if (error.code === 'ECONNABORTED') return 'Request timed out. Please try again.'

    // HTTP status fallbacks
    const status = error.response?.status
    if (status === 429) return 'Too many requests. Please slow down.'
    if (status === 500) return 'Something went wrong on our end. Try again later.'
    if (status === 503) return 'Service temporarily unavailable. Try again later.'
  }

  if (error instanceof Error && error.message) return error.message

  return 'An unexpected error occurred.'
}
