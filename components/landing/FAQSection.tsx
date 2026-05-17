'use client'

import { CentralIcon } from '@central-icons-react/all'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { Reveal } from '@/components/ui/reveal'
import { sanitizeHtml } from '@/lib/sanitize-html'
import type { FaqCategory } from '@/lib/faq-public'
import { LANDING_TEXT_DEFAULTS } from '@/lib/landing-texts'

const FAQItem: FunctionComponent<{
  question: string
  answerHtml: string
  isOpen: boolean
  onToggle: () => void
}> = ({ question, answerHtml, isOpen, onToggle }) => (
  <div className="rounded-num-8 border-border-subtle bg-card dark:border-darkslateblue border border-solid dark:bg-gray-100">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="rounded-num-8 lg:p-num-19.1 bg-card flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 p-4 text-left sm:gap-3 sm:p-5 dark:bg-gray-100"
    >
      <b className="tracking-num--0_01 text-foreground sm:leading-num-28 flex-1 text-left text-sm leading-snug sm:text-base">
        {question}
      </b>
      <div className="rounded-num-8 bg-foreground/10 flex shrink-0 items-center justify-center p-1 dark:bg-white/5">
        <CentralIcon
          name="IconChevronDownMedium"
          join="round"
          fill="outlined"
          stroke="1"
          radius="1"
          size={20}
          className="text-foreground opacity-75 transition-transform duration-300 ease-in-out dark:text-white"
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
          className="text-muted-foreground dark:text-lightsteelblue-100 sm:leading-num-24 lg:px-num-19.1 lg:pb-num-19.1 px-4 pt-0 pb-4 text-sm leading-6 font-medium sm:px-5 sm:pt-0 sm:pb-5 sm:text-base lg:pt-0"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(answerHtml) }}
        />
      </div>
    </div>
  </div>
)

type FAQSectionProps = {
  categories?: FaqCategory[]
  description?: string
}

const FAQSection: FunctionComponent<FAQSectionProps> = ({
  categories = [],
  description = LANDING_TEXT_DEFAULTS.faqDesc,
}) => {
  const items = categories.flatMap((category) => category.items).slice(0, 8)
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const col1 = items.slice(0, 4)
  const col2 = items.slice(4, 8)

  return (
    <section
      id="faqs"
      className="font-commissioner lg:text-num-16 overflow-x-hidden text-left text-sm sm:text-base"
    >
      {/* Section header */}
      <Reveal variant="fade-up">
        <div className="mx-auto flex w-full max-w-[1474px] flex-col items-center gap-2 px-4 text-center sm:gap-2.5 sm:px-6 lg:gap-3 lg:px-8">
          <div className="font-nata-sans sm:max-w-num-580 flex w-full max-w-full flex-col items-center justify-center gap-2 sm:gap-2.5 lg:gap-3">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-[5px]">
              <div className="tracking-num-0_02 text-2xl font-extrabold sm:text-3xl lg:text-[32px]">
                FREQUENTLY ASKED
              </div>
              <div className="text-deepskyblue-100 font-heydex flex items-center gap-1.5 sm:gap-[5px]">
                <img
                  className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                  alt=""
                  src="/icons/IconBubbleQuestion.svg"
                />
                <div className="tracking-num-0_02 text-2xl font-extrabold sm:text-3xl lg:text-[32px]">
                  QUEsTIONS
                </div>
              </div>
            </div>
            <div className="font-commissioner max-w-num-580 sm:leading-num-24 text-foreground text-sm leading-6 font-medium opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(17,24,39,0.16)] sm:text-base dark:[text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              {description}
            </div>
          </div>
        </div>
      </Reveal>

      {/* FAQ grid */}
      <div className="mx-auto mt-6 w-full max-w-[1474px] px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8">
        <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2">
          <Reveal variant="slide-left" className="flex flex-col gap-2 sm:gap-3">
            {col1.map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answerHtml={faq.answerHtml}
                isOpen={openIds.has(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            ))}
          </Reveal>
          <Reveal variant="slide-right" delay={100} className="flex flex-col gap-2 sm:gap-3">
            {col2.map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answerHtml={faq.answerHtml}
                isOpen={openIds.has(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            ))}
          </Reveal>
        </div>

        {/* Footer CTA */}
        <Reveal variant="fade-up" delay={200}>
          <div className="mt-6 flex items-center justify-center sm:mt-8">
            <Link
              href="/faqs"
              className="rounded-num-8 border-border-subtle bg-card text-foreground hover:bg-card-elevated dark:border-darkslateblue sm:py-num-4 lg:px-num-16 box-border flex min-h-[44px] w-full max-w-[207px] cursor-pointer touch-manipulation items-center justify-center gap-2 border border-solid px-6 py-3 transition-colors sm:px-8 lg:w-[207px] dark:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <b className="tracking-num--0_01 sm:leading-num-28 text-sm leading-snug sm:text-base">
                Read all FAQs
              </b>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default FAQSection
