'use client'

import { CentralIcon } from '@central-icons-react/all'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { Reveal } from '@/components/ui/reveal'

const faqData = [
  {
    id: 1,
    question: 'What kind of digital giftcards does Jinx.to offer?',
    answer:
      'Jinx.to offers a wide variety of digital giftcards across categories including food & dining, streaming services, gaming, travel, shopping, and more. We carry top brands like Starbucks, Netflix, Amazon, PlayStation, and hundreds of others — all delivered instantly to your account.',
  },
  {
    id: 2,
    question: 'What makes Jinx.to a safe platform to shop on?',
    answer:
      'Every giftcard on Jinx.to is sourced directly from authorized distributors and verified before listing. Your transactions are encrypted end-to-end, and we never store your payment credentials. Our team monitors for fraud 24/7 to ensure every purchase is legitimate and protected.',
  },
  {
    id: 3,
    question: 'Can I use other cryptocurrencies to shop?',
    answer:
      "We've partnered with top brands to bring you the best deals on the market. Our team works around the clock to ensure that every gift card is 100% legitimate and delivered instantly. Shop with confidence, knowing that your purchase is protected by our guarantee.",
    defaultOpen: true,
  },
  {
    id: 4,
    question: 'How do I browse for giftcards on Jinx.to?',
    answer:
      'Simply use the category tabs at the top of the store to filter by type — food, streaming, shopping, and more. You can also use the search bar to find a specific brand instantly. Each listing shows the available denominations and current pricing.',
  },
  {
    id: 5,
    question: 'Can I get a refund for a giftcard I purchased?',
    answer:
      'Due to the digital nature of giftcards, all sales are final once the card has been delivered to your account. However, if you experience a technical issue or receive an invalid code, please contact our support team within 48 hours and we will make it right.',
  },
  {
    id: 6,
    question: 'How do I redeem a giftcard on Jinx.to?',
    answer:
      'After purchase, your giftcard code will appear in your Jinx Account under "My Orders". Simply copy the code and redeem it on the brand\'s official website or app. Each card includes a direct redemption link for convenience.',
  },
  {
    id: 7,
    question: 'Are there any fees associated with buying giftcards?',
    answer:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    defaultOpen: true,
  },
  {
    id: 8,
    question: 'How long does it take to receive my giftcard?',
    answer:
      'Most giftcards are delivered instantly after payment confirmation. In rare cases where manual verification is required, delivery may take up to 15 minutes. You will receive an email notification as soon as your card is ready in your account.',
  },
]

const FAQItem: FunctionComponent<{
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}> = ({ question, answer, isOpen, onToggle }) => (
  <div className="rounded-num-8 border-darkslateblue border border-solid bg-gray-100">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="rounded-num-8 lg:p-num-19.1 flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 bg-gray-100 p-4 text-left sm:gap-3 sm:p-5"
    >
      <b className="tracking-num--0_01 sm:leading-num-28 flex-1 text-left text-sm leading-snug sm:text-base">
        {question}
      </b>
      <div className="rounded-num-8 flex shrink-0 items-center justify-center bg-white/5 p-1">
        <CentralIcon
          name="IconChevronDownMedium"
          join="round"
          fill="outlined"
          stroke="1"
          radius="1"
          size={20}
          className="text-white opacity-75 transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
    </button>
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-in-out"
      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
    >
      <div className="overflow-hidden">
        <div className="text-lightsteelblue-100 sm:leading-num-24 lg:p-num-19.1 p-4 text-sm leading-6 font-medium sm:p-5 sm:text-base">
          {answer}
        </div>
      </div>
    </div>
  </div>
)

const FAQSection: FunctionComponent = () => {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set())

  const allOpen = openIds.size === faqData.length

  const toggleItem = (id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    setOpenIds(allOpen ? new Set() : new Set(faqData.map((f) => f.id)))
  }

  const col1 = faqData.slice(0, 4)
  const col2 = faqData.slice(4)

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
              <div className="tracking-num-0_02 text-xl font-extrabold sm:text-2xl lg:text-[32px]">
                FREQUENTLY ASKED
              </div>
              <div className="text-deepskyblue-100 font-heydex flex items-center gap-1.5 sm:gap-[5px]">
                <img
                  className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                  alt=""
                  src="/icons/IconBubbleQuestion.svg"
                />
                <div className="tracking-num-0_02 text-xl font-extrabold sm:text-2xl lg:text-[32px]">
                  QUEsTIONS
                </div>
              </div>
            </div>
            <div className="font-commissioner lg:leading-num-24 text-sm leading-6 font-medium text-white opacity-[0.75] [text-shadow:0px_0px_8.63px_rgba(0,_0,_0,_0.6)] sm:text-base sm:leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              <br className="hidden sm:block" />
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                answer={faq.answer}
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
                answer={faq.answer}
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
              className="rounded-num-8 border-darkslateblue sm:py-num-4 lg:px-num-16 box-border flex min-h-[44px] w-full max-w-[207px] cursor-pointer touch-manipulation items-center justify-center gap-2 border border-solid bg-gray-100 px-6 py-3 text-white transition-colors hover:bg-gray-300 sm:px-8 lg:w-[207px]"
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
