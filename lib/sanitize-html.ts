import DOMPurify from 'isomorphic-dompurify'

/** Sanitize admin-authored HTML for safe `dangerouslySetInnerHTML` rendering. */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
}
