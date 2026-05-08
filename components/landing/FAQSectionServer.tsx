import FAQSection from '@/components/landing/FAQSection'
import { getFaqs } from '@/lib/faq-public'

export default async function FAQSectionServer() {
  const categories = await getFaqs()
  return <FAQSection categories={categories} />
}
