'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import type { LegalDoc } from '@/lib/legal-public'
import { sanitizeHtml } from '@/lib/sanitize-html'

type LegalSectionId = 'terms' | 'privacy' | 'refund' | 'cookies'

type LegalSection = {
  id: LegalSectionId
  navLabel: string
  title: string
  lastRevised: string
  contentHtml: string
}

function NavItem({
  isActive,
  label,
  onClick,
}: {
  isActive: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-num-8 min-w-num-190 box-border flex w-full items-center overflow-hidden p-2.5 text-left',
        isActive
          ? 'border-active-border text-foreground border border-solid [background:linear-gradient(90deg,rgba(235,45,255,0.2),rgba(235,45,255,0)),linear-gradient(var(--active-bg),var(--active-bg))]'
          : 'text-foreground/90 hover:bg-hover-bg hover:text-foreground',
      ].join(' ')}
    >
      <span className="leading-num-20 font-semibold">{label}</span>
    </button>
  )
}

type LegalProps = {
  documents: LegalDoc[]
}

function formatLastRevised(updatedAt: string | null): string {
  if (!updatedAt) return '—'
  const parsed = new Date(updatedAt)
  if (Number.isNaN(parsed.getTime())) return '—'
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function mapTypeToSectionId(type: LegalDoc['type']): LegalSectionId {
  if (type === 'TERMS') return 'terms'
  if (type === 'PRIVACY') return 'privacy'
  if (type === 'REFUND') return 'refund'
  return 'cookies'
}

const defaultLabels: Record<LegalSectionId, string> = {
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
  refund: 'Refund Policy',
  cookies: 'Cookie Policy',
}

export default function Legal({ documents }: LegalProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sections = useMemo<LegalSection[]>(
    () =>
      documents.map((doc) => {
        const id = mapTypeToSectionId(doc.type)
        const fallback = defaultLabels[id]
        return {
          id,
          navLabel: fallback,
          title: doc.title?.trim() || fallback,
          lastRevised: formatLastRevised(doc.updatedAt),
          contentHtml: doc.contentHtml,
        }
      }),
    [documents]
  )

  const [activeId, setActiveId] = useState<LegalSectionId>('terms')
  const activeSection = sections.find((s) => s.id === activeId) ?? null

  useEffect(() => {
    const sectionParam = (searchParams.get('section') ?? '').toLowerCase()
    const nextId: LegalSectionId | null =
      sectionParam === 'privacy'
        ? 'privacy'
        : sectionParam === 'refund'
          ? 'refund'
          : sectionParam === 'cookies'
            ? 'cookies'
            : sectionParam === 'terms'
              ? 'terms'
              : null

    if (nextId && sections.some((section) => section.id === nextId) && nextId !== activeId) {
      setActiveId(nextId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, sections, activeId])

  useEffect(() => {
    if (!sections.length) return
    if (!sections.some((section) => section.id === activeId)) {
      setActiveId(sections[0].id)
    }
  }, [sections, activeId])

  return (
    <section className="text-num-14 font-commissioner text-foreground w-full text-left">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-16 lg:py-14">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[208px_1fr] lg:gap-16">
          {/* Legal navigation */}
          <aside className="text-muted-foreground flex w-full flex-col items-start self-start lg:sticky lg:top-24">
            <nav className="flex w-full flex-col items-start gap-1">
              <div className="rounded-num-8 min-w-num-190 text-muted-foreground box-border flex w-full items-center px-3 py-2 text-[12px]">
                <div className="leading-[15px] font-semibold uppercase">LEGAL</div>
              </div>

              {sections.map((section) => (
                <NavItem
                  key={section.id}
                  isActive={section.id === activeId}
                  label={section.navLabel}
                  onClick={() => {
                    setActiveId(section.id)
                    ;(router as any).replace(`${pathname}?section=${section.id}`, { scroll: false })
                  }}
                />
              ))}
            </nav>
          </aside>

          {/* Page content */}
          <main className="text-foreground flex w-full flex-col gap-6 text-[18px]">
            <header className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <h1 className="leading-num-28 tracking-num-0.02 font-semibold">
                {activeSection?.title ?? 'Legal'}
              </h1>
              <div className="text-muted-foreground text-[12px] leading-[15px] font-semibold">
                Last Revised: {activeSection?.lastRevised ?? '—'}
              </div>
            </header>

            <div className="bg-divider h-px w-full" />

            {!activeSection || activeSection.contentHtml.trim() === '' ? (
              <div className="text-muted-foreground text-base font-medium">
                This document is currently unavailable.
              </div>
            ) : (
              <article
                className="legal-content text-body-foreground text-base leading-7 font-medium"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(activeSection.contentHtml),
                }}
              />
            )}
          </main>
        </div>
      </div>
    </section>
  )
}
