import FAQSection from '@/components/landing/FAQSection'
import { getFaqs } from '@/lib/faq-public'
import { LANDING_TEXT_DEFAULTS } from '@/lib/landing-texts'

type Props = {
  description?: string
}

export default async function FAQSectionServer({
  description = LANDING_TEXT_DEFAULTS.faqDesc,
}: Props = {}) {
  const categories = await getFaqs()
  return <FAQSection categories={categories} description={description} />
}
