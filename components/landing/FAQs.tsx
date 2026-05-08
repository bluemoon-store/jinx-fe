'use client'

import { CentralIcon } from '@central-icons-react/all'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { sanitizeHtml } from '@/lib/sanitize-html'
import type { FaqCategory } from '@/lib/faq-public'

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

function FAQItem({
  question,
  answerHtml,
  isOpen,
  onToggle,
}: {
  question: string
  answerHtml: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-num-8 border-border-subtle bg-card border border-solid">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="rounded-num-8 lg:p-num-19.1 bg-card flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 p-4 text-left sm:gap-3 sm:p-5"
      >
        <b className="tracking-num--0_01 sm:leading-num-28 flex-1 text-left text-sm leading-snug sm:text-base">
          {question}
        </b>
        <div className="rounded-num-8 bg-hover-bg flex shrink-0 items-center justify-center p-1">
          <CentralIcon
            name="IconChevronDownMedium"
            join="round"
            fill="outlined"
            stroke="1"
            radius="1"
            size={20}
            className="text-foreground opacity-75 transition-transform duration-300 ease-in-out"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            className="text-body-foreground sm:leading-num-24 lg:px-num-19.1 lg:pb-num-19.1 px-4 pt-0 pb-4 text-sm leading-6 font-medium sm:px-5 sm:pt-0 sm:pb-5 sm:text-base lg:pt-0"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(answerHtml) }}
          />
        </div>
      </div>
    </div>
  )
}

type FAQsProps = {
  categories: FaqCategory[]
}

export default function FAQs({ categories }: FAQsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? '')
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const firstId = categories[0]?.items[0]?.id
    return new Set(firstId ? [firstId] : [])
  })
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories

    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answerHtml.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [categories, searchQuery])

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(`faq-${c.id}`))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        ticking = false
        const viewportTop = window.scrollY
        const viewportCenter = viewportTop + window.innerHeight * 0.3

        let bestId: string | null = null
        let bestDistance = Number.POSITIVE_INFINITY

        for (const el of sections) {
          const rect = el.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY
          const distance = Math.abs(sectionTop - viewportCenter)
          const id = el.dataset.faqId
          if (!id) continue
          if (distance < bestDistance) {
            bestDistance = distance
            bestId = id
          }
        }

        if (bestId && bestId !== activeCategory) {
          setActiveCategory(bestId)
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [categories, activeCategory])

  useEffect(() => {
    if (!categories.length) {
      setActiveCategory('')
      return
    }
    if (!categories.some((category) => category.id === activeCategory)) {
      setActiveCategory(categories[0].id)
    }
  }, [categories, activeCategory])

  return (
    <section className="text-num-14 font-commissioner text-foreground w-full text-left">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-16 lg:py-14">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[208px_1fr] lg:gap-16">
          {/* FAQ navigation */}
          <aside className="text-muted-foreground w-full self-start lg:sticky lg:top-24">
            <nav className="flex w-full flex-col items-start gap-1">
              <div className="rounded-num-8 px-num-12 min-w-num-190 text-muted-foreground box-border flex w-full items-center py-2 text-[12px]">
                <div className="leading-[15px] font-semibold uppercase">FAQs</div>
              </div>

              {filteredCategories.map((cat) => (
                <NavItem
                  key={cat.id}
                  isActive={cat.id === activeCategory}
                  label={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    document.getElementById(`faq-${cat.id}`)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                />
              ))}
            </nav>
          </aside>

          {/* FAQ content */}
          <main className="w-full">
            {/* Header */}
            <header className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-[18px]">
                <CentralIcon
                  name="IconBubbleQuestion"
                  join="round"
                  fill="filled"
                  stroke="2"
                  radius="1"
                  size={24}
                  color="#FF00FF"
                />
                <h1 className="tracking-num-0.02 leading-num-28 font-semibold">
                  Frequently asked questions
                </h1>
              </div>

              <div className="text-muted-foreground bg-card-elevated flex w-fit items-center justify-center gap-2 rounded-md px-2 py-1.5 text-[12px]">
                <div className="leading-[15px] font-semibold">Can’t find answer to your query?</div>
                <Link href="/support" className="text-foreground flex items-center gap-1">
                  <CentralIcon
                    name="IconRescueRing"
                    join="round"
                    fill="filled"
                    stroke="1"
                    radius="1"
                    size={14}
                    color="currentColor"
                    ariaHidden={true}
                  />
                  <div className="leading-[15px] font-semibold">Contact Support</div>
                </Link>
              </div>
            </header>

            {/* Search */}
            <div className="text-num-16 text-body-foreground rounded-num-8 border-border-subtle px-num-12 bg-input-bg mt-6 flex w-full items-center gap-2 overflow-hidden border border-solid py-1">
              <CentralIcon
                name="IconMagnifyingGlass"
                join="round"
                fill="filled"
                stroke="2"
                radius="1"
                size={20}
                className="text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search for a question or a keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tracking-num--0_01 leading-num-28 text-foreground/80 placeholder:text-muted-foreground/60 w-full border-none bg-transparent p-1 px-0 font-normal outline-none focus:border-none focus:ring-0 focus:outline-none active:border-none active:outline-none"
              />
            </div>

            {/* Sections */}
            <div className="mt-4 flex w-full flex-col gap-5 text-[18px]">
              {filteredCategories.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center">
                  No FAQs match your search
                </div>
              ) : (
                filteredCategories.map((cat, idx) => (
                  <div key={cat.id}>
                    {idx !== 0 && <div className="bg-divider h-px w-full" />}

                    <section
                      id={`faq-${cat.id}`}
                      data-faq-id={cat.id}
                      className="flex w-full scroll-mt-28 flex-col gap-5 pt-5 sm:scroll-mt-[95px]"
                    >
                      <div className="flex items-center">
                        <h2 className="tracking-num-0.02 leading-num-28 font-semibold">
                          {cat.name}
                        </h2>
                      </div>

                      <div className="flex flex-col gap-3">
                        {cat.items.map((item) => (
                          <FAQItem
                            key={item.id}
                            question={item.question}
                            answerHtml={item.answerHtml}
                            isOpen={openIds.has(item.id)}
                            onToggle={() => toggleItem(item.id)}
                          />
                        ))}
                      </div>
                    </section>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
