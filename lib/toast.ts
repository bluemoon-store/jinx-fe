import { toast } from 'sonner'

// Shared helper for enforcing a minimum delay between actions
export function createActionThrottle(minDelayMs: number) {
  let lastTriggeredAt = 0

  return function canTrigger() {
    const now = Date.now()
    if (now - lastTriggeredAt < minDelayMs) {
      return false
    }
    lastTriggeredAt = now
    return true
  }
}

export { toast }
