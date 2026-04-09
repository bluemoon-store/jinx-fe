# TwoFactor Enable Modal “Click to Copy Key” Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the “Key” gray row in `TwoFactorEnableModal` copy the 2FA key on click and temporarily replace its contents with a centered check icon + “Copied”.

**Architecture:** Implement a local transient UI state (`copied`) inside `TwoFactorEnableModal` that triggers `navigator.clipboard.writeText(key)` and swaps the row’s render output for ~1200ms; includes keyboard accessibility and an `aria-live` status.

**Tech Stack:** React (Next.js client component), TypeScript, Tailwind classes, `@central-icons-react/all`.

---

## File structure

**Modify:**

- `components/auth/TwoFactorEnableModal.tsx`: Add copy handler + copied state; render Key row as a semantic button with conditional content (key vs “Copied” state).

**Docs (already written):**

- `docs/superpowers/specs/2026-04-08-twofactor-enable-modal-click-to-copy-key-spec.md`

## Task 1: Add “Copied” state + clipboard copy handler

**Files:**

- Modify: `components/auth/TwoFactorEnableModal.tsx`

- [ ] **Step 1: Add state + timeout ref**
  - Add `copied` boolean state.
  - Add a `timeoutRef` to reset the copied state after ~1200ms.
  - Add cleanup on unmount.

- [ ] **Step 2: Implement `handleCopyKey`**
  - Guard for Clipboard API presence (`navigator.clipboard?.writeText`).
  - `await navigator.clipboard.writeText(key)`.
  - On success: set `copied=true`, clear/restart timeout.
  - On failure: swallow (no toast), keep `copied=false`.

## Task 2: Render the Key row as a clickable, accessible control

**Files:**

- Modify: `components/auth/TwoFactorEnableModal.tsx`

- [ ] **Step 1: Replace the Key row wrapper with a `button`**
  - Use `type="button"` and `aria-label="Copy 2FA key"`.
  - Keep the same sizing/background/border/padding classes so layout does not jump.
  - Ensure visible focus styling via `focus-visible:*` utilities.

- [ ] **Step 2: Conditional content**
  - Default state: show the key value (no nested input/button).
  - Copied state: show centered check icon + `Copied` and hide previous content.
  - Include a `role="status"` / `aria-live="polite"` element so “Copied” is announced.

## Task 3: Verification

**Files:**

- Lint: `components/auth/TwoFactorEnableModal.tsx`

- [ ] **Step 1: Lint the touched file**
  - Run ESLint via the IDE diagnostics (or `npm run lint` if needed).

- [ ] **Step 2: Manual test**
  - Open the 2FA enable modal.
  - Click the Key row:
    - Clipboard contains the key value.
    - Row swaps to check icon + “Copied” immediately.
    - After ~1200ms, the key display returns.
  - Keyboard:
    - Tab to the Key row, press Enter/Space → same behavior.

## Optional: Commit

> Note: Only do this if you want a commit created in this branch.

- [ ] `git add components/auth/TwoFactorEnableModal.tsx docs/superpowers/plans/2026-04-08-twofactor-enable-modal-click-to-copy-key.md`
- [ ] `git commit -m "feat: click-to-copy 2FA key row"`
