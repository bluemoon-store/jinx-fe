# Fake Toast (Info) — Dashboard General Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trigger **info** toasts for actions A/B/C in `DashboardGeneralSection` (fake UI-only feedback).

**Architecture:** Keep logic local to the component. Use the existing `Toaster` setup and `toast` export from `lib/toast.ts` to ensure consistent styling across the app.

**Tech Stack:** Next.js (App Router), React, TypeScript, Sonner (`sonner`), `next-themes`.

---

## File Structure / Touchpoints

- Modify: `components/dashboard/DashboardGeneralSection.tsx`
- Use: `lib/toast.ts` (already exports `toast` and `createActionThrottle`)
- No changes required: `components/layouts/providers.tsx`, `components/ui/sonner.tsx`

---

### Task 1: Add toast triggers for avatar buttons (A)

**Files:**
- Modify: `components/dashboard/DashboardGeneralSection.tsx`

- [ ] **Step 1: Add toast import**

Add:

```ts
import { toast } from '@/lib/toast'
```

- [ ] **Step 2: Wire the Remove button (A)**

Add `onClick` to the **Remove** button:

```tsx
onClick={() => {
  toast.info('Avatar removed', {
    description: 'This is a demo toast (no API call yet).',
  })
}}
```

- [ ] **Step 3: (Optional) Wire Upload button as info toast**

If we want consistent fake feedback for **Upload** too, add:

```tsx
toast.info('Upload avatar', { description: 'This is a demo toast (no API call yet).' })
```

If not requested, skip.

- [ ] **Step 4: Manual check**

Run dev server (if not already) and click **Remove**.
Expected: an info toast appears (top-right).

---

### Task 2: Add toast trigger for resend verification (B)

**Files:**
- Modify: `components/dashboard/DashboardGeneralSection.tsx`

- [ ] **Step 1: Wire the Resend Verification button (B)**

Add `onClick`:

```tsx
onClick={() => {
  toast.info('Verification email sent', {
    description: 'Check your inbox (demo).',
  })
}}
```

- [ ] **Step 2: Manual check**

Click **Resend Verification**.
Expected: info toast appears.

---

### Task 3: Add toast trigger for theme preference (C)

**Files:**
- Modify: `components/dashboard/DashboardGeneralSection.tsx`

- [ ] **Step 1: Add a small helper to map theme label**

Inside the component:

```ts
function themeLabel(t: 'dark' | 'light' | 'system') {
  return t === 'dark' ? 'Dark' : t === 'light' ? 'Light' : 'System'
}
```

- [ ] **Step 2: After each `setTheme(...)`, show toast**

For each theme button:

```tsx
onClick={() => {
  setTheme('dark')
  toast.info('Theme updated', { description: 'Switched to Dark.' })
}}
```

Repeat for Light/System using `themeLabel(...)` to avoid duplication.

- [ ] **Step 3: Manual check**

Click each theme option.
Expected: theme changes as before and info toast message reflects the selected option.

---

### Task 4: Quality gate (types/lints) and verification

**Files:**
- Modify: `components/dashboard/DashboardGeneralSection.tsx`

- [ ] **Step 1: Typecheck/lint**

Run the repo’s lint/typecheck commands (use whichever are standard in this repo):

- `npm run lint` (or `yarn lint`)
- `npm run typecheck` (if available)

Expected: no new errors.

- [ ] **Step 2: Commit**

```bash
git add components/dashboard/DashboardGeneralSection.tsx
git commit -m "feat: trigger info toasts for dashboard general actions"
```

---

## Notes / Trade-offs

- If toast spamming becomes an issue, wrap each handler with:
  - `const canToast = createActionThrottle(750)` and guard before calling `toast.info(...)`.
- The actions remain “fake” until backend wiring is added later.

