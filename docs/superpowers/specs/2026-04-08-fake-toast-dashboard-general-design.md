# Fake toasts (info) — Dashboard General

## Context

We want to add **fake toast** notifications (UI-only, no backend/API calls) for actions in `DashboardGeneralSection` on the Dashboard → General page.

The app already uses **Sonner** via:

- `components/layouts/providers.tsx` rendering `<Toaster />`
- `components/ui/sonner.tsx` providing styling
- `lib/toast.ts` re-exporting `toast` from `sonner`

## Goals

- Trigger a toast for each action:
  - **A**: Avatar **Remove** button
  - **B**: Email **Resend Verification** button
  - **C**: Theme preference changes (**Dark / Light / System**)
- All toasts should be **info** variant.
- Keep this change **non-invasive**:
  - no API calls
  - no data persistence
  - no visual redesign (use existing Toaster styling)

## Non-goals

- Implementing avatar upload/remove backend.
- Implementing resend verification email backend.
- Adding success/error handling for real server responses.

## UX / Behavior

### A — Remove avatar

On clicking **Remove**:

- Show `toast.info(...)`
- Suggested content:
  - title: `Avatar removed`
  - description: `This is a demo toast (no API call yet).`

### B — Resend verification

On clicking **Resend Verification**:

- Show `toast.info(...)`
- Suggested content:
  - title: `Verification email sent`
  - description: `Check your inbox (demo).`

### C — Theme preference

On clicking **Dark / Light / System**:

- Call `setTheme(<choice>)` as it already does
- Then show `toast.info(...)`
- Suggested content:
  - title: `Theme updated`
  - description: `Switched to Dark/Light/System.`

## Implementation Notes

- Use `toast` via `import { toast } from '@/lib/toast'` inside `components/dashboard/DashboardGeneralSection.tsx`.
- Optionally use `createActionThrottle` (already in `lib/toast.ts`) to prevent spamming toasts on rapid clicks; default implementation can ship without throttle unless UX demands it.

## Acceptance Criteria

- Clicking **Remove** shows an **info** toast.
- Clicking **Resend Verification** shows an **info** toast.
- Clicking any theme option updates theme as before and shows an **info** toast describing the selected theme.
- No TypeScript or lint issues introduced.
