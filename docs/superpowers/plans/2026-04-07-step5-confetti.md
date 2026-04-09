# Step 5 Confetti Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a lightweight confetti effect on checkout success (step=5), firing once on enter and again when the user clicks “CLICK TO UNSEAL”.

**Architecture:** Render a client-only `ConfettiCanvas` overlay only on step=5, expose an imperative `fire()` API, and call it from `CheckoutPageClient` (on enter) and from `Step5Success` (on unseal click). Auto-stop after 1.5s and cleanup RAF/timeouts; respect `prefers-reduced-motion`.

**Tech Stack:** React (Next.js client components), Canvas 2D, Tailwind classes.

---

### Task 1: Confetti overlay component

**Files:**

- Create: `components/checkout/shared/ConfettiCanvas.tsx`

- [ ] **Step 1: Create `ConfettiCanvas` with imperative `fire()`**

Create a client component that renders a `canvas` as a fixed overlay.
It should export `ConfettiCanvas` (forwardRef) and `ConfettiHandle`:

```tsx
export type ConfettiHandle = { fire: () => void }
export const ConfettiCanvas = forwardRef<ConfettiHandle, { durationMs?: number }>(...)
```

Implementation requirements:

- Uses `requestAnimationFrame` loop and stops after `durationMs` (default 1500ms)
- Calls `window.matchMedia('(prefers-reduced-motion: reduce)')` and no-ops when true
- Scales for DPR and resizes on window resize
- `canvas` should be `pointer-events-none`, `fixed inset-0`, and high z-index

- [ ] **Step 2: Minimal manual check**

Run dev server and verify canvas does not block clicks.

---

### Task 2: Fire on step=5 enter

**Files:**

- Modify: `components/checkout/CheckoutPageClient.tsx`

- [ ] **Step 1: Mount `ConfettiCanvas` only for `step === 5`**
- [ ] **Step 2: Use `useEffect` to call `fire()` once on enter**

Acceptance:

- Visiting `/checkout?step=5` fires confetti one time.
- Navigating away/back re-fires once per entry.

---

### Task 3: Fire on “CLICK TO UNSEAL”

**Files:**

- Modify: `components/checkout/steps/Step5Success.tsx`

- [ ] **Step 1: Add optional callback prop**

```tsx
export function Step5Success({ onUnseal }: { onUnseal?: () => void }) { ... }
```

- [ ] **Step 2: Make the sealed “CLICK TO UNSEAL” container clickable**

Convert that block to a `button type="button"` (keep same styles) and call `onUnseal?.()` on click.

Acceptance:

- Clicking “CLICK TO UNSEAL” triggers confetti again.

---

### Task 4: Quick QA checklist

- [ ] **Reduced motion**: If OS setting “Reduce motion” is enabled, confetti does not run.
- [ ] **Cleanup**: No runaway timers/RAF after effect ends.
- [ ] **Visual**: Confetti is visible over the success page but doesn’t change layout.
