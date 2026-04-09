## Overview

Add a click-to-copy interaction to the **Key** row in `TwoFactorEnableModal` so users can copy the 2FA manual key by clicking the gray box. On success, the row temporarily replaces its contents with an in-place confirmation state: a centered check icon plus the text **Copied**.

## Scope

- Update only the **Key** row UI and behavior inside `components/auth/TwoFactorEnableModal.tsx`.
- Do not change enrollment/verification flows or API behavior (the key is currently mocked).

## Current UI (reference)

- The Key row is a gray container (`keyInputRowClass`) containing a read-only input (`keyInputClass`) whose value is the manual key string.

## Requirements

### Interaction

- **Click target**: Clicking anywhere inside the Key row (the gray box) triggers copy.
- **Copied behavior**:
  - On successful copy, replace the row content (old key/input) with a confirmation state.
  - Confirmation state is centered within the row and shows:
    - A check icon (Central icon set)
    - The label `Copied`
  - While in confirmation state, the previous content is not visible.
- **Reset timing**: After ~1200ms, revert back to showing the key row content as before.
- **Repeat clicks**: Clicking again while in the confirmation state re-copies and restarts the timer (keeps confirmation visible).

### Clipboard

- Use the Clipboard API (`navigator.clipboard.writeText`) when available.
- If copy fails (exception / unavailable):
  - Do not switch to the Copied confirmation state.
  - No toast is required for this iteration.

### Accessibility & UX

- The Key row must be keyboard accessible:
  - Implement as a semantic `button` (or button-like element with correct role) so Enter/Space activates copy.
  - Provide an accessible label, e.g. `aria-label="Copy 2FA key"`.
- Confirmation state should be announced to assistive tech:
  - Use `aria-live="polite"` on a small status element (or equivalent) during the Copied state.
- Preserve existing visual styling for the row (same height/padding/border/background).
- Keep focus/outline behavior consistent with existing patterns (visible focus ring when tabbed).

## Non-goals

- Adding a separate copy icon/button.
- Showing a toast notification for copy success/failure.
- Persisting “Copied” state across modal close/open.

## Acceptance criteria

- Clicking the Key row copies the key string to the clipboard.
- After clicking, the Key row shows a centered check icon + `Copied` and the old key content disappears.
- After ~1200ms, the original key content returns.
- Works with keyboard activation (Enter/Space).
- No layout jump or height change between states.
