import { getCategoriesAction } from '@/actions/product'

import HeroSectionClient from './HeroSectionClient'

export default async function HeroSection() {
  let categories: Awaited<ReturnType<typeof getCategoriesAction>> = []
  try {
    categories = await getCategoriesAction()
  } catch {
    categories = []
  }

  return <HeroSectionClient categories={categories} />
}
