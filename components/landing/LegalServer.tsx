import Legal from '@/components/landing/Legal'
import { getLegalDocs } from '@/lib/legal-public'

export default async function LegalServer() {
  const docs = await getLegalDocs()
  return <Legal documents={docs} />
}
