import FAQs from '@/components/landing/FAQs'
import { getFaqs } from '@/lib/faq-public'

export default async function FAQsServer() {
  const categories = await getFaqs()
  return <FAQs categories={categories} />
}
