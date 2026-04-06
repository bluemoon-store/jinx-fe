import { create } from 'zustand'

export type BuyerProtectionCoverage = 'enhanced' | 'basic'

type BuyerProtectionState = {
  coverage: BuyerProtectionCoverage
  setCoverage: (coverage: BuyerProtectionCoverage) => void
}

/**
 * Shared store for buyer protection selection across checkout steps.
 * Used by both the right panel (selection UI) and left panel (totals).
 */
export const useBuyerProtectionStore = create<BuyerProtectionState>()((set) => ({
  coverage: 'enhanced',
  setCoverage: (coverage) => set({ coverage }),
}))

