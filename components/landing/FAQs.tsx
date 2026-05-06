'use client'

import { CentralIcon } from '@central-icons-react/all'
import { useEffect, useMemo, useState } from 'react'

type FaqCategoryId = 'general' | 'orders' | 'replacements' | 'refunds'

type FaqItem = {
  id: string
  question: string
  answer: string
  defaultOpen?: boolean
}

type FaqCategory = {
  id: FaqCategoryId
  label: string
  items: FaqItem[]
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
          ? 'border border-solid border-active-border text-foreground [background:linear-gradient(90deg,rgba(235,45,255,0.2),rgba(235,45,255,0)),linear-gradient(var(--active-bg),var(--active-bg))]'
          : 'text-foreground/90 hover:bg-hover-bg hover:text-foreground',
      ].join(' ')}
    >
      <span className="leading-num-20 font-semibold">{label}</span>
    </button>
  )
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-num-8 border border-solid border-border-subtle bg-card">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="rounded-num-8 lg:p-num-19.1 flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 bg-card p-4 text-left sm:gap-3 sm:p-5"
      >
        <b className="tracking-num--0_01 sm:leading-num-28 flex-1 text-left text-sm leading-snug sm:text-base">
          {question}
        </b>
        <div className="rounded-num-8 flex shrink-0 items-center justify-center bg-hover-bg p-1">
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
          <div className="text-body-foreground sm:leading-num-24 lg:px-num-19.1 lg:pb-num-19.1 px-4 pt-0 pb-4 text-sm leading-6 font-medium sm:px-5 sm:pt-0 sm:pb-5 sm:text-base lg:pt-0">
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQs() {
  const categories = useMemo<FaqCategory[]>(
    () => [
      {
        id: 'general',
        label: 'General',
        items: [
          {
            id: 'general-1',
            question: 'What kind of digital giftcards does Bluemoon offer?',
            answer:
              'Bluemoon offers a wide variety of digital giftcards across categories including food & dining, streaming services, gaming, travel, shopping, and more. Giftcards are delivered to your account after purchase.',
          },
          {
            id: 'general-2',
            question: 'What makes Bluemoon safe to shop on?',
            answer:
              'We use encrypted connections and monitor for fraud. For payments, we rely on trusted payment providers and do not store full card numbers on our servers.',
          },
          {
            id: 'general-3',
            question: 'Can I use other cryptocurrencies to shop?',
            answer:
              'Supported payment methods depend on the product and checkout options shown at the time of purchase. If a payment method is available, you’ll see it during checkout.',
            defaultOpen: true,
          },
          {
            id: 'general-4',
            question: 'How do I browse for giftcards?',
            answer:
              'Use categories and search to find brands quickly. Each listing shows available denominations and delivery details.',
          },
        ],
      },
      {
        id: 'orders',
        label: 'Orders',
        items: [
          {
            id: 'orders-1',
            question: 'Where can I find my order after purchasing?',
            answer:
              'After purchase, your digital code and details will appear in your account under your orders/history (if available). You may also receive an email confirmation.',
          },
          {
            id: 'orders-2',
            question: 'How long does it take to receive my giftcard?',
            answer:
              'Most giftcards are delivered shortly after payment confirmation. In rare cases, additional verification may delay delivery.',
          },
        ],
      },
      {
        id: 'replacements',
        label: 'Replacements',
        items: [
          {
            id: 'replacements-1',
            question: 'What if I receive an invalid code?',
            answer:
              'If you receive an invalid code, contact support within 48 hours with your order details. We will investigate and, if confirmed, issue a replacement or other resolution.',
          },
          {
            id: 'replacements-2',
            question: 'What information should I include when contacting support?',
            answer:
              'Include the email on your account, order ID, the brand/product, and screenshots where relevant. This helps us resolve issues faster.',
          },
        ],
      },
      {
        id: 'refunds',
        label: 'Refunds',
        items: [
          {
            id: 'refunds-1',
            question: 'Can I get a refund for a giftcard I purchased?',
            answer:
              'Due to the digital nature of giftcards, sales are typically final once delivered. If there is a technical issue (e.g., invalid code), contact support and we will help.',
          },
          {
            id: 'refunds-2',
            question: 'How do refunds work if approved?',
            answer:
              'If a refund is approved, it is returned to the original payment method where possible. Processing time depends on your bank or payment provider.',
          },
          {
            id: 'refunds-3',
            question: 'Are there any fees associated with buying giftcards?',
            answer:
              'Any applicable fees (network, processing, or service fees) will be displayed at checkout before you pay.',
          },
        ],
      },
    ],
    []
  )

  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>('general')
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(categories.flatMap((c) => c.items.map((i) => i.id)))
  )
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories

    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
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

        let bestId: FaqCategoryId | null = null
        let bestDistance = Number.POSITIVE_INFINITY

        for (const el of sections) {
          const rect = el.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY
          const distance = Math.abs(sectionTop - viewportCenter)
          const id = el.dataset.faqId as FaqCategoryId | undefined
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

  return (
    <section className="text-num-14 font-commissioner w-full text-left text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-16 lg:py-14">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[208px_1fr] lg:gap-16">
          {/* FAQ navigation */}
          <aside className="text-muted-foreground w-full self-start lg:sticky lg:top-24">
            <nav className="flex w-full flex-col items-start gap-1">
              <div className="rounded-num-8 px-num-12 min-w-num-190 text-muted-foreground box-border flex w-full items-center py-2 text-[12px]">
                <div className="leading-[15px] font-semibold uppercase">FAQs</div>
              </div>

              {categories.map((cat) => (
                <NavItem
                  key={cat.id}
                  isActive={cat.id === activeCategory}
                  label={cat.label}
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

              <div className="text-muted-foreground flex w-fit items-center justify-center gap-2 rounded-md bg-card-elevated px-2 py-1.5 text-[12px]">
                <div className="leading-[15px] font-semibold">Can’t find answer to your query?</div>
                <div className="text-foreground flex items-center gap-1">
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
                </div>
              </div>
            </header>

            {/* Search */}
            <div className="text-num-16 text-body-foreground rounded-num-8 border-border-subtle px-num-12 mt-6 flex w-full items-center gap-2 overflow-hidden border border-solid bg-input-bg py-1">
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
                className="tracking-num--0_01 leading-num-28 w-full border-none bg-transparent p-1 px-0 font-normal text-foreground/80 placeholder:text-muted-foreground/60 outline-none focus:border-none focus:ring-0 focus:outline-none active:border-none active:outline-none"
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
                    {idx !== 0 && <div className="h-px w-full bg-divider" />}

                    <section
                      id={`faq-${cat.id}`}
                      data-faq-id={cat.id}
                      className="flex w-full scroll-mt-28 flex-col gap-5 pt-5 sm:scroll-mt-[95px]"
                    >
                      <div className="flex items-center">
                        <h2 className="tracking-num-0.02 leading-num-28 font-semibold">
                          {cat.label}
                        </h2>
                      </div>

                      <div className="flex flex-col gap-3">
                        {cat.items.map((item) => (
                          <FAQItem
                            key={item.id}
                            question={item.question}
                            answer={item.answer}
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
